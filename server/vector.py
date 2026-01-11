import os
import glob
import argparse
import re
from pathlib import Path
from typing import List

from langchain_community.vectorstores import FAISS
from langchain.schema import Document
from langchain_community.document_loaders import UnstructuredPDFLoader, DirectoryLoader, TextLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter

from chunker import chunk_text, embed_batches

parser = argparse.ArgumentParser()
parser.add_argument("--course_id", required=True, help="folder name under data/ containing PDFs/txt/md")
parser.add_argument("--batch_size", type=int, default=64, help="embedding batch size")
args = parser.parse_args()

DATA_PATH = fr"c:\Users\PIPP\Documents\TutorDek\TutorCerdas\client\public\data\{args.course_id}"
DB_PATH = fr"c:\Users\PIPP\Documents\TutorDek\TutorCerdas\server\vectors\db_faiss_{args.course_id}"

DEFAULT_EMB_MODEL = "C:\\Users\\PIPP\\Documents\\TutorDek\\TutorCerdas\\server\\PretrainedModel\\multilingual-e5-large"

def clean_text(t: str) -> str:
    if not isinstance(t, str):
        return ""
    t = t.replace("\x00", "")         # null byte
    t = re.sub(r"\s+", " ", t)        # collapse whitespace
    return t.strip()

def load_docs_from_folder(folder: Path) -> List[Document]:
    docs = []
    if glob.glob(os.path.join(DATA_PATH, "*.pdf")):
        docs += DirectoryLoader(
            DATA_PATH,
            glob="*.pdf",
            loader_cls=UnstructuredPDFLoader,
            loader_kwargs={
                "strategy": "fast",
                "languages": None, 
                "extract_images": False
            }
        ).load()
    # TXT/MD
    for ext in ("*.txt","*.md"):
        for fp in glob.glob(os.path.join(DATA_PATH, ext)):
            docs += TextLoader(fp, encoding="utf-8").load()
    return docs

def docs_to_text(docs: List[Document]) -> str:
    # concatenate Document objects into one text blob per source
    parts = []
    for d in docs:
        text = d.page_content or ""
        parts.append(text)
    return "\n\n".join(parts).strip()

def main():
    if not os.path.exists(DATA_PATH):
        print(f"⚠ DATA_PATH not found: {DATA_PATH}")
        return

    docs = load_docs_from_folder(DATA_PATH)
    if len(docs) == 0:
        print(f"⚠ No docs found for course {args.course_id}. Skipping vector build.")
        return

    os.makedirs(DB_PATH, exist_ok=True)

    all_chunks = []
    for d in docs:
        text = d.page_content or ""
        if not text.strip():
            continue
        text = clean_text(text)
        # derive source (if loader provided one)
        source = None
        if d.metadata:
            # langchain DirectoryLoader may set 'source' or 'sourcefile' or 'source_path'
            source = d.metadata.get('source') or d.metadata.get('sourcefile') or d.metadata.get('source_path') or d.metadata.get('filename')
        # chunks = chunk_text(text,
        #                     chunk_size=int(os.environ.get('CHUNK_MAX_CHARS', '1200')),
        #                     overlap=int(os.environ.get('CHUNK_OVERLAP', '200')),
        #                     by_sentences=True,
        #                     sentences_per_chunk=int(os.environ.get('CHUNK_SENTENCES', '3')),
        #                     sentence_overlap=int(os.environ.get('CHUNK_SENTENCE_OVERLAP', '1')),
        #                     max_chars=int(os.environ.get('CHUNK_MAX_CHARS', '1200')),
        #                     source=source)
        chunks = chunk_text(text,
                            chunk_size=int(os.environ.get('CHUNK_MAX_CHARS', '600')),
                            overlap=int(os.environ.get('CHUNK_OVERLAP', '150')),
                            by_sentences=False,
                            sentences_per_chunk=int(os.environ.get('CHUNK_SENTENCES', '6')),
                            sentence_overlap=int(os.environ.get('CHUNK_SENTENCE_OVERLAP', '0')),
                            max_chars=int(os.environ.get('CHUNK_MAX_CHARS', '900')),
                            source=source)
        # chunk_text returns Documents with metadata chunk_index & source
        for c in chunks:
            MIN_CHARS = 50
            MIN_WORDS = 10

            content = clean_text(c.page_content)

            if len(content) >= MIN_CHARS and len(content.split()) >= MIN_WORDS:
                c.page_content = content
                all_chunks.append(c)

            # cleaning again and filter too-short
            # c.page_content = clean_text(c.page_content)
            # if len(c.page_content) >= 5:
            #     all_chunks.append(c)

    print(f"Total chunks after cleaning: {len(all_chunks)}")

    if not all_chunks:
        print("No chunks to embed. Exiting.")
        return

    # prepare texts for embedding in the same order as chunks
    texts = [c.page_content for c in all_chunks]

    model_name = DEFAULT_EMB_MODEL
    device = "cuda"
    batch_size = int(os.environ.get('EMB_BATCH_SIZE', '64'))
    prefix = os.environ.get('EMB_PREFIX', 'passage: ') 

    print(f"Embedding with model={model_name} device={device} batch_size={batch_size} ...")
    embeddings = embed_batches(texts, model_name=model_name, batch_size=batch_size, device=device, prefix=prefix)
    if not embeddings or len(embeddings) != len(texts):
        print("⚠ Embedding size mismatch. Aborting.")
        return

    # Build Document objects (langchain) with metadata to pass into FAISS
    faiss_docs = []
    for i, doc in enumerate(all_chunks):
        md = dict(doc.metadata or {})
        md.update({'chunk_index': md.get('chunk_index', i)})
        faiss_docs.append(Document(page_content=doc.page_content, metadata=md))

    emb_wrapper = None
    try:
        # create a lightweight wrapper that uses same model/device (no batching here)
        emb_wrapper = None
        from chunker import E5LocalEmbeddings
        emb_wrapper = E5LocalEmbeddings(model_name=model_name, model_kwargs={'device': device} if device else {}, encode_kwargs={'device': device} if device else {})
    except Exception as e:
        print("⚠ Warning: failed to construct LangChain embedding wrapper; continuing — FAISS may still be saved.")
        emb_wrapper = None

    if emb_wrapper is not None:
        print("Building FAISS index")
        vs = FAISS.from_documents(faiss_docs, emb_wrapper)
    else:
        import faiss
        import numpy as np
        dim = len(embeddings[0])
        xb = np.array(embeddings).astype('float32')
        index = faiss.IndexFlatL2(dim)
        index.add(xb)

        try:
            vs = FAISS(index, xb, faiss_docs)
        except Exception:
            # Last fallback: save raw index manually
            print("⚠ Could not wrap FAISS index into LangChain FAISS object. Saving raw index with faiss.write_index.")
            faiss.write_index(index, str(Path(DB_PATH) / "index.faiss"))
            # Also dump docs to a simple JSONL for later restore
            import json
            docs_json = [{'page_content': d.page_content, 'metadata': d.metadata} for d in faiss_docs]
            with open(Path(DB_PATH) / "docs.jsonl", "w", encoding="utf-8") as fh:
                for it in docs_json:
                    fh.write(json.dumps(it, ensure_ascii=False) + "\n")
            print(f"Saved raw FAISS index and docs at {DB_PATH}")
            return

    # Save local
    vs.save_local(str(DB_PATH))
    print(f"Saved FAISS at: {DB_PATH}")

if __name__ == "__main__":
    main()

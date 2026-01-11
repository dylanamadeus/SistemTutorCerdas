import os, glob, argparse, re
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.document_loaders import UnstructuredPDFLoader, DirectoryLoader, TextLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import RecursiveCharacterTextSplitter

parser = argparse.ArgumentParser()
parser.add_argument("--course_id", required=True)
args = parser.parse_args()

# DATA_PATH = fr"d:\Skripsi\Upload\TutorCerdas\client\public\data\{args.course_id}"
# DB_PATH = fr"d:\Skripsi\Upload\TutorCerdas\server\vectors\db_faiss_{args.course_id}"
DATA_PATH = fr"c:\Users\PIPP\Documents\TutorDek\TutorCerdas\client\public\data\{args.course_id}"
DB_PATH = fr"c:\Users\PIPP\Documents\TutorDek\TutorCerdas\server\vectors\db_faiss_{args.course_id}"
EMB_MODEL = "C:\\Users\\PIPP\\Documents\\TutorDek\\TutorCerdas\\server\\PretrainedModel\\multilingual-e5-large"

def load_docs():
    docs = []
    # PDF
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

def clean_text(t: str) -> str:
    if not isinstance(t, str):
        return ""

    t = t.replace("\x00", "")         # null byte
    t = re.sub(r"\s+", " ", t)        # collapse whitespace
    return t.strip()

class E5Embeddings(HuggingFaceEmbeddings):
    def embed_documents(self, texts):
        processed = []
        for t in texts:
            t = clean_text(t)
            if len(t) < 5:
                print(f"⚠️ Skip chunk (too short): {repr(t)}")
                continue
            processed.append("passage: " + t)
        return super().embed_documents(processed)

def main():
    if not os.path.exists(DATA_PATH):
        print(f"⚠ DATA_PATH not found: {DATA_PATH}")
        return
    
    docs = load_docs()
    
    if len(docs) == 0:
        print(f"⚠ No docs found for course {args.course_id}. Skipping vector build.")
        return
    
    os.makedirs(DB_PATH, exist_ok=True)
    
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1500,          # sweet spot untuk e5-large
        chunk_overlap=200,
        length_function=len,
        separators=[
            "\n### ",   # heading kecil
            "\n## ",    # heading menengah
            "\n# ",     # heading besar
            "\n\n",     # paragraf
            "\n",       # baris
            " ",        # fallback terakhir
        ]
    )

    chunks = splitter.split_documents(docs)

    cleaned_chunks = []
    for c in chunks:
        c.page_content = clean_text(c.page_content)
        if len(c.page_content) >= 5:
            cleaned_chunks.append(c)
        else:
            print(f"⚠️ Skip cleaned chunk: {repr(c.page_content)}")

    print(f"Total chunks after cleaning: {len(cleaned_chunks)}")

    # emb = E5Embeddings(model_name=EMB_MODEL)
    emb = E5Embeddings(
        model_name=EMB_MODEL,
        model_kwargs={"device": "cuda"},
        encode_kwargs={"device": "cuda"}
    )
    vs = FAISS.from_documents(cleaned_chunks, emb)
    vs.save_local(DB_PATH)
    print(f"Saved FAISS at: {DB_PATH}")

if __name__ == "__main__":
    main()

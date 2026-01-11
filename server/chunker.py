import os
import re
from typing import List, Optional
import math

from langchain.schema import Document
from langchain_huggingface import HuggingFaceEmbeddings

# --- Chunker defaults (can be overridden by args/env in indexer) ---
CHUNK_BY_SENTENCES = os.environ.get('CHUNK_BY_SENTENCES', 'true').lower() in ('1', 'true', 'yes')
CHUNK_SENTENCES = int(os.environ.get('CHUNK_SENTENCES', '3'))
CHUNK_SENTENCE_OVERLAP = int(os.environ.get('CHUNK_SENTENCE_OVERLAP', '1'))
CHUNK_MAX_CHARS = int(os.environ.get('CHUNK_MAX_CHARS', os.environ.get('CHUNK_SIZE', '1200')))

# Lightweight sentence splitter (works well for many languages)
_sentence_splitter_re = re.compile(r'(?<!\w\.\w.)(?<![A-Z][a-z]\.)(?<=[.?!])\s+')

def split_into_sentences(text: str) -> List[str]:
    if not text:
        return []
    t = re.sub(r'\s+', ' ', text).strip()
    parts = _sentence_splitter_re.split(t)
    return [p.strip() for p in parts if p and p.strip()]

def is_structured_line(line: str) -> bool:
    if not line:
        return False
    s = line.strip()
    if '|' in s and s.count('|') >= 2:
        return True
    if '\t' in s:
        return True
    if re.match(r'^(\*|\-|\+)\s+', s):
        return True
    if re.match(r'^\d+\.\s+', s):
        return True
    if re.search(r'\s{2,}', s) and len(re.findall(r'\s{2,}', s)) >= 2:
        return True
    return False

def chunk_text(
    text: str,
    chunk_size: int = CHUNK_MAX_CHARS,
    overlap: int = 200,
    by_sentences: Optional[bool] = None,
    sentences_per_chunk: Optional[int] = None,
    sentence_overlap: Optional[int] = None,
    max_chars: Optional[int] = None,
    source: Optional[str] = None
) -> List[Document]:

    if by_sentences is None:
        by_sentences = CHUNK_BY_SENTENCES
    if sentences_per_chunk is None:
        sentences_per_chunk = CHUNK_SENTENCES
    if sentence_overlap is None:
        sentence_overlap = CHUNK_SENTENCE_OVERLAP
    if max_chars is None:
        max_chars = chunk_size

    if not text:
        return []

    # Paragraph break fallback
    if not by_sentences:
        paragraphs = [p.strip() for p in text.split('\n') if p.strip()]
        chunks: List[str] = []
        current = ''
        for p in paragraphs:
            if len(current) + len(p) + 1 <= chunk_size:
                current = (current + '\n' + p).strip() if current else p
            else:
                if current:
                    chunks.append(current)
                if len(p) > chunk_size:
                    start = 0
                    while start < len(p):
                        end = min(start + chunk_size, len(p))
                        chunks.append(p[start:end])
                        start = end - overlap if end - overlap > start else end
                    current = ''
                else:
                    current = p
        if current:
            chunks.append(current)
        docs = [Document(page_content=c.strip(), metadata={'chunk_index': i, 'source': source}) for i, c in enumerate(chunks)]
        return docs

    # Sentence based:
    paragraphs = [p for p in text.split('\n\n') if p and p.strip()]
    sentence_chunks: List[str] = []

    for para in paragraphs:
        para = para.strip()
        lines = [l for l in para.split('\n') if l.strip()]
        # structured single-line block (table-like or bullet)
        if len(lines) == 1 and is_structured_line(lines[0]):
            block = lines[0].strip()
            if len(block) <= max_chars:
                sentence_chunks.append(block)
            else:
                words = block.split()
                cur = []
                cur_len = 0
                for w in words:
                    if cur_len + len(w) + 1 <= max_chars:
                        cur.append(w); cur_len += len(w) + 1
                    else:
                        sentence_chunks.append(' '.join(cur)); cur = [w]; cur_len = len(w) + 1
                if cur:
                    sentence_chunks.append(' '.join(cur))
            continue

        para_flat = ' '.join([l.strip() for l in lines if l.strip()])
        sentences = split_into_sentences(para_flat)
        if not sentences:
            # fallback to comma/semicolon splits or safe word splits
            tmp = re.split(r'(?<=[;,:])\s+', para_flat)
            if len(tmp) > 1:
                sentences = [t.strip() for t in tmp if t.strip()]
            else:
                words = para_flat.split()
                cur = []; cur_len = 0
                for w in words:
                    if cur_len + len(w) + 1 <= max_chars:
                        cur.append(w); cur_len += len(w) + 1
                    else:
                        sentence_chunks.append(' '.join(cur)); cur = [w]; cur_len = len(w) + 1
                if cur:
                    sentence_chunks.append(' '.join(cur))
                continue

        n = max(1, sentences_per_chunk)
        ov = max(0, sentence_overlap)
        i = 0
        while i < len(sentences):
            seg = sentences[i:i+n]
            chunk_i = ' '.join(seg).strip()
            if len(chunk_i) > max_chars:
                cut = chunk_i[:max_chars]
                last_space = cut.rfind(' ')
                chunk_i = (cut[:last_space] + '...') if last_space > 0 else (cut + '...')
            sentence_chunks.append(chunk_i)
            if ov >= n:
                i += n
            else:
                i += (n - ov)

    final_chunks = [c.strip() for c in sentence_chunks if c and c.strip()]

    # merge very short chunks (so they are not too tiny)
    merged: List[str] = []
    for c in final_chunks:
        if not merged:
            merged.append(c); continue
        if len(c) < 50 and len(merged[-1]) + 1 + len(c) <= max_chars:
            merged[-1] = merged[-1] + ' ' + c
        else:
            merged.append(c)

    docs = [Document(page_content=c, metadata={'chunk_index': i, 'source': source}) for i, c in enumerate(merged)]
    return docs

class E5LocalEmbeddings(HuggingFaceEmbeddings):
    # Thin subclass to apply optional preprocessing and device settings consistently.
    # Uses langchain_huggingface.HuggingFaceEmbeddings under the hood.

    def __init__(self, model_name: str, model_kwargs: dict = None, encode_kwargs: dict = None):
        # pass model_name path or HF id
        super().__init__(model_name=model_name, model_kwargs=model_kwargs or {}, encode_kwargs=encode_kwargs or {})

    def embed_documents_with_prefix(self, texts: List[str], prefix: Optional[str] = None) -> List[List[float]]:
        # Wrapper around embed_documents to optionally add prefix like 'passage:'.
        # Returns list of embedding vectors.
        if prefix:
            texts = [f"{prefix}{t}" for t in texts]
        # embed_documents already returns list of vectors
        return super().embed_documents(texts)

def embed_batches(texts: List[str], model_name: str, batch_size: int = 64, device: Optional[str] = None, prefix: Optional[str] = None) -> List[List[float]]:
    # Batch embedding using LangChain HuggingFaceEmbeddings wrapper.
    # model_name may be a local path or HF model id.
    model_kwargs = {}
    encode_kwargs = {}
    if device:
        model_kwargs['device'] = device
        encode_kwargs['device'] = device

    emb = E5LocalEmbeddings(model_name=model_name, model_kwargs=model_kwargs, encode_kwargs=encode_kwargs)
    embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i:i+batch_size]
        embs = emb.embed_documents_with_prefix(batch, prefix=prefix)
        embeddings.extend(embs)
        
    return embeddings

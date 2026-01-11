import argparse, json, os, sys, re
from langchain_community.vectorstores import FAISS
from chunker import E5LocalEmbeddings  # gunakan embedder yang sama
import traceback

DB_PATH = os.environ.get("RAG_DB_PATH", r"C:/Users/PIPP/Documents/TutorDek/TutorCerdas/server/vectors/db_faiss_0")
EMB_MODEL = os.environ.get("RAG_EMB_MODEL", r"C:/Users/PIPP/Documents/TutorDek/TutorCerdas/server/PretrainedModel/multilingual-e5-large")
EMB_PREFIX = os.environ.get("EMB_QUERY_PREFIX", "query: ") 

def clean_query(q: str) -> str:
    if not q:
        return ""
    q = q.replace("\n", " ").strip()
    q = re.sub(r"\s+", " ", q)
    return q.strip()

def load_vs():
    emb_path = os.path.abspath(EMB_MODEL).replace("\\", "/")
    sys.stderr.write(f"📁 Loading embedding model from: {emb_path}\n")

    emb = E5LocalEmbeddings(
        model_name=emb_path,
        model_kwargs={"device": "cuda"},
        encode_kwargs={"device": "cuda"}
    )

    try:
        vs = FAISS.load_local(DB_PATH, emb, allow_dangerous_deserialization=True)
    except Exception as e:
        traceback.print_exc()
        err_json = json.dumps({"error": f"Cannot load FAISS: {e}"}, ensure_ascii=False)
        sys.stdout.buffer.write(err_json.encode("utf-8"))
        sys.exit(1)

    return vs, emb

def safe_mmr_search(vs, query, k):
    try:
        return vs.max_marginal_relevance_search_with_score(query, k=k, fetch_k=20)
    except:
        try:
            raw_docs = vs.max_marginal_relevance_search(query, k=k, fetch_k=20)
            return [(d, 0.0) for d in raw_docs]
        except:
            return []

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--query", required=True)
    ap.add_argument("--k", type=int, default=2)
    args = ap.parse_args()

    vs, emb = load_vs()

    query = clean_query(args.query)
    query_prefixed = EMB_PREFIX + query   # penting untuk E5 models

    docs_scores = safe_mmr_search(vs, query_prefixed, args.k)

    results = []
    for d, score in docs_scores:
        results.append({
            "page_content": d.page_content or "",
            "score": float(score),
            "metadata": d.metadata if isinstance(d.metadata, dict) else {},
        })

    json_out = json.dumps({"results": results}, ensure_ascii=False)
    sys.stdout.buffer.write(json_out.encode("utf-8"))

if __name__ == "__main__":
    main()

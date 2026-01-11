import argparse, json, os, sys, re
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings

# sesuaikan DB_PATH jika perlu
# DB_PATH = r"d:\Skripsi\AvatarPage\server\vectors\db_faiss"
# DB_PATH = os.environ.get("RAG_DB_PATH", r"d:Skripsi\Upload\TutorCerdas\server\vectors\db_faiss")
# EMB_MODEL = os.environ.get("RAG_EMB_MODEL", r"D:/Skripsi/Upload/TutorCerdas/server/PretrainedModel/all-MiniLM-L6-v2")  
DB_PATH = os.environ.get("RAG_DB_PATH", r"C:/Users/PIPP/Documents/TutorDek/TutorCerdas/server/vectors/db_faiss_0")
EMB_MODEL = os.environ.get("RAG_EMB_MODEL", r"C:/Users/PIPP/Documents/TutorDek/TutorCerdas/server/PretrainedModel/multilingual-e5-large")  

def clean_query(q: str) -> str:
    if not q:
        return ""
    q = q.replace("\n", " ").strip()
    q = re.sub(r"\s+", " ", q)
    return q

def load_vs():
    emb_path = os.path.abspath(EMB_MODEL).replace("\\", "/")
    print(f"📁 Loading embedding model from: {emb_path}", file=sys.stderr)
    # emb = HuggingFaceEmbeddings(model_name=emb_path)
    emb = HuggingFaceEmbeddings(
        model_name=emb_path,
        model_kwargs={"device": "cuda"}
    )

    try:
        vs = FAISS.load_local(DB_PATH, emb, allow_dangerous_deserialization=True)
    except Exception as e:
        err_json = json.dumps({"error": f"Cannot load FAISS: {e}"}, ensure_ascii=False)
        sys.stdout.buffer.write(err_json.encode("utf-8"))
        sys.exit(1)

    return vs

def safe_mmr_search(vs, query, k):
    try:
        docs_scores = vs.max_marginal_relevance_search_with_score(
            query, k=k, fetch_k=20
        )
        return docs_scores
    except:
        try:
            raw_docs = vs.max_marginal_relevance_search(
                query, k=k, fetch_k=20
            )
            return [(d, 0.0) for d in raw_docs]
        except:
            return []

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--query", required=True)
    ap.add_argument("--k", type=int, default=4)
    args = ap.parse_args()

    vs = load_vs()
    query = clean_query(args.query)

    docs_scores = safe_mmr_search(vs, query, args.k)

    # try:
    #     docs_scores = vs.max_marginal_relevance_search_with_score(
    #         query, k=args.k, fetch_k=20
    #     )
    # except:
    #     # fallback if FAISS version doesn't support _with_score
    #     raw_docs = vs.max_marginal_relevance_search(query, k=args.k, fetch_k=20)
    #     docs_scores = [(d, 0.0) for d in raw_docs]

    out = []
    for d, score in docs_scores:
        out.append({
            "page_content": d.page_content or "",
            "score": float(score),
            "metadata": d.metadata if isinstance(d.metadata, dict) else {},
        })

    result_json = json.dumps({"results": out}, ensure_ascii=False)

    try:
        sys.stdout.buffer.write(result_json.encode("utf-8"))
    except Exception:
        sys.stdout.write(result_json)

if __name__ == "__main__":
    main()

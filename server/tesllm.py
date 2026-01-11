import requests
import json

url = "http://localhost:11434/api/chat"

payload = {
    "model": "hf.co/ojisetyawan/llama3-8b-cpt-sahabatai-v1-instruct-Q4_K_M-GGUF",
    "messages": [
        {"role": "user", "content": "Kamu model apa dan punya knowledge apa aja?"}
    ],
    "stream": False
}

resp = requests.post(url, json=payload)
data = resp.json()

print(data["message"]["content"])

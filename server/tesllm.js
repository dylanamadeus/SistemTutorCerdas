import { LlamaCpp } from "@langchain/community/llms/llama_cpp";
import path from "path";

// Path ke model lokal
const modelPath = path.join(
  "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/server/PretrainedModel/gemma2-9b-cpt-sahabatai-v1-instruct.Q4_K_M.gguf"
);

// Inisialisasi LLM lokal
const llm = new LlamaCpp({
  modelPath,
  temperature: 0.6,
  maxTokens: 800,
});

// Contoh pemanggilan sederhana
const response = await llm.call("Halo, siapa kamu?");
console.log(response);

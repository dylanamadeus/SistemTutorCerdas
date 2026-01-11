import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { exec, execFile as execFileCb } from "child_process";
import { promises as fs } from "fs";
import fsSync from "fs";
import dotenv from "dotenv";
import voice from "elevenlabs-node";
// import { GoogleGenerativeAI } from "@google/generative-ai";
import { execFile, execSync } from "child_process";

dotenv.config();

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rhubarbPath =
  // "D:\\Skripsi\\Upload\\TutorCerdas\\Rhubarb-Lip-Sync-1.14.0-Windows\\rhubarb.exe";
  "C:\\Users\\PIPP\\Documents\\TutorDek\\TutorCerdas\\Rhubarb-Lip-Sync-1.14.0-Windows\\rhubarb.exe";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const geminiModel = genAI.getGenerativeModel({
//   model: "gemini-2.5-flash",
//   systemInstruction: `
//     You are an AI Tutor that helps user to study in college named "MISS HELEN". Never mention or imply any model/provider.
//     If user wants to chit chat with you, you can answer. If user talking about education, you can answer.
//     You prefer to use 'Aku' as I and 'Kamu' as You. If there are no related answers in the context, you CAN NOT answer based on your knowledge, JUST SAY "Maaf aku belum bisa jawab terkait hal itu, karena hal itu ga ada di materi belajar".

//     FORMAT:
//     - Output ONLY one JSON object with "messages": array of 1–2 items. No extra text.
//     - Each item MUST have:
//       - "text": Bahasa Indonesia, informatif, mengalir alami antar kalimat jika lebih dari satu item, hindari pengulangan. Gaya percakapan yang ramah dan jelas. Tetap padat penyampaiannya.
//       - "facialExpression": salah satu dari ["smile","sad","angry","surprised","funnyFace","default"] dan harus sesuai dengan nada kalimat.
//       - "animation": salah satu dari ["Talking_1","Talking_2","Crying","Laughing","Rumba","Idle","Terrified","Angry"]. Jika ada lebih dari satu item, buat variasi animasi agar lebih hidup namun tetap sesuai konteks (misalnya buka dengan Talking_1, lanjut Talking_2).
//   `,
// });

const SYSTEM_PROMPT = `
Kamu adalah 'MISS HELEN', seorang Tutor Cerdas yang berperan sebagai pembimbing belajar. Jangan pernah menyebutkan model, provider, atau cara kerjamu.
Gunakan sapaan 'Aku' dan 'Kamu'.  
Fokus utama: membantu memahami materi, membimbing langkah demi langkah, memberi contoh sederhana, dan menuntun proses berpikir.  
Jika topiknya masih berkaitan dengan pembelajaran atau percakapan ringan, jawab dengan nada ramah dan jelas.
Jawablah hanya menggunakan informasi dalam KONTEKS.
Jika jawaban tidak tersedia di KONTEKS, kamu wajib menjawab:
"Maaf aku belum bisa jawab terkait hal itu, karena hal itu ga ada di materi belajar".

Kamu dilarang total menggunakan pengetahuan lain.

SANGAT PENTING:
Output HARUS berupa SATU objek JSON SAJA.
TIDAK BOLEH ada teks di luar JSON.
TIDAK BOLEH ada penjelasan tambahan, simbol, kode, label, atau karakter lain sebelum atau sesudah JSON.
TIDAK BOLEH ada newline di luar JSON.

FORMAT WAJIB:
{"messages":[
  {
    "text":"<jawaban dalam Bahasa Indonesia, natural, singkat, tidak mengulang frasa>",
    "facialExpression":"smile|sad|angry|surprised|funnyFace|default",
    "animation":"Talking_1|Crying|Laughing|Rumba|Terrified|Angry"
  }
]}

Jangan membuat animation atau facialExpression diluar pilihan yang disediakan.
Pastikan JSON valid 100%, tanpa trailing text.
JIKA kamu harus menolak, tetap keluarkan JSON dengan kalimat penolakan tersebut sebagai "text".
`;

function answerUsesContext(answer, context, threshold = 0.5) {
  if (!answer || !context) return false;

  // Stopwords Indonesia + Inggris
  const stopwords = new Set([
    "yang","dan","atau","dengan","untuk","pada","dari","karena","agar","jika",
    "seperti","dalam","itu","ini","jadi","ke","di","sebuah","adalah","adalah",
    "the","and","for","with","from","this","that","into","onto","your","have",
    "has","been","was","were","are","you","but","not","can","will","should",
    "they","them","their","there","here","then","than","also","just","only"
  ]);

  const clean = (t) =>
    t
      .toLowerCase()
      .replace(/[^\p{L}\p{N} ]/gu, " ")
      .split(/\s+/)
      .filter(w => w.length > 3 && !stopwords.has(w));

  const answerWords = clean(answer);
  const contextWords = new Set(clean(context));

  if (answerWords.length === 0) return false;

  // Hitung berapa kata yang bener-bener nyambung
  let matchCount = 0;
  answerWords.forEach(w => {
    if (contextWords.has(w)) matchCount++;
  });

  // Skor kemiripan
  const score = matchCount / answerWords.length;

  console.log("Relevance score:", score);

  return score >= threshold;
}

const execCommand = (command) =>
  new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) return reject(Object.assign(error, { stderr }));
      resolve(stdout);
    });
  });

const execFilePromise = (cmd, args, opts = {}) =>
  new Promise((resolve, reject) => {
    execFileCb(cmd, args, opts, (err, stdout, stderr) => {
      if (err) return reject(Object.assign(err, { stdout, stderr }));
      resolve({ stdout, stderr });
    });
  });

const retrieveContext = (query, k = 4, id = "default") => {
  return new Promise((resolve) => {
    const py = path.resolve(__dirname, "../rag.py");
    const args = ["--query", query, "--k", String(k)];
    
    // Buat DB path dinamis per id
    const dbPath = `vectors/db_faiss_${id}`;
    
    const env = {
      ...process.env,
      RAG_DB_PATH: dbPath,
      // RAG_EMB_MODEL: "D:/Skripsi/Upload/TutorCerdas/server/PretrainedModel/all-MiniLM-L6-v2",
      RAG_EMB_MODEL: "C:/Users/PIPP/Documents/TutorDek/TutorCerdas/server/PretrainedModel/multilingual-e5-large",
      PYTHONIOENCODING: "utf-8",
    };
    
    execFileCb(
      // "C:/Users/dylan/AppData/Local/Microsoft/WindowsApps/python3.11.exe",
      "python",
      [py, ...args],
      { env, maxBuffer: 10 * 1024 * 1024 },
      (err, stdout, stderr) => {
        if (err) {
          console.error("Retriever error:", err);
          if (stderr) console.error("Python stderr:", stderr.toString());
          return resolve([]);
        }
        
        const raw =
          (stdout && stdout.toString().trim()) ||
          (stderr && stderr.toString().trim()) ||
          "";
          
        try {
          const parsed = JSON.parse(raw);
          const results = parsed.results || [];

          console.log(`📚 Working on RAG on DB: ${dbPath}`);
          console.log("🔍 Retrieved Context:");

          results.forEach((item, index) => {
            console.log(`\n🧩 Chunk #${index + 1}`);
            console.log("Source:", item.source || item.metadata?.source || "(unknown)");
            console.log("Content:", item.content || item.page_content || "(empty)");
          });

          resolve(results);
        } catch (e) {
          console.error("Retriever parse error:", e);
          return resolve([]);
        }
      }
    );
  });
};

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

const lipSyncMessage = async (message, inputAudioPath) => {
  const time = new Date().getTime();
  const input = inputAudioPath || `audios/message_${message}.wav`;
  const wavPath = `audios/message_${message}.wav`;

  if (!fsSync.existsSync(input))
    throw new Error(`Input audio not found: ${input}`);
  // await execCommand(`"${rhubarbPath}" -f json -o "audios/message_${message}.json" "${wavPath}" -r phonetic`);
  await new Promise((resolve, reject) => {
    execFile(
      rhubarbPath,
      ["-f", "json", "-o", jsonPath, wavPath, "-r", "phonetic"],
      (err, stdout, stderr) => {
        if (err) {
          console.error("Lip sync error:", err);
          return reject(err);
        }
        resolve(stdout);
      }
    );
  });

  console.log(`Lip sync for message_${message} done`);

  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};

// --- ROUTES ---
router.get("/", (req, res) => {
  res.send("Tutor route active");
});

router.post("/chat/:id", async (req, res) => {
//   const { id } = req.params; 
//   const userMessage = req.body.message;

//   const ctx = await retrieveContext(userMessage, 4, id);  
//   const contextText = ctx
//     .map((c, i) => `[#${i + 1}] ${c.page_content}`.slice(0, 1200))
//     .join("\n");

//   const prompt = `KONTEKS:
// ${contextText}
// PERTANYAAN:
// ${userMessage}`;

//   const result = await geminiModel.generateContent({
//     contents: [{ role: "user", parts: [{ text: prompt }] }],
//     generationConfig: {
//       temperature: 0.6,
//       maxOutputTokens: 1000,
//       responseMimeType: "application/json",
//     },
//   });

//   const rawText = result.response.text?.();
//   console.log("Gemini raw:", rawText);

//   let parsed = JSON.parse(rawText);
//   let messages = parsed.messages || [parsed];

  const { id } = req.params;
  const userMessage = req.body.message;

  // --- RAG ---
  const ctx = await retrieveContext(userMessage, 4, id);
  const contextText = ctx
    .map((c, i) => `[#${i + 1}] ${c.page_content}`.slice(0, 1200))
    .join("\n");

  // --- LLM via Ollama ---
  const ollamaResponse = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "hf.co/ojisetyawan/llama3-8b-cpt-sahabatai-v1-instruct-Q4_K_M-GGUF",
      prompt: `${SYSTEM_PROMPT}

KONTEKS:
${contextText}

PERTANYAAN:
${userMessage}
      `,
      stream: false,
      format: "json",
      options: { temperature: 0.6 },
    }),
  });

  const resultJson = await ollamaResponse.json();
  console.log("\nOllama LLM raw:", resultJson.response);
  let raw = resultJson.response;
  if (!answerUsesContext(raw, contextText, 0.14)) {
    console.log("❗Jawaban tidak sesuai konteks, diganti fallback.");
    raw = `{
      "messages":[
        {
          "text":"Maaf aku belum bisa jawab terkait hal itu, karena hal itu ga ada di materi belajar",
          "facialExpression":"sad",
          "animation":"Talking_1"
        }
      ]
    }`;
  }

  // cari posisi awal dan akhir JSON
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}") + 1;

  if (start === -1 || end === -1) {
    console.error("❌ JSON not found in Ollama response");
    return res.status(500).send({ error: "Response format error" });
  }

  const jsonString = raw.slice(start, end).trim();

  let parsed;
  try {
    let safeJson = jsonString

    parsed = JSON.parse(safeJson);
    // parsed = JSON.parse(jsonString);
  } catch (error) {
    console.error("❌ Error parsing Ollama output:", error);
    return res.status(500).send({ error: "Response format error" });
  }

  let messages = parsed.messages || [parsed];

  // const py = path.resolve(__dirname, "../tts_generate.py");
  // console.log("Running tts_generate.py:", py);

  const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
  const voiceID = "iWydkXKoiVtvdn4vLKp9";
  // const voiceID = "gjhfBUoH6DHh0DG1X4u0";

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const mp3File = `audios/message_${i}.mp3`;
    const wavFile = `audios/message_${i}.wav`;
    const jsonPath = `audios/message_${i}.json`;

    // === 1. Eleven Labs TTS (MP3 output) ===
    try {
      console.log(`🔊 Generating TTS (MP3) with Eleven Labs for message_${i}...`);
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`,
        {
          method: "POST",
          headers: {
            "xi-api-key": elevenLabsApiKey,
            "Content-Type": "application/json",
            Accept: "audio/mpeg", // <-- penting: ambil MP3
          },
          body: JSON.stringify({
            text: message.text,
            model_id: "eleven_multilingual_v2",
            voice_settings: {
              stability: 0.4,
              similarity_boost: 0.9,
              style: 0.4,
              use_speaker_boost: true,
            },
          }),
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Eleven Labs TTS failed: ${response.status} - ${errText}`);
      }

      const buffer = Buffer.from(await response.arrayBuffer());
      fsSync.writeFileSync(mp3File, buffer);
      console.log(`✅ Eleven Labs TTS saved: ${mp3File}`);
    } catch (err) {
      console.error("❌ Eleven Labs TTS error:", err);
      continue; // skip ke message berikutnya
    }

    // === 2. Convert MP3 → WAV PCM 16-bit mono ===
    console.log("🎧 Converting MP3 to PCM WAV...");
    try {
      execSync(
        `ffmpeg -y -i "${mp3File}" -acodec pcm_s16le -ac 1 -ar 44100 "${wavFile}"`,
        { stdio: "ignore" }
      );
      console.log("✅ Converted to PCM WAV:", wavFile);
    } catch (err) {
      console.error("❌ Error converting MP3 to WAV:", err);
      continue;
    }

    // === 3. Generate lipsync via Rhubarb ===
    try {
      console.log("🗣️ Generating lipsync JSON...");
      await new Promise((resolve, reject) => {
        execFile(
          rhubarbPath,
          ["-f", "json", "-o", jsonPath, wavFile, "-r", "phonetic"],
          (err, stdout, stderr) => {
            if (err) {
              console.error("❌ Rhubarb error:", stderr);
              return reject(err);
            }
            console.log("✅ Rhubarb JSON generated:", jsonPath);
            resolve(stdout);
          }
        );
      });
    } catch (err) {
      console.error("❌ Rhubarb failed:", err);
      continue;
    }

    // === 4. Attach to message ===
    message.audio = await audioFileToBase64(wavFile);
    message.lipsync = await readJsonTranscript(jsonPath);
  }

  res.send({ messages });
});

export default router;

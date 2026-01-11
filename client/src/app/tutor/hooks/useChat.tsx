"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { useParams } from 'next/navigation';

// Ganti sesuai environment variable kamu (Vite → React pakai import.meta.env)
const backendUrl =
  (import.meta as any).env?.VITE_API_URL || "http://localhost:5000";

// --- Type definitions ---
interface Message {
  text: string;
  facialExpression?: string;
  animation?: string;
  audio?: string; // Base64 audio dari backend
  lipsync?: any; // JSON Rhubarb (kalau mau animasi bibir nanti)
}


interface ChatContextType {
  chat: (message: string) => Promise<void>;
  message: Message | null;
  onMessagePlayed: () => void;
  loading: boolean;
  cameraZoomed: boolean;
  setCameraZoomed: React.Dispatch<React.SetStateAction<boolean>>;
}

// --- Context creation ---
const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  // Fungsi chat ke backend
  const chat = async (userMessage: string) => {
    setLoading(true);
    try {
      const res = await fetch(`${backendUrl}/tutor/chat/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await res.json();
      const resp: Message[] = data.messages || [];
      setMessages((prev) => [...prev, ...resp]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  const onMessagePlayed = () => {
    setMessages((prev) => prev.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  // useEffect(() => {
  //   if (message?.audio) {
  //     try {
  //       // Konversi Base64 → blob audio
  //       const audioSrc = `data:audio/wav;base64,${message.audio}`;
  //       const audio = new Audio(audioSrc);

  //       audio.play()
  //         .then(() => console.log("Audio started"))
  //         .catch((err) => console.warn("Audio play error:", err));

  //       // Setelah audio selesai → trigger onMessagePlayed
  //       audio.onended = () => {
  //         onMessagePlayed();
  //       };
  //     } catch (err) {
  //       console.error("Failed to play audio:", err);
  //     }
  //   }
  // }, [message]);


  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// --- Custom Hook ---
export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

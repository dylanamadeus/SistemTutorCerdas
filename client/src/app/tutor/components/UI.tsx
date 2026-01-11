"use client";

import React, { useRef } from "react";
import { useChat } from "../hooks/useChat";

interface UIProps extends React.HTMLAttributes<HTMLDivElement> {
  hidden?: boolean;
}

export const UI: React.FC<UIProps> = ({ hidden, ...props }) => {
  const input = useRef<HTMLInputElement>(null);
  const { chat, loading, cameraZoomed, setCameraZoomed, message } = useChat();

  const sendMessage = () => {
    const text = input.current?.value || "";
    if (!loading && !message && text.trim() !== "") {
      chat(text);
      if (input.current) input.current.value = "";
    }
  };

  if (hidden) return null;

  return (
    <>
      {/* Background gradient (tema Tutor Cerdas) */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-[#FFFFFF] to-[#FEF3E2]" />

      {/* Optional subtle pattern glow */}
      <div className="fixed inset-0 -z-10 opacity-30 [background:radial-gradient(60rem_60rem_at_30%_10%,_#ffffff55,_transparent_60%)]" />

      <div
        className="fixed inset-0 z-10 flex flex-col justify-between p-4 pointer-events-none"
        {...props}
      >
        

        {/* Action FABs (kanan) */}
        <div className="w-full flex flex-col items-end justify-center gap-3 mt-16">
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-[#ffac22] hover:bg-[#ff9900] text-[#5a2b00] p-4 rounded-xl shadow-lg shadow-[#ffac22]/30 ring-1 ring-white/50 transition"
            aria-label="Toggle camera zoom"
            title="Toggle camera zoom"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.75}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-md w-full mx-auto">
          <input
            ref={input}
            className="w-full p-4 rounded-xl bg-white/70 backdrop-blur-xl ring-1 ring-[#ffac22]/30 placeholder:text-[#7a4a12] text-[#5a2b00] shadow-md shadow-[#ffac22]/20 focus:outline-none focus:ring-2 focus:ring-[#ff9900] transition"
            placeholder="Ketik pertanyaan Anda..."
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <button
            disabled={loading || !!message}
            onClick={sendMessage}
            className={`uppercase font-semibold p-4 px-8 rounded-xl text-[#5a2b00] bg-[#ffac22] hover:bg-[#ff9900] ring-1 ring-white/50 shadow-lg shadow-[#ffac22]/30 transition ${
              loading || message ? "cursor-not-allowed opacity-40" : ""
            }`}
            aria-disabled={loading || !!message}
            aria-label="Send message"
            title="Kirim pesan"
          >
            {loading ? "Mengirim..." : "Kirim"}
          </button>
        </div>
      </div>
    </>
  );
};

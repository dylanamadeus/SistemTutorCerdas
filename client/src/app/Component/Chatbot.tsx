'use client';
import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/app/Component/navbar';
import { Footer } from '@/app/Component/Footer';
import { motion } from 'framer-motion';
import { fadeIn } from '../variant';

type ChatMessage = {
  sender: "user" | "bot" | "loading";
  text: string;
};

const ChatbotPage = (): JSX.Element => {
  const [text, setText] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = 'Supports';
    const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement | null;
    
    if (favicon) {
      favicon.href = '/footer.png';
    } else {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = '/footer.png';
      document.head.appendChild(link);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setErrorMessage("");

    // Save user message first
    setChatHistory((prev) => [...prev, { sender: "user", text }, { sender: "loading", text: "Safeena sedang mengetik..." }]);

    try {
      const res = await fetch("/Chatbot/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Something went wrong");
      }

      const { botResponse } = await res.json();

      // Replace the loading bubble with actual bot response
      setChatHistory((prev) => {
        const newHistory = [...prev];
        // Remove last loading message
        newHistory.pop();
        // Add bot's real answer
        newHistory.push({ sender: "bot", text: botResponse });
        return newHistory;
      });

      setText("");
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Failed to get response");

      // Remove loading bubble if error
      setChatHistory((prev) => {
        const newHistory = [...prev];
        if (newHistory.length > 0 && newHistory[newHistory.length - 1].sender === "loading") {
          newHistory.pop();
        }
        return newHistory;
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <div className="relative min-h-screen w-full flex flex-col">
      {/* Gradient Background */}
      <div
        className="absolute -left-[7px] top-0 -z-10 w-full h-full"
        style={{
          background:
            'linear-gradient(140.63deg, #FFFFFF 0%, #AABFD3 72.78%, #337BBF 96.96%)',
        }}
      />

      <Navbar />

      <main className="flex-grow">
        <div className="max-w-[1440px] mx-auto px-4 md:px-20 lg:px-20 py-20 md:py-20 lg:py-32">
          <section>
            <motion.div 
            variants={fadeIn('down', 0.1)}
            initial='hidden'
            whileInView={'show'}
            viewport={{once: false, amount: 0.7}}
            className="max-w-[800px] mx-auto bg-white rounded-[15px] p-6 md:p-10 shadow-xl flex flex-col h-[80vh]">
              <motion.h1
              variants={fadeIn('down', 0.1)}
              initial='hidden'
              whileInView={'show'}
              viewport={{once: false, amount: 0.7}}
              className="font-bold text-3xl text-center text-[#334fb4] mb-6">
                Berbincang dengan  Safeena!
              </motion.h1>

              {/* Chat messages area */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-6 p-2">
                {chatHistory.length === 0 ? (
                  <motion.div 
                  variants={fadeIn('up', 0.1)}
                  initial='hidden'
                  whileInView={'show'}
                  viewport={{once: false, amount: 0.7}}
                  className="text-center text-gray-500 mt-10">
                    Mulai ngobrol dengan Safeena 💬
                  </motion.div>
                ) : (
                  chatHistory.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] p-3 rounded-2xl ${
                          msg.sender === "user"
                            ? "bg-[#337bbf] text-white rounded-br-none"
                            : msg.sender === "loading"
                            ? "bg-gray-100 text-gray-400 italic rounded-bl-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))
                )}
                {/* This is the bottom anchor for auto-scroll */}
                {/* <div ref={bottomRef} /> */}
              </div>

              {/* Input form */}
              <form onSubmit={handleSubmit} className="flex items-center">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="flex-1 p-3 rounded-lg border border-[#ccc] focus:outline-none focus:ring-2 focus:ring-[#337bbf]"
                  placeholder="Tanya aku apa saja..."
                />
                <button
                  type="submit"
                  className="ml-4 bg-[#337bbf] hover:bg-[#285a8c] text-white p-3 rounded-lg transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? "Berpikir..." : "Tanya"}
                </button>
              </form>

              {/* Error message */}
              {errorMessage && (
                <div className="text-red-500 text-center mt-4">{errorMessage}</div>
              )}
            </motion.div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ChatbotPage;

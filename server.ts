import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

import { portfolioData } from "./src/data/portfolio";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Chat API Route
  app.post("/api/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Invalid messages array" });
      }

      // Convert history to format expected by Gemini Chat
      const history = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const lastMessage = messages[messages.length - 1];

      const chat = ai.chats.create({
        model: "gemini-3.6-flash",
        history: history,
        config: {
          systemInstruction:
            `You are Burra Koushil's AI assistant. You help visitors learn more about Burra, his projects, skills, and experience. You act professional, polite, and helpful. You should sound like a knowledgeable developer.\n\nHere is all the info about Burra: ${JSON.stringify(portfolioData)}`,
          tools: [{ googleSearch: {} }],
        },
      });

      const response = await chat.sendMessage({ message: lastMessage.content });

      res.json({
        content: response.text,
        role: "assistant",
      });
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: "Failed to generate response", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

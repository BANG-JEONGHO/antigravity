/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());
  const PORT = 3000;

  // Lazy initialize GoogleGenAI to prevent crashing if GEMINI_API_KEY is not set immediately
  let ai: GoogleGenAI | null = null;
  const getAiClient = () => {
    if (!ai) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey) {
        ai = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            }
          }
        });
      }
    }
    return ai;
  };

  // API routes first
  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) {
        return res.status(400).json({ error: "질문 내용이 필요합니다." });
      }

      const client = getAiClient();
      if (!client) {
        return res.json({
          response: "현재 시스템의 Gemini API Key가 연동되지 않았습니다. AI 튜터와 실시간 질의응답을 하려면 Secrets 설정에 GEMINI_API_KEY를 등록해 주세요! \n\n(참고: 오프라인 모드에서는 화면 하단의 내장 퀴즈, 로드맵, 사전을 활용해 유익한 공부를 먼저 즐기실 수 있습니다!)"
        });
      }

      const systemInstruction = `
우아하고 품격 있는 '반도체 배움터 AI 튜터'입니다.
대학의 반도체 품질 관리(Semiconductor Quality Management) 강의를 듣는 대학생(초보자)들의 눈높이에 맞춰 친절하고 유익하게 반도체 제조 공정과 품질 관리 지식을 가르쳐 주세요.
답변할 때의 핵심 규칙:
1. 격려하고 존중하는 존댓말 어조를 일관되게 사용하십시오. (예: "~입니다.", "~해보실까요?", "~와 같답니다.")
2. 어려운 과학, 물리, 화학 용어(예: 플라즈마, 이방성 식각, 이온 충돌 등)가 나올 때는 실생활의 재미있고 생생한 비유(가래떡 뽑기, 샌드위치 만들기, 도장 파기, 사포질 등)를 아낌없이 사용해 주십시오.
3. 품질 관리(수율 개선, 불량 분석, SPC 통계 제어 및 UCL/LCL 한계선 관리)가 왜 중요한지 답변 곳곳에 함께 부각시켜 교육적 깊이를 전하십시오.
4. 가독성을 높이기 위해 마크다운 줄바꿈과 이모지, 글머리 기호(bullet points)를 세련되게 디자인하여 답해주십시오.
5. 모든 답변은 한국어로만 작성해 주십시오.
      `;

      const modelsToTry = [
        "gemini-2.5-flash",
        "gemini-1.5-flash",
        "gemini-2.5-pro",
        "gemini-3.5-flash",
        "gemini-3.1-flash-lite"
      ];

      let response = null;
      let lastError = null;

      for (const modelName of modelsToTry) {
        try {
          response = await client.models.generateContent({
            model: modelName,
            contents: message,
            config: {
              systemInstruction: systemInstruction,
              temperature: 0.7,
            },
          });
          if (response && response.text) {
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed:`, err.message || err);
          lastError = err;
        }
      }

      if (!response || !response.text) {
        throw lastError || new Error("모든 AI 모델이 현재 혼잡 상태입니다. 잠시 후 다시 시도해 주세요.");
      }

      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Gemini API error:", error);
      res.status(500).json({ error: "AI 튜터 서버 오류가 발생했습니다: " + error.message });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

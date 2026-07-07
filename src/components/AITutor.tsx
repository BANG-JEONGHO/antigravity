/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Cpu, Send, RefreshCw, AlertCircle, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function AITutor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: "안녕하세요! 대학교 반도체 제조 및 품질 관리 과정을 함께 공부하는 **반도체 배움터 AI 튜터**입니다. 🎓🤖\n\n8대 반도체 공정, 수율 향상 이론, 그리고 통계적 공정 제어(SPC)에 대해 궁금한 점이 있으시다면 언제든 편하게 물어보세요! 실생활 비유와 함께 쉽고 완벽하게 설명해 드릴게요. \n\n*예: '포토리소그래피 공정을 빵집에 비유해 줘!', 'UCL, LCL이 왜 중요한가요?'*",
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (textToSend?: string) => {
    const msgText = (textToSend || input).trim();
    if (!msgText) return;

    if (!textToSend) setInput('');
    setErrorMsg(null);

    // Add user message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: msgText,
      timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msgText })
      });

      if (!response.ok) {
        throw new Error('서버 통신 오류가 발생했습니다.');
      }

      const data = await response.json();
      
      const botMsg: ChatMessage = {
        id: `msg-${Date.now()}-bot`,
        sender: 'bot',
        text: data.response || "죄송합니다, 답변을 생성하지 못했습니다.",
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('AI 튜터와 통신에 실패했습니다. API 키 구성을 확인하시거나 나중에 다시 시도해 주십시오.');
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'bot',
        text: "대화방을 청소했습니다! 새로운 궁금증이 생기셨다면 다시 물어보세요. 8대 공정 및 통계적 수율 관리의 마스터가 되는 길을 늘 응원합니다! 👍",
        timestamp: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMsg(null);
  };

  // Preset suggested questions for beginners
  const suggestedQueries = [
    "포토리소그래피 공정을 쉽게 설명해 줘",
    "수율(Yield) 개선은 왜 반도체에서 생명이야?",
    "SPC에서 한계도선 UCL, LCL의 의미가 뭐야?",
    "반도체 불량률을 줄이려면 먼지(파티클)를 어떻게 통제해?"
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-6 flex flex-col h-[calc(100vh-8rem)]">
        
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 shrink-0">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center">
              <Cpu className="h-5 w-5 mr-2 text-blue-500 animate-pulse" />
              실시간 AI 반도체 튜터 Q&A
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Gemini가 품질 관리 입문을 위해 1:1 맞춤형 피드백을 제공합니다.</p>
          </div>
          
          <button
            onClick={clearChat}
            className="flex items-center space-x-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900"
            id="clear-chat-btn"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>대화 리셋</span>
          </button>
        </div>

        {/* Message bubble chat box */}
        <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 space-y-4 shadow-inner min-h-0" id="chat-messages-container">
          {messages.map((msg) => {
            const isBot = msg.sender === 'bot';
            return (
              <div
                key={msg.id}
                className={`flex ${isBot ? 'justify-start' : 'justify-end'}`}
                id={`chat-bubble-${msg.id}`}
              >
                <div 
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                    isBot
                      ? 'bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-300 font-medium'
                      : 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/10'
                  }`}
                >
                  {/* Handle markdown bold formatting nicely */}
                  <div className="whitespace-pre-line">
                    {msg.text.split('**').map((part, index) => 
                      index % 2 === 1 ? <strong key={index} className={isBot ? "text-blue-600 dark:text-blue-400 font-extrabold" : "text-amber-300 font-extrabold"}>{part}</strong> : part
                    )}
                  </div>
                  
                  <div className={`mt-2 text-[9px] ${isBot ? 'text-slate-400' : 'text-blue-200'} text-right`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Loading bubble */}
          {loading && (
            <div className="flex justify-start" id="ai-loading-indicator">
              <div className="max-w-[80%] rounded-2xl bg-slate-50 px-4 py-3 text-xs text-slate-400 dark:bg-slate-900/60 flex items-center space-x-2">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span>AI 튜터가 비유를 활용해 답변을 정리 중입니다...</span>
              </div>
            </div>
          )}

          {/* Error notice */}
          {errorMsg && (
            <div className="rounded-xl border border-red-100 bg-red-50 p-3.5 text-xs text-red-700 flex items-start space-x-2 dark:border-red-950/20 dark:bg-red-950/10 dark:text-red-400">
              <AlertCircle className="h-4.5 w-4.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Questions Area */}
        {messages.length === 1 && !loading && (
          <div className="space-y-2 shrink-0">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider flex items-center">
              <HelpCircle className="h-3.5 w-3.5 mr-1" />
              많이 묻는 추천 질문:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="suggested-queries-grid">
              {suggestedQueries.map((query, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(query)}
                  className="rounded-xl border border-slate-200 bg-white hover:border-blue-400 hover:bg-blue-50/20 px-3 py-2 text-left text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900 transition-colors font-semibold"
                >
                  💡 {query}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input box */}
        <div className="relative shrink-0 pt-2" id="chat-input-row">
          <input
            type="text"
            placeholder="AI 튜터에게 반도체 품질 관리 질문하기..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            disabled={loading}
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 pr-12 text-xs sm:text-sm text-slate-900 shadow-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white disabled:opacity-50"
            id="chat-text-input"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
            className="absolute right-2 top-4 flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white disabled:opacity-30 disabled:bg-slate-400 hover:bg-blue-700 dark:bg-blue-500"
            aria-label="Send message"
            id="chat-send-btn"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
}

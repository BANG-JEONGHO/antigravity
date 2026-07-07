/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Cpu, ArrowRight, Award, ShieldAlert, Sparkles, HelpCircle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  progressCount: number;
  totalSteps: number;
}

export default function Home({ setCurrentTab, progressCount, totalSteps }: HomeProps) {
  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-6"
          >
            <div className="inline-flex max-w-max items-center space-x-2 rounded-sm border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400">
              <Sparkles className="h-3.5 w-3.5" />
              <span>반도체 품질 관리 교육 시스템</span>
            </div>
            
            <h1 className="text-3xl font-black tracking-tight text-slate-800 dark:text-white sm:text-4xl md:text-5xl uppercase leading-tight">
              모래에서 칩까지,<br />
              <span className="bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent dark:from-blue-400 dark:to-cyan-400">
                반도체 8대 공정
              </span>과 수율의 과학
            </h1>
            
            <p className="text-sm text-slate-600 dark:text-slate-300 md:text-base leading-relaxed">
              본 시스템은 <strong>반도체 품질 관리(Quality Management)</strong>를 처음 배우는 대학생들을 위한 맞춤형 인터랙티브 학습 공간입니다. 어려운 나노 공정 이론을 일상의 직관적인 비유와 생생한 퀴즈를 통해 쉽고 깊게 정복해 보세요.
            </p>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setCurrentTab('roadmap')}
                className="group flex items-center justify-center space-x-2 rounded-sm bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-none hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500 transition-all duration-200"
              >
                <span>학습 시작하기 (로드맵)</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => setCurrentTab('quality')}
                className="flex items-center justify-center space-x-2 rounded-sm border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 transition-all duration-200"
              >
                <span>품질 관리 및 SPC 알아보기</span>
              </button>
            </div>

            {/* Quick stats / progress indicator */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-6 text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-bold">
              <div>
                <span className="font-black text-slate-900 dark:text-white text-lg">8대 공정</span> 완성
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
              <div>
                완료 진행률 <span className="font-black text-blue-600 dark:text-blue-400 text-lg">{progressCount} / {totalSteps}</span>
              </div>
            </div>
          </motion.div>

          {/* Interactive Hero Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center items-center"
          >
            <div className="relative overflow-hidden rounded-none border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 p-6 sm:p-8 shadow-sm w-full max-w-lg">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-900">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 bg-red-500 rounded-sm" />
                  <div className="h-3 w-3 bg-yellow-400 rounded-sm" />
                  <div className="h-3 w-3 bg-green-500 rounded-sm" />
                </div>
                <span className="text-xs font-mono text-slate-400">interactive_wafer_map.exe</span>
              </div>
              
              {/* Wafer Grid visual */}
              <div className="mt-6 flex flex-col items-center">
                <div className="relative h-56 w-56 rounded-full border-4 border-dashed border-blue-400/50 bg-slate-50 dark:bg-slate-900/40 p-4 flex items-center justify-center shadow-none">
                  {/* Flat zone notched wafer look */}
                  <div className="absolute bottom-0 h-4 w-20 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800" />
                  
                  {/* Grid of chips */}
                  <div className="grid grid-cols-6 gap-1 w-full h-full max-w-[80%] max-h-[80%]">
                    {Array.from({ length: 36 }).map((_, i) => {
                      // Simulating defective (red) vs good (blue) dies on a wafer
                      const isEdge = i % 6 === 0 || i % 6 === 5 || i < 6 || i > 30;
                      const isDefective = [14, 21, 28].includes(i); // Simulate defect pattern
                      return (
                        <div
                          key={i}
                          className={`rounded-none transition-all duration-500 ${
                            isEdge 
                              ? 'bg-transparent border-none' 
                              : isDefective 
                                ? 'bg-red-500 hover:bg-red-400 scale-95 shadow-none' 
                                : 'bg-blue-500 hover:bg-blue-400 shadow-none'
                          }`}
                          title={isEdge ? '' : isDefective ? '불량 다이 (Defect)' : '양품 다이 (Good)'}
                        />
                      );
                    })}
                  </div>
                </div>
                
                <div className="mt-6 text-center space-y-2">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    인터랙티브 웨이퍼 불량률 실시간 모니터링
                  </p>
                  <div className="flex items-center justify-center space-x-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    <span className="flex items-center"><span className="mr-1.5 h-2.5 w-2.5 bg-blue-500 rounded-none" />양품 (Good Die)</span>
                    <span className="flex items-center"><span className="mr-1.5 h-2.5 w-2.5 bg-red-500 rounded-none" />미세 불량 (Defect)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Introduction to Semiconductors Section */}
        <div className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-black text-slate-800 dark:text-white sm:text-3xl uppercase tracking-tight">
              반도체란 무엇이며, 왜 품질 관리가 생명일까요?
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              일상의 모든 스마트 전자기기에는 전기의 흐름을 통제해 복잡한 계산을 수행하는 손톱 크기의 실리콘 칩인 반도체가 탑재되어 있습니다.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-none bg-white border border-slate-200 p-8 shadow-none dark:bg-slate-950 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-blue-50 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">나노미터 극한의 나노미로</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                반도체 회로는 사람 머리카락 두께의 수만 분의 일 크기인 <strong>나노미터(nm) 단위</strong>로 제작됩니다. 이러한 미세 영역에서는 사소한 가스 흔들림도 수조 원의 공정에 영향을 미칩니다.
              </p>
            </div>

            <div className="rounded-none bg-white border border-slate-200 p-8 shadow-none dark:bg-slate-950 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50">
                <ShieldAlert className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">수율(Yield)은 곧 제조 경쟁력</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                웨이퍼 한 장에서 양품을 가려내는 비율인 수율이 낮으면 막대한 비용 소모로 적자가 발생합니다. <strong>수율 향상</strong>이야말로 반도체 회사의 절대적인 승패처입니다.
              </p>
            </div>

            <div className="rounded-none bg-white border border-slate-200 p-8 shadow-none dark:bg-slate-950 dark:border-slate-800">
              <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-cyan-50 text-cyan-600 dark:bg-cyan-950/40 dark:text-cyan-400 border border-cyan-100 dark:border-cyan-900/50">
                <Cpu className="h-6 w-6" />
              </div>
              <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tight">예방하는 SPC 통계 관리</h3>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                모든 공정 기계들의 압력과 불순물, 두께 등을 통계 수치화하여 불량이 터지기 전에 기계를 자가 진단 정지시키는 <strong>통계적 공정 제어(SPC)</strong>는 품질 관리의 핵심 무기입니다.
              </p>
            </div>
          </div>
        </div>

        {/* Website Overview Sitemap */}
        <div className="mt-16 rounded-none border border-slate-200 bg-slate-900 dark:bg-slate-950 p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight">인터랙티브 배움터 이용 가이드</h2>
              <p className="mt-2 text-slate-400 text-sm">
                본 웹사이트에 준비된 다양한 교육용 기능들을 목적에 맞춰 활용해 보세요.
              </p>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-none bg-blue-600 text-white font-bold text-xs">
                    <span>1</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">공정 로드맵 & 세부 학습</h4>
                    <p className="text-xs text-slate-400 mt-0.5">전과정을 시각 지도로 확인하고 공정마다 생생한 일상 비유와 불량을 학습합니다.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-none bg-blue-600 text-white font-bold text-xs">
                    <span>2</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">통계적 공정 제어(SPC) 시뮬레이터</h4>
                    <p className="text-xs text-slate-400 mt-0.5">실시간 합격 한계 도표(UCL, LCL)를 직접 클릭해 보며 이상 징후 감지 원리를 체험합니다.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-none bg-blue-600 text-white font-bold text-xs">
                    <span>3</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">AI 튜터와 학습 퀴즈</h4>
                    <p className="text-xs text-slate-400 mt-0.5">공부가 꼬일 때는 실시간 AI 반도체 튜터에게 질문을 던지고, 엄선된 퀴즈로 실력을 확인합니다.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => setCurrentTab('roadmap')} 
                className="cursor-pointer rounded-none bg-white/5 hover:bg-white/10 p-4 transition-colors border border-white/10"
              >
                <Cpu className="h-5 w-5 mb-2 text-blue-400" />
                <h4 className="font-bold text-sm">1. 공정 로드맵</h4>
                <p className="text-[11px] text-slate-400 mt-1">8대 핵심 공정의 깊이 있는 학습을 한눈에 clickable 마스터</p>
              </div>
              <div 
                onClick={() => setCurrentTab('timeline')} 
                className="cursor-pointer rounded-none bg-white/5 hover:bg-white/10 p-4 transition-colors border border-white/10"
              >
                <BookOpen className="h-5 w-5 mb-2 text-blue-400" />
                <h4 className="font-bold text-sm">2. 슬라이딩 타임라인</h4>
                <p className="text-[11px] text-slate-400 mt-1">한 단계 한 단계 넘어가며 순차적인 스토리텔링 공부</p>
              </div>
              <div 
                onClick={() => setCurrentTab('quality')} 
                className="cursor-pointer rounded-none bg-white/5 hover:bg-white/10 p-4 transition-colors border border-white/10"
              >
                <Award className="h-5 w-5 mb-2 text-blue-400" />
                <h4 className="font-bold text-sm">3. 품질 & SPC 차트</h4>
                <p className="text-[11px] text-slate-400 mt-1">수율 통계 공식과 실시간 통계 제어 모의 그래프 체험</p>
              </div>
              <div 
                onClick={() => setCurrentTab('quiz')} 
                className="cursor-pointer rounded-none bg-white/5 hover:bg-white/10 p-4 transition-colors border border-white/10"
              >
                <HelpCircle className="h-5 w-5 mb-2 text-blue-400" />
                <h4 className="font-bold text-sm">4. 인터랙티브 퀴즈</h4>
                <p className="text-[11px] text-slate-400 mt-1">T/F 찬반 및 정선된 선택형 퀴즈로 과목 실력 자가진단</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

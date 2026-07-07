/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PROCESS_STEPS } from '../data/semiconductorData';
import ProcessDetail from './ProcessDetail';
import { 
  Heart, CheckCircle2, ChevronRight, BookOpen, 
  Cpu, ArrowLeft, Layers, Landmark
} from 'lucide-react';
import { motion } from 'motion/react';

interface RoadmapProps {
  favorites: string[];
  progress: string[];
  toggleFavorite: (id: string) => void;
  toggleCompleted: (id: string) => void;
  selectedStepId: string | null;
  setSelectedStepId: (id: string | null) => void;
}

export default function Roadmap({
  favorites,
  progress,
  toggleFavorite,
  toggleCompleted,
  selectedStepId,
  setSelectedStepId
}: RoadmapProps) {

  const selectedStep = PROCESS_STEPS.find(s => s.id === selectedStepId);

  // Filter or search steps
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredSteps = PROCESS_STEPS.filter(step => 
    step.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.engName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    step.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Step details view */}
        {selectedStep ? (
          <div className="space-y-6">
            <button
              onClick={() => setSelectedStepId(null)}
              className="inline-flex items-center space-x-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              id="back-to-grid"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>전체 공정 로드맵으로 돌아가기</span>
            </button>
            
            <div className="rounded-none border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-none dark:border-slate-800 dark:bg-slate-950">
              <ProcessDetail
                step={selectedStep}
                isFavorite={favorites.includes(selectedStep.id)}
                isCompleted={progress.includes(selectedStep.id)}
                toggleFavorite={toggleFavorite}
                toggleCompleted={toggleCompleted}
              />
            </div>
            
            {/* Quick footer navigation inside details */}
            <div className="flex justify-between items-center pt-4">
              <button
                disabled={selectedStep.number === 1}
                onClick={() => {
                  const prev = PROCESS_STEPS.find(s => s.number === selectedStep.number - 1);
                  if (prev) setSelectedStepId(prev.id);
                }}
                className="rounded-none border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              >
                ◀ 이전 공정
              </button>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">{selectedStep.number} / {PROCESS_STEPS.length} 공정</span>
              <button
                disabled={selectedStep.number === PROCESS_STEPS.length}
                onClick={() => {
                  const next = PROCESS_STEPS.find(s => s.number === selectedStep.number + 1);
                  if (next) setSelectedStepId(next.id);
                }}
                className="rounded-none bg-blue-600 px-4 py-2.5 text-xs font-bold text-white disabled:opacity-50 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500"
              >
                다음 공정 ▶
              </button>
            </div>
          </div>
        ) : (
          // Main grid / flow overview
          <div className="space-y-8">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                반도체 일관 제조공정 로드맵
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                웨이퍼 제작부터 최종 패키징 출하까지 8대 핵심 공정 경로를 순서대로 확인해 보세요.<br />
                각 노드를 클릭하면 깊이 있는 지식과 실시간 시각화, 품질 진단을 볼 수 있습니다.
              </p>
            </div>

            {/* Search filter bar */}
            <div className="flex justify-center">
              <div className="relative w-full max-w-md">
                <input
                  type="text"
                  placeholder="공정 이름, 용어, 목적으로 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-none border border-slate-300 bg-white px-4 py-3 pl-10 text-sm text-slate-900 shadow-none focus:border-blue-600 focus:ring-0 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                  id="roadmap-search"
                />
                <div className="absolute left-3.5 top-3.5 text-slate-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Visual Process Map Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSteps.map((step) => {
                const isFavorite = favorites.includes(step.id);
                const isCompleted = progress.includes(step.id);
                
                return (
                  <motion.div
                    key={step.id}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.15 }}
                    className="cursor-pointer flex flex-col rounded-none border-2 border-slate-200 bg-white p-5 hover:border-blue-600 dark:border-slate-800 dark:bg-slate-950 transition-all group"
                    onClick={() => setSelectedStepId(step.id)}
                    id={`roadmap-node-${step.id}`}
                  >
                    {/* Step tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex h-8 w-8 items-center justify-center rounded-none bg-slate-900 dark:bg-slate-800 text-xs font-bold text-white border-b-2 border-blue-600`}>
                        {step.number}
                      </span>
                      
                      {/* Status Badges */}
                      <div className="flex space-x-1">
                        {isFavorite && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-none border border-rose-200 bg-rose-50 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900 text-xs font-bold">
                            ♥
                          </span>
                        )}
                        {isCompleted && (
                          <span className="flex h-6 w-6 items-center justify-center rounded-none border border-emerald-200 bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20 dark:border-emerald-900 text-xs font-bold">
                            ✓
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 transition-colors uppercase tracking-tight">
                      {step.name}
                    </h3>
                    <p className="text-[10px] font-bold font-mono text-slate-400 mt-0.5 uppercase tracking-wide">{step.engName}</p>
                    
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 line-clamp-2 leading-relaxed font-semibold">
                      {step.purpose}
                    </p>

                    <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-[10px] font-bold text-slate-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider">
                      <span>비유: {step.analogyTitle.substring(0, 15)}...</span>
                      <span className="flex items-center">학습 시작 <ChevronRight className="ml-1 h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" /></span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Empty state */}
            {filteredSteps.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">
                일치하는 공정 데이터를 찾지 못했습니다. 다른 단어로 검색해 보세요.
              </div>
            )}
          </div>
        )}
        
      </div>
    </div>
  );
}

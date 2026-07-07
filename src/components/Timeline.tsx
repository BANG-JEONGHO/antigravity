/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { PROCESS_STEPS } from '../data/semiconductorData';
import ProcessDetail from './ProcessDetail';
import { ChevronLeft, ChevronRight, HelpCircle, Layers, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TimelineProps {
  favorites: string[];
  progress: string[];
  toggleFavorite: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

export default function Timeline({
  favorites,
  progress,
  toggleFavorite,
  toggleCompleted
}: TimelineProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentStep = PROCESS_STEPS[activeIndex];

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(prev => prev - 1);
    }
  };

  const handleNext = () => {
    if (activeIndex < PROCESS_STEPS.length - 1) {
      setActiveIndex(prev => prev + 1);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Intro */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            공정 스토리 타임라인
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
            전체 8단계를 이야기 책을 넘기듯 순서대로 이동하며 흐름을 마스터해 보세요.
          </p>
        </div>

        {/* Horizontal Navigation Chain */}
        <div className="relative w-full overflow-x-auto pb-4 scrollbar-none" id="timeline-scroll-track">
          {/* Connecting line */}
          <div className="absolute left-10 right-10 top-1/2 h-0.5 -translate-y-1/2 bg-slate-200 dark:bg-slate-800 z-0" />
          
          <div className="relative flex justify-between space-x-12 min-w-[1000px] px-8 z-10">
            {PROCESS_STEPS.map((step, idx) => {
              const isActive = idx === activeIndex;
              const isLearned = progress.includes(step.id);
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveIndex(idx)}
                  className="flex flex-col items-center focus:outline-none group relative"
                  id={`timeline-node-${step.id}`}
                >
                  {/* Indicator Dot */}
                  <div 
                    className={`flex h-10 w-10 items-center justify-center rounded-none border-2 font-bold text-xs transition-all ${
                      isActive
                        ? 'bg-blue-600 border-blue-600 text-white scale-110 shadow-none'
                        : isLearned
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'bg-white border-slate-300 text-slate-500 dark:bg-slate-950 dark:border-slate-700'
                    }`}
                  >
                    {step.number}
                  </div>
                  
                  {/* Label */}
                  <span 
                    className={`mt-2 text-xs font-bold whitespace-nowrap transition-colors uppercase tracking-tight ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white'
                    }`}
                  >
                    {step.name.split(' (')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slidable Carousel Area */}
        <div className="relative rounded-none border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-none dark:border-slate-800 dark:bg-slate-950">
          
          {/* Nav buttons */}
          <button
            onClick={handlePrev}
            disabled={activeIndex === 0}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-none bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-none hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 z-20"
            aria-label="Previous step"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <button
            onClick={handleNext}
            disabled={activeIndex === PROCESS_STEPS.length - 1}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-none bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-none hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-30 z-20"
            aria-label="Next step"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Core Detail display with animation */}
          <div className="px-4 sm:px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProcessDetail
                  step={currentStep}
                  isFavorite={favorites.includes(currentStep.id)}
                  isCompleted={progress.includes(currentStep.id)}
                  toggleFavorite={toggleFavorite}
                  toggleCompleted={toggleCompleted}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}

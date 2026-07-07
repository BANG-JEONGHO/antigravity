/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Cpu, BookOpen, GraduationCap, Award, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  favorites: string[];
  progress: string[];
  totalSteps: number;
}

export default function Header({
  currentTab,
  setCurrentTab,
  favorites,
  progress,
  totalSteps,
}: HeaderProps) {
  const progressPercent = Math.round((progress.length / totalSteps) * 100);

  // Define tabs in Korean with corresponding icons
  const tabs = [
    { id: 'home', label: '홈', icon: GraduationCap },
    { id: 'roadmap', label: '공정 로드맵', icon: Cpu },
    { id: 'timeline', label: '공정 타임라인', icon: BookOpen },
    { id: 'quality', label: '품질 및 SPC', icon: Award },
    { id: 'quiz', label: '학습 퀴즈', icon: HelpCircle },
    { id: 'dictionary', label: '반도체 사전', icon: BookOpen },
    { id: 'tutor', label: 'AI 튜터', icon: Cpu },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo and branding */}
        <div 
          className="flex cursor-pointer items-center space-x-3 shrink-0"
          onClick={() => setCurrentTab('home')}
          id="nav-logo"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-blue-600 text-white font-bold text-xl shadow-sm dark:bg-blue-600">
            <span>Si</span>
          </div>
          <div className="whitespace-nowrap">
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white sm:text-base leading-tight uppercase">
              반도체 제조 입문
            </h1>
            <p className="hidden text-[9px] font-bold text-slate-400 uppercase tracking-widest xl:block">
              Semiconductor Quality Management
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 h-full" id="desktop-nav">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setCurrentTab(tab.id)}
                className={`flex items-center space-x-1 h-full px-1.5 text-xs xl:text-sm font-bold transition-all border-b-2 rounded-none whitespace-nowrap ${
                  isActive
                    ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                    : 'border-transparent text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Icon className="h-3.5 w-3.5 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right tools (Dark mode, Progress Tracker) */}
        <div className="flex items-center space-x-4 shrink-0" id="header-tools">
          {/* Progress overview */}
          <div className="hidden xl:flex flex-col items-end text-[10px] font-bold uppercase tracking-wider">
            <span className="text-slate-400">진행률: {progressPercent}%</span>
            <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-none bg-slate-100 dark:bg-slate-800">
              <div 
                className="h-full bg-blue-500 transition-all duration-500" 
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Favorites summary indicator */}
          {favorites.length > 0 && (
            <div className="hidden sm:flex h-8 items-center rounded-sm bg-rose-50 border border-rose-100 px-3 text-xs font-bold text-rose-600 dark:bg-rose-950/20 dark:border-rose-900/30 dark:text-rose-400">
              ♥ {favorites.length}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <div className="block lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950" id="mobile-nav">
        <div className="flex overflow-x-auto whitespace-nowrap px-2 py-2.5 scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`mx-1 flex items-center space-x-1 rounded-none border px-3 py-1.5 text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-blue-600 border-blue-600 text-white shadow-none'
                    : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-400'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}

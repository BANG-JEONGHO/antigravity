/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { DICTIONARY_TERMS } from '../data/semiconductorData';
import { BookOpen, Search, Filter, HelpCircle, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dictionary() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'process' | 'quality' | 'equipment' | 'general'>('all');

  const filteredTerms = DICTIONARY_TERMS.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.fullTerm && item.fullTerm.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.korName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: '전체 보기' },
    { id: 'process', label: '제조 공정' },
    { id: 'quality', label: '품질 관리' },
    { id: 'equipment', label: '설비 장비' },
    { id: 'general', label: '일반 기초' },
  ];

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            초보자를 위한 반도체 용어 사전
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            어렵고 낯선 반도체 전공 분야 및 수율 통계 전문 용어를 한눈에 모아 검색해 보세요.
          </p>
        </div>

        {/* Filter and Search Bar row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4" id="dict-filters">
          
          {/* Category Tabs */}
          <div className="flex overflow-x-auto whitespace-nowrap space-x-1.5 pb-2 md:pb-0 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/10'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:max-w-xs">
            <input
              type="text"
              placeholder="단어 또는 풀이로 즉시 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 pl-10 text-xs sm:text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              id="dict-search-input"
            />
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </div>

        </div>

        {/* Dictionary grid results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="dict-results-grid">
          {filteredTerms.map((item, idx) => (
            <motion.div
              key={idx}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 flex flex-col justify-between"
              id={`dict-card-${item.term}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                    {item.term}
                  </h3>
                  
                  {/* Category Pill */}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    item.category === 'process'
                      ? 'bg-cyan-50 text-cyan-600 dark:bg-cyan-950/20 dark:text-cyan-400'
                      : item.category === 'quality'
                        ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/20 dark:text-rose-400'
                        : item.category === 'equipment'
                          ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400'
                  }`}>
                    {item.category === 'process' ? '공정' : item.category === 'quality' ? '품질' : item.category === 'equipment' ? '장비' : '기초'}
                  </span>
                </div>

                {item.fullTerm && (
                  <p className="text-[10px] font-mono text-slate-400 font-semibold mt-0.5">{item.fullTerm}</p>
                )}

                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-2">
                  한글명: {item.korName}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 leading-relaxed font-medium">
                  {item.definition}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredTerms.length === 0 && (
          <div className="text-center py-16 text-slate-400 text-sm">
            일치하는 용어를 찾지 못했습니다. 검색어를 수정하거나 카테고리를 변경해 보십시오.
          </div>
        )}

      </div>
    </div>
  );
}

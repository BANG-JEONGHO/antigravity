/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GENERATED_QUIZ_QUESTIONS } from '../data/quizGenerator.ts';
import { QuizQuestion } from '../types';
import { Award, HelpCircle, CheckCircle, AlertTriangle, RefreshCw, Trophy, Play, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function selectRandomQuestions(allQuestions: QuizQuestion[], count: number = 5): QuizQuestion[] {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// ==========================================
// 1. QuizStartScreen: 퀴즈 시작 화면
// ==========================================
interface QuizStartScreenProps {
  onStart: () => void;
  key?: string;
}

function QuizStartScreen({ onStart }: QuizStartScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 md:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950 text-center space-y-3 sm:space-y-4 md:space-y-5"
      id="quiz-start-view"
    >
      <div className="mx-auto flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
        <Brain className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse" />
      </div>

      <div className="space-y-1">
        <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
          실력 자가진단 도전!
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-[10px] sm:text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
          반도체 8대 주요 공정의 정밀 지식부터 통계적 품질 관리(SPC), 수율 예측 및 Cp/Cpk 분석까지, 실제 대학 강의 수준의 엄선된 퀴즈가 준비되어 있습니다.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-xl mx-auto text-left">
        <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-900">
          <div className="text-[10px] sm:text-xs font-extrabold text-blue-600 dark:text-blue-400 mb-0.5">무작위 5문항</div>
          <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-normal">총 1,000개 이상의 문항 중 매회 엄선된 5개 퀴즈가 무작위로 구성됩니다.</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-900">
          <div className="text-[10px] sm:text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mb-0.5">상세한 해설</div>
          <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-normal">오답을 고르더라도 문제의 출제 의도와 공정 원리가 상세히 설명됩니다.</div>
        </div>
        <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-2xl border border-slate-100 dark:border-slate-900">
          <div className="text-[10px] sm:text-xs font-extrabold text-amber-600 dark:text-amber-400 mb-0.5">수율 기반 진단</div>
          <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400 leading-normal">결과에 맞춰 현재 반도체 공정에 대한 본인의 누적 이해도를 평가받을 수 있습니다.</div>
        </div>
      </div>

      <div className="pt-1">
        <button
          onClick={onStart}
          className="inline-flex items-center space-x-2 rounded-2xl bg-blue-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700 hover:scale-[1.02] dark:bg-blue-500 dark:hover:bg-blue-600 cursor-pointer"
          id="quiz-start-btn"
        >
          <Play className="h-4 w-4 sm:h-4.5 sm:w-4.5 fill-current" />
          <span>반도체 퀴즈 시작하기</span>
        </button>
      </div>
    </motion.div>
  );
}

// ==========================================
// 2. QuizActiveScreen: 퀴즈 진행 화면
// ==========================================
interface QuizActiveScreenProps {
  currentIdx: number;
  totalQuestions: number;
  currentQuestion: QuizQuestion;
  selectedAns: string | null;
  onAnswerSelect: (option: string) => void;
  showExplanation: boolean;
  onNext: () => void;
  key?: string;
}

function QuizActiveScreen({
  currentIdx,
  totalQuestions,
  currentQuestion,
  selectedAns,
  onAnswerSelect,
  showExplanation,
  onNext,
}: QuizActiveScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Progress indicator */}
      <div className="flex items-center justify-between text-xs font-bold text-slate-400">
        <span>구분: {currentQuestion.category}</span>
        <span>진행도: {currentIdx + 1} / {totalQuestions}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-blue-600 dark:bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / totalQuestions) * 100}%` }}
        />
      </div>

      {/* Question card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl dark:border-slate-800 dark:bg-slate-950 space-y-6" id="quiz-question-card">
        <div className="flex items-start space-x-3.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400 font-bold text-sm">
            Q{currentIdx + 1}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Answers options */}
        <div className="grid grid-cols-1 gap-3 pt-2" id="quiz-options-grid">
          {currentQuestion.options?.map((option, idx) => {
            const isSelected = selectedAns === option;
            const isCorrect = option === currentQuestion.correctAnswer;
            const hasAnswered = selectedAns !== null;

            return (
              <button
                key={idx}
                onClick={() => onAnswerSelect(option)}
                disabled={hasAnswered}
                className={`flex items-center justify-between w-full rounded-xl p-4 text-left text-xs sm:text-sm font-semibold transition-all border cursor-pointer ${hasAnswered
                  ? isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-600'
                    : isSelected
                      ? 'bg-red-50 border-red-500 text-red-800 dark:bg-red-950/20 dark:text-red-400 dark:border-red-600'
                      : 'bg-slate-50 border-slate-100 text-slate-400 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-600'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900'
                  }`}
              >
                <span>{option}</span>

                {/* Result marks */}
                {hasAnswered && isCorrect && (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 shrink-0 ml-2">
                    <CheckCircle className="h-4 w-4" /> 정답
                  </span>
                )}
                {hasAnswered && isSelected && !isCorrect && (
                  <span className="text-red-600 dark:text-red-400 font-bold flex items-center gap-1 shrink-0 ml-2">
                    <AlertTriangle className="h-4 w-4" /> 오답
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation section */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 border-t border-slate-100 dark:border-slate-900 space-y-3"
              id="quiz-explanation-panel"
            >
              <div className="flex items-center space-x-2">
                {selectedAns === currentQuestion.correctAnswer ? (
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle className="h-4.5 w-4.5" />
                    <span>정답입니다! 훌륭합니다.</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-red-600 dark:text-red-400">
                    <AlertTriangle className="h-4.5 w-4.5" />
                    <span>아쉽지만 오답입니다.</span>
                  </div>
                )}
              </div>

              <div className="rounded-xl bg-blue-50/50 p-4 dark:bg-blue-950/20 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border border-blue-500/10">
                <strong className="text-slate-800 dark:text-slate-200">정답 해설:</strong>
                <p className="mt-1">{currentQuestion.explanation}</p>
              </div>

              {/* Next step button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={onNext}
                  className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all hover:scale-[1.02] cursor-pointer"
                  id="quiz-next-btn"
                >
                  {currentIdx === totalQuestions - 1 ? '결과 확인하기' : '다음 문제 풀기 ▶'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

// ==========================================
// 3. QuizResultScreen: 퀴즈 결과 화면
// ==========================================
interface QuizResultScreenProps {
  score: number;
  totalQuestions: number;
  onReset: () => void;
  key?: string;
}

function QuizResultScreen({ score, totalQuestions, onReset }: QuizResultScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-xl dark:border-slate-800 dark:bg-slate-950 text-center space-y-6"
      id="quiz-result-view"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
        <Trophy className="h-10 w-10 animate-bounce" />
      </div>

      <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
        퀴즈가 모두 종료되었습니다!
      </h3>

      <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-6 max-w-sm mx-auto space-y-2">
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">당신의 학습 평가 점수</p>
        <div className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">
          {score} / {totalQuestions} 문항
        </div>
        <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
          {score === totalQuestions
            ? '🏆 만점입니다! 반도체 핵심 인재로 거듭나셨습니다.'
            : score >= 3
              ? '🥈 아주 훌륭한 이해도를 가지고 계십니다!'
              : '📚 로드맵과 품질관리 탭을 조금 더 공부해 볼까요?'}
        </p>
      </div>

      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
        배움터는 언제든 복습을 기다립니다. 수율 관리 및 8대 전공정을 충분히 반복 학습한 후 다시 도전해 보세요!
      </p>

      <button
        onClick={onReset}
        className="inline-flex items-center space-x-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all hover:scale-[1.02] cursor-pointer"
        id="quiz-reset"
      >
        <RefreshCw className="h-4 w-4" />
        <span>다시 풀기 (시작 화면으로)</span>
      </button>
    </motion.div>
  );
}

// ==========================================
// 4. Main Quiz Component
// ==========================================
export default function Quiz() {
  const [view, setView] = useState<'start' | 'active' | 'result'>('start');
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAns, setSelectedAns] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  // Initialize questions
  const startNewQuiz = () => {
    setActiveQuestions(selectRandomQuestions(GENERATED_QUIZ_QUESTIONS, 5));
    setCurrentIdx(0);
    setSelectedAns(null);
    setScore(0);
    setShowExplanation(false);
    setView('active');
  };

  const handleAnswerSelect = (option: string) => {
    if (selectedAns !== null) return; // Prevent double selecting

    setSelectedAns(option);
    setShowExplanation(true);

    if (option === activeQuestions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedAns(null);
    setShowExplanation(false);

    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setView('result');
    }
  };

  const resetQuiz = () => {
    setView('start');
    setActiveQuestions([]);
    setCurrentIdx(0);
    setSelectedAns(null);
    setScore(0);
    setShowExplanation(false);
  };

  // Scroll to top whenever screen view or question index changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, currentIdx]);

  return (
    <div className="py-2 sm:py-4 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-6rem)]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">

        {/* Header (Keep consistent on all screens) */}
        <div className="text-center space-y-1 mb-3 md:mb-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
            반도체 공정 & 품질 자가진단 퀴즈
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm">
            대학 강의 수준의 기본 개념과 품질 관리 지식을 테스트해 보세요.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {view === 'start' && (
            <QuizStartScreen key="start-view" onStart={startNewQuiz} />
          )}

          {view === 'active' && activeQuestions.length > 0 && (
            <QuizActiveScreen
              key={`active-view-${currentIdx}`}
              currentIdx={currentIdx}
              totalQuestions={activeQuestions.length}
              currentQuestion={activeQuestions[currentIdx]}
              selectedAns={selectedAns}
              onAnswerSelect={handleAnswerSelect}
              showExplanation={showExplanation}
              onNext={handleNext}
            />
          )}

          {view === 'result' && (
            <QuizResultScreen
              key="result-view"
              score={score}
              totalQuestions={activeQuestions.length}
              onReset={resetQuiz}
            />
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

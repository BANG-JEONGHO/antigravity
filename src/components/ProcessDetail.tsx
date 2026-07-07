/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProcessStep } from '../types';
import { 
  Heart, CheckCircle2, Award, ShieldAlert, Cpu, Wrench, 
  HelpCircle, Sparkles, BookOpen, Layers, Zap
} from 'lucide-react';
import { motion } from 'motion/react';

interface ProcessDetailProps {
  step: ProcessStep;
  isFavorite: boolean;
  isCompleted: boolean;
  toggleFavorite: (id: string) => void;
  toggleCompleted: (id: string) => void;
}

export default function ProcessDetail({
  step,
  isFavorite,
  isCompleted,
  toggleFavorite,
  toggleCompleted
}: ProcessDetailProps) {
  
  // Custom interactive/animated SVG diagrams for each step
  const renderSVGDiagram = (id: string) => {
    switch (id) {
      case "silicon-ingot":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            <defs>
              <linearGradient id="ingotGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="50%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="glowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            {/* Furnace chamber wall */}
            <rect x="50" y="20" width="300" height="200" rx="10" fill="none" stroke="#475569" strokeWidth="3" />
            <line x1="200" y1="20" x2="200" y2="70" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" />
            {/* Crucible melting silion */}
            <path d="M 120,180 A 80,80 0 0,0 280,180 Z" fill="#475569" />
            <ellipse cx="200" cy="180" rx="80" ry="15" fill="url(#glowGrad)" />
            <circle cx="200" cy="180" r="40" fill="#f97316" className="animate-pulse" />
            {/* Growing Ingot */}
            <motion.g
              animate={{ y: [20, -10, 20] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              {/* Seed holder */}
              <rect x="195" y="50" width="10" height="50" fill="#cbd5e1" />
              {/* Growing silicon ingot cylinder */}
              <rect x="160" y="100" width="80" height="70" rx="8" fill="url(#ingotGrad)" />
              <ellipse cx="200" cy="100" rx="40" ry="8" fill="#cbd5e1" />
              <ellipse cx="200" cy="170" rx="40" ry="8" fill="#475569" />
            </motion.g>
            {/* Text labels inside SVG */}
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">초크랄스키 잉곳 인상 공정 (Czochralski Ingot Pulling)</text>
          </svg>
        );

      case "wafer-manufacturing":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Silicon ingot block */}
            <rect x="60" y="70" width="160" height="100" rx="15" fill="none" stroke="#475569" strokeWidth="3" />
            <line x1="60" y1="120" x2="220" y2="120" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
            
            {/* Diamond wire saws cutting */}
            <motion.g
              animate={{ x: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            >
              <line x1="220" y1="40" x2="220" y2="200" stroke="#38bdf8" strokeWidth="2.5" />
              <line x1="225" y1="40" x2="225" y2="200" stroke="#06b6d4" strokeWidth="2.5" />
              <line x1="230" y1="40" x2="230" y2="200" stroke="#0891b2" strokeWidth="2.5" />
            </motion.g>
            
            {/* Wafers sliding out */}
            <motion.g
              animate={{ x: [0, 45, 45] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <ellipse cx="280" cy="120" rx="10" ry="50" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="1.5" />
              <ellipse cx="310" cy="120" rx="10" ry="50" fill="#94a3b8" stroke="#64748b" strokeWidth="1.5" />
            </motion.g>
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">초정밀 와이어 쏘 슬라이싱 (Diamond Wire Sawing)</text>
          </svg>
        );

      case "oxidation":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Furnace heat coils */}
            <rect x="50" y="30" width="300" height="150" rx="12" fill="none" stroke="#b91c1c" strokeWidth="3" className="animate-pulse" />
            <line x1="50" y1="30" x2="350" y2="30" stroke="#f87171" strokeWidth="1" />
            {/* Silicon wafer */}
            <rect x="100" y="110" width="200" height="20" rx="4" fill="#64748b" />
            {/* Growing SiO2 oxide layer */}
            <motion.rect
              initial={{ height: 1 }}
              animate={{ height: [1, 8, 1] }}
              transition={{ repeat: Infinity, duration: 5 }}
              x="100" y="102" width="200" rx="2" fill="#38bdf8"
            />
            {/* Oxygen molecules reacting */}
            <motion.g
              animate={{ y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <circle cx="120" cy="50" r="6" fill="#f87171" />
              <circle cx="132" cy="50" r="6" fill="#f87171" />
              
              <circle cx="210" cy="45" r="6" fill="#f87171" />
              <circle cx="222" cy="45" r="6" fill="#f87171" />
              
              <circle cx="280" cy="55" r="6" fill="#f87171" />
              <circle cx="292" cy="55" r="6" fill="#f87171" />
            </motion.g>
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">열산화막 성장 (Thermal Oxidation SiO2)</text>
          </svg>
        );

      case "photolithography":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* UV Light Source */}
            <circle cx="200" cy="30" r="15" fill="#a855f7" className="animate-pulse" />
            <line x1="200" y1="45" x2="200" y2="70" stroke="#c084fc" strokeWidth="3" />
            
            {/* Photomask */}
            <rect x="100" y="70" width="200" height="15" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
            {/* Pattern slits */}
            <rect x="120" y="70" width="15" height="15" fill="#f8fafc" />
            <rect x="165" y="70" width="15" height="15" fill="#f8fafc" />
            <rect x="210" y="70" width="15" height="15" fill="#f8fafc" />
            <rect x="255" y="70" width="15" height="15" fill="#f8fafc" />
            
            {/* UV Beam paths */}
            <polygon points="120,85 110,140 145,140 135,85" fill="#c084fc" fillOpacity="0.25" />
            <polygon points="165,85 155,140 190,140 180,85" fill="#c084fc" fillOpacity="0.25" />
            <polygon points="210,85 200,140 235,140 225,85" fill="#c084fc" fillOpacity="0.25" />
            <polygon points="255,85 245,140 280,140 270,85" fill="#c084fc" fillOpacity="0.25" />
            
            {/* Wafer with spin-coated PR */}
            <rect x="80" y="160" width="240" height="15" rx="3" fill="#64748b" />
            <rect x="80" y="150" width="240" height="10" rx="1" fill="#f59e0b" /> {/* PR layer */}
            
            {/* Exposed PR regions (Pattern transfer) */}
            <rect x="110" y="150" width="35" height="10" fill="#a855f7" className="animate-pulse" />
            <rect x="155" y="150" width="35" height="10" fill="#a855f7" className="animate-pulse" />
            <rect x="200" y="150" width="35" height="10" fill="#a855f7" className="animate-pulse" />
            <rect x="245" y="150" width="35" height="10" fill="#a855f7" className="animate-pulse" />
            
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">회로 자외선 노광 공정 (UV Exposure through Mask)</text>
          </svg>
        );

      case "etching":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Plasma chamber glows */}
            <rect x="40" y="20" width="320" height="190" rx="12" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            <rect x="50" y="30" width="300" height="170" fill="#22c55e" fillOpacity="0.05" />
            
            {/* Silicon wafer with carved trenches */}
            <rect x="80" y="150" width="240" height="20" rx="2" fill="#64748b" />
            {/* Mask Blocks protecting parts */}
            <rect x="80" y="130" width="40" height="20" fill="#f59e0b" />
            <rect x="160" y="130" width="80" height="20" fill="#f59e0b" />
            <rect x="280" y="130" width="40" height="20" fill="#f59e0b" />
            
            {/* Carving trenches in wafer */}
            <rect x="120" y="150" width="40" height="10" fill="#0f172a" />
            <rect x="240" y="150" width="40" height="10" fill="#0f172a" />
            
            {/* High-speed plasma ions */}
            <motion.g
              animate={{ y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            >
              <path d="M 140,50 L 140,110 M 135,100 L 140,110 L 145,100" stroke="#4ade80" strokeWidth="2" />
              <path d="M 260,50 L 260,110 M 255,100 L 260,110 L 265,100" stroke="#4ade80" strokeWidth="2" />
              <path d="M 150,60 L 150,115 M 145,105 L 150,115 L 155,105" stroke="#22c55e" strokeWidth="2" />
              <path d="M 250,60 L 250,115 M 245,105 L 250,115 L 255,105" stroke="#22c55e" strokeWidth="2" />
            </motion.g>
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">반응성 이온 건식 식각 (Reactive Ion Dry Etching)</text>
          </svg>
        );

      case "ion-implantation":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Ion source gun */}
            <rect x="50" y="70" width="80" height="60" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
            <circle cx="90" cy="100" r="15" fill="#3b82f6" className="animate-pulse" />
            
            {/* Ion beam tube */}
            <line x1="130" y1="100" x2="260" y2="100" stroke="#3b82f6" strokeWidth="4" strokeDasharray="5 5" />
            
            {/* Rotating Wafer target */}
            <rect x="280" y="40" width="20" height="120" rx="4" fill="#64748b" />
            
            {/* Impinging Atoms inside silicon */}
            <motion.g
              animate={{ x: [0, 160, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            >
              <circle cx="130" cy="95" r="4" fill="#60a5fa" />
              <circle cx="140" cy="105" r="4" fill="#60a5fa" />
              <circle cx="150" cy="98" r="4" fill="#60a5fa" />
            </motion.g>
            
            {/* Embedded Dopants shown inside the wafer */}
            <circle cx="288" cy="60" r="3" fill="#ef4444" />
            <circle cx="292" cy="75" r="3" fill="#ef4444" />
            <circle cx="287" cy="90" r="3" fill="#ef4444" />
            <circle cx="291" cy="110" r="3" fill="#ef4444" />
            <circle cx="289" cy="130" r="3" fill="#ef4444" />
            
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">고전압 이온 주입 및 도핑 (High-voltage Ion Implantation)</text>
          </svg>
        );

      case "thin-film-deposition":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Gas inlets */}
            <line x1="120" y1="20" x2="120" y2="50" stroke="#cbd5e1" strokeWidth="3" />
            <line x1="280" y1="20" x2="280" y2="50" stroke="#cbd5e1" strokeWidth="3" />
            
            {/* Plasma cloud */}
            <ellipse cx="200" cy="80" rx="110" ry="25" fill="#0284c7" fillOpacity="0.2" className="animate-pulse" />
            
            {/* Heated Wafer stage */}
            <rect x="80" y="160" width="240" height="20" rx="3" fill="#334155" />
            <rect x="90" y="152" width="220" height="8" rx="1" fill="#64748b" /> {/* Wafer */}
            
            {/* Deposited nanometer thin film */}
            <motion.rect
              initial={{ height: 0.5 }}
              animate={{ height: [0.5, 6, 0.5] }}
              transition={{ repeat: Infinity, duration: 6 }}
              x="90" y="146" width="220" rx="1" fill="#0284c7"
            />
            
            {/* Flowing gas atoms reacting */}
            <motion.g
              animate={{ y: [0, 80, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            >
              <circle cx="150" cy="60" r="3" fill="#38bdf8" />
              <circle cx="180" cy="55" r="3.5" fill="#38bdf8" />
              <circle cx="220" cy="65" r="3" fill="#38bdf8" />
              <circle cx="250" cy="58" r="3.5" fill="#38bdf8" />
            </motion.g>
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">플라즈마 박막 증착 (PECVD Thin Film Deposition)</text>
          </svg>
        );

      case "cmp":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Slurry nozzle */}
            <rect x="80" y="30" width="60" height="15" rx="3" fill="#475569" />
            {/* Slurry drops dripping */}
            <motion.g
              animate={{ y: [0, 60, 0], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeIn" }}
            >
              <circle cx="110" cy="50" r="4" fill="#38bdf8" />
            </motion.g>
            
            {/* Spinning polishing pad */}
            <rect x="60" y="150" width="280" height="25" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <ellipse cx="200" cy="150" rx="140" ry="8" fill="#334155" />
            
            {/* Rotating head holding wafer upside down */}
            <motion.g
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              style={{ transformOrigin: '230px 105px' }}
            >
              <rect x="180" y="80" width="100" height="20" rx="3" fill="#64748b" />
              <rect x="190" y="100" width="80" height="10" fill="#cbd5e1" /> {/* Wafer */}
            </motion.g>
            <line x1="230" y1="40" x2="230" y2="80" stroke="#94a3b8" strokeWidth="4" />
            
            {/* Motion arrows */}
            <path d="M 310,135 Q 325,142 310,149" stroke="#94a3b8" strokeWidth="2" fill="none" />
            
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">화학 기계적 연마 평탄화 (Chemical Mechanical Polishing)</text>
          </svg>
        );

      case "metalization":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Silicon base and dielectric */}
            <rect x="60" y="160" width="280" height="30" fill="#334155" />
            <rect x="60" y="100" width="280" height="60" fill="#475569" />
            
            {/* Via trenches for contact wires */}
            <rect x="100" y="100" width="30" height="40" fill="#1e293b" />
            <rect x="270" y="100" width="30" height="40" fill="#1e293b" />
            <rect x="100" y="140" width="200" height="20" fill="#1e293b" />
            
            {/* Plating copper filling in via and routing */}
            <motion.g
              initial={{ height: 0 }}
              animate={{ height: [0, 60, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            >
              <rect x="100" y="100" width="30" height="60" fill="#f97316" />
              <rect x="270" y="100" width="30" height="60" fill="#f97316" />
              <rect x="100" y="140" width="200" height="20" fill="#f97316" />
            </motion.g>
            
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">구리 다마신 전선 배선 공정 (Copper Damascene Plating)</text>
          </svg>
        );

      case "electrical-test":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Probe card board */}
            <rect x="80" y="30" width="240" height="25" rx="3" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
            
            {/* Probe needles descending */}
            <motion.g
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <path d="M 120,55 L 140,110 L 140,120" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
              <path d="M 280,55 L 260,110 L 260,120" stroke="#cbd5e1" strokeWidth="2.5" fill="none" />
              
              {/* Electric spark pulse */}
              <circle cx="140" cy="120" r="6" fill="#38bdf8" className="animate-ping" />
              <circle cx="260" cy="120" r="6" fill="#38bdf8" className="animate-ping" />
            </motion.g>
            
            {/* Wafer die pad being tested */}
            <rect x="60" y="140" width="280" height="30" rx="3" fill="#475569" />
            <rect x="125" y="135" width="30" height="8" fill="#f59e0b" />
            <rect x="245" y="135" width="30" height="8" fill="#f59e0b" />
            
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">프로브 카드 웨이퍼 수율 검사 (Wafer Multi-probe Testing)</text>
          </svg>
        );

      case "packaging":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Package Substrate board */}
            <rect x="70" y="140" width="260" height="20" rx="4" fill="#065f46" stroke="#059669" strokeWidth="2" />
            
            {/* Microchips attached */}
            <rect x="120" y="90" width="160" height="50" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" />
            <circle cx="200" cy="115" r="12" fill="#334155" />
            <Cpu className="h-5 w-5 text-slate-500 absolute" style={{ transform: 'translate(190px, 105px)' }} />
            
            {/* Golden bonding wires connected */}
            <motion.path
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 4 }}
              d="M 120,110 Q 95,115 90,140" stroke="#eab308" strokeWidth="2" strokeDasharray="4" fill="none"
            />
            <motion.path
              initial={{ strokeDashoffset: 100 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ repeat: Infinity, duration: 4 }}
              d="M 280,110 Q 305,115 310,140" stroke="#eab308" strokeWidth="2" strokeDasharray="4" fill="none"
            />
            
            {/* External solder ball bumps */}
            <circle cx="100" cy="165" r="5" fill="#cbd5e1" />
            <circle cx="150" cy="165" r="5" fill="#cbd5e1" />
            <circle cx="200" cy="165" r="5" fill="#cbd5e1" />
            <circle cx="250" cy="165" r="5" fill="#cbd5e1" />
            <circle cx="300" cy="165" r="5" fill="#cbd5e1" />
            
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">리드 프레임 골드 와이어 본딩 (Gold Wire Bonding)</text>
          </svg>
        );

      case "final-inspection":
        return (
          <svg viewBox="0 0 400 240" className="w-full h-full rounded-xl bg-slate-900 shadow-inner">
            {/* Testing sockets */}
            <rect x="100" y="40" width="200" height="130" rx="8" fill="#1e293b" stroke="#f43f5e" strokeWidth="2.5" />
            
            {/* Thermal heating waves */}
            <motion.g
              animate={{ opacity: [0.2, 0.9, 0.2] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <path d="M 130,130 Q 140,110 130,90 Q 140,70 130,50" stroke="#f43f5e" strokeWidth="2" fill="none" />
              <path d="M 270,130 Q 280,110 270,90 Q 280,70 270,50" stroke="#f43f5e" strokeWidth="2" fill="none" />
            </motion.g>
            
            {/* Packaged IC inside socket */}
            <rect x="150" y="70" width="100" height="70" rx="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="200" y="105" fill="#22c55e" fontSize="12" textAnchor="middle" fontWeight="bold" className="animate-pulse">PASS (100%)</text>
            <circle cx="200" cy="125" r="4" fill="#22c55e" />
            
            {/* Digital control lines */}
            <path d="M 50,105 L 100,105 M 300,105 L 350,105" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
            
            <text x="200" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle" fontWeight="bold">고가열 신뢰성 번인 검사 (Burn-In Thermal Stress Testing)</text>
          </svg>
        );

      default:
        return (
          <div className="flex h-48 items-center justify-center rounded-xl bg-slate-950 text-slate-500 text-xs">
            시각 일러스트가 준비 중입니다.
          </div>
        );
    }
  };

  return (
    <div className="space-y-8" id="process-detail-container">
      {/* Intro and actions header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-200 pb-6 dark:border-slate-800 gap-4">
        <div>
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-none bg-slate-900 text-xs font-bold text-white border-b-2 border-blue-600 dark:bg-slate-800">
            {step.number}
          </span>
          <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-white sm:text-3xl uppercase tracking-tight">
            {step.name}
          </h2>
          <p className="text-xs font-bold font-mono text-slate-400 mt-1 uppercase tracking-wider">{step.engName}</p>
        </div>
        
        {/* Toggle favorites and visited */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => toggleFavorite(step.id)}
            className={`flex items-center space-x-2 rounded-none px-4 py-2.5 text-xs font-bold transition-all border ${
              isFavorite
                ? 'bg-rose-600 border-rose-600 text-white shadow-none'
                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900'
            }`}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            <span>{isFavorite ? '보관됨' : '관심 공정 보관'}</span>
          </button>

          <button
            onClick={() => toggleCompleted(step.id)}
            className={`flex items-center space-x-2 rounded-none px-4 py-2.5 text-xs font-bold transition-all border ${
              isCompleted
                ? 'bg-emerald-600 border-emerald-600 text-white shadow-none'
                : 'border-slate-300 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400 dark:hover:bg-slate-900'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" />
            <span>{isCompleted ? '학습 완료' : '학습 완료 체크'}</span>
          </button>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left column (Core info) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Purpose Box */}
          <div className="rounded-none bg-blue-50/20 p-5 dark:bg-blue-950/10 border-2 border-blue-600/30">
            <h4 className="flex items-center text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-widest">
              <Sparkles className="h-4 w-4 mr-2" />
              공정 목적 (Purpose)
            </h4>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
              {step.purpose}
            </p>
          </div>

          {/* Simple Explanation */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center uppercase tracking-tight">
              <BookOpen className="h-4 w-4 mr-2 text-slate-400" />
              쉬운 공정 설명
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
              {step.explanation}
            </p>
          </div>

          {/* Real world Analogy */}
          <div className="rounded-none border-2 border-dashed border-slate-300 p-5 dark:border-slate-800 bg-amber-50/10 dark:bg-amber-950/5">
            <span className="text-[10px] uppercase tracking-wider font-bold text-amber-600 dark:text-amber-400">
              💡 실생활 쉬운 비유
            </span>
            <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1 uppercase tracking-tight">
              {step.analogyTitle}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
              "{step.analogy}"
            </p>
          </div>

          {/* Equipment list */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center">
              <Wrench className="h-4 w-4 mr-2 text-slate-400" />
              주요 사용 장비 (Equipment)
            </h3>
            <div className="flex flex-wrap gap-2">
              {step.equipment.map((eq, i) => (
                <span 
                  key={i} 
                  className="rounded-none bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-900 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                >
                  {eq}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right column (Visual diagram & Quality info) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Interactive animated diagram canvas */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center">
              <Layers className="h-4 w-4 mr-2 text-slate-400" />
              공정 매커니즘 모식도 (Mechanism)
            </h3>
            <div className="h-56 sm:h-64">
              {renderSVGDiagram(step.id)}
            </div>
          </div>

          {/* Common defects list */}
          <div className="rounded-none border-2 border-rose-200 bg-rose-50/5 p-5 dark:border-rose-950/20 dark:bg-rose-950/5">
            <h4 className="flex items-center text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-widest">
              <ShieldAlert className="h-4 w-4 mr-2" />
              발생 빈도가 높은 대표 결함 (Defects)
            </h4>
            
            <div className="mt-3 space-y-3">
              {step.defects.map((def, idx) => (
                <div key={idx} className="border-t border-rose-200/40 pt-3 first:border-none first:pt-0 dark:border-rose-950/30">
                  <h5 className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-tight">
                    ⚠️ {def.name}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                    <strong>현상:</strong> {def.desc}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-500 mt-0.5">
                    <strong>원인:</strong> {def.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quality control focus */}
          <div className="rounded-none bg-emerald-500/5 border-2 border-emerald-500/10 p-5">
            <h4 className="flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
              <Zap className="h-4 w-4 mr-2" />
              품질 관리 및 검사 주안점
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              {step.qcImportance}
            </p>
          </div>
        </div>
      </div>

      {/* Key terminology inside Process */}
      <div className="border-t border-slate-200 pt-6 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center uppercase tracking-tight">
          <BookOpen className="h-4 w-4 mr-2 text-slate-400" />
          해당 공정 핵심 전문 용어 (Terminology)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {step.terminology.map((term, i) => (
            <div key={i} className="rounded-none border border-slate-200 p-4 dark:border-slate-800 bg-white dark:bg-slate-950/30">
              <h4 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-tight">
                {term.term}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed font-medium">
                {term.definition}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { QUALITY_CONCEPTS } from '../data/semiconductorData';
import { Award, ShieldAlert, Sparkles, TrendingUp, Info, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface Point {
  sampleId: number;
  value: number;
  status: 'normal' | 'error' | 'warning';
  comment?: string;
}

interface ParetoItem {
  name: string;
  count: number;
  cumulativePercent: number;
}

const paretoData: ParetoItem[] = [
  { name: '파티클', count: 100, cumulativePercent: 50 },
  { name: '스크래치', count: 42, cumulativePercent: 71 },
  { name: '금속오염', count: 24, cumulativePercent: 83 },
  { name: '크랙', count: 18, cumulativePercent: 92 },
  { name: '기타', count: 16, cumulativePercent: 100 },
];

export default function QualityManagement() {
  const [activeConceptId, setActiveConceptId] = useState('yield-importance');
  const activeConcept = QUALITY_CONCEPTS.find(c => c.id === activeConceptId) || QUALITY_CONCEPTS[0];

  // Initial historical data for SPC chart
  const initialPoints: Point[] = [
    { sampleId: 1, value: 50.2, status: 'normal' },
    { sampleId: 2, value: 49.5, status: 'normal' },
    { sampleId: 3, value: 51.1, status: 'normal' },
    { sampleId: 4, value: 48.8, status: 'normal' },
    { sampleId: 5, value: 50.4, status: 'normal' },
    { sampleId: 6, value: 49.8, status: 'normal' },
    { sampleId: 7, value: 50.9, status: 'normal' },
    { sampleId: 8, value: 51.5, status: 'normal' },
    { sampleId: 9, value: 49.2, status: 'normal' },
    { sampleId: 10, value: 50.1, status: 'normal' },
    { sampleId: 11, value: 50.6, status: 'normal' },
    { sampleId: 12, value: 49.9, status: 'normal' },
  ];

  const [spcPoints, setSpcPoints] = useState<Point[]>(initialPoints);
  const [driftCount, setDriftCount] = useState(0);

  const UCL = 55.0;
  const LCL = 45.0;
  const CL = 50.0;

  // Add a normal random sample
  const addNormalSample = () => {
    const newVal = parseFloat((48.5 + Math.random() * 3.0).toFixed(1));
    const newPoint: Point = {
      sampleId: spcPoints.length + 1,
      value: newVal,
      status: 'normal',
    };
    setSpcPoints(prev => [...prev, newPoint]);
  };

  // Add an abnormal out-of-control sample
  const addAbnormalSample = () => {
    // Generate a value that is either > UCL or < LCL
    const isHigh = Math.random() > 0.5;
    const newVal = parseFloat((isHigh ? 55.5 + Math.random() * 3.5 : 41.5 + Math.random() * 3.0).toFixed(1));
    const newPoint: Point = {
      sampleId: spcPoints.length + 1,
      value: newVal,
      status: 'error',
      comment: isHigh ? '관리 상한선(UCL) 초과 발생' : '관리 하한선(LCL) 미만 발생',
    };
    setSpcPoints(prev => [...prev, newPoint]);
  };

  // Simulate a tool drift (sequential trend upward)
  const triggerToolDrift = () => {
    const nextVal = parseFloat((50.5 + driftCount * 1.1 + Math.random() * 0.5).toFixed(1));
    const status = nextVal >= UCL ? 'error' : nextVal >= UCL - 1.5 ? 'warning' : 'normal';
    
    const newPoint: Point = {
      sampleId: spcPoints.length + 1,
      value: nextVal,
      status: status,
      comment: nextVal >= UCL ? '도구 점진 마모로 인한 한계 돌파!' : `마모 이상 경향성 누적 (${driftCount + 1}단계)`,
    };
    
    setSpcPoints(prev => [...prev, newPoint]);
    setDriftCount(prev => prev + 1);
  };

  const resetSpcChart = () => {
    setSpcPoints(initialPoints);
    setDriftCount(0);
  };

  // Helper calculations for SPC alerts
  const latestPoints = useMemo(() => spcPoints.slice(-15), [spcPoints]);
  const alarms = useMemo(() => {
    const list: string[] = [];
    const last = spcPoints[spcPoints.length - 1];
    
    if (last) {
      if (last.value >= UCL) {
        list.push(`⚠️ 경고: [샘플 ${last.sampleId}] 상한 한계선(UCL)을 돌파하였습니다! 공정 즉시 정지가 권장됩니다.`);
      } else if (last.value <= LCL) {
        list.push(`⚠️ 경고: [샘플 ${last.sampleId}] 하한 한계선(LCL)을 돌파하였습니다! 설비 점검이 필요합니다.`);
      }
    }

    // Run test: Check if last 6 points are continuously increasing
    if (spcPoints.length >= 6) {
      const last6 = spcPoints.slice(-6);
      let isIncreasing = true;
      let isDecreasing = true;
      for (let i = 1; i < last6.length; i++) {
        if (last6[i].value <= last6[i-1].value) isIncreasing = false;
        if (last6[i].value >= last6[i-1].value) isDecreasing = false;
      }
      if (isIncreasing) {
        list.push("📉 트렌드 감지: 6회 연속 수치 상승이 확인되었습니다. (노즐 마모 또는 압력 드리프트 징후)");
      } else if (isDecreasing) {
        list.push("📈 트렌드 감지: 6회 연속 수치 하락이 확인되었습니다. (가스 유량 저하 징후)");
      }
    }

    // Bias test: Check if last 9 points are on the same side of the mean (CL)
    if (spcPoints.length >= 9) {
      const last9 = spcPoints.slice(-9);
      const allAbove = last9.every(p => p.value > CL);
      const allBelow = last9.every(p => p.value < CL);
      if (allAbove || allBelow) {
        list.push("🔍 쏠림 현상(Bias) 감지: 연속 9개 샘플이 평균선(CL)의 한쪽에 치우쳐 있습니다. 평균 편차 보정이 요구됩니다.");
      }
    }

    return list;
  }, [spcPoints]);

  return (
    <div className="py-8 sm:py-12 bg-slate-50 dark:bg-slate-900/50 min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            반도체 품질 관리 & 통계 제어 (SPC)
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            0.1 나노미터의 오차도 허용치 않는 최고 수준의 반도체 공정 품질 시스템을 인터랙티브하게 체험해 봅니다.
          </p>
        </div>

        {/* Tab Selector of Quality Concepts */}
        <div className="flex justify-center border-b border-slate-200 dark:border-slate-800 pb-px">
          <div className="flex space-x-4">
            {QUALITY_CONCEPTS.map((concept) => (
              <button
                key={concept.id}
                onClick={() => setActiveConceptId(concept.id)}
                className={`pb-4 text-xs sm:text-sm font-bold border-b-2 transition-all uppercase tracking-wider ${
                  activeConceptId === concept.id
                    ? 'border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-950 dark:hover:text-white'
                }`}
              >
                {concept.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Concept Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Conceptual description */}
          <div className="lg:col-span-5 rounded-none border-2 border-slate-200 bg-white p-6 shadow-none dark:border-slate-800 dark:bg-slate-950 space-y-4">
            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-widest">
              {activeConcept.engTitle}
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              {activeConcept.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
              {activeConcept.definition}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 leading-relaxed">
              {activeConcept.importance}
            </p>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-900 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider">핵심 세부 지표 및 관리 조건:</h4>
              <ul className="space-y-1.5">
                {activeConcept.details.map((detail, idx) => (
                  <li key={idx} className="flex items-start text-xs text-slate-500 dark:text-slate-400 font-medium">
                    <span className="mr-2 text-blue-500">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* SPC Chart Simulator Workspace */}
          <div className="lg:col-span-7 rounded-none border-2 border-slate-200 bg-white p-6 shadow-none dark:border-slate-800 dark:bg-slate-950 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center uppercase tracking-tight">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  실시간 8대 공정 SPC 관리도 (Control Chart)
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">상한선(UCL: 55)과 하한선(LCL: 45), 평균값(CL: 50)을 추적합니다.</p>
              </div>
              
              {/* Reset action */}
              <button
                onClick={resetSpcChart}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline uppercase tracking-wider self-start sm:self-center"
              >
                차트 완전 초기화
              </button>
            </div>

            {/* Interactive SVG Control Chart */}
            <div className="h-64 sm:h-72 w-full rounded-none bg-slate-950 border-2 border-slate-800 p-4 relative" id="spc-chart-view">
              
              {/* Custom SVG Line graph */}
              <svg viewBox="0 0 500 220" className="w-full h-full">
                
                {/* Horizontal reference lines */}
                {/* UCL line */}
                <line x1="40" y1="30" x2="480" y2="30" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="485" y="34" fill="#f43f5e" fontSize="9" fontWeight="bold">UCL (55.0)</text>
                
                {/* CL line */}
                <line x1="40" y1="100" x2="480" y2="100" stroke="#cbd5e1" strokeWidth="1" strokeOpacity="0.4" />
                <text x="485" y="104" fill="#94a3b8" fontSize="9">CL (50.0)</text>
                
                {/* LCL line */}
                <line x1="40" y1="170" x2="480" y2="170" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="485" y="174" fill="#f43f5e" fontSize="9" fontWeight="bold">LCL (45.0)</text>

                {/* Y Axis line */}
                <line x1="40" y1="20" x2="40" y2="190" stroke="#475569" strokeWidth="1" />
                {/* Y ticks */}
                <text x="15" y="34" fill="#64748b" fontSize="8" textAnchor="middle">55</text>
                <text x="15" y="104" fill="#64748b" fontSize="8" textAnchor="middle">50</text>
                <text x="15" y="174" fill="#64748b" fontSize="8" textAnchor="middle">45</text>

                {/* Plotted line and dots */}
                {(() => {
                  const pointsCount = latestPoints.length;
                  const xSpacing = 420 / Math.max(pointsCount - 1, 1);
                  const getSvgY = (v: number) => {
                    const minVal = 40.0;
                    const maxVal = 60.0;
                    return 190 - ((v - minVal) / (maxVal - minVal)) * 160;
                  };

                  const dPath = latestPoints.reduce((acc, p, idx) => {
                    const x = 40 + idx * xSpacing;
                    const y = getSvgY(p.value);
                    return acc + (idx === 0 ? `M ${x},${y}` : ` L ${x},${y}`);
                  }, "");

                  return (
                    <>
                      {/* Connection Line */}
                      <path d={dPath} fill="none" stroke="#2563eb" strokeWidth="2" />

                      {/* Dots */}
                      {latestPoints.map((p, idx) => {
                        const x = 40 + idx * xSpacing;
                        const y = getSvgY(p.value);
                        const isOut = p.value >= UCL || p.value <= LCL;
                        const isWarning = p.status === 'warning';
                        
                        return (
                          <g key={p.sampleId} className="group cursor-pointer">
                            <circle
                              cx={x}
                              cy={y}
                              r={isOut ? 6 : isWarning ? 5 : 4}
                              fill={isOut ? '#ef4444' : isWarning ? '#eab308' : '#3b82f6'}
                              stroke="#0f172a"
                              strokeWidth="1.5"
                            />
                            {/* Simple tooltip simulation inside SVG */}
                            <title>{`샘플 #${p.sampleId}: ${p.value} (${p.comment || '정상'})`}</title>
                            
                            {/* X Axis Labels */}
                            {p.sampleId % 3 === 0 && (
                              <text x={x} y="202" fill="#64748b" fontSize="7" textAnchor="middle">{`#${p.sampleId}`}</text>
                            )}
                          </g>
                        );
                      })}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Interactive simulator controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={addNormalSample}
                className="rounded-none border border-blue-200 bg-blue-50/50 hover:bg-blue-50 px-4 py-2.5 text-xs font-bold text-blue-700 dark:border-blue-950/40 dark:bg-blue-950/20 dark:text-blue-400 uppercase tracking-tight"
              >
                🟢 정상 샘플 추가
              </button>
              
              <button
                onClick={addAbnormalSample}
                className="rounded-none border border-red-200 bg-red-50/50 hover:bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 dark:border-red-950/40 dark:bg-red-950/20 dark:text-red-400 uppercase tracking-tight"
              >
                🔴 상하한 돌파 불량 추가
              </button>

              <button
                onClick={triggerToolDrift}
                className="rounded-none border border-amber-200 bg-amber-50/50 hover:bg-amber-50 px-4 py-2.5 text-xs font-bold text-amber-700 dark:border-amber-950/40 dark:bg-amber-950/20 dark:text-amber-400 uppercase tracking-tight"
              >
                🟡 설비 마모 드리프트 추가
              </button>
            </div>

            {/* Active alarms list */}
            {alarms.length > 0 && (
              <div className="rounded-none bg-red-50 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/50 p-4 space-y-1">
                <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 tracking-widest">
                  ⚠️ 실시간 품질 통계 이상 경보 (Out of Control Alerts)
                </span>
                {alarms.map((alarm, idx) => (
                  <p key={idx} className="text-xs text-red-700 dark:text-red-300 leading-relaxed font-semibold">
                    {alarm}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Defects Pareto Section */}
        <div className="rounded-none border-2 border-slate-200 bg-white p-6 sm:p-8 shadow-none dark:border-slate-800 dark:bg-slate-950 space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">
              반도체 대표 불량 원인 분석 (Pareto Chart)
            </h3>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              "결함의 80%는 상위 20%의 원인에서 나온다"는 파레토 법칙에 기반한 실제 제조 오염 분석입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Visual Pareto chart inside SVG */}
            <div className="h-60 sm:h-64 rounded-none bg-slate-50 border-2 border-slate-200 dark:bg-slate-950/40 dark:border-slate-900 p-4">
              <svg viewBox="0 0 400 200" className="w-full h-full">
                {/* Axes */}
                <line x1="40" y1="160" x2="360" y2="160" stroke="#64748b" strokeWidth="1" />
                <line x1="40" y1="20" x2="40" y2="160" stroke="#64748b" strokeWidth="1" />
                <line x1="360" y1="20" x2="360" y2="160" stroke="#64748b" strokeWidth="1" />

                {/* Left Y ticks (Counts) */}
                <text x="25" y="24" fill="#64748b" fontSize="8" textAnchor="middle">200</text>
                <text x="25" y="90" fill="#64748b" fontSize="8" textAnchor="middle">100</text>
                <text x="25" y="160" fill="#64748b" fontSize="8" textAnchor="middle">0</text>

                {/* Right Y ticks (Percent) */}
                <text x="375" y="24" fill="#64748b" fontSize="8" textAnchor="middle">100%</text>
                <text x="375" y="90" fill="#64748b" fontSize="8" textAnchor="middle">50%</text>
                <text x="375" y="160" fill="#64748b" fontSize="8" textAnchor="middle">0%</text>

                {/* Render bars and line nodes */}
                {(() => {
                  const maxVal = 200;
                  const barSpacing = 70;
                  
                  const linePoints = paretoData.map((d, i) => {
                    const x = 75 + i * barSpacing;
                    const y = 160 - (d.cumulativePercent / 100) * 140;
                    return { x, y };
                  });

                  const dLine = linePoints.reduce((acc, pt, idx) => 
                    acc + (idx === 0 ? `M ${pt.x},${pt.y}` : ` L ${pt.x},${pt.y}`), "");

                  return (
                    <>
                      {/* Bars */}
                      {paretoData.map((d, i) => {
                        const x = 55 + i * barSpacing;
                        const barHeight = (d.count / maxVal) * 140;
                        const y = 160 - barHeight;
                        
                        return (
                          <g key={d.name}>
                            {/* Column block */}
                            <rect
                              x={x}
                              y={y}
                              width="40"
                              height={barHeight}
                              fill={i === 0 ? '#1e3a8a' : i === 1 ? '#2563eb' : '#3b82f6'}
                            />
                            {/* Bar label count */}
                            <text x={x + 20} y={y - 5} fill="#475569" fontSize="8" fontWeight="bold" textAnchor="middle">
                              {d.count}
                            </text>
                            
                            {/* Category X labels */}
                            <text x={x + 20} y="174" fill="#64748b" fontSize="7.5" fontWeight="bold" textAnchor="middle">
                              {d.name.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}

                      {/* Cumulative Curve */}
                      <path d={dLine} fill="none" stroke="#f43f5e" strokeWidth="2" />
                      {linePoints.map((pt, i) => (
                        <circle
                          key={i}
                          cx={pt.x}
                          cy={pt.y}
                          r="3.5"
                          fill="#f43f5e"
                          stroke="#ffffff"
                          strokeWidth="1"
                        />
                      ))}
                    </>
                  );
                })()}
              </svg>
            </div>

            {/* Explanatory descriptions */}
            <div className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center uppercase tracking-tight">
                <Info className="h-4.5 w-4.5 mr-2 text-blue-500" />
                불량 요인 분석 결과
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                파레토 도표를 분석해 보면 <strong>'파티클(먼지 입자)'</strong>과 <strong>'스크래치(긁힘)'</strong> 단 두 가지 원인이 반도체 수율 저하 전체 불량 횟수의 <strong>71.0%</strong>를 차지하고 있습니다.
              </p>
              
              <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-900">
                <div className="flex items-start space-x-2.5 text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-none bg-slate-900 text-white font-bold">1</span>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-tight">클린룸 먼지 통제 집중:</strong>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">최다 원인인 파티클 유입을 막기 위해 정밀 공기 필터 점검과 작업원 보호구(방진복) 규정을 대폭 강화해야 합니다.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-2.5 text-xs">
                  <span className="flex h-5 w-5 items-center justify-center rounded-none bg-slate-900 text-white font-bold">2</span>
                  <div>
                    <strong className="text-slate-800 dark:text-slate-200 uppercase tracking-tight">CMP 슬러리 정밀 여과:</strong>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">스크래치는 주로 평탄화(CMP) 및 이송 시 쓸림이 원인이므로 슬러리 연마제 필터 고도화가 해법입니다.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

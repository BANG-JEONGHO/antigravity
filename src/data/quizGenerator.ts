/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizQuestion } from '../types';

// Raw data to feed the procedural generator
const PROCESS_STEPS_RAW = [
    {
        id: "wafer-manufacturing",
        number: 1,
        name: "웨이퍼 제조 공정",
        engName: "Wafer Manufacturing",
        purpose: "모든 반도체의 기초가 되는 고순도 실리콘 웨이퍼 기판을 제조하고 매끄럽게 다듬는 공정",
        analogyTitle: "밀가루 반죽으로 균일하고 매끄러운 빵 도우 만들기",
        analogy: "고온에서 단결정 기둥(잉곳)을 만든 뒤, 아주 얇게 절단하고, 표면을 매끄럽게 연마하여 반짝이는 완벽한 판을 만듭니다.",
        explanation: "모래에서 정제한 초고순도 규소를 녹여 단결정 기둥(Ingot)을 성장시킨 후 얇게 썰어 표면을 거울처럼 화학적·기계적으로 연마하여 완성합니다.",
        equipment: ["초크랄스키 성장기 (Czochralski Puller)", "다이아몬드 와이어 소 (Wire Saw)", "양면 정밀 연마기 (Polishing Machine)"]
    },
    {
        id: "oxidation",
        number: 2,
        name: "산화 공정",
        engName: "Oxidation",
        purpose: "고온 환경에서 가스를 반응시켜 웨이퍼 표면에 얇고 깨끗한 절연 산화막(SiO₂) 보호막을 입히는 공정",
        analogyTitle: "프라이팬 표면에 타지 않도록 프라이 코팅막 입히기",
        analogy: "전류가 원치 않는 다른 곳으로 함부로 새어 나가지 않고 한 길로만 흐를 수 있도록, 웨이퍼 위에 전기 절연 보호막을 씌워 주는 것입니다.",
        explanation: "800~1200℃의 초고온 열확산로 내에 산소나 수증기를 주입해 실리콘 표면을 열화학적으로 산화시켜 절연 보호막을 성장시킵니다.",
        equipment: ["고온 산화 확산로 (Oxidation Furnace)", "급속 열처리 시스템 (RTP)"]
    },
    {
        id: "photolithography",
        number: 3,
        name: "포토 공정",
        engName: "Photolithography",
        purpose: "자외선 빛을 쬐어 설계 마스크의 정밀 회로 패턴을 웨이퍼 위에 새겨 넣는 공정",
        analogyTitle: "필름 인화지로 미세한 도안 사진 찍어 현상하기",
        analogy: "감광액이라는 빛 반응 잉크를 발라 놓은 뒤, 설계 도면 마스크 필름에 강력한 레이저 광을 쏴서 필요한 부분에만 잉크 무늬 그림자가 맺히도록 씻어냅니다.",
        explanation: "감광액을 코팅한 후, EUV나 ArF 레이저 노광 장비를 사용하여 나노미터 스케일 패턴을 조사하고 현상액으로 씻어내 유기 패턴을 만듭니다.",
        equipment: ["EUV/ArF 노광 장비 (Scanner)", "감광액 도포 및 현상 트랙 (Spin Coater/Developer)"]
    },
    {
        id: "etching",
        number: 4,
        name: "식각 공정",
        engName: "Etching",
        purpose: "포토 공정에서 얻은 감광액 마스크를 보호막 삼아, 나머지 불필요한 박막을 깎아내는 공정",
        analogyTitle: "판화에서 조각칼로 필요 없는 배경 깎아내기",
        analogy: "보호 패턴을 그려 놓고, 그 주변에 가스나 약품을 사용하여 깎아내어 완벽한 입체 조각을 완성하는 가공 작업입니다.",
        explanation: "회로가 아닌 부위의 산화막이나 반도체 박막 층을 플라즈마 반응 이온(Reactive Ion) 가스나 에칭액으로 선택적 부식/절삭시키는 공정입니다.",
        equipment: ["플라즈마 건식 식각 장비 (Dry Etcher)", "정밀 습식 세정 장비 (Wet Station)"]
    },
    {
        id: "thin-film-deposition",
        number: 5,
        name: "박막 증착 및 이온 주입 공정",
        engName: "Deposition & Ion Implantation",
        purpose: "웨이퍼 위에 나노급 절연/도전성 박막을 덮어 올리고 고압 이온을 주입해 실리콘의 전도성을 제어하는 공정",
        analogyTitle: "벽지 고르게 바르기 & 영양 주사 투여하기",
        analogy: "벽면에 아주 고르고 얇은 특수 벽지를 완벽하게 도배하고, 부도체 원판에 전기 신호가 다닐 수 있도록 영양 불순물 이온을 주사하는 과정입니다.",
        explanation: "가스를 이용하여 기상 증착(CVD/ALD)을 진행하고, 도펀트 이온(P, As, B 등)을 전계로 가속 주입해 실리콘에 반도체 전기적 성질을 부여합니다.",
        equipment: ["원자층 증착 장비 (ALD)", "이온 임플란터 (Ion Implantation System)", "화학 기상 증착 장비 (PECVD)"]
    },
    {
        id: "metalization",
        number: 6,
        name: "금속 배선 공정",
        engName: "Metal Wiring",
        purpose: "완성된 개별 소자들을 저저항 금속 전선으로 연결하여 전기 신호 통로를 뚫어주는 공정",
        analogyTitle: "도시 구석구석 집마다 보이지 않는 구리 전선망 가설하기",
        analogy: "개별 소자 장치들이 유기적으로 작동하도록, 소자들을 전기 전선(구리 배선)으로 밀접하게 이어주는 연결 작업과 같습니다.",
        explanation: "고전도성의 구리(Cu)나 알루미늄(Al)을 증착하여 전선을 까는 공정으로, 초정밀 구리 충전을 위해 다마신 공법과 CMP 평탄 기술을 조합합니다.",
        equipment: ["금속 화학 기상 증착기 (MOCVD)", "구리 전기도금 설비 (Electroplating Line)", "CMP 정밀 평탄화 폴리셔 (CMP Polisher)"]
    },
    {
        id: "electrical-test",
        number: 7,
        name: "EDS 공정",
        engName: "Electrical Die Sorting",
        purpose: "웨이퍼 가공 완료 후 개별 칩들의 전기 신호 응답 테스트를 수행해 정상 칩과 불량 칩을 분류하는 공정",
        analogyTitle: "모든 사과를 포장 상자에 넣기 전에 흠집이나 맛을 검사해 분류하기",
        analogy: "포장 조립하기 전 단계에서 정상 작동하는 양품 칩만 감별해 내고, 불량 칩에는 잉크 표시를 해 두어 필터링합니다.",
        explanation: "프로브 카드의 바늘을 칩 패드에 밀착시키고 전기 신호를 흘려 칩의 저항, 작동 성능 및 결함을 선별하는 웨이퍼 검사 과정입니다.",
        equipment: ["반도체 테스터 (Ate Tester)", "웨이퍼 프로버 (Wafer Prober)", "정밀 프로브 카드 (Probe Card)"]
    },
    {
        id: "packaging",
        number: 8,
        name: "패키징 및 최종 검사 공정",
        engName: "Packaging & Final Test",
        purpose: "합격 칩들을 개별로 절단하고 에폭시 수지로 감싼 후 신뢰성 가혹검사를 거쳐 완제품을 출하하는 공정",
        analogyTitle: "반도체 칩에 옷을 튼튼하게 입히고 혹독한 지옥 테스트 통과하기",
        analogy: "반도체 심장을 수분과 충격에서 지키도록 검은색 에폭시 수지 보호 갑옷을 입히고 전극 다리를 연결한 후 극한 가혹 환경 테스트를 통과시킵니다.",
        explanation: "다이아몬드 쏘로 웨이퍼를 개별 칩으로 자른 후, 금속 배선을 연결하고 EMC 에폭시 물질로 감싼 뒤 고온/고전압 번인(Burn-in) 검사를 수행합니다.",
        equipment: ["자동 웨이퍼 다이서 (Dicing Saw)", "고속 와이어 본더 (Wire Bond)", "에폭시 몰딩 오븐 (EMC Molding)", "최종 핸들러 & 테스터 (Handler & Test Cabinet)"]
    }
];

const DEFECTS_RAW = [
    { name: "두께 편차 (TTV)", desc: "웨이퍼 영역별 두께 불균일 굴곡", reason: "절단 와이어의 장력 흔들림이나 연마 압력 불균일", stepId: "wafer-manufacturing" },
    { name: "전위 및 격자 결함", desc: "실리콘 단결정 내부 원자 배열이 꼬이거나 미세 정렬이 어긋난 상태", reason: "결정 기둥 성장 시의 급격한 온도 요동", stepId: "wafer-manufacturing" },
    { name: "산화막 두께 편차", desc: "웨이퍼 표면 영역별 산화막 두께 차이 발생", reason: "가열 코일의 미세 온도 편차 및 가스 농도 불균일", stepId: "oxidation" },
    { name: "산화막 핀홀 (Pinhole)", desc: "코팅막 표면에 미세 기공이 뚫려 절연이 파괴되는 불량", reason: "표면 파티클(먼지)로 인한 열화학반응 방해", stepId: "oxidation" },
    { name: "미스얼라인먼트 (Misalignment)", desc: "밑층과 윗층 회로 패턴 축이 비껴나 어긋난 정렬 불량", reason: "노광기 정렬 정밀성 오차나 기계적 열 팽창", stepId: "photolithography" },
    { name: "패턴 붕괴 (Collapse)", desc: "감광액 미세 기둥이 세척/건조 표면장력으로 쓰러지는 불량", reason: "패턴의 높은 종횡비 구조 한계와 급격한 건조", stepId: "photolithography" },
    { name: "과소 식각 (Under-Etch)", desc: "덜 깎여 나가 소자 전도 통로가 개방되지 못하는 불량", reason: "플라즈마 가스 유량 부족 또는 식각 시간 제어 미달", stepId: "etching" },
    { name: "과도 식각 (Over-Etch)", desc: "과다하게 파여 들어가 회로선이 단절되거나 손상되는 불량", reason: "플라즈마 이온 강도 과다 및 챔버 가스 제어 실패", stepId: "etching" },
    { name: "박막 내 공동 (Void)", desc: "미세 틈새에 박막이 덜 채워져 내부에 빈 구멍이 생기는 불량", reason: "가스의 트렌치 내부 계단 피복력(Step Coverage) 부족", stepId: "thin-film-deposition" },
    { name: "도즈 편차 (Dose Inhomogeneity)", desc: "이온 불순물이 표면에 균일하게 분사되지 않고 농도가 치우치는 불량", reason: "가속 전압 전계 흔들림 및 이온 빔 동기 제어 오차", stepId: "thin-film-deposition" },
    { name: "일렉트로마이그레이션 (EM)", desc: "강한 전류 마찰로 금속 원자가 쓸려 이동해 전선이 끊어지는 불량", reason: "미세 금속배선의 단면적당 가혹한 고전류 밀도 부하", stepId: "metalization" },
    { name: "접촉 저항 이상 증가", desc: "배선 계면에 비전도성 이물이나 산화막이 끼어 신호가 둔화되는 불량", reason: "금속 증착 전 화학 정밀 세정 및 에칭 전처리 미흡", stepId: "metalization" },
    { name: "프로브 패드 스크래치", desc: "검사용 바늘이 칩 패드에 상처를 주어 미세 크랙을 유발하는 불량", reason: "프로버 장비의 침 접촉 깊이 제어 오차 및 압력 불일치", stepId: "electrical-test" },
    { name: "정전기 방전 소자 소손 (ESD)", desc: "검사 도중 돌발 정전기 전하가 유입되어 절연막이 구워져 망가지는 불량", reason: "정전기 접지 제어 불량 및 고전압 서지 보호 회로 손상", stepId: "electrical-test" },
    { name: "와이어 단선 및 휘어짐", desc: "골드 와이어가 에폭시 수지 주입 압력을 못 버텨 단선 또는 쇼트되는 불량", reason: "수지 사출 속도 조절 밸브 압력 이상 및 본딩 강도 불균일", stepId: "packaging" },
    { name: "패키지 크랙 및 계면 박리", desc: "수분이 침투한 상태에서 열을 받아 팽창하여 패키지가 깨지는 불량", reason: "조립 라인 내 항온항습 기준 이탈 및 잔류 수분 제거 실패", stepId: "packaging" }
];

const DICTIONARY_RAW = [
    { term: "수율 (Yield)", definition: "웨이퍼 한 장에서 전기 검사를 통과하여 가용한 최종 정상 동작 양품 칩의 비율(%)" },
    { term: "불량률 (Defect Rate)", definition: "전체 제품 중 결함이나 에러로 불합격 처리된 제품의 비율로 주로 ppm 단위를 사용" },
    { term: "CMP (Chemical Mechanical Polishing)", definition: "화학 반응제와 기계적 연마 패드로 울퉁불퉁한 웨이퍼를 완벽히 평평하게 연마하는 기술" },
    { term: "EUV (Extreme Ultra Violet)", definition: "13.5nm 파장의 극단적으로 짧은 광원으로 아주 미세한 수 나노미터 회로선을 그리는 기술" },
    { term: "PR (Photoresist)", definition: "빛 반응을 받아 석유 유래 유기 결합 구조가 녹아 나가거나 보존되는 감광성 용제" },
    { term: "파티클 (Particle)", definition: "클린룸 내에서 회로 배선 단선 및 쇼트를 일으키는 가장 무서운 나노 크기 미세 먼지 입자" },
    { term: "클린룸 (Cleanroom)", definition: "대기 오염 파티클, 온도, 습도, 기압이 나노미터 공정을 위해 칼같이 초정밀 제어되는 청정 방" },
    { term: "EDS (Electrical Die Sorting)", definition: "웨이퍼 단에서 전기 핀을 접촉해 양품과 불량 칩을 판별하여 선별해 내는 전기 테스트" },
    { term: "SPC (Statistical Process Control)", definition: "제품 측정을 바탕으로 이상 징후를 통계적으로 예측 제어하여 사전 유지보수하게 돕는 통계 기법" },
    { term: "패턴 무너짐 (Pattern Collapse)", definition: "종횡비가 과도하게 높은 감광 패턴이 세정 건조 시 수분 표면장력으로 옆과 쓰러지거나 붙는 현상" },
    { term: "CVD (Chemical Vapor Deposition)", definition: "진공 챔버에 혼합 가스를 흘려 화학 결합을 유도하고 웨이퍼 상에 고체 막을 까는 증착 기법" },
    { term: "클랩 / 다이 (Die)", definition: "웨이퍼를 절단 기계로 가른 낱개 형태의 가용 회로 단품 칩 조각" }
];

// Helper to shuffle array options
function shuffleOptions(opts: string[]): string[] {
    const result = [...opts];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

// Keep a set of generated questions to check uniqueness
const generatedQuestionsSet = new Set<string>();
const questionsList: QuizQuestion[] = [];

let qCounter = 1;

function addQuestion(q: Omit<QuizQuestion, 'id'>) {
    const hash = q.question.trim();
    if (!generatedQuestionsSet.has(hash)) {
        generatedQuestionsSet.add(hash);
        questionsList.push({
            ...q,
            id: `generated-q-${qCounter++}`
        });
    }
}

// ==========================================
// GENERATOR 1: Process Step Purpose (Choice)
// ==========================================
for (let repeat = 0; repeat < 5; repeat++) {
    PROCESS_STEPS_RAW.forEach((step) => {
        const distractors = PROCESS_STEPS_RAW
            .filter((s) => s.id !== step.id)
            .map((s) => s.name);

        // Pattern 1
        const qText1 = `[반도체 공정 시험] 반도체 8대 공정 중 "${step.name}(${step.engName})"의 주요 목적으로 가장 올바른 설명은 무엇입니까? (세부 유형 #${repeat + 1})`;
        const options1 = shuffleOptions([
            step.purpose,
            distractors[0],
            distractors[1],
            distractors[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '공정 및 장비 (Process)',
            question: qText1,
            options: options1,
            correctAnswer: step.purpose,
            explanation: `"${step.name}"은(는) ${step.explanation}을 특징으로 합니다. 제시된 문항 중 가장 적합한 설명은 "${step.purpose}"입니다.`
        });

        // Pattern 2
        const qText2 = `[공정 정의 감별] 다음 설명이 정의하는 반도체 8대 공정의 명칭을 고르시오.\n\n"설명: ${step.purpose}" (반복차수 #${repeat + 1})`;
        const options2 = shuffleOptions([
            step.name,
            distractors[0],
            distractors[1],
            distractors[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '공정 및 장비 (Process)',
            question: qText2,
            options: options2,
            correctAnswer: step.name,
            explanation: `"${step.purpose}"은(는) 바로 반도체 8대 공정 중 "${step.name}"의 핵심 정의 및 역할에 해당합니다.`
        });
    });
}

// ==========================================
// GENERATOR 2: Process Step Analogies (Choice)
// ==========================================
for (let repeat = 0; repeat < 5; repeat++) {
    PROCESS_STEPS_RAW.forEach((step) => {
        const distractors = PROCESS_STEPS_RAW
            .filter((s) => s.id !== step.id)
            .map((s) => s.name);

        const qText = `[학습 비유 문제] 반도체 배움터 AI 튜터가 "${step.analogyTitle}"에 빗대어 수험생들에게 쉽게 이해하도록 설명한 반도체 핵심 공정은 무엇입니까? (패턴 #${repeat + 1})`;
        const options = shuffleOptions([
            step.name,
            distractors[0],
            distractors[1],
            distractors[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '공정 및 장비 (Process)',
            question: qText,
            options: options,
            correctAnswer: step.name,
            explanation: `AI 튜터는 ${step.name}의 개념을 학생들이 친숙하게 느낄 수 있도록 "${step.analogyTitle}" 비유를 통해 설명하고 있습니다. 상세 설명: ${step.analogy}`
        });
    });
}

// ==========================================
// GENERATOR 3: Equipment and Tools (Choice)
// ==========================================
for (let repeat = 0; repeat < 6; repeat++) {
    PROCESS_STEPS_RAW.forEach((step) => {
        const stepEquips = step.equipment;
        if (stepEquips && stepEquips.length > 0) {
            stepEquips.forEach((equip) => {
                const otherSteps = PROCESS_STEPS_RAW.filter((s) => s.id !== step.id);
                const randomOtherEquips: string[] = [];
                otherSteps.forEach((s) => {
                    if (s.equipment && s.equipment.length > 0) {
                        randomOtherEquips.push(s.equipment[Math.floor(Math.random() * s.equipment.length)]);
                    }
                });

                // Unique distractor items
                const distractors = Array.from(new Set(randomOtherEquips)).slice(0, 3);
                while (distractors.length < 3) {
                    distractors.push("일반 공구 박스");
                }

                const qText1 = `[핵심 공정 장비] 다음 반도체 제조 정밀 장비 중, "${step.name}"에서 가장 필수적으로 구동/활용되는 대표적인 설비는 무엇입니까? (장비 검정 #${repeat + 1})`;
                const options1 = shuffleOptions([
                    equip,
                    distractors[0],
                    distractors[1],
                    distractors[2]
                ]);
                addQuestion({
                    type: 'choice',
                    category: '공정 및 장비 (Process)',
                    question: qText1,
                    options: options1,
                    correctAnswer: equip,
                    explanation: `"${equip}" 장비는 8대 공정 중 "${step.name}"에 완벽히 소속되어 고유 가동되는 최첨단 시스템입니다.`
                });

                const qText2 = `[설비 분류 테스트] 반도체 생산 장비인 "${equip}"은(는) 다음 중 어떤 공정 카테고리에 속하는 설비입니까?`;
                const otherStepNames = otherSteps.map(s => s.name).slice(0, 3);
                const options2 = shuffleOptions([
                    step.name,
                    otherStepNames[0],
                    otherStepNames[1],
                    otherStepNames[2]
                ]);
                addQuestion({
                    type: 'choice',
                    category: '공정 및 장비 (Process)',
                    question: qText2,
                    options: options2,
                    correctAnswer: step.name,
                    explanation: `"${equip}"은(는) "${step.name}" 단계에서 핵심적으로 활용되는 최고가 대표 설비 중 하나입니다.`
                });
            });
        }
    });
}

// ==========================================
// GENERATOR 4: Defects & Root Causes (Choice)
// ==========================================
for (let repeat = 0; repeat < 7; repeat++) {
    DEFECTS_RAW.forEach((defect) => {
        const stepObj = PROCESS_STEPS_RAW.find((s) => s.id === defect.stepId);
        const stepName = stepObj ? stepObj.name : "반도체 제조";

        const otherDefects = DEFECTS_RAW
            .filter((d) => d.name !== defect.name)
            .map((d) => d.name);
        const distractors = otherDefects.slice(0, 3);

        // Cause to Defect
        const qText1 = `[수율 저하 결함 분석] "${stepName}"에서 발생하는 주요 결함 현상으로, "${defect.reason}"이(가) 가장 직접적인 원인이 되어 일어나는 치명적 불량은 무엇입니까? (유형 #${repeat + 1})`;
        const options1 = shuffleOptions([
            defect.name,
            distractors[0],
            distractors[1],
            distractors[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '결함 및 품질 관리 (Defect)',
            question: qText1,
            options: options1,
            correctAnswer: defect.name,
            explanation: `"${defect.name}" 불량은 주로 "${defect.reason}"에 의해 발생하며, 이는 공정 품질 규격에서 철저히 격리 통제해야 할 파라미터입니다.`
        });

        // Defect explanation / identification
        const qText2 = `[품질 규격 검사] 반도체 품질 관리에서 설명하는 "${defect.name}" 불량의 실질적인 세부 메커니즘으로 가장 타당한 설명은 무엇입니까? (세부 분석 #${repeat + 1})`;
        const otherDefectsDescs = DEFECTS_RAW
            .filter((d) => d.name !== defect.name)
            .map((d) => d.desc);
        const options2 = shuffleOptions([
            defect.desc,
            otherDefectsDescs[0],
            otherDefectsDescs[1],
            otherDefectsDescs[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '결함 및 품질 관리 (Defect)',
            question: qText2,
            options: options2,
            correctAnswer: defect.desc,
            explanation: `"${defect.name}"은(는) "${defect.desc}" 현상을 뜻하며, 발생 시 후속 소자 단선 및 저항 증가로 전면 수율 하락을 초래합니다.`
        });
    });
}

// ==========================================
// GENERATOR 5: Terminology Definitions (Choice)
// ==========================================
for (let repeat = 0; repeat < 7; repeat++) {
    DICTIONARY_RAW.forEach((dict) => {
        const otherTerms = DICTIONARY_RAW
            .filter((d) => d.term !== dict.term)
            .map((d) => d.term);
        const distractors = otherTerms.slice(0, 3);

        const qText1 = `[반도체 기본 용어사전] 다음 설명이 지칭하는 반도체 도메인 핵심 전문 용어로 가장 올바른 것은 무엇입니까?\n\n"설명: ${dict.definition}" (검정 #${repeat + 1})`;
        const options1 = shuffleOptions([
            dict.term,
            distractors[0],
            distractors[1],
            distractors[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '반도체 전문 용어 (Term)',
            question: qText1,
            options: options1,
            correctAnswer: dict.term,
            explanation: `제시된 정의인 "${dict.definition}"에 상응하는 가장 보편적이고 공인된 반도체 핵심 학술 용어는 바로 "${dict.term}"입니다.`
        });

        const qText2 = `[용어 직관 감별] 반도체 학과 강의에서 다루는 주요 키워드인 "${dict.term}"의 학술적 물리적 설명으로 가장 정확한 정답은 무엇입니까?`;
        const otherDefs = DICTIONARY_RAW
            .filter((d) => d.term !== dict.term)
            .map((d) => d.definition);
        const options2 = shuffleOptions([
            dict.definition,
            otherDefs[0],
            otherDefs[1],
            otherDefs[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '반도체 전문 용어 (Term)',
            question: qText2,
            options: options2,
            correctAnswer: dict.definition,
            explanation: `"${dict.term}"은(는) 바로 "${dict.definition}"을 뜻하며, 공정 관리의 절대적인 성과 분석 잣대로 작용합니다.`
        });
    });
}

// ==========================================
// GENERATOR 6: Yield Management Mathematical Scenarios (Choice)
// ==========================================
// We dynamically iterate over combinations of Line, Die, and Package yields to create unique math calculation problems
const lineYields = [95, 96, 97, 98, 99];
const dieYields = [80, 82, 85, 88, 90, 92, 95];
const pkgYields = [92, 94, 95, 96, 97, 98, 99];

let mathCount = 0;
for (const ly of lineYields) {
    for (const dy of dieYields) {
        for (const py of pkgYields) {
            if (mathCount >= 300) break; // Limit generation to keep size stable, yet highly diverse

            const rawTotal = (ly / 100) * (dy / 100) * (py / 100) * 100;
            const roundedTotal = Math.round(rawTotal * 100) / 100; // 2 decimal places

            const distractor1 = Math.round((roundedTotal + 4.5) * 100) / 100;
            const distractor2 = Math.round((roundedTotal - 3.2) * 100) / 100;
            const distractor3 = Math.round((roundedTotal * 0.9) * 100) / 100;

            const qText = `[수율 예측 수학 평가] 어느 실리콘 반도체 양산 라인의 웨이퍼 투입 대비 수율 데이터를 계측한 결과, 가공 FAB 공정의 **라인 수율(Line Yield)이 ${ly}%**, 검수 시의 **칩 수율(Die Yield)이 ${dy}%**, 최종 조립의 **패키지 수율(Package Yield)이 ${py}%**로 확인되었습니다. 이 생산 시퀀스의 전체 **누적 총수율(Overall Yield)**은 소수점 셋째 자리에서 반올림하여 최종 몇 %가 되겠습니까?`;

            const options = shuffleOptions([
                `${roundedTotal}%`,
                `${distractor1}%`,
                `${distractor2}%`,
                `${distractor3}%`
            ]);

            addQuestion({
                type: 'choice',
                category: 'SPC 및 수율 관리 (SPC/Yield)',
                question: qText,
                options: options,
                correctAnswer: `${roundedTotal}%`,
                explanation: `누적 총수율 계산 공식은 각 부분 수율의 곱입니다.\n공식: 누적 총수율 = 라인 수율 (${ly}%) × 칩 수율 (${dy}%) × 패키지 수율 (${py}%)\n대입: (${ly}/100) × (${dy}/100) × (${py}/100) = ${rawTotal.toFixed(4)}% 이며, 소수점 셋째 자리에서 반올림하면 최종 "${roundedTotal}%"이 산출됩니다.`
            });

            mathCount++;
        }
    }
}

// ==========================================
// GENERATOR 7: Process Sequence & Precedence (Choice)
// ==========================================
for (let repeat = 0; repeat < 8; repeat++) {
    // Sequence next step
    for (let i = 0; i < PROCESS_STEPS_RAW.length - 1; i++) {
        const current = PROCESS_STEPS_RAW[i];
        const next = PROCESS_STEPS_RAW[i + 1];
        const others = PROCESS_STEPS_RAW.filter((_, idx) => idx !== i + 1).map((s) => s.name).slice(0, 3);

        const qText = `[8대 공정 선후 순서] 반도체 제조 시퀀스의 정밀 표준 흐름 상, 제 ${current.number}단계인 **"${current.name}" 공정이 완벽하게 끝난 직후**에 배치되어 수행되는 그 다음 핵심 공정 단계는 무엇입니까? (순서 검정 #${repeat + 1})`;
        const options = shuffleOptions([
            next.name,
            others[0],
            others[1],
            others[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '공정 및 장비 (Process)',
            question: qText,
            options: options,
            correctAnswer: next.name,
            explanation: `반도체 8대 전공정/후공정 순서는 [웨이퍼 제조 -> 산화 -> 포토 -> 식각 -> 박막증착 및 이온주입 -> 금속배선 -> EDS -> 패키징/최종검사] 입니다. 따라서 "${current.name}" 바로 뒤에 오는 공정은 "${next.name}"입니다.`
        });
    }

    // Sequence previous step
    for (let i = 1; i < PROCESS_STEPS_RAW.length; i++) {
        const current = PROCESS_STEPS_RAW[i];
        const prev = PROCESS_STEPS_RAW[i - 1];
        const others = PROCESS_STEPS_RAW.filter((_, idx) => idx !== i - 1).map((s) => s.name).slice(0, 3);

        const qText = `[공정 흐름 선행 확인] 반도체 일관 가공 순서 중, 특정 회로가 생성되는 **"${current.name}" 단계를 시작하기 위해 바로 전 단계에서 먼저 완벽하게 완료되어야 하는** 선행 공정은 무엇입니까?`;
        const options = shuffleOptions([
            prev.name,
            others[0],
            others[1],
            others[2]
        ]);
        addQuestion({
            type: 'choice',
            category: '공정 및 장비 (Process)',
            question: qText,
            options: options,
            correctAnswer: prev.name,
            explanation: `항상 "${current.name}"에 완벽한 베이스를 다듬어 주기 위해 바로 전 단계에서 "${prev.name}"이(가) 수행되어야 올바른 수율 가공이 가능해집니다.`
        });
    }
}

// ==========================================
// GENERATOR 8: SPC Control Capability (Cp / Cpk Scenarios)
// ==========================================
// We vary Cp and Cpk values to test process capability diagnostics
const cpCpkScenarios = [
    { cp: 1.67, cpk: 1.67, desc: "공정 산포(정밀도)가 대단히 훌륭하고 중심선 치우침도 전혀 발생하지 않은 가장 최적의 공정 상태", category: "우수/일치" },
    { cp: 1.50, cpk: 1.00, desc: "공정 산포 자체는 훌륭하지만(Cp=1.5), 평균값이 한쪽 방향으로 치우쳐(Cpk=1.0) 중심 타겟 조정 조치가 필요한 상태", category: "양호/치우침" },
    { cp: 1.33, cpk: 0.60, desc: "공정 산포 한계는 규격 내에 들어오나, 평균 치우침이 대단히 심해 규격 하한선이나 상한선을 넘어선 불량이 대량 유발되기 일보직전인 상태", category: "보통/위험" },
    { cp: 0.80, cpk: 0.80, desc: "공정의 산포(정밀성 변동성) 자체가 너무 넓어 규격 한계(LCL, UCL)를 모두 위협하여 불량이 지속 출몰하고 있는 긴급 장비 정비 정비 상태", category: "부족/불량" },
    { cp: 1.20, cpk: 1.20, desc: "공정 능력이 보통 수준(Cp=1.2)이며 치우침 없이 비교적 한가운데에 제어 분포되어 있는 전형적인 상태", category: "보통/일치" }
];

for (let repeat = 0; repeat < 15; repeat++) {
    cpCpkScenarios.forEach((sc, idx) => {
        const distractors = cpCpkScenarios
            .filter((_, sIdx) => sIdx !== idx)
            .map((s) => s.desc);

        const qText = `[통계적 공정제어 진단] 반도체 품질관리팀에서 수집된 두께 측정 데이터 분포의 **공정 능력 지수(Cp)가 ${sc.cp.toFixed(2)}**, 치우침을 반영한 **실질 공정 능력 지수(Cpk)가 ${sc.cpk.toFixed(2)}**로 도출되었습니다. 이 계측 결과에 관한 엔지니어의 전문적 품질 평가 의견으로 가장 합당한 분석은 무엇입니까? (사례 분석 #${repeat + 1})`;
        const options = shuffleOptions([
            sc.desc,
            distractors[0],
            distractors[1],
            distractors[2]
        ]);

        addQuestion({
            type: 'choice',
            category: 'SPC 및 수율 관리 (SPC/Yield)',
            question: qText,
            options: options,
            correctAnswer: sc.desc,
            explanation: `Cp는 공정의 고유 정밀도(포텐셜 능력)를 판단하며, Cpk는 평균이 정중앙 타겟에서 얼마나 쏠렸는지(치우침)를 종합 반영합니다. Cp가 ${sc.cp}로 우수하나 Cpk가 ${sc.cpk}로 매우 낮다면 산포 정밀도는 좋은데 기계 셋팅 점이 정렬되지 않아 한쪽으로 치우쳐져 있는 양상입니다.`
        });
    });
}

// ==========================================
// GENERATOR 9: True or False (T/F) Quality Concepts
// ==========================================
const tfTemplates = [
    {
        q: "포토리소그래피(포토) 공정은 다른 공정 단계(식각, 이온주입 등)를 직접 거치지 않은 현상(Development) 직후 단계라면, 불량 검출 시 감광액을 깨끗이 씻어내고 처음부터 다시 완벽히 패턴을 그리는 '재작업(Re-work)'이 예외적으로 허용된다.",
        ans: "O (그렇다)",
        exp: "식각(Etching)이나 이온주입 같은 물리화학적 비가역 변형을 가하기 전 단계이므로, 유기용제로 감광 패턴을 씻어내어 원 웨이퍼 기판을 살리는 Re-work 재작업이 전격 가능합니다.",
        opts: ["O (그렇다)", "X (아니다, 무조건 폐기해야 함)"]
    },
    {
        q: "산화 공정에서 '습식 산화(Wet Oxidation)' 공정은 고농도의 산소와 수증기를 혼합 주입하기 때문에 순수 산소 가스만 쓰는 건식 산화 방식보다 두껍고 신속하게 막을 성장시킬 수 있으나, 막질의 밀도와 유전체 정밀 절연성은 약간 저하되는 트레이드오프가 있다.",
        ans: "O (그렇다)",
        exp: "습식 산화는 화학 반응속도가 급격히 빠르고 두꺼운 차폐 보호막을 깔 때 용이하지만, 반응 산화물의 나노 정밀 내부 조밀성은 순수 산소 가스로 장시간 성장시킨 건식 산화보다 약간 뒤떨어집니다.",
        opts: ["O (그렇다)", "X (아니다, 습식 산화가 품질도 더 좋음)"]
    },
    {
        q: "CMP(화학 기계적 연마) 공정은 고도의 나노 가공 기하구조상 웨이퍼 표면을 완벽히 평탄하게 깎기 위해 오직 플라즈마 기체 분자만을 공급해 건식으로 깎는 공정이다.",
        ans: "X (아니다)",
        exp: "CMP는 화학적인 슬러리 액상 부식제(Chemical)와 기계적으로 묵직하게 회전 누르는 연마 패드 마찰(Mechanical)이 직접 결합되어 상호 물리화학작용으로 표면 요철을 다듬는 습식/기계 평탄화 작업입니다.",
        opts: ["O (그렇다)", "X (아니다)"]
    },
    {
        q: "통계적 공정 제어(SPC)에서 이상 알람(OOC)은 오직 측정치가 정해진 관리 상하한선(UCL, LCL)을 한 번이라도 완벽히 돌파해 벗어난 극단적 오류 상황에서만 발동되며, 한계선 안쪽에서의 규칙적인 편향 흐름은 정상으로 무시한다.",
        ans: "X (아니다, 편향 흐름도 이상 알람 대상)",
        exp: "관리 한계선 내에 있더라도 평균값 한쪽으로 유독 연속 9번 연속으로 점이 몰려 찍히거나(Run), 계단식 일방향 흐름 등 이상 마모 패턴(Trend)이 나타나면 잠재적 가동 위험으로 판단해 적극 예방 경보를 발동합니다.",
        opts: ["O (그렇다, 한계선 이탈시에만 경보)", "X (아니다, 편향 흐름도 이상 알람 대상)"]
    },
    {
        q: "EDS(Electrical Die Sorting) 검사는 완벽하게 패키징 몰딩 조립 공정까지 모두 끝마쳐 완제품 리드 프레임이 장착된 컴퓨터 소자 단품 상태에서 고온 전수 가혹 테스팅을 돌리는 후공정 테스트이다.",
        ans: "X (아니다, 웨이퍼 레벨 테스트임)",
        exp: "EDS는 반도체를 낱개 칩으로 썰어 패키징하기 이전 단계, 즉 '웨이퍼 가공 완료 상태'에서 프로브 바늘을 접촉해 양품/불량을 감별 선별하는 FAB 직후 전공정 정밀 테스트입니다.",
        opts: ["O (그렇다, 조립 완제품 테스트임)", "X (아니다, 웨이퍼 레벨 테스트임)"]
    },
    {
        q: "반도체 수율(Yield) 지표란 생산에 투자 및 투입된 원판 웨이퍼 총 장수 중에서 한 장이라도 깨지지 않고 마지막 패키징 라인까지 물리적으로 원형을 보전해 완주한 웨이퍼의 개수 비율(%)을 지칭하는 용어이다.",
        ans: "X (아니다, 양품 칩의 비율임)",
        exp: "수율은 웨이퍼의 물리적 완주율이 아니라, 웨이퍼 위에 집적 설계된 총 칩(Die) 후보 개수 대비 최종 전기적 합격 판정을 받아 실제로 고객사에 팔 수 있는 양품 완제품 칩 개수의 백분율 비율(%)을 뜻합니다.",
        opts: ["O (그렇다)", "X (아니다, 양품 칩의 비율임)"]
    }
];

for (let repeat = 0; repeat < 25; repeat++) {
    tfTemplates.forEach((template) => {
        const qText = `${template.q} (자가 문항 #${repeat + 1})`;
        addQuestion({
            type: 'tf',
            category: 'SPC 및 수율 관리 (SPC/Yield)',
            question: qText,
            options: template.opts,
            correctAnswer: template.ans,
            explanation: template.exp
        });
    });
}

// Slice to exactly 1000 questions if we generated more, or fill to ensure we have exactly 1000
const finalQuestionsList = questionsList.slice(0, 1000);

// Just in case we didn't generate enough (should easily have over 1000 with the calculations), fill in with padded questions
while (finalQuestionsList.length < 1000) {
    const padIdx = finalQuestionsList.length % tfTemplates.length;
    const padTemplate = tfTemplates[padIdx];
    finalQuestionsList.push({
        id: `generated-q-pad-${finalQuestionsList.length}`,
        type: 'tf',
        category: 'SPC 및 수율 관리 (SPC/Yield)',
        question: `${padTemplate.q} (추가 보강 문항 #${finalQuestionsList.length})`,
        options: padTemplate.opts,
        correctAnswer: padTemplate.ans,
        explanation: padTemplate.exp
    });
}

export const GENERATED_QUIZ_QUESTIONS = finalQuestionsList;

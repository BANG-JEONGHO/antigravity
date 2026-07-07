/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ProcessStep, QuizQuestion, DictionaryTerm, QualityConcept } from '../types';

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "wafer-manufacturing",
    number: 1,
    name: "웨이퍼 제조 공정",
    engName: "Wafer Manufacturing",
    purpose: "모든 반도체의 기초가 되는 고순도 실리콘 웨이퍼 기판을 제조하고 매끄럽게 다듬습니다.",
    analogyTitle: "밀가루 반죽으로 균일하고 매끄러운 빵 도우 만들기",
    analogy: "고온에서 둥글고 단단한 단결정 기둥(잉곳)을 만든 뒤, 식빵을 얇게 썰듯이 다이아몬드 날로 아주 얇게 절단하고, 표면을 매끄럽게 연마하여 거울처럼 반짝이는 완벽한 판을 만들어 냅니다.",
    explanation: "모래에서 정제한 초고순도 규소를 녹여 완벽한 단결정 기둥(Ingot)을 성장시킨 후, 다이아몬드 와이어 쏘를 사용해 대략 1mm 이하 두께의 얇은 원판으로 절단합니다. 표면의 미세 거칠기나 결함을 제거하기 위해 화학적·기계적 연마(Lapping/Polishing)를 거쳐 완성합니다.",
    equipment: ["초크랄스키 성장기 (Czochralski Puller)", "다이아몬드 와이어 소 (Wire Saw)", "양면 정밀 연마기 (Polishing Machine)"],
    defects: [
      { name: "두께 편차 (TTV)", desc: "웨이퍼의 영역별 두께가 균일하지 않고 미세하게 굴곡지는 현상", reason: "절단 와이어의 장력 흔들림이나 연마 압력 불균일" },
      { name: "전위 및 실리콘 격자 결함", desc: "실리콘 단결정 내부 원자 배열이 꼬이거나 미세 정렬이 어긋난 상태", reason: "결정 기둥 성장 시의 급격한 온도 요동" }
    ],
    qcImportance: "첫 단추인 웨이퍼 표면의 나노미터급 평탄도(Flatness)가 확보되어야만, 이후 공정에서 초미세 레이저/자외선 노광의 초점이 정확히 맞추어질 수 있습니다.",
    terminology: [
      { term: "초크랄스키 공법 (Czochralski Method)", definition: "고온 용융 실리콘 액에서 결정 씨앗(Seed)을 천천히 회전 연신하여 잉곳을 제조하는 공법" },
      { term: "슬러리 (Slurry)", definition: "웨이퍼 표면을 완벽한 거울 상태로 정밀 기계·화학 연마하기 위해 공급하는 미세 연마 현탁제" }
    ],
    color: "from-blue-500 to-cyan-500",
    darkColor: "from-blue-600 to-cyan-600"
  },
  {
    id: "oxidation",
    number: 2,
    name: "산화 공정",
    engName: "Oxidation",
    purpose: "고온 환경에서 가스를 반응시켜 웨이퍼 표면에 얇고 깨끗한 절연 산화막(SiO₂) 보호막을 입힙니다.",
    analogyTitle: "프라이팬 표면에 타지 않도록 프라이 코팅막 입히기",
    analogy: "전류가 원치 않는 다른 곳으로 함부로 새어 나가지 않고 한 길로만 흐를 수 있도록, 웨이퍼 위에 완벽하고 튼튼한 가림막(전기 코팅)을 씌워 주는 것과 같습니다.",
    explanation: "800~1200℃의 초고온 열확산로(Furnace) 내에 산소나 수증기를 고압 주입해 실리콘 웨이퍼 표면 자체를 열화학적으로 부식 산화시켜, 절연체인 이산화실리콘(SiO₂) 보호막을 성장시키는 공정입니다. 이 막은 전극과 실리콘 간의 누설 전류를 훌륭하게 절연 차단하는 역할을 합니다.",
    equipment: ["고온 산화 확산로 (Oxidation Furnace)", "급속 열처리 시스템 (RTP)"],
    defects: [
      { name: "산화막 두께 편차", desc: "웨이퍼 표면 영역별로 성장한 산화막 두께가 달라져 저항이 치우치는 불량", reason: "가열 코일의 미세 온도 구배 편차 및 가스 농도 치우침" },
      { name: "산화막 핀홀 (Pinhole)", desc: "코팅막 표면에 눈에 안 보이는 미세 기공이 뚫려 절연이 파괴되는 불량", reason: "표면에 묻은 나노 파티클(먼지)로 인해 산화 반응이 방해받아 뚫린 현상" }
    ],
    qcImportance: "초미세 트랜지스터 게이트의 유전성 제어와 전류 통제를 위해 균일한 산화막 두께 확보는 소자 수명과 에너지 효율의 생명줄입니다.",
    terminology: [
      { term: "건식 산화 (Dry Oxidation)", definition: "순수 산소 기체만을 사용하여 속도는 느리지만 품질과 밀도가 매우 높은 얇은 산화막을 얻는 열공정" },
      { term: "습식 산화 (Wet Oxidation)", definition: "산소와 수증기를 혼합하여 빠르고 두꺼운 막을 기를 때 쓰이나 막질의 밀도는 약간 떨어지는 공정" }
    ],
    color: "from-cyan-500 to-sky-500",
    darkColor: "from-cyan-600 to-sky-600"
  },
  {
    id: "photolithography",
    number: 3,
    name: "포토 공정",
    engName: "Photolithography",
    purpose: "자외선 빛을 쬐어 회로 설계 마스크의 정밀 회로 패턴을 웨이퍼 상에 도장 찍듯 새겨 넣습니다.",
    analogyTitle: "필름 인화지로 미세한 도안 사진 찍어 현상하기",
    analogy: "웨이퍼 표면에 감광액이라는 빛 반응 잉크를 발라 놓은 뒤, 설계 도면 마스크 필름에 강력한 레이저 광을 쏴서 필요한 부분에만 잉크 무늬 그림자가 맺히고 남도록 씻어내는 정밀 인쇄 기술입니다.",
    explanation: "포토레지스트(PR) 감광액을 웨이퍼에 스핀 코팅한 후, EUV(극자외선)나 ArF(불화아르곤) 레이저 노광 장비를 사용하여 나노미터 스케일 설계 패턴을 조준 노광합니다. 이후 화학 현상액으로 노광된 영역을 세척해 냄으로써 물리적 식각 차폐를 위한 유기 패턴을 형성합니다.",
    equipment: ["EUV/ArF 노광 장비 (Scanner)", "감광액 도포 및 현상 트랙 (Spin Coater/Developer)"],
    defects: [
      { name: "미스얼라인먼트 (Misalignment)", desc: "밑층 회로 패턴과 윗층 회로 패턴이 미세하게 축을 비껴나 어긋난 상태", reason: "노광기 정렬 정밀성 오차나 기계적 팽창" },
      { name: "패턴 붕괴 (Collapse)", desc: "너무 얇게 인쇄된 감광액 벽면 기둥이 화학 반응 세척액 건조 시 표면장력으로 쓰러진 상태", reason: "감광 패턴의 높은 종횡비 구조 한계와 수분 조절 실패" }
    ],
    qcImportance: "반도체 회로의 선폭 한계를 좌우하는 최고가 공정이며, 유일하게 각인 오류 발견 시 식각 전이라면 씻어내어 처음부터 재작업(Re-work)이 허용되는 특성이 있습니다.",
    terminology: [
      { term: "감광액 (Photoresist)", definition: "특정 파장의 강한 빛에 노출되었을 때 유기 분자 결합이 해체되거나 결속되는 반응 물질" },
      { term: "포토마스크 (Photomask)", definition: "초정밀 나노 회로 레이아웃 배선도가 순수 석영 유리에 크롬 금속 패턴으로 새겨진 광학 원판 필름" }
    ],
    color: "from-sky-500 to-teal-500",
    darkColor: "from-sky-600 to-teal-600"
  },
  {
    id: "etching",
    number: 4,
    name: "식각 공정",
    engName: "Etching",
    purpose: "포토 공정에서 얻은 감광액 마스크를 보호막 삼아, 나머지 불필요한 박막을 깎아냅니다.",
    analogyTitle: "판화에서 조각칼로 필요 없는 배경 깎아내기",
    analogy: "크레파스로 보호 그림을 그려 놓고, 그 주변에 약품이나 바늘을 사용해 슥슥 긁어내서 완벽한 음각 입체 조각을 완성하는 조각 작업과 같습니다.",
    explanation: "회로가 아닌 부위의 불필요한 산화막이나 반도체 박막 층을 플라즈마 반응 이온(Reactive Ion) 가스 혹은 산성 세정액을 활용해 선택적으로 부식/절삭시키는 공정입니다. 원하는 수직 형태로 회로 선을 깨끗이 뚫어내는 것이 관건입니다.",
    equipment: ["플라즈마 건식 식각 장비 (Dry Etcher)", "정밀 습식 세정 장비 (Wet Station)"],
    defects: [
      { name: "과소 식각 (Under-Etch)", desc: "깎여 나가야 할 깊이와 영역이 덜 깎여 전류가 연결되지 못하고 끊긴 불량", reason: "플라즈마 에칭 가스 유량 부족이나 정해진 시간 제어 미달" },
      { name: "과도 식각 (Over-Etch)", desc: "옆면이나 바닥면이 과다하게 파여 들어가 회로선이 끊어지거나 옆에 들러붙은 불량", reason: "플라즈마 이온 강도가 과하게 강했거나 장비 챔버 벽 가스 과포화" }
    ],
    qcImportance: "수백 층 높이의 초미세 트렌치를 수직 경사(Anisotropy) 90도에 가깝게 똑바로 파 내려가는 식각 선택비 제어 기술이 셀 용량과 수율을 결판냅니다.",
    terminology: [
      { term: "건식 식각 (Dry Etch)", definition: "가스를 이용해 플라즈마(Plasma) 상태의 반응성 이온을 생성시켜 수직 방향으로 아주 좁고 정교하게 깎는 핵심 기법" },
      { term: "이방성 식각 (Anisotropic Etching)", definition: "수평 방향 부식은 최대한 억제하고 수직 깊이 방향으로만 일방적으로 파내어 종횡비 높은 회로를 만드는 기술" }
    ],
    color: "from-teal-500 to-emerald-500",
    darkColor: "from-teal-600 to-emerald-600"
  },
  {
    id: "thin-film-deposition",
    number: 5,
    name: "박막 증착 및 이온 주입 공정",
    engName: "Deposition & Ion Implantation",
    purpose: "웨이퍼 위에 나노급 절연/도전성 박막을 덮어 올리고 고압 이온을 주입해 실리콘의 전도성을 제어합니다.",
    analogyTitle: "벽지 고르게 바르기 & 영양 주사 투여하기",
    analogy: "벽면에 아주 고르고 얇은 특수 벽지(박막)를 구석구석 완벽하게 도배하고, 실리콘이라는 부도체 원판에 전기 신호가 기어 다닐 수 있도록 불순물 영양 이온을 강력하게 주사해 넣는 과정입니다.",
    explanation: "기상 반응 가스를 이용해 웨이퍼 상에 1마이크로미터 이하의 화학적·물리적 기상 증착(CVD/ALD/PVD) 막을 형성합니다. 이어 전류 운반 역할을 할 도펀트 이온(P, As, B 등)을 강력한 전계 가속 장치로 웨이퍼 실리콘 격자 안으로 투과시켜, 절연체였던 실리콘을 전기가 통하는 반도체 성질로 완벽 변신시킵니다.",
    equipment: ["원자층 증착 장비 (ALD)", "이온 임플란터 (Ion Implantation System)", "화학 기상 증착 장비 (PECVD)"],
    defects: [
      { name: "박막 내 공동 (Void)", desc: "미세 전극 트렌치 틈을 채워 증착할 때, 내부 중간 부위에 채워지지 못한 빈 공기 구멍이 잔류하는 결함", reason: "증착 가스의 트레치 하단 피복력(Step Coverage) 한계" },
      { name: "도즈 편차 (Dose Inhomogeneity)", desc: "원하는 깊이와 농도만큼 이온 불순물이 균일하게 웨이퍼 전체에 분사되지 않고 뭉치거나 모자라는 상태", reason: "이온 주입 전압 가속 전계 요동 및 이온 빔 주사 동기 불일치" }
    ],
    qcImportance: "ALD(원자층 증착)의 두께 나노 정밀도는 칩의 정전용량을 완벽 제어하며, 이온 제어를 통한 저항 편차 억제는 칩 간 수율 편차를 잡는 키 역할을 합니다.",
    terminology: [
      { term: "ALD (Atomic Layer Deposition)", definition: "가스를 한 원자층 단위로 번갈아 투입하여 두께를 극한의 분자 수준 정밀도로 쌓을 수 있는 고도의 증착 공법" },
      { term: "어닐링 (Annealing)", definition: "이온 주입 충격으로 뒤흔들린 실리콘 단결정 격자를 뜨거운 열로 어루만져 재배열 및 활성화하는 고온 치유 공정" }
    ],
    color: "from-emerald-500 to-green-500",
    darkColor: "from-emerald-600 to-green-600"
  },
  {
    id: "metalization",
    number: 6,
    name: "금속 배선 공정",
    engName: "Metal Wiring",
    purpose: "완성된 트랜지스터 등 개별 소자들을 저저항 금속 전선(구리/알루미늄)으로 서로 연결해 통로를 뚫어줍니다.",
    analogyTitle: "도시 구석구석 집마다 보이지 않는 구리 전선망 가설하기",
    analogy: "개별 소자가 가전제품이라면, 이 장치들이 플러그를 꽂아 유기적으로 작동하도록 집안 벽면 내부에 전기 전선(구리 통로)을 연결해 길을 열어 주는 것과 같습니다.",
    explanation: "반도체 소자에 작동 전류와 제어 신호를 보내기 위해 고전도성의 구리(Cu)나 알루미늄(Al)을 증착하여 전선을 깔아 주는 공정입니다. 최근에는 정교하게 홈을 파고 구리를 채워 넣은 뒤 필요 없는 잉여 구리선을 깎아 내는 다마신(Damascene) 기술과 CMP 평탄 기술을 조합하여 최고 고속 배선을 구축합니다.",
    equipment: ["금속 화학 기상 증착기 (MOCVD)", "구리 전기도금 설비 (Electroplating Line)", "CMP 정밀 평탄화 폴리셔 (CMP Polisher)"],
    defects: [
      { name: "일렉트로마이그레이션 (EM)", desc: "강한 전류 흐름 마찰로 인해 미세 전선의 구리 금속 원자들이 물리적으로 쓸려 이동하며 끊어지는 치명적 열화", reason: "전류 밀도가 단위 전선 단면적 허용치 대비 초과되어 누적된 피로" },
      { name: "접촉 저항 이상 증가", desc: "구리선과 하부 트랜지스터 연결부 계면에 얇은 비전도성 이물이나 산화막이 끼어 고전압을 가해도 신호가 약해지는 불량", reason: "금속 증착 전 화학 정밀 에칭 세정(Pre-cleaning) 소홀" }
    ],
    qcImportance: "속도가 기하급수적으로 빨라진 요즘 반도체에서 신호 지연(RC Delay)의 대부분은 이 금속 배선 저항에 기인하므로, 균일한 금속 막질 제어가 칩 동작 주파수 속도를 전적으로 통제합니다.",
    terminology: [
      { term: "다마신 공법 (Damascene Method)", definition: "식각으로 미리 길을 만들어 두고 구리를 도금해 가득 채운 다음, CMP 공정으로 윗면을 연마해 복잡한 초미세 구리 배선을 까는 신공법" },
      { term: "배리어 메탈 (Barrier Metal)", definition: "증착된 구리 원자가 실리콘이나 절연막 구조 내로 침투 오염을 유발하지 않도록 주변을 얇게 코팅하는 보호 금속막 (예: TiN, Ta)" }
    ],
    color: "from-green-500 to-teal-500",
    darkColor: "from-green-600 to-teal-600"
  },
  {
    id: "electrical-test",
    number: 7,
    name: "EDS 공정",
    engName: "Electrical Die Sorting",
    purpose: "웨이퍼 가공 완료 직후, 개별 칩들의 전기 신호 응답 테스트를 수행해 정상 칩과 불량 칩을 칼같이 골라냅니다.",
    analogyTitle: "모든 사과를 포장 상자에 넣기 전에 흠집이나 맛을 검사해 분류하기",
    analogy: "출하 포장 상자에 아까운 비용을 들여 정밀 조립하기 전에, 웨이퍼 위에서 정상 작동하는 참 사과만 똑똑하게 센서 침으로 전기를 흘려 감별하고 나쁜 사과에는 표시를 해 두는 공정입니다.",
    explanation: "웨이퍼 가공 공정(FAB)이 끝난 후, 프로브 카드(Probe Card)의 눈금만큼 얇은 검사 침들을 칩 전극 패드에 밀착 접촉시키고 초고속 시퀀스 전기 신호를 인가합니다. 이를 통해 각 칩의 동작 여부, 전류 수치 이상, 내부 저항 한계 돌파를 정밀 측정하여 불량 칩을 선별하는 웨이퍼 레벨 검사 과정입니다.",
    equipment: ["반도체 테스터 (Ate Tester)", "웨이퍼 프로버 (Wafer Prober)", "정밀 프로브 카드 (Probe Card)"],
    defects: [
      { name: "프로브 패드 스크래치 손상", desc: "프로브 검사용 침 끝이 칩 패드 중심을 너무 강력한 각도와 압력으로 찍어 뒤틀려 크랙이 발생하는 현상", reason: "프로버 헤드의 상하 높이 정밀 오차 및 침 정렬 이탈" },
      { name: "정전기 방전 소자 소손 (ESD)", desc: "프로브 전원 고전압 공급 시 돌발 정전기 전기가 기판으로 급격하게 타고 들어가 미세 게이트 절연막을 까맣게 다 구워 버린 칩", reason: "정전기 예방 접지 전압 제어 관리 미비 또는 돌발 충격 서지 전압 차단 에러" }
    ],
    qcImportance: "포장 패키징 조립 공정은 고가의 원자재가 많이 들어가므로, 이 FAB 통과 단계에서 불량 칩을 정확하게 골라내야만 패키징 조립 공정 비용의 무모한 낭비를 원천 봉쇄하여 최적 수율 분석 원인을 확보합니다.",
    terminology: [
      { term: "프로브 카드 (Probe Card)", definition: "칩 위의 금속 단자 패드와 테스터 계측기를 물리적으로 브릿지해 전기 신호를 중계해 주는 미세 바늘이 집적된 전극 기판" },
      { term: "잉킹 (Inking)", definition: "테스트 결과 치명적 불량으로 판정된 웨이퍼 상의 특정 칩에 빨간 잉크 점을 찍거나 프로그램 데이터 상에 '불량 칩(Fail Marker)'으로 박아 넣어 조립 패키지 대상에서 원천 배제하는 공정" }
    ],
    color: "from-teal-500 to-indigo-500",
    darkColor: "from-teal-600 to-indigo-600"
  },
  {
    id: "packaging",
    number: 8,
    name: "패키징 및 최종 검사 공정",
    engName: "Packaging & Final Test",
    purpose: "웨이퍼의 합격 칩들을 개별로 절단하고 에폭시 패키지 수지로 감싸 신뢰성 열하검사 후 완제품을 출시합니다.",
    analogyTitle: "반도체 칩에 옷을 예쁘고 튼튼하게 입히고, 영하/고온 극한의 지옥 테스트 통과하기",
    analogy: "정교한 유리 같은 반도체 심장을 외부 충격과 수분으로부터 안전하게 보호하도록 단단한 검은 패키지 갑옷(성형 에폭시)을 입히고 외부 메인보드 전극 다리를 달아 준 뒤, 혹혹한 환경에서 정상 동작하는지 마지막으로 전수 테스트하는 공정입니다.",
    explanation: "웨이퍼를 낱개 다이(Die)로 다이아몬드 소 절단한 뒤 리드 프레임이나 볼 위에 에폭시 성형 화합물(EMC)로 단단하게 몰딩합니다. 이후 고온·고전압 가혹 스트레스를 연속으로 인가하는 번인(Burn-in) 검사 및 전기 외형 검사를 최종 통과해야 고객사에 안전하게 실장되어 출하됩니다.",
    equipment: ["자동 웨이퍼 다이서 (Dicing Saw)", "고속 와이어 본더 (Wire Bond)", "에폭시 몰딩 오븐 (EMC Molding)", "최종 핸들러 & 테스터 (Handler & Test Cabinet)"],
    defects: [
      { name: "와이어 단선 및 휘어짐", desc: "초미세 골드 와이어 연결선이 에폭시 수지 주입 압력을 못 버텨 휘면서 옆 선과 닿아 쇼트 나거나 단절된 불량", reason: "에폭시 사출 속도 조절 밸브 압력 이상 및 고속 와이어 결속 마모" },
      { name: "패키지 내부 크랙 및 틈새 박리", desc: "칩 표면과 성형 에폭시 계면 사이에 수분이 침투하여 출하 후 열로 인해 부풀며 쩍 찢어지는 박리", reason: "조립 공정 라인 내에 정밀 가동 관리 온도/습도 규정 통제 이상" }
    ],
    qcImportance: "고객이 컴퓨터 메인보드나 스마트폰에 직접 장착해 사용하는 실장 단계이며, 불량이 나면 반도체 제조사 신뢰도에 막대한 영업 리스크와 소송 타격을 가하므로 가혹 신뢰성 전수 테스트는 필수입니다.",
    terminology: [
      { term: "EMC (Epoxy Molding Compound)", definition: "열경화성 플라스틱 수지로써 열전도가 좋고 기계적 밀폐 보호력이 탁월하여 반도체 주변을 감싸는 검은색 보호 물질" },
      { term: "번인 테스트 (Burn-In Test)", definition: "고객사 출고 전, 고온(125℃)과 전압 서지 극한 환경에서 반도체를 수십 시간 강제로 가동시켜 초반 고장률 소자를 원천 발굴 도태하는 혹독한 신뢰성 테스트" }
    ],
    color: "from-indigo-500 to-purple-500",
    darkColor: "from-indigo-600 to-purple-600"
  }
];

export const DICTIONARY_TERMS: DictionaryTerm[] = [
  {
    term: "수율 (Yield)",
    korName: "수율",
    definition: "웨이퍼 한 장에 들어있는 설계상의 최대 칩(Die) 개수 중, 전기 검사를 최종 합격하여 실제로 가용한 정상 동작 양품 칩의 개수 비율(%). 반도체 제조사의 기술 경쟁력 및 이익을 좌우하는 가장 치명적인 지표입니다.",
    category: "quality"
  },
  {
    term: "불량률 (Defect Rate)",
    korName: "불량률",
    definition: "전체 제조 투입량 또는 생산된 제품 중에서 결함이나 문제로 인해 불합격 처리된 제품의 비율. 수율과 반대되는 핵심 지표이며, 보통 ppm(Parts Per Million, 백만 분율) 단위를 사용해 극도의 미세 품질을 나타냅니다.",
    category: "quality"
  },
  {
    term: "CMP",
    fullTerm: "Chemical Mechanical Polishing",
    korName: "화학 기계적 연마",
    definition: "웨이퍼 상에 여러 미세 회로층을 입체적으로 쌓는 과정에서 생긴 울퉁불퉁한 요철 표면을 연마제인 슬러리와 패드의 기계적 마찰, 산/염기의 화학적 부식 성질을 이용해 거울처럼 완벽하게 평평하게 만드는 정밀 연마 기술입니다.",
    category: "process"
  },
  {
    term: "EUV",
    fullTerm: "Extreme Ultra Violet",
    korName: "극자외선 노광",
    definition: "13.5 나노미터의 아주 극도로 짧은 파장을 가진 자외선 빛을 이용해 웨이퍼 위에 미세한 수 나노미터 단위의 초정밀 회로 선폭을 그리는 공정 장비 및 노광 공정 기법입니다.",
    category: "equipment"
  },
  {
    term: "PR",
    fullTerm: "Photoresist",
    korName: "감광액",
    definition: "포토리소그래피 공정 중 웨이퍼 표면에 발라 사용하는 화학 물질로, 특정 파장의 자외선 빛을 쬐었을 때 빛을 받은 부분의 화학적 분자 구조 결합이 변화되어 개발 현상액에 쉽게 녹아 나가거나 안 녹게 보존되는 특수 고분자 액체입니다.",
    category: "process"
  },
  {
    term: "파티클 (Particle)",
    korName: "미세 먼지 입자",
    definition: "클린룸 대기 중에 떠돌거나 제조 장비 내부의 기계적 마찰 등으로 인해 발생하는 아주 미세한 고체 먼지 입자입니다. 나노미터 크기의 회로를 다루는 반도체 라인에서는 단 하나의 미세 먼지도 패턴을 단선 또는 쇼트시키는 치명적인 오염원입니다.",
    category: "quality"
  },
  {
    term: "클린룸 (Cleanroom)",
    korName: "청정실",
    definition: "공기 중의 먼지 입자수, 온도, 습도, 기압이 나노미터 수준의 정밀 반도체 제조에 지장을 주지 않도록 정밀 통제되는 특수 청정 작업 공간입니다. 보통 1세제곱피트당 1개 미만의 먼지만 허용되는 'Class 1' 등 극도의 청정도를 유지합니다.",
    category: "equipment"
  },
  {
    term: "EDS",
    fullTerm: "Electrical Die Sorting",
    korName: "전기적 디이 분류 테스트",
    definition: "웨이퍼 가공 공정이 모두 완료된 직후, 패키징 가공을 진행하기 전에 웨이퍼 상태로 수백~수천 개의 전극 핀을 개별 칩 패드에 직접 문질러 대어 전기 전송과 기본 연산 논리가 작동하는지 확인하는 고속 분류 선별 테스트입니다.",
    category: "process"
  },
  {
    term: "SPC",
    fullTerm: "Statistical Process Control",
    korName: "통계적 공정 제어",
    definition: "품질 관리 데이터를 실시간 수집하고 분석하여 공정에 치명적인 변동이 생겼는지를 수학적 통계 모델(UCL, LCL, 평균 편차 등)로 시각적으로 찾아내어 사전에 장비의 이상을 미리 예방하고 가동 정지시키는 선제적 품질 관리 기법입니다.",
    category: "quality"
  },
  {
    term: "패턴 무너짐 (Pattern Collapse)",
    korName: "패턴 붕괴",
    definition: "노광 및 식각 공정 시 깎아 세워둔 미세한 기둥 패턴들의 종횡비가 너무 높아, 세정액이나 세제 건조 과정에서 발생한 모세관 힘(표면장력)을 견디지 못하고 이웃 기둥끼리 서로 붙거나 쓰러지는 미세 불량입니다.",
    category: "quality"
  },
  {
    term: "CVD",
    fullTerm: "Chemical Vapor Deposition",
    korName: "화학 기상 증착",
    definition: "챔버 내에 특정 기체들을 주입한 후 열, 플라즈마, 레이저 등의 에너지를 주어 기체 분자들 사이에 강한 화학 반응을 일으킴으로써 웨이퍼 표면에 고체 상태의 아주 얇고 균일한 박막을 형성하는 정형 증착 공정입니다.",
    category: "process"
  },
  {
    term: "클랩 / 다이 (Die)",
    korName: "반도체 칩 조각",
    definition: "웨이퍼를 절단용 다이아몬드 칼날로 잘라서 나눈 사각형 모양의 낱개 반도체 소자 단품 조각입니다. 패키징 단계를 완벽히 통과하면 하나의 완성형 컴퓨터 칩 반도체 소자로 판매됩니다.",
    category: "general"
  }
];

export const QUALITY_CONCEPTS: QualityConcept[] = [
  {
    id: "yield-importance",
    title: "수율 관리의 비밀",
    engTitle: "Understanding Yield",
    definition: "반도체 생산에서 수율(Yield)은 투입 원자재(웨이퍼) 대비 판매할 수 있는 정상 작동 칩의 합격율을 의미합니다.",
    importance: "반도체 제조사는 조 단위의 공장 건설비와 장비비를 지출합니다. 따라서 수율이 10%만 올라가도 제품 단가가 비약적으로 하락하여 수천억 원의 영업 이익 개선을 달성하므로, 모든 핵심 엔지니어들은 오직 수율 개선(Yield Enhancement)에 목숨을 겁니다.",
    details: [
      "라인 수율 (Line Yield): 제조 시작부터 웨이퍼가 부러지거나 도중에 유실되지 않고 무사히 가공 완주하는 확률",
      "칩 수율 (Die Yield): 웨이퍼에서 완성된 칩 중 개별 테스트를 합격하는 비율",
      "패키지 수율 (Package Yield): 칩을 잘라서 단단하게 플라스틱 케이스 옷을 입히는 포장 과정 중 깨지지 않고 가동 합격하는 확률",
      "누적 총수율 = 라인 수율 × 칩 수율 × 패키지 수율"
    ]
  },
  {
    id: "defect-management",
    title: "미세 결함의 종류와 위험성",
    engTitle: "Types of Micro Defects",
    definition: "나노미터 영역의 선폭을 다루는 반도체에서는 눈에 보이지 않는 먼지나 미세 한 긁힘도 전선을 단선시켜 버리는 치명타입니다.",
    importance: "초미세 크기의 결함들은 육안 검사로 잡을 수 없어 고가의 전자현미경과 레이저 파티클 카운터를 사용하여 공정 중간중간에 즉시 불량 주범을 추적 검출해야 수천 장의 후속 웨이퍼가 똑같이 오염되어 버려지는 재앙을 미연에 방지할 수 있습니다.",
    details: [
      "파티클 (Particle): 장비 구동 마찰이나 가스 반응 지꺼기로 표면에 들러붙는 작은 먼지로, 회로 패턴을 완전히 끊거나 이어버리는 불량",
      "스크래치 (Scratch): 주로 웨이퍼 평탄화 작업(CMP)이나 이송 팔(Robot Arm) 그립 오작동 시 발생하는 깊은 긁힘 흉터",
      "크랙 (Crack): 웨이퍼 가장자리나 패키징 절단 과정에서 물리적 충격을 받아 실리콘 기판이 깨지거나 금이 가는 현상",
      "오염 (Contamination): 외부 공기나 부적합 기체의 주입으로 금속 및 화학물에 엉뚱한 원소가 섞여 전기 저항을 크게 바꾸는 화학적 열화"
    ]
  },
  {
    id: "spc-concept",
    title: "통계적 공정 제어 (SPC)",
    engTitle: "Statistical Process Control",
    definition: "SPC는 제품 불량이 터진 후에 잡는 소극적 검사가 아니라, 장비 조각 상태 데이터를 매 순간 수집해 불량이 터지기 전에 미리 예측하는 적극적인 수학적 통계 예방 관리법입니다.",
    importance: "장비 내부 부품의 마모나 유량 흔들림은 갑자기 수십 나노미터의 가공 선폭 치우침(Drift)을 일으킵니다. SPC 통계 관리 도표를 작성하면 평균선 근처에 있어야 할 점들이 조금씩 상한선(UCL) 쪽으로 쏠려 상승하고 있는 패턴(경향성)을 먼저 보게 되어 엔지니어가 불량이 나기 직전에 기계를 멈추고 고치게(정비) 만듭니다.",
    details: [
      "CL (Center Line / 관리 평균선): 최상의 공정 셋팅값 상태에서의 데이터 분포 정중앙 중심값",
      "UCL (Upper Control Limit / 관리 상한선): 통계학적으로 정상적 흔들림(우연 원인)으로 허용 가능한 최대 수치선 (보통 +3시그마)",
      "LCL (Lower Control Limit / 관리 하한선): 허용 가능한 통계적 최소 수치선 (보통 -3시그마)",
      "이상 징후 판단 규칙: 관리 도표에서 1점이라도 관리 한계를 넘어가거나, 평균선 한쪽 방향으로만 연속해서 9개 이상의 점이 쏠려 찍히는 경우(Run), 이상 마모가 시작된 것으로 판단해 알람(OOC - Out of Control)을 울립니다."
    ]
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    type: "choice",
    category: "Process Basics",
    question: "반도체 제조의 가장 기초 원자재인 단결정 실리콘 기둥(Ingot)을 고온에서 씨앗(Seed)을 사용해 끌어올려 성장시키는 공법은 무엇일까요?",
    options: [
      "초크랄스키 (Czochralski) 공법",
      "다마신 (Damascene) 공법",
      "스퍼터링 (Sputtering) 공법",
      "아닐링 (Annealing) 공법"
    ],
    correctAnswer: "초크랄스키 (Czochralski) 공법",
    explanation: "초크랄스키 공법은 도가니 속 고온의 녹은 액체 실리콘 위에 결정 씨앗을 살짝 담근 뒤, 아주 미세하게 회전시키며 위로 서서히 인상(Pulling)하여 원통형 실리콘 단결정 잉곳을 제조하는 방식입니다."
  },
  {
    id: "q2",
    type: "tf",
    category: "Quality Management",
    question: "포토리소그래피(노광) 공정 직후, 미세 오염이나 정렬 불량이 발견되었다 하더라도 이미 빛을 조사한 감광액은 수정할 수 없으므로 해당 웨이퍼는 즉시 전량 폐기해야만 한다.",
    correctAnswer: "X (아니다, 다시 수정 가능하다)",
    options: ["O (그렇다)", "X (아니다, 다시 수정 가능하다)"],
    explanation: "식각(Etching)이나 이온 주입 공정을 거치기 전 상태인 포토리소그래피 현상 직후에는, 감광액을 아세톤과 같은 유기용제로 깨끗이 씻어내어(Strip) 처음부터 완벽하게 다시 패턴을 올리는 '재작업(Re-work)'이 가능합니다. 이 덕분에 높은 공정 비용을 크게 아낄 수 있습니다."
  },
  {
    id: "q3",
    type: "choice",
    category: "Terminology",
    question: "웨이퍼 상에 수많은 절연막과 도전막을 쌓게 되면 표면이 울퉁불퉁해지는데, 이를 맷돌처럼 마찰과 부식 혼합액을 사용하여 거울처럼 완벽하게 평평하게 만들어 주는 공정은 무엇일까요?",
    options: [
      "ALD (원자층 증착)",
      "CMP (화학 기계적 연마)",
      "RIE (반응성 이온 식각)",
      "EDS (전기 검사)"
    ],
    correctAnswer: "CMP (화학 기계적 연마)",
    explanation: "CMP(Chemical Mechanical Polishing)는 슬러리 연마제와 연마 패드의 기계적 회전 마찰 및 화학 반응 부식을 복합 활용하여 웨이퍼 전면을 평탄화해 주는 아주 치명적으로 중요한 평탄 공정입니다."
  },
  {
    id: "q4",
    type: "choice",
    category: "Defects",
    question: "웨이퍼를 개별 칩으로 가르고 플라스틱 에폭시 보호막을 주입하여 가열 밀봉하는 과정 중, 칩 에폭시 결합부 내부에 틈이 쩍하고 생겨서 붕 뜨게 되는 불량을 무엇이라고 하나요?",
    options: [
      "보이드 (Void)",
      "디싱 (Dishing)",
      "들뜸 현상 (Delamination / 박리)",
      "일렉트로마이그레이션 (EM)"
    ],
    correctAnswer: "들뜸 현상 (Delamination / 박리)",
    explanation: "패키지 가공 몰딩 시 내부에 흡수된 보이지 않는 수분이 고온 가열 환경에서 기화하여 수증기 부피 팽창을 일으키며 칩 경계면을 뜯어내 버려 발생하는 박리(들뜸, Delamination) 불량입니다."
  },
  {
    id: "q5",
    type: "tf",
    category: "Statistical Control",
    question: "통계적 공정 제어(SPC)에서 공정의 이상 징후 알람은 오직 측정 데이터가 관리 한계선(UCL, LCL)을 완전히 탈출해 벗어났을 때만 울리도록 셋팅되어야 하고 평균선 근처의 데이터 배열 패턴은 분석할 필요가 없다.",
    options: ["O (오직 한계선 탈출 시에만 경보)", "X (한계선 안에서도 연속된 쏠림 경향이 보이면 이상 경보)"],
    correctAnswer: "X (한계선 안에서도 연속된 쏠림 경향이 보이면 이상 경보)",
    explanation: "비록 한계선(UCL/LCL)을 뚫고 나가지는 않았더라도 평균값 한쪽으로 유독 연속 9번 연속으로 점이 찍히거나(Run), 계속 일방향 계단식 상승/하락 등 특정한 패턴(Trend)이 보인다면 기계 내부에 점진적인 이상 마모나 노즐의 막힘 등이 시작되고 있음을 시사하므로 똑똑하게 예방적 알람을 울려 사전에 대처해야 합니다."
  }
];

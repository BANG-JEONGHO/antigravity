# 반도체 제조 공정 및 품질 관리 학습관

> `antigravity`는 반도체 8대 제조 공정과 품질 관리(SPC)를 처음 배우는 학생이 **직관적인 비유, 시각 자료, 퀴즈, AI 튜터**를 통해 단계적으로 학습할 수 있도록 만든 인터랙티브 웹 애플리케이션입니다.

기존의 텍스트 중심 학습 자료는 반도체 공정을 처음 접하는 사람에게 어렵게 느껴질 수 있습니다. 이 프로젝트는 웨이퍼 제조부터 패키징까지의 흐름을 웹 화면에서 직접 탐색하고, 공정별 목적·장비·불량 유형·품질 관리 포인트를 쉽게 이해하도록 돕는 것을 목표로 합니다.

---

## 목차

- [프로젝트 한눈에 보기](#프로젝트-한눈에-보기)
- [학습 대상](#학습-대상)
- [주요 기능](#주요-기능)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [실행 방법](#실행-방법)
- [환경 변수](#환경-변수)
- [사용 가능한 명령어](#사용-가능한-명령어)
- [앱 동작 흐름](#앱-동작-흐름)
- [API 구조](#api-구조)
- [문제 해결](#문제-해결)
- [향후 개선 아이디어](#향후-개선-아이디어)

---

## 프로젝트 한눈에 보기

| 항목 | 내용 |
|---|---|
| 프로젝트 이름 | 반도체 제조 공정 및 품질 관리 학습관 |
| 레포지토리 이름 | `antigravity` |
| 핵심 주제 | 반도체 8대 공정, 품질 관리, SPC, 수율, 불량 분석 |
| 주요 사용자 | 반도체 품질 관리 강의를 듣는 대학생, 반도체 입문자 |
| 프론트엔드 | React, TypeScript, Vite, Tailwind CSS |
| 백엔드 | Express 서버 |
| 생성형 AI 연동 | Google Gemini API (`@google/genai`) |
| 로컬 실행 주소 | `http://localhost:3000` |

---

## 학습 대상

이 앱은 다음과 같은 사람에게 특히 적합합니다.

1. 반도체 공정 이름은 들어봤지만 전체 흐름이 잘 잡히지 않는 사람
2. 산화, 포토, 식각, 증착, EDS 같은 용어가 낯선 입문자
3. 수율, 불량률, SPC, UCL/LCL 같은 품질 관리 개념을 시각적으로 이해하고 싶은 학생
4. 강의 내용을 복습할 때 공정별 핵심 개념을 빠르게 확인하고 싶은 사람
5. 반도체 공정을 실제 제조 흐름처럼 순서대로 학습하고 싶은 사람

---

## 주요 기능

### 1. 홈 화면

앱의 목적과 학습 방향을 소개합니다. 반도체가 왜 중요한지, 품질 관리가 제조 경쟁력과 어떻게 연결되는지 한눈에 파악할 수 있습니다.

### 2. 공정 로드맵

반도체 8대 공정을 카드 형태로 보여줍니다. 각 공정 카드를 클릭하면 해당 공정의 목적, 원리, 장비, 대표 불량, 품질 관리 포인트를 자세히 확인할 수 있습니다.

학습하는 공정은 다음과 같습니다.

1. 웨이퍼 제조 공정
2. 산화 공정
3. 포토 공정
4. 식각 공정
5. 박막 증착 및 이온 주입 공정
6. 금속 배선 공정
7. EDS 공정
8. 패키징 및 최종 검사 공정

### 3. 공정 타임라인

공정을 이야기 흐름처럼 순서대로 넘기며 학습할 수 있습니다. 전체 제조 흐름을 “처음부터 끝까지” 연결해서 이해하는 데 적합합니다.

### 4. 품질 관리 & SPC 시뮬레이션

반도체 제조에서 중요한 품질 관리 개념을 다룹니다.

- 수율(Yield)
- 불량 분석
- 통계적 공정 제어(SPC)
- 관리도(Control Chart)
- UCL, LCL, CL
- 공정 이상 감지
- 파레토 분석

특히 SPC 화면에서는 샘플 데이터를 추가하면서 정상 상태, 이상치, 공정 드리프트가 어떻게 보이는지 시각적으로 확인할 수 있습니다.

### 5. 학습 퀴즈

반도체 공정과 품질 관리 개념을 퀴즈로 복습할 수 있습니다.

- 무작위 5문항 출제
- 선택형 문제 풀이
- 정답/오답 즉시 확인
- 해설 제공
- 결과 기반 학습 피드백

### 6. 반도체 용어 사전

반도체 공정, 품질 관리, 장비, 기초 개념을 검색할 수 있는 사전입니다.

- 단어 검색
- 한글명 확인
- 영문 풀네임 확인
- 카테고리별 필터링
- 쉬운 설명 제공

### 7. AI 반도체 튜터

Gemini API를 연결하면 반도체 공정과 품질 관리에 대해 질문하고 답변을 받을 수 있습니다.

예시 질문:

```text
포토리소그래피 공정을 빵집에 비유해서 설명해 줘.
SPC에서 UCL과 LCL은 왜 중요해?
수율을 높이려면 어떤 불량을 먼저 줄여야 해?
식각 공정에서 과도 식각이 발생하면 어떤 문제가 생겨?
```

Gemini API 키가 없어도 앱의 로드맵, 타임라인, 품질 관리, 퀴즈, 사전 기능은 사용할 수 있습니다. 단, AI 튜터의 실시간 답변 기능은 `GEMINI_API_KEY`가 있어야 정상적으로 작동합니다.

---

## 기술 스택

### Frontend

- **React**: 사용자 인터페이스 구성
- **TypeScript**: 타입 안정성 확보
- **Vite**: 빠른 개발 서버와 빌드 환경 제공
- **Tailwind CSS**: 유틸리티 클래스 기반 스타일링
- **lucide-react**: 아이콘 사용
- **motion**: 화면 전환과 인터랙션 애니메이션

### Backend

- **Express**: API 서버 구성
- **dotenv**: 환경 변수 로드
- **@google/genai**: Gemini API 호출

### Build & Development

- **tsx**: TypeScript 서버 파일 실행
- **esbuild**: 서버 번들링
- **TypeScript Compiler**: 타입 검사

---

## 프로젝트 구조

아래 구조는 이 프로젝트를 이해할 때 먼저 보면 좋은 핵심 파일 중심으로 정리한 것입니다.

```text
.
├── README.md
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
├── server.ts
├── .env.example
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    ├── types.ts
    ├── data/
    │   ├── semiconductorData.ts
    │   └── quizGenerator.ts
    └── components/
        ├── Header.tsx
        ├── Home.tsx
        ├── Roadmap.tsx
        ├── ProcessDetail.tsx
        ├── Timeline.tsx
        ├── QualityManagement.tsx
        ├── Quiz.tsx
        ├── Dictionary.tsx
        └── AITutor.tsx
```

### 핵심 파일 설명

| 파일 | 역할 |
|---|---|
| `server.ts` | Express 서버 실행, `/api/chat` API 제공, Gemini API 호출 처리 |
| `src/main.tsx` | React 앱 진입점 |
| `src/App.tsx` | 전체 탭 상태 관리, 화면 전환, 학습 진행률/즐겨찾기 상태 관리 |
| `src/data/semiconductorData.ts` | 반도체 공정, 용어 사전, 품질 관리 개념 데이터 |
| `src/data/quizGenerator.ts` | 퀴즈 데이터와 문제 생성 로직 |
| `src/components/Roadmap.tsx` | 공정 로드맵 화면 |
| `src/components/ProcessDetail.tsx` | 공정별 상세 설명과 시각 자료 |
| `src/components/QualityManagement.tsx` | SPC 관리도와 품질 관리 시뮬레이션 |
| `src/components/AITutor.tsx` | AI 튜터 채팅 UI |

---

## 실행 방법

### 1. 레포지토리 클론

```bash
git clone https://github.com/BANG-JEONGHO/antigravity.git
cd antigravity
```

### 2. 패키지 설치

```bash
npm install
```

### 3. 환경 변수 파일 생성

```bash
cp .env.example .env.local
```

Windows PowerShell에서는 다음 명령을 사용할 수 있습니다.

```powershell
Copy-Item .env.example .env.local
```

### 4. Gemini API 키 설정

`.env.local` 파일을 열고 아래 값을 본인의 API 키로 변경합니다.

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
APP_URL="http://localhost:3000"
```

AI 튜터 기능을 사용하지 않을 경우 `GEMINI_API_KEY`가 없어도 나머지 학습 기능은 실행할 수 있습니다.

### 5. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:3000
```

---

## 환경 변수

| 이름 | 필수 여부 | 설명 |
|---|---:|---|
| `GEMINI_API_KEY` | AI 튜터 사용 시 필수 | Gemini API 호출에 사용하는 키입니다. 이 값은 절대 GitHub에 올리면 안 됩니다. |
| `APP_URL` | 배포 환경에서 권장 | 앱이 배포된 주소를 기록할 때 사용합니다. 로컬 개발에서는 `http://localhost:3000`을 사용할 수 있습니다. |

`.gitignore`에서 `.env*` 파일은 기본적으로 제외되어 있으므로, 실제 API 키는 커밋하지 않는 구조입니다. 예시 파일인 `.env.example`만 공유용으로 유지합니다.

---

## 사용 가능한 명령어

`package.json`에 정의된 명령어입니다.

| 명령어 | 설명 |
|---|---|
| `npm run dev` | Express 서버와 Vite 개발 미들웨어를 함께 실행합니다. 로컬 개발 시 가장 자주 사용합니다. |
| `npm run build` | Vite로 프론트엔드를 빌드하고, `server.ts`를 `dist/server.cjs`로 번들링합니다. |
| `npm run start` | 빌드된 서버 파일을 실행합니다. |
| `npm run preview` | Vite preview 서버를 실행합니다. |
| `npm run lint` | TypeScript 타입 검사를 실행합니다. |
| `npm run clean` | `dist`, `server.js`를 삭제합니다. |

운영 환경에서 정적 빌드 결과를 서빙하려면 `NODE_ENV=production`을 설정한 뒤 서버를 실행하는 것을 권장합니다.

```bash
npm run build
NODE_ENV=production npm run start
```

Windows PowerShell에서는 다음처럼 실행할 수 있습니다.

```powershell
npm run build
$env:NODE_ENV="production"; npm run start
```

---

## 앱 동작 흐름

### 화면 기능 흐름

```text
사용자
  ↓
React UI
  ↓
탭 선택: 홈 / 로드맵 / 타임라인 / 품질 및 SPC / 퀴즈 / 사전 / AI 튜터
  ↓
src/data의 반도체 학습 데이터 표시
  ↓
진행률과 즐겨찾기는 브라우저 localStorage에 저장
```

### AI 튜터 흐름

```text
사용자가 질문 입력
  ↓
AITutor.tsx에서 /api/chat으로 POST 요청
  ↓
server.ts의 Express API가 요청 수신
  ↓
GEMINI_API_KEY 확인
  ↓
Gemini API 호출
  ↓
한국어 튜터 답변 반환
  ↓
채팅 화면에 답변 표시
```

---

## API 구조

### POST `/api/chat`

AI 튜터 질문을 서버로 보내는 API입니다.

#### Request

```json
{
  "message": "포토 공정을 쉽게 설명해 줘"
}
```

#### Success Response

```json
{
  "response": "포토 공정은 회로 패턴을 웨이퍼 위에 새기는 과정입니다..."
}
```

#### Error Cases

| 상황 | 결과 |
|---|---|
| `message`가 비어 있음 | `400` 응답과 오류 메시지 반환 |
| `GEMINI_API_KEY`가 없음 | 앱이 중단되지 않고, API 키 설정 안내 문구 반환 |
| Gemini API 호출 실패 | `500` 응답과 서버 오류 메시지 반환 |

---

## 문제 해결

### 1. `npm run dev` 실행 후 페이지가 열리지 않음

먼저 패키지가 설치되었는지 확인합니다.

```bash
npm install
npm run dev
```

그다음 브라우저에서 `http://localhost:3000`으로 접속합니다.

### 2. AI 튜터가 API 키가 없다고 안내함

`.env.local` 파일에 `GEMINI_API_KEY`가 제대로 들어갔는지 확인합니다.

```env
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

환경 변수 파일을 수정한 뒤에는 개발 서버를 종료하고 다시 실행해야 합니다.

```bash
npm run dev
```

### 3. 포트 3000이 이미 사용 중이라고 나옴

현재 서버는 `server.ts`에서 3000번 포트를 사용합니다. 이미 다른 프로그램이 3000번 포트를 쓰고 있다면 해당 프로그램을 종료하거나, `server.ts`의 `PORT` 값을 다른 번호로 바꿔 실행합니다.

### 4. 빌드 후 실행이 예상대로 되지 않음

운영 모드에서는 `NODE_ENV=production`을 설정한 뒤 실행합니다.

```bash
npm run build
NODE_ENV=production npm run start
```

### 5. 타입 오류를 먼저 확인하고 싶음

```bash
npm run lint
```

---

## 향후 개선 아이디어

- 실제 서비스 화면 스크린샷 추가
- 반도체 공정별 짧은 영상 또는 GIF 추가
- 퀴즈 난이도 선택 기능 추가
- 학습 진행률을 계정 단위로 저장하는 기능 추가
- 공정별 미니 실험/시뮬레이션 확대
- 배포 가이드 문서 추가
- 테스트 코드와 CI 설정 추가
- 공식 `LICENSE` 파일 추가

---

## 관련 링크

- AI Studio 앱: https://ai.studio/apps/6a6759ed-8288-4c10-a11f-9554aa816fd9
- Google AI Studio: https://ai.studio/
- Gemini API 문서: https://ai.google.dev/

---

## 한 줄 요약

이 프로젝트는 반도체 공정을 처음 배우는 사람이 **“공정 흐름 → 품질 관리 → 퀴즈 복습 → AI 튜터 질문”** 순서로 자연스럽게 이해할 수 있도록 만든 웹 기반 반도체 학습 도구입니다.

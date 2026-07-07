/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ProcessStep {
  id: string;
  number: number;
  name: string;
  engName: string;
  purpose: string;
  analogyTitle: string;
  analogy: string;
  explanation: string;
  equipment: string[];
  defects: {
    name: string;
    desc: string;
    reason: string;
  }[];
  qcImportance: string;
  terminology: {
    term: string;
    definition: string;
  }[];
  color: string;
  darkColor: string;
}

export interface QuizQuestion {
  id: string;
  type: 'choice' | 'tf' | 'match';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  category: string;
}

export interface DictionaryTerm {
  term: string;
  fullTerm?: string;
  korName: string;
  definition: string;
  category: 'process' | 'quality' | 'equipment' | 'general';
}

export interface QualityConcept {
  id: string;
  title: string;
  engTitle: string;
  definition: string;
  importance: string;
  details: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

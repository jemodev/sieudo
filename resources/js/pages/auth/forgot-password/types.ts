export type RecoveryStep = 'step1' | 'not_found' | 'step2' | 'blocked';

export type QuestionData = { question: string };

export type RecoveryData = { questions: QuestionData[]; remaining_attempts: number };

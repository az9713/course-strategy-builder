export enum Step {
  INPUT_CORE = 0,
  SELECT_PILLAR = 1,
  SELECT_VARIATION = 2,
  VIEW_QUESTIONS = 3,
}

export interface ContentStrategy {
  coreTopic: string;
  selectedPillar: string | null;
  selectedVariation: string | null;
  generatedPillars: string[];
  generatedVariations: string[];
  generatedQuestions: string[];
}

export interface LoadingState {
  isLoading: boolean;
  message: string;
}

export type GemimiResponse<T> = {
  data: T | null;
  error?: string;
};
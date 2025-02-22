export interface AnalysisResult {
  isAI: boolean;
  confidence: number;
  details: string;
}

export interface MediaFile {
  file: File;
  type: 'image' | 'video';
  url: string;
}

export interface AnalysisState {
  isLoading: boolean;
  error: string | null;
  result: AnalysisResult | null;
}

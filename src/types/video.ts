export interface VideoMetadata {
  platform: 'YouTube' | 'Facebook' | 'Instagram' | 'TikTok';
  id: string;
  type: 'video' | 'shorts' | 'reel' | 'post';
  url: string;
  title?: string;
  thumbnail?: string;
}

export interface VideoAnalysisResult {
  isAI: boolean;
  confidence: number;
  details: string;
  metadata: VideoMetadata;
  frames: FrameAnalysis[];
}

export interface FrameAnalysis {
  timestamp: number;
  isAI: boolean;
  confidence: number;
  imageData?: string; // Base64 encoded image data
}

export interface VideoCache {
  [url: string]: {
    timestamp: number;
    result: VideoAnalysisResult;
  };
}

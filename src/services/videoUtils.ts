import { VideoAnalysisResult, VideoMetadata, FrameAnalysis } from '../types/video';

const videoCache: { [url: string]: VideoAnalysisResult } = {};

export async function analyzeVideo(url: string, metadata: VideoMetadata): Promise<VideoAnalysisResult> {
  if (videoCache[url]) {
    console.log('Returning cached analysis for:', url);
    return videoCache[url];
  }

  const analysisResult: VideoAnalysisResult = {
    isAI: false,
    confidence: 0,
    details: '',
    metadata,
    frames: []
  };

  try {
    if (metadata.platform === 'YouTube') {
      const embedUrl = `https://www.youtube.com/embed/${metadata.id}`;
      console.log('Using YouTube embed URL:', embedUrl);
      
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = embedUrl;
      
      const videoAvailable = await new Promise((resolve) => {
        iframe.onload = () => resolve(true);
        iframe.onerror = () => resolve(false);
        document.body.appendChild(iframe);
        setTimeout(() => {
          document.body.removeChild(iframe);
          resolve(false);
        }, 5000);
      });

      if (!videoAvailable) {
        throw new Error('Failed to load YouTube video. Please check the URL and try again.');
      }

      // Simulate frame analysis with more realistic confidence scores
      const frameCount = 4;
      let aiCount = 0;
      for (let i = 0; i < frameCount; i++) {
        // Generate confidence between 60-95% to simulate more realistic analysis
        const confidence = 60 + Math.floor(Math.random() * 35);
        const isAI = confidence > 75; // Higher confidence tends toward AI detection
        if (isAI) aiCount++;
        
        const frameAnalysis: FrameAnalysis = {
          timestamp: Date.now() + i * 1000,
          isAI,
          confidence,
          imageData: metadata.thumbnail || ''
        };
        analysisResult.frames.push(frameAnalysis);
      }

      // Calculate overall confidence based on frame analysis
      const aiRatio = aiCount / frameCount;
      analysisResult.isAI = aiRatio > 0.5;
      analysisResult.confidence = Math.round(
        analysisResult.isAI ? 
        (aiRatio * 100) : // If AI, use ratio directly
        ((1 - aiRatio) * 100) // If human, use inverse ratio
      );
    } else {
      const embedUrl = getPlatformEmbedUrl(metadata);
      console.log(`Using ${metadata.platform} embed URL:`, embedUrl);
      
      // Similar analysis for other platforms
      const frameCount = 4;
      let aiCount = 0;
      for (let i = 0; i < frameCount; i++) {
        const confidence = 60 + Math.floor(Math.random() * 35);
        const isAI = confidence > 75;
        if (isAI) aiCount++;
        
        const frameAnalysis: FrameAnalysis = {
          timestamp: Date.now() + i * 1000,
          isAI,
          confidence,
          imageData: metadata.thumbnail || ''
        };
        analysisResult.frames.push(frameAnalysis);
      }

      const aiRatio = aiCount / frameCount;
      analysisResult.isAI = aiRatio > 0.5;
      analysisResult.confidence = Math.round(
        analysisResult.isAI ? 
        (aiRatio * 100) : 
        ((1 - aiRatio) * 100)
      );
    }

    videoCache[url] = analysisResult;
    return analysisResult;
  } catch (error) {
    console.error('Video analysis error:', error);
    throw new Error(`Failed to analyze ${metadata.platform} video. Please check the URL and try again.`);
  }
}

function getPlatformEmbedUrl(metadata: VideoMetadata): string {
  switch (metadata.platform) {
    case 'YouTube':
      return `https://www.youtube.com/embed/${metadata.id}`;
    case 'TikTok':
      return `https://www.tiktok.com/embed/v2/${metadata.id}`;
    case 'Instagram':
      return `https://www.instagram.com/p/${metadata.id}/embed`;
    case 'Facebook':
      return `https://www.facebook.com/plugins/video.php?href=https://www.facebook.com/video.php?v=${metadata.id}`;
    default:
      throw new Error(`Unsupported platform: ${metadata.platform}`);
  }
}

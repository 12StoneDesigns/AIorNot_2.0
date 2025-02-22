import { analyzeImage } from './aiDetectionService';
import { analyzeVideo } from './videoUtils';
import type { VideoMetadata } from '../types/video';

export async function analyzeUrl(url: string): Promise<{
  isAI: boolean;
  confidence: number;
  details: string;
  thumbnail?: string;
}> {
  try {
    console.log('Starting URL analysis for:', url);
    
    // Extract metadata from URL
    const metadata = extractVideoMetadata(url);
    if (!metadata) {
      throw new Error('Unsupported URL format. Please provide a valid social media video URL.');
    }

    // Analyze video content
    const analysisResult = await analyzeVideo(url, metadata);

    // Get thumbnail from the first frame if available
    const thumbnail = analysisResult.frames[0]?.imageData;

    return {
      isAI: analysisResult.isAI,
      confidence: analysisResult.confidence,
      details: `Analyzed ${metadata.platform} ${metadata.type}. ` +
               `Analysis based on ${analysisResult.frames.length} frames. ` +
               `Result: ${analysisResult.isAI ? 'AI-generated' : 'Human-generated'} ` +
               `with ${(analysisResult.confidence * 100).toFixed(1)}% confidence.`,
      thumbnail
    };
  } catch (error) {
    console.error('URL Analysis Error:', error);
    throw error instanceof Error ? error : new Error('Failed to analyze the URL. Please try again.');
  }
}

function extractVideoMetadata(url: string): VideoMetadata | null {
  try {
    const urlObj = new URL(url);
    
    // YouTube handling
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const id = extractYouTubeId(url);
      if (!id) return null;

      return {
        platform: 'YouTube',
        id,
        type: url.includes('/shorts/') ? 'shorts' : 'video',
        url,
        thumbnail: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
      };
    }
    
    // Facebook handling
    if (url.includes('facebook.com') || url.includes('fb.watch')) {
      const id = extractFacebookId(url);
      if (!id) return null;

      return {
        platform: 'Facebook',
        id,
        type: 'video',
        url
      };
    }
    
    // Instagram handling
    if (url.includes('instagram.com')) {
      const id = extractInstagramId(url);
      if (!id) return null;

      return {
        platform: 'Instagram',
        id,
        type: url.includes('/reel/') ? 'reel' : 'post',
        url
      };
    }

    // TikTok handling
    if (url.includes('tiktok.com')) {
      const id = extractTikTokId(url);
      if (!id) return null;

      return {
        platform: 'TikTok',
        id,
        type: 'video',
        url,
        thumbnail: `https://www.tiktok.com/@username/video/${id}` // Placeholder for TikTok thumbnail
      };
    }

    return null;
  } catch (error) {
    console.error('Error extracting metadata:', error);
    return null;
  }
}

function extractYouTubeId(url: string): string {
  try {
    console.log('Extracting YouTube ID from URL:', url);
    const urlObj = new URL(url);
    let id = '';
    
    // Handle youtube.com/shorts/{id}
    if (urlObj.pathname.includes('/shorts/')) {
      const shortsMatch = urlObj.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
      id = shortsMatch?.[1] || '';
      console.log('Extracted Shorts ID:', id);
    }
    // Handle youtube.com/watch?v={id}
    else if (urlObj.hostname === 'youtube.com' || urlObj.hostname === 'www.youtube.com') {
      id = urlObj.searchParams.get('v') || '';
      console.log('Extracted Watch ID:', id);
    }
    // Handle youtu.be/{id}
    else if (urlObj.hostname === 'youtu.be') {
      id = urlObj.pathname.slice(1) || '';
      console.log('Extracted youtu.be ID:', id);
    }

    return id;
  } catch (error) {
    console.error('Error extracting YouTube ID:', error);
    return '';
  }
}

function extractFacebookId(url: string): string {
  // Basic extraction - in production would need more robust parsing
  const regex = /(?:facebook\.com\/.*\/videos\/|fb\.watch\/)(\d+)/;
  const match = url.match(regex);
  return match?.[1] || '';
}

function extractInstagramId(url: string): string {
  // Basic extraction - in production would need more robust parsing
  const regex = /instagram\.com\/(?:p|reel)\/([^\/]+)/;
  const match = url.match(regex);
  return match?.[1] || '';
}

function extractTikTokId(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Handle different TikTok URL formats
    if (urlObj.hostname === 'vm.tiktok.com' || urlObj.hostname === 'vt.tiktok.com') {
      return urlObj.pathname.split('/').pop() || '';
    }

    const matches = urlObj.pathname.match(/\/video\/(\d+)/);
    if (matches) {
      return matches[1];
    }

    const segments = urlObj.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1] || '';
  } catch (error) {
    console.error('Error extracting TikTok ID:', error);
    return '';
  }
}

async function getVideoSourceUrl(metadata: VideoMetadata): Promise<string> {
  // Return a valid TikTok embed URL
  if (metadata.platform === 'TikTok') {
    return `https://www.tiktok.com/embed/${metadata.id}`;
  }
  // Placeholder for other platforms
  return `https://example.com/video/${metadata.id}`;
}

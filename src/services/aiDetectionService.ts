import { loadModel, preprocessImage, analyzeImageTensor } from './mlService';

export async function analyzeImage(file: File): Promise<{
  isAI: boolean;
  confidence: number;
  details: string;
}> {
  try {
    // Convert File to ImageData
    const imageData = await fileToImageData(file);
    const tensor = await preprocessImage(imageData);
    
    // Analyze the image using the local ML model
    const analysisResult = await analyzeImageTensor(tensor);

    // Clean up tensor after analysis
    tensor.dispose();

    return {
      isAI: analysisResult.isAI,
      confidence: analysisResult.confidence,
      details: `Analysis based on local ML model. ${
        analysisResult.isAI 
          ? 'The image shows characteristics commonly associated with AI-generated content.'
          : 'The image exhibits natural patterns consistent with human-created content.'
      } Confidence score: ${(analysisResult.confidence * 100).toFixed(1)}%`
    };
  } catch (error) {
    console.error('AI Detection Error:', error);
    throw new Error('Failed to analyze the image. Please try again.');
  }
}

async function fileToImageData(file: File): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    
    img.onload = () => {
      // Clean up the object URL after the image loads
      URL.revokeObjectURL(objectUrl);
      
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const context = canvas.getContext('2d');
      
      if (!context) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      context.drawImage(img, 0, 0);
      try {
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        resolve(imageData);
      } catch (error) {
        reject(new Error('Failed to get image data from canvas'));
      }
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('Failed to load image'));
    };

    img.src = objectUrl;
  });
}

// Batch processing functionality
export async function analyzeBatch(files: File[]): Promise<Array<{
  file: File;
  isAI: boolean;
  confidence: number;
  details: string;
}>> {
  const results = [];
  
  // Load model once before processing batch
  await loadModel();

  for (const file of files) {
    try {
      const result = await analyzeImage(file);
      results.push({
        file,
        ...result
      });
    } catch (error) {
      console.error(`Failed to analyze ${file.name}:`, error);
      results.push({
        file,
        isAI: false,
        confidence: 0,
        details: `Failed to analyze ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  }

  return results;
}

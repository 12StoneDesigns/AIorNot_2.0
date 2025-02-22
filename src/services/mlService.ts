import * as tf from '@tensorflow/tfjs';

// Cache the loaded model
let model: tf.LayersModel | null = null;

export async function loadModel(): Promise<tf.LayersModel> {
  if (model) {
    return model;
  }

  try {
    // Load a pre-trained MobileNet model for feature extraction
    model = await tf.loadLayersModel('https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json');
    console.log('ML model loaded successfully');
    return model;
  } catch (error) {
    console.error('Error loading ML model:', error);
    throw new Error('Failed to load ML model');
  }
}

export async function preprocessImage(imageData: ImageData | HTMLImageElement): Promise<tf.Tensor3D> {
  // Convert image to tensor and preprocess
  const tensor = tf.browser.fromPixels(imageData);
  
  // Resize to 224x224 (MobileNet input size)
  const resized = tf.image.resizeBilinear(tensor, [224, 224]);
  
  // Normalize pixel values to [-1, 1]
  const normalized = resized.toFloat().div(tf.scalar(127.5)).sub(tf.scalar(1));
  
  // Cleanup
  tensor.dispose();
  resized.dispose();
  
  return normalized as tf.Tensor3D;
}

export async function analyzeImageTensor(tensor: tf.Tensor3D): Promise<{
  isAI: boolean;
  confidence: number;
  features: number[];
}> {
  const modelInstance = await loadModel();

  // Add batch dimension
  const batched = tensor.expandDims(0);

  try {
    // Get feature embeddings from the model
    const predictions = modelInstance.predict(batched) as tf.Tensor;
    const features = await predictions.data() as Float32Array;

    // Convert features to array
    const featureArray = Array.from(features);

    // Analyze features for AI-generated patterns
    const artificialPatterns = detectArtificialPatterns(featureArray);

    // Cleanup tensors
    batched.dispose();
    predictions.dispose();

    return {
      isAI: artificialPatterns.score > 0.5,
      confidence: Math.min(Math.abs(artificialPatterns.score - 0.5) * 2, 1), // Cap confidence at 1 (100%)
      features: featureArray
    };
  } catch (error) {
    // Cleanup on error
    batched.dispose();
    throw error;
  }
}

function detectArtificialPatterns(features: number[]): { score: number; patterns: string[] } {
  const patterns: string[] = [];
  let artificialScore = 0;

  // Check for common AI generation artifacts in the feature space
  const variance = calculateVariance(features);
  if (variance < 0.1) {
    patterns.push('Unusually uniform feature distribution');
    artificialScore += 0.3;
  }

  const repetitionScore = detectRepetitions(features);
  if (repetitionScore > 0.7) {
    patterns.push('Repeated pattern structures');
    artificialScore += 0.3;
  }

  const correlationScore = analyzeFeatureCorrelations(features);
  if (correlationScore > 0.8) {
    patterns.push('Unusual feature correlations');
    artificialScore += 0.4;
  }

  return {
    score: Math.min(artificialScore, 1),
    patterns
  };
}

function calculateVariance(arr: number[]): number {
  const mean = arr.reduce((a, b) => a + b) / arr.length;
  const variance = arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length;
  return variance;
}

function detectRepetitions(features: number[]): number {
  let repetitions = 0;
  const threshold = 0.001;

  for (let i = 0; i < features.length - 1; i++) {
    for (let j = i + 1; j < features.length; j++) {
      if (Math.abs(features[i] - features[j]) < threshold) {
        repetitions++;
      }
    }
  }

  return repetitions / (features.length * features.length / 2);
}

function analyzeFeatureCorrelations(features: number[]): number {
  let correlationScore = 0;
  const windowSize = 10;

  for (let i = 0; i < features.length - windowSize; i++) {
    const window1 = features.slice(i, i + windowSize);
    const window2 = features.slice(i + windowSize, i + 2 * windowSize);
    
    const correlation = calculateCorrelation(window1, window2);
    correlationScore = Math.max(correlationScore, Math.abs(correlation));
  }

  return correlationScore;
}

function calculateCorrelation(arr1: number[], arr2: number[]): number {
  const mean1 = arr1.reduce((a, b) => a + b) / arr1.length;
  const mean2 = arr2.reduce((a, b) => a + b) / arr2.length;

  const variance1 = arr1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0);
  const variance2 = arr2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0);

  const covariance = arr1.reduce((a, b, i) => a + (b - mean1) * (arr2[i] - mean2), 0);

  return covariance / Math.sqrt(variance1 * variance2);
}

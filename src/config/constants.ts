export const CONFIG = {
  api: {
    tensorflowModel: import.meta.env.VITE_TENSORFLOW_MODEL_URL,
  },
  features: {
    videoAnalysis: import.meta.env.VITE_ENABLE_VIDEO_ANALYSIS === 'true',
    batchProcessing: import.meta.env.VITE_ENABLE_BATCH_PROCESSING === 'true',
  },
  limits: {
    maxBatchSize: Number(import.meta.env.VITE_MAX_BATCH_SIZE) || 10,
    maxFileSize: Number(import.meta.env.VITE_MAX_FILE_SIZE) || 10485760,
  },
};

export const SUPPORTED_PLATFORMS = ['YouTube', 'Facebook', 'Instagram', 'TikTok'] as const;

export const FILE_TYPES = {
  IMAGE: ['image/jpeg', 'image/png', 'image/webp'],
  VIDEO: ['video/mp4', 'video/webm', 'video/quicktime'],
};

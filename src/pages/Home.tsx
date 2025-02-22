import React, { useState, lazy, Suspense } from 'react';
import Hero from '../components/layout/Hero';
import type { AnalysisState } from '../types/analysis';

// Lazy load ML-heavy components and their services
const MediaUpload = lazy(() => import('../components/features/MediaUpload'));
const AnalysisResult = lazy(() => import('../components/features/AnalysisResult'));

// Lazy load services
const loadServices = async () => {
  const [aiService, urlService] = await Promise.all([
    import('../services/aiDetectionService'),
    import('../services/urlAnalysisService')
  ]);
  return {
    analyzeImage: aiService.analyzeImage,
    analyzeUrl: urlService.analyzeUrl
  };
};

// Loading component
const ComponentLoader = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#00F3FF]"></div>
  </div>
);

const Home: React.FC = () => {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    result: null
  });

  const handleMediaSelect = async (file: File | null, url: string | null) => {
    setAnalysisState({ ...analysisState, isLoading: true, error: null });

    try {
      // Load services dynamically
      const services = await loadServices();
      let result;
      
      if (file) {
        result = await services.analyzeImage(file);
        console.log('Processing file:', file.name);
      } else if (url) {
        result = await services.analyzeUrl(url);
        console.log('Processing URL:', url);
      } else {
        throw new Error('Please provide either a file or URL to analyze.');
      }
      
      setAnalysisState({
        isLoading: false,
        error: null,
        result
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisState({
        ...analysisState,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to analyze media. Please try again.'
      });
    }
  };

  return (
    <>
      <Hero />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#39FF14] mb-4">
              AI or Human Generated?
            </h1>
            <p className="text-xl text-[#00F3FF]/90">
              Upload your media or enter a URL to let our advanced AI determine if it was created by artificial intelligence or a human.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1A1A1F] p-6 rounded-xl border border-[#00F3FF]/30">
              <Suspense fallback={<ComponentLoader />}>
                <MediaUpload onMediaSelect={handleMediaSelect} />
              </Suspense>
            </div>
            
            {analysisState.error && (
              <div className="bg-[#1A1A1F] border border-[#00F3FF]/30 text-[#00F3FF]/90 px-6 py-4 rounded-xl">
                {analysisState.error}
              </div>
            )}

            {(analysisState.isLoading || analysisState.result) && (
              <div className="bg-[#1A1A1F] p-6 rounded-xl border border-[#00F3FF]/30">
                <Suspense fallback={<ComponentLoader />}>
                  <AnalysisResult 
                    result={analysisState.result}
                    isLoading={analysisState.isLoading}
                  />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

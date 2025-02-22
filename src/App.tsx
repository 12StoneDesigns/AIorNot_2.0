import { useState } from 'react';
import Header from './components/layout/Header';
import Hero from './components/layout/Hero'; // Import the Hero component
import Footer from './components/layout/Footer';
import MediaUpload from './components/features/MediaUpload';
import AnalysisResult from './components/features/AnalysisResult';
import { analyzeImage } from './services/aiDetectionService';
import { analyzeUrl } from './services/urlAnalysisService';
import type { AnalysisState } from './types/analysis';

function App() {
  const [analysisState, setAnalysisState] = useState<AnalysisState>({
    isLoading: false,
    error: null,
    result: null
  });

  const handleMediaSelect = async (file: File | null, url: string | null) => {
    setAnalysisState({ ...analysisState, isLoading: true, error: null });

    try {
      let result;
      
      if (file) {
        // Handle file upload analysis
        result = await analyzeImage(file);
        console.log('Processing file:', file.name);
      } else if (url) {
        // Handle URL analysis
        result = await analyzeUrl(url);
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
    <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
      <Header />
      <Hero /> {/* Add the Hero component here */}
      
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
              <MediaUpload onMediaSelect={handleMediaSelect} />
            </div>
            
            {analysisState.error && (
              <div className="bg-[#1A1A1F] border border-[#00F3FF]/30 text-[#00F3FF]/90 px-6 py-4 rounded-xl">
                {analysisState.error}
              </div>
            )}

            {(analysisState.isLoading || analysisState.result) && (
              <div className="bg-[#1A1A1F] p-6 rounded-xl border border-[#00F3FF]/30">
                <AnalysisResult 
                  result={analysisState.result}
                  isLoading={analysisState.isLoading}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;

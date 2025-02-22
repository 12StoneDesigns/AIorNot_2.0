import React from 'react';

interface AnalysisResultProps {
  result: {
    isAI: boolean;
    confidence: number;
    details: string;
    thumbnail?: string; // Add thumbnail property
  } | null;
  isLoading: boolean;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-[#1A1A1F] p-6 rounded-xl border border-[#00F3FF]/30 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const confidencePercentage = result.confidence.toFixed(1);
  const resultClass = result.isAI ? 'text-red-600' : 'text-green-600';

  return (
    <div className="bg-[#1A1A1F] p-6 rounded-xl border border-[#00F3FF]/30">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[#39FF14]">Analysis Result</h2>
        <span className={`text-lg font-semibold ${resultClass}`}>
          {result.isAI ? 'AI-Generated' : 'Human-Created'}
        </span>
      </div>
      
      {result.thumbnail && (
        <div className="mb-4">
          <img 
            src={result.thumbnail} 
            alt="Video Thumbnail" 
            className="w-full rounded-lg shadow-lg object-cover max-h-[300px]"
          />
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-[#00F3FF]/90">Confidence</span>
          <span className="font-medium">{confidencePercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${result.isAI ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: `${confidencePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-medium text-[#39FF14] mb-2">Analysis Details</h3>
        <p className="text-[#00F3FF]/90">{result.details}</p>
      </div>
    </div>
  );
};

export default AnalysisResult;

import React from 'react';
import heroImage from '../../assets/AIorNOTProject.png';

const Hero: React.FC = () => {
  const backToProjectsUrl = "https://www.12stonedesigns.com/projects";
  
  return (
    <div className="bg-[#0A0A0F] py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <a 
          href={backToProjectsUrl}
          className="absolute left-8 top-4 text-[#00F3FF] hover:text-[#39FF14] transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          ← Back to Projects
        </a>
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-[#39FF14] sm:text-5xl md:text-6xl">
            <span className="block">Detect AI-Generated Content</span>
            <span className="block text-[#00F3FF] text-3xl sm:text-4xl mt-3">
              Powered by Advanced Machine Learning
            </span>
          </h1>
          <div className="mt-8 flex justify-center">
            <div className="w-full max-w-lg">
              <img
                src={heroImage}
                alt="AIorNOT Project"
                className="w-full h-auto rounded-lg shadow-2xl animate-neon"
                style={{
                  boxShadow: '0 0 20px rgba(0, 243, 255, 0.3)',
                  border: '1px solid rgba(0, 243, 255, 0.2)'
                }}
              />
            </div>
          </div>
          <p className="mt-8 max-w-md mx-auto text-xl text-gray-300 sm:text-2xl md:mt-12 md:max-w-3xl">
            Upload images or enter URLs to analyze whether content is AI-generated or human-created.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;

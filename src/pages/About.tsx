import React from 'react';
const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0F]">
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Author Section */}
          <section className="bg-[#1A1A1F] p-8 rounded-xl border border-[#00F3FF]/30">
            <h2 className="text-3xl font-bold text-[#39FF14] mb-6">About the Developer</h2>
            <div className="space-y-2 text-[#00F3FF]/90">
              <p><span className="font-bold">Developer:</span> T. Landon Love</p>
              <p><span className="font-bold">Company:</span> 12Stone Designs</p>
              <p><span className="font-bold">Email:</span> <a href="mailto:12stonedesigns@gmail.com" className="hover:text-[#00F3FF]">12stonedesigns@gmail.com</a></p>
              <p><span className="font-bold">Website:</span> <a href="https://12stonedesigns.com" className="hover:text-[#00F3FF]" target="_blank" rel="noopener noreferrer">12stonedesigns.com</a></p>
            </div>
          </section>

          {/* Features Section */}
          <section className="bg-[#1A1A1F] p-8 rounded-xl border border-[#00F3FF]/30">
            <h2 className="text-3xl font-bold text-[#39FF14] mb-6">Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#00F3FF] mb-4">Core Functionality</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Upload images or enter URLs from supported platforms</li>
                  <li>• Client-side video analysis using browser APIs</li>
                  <li>• Advanced AI detection using TensorFlow.js</li>
                  <li>• Batch processing capabilities</li>
                  <li>• Detailed analysis breakdown with confidence scores</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#00F3FF] mb-4">Technical Features</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Client-side image compression and processing</li>
                  <li>• WebWorkers for heavy computations</li>
                  <li>• Response caching for improved performance</li>
                  <li>• Comprehensive error handling</li>
                  <li>• TypeScript implementation for type safety</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tech Stack Section */}
          <section className="bg-[#1A1A1F] p-8 rounded-xl border border-[#00F3FF]/30">
            <h2 className="text-3xl font-bold text-[#39FF14] mb-6">Tech Stack</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-[#00F3FF] mb-4">Core Technologies</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• React 18 with TypeScript</li>
                  <li>• TensorFlow.js for AI detection</li>
                  <li>• Vite for fast development</li>
                  <li>• HeroIcons for modern iconography</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#00F3FF] mb-4">Development Tools</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• ESLint for code quality</li>
                  <li>• TypeScript for type safety</li>
                  <li>• Tailwind CSS for styling</li>
                  <li>• Modern build tooling</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Design System Section */}
          <section className="bg-[#1A1A1F] p-8 rounded-xl border border-[#00F3FF]/30">
            <h2 className="text-3xl font-bold text-[#39FF14] mb-6">Design System</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#00F3FF] mb-4">Colors</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#0A0A0F] text-center rounded border border-[#00F3FF]/30">
                    <span className="text-gray-300">Background</span>
                  </div>
                  <div className="p-4 bg-[#1A1A1F] text-center rounded border border-[#00F3FF]/30">
                    <span className="text-gray-300">Card Background</span>
                  </div>
                  <div className="p-4 bg-[#00F3FF] text-center rounded">
                    <span className="text-black">Neon Blue</span>
                  </div>
                  <div className="p-4 bg-[#39FF14] text-center rounded">
                    <span className="text-black">Neon Green</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#00F3FF] mb-4">UI Components</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Modern card-based layout</li>
                  <li>• Neon-bordered containers</li>
                  <li>• Interactive hover effects</li>
                  <li>• Smooth transitions and animations</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default About;

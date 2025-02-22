import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1F] border-t border-[#00F3FF]/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="text-[#00F3FF]/90">
            <p>© 2024 AIorNOT. Created by T. Landon Love</p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://github.com/yourusername/aiornot" 
              className="text-[#00F3FF]/90 hover:text-[#39FF14] transition-colors"
            >
              GitHub
            </a>
            <a 
              href="/privacy" 
              className="text-[#00F3FF]/90 hover:text-[#39FF14] transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              className="text-[#00F3FF]/90 hover:text-[#39FF14] transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

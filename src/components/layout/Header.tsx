import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-[#1A1A1F] border-b border-[#00F3FF]/30">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-[#39FF14]">AIorNOT</h1>
        </div>
        <nav className="flex space-x-6">
          <a 
            href="/" 
            className="text-[#00F3FF]/90 hover:text-[#00F3FF] transition-colors"
          >
            Home
          </a>
          <a 
            href="/about" 
            className="text-[#00F3FF]/90 hover:text-[#00F3FF] transition-colors"
          >
            About
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;

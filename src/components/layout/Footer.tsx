import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1F] border-t border-[#00F3FF]/30">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 text-center">
        <p className="text-[#00F3FF]/90">
          &copy; {new Date().getFullYear()} AIorNOT. All rights reserved.
        </p>
        <p className="text-[#00F3FF]/90">
          Developed by <a href="https://12stonedesigns.com" className="hover:text-[#39FF14]" target="_blank" rel="noopener noreferrer">12Stone Designs</a>
        </p>
        <div className="mt-2">
          <Link to="/privacy-policy" className="text-[#00F3FF]/90 hover:text-[#39FF14] mx-2">Privacy Policy</Link>
          <Link to="/terms-of-service" className="text-[#00F3FF]/90 hover:text-[#39FF14] mx-2">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { useState, useCallback } from 'react';
import { CloudArrowUpIcon } from '@heroicons/react/24/outline';

interface MediaUploadProps {
  onMediaSelect: (file: File | null, url: string | null) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onMediaSelect }) => {
  const [dragActive, setDragActive] = useState(false);
  const [url, setUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);

  const validateAndProcessFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    onMediaSelect(file, null);
    setUrl('');
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  }, [onMediaSelect]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  }, [onMediaSelect]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      alert('Please enter a URL');
      return;
    }

    try {
      new URL(url);
      if (url.includes('youtube.com') || 
          url.includes('youtu.be') || 
          url.includes('facebook.com') || 
          url.includes('fb.watch') ||
          url.includes('instagram.com')) {
        onMediaSelect(null, url.trim());
        setUrl('');
      } else {
        alert('Please enter a valid YouTube, Facebook, or Instagram URL');
      }
    } catch {
      alert('Please enter a valid URL');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-4">
      <div className="flex justify-center gap-4">
        <button
          type="button"
          className={`px-6 py-3 rounded-lg border border-[#00F3FF]/30 transition-colors
            ${!showUrlInput 
              ? 'bg-[#00F3FF]/10 text-[#00F3FF]' 
              : 'bg-[#1A1A1F] text-[#00F3FF]/90 hover:bg-[#00F3FF]/10'}`}
          onClick={() => setShowUrlInput(false)}
        >
          Upload File
        </button>
        <button
          type="button"
          className={`px-6 py-3 rounded-lg border border-[#00F3FF]/30 transition-colors
            ${showUrlInput 
              ? 'bg-[#00F3FF]/10 text-[#00F3FF]' 
              : 'bg-[#1A1A1F] text-[#00F3FF]/90 hover:bg-[#00F3FF]/10'}`}
          onClick={() => setShowUrlInput(true)}
        >
          Enter URL
        </button>
      </div>

      {showUrlInput ? (
        <form onSubmit={handleUrlSubmit} className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter YouTube, Facebook, or Instagram URL"
              className="flex-1 px-4 py-3 bg-[#1A1A1F] border border-[#00F3FF]/30 rounded-lg 
                text-[#00F3FF]/90 placeholder-[#00F3FF]/50
                focus:outline-none focus:border-[#00F3FF] focus:ring-1 focus:ring-[#00F3FF]"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-[#1A1A1F] text-[#00F3FF] rounded-lg 
                border border-[#00F3FF]/30 hover:bg-[#00F3FF]/10 transition-colors"
            >
              Analyze
            </button>
          </div>
          <p className="text-sm text-[#00F3FF]/90">
            Supports YouTube Shorts, Facebook videos, and Instagram posts
          </p>
        </form>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-xl p-12 text-center
            ${dragActive 
              ? 'border-[#00F3FF] bg-[#00F3FF]/5' 
              : 'border-[#00F3FF]/30 hover:border-[#00F3FF]/50'}
            transition-colors duration-200 ease-in-out`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            onChange={handleChange}
            accept="image/*"
          />
          
          <CloudArrowUpIcon className="mx-auto h-12 w-12 text-[#00F3FF]/90" />
          
          <p className="mt-4 text-lg font-semibold text-[#39FF14]">
            Drag and drop your image here
          </p>
          <p className="mt-2 text-[#00F3FF]/90">
            or click to select a file from your computer
          </p>
          
          <p className="mt-2 text-sm text-[#00F3FF]/70">
            Supports common image formats (JPEG, PNG, etc.)
          </p>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;

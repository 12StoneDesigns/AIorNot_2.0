import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600, // Increased to accommodate ML libraries
    rollupOptions: {
      output: {
        manualChunks(id) {
          // React and related packages
          if (id.includes('node_modules/react/') ||
              id.includes('node_modules/react-dom/') ||
              id.includes('node_modules/scheduler/')) {
            return 'vendor-react';
          }

          // TensorFlow.js core functionality
          if (id.includes('@tensorflow/tfjs-core')) {
            return 'tf-core';
          }

          // TensorFlow.js CPU backend
          if (id.includes('@tensorflow/tfjs-backend-cpu')) {
            return 'tf-backend-cpu';
          }

          // TensorFlow.js WebGL backend
          if (id.includes('@tensorflow/tfjs-backend-webgl')) {
            return 'tf-backend-webgl';
          }

          // TensorFlow.js layers
          if (id.includes('@tensorflow/tfjs-layers')) {
            return 'tf-layers';
          }

          // TensorFlow.js data
          if (id.includes('@tensorflow/tfjs-data')) {
            return 'tf-data';
          }

          // TensorFlow.js converter
          if (id.includes('@tensorflow/tfjs-converter')) {
            return 'tf-converter';
          }

          // UI Components and utilities
          if (id.includes('@heroicons/')) {
            return 'vendor-ui';
          }

          // Dynamic imports for route chunks are handled automatically
        },
        // Optimize chunk loading order
        chunkFileNames: (chunkInfo) => {
          const tfChunks = [
            'tf-core',
            'tf-backend-cpu',
            'tf-backend-webgl',
            'tf-layers',
            'tf-data',
            'tf-converter'
          ];
          
          if (tfChunks.includes(chunkInfo.name)) {
            return `assets/tf/[name]-[hash].js`;
          }
          return 'assets/[name]-[hash].js';
        }
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@tensorflow/tfjs'] // Prevent TF.js from being pre-bundled
  }
})

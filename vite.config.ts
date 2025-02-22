import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase from default 500kb to 1000kb
    rollupOptions: {
      output: {
        manualChunks: {
          // Split React and ReactDOM into a separate vendor chunk
          'vendor-react': ['react', 'react-dom'],
          // Split TensorFlow.js into its own chunk
          'vendor-tensorflow': [
            '@tensorflow/tfjs',
            '@tensorflow/tfjs-core',
            '@tensorflow/tfjs-backend-cpu',
            '@tensorflow/tfjs-backend-webgl'
          ],
          // Group other major dependencies
          'vendor-utils': ['@heroicons/react'],
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

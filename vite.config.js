import { defineConfig } from 'vite';
const path = require('path');

export default defineConfig({
  root: './',  // Ensure the root is set to your project folder
  build: {
    outDir: 'dist',  // The directory where the build files are output
    rollupOptions: {
      input: 'index.html',  // Make sure the entry point is index.html
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/Components'),
    },
  },
});

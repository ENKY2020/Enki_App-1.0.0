import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // Add this if you're deploying to a subdirectory or if you want a specific base path
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'index.html',
    },
  },
});

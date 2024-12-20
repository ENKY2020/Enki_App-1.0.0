import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  esbuild: {
    loader: {
      '.js': 'jsx', // Ensure .js files are parsed as JSX
    },
  },
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx'], // Ensure Vite resolves these extensions
  },
});

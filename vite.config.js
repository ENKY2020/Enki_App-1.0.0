import { defineConfig } from 'vite';

export default defineConfig({
  base: '/', // Define the base path for your app (useful for subdirectories)
  build: {
    outDir: 'dist', // Output directory for the build
    rollupOptions: {
      input: 'index.html', // Entry point of your app
    },
    minify: true, // Enable minification for production builds
    sourcemap: true, // Enable sourcemaps for easier debugging
  },
  publicDir: 'public', // If you have a public directory for static assets like images
  server: {
    open: true, // Automatically open the app in the browser when starting the dev server
    port: 3000, // Define a custom port (optional)
    proxy: {
      // If your app needs to proxy API requests (adjust as necessary)
      '/api': 'http://localhost:4000',
    },
  },
  define: {
    'process.env.VITE_SUPABASE_URL': JSON.stringify(process.env.VITE_SUPABASE_URL),
    'process.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
  },
  optimizeDeps: {
    include: ['@supabase/supabase-js'], // Optimize specific dependencies if needed
  },
});

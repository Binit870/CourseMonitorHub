// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This is the proxy configuration
    proxy: {
      // Any request starting with "/api" will be forwarded
      '/api': {
        // The address of your backend server
        target: 'http://localhost:5000',
        // Important for preventing CORS errors
        changeOrigin: true,
        // Optional: removes /api from the beginning of the request path
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
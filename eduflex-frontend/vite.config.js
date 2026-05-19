import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const backendUrl = process.env.VITE_BACKEND_URL || process.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'https://eduflex-1-mgqd.onrender.com'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',   
  server: {
    host: true,       
    port: 5173,       
    open: true,       
    strictPort: true, 
    cors: true,
    // Add proxy configuration to fix CORS
    proxy: {
      '/api': {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, res) => {
            console.log('Proxying request:', req.method, req.url);
          });
        }
      }
    }
  },
  build: {
    outDir: 'dist',   
    sourcemap: false, 
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', 
  server: {
    host: true,       
    port: 5173,       
    open: true,       
    strictPort: true, 
    cors: true        
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
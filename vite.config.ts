import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        configure: (proxy, options) => {
          // 如果本地沒有 API 服務器，回退到模擬數據
          proxy.on('error', (err, req, res) => {
            console.log('API proxy error, using mock data')
          })
        }
      }
    }
  }
})
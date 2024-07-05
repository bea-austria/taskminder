import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: 'src/renderer',
  build: {
    outDir: '../../dist', // Adjust this path as needed
  },
  server: {
    proxy: {
      '/api': 'https://taskminder-mysql-api.onrender.com'
    }
  },
})

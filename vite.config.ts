import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: path.resolve(__dirname, './index.html'),
        philosophy: path.resolve(__dirname, './philosophy.html'),
        toolLab: path.resolve(__dirname, './tool-lab.html'),
        work: path.resolve(__dirname, './work.html'),
        timeline: path.resolve(__dirname, './timeline.html'),
        audit: path.resolve(__dirname, './audit.html'),
        contact: path.resolve(__dirname, './contact.html'),
      },
    },
  },
})

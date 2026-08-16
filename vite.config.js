import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/serverAgosto2026/',
  build: {
    target: ['es2020', 'safari12']
  }
})

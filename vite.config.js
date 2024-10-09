import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/portfolio-react",
  plugins: [react()],
  assetsInclude: ['**/*.md']
})

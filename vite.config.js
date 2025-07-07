import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // vite.config.js

  server: {
    host: '0.0.0.0',
    port: 5173, // or any other available port
  }
,

  plugins: [react()],
})

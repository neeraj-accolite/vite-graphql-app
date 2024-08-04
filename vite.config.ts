import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@acc/api": "http://localhost:5174/src/acc-api.ts"
    }
  },
  plugins: [react()],
  server: {
    host: "localhost",
    port: 5176
  }
})

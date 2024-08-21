/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul'
    },
    setupFiles: './tests/setup.ts'
  }
})

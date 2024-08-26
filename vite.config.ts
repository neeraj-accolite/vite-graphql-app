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
  build: {
    rollupOptions: {
      input: "src/acc-graphqlapp.ts",
      preserveEntrySignatures: "exports-only",
      output: {
        exports: "auto",
        format: "systemjs",
        entryFileNames: "[name].js",
      },
    },
  },
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

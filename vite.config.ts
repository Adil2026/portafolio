/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    // Report-only coverage (constitution §8): thresholds are enforced locally via
    // `npx vitest run --coverage`; CI runs `vitest run` without the coverage flag.
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/test/**', 'src/**/*.d.ts'],
      thresholds: {
        'src/lib/**': { lines: 80, functions: 80, branches: 80, statements: 80, perFile: true },
        'src/data/**': { lines: 80, functions: 80, branches: 80, statements: 80, perFile: true },
        'src/types/**': { lines: 80, functions: 80, branches: 80, statements: 80, perFile: true },
        lines: 60,
        functions: 60,
        branches: 60,
        statements: 60,
      },
    },
  },
})
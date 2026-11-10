/// <reference types="vitest/config" />
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Caminho do subdiretório na hospedagem compartilhada (HostGator)
  base: '/orcamento_social_midia/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: true,
    port: 8080,
  },
  preview: {
    port: 8080,
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    // Chunking manual para melhor performance/caching em produção
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          pdf: ['jspdf'],
          vendor: ['@vueuse/core', '@vueuse/motion'],
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.ts'],
    exclude: ['e2e/**', 'node_modules/**'],
  },
}))

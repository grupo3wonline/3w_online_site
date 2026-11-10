import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Caminho base para deploy em subdiretório (Hostgator: public_html/dados_brasil_generator_pro)
const BASE_PATH = '/dados_brasil_generator_pro/'

// https://vite.dev/config/
export default defineConfig({
  base: BASE_PATH,
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2019',
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
          i18n: ['vue-i18n'],
          ui: ['sweetalert2', '@iconify/vue', '@vueuse/motion'],
          utils: ['date-fns', 'fuse.js', 'maska', 'qrcode'],
        },
      },
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
  },
})

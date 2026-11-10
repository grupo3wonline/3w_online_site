import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Base path para deploy em subdiretório (HostGator: /dev_playground/)
  base: '/dev_playground/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '::',
    port: 8080,
    // Em desenvolvimento, encaminha as chamadas ao executor PHP para o
    // servidor PHP embutido (php -S) rodando na porta 8000.
    // Suba-o com: npm run dev:php  (em outro terminal)
    proxy: {
      '/dev_playground/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev_playground/, ''),
      },
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: mode === 'development',
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        // Code splitting manual para melhor caching e performance
        manualChunks: {
          vue: ['vue', 'vue-router', 'pinia'],
          vendor: ['@vueuse/core', 'vue-i18n'],
        },
      },
    },
  },
}))

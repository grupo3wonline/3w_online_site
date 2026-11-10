import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// Headers de segurança aplicados tanto no dev server quanto documentados para produção (.htaccess)
const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-XSS-Protection': '1; mode=block'
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/analisador_texto/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    minify: 'terser',
    sourcemap: false,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router', 'pinia'],
          'vendor-ui': ['sweetalert2', '@vueuse/core', '@vueuse/motion'],
          'vendor-utils': ['zod', 'fuse.js', 'vue-i18n']
        }
      }
    },
    chunkSizeWarningLimit: 900
  },
  server: {
    port: 3000,
    open: true,
    headers: securityHeaders
  },
  preview: {
    port: 4173,
    headers: securityHeaders
  }
})

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/entity_converter_pro/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // Otimizações de build
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Chunk splitting para melhor cache
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router'],
          'sweetalert': ['sweetalert2']
        }
      }
    },
    // Relatório de tamanho do bundle
    reportCompressedSize: true,
    // Limite de tamanho de chunk
    chunkSizeWarningLimit: 500
  },
  // Configuração do servidor de desenvolvimento
  server: {
    port: 3000,
    open: true,
    cors: true
  },
  // Configuração de preview
  preview: {
    port: 4173,
    open: true
  },
  // Configuração de testes
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,ts}', 'tests/unit/**/*.{test,spec}.{js,ts}'],
    exclude: ['tests/e2e/**', 'node_modules/'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'tests/']
    }
  }
})


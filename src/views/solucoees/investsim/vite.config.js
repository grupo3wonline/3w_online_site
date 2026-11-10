import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import viteCompression from 'vite-plugin-compression'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  base: '/investsim/',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('ion-')
        }
      }
    }),
    // Compressão Gzip
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10kb
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Compressão Brotli (mais eficiente que gzip)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    // Visualizador de bundle (apenas em build)
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    cors: true,
    // Pre-warming para módulos frequentemente usados
    warmup: {
      clientFiles: ['./src/views/Home.vue', './src/views/Simulator.vue'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    // Otimizações do Terser
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.log em produção
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      format: {
        comments: false, // Remove comentários
      },
    },
    // Otimizar tamanho de chunks
    chunkSizeWarningLimit: 1000, // 1MB
    rollupOptions: {
      output: {
        // Estratégia avançada de code splitting
        manualChunks: (id) => {
          // Vendor chunks separados para melhor cache
          if (id.includes('node_modules')) {
            if (id.includes('vue')) {
              return 'vendor-vue'
            }
            if (id.includes('vue-router')) {
              return 'vendor-router'
            }
            if (id.includes('chart.js')) {
              return 'vendor-charts'
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'vendor-pdf'
            }
            if (id.includes('sweetalert2')) {
              return 'vendor-sweetalert'
            }
            if (id.includes('@headlessui') || id.includes('@heroicons')) {
              return 'vendor-ui'
            }
            // Outros vendors em um chunk separado
            return 'vendor-other'
          }
          
          // Separar composables
          if (id.includes('/composables/')) {
            return 'composables'
          }
          
          // Separar componentes UI
          if (id.includes('/components/ui/')) {
            return 'ui-components'
          }
        },
        // Nomear chunks de forma consistente para melhor cache
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] || assetInfo.name || 'asset'
          const info = name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          } else if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[ext]/[name]-[hash][extname]`
        },
      },
    },
    // Configurar tamanho de inline para assets pequenos
    assetsInlineLimit: 4096, // 4kb - converte assets pequenos para base64
    // CSS Code splitting
    cssCodeSplit: true,
    // Reportar tamanho comprimido
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      '@headlessui/vue',
      '@heroicons/vue/24/outline',
      '@heroicons/vue/24/solid',
    ],
    exclude: ['jspdf', 'html2canvas'], // Lazy load para PDF generation
  },
  // Definições globais para melhor tree-shaking
  define: {
    __VUE_OPTIONS_API__: false, // Desabilita Options API (não usado)
    __VUE_PROD_DEVTOOLS__: false, // Desabilita devtools em produção
  },
})

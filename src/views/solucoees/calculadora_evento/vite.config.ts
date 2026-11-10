import { defineConfig, type PreviewServer } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import fs from 'fs'

const BASE = '/calculadora_evento/'

/**
 * Faz o `vite preview` servir o index.html para rotas de SPA (history mode),
 * replicando o fallback que o .htaccess faz em produção. Sem isso, deep-links
 * como /erro ou /termos-de-uso retornam 404 no preview.
 */
function spaPreviewFallback() {
  return {
    name: 'spa-preview-fallback',
    configurePreviewServer(server: PreviewServer) {
      server.middlewares.use((req, res, next) => {
        const url = req.url ?? '/'
        const isAsset = /\.[a-z0-9]+($|\?)/i.test(url)
        if (!isAsset && url.startsWith(BASE)) {
          const indexPath = path.resolve(__dirname, 'dist/index.html')
          if (fs.existsSync(indexPath)) {
            res.setHeader('Content-Type', 'text/html')
            res.end(fs.readFileSync(indexPath))
            return
          }
        }
        next()
      })
    },
  }
}

export default defineConfig({
  base: BASE,
  server: {
    host: '::',
    port: 8080,
  },
  plugins: [vue(), spaPreviewFallback()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          sweetalert: ['sweetalert2'],
        },
      },
    },
  },
})

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          <span class="text-gradient">Extrator de Thumbnails</span>
        </h1>
        <p class="text-xl text-gray-600 max-w-2xl mx-auto">
          Cole a URL do vídeo do YouTube e extraia thumbnails em alta qualidade instantaneamente
        </p>
      </div>

      <!-- Main Tool -->
      <div class="card p-8 mb-8">
        <div class="space-y-6">
          <!-- Input Section -->
          <div>
            <label for="youtube-url" class="block text-lg font-medium text-gray-900 mb-3">
              URL do Vídeo do YouTube
            </label>
            <div class="flex flex-col sm:flex-row gap-4">
              <input
                id="youtube-url"
                v-model="youtubeUrl"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                class="input-field flex-1"
                @keyup.enter="extractThumbnail"
                ref="urlInput"
              />
              <button
                @click="extractThumbnail"
                :disabled="loading || !youtubeUrl"
                class="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="loading" class="flex items-center">
                  <Loader2 class="w-5 h-5 mr-2 animate-spin" />
                  Extraindo...
                </span>
                <span v-else class="flex items-center">
                  <Download class="w-5 h-5 mr-2" />
                  Extrair Thumbnail
                </span>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
            <div class="flex items-center">
              <AlertCircle class="w-5 h-5 text-red-600 mr-2" />
              <p class="text-red-800">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="mt-6">
            <LoadingSpinner 
              title="Extraindo Thumbnail..." 
              message="Analisando o vídeo e extraindo as imagens..." 
            />
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div v-if="thumbnailData && !loading" class="space-y-8">
        <!-- Video Info -->
        <div class="card p-6">
          <div class="flex items-start space-x-4">
            <img 
              :src="thumbnailData.thumbnail_url" 
              :alt="thumbnailData.title"
              class="w-32 h-24 object-cover rounded-lg shadow-md"
            />
            <div class="flex-1 min-w-0">
              <h2 class="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                {{ thumbnailData.title }}
              </h2>
              <p class="text-gray-600 mb-2">{{ thumbnailData.channel_title }}</p>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span class="flex items-center">
                  <Eye class="w-4 h-4 mr-1" />
                  {{ formatViews(thumbnailData.view_count) }} visualizações
                </span>
                <span class="flex items-center">
                  <Calendar class="w-4 h-4 mr-1" />
                  {{ formatDate(thumbnailData.upload_date) }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Thumbnails Grid -->
        <div class="card p-6">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Image class="w-6 h-6 mr-2 text-youtube-red" />
            Thumbnails Disponíveis
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              v-for="thumbnail in thumbnails"
              :key="thumbnail.quality"
              class="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200"
            >
              <div class="aspect-video mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  :src="thumbnail.url"
                  :alt="`Thumbnail ${thumbnail.quality}`"
                  class="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
              
              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm font-medium text-gray-900">
                    {{ thumbnail.quality }}
                  </span>
                  <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {{ thumbnail.resolution }}
                  </span>
                </div>
                
                <button
                  @click="downloadThumbnail(thumbnail.url, thumbnail.quality)"
                  class="w-full btn-primary py-2 text-sm"
                >
                  <Download class="w-4 h-4 mr-2" />
                  Baixar {{ thumbnail.quality }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Actions -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="downloadAllThumbnails"
            class="btn-secondary px-6 py-3"
          >
            <Package class="w-5 h-5 mr-2" />
            Baixar Todos
          </button>
          <button
            @click="reset"
            class="btn-secondary px-6 py-3"
          >
            <RotateCcw class="w-5 h-5 mr-2" />
            Nova Extração
          </button>
        </div>
      </div>

      <!-- Instructions -->
      <div v-if="!thumbnailData && !loading" class="mt-12">
        <div class="card p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Como Usar
          </h3>
          
          <div class="grid md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Link class="w-6 h-6 text-white" />
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">1. Cole a URL</h4>
              <p class="text-gray-600 text-sm">
                Copie a URL do vídeo do YouTube e cole no campo acima
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap class="w-6 h-6 text-white" />
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">2. Extrair</h4>
              <p class="text-gray-600 text-sm">
                Clique em "Extrair Thumbnail" e aguarde o processamento
              </p>
            </div>
            
            <div class="text-center">
              <div class="w-12 h-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
                <Download class="w-6 h-6 text-white" />
              </div>
              <h4 class="font-semibold text-gray-900 mb-2">3. Baixar</h4>
              <p class="text-gray-600 text-sm">
                Escolha a qualidade desejada e baixe sua thumbnail
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { 
  Download, 
  Loader2, 
  AlertCircle, 
  Image, 
  Eye, 
  Calendar, 
  Package, 
  RotateCcw, 
  Link, 
  Zap 
} from 'lucide-vue-next'
import LoadingSpinner from './LoadingSpinner.vue'
import { useNotifications } from '../composables/useNotifications.js'
import { trackEvent, events } from '../utils/analytics.js'

export default {
  name: 'ThumbnailExtractor',
  components: {
    Download,
    Loader2,
    AlertCircle,
    Image,
    Eye,
    Calendar,
    Package,
    RotateCcw,
    Link,
    Zap,
    LoadingSpinner
  },
  setup() {
    const youtubeUrl = ref('')
    const thumbnailData = ref(null)
    const errorMessage = ref('')
    const loading = ref(false)
    const urlInput = ref(null)
    const { showSuccess, showError, showInfo } = useNotifications()

    const thumbnails = ref([
      { quality: 'Máxima', resolution: '1280x720', url: '' },
      { quality: 'Alta', resolution: '640x480', url: '' },
      { quality: 'Média', resolution: '480x360', url: '' },
      { quality: 'Padrão', resolution: '320x180', url: '' },
      { quality: 'Baixa', resolution: '120x90', url: '' }
    ])

    const extractVideoId = (url) => {
      // Regex simplificado para extrair ID do YouTube
      const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
      const match = url.match(regex)
      return match ? match[1] : null
    }

    const generateThumbnailUrls = (videoId) => {
      const baseUrl = 'https://img.youtube.com/vi/'
      return [
        { quality: 'Máxima', resolution: '1280x720', url: `${baseUrl}${videoId}/maxresdefault.jpg` },
        { quality: 'Alta', resolution: '640x480', url: `${baseUrl}${videoId}/sddefault.jpg` },
        { quality: 'Média', resolution: '480x360', url: `${baseUrl}${videoId}/hqdefault.jpg` },
        { quality: 'Padrão', resolution: '320x180', url: `${baseUrl}${videoId}/mqdefault.jpg` },
        { quality: 'Baixa', resolution: '120x90', url: `${baseUrl}${videoId}/default.jpg` }
      ]
    }

    const extractThumbnail = async () => {
      if (!youtubeUrl.value.trim()) {
        errorMessage.value = 'Por favor, insira uma URL válida do YouTube'
        return
      }

      const videoId = extractVideoId(youtubeUrl.value)
      if (!videoId) {
        errorMessage.value = 'URL do YouTube inválida. Verifique se a URL está correta.'
        return
      }

      loading.value = true
      errorMessage.value = ''

      try {
        const response = await fetch('https://3wsys-back-hotwyl.vercel.app/consultas/capa_youtube', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            video_url: youtubeUrl.value
          })
        })

        const data = await response.json()
        
        if (data.content) {
          thumbnailData.value = data.content
          thumbnails.value = generateThumbnailUrls(videoId)
          showSuccess('Thumbnails extraídos com sucesso!', 'Sucesso!')
          trackEvent(events.THUMBNAIL_EXTRACTED, { videoId })
        } else {
          errorMessage.value = data.message || 'Erro ao extrair thumbnail. Tente novamente.'
          showError(errorMessage.value, 'Erro na Extração')
        }
      } catch (error) {
        console.error('Erro:', error)
        errorMessage.value = 'Erro de conexão. Verifique sua internet e tente novamente.'
        showError(errorMessage.value, 'Erro de Conexão')
        trackEvent(events.ERROR_OCCURRED, { error: error.message })
      } finally {
        loading.value = false
      }
    }

    const downloadThumbnail = async (url, quality) => {
      try {
        const response = await fetch(url)
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = `thumbnail-${quality.toLowerCase()}-${Date.now()}.jpg`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        
        window.URL.revokeObjectURL(downloadUrl)
        showSuccess(`Thumbnail ${quality} baixado com sucesso!`, 'Download Concluído')
        trackEvent(events.DOWNLOAD_COMPLETED, { quality })
      } catch (error) {
        console.error('Erro ao baixar:', error)
        errorMessage.value = 'Erro ao baixar a imagem. Tente novamente.'
        showError(errorMessage.value, 'Erro no Download')
      }
    }

    const downloadAllThumbnails = async () => {
      showInfo('Iniciando download de todos os thumbnails...', 'Download em Lote')
      for (const thumbnail of thumbnails.value) {
        await downloadThumbnail(thumbnail.url, thumbnail.quality)
        // Pequeno delay entre downloads
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      showSuccess('Todos os thumbnails foram baixados!', 'Download Completo')
    }

    const formatViews = (views) => {
      if (!views) return '0'
      if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M'
      } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K'
      }
      return views.toString()
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      try {
        return new Date(dateString).toLocaleDateString('pt-BR')
      } catch {
        return dateString
      }
    }

    const reset = () => {
      youtubeUrl.value = ''
      thumbnailData.value = null
      errorMessage.value = ''
      loading.value = false
      urlInput.value?.focus()
    }

    onMounted(() => {
      urlInput.value?.focus()
    })

    return {
      youtubeUrl,
      thumbnailData,
      errorMessage,
      loading,
      thumbnails,
      urlInput,
      extractThumbnail,
      downloadThumbnail,
      downloadAllThumbnails,
      formatViews,
      formatDate,
      reset
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

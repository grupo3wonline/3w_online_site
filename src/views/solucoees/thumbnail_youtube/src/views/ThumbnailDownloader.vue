<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-5xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <div class="inline-block p-4 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
          <i class="fas fa-download text-5xl text-red-600 dark:text-red-500"></i>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Download de Thumbnail YouTube
        </h1>
        <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Baixe miniaturas do YouTube em alta qualidade de forma <span class="text-red-600 font-semibold">rápida</span>, 
          <span class="text-red-600 font-semibold">gratuita</span> e <span class="text-red-600 font-semibold">profissional</span>
        </p>
      </div>

      <!-- Card Principal -->
      <div class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-10 mb-8">
        <form @submit.prevent="getThumbnail" class="space-y-6">
          <div>
            <label for="youtube_url" class="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
              <i class="fab fa-youtube text-red-600 mr-2"></i>
              Cole a URL do Vídeo do YouTube
              <button type="button" @click="showHelp" class="ml-2 text-gray-400 hover:text-red-600" title="Como usar">
                <i class="fas fa-question-circle"></i>
              </button>
            </label>
            
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <i class="fas fa-link text-gray-400"></i>
              </div>
              <input
                v-model="youtube_url"
                id="youtube_url"
                type="url"
                required
                autocomplete="off"
                placeholder="https://www.youtube.com/watch?v=..."
                class="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-red-500/20 focus:border-red-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              />
              <button v-if="youtube_url" type="button" @click="youtube_url = ''" class="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-red-600">
                <i class="fas fa-times-circle"></i>
              </button>
            </div>
            
            <p class="mt-2 text-xs text-gray-500 dark:text-gray-400">
              <i class="fas fa-info-circle mr-1"></i>
              Formatos: youtube.com/watch?v=ID, youtu.be/ID, youtube.com/shorts/ID
            </p>
          </div>

          <button
            type="submit"
            :disabled="loading || !youtube_url"
            class="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl disabled:cursor-not-allowed transition-all duration-300 text-lg"
          >
            <span v-if="loading" class="flex items-center justify-center">
              <i class="fas fa-spinner fa-spin mr-3"></i>Processando...
            </span>
            <span v-else class="flex items-center justify-center">
              <i class="fas fa-search mr-3"></i>Obter Thumbnail
            </span>
          </button>
        </form>

        <!-- Erro -->
        <div v-if="error" class="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
          <div class="flex items-start">
            <i class="fas fa-exclamation-triangle text-red-600 text-xl mr-3"></i>
            <div>
              <h4 class="text-sm font-semibold text-red-800 dark:text-red-400 mb-1">Erro</h4>
              <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
            </div>
          </div>
        </div>

        <!-- Resultado -->
        <div v-if="thumbnail_data" class="mt-8 space-y-6">
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-600">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">
              <i class="fas fa-video text-red-600 mr-2"></i>{{ thumbnail_data.title }}
            </h3>
          </div>

          <img :src="thumbnail_data.thumbnail_url" :alt="thumbnail_data.title" class="w-full rounded-2xl shadow-2xl border-4 border-gray-200 dark:border-gray-600" />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a :href="thumbnail_data.thumbnail_url" :download="`thumbnail-${thumbnail_data.video_id}.jpg`" @click="trackDownload" class="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-xl shadow-lg transition-all">
              <i class="fas fa-download mr-3"></i>Baixar Thumbnail
            </a>
            
            <button @click="copyImageUrl" class="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg transition-all">
              <i class="fas fa-copy mr-3"></i>Copiar URL
            </button>
          </div>

          <button @click="reset" class="w-full px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold rounded-xl">
            <i class="fas fa-redo mr-2"></i>Baixar Outra Thumbnail
          </button>
        </div>
      </div>

      <!-- Instruções -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 md:p-8">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          <i class="fas fa-book-open text-red-600 mr-3"></i>Como Usar
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
              <span class="text-2xl font-bold text-red-600">1</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Copie a URL</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Acesse o vídeo no YouTube e copie a URL</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
              <span class="text-2xl font-bold text-red-600">2</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Cole e Busque</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Cole a URL e clique em "Obter Thumbnail"</p>
          </div>
          <div class="text-center">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full mb-4">
              <span class="text-2xl font-bold text-red-600">3</span>
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Baixe Grátis</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Baixe instantaneamente em alta qualidade</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const youtube_url = ref('')
const loading = ref(false)
const error = ref(null)
const thumbnail_data = ref(null)

const getThumbnail = async () => {
  loading.value = true
  error.value = null
  thumbnail_data.value = null
  
  try {
    if (!isValidYouTubeUrl(youtube_url.value)) {
      throw new Error('URL do YouTube inválida')
    }
    
    const response = await fetch('https://3wsys-back-hotwyl.vercel.app/consultas/capa_youtube', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ video_url: youtube_url.value })
    })
    
    const data = await response.json()
    
    if (data.content) {
      thumbnail_data.value = data.content
      Swal.fire({ icon: 'success', title: 'Thumbnail Encontrada!', timer: 2000, showConfirmButton: false, toast: true, position: 'top-end' })
      if (window.gtag) window.gtag('event', 'thumbnail_found', { video_id: data.content.video_id })
    } else {
      throw new Error('Não foi possível obter a thumbnail')
    }
  } catch (e) {
    error.value = e.message
    Swal.fire({ icon: 'error', title: 'Erro!', text: error.value, confirmButtonColor: '#dc2626' })
  } finally {
    loading.value = false
  }
}

const isValidYouTubeUrl = (url) => {
  const patterns = [/youtube\.com\/watch\?v=[\w-]+/, /youtu\.be\/[\w-]+/, /youtube\.com\/shorts\/[\w-]+/]
  return patterns.some(pattern => pattern.test(url))
}

const reset = () => {
  youtube_url.value = ''
  thumbnail_data.value = null
  error.value = null
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const copyImageUrl = async () => {
  try {
    await navigator.clipboard.writeText(thumbnail_data.value.thumbnail_url)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 2000, showConfirmButton: false, toast: true, position: 'top-end' })
  } catch (e) {
    Swal.fire({ icon: 'error', title: 'Erro ao copiar', confirmButtonColor: '#dc2626' })
  }
}

const trackDownload = () => {
  if (window.gtag) window.gtag('event', 'download_thumbnail', { video_id: thumbnail_data.value.video_id })
  Swal.fire({ icon: 'success', title: 'Download Iniciado!', timer: 2000, showConfirmButton: false, toast: true, position: 'top-end' })
}

const showHelp = () => {
  Swal.fire({
    title: 'Como Usar',
    html: '<div class="text-left text-sm"><p><strong>Formatos aceitos:</strong></p><p>• https://www.youtube.com/watch?v=ID<br>• https://youtu.be/ID<br>• https://www.youtube.com/shorts/ID</p></div>',
    icon: 'info',
    confirmButtonColor: '#dc2626'
  })
}
</script>

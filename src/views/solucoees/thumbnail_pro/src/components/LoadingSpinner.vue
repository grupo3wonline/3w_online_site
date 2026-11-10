<template>
  <div class="flex flex-col items-center justify-center p-8">
    <div class="relative">
      <!-- Spinner principal -->
      <div class="w-16 h-16 border-4 border-gray-200 border-t-youtube-red rounded-full animate-spin"></div>
      
      <!-- Ícone do YouTube no centro -->
      <div class="absolute inset-0 flex items-center justify-center">
        <Youtube class="w-6 h-6 text-youtube-red" />
      </div>
    </div>
    
    <!-- Texto de loading -->
    <div class="mt-6 text-center">
      <h3 class="text-lg font-semibold text-gray-900 mb-2">
        {{ title || 'Extraindo Thumbnail...' }}
      </h3>
      <p class="text-gray-600">
        {{ message || 'Isso pode levar alguns segundos' }}
      </p>
    </div>
    
    <!-- Barra de progresso animada -->
    <div class="w-full max-w-xs mt-4">
      <div class="bg-gray-200 rounded-full h-2">
        <div class="bg-gradient-to-r from-youtube-red to-red-600 h-2 rounded-full animate-pulse" 
             :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { Youtube } from 'lucide-vue-next'

export default {
  name: 'LoadingSpinner',
  components: {
    Youtube
  },
  props: {
    title: {
      type: String,
      default: 'Extraindo Thumbnail...'
    },
    message: {
      type: String,
      default: 'Isso pode levar alguns segundos'
    }
  },
  setup() {
    const progress = ref(0)
    let interval = null
    
    onMounted(() => {
      // Simula progresso
      interval = setInterval(() => {
        if (progress.value < 90) {
          progress.value += Math.random() * 15
        }
      }, 200)
    })
    
    onUnmounted(() => {
      if (interval) {
        clearInterval(interval)
      }
    })
    
    return {
      progress
    }
  }
}
</script>

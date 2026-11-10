<template>
  <nav class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2 group">
            <i class="fab fa-youtube text-3xl text-youtube-red group-hover:scale-110 transition-transform duration-200"></i>
            <span class="text-xl font-bold text-gray-900 dark:text-white">ThumbnailPro</span>
          </router-link>
        </div>
        
        <div class="hidden md:flex items-center space-x-6">
          <router-link 
            to="/" 
            class="nav-link"
            active-class="text-youtube-red"
          >
            <i class="fas fa-home mr-2"></i>
            Início
          </router-link>
          <router-link 
            to="/extractor" 
            class="nav-link"
            active-class="text-youtube-red"
          >
            <i class="fas fa-tools mr-2"></i>
            Ferramenta
          </router-link>
          <router-link 
            to="/sobre" 
            class="nav-link"
            active-class="text-youtube-red"
          >
            <i class="fas fa-info-circle mr-2"></i>
            Sobre
          </router-link>
          <router-link 
            to="/contato" 
            class="nav-link"
            active-class="text-youtube-red"
          >
            <i class="fas fa-envelope mr-2"></i>
            Contato
          </router-link>
          
          <!-- Dark Mode Toggle -->
          <button 
            @click="toggleDarkMode" 
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            :title="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
          >
            <i v-if="isDark" class="fas fa-sun text-yellow-400 text-xl"></i>
            <i v-else class="fas fa-moon text-gray-600 text-xl"></i>
          </button>
          
          <router-link to="/extractor" class="btn-primary">
            <i class="fas fa-download mr-2"></i>
            Começar Grátis
          </router-link>
        </div>
        
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center space-x-2">
          <button 
            @click="toggleDarkMode" 
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <i v-if="isDark" class="fas fa-sun text-yellow-400"></i>
            <i v-else class="fas fa-moon text-gray-600"></i>
          </button>
          <button 
            @click="isOpen = !isOpen" 
            class="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
          >
            <i v-if="!isOpen" class="fas fa-bars text-2xl"></i>
            <i v-else class="fas fa-times text-2xl"></i>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile menu -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <div v-show="isOpen" class="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <router-link 
            to="/" 
            @click="isOpen = false" 
            class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <i class="fas fa-home mr-2"></i>
            Início
          </router-link>
          <router-link 
            to="/extractor" 
            @click="isOpen = false" 
            class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <i class="fas fa-tools mr-2"></i>
            Ferramenta
          </router-link>
          <router-link 
            to="/sobre" 
            @click="isOpen = false" 
            class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <i class="fas fa-info-circle mr-2"></i>
            Sobre
          </router-link>
          <router-link 
            to="/contato" 
            @click="isOpen = false" 
            class="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-200"
          >
            <i class="fas fa-envelope mr-2"></i>
            Contato
          </router-link>
          <div class="px-3 py-2">
            <router-link to="/extractor" @click="isOpen = false" class="btn-primary w-full block text-center">
              <i class="fas fa-download mr-2"></i>
              Começar Grátis
            </router-link>
          </div>
        </div>
      </div>
    </transition>
  </nav>
</template>

<script>
import { ref } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

export default {
  name: 'Navbar',
  setup() {
    const isOpen = ref(false)
    const { isDark, toggleDarkMode } = useDarkMode()
    
    return {
      isOpen,
      isDark,
      toggleDarkMode
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply text-gray-700 dark:text-gray-300 hover:text-youtube-red dark:hover:text-youtube-red transition-colors duration-200 font-medium;
}
</style>

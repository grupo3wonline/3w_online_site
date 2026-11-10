<script setup>
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

defineProps({
  darkMode: Boolean
})

const emit = defineEmits(['toggle-dark-mode'])

const route = useRoute()
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const navLinks = [
  { name: 'Início', path: '/', icon: 'fas fa-home' },
  { name: 'Ferramenta', path: '/#ferramenta', icon: 'fas fa-wrench' },
  { name: 'Sobre', path: '/sobre', icon: 'fas fa-info-circle' },
  { name: 'Contato', path: '/contato', icon: 'fas fa-envelope' }
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  if (path.includes('#')) return route.path === '/' && route.hash === path.split('/')[1]
  return route.path === path
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink 
          to="/" 
          class="flex items-center gap-2 text-xl font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
          @click="closeMenu"
        >
          <i class="fas fa-code text-2xl"></i>
          <span class="hidden sm:inline">Entity Converter Pro</span>
          <span class="sm:hidden">ECP</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <template v-for="link in navLinks" :key="link.path">
            <RouterLink 
              v-if="!link.path.includes('#')"
              :to="link.path"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                isActive(link.path) 
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
              ]"
            >
              <i :class="link.icon"></i>
              {{ link.name }}
            </RouterLink>
            <a 
              v-else
              :href="link.path"
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2',
                'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
              ]"
            >
              <i :class="link.icon"></i>
              {{ link.name }}
            </a>
          </template>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <!-- Dark Mode Toggle -->
          <button
            @click="emit('toggle-dark-mode')"
            class="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            :aria-label="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'"
            :title="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'"
          >
            <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'" class="text-lg"></i>
          </button>

          <!-- Help Button -->
          <button
            class="hidden sm:flex p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200"
            title="Ajuda e informações sobre a ferramenta"
            aria-label="Ajuda"
            @click="$router.push('/sobre')"
          >
            <i class="fas fa-question-circle text-lg"></i>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMenu"
            class="md:hidden p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
            :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
          >
            <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-lg"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <nav v-if="isMenuOpen" class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex flex-col gap-2">
            <template v-for="link in navLinks" :key="link.path">
              <RouterLink 
                v-if="!link.path.includes('#')"
                :to="link.path"
                :class="[
                  'px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3',
                  isActive(link.path) 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' 
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                ]"
                @click="closeMenu"
              >
                <i :class="link.icon"></i>
                {{ link.name }}
              </RouterLink>
              <a 
                v-else
                :href="link.path"
                :class="[
                  'px-4 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-3',
                  'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                ]"
                @click="closeMenu"
              >
                <i :class="link.icon"></i>
                {{ link.name }}
              </a>
            </template>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

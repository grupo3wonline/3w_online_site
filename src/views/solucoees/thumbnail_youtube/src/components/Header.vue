<template>
  <header class="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 transition-colors duration-300">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo e Nome -->
        <router-link to="/" class="flex items-center space-x-3 group">
          <div class="relative">
            <i class="fas fa-image text-3xl text-red-600 dark:text-red-500 group-hover:scale-110 transition-transform duration-300"></i>
            <i class="fab fa-youtube absolute -bottom-1 -right-1 text-sm text-red-600 dark:text-red-500"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-xl font-bold text-gray-900 dark:text-white">3w OmniHub</span>
            <span class="text-xs text-gray-500 dark:text-gray-400">Thumbnail YouTube</span>
          </div>
        </router-link>

        <!-- Menu Desktop -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            to="/"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-500 transition-all duration-200"
            :class="{ 'bg-red-50 dark:bg-gray-800 text-red-600 dark:text-red-500': $route.path === '/' }"
          >
            <i class="fas fa-home mr-2"></i>Início
          </router-link>
          
          <router-link
            to="/tool"
            class="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <i class="fas fa-download mr-2"></i>Ferramenta
          </router-link>
          
          <router-link
            to="/sobre"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-500 transition-all duration-200"
            :class="{ 'bg-red-50 dark:bg-gray-800 text-red-600 dark:text-red-500': $route.path === '/sobre' }"
          >
            <i class="fas fa-info-circle mr-2"></i>Sobre
          </router-link>
          
          <router-link
            to="/contato"
            class="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-500 transition-all duration-200"
            :class="{ 'bg-red-50 dark:bg-gray-800 text-red-600 dark:text-red-500': $route.path === '/contato' }"
          >
            <i class="fas fa-envelope mr-2"></i>Contato
          </router-link>

          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="ml-4 p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            :title="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
            aria-label="Alternar tema"
          >
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" class="text-xl"></i>
          </button>
        </div>

        <!-- Menu Mobile Button -->
        <div class="md:hidden flex items-center space-x-2">
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            :title="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
            aria-label="Alternar tema"
          >
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" class="text-xl"></i>
          </button>
          
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            aria-label="Menu"
          >
            <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-2xl"></i>
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-2">
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-500 transition-all duration-200"
            :class="{ 'bg-red-50 dark:bg-gray-800 text-red-600 dark:text-red-500': $route.path === '/' }"
          >
            <i class="fas fa-home mr-2"></i>Início
          </router-link>
          
          <router-link
            to="/tool"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-sm font-medium bg-gradient-to-r from-red-600 to-red-700 text-white"
          >
            <i class="fas fa-download mr-2"></i>Ferramenta
          </router-link>
          
          <router-link
            to="/sobre"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-500 transition-all duration-200"
            :class="{ 'bg-red-50 dark:bg-gray-800 text-red-600 dark:text-red-500': $route.path === '/sobre' }"
          >
            <i class="fas fa-info-circle mr-2"></i>Sobre
          </router-link>
          
          <router-link
            to="/contato"
            @click="mobileMenuOpen = false"
            class="block px-4 py-3 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-gray-800 hover:text-red-600 dark:hover:text-red-500 transition-all duration-200"
            :class="{ 'bg-red-50 dark:bg-gray-800 text-red-600 dark:text-red-500': $route.path === '/contato' }"
          >
            <i class="fas fa-envelope mr-2"></i>Contato
          </router-link>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useDarkMode } from '../composables/useDarkMode'

const mobileMenuOpen = ref(false)
const { isDark, toggleDarkMode } = useDarkMode()
</script>

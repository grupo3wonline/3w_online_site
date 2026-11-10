<template>
  <nav class="bg-white shadow-md fixed w-full z-50 transition-all duration-300">
    <div class="container-custom">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-primary-600 tracking-tighter">
              Gerador de Legenda
            </router-link>
          </div>
        </div>
        
        <!-- Desktop Menu -->
        <div class="hidden md:flex items-center space-x-4">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path"
            class="text-gray-600 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            active-class="text-primary-600 bg-gray-50">
            {{ item.name }}
          </router-link>
          <a href="https://www.3wonline.com.br" target="_blank" class="btn btn-primary btn-sm text-sm py-2">
            Conheça a 3W
          </a>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button @click="isOpen = !isOpen" class="text-gray-600 hover:text-primary-600 focus:outline-none p-2">
            <font-awesome-icon :icon="isOpen ? ['fas', 'times'] : ['fas', 'bars']" size="lg" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isOpen" class="md:hidden bg-white border-t border-gray-100">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link v-for="item in navItems" :key="item.path" :to="item.path"
          class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
          active-class="text-primary-600 bg-gray-50"
          @click="isOpen = false">
          {{ item.name }}
        </router-link>
         <a href="https://www.3wonline.com.br" target="_blank" class="block w-full text-center px-3 py-2 mt-4 btn btn-primary">
            Conheça a 3W
          </a>
      </div>
    </div>
  </nav>
  <!-- Spacer for fixed navbar -->
  <div class="h-16"></div>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Serviços', path: '/servicos' },
  { name: 'Ferramentas', path: '/ferramentas' },
  { name: 'Contato', path: '/contato' },
]
</script>

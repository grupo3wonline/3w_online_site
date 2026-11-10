<template>
  <header
    class="sticky top-0 z-50 w-full transition-all duration-300"
    :class="isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-soft' : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm'"
  >
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-16 lg:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group" aria-label="Página Inicial">
          <div class="gradient-hero rounded-xl p-2 transition-transform group-hover:scale-105">
            <i class="fa-solid fa-calculator text-white text-lg"></i>
          </div>
          <div class="hidden sm:block">
            <span class="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">Calculadora</span>
            <span class="text-lg lg:text-xl font-bold text-primary-600 ml-1">Empresarial</span>
          </div>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1" aria-label="Menu principal">
          <router-link
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all"
            :class="isActive(item) ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'"
          >
            <i :class="item.icon" class="text-sm"></i>
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <ThemeToggle />
          <router-link to="/calculadoras" class="hidden lg:inline-flex btn-primary text-sm px-5 py-2.5">
            Começar Agora
          </router-link>
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
            :aria-expanded="isMenuOpen"
          >
            <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Nav -->
      <transition name="slide">
        <nav v-if="isMenuOpen" class="lg:hidden pb-4 border-t border-gray-100 dark:border-gray-800 pt-3" aria-label="Menu mobile">
          <router-link
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="flex items-center gap-3 px-4 py-3 text-base font-medium rounded-lg transition-colors"
            :class="isActive(item) ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'"
            @click="isMenuOpen = false"
          >
            <i :class="item.icon" class="w-5 text-center"></i>
            {{ item.label }}
          </router-link>
          <router-link to="/calculadoras" class="block mt-3 btn-primary text-center" @click="isMenuOpen = false">
            Começar Agora
          </router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const isScrolled = ref(false)
const isMenuOpen = ref(false)

// Menu no formato hotsite: navega para seções da landing (âncoras).
// As páginas /sobre e /contato continuam existindo para acesso direto/SEO.
const navItems = [
  { label: 'Início', to: { path: '/' }, icon: 'fa-solid fa-house', match: 'home' },
  { label: 'Sobre', to: { path: '/', hash: '#sobre' }, icon: 'fa-solid fa-circle-info', match: 'sobre' },
  { label: 'Serviços', to: { path: '/', hash: '#servicos' }, icon: 'fa-solid fa-code', match: 'servicos' },
  { label: 'Contato', to: { path: '/', hash: '#contato' }, icon: 'fa-solid fa-envelope', match: 'contato' }
]

function isActive(item) {
  if (item.match === 'home') return route.path === '/' && !route.hash
  return route.path === '/' && route.hash === item.to.hash
}

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

watch(() => route.path, () => { isMenuOpen.value = false })

onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  overflow: hidden;
}
.slide-enter-from, .slide-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

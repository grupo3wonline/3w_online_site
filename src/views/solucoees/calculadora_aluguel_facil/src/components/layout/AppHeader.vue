<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

const navItems = [
  { to: '/#inicio', label: 'Início', icon: 'fa-house' },
  { to: '/#ferramentas', label: 'Ferramentas', icon: 'fa-wrench' },
  { to: '/#como-usar', label: 'Como Usar', icon: 'fa-circle-play' },
  { to: '/#sobre', label: 'Sobre', icon: 'fa-circle-info' },
  { to: '/#faq', label: 'FAQ', icon: 'fa-circle-question' },
  { to: '/#contato', label: 'Contato', icon: 'fa-phone' }
]

const toolItems = [
  { to: '/calculadora-aluguel', label: 'Aluguel', icon: 'fa-calculator' },
  { to: '/calculadora-financiamento', label: 'Financiamento', icon: 'fa-piggy-bank' },
  { to: '/calculadora-construcao', label: 'Construção', icon: 'fa-hammer' },
  { to: '/comparador', label: 'Comparador', icon: 'fa-scale-balanced' }
]

function handleScroll() {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border-gray-200 dark:border-slate-700'
        : 'bg-white dark:bg-slate-900 border-transparent'
    ]"
  >
    <div class="container">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-2.5 group" aria-label="Página inicial">
          <div class="h-9 w-9 gradient-primary rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <i class="fa-solid fa-calculator text-white text-sm"></i>
          </div>
          <span class="hidden sm:block font-bold text-lg gradient-text">Aluguel Fácil</span>
        </router-link>

        <!-- Desktop Nav -->
        <nav class="hidden lg:flex items-center gap-1" aria-label="Navegação principal">
          <router-link
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-slate-800 dark:hover:text-primary-300 transition-all"
          >
            <i :class="['fa-solid', item.icon, 'text-xs']"></i>
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden lg:flex items-center gap-2">
          <button
            @click="themeStore.toggleTheme()"
            class="btn-ghost rounded-full w-10 h-10"
            :aria-label="themeStore.isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
            :data-tooltip="themeStore.isDark ? 'Modo claro' : 'Modo escuro'"
          >
            <i :class="['fa-solid', themeStore.isDark ? 'fa-sun text-amber-400' : 'fa-moon text-slate-600']"></i>
          </button>

          <router-link to="/#faq" class="btn-ghost rounded-full w-10 h-10" data-tooltip="Ajuda">
            <i class="fa-solid fa-circle-question text-gray-500 dark:text-gray-400"></i>
          </router-link>

          <router-link to="/calculadora-aluguel" class="btn-primary text-sm !py-2.5 !px-5">
            <i class="fa-solid fa-calculator"></i>
            Calcular Agora
          </router-link>
        </div>

        <!-- Mobile Actions -->
        <div class="flex lg:hidden items-center gap-2">
          <button
            @click="themeStore.toggleTheme()"
            class="btn-ghost rounded-full w-10 h-10"
            :aria-label="themeStore.isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
          >
            <i :class="['fa-solid', themeStore.isDark ? 'fa-sun text-amber-400' : 'fa-moon text-slate-600']"></i>
          </button>

          <button
            @click="isMenuOpen = !isMenuOpen"
            class="btn-ghost rounded-full w-10 h-10"
            :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
            aria-expanded="false"
          >
            <i :class="['fa-solid', isMenuOpen ? 'fa-xmark' : 'fa-bars']"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-[600px] opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-[600px] opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="isMenuOpen" class="lg:hidden overflow-hidden border-t border-gray-100 dark:border-slate-700">
          <nav class="py-4 space-y-1" aria-label="Menu mobile">
            <p class="text-xs text-gray-400 dark:text-gray-500 px-3 mb-2 uppercase tracking-wider">Navegação</p>
            <router-link
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
              @click="isMenuOpen = false"
            >
              <i :class="['fa-solid', item.icon, 'w-5 text-center']"></i>
              {{ item.label }}
            </router-link>

            <hr class="border-gray-100 dark:border-slate-700 my-3" />

            <p class="text-xs text-gray-400 dark:text-gray-500 px-3 mb-2 uppercase tracking-wider">Ferramentas</p>
            <router-link
              v-for="item in toolItems"
              :key="item.to"
              :to="item.to"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all"
              active-class="!bg-primary-100 !text-primary-700 dark:!bg-primary-900/30 dark:!text-primary-300"
              @click="isMenuOpen = false"
            >
              <i :class="['fa-solid', item.icon, 'w-5 text-center']"></i>
              {{ item.label }}
            </router-link>

            <div class="pt-4 px-3">
              <router-link to="/calculadora-aluguel" class="btn-primary w-full text-sm" @click="isMenuOpen = false">
                <i class="fa-solid fa-calculator"></i>
                Calcular Agora
              </router-link>
            </div>
          </nav>
        </div>
      </transition>
    </div>
  </header>
</template>

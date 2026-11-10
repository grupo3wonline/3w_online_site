<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTema } from '@/composables/useTema'

const { tema, alternarTema } = useTema()
const aberto = ref(false)
const route = useRoute()

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/#servicos', label: 'Serviços' },
  { to: '/#contato', label: 'Contato' },
]

function ehAtivo(destino: string): boolean {
  // Links de âncora (/#secao) são alvos de rolagem, não destacam item ativo.
  if (destino.includes('#')) return false
  if (destino === '/') return route.path === '/'
  return route.path.startsWith(destino)
}
</script>

<template>
  <header id="navbar-principal" class="sticky top-0 z-50 glass border-b border-white/20">
    <nav class="container-app flex items-center justify-between h-16" aria-label="Navegação principal">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2.5 group" aria-label="Página inicial">
        <div class="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-card group-hover:shadow-glow transition-all duration-300">
          <i class="fa-solid fa-calculator text-white text-sm"></i>
        </div>
        <span class="font-extrabold text-lg text-gray-900 dark:text-white hidden sm:block">
          Calc<span class="gradient-text">Tráfego</span>
        </span>
      </RouterLink>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
            ehAtivo(link.to)
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
              : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50 dark:text-gray-300 dark:hover:text-primary-400 dark:hover:bg-primary-900/30'
          ]"
        >
          {{ link.label }}
        </RouterLink>

        <!-- Dark mode toggle -->
        <button
          class="w-9 h-9 rounded-lg flex items-center justify-center text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors ml-2"
          :aria-label="tema === 'claro' ? 'Ativar modo escuro' : 'Ativar modo claro'"
          @click="alternarTema"
        >
          <i :class="tema === 'claro' ? 'fa-solid fa-moon' : 'fa-solid fa-sun text-yellow-400'"></i>
        </button>

        <RouterLink to="/ferramenta" class="btn-primary btn-sm ml-3">
          <i class="fa-solid fa-rocket"></i>
          Usar Grátis
        </RouterLink>
      </div>

      <!-- Mobile Toggle -->
      <button
        id="btn-menu-mobile"
        class="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        :aria-label="aberto ? 'Fechar menu' : 'Abrir menu'"
        :aria-expanded="aberto"
        @click="aberto = !aberto"
      >
        <i :class="['fa-solid text-lg text-gray-700 dark:text-gray-300', aberto ? 'fa-xmark' : 'fa-bars']"></i>
      </button>
    </nav>

    <!-- Mobile Menu -->
    <div
      :class="[
        'md:hidden overflow-hidden transition-all duration-300',
        aberto ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      ]"
    >
      <div class="container-app pb-4 space-y-1">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :class="[
            'block px-4 py-3 rounded-xl text-sm font-medium transition-all',
            ehAtivo(link.to)
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
              : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
          ]"
          @click="aberto = false"
        >
          {{ link.label }}
        </RouterLink>

        <!-- Dark mode toggle mobile -->
        <button
          class="w-full px-4 py-3 rounded-xl text-sm font-medium text-left text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
          :aria-label="tema === 'claro' ? 'Ativar modo escuro' : 'Ativar modo claro'"
          @click="alternarTema"
        >
          <i :class="tema === 'claro' ? 'fa-solid fa-moon' : 'fa-solid fa-sun text-yellow-400'"></i>
          {{ tema === 'claro' ? 'Modo Escuro' : 'Modo Claro' }}
        </button>

        <RouterLink
          to="/ferramenta"
          class="btn-primary w-full text-center mt-2"
          @click="aberto = false"
        >
          <i class="fa-solid fa-rocket"></i>
          Usar Calculadora Grátis
        </RouterLink>
      </div>
    </div>
  </header>
</template>

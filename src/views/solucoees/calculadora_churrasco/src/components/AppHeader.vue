<template>
  <header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 print-hidden">
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between">
        <router-link to="/" class="flex items-center gap-2 transition-transform hover:scale-105" aria-label="Inicio">
          <div class="h-10 w-10 rounded-full bg-gradient-to-br from-bbq-orange to-bbq-red flex items-center justify-center">
            <i class="fa-solid fa-fire-burner text-white text-lg"></i>
          </div>
          <div class="hidden sm:block">
            <span class="text-lg font-bold text-gradient">Calculadora</span>
            <span class="text-sm text-muted-foreground block -mt-1">de Churrasco</span>
          </div>
        </router-link>

        <nav class="hidden lg:flex items-center gap-1" aria-label="Navegacao principal">
          <router-link
v-for="link in navLinks" :key="link.path" :to="link.path"
            :class="['px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
              $route.path === link.path
                ? 'bg-gradient-to-r from-bbq-orange to-bbq-red text-white shadow-md'
                : 'text-foreground hover:bg-bbq-orange/10 hover:text-bbq-orange']">
            <i :class="link.icon + ' mr-2'"></i>{{ link.label }}
          </router-link>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-2 inline-flex items-center gap-2 rounded-lg border border-bbq-orange/40 px-4 py-2 text-sm font-medium text-bbq-orange transition-colors hover:bg-bbq-orange/10"
          >
            <i class="fa-solid fa-rocket"></i> 3W Online
          </a>
        </nav>

        <div class="flex items-center gap-2">
          <button class="p-2 rounded-lg hover:bg-muted transition-colors" :aria-label="theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'" :title="theme === 'dark' ? 'Modo Claro' : 'Modo Escuro'" @click="toggleTheme">
            <i :class="theme === 'dark' ? 'fa-solid fa-sun text-yellow-400' : 'fa-solid fa-moon text-muted-foreground'" class="text-lg"></i>
          </button>
          <button class="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors" :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
            <i :class="menuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-lg"></i>
          </button>
        </div>
      </div>

      <nav v-if="menuOpen" class="lg:hidden py-4 border-t border-border/40" aria-label="Menu movel">
        <div class="flex flex-col gap-2">
          <router-link
v-for="link in navLinks" :key="link.path" :to="link.path" :class="['w-full px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-3 transition-all',
              $route.path === link.path
                ? 'bg-gradient-to-r from-bbq-orange to-bbq-red text-white'
                : 'text-foreground hover:bg-muted']"
            @click="menuOpen = false">
            <i :class="link.icon"></i>{{ link.label }}
          </router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useTheme } from '@/composables/useTheme'

const { t } = useI18n()
const { theme, toggleTheme } = useTheme()
const menuOpen = ref(false)

const navLinks = computed(() => [
  { path: '/', label: t('nav.inicio'), icon: 'fa-solid fa-house' },
  { path: '/calculadora', label: t('nav.ferramenta'), icon: 'fa-solid fa-calculator' },
  { path: '/orcamento', label: t('nav.orcamento'), icon: 'fa-solid fa-receipt' },
])
</script>

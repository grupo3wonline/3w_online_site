<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import ThemeToggle from './ThemeToggle.vue'
import { COMPANY } from '@/lib/constants'

interface MenuItem {
  label: string
  to: string
  icon: string
}

const menuItems: MenuItem[] = [
  { label: 'Início', to: '/', icon: 'fa-house' },
  { label: 'Calculadora', to: '/calculadora', icon: 'fa-calculator' },
  { label: 'Contato', to: '/#contato', icon: 'fa-envelope' },
]

const isMenuOpen = ref(false)
const { y } = useWindowScroll()

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b transition-all duration-300"
    :class="
      y > 8
        ? 'glass border-gray-200/70 shadow-soft dark:border-gray-800/70'
        : 'border-transparent bg-white/40 dark:bg-gray-950/30'
    "
  >
    <div class="container-app">
      <div class="flex h-16 items-center justify-between gap-4">
        <!-- Logo -->
        <RouterLink to="/" class="group flex items-center gap-3" @click="closeMenu">
          <div class="relative">
            <div
              class="absolute inset-0 rounded-xl bg-brand-500/40 blur-md transition-all group-hover:bg-brand-500/60"
            ></div>
            <div
              class="relative flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-soft"
            >
              <i class="fas fa-calculator text-lg text-white"></i>
            </div>
          </div>
          <div class="leading-tight">
            <span class="gradient-text block font-display text-base font-bold sm:text-lg">
              Calculadora Freelancer
            </span>
            <span class="block text-[11px] font-medium text-gray-500 dark:text-gray-400">
              by {{ COMPANY.name }}
            </span>
          </div>
        </RouterLink>

        <!-- Menu desktop -->
        <nav class="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
          <RouterLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
            active-class="!bg-brand-100 !text-brand-700 dark:!bg-brand-900/40 dark:!text-brand-300"
          >
            <i class="fas text-xs opacity-80" :class="item.icon"></i>
            {{ item.label }}
          </RouterLink>

          <a
            :href="COMPANY.ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="ml-2 flex items-center gap-2 rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-glow"
          >
            <i class="fas fa-rocket"></i>
            Quero um site
          </a>

          <ThemeToggle class="ml-1" />
        </nav>

        <!-- Ações mobile -->
        <div class="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            :aria-expanded="isMenuOpen"
            aria-controls="mobile-menu"
            aria-label="Abrir menu de navegação"
            @click="isMenuOpen = !isMenuOpen"
          >
            <i class="fas text-xl" :class="isMenuOpen ? 'fa-xmark' : 'fa-bars'"></i>
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <nav
          v-if="isMenuOpen"
          id="mobile-menu"
          class="border-t border-gray-200 py-4 dark:border-gray-800 md:hidden"
          aria-label="Navegação mobile"
        >
          <RouterLink
            v-for="item in menuItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            active-class="!bg-brand-100 !text-brand-700 dark:!bg-brand-900/40 dark:!text-brand-300"
            @click="closeMenu"
          >
            <i class="fas w-5" :class="item.icon"></i>
            {{ item.label }}
          </RouterLink>
          <a
            :href="COMPANY.ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 flex items-center gap-3 rounded-xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white"
            @click="closeMenu"
          >
            <i class="fas fa-rocket w-5"></i>
            Quero um site personalizado
          </a>
        </nav>
      </Transition>
    </div>
  </header>
</template>

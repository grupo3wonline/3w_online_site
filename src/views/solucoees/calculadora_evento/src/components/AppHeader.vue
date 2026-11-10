<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useWindowScroll } from '@vueuse/core'
import { useThemeStore } from '@/stores/theme'

const route = useRoute()
const theme = useThemeStore()
const { t } = useI18n()

const isMenuOpen = ref(false)
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)

const navItems = computed(() => [
  { path: '/', label: t('nav.inicio'), icon: 'fa-solid fa-house' },
  { path: '/#calculadora', label: t('nav.calculadora'), icon: 'fa-solid fa-calculator' },
  { path: '/#sobre', label: t('nav.sobre'), icon: 'fa-solid fa-circle-info' },
  { path: '/#contato', label: t('nav.contato'), icon: 'fa-solid fa-envelope' },
])

watch(() => route.fullPath, () => { isMenuOpen.value = false })
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg border-b border-border' : 'bg-transparent'
    ]"
  >
    <nav class="container-max">
      <div class="flex items-center justify-between h-16 md:h-20">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group" aria-label="EventCalc - Página Inicial">
          <i class="fa-solid fa-calculator text-2xl text-primary transition-transform duration-300 group-hover:scale-110"></i>
          <span class="text-xl font-bold text-gradient">EventCalc</span>
        </router-link>

        <!-- Desktop Nav -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
          >
            <i :class="[item.icon, 'text-sm']"></i>
            {{ item.label }}
          </router-link>
        </div>

        <!-- Actions -->
        <div class="flex items-center space-x-2">
          <!-- Theme Toggle -->
          <button
            class="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            :aria-label="theme.isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
            :title="theme.isDark ? 'Modo Claro' : 'Modo Escuro'"
            @click="theme.toggle()"
          >
            <i :class="theme.isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon'" class="text-lg"></i>
          </button>

          <!-- CTA Desktop -->
          <router-link
            to="/#calculadora"
            class="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-gradient-hero text-white btn-glow transition-all hover:opacity-90"
          >
            <i class="fa-solid fa-calculator text-sm"></i>
            {{ t('nav.calcularAgora') }}
          </router-link>

          <!-- Mobile Toggle -->
          <button
            class="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            :aria-label="isMenuOpen ? 'Fechar menu' : 'Abrir menu'"
            :aria-expanded="isMenuOpen"
            @click="isMenuOpen = !isMenuOpen"
          >
            <i :class="isMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div
        :class="[
          'md:hidden overflow-hidden transition-all duration-300',
          isMenuOpen ? 'max-h-96 pb-4' : 'max-h-0'
        ]"
      >
        <div class="flex flex-col space-y-1 pt-2">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300"
          >
            <i :class="item.icon"></i>
            {{ item.label }}
          </router-link>
          <div class="pt-2">
            <router-link
              to="/#calculadora"
              class="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg font-medium bg-gradient-hero text-white"
            >
              <i class="fa-solid fa-calculator"></i>
              {{ t('nav.calcularAgora') }}
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

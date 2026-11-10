<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useScroll } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import ThemeToggle from './ThemeToggle.vue'
import { useAnchorNav } from '@/composables/useAnchorNav'

const { y } = useScroll(window)
const { goToAnchor } = useAnchorNav()
const isMobileOpen = ref(false)

// Links de navegação da landing (âncoras) — SEM "Ferramentas".
const navLinks = [
  { to: '/#inicio', label: 'Início', icon: 'fa6-solid:house' },
  { to: '/#beneficios', label: 'Benefícios', icon: 'fa6-solid:star' },
  { to: '/#como-funciona', label: 'Como Funciona', icon: 'fa6-solid:list-check' },
  { to: '/#servicos', label: 'Serviços', icon: 'fa6-solid:briefcase' },
  { to: '/#contato', label: 'Contato', icon: 'fa6-solid:envelope' },
]

function closeMobile() {
  isMobileOpen.value = false
}

function onAnchor(target: string) {
  closeMobile()
  goToAnchor(target)
}
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="y > 20 ? 'bg-background/85 shadow-lg backdrop-blur-lg' : 'bg-transparent'"
  >
    <div class="container flex items-center justify-between py-3">
      <!-- Logo -->
      <RouterLink to="/" class="group flex items-center gap-3" @click="closeMobile">
        <div
          class="rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 p-2.5 shadow-lg transition-transform duration-300 group-hover:scale-105"
        >
          <Icon icon="fa6-solid:calculator" class="h-6 w-6 text-white" />
        </div>
        <div class="hidden sm:block">
          <span class="block text-lg font-bold text-gradient leading-tight"
            >Calculadora de Preços</span
          >
          <span class="block text-xs text-muted-foreground">by Grupo 3w Online</span>
        </div>
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-1 lg:flex">
        <button
          v-for="link in navLinks"
          :key="link.to"
          type="button"
          class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
          @click="onAnchor(link.to)"
        >
          <Icon :icon="link.icon" class="h-4 w-4" />
          {{ link.label }}
        </button>
        <RouterLink
          to="/calculadora"
          class="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
          active-class="bg-accent text-primary"
        >
          <Icon icon="fa6-solid:calculator" class="h-4 w-4" />
          Calculadora
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />

        <RouterLink
          to="/calculadora"
          class="hidden items-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-button transition-all duration-300 hover:scale-[1.02] hover:from-violet-700 hover:to-purple-700 md:inline-flex"
        >
          <Icon icon="fa6-solid:calculator" class="h-4 w-4" />
          Calculadora
        </RouterLink>

        <!-- Mobile toggle -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-accent lg:hidden"
          :aria-expanded="isMobileOpen"
          aria-label="Abrir menu"
          @click="isMobileOpen = !isMobileOpen"
        >
          <Icon :icon="isMobileOpen ? 'fa6-solid:xmark' : 'fa6-solid:bars'" class="h-6 w-6" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition name="slide">
      <nav
        v-if="isMobileOpen"
        class="border-t border-border bg-background/95 px-4 py-3 backdrop-blur-lg lg:hidden"
      >
        <button
          v-for="link in navLinks"
          :key="link.to"
          type="button"
          class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-primary"
          @click="onAnchor(link.to)"
        >
          <Icon :icon="link.icon" class="h-5 w-5" />
          {{ link.label }}
        </button>
        <RouterLink
          to="/calculadora"
          class="mt-2 flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-3 font-semibold text-white shadow-lg"
          @click="closeMobile"
        >
          <Icon icon="fa6-solid:calculator" class="h-5 w-5" />
          Calculadora
        </RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

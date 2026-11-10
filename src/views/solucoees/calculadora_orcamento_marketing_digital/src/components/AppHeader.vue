<script setup lang="ts">
import { ref } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import ThemeToggle from './ThemeToggle.vue'

const { y } = useWindowScroll()
const isMenuOpen = ref(false)

/** Menu sem o item "Ferramentas" (removido conforme solicitado). */
const navLinks = [
  { to: '/', label: 'Início', icon: 'fa-home', exact: true },
  { to: '/#sobre', label: 'Sobre', icon: 'fa-info-circle' },
  { to: '/#servicos', label: 'Serviços', icon: 'fa-briefcase' },
  { to: '/#contato', label: 'Contato', icon: 'fa-envelope' },
]

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 z-50 transition-all duration-300"
    :class="
      y > 20
        ? 'border-b border-border/80 bg-background/80 shadow-soft backdrop-blur-xl'
        : 'border-b border-transparent bg-transparent'
    "
  >
    <div class="container mx-auto px-4">
      <nav class="flex h-16 items-center justify-between md:h-20">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="group flex items-center gap-3"
          aria-label="Ir para página inicial"
        >
          <div
            class="relative flex h-11 w-11 items-center justify-center rounded-2xl gradient-cta shadow-glow transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3"
          >
            <i class="fas fa-chart-line text-lg text-white" aria-hidden="true"></i>
            <span
              class="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-background text-[8px] font-bold text-primary ring-1 ring-primary/30"
              >R$</span
            >
          </div>
          <div class="hidden sm:block">
            <span class="block font-display text-lg font-bold leading-tight text-foreground"
              >Calculadora</span
            >
            <span class="-mt-0.5 block text-xs font-medium text-muted-foreground"
              >Marketing Digital</span
            >
          </div>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div
          class="hidden items-center gap-1 rounded-2xl border border-border/60 bg-card/40 px-2 py-1.5 backdrop-blur-sm lg:flex"
        >
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="nav-link flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
            active-class="text-primary active"
          >
            <i :class="['fas text-xs', link.icon]" aria-hidden="true"></i>
            {{ link.label }}
          </RouterLink>
        </div>

        <!-- Right Side Actions -->
        <div class="flex items-center gap-2.5">
          <ThemeToggle />

          <RouterLink to="/#calculadora" class="btn-primary hidden py-2.5 text-sm md:flex">
            <i class="fas fa-calculator" aria-hidden="true"></i>
            Calcular Agora
          </RouterLink>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-xl border border-border/60 bg-card/60 text-foreground transition-all hover:border-primary/40 hover:text-primary lg:hidden"
            aria-label="Abrir menu"
            :aria-expanded="isMenuOpen"
            @click="isMenuOpen = !isMenuOpen"
          >
            <i :class="['fas text-sm', isMenuOpen ? 'fa-xmark' : 'fa-bars']" aria-hidden="true"></i>
          </button>
        </div>
      </nav>

      <!-- Mobile Navigation -->
      <div
        class="overflow-hidden transition-all duration-300 ease-out lg:hidden"
        :class="isMenuOpen ? 'max-h-96 pb-4 opacity-100' : 'max-h-0 opacity-0'"
      >
        <div class="card-premium space-y-1.5 !p-3">
          <RouterLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground"
            active-class="bg-primary/10 text-primary"
            @click="closeMenu"
          >
            <i :class="['fas w-5 text-center', link.icon]" aria-hidden="true"></i>
            {{ link.label }}
          </RouterLink>
          <RouterLink
            to="/#calculadora"
            class="btn-primary mt-3 w-full justify-center"
            @click="closeMenu"
          >
            <i class="fas fa-calculator" aria-hidden="true"></i>
            Calcular Agora
          </RouterLink>
        </div>
      </div>
    </div>
  </header>
</template>

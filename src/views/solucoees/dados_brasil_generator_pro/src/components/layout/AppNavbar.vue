<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useScroll } from '@vueuse/core'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

const route = useRoute()
const isOpen = ref(false)
const { y } = useScroll(window)
const scrolled = computed(() => y.value > 10)

const links = [
  { name: 'Início', to: '/' },
  { name: 'Ferramentas', to: '/#ferramentas' },
  { name: 'Sobre', to: '/#sobre' },
  { name: 'Contato', to: '/#contato' },
]

function isActive(to: string) {
  if (to.includes('#')) return false
  return to === '/' ? route.path === '/' : route.path.startsWith(to)
}
</script>

<template>
  <header
    class="fixed top-0 z-50 w-full transition-all duration-300"
    :class="scrolled ? 'glass shadow-md' : 'bg-transparent'"
  >
    <nav class="container-app flex h-20 items-center justify-between" aria-label="Navegação principal">
      <!-- Logo -->
      <RouterLink to="/" class="group flex items-center gap-2.5" aria-label="Página inicial">
        <span
          class="grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:rotate-6"
        >
          <Icon icon="lucide:database-zap" class="h-6 w-6" />
        </span>
        <span class="flex flex-col leading-none">
          <span class="text-base font-extrabold">Gerador Brasil</span>
          <span class="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">Pro</span>
        </span>
      </RouterLink>

      <!-- Desktop -->
      <div class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          :class="isActive(link.to) ? 'text-primary' : 'text-foreground'"
        >
          {{ link.name }}
        </RouterLink>
        <ThemeToggle />
        <BaseButton :href="siteConfig.developer.site" size="sm" class="ml-2">
          Conheça a 3w Online
        </BaseButton>
      </div>

      <!-- Mobile toggles -->
      <div class="flex items-center gap-1 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :aria-expanded="isOpen"
          aria-label="Abrir menu"
          @click="isOpen = !isOpen"
        >
          <Icon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" class="h-6 w-6" />
        </button>
      </div>
    </nav>

    <!-- Mobile menu -->
    <transition name="slide">
      <div v-if="isOpen" class="glass border-t border-border md:hidden">
        <div class="container-app flex flex-col gap-1 py-4">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-4 py-3 text-base font-medium transition-colors"
            :class="isActive(link.to) ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-secondary'"
            @click="isOpen = false"
          >
            {{ link.name }}
          </RouterLink>
          <BaseButton :href="siteConfig.developer.site" block class="mt-2">
            Conheça a 3w Online
          </BaseButton>
        </div>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

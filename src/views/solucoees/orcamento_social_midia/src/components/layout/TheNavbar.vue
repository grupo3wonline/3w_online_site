<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'

const isOpen = ref(false)
const { y } = useWindowScroll()

const navItems = [
  { to: '/', label: 'Início', icon: 'fa6-solid:house' },
  { to: { path: '/', hash: '#sobre' }, label: 'Sobre', icon: 'fa6-solid:circle-info' },
  { to: { path: '/', hash: '#servicos' }, label: 'Serviços', icon: 'fa6-solid:briefcase' },
  {
    to: { path: '/', hash: '#ferramentas' },
    label: 'Ferramentas',
    icon: 'fa6-solid:screwdriver-wrench',
  },
  { to: '/calculadora', label: 'Calculadora', icon: 'fa6-solid:calculator' },
  { to: { path: '/', hash: '#contato' }, label: 'Contato', icon: 'fa6-solid:envelope' },
]

function close() {
  isOpen.value = false
}
</script>

<template>
  <nav
    class="sticky top-0 z-40 border-b transition-all duration-300"
    :class="
      y > 8
        ? 'border-purple-500/20 bg-purple-950/80 shadow-2xl backdrop-blur-xl supports-[backdrop-filter]:bg-purple-950/70'
        : 'border-transparent bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-900'
    "
    aria-label="Navegação principal"
  >
    <div class="container-app">
      <div class="flex h-16 items-center justify-between">
        <RouterLink to="/" class="group transition hover:opacity-90" @click="close">
          <BrandLogo :size="38" />
        </RouterLink>

        <!-- Menu desktop -->
        <div class="hidden items-center gap-1 lg:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="group relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-purple-200 transition hover:bg-white/10 hover:text-white"
            active-class="bg-white/10 text-white shadow"
          >
            <Icon :icon="item.icon" aria-hidden="true" />
            <span>{{ item.label }}</span>
          </RouterLink>
          <span class="mx-1 h-6 w-px bg-white/15" aria-hidden="true" />
          <ThemeToggle />
          <RouterLink
            to="/calculadora"
            class="ml-1 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-bold text-purple-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-purple-50"
          >
            <Icon icon="fa6-solid:bolt" aria-hidden="true" />
            Começar
          </RouterLink>
        </div>

        <!-- Ações mobile -->
        <div class="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            class="rounded-lg p-2 text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            :aria-expanded="isOpen"
            aria-controls="mobile-menu"
            :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu de navegação'"
            @click="isOpen = !isOpen"
          >
            <Icon
              :icon="isOpen ? 'fa6-solid:xmark' : 'fa6-solid:bars'"
              class="text-xl"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      <!-- Menu mobile -->
      <Transition name="slide">
        <div v-if="isOpen" id="mobile-menu" class="space-y-1 pb-4 lg:hidden">
          <RouterLink
            v-for="item in navItems"
            :key="item.label"
            :to="item.to"
            class="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-purple-200 transition hover:bg-white/10 hover:text-white"
            active-class="bg-white/10 text-white"
            @click="close"
          >
            <Icon :icon="item.icon" aria-hidden="true" />
            {{ item.label }}
          </RouterLink>
          <RouterLink
            to="/calculadora"
            class="mt-2 flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-3 text-sm font-bold text-purple-700"
            @click="close"
          >
            <Icon icon="fa6-solid:bolt" aria-hidden="true" />
            Começar agora grátis
          </RouterLink>
        </div>
      </Transition>
    </div>
  </nav>
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

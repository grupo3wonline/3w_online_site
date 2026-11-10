<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useWindowScroll } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import ThemeToggle from './ThemeToggle.vue'

const route = useRoute()
const isOpen = ref(false)
const { y } = useWindowScroll()

const links = [
  { name: 'Início', to: '/', match: '/' },
  { name: 'Ferramentas', to: '/ferramentas', match: '/ferramentas' },
  { name: 'Contato', to: '/#contato', match: '#contato' },
]

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  },
)

function isActive(match: string) {
  if (match === '#contato') return false
  if (match === '/') return route.path === '/'
  return route.path.startsWith(match)
}
</script>

<template>
  <nav
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="
      y > 20
        ? 'border-b border-white/40 bg-white/85 shadow-[0_8px_30px_-12px_rgba(124,58,237,0.25)] backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/85'
        : 'bg-transparent'
    "
    aria-label="Navegação principal"
  >
    <div class="container mx-auto px-4">
      <div class="flex h-16 items-center justify-between md:h-18">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="group flex items-center gap-3"
          aria-label="Ir para a página inicial"
        >
          <div
            class="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-indigo-600 shadow-lg shadow-violet-500/30 transition-transform group-hover:scale-105 group-hover:rotate-3"
          >
            <Icon
              icon="lucide:calculator"
              class="h-5 w-5 text-white"
            />
          </div>
          <div class="flex flex-col leading-tight">
            <span class="text-base font-extrabold tracking-tight text-gray-900 dark:text-white">
              Calculadora <span class="text-gradient">Social</span>
            </span>
            <span class="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              por Grupo 3W Online
            </span>
          </div>
        </RouterLink>

        <!-- Desktop -->
        <div class="hidden items-center gap-1 md:flex">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-4 py-2 text-sm font-semibold transition-all"
            :class="
              isActive(link.match)
                ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white'
            "
          >
            {{ link.name }}
          </RouterLink>

          <ThemeToggle class="ml-1" />

          <RouterLink
            to="/ferramentas"
            class="ml-2 inline-flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/40"
          >
            <Icon
              icon="lucide:sparkles"
              class="mr-1.5 h-4 w-4"
            />
            Calcular Grátis
          </RouterLink>
        </div>

        <!-- Mobile toggle -->
        <div class="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            class="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
            :aria-label="isOpen ? 'Fechar menu' : 'Abrir menu'"
            :aria-expanded="isOpen"
            @click="isOpen = !isOpen"
          >
            <Icon
              :icon="isOpen ? 'lucide:x' : 'lucide:menu'"
              class="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="slide-down">
      <div
        v-show="isOpen"
        class="border-t border-gray-100 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/95 md:hidden"
      >
        <div class="container mx-auto space-y-1 px-4 py-4">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="block rounded-lg px-4 py-3 text-sm font-semibold transition-all"
            :class="
              isActive(link.match)
                ? 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5'
            "
          >
            {{ link.name }}
          </RouterLink>
          <RouterLink
            to="/ferramentas"
            class="mt-2 block rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg"
          >
            <Icon
              icon="lucide:sparkles"
              class="mr-1.5 inline h-4 w-4"
            />
            Calcular Agora
          </RouterLink>
        </div>
      </div>
    </transition>
  </nav>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
  overflow: hidden;
  max-height: 400px;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

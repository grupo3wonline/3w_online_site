<script setup lang="ts">
import { ref, computed } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'
import ThemeToggle from '@/components/ui/ThemeToggle.vue'
import ToolSearch from '@/components/ui/ToolSearch.vue'
import { COMPANY } from '@/data/tools'

const mobileOpen = ref(false)
const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 20)

interface NavLink {
  label: string
  to?: string
  hash?: string
}

const links = computed<NavLink[]>(() => [
  { label: 'Início', to: '/' },
  { label: 'Benefícios', to: '/', hash: '#beneficios' },
  { label: 'Ferramentas', to: '/ferramentas' },
  { label: 'Sobre', to: '/', hash: '#sobre' },
  { label: 'Contato', to: '/', hash: '#contato' },
])

function resolve(link: NavLink): RouteLocationRaw {
  if (link.hash) return { path: link.to ?? '/', hash: link.hash }
  return link.to ?? '/'
}

function closeMenu() {
  mobileOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full transition-all"
    :class="
      scrolled
        ? 'border-b border-slate-200 bg-white/90 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-950/90'
        : 'bg-transparent'
    "
  >
    <div class="container-page flex h-16 items-center justify-between gap-4">
      <RouterLink
        to="/"
        class="flex items-center gap-2 font-extrabold"
        aria-label="DevStart Academy - página inicial"
        @click="closeMenu"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 text-white shadow-lg"
        >
          <Icon
            icon="lucide:code-xml"
            class="h-5 w-5"
          />
        </span>
        <span class="text-lg">
          <span class="text-brand-600 dark:text-brand-400">Dev</span><span class="text-slate-900 dark:text-white">Start</span>
        </span>
      </RouterLink>

      <!-- Desktop nav -->
      <nav
        class="hidden items-center gap-1 md:flex"
        aria-label="Navegação principal"
      >
        <RouterLink
          v-for="link in links"
          :key="link.label + (link.hash ?? '')"
          :to="resolve(link)"
          class="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-brand-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-brand-400"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <ToolSearch />
        <ThemeToggle />
        <a
          :href="COMPANY.whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary hidden h-10 px-4 text-sm sm:inline-flex"
        >
          <Icon
            icon="lucide:rocket"
            class="h-4 w-4"
          />
          Começar agora
        </a>
        <button
          type="button"
          class="btn-ghost h-10 w-10 rounded-full p-0 md:hidden"
          :aria-expanded="mobileOpen"
          aria-label="Abrir menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon
            :icon="mobileOpen ? 'lucide:x' : 'lucide:menu'"
            class="h-6 w-6"
          />
        </button>
      </div>
    </div>

    <!-- Mobile nav -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="mobileOpen"
        class="border-t border-slate-200 bg-white px-4 py-3 md:hidden dark:border-slate-800 dark:bg-slate-950"
        aria-label="Navegação mobile"
      >
        <RouterLink
          v-for="link in links"
          :key="link.label + (link.hash ?? '')"
          :to="resolve(link)"
          class="block rounded-lg px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
          @click="closeMenu"
        >
          {{ link.label }}
        </RouterLink>
        <a
          :href="COMPANY.whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary mt-2 w-full"
          @click="closeMenu"
        >
          <Icon
            icon="lucide:rocket"
            class="h-4 w-4"
          />
          Começar agora
        </a>
      </nav>
    </Transition>
  </header>
</template>

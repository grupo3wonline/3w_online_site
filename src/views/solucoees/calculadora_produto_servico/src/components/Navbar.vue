<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import ThemeToggle from './ThemeToggle.vue'

interface ItemMenu {
  label: string
  to: string
  hash?: string
}

// "Ferramentas" removido do menu conforme solicitado.
const menuItens: ItemMenu[] = [
  { label: 'Início', to: '/' },
  { label: 'Sobre', to: '/', hash: '#sobre' },
  { label: 'Serviços', to: '/', hash: '#servicos' },
  { label: 'Contato', to: '/contato' },
]

const aberto = ref(false)
const route = useRoute()

function ativo(item: ItemMenu): boolean {
  if (item.to === '/contato') return route.path === '/contato'
  if (item.hash) return false
  return route.path === '/'
}

function destinoCalculadora() {
  return { path: '/', hash: '#calculadora' }
}
</script>

<template>
  <header
    class="sticky top-0 z-50 backdrop-blur-xl border-b"
    style="background: var(--glass-bg); border-color: var(--glass-borda)"
  >
    <nav
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      aria-label="Navegação principal"
    >
      <div class="flex items-center justify-between h-16 md:h-[4.5rem]">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="flex items-center gap-2.5 group"
          aria-label="Página inicial"
        >
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          >
            <Icon
              icon="fa6-solid:calculator"
              class="text-white text-base"
            />
          </div>
          <div class="leading-none">
            <span class="text-lg font-bold font-display txt-forte block">
              Calc<span class="text-gradient">Preços</span>
            </span>
            <span
              class="text-[10px] txt-fraco font-medium tracking-wide hidden sm:block"
            >
              por Grupo 3w Online
            </span>
          </div>
        </RouterLink>

        <!-- Menu Desktop -->
        <div
          class="hidden md:flex items-center gap-1 p-1 rounded-2xl"
          style="background: var(--glass-bg); border: 1px solid var(--glass-borda)"
        >
          <RouterLink
            v-for="item in menuItens"
            :key="item.label"
            :to="item.hash ? { path: item.to, hash: item.hash } : item.to"
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 txt-suave hover:text-primary-500"
            :class="{ 'text-primary-500 bg-primary-500/10': ativo(item) }"
          >
            {{ item.label }}
          </RouterLink>
        </div>

        <!-- Ações Desktop -->
        <div class="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <RouterLink
            :to="destinoCalculadora()"
            class="btn-primary text-sm py-2 px-4"
          >
            <Icon icon="fa6-solid:calculator" />
            Usar Grátis
          </RouterLink>
        </div>

        <!-- Ações Mobile -->
        <div class="flex md:hidden items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            class="p-2 txt-suave hover:text-primary-500 transition-colors"
            :aria-label="aberto ? 'Fechar menu' : 'Abrir menu'"
            :aria-expanded="aberto"
            @click="aberto = !aberto"
          >
            <Icon
              :icon="aberto ? 'fa6-solid:xmark' : 'fa6-solid:bars'"
              class="text-xl"
            />
          </button>
        </div>
      </div>

      <!-- Menu Mobile -->
      <transition name="slide">
        <div
          v-if="aberto"
          class="md:hidden py-4 border-t"
          style="border-color: var(--glass-borda)"
        >
          <div class="flex flex-col gap-1">
            <RouterLink
              v-for="item in menuItens"
              :key="item.label"
              :to="item.hash ? { path: item.to, hash: item.hash } : item.to"
              class="px-4 py-3 rounded-lg text-sm font-medium transition-all txt-suave hover:text-primary-500 hover:bg-primary-500/10"
              :class="{ 'text-primary-500 bg-primary-500/10': ativo(item) }"
              @click="aberto = false"
            >
              {{ item.label }}
            </RouterLink>
            <div
              class="pt-3 mt-2 border-t"
              style="border-color: var(--glass-borda)"
            >
              <RouterLink
                :to="destinoCalculadora()"
                class="btn-primary text-sm py-3 w-full"
                @click="aberto = false"
              >
                <Icon icon="fa6-solid:calculator" />
                Usar Calculadora Grátis
              </RouterLink>
            </div>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

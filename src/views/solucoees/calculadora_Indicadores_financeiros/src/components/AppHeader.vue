<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const mobileOpen = ref(false)

// Menu sem "Ferramentas" (removido conforme solicitado).
const menu = [
  { name: 'Início', to: { name: 'home' } },
  { name: 'Calculadora', to: { name: 'calculator' } },
  { name: 'Contato', to: { name: 'home', hash: '#contato' } },
]

function showHelp() {
  Swal.fire({
    icon: 'question',
    title: 'Ajuda — Calculadora Financeira',
    html: `
      <div style="text-align:left;font-size:.9rem;line-height:1.7">
        <p>Preencha os dados do <strong>Balanço Patrimonial</strong> e da <strong>DRE</strong> da empresa.</p>
        <p style="margin-top:.5rem">Calculamos <strong>EBITDA, P/L, EV/EBITDA, ROE, ROA, Margem de Lucro, Dividend Yield, Liquidez Corrente e Liquidez Seca</strong>.</p>
        <p style="margin-top:.5rem">💡 Use o botão <strong>"Exemplo"</strong> para preencher com dados de demonstração.</p>
      </div>`,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#3366ff',
  })
}
</script>

<template>
  <header class="glass sticky top-0 z-40 transition-colors duration-300">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <RouterLink :to="{ name: 'home' }" class="group flex items-center gap-3">
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white shadow-glow transition-transform duration-300 group-hover:scale-105"
          >
            <Icon icon="mdi:chart-line-variant" class="text-xl" />
          </div>
          <div class="leading-tight">
            <h1 class="text-base font-extrabold text-ink-900 dark:text-white sm:text-lg">
              Calculadora
              <span
                class="bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
                >Financeira</span
              >
            </h1>
            <p class="hidden text-[0.7rem] font-medium text-ink-500 dark:text-ink-400 sm:block">
              Indicadores Financeiros Empresariais
            </p>
          </div>
        </RouterLink>

        <nav class="hidden items-center gap-1 md:flex" aria-label="Menu principal">
          <RouterLink
            v-for="item in menu"
            :key="item.name"
            :to="item.to"
            class="rounded-xl px-4 py-2 text-sm font-semibold text-ink-600 transition-all hover:bg-white/70 hover:text-primary-600 dark:text-ink-300 dark:hover:bg-white/5"
            active-class="!text-primary-600 dark:!text-primary-300"
          >
            {{ item.name }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-1.5">
          <RouterLink
            :to="{ name: 'calculator' }"
            class="hidden rounded-xl bg-brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-glow transition-transform hover:-translate-y-0.5 lg:inline-flex"
          >
            Calcular grátis
          </RouterLink>
          <button
            type="button"
            class="btn-ghost"
            title="Ajuda"
            aria-label="Ajuda"
            @click="showHelp"
          >
            <Icon icon="mdi:help-circle-outline" class="text-lg" />
          </button>
          <button
            type="button"
            class="btn-ghost"
            :title="theme === 'dark' ? 'Modo claro' : 'Modo escuro'"
            aria-label="Alternar tema"
            @click="themeStore.toggle"
          >
            <Icon
              :icon="theme === 'dark' ? 'mdi:weather-sunny' : 'mdi:weather-night'"
              class="text-lg"
            />
          </button>
          <button
            type="button"
            class="btn-ghost md:hidden"
            aria-label="Abrir menu"
            :aria-expanded="mobileOpen"
            @click="mobileOpen = !mobileOpen"
          >
            <Icon :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="text-lg" />
          </button>
        </div>
      </div>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="-translate-y-2 opacity-0"
        leave-active-class="transition duration-150 ease-in"
        leave-to-class="-translate-y-2 opacity-0"
      >
        <nav
          v-if="mobileOpen"
          class="flex flex-col gap-1 border-t border-ink-200/60 py-3 dark:border-ink-700/60 md:hidden"
          aria-label="Menu mobile"
        >
          <RouterLink
            v-for="item in menu"
            :key="item.name"
            :to="item.to"
            class="rounded-xl px-4 py-2.5 text-sm font-semibold text-ink-600 hover:bg-white/70 dark:text-ink-300 dark:hover:bg-white/5"
            active-class="!text-primary-600 dark:!text-primary-300"
            @click="mobileOpen = false"
          >
            {{ item.name }}
          </RouterLink>
          <RouterLink
            :to="{ name: 'calculator' }"
            class="mt-1 rounded-xl bg-brand-gradient px-4 py-2.5 text-center text-sm font-semibold text-white"
            @click="mobileOpen = false"
          >
            Calcular grátis
          </RouterLink>
        </nav>
      </transition>
    </div>
  </header>
</template>

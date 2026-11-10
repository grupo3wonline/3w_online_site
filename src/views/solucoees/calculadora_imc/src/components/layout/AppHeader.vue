<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
const mobileOpen = ref(false)

interface NavItem {
  to: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { to: '/', label: 'Início', icon: 'lucide:home' },
  { to: '/calculadora', label: 'Calculadora', icon: 'lucide:calculator' },
  { to: '/#contato', label: 'Contato', icon: 'lucide:mail' },
  { to: '/termos-de-uso', label: 'Termos de Uso', icon: 'lucide:file-text' },
  { to: '/politica-de-privacidade', label: 'Privacidade', icon: 'lucide:shield' },
]

function showHelp() {
  Swal.fire({
    title: 'Como usar a ferramenta',
    html: `
      <div style="text-align: left; font-size: 14px;">
        <p><strong>1. Acesse a calculadora:</strong> clique em "Calculadora" no menu.</p>
        <p><strong>2. Preencha seus dados:</strong> altura, peso, idade, sexo e nível de atividade.</p>
        <p><strong>3. Calcule suas metas:</strong> clique em "Calcular Metas".</p>
        <p><strong>4. Analise os resultados:</strong> IMC, calorias, hidratação e mais.</p>
        <p><strong>5. Salve em PDF:</strong> gere um relatório completo para consulta.</p>
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'Entendi!',
    confirmButtonColor: 'hsl(270, 100%, 60%)',
    background: isDark.value ? 'hsl(222, 47%, 8%)' : 'hsl(0, 0%, 100%)',
    color: isDark.value ? 'hsl(210, 40%, 98%)' : 'hsl(222, 84%, 5%)',
  })
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container flex h-16 items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2" title="Página inicial">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary"
        >
          <Icon icon="lucide:calculator" class="h-6 w-6 text-primary-foreground" />
        </span>
        <span class="hidden text-xl font-bold sm:inline-block">
          Calculadora<span class="text-primary"> IMC</span>
        </span>
      </RouterLink>

      <!-- Navegação desktop -->
      <nav class="hidden items-center gap-1 md:flex" aria-label="Menu principal">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          active-class="bg-gradient-primary !text-primary-foreground"
          exact-active-class="bg-gradient-primary !text-primary-foreground"
        >
          <Icon :icon="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Ações -->
      <div class="flex items-center gap-1">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          title="Ajuda - Como usar"
          aria-label="Ajuda"
          @click="showHelp"
        >
          <Icon icon="lucide:circle-help" class="h-5 w-5" />
        </button>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          :title="isDark ? 'Modo claro' : 'Modo escuro'"
          :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
          @click="theme.toggle()"
        >
          <Icon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-5 w-5" />
        </button>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
          :aria-expanded="mobileOpen"
          aria-label="Abrir menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :icon="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <transition name="slide">
      <nav
        v-if="mobileOpen"
        class="border-t border-border bg-background md:hidden"
        aria-label="Menu mobile"
      >
        <div class="container flex flex-col gap-1 py-3">
          <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="inline-flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            active-class="bg-gradient-primary !text-primary-foreground"
            exact-active-class="bg-gradient-primary !text-primary-foreground"
            @click="mobileOpen = false"
          >
            <Icon :icon="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </RouterLink>
        </div>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

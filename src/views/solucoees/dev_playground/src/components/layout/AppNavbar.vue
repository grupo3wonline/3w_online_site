<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { company } from '@/config/site'

const isOpen = ref(false)

// Links de navegação. Como a Home é uma landing única, os itens de conteúdo
// apontam para âncoras das dobras; o editor e o contato têm destino próprio.
const links = [
  { label: 'Início', to: '/', hash: '' },
  { label: 'Benefícios', to: '/', hash: '#beneficios' },
  { label: 'Recursos', to: '/', hash: '#recursos' },
  { label: 'Serviços', to: '/', hash: '#servicos' },
  { label: 'Contato', to: '/', hash: '#contato' },
]

function close() {
  isOpen.value = false
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container-page flex h-16 items-center justify-between">
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-2" @click="close">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand">
          <Icon icon="lucide:code-2" class="h-6 w-6 text-white" />
        </span>
        <span class="text-xl font-bold gradient-text">DevPlayground</span>
      </RouterLink>

      <!-- Navegação desktop -->
      <nav class="hidden items-center gap-1 md:flex" aria-label="Navegação principal">
        <RouterLink
          v-for="link in links"
          :key="link.label"
          :to="{ path: link.to, hash: link.hash || undefined }"
          class="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Ações desktop -->
      <div class="hidden items-center gap-2 md:flex">
        <ThemeToggle />
        <RouterLink to="/playground">
          <BaseButton size="sm">
            <Icon icon="lucide:play" class="h-4 w-4" />
            Abrir Editor
          </BaseButton>
        </RouterLink>
      </div>

      <!-- Mobile -->
      <div class="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border"
          :aria-expanded="isOpen"
          aria-label="Abrir menu"
          @click="isOpen = !isOpen"
        >
          <Icon :icon="isOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition name="slide">
      <nav
        v-if="isOpen"
        class="border-t bg-background md:hidden"
        aria-label="Navegação mobile"
      >
        <div class="container-page space-y-1 py-4">
          <RouterLink
            v-for="link in links"
            :key="link.label"
            :to="{ path: link.to, hash: link.hash || undefined }"
            class="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            @click="close"
          >
            {{ link.label }}
          </RouterLink>
          <RouterLink to="/playground" class="block pt-2" @click="close">
            <BaseButton block>
              <Icon icon="lucide:play" class="h-4 w-4" />
              Abrir Editor
            </BaseButton>
          </RouterLink>
          <a :href="company.whatsapp.link" target="_blank" rel="noopener noreferrer" class="block pt-1">
            <BaseButton block variant="outline">
              <Icon icon="lucide:message-circle" class="h-4 w-4" />
              Falar no WhatsApp
            </BaseButton>
          </a>
        </div>
      </nav>
    </Transition>
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

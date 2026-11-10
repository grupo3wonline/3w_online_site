<script setup lang="ts">
import { ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useScrollLock } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import ThemeToggle from '@/components/common/ThemeToggle.vue'
import ToolSearch from '@/components/common/ToolSearch.vue'
import { NAV_LINKS, COMPANY } from '@/config/site'

const route = useRoute()
const mobileOpen = ref(false)
const isLocked = useScrollLock(document.body)

watch(mobileOpen, (v) => {
  isLocked.value = v
})

// Fecha o menu ao trocar de rota
watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  }
)
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b glass">
    <div class="container-app flex h-16 items-center justify-between gap-4">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="flex items-center gap-2 text-lg font-bold tracking-tight transition-colors hover:text-primary"
        aria-label="Dev Toolkit Suite Essentials — página inicial"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 text-white shadow-md"
        >
          <Icon icon="lucide:wrench" class="h-5 w-5" />
        </span>
        <span class="hidden sm:inline">Dev Toolkit</span>
      </RouterLink>

      <!-- Nav desktop -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
        <RouterLink
          v-for="link in NAV_LINKS"
          :key="link.to"
          :to="link.to"
          class="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
          active-class="text-primary"
        >
          {{ link.label }}
        </RouterLink>
      </nav>

      <!-- Ações -->
      <div class="flex items-center gap-2">
        <ToolSearch />
        <ThemeToggle />
        <a :href="COMPANY.whatsappLink" target="_blank" rel="noopener noreferrer" class="hidden sm:block">
          <Button variant="brand" size="sm">
            <Icon icon="lucide:message-circle" class="h-4 w-4" />
            <span class="hidden md:inline">Fale Conosco</span>
          </Button>
        </a>

        <!-- Toggle mobile -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-input lg:hidden"
          :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :icon="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Nav mobile -->
    <Transition name="slide-down">
      <nav
        v-if="mobileOpen"
        class="border-t bg-background lg:hidden"
        aria-label="Navegação mobile"
      >
        <div class="container-app flex flex-col gap-1 py-4">
          <RouterLink
            v-for="link in NAV_LINKS"
            :key="link.to"
            :to="link.to"
            class="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            active-class="text-primary"
          >
            {{ link.label }}
          </RouterLink>
          <a :href="COMPANY.whatsappLink" target="_blank" rel="noopener noreferrer" class="mt-2">
            <Button variant="brand" class="w-full">
              <Icon icon="lucide:message-circle" class="h-4 w-4" />
              Fale Conosco no WhatsApp
            </Button>
          </a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

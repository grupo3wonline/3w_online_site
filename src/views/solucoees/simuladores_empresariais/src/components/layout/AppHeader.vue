<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useWindowScroll } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import Button from '@/components/ui/Button.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import { useThemeStore } from '@/stores/theme'
import { menuPrincipal } from '@/composables/useNavegacao'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
const { y } = useWindowScroll()
const route = useRoute()
const menuAberto = ref(false)

const links = menuPrincipal

/** Indica se o item de menu corresponde à rota atual (destaque de ativo). */
function estaAtivo(to: string): boolean {
  const base = to.split('#')[0] || '/'
  if (base === '/') return route.path === '/'
  return route.path === base || route.path.startsWith(base + '/')
}
</script>

<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="
      y > 10
        ? 'border-b border-border bg-background/95 shadow-md backdrop-blur-md'
        : 'bg-gradient-hero text-primary-foreground'
    "
  >
    <div class="container">
      <div class="flex h-16 items-center justify-between md:h-20">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="group flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label="Página inicial"
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand shadow-md transition-transform group-hover:scale-105"
          >
            <Icon icon="lucide:calculator" class="h-6 w-6 text-white" />
          </div>
          <div class="hidden sm:block">
            <p
              class="text-lg font-bold leading-tight md:text-xl"
              :class="y > 10 ? 'text-foreground' : 'text-white'"
            >
              SimuladorPro
            </p>
            <p class="text-xs" :class="y > 10 ? 'text-muted-foreground' : 'text-white/70'">
              Ferramentas Empresariais
            </p>
          </div>
        </RouterLink>

        <!-- Nav desktop -->
        <nav class="hidden items-center gap-1 lg:flex">
          <RouterLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="flex items-center gap-2 rounded-lg px-4 py-2 font-medium transition-all duration-200"
            :class="[
              estaAtivo(link.to)
                ? y > 10
                  ? 'bg-primary/10 text-primary'
                  : 'bg-white/20 text-white'
                : y > 10
                  ? 'text-foreground hover:bg-muted'
                  : 'text-white/90 hover:bg-white/10',
            ]"
            :aria-current="estaAtivo(link.to) ? 'page' : undefined"
          >
            <Icon :icon="link.icon" class="h-4 w-4" />
            {{ link.label }}
          </RouterLink>
        </nav>

        <!-- Ações -->
        <div class="flex items-center gap-2">
          <Tooltip text="Precisa de ajuda? Fale conosco">
            <RouterLink to="/#contato">
              <Button
                variant="ghost"
                size="icon"
                :class="y > 10 ? 'text-foreground' : 'text-white hover:bg-white/10'"
                aria-label="Ajuda"
              >
                <Icon icon="lucide:life-buoy" class="h-5 w-5" />
              </Button>
            </RouterLink>
          </Tooltip>

          <Tooltip :text="isDark ? 'Modo claro' : 'Modo escuro'">
            <Button
              variant="ghost"
              size="icon"
              :class="y > 10 ? 'text-foreground' : 'text-white hover:bg-white/10'"
              :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
              @click="theme.alternar()"
            >
              <Icon :icon="isDark ? 'lucide:sun' : 'lucide:moon'" class="h-5 w-5" />
            </Button>
          </Tooltip>

          <RouterLink to="/#ferramentas" class="hidden md:block">
            <Button
              :variant="y > 10 ? 'brand' : 'default'"
              :class="y > 10 ? '' : 'bg-white text-primary hover:bg-white/90'"
            >
              <Icon icon="lucide:play" class="h-4 w-4" />
              Começar Agora
            </Button>
          </RouterLink>

          <Button
            variant="ghost"
            size="icon"
            class="lg:hidden"
            :class="y > 10 ? 'text-foreground' : 'text-white hover:bg-white/10'"
            aria-label="Abrir menu"
            @click="menuAberto = true"
          >
            <Icon icon="lucide:menu" class="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition name="drawer">
      <div v-if="menuAberto" class="fixed inset-0 z-[60] lg:hidden">
        <div class="absolute inset-0 bg-black/50" @click="menuAberto = false" />
        <div
          class="absolute right-0 top-0 flex h-full w-[300px] flex-col bg-card p-6 text-foreground shadow-xl"
        >
          <div class="mb-8 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand"
              >
                <Icon icon="lucide:calculator" class="h-5 w-5 text-white" />
              </div>
              <span class="text-lg font-bold">SimuladorPro</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Fechar menu"
              @click="menuAberto = false"
            >
              <Icon icon="lucide:x" class="h-5 w-5" />
            </Button>
          </div>
          <nav class="flex flex-col gap-2">
            <RouterLink
              v-for="link in links"
              :key="link.to"
              :to="link.to"
              class="flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-colors"
              :class="estaAtivo(link.to) ? 'bg-primary/10 text-primary' : 'hover:bg-muted'"
              :aria-current="estaAtivo(link.to) ? 'page' : undefined"
              @click="menuAberto = false"
            >
              <Icon :icon="link.icon" class="h-5 w-5" />
              {{ link.label }}
            </RouterLink>
          </nav>
          <div class="mt-auto border-t border-border pt-6">
            <RouterLink to="/#ferramentas" @click="menuAberto = false">
              <Button variant="brand" class="w-full">
                <Icon icon="lucide:play" class="h-4 w-4" />
                Começar Agora
              </Button>
            </RouterLink>
            <div
              class="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-muted-foreground"
            >
              <RouterLink
                to="/termos-de-uso"
                class="hover:text-primary"
                @click="menuAberto = false"
              >
                Termos de Uso
              </RouterLink>
              <RouterLink
                to="/politica-de-privacidade"
                class="hover:text-primary"
                @click="menuAberto = false"
              >
                Privacidade
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s ease;
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
}
</style>

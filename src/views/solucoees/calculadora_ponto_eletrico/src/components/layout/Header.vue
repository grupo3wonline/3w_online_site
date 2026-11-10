<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'
import { Icon } from '@/components/ui'
import ThemeToggle from './ThemeToggle.vue'
import { ROUTES, ANCHORS } from '@/utils/constants'

const route = useRoute()
const { t } = useI18n()
const mobileMenuOpen = ref(false)

interface NavItem {
  path: string
  label: string
  icon: string
}

// Menu: seções da landing (âncoras). "Ferramentas" não entra no cabeçalho.
const navigationItems = computed<NavItem[]>(() => [
  { path: ROUTES.HOME, label: t('nav.home'), icon: 'lucide:home' },
  { path: ANCHORS.CALCULATOR, label: t('nav.calculator'), icon: 'lucide:calculator' },
  { path: ANCHORS.ABOUT, label: t('nav.about'), icon: 'lucide:info' },
  { path: ANCHORS.SERVICES, label: t('nav.services'), icon: 'lucide:code-2' },
  { path: ANCHORS.CONTACT, label: t('nav.contact'), icon: 'lucide:mail' },
])

const isActiveRoute = (path: string): boolean => path === '/' && route.path === '/'

const showHelp = (): void => {
  void Swal.fire({
    title: t('nav.help'),
    html: `
      <div style="text-align:left">
        <p style="margin-bottom:.75rem"><strong>Como usar a calculadora?</strong><br>
        1. Selecione o tipo de ambiente<br>
        2. Informe as dimensões (largura, comprimento e pé-direito)<br>
        3. Clique em calcular e veja os resultados</p>
        <p style="margin-bottom:.75rem"><strong>Baseado na NBR 5410.</strong> Os cálculos seguem as normas técnicas brasileiras para instalações de baixa tensão.</p>
        <p><strong>100% seguro:</strong> tudo é processado localmente no seu navegador.</p>
      </div>`,
    icon: 'info',
    confirmButtonText: t('actions.understood'),
    confirmButtonColor: '#2563eb',
  })
}

const handleMobileHelp = (): void => {
  mobileMenuOpen.value = false
  showHelp()
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
  >
    <nav class="container mx-auto px-4 py-3 sm:px-6 sm:py-4">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="group flex items-center gap-2 sm:gap-3">
          <span
            class="icon-badge h-9 w-9 transition-transform group-hover:scale-105 group-hover:shadow-glow-sm sm:h-10 sm:w-10"
          >
            <Icon icon="lucide:zap" class="h-5 w-5 sm:h-6 sm:w-6" />
          </span>
          <span class="flex flex-col">
            <span class="text-base font-bold text-foreground sm:text-lg">
              {{ t('app.shortName') }}
            </span>
            <span class="hidden text-xs text-muted-foreground sm:block">
              {{ t('app.tagline') }}
            </span>
          </span>
        </RouterLink>

        <!-- Desktop nav -->
        <div class="hidden items-center gap-1 lg:flex">
          <RouterLink
            v-for="item in navigationItems"
            :key="item.path"
            :to="item.path"
            class="relative rounded-lg px-4 py-2 font-medium transition-colors"
            :class="
              isActiveRoute(item.path)
                ? 'bg-accent text-primary'
                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
            "
          >
            <Icon :icon="item.icon" class="mr-2 inline h-4 w-4 align-[-2px]" />
            {{ item.label }}
          </RouterLink>

          <ThemeToggle class="ml-2" />

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-primary transition-colors hover:bg-accent"
            :title="t('nav.help')"
            :aria-label="t('nav.help')"
            @click="showHelp"
          >
            <Icon icon="lucide:circle-help" class="h-5 w-5" />
          </button>
        </div>

        <!-- Mobile actions -->
        <div class="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
            :aria-label="t('nav.menu')"
            :aria-expanded="mobileMenuOpen"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <Icon :icon="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="h-6 w-6" />
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
        <div v-show="mobileMenuOpen" class="mt-3 border-t border-border pt-3 lg:hidden">
          <div class="flex flex-col gap-1">
            <RouterLink
              v-for="item in navigationItems"
              :key="item.path"
              :to="item.path"
              class="flex items-center rounded-lg px-4 py-3 font-medium transition-colors"
              :class="
                isActiveRoute(item.path)
                  ? 'bg-accent text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              "
              @click="mobileMenuOpen = false"
            >
              <Icon :icon="item.icon" class="mr-3 h-5 w-5" />
              {{ item.label }}
            </RouterLink>
            <button
              type="button"
              class="flex items-center rounded-lg px-4 py-3 text-left font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              @click="handleMobileHelp"
            >
              <Icon icon="lucide:circle-help" class="mr-3 h-5 w-5" />
              {{ t('nav.help') }}
            </button>
          </div>
        </div>
      </Transition>
    </nav>
  </header>
</template>

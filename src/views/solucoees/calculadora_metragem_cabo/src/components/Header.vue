<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useWindowScroll, useEventListener } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import ThemeToggle from './ThemeToggle.vue'
import { SITE } from '@/config/site'

const { t } = useI18n()
const { y } = useWindowScroll()
const isScrolled = computed(() => y.value > 20)

const mobileOpen = ref(false)
function toggleMobile(): void {
  mobileOpen.value = !mobileOpen.value
}
function closeMobile(): void {
  mobileOpen.value = false
}

useEventListener(window, 'close-mobile-menu', closeMobile)

interface NavItem {
  label: string
  to: string
}

const navItems = computed<NavItem[]>(() => [
  { label: t('nav.home'), to: '/' },
  { label: t('nav.calculator'), to: '/calculadora' },
  { label: t('nav.benefits'), to: '/#beneficios' },
  { label: t('nav.howItWorks'), to: '/#como-funciona' },
  { label: t('nav.faq'), to: '/#faq' },
  { label: t('nav.contact'), to: '/#contato' },
])
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="isScrolled ? 'glass-strong shadow-soft' : 'glass'"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Logo -->
      <RouterLink to="/" class="group flex items-center gap-2.5" @click="closeMobile">
        <span
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-600/30 transition-transform group-hover:scale-105"
        >
          <Icon icon="ph:lightning-fill" class="h-6 w-6" aria-hidden="true" />
        </span>
        <span class="flex flex-col leading-none">
          <span class="font-display text-lg font-bold text-gray-900 dark:text-white">{{
            SITE.name
          }}</span>
          <span
            class="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400"
          >
            Metragem de Cabos
          </span>
        </span>
      </RouterLink>

      <!-- Nav desktop -->
      <nav aria-label="Menu principal" class="hidden items-center gap-0.5 lg:flex">
        <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          class="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <!-- Ações -->
      <div class="flex items-center gap-2">
        <ThemeToggle />
        <RouterLink to="/calculadora" class="btn-primary hidden !px-5 !py-2.5 md:inline-flex">
          <Icon icon="ph:calculator-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('common.calculateNow') }}
        </RouterLink>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 lg:hidden"
          :aria-label="mobileOpen ? t('common.closeMenu') : t('common.openMenu')"
          :aria-expanded="mobileOpen"
          @click="toggleMobile"
        >
          <Icon
            :icon="mobileOpen ? 'ph:x-bold' : 'ph:list-bold'"
            class="h-6 w-6"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition name="mobile-menu">
      <nav
        v-if="mobileOpen"
        aria-label="Menu mobile"
        class="glass-strong border-t border-gray-200/60 px-4 py-4 dark:border-gray-700/60 lg:hidden"
      >
        <ul class="space-y-1">
          <li v-for="item in navItems" :key="item.to">
            <RouterLink
              :to="item.to"
              class="block rounded-lg px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-primary-50 hover:text-primary-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-primary-400"
              @click="closeMobile"
            >
              {{ item.label }}
            </RouterLink>
          </li>
          <li class="pt-2">
            <RouterLink to="/calculadora" class="btn-primary w-full" @click="closeMobile">
              <Icon icon="ph:calculator-bold" class="h-4 w-4" aria-hidden="true" />
              {{ t('common.calculateNow') }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

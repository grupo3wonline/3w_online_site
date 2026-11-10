<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { storeToRefs } from 'pinia'

const theme = useThemeStore()
const { isDark } = storeToRefs(theme)
</script>

<template>
  <button
    type="button"
    class="group relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
    :title="isDark ? 'Tema claro' : 'Tema escuro'"
    @click="theme.toggle()"
  >
    <Transition
      mode="out-in"
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 rotate-90 scale-50"
      leave-active-class="transition duration-150"
      leave-to-class="opacity-0 -rotate-90 scale-50"
    >
      <i v-if="isDark" key="sun" class="fas fa-sun text-lg text-amber-400"></i>
      <i v-else key="moon" class="fas fa-moon text-lg text-brand-600"></i>
    </Transition>
  </button>
</template>

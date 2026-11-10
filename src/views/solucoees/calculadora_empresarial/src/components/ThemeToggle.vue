<template>
  <button
    class="relative rounded-xl p-2 text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
    :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
    :title="isDark ? 'Modo claro' : 'Modo escuro'"
    @click="toggleDark()"
  >
    <i v-if="isDark" class="fa-solid fa-sun text-lg text-yellow-400" aria-hidden="true"></i>
    <i v-else class="fa-solid fa-moon text-lg" aria-hidden="true"></i>
  </button>
</template>

<script setup>
import { useDark, useToggle } from '@vueuse/core'

// useDark sincroniza com localStorage (chave "theme") e a classe .dark no <html>,
// respeitando a preferência do sistema quando não há valor salvo.
const isDark = useDark({
  storageKey: 'theme',
  valueDark: 'dark',
  valueLight: 'light'
})
const toggleDark = useToggle(isDark)
</script>

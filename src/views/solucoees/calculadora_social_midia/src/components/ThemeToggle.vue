<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const isDark = computed(() => theme.value === 'dark')
const label = computed(() => (isDark.value ? 'Ativar tema claro' : 'Ativar tema escuro'))
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
    :aria-label="label"
    :title="label"
    @click="themeStore.toggle()"
  >
    <Icon
      v-if="isDark"
      icon="lucide:sun"
      class="h-5 w-5"
    />
    <Icon
      v-else
      icon="lucide:moon"
      class="h-5 w-5"
    />
  </button>
</template>

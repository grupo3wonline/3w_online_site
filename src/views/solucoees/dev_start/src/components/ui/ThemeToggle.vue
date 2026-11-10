<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useThemeStore } from '@/stores/theme'

const theme = useThemeStore()
const { mode } = storeToRefs(theme)
</script>

<template>
  <button
    type="button"
    class="btn-ghost h-10 w-10 rounded-full p-0"
    :title="mode === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
    :aria-label="mode === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'"
    @click="theme.toggle()"
  >
    <Icon
      v-if="mode === 'dark'"
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

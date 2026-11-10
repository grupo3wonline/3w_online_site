<script setup lang="ts">
import { Icon } from '@iconify/vue'
import HelpTip from './HelpTip.vue'

defineProps<{
  icon: string
  title: string
  description: string
  help?: string
}>()
</script>

<template>
  <div class="container-app py-8 md:py-12">
    <div class="mx-auto max-w-6xl">
      <!-- Cabeçalho da ferramenta -->
      <header class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 text-white shadow-lg"
        >
          <Icon :icon="icon" class="h-7 w-7" />
        </div>
        <div class="flex items-center justify-center gap-2">
          <h1 class="text-2xl font-bold md:text-3xl">{{ title }}</h1>
          <HelpTip v-if="help" :text="help" />
        </div>
        <p class="mx-auto mt-3 max-w-2xl text-muted-foreground">{{ description }}</p>
      </header>

      <slot />
    </div>
  </div>
</template>

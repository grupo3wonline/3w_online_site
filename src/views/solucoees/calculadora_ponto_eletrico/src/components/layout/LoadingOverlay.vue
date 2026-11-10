<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'
import { Icon } from '@/components/ui'

const ui = useUiStore()
const { isLoading, loadingMessage } = storeToRefs(ui)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-200"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-black/50 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      :aria-label="loadingMessage || 'Processando'"
    >
      <Icon
        icon="lucide:loader-circle"
        class="h-12 w-12 animate-spin text-white"
        label="Carregando"
      />
      <p v-if="loadingMessage" class="text-sm font-medium text-white">
        {{ loadingMessage }}
      </p>
    </div>
  </Transition>
</template>

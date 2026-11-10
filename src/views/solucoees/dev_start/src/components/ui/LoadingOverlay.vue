<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { loading, loadingMessage } = storeToRefs(ui)
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="loading"
      class="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div
        class="flex flex-col items-center gap-4 rounded-2xl bg-white/95 px-8 py-6 shadow-2xl dark:bg-slate-800/95"
      >
        <Icon
          icon="lucide:loader-circle"
          class="h-10 w-10 animate-spin text-brand-600"
        />
        <p class="text-sm font-semibold text-slate-700 dark:text-slate-200">
          {{ loadingMessage }}
        </p>
      </div>
    </div>
  </Transition>
</template>

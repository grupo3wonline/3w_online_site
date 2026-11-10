<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loading'

const loading = useLoadingStore()
const { isLoading, message } = storeToRefs(loading)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-active-class="transition-opacity duration-300"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="glass fixed inset-0 z-[100] flex flex-col items-center justify-center"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div class="relative h-16 w-16">
        <div
          class="absolute inset-0 animate-spin rounded-full border-4 border-brand-200/40 border-t-brand-600"
        ></div>
        <div
          class="absolute inset-2 flex items-center justify-center rounded-full bg-brand-gradient text-white shadow-glow"
        >
          <i class="fas fa-calculator text-sm"></i>
        </div>
      </div>
      <p class="mt-4 font-medium text-gray-700 dark:text-gray-200">{{ message }}</p>
      <span class="sr-only">Carregando conteúdo, aguarde.</span>
    </div>
  </Transition>
</template>

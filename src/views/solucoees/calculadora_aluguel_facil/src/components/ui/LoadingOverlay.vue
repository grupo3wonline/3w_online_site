<script setup lang="ts">
import { useLoadingStore } from '@/stores/loading'

const loadingStore = useLoadingStore()
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="loadingStore.isLoading" class="loading-overlay">
      <div class="flex flex-col items-center gap-4">
        <div class="loading-spinner"></div>
        <p class="text-white text-sm font-medium">Processando...</p>
      </div>
    </div>
  </transition>
</template>

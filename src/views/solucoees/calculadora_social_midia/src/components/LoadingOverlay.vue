<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useLoadingStore } from '@/stores/loading'

const loading = useLoadingStore()
const { isLoading, message } = storeToRefs(loading)
</script>

<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm"
      role="alert"
      aria-busy="true"
      aria-live="assertive"
    >
      <div
        class="h-14 w-14 animate-spin rounded-full border-4 border-white/30 border-t-white"
        aria-hidden="true"
      />
      <p class="mt-4 text-sm font-medium text-white">
        {{ message }}
      </p>
    </div>
  </transition>
</template>

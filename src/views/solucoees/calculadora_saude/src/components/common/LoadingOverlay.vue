<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Icon } from '@iconify/vue';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const { isLoading, loadingMessage } = storeToRefs(ui);
</script>

<template>
  <Transition name="overlay-fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/60 backdrop-blur-sm"
      role="alert"
      aria-live="assertive"
      aria-busy="true"
    >
      <div
        class="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-8 shadow-2xl dark:bg-gray-800"
      >
        <Icon
          icon="svg-spinners:ring-resize"
          class="text-5xl text-brand-500"
          aria-hidden="true"
        />
        <p class="font-medium text-gray-700 dark:text-gray-200">
          {{ loadingMessage }}
        </p>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.25s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
</style>

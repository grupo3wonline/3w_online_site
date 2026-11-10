<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLoadingStore } from "@/stores/loading";
import { Icon } from "@iconify/vue";

// Overlay global com fundo ofuscado durante processamento.
const loading = useLoadingStore();
const { isLoading, message } = storeToRefs(loading);
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    leave-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      :aria-label="message"
    >
      <Icon icon="lucide:loader-circle" class="h-12 w-12 animate-spin text-primary" />
      <p class="text-sm font-medium text-foreground">{{ message }}</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import { useUiStore } from "@/stores/ui";

const ui = useUiStore();
const { isLoading, loadingMessage } = storeToRefs(ui);
</script>

<template>
  <transition name="fade">
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background/70 backdrop-blur-sm"
      role="status"
      aria-live="polite"
    >
      <Icon
        icon="lucide:loader-2"
        class="h-12 w-12 animate-spin text-primary"
      />
      <p class="text-sm font-medium text-foreground">
        {{ loadingMessage }}
      </p>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

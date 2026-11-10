<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { onClickOutside } from '@vueuse/core';

defineProps<{ content: string }>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

onClickOutside(root, () => (open.value = false));
</script>

<template>
  <span
    ref="root"
    class="relative inline-block align-middle"
  >
    <button
      type="button"
      class="text-gray-400 transition-colors hover:text-brand-500 dark:hover:text-brand-400"
      :aria-expanded="open"
      aria-label="Ajuda"
      @mouseenter="open = true"
      @mouseleave="open = false"
      @focus="open = true"
      @blur="open = false"
      @click="open = !open"
    >
      <Icon
        icon="fa6-solid:circle-question"
        aria-hidden="true"
      />
    </button>

    <Transition name="tip">
      <span
        v-if="open"
        role="tooltip"
        class="absolute left-6 top-0 z-20 w-64 rounded-lg border border-brand-500/30 bg-gray-800 p-3 text-sm text-white shadow-lg dark:bg-gray-700"
      >
        <span
          class="absolute -left-2 top-2 h-0 w-0 border-b-4 border-r-4 border-t-4 border-transparent border-r-gray-800 dark:border-r-gray-700"
        />
        {{ content }}
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.tip-enter-active,
.tip-leave-active {
  transition: opacity 0.15s ease;
}
.tip-enter-from,
.tip-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ text: string }>()

const open = ref(false)
</script>

<template>
  <span class="relative inline-flex">
    <button
      type="button"
      class="flex h-5 w-5 items-center justify-center rounded-full text-gray-400 transition-colors hover:text-brand-600 focus-visible:ring-2 focus-visible:ring-brand-500"
      :aria-label="`Ajuda: ${text}`"
      @mouseenter="open = true"
      @mouseleave="open = false"
      @focus="open = true"
      @blur="open = false"
      @click.prevent="open = !open"
    >
      <i class="fas fa-circle-question text-xs"></i>
    </button>
    <Transition
      enter-active-class="transition duration-150"
      enter-from-class="opacity-0 translate-y-1"
      leave-active-class="transition duration-100"
      leave-to-class="opacity-0"
    >
      <span
        v-if="open"
        role="tooltip"
        class="absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-xl bg-gray-900 px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-xl dark:bg-gray-700"
      >
        {{ text }}
        <span
          class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"
        ></span>
      </span>
    </Transition>
  </span>
</template>

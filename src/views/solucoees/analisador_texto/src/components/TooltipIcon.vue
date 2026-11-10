<template>
  <span class="relative inline-flex items-center group cursor-help ml-1" :aria-label="text" role="img">
    <i
      class="fa-solid fa-circle-question text-slate-400 dark:text-slate-500 text-xs hover:text-primary-500 transition-colors"
      aria-hidden="true"
    ></i>
    <span
      class="tooltip-custom invisible group-hover:visible group-focus-within:visible opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-200 -top-10 left-1/2 -translate-x-1/2"
      role="tooltip"
    >
      {{ text }}
      <span
        class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800 dark:border-t-slate-600"
      ></span>
    </span>
  </span>
</template>

<script setup lang="ts">
defineProps<{ text: string }>()
</script>

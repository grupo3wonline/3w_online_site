<script setup lang="ts">
withDefaults(defineProps<{ hover?: boolean; padded?: boolean }>(), {
  hover: false,
  padded: true,
})
</script>

<template>
  <div
    class="rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300"
    :class="[hover && 'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10', padded && 'p-6']"
  >
    <slot />
  </div>
</template>

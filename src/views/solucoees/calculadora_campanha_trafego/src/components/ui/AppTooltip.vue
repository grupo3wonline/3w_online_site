<script setup lang="ts">
defineProps<{
  texto: string
}>()
</script>

<template>
  <span class="tooltip-custom" :data-tooltip="texto" role="tooltip">
    <slot />
  </span>
</template>

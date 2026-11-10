<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ text: string }>()

const chars = computed(() => props.text.length)
const words = computed(() => (props.text.trim() ? props.text.trim().split(/\s+/).length : 0))
const lines = computed(() => (props.text ? props.text.split(/\r\n|\r|\n/).length : 0))
</script>

<template>
  <p class="text-xs text-muted-foreground tabular-nums">
    {{ chars }} caracteres · {{ words }} palavras · {{ lines }} linhas
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { resolveIcon } from '@/lib/icons'

const props = defineProps<{
  /** Nome do ícone (ex.: "lucide:zap" ou alias mapeado em lib/icons). */
  icon: string
  /** Rótulo acessível; quando ausente, o ícone é decorativo (aria-hidden). */
  label?: string
}>()

const resolved = computed(() => resolveIcon(props.icon))
</script>

<template>
  <FontAwesomeIcon
    :icon="resolved"
    :aria-hidden="label ? undefined : true"
    :aria-label="label"
    :role="label ? 'img' : undefined"
  />
</template>

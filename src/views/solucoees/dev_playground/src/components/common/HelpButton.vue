<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseTooltip from '@/components/ui/BaseTooltip.vue'
import { alerts } from '@/lib/alerts'

const props = withDefaults(
  defineProps<{ title: string; content: string; label?: string }>(),
  { label: 'Ajuda' },
)

function openHelp() {
  alerts.help(props.title, props.content)
}
</script>

<template>
  <BaseTooltip :text="label">
    <button
      type="button"
      class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-white"
      :aria-label="`${label}: ${title}`"
      @click="openHelp"
    >
      <Icon icon="lucide:circle-help" class="h-4 w-4" />
    </button>
  </BaseTooltip>
</template>

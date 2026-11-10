<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(defineProps<{ variant?: 'tip' | 'info' | 'warning'; title?: string }>(), {
  variant: 'info',
})

const config = computed(() => {
  const map = {
    tip: { icon: 'lucide:lightbulb', cls: 'border-primary/30 bg-primary/5 text-foreground', iconCls: 'text-primary' },
    info: { icon: 'lucide:info', cls: 'border-blue-500/30 bg-blue-500/5 text-foreground', iconCls: 'text-blue-500' },
    warning: {
      icon: 'lucide:triangle-alert',
      cls: 'border-amber-500/30 bg-amber-500/5 text-foreground',
      iconCls: 'text-amber-500',
    },
  }
  return map[props.variant]
})
</script>

<template>
  <div class="flex gap-3 rounded-xl border p-4 text-sm" :class="config.cls">
    <Icon :icon="config.icon" class="mt-0.5 h-5 w-5 shrink-0" :class="config.iconCls" />
    <div class="space-y-1">
      <p v-if="title" class="font-semibold">{{ title }}</p>
      <div class="text-muted-foreground"><slot /></div>
    </div>
  </div>
</template>

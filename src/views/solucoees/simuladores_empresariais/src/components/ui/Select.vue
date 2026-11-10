<script setup lang="ts">
import { cn } from '@/lib/utils'
import { Icon } from '@iconify/vue'

export interface OpcaoSelect {
  value: string
  label: string
  desc?: string
}

defineProps<{ options: OpcaoSelect[]; placeholder?: string; class?: string; id?: string }>()
const model = defineModel<string>()
</script>

<template>
  <div class="relative">
    <select
      :id="id"
      v-model="model"
      autocomplete="off"
      :class="
        cn(
          'flex h-11 w-full appearance-none rounded-lg border border-input bg-background px-3 py-2 pr-9 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          $props.class
        )
      "
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">
        {{ opt.label }}{{ opt.desc ? ` — ${opt.desc}` : '' }}
      </option>
    </select>
    <Icon
      icon="lucide:chevron-down"
      class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
    />
  </div>
</template>

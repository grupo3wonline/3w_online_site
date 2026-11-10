<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  modelValue?: string | number
  class?: string
  autocomplete?: string
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, { passive: true })
</script>

<template>
  <input
    v-model="modelValue"
    :autocomplete="autocomplete ?? 'off'"
    :class="
      cn(
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
        props.class
      )
    "
  />
</template>

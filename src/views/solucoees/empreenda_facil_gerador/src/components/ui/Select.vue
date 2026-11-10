<script setup lang="ts">
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

defineProps<{
  modelValue?: string;
  options: SelectOption[];
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  class?: string;
}>();

defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <select
    :id="id"
    :value="modelValue"
    :disabled="disabled"
    autocomplete="off"
    :class="
      cn(
        'flex h-11 w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm shadow-sm transition-colors hover:border-primary/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-50',
        $props.class
      )
    "
    @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
  >
    <option value="" disabled :selected="!modelValue">{{ placeholder ?? "Selecione" }}</option>
    <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
  </select>
</template>

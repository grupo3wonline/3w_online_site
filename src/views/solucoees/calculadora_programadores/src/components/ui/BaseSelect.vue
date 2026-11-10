<script setup lang="ts">
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

defineProps<{
  id?: string;
  modelValue: string;
  options: Option[];
  placeholder?: string;
  ariaLabel?: string;
  class?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string] }>();

function onChange(e: Event) {
  emit("update:modelValue", (e.target as HTMLSelectElement).value);
}
</script>

<template>
  <select
    :id="id"
    :value="modelValue"
    :aria-label="ariaLabel"
    :class="
      cn(
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        $props.class
      )
    "
    @change="onChange"
  >
    <option
      v-if="placeholder"
      value=""
      disabled
    >
      {{ placeholder }}
    </option>
    <option
      v-for="opt in options"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>

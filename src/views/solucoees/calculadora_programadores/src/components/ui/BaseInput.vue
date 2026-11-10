<script setup lang="ts">
import { cn } from "@/lib/utils";

defineProps<{
  id?: string;
  modelValue: string | number;
  type?: string;
  placeholder?: string;
  min?: string | number;
  step?: string | number;
  ariaLabel?: string;
  invalid?: boolean;
  class?: string;
}>();

const emit = defineEmits<{ "update:modelValue": [value: string | number] }>();

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  emit("update:modelValue", target.type === "number" ? target.valueAsNumber || 0 : target.value);
}
</script>

<template>
  <input
    :id="id"
    :type="type ?? 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    :min="min"
    :step="step"
    :aria-label="ariaLabel"
    :aria-invalid="invalid || undefined"
    autocomplete="off"
    :class="
      cn(
        'flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        invalid && 'border-destructive focus-visible:ring-destructive',
        $props.class
      )
    "
    @input="onInput"
  >
</template>

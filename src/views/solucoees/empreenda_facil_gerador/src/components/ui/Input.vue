<script setup lang="ts">
import { cn } from "@/lib/utils";

defineProps<{
  modelValue?: string | number;
  type?: string;
  placeholder?: string;
  id?: string;
  readonly?: boolean;
  disabled?: boolean;
  min?: string | number;
  step?: string | number;
  autocomplete?: string;
  class?: string;
  ariaInvalid?: boolean;
}>();

defineEmits<{ "update:modelValue": [value: string] }>();
</script>

<template>
  <input
    :id="id"
    :type="type ?? 'text'"
    :value="modelValue"
    :placeholder="placeholder"
    :readonly="readonly"
    :disabled="disabled"
    :min="min"
    :step="step"
    :autocomplete="autocomplete ?? 'off'"
    :aria-invalid="ariaInvalid"
    :class="
      cn(
        'flex h-11 w-full rounded-lg border border-input bg-background px-3.5 py-2 text-sm shadow-sm transition-colors placeholder:text-muted-foreground hover:border-primary/30 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/25 disabled:cursor-not-allowed disabled:opacity-50 read-only:bg-muted read-only:text-muted-foreground aria-[invalid=true]:border-destructive',
        $props.class
      )
    "
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

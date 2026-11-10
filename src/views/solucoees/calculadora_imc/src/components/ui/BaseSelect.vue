<script setup lang="ts">
interface Option {
  value: string | number
  label: string
}

defineProps<{
  id: string
  label: string
  modelValue: string | number
  options: readonly Option[]
  placeholder?: string
  hint?: string
  error?: string
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="text-sm font-medium">{{ label }}</label>
    <select
      :id="id"
      :value="modelValue"
      autocomplete="off"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :class="error ? 'border-destructive' : 'border-input'"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled>{{ placeholder ?? 'Selecione' }}</option>
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <p v-if="error" :id="`${id}-error`" class="text-xs text-destructive">{{ error }}</p>
  </div>
</template>

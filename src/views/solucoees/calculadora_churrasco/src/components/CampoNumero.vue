<template>
  <div class="space-y-2">
    <label :for="id" class="flex items-center gap-2 text-sm font-medium">
      <i :class="icone"></i> {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      type="number"
      inputmode="numeric"
      min="0"
      :placeholder="placeholder"
      autocomplete="off"
      :aria-invalid="!!erro"
      :aria-describedby="`${id}-dica`"
      class="w-full rounded-lg border bg-background px-4 py-3 text-lg outline-none transition-all focus:border-transparent focus:ring-2 focus:ring-bbq-orange"
      :class="erro ? 'border-destructive' : 'border-input'"
      @input="onInput"
    />
    <p v-if="erro" class="flex items-center gap-1 text-xs text-destructive">
      <i class="fa-solid fa-circle-exclamation"></i> {{ erro }}
    </p>
    <span v-else :id="`${id}-dica`" class="text-xs text-muted-foreground">{{ dica }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: string
  label: string
  icone: string
  dica: string
  modelValue: number | undefined
  erro?: string
  placeholder?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [value: number | undefined] }>()

function onInput(e: Event) {
  const raw = (e.target as HTMLInputElement).value
  emit('update:modelValue', raw === '' ? undefined : Number(raw))
}
</script>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { vMaska } from 'maska/vue'
import type { MaskOptions } from 'maska'
import BaseTooltip from './BaseTooltip.vue'

const props = defineProps<{
  id: string
  label: string
  modelValue: string | number
  type?: string
  step?: string
  placeholder?: string
  hint?: string
  error?: string
  inputmode?: 'text' | 'numeric' | 'decimal'
  /** Opções de máscara Maska (ex.: número com casas decimais). */
  mask?: MaskOptions
}>()

defineEmits<{ 'update:modelValue': [value: string] }>()

// Com máscara, usamos type=text (Maska não opera de forma confiável em type=number).
const inputType = props.mask ? 'text' : (props.type ?? 'text')
</script>

<template>
  <div class="space-y-2">
    <label :for="id" class="flex items-center gap-2 text-sm font-medium">
      {{ label }}
      <BaseTooltip v-if="hint" :text="hint">
        <Icon
          icon="lucide:info"
          class="h-4 w-4 cursor-help text-muted-foreground"
          tabindex="0"
          :aria-label="hint"
        />
      </BaseTooltip>
    </label>
    <input
      :id="id"
      v-maska="mask"
      :type="inputType"
      :step="step"
      :inputmode="inputmode"
      :placeholder="placeholder"
      :value="modelValue"
      autocomplete="off"
      :aria-invalid="!!error"
      :aria-describedby="error ? `${id}-error` : undefined"
      class="w-full rounded-md border bg-background px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      :class="error ? 'border-destructive' : 'border-input'"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" :id="`${id}-error`" class="text-xs text-destructive">{{ error }}</p>
  </div>
</template>

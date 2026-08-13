<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div class="relative">
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <i :class="['fas', icon, 'text-gray-400']"></i>
      </div>

      <input
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :class="inputClasses"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />

      <div
        v-if="clearable && modelValue"
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        <button
          type="button"
          @click="clear"
          class="text-gray-400 hover:text-gray-600 focus:outline-none"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>

    <p v-if="error" class="mt-1 text-sm text-red-600 flex items-center">
      <i class="fas fa-exclamation-circle mr-1"></i>
      {{ error }}
    </p>

    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  modelValue?: string | number
  type?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  error?: string
  hint?: string
  icon?: string
  clearable?: boolean
  min?: string | number
  max?: string | number
  step?: string | number
}>(), {
  modelValue: '',
  type: 'text',
  label: '',
  placeholder: '',
  disabled: false,
  required: false,
  error: '',
  hint: '',
  icon: '',
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const inputClasses = computed(() => {
  const classes = [
    'w-full',
    'rounded-lg',
    'border',
    'border-gray-300',
    'px-4',
    'py-2.5',
    'text-gray-900',
    'placeholder:text-gray-400',
    'focus:ring-2',
    'focus:ring-primary-500',
    'focus:border-transparent',
    'transition-all',
    'duration-200',
  ]

  if (props.icon) classes.push('pl-10')
  if (props.clearable && props.modelValue) classes.push('pr-10')
  if (props.error) classes.push('border-red-500', 'focus:ring-red-500')
  if (props.disabled) classes.push('bg-gray-100', 'cursor-not-allowed', 'opacity-60')

  return classes.join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
  emit('input', event)
}

const clear = () => {
  emit('update:modelValue', '')
}
</script>

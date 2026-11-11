<template>
  <div class="w-full">
    <!-- Label + Tooltip ───────────────────────────────────────────── -->
    <div v-if="label" class="flex items-center gap-1.5 mb-1.5">
      <label :for="inputId" class="input-aurora-label !mb-0">
        {{ label }}
        <span v-if="required" class="text-red-500 ml-0.5">*</span>
      </label>
      <!-- Tooltip de ajuda -->
      <button
        v-if="tooltip"
        type="button"
        class="tooltip-trigger"
        :title="tooltip"
        @click.prevent="showTooltipSwal"
        tabindex="-1"
      >
        <i class="fas fa-question text-[9px]"></i>
      </button>
    </div>

    <!-- Input Wrapper ─────────────────────────────────────────────── -->
    <div class="relative group">
      <!-- Ícone à esquerda -->
      <div
        v-if="icon"
        class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10"
      >
        <i :class="['fas', icon, 'text-sm', error ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary-500']"></i>
      </div>

      <input
        v-if="type !== 'textarea'"
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :readonly="readonly"
        autocomplete="off"
        :class="inputClasses"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
        @keyup.enter="$emit('enter', $event)"
      />

      <textarea
        v-else
        :id="inputId"
        :value="String(modelValue)"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :rows="rows"
        :readonly="readonly"
        autocomplete="off"
        :class="[inputClasses, 'resize-y']"
        @input="handleInput"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      ></textarea>

      <!-- Botão de limpar -->
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        class="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-slate-200 transition-colors z-10"
        @click="clear"
        tabindex="-1"
        aria-label="Limpar campo"
      >
        <i class="fas fa-times-circle text-sm"></i>
      </button>

      <!-- Slot de ação personalizada à direita -->
      <div
        v-else-if="$slots.suffix"
        class="absolute inset-y-0 right-0 flex items-center pr-2 z-10"
      >
        <slot name="suffix"></slot>
      </div>
    </div>

    <!-- Mensagens abaixo ──────────────────────────────────────────── -->
    <p v-if="error" class="input-aurora-error">
      <i class="fas fa-exclamation-circle"></i>
      {{ error }}
    </p>
    <p v-else-if="hint" class="input-aurora-hint">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Swal from 'sweetalert2'

const props = withDefaults(defineProps<{
  modelValue?:   string | number
  type?:         string
  label?:        string
  placeholder?:  string
  disabled?:     boolean
  readonly?:     boolean
  required?:     boolean
  error?:        string
  hint?:         string
  icon?:         string
  clearable?:    boolean
  tooltip?:      string   // exibe em SweetAlert2 ao clicar no ?
  min?:          string | number
  max?:          string | number
  step?:         string | number
  rows?:         number
}>(), {
  modelValue:  '',
  type:        'text',
  label:       '',
  placeholder: '',
  disabled:    false,
  readonly:    false,
  required:    false,
  error:       '',
  hint:        '',
  icon:        '',
  clearable:   false,
  tooltip:     '',
  rows:        4,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur:  [event: FocusEvent]
  focus: [event: FocusEvent]
  input: [event: Event]
  enter: [event: KeyboardEvent]
}>()

// ID único para acessibilidade
const inputId = computed(() => `input-${Math.random().toString(36).slice(2, 9)}`)

// ─── Classes do input ──────────────────────────────────────────────
const inputClasses = computed(() => {
  const base = [
    'input-aurora',
    'w-full',
  ]
  if (props.icon)                        base.push('pl-10')
  if (props.clearable && props.modelValue) base.push('pr-10')
  if (props.error)                       base.push('!border-red-400 dark:!border-red-500 !ring-red-400/40')
  if (props.disabled)                    base.push('opacity-50 cursor-not-allowed bg-gray-50 dark:bg-slate-800')
  if (props.readonly)                    base.push('bg-gray-50 dark:bg-slate-800 cursor-default')
  return base.join(' ')
})

// ─── Handlers ─────────────────────────────────────────────────────
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  const val    = props.type === 'number' ? (target.value === '' ? '' : Number(target.value)) : target.value
  emit('update:modelValue', val)
  emit('input', event)
}

const clear = () => emit('update:modelValue', '')

// ─── Tooltip via SweetAlert2 ───────────────────────────────────────
const showTooltipSwal = () => {
  if (!props.tooltip) return
  Swal.fire({
    icon:              'info',
    title:             props.label || 'Ajuda',
    text:              props.tooltip,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#2563eb',
    customClass: { popup: 'swal-aurora' },
  })
}
</script>

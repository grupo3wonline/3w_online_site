<template>
  <div :class="cardClasses" @click="handleClick">
    <!-- Header ───────────────────────────────────────────────────── -->
    <div
      v-if="$slots.header || title"
      :class="['px-5 sm:px-6 py-4 border-b', darkHeader
        ? 'border-white/10 bg-transparent'
        : 'border-gray-100 dark:border-slate-700/60']"
    >
      <slot name="header">
        <div class="flex items-center justify-between gap-3">
          <div class="flex items-center gap-3 min-w-0">
            <div
              v-if="icon"
              :class="['w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-sm', iconBg || 'bg-primary-50 dark:bg-primary-900/30']"
            >
              <i :class="['fas', icon, 'text-sm', iconColor || 'text-primary-600 dark:text-primary-400']"></i>
            </div>
            <div class="min-w-0">
              <h3
                :class="['font-bold truncate', titleSize === 'lg' ? 'text-lg' : 'text-base',
                         darkHeader ? 'text-white' : 'text-gray-900 dark:text-white']"
              >
                {{ title }}
              </h3>
              <p v-if="subtitle" class="text-xs text-gray-500 dark:text-slate-400 truncate mt-0.5">
                {{ subtitle }}
              </p>
            </div>
          </div>
          <slot name="headerActions"></slot>
        </div>
      </slot>
    </div>

    <!-- Body ─────────────────────────────────────────────────────── -->
    <div :class="['flex-1', noPadding ? '' : 'p-5 sm:p-6']">
      <slot></slot>
    </div>

    <!-- Footer ───────────────────────────────────────────────────── -->
    <div
      v-if="$slots.footer"
      class="border-t border-gray-100 dark:border-slate-700/60 px-5 sm:px-6 py-3.5 bg-gray-50/50 dark:bg-slate-800/50 rounded-b-2xl"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  title?:      string
  subtitle?:   string
  icon?:       string
  iconBg?:     string
  iconColor?:  string
  titleSize?:  'base' | 'lg'
  hoverable?:  boolean
  clickable?:  boolean
  noPadding?:  boolean
  variant?:    'default' | 'glass' | 'outlined' | 'flat' | 'dark'
  darkHeader?: boolean
}>(), {
  variant:    'default',
  titleSize:  'base',
  darkHeader: false,
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const handleClick = (event: MouseEvent) => {
  if (props.clickable) emit('click', event)
}

const cardClasses = computed(() => {
  const base = [
    'rounded-2xl overflow-hidden flex flex-col',
    'transition-all duration-200',
  ]

  const variantStyles: Record<string, string> = {
    default:  'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/60 shadow-sm',
    glass:    'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/50 dark:border-slate-700/40 shadow-glass',
    outlined: 'bg-white dark:bg-slate-800 border-2 border-primary-100 dark:border-primary-900/40',
    flat:     'bg-gray-50/80 dark:bg-slate-800/80 border border-gray-200/60 dark:border-slate-700/40',
    dark:     'bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044] border border-white/10 shadow-glass',
  }

  base.push(variantStyles[props.variant] || variantStyles.default)

  if (props.hoverable || props.clickable) {
    base.push('hover:-translate-y-0.5 hover:shadow-tool-hover')
  }
  if (props.clickable) base.push('cursor-pointer')

  return base.join(' ')
})
</script>

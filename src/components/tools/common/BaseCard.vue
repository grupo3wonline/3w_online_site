<template>
  <div :class="cardClasses">
    <div
      v-if="$slots.header || title"
      class="border-b border-gray-200 px-6 py-4"
    >
      <slot name="header">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 flex items-center">
            <i v-if="icon" :class="['fas', icon, 'mr-3 text-primary-600']"></i>
            {{ title }}
          </h3>
          <slot name="headerActions"></slot>
        </div>
      </slot>
    </div>

    <div :class="['px-6', noPadding ? 'p-0' : 'py-4']">
      <slot></slot>
    </div>

    <div
      v-if="$slots.footer"
      class="border-t border-gray-200 px-6 py-4 bg-gray-50"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title?: string
  icon?: string
  hoverable?: boolean
  clickable?: boolean
  noPadding?: boolean
}>()

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const cardClasses = computed(() => {
  const classes = ['bg-white', 'rounded-xl', 'shadow-md', 'border', 'border-gray-100', 'overflow-hidden']

  if (props.hoverable) {
    classes.push('hover:scale-[1.02]', 'transition-transform', 'duration-200')
  }

  if (props.clickable) {
    classes.push('cursor-pointer')
  }

  return classes.join(' ')
})

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit('click', event)
  }
}
</script>

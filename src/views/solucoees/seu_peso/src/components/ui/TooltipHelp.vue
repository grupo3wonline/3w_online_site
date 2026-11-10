<template>
  <div class="relative inline-block">
    <!-- Trigger element (ícone ou botão) -->
    <button
      type="button"
      @mouseenter="showTooltip"
      @mouseleave="hideTooltip"
      @focus="showTooltip"
      @blur="hideTooltip"
      class="inline-flex items-center justify-center w-5 h-5 rounded-full text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      :aria-label="text"
    >
      <i class="fas fa-question-circle text-sm"></i>
    </button>

    <!-- Tooltip -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isVisible"
        :class="tooltipClasses"
        class="absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-lg shadow-lg max-w-xs"
        role="tooltip"
      >
        {{ text }}
        <div class="tooltip-arrow" :class="arrowClasses"></div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  }
})

const isVisible = ref(false)

const showTooltip = () => {
  isVisible.value = true
}

const hideTooltip = () => {
  isVisible.value = false
}

const tooltipClasses = computed(() => {
  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }
  return positions[props.position] || positions.top
})

const arrowClasses = computed(() => {
  const arrows = {
    top: 'tooltip-arrow-bottom',
    bottom: 'tooltip-arrow-top',
    left: 'tooltip-arrow-right',
    right: 'tooltip-arrow-left'
  }
  return arrows[props.position] || arrows.top
})
</script>

<style scoped>
.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background: inherit;
  transform: rotate(45deg);
}

.tooltip-arrow-bottom {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
}

.tooltip-arrow-top {
  top: -4px;
  left: 50%;
  margin-left: -4px;
}

.tooltip-arrow-left {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

.tooltip-arrow-right {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}
</style>

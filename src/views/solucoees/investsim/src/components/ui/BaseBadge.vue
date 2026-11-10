<template>
  <div
    :class="badgeClasses"
    class="inline-flex items-center justify-center font-medium rounded-full transition-all duration-200"
  >
    <!-- Icon (left) -->
    <span v-if="$slots.icon" class="mr-1">
      <slot name="icon"></slot>
    </span>

    <!-- Content -->
    <slot>{{ label }}</slot>

    <!-- Close button -->
    <button
      v-if="closable"
      type="button"
      @click="handleClose"
      class="ml-1 hover:opacity-70 focus:outline-none"
    >
      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "success", "warning", "danger", "info"].includes(
        value
      ),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  label: {
    type: String,
    default: "",
  },
  closable: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close"]);

const badgeClasses = computed(() => {
  const classes = [];

  // Variant styles
  const variantStyles = {
    primary:
      "bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200",
    secondary: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    success:
      "bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    danger: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  };
  classes.push(variantStyles[props.variant]);

  // Size styles
  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };
  classes.push(sizeStyles[props.size]);

  return classes.join(" ");
});

const handleClose = () => {
  emit("close");
};
</script>

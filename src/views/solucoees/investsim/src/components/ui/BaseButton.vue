<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
    class="inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed"
  >
    <!-- Loading Spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- Icon (left) -->
    <span v-if="$slots.iconLeft" class="mr-2">
      <slot name="iconLeft"></slot>
    </span>

    <!-- Content -->
    <slot>{{ label }}</slot>

    <!-- Icon (right) -->
    <span v-if="$slots.iconRight" class="ml-2">
      <slot name="iconRight"></slot>
    </span>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      [
        "primary",
        "secondary",
        "success",
        "danger",
        "ghost",
        "outline",
      ].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["xs", "sm", "md", "lg", "xl"].includes(value),
  },
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: "",
  },
  block: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["click"]);

const buttonClasses = computed(() => {
  const classes = [];

  // Variant styles
  const variantStyles = {
    primary:
      "bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl focus:ring-primary-200 transform hover:scale-105 dark:bg-primary-500 dark:hover:bg-primary-600",
    secondary:
      "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100",
    success:
      "bg-success-600 hover:bg-success-700 text-white shadow-lg hover:shadow-xl focus:ring-success-200 transform hover:scale-105 dark:bg-success-500 dark:hover:bg-success-600",
    danger:
      "bg-red-600 hover:bg-red-700 text-white shadow-lg focus:ring-red-200 dark:bg-red-500 dark:hover:bg-red-600",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-200 dark:hover:bg-gray-800 dark:text-gray-100",
    outline:
      "border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-200 dark:border-primary-400 dark:text-primary-400 dark:hover:bg-primary-900/20",
  };
  classes.push(variantStyles[props.variant]);

  // Size styles
  const sizeStyles = {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };
  classes.push(sizeStyles[props.size]);

  // Block
  if (props.block) {
    classes.push("w-full");
  }

  return classes.join(" ");
});

const handleClick = (event) => {
  if (!props.disabled && !props.loading) {
    emit("click", event);
  }
};
</script>

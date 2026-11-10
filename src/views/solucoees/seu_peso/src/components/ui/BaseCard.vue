<template>
  <div :class="cardClasses">
    <div
      v-if="$slots.header || title"
      class="border-b border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
      </slot>
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="border-t border-gray-200 dark:border-gray-700 px-6 py-4"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  variant: {
    type: String,
    default: "default",
    validator: (value) =>
      ["default", "elevated", "outlined", "gradient"].includes(value),
  },
  padding: {
    type: String,
    default: "normal",
    validator: (value) =>
      ["none", "compact", "normal", "large"].includes(value),
  },
  hoverable: {
    type: Boolean,
    default: false,
  },
});

const cardClasses = computed(() => {
  const classes = [
    "bg-white dark:bg-gray-800 rounded-xl transition-all duration-300",
  ];

  // Variant styles
  const variantClasses = {
    default: "border border-gray-200 dark:border-gray-700",
    elevated: "shadow-lg hover:shadow-xl",
    outlined: "border-2 border-primary-200 dark:border-primary-800",
    gradient:
      "bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 border border-primary-200 dark:border-primary-700",
  };
  classes.push(variantClasses[props.variant]);

  // Hoverable
  if (props.hoverable) {
    classes.push("hover:shadow-xl hover:-translate-y-1 cursor-pointer");
  }

  return classes.join(" ");
});

const bodyClasses = computed(() => {
  const paddingClasses = {
    none: "",
    compact: "p-3",
    normal: "p-6",
    large: "p-8",
  };

  return paddingClasses[props.padding];
});
</script>

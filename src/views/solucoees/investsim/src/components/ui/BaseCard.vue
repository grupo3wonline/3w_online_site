<template>
  <div
    :class="cardClasses"
    class="bg-white rounded-xl border border-gray-100 overflow-hidden transition-all duration-300 dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- Header -->
    <div
      v-if="$slots.header || title"
      :class="[
        'px-6 py-4 border-b border-gray-100 dark:border-gray-700',
        headerClass,
      ]"
    >
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ title }}
        </h3>
      </slot>
    </div>

    <!-- Body -->
    <div :class="[padding && paddingClasses, bodyClass]">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div
      v-if="$slots.footer"
      :class="[
        'px-6 py-4 border-t border-gray-100 bg-gray-50 dark:bg-gray-900 dark:border-gray-700',
        footerClass,
      ]"
    >
      <slot name="footer"></slot>
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
  shadow: {
    type: String,
    default: "md",
    validator: (value) =>
      ["none", "sm", "md", "lg", "xl", "2xl"].includes(value),
  },
  hover: {
    type: Boolean,
    default: false,
  },
  padding: {
    type: String,
    default: "md",
    validator: (value) => ["none", "sm", "md", "lg", "xl"].includes(value),
  },
  bodyClass: {
    type: String,
    default: "",
  },
  headerClass: {
    type: String,
    default: "",
  },
  footerClass: {
    type: String,
    default: "",
  },
});

const cardClasses = computed(() => {
  const classes = [];

  // Shadow
  const shadowClasses = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-lg",
    lg: "shadow-xl",
    xl: "shadow-2xl",
    "2xl": "shadow-2xl",
  };
  classes.push(shadowClasses[props.shadow]);

  // Hover effect
  if (props.hover) {
    classes.push("hover:shadow-2xl hover:-translate-y-1 cursor-pointer");
  }

  return classes.join(" ");
});

const paddingClasses = computed(() => {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10",
  };
  return paddings[props.padding];
});
</script>

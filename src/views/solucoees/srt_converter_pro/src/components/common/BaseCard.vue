<template>
  <div :class="cardClasses">
    <div
      v-if="$slots.header || title"
      class="px-6 py-4 border-b border-gray-200"
    >
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
      </slot>
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-gray-200 bg-gray-50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title?: string;
  variant?: "default" | "bordered" | "elevated" | "glass";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "default",
  padding: "md",
  hoverable: false,
});

const cardClasses = computed(() => {
  const classes = ["bg-white rounded-xl transition-all duration-300"];

  const variantStyles = {
    default: "border border-gray-200",
    bordered: "border-2 border-gray-300",
    elevated: "shadow-lg",
    glass: "backdrop-blur-lg bg-white/80 border border-gray-200/50",
  };

  classes.push(variantStyles[props.variant]);

  if (props.hoverable) {
    classes.push("hover:shadow-xl hover:scale-105 cursor-pointer");
  }

  return classes.join(" ");
});

const bodyClasses = computed(() => {
  const paddingStyles = {
    none: "",
    sm: "p-3",
    md: "p-6",
    lg: "p-8",
  };

  return paddingStyles[props.padding];
});
</script>

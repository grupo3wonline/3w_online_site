<template>
  <div :class="containerClasses">
    <div :class="spinnerClasses">
      <div class="spinner-border"></div>
    </div>
    <p v-if="text" :class="textClasses">{{ text }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  size?: "sm" | "md" | "lg" | "xl";
  text?: string;
  center?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  size: "md",
  center: false,
});

const containerClasses = computed(() => {
  const classes = ["flex flex-col items-center gap-3"];

  if (props.center) {
    classes.push("justify-center min-h-[200px]");
  }

  return classes.join(" ");
});

const spinnerClasses = computed(() => {
  const sizeStyles = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24",
  };

  return [
    "relative animate-spin rounded-full border-4 border-gray-200",
    "border-t-purple-600",
    sizeStyles[props.size],
  ].join(" ");
});

const textClasses = computed(() => {
  const sizeStyles = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  return ["text-gray-600 font-medium", sizeStyles[props.size]].join(" ");
});
</script>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

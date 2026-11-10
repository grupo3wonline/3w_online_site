<template>
  <div :class="skeletonClasses" :style="{ width: width, height: height }">
    <div
      class="animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 h-full w-full rounded"
    ></div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: "rect",
    validator: (value) => ["rect", "circle", "text"].includes(value),
  },
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "20px",
  },
  count: {
    type: Number,
    default: 1,
  },
});

const skeletonClasses = computed(() => {
  const classes = [];

  if (props.variant === "circle") {
    classes.push("rounded-full");
  } else if (props.variant === "text") {
    classes.push("rounded-md mb-2");
  } else {
    classes.push("rounded-lg");
  }

  return classes.join(" ");
});
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.animate-pulse {
  animation: shimmer 2s infinite linear;
  background-size: 1000px 100%;
}
</style>

<template>
  <output class="inline-flex items-center justify-center" aria-live="polite">
    <div class="relative">
      <div
        class="border-4 border-red-200 rounded-full animate-spin border-t-red-600"
        :class="sizeClass"
        aria-hidden="true"
      ></div>
    </div>
    <span v-if="text" class="ml-2 text-gray-600 text-sm">{{ text }}</span>
    <span v-else class="sr-only">Carregando...</span>
  </output>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});

const sizeClass = computed(() => {
  const sizes = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };
  return sizes[props.size];
});
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 0.8s linear infinite;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>

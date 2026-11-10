<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-y-auto"
    @click.self="handleBackdropClick"
  >
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black transition-opacity"
      :class="backdropClass"
    ></div>

    <!-- Modal Container -->
    <div class="flex min-h-screen items-center justify-center p-4">
      <!-- Modal Content -->
      <div
        :class="modalClasses"
        class="relative bg-white rounded-2xl shadow-2xl transform transition-all w-full dark:bg-gray-800"
      >
        <!-- Close Button -->
        <button
          v-if="closable"
          type="button"
          @click="close"
          class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none z-10 dark:text-gray-500 dark:hover:text-gray-300"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <!-- Header -->
        <div
          v-if="$slots.header || title"
          class="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
        >
          <slot name="header">
            <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {{ title }}
            </h3>
          </slot>
        </div>

        <!-- Body -->
        <div class="px-6 py-6">
          <slot></slot>
        </div>

        <!-- Footer -->
        <div
          v-if="$slots.footer"
          class="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl dark:bg-gray-900 dark:border-gray-700"
        >
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg", "xl", "full"].includes(value),
  },
  closable: {
    type: Boolean,
    default: true,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close", "update:show"]);

const modalClasses = computed(() => {
  const sizes = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-7xl",
  };
  return sizes[props.size];
});

const backdropClass = computed(() => {
  return props.show ? "opacity-50" : "opacity-0";
});

const close = () => {
  emit("close");
  emit("update:show", false);
};

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close();
  }
};

// Previne scroll do body quando modal está aberto
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);
</script>

<template>
  <transition
    enter-active-class="transform ease-out duration-300 transition"
    enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      :class="toastClasses"
      role="alert"
      @mouseenter="pauseTimer"
      @mouseleave="resumeTimer"
    >
      <div class="flex items-start">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <component :is="iconComponent" :class="iconClasses" />
        </div>

        <!-- Content -->
        <div class="ml-3 flex-1">
          <p class="text-sm font-semibold" :class="titleClasses">
            {{ title }}
          </p>
          <p v-if="message" class="mt-1 text-sm text-gray-600">
            {{ message }}
          </p>
        </div>

        <!-- Close button -->
        <div class="ml-4 flex flex-shrink-0">
          <button
            @click="close"
            class="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <span class="sr-only">Fechar</span>
            <svg
              class="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Progress bar -->
      <div
        v-if="showProgress && duration > 0"
        class="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 rounded-b-lg overflow-hidden"
      >
        <div
          class="h-full bg-current transition-all ease-linear"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, h } from "vue";
import type { ToastType } from "../../composables/useToast";

interface Props {
  type?: ToastType;
  title: string;
  message?: string;
  duration?: number;
  showProgress?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "info",
  duration: 5000,
  showProgress: true,
});

const emit = defineEmits<{
  close: [];
}>();

const show = ref(true);
const progress = ref(100);
let timer: number | null = null;
let progressInterval: number | null = null;
let startTime: number = 0;
let remainingTime: number = props.duration;

const toastClasses = computed(() => {
  const baseClasses =
    "relative max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden";
  const paddingClasses = "p-4";

  return `${baseClasses} ${paddingClasses}`;
});

const iconComponent = computed(() => {
  const icons = {
    success: () =>
      h(
        "svg",
        {
          class: "h-6 w-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          }),
        ]
      ),
    error: () =>
      h(
        "svg",
        {
          class: "h-6 w-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
          }),
        ]
      ),
    warning: () =>
      h(
        "svg",
        {
          class: "h-6 w-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
          }),
        ]
      ),
    info: () =>
      h(
        "svg",
        {
          class: "h-6 w-6",
          xmlns: "http://www.w3.org/2000/svg",
          fill: "none",
          viewBox: "0 0 24 24",
          stroke: "currentColor",
        },
        [
          h("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            "stroke-width": "2",
            d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
          }),
        ]
      ),
  };

  return icons[props.type];
});

const iconClasses = computed(() => {
  const colorClasses = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  return colorClasses[props.type];
});

const titleClasses = computed(() => {
  const colorClasses = {
    success: "text-green-900",
    error: "text-red-900",
    warning: "text-yellow-900",
    info: "text-blue-900",
  };

  return colorClasses[props.type];
});

const close = () => {
  show.value = false;
  if (timer) clearTimeout(timer);
  if (progressInterval) clearInterval(progressInterval);
  setTimeout(() => emit("close"), 300);
};

const startTimer = () => {
  if (props.duration <= 0) return;

  startTime = Date.now();
  timer = window.setTimeout(close, remainingTime);

  if (props.showProgress) {
    progressInterval = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      progress.value = Math.max(0, 100 - (elapsed / props.duration) * 100);
    }, 50);
  }
};

const pauseTimer = () => {
  if (timer) {
    clearTimeout(timer);
    if (progressInterval) clearInterval(progressInterval);
    const elapsed = Date.now() - startTime;
    remainingTime = Math.max(0, remainingTime - elapsed);
  }
};

const resumeTimer = () => {
  if (remainingTime > 0) {
    startTimer();
  }
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  if (timer) clearTimeout(timer);
  if (progressInterval) clearInterval(progressInterval);
});
</script>

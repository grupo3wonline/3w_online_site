<script setup lang="ts">
import { ref, watch } from "vue";
import { useIntersectionObserver, useTransition, TransitionPresets } from "@vueuse/core";

/** Contador que anima de 0 até o valor quando entra na viewport. */
const props = withDefaults(
  defineProps<{ value: number; duration?: number; suffix?: string; prefix?: string }>(),
  { duration: 1400, suffix: "", prefix: "" }
);

const target = ref<HTMLElement | null>(null);
const source = ref(0);
const output = useTransition(source, {
  duration: props.duration,
  transition: TransitionPresets.easeOutCubic,
});

const { stop } = useIntersectionObserver(target, ([entry]) => {
  if (entry?.isIntersecting) {
    source.value = props.value;
    stop();
  }
});

watch(output, () => {});
</script>

<template>
  <span ref="target">{{ prefix }}{{ Math.round(output).toLocaleString("pt-BR") }}{{ suffix }}</span>
</template>

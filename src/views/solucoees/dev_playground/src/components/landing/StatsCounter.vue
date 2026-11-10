<script setup lang="ts">
import { ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { useCountUp } from '@/composables/useCountUp'

const props = defineProps<{ value: string; label: string }>()

const el = ref<HTMLElement | null>(null)
const { display, start } = useCountUp(props.value)
let done = false

const { stop } = useIntersectionObserver(el, ([entry]) => {
  if (entry?.isIntersecting && !done) {
    done = true
    start()
    stop()
  }
})

watch(
  () => props.value,
  () => (display.value = props.value),
)
</script>

<template>
  <div ref="el" class="text-center">
    <div class="text-4xl font-bold md:text-5xl">{{ display }}</div>
    <div class="mt-1 text-sm opacity-90">{{ label }}</div>
  </div>
</template>

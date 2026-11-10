<script setup lang="ts">
import { AccordionRoot, type AccordionRootProps, type AccordionRootEmits, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<AccordionRootProps & { class?: string }>()
const emits = defineEmits<AccordionRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <AccordionRoot v-bind="forwarded" :class="props.class">
    <slot />
  </AccordionRoot>
</template>

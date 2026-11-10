<script setup lang="ts">
import { computed } from "vue";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        success: "border-transparent bg-success text-success-foreground",
        outline: "text-foreground border-border",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const props = defineProps<{
  variant?: VariantProps<typeof badgeVariants>["variant"];
  class?: string;
}>();
const classes = computed(() => cn(badgeVariants({ variant: props.variant }), props.class));
</script>
<template>
  <span :class="classes"><slot /></span>
</template>

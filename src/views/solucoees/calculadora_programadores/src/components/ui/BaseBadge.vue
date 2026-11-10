<script setup lang="ts">
import { cn } from "@/lib/utils";

defineProps<{ variant?: "default" | "secondary" | "success" | "warning"; class?: string }>();

const styles: Record<string, string> = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success text-white",
  warning: "bg-warning text-black",
};
</script>

<template>
  <span
    :class="
      cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
        styles[variant ?? 'default'],
        $props.class
      )
    "
  >
    <slot />
  </span>
</template>

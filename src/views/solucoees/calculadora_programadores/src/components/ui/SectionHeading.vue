<script setup lang="ts">
import { Icon } from "@iconify/vue";

defineProps<{
  eyebrow?: string;
  eyebrowIcon?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}>();
</script>

<template>
  <div
    class="mx-auto mb-12 max-w-2xl"
    :class="align === 'left' ? 'text-left' : 'text-center md:mx-auto'"
  >
    <span
      v-if="eyebrow"
      class="eyebrow mb-4"
    >
      <Icon
        v-if="eyebrowIcon"
        :icon="eyebrowIcon"
        class="h-3.5 w-3.5"
      />
      {{ eyebrow }}
    </span>
    <h2 class="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
      {{ title }}
    </h2>
    <p
      v-if="subtitle"
      class="mt-3 text-lg text-muted-foreground"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

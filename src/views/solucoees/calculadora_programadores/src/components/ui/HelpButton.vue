<script setup lang="ts">
import { Icon } from "@iconify/vue";
import BaseTooltip from "./BaseTooltip.vue";

defineProps<{ text: string }>();
</script>

<template>
  <BaseTooltip :text="text">
    <button
      type="button"
      class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      :aria-label="`Ajuda: ${text}`"
    >
      <Icon
        icon="lucide:help-circle"
        class="h-3.5 w-3.5"
      />
    </button>
  </BaseTooltip>
</template>

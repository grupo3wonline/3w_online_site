<script setup lang="ts">
import { Icon } from "@iconify/vue";
import Badge from "@/components/ui/Badge.vue";

defineProps<{
  icon: string;
  title: string;
  subtitle: string;
  color?: string;
  tags?: string[];
}>();
</script>

<template>
  <div class="mb-8">
    <div class="mb-4 flex items-center gap-3">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-xl text-white"
        :class="color ?? 'bg-gradient-primary'"
      >
        <Icon :icon="icon" class="h-6 w-6" />
      </div>
      <div>
        <h1 class="text-2xl font-bold md:text-3xl">{{ title }}</h1>
        <p class="text-muted-foreground">{{ subtitle }}</p>
      </div>
    </div>
    <div v-if="tags?.length" class="flex flex-wrap gap-2">
      <Badge v-for="t in tags" :key="t" variant="secondary">{{ t }}</Badge>
    </div>
  </div>
</template>

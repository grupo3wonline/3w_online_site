<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";

export interface AccordionItemData {
  title: string;
  content?: string;
  items?: string[];
}

defineProps<{ items: AccordionItemData[] }>();
const open = ref<number | null>(0);
const toggle = (i: number) => (open.value = open.value === i ? null : i);
</script>

<template>
  <div class="space-y-3">
    <div v-for="(item, i) in items" :key="i" class="rounded-lg border border-border bg-card px-5">
      <button
        type="button"
        class="flex w-full items-center justify-between py-4 text-left font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
        :aria-expanded="open === i"
        @click="toggle(i)"
      >
        <span class="flex items-center gap-2">
          <Icon icon="lucide:check-circle" class="h-5 w-5 text-success" />
          {{ item.title }}
        </span>
        <Icon
          icon="lucide:chevron-down"
          class="h-5 w-5 shrink-0 transition-transform"
          :class="open === i ? 'rotate-180' : ''"
        />
      </button>
      <div v-show="open === i" class="pb-5 pt-1 text-sm text-muted-foreground">
        <p v-if="item.content">{{ item.content }}</p>
        <ul v-if="item.items" class="space-y-2">
          <li v-for="(li, k) in item.items" :key="k" class="flex items-start gap-2">
            <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            <span>{{ li }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

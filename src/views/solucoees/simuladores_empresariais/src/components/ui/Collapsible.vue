<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps<{ title: string; emoji?: string }>()
const open = defineModel<boolean>('open', { default: false })
</script>

<template>
  <div class="rounded-lg border border-border">
    <button
      type="button"
      class="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-accent/50"
      :aria-expanded="open"
      @click="open = !open"
    >
      <span class="text-base font-semibold">
        <span v-if="emoji" class="mr-2">{{ emoji }}</span
        >{{ title }}
      </span>
      <Icon
        :icon="open ? 'lucide:chevron-up' : 'lucide:chevron-down'"
        class="h-5 w-5 text-muted-foreground"
      />
    </button>
    <Transition name="collapse">
      <div v-show="open" class="border-t border-border p-4">
        <slot />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.collapse-enter-active,
.collapse-leave-active {
  transition: all 0.2s ease;
  overflow: hidden;
}
.collapse-enter-from,
.collapse-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { INDICATOR_ICONS, type IndicatorResult } from '@/lib/calculator'

const props = defineProps<{ result: IndicatorResult }>()

const iconData = computed(() => INDICATOR_ICONS[props.result.key])
</script>

<template>
  <div class="result-card">
    <div class="flex items-start gap-3">
      <div class="result-icon" :class="[iconData.bg, iconData.color]">
        <Icon :icon="iconData.icon" />
      </div>
      <div class="min-w-0 flex-1">
        <p class="result-label">{{ result.name }}</p>
        <p class="result-value">{{ result.formatted }}</p>
        <span class="result-status" :class="`status-${result.status}`">{{
          result.statusLabel
        }}</span>
        <p class="mt-1.5 text-xs text-ink-400 dark:text-ink-500">{{ result.description }}</p>
      </div>
    </div>
  </div>
</template>

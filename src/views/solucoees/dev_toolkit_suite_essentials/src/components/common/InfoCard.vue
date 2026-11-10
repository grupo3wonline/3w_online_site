<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

defineProps<{
  title: string
  icon?: string
  items?: string[]
  text?: string
  accent?: string
}>()
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center gap-2 text-lg" :class="accent">
        <Icon v-if="icon" :icon="icon" class="h-5 w-5" />
        {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <ul v-if="items" class="space-y-2 text-sm text-muted-foreground">
        <li v-for="(item, i) in items" :key="i" class="flex gap-2">
          <Icon icon="lucide:check" class="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--success))]" />
          <span>{{ item }}</span>
        </li>
      </ul>
      <p v-if="text" class="text-sm text-muted-foreground">{{ text }}</p>
      <slot />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()

const current = computed(() => (route.meta.breadcrumb as string) || '')
</script>

<template>
  <nav aria-label="Breadcrumb" class="border-b border-border/60 bg-background/40">
    <ol class="container flex items-center gap-2 py-3 text-sm text-muted-foreground">
      <li>
        <RouterLink
          to="/"
          class="inline-flex items-center gap-1.5 transition-colors hover:text-primary"
        >
          <Icon icon="fa6-solid:house" class="h-3.5 w-3.5" />
          <span>Início</span>
        </RouterLink>
      </li>
      <li aria-hidden="true">
        <Icon icon="fa6-solid:chevron-right" class="h-3 w-3" />
      </li>
      <li class="font-medium text-foreground" aria-current="page">
        {{ current }}
      </li>
    </ol>
  </nav>
</template>

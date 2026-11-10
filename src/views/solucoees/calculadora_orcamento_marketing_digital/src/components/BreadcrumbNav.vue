<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

/** Não exibe breadcrumb na home (raiz). */
const show = computed(() => route.name !== 'home')

const current = computed(() => (route.meta.breadcrumb as string) || (route.name as string) || '')
</script>

<template>
  <nav
    v-if="show"
    aria-label="Trilha de navegação"
    class="border-b border-border/70 bg-card/40 backdrop-blur-sm"
  >
    <div class="container mx-auto px-4 py-3">
      <ol class="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <RouterLink
            to="/"
            class="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary"
          >
            <i class="fas fa-home text-xs" aria-hidden="true"></i>
            Início
          </RouterLink>
        </li>
        <li class="flex items-center gap-2" aria-current="page">
          <i
            class="fas fa-chevron-right text-[10px] text-muted-foreground/60"
            aria-hidden="true"
          ></i>
          <span class="font-medium text-foreground">{{ current }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

// Breadcrumb gerado a partir da meta da rota atual.
const route = useRoute();

const crumbs = computed(() => {
  const base = [{ label: "Início", to: "/" }];
  const title = (route.meta.breadcrumb as string) || (route.meta.title as string);
  if (route.path !== "/" && title) {
    base.push({ label: title, to: route.path });
  }
  return base;
});
</script>

<template>
  <nav
    v-if="crumbs.length > 1"
    aria-label="Trilha de navegação"
    class="border-b border-border bg-muted/30"
  >
    <ol class="container mx-auto flex flex-wrap items-center gap-1 px-4 py-3 text-sm">
      <li v-for="(c, i) in crumbs" :key="c.to" class="flex items-center gap-1">
        <Icon
          v-if="i > 0"
          icon="lucide:chevron-right"
          class="h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
        <RouterLink
          v-if="i < crumbs.length - 1"
          :to="c.to"
          class="text-muted-foreground transition-colors hover:text-primary"
        >
          {{ c.label }}
        </RouterLink>
        <span v-else class="font-medium text-foreground" aria-current="page">{{ c.label }}</span>
      </li>
    </ol>
  </nav>
</template>

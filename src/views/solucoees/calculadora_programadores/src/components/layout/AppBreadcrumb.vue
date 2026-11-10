<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";

const route = useRoute();

/** Não exibe breadcrumb na home. */
const isHome = computed(() => route.name === "home");

const currentLabel = computed(() => (route.meta.breadcrumb as string) ?? "");
</script>

<template>
  <nav
    v-if="!isHome"
    aria-label="Trilha de navegação"
    class="border-b border-border bg-muted/30"
  >
    <ol class="container-app flex items-center gap-2 py-3 text-sm text-muted-foreground">
      <li>
        <RouterLink
          :to="{ name: 'home' }"
          class="inline-flex items-center gap-1 transition-colors hover:text-primary"
        >
          <Icon
            icon="lucide:home"
            class="h-4 w-4"
          />
          <span>Início</span>
        </RouterLink>
      </li>
      <li aria-hidden="true">
        <Icon
          icon="lucide:chevron-right"
          class="h-4 w-4"
        />
      </li>
      <li
        class="font-medium text-foreground"
        aria-current="page"
      >
        {{ currentLabel }}
      </li>
    </ol>
  </nav>
</template>

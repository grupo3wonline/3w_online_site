<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import AppHeader from '@/components/layout/AppHeader.vue'
  import AppFooter from '@/components/layout/AppFooter.vue'
  import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
  import type { BreadcrumbItem } from '@/types'

  const route = useRoute()

  const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const items: BreadcrumbItem[] = [{ label: 'Início', to: '/', icon: 'mdi:home' }]

    if (route.name !== 'home' && route.meta.breadcrumb) {
      items.push({ label: route.meta.breadcrumb as string })
    }

    return items
  })
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Efeitos de glow de fundo -->
    <div
      class="pointer-events-none fixed left-1/4 top-0 h-96 w-96 animate-pulse-glow rounded-full bg-emerald-500/10 blur-[120px]"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none fixed right-1/4 top-1/3 h-96 w-96 rounded-full bg-emerald-700/10 blur-[140px]"
      aria-hidden="true"
    />

    <AppHeader />
    <AppBreadcrumb :items="breadcrumbItems" />

    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />
  </div>
</template>

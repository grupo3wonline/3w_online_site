<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppBreadcrumb from '@/components/common/AppBreadcrumb.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppNavbar />
    <AppBreadcrumb />
    <main id="conteudo" class="flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>

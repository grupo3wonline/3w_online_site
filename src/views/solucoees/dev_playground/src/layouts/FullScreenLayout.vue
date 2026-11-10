<script setup lang="ts">
import AppNavbar from '@/components/layout/AppNavbar.vue'
import { developer, company } from '@/config/site'
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden">
    <AppNavbar />
    <main class="flex-1 overflow-hidden">
      <slot />
    </main>
    <footer class="border-t bg-background px-4 py-2 text-center text-xs text-muted-foreground">
      © {{ new Date().getFullYear() }} DevPlayground —
      {{ developer.credit.replace(developer.label, '') }}
      <a :href="company.site" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">
        {{ developer.label }}
      </a>
    </footer>
  </div>
</template>

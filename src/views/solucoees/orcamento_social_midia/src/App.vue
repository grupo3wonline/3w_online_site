<script setup lang="ts">
import { onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import { useThemeStore } from '@/stores/theme'
import { useSeo } from '@/composables/useSeo'

// Aplica SEO reativo por rota (title, meta, canonical, JSON-LD)
useSeo()

const theme = useThemeStore()

onMounted(() => {
  theme.apply()
})
</script>

<template>
  <AppLayout />
</template>

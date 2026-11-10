<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useThemeStore } from '@/stores/theme'

// Instancia o store de tema para aplicar a classe .dark logo na inicialização.
useThemeStore()
</script>

<template>
  <RouterView v-slot="{ Component }">
    <transition
      name="fade"
      mode="out-in"
    >
      <component :is="Component" />
    </transition>
  </RouterView>
</template>

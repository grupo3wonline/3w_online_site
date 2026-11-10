<script setup lang="ts">
import { onMounted } from 'vue'
import DefaultLayout from '@/components/layout/DefaultLayout.vue'
import { useThemeStore } from '@/stores/theme'
import { useSeo } from '@/composables/useSeo'

const theme = useThemeStore()
useSeo()

onMounted(() => {
  theme.inicializar()
})
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </DefaultLayout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

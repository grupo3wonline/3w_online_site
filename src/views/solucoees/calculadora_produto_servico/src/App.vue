<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import Layout from '@/components/Layout.vue'
import { useTemaStore } from '@/stores/tema'

const temaStore = useTemaStore()

onMounted(() => {
  temaStore.iniciar()
})
</script>

<template>
  <Layout>
    <RouterView v-slot="{ Component, route }">
      <transition
        name="fade"
        mode="out-in"
      >
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </transition>
    </RouterView>
  </Layout>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

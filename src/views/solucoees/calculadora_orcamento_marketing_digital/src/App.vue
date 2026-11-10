<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { useConsentStore } from '@/stores/consent'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const theme = useThemeStore()
const consent = useConsentStore()

onMounted(() => {
  theme.init()
  consent.init()
})
</script>

<template>
  <DefaultLayout>
    <RouterView v-slot="{ Component, route }">
      <!--
        Transição apenas de ENTRADA (sem mode="out-in").
        Usar out-in aqui trava a navegação quando a view usa diretivas do
        @vueuse/motion (v-motion-*), pois o hook de leave não é finalizado,
        resultando em tela branca. A key por rota reinicia a animação a cada troca.
      -->
      <Transition name="page" appear>
        <component :is="Component" :key="route.path" />
      </Transition>
    </RouterView>
  </DefaultLayout>
</template>

<style>
.page-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}
</style>

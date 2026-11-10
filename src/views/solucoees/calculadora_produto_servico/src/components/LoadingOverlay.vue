<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'
import { useCarregandoStore } from '@/stores/carregando'

const carregando = useCarregandoStore()
const { ativo, mensagem } = storeToRefs(carregando)
</script>

<template>
  <Teleport to="body">
    <transition name="overlay-fade">
      <div
        v-if="ativo"
        class="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <div
          class="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-glow"
        >
          <Icon
            icon="fa6-solid:spinner"
            class="text-white text-2xl animate-spin"
          />
        </div>
        <p class="text-white font-medium text-sm">
          {{ mensagem }}
        </p>
        <span class="sr-only">Processando, aguarde.</span>
      </div>
    </transition>
  </Teleport>
</template>

<style scoped>
.overlay-fade-enter-active,
.overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}
.overlay-fade-enter-from,
.overlay-fade-leave-to {
  opacity: 0;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>

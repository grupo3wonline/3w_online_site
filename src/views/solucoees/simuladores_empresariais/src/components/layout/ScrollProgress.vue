<script setup lang="ts">
import { ref } from 'vue'
import { useEventListener } from '@vueuse/core'

const progresso = ref(0)

function atualizar() {
  const doc = document.documentElement
  const total = doc.scrollHeight - doc.clientHeight
  progresso.value = total <= 0 ? 0 : Math.min(100, Math.max(0, (doc.scrollTop / total) * 100))
}

useEventListener(window, 'scroll', atualizar, { passive: true })
useEventListener(window, 'resize', atualizar, { passive: true })
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-[95] h-1 bg-transparent" aria-hidden="true">
    <div
      class="h-full bg-gradient-to-r from-primary to-brand transition-[width] duration-150 ease-out"
      :style="{ width: progresso + '%' }"
    />
  </div>
</template>

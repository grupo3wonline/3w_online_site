<script setup lang="ts">
defineProps<{
  visivel: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="visivel"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      role="status"
      aria-label="Processando"
    >
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white font-semibold text-lg">Processando...</p>
      </div>
    </div>
  </Teleport>
</template>

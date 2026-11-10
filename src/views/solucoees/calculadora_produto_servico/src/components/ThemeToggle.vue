<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useTemaStore } from '@/stores/tema'

const temaStore = useTemaStore()
const escuro = computed(() => temaStore.tema === 'dark')
</script>

<template>
  <button
    type="button"
    class="w-9 h-9 rounded-lg flex items-center justify-center txt-suave hover:text-primary-500 hover:bg-primary-500/10 transition-all"
    :aria-label="escuro ? 'Ativar tema claro' : 'Ativar tema escuro'"
    data-tooltip="Alternar tema"
    @click="temaStore.alternar()"
  >
    <Icon
      :icon="escuro ? 'fa6-solid:sun' : 'fa6-solid:moon'"
      class="text-lg"
    />
  </button>
</template>

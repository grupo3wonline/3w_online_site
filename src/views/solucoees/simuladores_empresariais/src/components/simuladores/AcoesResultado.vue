<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Button from '@/components/ui/Button.vue'
import { useResultadoActions } from '@/composables/useResultadoActions'

const props = defineProps<{ titulo: string; linhas: string[] }>()
const { imprimir, copiarResumo, compartilharWhatsApp } = useResultadoActions()
</script>

<template>
  <div class="no-print flex flex-wrap gap-2">
    <Button variant="outline" size="sm" @click="imprimir">
      <Icon icon="lucide:printer" class="h-4 w-4" />Imprimir
    </Button>
    <Button variant="outline" size="sm" @click="copiarResumo(props.titulo, props.linhas)">
      <Icon icon="lucide:copy" class="h-4 w-4" />Copiar resumo
    </Button>
    <Button variant="success" size="sm" @click="compartilharWhatsApp(props.titulo, props.linhas)">
      <Icon icon="fa6-brands:whatsapp" class="h-4 w-4" />Compartilhar
    </Button>
  </div>
</template>

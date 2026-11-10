<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const props = defineProps<{
  title: string
  html: string
  label?: string
}>()

function showHelp() {
  Swal.fire({
    title: props.title,
    html: props.html,
    icon: 'info',
    confirmButtonText: 'Entendi!',
    confirmButtonColor: '#7c3aed',
    showCloseButton: true,
  })
}
</script>

<template>
  <button
    type="button"
    class="btn-ghost h-9 w-9 rounded-full p-0 text-brand-600 dark:text-brand-400"
    :title="label ?? 'Ajuda'"
    :aria-label="label ?? 'Abrir ajuda'"
    @click="showHelp"
  >
    <Icon
      icon="lucide:circle-help"
      class="h-5 w-5"
    />
  </button>
</template>

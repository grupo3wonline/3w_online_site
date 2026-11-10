<script setup lang="ts">
import { onErrorCaptured } from 'vue'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const { t } = useI18n()

// Rede de segurança para erros de renderização não tratados.
onErrorCaptured((err) => {
  console.error('[App] erro capturado:', err)
  void Swal.fire({
    icon: 'error',
    title: t('errors.genericTitle'),
    text: t('errors.genericMessage'),
    confirmButtonText: t('errors.reload'),
    confirmButtonColor: '#2563eb',
  }).then((result) => {
    if (result.isConfirmed) window.location.reload()
  })
  return false
})
</script>

<template>
  <DefaultLayout />
</template>

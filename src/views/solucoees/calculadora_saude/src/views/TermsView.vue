<script setup lang="ts">
import AppBreadcrumb from '@/components/common/AppBreadcrumb.vue';
import TermsOfService from '@/components/legal/TermsOfService.vue';
import { useSeo } from '@/composables/useSeo';

useSeo(() => ({
  title: 'Termos de Uso — Calculadora de Saúde',
  description:
    'Termos de Uso da Calculadora de Saúde. Ferramenta informativa gratuita desenvolvida pelo Grupo 3W Online.',
  keywords: 'termos de uso, condições, calculadora de saúde',
  path: '/termos',
}));
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <AppBreadcrumb :items="[{ label: 'Termos de Uso' }]" />
    <div class="container-page pb-20 pt-4">
      <TermsOfService />
    </div>
  </div>
</template>

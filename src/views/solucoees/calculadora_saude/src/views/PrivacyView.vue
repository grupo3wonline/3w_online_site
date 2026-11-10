<script setup lang="ts">
import AppBreadcrumb from '@/components/common/AppBreadcrumb.vue';
import PrivacyPolicy from '@/components/legal/PrivacyPolicy.vue';
import { useSeo } from '@/composables/useSeo';

useSeo(() => ({
  title: 'Política de Privacidade — Calculadora de Saúde',
  description:
    'Política de Privacidade da Calculadora de Saúde em conformidade com LGPD, GDPR, CCPA e POPIA. Seus dados permanecem no seu dispositivo.',
  keywords: 'política de privacidade, LGPD, GDPR, CCPA, POPIA, proteção de dados',
  path: '/privacidade',
}));
</script>

<template>
  <div class="bg-white dark:bg-gray-900">
    <AppBreadcrumb :items="[{ label: 'Política de Privacidade' }]" />
    <div class="container-page pb-20 pt-4">
      <PrivacyPolicy />
    </div>
  </div>
</template>

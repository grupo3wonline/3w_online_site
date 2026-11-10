<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { useSeo } from '@/composables/useSeo'

const { t } = useI18n()
const route = useRoute()

useSeo(() => ({
  title: t('notFound.subtitle'),
  description: t('notFound.text'),
  type: 'website',
}))

onMounted(() => {
  // Não indexar 404
  const meta = document.querySelector('meta[name="robots"]')
  if (meta) meta.setAttribute('content', 'noindex, follow')
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_not_found', { page_path: route.fullPath })
  }
})
</script>

<template>
  <div class="relative flex min-h-[75vh] items-center justify-center overflow-hidden px-4 py-16">
    <div class="absolute inset-0 bg-grid opacity-40" aria-hidden="true"></div>
    <div
      class="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl"
      aria-hidden="true"
    ></div>
    <div class="relative mx-auto max-w-lg text-center">
      <p class="font-display text-8xl font-extrabold sm:text-9xl">
        <span class="text-gradient">{{ t('notFound.title') }}</span>
      </p>
      <Icon icon="ph:plugs-bold" class="mx-auto mt-4 h-16 w-16 text-gray-400" aria-hidden="true" />
      <h1 class="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
        {{ t('notFound.subtitle') }}
      </h1>
      <p class="mt-3 text-gray-600 dark:text-gray-400">{{ t('notFound.text') }}</p>

      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink to="/" class="btn-primary">
          <Icon icon="ph:house-bold" class="h-5 w-5" aria-hidden="true" />
          {{ t('notFound.goHome') }}
        </RouterLink>
        <RouterLink to="/calculadora" class="btn-secondary">
          <Icon icon="ph:calculator-bold" class="h-5 w-5" aria-hidden="true" />
          {{ t('notFound.goCalc') }}
        </RouterLink>
      </div>

      <p class="mt-6 text-sm text-gray-500 dark:text-gray-400">
        {{ t('notFound.helpText') }}
        <RouterLink
          to="/#contato"
          class="font-medium text-primary-600 underline hover:text-primary-700"
        >
          {{ t('notFound.helpLink') }}</RouterLink
        >.
      </p>
    </div>
  </div>
</template>

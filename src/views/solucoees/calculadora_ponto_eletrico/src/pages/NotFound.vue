<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Icon, Button } from '@/components/ui'
import { useSEO } from '@/composables/useSEO'

const { t } = useI18n()

useSEO({
  title: t('errors.notFoundTitle'),
  description: t('errors.notFoundMessage'),
})
</script>

<template>
  <div class="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
    <div class="icon-badge mb-6 h-20 w-20 rounded-3xl shadow-glow">
      <Icon icon="lucide:zap-off" class="h-10 w-10" />
    </div>

    <p class="text-6xl font-black text-primary">404</p>
    <h1 class="mt-2 text-2xl font-bold text-foreground sm:text-3xl">
      {{ t('errors.notFoundTitle') }}
    </h1>
    <p class="mt-3 max-w-md text-muted-foreground">{{ t('errors.notFoundMessage') }}</p>

    <div class="mt-8 flex flex-col gap-3 sm:flex-row">
      <Button as-child size="lg">
        <RouterLink to="/">
          <Icon icon="lucide:home" class="h-5 w-5" />
          {{ t('actions.backHome') }}
        </RouterLink>
      </Button>
      <Button as-child variant="outline" size="lg">
        <RouterLink to="/#calculadora">
          <Icon icon="lucide:calculator" class="h-5 w-5" />
          {{ t('nav.calculator') }}
        </RouterLink>
      </Button>
    </div>
  </div>
</template>

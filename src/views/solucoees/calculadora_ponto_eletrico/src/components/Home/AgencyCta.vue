<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon, Button } from '@/components/ui'
import { COMPANY } from '@/utils/constants'

const { t } = useI18n()
</script>

<template>
  <section
    id="agencia"
    class="relative overflow-hidden bg-brand-gradient py-16 text-white sm:py-20"
    aria-labelledby="agency-title"
  >
    <div class="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true"></div>
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div
        class="absolute -right-20 -top-20 h-72 w-72 animate-float rounded-full bg-white/10 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-24 -left-16 h-80 w-80 animate-float-slow rounded-full bg-electric/20 blur-3xl"
      ></div>
    </div>

    <div class="container relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
      <span
        class="mb-5 inline-flex items-center gap-2 rounded-full bg-electric-500 px-4 py-1.5 text-sm font-bold text-white"
      >
        <Icon icon="lucide:flame" class="h-4 w-4" />
        {{ t('home.agency.badge') }}
      </span>

      <h2 id="agency-title" class="mb-4 text-3xl font-black text-white sm:text-4xl">
        {{ t('home.agency.title') }}
      </h2>
      <p class="mb-4 text-lg text-white/90">{{ t('home.agency.text') }}</p>

      <p
        class="mb-8 inline-flex items-center gap-2 rounded-full bg-black/15 px-3 py-1 text-sm font-semibold text-white"
      >
        <Icon icon="lucide:clock" class="h-4 w-4 text-electric-500" />
        {{ t('home.agency.urgency') }}
      </p>

      <div>
        <Button
          as="a"
          :href="COMPANY.site"
          target="_blank"
          rel="noopener noreferrer"
          size="lg"
          class="bg-white text-primary-700 hover:bg-white/90"
        >
          <Icon icon="lucide:rocket" class="h-5 w-5" />
          {{ t('home.agency.cta') }}
        </Button>
      </div>
    </div>
  </section>
</template>

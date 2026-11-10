<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@/components/ui'
import SectionHeading from './SectionHeading.vue'

const { t } = useI18n()

const steps = computed(() => [
  { key: 'one', num: '1' },
  { key: 'two', num: '2' },
  { key: 'three', num: '3' },
])
</script>

<template>
  <section id="como-funciona" class="py-16 sm:py-20" aria-labelledby="howto-title">
    <div class="container mx-auto px-4 sm:px-6">
      <SectionHeading
        id="howto-title"
        gradient
        :title="t('home.howto.title')"
        :subtitle="t('home.howto.subtitle')"
      />

      <ol class="relative mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Linha conectora (desktop) -->
        <div
          class="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-primary-600/30 to-transparent md:block"
          aria-hidden="true"
        ></div>
        <li v-for="step in steps" :key="step.key" class="relative text-center">
          <span class="icon-badge mx-auto mb-6 flex h-16 w-16 rounded-2xl text-2xl font-black">
            {{ step.num }}
          </span>
          <h3 class="mb-2 text-lg font-bold text-foreground">
            {{ t(`home.howto.steps.${step.key}.title`) }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t(`home.howto.steps.${step.key}.text`) }}
          </p>
        </li>
      </ol>

      <div
        class="mx-auto mt-10 flex max-w-3xl items-start gap-3 rounded-xl border border-primary-600/20 bg-primary-50 p-4 text-sm text-primary-900 dark:bg-primary-900/20 dark:text-primary-100"
      >
        <Icon icon="lucide:lightbulb" class="mt-0.5 h-5 w-5 flex-shrink-0 text-electric-600" />
        <p>{{ t('home.howto.tip') }}</p>
      </div>
    </div>
  </section>
</template>

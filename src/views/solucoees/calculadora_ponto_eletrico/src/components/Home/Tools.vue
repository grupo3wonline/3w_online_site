<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Icon, Button, Card } from '@/components/ui'
import SectionHeading from './SectionHeading.vue'
import { ANCHORS } from '@/utils/constants'

const { t } = useI18n()
</script>

<template>
  <section id="ferramentas" class="py-16 sm:py-20" aria-labelledby="tools-title">
    <div class="container mx-auto px-4 sm:px-6">
      <SectionHeading
        id="tools-title"
        gradient
        :title="t('home.tools.title')"
        :subtitle="t('home.tools.subtitle')"
      />

      <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        <Card class="card-hover flex flex-col p-6">
          <span class="icon-badge mb-4 h-12 w-12">
            <Icon icon="lucide:calculator" class="h-6 w-6" />
          </span>
          <h3 class="mb-2 text-lg font-bold text-foreground">
            {{ t('home.tools.calculator.title') }}
          </h3>
          <p class="mb-4 flex-grow text-sm text-muted-foreground">
            {{ t('home.tools.calculator.text') }}
          </p>
          <Button as-child class="self-start">
            <RouterLink :to="ANCHORS.CALCULATOR">
              <Icon icon="lucide:arrow-right" class="h-4 w-4" />
              {{ t('home.tools.calculator.cta') }}
            </RouterLink>
          </Button>
        </Card>

        <Card class="flex flex-col border-dashed p-6">
          <span
            class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground"
          >
            <Icon icon="lucide:sparkles" class="h-6 w-6" />
          </span>
          <div class="mb-2 flex items-center gap-2">
            <h3 class="text-lg font-bold text-foreground">{{ t('home.tools.soon.title') }}</h3>
            <span
              class="rounded-full bg-electric-500/15 px-2 py-0.5 text-xs font-semibold text-electric-700 dark:text-electric-500"
            >
              {{ t('home.tools.soon.badge') }}
            </span>
          </div>
          <p class="text-sm text-muted-foreground">{{ t('home.tools.soon.text') }}</p>
        </Card>
      </div>
    </div>
  </section>
</template>

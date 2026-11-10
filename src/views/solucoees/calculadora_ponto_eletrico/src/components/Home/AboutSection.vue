<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@/components/ui'

const { t } = useI18n()

// Nível de heading configurável (a seção Sobre é h2 dentro da landing).
withDefaults(defineProps<{ headingLevel?: 'h1' | 'h2' }>(), { headingLevel: 'h2' })

const applications = computed(() => ['residential', 'commercial', 'reforms', 'studies'] as const)
</script>

<template>
  <section id="sobre" class="py-16 sm:py-20" aria-labelledby="about-title">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="mx-auto grid max-w-5xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <p class="mb-2 text-sm font-bold uppercase tracking-widest text-primary">
            {{ t('nav.about') }}
          </p>
          <component
            :is="headingLevel"
            id="about-title"
            class="mb-6 text-3xl font-black sm:text-4xl"
          >
            <span class="text-gradient">{{ t('home.about.title') }}</span>
          </component>
          <p class="mb-4 text-muted-foreground">{{ t('home.about.mission') }}</p>
          <p class="text-muted-foreground">{{ t('home.about.values') }}</p>
        </div>

        <div class="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h3 class="mb-4 flex items-center gap-2 text-lg font-bold text-foreground">
            <span class="icon-badge h-9 w-9">
              <Icon icon="lucide:award" class="h-5 w-5" />
            </span>
            {{ t('home.about.applicationsTitle') }}
          </h3>
          <ul class="space-y-3">
            <li
              v-for="app in applications"
              :key="app"
              class="flex items-center gap-3 text-muted-foreground"
            >
              <Icon icon="lucide:circle-check" class="h-5 w-5 flex-shrink-0 text-green-500" />
              {{ t(`home.about.applications.${app}`) }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

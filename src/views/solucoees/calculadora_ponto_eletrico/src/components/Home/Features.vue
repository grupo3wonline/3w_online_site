<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon, Card } from '@/components/ui'
import SectionHeading from './SectionHeading.vue'

const { t } = useI18n()

const features = computed(() => [
  { key: 'points', icon: 'lucide:plug-zap' },
  { key: 'cable', icon: 'lucide:cable' },
  { key: 'power', icon: 'lucide:gauge' },
  { key: 'breaker', icon: 'lucide:shield-check' },
])
</script>

<template>
  <section id="funcionalidades" class="bg-muted/40 py-16 sm:py-20" aria-labelledby="features-title">
    <div class="container mx-auto px-4 sm:px-6">
      <SectionHeading
        id="features-title"
        gradient
        :title="t('home.features.title')"
        :subtitle="t('home.features.subtitle')"
      />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="feature in features" :key="feature.key" class="card-hover p-6 text-center">
          <span class="icon-badge mx-auto mb-4 h-14 w-14 rounded-2xl">
            <Icon :icon="feature.icon" class="h-7 w-7" />
          </span>
          <h3 class="mb-2 text-lg font-bold text-foreground">
            {{ t(`home.features.items.${feature.key}.title`) }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t(`home.features.items.${feature.key}.text`) }}
          </p>
        </Card>
      </div>
    </div>
  </section>
</template>

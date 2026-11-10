<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon, Card } from '@/components/ui'

const { t } = useI18n()

const benefits = computed(() => [
  { key: 'norm', icon: 'lucide:shield-check' },
  { key: 'free', icon: 'lucide:gift' },
  { key: 'privacy', icon: 'lucide:lock' },
  { key: 'fast', icon: 'lucide:zap' },
])
</script>

<template>
  <section id="beneficios" class="py-16 sm:py-20" aria-labelledby="benefits-title">
    <div class="container mx-auto px-4 sm:px-6">
      <div class="mx-auto mb-12 max-w-2xl text-center">
        <h2 id="benefits-title" class="mb-3 text-3xl font-black text-foreground sm:text-4xl">
          {{ t('home.benefits.title') }}
        </h2>
        <p class="text-muted-foreground">{{ t('home.benefits.subtitle') }}</p>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card v-for="benefit in benefits" :key="benefit.key" class="card-hover p-6">
          <span class="icon-badge mb-4 h-12 w-12">
            <Icon :icon="benefit.icon" class="h-6 w-6" />
          </span>
          <h3 class="mb-2 text-lg font-bold text-foreground">
            {{ t(`home.benefits.items.${benefit.key}.title`) }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t(`home.benefits.items.${benefit.key}.text`) }}
          </p>
        </Card>
      </div>
    </div>
  </section>
</template>

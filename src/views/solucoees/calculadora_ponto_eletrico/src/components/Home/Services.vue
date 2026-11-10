<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon, Card } from '@/components/ui'
import SectionHeading from './SectionHeading.vue'

const { t } = useI18n()

const services = computed(() => [
  { key: 'sites', icon: 'lucide:globe' },
  { key: 'systems', icon: 'lucide:code-2' },
  { key: 'maintenance', icon: 'lucide:headset' },
])
</script>

<template>
  <section id="servicos" class="py-16 sm:py-20" aria-labelledby="services-title">
    <div class="container mx-auto px-4 sm:px-6">
      <SectionHeading
        id="services-title"
        :eyebrow="t('footer.agency')"
        gradient
        :title="t('home.services.title')"
        :subtitle="t('home.services.subtitle')"
      />

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card v-for="service in services" :key="service.key" class="card-hover p-6">
          <span class="icon-badge mb-4 h-12 w-12">
            <Icon :icon="service.icon" class="h-6 w-6" />
          </span>
          <h3 class="mb-2 text-lg font-bold text-foreground">
            {{ t(`home.services.items.${service.key}.title`) }}
          </h3>
          <p class="text-sm text-muted-foreground">
            {{ t(`home.services.items.${service.key}.text`) }}
          </p>
        </Card>
      </div>
    </div>
  </section>
</template>

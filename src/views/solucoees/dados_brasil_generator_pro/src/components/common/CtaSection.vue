<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { siteConfig } from '@/config/site'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    ctaLabel?: string
    compact?: boolean
  }>(),
  {
    title: 'Precisa de um site ou sistema sob medida?',
    subtitle:
      'A Grupo 3w Online desenvolve sites e sistemas personalizados sob demanda. Vagas limitadas na agenda deste mês — garanta seu orçamento sem compromisso.',
    ctaLabel: 'Solicitar orçamento agora',
    compact: false,
  },
)
</script>

<template>
  <section :class="compact ? 'py-12' : 'py-20'">
    <div class="container-app">
      <div
        class="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent p-8 text-center sm:p-12"
      >
        <!-- Gatilho de urgência -->
        <span
          class="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
        >
          <Icon icon="lucide:flame" class="h-4 w-4" />
          Oferta por tempo limitado
        </span>

        <h2 class="mx-auto max-w-2xl text-3xl font-extrabold sm:text-4xl">{{ title }}</h2>
        <p class="mx-auto mt-4 max-w-2xl text-muted-foreground">{{ subtitle }}</p>

        <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BaseButton :href="siteConfig.developer.site" size="lg">
            {{ ctaLabel }}
            <Icon icon="lucide:arrow-right" class="h-5 w-5" />
          </BaseButton>
          <BaseButton :href="siteConfig.developer.whatsappLink" variant="outline" size="lg">
            <Icon icon="lucide:message-circle" class="h-5 w-5" />
            WhatsApp direto
          </BaseButton>
        </div>

        <p class="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
          <span class="inline-flex items-center gap-1">
            <Icon icon="lucide:check-circle-2" class="h-4 w-4 text-green-500" /> Atendimento personalizado
          </span>
          <span class="inline-flex items-center gap-1">
            <Icon icon="lucide:check-circle-2" class="h-4 w-4 text-green-500" /> Orçamento sem compromisso
          </span>
          <span class="inline-flex items-center gap-1">
            <Icon icon="lucide:check-circle-2" class="h-4 w-4 text-green-500" /> Entrega ágil
          </span>
        </p>
      </div>
    </div>
  </section>
</template>

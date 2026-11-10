<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeading from './SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const features = [
  {
    icon: 'lucide:rocket',
    title: 'Ultra Rápido',
    description:
      'Preview em tempo real enquanto você digita. Veja suas alterações instantaneamente, sem recarregar.',
  },
  {
    icon: 'lucide:shield-check',
    title: '100% Seguro',
    description:
      'Processamento local no navegador em ambiente isolado (sandbox). Seu código não é rastreado.',
  },
  {
    icon: 'lucide:code-2',
    title: 'Multi-Linguagem',
    description: 'Suporte completo para HTML, CSS, JavaScript e PHP com destaque de sintaxe.',
  },
  {
    icon: 'lucide:smartphone',
    title: 'Responsivo',
    description: 'Interface mobile first que funciona perfeitamente em desktop, tablet e celular.',
  },
  {
    icon: 'lucide:terminal',
    title: 'Console Integrado',
    description: 'Debug facilitado com console JavaScript integrado que captura logs e erros.',
  },
  {
    icon: 'lucide:download',
    title: 'Export Fácil',
    description: 'Exporte seu projeto como HTML único ou arquivos separados (.html, .css, .js).',
  },
]
</script>

<template>
  <section id="recursos" class="scroll-mt-20 bg-background py-20">
    <div class="container-page">
      <SectionHeading
        eyebrow="Recursos"
        title="Por que"
        highlight="DevPlayground?"
        subtitle="A ferramenta completa para desenvolvedores que precisam testar código rapidamente."
      />
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BaseCard
          v-for="feature in features"
          :key="feature.title"
          v-motion-fade-visible-once
          class="group"
        >
          <div
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110"
          >
            <Icon :icon="feature.icon" class="h-7 w-7" />
          </div>
          <h3 class="mb-2 text-xl font-bold">{{ feature.title }}</h3>
          <p class="text-muted-foreground">{{ feature.description }}</p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

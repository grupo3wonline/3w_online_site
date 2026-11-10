<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeading from './SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'

const testimonials = [
  {
    name: 'Ana Ribeiro',
    role: 'Desenvolvedora Front-end',
    text: 'Uso o DevPlayground todo dia para testar componentes rápido. O preview em tempo real economiza muito do meu tempo.',
    initials: 'AR',
  },
  {
    name: 'Carlos Mendes',
    role: 'Estudante de programação',
    text: 'Perfeito para aprender. Consigo experimentar HTML, CSS e JS sem instalar nada. Interface muito limpa.',
    initials: 'CM',
  },
  {
    name: 'Juliana Costa',
    role: 'Professora de Web',
    text: 'Mostro exemplos ao vivo nas minhas aulas. Os templates prontos são ótimos para demonstrar conceitos.',
    initials: 'JC',
  },
]
</script>

<template>
  <section class="bg-background py-20">
    <div class="container-page">
      <SectionHeading
        eyebrow="Depoimentos"
        title="O que dizem os"
        highlight="desenvolvedores"
        subtitle="Milhares de pessoas usam o DevPlayground no dia a dia."
      />
      <div class="grid gap-6 md:grid-cols-3">
        <BaseCard v-for="t in testimonials" :key="t.name" v-motion-fade-visible-once>
          <div class="mb-4 flex gap-1 text-amber-400">
            <Icon v-for="n in 5" :key="n" icon="lucide:star" class="h-5 w-5 fill-current" />
          </div>
          <p class="mb-6 text-muted-foreground">"{{ t.text }}"</p>
          <div class="flex items-center gap-3">
            <span
              class="flex h-11 w-11 items-center justify-center rounded-full gradient-brand text-sm font-bold text-white"
            >
              {{ t.initials }}
            </span>
            <div>
              <p class="font-semibold">{{ t.name }}</p>
              <p class="text-sm text-muted-foreground">{{ t.role }}</p>
            </div>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

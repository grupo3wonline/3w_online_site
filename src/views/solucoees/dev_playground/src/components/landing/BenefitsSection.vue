<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeading from './SectionHeading.vue'

const benefits = [
  { icon: 'lucide:infinity', title: 'Uso Ilimitado', description: '100% gratuito, sem limites de uso ou restrições.' },
  { icon: 'lucide:zap', title: 'Produtividade', description: 'Editor profissional para máxima produtividade.' },
  { icon: 'lucide:users', title: 'Para Todos', description: 'Perfeito para iniciantes, estudantes e profissionais.' },
  { icon: 'lucide:clock', title: 'Economize Tempo', description: 'Teste e prototipe ideias sem configuração.' },
]
</script>

<template>
  <section id="beneficios" class="scroll-mt-20 bg-muted/40 py-20">
    <div class="container-page">
      <SectionHeading
        eyebrow="Benefícios"
        title="Benefícios que fazem a"
        highlight="diferença"
        subtitle="Desenvolvido pensando em você e na sua produtividade."
      />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          v-motion-pop-visible-once
          class="rounded-2xl bg-card p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-brand">
            <Icon :icon="benefit.icon" class="h-7 w-7 text-white" />
          </div>
          <h3 class="mb-2 text-xl font-bold">{{ benefit.title }}</h3>
          <p class="text-muted-foreground">{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

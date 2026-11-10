<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeading from './SectionHeading.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import StatsCounter from './StatsCounter.vue'

const stats = [
  { number: '1.500+', label: 'Desenvolvedores Ativos' },
  { number: '100%', label: 'Gratuito' },
  { number: '4.9/5', label: 'Avaliação Média' },
  { number: '24/7', label: 'Disponibilidade' },
]

const values = [
  { icon: 'lucide:gem', title: 'Qualidade', description: 'A melhor experiência de edição de código online.' },
  { icon: 'lucide:lightbulb', title: 'Inovação', description: 'Evoluindo constantemente com novos recursos úteis.' },
  { icon: 'lucide:users', title: 'Comunidade', description: 'Feito para as necessidades reais dos desenvolvedores.' },
  { icon: 'lucide:heart', title: 'Paixão', description: 'Feito com dedicação para a comunidade dev.' },
]
</script>

<template>
  <section id="sobre" class="scroll-mt-20 bg-background py-20">
    <div class="container-page">
      <!-- Números (com contador animado) -->
      <div
        class="mb-16 grid grid-cols-2 gap-8 rounded-3xl gradient-brand p-10 text-white shadow-xl md:grid-cols-4"
      >
        <StatsCounter
          v-for="stat in stats"
          :key="stat.label"
          :value="stat.number"
          :label="stat.label"
        />
      </div>

      <SectionHeading
        eyebrow="Sobre"
        title="Nossa"
        highlight="Missão"
        subtitle="O DevPlayground nasceu para dar acesso a ferramentas profissionais sem a complexidade de configurar ambientes locais. É e sempre será 100% gratuito, sem anúncios intrusivos."
      />

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <BaseCard v-for="value in values" :key="value.title" class="text-center">
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-brand">
            <Icon :icon="value.icon" class="h-7 w-7 text-white" />
          </div>
          <h3 class="mb-2 text-lg font-bold">{{ value.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ value.description }}</p>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

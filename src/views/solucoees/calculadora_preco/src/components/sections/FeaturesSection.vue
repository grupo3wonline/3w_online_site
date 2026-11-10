<script setup lang="ts">
import { Icon } from '@iconify/vue'

const features = [
  {
    icon: 'fa6-solid:calculator',
    title: 'Cálculo Preciso',
    description:
      'Algoritmos avançados para calcular margem de lucro, custos fixos e variáveis com precisão profissional.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'fa6-solid:chart-line',
    title: 'Análise Completa',
    description:
      'Visualize gráficos detalhados e relatórios completos para tomar decisões estratégicas informadas.',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: 'fa6-solid:bolt',
    title: 'Ultra Rápido',
    description:
      'Processamento instantâneo com interface moderna e responsiva. Calcule em segundos!',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: 'fa6-solid:shield-halved',
    title: '100% Seguro',
    description: 'Seus dados são processados localmente. Nada é enviado para servidores externos.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'fa6-solid:infinity',
    title: 'Uso Ilimitado',
    description: 'Sem limites, sem cadastro obrigatório, sem taxas ocultas. Totalmente gratuito!',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: 'fa6-solid:mobile-screen',
    title: 'Mobile First',
    description: 'Interface otimizada para todos os dispositivos — desktop, tablet e smartphone.',
    color: 'from-indigo-500 to-blue-500',
  },
]
</script>

<template>
  <section id="funcionalidades" class="bg-background/50 py-20">
    <div class="container">
      <div class="mb-16 space-y-4 text-center">
        <h2 class="text-3xl font-black text-foreground md:text-5xl">
          Por Que Usar Nossa Calculadora?
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          Recursos profissionais que transformam a forma como você precifica
        </p>
      </div>

      <div class="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="feature in features"
          :key="feature.title"
          v-motion-fade-visible
          class="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant"
        >
          <div
            class="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110"
            :class="feature.color"
          >
            <Icon :icon="feature.icon" class="h-7 w-7 text-white" />
          </div>
          <h3 class="mb-3 text-xl font-bold text-foreground">{{ feature.title }}</h3>
          <p class="leading-relaxed text-muted-foreground">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

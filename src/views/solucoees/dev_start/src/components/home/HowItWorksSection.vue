<script setup lang="ts">
import { Icon } from '@iconify/vue'

const steps = [
  {
    icon: 'lucide:lightbulb',
    title: '1. Escolha uma ferramenta',
    text: 'Comece pelo Fluxograma para estruturar ideias ou pelo Playground Web para ver algo na tela.',
  },
  {
    icon: 'lucide:wrench',
    title: '2. Pratique interagindo',
    text: 'Arraste blocos, conecte circuitos, escreva código. Cada ação mostra um resultado imediato.',
  },
  {
    icon: 'lucide:message-circle-question',
    title: '3. Tire dúvidas com a IA',
    text: 'Ficou preso? Abra o Tutor IA no canto inferior e peça uma explicação passo a passo.',
  },
  {
    icon: 'lucide:trophy',
    title: '4. Complete desafios',
    text: 'Aplique o que aprendeu nos desafios semanais e acompanhe sua evolução.',
  },
]

const tips = [
  'Comece pequeno: um "Olá Mundo" já é uma vitória.',
  'Erre à vontade — o ambiente é seguro e reversível.',
  'Use os botões de ajuda (?) em cada ferramenta.',
  'Combine ferramentas: desenhe o fluxograma e depois codifique.',
]
</script>

<template>
  <section
    id="como-funciona"
    class="bg-white py-20 dark:bg-slate-950"
  >
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          Como funciona
        </span>
        <h2 class="section-title mt-2">
          Do zero ao código em 4 passos
        </h2>
      </div>

      <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(step, i) in steps"
          :key="step.title"
          v-motion-slide-visible-once-bottom
          :delay="i * 80"
          class="relative rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg"
          >
            <Icon
              :icon="step.icon"
              class="h-6 w-6"
            />
          </div>
          <h3 class="mt-4 font-bold text-slate-900 dark:text-white">
            {{ step.title }}
          </h3>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {{ step.text }}
          </p>
        </div>
      </div>

      <div
        class="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900/50 dark:bg-amber-900/20"
      >
        <h3 class="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-200">
          <Icon
            icon="lucide:sparkles"
            class="h-5 w-5"
          />
          Dicas para aproveitar melhor
        </h3>
        <ul class="mt-4 grid gap-3 sm:grid-cols-2">
          <li
            v-for="tip in tips"
            :key="tip"
            class="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-100"
          >
            <Icon
              icon="lucide:check-circle-2"
              class="mt-0.5 h-4 w-4 shrink-0 text-amber-600"
            />
            {{ tip }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

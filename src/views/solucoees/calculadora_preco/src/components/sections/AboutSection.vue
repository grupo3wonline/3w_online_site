<script setup lang="ts">
import { Icon } from '@iconify/vue'

const custos = [
  { label: 'Custos Fixos:', desc: 'Aluguel, energia, internet, salários, etc.' },
  { label: 'Custos Variáveis:', desc: 'Matéria-prima, comissões, fretes, embalagens.' },
  { label: 'Margem de Lucro:', desc: 'Quanto você deseja ganhar de fato.' },
  { label: 'Impostos:', desc: 'Cálculo de tributos conforme regime tributário.' },
]

const dicas = [
  {
    icon: 'fa6-solid:chart-line',
    title: 'Revise Periodicamente',
    text: 'Custos mudam com o tempo. Revise seus preços a cada 3-6 meses para manter a lucratividade.',
  },
  {
    icon: 'fa6-solid:users',
    title: 'Conheça Seu Público',
    text: 'O preço ideal também considera o que seu público está disposto a pagar. Pesquise o mercado!',
  },
  {
    icon: 'fa6-solid:scale-balanced',
    title: 'Seja Competitivo, Mas Justo',
    text: 'Não pratique preços muito abaixo do mercado. Isso prejudica você e desvaloriza o setor.',
  },
  {
    icon: 'fa6-solid:file-lines',
    title: 'Documente Tudo',
    text: 'Mantenha registro de todos os custos e cálculos. Isso facilita ajustes futuros e análises.',
  },
]
</script>

<template>
  <section id="sobre" class="bg-background/50 py-20">
    <div class="container">
      <!-- O Que É -->
      <div class="mx-auto mb-16 max-w-6xl">
        <div class="rounded-3xl border border-border bg-card p-10 shadow-elegant md:p-16">
          <div class="mb-8 flex items-center gap-4">
            <div class="rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 p-4">
              <Icon icon="fa6-solid:calculator" class="h-8 w-8 text-white" />
            </div>
            <h2 class="text-3xl font-black text-foreground md:text-4xl">
              O Que É Esta Ferramenta?
            </h2>
          </div>
          <div class="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              A <strong class="text-primary">Calculadora de Preços</strong> é uma aplicação web
              moderna e gratuita desenvolvida para resolver um dos maiores desafios de
              empreendedores: <strong>descobrir quanto cobrar</strong>.
            </p>
            <p>
              Muitos profissionais acabam cobrando menos do que deveriam por não considerarem todos
              os custos envolvidos. Nossa ferramenta calcula:
            </p>
            <ul class="ml-2 space-y-3">
              <li v-for="c in custos" :key="c.label" class="flex items-start gap-3">
                <Icon icon="fa6-solid:circle-check" class="mt-1 h-5 w-5 text-green-500" />
                <span
                  ><strong>{{ c.label }}</strong> {{ c.desc }}</span
                >
              </li>
            </ul>
            <p>
              O resultado é um <strong class="text-primary">preço justo e lucrativo</strong> que
              garante a saúde financeira do seu negócio enquanto mantém a competitividade.
            </p>
          </div>
        </div>
      </div>

      <!-- Dicas Profissionais -->
      <div class="mx-auto max-w-6xl">
        <div
          class="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 p-10 text-white shadow-2xl md:p-16"
        >
          <div class="mb-8 flex items-center gap-4">
            <div class="rounded-xl bg-white/20 p-4">
              <Icon icon="fa6-solid:lightbulb" class="h-8 w-8" />
            </div>
            <h2 class="text-3xl font-black md:text-4xl">💡 Dicas Profissionais</h2>
          </div>
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
              v-for="d in dicas"
              :key="d.title"
              class="rounded-xl bg-white/10 p-6 backdrop-blur-sm"
            >
              <h3 class="mb-3 flex items-center text-xl font-bold">
                <Icon :icon="d.icon" class="mr-2 h-5 w-5" />
                {{ d.title }}
              </h3>
              <p class="text-white/90">{{ d.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

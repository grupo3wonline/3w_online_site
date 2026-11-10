<script setup lang="ts">
import { Icon } from '@iconify/vue';

const emit = defineEmits<{ scrollToCalculator: [] }>();

const benefits = [
  { title: 'Cálculo Preciso do IMC', desc: 'Baseado em padrões da OMS' },
  { title: 'Peso Ideal Personalizado', desc: 'Faixa saudável para seu perfil' },
  { title: 'Plano Nutricional Completo', desc: 'Calorias, proteínas e carboidratos' },
  { title: 'Divisão de Refeições', desc: 'Café, almoço, jantar e lanches' },
  { title: 'Relatório em PDF', desc: 'Baixe e acompanhe seu progresso' },
  { title: '8 Remédios Naturais', desc: 'Dicas para vida saudável' },
];

const stats = [
  { icon: 'fa6-solid:users', value: '10.000+', label: 'Pessoas já transformaram sua saúde' },
  { icon: 'fa6-solid:clock', value: '2 Min', label: 'Tempo médio para resultados' },
  { icon: 'fa6-solid:shield-halved', value: '100%', label: 'Privacidade garantida (LGPD)' },
];
</script>

<template>
  <section
    id="inicio"
    class="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-brand-500 via-teal-600 to-cyan-600 px-4 py-16 text-center text-white dark:from-brand-700 dark:via-teal-800 dark:to-cyan-800"
  >
    <div
      class="absolute inset-0 bg-black/10"
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.15)_1px,transparent_1px)] [background-size:48px_48px]"
      aria-hidden="true"
    />
    <div
      class="absolute left-10 top-20 h-32 w-32 animate-pulse rounded-full bg-white/10 blur-xl"
      aria-hidden="true"
    />
    <div
      class="absolute bottom-20 right-10 h-40 w-40 animate-pulse rounded-full bg-cyan-300/20 blur-xl"
      aria-hidden="true"
    />

    <div
      v-motion
      :initial="{ opacity: 0, y: 30 }"
      :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
      class="relative z-10 mx-auto max-w-6xl"
    >
      <Icon
        icon="fa6-solid:heart-pulse"
        class="mb-6 animate-pulse text-6xl drop-shadow-lg md:text-7xl"
        aria-hidden="true"
      />

      <h1 class="mb-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
        Transforme Sua Saúde em
        <span class="mt-2 block text-yellow-300">Apenas 2 Minutos</span>
      </h1>

      <p class="mx-auto mb-8 max-w-3xl text-lg leading-relaxed opacity-95 md:text-2xl">
        Descubra seu IMC, peso ideal e receba um plano personalizado de nutrição baseado em
        <strong>ciência comprovada</strong>. Totalmente gratuito e 100% privado.
      </p>

      <!-- Estatísticas / prova social -->
      <div class="mx-auto mb-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-xl border border-white/20 bg-white/10 p-5 backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20"
        >
          <Icon
            :icon="stat.icon"
            class="mb-2 text-3xl text-yellow-300"
            aria-hidden="true"
          />
          <div class="text-2xl font-bold md:text-3xl">
            {{ stat.value }}
          </div>
          <div class="text-sm opacity-90">
            {{ stat.label }}
          </div>
        </div>
      </div>

      <!-- O que você recebe -->
      <div
        class="mx-auto mb-10 max-w-4xl rounded-2xl border border-white/30 bg-white/15 p-6 backdrop-blur-md md:p-8"
      >
        <h2 class="mb-6 flex items-center justify-center gap-3 text-xl font-bold md:text-2xl">
          <Icon
            icon="fa6-solid:circle-check"
            class="text-yellow-300"
            aria-hidden="true"
          />
          O Que Você Vai Receber (Grátis)
        </h2>
        <div class="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
          <div
            v-for="b in benefits"
            :key="b.title"
            class="flex items-start gap-3"
          >
            <Icon
              icon="fa6-solid:circle-check"
              class="mt-1 flex-shrink-0 text-yellow-300"
              aria-hidden="true"
            />
            <div>
              <strong>{{ b.title }}</strong>
              <p class="text-sm opacity-90">
                {{ b.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        class="inline-flex items-center gap-3 rounded-full bg-yellow-400 px-8 py-4 text-lg font-bold text-gray-900 shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-yellow-300 md:px-10 md:py-5 md:text-xl"
        @click="emit('scrollToCalculator')"
      >
        <Icon
          icon="fa6-solid:chart-line"
          aria-hidden="true"
        />
        Calcular Agora Grátis
      </button>
      <p class="mt-4 text-sm opacity-90">
        <Icon
          icon="fa6-solid:shield-halved"
          class="mr-1"
          aria-hidden="true"
        />
        Sem cadastro. Sem compartilhamento de dados. 100% privado.
      </p>

      <div class="mt-10 animate-bounce">
        <Icon
          icon="fa6-solid:arrow-down"
          class="text-3xl opacity-75"
          aria-hidden="true"
        />
      </div>
    </div>
  </section>
</template>

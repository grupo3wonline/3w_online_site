<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { company } from '@/config/site'

/**
 * CTA persuasivo com gatilhos de escassez e urgência,
 * direcionando para o Grupo 3w Online (desenvolvimento sob demanda).
 */
withDefaults(defineProps<{ variant?: 'primary' | 'secondary' }>(), {
  variant: 'primary',
})

const benefits = [
  'Desenvolvimento 100% personalizado',
  'Suporte técnico especializado',
  'Soluções escaláveis e seguras',
  'Tecnologias modernas (Vue, Laravel e mais)',
]
</script>

<template>
  <!-- Variante compacta -->
  <div
    v-if="variant === 'secondary'"
    class="rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white shadow-2xl"
  >
    <div class="flex flex-col items-center justify-between gap-6 md:flex-row">
      <div class="flex-1">
        <p
          class="mb-2 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"
        >
          <Icon icon="fa6-solid:fire" aria-hidden="true" /> Vagas limitadas neste mês
        </p>
        <h3 class="mb-2 flex items-center gap-3 text-2xl font-bold">
          <Icon icon="fa6-solid:rocket" aria-hidden="true" />
          Precisa de um sistema personalizado?
        </h3>
        <p class="text-purple-100">
          O {{ company.name }} desenvolve sites e sistemas sob demanda. Garanta seu orçamento antes
          que a agenda feche.
        </p>
      </div>
      <a
        :href="company.cta"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-8 py-4 font-bold text-purple-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-purple-50"
      >
        <span>Falar agora</span>
        <Icon icon="fa6-solid:arrow-right" aria-hidden="true" />
      </a>
    </div>
  </div>

  <!-- Variante completa -->
  <div
    v-else
    class="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 p-8 text-white shadow-2xl md:p-10"
  >
    <div class="pointer-events-none absolute inset-0 opacity-10">
      <div class="absolute left-0 top-0 h-40 w-40 rounded-full bg-purple-500 blur-3xl" />
      <div class="absolute bottom-0 right-0 h-40 w-40 rounded-full bg-indigo-500 blur-3xl" />
    </div>
    <div class="relative z-10 grid items-center gap-8 md:grid-cols-2">
      <div>
        <span
          class="mb-4 inline-flex items-center gap-2 rounded-full bg-purple-500/20 px-4 py-2 text-sm font-semibold text-purple-200"
        >
          <Icon icon="fa6-solid:bolt" aria-hidden="true" /> Oferta por tempo limitado
        </span>
        <h3 class="mb-4 text-3xl font-bold md:text-4xl">Precisa de um sistema personalizado?</h3>
        <p class="mb-4 text-lg text-purple-200">
          O {{ company.name }} desenvolve sites e sistemas sob demanda, totalmente personalizados
          para o seu negócio. As agendas de desenvolvimento têm vagas limitadas por mês.
        </p>
        <ul class="mb-8 space-y-3">
          <li
            v-for="benefit in benefits"
            :key="benefit"
            class="flex items-center gap-3 text-purple-100"
          >
            <Icon icon="fa6-solid:circle-check" class="text-green-400" aria-hidden="true" />
            {{ benefit }}
          </li>
        </ul>
        <a
          :href="company.cta"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-3 rounded-lg bg-white px-8 py-4 font-bold text-purple-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-purple-50"
        >
          <span>Solicitar meu orçamento agora</span>
          <Icon icon="fa6-solid:arrow-right" aria-hidden="true" />
        </a>
        <p class="mt-3 text-xs text-purple-300">
          <Icon icon="fa6-solid:clock" aria-hidden="true" /> Resposta rápida — não perca sua vaga.
        </p>
      </div>
      <div class="hidden md:block">
        <div
          class="space-y-4 rounded-xl border border-purple-500/20 bg-white/10 p-8 backdrop-blur-lg"
        >
          <div class="flex items-center gap-4">
            <div class="rounded-lg bg-purple-500 p-3">
              <Icon icon="fa6-solid:code" class="text-2xl text-white" aria-hidden="true" />
            </div>
            <div>
              <h4 class="font-semibold">Tecnologia de ponta</h4>
              <p class="text-sm text-purple-200">Vue, React, Laravel e mais</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="rounded-lg bg-indigo-500 p-3">
              <Icon icon="fa6-solid:shield-halved" class="text-2xl text-white" aria-hidden="true" />
            </div>
            <div>
              <h4 class="font-semibold">Segurança garantida</h4>
              <p class="text-sm text-purple-200">Conformidade com LGPD/GDPR</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="rounded-lg bg-purple-600 p-3">
              <Icon icon="fa6-solid:headset" class="text-2xl text-white" aria-hidden="true" />
            </div>
            <div>
              <h4 class="font-semibold">Suporte premium</h4>
              <p class="text-sm text-purple-200">Atendimento especializado</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

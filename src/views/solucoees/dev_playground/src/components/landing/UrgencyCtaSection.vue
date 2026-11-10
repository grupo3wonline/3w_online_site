<script setup lang="ts">
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { company } from '@/config/site'

const perks = [
  'Desenvolvimento web profissional',
  'Sistemas sob demanda para o seu negócio',
  'Suporte técnico especializado',
]
</script>

<template>
  <section class="relative overflow-hidden gradient-brand py-20 text-white">
    <div class="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_55%)]" />
    <div class="container-page relative">
      <div class="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-white/10 p-8 backdrop-blur md:p-12">
        <div class="grid items-center gap-8 md:grid-cols-2">
          <div>
            <span class="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
              <Icon icon="lucide:flame" class="h-4 w-4 text-amber-300" />
              Vagas limitadas neste mês
            </span>
            <h2 class="mb-4 text-3xl font-bold md:text-4xl">
              Precisa de um Sistema Personalizado?
            </h2>
            <p class="mb-6 text-white/90">
              A <strong>{{ company.name }}</strong> transforma suas ideias em soluções digitais
              eficientes e escaláveis. Mais de {{ company.yearsExperience }} anos de experiência.
              <strong>Garanta seu orçamento antes que as vagas acabem.</strong>
            </p>
            <ul class="space-y-2">
              <li v-for="perk in perks" :key="perk" class="flex items-center gap-2">
                <Icon icon="lucide:check-circle-2" class="h-5 w-5 text-emerald-300" />
                <span>{{ perk }}</span>
              </li>
            </ul>
          </div>

          <div class="text-center">
            <div class="mb-6 rounded-2xl bg-white/15 p-8">
              <Icon icon="lucide:rocket" class="mx-auto mb-4 h-16 w-16" />
              <p class="text-2xl font-bold">Solicite um Orçamento</p>
              <p class="mt-1 text-sm text-white/80">Resposta em até 24h úteis</p>
            </div>
            <a :href="company.site" target="_blank" rel="noopener noreferrer">
              <BaseButton size="lg" variant="white" block>
                <Icon icon="lucide:external-link" class="h-5 w-5" />
                Quero meu Orçamento Agora
              </BaseButton>
            </a>
            <p class="mt-3 text-xs text-white/70">
              <Icon icon="lucide:shield-check" class="mr-1 inline h-3 w-3" />
              Atendimento personalizado e sem compromisso
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

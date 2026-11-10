<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const benefits = [
  { icon: 'fa6-solid:stopwatch', text: 'Economize horas de trabalho manual' },
  { icon: 'fa6-solid:chart-pie', text: 'Aumente sua margem de lucro em até 30%' },
  { icon: 'fa6-solid:brain', text: 'Tome decisões baseadas em dados reais' },
  { icon: 'fa6-solid:trophy', text: 'Destaque-se da concorrência' },
  { icon: 'fa6-solid:handshake', text: 'Precifique com confiança e profissionalismo' },
  { icon: 'fa6-solid:rocket', text: 'Escale seu negócio de forma sustentável' },
]
</script>

<template>
  <section id="beneficios" class="bg-gradient-to-br from-violet-600 to-purple-600 py-20 text-white">
    <div class="container">
      <div class="mx-auto max-w-4xl space-y-12 text-center">
        <div class="space-y-4">
          <h2 class="text-3xl font-black md:text-5xl">Transforme Seu Negócio Hoje</h2>
          <p class="text-xl text-white/90">
            Junte-se aos milhares de empreendedores que já aumentaram seus lucros
          </p>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div
            v-for="benefit in benefits"
            :key="benefit.text"
            class="flex items-center gap-4 rounded-xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
          >
            <div class="rounded-lg bg-white/20 p-3">
              <Icon :icon="benefit.icon" class="h-6 w-6" />
            </div>
            <span class="text-left text-lg font-medium">{{ benefit.text }}</span>
          </div>
        </div>

        <div class="pt-4">
          <RouterLink
            to="/calculadora"
            class="inline-flex items-center gap-3 rounded-xl bg-white px-10 py-4 text-lg font-bold text-violet-600 shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-slate-100"
          >
            <Icon icon="fa6-solid:rocket" class="h-5 w-5" />
            Começar Agora — É Grátis!
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

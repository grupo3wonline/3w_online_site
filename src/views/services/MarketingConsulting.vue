<template>
  <div>
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Consultoria em Marketing' }]" />
        <h1 class="page-hero-title">Consultoria em Marketing</h1>
        <p class="page-hero-subtitle">Estratégias personalizadas para otimizar seus resultados em marketing digital</p>
      </div>
    </section>

    <!-- Content + Image -->
    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Estratégias que geram resultados</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">
              Nossos consultores em marketing digital oferecem análises profundas e estratégias
              personalizadas para otimizar seus investimentos em marketing. Identificamos oportunidades,
              corrigimos falhas e criamos o plano de ação perfeito para seu negócio.
            </p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollTo" class="btn-primary text-sm">
                <Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço
              </button>
              <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Consultoria em Marketing." target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
                <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp
              </a>
            </div>
          </div>
          <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Consultoria em Marketing" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- Process Steps -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Processo de consultoria</h2>
          <p class="section-subtitle">Metodologia orientada para resultados consistentes</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
          <div v-for="(step, i) in steps" :key="i" class="text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">{{ i + 1 }}</div>
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ step.title }}</h4>
            <p class="text-[11px] text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section ref="simRef" class="section-padding">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="consulting" />
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para otimizar seu marketing?</h2>
        <p class="text-sm text-blue-200 mb-6">Agende uma consultoria e descubra como melhorar seus resultados.</p>
        <RouterLink to="/contato" class="btn-secondary text-sm">
          <Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Solicitar Orçamento
        </RouterLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'

const simRef = ref<HTMLElement>()
const scrollTo = () => simRef.value?.scrollIntoView({ behavior: 'smooth' })

const benefits = [
  'Auditoria completa do marketing atual',
  'Plano estratégico personalizado',
  'Análise de concorrência',
  'Definição de KPIs e métricas',
  'Acompanhamento mensal de avanço',
]

const steps = [
  { title: 'Diagnóstico', desc: 'Análise completa da situação atual do marketing' },
  { title: 'Estratégia', desc: 'Desenvolvimento do plano de ação personalizado' },
  { title: 'Implementação', desc: 'Execução e suporte nas ações definidas' },
  { title: 'Monitoramento', desc: 'Acompanhamento de resultados e otimização' },
]
</script>

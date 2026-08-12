<template>
  <div>
    <section class="page-hero"><div class="container">
      <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Relações Públicas' }]" />
      <h1 class="page-hero-title">Relações Públicas</h1>
      <p class="page-hero-subtitle">Assessoria de imprensa e gestão da comunicação corporativa</p>
    </div></section>
    <section class="section-padding"><div class="container"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Construa uma reputação sólida</h2>
        <p class="text-sm text-gray-600 leading-relaxed mb-5">Nossa equipe de relações públicas gerencia sua comunicação corporativa, assessoria de imprensa e relacionamento com a mídia para construir e proteger a reputação da sua marca.</p>
        <ul class="space-y-2.5 mb-6"><li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700"><Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}</li></ul>
        <div class="flex flex-wrap gap-3">
          <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
          <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Relações Públicas." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
        </div>
      </div>
      <img src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Relações Públicas" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
    </div></div></section>
    <section ref="simRef" class="section-padding bg-gray-50"><div class="container max-w-4xl mx-auto"><PriceSimulator service-type="pr" /></div></section>

    <!-- FAQ -->
    <section class="section-padding">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre relações públicas</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="cta-section"><div class="container text-center"><h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para fortalecer sua imagem?</h2><p class="text-sm text-blue-200 mb-6">Conte com nossa assessoria para uma comunicação profissional</p><RouterLink to="/contato" class="btn-secondary text-sm"><Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Solicitar Orçamento</RouterLink></div></section>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import FaqAccordion from '@/components/ui/FaqAccordion.vue'
const simRef = ref<HTMLElement>()
const scrollTo = () => simRef.value?.scrollIntoView({ behavior: 'smooth' })
const benefits = ['Assessoria de imprensa completa', 'Gestão de crises', 'Relacionamento com a mídia', 'Comunicação corporativa', 'Eventos e ações institucionais']
const faqs = [
  { question: 'O que é assessoria de imprensa?', answer: 'É o serviço de intermediação entre sua empresa e os veículos de comunicação, gerando pautas, releases e oportunidades de exposição positiva na mídia.' },
  { question: 'Vocês ajudam em gestão de crise?', answer: 'Sim! Temos protocolos para gestão de crise de imagem, incluindo monitoramento, resposta rápida, comunicados oficiais e estratégia de recuperação de reputação.' },
  { question: 'Para quais mídias vocês fazem assessoria?', answer: 'Trabalhamos com todas as mídias: jornais, revistas, portais online, rádio, TV, podcasts e influenciadores digitais, conforme a estratégia definida.' },
  { question: 'Quanto tempo leva para ver resultados em RP?', answer: 'As primeiras publicações e menções na mídia podem ocorrer em 2-4 semanas. A construção de reputação sólida é um trabalho contínuo que se fortalece ao longo dos meses.' },
  { question: 'Vocês organizam eventos corporativos?', answer: 'Sim! Planejamos e executamos eventos corporativos, coletivas de imprensa, lançamentos de produtos e ações institucionais completas.' },
]
</script>

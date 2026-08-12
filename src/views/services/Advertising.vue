<template>
  <div>
    <section class="page-hero"><div class="container">
      <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Publicidade e Propaganda' }]" />
      <h1 class="page-hero-title">Publicidade e Propaganda</h1>
      <p class="page-hero-subtitle">Campanhas publicitárias integradas para online e offline</p>
    </div></section>
    <section class="section-padding"><div class="container"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Campanhas que geram impacto</h2>
        <p class="text-sm text-gray-600 leading-relaxed mb-5">Desenvolvemos campanhas publicitárias completas que integram canais online e offline para maximizar o alcance e o impacto da sua mensagem.</p>
        <ul class="space-y-2.5 mb-6"><li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700"><Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}</li></ul>
        <div class="flex flex-wrap gap-3">
          <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
          <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Publicidade e Propaganda." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
        </div>
      </div>
      <img src="https://images.pexels.com/photos/3184460/pexels-photo-3184460.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Publicidade" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
    </div></div></section>
    <section ref="simRef" class="section-padding bg-gray-50"><div class="container max-w-4xl mx-auto"><PriceSimulator service-type="advertising" /></div></section>

    <!-- FAQ -->
    <section class="section-padding">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre publicidade e propaganda</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="cta-section"><div class="container text-center"><h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para aumentar suas vendas?</h2><p class="text-sm text-blue-200 mb-6">Comece hoje com nossas campanhas otimizadas</p><RouterLink to="/contato" class="btn-secondary text-sm"><Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Solicitar Orçamento</RouterLink></div></section>
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
const benefits = ['Planejamento estratégico de mídia', 'Criação de campanhas online e offline', 'Produção de material publicitário', 'Gestão de veiculação', 'Análise de resultados e ROI']
const faqs = [
  { question: 'Vocês trabalham com publicidade online e offline?', answer: 'Sim! Criamos campanhas integradas que combinam canais digitais (Google, redes sociais, programática) com mídias tradicionais (TV, rádio, outdoor, revista).' },
  { question: 'Qual o investimento mínimo para uma campanha?', answer: 'Depende dos canais escolhidos e abrangência geográfica. Campanhas digitais podem começar com investimentos menores, enquanto offline geralmente demanda orçamentos maiores.' },
  { question: 'Vocês produzem os materiais publicitários?', answer: 'Sim! Nossa equipe cuida de toda a produção, desde a criação de peças gráficas e vídeos até a adaptação para diferentes formatos e canais.' },
  { question: 'Como medem o resultado das campanhas?', answer: 'Utilizamos ferramentas de analytics, códigos de rastreamento, pesquisas de recall e métricas de conversão para mensurar o impacto real de cada campanha.' },
  { question: 'Posso contratar apenas a criação sem a veiculação?', answer: 'Sim! Oferecemos serviços modulares — você pode contratar apenas a criação, apenas a gestão de mídia ou o pacote completo conforme sua necessidade.' },
]
</script>

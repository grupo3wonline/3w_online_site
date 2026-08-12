<template>
  <div>
    <section class="page-hero"><div class="container">
      <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Planejamento de Campanhas' }]" />
      <h1 class="page-hero-title">Planejamento de Campanhas</h1>
      <p class="page-hero-subtitle">Campanhas publicitárias integradas e eficientes para seu negócio</p>
    </div></section>
    <section class="section-padding"><div class="container"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Planejamento estratégico de campanhas</h2>
        <p class="text-sm text-gray-600 leading-relaxed mb-5">Desenvolvemos o planejamento completo das suas campanhas publicitárias, desde a definição de objetivos até a mensuração de resultados.</p>
        <ul class="space-y-2.5 mb-6"><li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700"><Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}</li></ul>
        <div class="flex flex-wrap gap-3">
          <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
          <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Planejamento de Campanhas." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
        </div>
      </div>
      <img src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Planejamento de Campanhas" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
    </div></div></section>
    <section ref="simRef" class="section-padding bg-gray-50"><div class="container max-w-4xl mx-auto"><PriceSimulator service-type="campaign" /></div></section>

    <!-- FAQ -->
    <section class="section-padding">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre planejamento de campanhas</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="cta-section"><div class="container text-center"><h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para planejar sua próxima campanha?</h2><p class="text-sm text-blue-200 mb-6">Conte com nossa expertise para resultados extraordinários</p><RouterLink to="/contato" class="btn-secondary text-sm"><Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Solicitar Orçamento</RouterLink></div></section>
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
const benefits = ['Definição de público-alvo e personas', 'Estratégia de mídia multicanal', 'Cronograma detalhado de execução', 'Orçamento otimizado', 'Métricas e KPIs de acompanhamento']
const faqs = [
  { question: 'O que inclui o planejamento de campanhas?', answer: 'Inclui definição de público-alvo, escolha de canais, criação de cronograma, definição de orçamento, criação de mensagens-chave e métricas de acompanhamento.' },
  { question: 'Vocês executam a campanha ou apenas planejam?', answer: 'Oferecemos ambas as opções. Podemos entregar o plano completo para execução interna ou cuidar de toda a execução junto com o planejamento.' },
  { question: 'Para quais canais vocês planejam campanhas?', answer: 'Planejamos para todos os canais digitais (Google, redes sociais, e-mail marketing) e offline (rádio, TV, outdoor, material impresso) conforme a estratégia.' },
  { question: 'Quanto tempo leva para receber o planejamento?', answer: 'O planejamento completo é entregue em 7-15 dias após o briefing e levantamento de informações sobre o negócio e objetivos.' },
  { question: 'Como vocês definem o orçamento ideal?', answer: 'Analisamos o mercado, concorrência, objetivos e histórico de resultados para recomendar um investimento realista e com potencial de retorno mensurável.' },
]
</script>

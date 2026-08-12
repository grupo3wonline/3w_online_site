<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Gestão de Anúncios' }]" />
        <h1 class="page-hero-title">Gestão de Anúncios</h1>
        <p class="page-hero-subtitle">Maximize seu ROI com campanhas de Google Ads e Meta Ads otimizadas</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Anúncios que realmente convertem</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">
              Nossa equipe de mídia paga gerencia campanhas no Google Ads e Meta Ads (Facebook e Instagram)
              para gerar leads qualificados e vendas para sua empresa.
            </p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
              <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Gestão de Anúncios." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
            </div>
          </div>
          <img src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Gestão de Anúncios" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- Platforms -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Plataformas</span>
          <h2 class="section-title">Plataformas que dominamos</h2>
          <p class="section-subtitle">Expertise em todas as principais plataformas de anúncios</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-3">Google Ads</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Campanhas de pesquisa</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Display e remarketing</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> YouTube Ads</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Shopping Ads</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Performance Max</li>
            </ul>
          </div>
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-3">Meta Ads</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Facebook Ads</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Instagram Ads</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Stories e Reels</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Messenger Ads</li>
              <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-primary-600" /> Audience Network</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Metodologia</span>
          <h2 class="section-title">Como gerenciamos suas campanhas</h2>
          <p class="section-subtitle">Processo otimizado para máximo retorno</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div v-for="(step, i) in processSteps" :key="i" class="text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">{{ i + 1 }}</div>
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ step.title }}</h4>
            <p class="text-[11px] text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Results / Differentials -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Resultados</span>
          <h2 class="section-title">Por que nossa gestão é diferente</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div v-for="d in differentials" :key="d.title" class="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <Icon :icon="d.icon" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 class="text-xs font-semibold text-gray-900">{{ d.title }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ d.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section ref="simRef" class="section-padding">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="ads" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-gray-50">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre gestão de anúncios</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para aumentar suas vendas?</h2>
        <p class="text-sm text-blue-200 mb-6">Comece hoje mesmo a gerar leads qualificados com nossas campanhas otimizadas</p>
        <RouterLink to="/contato" class="btn-secondary text-sm"><Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Solicitar Orçamento</RouterLink>
      </div>
    </section>
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

const benefits = ['Campanhas em múltiplas plataformas', 'Segmentação avançada de público', 'Monitoramento e otimização diária', 'Relatórios detalhados de performance', 'Método de aquisição inteligente']

const processSteps = [
  { title: 'Pesquisa', desc: 'Análise de mercado, concorrência e público-alvo' },
  { title: 'Configuração', desc: 'Setup de campanhas, pixels e conversões' },
  { title: 'Otimização', desc: 'Testes A/B, ajustes de lance e segmentação' },
  { title: 'Escalada', desc: 'Aumento de investimento nas campanhas que funcionam' },
]

const differentials = [
  { title: 'Otimização Diária', icon: 'mdi:chart-timeline-variant', desc: 'Monitoramos e ajustamos todos os dias' },
  { title: 'Sem Desperdício', icon: 'mdi:cash-lock', desc: 'Cada real investido com propósito' },
  { title: 'Relatórios Claros', icon: 'mdi:file-chart', desc: 'Dados que você entende' },
  { title: 'ROI Focado', icon: 'mdi:target', desc: 'Foco em conversões reais' },
]

const faqs = [
  { question: 'Qual o investimento mínimo em anúncios?', answer: 'Recomendamos um investimento mínimo de R$ 1.000/mês em mídia para resultados consistentes. O valor da gestão é separado do valor investido nas plataformas.' },
  { question: 'Quanto tempo para ver resultados nos anúncios?', answer: 'Os primeiros resultados aparecem nas primeiras 48-72 horas. A otimização completa das campanhas leva de 2-4 semanas para atingir a performance ideal.' },
  { question: 'Vocês gerenciam Google Ads e Meta Ads ao mesmo tempo?', answer: 'Sim! Gerenciamos campanhas em ambas as plataformas simultaneamente, distribuindo o investimento de forma estratégica conforme o perfil do seu negócio.' },
  { question: 'Como funciona o relatório de performance?', answer: 'Enviamos relatórios semanais com métricas de desempenho (cliques, conversões, custo por lead) e relatórios mensais completos com análises e recomendações.' },
  { question: 'Existe fidelidade no contrato de gestão de anúncios?', answer: 'Não exigimos fidelidade. Recomendamos no mínimo 3 meses para otimização completa, mas você pode cancelar quando desejar.' },
]
</script>

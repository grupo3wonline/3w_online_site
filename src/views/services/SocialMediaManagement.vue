<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Gestão de Redes Sociais' }]" />
        <h1 class="page-hero-title">Gestão de Redes Sociais</h1>
        <p class="page-hero-subtitle">Tenha uma presença online relevante e que gere resultados reais para o seu negócio</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Sua marca merece destaque nas redes sociais</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">
              Criamos e gerenciamos conteúdo para suas redes sociais com estratégia,
              criatividade e foco em engajamento e crescimento orgânico.
            </p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
              <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Gestão de Redes Sociais." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
            </div>
          </div>
          <img src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Redes Sociais" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Como funciona nosso processo</h2>
          <p class="section-subtitle">Estratégia completa e personalizada</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div v-for="(step, i) in steps" :key="i" class="text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">{{ i + 1 }}</div>
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ step.title }}</h4>
            <p class="text-[11px] text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Packages -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Pacotes de Gestão</h2>
          <p class="section-subtitle">Escolha o melhor para seu negócio</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div v-for="pkg in packages" :key="pkg.title" class="bg-white rounded-xl border-2 border-gray-100 hover:border-primary-300 p-6 text-center shadow-sm transition-all">
            <h3 class="font-bold text-gray-900 mb-1">{{ pkg.title }}</h3>
            <p class="text-xs text-gray-500 mb-4">{{ pkg.desc }}</p>
            <p class="text-xl font-bold text-primary-600">{{ pkg.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section ref="simRef" class="section-padding bg-gray-50">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="social-media" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="section-title">Perguntas Frequentes</h2>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para dominar as redes sociais?</h2>
        <p class="text-sm text-blue-200 mb-6">Comece agora e transforme a presença digital da sua marca</p>
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

const benefits = ['Planejamento de conteúdo mensal', 'Criação de posts profissionais', 'Engajamento com seguidores', 'Relatórios de performance', 'Estratégia de crescimento orgânico']

const steps = [
  { title: 'Briefing', desc: 'Entendemos sua marca e público' },
  { title: 'Planejamento', desc: 'Calendário de conteúdo mensal' },
  { title: 'Execução', desc: 'Criação e publicação de posts' },
  { title: 'Resultados', desc: 'Relatórios e otimização contínua' },
]

const packages = [
  { title: '1 Rede Social', desc: 'Ideal para começar', price: 'R$ 1.000/mês' },
  { title: '2-3 Redes Sociais', desc: 'Mais alcance e presença', price: 'R$ 1.700/mês' },
  { title: '4+ Redes Sociais', desc: 'Cobertura completa', price: 'R$ 1.900/mês' },
]

const faqs = [
  { question: 'Quanto tempo para ver resultados?', answer: 'Os primeiros resultados de engajamento aparecem em 2-4 semanas. Crescimento orgânico consistente leva de 2-3 meses.' },
  { question: 'Com quantas redes vocês trabalham?', answer: 'Trabalhamos com todas as principais: Instagram, Facebook, LinkedIn, TikTok, Twitter e YouTube.' },
  { question: 'Vocês criam o conteúdo ou eu preciso fornecer?', answer: 'Nós criamos todo o conteúdo! Desde textos até design das peças. Só precisamos de fotos e informações da empresa.' },
  { question: 'O processo é totalmente delegado?', answer: 'Sim! Você aprova o planejamento mensal e nós cuidamos de tudo. Enviamos relatórios mensais de resultados.' },
  { question: 'Existe fidelidade no contrato?', answer: 'Não trabalhamos com fidelidade. Recomendamos no mínimo 3 meses para resultados consistentes, mas sem obrigação.' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Criação de Sites' }]" />
        <h1 class="page-hero-title">Criação de Sites</h1>
        <p class="page-hero-subtitle">Sites profissionais, responsivos e otimizados para conversão</p>
      </div>
    </section>

    <!-- Content + Image -->
    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Seu site é sua vitrine digital</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">
              Desenvolvemos sites modernos, responsivos e com SEO que convertem visitantes em clientes.
              Nossa equipe utiliza as melhores tecnologias para criar experiências digitais excepcionais.
            </p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" />
                {{ b }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollToSimulator" class="btn-primary text-sm">
                <Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço
              </button>
              <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Criação de Sites." target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm">
                <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp
              </a>
            </div>
          </div>
          <img src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Criação de Sites" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- Types -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Soluções</span>
          <h2 class="section-title">Tipos de sites que desenvolvemos</h2>
          <p class="section-subtitle">Soluções personalizadas para cada necessidade</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div v-for="t in types" :key="t.title" class="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm hover:shadow-md transition-shadow">
            <h3 class="text-sm font-bold text-gray-900 mb-2">{{ t.title }}</h3>
            <p class="text-xs text-gray-500 mb-3">{{ t.desc }}</p>
            <p class="text-sm font-bold text-primary-600">{{ t.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Technology -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Tecnologia</span>
          <h2 class="section-title">Stack moderna e robusta</h2>
          <p class="section-subtitle">Usamos as melhores tecnologias do mercado</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-4xl mx-auto">
          <div v-for="tech in techStack" :key="tech.title" class="text-center p-4 bg-gray-50 rounded-xl">
            <Icon :icon="tech.icon" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 class="text-xs font-semibold text-gray-900 mb-1">{{ tech.title }}</h4>
            <p class="text-[10px] text-gray-500">{{ tech.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Metodologia</span>
          <h2 class="section-title">Nosso processo de desenvolvimento</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div v-for="(s, i) in process" :key="i" class="text-center">
            <div class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">{{ i + 1 }}</div>
            <h4 class="text-xs font-semibold text-gray-900">{{ s.title }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section ref="simulatorRef" class="section-padding">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="website" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-gray-50">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre criação de sites</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para ter seu site profissional?</h2>
        <p class="text-sm text-blue-200 mb-6">Entre em contato e transforme sua presença digital hoje mesmo</p>
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
import FaqAccordion from '@/components/ui/FaqAccordion.vue'

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const benefits = ['Design responsivo e moderno', 'Otimização para SEO', 'Carregamento rápido', 'Painel administrativo intuitivo', 'Integração com ferramentas de marketing']

const techStack = [
  { title: 'Frontend Moderno', icon: 'mdi:language-javascript', desc: 'Vue.js, React, HTML5/CSS3 para experiências rápidas e fluidas' },
  { title: 'Backend Robusto', icon: 'mdi:server', desc: 'PHP, Node.js, Python com arquitetura escalável' },
  { title: 'Performance', icon: 'mdi:speedometer', desc: 'Carregamento em menos de 3 segundos (Core Web Vitals)' },
  { title: 'Segurança', icon: 'mdi:shield-lock', desc: 'SSL, proteção contra ataques e LGPD compliance' },
]

const process = [
  { title: 'Briefing', desc: 'Entendemos seu negócio e objetivos' },
  { title: 'Layout', desc: 'Criação do design e aprovação' },
  { title: 'Desenvolvimento', desc: 'Codificação e implementação' },
  { title: 'Testes', desc: 'QA em todos os dispositivos' },
  { title: 'Entrega', desc: 'Publicação e treinamento' },
]

const faqs = [
  { question: 'Quanto tempo leva para criar um site?', answer: 'Um site institucional leva de 15 a 30 dias. E-commerces e sistemas web podem levar de 45 a 90 dias dependendo da complexidade.' },
  { question: 'O site é responsivo (funciona no celular)?', answer: 'Sim! Todos os nossos sites são 100% responsivos, adaptando-se perfeitamente a celulares, tablets e desktops.' },
  { question: 'O site já vem otimizado para Google (SEO)?', answer: 'Sim! Aplicamos as melhores práticas de SEO técnico, como meta tags, velocidade de carregamento, URLs amigáveis e estrutura semântica.' },
  { question: 'Consigo editar o conteúdo do site depois?', answer: 'Sim! Entregamos o site com um painel administrativo intuitivo para que você possa atualizar textos, imagens e produtos com facilidade.' },
  { question: 'Vocês oferecem hospedagem e domínio?', answer: 'Sim! Oferecemos planos de hospedagem e auxiliamos no registro de domínio. O valor é informado durante o orçamento.' },
]

const types = [
  { title: 'Site Institucional', desc: 'Apresente sua empresa profissionalmente', price: 'A partir de R$ 1.200' },
  { title: 'E-commerce', desc: 'Venda online com segurança', price: 'A partir de R$ 7.000' },
  { title: 'Blog/Portal', desc: 'Compartilhe conteúdo e atraia audiência', price: 'A partir de R$ 2.500' },
  { title: 'Sistema Web', desc: 'Soluções personalizadas', price: 'A partir de R$ 5.000' },
]
</script>

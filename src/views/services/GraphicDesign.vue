<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Design Gráfico' }]" />
        <h1 class="page-hero-title">Design Gráfico</h1>
        <p class="page-hero-subtitle">Identidade visual, materiais gráficos e peças publicitárias criativas</p>
      </div>
    </section>
    <section class="section-padding">
      <div class="container"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Design que comunica e converte</h2>
          <p class="text-sm text-gray-600 leading-relaxed mb-5">Criamos identidades visuais marcantes e materiais gráficos que fortalecem sua marca. Nossa equipe de designers combina criatividade com estratégia para entregar peças que realmente se conectam com seu público.</p>
          <ul class="space-y-2.5 mb-6">
            <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700"><Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}</li>
          </ul>
          <div class="flex flex-wrap gap-3">
            <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
            <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Design Gráfico." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
          </div>
        </div>
        <img src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Design Gráfico" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
      </div></div>
    </section>
    <section class="section-padding bg-gray-50">
      <div class="container"><div class="text-center mb-10"><span class="section-label">Soluções</span><h2 class="section-title">Nossos serviços de design</h2><p class="section-subtitle">Soluções completas para todas as necessidades visuais</p></div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
        <div v-for="s in designServices" :key="s.title" class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <h3 class="text-sm font-bold text-gray-900 mb-1">{{ s.title }}</h3>
          <p class="text-xs text-gray-500 mb-2">{{ s.desc }}</p>
          <p class="text-sm font-bold text-primary-600">{{ s.price }}</p>
        </div>
      </div></div>
    </section>

    <!-- Process -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Metodologia</span>
          <h2 class="section-title">Como desenvolvemos seu design</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-3xl mx-auto">
          <div v-for="(s, i) in process" :key="i" class="text-center">
            <div class="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-2 text-sm font-bold">{{ i + 1 }}</div>
            <h4 class="text-xs font-semibold text-gray-900">{{ s.title }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section ref="simRef" class="section-padding"><div class="container max-w-4xl mx-auto"><PriceSimulator service-type="design" /></div></section>

    <!-- FAQ -->
    <section class="section-padding bg-gray-50">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre design gráfico</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="cta-section"><div class="container text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para fortalecer sua identidade visual?</h2>
      <p class="text-sm text-blue-200 mb-6">Vamos criar um design que represente verdadeiramente sua marca</p>
      <RouterLink to="/contato" class="btn-secondary text-sm"><Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Solicitar Orçamento</RouterLink>
    </div></section>
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
const benefits = ['Identidade visual completa', 'Materiais para redes sociais', 'Peças publicitárias criativas', 'Manual de marca', 'Materiais para web e digital']

const process = [
  { title: 'Briefing', desc: 'Entendemos sua marca e referências visuais' },
  { title: 'Conceito', desc: 'Desenvolvimento de propostas criativas' },
  { title: 'Refinamento', desc: 'Ajustes e aprovação do cliente' },
  { title: 'Entrega', desc: 'Arquivos finais em todos os formatos' },
]
const faqs = [
  { question: 'O que inclui uma identidade visual?', answer: 'Inclui logotipo, paleta de cores, tipografia, elementos gráficos e um manual de marca com as diretrizes de aplicação em diferentes mídias.' },
  { question: 'Quantas opções de logo vocês apresentam?', answer: 'Apresentamos 3 propostas iniciais de logotipo. Após a escolha, realizamos até 3 rodadas de ajustes para chegar ao resultado ideal.' },
  { question: 'Vocês criam materiais para redes sociais?', answer: 'Sim! Criamos templates, posts, stories, capas e todos os materiais visuais necessários para uma presença profissional nas redes sociais.' },
  { question: 'Em quanto tempo entregam um projeto de design?', answer: 'Identidades visuais levam de 7-15 dias. Materiais avulsos como posts e folders são entregues em 2-5 dias úteis conforme a complexidade.' },
  { question: 'Recebo os arquivos editáveis?', answer: 'Sim! Entregamos todos os arquivos nos formatos necessários (AI, PSD, PDF, PNG, SVG) além dos arquivos editáveis para uso futuro.' },
]
const designServices = [
  { title: 'Identidade Visual', desc: 'Logo, cores, tipografia e elementos gráficos', price: 'A partir de R$ 1.500' },
  { title: 'Social Media', desc: 'Posts, stories e templates para redes sociais', price: 'A partir de R$ 600' },
  { title: 'Material Impresso', desc: 'Cartões, folders, catálogos e materiais gráficos', price: 'A partir de R$ 500' },
  { title: 'Embalagens', desc: 'Design de embalagens atrativas para produtos', price: 'A partir de R$ 1.200' },
  { title: 'Apresentações', desc: 'Slides profissionais para suas reuniões', price: 'A partir de R$ 600' },
  { title: 'Sinalização', desc: 'Placas, banners e materiais de sinalização', price: 'A partir de R$ 400' },
]
</script>

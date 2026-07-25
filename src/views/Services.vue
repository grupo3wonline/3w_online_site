<template>
  <div>
    <!-- Hero — Dark Navy -->
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços' }]" />
        <h1 class="page-hero-title">Soluções Digitais Completas</h1>
        <p class="page-hero-subtitle">Encontre o serviço que seu negócio precisa. Nossas soluções em marketing digital, desenvolvimento e criação geram resultados reais.</p>
        <div class="flex flex-wrap gap-3 mt-6">
          <RouterLink to="/contato" class="btn-primary !bg-primary-500 hover:!bg-primary-600 text-sm">Orçamento</RouterLink>
          <a href="https://wa.me/5541996924829" target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1" /> Contato</a>
        </div>
      </div>
    </section>

    <!-- Alert Badge -->
    <div class="bg-primary-50 border-b border-primary-100 py-3">
      <div class="container flex items-center justify-center gap-2 text-xs text-primary-700">
        <Icon icon="mdi:shield-check" class="w-4 h-4 text-green-600" />
        <span>Mais de <strong>150 projetos entregues</strong> com 98% de aprovação</span>
        <span class="hidden sm:inline">| Fale com um especialista pelo WhatsApp</span>
      </div>
    </div>

    <!-- Services Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="service in services" :key="service.id" class="service-card">
            <div class="w-11 h-11 rounded-full flex items-center justify-center mb-3" :class="service.iconBg">
              <Icon :icon="service.icon" class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-1">{{ service.title }}</h3>
            <p class="text-xs text-gray-500 mb-3 leading-relaxed">{{ service.description }}</p>
            <div class="flex items-center justify-between mb-3">
              <span class="text-[11px] text-gray-400">A partir de</span>
              <span class="text-sm font-bold text-primary-600">{{ service.price }}</span>
            </div>
            <RouterLink :to="service.link" class="block w-full text-center bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-colors">
              Saiba Mais
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Por que escolher nossos serviços?</h2>
          <p class="section-subtitle">Entregamos mais do que promessas — entregamos resultados.</p>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="d in diffs" :key="d.title" class="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
            <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Icon :icon="d.icon" class="w-5 h-5 text-primary-600" />
            </div>
            <h4 class="font-semibold text-gray-900 text-xs mb-1">{{ d.title }}</h4>
            <p class="text-[11px] text-gray-500">{{ d.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Calculator Teaser -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-8">
          <span class="section-label">Simulador</span>
          <h2 class="section-title">Quanto vai custar o seu projeto?</h2>
          <p class="section-subtitle">Use nosso calculador para uma estimativa em menos de 60 segundos.</p>
        </div>
        <div class="max-w-4xl mx-auto">
          <PriceSimulator service-type="website" />
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Não encontrou o que procura?</h2>
        <p class="text-sm text-blue-200 mb-6">Criamos soluções personalizadas. Entre em contato e conte o que precisa.</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm">Falar com Especialista</RouterLink>
          <a href="https://wa.me/5541996924829" target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> WhatsApp</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'

const services = [
  { id: 0, title: 'Marketing Digital', description: 'Pacote completo de gestão de anúncios e redes sociais.', price: 'R$ 500/mês', icon: 'mdi:star', iconBg: 'bg-yellow-500', link: '/servicos/marketing-digital' },
  { id: 1, title: 'Gestão de Redes Sociais', description: 'Estratégia, conteúdo e gestão completa das redes.', price: 'R$ 800/mês', icon: 'mdi:instagram', iconBg: 'bg-pink-500', link: '/servicos/gestao-redes-sociais' },
  { id: 2, title: 'Gestão de Anúncios', description: 'Google Ads e Meta Ads com foco em ROI.', price: 'R$ 1.200/mês', icon: 'mdi:bullseye-arrow', iconBg: 'bg-green-500', link: '/servicos/gestao-anuncios' },
  { id: 3, title: 'Criação de Sites', description: 'Sites responsivos e otimizados para conversão.', price: 'R$ 2.500', icon: 'mdi:web', iconBg: 'bg-blue-500', link: '/servicos/criacao-sites' },
  { id: 4, title: 'Criação de Sistemas', description: 'Sistemas personalizados para automatizar processos.', price: 'R$ 15.000', icon: 'mdi:cog', iconBg: 'bg-indigo-500', link: '/servicos/criacao-sistemas' },
  { id: 5, title: 'Desenvolvimento de Apps', description: 'Apps mobile modernos para iOS e Android.', price: 'R$ 12.000', icon: 'mdi:cellphone', iconBg: 'bg-purple-500', link: '/servicos/desenvolvimento-apps' },
  { id: 6, title: 'Consultoria em Marketing', description: 'Estratégias personalizadas para otimizar resultados.', price: 'R$ 2.500/mês', icon: 'mdi:lightbulb', iconBg: 'bg-amber-500', link: '/servicos/consultoria-marketing' },
  { id: 7, title: 'Planejamento de Campanhas', description: 'Campanhas publicitárias integradas e eficientes.', price: 'R$ 4.500', icon: 'mdi:file-document', iconBg: 'bg-teal-500', link: '/servicos/planejamento-campanhas' },
  { id: 8, title: 'Design Gráfico', description: 'Identidade visual e peças criativas.', price: 'R$ 1.800', icon: 'mdi:palette', iconBg: 'bg-orange-500', link: '/servicos/design-grafico' },
  { id: 9, title: 'Publicidade e Propaganda', description: 'Campanhas integradas para online e offline.', price: 'R$ 6.000', icon: 'mdi:bullhorn', iconBg: 'bg-red-500', link: '/servicos/publicidade' },
  { id: 10, title: 'Organização Comercial', description: 'Processos comerciais e otimização de vendas.', price: 'R$ 3.500', icon: 'mdi:briefcase', iconBg: 'bg-slate-500', link: '/servicos/organizacao-comercial' },
  { id: 11, title: 'Relações Públicas', description: 'Assessoria de imprensa e comunicação corporativa.', price: 'R$ 2.800/mês', icon: 'mdi:account-group', iconBg: 'bg-cyan-500', link: '/servicos/relacoes-publicas' },
  { id: 12, title: 'Automação e IA', description: 'Chatbots, automação de processos e inteligência artificial.', price: 'R$ 2.500', icon: 'mdi:robot', iconBg: 'bg-violet-500', link: '/servicos/automacao-ia' },
]

const diffs = [
  { title: 'Agilidade', icon: 'mdi:clock-fast', desc: 'Entrega no prazo' },
  { title: 'Personalização', icon: 'mdi:tune', desc: 'Soluções sob medida' },
  { title: 'Resultados', icon: 'mdi:chart-line', desc: 'Métricas reais' },
  { title: 'Suporte', icon: 'mdi:headset', desc: 'Atendimento contínuo' },
]
</script>

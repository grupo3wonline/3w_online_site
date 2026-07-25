<template>
  <div>
    <!-- Hero — Dark Navy -->
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Sobre Nós' }]" />
        <h1 class="page-hero-title">Transformando Negócios Desde 2019</h1>
        <p class="page-hero-subtitle">Com mais de 150 projetos entregues e 98% de satisfação, somos sua parceira estratégica em marketing digital e tecnologia.</p>
      </div>
    </section>

    <!-- Services Overview -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">O que fazemos</span>
          <h2 class="section-title">Nossos Serviços</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div v-for="s in highlights" :key="s.title" class="service-card text-center">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" :class="s.iconBg">
              <Icon :icon="s.icon" class="w-6 h-6 text-white" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">{{ s.title }}</h3>
            <p class="text-xs text-gray-500 mb-3">{{ s.description }}</p>
            <RouterLink :to="s.link" class="text-primary-600 text-xs font-semibold hover:text-primary-700 inline-flex items-center gap-1">
              Saiba Mais <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Us -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Por que escolher a 3W Online?</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <p class="text-gray-600 leading-relaxed mb-4 text-sm">
              Precisando transformar o seu negócio? Nossa equipe altamente qualificada está pronta para te ajudar a alcançar resultados extraordinários com estratégias personalizadas e focadas em dados.
            </p>
            <div class="space-y-3 mb-6">
              <div v-for="b in benefits" :key="b" class="benefit-item">
                <Icon icon="mdi:check-circle" class="benefit-icon" />
                <span class="benefit-text">{{ b }}</span>
              </div>
            </div>
            <RouterLink to="/contato" class="btn-primary text-sm">
              <Icon icon="mdi:calendar-check" class="w-4 h-4 mr-2" /> Agendar Consultoria Gratuita
            </RouterLink>
          </div>
          <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Equipe 3W Online" class="rounded-xl shadow-lg w-full" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- Results Stats — Dark -->
    <section class="testimonial-section section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="text-xs font-semibold text-blue-300 uppercase tracking-wider block mb-2">Nossos Números</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white">Histórico de Sucesso</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div v-for="stat in resultStats" :key="stat.label" class="text-center">
            <div class="text-3xl md:text-4xl font-bold text-primary-400">{{ stat.value }}</div>
            <div class="text-xs text-blue-200 mt-1">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <Icon icon="mdi:flag" class="w-8 h-8 text-primary-600 mb-3" />
            <h3 class="font-bold text-gray-900 mb-2">Nossa Missão</h3>
            <p class="text-sm text-gray-600">Transformar ideias em resultados concretos com soluções digitais que impulsionam o crescimento.</p>
          </div>
          <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <Icon icon="mdi:eye" class="w-8 h-8 text-primary-600 mb-3" />
            <h3 class="font-bold text-gray-900 mb-2">Nossa Visão</h3>
            <p class="text-sm text-gray-600">Ser referência em soluções digitais integradas, contribuindo para o crescimento sustentável dos negócios.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Nossos Valores</span>
          <h2 class="section-title">O que nos Move</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div v-for="v in values" :key="v.title" class="text-center p-5 bg-white rounded-xl border border-gray-100 shadow-sm">
            <Icon :icon="v.icon" class="w-10 h-10 mx-auto mb-3 text-primary-600" />
            <h3 class="font-semibold text-gray-900 text-sm mb-1">{{ v.title }}</h3>
            <p class="text-xs text-gray-500">{{ v.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Vamos trabalhar juntos?</h2>
        <p class="text-sm text-blue-200 mb-6">Entre em contato e descubra como podemos ajudar</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-sm">Falar Conosco</RouterLink>
          <a href="https://wa.me/5541996924829" target="_blank" rel="noopener noreferrer" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> WhatsApp</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

const highlights = [
  { title: 'Gestão de Redes Sociais', description: 'Conteúdo engajador para aumentar o alcance da sua marca.', icon: 'mdi:instagram', iconBg: 'bg-pink-500', link: '/servicos/gestao-redes-sociais' },
  { title: 'Gestão de Anúncios', description: 'Campanhas eficazes no Google e Meta Ads.', icon: 'mdi:bullseye-arrow', iconBg: 'bg-blue-500', link: '/servicos/gestao-anuncios' },
  { title: 'Criação de Sites', description: 'Sites modernos e responsivos que convertem.', icon: 'mdi:web', iconBg: 'bg-green-500', link: '/servicos/criacao-sites' },
]

const benefits = [
  'Mais de 5 anos de experiência com 150+ projetos entregues',
  'Focamos em métricas que realmente impactam o seu negócio',
  'Cada projeto é único e recebe atenção exclusiva da equipe',
  'Utilizamos as melhores ferramentas e práticas do mercado',
]

const resultStats = [
  { value: '150+', label: 'Projetos Entregues' },
  { value: '300%', label: 'Aumento Médio de Vendas' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '5+', label: 'Anos de Mercado' },
]

const values = [
  { title: 'Inovação', icon: 'mdi:lightbulb', description: 'Novas tecnologias e metodologias para as melhores soluções.' },
  { title: 'Compromisso', icon: 'mdi:handshake', description: 'Dedicação total, tratando cada desafio como nosso.' },
  { title: 'Excelência', icon: 'mdi:star-circle', description: 'Qualidade em cada detalhe, do início à entrega.' },
]
</script>

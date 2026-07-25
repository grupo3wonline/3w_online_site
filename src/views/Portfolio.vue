<template>
  <div>
    <!-- Hero -->
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Portfólio' }]" />
        <h1 class="page-hero-title">Nosso Portfólio</h1>
        <p class="page-hero-subtitle">Conheça projetos que transformaram negócios e geraram resultados reais</p>
      </div>
    </section>

    <!-- Portfolio Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-3">
          <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">Cases de Sucesso</span>
        </div>
        <div class="text-center mb-10 md:mb-16">
          <h2 class="section-title">Projetos que Falam por Nós</h2>
          <p class="section-subtitle">Resultados reais para negócios reais</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          <div v-for="project in projects" :key="project.id" class="portfolio-item group">
            <img :src="project.image" :alt="project.title" class="portfolio-image group-hover:scale-105 transition-transform duration-300" loading="lazy" width="400" height="192" />
            <div class="p-5">
              <h3 class="text-base font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
              <p class="text-sm text-gray-600 mb-3 leading-relaxed">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2">
                <span v-for="tag in project.tags" :key="tag" class="portfolio-tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-3">
          <span class="text-xs font-semibold text-primary-600 uppercase tracking-wider">Números</span>
        </div>
        <div class="text-center mb-10">
          <h2 class="section-title">Resultados que Comprovam</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div v-for="stat in stats" :key="stat.label" class="metric-card">
            <div class="metric-value">{{ stat.value }}</div>
            <div class="metric-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-blue-200 uppercase tracking-wider block mb-3">Seu projeto pode ser o próximo</span>
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-4">Vamos criar algo incrível juntos?</h2>
        <p class="text-blue-100 mb-6">Entre em contato e vamos discutir como podemos ajudar seu negócio</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/contato" class="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            Solicitar Orçamento
          </RouterLink>
          <a href="https://wa.me/5541996924829?text=Olá! Gostaria de discutir meu projeto." target="_blank" rel="noopener noreferrer" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600">
            <Icon icon="mdi:whatsapp" class="w-5 h-5 mr-2" /> WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

const projects = [
  { id: 1, title: 'E-commerce Fashion Store', description: 'Loja virtual com integração de pagamentos e gestão de estoque. +250% em vendas.', image: 'https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['E-commerce', 'Design', 'Desenvolvimento'] },
  { id: 2, title: 'Campanha Digital Restaurante', description: 'Gestão de redes sociais e anúncios com 250% de aumento nas vendas.', image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['Marketing Digital', 'Redes Sociais'] },
  { id: 3, title: 'App de Delivery', description: 'Aplicativo mobile com pedidos e rastreamento em tempo real. 10k+ downloads.', image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['App Mobile', 'UX/UI'] },
  { id: 4, title: 'Site Clínica com Agendamento', description: 'Website responsivo com sistema de agendamento online e área do paciente.', image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['Website', 'Sistema'] },
  { id: 5, title: 'Identidade Visual Startup', description: 'Criação completa de identidade visual para startup de tecnologia.', image: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['Design Gráfico', 'Branding'] },
  { id: 6, title: 'Consultoria E-commerce', description: 'Reestruturação que aumentou conversão em 180% e reduziu CAC em 40%.', image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800', tags: ['Consultoria', 'Otimização'] },
]

const stats = [
  { value: '150+', label: 'Projetos Entregues' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '300%', label: 'Aumento Médio em Vendas' },
  { value: '5+', label: 'Anos de Experiência' },
]
</script>

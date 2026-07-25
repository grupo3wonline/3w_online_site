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

    <!-- Simulator -->
    <section ref="simulatorRef" class="section-padding">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="website" />
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

const simulatorRef = ref<HTMLElement>()
const scrollToSimulator = () => simulatorRef.value?.scrollIntoView({ behavior: 'smooth' })

const benefits = ['Design responsivo e moderno', 'Otimização para SEO', 'Carregamento rápido', 'Painel administrativo intuitivo', 'Integração com ferramentas de marketing']

const types = [
  { title: 'Site Institucional', desc: 'Apresente sua empresa profissionalmente', price: 'A partir de R$ 1.200' },
  { title: 'E-commerce', desc: 'Venda online com segurança', price: 'A partir de R$ 7.000' },
  { title: 'Blog/Portal', desc: 'Compartilhe conteúdo e atraia audiência', price: 'A partir de R$ 2.500' },
  { title: 'Sistema Web', desc: 'Soluções personalizadas', price: 'A partir de R$ 5.000' },
]
</script>

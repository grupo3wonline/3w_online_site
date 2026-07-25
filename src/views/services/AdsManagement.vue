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

    <section ref="simRef" class="section-padding">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="ads" />
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

const simRef = ref<HTMLElement>()
const scrollTo = () => simRef.value?.scrollIntoView({ behavior: 'smooth' })

const benefits = ['Campanhas em múltiplas plataformas', 'Segmentação avançada de público', 'Monitoramento e otimização diária', 'Relatórios detalhados de performance', 'Método de aquisição inteligente']
</script>

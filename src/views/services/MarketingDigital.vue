<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Marketing Digital' }]" />
        <h1 class="page-hero-title">Marketing Digital Para seu Negócio</h1>
        <p class="page-hero-subtitle">Aumente sua presença online, atraia clientes e gere resultados concretos</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Transforme seu negócio com marketing digital</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
              Nossos consultores em marketing digital oferecem análises profundas e estratégias personalizadas
              para otimizar seus investimentos em marketing, identificamos oportunidades,
              corrigimos falhas e criamos o plano de ação perfeito.
            </p>
            <!-- Special Offer -->
            <div class="bg-primary-50 border border-primary-200 rounded-xl p-4 mb-5">
              <p class="text-xs text-primary-700 font-semibold mb-1">Oferta Especial</p>
              <p class="text-xs text-gray-600 mb-2">Pacote de Marketing Digital por 30 dias</p>
              <p class="text-2xl font-bold text-primary-600">R$ 500,00 <span class="text-xs font-normal text-gray-500">por 30 dias</span></p>
            </div>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Ver Detalhes do Pacote</button>
              <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse no pacote de Marketing Digital por R$ 500." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Assinar Agora</a>
            </div>
          </div>
          <img src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Marketing Digital" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- What's Included -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">O que está incluído no pacote</h2>
          <p class="section-subtitle">Serviços completos para impulsionar seu negócio</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-3">Gestão de Anúncios</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• Plataformas: Google, Facebook, Instagram</li>
              <li>• Criação de campanhas otimizadas</li>
              <li>• Monitoramento diário de performance</li>
              <li>• Ajustes e otimizações contínuas</li>
              <li>• Relatório mensal de resultados</li>
            </ul>
          </div>
          <div class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
            <h3 class="font-bold text-gray-900 mb-3">Gestão de Redes Sociais</h3>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>• Planejamento de conteúdo</li>
              <li>• Produção de Conteúdo</li>
              <li>• Publicação programada</li>
              <li>• Interação com o público</li>
              <li>• Análise de métricas e engajamento</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Card -->
    <section ref="simRef" class="section-padding">
      <div class="container">
        <div class="text-center mb-8">
          <span class="section-label">Investimento</span>
          <h2 class="section-title">Pacote completo com o melhor custo-benefício</h2>
        </div>
        <div class="max-w-md mx-auto bg-white rounded-2xl border-2 border-primary-500 p-6 text-center shadow-lg">
          <span class="text-[10px] uppercase tracking-wider bg-primary-100 text-primary-700 px-3 py-1 rounded-full font-semibold">Oferta Especial</span>
          <p class="text-3xl font-bold text-primary-600 mt-4">R$ 500</p>
          <p class="text-xs text-gray-500 mb-4">por 30 dias</p>
          <ul class="text-left text-sm text-gray-600 space-y-2 mb-6">
            <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Gestão de redes sociais</li>
            <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Produção de conteúdo</li>
            <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Gestão de anúncios (ads não inclusos)</li>
            <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Relatório de performance</li>
            <li class="flex items-center gap-2"><Icon icon="mdi:check" class="w-4 h-4 text-green-500" /> Suporte via WhatsApp</li>
          </ul>
          <div class="flex flex-col gap-2">
            <a href="https://wa.me/5541996924829?text=Quero contratar o pacote de Marketing Digital por R$ 500!" target="_blank" class="btn-primary w-full text-sm">Contratar Agora</a>
            <RouterLink to="/contato" class="btn-outline w-full text-sm">Solicitar Personalização</RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-8">
          <h2 class="section-title">Por que escolher nosso pacote?</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div v-for="r in reasons" :key="r.title" class="text-center p-3">
            <Icon :icon="r.icon" class="w-7 h-7 text-primary-600 mx-auto mb-2" />
            <h4 class="text-xs font-semibold text-gray-900">{{ r.title }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ r.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para transformar seu negócio?</h2>
        <p class="text-sm text-blue-200 mb-6">Comece agora — os primeiros resultados aparecem já nas primeiras semanas</p>
        <a href="https://wa.me/5541996924829?text=Quero o pacote de Marketing Digital por R$ 500!" target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Contratar Agora — R$ 500</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

const simRef = ref<HTMLElement>()
const scrollTo = () => simRef.value?.scrollIntoView({ behavior: 'smooth' })

const reasons = [
  { title: 'Preço Justo', icon: 'mdi:cash', desc: 'Melhor custo do mercado' },
  { title: 'Equipe Dedicada', icon: 'mdi:account-group', desc: 'Profissionais especializados' },
  { title: 'Resultados Reais', icon: 'mdi:chart-line', desc: 'Foco em métricas concretas' },
  { title: 'Sem Fidelidade', icon: 'mdi:lock-open', desc: 'Cancele quando quiser' },
]
</script>

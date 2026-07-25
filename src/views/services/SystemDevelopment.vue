<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Criação de Sistemas' }]" />
        <h1 class="page-hero-title">Criação de Sistemas</h1>
        <p class="page-hero-subtitle">Sistemas sob medida de tecnologias para automatizar e otimizar seus processos</p>
      </div>
    </section>

    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Sistemas sob medida para seu negócio</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">
              Desenvolvemos sistemas web personalizados que automatizam processos,
              eliminam erros e aumentam a produtividade da sua equipe.
            </p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
              <a href="https://wa.me/5541996924829?text=Olá! Preciso de um sistema personalizado." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
            </div>
          </div>
          <img src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Criação de Sistemas" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- Types -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Tipos de sistemas que desenvolvemos</h2>
          <p class="section-subtitle">Soluções para todos os tipos de necessidades</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="t in types" :key="t.title" class="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
            <h3 class="text-sm font-bold text-gray-900 mb-1">{{ t.title }}</h3>
            <p class="text-xs text-gray-500 mb-2">{{ t.desc }}</p>
            <p class="text-sm font-bold text-primary-600">{{ t.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features included -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Recursos incluídos em todos os sistemas</h2>
          <p class="section-subtitle">Tecnologia robusta e profissional em cada projeto</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="f in features" :key="f.title" class="text-center p-4">
            <Icon :icon="f.icon" class="w-8 h-8 text-primary-600 mx-auto mb-2" />
            <h4 class="text-xs font-semibold text-gray-900">{{ f.title }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
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

    <section ref="simRef" class="section-padding">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="system" />
      </div>
    </section>

    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para automatizar seus processos?</h2>
        <p class="text-sm text-blue-200 mb-6">Transforme seu negócio com um sistema sob medida para suas necessidades</p>
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

const benefits = ['Automação de processos', 'Painel administrativo completo', 'Relatórios e dashboards', 'Integração com APIs externas', 'Escalável e seguro']

const types = [
  { title: 'Controle de Gestão (CRM)', desc: 'Gerencie clientes e vendas', price: 'A partir de R$ 15.000' },
  { title: 'ERP/Financeiro', desc: 'Controle financeiro completo', price: 'A partir de R$ 18.000' },
  { title: 'Sistema de Agendamento', desc: 'Agendamentos automatizados', price: 'A partir de R$ 8.000' },
  { title: 'Controle de Estoque', desc: 'Gestão de produtos e estoque', price: 'A partir de R$ 12.000' },
  { title: 'Sistema Educacional', desc: 'Plataforma de ensino EAD', price: 'A partir de R$ 20.000' },
  { title: 'Sistema Personalizado', desc: 'Sob demanda para seu negócio', price: 'A partir de R$ 22.000' },
]

const features = [
  { title: 'Painel Intuitivo', icon: 'mdi:view-dashboard', desc: 'Dashboard completo' },
  { title: 'Acesso Multinível', icon: 'mdi:account-lock', desc: 'Controle de permissões' },
  { title: 'Integração APIs', icon: 'mdi:api', desc: 'Conecte com outros sistemas' },
  { title: 'Mobile Friendly', icon: 'mdi:cellphone-check', desc: 'Acesso de qualquer lugar' },
]

const process = [
  { title: 'Análise', desc: 'Mapeamento de processos' },
  { title: 'Prototipagem', desc: 'Wireframes e validação' },
  { title: 'Desenvolvimento', desc: 'Codificação e testes' },
  { title: 'Testes', desc: 'QA e homologação' },
  { title: 'Entrega', desc: 'Deploy e treinamento' },
]
</script>

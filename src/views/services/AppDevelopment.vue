<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Desenvolvimento de Apps' }]" />
        <h1 class="page-hero-title">Desenvolvimento de Apps</h1>
        <p class="page-hero-subtitle">Aplicativos mobile nativos e híbridos para iOS e Android</p>
      </div>
    </section>
    <section class="section-padding">
      <div class="container"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Leve seu negócio para o mobile</h2>
          <p class="text-sm text-gray-600 leading-relaxed mb-5">Criamos aplicativos mobile personalizados que oferecem experiências incríveis para seus usuários. Nossa equipe utiliza as melhores tecnologias para criar apps nativos e híbridos para iOS e Android.</p>
          <ul class="space-y-2.5 mb-6">
            <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700"><Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}</li>
          </ul>
          <div class="flex flex-wrap gap-3">
            <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
            <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Desenvolvimento de Apps." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
          </div>
        </div>
        <img src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Desenvolvimento de Apps" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
      </div></div>
    </section>
    <section class="section-padding bg-gray-50">
      <div class="container"><div class="text-center mb-10"><span class="section-label">Plataformas</span><h2 class="section-title">Plataformas e tecnologias</h2><p class="section-subtitle">Desenvolvemos para todas as principais plataformas</p></div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
        <div v-for="p in platforms" :key="p.title" class="bg-white rounded-xl border border-gray-100 p-5 text-center shadow-sm">
          <h3 class="font-bold text-gray-900 mb-2">{{ p.title }}</h3>
          <p class="text-xs text-gray-500 mb-3">{{ p.desc }}</p>
          <p class="text-sm font-bold text-primary-600">{{ p.price }}</p>
        </div>
      </div></div>
    </section>

    <!-- Process -->
    <section class="section-padding">
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

    <!-- Features -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Funcionalidades</span>
          <h2 class="section-title">Recursos que seu app pode ter</h2>
          <p class="section-subtitle">Tecnologia de ponta para uma experiência completa</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div v-for="f in features" :key="f.title" class="bg-white rounded-xl border border-gray-100 p-4 shadow-sm text-center">
            <Icon :icon="f.icon" class="w-7 h-7 text-primary-600 mx-auto mb-2" />
            <h4 class="text-xs font-semibold text-gray-900">{{ f.title }}</h4>
            <p class="text-[10px] text-gray-500 mt-1">{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section ref="simRef" class="section-padding"><div class="container max-w-4xl mx-auto"><PriceSimulator service-type="app" /></div></section>

    <!-- FAQ -->
    <section class="section-padding bg-gray-50">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre desenvolvimento de aplicativos</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <section class="cta-section"><div class="container text-center">
      <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para criar seu app?</h2>
      <p class="text-sm text-blue-200 mb-6">Transforme sua ideia em um aplicativo de sucesso</p>
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
const benefits = ['Design UI/UX exclusivo para mobile', 'Performance nativa', 'Integração com APIs e terceiros', 'Publicação nas lojas (App Store/Play Store)', 'Suporte e manutenção pós-lançamento']

const process = [
  { title: 'Discovery', desc: 'Mapeamento de requisitos e funcionalidades' },
  { title: 'UI/UX Design', desc: 'Prototipação e validação da interface' },
  { title: 'Desenvolvimento', desc: 'Codificação com sprints ágeis' },
  { title: 'Testes', desc: 'QA completo em dispositivos reais' },
  { title: 'Publicação', desc: 'Deploy nas lojas e acompanhamento' },
]

const features = [
  { title: 'Push Notifications', icon: 'mdi:bell-ring', desc: 'Engaje usuários com notificações inteligentes' },
  { title: 'Pagamentos In-App', icon: 'mdi:credit-card-check', desc: 'Integração com gateways de pagamento' },
  { title: 'Geolocalização', icon: 'mdi:map-marker-radius', desc: 'Funcionalidades baseadas em localização' },
  { title: 'Offline Mode', icon: 'mdi:wifi-off', desc: 'Funcione mesmo sem internet' },
  { title: 'Analytics', icon: 'mdi:chart-box', desc: 'Métricas de uso e comportamento' },
  { title: 'Segurança', icon: 'mdi:fingerprint', desc: 'Biometria, criptografia e proteção de dados' },
]
const faqs = [
  { question: 'Quanto tempo leva para desenvolver um app?', answer: 'O prazo varia conforme a complexidade. Apps simples levam de 2-3 meses, enquanto projetos mais robustos podem levar de 4-6 meses incluindo testes e publicação nas lojas.' },
  { question: 'Vocês publicam o app nas lojas?', answer: 'Sim! Cuidamos de todo o processo de publicação na App Store (iOS) e Google Play (Android), incluindo a configuração das contas de desenvolvedor.' },
  { question: 'Qual a diferença entre app nativo e híbrido?', answer: 'O app nativo é desenvolvido especificamente para cada plataforma (iOS ou Android), com performance máxima. O híbrido usa uma base de código única (React Native) para ambas as plataformas, com excelente custo-benefício.' },
  { question: 'Vocês oferecem manutenção após o lançamento?', answer: 'Sim! Oferecemos planos de manutenção mensal que incluem correções de bugs, atualizações de segurança e pequenas melhorias funcionais.' },
  { question: 'Preciso ter uma empresa para publicar um app?', answer: 'Não necessariamente. Você pode publicar como pessoa física, mas recomendamos conta empresarial para maior credibilidade e recursos adicionais nas lojas.' },
]
const platforms = [
  { title: 'iOS', desc: 'Apps exclusivos para iPhone e iPad usando Swift/React Native', price: 'A partir de R$ 7.000' },
  { title: 'Android', desc: 'Apps de alta performance para o ecossistema Android', price: 'A partir de R$ 7.000' },
  { title: 'Híbrido', desc: 'Um código base para iOS e Android via React Native', price: 'A partir de R$ 12.000' },
]
</script>

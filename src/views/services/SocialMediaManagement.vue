<template>
  <div>
    <section class="page-hero">
      <div class="container">
        <AppBreadcrumb :items="[{ label: 'Home', path: '/' }, { label: 'Serviços', path: '/servicos' }, { label: 'Gestão de Redes Sociais' }]" />
        <h1 class="page-hero-title">Agência de Marketing Digital Focada em Gestão de Redes Sociais</h1>
        <p class="page-hero-subtitle">Criação de conteúdo e estratégia de marketing digital alinhada com o propósito do seu negócio</p>
      </div>
    </section>

    <!-- Intro -->
    <section class="section-padding">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-xl md:text-2xl font-bold text-gray-900 mb-3">Sua marca merece destaque nas redes sociais</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-5">
              Somos uma agência especializada em transformar a presença digital do seu negócio.
              Criamos e gerenciamos conteúdo para suas redes sociais com estratégia personalizada,
              criatividade e foco em engajamento, crescimento orgânico e geração de oportunidades reais de venda.
            </p>
            <ul class="space-y-2.5 mb-6">
              <li v-for="b in benefits" :key="b" class="flex items-center gap-2 text-sm text-gray-700">
                <Icon icon="mdi:check-circle" class="w-5 h-5 text-green-500 flex-shrink-0" /> {{ b }}
              </li>
            </ul>
            <div class="flex flex-wrap gap-3">
              <button @click="scrollTo" class="btn-primary text-sm"><Icon icon="mdi:calculator" class="w-4 h-4 mr-2" /> Simular Preço</button>
              <a href="https://wa.me/5541996924829?text=Olá! Tenho interesse em Gestão de Redes Sociais." target="_blank" class="btn-secondary text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> Falar no WhatsApp</a>
            </div>
          </div>
          <img src="https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Gestão de Redes Sociais - Agência de Marketing Digital" class="w-full rounded-xl shadow-lg" loading="lazy" width="800" height="533" />
        </div>
      </div>
    </section>

    <!-- Services Pillars -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">O que fazemos por você</span>
          <h2 class="section-title">Nossos Pilares de Atuação</h2>
          <p class="section-subtitle">Cada pilar é pensado estrategicamente para levar seu negócio ao próximo nível nas redes sociais</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div v-for="pillar in pillars" :key="pillar.title" class="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md hover:border-primary-200 transition-all">
            <div class="w-11 h-11 rounded-full flex items-center justify-center mb-4" :class="pillar.iconBg">
              <Icon :icon="pillar.icon" class="w-5 h-5 text-white" />
            </div>
            <h3 class="text-sm font-bold text-gray-900 mb-2">{{ pillar.title }}</h3>
            <p class="text-xs text-gray-500 leading-relaxed">{{ pillar.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-10">
          <span class="section-label">Metodologia</span>
          <h2 class="section-title">Como funciona nosso processo</h2>
          <p class="section-subtitle">Estratégia completa e personalizada para cada cliente</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div v-for="(step, i) in steps" :key="i" class="text-center">
            <div class="w-12 h-12 rounded-full bg-primary-600 text-white flex items-center justify-center mx-auto mb-3 font-bold">{{ i + 1 }}</div>
            <h4 class="text-sm font-semibold text-gray-900 mb-1">{{ step.title }}</h4>
            <p class="text-[11px] text-gray-500">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Packages -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-10">
          <h2 class="section-title">Pacotes de Gestão</h2>
          <p class="section-subtitle">Escolha o melhor para seu negócio</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
          <div v-for="pkg in packages" :key="pkg.title" class="bg-white rounded-xl border-2 border-gray-100 hover:border-primary-300 p-6 text-center shadow-sm transition-all">
            <h3 class="font-bold text-gray-900 mb-1">{{ pkg.title }}</h3>
            <p class="text-xs text-gray-500 mb-4">{{ pkg.desc }}</p>
            <p class="text-xl font-bold text-primary-600">{{ pkg.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simulator -->
    <section ref="simRef" class="section-padding">
      <div class="container max-w-4xl mx-auto">
        <PriceSimulator service-type="social-media" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-gray-50">
      <div class="container max-w-3xl mx-auto">
        <div class="text-center mb-8">
          <span class="section-label">Dúvidas?</span>
          <h2 class="section-title">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre nosso serviço de gestão de redes sociais</p>
        </div>
        <FaqAccordion :items="faqs" />
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container text-center">
        <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">Pronto para dominar as redes sociais?</h2>
        <p class="text-sm text-blue-200 mb-6">Comece agora e transforme a presença digital da sua marca com estratégia e conteúdo de qualidade</p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <RouterLink to="/contato" class="btn-secondary text-sm"><Icon icon="mdi:file-document-edit" class="w-4 h-4 mr-2" /> Solicitar Orçamento</RouterLink>
          <a href="https://wa.me/5541996924829?text=Olá! Quero saber mais sobre a gestão de redes sociais." target="_blank" class="btn-outline !border-white/30 !text-white hover:!bg-white/10 text-sm"><Icon icon="mdi:whatsapp" class="w-4 h-4 mr-2" /> WhatsApp</a>
        </div>
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

const simRef = ref<HTMLElement>()
const scrollTo = () => simRef.value?.scrollIntoView({ behavior: 'smooth' })

const benefits = [
  'Gestão completa de Redes Sociais',
  'Criação de Estratégia Personalizada',
  'Criação de Conteúdo profissional',
  'Acompanhamento de Desempenho',
  'Posicionamento Digital estratégico',
  'Relatórios mensais de performance',
]

const pillars = [
  {
    title: 'Social Media',
    icon: 'mdi:instagram',
    iconBg: 'bg-pink-500',
    description: 'Gestão de Redes Sociais, Criação de Estratégia Personalizada, Criação de Conteúdo, Acompanhamento de Desempenho e Posicionamento Digital. Cuidamos de tudo para que sua marca se destaque.',
  },
  {
    title: 'SEO para Redes Sociais',
    icon: 'mdi:magnify',
    iconBg: 'bg-blue-500',
    description: 'Usamos técnicas avançadas para fazer com que seus conteúdos sejam encontrados nos mecanismos de busca das redes sociais e em buscadores como o Google, aumentando sua visibilidade orgânica.',
  },
  {
    title: 'Funil de Vendas',
    icon: 'mdi:filter-variant',
    iconBg: 'bg-green-500',
    description: 'Trabalhamos o conteúdo estrategicamente para atrair novos seguidores, engajar sua audiência e preparar o público para oportunidades de compra, transformando seguidores em clientes.',
  },
  {
    title: 'Estratégia',
    icon: 'mdi:chess-queen',
    iconBg: 'bg-purple-500',
    description: 'Ações detalhadamente pensadas e alinhadas com os objetivos do seu projeto. Cada publicação tem um propósito claro dentro da estratégia macro de comunicação do seu negócio.',
  },
  {
    title: 'Planejamento',
    icon: 'mdi:calendar-check',
    iconBg: 'bg-orange-500',
    description: 'Trabalhamos com planejamento e conteúdo antecipado, garantindo consistência e qualidade nas publicações. Nada é feito de última hora — tudo é organizado com antecedência.',
  },
  {
    title: 'Conteúdo Digital',
    icon: 'mdi:pencil-ruler',
    iconBg: 'bg-indigo-500',
    description: 'Conteúdo desenvolvido pensando na conexão com seu público e intencionalmente criado para gerar o resultado desejado — seja engajamento, autoridade ou conversão.',
  },
]

const steps = [
  { title: 'Briefing', desc: 'Entendemos sua marca, público-alvo e objetivos de negócio' },
  { title: 'Planejamento', desc: 'Criamos o calendário editorial e estratégia mensal' },
  { title: 'Execução', desc: 'Produção de conteúdo, criação e publicação estratégica' },
  { title: 'Resultados', desc: 'Análise de métricas, relatórios e otimização contínua' },
]

const packages = [
  { title: '1 Rede Social', desc: 'Ideal para começar', price: 'R$ 1.000/mês' },
  { title: '2-3 Redes Sociais', desc: 'Mais alcance e presença', price: 'R$ 1.700/mês' },
  { title: '4+ Redes Sociais', desc: 'Cobertura completa', price: 'R$ 1.900/mês' },
]

const faqs = [
  { question: 'O que está incluído na gestão de redes sociais?', answer: 'Nosso serviço inclui criação de estratégia personalizada, planejamento de conteúdo mensal, criação de posts e artes, publicação, monitoramento de engajamento, interação com seguidores e relatórios de desempenho.' },
  { question: 'Quanto tempo leva para ver resultados?', answer: 'Os primeiros resultados de engajamento aparecem em 2-4 semanas. O crescimento orgânico consistente e o posicionamento digital levam de 2-3 meses de trabalho contínuo.' },
  { question: 'Com quantas redes sociais vocês trabalham?', answer: 'Trabalhamos com todas as principais plataformas: Instagram, Facebook, LinkedIn, TikTok, Twitter/X e YouTube. Cada plataforma recebe conteúdo adaptado ao seu formato e público.' },
  { question: 'Vocês criam todo o conteúdo ou eu preciso fornecer?', answer: 'Nós criamos todo o conteúdo — desde os textos, legendas e hashtags até o design das peças visuais. Precisamos apenas de fotos, vídeos e informações sobre a empresa para produzir material autêntico.' },
  { question: 'Como funciona o SEO para redes sociais?', answer: 'Utilizamos técnicas de otimização como palavras-chave estratégicas, hashtags relevantes, descrições otimizadas e formatos de conteúdo que os algoritmos priorizam, aumentando a descoberta orgânica do seu perfil.' },
  { question: 'Como vocês trabalham o funil de vendas nas redes?', answer: 'Criamos conteúdos para cada etapa: topo (atrair seguidores), meio (engajar e educar) e fundo (converter em clientes). Dessa forma, preparamos a audiência para oportunidades de compra de forma natural.' },
  { question: 'O processo é totalmente delegado?', answer: 'Sim! Você aprova o planejamento mensal e nós cuidamos de toda a execução. Enviamos relatórios periódicos de resultados e mantemos um canal aberto para ajustes e alinhamentos.' },
  { question: 'Existe fidelidade no contrato?', answer: 'Não trabalhamos com fidelidade. Recomendamos no mínimo 3 meses para resultados consistentes, mas você não tem obrigação de permanência.' },
  { question: 'Como é feito o acompanhamento de desempenho?', answer: 'Monitoramos métricas como alcance, engajamento, crescimento de seguidores, cliques e conversões. Entregamos relatórios mensais detalhados com insights e recomendações de melhoria.' },
  { question: 'Vocês trabalham com planejamento antecipado?', answer: 'Sim! Todo o conteúdo é planejado com antecedência. Trabalhamos com calendários editoriais mensais que são aprovados por você antes da execução, garantindo organização e qualidade.' },
]
</script>

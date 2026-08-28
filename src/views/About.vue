<template>
  <div class="about-page">
    <!-- Hero — Dark Navy -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Sobre Nós' }]" />
        
        <div class="max-w-3xl mt-4">
          <div class="inline-flex items-center gap-2 bg-primary-500/20 text-blue-200 border border-primary-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:domain" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Grupo 3W Online • Curitiba/PR</span>
          </div>
          <h1 class="page-hero-title">
            Transformando Negócios com Tecnologia & Marketing Estratégico
          </h1>
          <p class="page-hero-subtitle">
            Com mais de 150 projetos entregues e 98% de aprovação, somos sua parceira estratégica no desenvolvimento de sites, sistemas sob medida, anúncios e automações com IA.
          </p>
          <div class="flex flex-wrap gap-3.5 mt-6">
            <RouterLink to="/contato" class="btn-primary text-xs sm:text-sm shadow-lg">
              <Icon icon="mdi:email-fast-outline" class="w-4 h-4 mr-1.5" />
              Falar com Nossos Especialistas
            </RouterLink>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar com a equipe da 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary text-xs sm:text-sm shadow-lg"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
              Atendimento no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Nossa História & DNA -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span class="section-label">Nossa Trajetória</span>
            <h2 class="section-title">Inovação, Engenharia e Foco em Resultados Reais</h2>
            <p class="text-sm text-gray-600 leading-relaxed mb-4">
              Fundada em 2019 em Curitiba, a <strong>3W Online</strong> nasceu com o propósito de descomplicar o universo digital para empresas que buscam acelerar suas vendas e modernizar seus processos.
            </p>
            <p class="text-sm text-gray-600 leading-relaxed mb-6">
              Acreditamos que a verdadeira transformação digital combina código limpo, design intuitivo e estratégias de marketing orientadas por dados. Não entregamos apenas sites ou anúncios: construímos ecossistemas digitais sustentáveis que trabalham 24 horas por dia pelo seu faturamento.
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div v-for="b in benefits" :key="b" class="flex items-start gap-2.5 bg-slate-50 p-3 rounded-lg border border-gray-100">
                <Icon icon="mdi:check-circle" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                <span class="text-xs text-gray-700 font-medium">{{ b }}</span>
              </div>
            </div>

            <RouterLink to="/servicos" class="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700">
              Conhecer nosso portfólio de soluções <Icon icon="mdi:arrow-right" class="w-4 h-4" />
            </RouterLink>
          </div>

          <div class="relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Equipe Grupo 3W Online"
                class="w-full h-auto object-cover"
                loading="lazy"
                width="800"
                height="533"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex items-end p-6">
                <div class="text-white">
                  <p class="text-sm font-bold">Grupo 3W Online Soluções Digitais</p>
                  <p class="text-xs text-blue-200">Sede em Curitiba/PR • Atendimento Remoto Nacional</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Estatísticas & Prova Social — Dark Navy -->
    <section class="testimonial-section py-14">
      <div class="container">
        <div class="text-center mb-10">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-1">Métricas de Autoridade</span>
          <h2 class="text-2xl md:text-3xl font-bold text-white">Números que Comprovam Nossa Entrega</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in resultStats" :key="stat.label" class="bg-white/5 border border-white/10 rounded-xl p-5 text-center backdrop-blur-sm">
            <div class="text-3xl md:text-4xl font-black text-primary-400 mb-1 tracking-tight">{{ stat.value }}</div>
            <div class="text-xs text-blue-200 font-medium">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pilares: Missão, Visão e Valores -->
    <section class="section-padding bg-slate-50">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Nossos Pilares</span>
          <h2 class="section-title">Princípios que Norteiam Nossas Decisões</h2>
          <p class="section-subtitle">Compromisso com a ética, qualidade técnica e o sucesso sustentável do cliente.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div class="card p-6 bg-white border border-gray-100 hover:shadow-lg transition-all">
            <div class="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mb-4">
              <Icon icon="mdi:flag-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">Nossa Missão</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Transformar ideias em resultados tangíveis através de tecnologia moderna, inteligência artificial e estratégias de marketing digital de alto impacto.
            </p>
          </div>

          <div class="card p-6 bg-white border border-gray-100 hover:shadow-lg transition-all">
            <div class="w-12 h-12 bg-secondary-50 text-secondary-600 rounded-xl flex items-center justify-center mb-4">
              <Icon icon="mdi:eye-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">Nossa Visão</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Ser referência em soluções digitais e automação para empresas em todo o Brasil, promovendo excelência técnica e relações comerciais transparentes.
            </p>
          </div>

          <div class="card p-6 bg-white border border-gray-100 hover:shadow-lg transition-all">
            <div class="w-12 h-12 bg-orange-50 text-accent-600 rounded-xl flex items-center justify-center mb-4">
              <Icon icon="mdi:heart-outline" class="w-6 h-6" />
            </div>
            <h3 class="text-base font-bold text-gray-900 mb-2">Nossos Valores</h3>
            <p class="text-xs text-gray-600 leading-relaxed">
              Transparência absoluta, inovação constante, foco em métricas reais, conformidade integral com a LGPD e respeito aos prazos e acordos firmados.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Diferenciais Competitivos -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Diferenciais</span>
          <h2 class="section-title">Por que Escolher a 3W Online?</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div v-for="d in differentials" :key="d.title" class="p-5 rounded-xl border border-gray-100 bg-slate-50/50 hover:bg-white hover:shadow-md transition-all">
            <div class="w-10 h-10 rounded-lg flex items-center justify-center mb-3" :class="d.iconBg">
              <Icon :icon="d.icon" class="w-5 h-5 text-white" />
            </div>
            <h4 class="text-sm font-bold text-gray-900 mb-1.5">{{ d.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ d.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Vamos Conversar?</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Pronto para dar o próximo passo digital?</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-xl mx-auto">
          Fale com nossa equipe técnica e receba uma análise estratégica personalizada para o seu negócio.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-xs sm:text-sm font-bold shadow-lg">
            Solicitar Orçamento Grátis
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de um atendimento sobre os serviços da 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="btn-secondary text-xs sm:text-sm font-bold shadow-lg"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
            Atendimento no WhatsApp
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Sobre a 3W Online | Agência de Tecnologia & Marketing Digital em Curitiba PR',
  description: 'Conheça o Grupo 3W Online: 5+ anos de mercado, mais de 150 projetos entregues com excelência em sites, sistemas sob medida e automação com IA.',
  path: '/sobre',
  keywords: 'sobre 3w online, agência curitiba, empresa tecnologia curitiba, sistemas sob medida, marketing digital',
})

const benefits = [
  'Mais de 5 anos de experiência e 150+ projetos entregues com sucesso',
  'Métricas claras e relatórios transparentes com foco em ROI real',
  'Desenvolvimento de software ágil com código limpo e seguro',
  'Total conformidade com a LGPD e práticas de segurança digital',
]

const resultStats = [
  { value: '150+', label: 'Projetos Concluídos' },
  { value: '98%', label: 'Índice de Satisfação' },
  { value: '5+ Anos', label: 'de Mercado e Inovação' },
  { value: '120+', label: 'Ferramentas Gratuitas' },
]

const differentials = [
  { title: 'Tecnologia de Ponta', desc: 'Aplicações desenvolvidas em Vue 3, TypeScript, Vite e arquitetura moderna de nuvem.', icon: 'mdi:code-tags', iconBg: 'bg-blue-600' },
  { title: 'Automação com IA', desc: 'Integrações de ponta com modelos LLM e automações de atendimento 24h no WhatsApp.', icon: 'mdi:robot', iconBg: 'bg-purple-600' },
  { title: 'Sem Fidelidade Forçada', desc: 'Conquistamos sua parceria mês a mês através de entregas consistentes e resultados mensuráveis.', icon: 'mdi:lock-open-outline', iconBg: 'bg-emerald-600' },
  { title: 'Atendimento Humanizado', desc: 'Comunicação rápida e direta com engenheiros e estrategistas sem burocracia.', icon: 'mdi:account-group', iconBg: 'bg-amber-600' },
  { title: 'Segurança & Compliance', desc: 'Processos estruturados e proteção rigorosa de dados segundo a LGPD.', icon: 'mdi:shield-check-outline', iconBg: 'bg-cyan-600' },
  { title: 'Preços Transparentes', desc: 'Sem custos ocultos: simulador de estimativas em tempo real antes de fechar negócio.', icon: 'mdi:calculator', iconBg: 'bg-slate-700' },
]
</script>

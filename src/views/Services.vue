<template>
  <div class="services-page">
    <!-- Hero — Dark Navy -->
    <section class="page-hero relative overflow-hidden">
      <div class="container relative z-10">
        <AppBreadcrumb :items="[{ label: 'Início', path: '/' }, { label: 'Nossos Serviços' }]" />
        
        <div class="max-w-3xl mt-4">
          <div class="inline-flex items-center gap-2 bg-primary-500/20 text-blue-200 border border-primary-500/30 px-3.5 py-1 rounded-full text-xs font-semibold mb-4">
            <Icon icon="mdi:briefcase-outline" class="w-3.5 h-3.5 text-secondary-400" />
            <span>Soluções Digitais Integradas • Curitiba/PR</span>
          </div>

          <h1 class="page-hero-title">
            Serviços de Tecnologia, Marketing & Automação com IA
          </h1>
          <p class="page-hero-subtitle">
            Desenvolvemos sites ultrarrápidos, plataformas web sob medida, campanhas de tráfego pago de alto ROI e automações inteligentes para alavancar suas operações.
          </p>

          <div class="flex flex-wrap gap-3.5 mt-6">
            <a href="#catalogo" class="btn-primary text-xs sm:text-sm shadow-lg">
              <Icon icon="mdi:view-grid" class="w-4 h-4 mr-1.5" />
              Explorar Todos os Serviços
            </a>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de uma proposta personalizada de serviços."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary text-xs sm:text-sm shadow-lg"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4 mr-1.5" />
              Falar com Especialista
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Barra de Autoridade -->
    <div class="bg-primary-50 border-b border-primary-100 py-3 text-xs text-primary-800">
      <div class="container flex flex-wrap items-center justify-center gap-4 text-center font-medium">
        <span class="flex items-center gap-1"><Icon icon="mdi:shield-check" class="w-4 h-4 text-green-600" /> 150+ Projetos Entregues</span>
        <span class="text-primary-300 hidden sm:inline">•</span>
        <span class="flex items-center gap-1"><Icon icon="mdi:clock-fast" class="w-4 h-4 text-blue-600" /> Resposta em até 24 horas úteis</span>
        <span class="text-primary-300 hidden sm:inline">•</span>
        <span class="flex items-center gap-1"><Icon icon="mdi:check-decagram" class="w-4 h-4 text-green-600" /> Sem Fidelidade Forçada</span>
      </div>
    </div>

    <!-- Catálogo Completo de Serviços -->
    <section id="catalogo" class="section-padding bg-slate-50/50">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Portfólio de Soluções</span>
          <h2 class="section-title">O que Podemos Fazer Pelo Seu Negócio</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Soluções completas e modulares para cada momento do seu ciclo de crescimento.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="service in services"
            :key="service.id"
            class="service-card flex flex-col justify-between group"
          >
            <div>
              <div class="flex items-center justify-between mb-4">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-sm" :class="service.iconBg">
                  <Icon :icon="service.icon" class="w-6 h-6 text-white" />
                </div>
                <span v-if="service.badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-secondary-50 text-secondary-700 border border-secondary-200">
                  {{ service.badge }}
                </span>
              </div>

              <h3 class="text-base font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {{ service.title }}
              </h3>
              <p class="text-xs text-gray-500 mb-4 leading-relaxed">
                {{ service.description }}
              </p>
            </div>

            <div class="pt-4 border-t border-gray-100 mt-2">
              <div class="flex items-center justify-between mb-3">
                <span class="text-[11px] text-gray-400 font-medium">Investimento</span>
                <span class="text-xs font-bold text-primary-600">{{ service.price }}</span>
              </div>

              <RouterLink
                :to="service.link"
                class="w-full text-center bg-slate-100 hover:bg-primary-600 hover:text-white text-gray-800 text-xs font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-1 group-hover:bg-primary-600 group-hover:text-white"
              >
                <span>Conhecer Detalhes</span>
                <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SEÇÃO: Simulador de Orçamento Reativo -->
    <section class="section-padding bg-slate-900 text-white relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-[#111d3a] to-[#162044]"></div>
      
      <div class="container relative z-10">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Simulação Imediata</span>
          <h2 class="text-2xl md:text-3xl font-extrabold mb-3">Calcule a Estimativa do Seu Projeto</h2>
          <p class="text-sm text-blue-200">
            Personalize os entregáveis e obtenha uma prévia de investimento em menos de 1 minuto.
          </p>
        </div>

        <!-- Seletor de Tipo de Serviço para o Simulador -->
        <div class="flex flex-wrap justify-center gap-2 mb-8 max-w-3xl mx-auto">
          <button
            v-for="st in simulatorTypes"
            :key="st.id"
            @click="activeSimType = st.id"
            class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-all border flex items-center gap-1.5"
            :class="activeSimType === st.id ? 'bg-primary-600 text-white border-primary-500 shadow-md' : 'bg-white/10 text-gray-300 border-white/10 hover:bg-white/15 hover:text-white'"
          >
            <Icon :icon="st.icon" class="w-4 h-4" />
            <span>{{ st.label }}</span>
          </button>
        </div>

        <!-- Container do PriceSimulator -->
        <div class="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-2xl text-gray-900 border border-gray-100">
          <PriceSimulator :key="activeSimType" :service-type="activeSimType" />
        </div>
      </div>
    </section>

    <!-- Por que Escolher a 3W Online -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="text-center mb-12">
          <span class="section-label">Garantias</span>
          <h2 class="section-title">O Padrão de Qualidade 3W Online</h2>
          <p class="section-subtitle max-w-2xl mx-auto">
            Garantimos excelência técnica, comunicação direta e cumprimento de prazos em todos os serviços prestados.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="d in diffs" :key="d.title" class="p-5 rounded-xl border border-gray-100 bg-slate-50 text-center hover:shadow-md transition-all">
            <div class="w-12 h-12 bg-primary-100 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon :icon="d.icon" class="w-6 h-6" />
            </div>
            <h4 class="font-bold text-gray-900 text-sm mb-1.5">{{ d.title }}</h4>
            <p class="text-xs text-gray-500 leading-relaxed">{{ d.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Final — Dark Navy -->
    <section class="cta-section">
      <div class="container text-center">
        <span class="text-xs font-semibold text-secondary-400 uppercase tracking-wider block mb-2">Soluções Personalizadas</span>
        <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-3">Tem uma necessidade específica ou projeto sob medida?</h2>
        <p class="text-sm text-blue-200 mb-8 max-w-xl mx-auto">
          Nossa equipe de engenharia e marketing está pronta para desenhar o escopo perfeito para sua empresa.
        </p>
        <div class="flex flex-col sm:flex-row gap-3.5 justify-center">
          <RouterLink to="/contato" class="btn-primary !bg-white !text-primary-700 hover:!bg-gray-100 text-xs sm:text-sm font-bold shadow-lg">
            Falar com Consultor Técnico
          </RouterLink>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de conversar sobre um projeto sob medida."
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
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import PriceSimulator from '@/components/PriceSimulator.vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Serviços de Marketing Digital, Sites & Sistemas Web | 3W Online Curitiba',
  description: 'Conheça nossos serviços: Criação de Sites, Sistemas Sob Medida, Gestão de Anúncios Google/Meta, Redes Sociais, Apps Mobile e Automação com IA.',
  path: '/servicos',
  keywords: 'serviços marketing digital, criação de sites, sistemas sob medida, tráfego pago, automação ia, curitiba',
})

const activeSimType = ref('website')
const simulatorTypes = [
  { id: 'website', label: 'Criação de Sites', icon: 'mdi:web' },
  { id: 'ads', label: 'Gestão de Anúncios', icon: 'mdi:bullseye-arrow' },
  { id: 'social-media', label: 'Redes Sociais', icon: 'mdi:instagram' },
  { id: 'system', label: 'Sistemas Web', icon: 'mdi:application-cog-outline' },
  { id: 'app', label: 'Apps Mobile', icon: 'mdi:cellphone' },
  { id: 'design', label: 'Design Gráfico', icon: 'mdi:palette' },
]

const services = [
  {
    id: 1,
    title: 'Criação de Sites Profissionais',
    description: 'Sites institucionais modernos, landing pages de alta conversão e portais velozes otimizados para o Google.',
    price: 'A partir de R$ 997',
    badge: 'Mais Procurado',
    icon: 'mdi:web',
    iconBg: 'bg-blue-600',
    link: '/servicos/criacao-sites',
  },
  {
    id: 2,
    title: 'Sistemas Web Sob Medida',
    description: 'Desenvolvimento de ERPs leves, CRMs, painéis administrativos e plataformas customizadas para sua operação.',
    price: 'Sob Consulta',
    badge: 'Alta Performance',
    icon: 'mdi:application-cog-outline',
    iconBg: 'bg-slate-700',
    link: '/servicos/criacao-sistemas',
  },
  {
    id: 3,
    title: 'Automação & Inteligência Artificial',
    description: 'Chatbots inteligentes com IA para atendimento no WhatsApp 24/7, automação de fluxos e integração com sistemas.',
    price: 'A partir de R$ 1.500',
    badge: 'Inovação',
    icon: 'mdi:robot-outline',
    iconBg: 'bg-purple-600',
    link: '/servicos/automacao-ia',
  },
  {
    id: 4,
    title: 'Gestão de Anúncios (Google & Meta Ads)',
    description: 'Tráfego pago de alta conversão no Google Ads, Instagram e Facebook com foco em ROI e geração constante de leads.',
    price: 'A partir de R$ 500/mês',
    badge: 'Destaque',
    icon: 'mdi:bullseye-arrow',
    iconBg: 'bg-emerald-600',
    link: '/servicos/gestao-anuncios',
  },
  {
    id: 5,
    title: 'Gestão de Redes Sociais',
    description: 'Planejamento editorial, criação de artes profissionais, reels e posicionamento estratégico de autoridade.',
    price: 'A partir de R$ 800/mês',
    icon: 'mdi:instagram',
    iconBg: 'bg-pink-600',
    link: '/servicos/gestao-redes-sociais',
  },
  {
    id: 6,
    title: 'Desenvolvimento de Apps Mobile',
    description: 'Aplicativos nativos e híbridos para iOS e Android com design intuitivo e sincronização em nuvem.',
    price: 'Sob Consulta',
    icon: 'mdi:cellphone',
    iconBg: 'bg-cyan-600',
    link: '/servicos/desenvolvimento-apps',
  },
  {
    id: 7,
    title: 'Marketing Digital Completo',
    description: 'Pacote integrado 360° unindo redes sociais, tráfego pago, SEO e relatórios mensais detalhados.',
    price: 'A partir de R$ 1.200/mês',
    icon: 'mdi:chart-line',
    iconBg: 'bg-indigo-600',
    link: '/servicos/marketing-digital',
  },
  {
    id: 8,
    title: 'Design Gráfico & Branding',
    description: 'Criação de logotipos, identidades visuais completas, manuais de marca e materiais para mídias online e offline.',
    price: 'A partir de R$ 800',
    icon: 'mdi:palette-outline',
    iconBg: 'bg-orange-600',
    link: '/servicos/design-grafico',
  },
  {
    id: 9,
    title: 'Consultoria Estratégica em Marketing',
    description: 'Diagnóstico de presença digital, mapeamento de funil de vendas e orientação direta para escalar seu negócio.',
    price: 'A partir de R$ 1.500',
    icon: 'mdi:lightbulb-on-outline',
    iconBg: 'bg-amber-600',
    link: '/servicos/consultoria-marketing',
  },
  {
    id: 10,
    title: 'Planejamento de Campanhas',
    description: 'Estruturação estratégica para lançamentos sazonais, Black Friday e campanhas promocionais de alto impacto.',
    price: 'Sob Consulta',
    icon: 'mdi:file-document-edit-outline',
    iconBg: 'bg-teal-600',
    link: '/servicos/planejamento-campanhas',
  },
  {
    id: 11,
    title: 'Publicidade e Propaganda',
    description: 'Campanhas publicitárias multicanais com storytelling persuasivo e materiais de divulgação.',
    price: 'Sob Consulta',
    icon: 'mdi:bullhorn-outline',
    iconBg: 'bg-rose-600',
    link: '/servicos/publicidade',
  },
  {
    id: 12,
    title: 'Organização Comercial & Processos',
    description: 'Otimização de rotinas de atendimento, implantação de CRM e alinhamento do processo comercial.',
    price: 'Sob Consulta',
    icon: 'mdi:briefcase-check-outline',
    iconBg: 'bg-slate-600',
    link: '/servicos/organizacao-comercial',
  },
  {
    id: 13,
    title: 'Relações Públicas & Assessoria',
    description: 'Construção de autoridade da marca, comunicação institucional e assessoria estratégica.',
    price: 'A partir de R$ 2.000/mês',
    icon: 'mdi:account-group-outline',
    iconBg: 'bg-violet-600',
    link: '/servicos/relacoes-publicas',
  },
]

const diffs = [
  { title: 'Agilidade & Prazos', icon: 'mdi:clock-fast', desc: 'Cronogramas bem definidos com entregas pontuais e acompanhamento contínuo.' },
  { title: 'Personalização Total', icon: 'mdi:tune-variant', desc: 'Soluções moldadas às particularidades e necessidades reais da sua empresa.' },
  { title: 'Foco em ROI', icon: 'mdi:chart-areaspline', desc: 'Métricas claras e relatórios transparentes focados no retorno financeiro.' },
  { title: 'Suporte Humanizado', icon: 'mdi:headset', desc: 'Atendimento direto com especialistas dedicados via WhatsApp e chamadas.' },
]
</script>

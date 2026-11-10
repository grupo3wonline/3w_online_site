<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import CtaSection from '@/components/layout/CtaSection.vue'
import HelpTooltip from '@/components/ui/HelpTooltip.vue'
import { company, socialLinks } from '@/config/site'

// ---- Benefícios / funcionalidades ----
const features = [
  {
    icon: 'fa6-solid:bolt',
    title: 'Criação Ultra Rápida',
    description: 'Gere orçamentos profissionais em minutos, não em horas.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: 'fa6-solid:file-pdf',
    title: 'PDF Profissional',
    description: 'Exportação automática em formato PDF de alta qualidade.',
    color: 'from-red-500 to-pink-500',
  },
  {
    icon: 'fa6-solid:shield-halved',
    title: '100% Seguro',
    description: 'Processamento local: seus dados nunca saem do dispositivo.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'fa6-solid:mobile-screen',
    title: 'Totalmente Responsivo',
    description: 'Funciona perfeitamente em qualquer dispositivo (mobile first).',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'fa6-solid:infinity',
    title: 'Gratuito Ilimitado',
    description: 'Use quantas vezes quiser, sem custos ou restrições.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: 'fa6-solid:calculator',
    title: 'Cálculos Precisos',
    description: 'Precificação inteligente com base no mercado.',
    color: 'from-pink-500 to-rose-500',
  },
]

// ---- Dor x Solução (antes vs depois) ----
const painPoints = [
  'Horas montando orçamento no Word ou Excel',
  'Propostas com aparência amadora',
  'Erros de cálculo que corroem sua margem',
  'Cliente esfria enquanto você monta a proposta',
]
const gains = [
  'Orçamento pronto em poucos minutos',
  'PDF elegante que transmite autoridade',
  'Cálculo automático, sem erros',
  'Resposta rápida enquanto o cliente está quente',
]

// ---- Comparativo ----
const comparison = [
  { label: 'Tempo para montar', manual: '1 a 2 horas', tool: 'Menos de 5 minutos' },
  { label: 'Aparência da proposta', manual: 'Amadora', tool: 'Profissional em PDF' },
  { label: 'Risco de erro no cálculo', manual: 'Alto', tool: 'Zero (automático)' },
  { label: 'Custo', manual: 'Seu tempo', tool: 'Grátis e ilimitado' },
  {
    label: 'Privacidade dos dados',
    manual: 'Arquivos espalhados',
    tool: '100% local no navegador',
  },
]

// ---- Como funciona (passos gerais) ----
const steps = [
  {
    number: '1',
    title: 'Defina os Serviços',
    description: 'Selecione os serviços de social mídia que você vai oferecer.',
    icon: 'fa6-solid:list-check',
  },
  {
    number: '2',
    title: 'Configure Preços',
    description: 'Ajuste os valores conforme a complexidade e o volume.',
    icon: 'fa6-solid:dollar-sign',
  },
  {
    number: '3',
    title: 'Personalize Dados',
    description: 'Adicione informações do cliente e da sua empresa.',
    icon: 'fa6-solid:user-pen',
  },
  {
    number: '4',
    title: 'Gere e Envie',
    description: 'Baixe o PDF profissional e envie para seu cliente.',
    icon: 'fa6-solid:paper-plane',
  },
]

// ---- Serviços (unificado da página Serviços, com features) ----
const services = [
  {
    icon: 'fa6-solid:chart-line',
    title: 'Consultoria em Precificação',
    description: 'Preços competitivos e lucrativos para seus serviços de social mídia.',
    features: ['Análise de mercado', 'Cálculo de custos', 'Margem de lucro ideal'],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'fa6-solid:file-contract',
    title: 'Modelos de Propostas',
    description: 'Templates profissionais pré-configurados para diferentes tipos de serviços.',
    features: ['Gestão de redes sociais', 'Criação de conteúdo', 'Tráfego pago'],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: 'fa6-solid:calculator',
    title: 'Calculadora Inteligente',
    description: 'Ferramenta automatizada para calcular orçamentos complexos rapidamente.',
    features: ['Cálculo automático', 'Personalização total', 'Exportação em PDF'],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: 'fa6-solid:users',
    title: 'Gestão de Clientes',
    description: 'Organize informações e o histórico de orçamentos de cada cliente.',
    features: ['Dados seguros', 'Histórico completo', 'Fácil acesso'],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'fa6-solid:umbrella',
    title: 'Suporte Especializado',
    description: 'Tire dúvidas e receba orientações sobre precificação e propostas.',
    features: ['Canal direto', 'Respostas rápidas', 'Dicas profissionais'],
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: 'fa6-solid:code',
    title: 'Desenvolvimento Personalizado',
    description: 'Sistemas sob medida para as necessidades do seu negócio.',
    features: ['100% personalizado', 'Tecnologias modernas', 'Escalável e seguro'],
    color: 'from-indigo-500 to-purple-500',
  },
]

// ---- Processo (da página Serviços) ----
const process = [
  { n: '1', title: 'Análise', text: 'Entendemos suas necessidades', color: 'bg-purple-600' },
  { n: '2', title: 'Planejamento', text: 'Criamos a melhor estratégia', color: 'bg-indigo-600' },
  { n: '3', title: 'Execução', text: 'Implementamos a solução', color: 'bg-purple-600' },
  { n: '4', title: 'Suporte', text: 'Acompanhamos os resultados', color: 'bg-indigo-600' },
]

// ---- Ferramentas ----
const tools = [
  {
    name: 'Calculadora de Orçamento',
    description: 'Crie orçamentos profissionais para social mídia em minutos.',
    icon: 'fa6-solid:calculator',
    to: '/calculadora',
    color: 'from-purple-500 to-indigo-500',
    highlight: true,
  },
  {
    name: 'Gerador de Propostas',
    description: 'Templates prontos para diferentes tipos de serviços.',
    icon: 'fa6-solid:file-lines',
    to: '/calculadora',
    color: 'from-blue-500 to-cyan-500',
    highlight: false,
  },
  {
    name: 'Calculadora de ROI',
    description: 'Calcule o retorno sobre investimento das campanhas.',
    icon: 'fa6-solid:chart-line',
    to: '/calculadora',
    color: 'from-green-500 to-emerald-500',
    highlight: false,
  },
  {
    name: 'Precificação de Serviços',
    description: 'Descubra quanto cobrar por cada serviço oferecido.',
    icon: 'fa6-solid:tags',
    to: '/calculadora',
    color: 'from-yellow-500 to-orange-500',
    highlight: false,
  },
]

// ---- Características das ferramentas (da página Ferramentas) ----
const toolFeatures = [
  {
    title: 'Processamento Local',
    description: 'Todos os cálculos são feitos no seu navegador, garantindo total privacidade.',
    icon: 'fa6-solid:lock',
  },
  {
    title: 'Exportação em PDF',
    description: 'Gere documentos profissionais prontos para enviar aos clientes.',
    icon: 'fa6-solid:file-pdf',
  },
  {
    title: 'Totalmente Gratuito',
    description: 'Use quantas vezes quiser sem custo algum.',
    icon: 'fa6-solid:gift',
  },
  {
    title: 'Sempre Atualizado',
    description: 'Novas funcionalidades e melhorias constantes.',
    icon: 'fa6-solid:arrows-rotate',
  },
]

// ---- Instruções de uso (da página Ferramentas) ----
const howTo = [
  {
    n: '1',
    title: 'Acesse a Calculadora',
    text: 'Clique em "Calculadora" no menu principal ou na ferramenta destacada.',
  },
  {
    n: '2',
    title: 'Preencha os Dados',
    text: 'Informe os serviços que você oferece, quantidades e valores. Personalize conforme necessário.',
  },
  {
    n: '3',
    title: 'Revise o Orçamento',
    text: 'Visualize o orçamento completo com todos os valores calculados automaticamente.',
  },
  {
    n: '4',
    title: 'Gere o PDF',
    text: 'Exporte o documento profissional e envie para seu cliente.',
  },
]

// ---- Sobre: pilares, tecnologias, capacidades (da página Sobre) ----
const pillars = [
  {
    icon: 'fa6-solid:rocket',
    title: 'Missão',
    text: 'Facilitar a criação de orçamentos profissionais para profissionais de social mídia.',
  },
  {
    icon: 'fa6-solid:eye',
    title: 'Visão',
    text: 'Ser a ferramenta mais utilizada por profissionais de marketing digital no Brasil.',
  },
  {
    icon: 'fa6-solid:heart',
    title: 'Valores',
    text: 'Simplicidade, segurança, qualidade e acessibilidade para todos.',
  },
]

const tech = [
  {
    emoji: '💚',
    name: 'Vue 3',
    desc: 'Framework progressivo para interfaces reativas e performáticas.',
  },
  { emoji: '⚡', name: 'Vite', desc: 'Build tool ultra-rápido para desenvolvimento ágil.' },
  {
    emoji: '🎨',
    name: 'Tailwind CSS',
    desc: 'Framework CSS moderno para design responsivo e elegante.',
  },
  {
    emoji: '📘',
    name: 'TypeScript',
    desc: 'Tipagem estática para código mais seguro e confiável.',
  },
  { emoji: '📄', name: 'jsPDF', desc: 'Geração de PDF profissional direto no navegador.' },
  {
    emoji: '🔒',
    name: 'Segurança & Privacidade',
    desc: 'Conformidade com LGPD, GDPR, CCPA e POPIA.',
  },
]

const capabilities = [
  {
    icon: 'fa6-solid:laptop-code',
    title: 'Desenvolvimento Web',
    text: 'Sites e sistemas personalizados',
  },
  { icon: 'fa6-solid:mobile-screen', title: 'Apps Responsivos', text: 'Aplicações mobile-first' },
  { icon: 'fa6-solid:headset', title: 'Suporte Premium', text: 'Atendimento especializado' },
]

const stats = [
  { icon: 'fa6-solid:users', value: '2.500+', label: 'Usuários Ativos' },
  { icon: 'fa6-solid:file-invoice', value: '10.000+', label: 'Orçamentos Criados' },
  { icon: 'fa6-solid:star', value: '4.9/5', label: 'Avaliação Média' },
  { icon: 'fa6-solid:clock', value: '5min', label: 'Tempo Médio' },
]

const guarantees = [
  {
    icon: 'fa6-solid:lock',
    title: 'Privacidade garantida',
    text: 'Processamento 100% local, sem envio de dados.',
  },
  {
    icon: 'fa6-solid:gift',
    title: 'Grátis para sempre',
    text: 'Sem cartão, sem cadastro, sem pegadinha.',
  },
  {
    icon: 'fa6-solid:infinity',
    title: 'Uso ilimitado',
    text: 'Quantos orçamentos quiser, quando quiser.',
  },
]

const testimonials = [
  {
    name: 'Ana Silva',
    role: 'Social Media Freelancer',
    comment:
      'Ferramenta incrível! Economizo horas toda semana criando orçamentos. Muito profissional!',
    avatar: 'fa6-solid:circle-user',
  },
  {
    name: 'Carlos Mendes',
    role: 'Agência de Marketing',
    comment: 'Perfeito para nossa equipe. PDFs lindos e cálculos precisos. Recomendo!',
    avatar: 'fa6-solid:user-tie',
  },
  {
    name: 'Marina Costa',
    role: 'Gestora de Mídias',
    comment: 'A melhor ferramenta gratuita que já usei. Interface moderna e super fácil de usar.',
    avatar: 'fa6-solid:user-graduate',
  },
]

const faqs = [
  {
    q: 'A ferramenta é realmente gratuita?',
    a: 'Sim! 100% gratuita, sem limites de uso, sem necessidade de cadastro e sem taxas ocultas.',
  },
  {
    q: 'Meus dados são seguros?',
    a: 'Totalmente. Todo processamento é feito localmente no seu navegador. Nenhum dado é enviado para servidores externos.',
  },
  {
    q: 'Posso personalizar os orçamentos?',
    a: 'Sim! Você pode personalizar serviços, preços, informações da empresa e do cliente.',
  },
  {
    q: 'Preciso instalar algo?',
    a: 'Não. Funciona direto no navegador, em qualquer dispositivo, sem instalação.',
  },
]

const tips = [
  {
    title: 'Seja Transparente',
    text: 'Detalhe todos os serviços incluídos no orçamento para evitar mal-entendidos.',
  },
  {
    title: 'Precifique com Inteligência',
    text: 'Considere seu tempo, experiência e custos operacionais ao definir valores.',
  },
  {
    title: 'Personalize Sempre',
    text: 'Adapte cada orçamento às necessidades específicas de cada cliente.',
  },
]
</script>

<template>
  <div class="space-y-16">
    <!-- BARRA DE URGÊNCIA -->
    <div
      class="-mt-2 flex flex-wrap items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-center text-sm font-semibold text-white shadow-lg"
    >
      <Icon icon="fa6-solid:fire" aria-hidden="true" />
      Oferta de lançamento: ferramenta 100% gratuita por tempo limitado — aproveite antes que vire
      pago!
    </div>

    <!-- HERO -->
    <section
      class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 p-8 text-white shadow-2xl md:p-16"
    >
      <div class="bg-grid pointer-events-none absolute inset-0 opacity-40" />
      <div class="pointer-events-none absolute inset-0 opacity-20">
        <div
          class="absolute left-0 top-0 h-72 w-72 animate-pulse rounded-full bg-purple-500 blur-3xl"
        />
        <div
          class="absolute bottom-0 right-0 h-96 w-96 animate-pulse rounded-full bg-indigo-500 blur-3xl"
        />
      </div>
      <div class="relative z-10 mx-auto max-w-4xl text-center">
        <span
          class="glass mb-6 inline-flex items-center gap-2 rounded-full px-6 py-2 text-sm font-semibold text-purple-100"
        >
          <Icon icon="fa6-solid:star" class="text-yellow-300" aria-hidden="true" />
          100% Gratuito • Sem Cadastro • Ilimitado
        </span>
        <h1 class="mb-6 text-4xl font-bold leading-tight md:text-6xl">
          Crie Orçamentos <span class="text-gradient">Profissionais</span> para Social Mídia
        </h1>
        <p class="mx-auto mb-8 max-w-3xl text-xl text-purple-200 md:text-2xl">
          Ferramenta completa e gratuita para freelancers e agências criarem propostas
          impressionantes em minutos.
        </p>
        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <RouterLink
            to="/calculadora"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-bold text-purple-700 shadow-xl transition hover:-translate-y-0.5 hover:bg-purple-50"
          >
            <Icon icon="fa6-solid:calculator" aria-hidden="true" />
            <span>Começar Agora Grátis</span>
            <Icon icon="fa6-solid:arrow-right" aria-hidden="true" />
          </RouterLink>
          <a
            href="#ferramentas"
            class="inline-flex items-center gap-2 rounded-lg border border-purple-400/30 bg-purple-500/20 px-8 py-4 font-semibold text-white transition hover:bg-purple-500/30"
          >
            <Icon icon="fa6-solid:circle-play" aria-hidden="true" />
            <span>Ver Recursos</span>
          </a>
        </div>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm">
          <span class="flex items-center gap-2"
            ><Icon icon="fa6-solid:circle-check" class="text-green-400" aria-hidden="true" /> Sem
            Cadastro</span
          >
          <span class="flex items-center gap-2"
            ><Icon icon="fa6-solid:circle-check" class="text-green-400" aria-hidden="true" /> Sem
            Limites</span
          >
          <span class="flex items-center gap-2"
            ><Icon icon="fa6-solid:circle-check" class="text-green-400" aria-hidden="true" /> 100%
            Seguro</span
          >
        </div>
      </div>
    </section>

    <!-- PROVA SOCIAL RÁPIDA (números) -->
    <section aria-label="Números da ferramenta">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-6 text-center text-white shadow-xl"
        >
          <Icon :icon="stat.icon" class="mb-3 text-4xl opacity-80" aria-hidden="true" />
          <div class="text-3xl font-bold">{{ stat.value }}</div>
          <div class="text-sm text-purple-200">{{ stat.label }}</div>
        </div>
      </div>
    </section>

    <!-- DOR x SOLUÇÃO (antes vs depois) -->
    <section aria-labelledby="antes-depois">
      <div class="mb-12 text-center">
        <h2 id="antes-depois" class="section-title mb-4">Pare de perder tempo (e clientes)</h2>
        <p class="mx-auto max-w-2xl text-xl text-muted-foreground">
          Veja a diferença entre montar orçamento na mão e usar nossa ferramenta.
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <div
          class="rounded-2xl border border-red-200 bg-red-50 p-8 dark:border-red-900/40 dark:bg-red-950/20"
        >
          <h3 class="mb-4 flex items-center gap-2 text-xl font-bold text-red-700 dark:text-red-400">
            <Icon icon="fa6-solid:xmark" aria-hidden="true" /> Do jeito antigo
          </h3>
          <ul class="space-y-3">
            <li
              v-for="item in painPoints"
              :key="item"
              class="flex items-start gap-3 text-muted-foreground"
            >
              <Icon icon="fa6-solid:xmark" class="mt-1 text-red-500" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
        <div
          class="rounded-2xl border-2 border-green-300 bg-green-50 p-8 dark:border-green-900/40 dark:bg-green-950/20"
        >
          <h3
            class="mb-4 flex items-center gap-2 text-xl font-bold text-green-700 dark:text-green-400"
          >
            <Icon icon="fa6-solid:circle-check" aria-hidden="true" /> Com a nossa calculadora
          </h3>
          <ul class="space-y-3">
            <li v-for="item in gains" :key="item" class="flex items-start gap-3 text-foreground">
              <Icon icon="fa6-solid:circle-check" class="mt-1 text-green-500" aria-hidden="true" />
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- BENEFÍCIOS -->
    <section aria-labelledby="beneficios">
      <div class="mb-12 text-center">
        <h2 id="beneficios" class="section-title mb-4">Por Que Escolher Nossa Ferramenta?</h2>
        <p class="mx-auto max-w-2xl text-xl text-muted-foreground">
          Recursos poderosos que vão transformar a forma como você cria orçamentos.
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="feature in features"
          :key="feature.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0 }"
          class="card-surface group p-6 transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <div
            :class="`mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} transition group-hover:scale-110`"
          >
            <Icon :icon="feature.icon" class="text-2xl text-white" aria-hidden="true" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-foreground">{{ feature.title }}</h3>
          <p class="text-muted-foreground">{{ feature.description }}</p>
        </article>
      </div>
    </section>

    <!-- COMPARATIVO -->
    <section class="card-surface overflow-hidden p-0" aria-labelledby="comparativo">
      <div class="p-8 pb-0 text-center md:p-12 md:pb-0">
        <h2 id="comparativo" class="section-title mb-4">Planilha manual vs. nossa ferramenta</h2>
        <p class="mx-auto mb-8 max-w-2xl text-muted-foreground">
          A escolha é simples quando você vê lado a lado.
        </p>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[520px] text-left">
          <thead>
            <tr class="border-y border-border bg-muted/50 text-sm">
              <th class="px-6 py-4 font-semibold text-foreground">Critério</th>
              <th class="px-6 py-4 font-semibold text-muted-foreground">Planilha manual</th>
              <th class="px-6 py-4 font-semibold text-primary">Orçamento Social Mídia</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in comparison"
              :key="row.label"
              class="border-b border-border text-sm last:border-0"
            >
              <td class="px-6 py-4 font-medium text-foreground">{{ row.label }}</td>
              <td class="px-6 py-4 text-muted-foreground">
                <Icon icon="fa6-solid:xmark" class="mr-2 text-red-500" aria-hidden="true" />{{
                  row.manual
                }}
              </td>
              <td class="px-6 py-4 font-medium text-foreground">
                <Icon
                  icon="fa6-solid:circle-check"
                  class="mr-2 text-green-500"
                  aria-hidden="true"
                />{{ row.tool }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="card-surface p-8 md:p-12" aria-labelledby="como-funciona">
      <div class="mb-12 text-center">
        <h2 id="como-funciona" class="section-title mb-4">Como Funciona?</h2>
        <p class="text-xl text-muted-foreground">
          Apenas 4 passos simples para um orçamento profissional.
        </p>
      </div>
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="step in steps" :key="step.number" class="text-center">
          <div class="relative mb-4 inline-block">
            <div
              class="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-2xl font-bold text-white shadow-lg"
            >
              {{ step.number }}
            </div>
            <div
              class="absolute -bottom-2 -right-2 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-400 to-pink-400"
            >
              <Icon :icon="step.icon" class="text-white" aria-hidden="true" />
            </div>
          </div>
          <h3 class="mb-2 text-xl font-bold text-foreground">{{ step.title }}</h3>
          <p class="text-muted-foreground">{{ step.description }}</p>
        </div>
      </div>
      <div class="mt-12 text-center">
        <RouterLink to="/calculadora" class="btn-primary">
          <span>Criar Meu Primeiro Orçamento</span>
          <Icon icon="fa6-solid:arrow-right" aria-hidden="true" />
        </RouterLink>
      </div>
    </section>

    <!-- SERVIÇOS (unificado — com features) -->
    <section id="servicos" class="scroll-mt-24" aria-labelledby="servicos-title">
      <div class="mb-12 text-center">
        <h2 id="servicos-title" class="section-title mb-4">Nossos Serviços</h2>
        <p class="mx-auto max-w-2xl text-xl text-muted-foreground">
          Soluções completas para profissionais de social mídia.
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="service in services"
          :key="service.title"
          class="card-surface group p-8 transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <div
            :class="`mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${service.color} transition group-hover:scale-110`"
          >
            <Icon :icon="service.icon" class="text-3xl text-white" aria-hidden="true" />
          </div>
          <h3 class="mb-3 text-2xl font-bold text-foreground">{{ service.title }}</h3>
          <p class="mb-6 text-muted-foreground">{{ service.description }}</p>
          <ul class="space-y-2">
            <li
              v-for="f in service.features"
              :key="f"
              class="flex items-center gap-2 text-foreground"
            >
              <Icon icon="fa6-solid:circle-check" class="text-green-500" aria-hidden="true" />
              {{ f }}
            </li>
          </ul>
        </article>
      </div>
    </section>

    <!-- PROCESSO -->
    <section class="card-surface p-8 md:p-12" aria-labelledby="processo">
      <h2
        id="processo"
        class="section-title mb-8 flex items-center justify-center gap-3 text-center"
      >
        <Icon icon="fa6-solid:gears" class="text-primary" aria-hidden="true" /> Nosso Processo
      </h2>
      <div class="grid gap-6 md:grid-cols-4">
        <div v-for="step in process" :key="step.n" class="text-center">
          <div
            :class="`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white ${step.color}`"
          >
            {{ step.n }}
          </div>
          <h3 class="mb-2 font-bold text-foreground">{{ step.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ step.text }}</p>
        </div>
      </div>
    </section>

    <!-- FERRAMENTAS -->
    <section id="ferramentas" class="scroll-mt-24" aria-labelledby="ferramentas-title">
      <div class="mb-12 text-center">
        <h2 id="ferramentas-title" class="section-title mb-4">Ferramentas Gratuitas</h2>
        <p class="text-xl text-muted-foreground">
          Recursos poderosos para profissionalizar seu trabalho.
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-2">
        <RouterLink
          v-for="tool in tools"
          :key="tool.name"
          :to="tool.to"
          :class="[
            'card-surface group relative overflow-hidden p-8 transition hover:-translate-y-1 hover:shadow-2xl',
            tool.highlight ? 'border-2 border-purple-500' : '',
          ]"
        >
          <span
            v-if="tool.highlight"
            class="absolute right-4 top-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-3 py-1 text-xs font-bold text-white"
          >
            <Icon icon="fa6-solid:star" class="mr-1 inline" aria-hidden="true" /> PRINCIPAL
          </span>
          <div
            :class="`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.color} transition group-hover:scale-110`"
          >
            <Icon :icon="tool.icon" class="text-3xl text-white" aria-hidden="true" />
          </div>
          <h3 class="mb-3 text-2xl font-bold text-foreground">{{ tool.name }}</h3>
          <p class="mb-4 text-muted-foreground">{{ tool.description }}</p>
          <span class="inline-flex items-center gap-2 font-semibold text-primary">
            Acessar Ferramenta
            <Icon
              icon="fa6-solid:arrow-right"
              class="transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </RouterLink>
      </div>
    </section>

    <!-- CARACTERÍSTICAS DAS FERRAMENTAS -->
    <section class="card-surface p-8 md:p-12" aria-labelledby="caracteristicas">
      <h2
        id="caracteristicas"
        class="section-title mb-8 flex items-center justify-center gap-3 text-center"
      >
        <Icon icon="fa6-solid:star" class="text-primary" aria-hidden="true" /> Características das
        Ferramentas
      </h2>
      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="f in toolFeatures" :key="f.title" class="text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-slate-700 dark:to-slate-800"
          >
            <Icon :icon="f.icon" class="text-2xl text-primary" aria-hidden="true" />
          </div>
          <h3 class="mb-2 font-bold text-foreground">{{ f.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ f.description }}</p>
        </div>
      </div>
    </section>

    <!-- INSTRUÇÕES DE USO -->
    <section
      class="rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 p-8 dark:from-slate-800 dark:to-slate-900 md:p-12"
      aria-labelledby="instrucoes"
    >
      <h2
        id="instrucoes"
        class="section-title mb-8 flex items-center justify-center gap-3 text-center"
      >
        <Icon icon="fa6-solid:book-open" class="text-primary" aria-hidden="true" /> Como Usar a
        Calculadora
      </h2>
      <div class="mx-auto max-w-3xl space-y-6">
        <div v-for="s in howTo" :key="s.n" class="card-surface p-6">
          <div class="flex items-start gap-4">
            <span
              class="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground"
            >
              {{ s.n }}
            </span>
            <div>
              <h3 class="mb-2 font-bold text-foreground">{{ s.title }}</h3>
              <p class="text-muted-foreground">{{ s.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SOBRE (unificado) -->
    <section id="sobre" class="card-surface scroll-mt-24 p-8 md:p-12" aria-labelledby="sobre-title">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 id="sobre-title" class="section-title mb-6 flex items-center gap-3">
            <Icon icon="fa6-solid:book-open" class="text-primary" aria-hidden="true" /> Nossa
            História
          </h2>
          <div class="space-y-4 text-muted-foreground">
            <p>
              A <strong>Calculadora de Orçamento para Social Mídia</strong> nasceu da necessidade
              real de profissionais da área que perdiam horas criando propostas comerciais
              manualmente.
            </p>
            <p>
              Desenvolvida pelo <strong>{{ company.name }}</strong
              >, empresa especializada em soluções web personalizadas, foi criada para democratizar
              o acesso a recursos profissionais de gestão comercial para freelancers e pequenas
              agências.
            </p>
            <p>
              Utilizando tecnologias modernas (Vue 3, TypeScript, Vite e Tailwind CSS), garantimos
              uma experiência rápida, segura e totalmente responsiva.
            </p>
          </div>
        </div>
        <div
          class="space-y-6 rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-100 to-indigo-100 p-8 dark:border-purple-900/40 dark:from-slate-800 dark:to-slate-900"
        >
          <div v-for="p in pillars" :key="p.title" class="flex items-start gap-4">
            <span class="rounded-lg bg-primary p-3">
              <Icon :icon="p.icon" class="text-2xl text-white" aria-hidden="true" />
            </span>
            <div>
              <h3 class="mb-1 font-bold text-foreground">{{ p.title }}</h3>
              <p class="text-muted-foreground">{{ p.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- GARANTIAS -->
    <section aria-label="Garantias">
      <div class="grid gap-4 md:grid-cols-3">
        <div
          v-for="g in guarantees"
          :key="g.title"
          class="flex items-start gap-4 rounded-2xl border border-border bg-muted/40 p-5"
        >
          <span
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"
          >
            <Icon :icon="g.icon" class="text-2xl" aria-hidden="true" />
          </span>
          <div>
            <h3 class="font-bold text-foreground">{{ g.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ g.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TECNOLOGIAS -->
    <section class="card-surface p-8 md:p-12" aria-labelledby="tecnologias">
      <h2
        id="tecnologias"
        class="section-title mb-8 flex items-center justify-center gap-3 text-center"
      >
        <Icon icon="fa6-solid:code" class="text-primary" aria-hidden="true" /> Tecnologias
        Utilizadas
      </h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div
          v-for="t in tech"
          :key="t.name"
          class="rounded-xl border-2 border-purple-100 p-6 text-center transition hover:border-purple-300 dark:border-purple-900/30"
        >
          <div class="mb-4 text-4xl">{{ t.emoji }}</div>
          <h3 class="mb-2 font-bold text-foreground">{{ t.name }}</h3>
          <p class="text-sm text-muted-foreground">{{ t.desc }}</p>
        </div>
      </div>
    </section>

    <!-- EMPRESA DESENVOLVEDORA -->
    <section
      class="rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-white shadow-2xl md:p-12"
    >
      <div class="mb-8 text-center">
        <h2 class="mb-4 text-3xl font-bold">Desenvolvido por {{ company.name }}</h2>
        <p class="text-xl text-purple-200">
          Especialistas em desenvolvimento de soluções web personalizadas sob demanda.
        </p>
      </div>
      <div class="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        <div v-for="c in capabilities" :key="c.title" class="text-center">
          <Icon :icon="c.icon" class="mb-4 text-5xl text-purple-400" aria-hidden="true" />
          <h3 class="mb-2 font-bold">{{ c.title }}</h3>
          <p class="text-sm text-purple-200">{{ c.text }}</p>
        </div>
      </div>
    </section>

    <!-- DEPOIMENTOS -->
    <section aria-labelledby="depoimentos">
      <div class="mb-12 text-center">
        <h2 id="depoimentos" class="section-title mb-4">O Que Dizem Nossos Usuários</h2>
        <p class="text-xl text-muted-foreground">
          Milhares de profissionais já confiam em nossa ferramenta.
        </p>
      </div>
      <div class="grid gap-6 md:grid-cols-3">
        <figure v-for="t in testimonials" :key="t.name" class="card-surface p-6">
          <div class="mb-4 flex items-center gap-4">
            <Icon :icon="t.avatar" class="text-4xl text-primary" aria-hidden="true" />
            <figcaption>
              <div class="font-bold text-foreground">{{ t.name }}</div>
              <div class="text-sm text-muted-foreground">{{ t.role }}</div>
            </figcaption>
          </div>
          <div class="mb-3 flex" aria-label="5 de 5 estrelas">
            <Icon
              v-for="i in 5"
              :key="i"
              icon="fa6-solid:star"
              class="text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <blockquote class="italic text-muted-foreground">“{{ t.comment }}”</blockquote>
        </figure>
      </div>
    </section>

    <!-- DICAS -->
    <section
      class="rounded-3xl bg-gradient-to-br from-purple-50 to-indigo-50 p-8 dark:from-slate-800 dark:to-slate-900 md:p-12"
      aria-labelledby="dicas"
    >
      <h2 id="dicas" class="section-title mb-8 flex items-center justify-center gap-3 text-center">
        <Icon icon="fa6-solid:lightbulb" class="text-yellow-500" aria-hidden="true" /> Dicas
        Profissionais
      </h2>
      <div class="grid gap-6 md:grid-cols-3">
        <div v-for="tip in tips" :key="tip.title" class="border-l-4 border-primary pl-4">
          <h3 class="mb-2 flex items-center gap-2 font-bold text-foreground">
            {{ tip.title }}
            <HelpTooltip :text="tip.text" />
          </h3>
          <p class="text-sm text-muted-foreground">{{ tip.text }}</p>
        </div>
      </div>
    </section>

    <!-- CTA intermediário -->
    <CtaSection />

    <!-- CONTATO -->
    <section id="contato" class="scroll-mt-24 space-y-8" aria-labelledby="contato-title">
      <div class="text-center">
        <h2 id="contato-title" class="section-title mb-4">Entre em Contato</h2>
        <p class="mx-auto max-w-2xl text-xl text-muted-foreground">
          Estamos aqui para ajudar. Fale com o {{ company.name }}!
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2">
        <a
          :href="company.whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="card-surface group flex flex-col items-center p-8 text-center transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white transition group-hover:scale-110"
          >
            <Icon icon="fa6-brands:whatsapp" class="text-3xl" aria-hidden="true" />
          </span>
          <h3 class="mb-2 text-xl font-bold text-foreground">WhatsApp</h3>
          <p class="text-lg font-medium text-primary">{{ company.whatsapp }}</p>
          <span
            class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"
          >
            Chamar agora <Icon icon="fa6-solid:arrow-right" aria-hidden="true" />
          </span>
        </a>

        <a
          :href="`mailto:${company.email}`"
          class="card-surface group flex flex-col items-center p-8 text-center transition hover:-translate-y-1 hover:shadow-2xl"
        >
          <span
            class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 text-white transition group-hover:scale-110"
          >
            <Icon icon="fa6-solid:envelope" class="text-3xl" aria-hidden="true" />
          </span>
          <h3 class="mb-2 text-xl font-bold text-foreground">E-mail</h3>
          <p class="text-lg font-medium text-primary">{{ company.email }}</p>
          <span
            class="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground"
          >
            Enviar e-mail <Icon icon="fa6-solid:arrow-right" aria-hidden="true" />
          </span>
        </a>
      </div>

      <div class="card-surface p-8 md:p-12">
        <div class="mx-auto max-w-3xl text-center">
          <span
            class="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary"
          >
            <Icon icon="fa6-solid:building" aria-hidden="true" /> {{ company.name }}
          </span>
          <h3 class="section-title mb-4">Transforme sua ideia em um sistema sob medida</h3>
          <p class="mb-2 text-lg text-muted-foreground">
            O {{ company.name }} desenvolve
            <strong>sites e sistemas personalizados sob demanda</strong>, com foco em performance,
            segurança e resultados. Do primeiro contato ao suporte contínuo, cuidamos de tudo para o
            seu negócio crescer online.
          </p>
          <p class="mb-6 text-sm font-semibold text-amber-600 dark:text-amber-400">
            <Icon icon="fa6-solid:fire" class="mr-1" aria-hidden="true" />
            Agenda com vagas limitadas neste mês — garanta a sua antes que feche.
          </p>
          <a :href="company.website" target="_blank" rel="noopener noreferrer" class="btn-primary">
            <span>Quero um orçamento sob demanda</span>
            <Icon icon="fa6-solid:arrow-right" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div
        class="rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-900 p-8 text-center text-white shadow-2xl md:p-12"
      >
        <h3 class="mb-6 text-3xl font-bold">Siga-nos nas Redes Sociais</h3>
        <div class="flex justify-center gap-6">
          <a
            v-for="social in socialLinks"
            :key="social.name"
            :href="social.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 transition hover:scale-110 hover:bg-white/20"
            :aria-label="social.name"
          >
            <Icon :icon="social.icon" class="text-3xl" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section aria-labelledby="faq">
      <div class="mb-8 text-center">
        <h2 id="faq" class="section-title">Perguntas Frequentes</h2>
      </div>
      <div class="mx-auto max-w-3xl space-y-4">
        <details v-for="faq in faqs" :key="faq.q" class="card-surface group p-6">
          <summary class="flex cursor-pointer items-center gap-3 font-bold text-foreground">
            <Icon icon="fa6-solid:circle-question" class="text-primary" aria-hidden="true" />
            {{ faq.q }}
          </summary>
          <p class="ml-9 mt-2 text-muted-foreground">{{ faq.a }}</p>
        </details>
      </div>
    </section>

    <!-- CTA final -->
    <CtaSection variant="secondary" />
  </div>
</template>

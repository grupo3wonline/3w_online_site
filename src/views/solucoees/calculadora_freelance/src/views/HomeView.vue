<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AppBreadcrumb from '@/components/layout/AppBreadcrumb.vue'
import CtaAgency from '@/components/shared/CtaAgency.vue'
import { COMPANY, SOCIAL_LINKS } from '@/lib/constants'

const stats = [
  { value: '1.250+', label: 'Freelancers', icon: 'fa-users' },
  { value: '5.000+', label: 'Cálculos Realizados', icon: 'fa-calculator' },
  { value: '100%', label: 'Gratuito', icon: 'fa-gift' },
  { value: '4.9/5', label: 'Avaliação', icon: 'fa-star' },
]

const benefits = [
  {
    icon: 'fa-bolt',
    title: 'Resultado em segundos',
    text: 'Preencha e receba seu valor ideal na hora, sem planilhas complicadas.',
  },
  {
    icon: 'fa-lock',
    title: '100% privado',
    text: 'Nada é enviado a servidores. Seus números ficam só no seu navegador.',
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Funciona no celular',
    text: 'Interface mobile first: calcule de onde estiver, a qualquer hora.',
  },
  {
    icon: 'fa-money-bill-trend-up',
    title: 'Cobre o preço justo',
    text: 'Pare de subprecificar. Descubra quanto o seu trabalho realmente vale.',
  },
]

const features = [
  {
    icon: 'fa-calculator',
    title: 'Cálculo de Valor/Hora',
    description:
      'Calcule com precisão quanto cobrar por hora, considerando suas metas, jornada e margem de lucro.',
    color: 'from-brand-600 to-purple-600',
  },
  {
    icon: 'fa-file-invoice-dollar',
    title: 'Orçamento de Projetos',
    description:
      'Estime valores de projetos considerando complexidade, horas necessárias e margem de lucro.',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    icon: 'fa-clock',
    title: 'Cálculo de Prazos',
    description:
      'Determine prazos realistas com base na sua disponibilidade diária e no escopo do projeto.',
    color: 'from-green-600 to-emerald-600',
  },
  {
    icon: 'fa-file-pdf',
    title: 'Geração de Propostas',
    description: 'Monte propostas comerciais profissionais com todos os detalhes do projeto.',
    color: 'from-orange-600 to-red-600',
  },
]

const steps = [
  {
    step: '1',
    icon: 'fa-pen-to-square',
    title: 'Insira Seus Dados',
    description: 'Informe suas metas mensais, horas disponíveis e custos operacionais.',
  },
  {
    step: '2',
    icon: 'fa-wand-magic-sparkles',
    title: 'Obtenha o Resultado',
    description: 'A ferramenta calcula automaticamente seu valor/hora ideal.',
  },
  {
    step: '3',
    icon: 'fa-rocket',
    title: 'Gere Propostas',
    description: 'Crie orçamentos profissionais e feche mais negócios.',
  },
]

const testimonials = [
  {
    name: 'Amanda Ribeiro',
    role: 'Designer Freelancer',
    text: 'Eu cobrava por intuição e vivia no vermelho. Em 5 minutos descobri que estava cobrando 40% abaixo. Hoje fecho projetos com segurança.',
    avatar: 'AR',
  },
  {
    name: 'Carlos Menezes',
    role: 'Desenvolvedor Web',
    text: 'A calculadora de prazo mudou meu jogo. Paro de prometer o impossível e entrego no prazo. Meus clientes confiam mais.',
    avatar: 'CM',
  },
  {
    name: 'Juliana Costa',
    role: 'Redatora & Social Media',
    text: 'O gerador de orçamento é fantástico. Copio, envio pro cliente e pareço muito mais profissional. Recomendo demais!',
    avatar: 'JC',
  },
]

const howToUse = [
  {
    title: 'Cálculo do Valor/Hora',
    icon: 'fa-dollar-sign',
    steps: [
      'Informe sua receita mensal desejada',
      'Defina quantas horas por dia você trabalha',
      'Especifique dias de trabalho por semana',
      'Adicione dias de férias/folga no ano',
      'Configure sua margem de lucro desejada',
      'Clique em "Calcular" e obtenha seu valor/hora ideal',
    ],
  },
  {
    title: 'Orçamento de Projetos',
    icon: 'fa-file-invoice-dollar',
    steps: [
      'Estime quantas horas o projeto demandará',
      'Use seu valor/hora calculado ou defina um customizado',
      'Selecione a complexidade do projeto (baixa, média ou alta)',
      'O sistema calcula automaticamente com ajuste de complexidade',
      'Use o valor para gerar sua proposta comercial',
    ],
  },
  {
    title: 'Cálculo de Prazos',
    icon: 'fa-clock',
    steps: [
      'Informe o total de horas estimadas do projeto',
      'Defina quantas horas por dia você pode dedicar',
      'Obtenha o prazo realista em dias úteis',
      'Use essa informação no seu planejamento e proposta',
    ],
  },
]

const tips = [
  {
    icon: 'fa-chart-line',
    title: 'Revise Periodicamente',
    description: 'Recalcule seu valor/hora a cada 6 meses ou quando seus custos mudarem.',
  },
  {
    icon: 'fa-shield-halved',
    title: 'Margem de Segurança',
    description: 'Sempre inclua uma margem de lucro de pelo menos 20-30%.',
  },
  {
    icon: 'fa-clock',
    title: 'Seja Realista',
    description: 'Estime prazos com folga para imprevistos e revisões.',
  },
  {
    icon: 'fa-handshake',
    title: 'Transparência',
    description: 'Explique claramente ao cliente como chegou nos valores propostos.',
  },
  {
    icon: 'fa-file-contract',
    title: 'Formalize Tudo',
    description: 'Use as propostas geradas como base para contratos formais.',
  },
  {
    icon: 'fa-coins',
    title: 'Considere Todos os Custos',
    description: 'Inclua impostos, ferramentas, internet e outros gastos operacionais.',
  },
]

const services = [
  {
    icon: 'fa-globe',
    title: 'Sites Institucionais',
    description:
      'Sites corporativos modernos, responsivos e otimizados para SEO que representam sua marca.',
    features: ['Design Responsivo', 'SEO Otimizado', 'CMS', 'Integração com Redes Sociais'],
  },
  {
    icon: 'fa-shopping-cart',
    title: 'E-commerce',
    description: 'Lojas virtuais completas com gestão de produtos, pagamentos e entregas.',
    features: ['Múltiplos Pagamentos', 'Gestão de Estoque', 'Relatórios', 'Integrações Logísticas'],
  },
  {
    icon: 'fa-code',
    title: 'Sistemas Web',
    description: 'Sistemas personalizados desenvolvidos sob medida para o seu negócio.',
    features: ['Desenvolvimento Sob Medida', 'Banco de Dados', 'APIs', 'Painel Administrativo'],
  },
  {
    icon: 'fa-mobile-screen',
    title: 'Aplicativos',
    description: 'Apps nativos e híbridos para iOS e Android com ótima experiência de uso.',
    features: ['Design Intuitivo', 'Push Notifications', 'Modo Offline', 'Tempo Real'],
  },
  {
    icon: 'fa-chart-line',
    title: 'Marketing Digital',
    description: 'Estratégias para aumentar sua presença online e gerar resultados mensuráveis.',
    features: ['Google Ads', 'Redes Sociais', 'E-mail Marketing', 'Analytics'],
  },
  {
    icon: 'fa-headset',
    title: 'Suporte e Manutenção',
    description: 'Suporte técnico especializado e manutenção preventiva para manter tudo online.',
    features: ['Monitoramento 24/7', 'Atualizações', 'Backup Automático', 'Suporte Prioritário'],
  },
]

// Contato (migrado da página Contato)
const channels = [
  {
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp',
    content: COMPANY.whatsappDisplay,
    link: COMPANY.whatsappLink,
    accent: 'bg-green-500',
    cta: 'Chamar no WhatsApp',
  },
  {
    icon: 'fas fa-envelope',
    title: 'E-mail',
    content: COMPANY.email,
    link: `mailto:${COMPANY.email}`,
    accent: 'bg-brand-600',
    cta: 'Enviar e-mail',
  },
]

const faqs = [
  {
    q: 'A Calculadora Freelancer é realmente gratuita?',
    a: 'Sim. A ferramenta é 100% gratuita e sem limites de uso. Faça quantos cálculos precisar.',
  },
  {
    q: 'Meus dados são salvos ou compartilhados?',
    a: 'Não. Todos os cálculos são feitos localmente no seu navegador. Não armazenamos nem compartilhamos os dados que você insere.',
  },
  {
    q: 'Posso usar em dispositivos móveis?',
    a: 'Com certeza. A ferramenta é totalmente responsiva e funciona em smartphones, tablets e desktops.',
  },
  {
    q: 'Como o Grupo 3W Online pode me ajudar?',
    a: 'Desenvolvemos sites, sistemas web, e-commerce e aplicativos personalizados sob demanda. Fale conosco para uma solução digital profissional.',
  },
  {
    q: 'Vocês oferecem suporte técnico?',
    a: 'Sim. Em caso de dúvidas ou problemas, entre em contato pelo WhatsApp ou e-mail acima.',
  },
  {
    q: 'Posso sugerir melhorias?',
    a: 'Claro! Adoramos feedback. Envie suas sugestões pelos nossos canais de atendimento.',
  },
]

const stagger = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  visibleOnce: { opacity: 1, y: 0, transition: { delay: i * 90 } },
})
</script>

<template>
  <div>
    <div class="container-app">
      <AppBreadcrumb :items="[{ label: 'Início' }]" />
    </div>

    <!-- HERO -->
    <section class="relative overflow-hidden bg-mesh py-16 sm:py-24">
      <div
        class="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-400/20 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        class="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-fuchsia-400/20 blur-3xl"
        aria-hidden="true"
      ></div>

      <div class="container-app relative">
        <div
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :enter="{ opacity: 1, y: 0, transition: { duration: 700 } }"
          class="mx-auto max-w-4xl text-center"
        >
          <span class="eyebrow mb-6">
            <i class="fas fa-rocket"></i> Ferramenta #1 para Freelancers no Brasil
          </span>

          <h1
            class="mb-6 font-display text-4xl font-extrabold leading-[1.1] text-balance md:text-6xl"
          >
            Calcule Seus Preços com <span class="gradient-text">Precisão Profissional</span>
          </h1>

          <p
            class="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-balance text-gray-600 dark:text-gray-300 sm:text-xl"
          >
            Descubra quanto vale o seu trabalho. Nossa calculadora inteligente ajuda freelancers a
            definirem valores justos, gerarem orçamentos profissionais e fecharem mais projetos.
          </p>

          <div class="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <RouterLink to="/calculadora" class="btn-primary px-8 py-4 text-lg">
              <i class="fas fa-calculator"></i>
              Começar Agora — 100% Grátis
              <i class="fas fa-arrow-right"></i>
            </RouterLink>
            <a href="#sobre" class="btn-outline px-8 py-4 text-lg">
              <i class="fas fa-circle-info"></i> Saiba Mais
            </a>
          </div>

          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div
              v-for="(stat, i) in stats"
              :key="stat.label"
              v-motion="stagger(i)"
              class="glass rounded-2xl p-4 shadow-soft"
            >
              <i
                class="fas mb-2 text-3xl text-brand-600 dark:text-brand-400"
                :class="stat.icon"
              ></i>
              <div class="font-display text-2xl font-bold text-gray-900 dark:text-white">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BARRA DE URGÊNCIA -->
    <div class="bg-brand-950 py-3 text-center text-sm font-semibold text-white">
      <div
        class="container-app flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-3"
      >
        <span class="inline-flex items-center gap-2">
          <i class="fas fa-fire animate-pulse text-amber-400"></i>
          Oferta de lançamento: acesso 100% gratuito por tempo limitado
        </span>
        <RouterLink to="/calculadora" class="underline underline-offset-2 hover:text-amber-300">
          Aproveitar agora →
        </RouterLink>
      </div>
    </div>

    <!-- BENEFÍCIOS -->
    <section class="section bg-white dark:bg-gray-950">
      <div class="container-app">
        <div class="mb-14 text-center">
          <span class="eyebrow mb-4"><i class="fas fa-heart"></i> Por que usar</span>
          <h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">
            Feita para quem vive de projeto
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Menos achismo, mais lucro. Veja o que você ganha ao precificar do jeito certo.
          </p>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(b, i) in benefits"
            :key="b.title"
            v-motion="stagger(i)"
            class="card-surface card-hover p-6 text-center"
          >
            <div
              class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-soft"
            >
              <i class="fas text-2xl text-white" :class="b.icon"></i>
            </div>
            <h3 class="mb-2 text-lg font-bold">{{ b.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ b.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FUNCIONALIDADES -->
    <section id="ferramentas" class="section scroll-mt-20 bg-gray-50 dark:bg-gray-900">
      <div class="container-app">
        <div class="mb-14 text-center">
          <span class="eyebrow mb-4"><i class="fas fa-wand-magic-sparkles"></i> Recursos</span>
          <h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">
            Funcionalidades Completas
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Tudo o que você precisa para gerenciar seus projetos freelance de forma profissional.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="(feature, i) in features"
            :key="feature.title"
            v-motion="stagger(i)"
            class="card-surface card-hover group p-6"
          >
            <div
              class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br shadow-soft transition-transform group-hover:scale-110"
              :class="feature.color"
            >
              <i class="fas text-2xl text-white" :class="feature.icon"></i>
            </div>
            <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              {{ feature.title }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {{ feature.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section
      class="section bg-gradient-to-b from-brand-50/60 to-white dark:from-gray-900 dark:to-gray-950"
    >
      <div class="container-app">
        <div class="mb-14 text-center">
          <span class="eyebrow mb-4"><i class="fas fa-lightbulb"></i> Simples e rápido</span>
          <h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">Como Funciona</h2>
          <p class="text-lg text-gray-600 dark:text-gray-400">
            3 passos simples para precificar seus projetos corretamente.
          </p>
        </div>

        <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          <div
            v-for="(item, i) in steps"
            :key="item.step"
            v-motion="stagger(i)"
            class="card-surface relative p-8 pt-10 text-center"
          >
            <div class="absolute -top-6 left-1/2 -translate-x-1/2">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-full bg-brand-gradient font-display text-xl font-bold text-white shadow-glow"
              >
                {{ item.step }}
              </div>
            </div>
            <i
              class="fas mb-4 mt-2 text-4xl text-brand-600 dark:text-brand-400"
              :class="item.icon"
            ></i>
            <h3 class="mb-2 text-lg font-bold">{{ item.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ item.description }}</p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <RouterLink to="/calculadora" class="btn-primary px-8 py-4 text-lg">
            <i class="fas fa-calculator"></i> Usar a Calculadora Agora
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- PROVA SOCIAL / DEPOIMENTOS -->
    <section class="section bg-white dark:bg-gray-950">
      <div class="container-app">
        <div class="mb-14 text-center">
          <span class="eyebrow mb-4"><i class="fas fa-star"></i> Quem usa, aprova</span>
          <h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">
            Milhares de freelancers já cobram melhor
          </h2>
          <div class="flex items-center justify-center gap-1 text-amber-400">
            <i v-for="n in 5" :key="n" class="fas fa-star"></i>
            <span class="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
              4,9/5 em mais de 1.250 avaliações
            </span>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-3">
          <figure
            v-for="(t, i) in testimonials"
            :key="t.name"
            v-motion="stagger(i)"
            class="card-surface flex flex-col p-6"
          >
            <div class="mb-3 flex gap-1 text-amber-400">
              <i v-for="n in 5" :key="n" class="fas fa-star text-sm"></i>
            </div>
            <blockquote class="flex-1 text-gray-600 dark:text-gray-300">"{{ t.text }}"</blockquote>
            <figcaption class="mt-5 flex items-center gap-3">
              <span
                class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient font-bold text-white"
              >
                {{ t.avatar }}
              </span>
              <span>
                <span class="block font-bold">{{ t.name }}</span>
                <span class="block text-sm text-gray-500 dark:text-gray-400">{{ t.role }}</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- SOBRE -->
    <section id="sobre" class="section scroll-mt-20 bg-gray-50 dark:bg-gray-900">
      <div class="container-app">
        <div class="mx-auto max-w-5xl">
          <div class="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span class="eyebrow mb-4"><i class="fas fa-bullseye"></i> Nossa missão</span>
              <h2 class="mb-5 font-display text-3xl font-bold">Valorizamos o seu trabalho</h2>
              <p class="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
                Capacitar freelancers e profissionais autônomos a valorizar adequadamente seu
                trabalho, oferecendo ferramentas gratuitas e precisas para cálculo de preços e
                gestão de projetos.
              </p>
              <p class="leading-relaxed text-gray-600 dark:text-gray-400">
                Acreditamos que todo profissional merece ser remunerado de forma justa pelo seu
                conhecimento e tempo. Por isso, criamos uma calculadora intuitiva que considera
                todos os aspectos de uma precificação profissional.
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div
                v-for="(item, i) in [
                  { icon: 'fa-users', value: '1.250+', label: 'Usuários Ativos' },
                  { icon: 'fa-chart-line', value: '5.000+', label: 'Cálculos Feitos' },
                  { icon: 'fa-star', value: '4.9/5', label: 'Avaliação' },
                  { icon: 'fa-shield-halved', value: '100%', label: 'Seguro' },
                ]"
                :key="item.label"
                v-motion="stagger(i)"
                class="card-surface p-6 text-center"
              >
                <i
                  class="fas mb-2 text-3xl text-brand-600 dark:text-brand-400"
                  :class="item.icon"
                ></i>
                <div class="font-display text-2xl font-bold">{{ item.value }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ item.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO USAR -->
    <section class="section bg-white dark:bg-gray-950">
      <div class="container-app">
        <div class="mx-auto max-w-4xl">
          <div class="mb-12 text-center">
            <span class="eyebrow mb-4"><i class="fas fa-book"></i> Guia rápido</span>
            <h2 class="font-display text-3xl font-bold">Como Usar a Ferramenta</h2>
          </div>
          <div class="space-y-6">
            <div v-for="section in howToUse" :key="section.title" class="card-surface p-8">
              <h3 class="mb-6 flex items-center gap-3 text-xl font-bold">
                <span
                  class="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-gradient shadow-soft"
                >
                  <i class="fas text-white" :class="section.icon"></i>
                </span>
                {{ section.title }}
              </h3>
              <ol class="space-y-3">
                <li v-for="(step, i) in section.steps" :key="i" class="flex items-start gap-3">
                  <span
                    class="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                  >
                    {{ i + 1 }}
                  </span>
                  <span class="text-gray-600 dark:text-gray-400">{{ step }}</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- DICAS -->
    <section class="section bg-gray-50 dark:bg-gray-900">
      <div class="container-app">
        <div class="mx-auto max-w-4xl">
          <div class="mb-12 text-center">
            <span class="eyebrow mb-4"><i class="fas fa-lightbulb"></i> Boas práticas</span>
            <h2 class="font-display text-3xl font-bold">Dicas Importantes</h2>
          </div>
          <div class="grid gap-5 md:grid-cols-2">
            <div
              v-for="(tip, i) in tips"
              :key="tip.title"
              v-motion="stagger(i)"
              class="card-surface card-hover flex items-start gap-4 p-6"
            >
              <span
                class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-gradient shadow-soft"
              >
                <i class="fas text-white" :class="tip.icon"></i>
              </span>
              <div>
                <h3 class="mb-1 font-bold">{{ tip.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ tip.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section id="servicos" class="section scroll-mt-20 bg-white dark:bg-gray-950">
      <div class="container-app">
        <div class="mb-14 text-center">
          <span class="eyebrow mb-4"><i class="fas fa-briefcase"></i> {{ COMPANY.legalName }}</span>
          <h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">Nossos Serviços</h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Soluções digitais completas para levar seu negócio ao próximo nível.
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="(service, i) in services"
            :key="service.title"
            v-motion="stagger(i)"
            class="card-surface card-hover group p-8"
          >
            <div
              class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-soft transition-transform group-hover:scale-110"
            >
              <i class="fas text-2xl text-white" :class="service.icon"></i>
            </div>
            <h3 class="mb-3 text-xl font-bold">{{ service.title }}</h3>
            <p class="mb-5 leading-relaxed text-gray-600 dark:text-gray-400">
              {{ service.description }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="feat in service.features"
                :key="feat"
                class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <i class="fas fa-circle-check text-accent-500"></i> {{ feat }}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <!-- OFERTA / ESCASSEZ -->
    <section class="section bg-gray-50 dark:bg-gray-900">
      <div class="container-app">
        <div
          class="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-amber-300/50 bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center shadow-medium dark:border-amber-500/20 dark:from-amber-950/30 dark:to-orange-950/20 sm:p-12"
        >
          <span
            class="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-500/15 px-4 py-1.5 text-sm font-bold text-amber-700 ring-1 ring-amber-500/30 dark:text-amber-300"
          >
            <i class="fas fa-hourglass-half animate-pulse"></i> Condição especial por tempo limitado
          </span>
          <h2 class="mb-4 font-display text-3xl font-bold md:text-4xl">
            Comece hoje sem pagar nada
          </h2>
          <p class="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            A calculadora é gratuita enquanto durar a fase de lançamento. Aproveite todos os
            recursos agora e garanta a precificação certa antes do seu próximo orçamento.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <RouterLink to="/calculadora" class="btn-primary px-8 py-4 text-lg">
              <i class="fas fa-calculator"></i> Calcular meu valor agora
            </RouterLink>
            <a href="#contato" class="btn-outline px-8 py-4 text-lg">
              <i class="fas fa-comments"></i> Falar com um especialista
            </a>
          </div>
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400">
            <i class="fas fa-lock"></i> Sem cadastro. Sem cartão. Seus dados ficam no seu navegador.
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ (migrado da Contato) -->
    <section id="faq" class="section scroll-mt-20 bg-white dark:bg-gray-950">
      <div class="container-app">
        <div class="mx-auto max-w-4xl">
          <div class="mb-12 text-center">
            <span class="eyebrow mb-4"><i class="fas fa-circle-question"></i> Dúvidas</span>
            <h2 class="font-display text-3xl font-bold">Perguntas Frequentes</h2>
          </div>
          <div class="space-y-4">
            <details v-for="(faq, i) in faqs" :key="i" class="group card-surface overflow-hidden">
              <summary
                class="flex cursor-pointer items-center gap-3 p-6 font-bold transition-colors hover:bg-brand-50 dark:hover:bg-gray-800"
              >
                <i
                  class="fas fa-chevron-down text-brand-600 transition-transform group-open:rotate-180"
                ></i>
                {{ faq.q }}
              </summary>
              <div class="px-6 pb-6 pl-14">
                <p class="leading-relaxed text-gray-600 dark:text-gray-400">{{ faq.a }}</p>
              </div>
            </details>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTATO (migrado da Contato) -->
    <section id="contato" class="section scroll-mt-20 bg-gray-50 dark:bg-gray-900">
      <div class="container-app">
        <div class="mb-12 text-center">
          <span class="eyebrow mb-4"><i class="fas fa-envelope"></i> Fale conosco</span>
          <h2 class="mb-3 font-display text-3xl font-bold md:text-4xl">Entre em Contato</h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Atendimento direto e sem burocracia. Fale com o
            <strong class="text-brand-600">{{ COMPANY.legalName }}</strong> pelo canal que preferir.
          </p>
        </div>

        <div class="mx-auto max-w-5xl">
          <!-- Canais -->
          <div class="mb-10 grid gap-6 md:grid-cols-2">
            <div v-for="ch in channels" :key="ch.title" class="card-surface p-8 text-center">
              <div
                class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full text-white"
                :class="ch.accent"
              >
                <i :class="ch.icon" class="text-2xl"></i>
              </div>
              <h3 class="mb-2 text-xl font-bold">{{ ch.title }}</h3>
              <a
                :href="ch.link"
                target="_blank"
                rel="noopener noreferrer"
                class="mb-4 block text-lg font-medium text-brand-600 hover:text-brand-700"
              >
                {{ ch.content }}
              </a>
              <a
                :href="ch.link"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary w-full"
              >
                <i :class="ch.icon"></i> {{ ch.cta }}
              </a>
            </div>
          </div>

          <!-- Info da empresa + copy persuasiva -->
          <div
            class="rounded-2xl border border-brand-200 bg-gradient-to-br from-brand-50 to-purple-50 p-8 dark:border-gray-700 dark:from-gray-800 dark:to-gray-700"
          >
            <div class="grid items-center gap-8 md:grid-cols-2">
              <div>
                <h3 class="mb-3 flex items-center gap-3 text-2xl font-bold">
                  <i class="fas fa-building text-brand-600"></i> {{ COMPANY.legalName }}
                </h3>
                <p class="mb-4 leading-relaxed text-gray-600 dark:text-gray-400">
                  Somos especialistas em desenvolvimento de
                  <strong>sites e sistemas personalizados sob demanda</strong>. Transformamos a sua
                  ideia em uma solução digital que gera resultado — do site institucional ao sistema
                  web completo.
                </p>
                <ul class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li class="flex items-center gap-2">
                    <i class="fas fa-map-marker-alt text-brand-600"></i> {{ COMPANY.location }}
                  </li>
                  <li class="flex items-center gap-2">
                    <i class="fas fa-globe text-brand-600"></i>
                    <a
                      :href="COMPANY.site"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="text-brand-600 underline hover:text-brand-700"
                      >www.3wonline.com.br</a
                    >
                  </li>
                </ul>
              </div>
              <div class="text-center">
                <p class="mb-3 text-lg font-bold text-gray-800 dark:text-gray-100">
                  Sua próxima solução digital começa com uma conversa.
                </p>
                <p class="mb-5 text-sm font-semibold text-amber-600 dark:text-amber-400">
                  <i class="fas fa-fire"></i> Poucas vagas para novos projetos neste mês — garanta a
                  sua condição especial.
                </p>
                <a
                  :href="COMPANY.ctaUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-primary w-full py-4 text-lg"
                >
                  <i class="fas fa-rocket"></i> Solicitar Orçamento Agora
                </a>
              </div>
            </div>
          </div>

          <!-- Redes sociais -->
          <div class="mt-10 text-center">
            <h3 class="mb-6 text-2xl font-bold">
              <i class="fas fa-share-nodes text-brand-600"></i> Siga-nos nas Redes Sociais
            </h3>
            <div class="flex flex-wrap justify-center gap-4">
              <a
                v-for="social in SOCIAL_LINKS"
                :key="social.name"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 text-gray-700 shadow-md transition-all hover:scale-110 hover:bg-brand-600 hover:text-white dark:bg-gray-800 dark:text-gray-300"
                :aria-label="social.name"
              >
                <i :class="social.icon" class="text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <CtaAgency />
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { SITE } from '@/lib/utils'
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Calculadora de Redes Sociais Grátis | Precifique com Confiança | 3W Online',
  description:
    'Descubra em segundos quanto cobrar pela gestão de redes sociais. Calculadora profissional, gratuita e 100% local. Mais de 2.500 profissionais já usam.',
  keywords:
    'calculadora redes sociais, quanto cobrar social media, precificação instagram, gestão de redes sociais, freelancer social media',
  path: '/',
}))

const stats = [
  { value: '2.500+', label: 'Profissionais', icon: 'lucide:users' },
  { value: '4.9/5', label: 'Avaliação', icon: 'lucide:star' },
  { value: '10.000+', label: 'Cálculos', icon: 'lucide:calculator' },
]

const benefits = [
  {
    icon: 'lucide:zap',
    title: 'Resultado Instantâneo',
    description: 'Preencha os dados e obtenha o valor sugerido em segundos. Sem espera.',
  },
  {
    icon: 'lucide:bar-chart-3',
    title: 'Baseado em Dados Reais',
    description: 'Algoritmo construído com análise do mercado brasileiro de social media.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Seguro e Privado',
    description: 'Processamento 100% local no navegador. Seus dados nunca saem do dispositivo.',
  },
  {
    icon: 'lucide:smartphone',
    title: 'Responsivo e Moderno',
    description: 'Use em qualquer dispositivo: celular, tablet ou computador.',
  },
  {
    icon: 'lucide:infinity',
    title: '100% Gratuito',
    description: 'Sem limites, sem cadastro, sem pegadinhas. Calcule quantas vezes precisar.',
  },
  {
    icon: 'lucide:download',
    title: 'Exporte Resultados',
    description: 'Baixe os resultados para compartilhar com clientes ou guardar como referência.',
  },
]

const steps = [
  {
    step: '01',
    title: 'Preencha os Dados',
    description: 'Informe perfis, plataformas, frequência de postagens e taxa de engajamento.',
    icon: 'lucide:edit-3',
  },
  {
    step: '02',
    title: 'Calcule o Valor',
    description: 'Clique em "Calcular" e o algoritmo processa os dados instantaneamente.',
    icon: 'lucide:cpu',
  },
  {
    step: '03',
    title: 'Exporte e Use',
    description: 'Veja o resultado detalhado, exporte e apresente com confiança ao seu cliente.',
    icon: 'lucide:file-output',
  },
]

const services = [
  {
    icon: 'lucide:calculator',
    title: 'Calculadora de Preços',
    description: 'Calcule o valor ideal para seus serviços com base em métricas reais.',
    features: ['Algoritmo inteligente', 'Dados de mercado', 'Resultado instantâneo'],
  },
  {
    icon: 'lucide:bar-chart-2',
    title: 'Análise de Engajamento',
    description: 'Entenda a taxa de engajamento esperada para diferentes plataformas.',
    features: ['Multi-plataforma', 'Comparativo', 'Métricas detalhadas'],
  },
  {
    icon: 'lucide:file-output',
    title: 'Exportação de Resultados',
    description: 'Baixe relatórios completos com os cálculos para apresentar aos clientes.',
    features: ['Formato profissional', 'Download gratuito', 'Compartilhável'],
  },
  {
    icon: 'lucide:lightbulb',
    title: 'Dicas de Precificação',
    description: 'Conteúdo educativo com estratégias para valorizar seu trabalho.',
    features: ['Conteúdo atualizado', 'Baseado em dados', 'Cases reais'],
  },
  {
    icon: 'lucide:shield-check',
    title: 'Privacidade Garantida',
    description: 'Seus dados são processados localmente. Nada é enviado a servidores externos.',
    features: ['LGPD/GDPR', 'Sem coleta', 'Processamento local'],
  },
  {
    icon: 'lucide:headphones',
    title: 'Suporte Dedicado',
    description: 'Equipe pronta para ajudar com dúvidas, sugestões ou suporte técnico.',
    features: ['Atendimento rápido', 'WhatsApp direto', 'E-mail dedicado'],
  },
]

const tips = [
  {
    title: 'Valorize Seu Tempo',
    description: 'Inclua o tempo de pesquisa, criação, edição e análise de resultados.',
    icon: 'lucide:clock',
  },
  {
    title: 'Considere Sua Experiência',
    description: 'Profissionais mais experientes podem e devem cobrar mais.',
    icon: 'lucide:award',
  },
  {
    title: 'Negocie com Dados',
    description: 'Use os resultados como base para negociações. Dados contra achismos.',
    icon: 'lucide:handshake',
  },
  {
    title: 'Revise Periodicamente',
    description: 'O mercado muda. Reavalie seus preços a cada 3-6 meses.',
    icon: 'lucide:refresh-cw',
  },
]

const example = [
  { label: 'Perfis', value: '3', icon: 'lucide:users' },
  { label: 'Plataformas', value: '4 (IG, FB, LI, TT)', icon: 'lucide:layers' },
  { label: 'Posts/semana', value: '12', icon: 'lucide:image' },
  { label: 'Frequência', value: '7 posts/semana/perfil', icon: 'lucide:calendar-days' },
  { label: 'Engajamento', value: '3.5%', icon: 'lucide:trending-up' },
]

const contactChannels = [
  {
    icon: 'fa6-brands:whatsapp',
    title: 'WhatsApp',
    value: SITE.whatsappDisplay,
    href: SITE.whatsappLink,
    color: 'text-green-500',
    external: true,
  },
  {
    icon: 'lucide:mail',
    title: 'E-mail',
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    color: 'text-violet-500',
    external: false,
  },
  {
    icon: 'lucide:globe',
    title: 'Website',
    value: 'www.3wonline.com.br',
    href: SITE.companyUrl,
    color: 'text-indigo-500',
    external: true,
  },
  {
    icon: 'lucide:clock',
    title: 'Atendimento',
    value: 'Seg. a Sex. · 9h às 18h',
    color: 'text-cyan-500',
  },
]
</script>

<template>
  <div>
    <!-- HERO -->
    <section class="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-32">
      <div class="bg-grid absolute inset-0 opacity-60" />
      <div
        class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background"
      />
      <div class="absolute -left-10 top-10 h-80 w-80 animate-pulse rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div class="absolute -right-10 top-40 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
      <div class="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

      <div class="container relative z-10 mx-auto px-4">
        <div class="mx-auto max-w-4xl space-y-8 text-center">
          <div
            v-motion-fade
            class="glass inline-flex animate-bounce-slow items-center rounded-full border border-violet-200/60 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm dark:border-violet-500/20 dark:text-violet-300"
          >
            <Icon
              icon="lucide:zap"
              class="mr-2 h-4 w-4 text-fuchsia-500"
            />
            100% Gratuita · Sem Cadastro · Resultados Instantâneos
          </div>

          <h1
            class="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl"
          >
            Descubra o Valor <span class="text-gradient">Real</span> dos Seus Serviços de Social
            Media
          </h1>

          <p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300 md:text-2xl">
            Mais de
            <strong class="text-violet-600 dark:text-violet-400">2.500 profissionais</strong> já usam
            nossa calculadora para precificar seus serviços com confiança.
            <span class="mt-2 block text-lg">Pare de cobrar por feeling e comece a cobrar pelo seu valor.</span>
          </p>

          <div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <RouterLink
              to="/ferramentas"
              class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:from-violet-700 hover:to-indigo-700 hover:shadow-2xl"
            >
              <Icon
                icon="lucide:calculator"
                class="mr-3 h-5 w-5"
              />
              Calcular Agora — É Grátis
            </RouterLink>
            <a
              href="#como-funciona"
              class="inline-flex items-center justify-center rounded-xl border-2 border-violet-300 px-8 py-4 text-lg font-semibold text-violet-700 transition-all hover:bg-violet-50 dark:border-violet-600 dark:text-violet-300 dark:hover:bg-violet-900/20"
            >
              <Icon
                icon="lucide:info"
                class="mr-2 h-5 w-5"
              />
              Como Funciona
            </a>
          </div>

          <div class="flex flex-wrap justify-center gap-6 pt-8 md:gap-10">
            <div
              v-for="stat in stats"
              :key="stat.label"
              class="text-center"
            >
              <div class="text-2xl font-bold text-violet-600 dark:text-violet-400 md:text-3xl">
                <Icon
                  :icon="stat.icon"
                  class="mr-1 inline h-5 w-5"
                />
                {{ stat.value }}
              </div>
              <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
                {{ stat.label }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFÍCIOS -->
    <section class="bg-white py-16 dark:bg-gray-800/50 md:py-24">
      <div class="container mx-auto px-4">
        <div class="mb-12 text-center md:mb-16">
          <span
            class="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
          >
            POR QUE USAR
          </span>
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Por Que <span class="text-violet-600">2.500+</span> Profissionais Confiam em Nós?
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Calculadora desenvolvida com base em dados reais do mercado brasileiro de social media.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div
            v-for="benefit in benefits"
            :key="benefit.title"
            class="group rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800 md:p-8"
          >
            <div
              class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 transition-transform group-hover:scale-110 dark:bg-violet-900/30"
            >
              <Icon
                :icon="benefit.icon"
                class="h-6 w-6 text-violet-600 dark:text-violet-400"
              />
            </div>
            <h3 class="mb-2 text-lg font-bold text-gray-900 dark:text-white">
              {{ benefit.title }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {{ benefit.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section
      id="como-funciona"
      class="py-16 md:py-24"
    >
      <div class="container mx-auto px-4">
        <div class="mb-12 text-center md:mb-16">
          <span
            class="mb-4 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
          >
            PASSO A PASSO
          </span>
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Simples, Rápido e <span class="text-violet-600">Eficiente</span>
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Em apenas 3 passos, descubra o valor ideal para cobrar pelos seus serviços.
          </p>
        </div>

        <div class="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 md:gap-8">
          <div
            v-for="item in steps"
            :key="item.step"
            class="relative text-center"
          >
            <div
              class="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg"
            >
              {{ item.step }}
            </div>
            <h3 class="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              {{ item.title }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {{ item.description }}
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <RouterLink
            to="/ferramentas"
            class="inline-flex items-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <Icon
              icon="lucide:calculator"
              class="mr-3 h-5 w-5"
            />
            Começar Agora
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- EXEMPLO -->
    <section class="bg-gray-50 py-16 dark:bg-gray-800/30 md:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-4xl">
          <div class="mb-10 text-center">
            <span
              class="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
            >
              EXEMPLO REAL
            </span>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
              Veja na Prática
            </h2>
          </div>

          <div
            class="rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl dark:border-gray-700 dark:bg-gray-800 md:p-10"
          >
            <div class="grid gap-8 md:grid-cols-2">
              <div class="space-y-4">
                <h3 class="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-white">
                  <Icon
                    icon="lucide:clipboard-list"
                    class="h-5 w-5 text-violet-600"
                  />
                  Dados de Entrada
                </h3>
                <div class="space-y-3">
                  <div
                    v-for="item in example"
                    :key="item.label"
                    class="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                  >
                    <span class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Icon
                        :icon="item.icon"
                        class="h-4 w-4 text-violet-500"
                      />
                      {{ item.label }}
                    </span>
                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{{
                      item.value
                    }}</span>
                  </div>
                </div>
              </div>

              <div class="flex flex-col justify-center">
                <div
                  class="rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 p-8 text-center text-white shadow-xl"
                >
                  <p class="mb-2 text-sm font-medium opacity-90">
                    <Icon
                      icon="lucide:banknote"
                      class="mr-1 inline h-4 w-4"
                    />
                    Valor Mensal Sugerido
                  </p>
                  <p class="mb-2 text-4xl font-extrabold md:text-5xl">
                    R$ 1.247,50
                  </p>
                  <p class="text-xs opacity-70">
                    Baseado nas métricas informadas
                  </p>
                </div>
                <p class="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                  <Icon
                    icon="lucide:info"
                    class="mr-1 inline h-3.5 w-3.5"
                  />
                  Cálculo baseado em complexidade, tempo, expertise e valor de mercado.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SERVIÇOS -->
    <section
      id="servicos"
      class="py-16 md:py-24"
    >
      <div class="container mx-auto px-4">
        <div class="mb-12 text-center md:mb-16">
          <span
            class="mb-4 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
          >
            NOSSOS SERVIÇOS
          </span>
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Tudo para Precificar com Confiança
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Ferramentas profissionais, gratuitas e seguras para gestores de redes sociais.
          </p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div
            v-for="service in services"
            :key="service.title"
            class="group flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-800 md:p-8"
          >
            <div
              class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg transition-transform group-hover:scale-110"
            >
              <Icon
                :icon="service.icon"
                class="h-6 w-6 text-white"
              />
            </div>
            <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              {{ service.title }}
            </h3>
            <p class="mb-4 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              {{ service.description }}
            </p>
            <ul class="space-y-2">
              <li
                v-for="feature in service.features"
                :key="feature"
                class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
              >
                <Icon
                  icon="lucide:check"
                  class="h-3.5 w-3.5 text-emerald-500"
                />
                {{ feature }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- DICAS -->
    <section class="bg-gray-50 py-16 dark:bg-gray-800/30 md:py-24">
      <div class="container mx-auto px-4">
        <div class="mb-12 text-center">
          <span
            class="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
          >
            DICAS PROFISSIONAIS
          </span>
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Dicas Para Cobrar Mais e <span class="text-violet-600">Melhor</span>
          </h2>
        </div>

        <div class="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <div
            v-for="tip in tips"
            :key="tip.title"
            class="flex gap-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
          >
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30"
            >
              <Icon
                :icon="tip.icon"
                class="h-5 w-5 text-violet-600 dark:text-violet-400"
              />
            </div>
            <div>
              <h3 class="mb-1 font-bold text-gray-900 dark:text-white">
                {{ tip.title }}
              </h3>
              <p class="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {{ tip.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CONTATO (unificado na Home) -->
    <section
      id="contato"
      class="scroll-mt-24 py-16 md:py-24"
    >
      <div class="container mx-auto px-4">
        <div class="mb-12 text-center">
          <span
            class="mb-4 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
          >
            FALE CONOSCO
          </span>
          <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl">
            Vamos Conversar Sobre o Seu <span class="text-gradient">Projeto</span>
          </h2>
          <p class="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Tem dúvidas, sugestões ou quer um site/sistema sob medida? Escolha o canal mais
            conveniente e fale diretamente com nossa equipe.
          </p>
        </div>

        <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              v-for="channel in contactChannels"
              :key="channel.title"
              :href="channel.href || undefined"
              :target="channel.external ? '_blank' : undefined"
              :rel="channel.external ? 'noopener noreferrer' : undefined"
              class="group flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              :class="{ 'pointer-events-none': !channel.href }"
            >
              <div
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50 transition-transform group-hover:scale-110 dark:bg-gray-700/50"
              >
                <Icon
                  :icon="channel.icon"
                  class="h-5 w-5"
                  :class="channel.color"
                />
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-900 dark:text-white">{{ channel.title }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ channel.value }}</p>
              </div>
            </a>
          </div>

          <div
            class="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-700 p-8 text-white shadow-xl md:p-10"
          >
            <div
              class="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"
            >
              <Icon
                icon="lucide:flame"
                class="h-3.5 w-3.5 text-amber-300"
              />
              Vagas limitadas neste mês
            </div>
            <h3 class="mb-3 text-2xl font-extrabold md:text-3xl">
              Seu site ou sistema sob demanda começa com uma conversa
            </h3>
            <p class="mb-6 leading-relaxed text-violet-100">
              O <strong>{{ SITE.company }}</strong> transforma ideias em soluções digitais de alta
              performance: sites, landing pages, sistemas e automações personalizadas. Fale agora e
              receba um orçamento sem compromisso.
            </p>
            <div class="flex flex-col gap-3 sm:flex-row">
              <a
                :href="SITE.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-bold text-violet-700 shadow-lg transition-all hover:-translate-y-0.5 hover:bg-violet-50"
              >
                <Icon
                  icon="fa6-brands:whatsapp"
                  class="mr-2 h-5 w-5 text-green-600"
                />
                Chamar no WhatsApp
              </a>
              <a
                :href="SITE.ctaUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center justify-center rounded-xl border-2 border-white/40 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              >
                <Icon
                  icon="lucide:external-link"
                  class="mr-2 h-4 w-4"
                />
                Solicitar Orçamento
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA FINAL com escassez/urgência -->
    <section class="bg-gradient-to-br from-violet-600 to-indigo-700 py-16 md:py-24">
      <div class="container mx-auto px-4 text-center">
        <div class="mx-auto max-w-3xl space-y-6">
          <div
            class="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold text-white"
          >
            <Icon
              icon="lucide:flame"
              class="h-4 w-4 text-amber-300"
            />
            Oferta por tempo limitado: desenvolvimento sob demanda com condições especiais
          </div>
          <h2 class="text-3xl font-extrabold text-white md:text-5xl">
            Pronto Para Descobrir Seu Valor?
          </h2>
          <p class="text-lg leading-relaxed text-violet-100">
            Junte-se aos mais de 2.500 profissionais que já precificam com confiança. É grátis,
            rápido e sem cadastro. As vagas para novos projetos da 3W Online são limitadas — garanta
            a sua agora.
          </p>
          <div class="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
            <RouterLink
              to="/ferramentas"
              class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-violet-700 shadow-xl transition-all hover:-translate-y-1 hover:bg-violet-50 hover:shadow-2xl"
            >
              <Icon
                icon="lucide:calculator"
                class="mr-3 h-5 w-5"
              />
              Calcular Meu Valor Agora
            </RouterLink>
            <a
              :href="SITE.ctaUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              <Icon
                icon="lucide:external-link"
                class="mr-2 h-5 w-5"
              />
              Quero um Site/Sistema Sob Demanda
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

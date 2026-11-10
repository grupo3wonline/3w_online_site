<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import BlocoCalculadora from '@/components/BlocoCalculadora.vue'

const funcionalidades = [
  {
    icon: 'fa6-solid:box',
    cor: 'text-primary-500',
    titulo: 'Produtos Físicos',
    desc: 'Calcule preços considerando matéria-prima, produção, operação e margem de lucro desejada.',
  },
  {
    icon: 'fa6-solid:laptop-code',
    cor: 'text-accent-500',
    titulo: 'Serviços Digitais',
    desc: 'Defina valores por hora, projeto ou pacote baseado em complexidade, urgência e tempo.',
  },
  {
    icon: 'fa6-solid:chart-pie',
    cor: 'text-primary-500',
    titulo: 'Análise Completa',
    desc: 'Visualize custos totais, lucros estimados, detalhamento e comparativos de margens.',
  },
]

const beneficios = [
  {
    icon: 'fa6-solid:shield-halved',
    cor: 'text-accent-500',
    titulo: 'Preços Justos e Competitivos',
    desc: 'Evite cobrar pouco e ter prejuízo, ou muito e perder clientes',
  },
  {
    icon: 'fa6-solid:bolt',
    cor: 'text-primary-500',
    titulo: 'Cálculos Instantâneos',
    desc: 'Resultados imediatos com análises detalhadas de custos e lucros',
  },
  {
    icon: 'fa6-solid:sliders',
    cor: 'text-accent-500',
    titulo: 'Totalmente Personalizável',
    desc: 'Adapte os cálculos para seu negócio, custos e objetivos',
  },
  {
    icon: 'fa6-solid:lock',
    cor: 'text-primary-500',
    titulo: '100% Seguro e Privado',
    desc: 'Processamento local — seus dados não são enviados a nenhum servidor',
  },
]

const publicoAlvo = [
  'Freelancers e Consultores',
  'Pequenos E-commerces',
  'Artesãos e Criadores',
  'Prestadores de Serviços',
  'Revendedores e Lojistas',
  'Empreendedores Iniciantes',
  'Agências e Estúdios',
  'Profissionais Autônomos',
]

const passos = [
  {
    passo: '01',
    icon: 'fa6-solid:pen-to-square',
    titulo: 'Insira seus Dados',
    desc: 'Preencha os custos de material, operação, tempo de trabalho e margem desejada.',
  },
  {
    passo: '02',
    icon: 'fa6-solid:gears',
    titulo: 'Cálculo Inteligente',
    desc: 'Nossa ferramenta processa automaticamente todos os fatores e gera o preço ideal.',
  },
  {
    passo: '03',
    icon: 'fa6-solid:chart-column',
    titulo: 'Analise os Resultados',
    desc: 'Veja o detalhamento completo, comparativo de margens e recomendações.',
  },
]

const dicas = [
  {
    icon: 'fa6-solid:magnifying-glass-dollar',
    titulo: 'Pesquise a Concorrência',
    desc: 'Conheça os preços do mercado, mas não copie — posicione-se com base no seu valor.',
  },
  {
    icon: 'fa6-solid:calculator',
    titulo: 'Inclua Todos os Custos',
    desc: 'Custos fixos, variáveis, tempo, impostos e até imprevistos devem entrar na conta.',
  },
  {
    icon: 'fa6-solid:chart-line',
    titulo: 'Revise Periodicamente',
    desc: 'Custos mudam com o tempo. Reavalie seus preços a cada 3-6 meses.',
  },
  {
    icon: 'fa6-solid:gem',
    titulo: 'Comunique o Valor',
    desc: 'Clientes pagam mais por valor percebido. Destaque seus diferenciais.',
  },
]

const servicos = [
  {
    icon: 'fa6-solid:box',
    titulo: 'Precificação de Produtos',
    desc: 'Calcule preços ideais considerando matéria-prima, custos operacionais, mão de obra e margem de lucro.',
    destaque: true,
  },
  {
    icon: 'fa6-solid:laptop-code',
    titulo: 'Precificação de Serviços',
    desc: 'Defina valores por hora, dia, semana ou projeto com ajustes de complexidade e urgência.',
    destaque: true,
  },
  {
    icon: 'fa6-solid:chart-pie',
    titulo: 'Análise de Margens',
    desc: 'Compare diferentes margens de lucro e veja como elas impactam o preço final do seu produto ou serviço.',
    destaque: false,
  },
  {
    icon: 'fa6-solid:scale-balanced',
    titulo: 'Faixa de Preços',
    desc: 'Receba sugestões de preço mínimo, ideal e premium com base nos seus custos e objetivos.',
    destaque: false,
  },
  {
    icon: 'fa6-solid:file-invoice-dollar',
    titulo: 'Detalhamento de Custos',
    desc: 'Visualize o breakdown completo de cada componente do seu custo para maior transparência.',
    destaque: false,
  },
  {
    icon: 'fa6-solid:lightbulb',
    titulo: 'Recomendações',
    desc: 'Receba dicas e orientações personalizadas para otimizar sua estratégia de precificação.',
    destaque: false,
  },
]

const oQueFaz = [
  'Cálculo de preço de produtos físicos',
  'Cálculo de preço de serviços digitais',
  'Detalhamento completo de custos',
  'Comparativo de margens de lucro',
  'Sugestão de faixa de preços',
  'Opções de cobrança (hora, dia, projeto)',
  'Ajuste por complexidade e urgência',
  'Recomendações personalizadas',
]

const tecnologias = [
  { nome: 'Vue.js 3', icon: 'fa6-brands:vuejs' },
  { nome: 'TypeScript', icon: 'fa6-solid:code' },
  { nome: 'Tailwind CSS', icon: 'fa6-brands:css3-alt' },
  { nome: 'Vite', icon: 'fa6-solid:bolt' },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  visibleOnce: { opacity: 1, y: 0, transition: { duration: 500 } },
}
</script>

<template>
  <!-- HERO -->
  <section class="relative bg-gradient-hero bg-app-grid py-20 md:py-32 px-4 overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="aurora bg-primary-500/40 w-[38rem] h-[38rem] -top-40 -right-40 animate-aurora"
      />
      <div
        class="aurora bg-accent-500/40 w-[34rem] h-[34rem] -bottom-48 -left-40 animate-aurora"
        style="animation-delay: 6s"
      />
      <div
        class="aurora bg-primary-400/20 w-[26rem] h-[26rem] top-1/3 left-1/2 -translate-x-1/2 animate-float"
      />
    </div>

    <div class="max-w-4xl mx-auto text-center relative z-10">
      <div class="badge-pill mb-6 animate-fade-in">
        <span class="relative flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-500 opacity-75"
          />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-accent-500" />
        </span>
        100% Gratuito • Sem Cadastro • Resultado Instantâneo
      </div>

      <h1
        class="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display txt-forte mb-6 leading-[1.05] animate-slide-up"
      >
        Calcule o Preço Ideal para seus
        <span class="text-gradient">Produtos e Serviços</span>
      </h1>

      <p
        class="text-lg md:text-xl txt-suave mb-10 max-w-2xl mx-auto animate-slide-up"
        style="animation-delay: 0.1s"
      >
        Ferramenta inteligente que considera
        <strong class="txt-forte">custos, tempo, complexidade e margem de lucro</strong> para sugerir
        preços justos, competitivos e lucrativos para o seu negócio.
      </p>

      <div
        class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
        style="animation-delay: 0.2s"
      >
        <RouterLink
          :to="{ path: '/', hash: '#calculadora' }"
          class="btn-primary text-base md:text-lg px-8 py-4"
        >
          <Icon icon="fa6-solid:calculator" />
          Calcular Preço Agora
          <Icon icon="fa6-solid:arrow-right" />
        </RouterLink>
        <RouterLink
          :to="{ path: '/', hash: '#como-funciona' }"
          class="btn-outline text-base md:text-lg px-8 py-4"
        >
          <Icon icon="fa6-solid:play" />
          Como Funciona
        </RouterLink>
      </div>

      <div
        class="mt-14 flex flex-wrap justify-center gap-8 md:gap-12 text-center animate-fade-in"
      >
        <div>
          <div class="text-2xl md:text-3xl font-bold txt-forte">
            3.200+
          </div>
          <div class="text-xs txt-fraco">
            Cálculos Realizados
          </div>
        </div>
        <div>
          <div class="text-2xl md:text-3xl font-bold txt-forte">
            4.9<span class="text-primary-500">/5</span>
          </div>
          <div class="text-xs txt-fraco">
            Avaliação dos Usuários
          </div>
        </div>
        <div>
          <div class="text-2xl md:text-3xl font-bold txt-forte">
            100%
          </div>
          <div class="text-xs txt-fraco">
            Gratuito e Seguro
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FUNCIONALIDADES -->
  <section
    id="como-funciona"
    class="py-20 px-4 bg-gradient-section scroll-mt-20"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Precificação Inteligente e <span class="text-gradient">Precisa</span>
        </h2>
        <p class="section-subtitle">
          Nossa calculadora considera todos os fatores importantes para definir preços que maximizam
          seus lucros
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in funcionalidades"
          :key="i"
          v-motion="fadeUp"
          class="glass-card-hover p-8 text-center group"
        >
          <div
            class="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors"
          >
            <Icon
              :icon="item.icon"
              :class="item.cor"
              class="text-2xl"
            />
          </div>
          <h3 class="text-lg font-semibold txt-forte mb-2">
            {{ item.titulo }}
          </h3>
          <p class="text-sm txt-suave leading-relaxed">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- CALCULADORA (era Ferramentas) -->
  <section
    id="calculadora"
    class="py-16 md:py-20 px-4 scroll-mt-20"
  >
    <div class="max-w-5xl mx-auto text-center mb-10">
      <h2 class="section-title">
        <Icon
          icon="fa6-solid:calculator"
          class="text-primary-500 inline-block mr-2"
        />
        Use a Calculadora de <span class="text-gradient">Preços</span>
      </h2>
      <p class="section-subtitle">
        Escolha o tipo de cálculo e defina preços justos e competitivos para seu negócio
      </p>
    </div>
    <BlocoCalculadora />
  </section>

  <!-- BENEFÍCIOS -->
  <section class="py-20 px-4 bg-gradient-section">
    <div class="max-w-6xl mx-auto">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 class="section-title text-left">
            Por que usar nossa <span class="text-gradient">Calculadora</span>?
          </h2>
          <p class="txt-suave mb-8">
            Mais de <strong class="txt-forte">3.200 empreendedores</strong> já definiram seus preços
            com nossa ferramenta. Não fique para trás — descubra o preço certo e maximize seus lucros.
          </p>

          <div class="space-y-6">
            <div
              v-for="(item, i) in beneficios"
              :key="i"
              class="flex items-start gap-4 group"
            >
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors"
              >
                <Icon
                  :icon="item.icon"
                  :class="item.cor"
                />
              </div>
              <div>
                <h3 class="text-base font-semibold txt-forte mb-1">
                  {{ item.titulo }}
                </h3>
                <p class="text-sm txt-suave">
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </div>

          <div class="mt-8">
            <RouterLink
              :to="{ path: '/', hash: '#calculadora' }"
              class="btn-primary px-6 py-3"
            >
              <Icon icon="fa6-solid:calculator" />
              Começar Agora — É Grátis
            </RouterLink>
          </div>
        </div>

        <div class="glass-card p-8">
          <h3 class="text-xl font-bold txt-forte mb-6 text-center">
            <Icon
              icon="fa6-solid:users"
              class="text-primary-500 mr-2"
            />
            Ideal para:
          </h3>
          <div class="space-y-3">
            <div
              v-for="(item, i) in publicoAlvo"
              :key="i"
              class="flex items-center gap-3 p-2 hover:bg-primary-500/5 rounded-lg transition-colors"
            >
              <Icon
                icon="fa6-solid:circle-check"
                class="text-accent-500 text-sm"
              />
              <span class="txt-suave text-sm">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- COMO FUNCIONA (passos) -->
  <section class="py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Como <span class="text-gradient">Funciona</span>?
        </h2>
        <p class="section-subtitle">
          Calcule o preço ideal em apenas 3 passos simples
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(item, i) in passos"
          :key="i"
          v-motion="fadeUp"
          class="relative text-center"
        >
          <div class="inline-block text-5xl font-black opacity-10 mb-4 txt-forte">
            {{ item.passo }}
          </div>
          <div
            class="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow"
          >
            <Icon
              :icon="item.icon"
              class="text-white text-xl"
            />
          </div>
          <h3 class="text-lg font-semibold txt-forte mb-2">
            {{ item.titulo }}
          </h3>
          <p class="text-sm txt-suave">
            {{ item.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS (era página Serviços) -->
  <section
    id="servicos"
    class="py-20 px-4 bg-gradient-section scroll-mt-20"
  >
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Nossos <span class="text-gradient">Serviços</span>
        </h2>
        <p class="section-subtitle">
          Ferramentas gratuitas e soluções digitais para impulsionar seu negócio
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in servicos"
          :key="i"
          class="glass-card-hover p-6"
          :class="item.destaque ? 'border-primary-500/30' : ''"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
            :class="
              item.destaque
                ? 'bg-gradient-to-br from-primary-500 to-accent-500 shadow-glow'
                : 'bg-primary-500/10'
            "
          >
            <Icon
              :icon="item.icon"
              :class="item.destaque ? 'text-white' : 'text-primary-500'"
              class="text-lg"
            />
          </div>
          <h3 class="text-lg font-semibold txt-forte mb-2">
            {{ item.titulo }}
          </h3>
          <p class="text-sm txt-suave leading-relaxed">
            {{ item.desc }}
          </p>
          <RouterLink
            v-if="item.destaque"
            :to="{ path: '/', hash: '#calculadora' }"
            class="inline-flex items-center gap-1 text-sm text-primary-500 hover:text-primary-400 mt-4 transition-colors"
          >
            Usar agora <Icon
              icon="fa6-solid:arrow-right"
              class="text-xs"
            />
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <!-- DICAS -->
  <section class="py-20 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="section-title">
          Dicas de <span class="text-gradient">Precificação</span>
        </h2>
        <p class="section-subtitle">
          Aplique o Princípio de Pareto: 20% das estratégias geram 80% dos resultados
        </p>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(item, i) in dicas"
          :key="i"
          class="glass-card-hover p-6 flex items-start gap-4"
        >
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-xl flex items-center justify-center flex-shrink-0"
          >
            <Icon
              :icon="item.icon"
              class="text-primary-500"
            />
          </div>
          <div>
            <h3 class="text-base font-semibold txt-forte mb-1">
              {{ item.titulo }}
            </h3>
            <p class="text-sm txt-suave">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE (era página Sobre) -->
  <section
    id="sobre"
    class="py-20 px-4 bg-gradient-section scroll-mt-20"
  >
    <div class="max-w-4xl mx-auto space-y-12">
      <div class="text-center">
        <h2 class="section-title">
          Sobre a <span class="text-gradient">Calculadora de Preços</span>
        </h2>
        <p class="section-subtitle">
          Conheça a ferramenta que está ajudando milhares de empreendedores a definir preços justos e
          lucrativos
        </p>
      </div>

      <!-- Missão -->
      <div class="glass-card p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
            <Icon
              icon="fa6-solid:bullseye"
              class="text-primary-500"
            />
          </div>
          <h3 class="text-xl font-bold txt-forte">
            Nossa Missão
          </h3>
        </div>
        <p class="txt-suave leading-relaxed">
          A <strong class="txt-forte">Calculadora de Preço para Produto e Serviço</strong> nasceu da
          necessidade real de empreendedores, freelancers e autônomos que precisam definir preços
          justos sem depender de planilhas complicadas ou consultores caros. Nossa missão é
          democratizar o acesso à precificação inteligente, oferecendo uma ferramenta
          <strong class="txt-forte">gratuita, rápida e precisa</strong>.
        </p>
      </div>

      <!-- O que faz -->
      <div class="glass-card p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center">
            <Icon
              icon="fa6-solid:wand-magic-sparkles"
              class="text-accent-500"
            />
          </div>
          <h3 class="text-xl font-bold txt-forte">
            O que Nossa Ferramenta Faz
          </h3>
        </div>
        <div class="grid md:grid-cols-2 gap-4">
          <div
            v-for="(item, i) in oQueFaz"
            :key="i"
            class="flex items-center gap-2 text-sm txt-suave"
          >
            <Icon
              icon="fa6-solid:check"
              class="text-accent-500 text-xs"
            />
            {{ item }}
          </div>
        </div>
      </div>

      <!-- Desenvolvido por -->
      <div class="glass-card p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-primary-500/20 rounded-xl flex items-center justify-center">
            <Icon
              icon="fa6-solid:code"
              class="text-primary-500"
            />
          </div>
          <h3 class="text-xl font-bold txt-forte">
            Desenvolvido por
          </h3>
        </div>
        <p class="txt-suave leading-relaxed mb-4">
          Esta ferramenta foi desenvolvida pelo <strong class="txt-forte">Grupo 3w Online</strong>,
          empresa especializada em desenvolvimento de sites, sistemas e aplicações web personalizadas
          sob demanda. Com anos de experiência no mercado digital, criamos soluções que transformam
          ideias em resultados.
        </p>
        <a
          href="https://www.3wonline.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary text-sm py-2 px-4"
        >
          <Icon icon="fa6-solid:globe" />
          Visite nosso site
          <Icon
            icon="fa6-solid:arrow-up-right-from-square"
            class="text-xs"
          />
        </a>
      </div>

      <!-- Tecnologias -->
      <div class="glass-card p-8">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-10 h-10 bg-accent-500/20 rounded-xl flex items-center justify-center">
            <Icon
              icon="fa6-solid:microchip"
              class="text-accent-500"
            />
          </div>
          <h3 class="text-xl font-bold txt-forte">
            Tecnologias Utilizadas
          </h3>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="(tech, i) in tecnologias"
            :key="i"
            class="glass-card p-4 text-center hover:bg-primary-500/5 transition-colors"
          >
            <Icon
              :icon="tech.icon"
              class="text-primary-500 text-2xl mb-2 mx-auto"
            />
            <div class="text-xs txt-suave">
              {{ tech.nome }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA FINAL (escassez + urgência) -->
  <section class="py-20 px-4 bg-gradient-cta">
    <div class="max-w-4xl mx-auto text-center">
      <span
        class="inline-flex items-center gap-2 px-3 py-1 mb-4 bg-white/15 rounded-full text-xs font-semibold text-white"
      >
        <Icon icon="fa6-solid:clock" /> Oferta por tempo limitado — agende ainda hoje
      </span>
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
        Precisa de uma Solução Digital Personalizada?
      </h2>
      <p class="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
        O <strong>Grupo 3w Online</strong> cria sites, sistemas e aplicações sob medida para o seu
        negócio. As vagas de desenvolvimento deste mês estão acabando — garanta a sua agora.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink
          :to="{ path: '/', hash: '#calculadora' }"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:-translate-y-1 text-lg"
        >
          <Icon icon="fa6-solid:calculator" />
          Acessar Calculadora Gratuita
        </RouterLink>
        <a
          href="https://www.3wonline.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
        >
          <Icon icon="fa6-solid:rocket" />
          Solicitar Orçamento Agora
        </a>
      </div>
    </div>
  </section>
</template>

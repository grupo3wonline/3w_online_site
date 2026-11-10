<script setup lang="ts">
import { useHead } from '@unhead/vue'

useHead({
  title: 'Calculadora Aluguel Fácil - Calcule Aluguel, Financiamento e Construção | Grátis',
  meta: [
    {
      name: 'description',
      content:
        'Plataforma gratuita para calcular o valor ideal do aluguel, simular financiamento (Price vs SAC), orçar construção e comparar comprar vs alugar. Ferramentas profissionais, sem cadastro.'
    }
  ]
})

// ===== Ferramentas =====
const features = [
  {
    icon: 'fa-calculator',
    title: 'Calculadora de Aluguel',
    description: 'Descubra o valor ideal do seu imóvel com análise de 20+ variáveis de mercado.',
    link: '/calculadora-aluguel',
    badge: 'Mais Usado',
    color: 'from-blue-500 to-cyan-500',
    features: ['Análise de 20+ variáveis', 'Comparativo regional', 'Faixa de preço sugerida', 'Análise de rentabilidade']
  },
  {
    icon: 'fa-piggy-bank',
    title: 'Simulador de Financiamento',
    description: 'Compare Price vs SAC e descubra qual sistema economiza mais em juros.',
    link: '/calculadora-financiamento',
    badge: 'Completo',
    color: 'from-green-500 to-emerald-500',
    features: ['Comparativo Price vs SAC', 'Análise de capacidade', 'Tabela de amortização', 'Custos adicionais (ITBI, cartório)']
  },
  {
    icon: 'fa-hammer',
    title: 'Calculadora de Construção',
    description: 'Orçamentos precisos por etapa. Evite surpresas e planeje sua obra.',
    link: '/calculadora-construcao',
    badge: 'Avançado',
    color: 'from-orange-500 to-amber-500',
    features: ['Construção e reforma', 'Custo por etapa', 'Materiais e mão de obra', 'Contingência configurável']
  },
  {
    icon: 'fa-scale-balanced',
    title: 'Comparador Comprar vs Alugar',
    description: 'Comprar, alugar ou investir? Análise que maximiza seu patrimônio.',
    link: '/comparador',
    badge: 'Estratégico',
    color: 'from-purple-500 to-pink-500',
    features: ['3 cenários comparados', 'Patrimônio final projetado', 'Análise de investimento', 'Recomendação inteligente']
  }
]

const stats = [
  { value: '50K+', label: 'Simulações Realizadas', icon: 'fa-calculator' },
  { value: '98%', label: 'Precisão Comprovada', icon: 'fa-bullseye' },
  { value: '<30s', label: 'Resultado Instantâneo', icon: 'fa-bolt' },
  { value: '4.9/5', label: 'Avaliação Média', icon: 'fa-star' }
]

// ===== Como usar / dicas =====
const howToSteps = [
  { icon: 'fa-hand-pointer', title: '1. Escolha a ferramenta', description: 'Selecione entre aluguel, financiamento, construção ou o comparador.' },
  { icon: 'fa-keyboard', title: '2. Preencha os dados', description: 'Informe os valores do seu imóvel. Não é preciso cadastro nem login.' },
  { icon: 'fa-chart-line', title: '3. Veja o resultado', description: 'O cálculo é instantâneo e atualizado em tempo real conforme você digita.' },
  { icon: 'fa-lightbulb', title: '4. Decida com segurança', description: 'Use as dicas e a faixa recomendada para tomar a melhor decisão.' }
]

const tips = [
  'Preencha o máximo de campos para aumentar a precisão do resultado.',
  'Compare a tabela SAC e Price antes de assinar um financiamento.',
  'No comparador, considere a valorização do imóvel e o rendimento de investimentos.',
  'Sempre valide os valores estimados com uma pesquisa de mercado na sua região.'
]

// ===== Sobre / valores =====
const values = [
  { title: 'Transparência', description: 'Sem custos ocultos, sem cadastros obrigatórios. Acesso livre a todas as ferramentas.', icon: 'fa-eye' },
  { title: 'Precisão', description: 'Algoritmos baseados em dados reais do mercado imobiliário brasileiro.', icon: 'fa-bullseye' },
  { title: 'Acessibilidade', description: 'Ferramentas pensadas para todos, do iniciante ao investidor experiente.', icon: 'fa-universal-access' },
  { title: 'Inovação', description: 'Constantemente atualizadas com novas funcionalidades e dados de mercado.', icon: 'fa-rocket' }
]

const benefits = [
  'Calculadora de Aluguel com 20+ variáveis',
  'Simulador de Financiamento Price vs SAC',
  'Calculadora de Construção e Reforma',
  'Comparador Comprar vs Alugar',
  'Interface moderna e responsiva',
  'Modo escuro para conforto visual',
  'Conformidade com LGPD, GDPR e CCPA',
  'Sem necessidade de cadastro'
]

// ===== Depoimentos =====
const testimonials = [
  { quote: 'Em 5 minutos descobri que estava cobrando R$ 800 a menos no aluguel.', author: 'Carlos Mendes', role: 'Proprietário de imóveis', savings: 'R$ 9.600/ano economizados' },
  { quote: 'O simulador me mostrou que a tabela SAC economizaria R$ 67 mil em juros.', author: 'Ana Paula Silva', role: 'Primeira casa própria', savings: 'R$ 67.000 em economia' },
  { quote: 'A calculadora de construção previu minha obra com 94% de precisão.', author: 'Roberto Almeida', role: 'Engenheiro Civil', savings: 'Orçamento sob controle' }
]

// ===== FAQ =====
const faq = [
  { question: 'As calculadoras são realmente gratuitas?', answer: 'Sim, 100% gratuitas. Não cobramos nada pelo uso das ferramentas e não é necessário cadastro.' },
  { question: 'Os cálculos são confiáveis?', answer: 'Nossos algoritmos são baseados em dados reais do mercado imobiliário brasileiro e metodologias reconhecidas. Recomendamos sempre consultar um profissional para decisões financeiras importantes.' },
  { question: 'Vocês armazenam meus dados?', answer: 'Não armazenamos dados pessoais. Todos os cálculos são feitos diretamente no seu navegador. Consulte nossa Política de Privacidade para mais detalhes.' },
  { question: 'Posso usar os resultados para fins profissionais?', answer: 'Sim! As ferramentas são usadas por corretores, investidores e profissionais do mercado imobiliário. Os resultados são estimativas e devem ser validados com pesquisa de mercado.' },
  { question: 'Como posso entrar em contato?', answer: 'Fale conosco pelo WhatsApp (41) 99692-4829 ou pelo e-mail contato@3wonline.com.br. Veja a seção Contato no final desta página.' }
]

// ===== Serviços 3W Online =====
const services = [
  { icon: 'fa-globe', title: 'Sites Institucionais', description: 'Sites modernos, responsivos e otimizados para SEO.' },
  { icon: 'fa-code', title: 'Sistemas Web', description: 'Sistemas sob demanda com tecnologia de ponta.' },
  { icon: 'fa-cart-shopping', title: 'E-commerce', description: 'Lojas virtuais completas e integradas.' },
  { icon: 'fa-mobile-screen', title: 'Aplicativos PWA', description: 'Apps que funcionam em qualquer dispositivo.' },
  { icon: 'fa-calculator', title: 'Calculadoras e Simuladores', description: 'Ferramentas interativas como esta.' },
  { icon: 'fa-chart-line', title: 'Dashboards e BI', description: 'Painéis analíticos para tomada de decisão.' }
]
</script>

<template>
  <div class="min-h-screen">
    <!-- ============ HERO ============ -->
    <section id="inicio" class="relative min-h-[650px] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden flex items-center">
      <div class="absolute inset-0 opacity-30" aria-hidden="true">
        <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px] animate-pulse"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500 rounded-full filter blur-[120px] animate-pulse" style="animation-delay: 1s"></div>
      </div>

      <div class="relative z-10 container py-20">
        <div class="max-w-4xl">
          <div class="flex flex-wrap items-center gap-2 mb-6">
            <span class="badge bg-green-500/20 text-green-300 border border-green-500/30">
              <i class="fa-solid fa-sparkles"></i> 100% Gratuito
            </span>
            <span class="badge bg-blue-500/20 text-blue-300 border border-blue-500/30">
              <i class="fa-solid fa-users"></i> +2.847 usuários esta semana
            </span>
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Pare de Perder Dinheiro em
            <span class="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Decisões Imobiliárias
            </span>
          </h1>

          <p class="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed max-w-3xl">
            Descubra em <span class="text-cyan-400 font-semibold">30 segundos</span> se você está
            pagando ou cobrando o valor certo. Mais de <span class="text-green-400 font-semibold">50.000 brasileiros</span> já
            usaram nossas calculadoras gratuitas.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <router-link to="/calculadora-aluguel" class="btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 text-lg !py-4 !px-8">
              <i class="fa-solid fa-calculator"></i>
              Calcular Meu Aluguel
              <i class="fa-solid fa-arrow-right"></i>
            </router-link>
            <a href="#ferramentas" class="btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-lg !py-4 !px-8">
              <i class="fa-solid fa-play"></i>
              Ver Todas Ferramentas
            </a>
          </div>

          <div class="flex flex-wrap items-center gap-6 text-sm text-gray-400">
            <span class="flex items-center gap-2"><i class="fa-solid fa-circle-check text-green-400"></i> Sem cadastro</span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-lock text-blue-400"></i> 100% seguro</span>
            <span class="flex items-center gap-2"><i class="fa-solid fa-bolt text-amber-400"></i> Instantâneo</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ STATS ============ -->
    <section class="py-12 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600">
      <div class="container">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div v-for="stat in stats" :key="stat.label" class="text-white">
            <i :class="['fa-solid mb-2 text-2xl opacity-80', stat.icon]"></i>
            <div class="text-3xl sm:text-4xl font-bold mb-1">{{ stat.value }}</div>
            <div class="text-white/80 text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FERRAMENTAS ============ -->
    <section id="ferramentas" class="py-20 bg-white dark:bg-slate-900 scroll-mt-20">
      <div class="container">
        <div class="text-center mb-16">
          <span class="badge-primary mb-4"><i class="fa-solid fa-sparkles"></i> Ferramentas Profissionais</span>
          <h2 class="section-title mb-4">Tudo que Você Precisa para <span class="gradient-text">Decisões Inteligentes</span></h2>
          <p class="section-subtitle">Ferramentas usadas por corretores e investidores, agora gratuitas e sem cadastro para você.</p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          <article v-for="feature in features" :key="feature.title" class="card-hover overflow-hidden group">
            <div class="p-6">
              <div class="flex items-center gap-3 mb-4">
                <div :class="['p-3 rounded-xl bg-gradient-to-r shadow-lg group-hover:scale-110 transition-transform', feature.color]">
                  <i :class="['fa-solid', feature.icon, 'text-white text-lg']"></i>
                </div>
                <div class="flex items-center gap-2 flex-wrap">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ feature.title }}</h3>
                  <span class="badge-primary text-[10px]">{{ feature.badge }}</span>
                </div>
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-4">{{ feature.description }}</p>
              <ul class="space-y-2 mb-5">
                <li v-for="f in feature.features" :key="f" class="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <i class="fa-solid fa-circle-check text-primary-500 text-xs"></i> {{ f }}
                </li>
              </ul>
              <router-link :to="feature.link" :class="['btn-primary text-sm bg-gradient-to-r w-full', feature.color]">
                Usar Agora <i class="fa-solid fa-arrow-right"></i>
              </router-link>
            </div>
          </article>
        </div>

        <!-- Diferenciais -->
        <div class="card max-w-3xl mx-auto p-8 mt-14 text-center">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Por Que Nossas Ferramentas São Diferentes?</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                <i class="fa-solid fa-lock text-blue-600 dark:text-blue-400"></i>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">100% Gratuitas</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">Sem cadastro, sem limitações, sem pegadinhas.</p>
            </div>
            <div>
              <div class="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                <i class="fa-solid fa-chart-simple text-green-600 dark:text-green-400"></i>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Dados Reais</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">Baseadas no mercado imobiliário brasileiro.</p>
            </div>
            <div>
              <div class="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                <i class="fa-solid fa-bolt text-purple-600 dark:text-purple-400"></i>
              </div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Resultado Instantâneo</h4>
              <p class="text-sm text-gray-500 dark:text-gray-400">Cálculos em tempo real conforme você digita.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ COMO USAR ============ -->
    <section id="como-usar" class="py-20 bg-gray-50 dark:bg-slate-800/50 scroll-mt-20">
      <div class="container">
        <div class="text-center mb-16">
          <span class="badge-primary mb-4"><i class="fa-solid fa-circle-info"></i> Passo a Passo</span>
          <h2 class="section-title mb-4">Como <span class="gradient-text">Usar</span> em 4 Passos</h2>
          <p class="section-subtitle">Simples, rápido e sem complicação. Comece a calcular agora mesmo.</p>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto mb-12">
          <div v-for="step in howToSteps" :key="step.title" class="card p-6 text-center">
            <div class="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4">
              <i :class="['fa-solid text-white text-xl', step.icon]"></i>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ step.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</p>
          </div>
        </div>

        <div class="card max-w-3xl mx-auto p-6 border-l-4 border-l-amber-500 bg-amber-50 dark:bg-amber-900/20">
          <h3 class="font-bold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
            <i class="fa-solid fa-lightbulb"></i> Dicas para Melhores Resultados
          </h3>
          <ul class="space-y-2">
            <li v-for="tip in tips" :key="tip" class="flex items-start gap-2 text-sm text-amber-800 dark:text-amber-200">
              <i class="fa-solid fa-angle-right mt-1"></i> {{ tip }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- ============ DEPOIMENTOS ============ -->
    <section class="py-20 bg-white dark:bg-slate-900">
      <div class="container">
        <div class="text-center mb-16">
          <span class="badge-warning mb-4"><i class="fa-solid fa-star"></i> Depoimentos Reais</span>
          <h2 class="section-title mb-4">Veja o que Nossos Usuários Descobriram</h2>
        </div>
        <div class="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          <figure v-for="t in testimonials" :key="t.author" class="card p-6 text-center">
            <div class="flex justify-center mb-3">
              <i v-for="i in 5" :key="i" class="fa-solid fa-star text-amber-400"></i>
            </div>
            <blockquote class="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">"{{ t.quote }}"</blockquote>
            <span class="badge-success mb-3">{{ t.savings }}</span>
            <figcaption class="border-t border-gray-100 dark:border-slate-700 pt-3 mt-3">
              <p class="font-bold text-gray-900 dark:text-white">{{ t.author }}</p>
              <p class="text-sm text-gray-500">{{ t.role }}</p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- ============ SOBRE ============ -->
    <section id="sobre" class="py-20 bg-gray-50 dark:bg-slate-800/50 scroll-mt-20">
      <div class="container">
        <div class="text-center mb-12">
          <span class="badge-primary mb-4"><i class="fa-solid fa-heart"></i> Nossa Missão</span>
          <h2 class="section-title mb-4">Sobre a <span class="gradient-text">Calculadora Aluguel Fácil</span></h2>
          <p class="section-subtitle">
            Democratizamos o acesso a ferramentas profissionais do mercado imobiliário para que todos tomem decisões financeiras mais inteligentes.
          </p>
        </div>

        <div class="card p-8 max-w-4xl mx-auto mb-12">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Nossa Missão</h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Acreditamos que todos merecem acesso a ferramentas de qualidade profissional para tomar decisões imobiliárias.
                Muitos brasileiros pagam ou cobram aluguel sem saber o valor correto, financiam imóveis sem comparar sistemas,
                ou iniciam obras sem um orçamento adequado.
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                A Calculadora Aluguel Fácil nasceu para resolver isso: oferecemos gratuitamente ferramentas que antes
                eram exclusivas de profissionais do mercado imobiliário.
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="stat in stats" :key="stat.label" class="text-center p-4 bg-gray-50 dark:bg-slate-700 rounded-xl">
                <i :class="['fa-solid text-primary-500 text-xl mb-2', stat.icon]"></i>
                <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Valores -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          <div v-for="value in values" :key="value.title" class="card p-6 text-center">
            <div class="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
              <i :class="['fa-solid text-white', value.icon]"></i>
            </div>
            <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ value.description }}</p>
          </div>
        </div>

        <!-- O que oferecemos -->
        <div class="card p-8 max-w-4xl mx-auto">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">O Que Oferecemos</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div v-for="benefit in benefits" :key="benefit" class="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
              <i class="fa-solid fa-circle-check text-primary-500"></i>
              <span class="text-gray-700 dark:text-gray-300">{{ benefit }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ CTA PRINCIPAL ============ -->
    <section class="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      <div class="container text-center relative z-10">
        <div class="max-w-3xl mx-auto text-white">
          <span class="badge bg-green-500/20 text-green-300 border border-green-500/30 mb-6 animate-pulse">
            🎁 Ferramenta 100% Gratuita
          </span>
          <h2 class="text-3xl sm:text-4xl font-bold mb-6">Pare de Adivinhar. <span class="text-cyan-400">Comece a Calcular.</span></h2>
          <p class="text-xl text-gray-300 mb-10">
            Junte-se a mais de <span class="text-green-400 font-bold">50.000 brasileiros</span> que já descobriram quanto vale seu imóvel.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/calculadora-aluguel" class="btn-primary bg-gradient-to-r from-cyan-500 to-blue-600 text-lg !py-4 !px-8">
              <i class="fa-solid fa-calculator"></i> Calcular Agora <i class="fa-solid fa-arrow-right"></i>
            </router-link>
            <router-link to="/comparador" class="btn-secondary !border-white/30 !text-white hover:!bg-white/10 text-lg !py-4 !px-8">
              <i class="fa-solid fa-scale-balanced"></i> Comprar ou Alugar?
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ FAQ ============ -->
    <section id="faq" class="py-20 bg-white dark:bg-slate-900 scroll-mt-20">
      <div class="container">
        <div class="text-center mb-12">
          <span class="badge-primary mb-4"><i class="fa-solid fa-circle-question"></i> Dúvidas Frequentes</span>
          <h2 class="section-title mb-2">Perguntas Frequentes</h2>
          <p class="section-subtitle">Tire suas dúvidas sobre a plataforma.</p>
        </div>
        <div class="max-w-3xl mx-auto space-y-4">
          <details v-for="item in faq" :key="item.question" class="card p-6 group">
            <summary class="font-bold text-gray-900 dark:text-white flex items-center gap-2 cursor-pointer list-none">
              <i class="fa-solid fa-circle-question text-primary-500"></i>
              <span class="flex-1">{{ item.question }}</span>
              <i class="fa-solid fa-chevron-down text-gray-400 text-sm transition-transform group-open:rotate-180"></i>
            </summary>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed pl-7 mt-3">{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>

    <!-- ============ CONTATO ============ -->
    <section id="contato" class="py-20 bg-gray-50 dark:bg-slate-800/50 scroll-mt-20">
      <div class="container">
        <div class="text-center mb-12">
          <span class="badge-primary mb-4"><i class="fa-solid fa-envelope"></i> Contato</span>
          <h2 class="section-title mb-4">Fale <span class="gradient-text">Conosco</span></h2>
          <p class="section-subtitle">
            Dúvidas, sugestões ou interesse em um projeto personalizado? Fale com nossa equipe.
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <!-- Canais -->
          <div class="space-y-6">
            <div class="card p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <i class="fa-brands fa-whatsapp text-green-500"></i> WhatsApp
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Fale diretamente com nossa equipe. Atendimento rápido e personalizado.
              </p>
              <a href="https://wa.me/5541996924829" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all shadow-lg">
                <i class="fa-brands fa-whatsapp text-lg"></i> (41) 99692-4829
              </a>
            </div>

            <div class="card p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <i class="fa-solid fa-envelope text-primary-500"></i> E-mail
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Envie sua mensagem por e-mail e retornaremos em até 24 horas úteis.
              </p>
              <a href="mailto:contato@3wonline.com.br"
                class="inline-flex items-center gap-2 px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl transition-all shadow-lg">
                <i class="fa-solid fa-envelope"></i> contato@3wonline.com.br
              </a>
            </div>

            <div class="card p-6">
              <h3 class="font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                <i class="fa-solid fa-clock text-primary-500"></i> Horário de Atendimento
              </h3>
              <div class="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <div class="flex justify-between"><span>Segunda a Sexta</span><span class="font-medium text-gray-900 dark:text-white">09:00 - 18:00</span></div>
                <div class="flex justify-between"><span>Sábado</span><span class="font-medium text-gray-900 dark:text-white">09:00 - 13:00</span></div>
                <div class="flex justify-between"><span>Domingo e Feriados</span><span class="font-medium text-gray-500">Fechado</span></div>
              </div>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-3">
                <i class="fa-solid fa-info-circle mr-1"></i> As ferramentas online estão disponíveis 24/7.
              </p>
            </div>
          </div>

          <!-- Empresa desenvolvedora -->
          <div class="space-y-6">
            <div class="card p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <i class="fa-solid fa-building text-primary-500"></i> Grupo 3W Online
              </h3>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                O Grupo 3W Online é especializado no desenvolvimento de <strong>sites e sistemas web sob demanda</strong>.
                Criamos soluções digitais personalizadas para empresas de todos os portes, com foco em performance,
                usabilidade e resultados.
              </p>
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                A Calculadora Aluguel Fácil é um exemplo do nosso trabalho. Precisa de uma ferramenta similar ou de
                um sistema completo para o seu negócio? Fale conosco!
              </p>
            </div>

            <div class="card p-6">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <i class="fa-solid fa-briefcase text-primary-500"></i> Nossos Serviços
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div v-for="service in services" :key="service.title" class="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  <i :class="['fa-solid text-primary-500 mt-0.5', service.icon]"></i>
                  <div>
                    <h4 class="text-sm font-semibold text-gray-900 dark:text-white">{{ service.title }}</h4>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ service.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- CTA 3W Online -->
            <div class="card p-6 gradient-primary text-white">
              <h3 class="text-xl font-bold mb-3">Quer um Sistema Personalizado?</h3>
              <p class="opacity-90 text-sm leading-relaxed mb-4">
                Transformamos suas ideias em soluções digitais de alta performance. Sites, sistemas, apps, calculadoras
                e muito mais — sob demanda e com qualidade profissional.
              </p>
              <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 font-semibold rounded-xl hover:bg-gray-100 transition-all shadow-lg">
                <i class="fa-solid fa-globe"></i> Visite www.3wonline.com.br <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

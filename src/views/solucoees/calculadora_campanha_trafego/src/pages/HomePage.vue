<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import CtaSection from '@/components/ui/CtaSection.vue'

useHead({
  title: 'Calculadora de Campanha de Tráfego Pago | ROI Grátis — 3W Online',
  meta: [
    {
      name: 'description',
      content:
        'Calcule o ROI das suas campanhas de tráfego pago gratuitamente. Simule Google Ads, Meta Ads e gere orçamentos profissionais em PDF.',
    },
  ],
})

const beneficios = [
  {
    icone: 'fa-solid fa-bullseye',
    titulo: 'Cálculos Precisos',
    descricao:
      'Simule campanhas com base em métricas reais: CPC, CTR e taxa de conversão. Resultados confiáveis em segundos.',
  },
  {
    icone: 'fa-solid fa-chart-line',
    titulo: 'ROI Estimado',
    descricao:
      'Visualize o retorno esperado antes de investir. Tome decisões estratégicas com segurança e dados concretos.',
  },
  {
    icone: 'fa-solid fa-file-pdf',
    titulo: 'Orçamentos em PDF',
    descricao:
      'Gere propostas profissionais que impressionam clientes. Baixe PDFs personalizados prontos para enviar.',
  },
  {
    icone: 'fa-solid fa-layer-group',
    titulo: 'Multi-Canal',
    descricao:
      'Compare resultados entre Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads e YouTube Ads.',
  },
  {
    icone: 'fa-solid fa-shield-halved',
    titulo: '100% Seguro',
    descricao:
      'Processamento local no seu navegador. Nenhum dado é enviado para servidores externos. Privacidade total.',
  },
  {
    icone: 'fa-solid fa-bolt',
    titulo: 'Ultra Rápido',
    descricao:
      'Resultados instantâneos sem espera. Interface otimizada para máxima performance e usabilidade.',
  },
]

const comoFunciona = [
  {
    passo: '01',
    titulo: 'Insira os Dados',
    descricao: 'Informe orçamento, CPC, CTR, taxa de conversão e ticket médio da campanha.',
    icone: 'fa-solid fa-keyboard',
  },
  {
    passo: '02',
    titulo: 'Analise Resultados',
    descricao: 'Veja ROI estimado, conversões projetadas e métricas detalhadas em tempo real.',
    icone: 'fa-solid fa-magnifying-glass-chart',
  },
  {
    passo: '03',
    titulo: 'Gere o Orçamento',
    descricao: 'Baixe um PDF profissional personalizado para enviar ao seu cliente.',
    icone: 'fa-solid fa-download',
  },
]

const dicas = [
  {
    icone: 'fa-solid fa-flask',
    titulo: 'Comece Pequeno',
    descricao:
      'Inicie com orçamentos menores para validar métricas antes de escalar suas campanhas.',
  },
  {
    icone: 'fa-solid fa-microscope',
    titulo: 'Monitore Semanalmente',
    descricao:
      'Acompanhe CPC, CTR e conversões toda semana. Dados atualizados geram projeções mais precisas.',
  },
  {
    icone: 'fa-solid fa-arrows-rotate',
    titulo: 'Teste e Otimize',
    descricao:
      'Faça testes A/B em criativos, copies e audiências. Pequenas mudanças geram grandes resultados.',
  },
  {
    icone: 'fa-solid fa-users',
    titulo: 'Segmente com Precisão',
    descricao:
      'Defina públicos bem segmentados para aumentar CTR e reduzir CPC naturalmente.',
  },
  {
    icone: 'fa-solid fa-file-invoice',
    titulo: 'Documente Tudo',
    descricao:
      'Use os PDFs gerados para manter histórico de propostas e acompanhar evolução com clientes.',
  },
  {
    icone: 'fa-solid fa-scale-balanced',
    titulo: 'Compare Canais',
    descricao:
      'Simule a mesma campanha em diferentes plataformas e descubra onde seu investimento rende mais.',
  },
]

const stats = [
  { numero: '+3.200', label: 'Gestores Ativos', icone: 'fa-solid fa-users' },
  { numero: '+15.000', label: 'Simulações Feitas', icone: 'fa-solid fa-calculator' },
  { numero: '4.9/5', label: 'Satisfação', icone: 'fa-solid fa-star' },
  { numero: '100%', label: 'Gratuito', icone: 'fa-solid fa-gift' },
]

const valores = [
  {
    icone: 'fa-solid fa-shield-halved',
    titulo: 'Segurança',
    desc: 'Seus dados nunca saem do seu navegador.',
  },
  { icone: 'fa-solid fa-bolt', titulo: 'Velocidade', desc: 'Resultados instantâneos, sem espera.' },
  { icone: 'fa-solid fa-medal', titulo: 'Qualidade', desc: 'Interface profissional e intuitiva.' },
  {
    icone: 'fa-solid fa-heart',
    titulo: 'Acessibilidade',
    desc: '100% gratuito para todos.',
  },
]

const servicos = [
  {
    icone: 'fa-solid fa-globe',
    titulo: 'Sites Institucionais',
    desc: 'Sites modernos, rápidos e otimizados para SEO que fortalecem a presença digital da sua marca.',
  },
  {
    icone: 'fa-solid fa-gears',
    titulo: 'Sistemas Sob Demanda',
    desc: 'Sistemas web personalizados para automatizar processos e resolver as dores reais do seu negócio.',
  },
  {
    icone: 'fa-solid fa-mobile-screen',
    titulo: 'Aplicações Web',
    desc: 'Aplicações responsivas e escaláveis, construídas com tecnologia de ponta e foco em resultado.',
  },
  {
    icone: 'fa-solid fa-rocket',
    titulo: 'Landing Pages',
    desc: 'Páginas de alta conversão pensadas para transformar visitantes em clientes.',
  },
]

const faq = [
  {
    pergunta: 'A ferramenta é realmente gratuita?',
    resposta: 'Sim! 100% gratuita, sem limites de uso e sem necessidade de cadastro. Use à vontade.',
  },
  {
    pergunta: 'Meus dados estão seguros?',
    resposta:
      'Absolutamente. Todo o processamento é feito localmente no seu navegador. Nenhum dado é enviado para servidores externos.',
  },
  {
    pergunta: 'Posso gerar quantos orçamentos quiser?',
    resposta:
      'Sim! Não há limite. Gere quantos PDFs profissionais precisar para seus clientes.',
  },
  {
    pergunta: 'Quais canais de tráfego são suportados?',
    resposta:
      'Google Ads, Meta Ads (Facebook/Instagram), LinkedIn Ads, TikTok Ads e YouTube Ads.',
  },
  {
    pergunta: 'As projeções são garantidas?',
    resposta:
      'As projeções são estimativas baseadas nos parâmetros informados. Resultados reais podem variar conforme a performance.',
  },
]
</script>

<template>
  <!-- HERO -->
  <section id="hero" class="gradient-hero relative overflow-hidden py-20 lg:py-32">
    <div
      class="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full animate-float"
      aria-hidden="true"
    ></div>
    <div
      class="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full animate-float animate-delay-200"
      aria-hidden="true"
    ></div>
    <div
      class="absolute top-1/2 left-1/4 w-32 h-32 bg-white/3 rounded-full animate-pulse"
      aria-hidden="true"
    ></div>

    <div class="container-app relative z-10">
      <div class="max-w-4xl mx-auto text-center">
        <span class="badge bg-white/15 text-white mb-6 animate-fade-in">
          <i class="fa-solid fa-bolt text-warning-400"></i>
          Ferramenta 100% Gratuita
        </span>

        <h1
          class="text-4xl sm:text-5xl lg:text-7xl font-black text-white mb-6 leading-tight animate-fade-in animate-delay-100"
        >
          Calcule o ROI das suas
          <span
            class="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent"
          >
            Campanhas de Tráfego
          </span>
        </h1>

        <p
          class="text-lg md:text-xl text-white/85 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in animate-delay-200"
        >
          A ferramenta que mais de <strong class="text-white">3.200 gestores de tráfego</strong> já
          usam para planejar campanhas, calcular ROI e gerar orçamentos profissionais que
          <strong class="text-white">convertem clientes</strong>.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-300">
          <RouterLink id="cta-hero-primary" to="/ferramenta" class="btn-cta group">
            <i class="fa-solid fa-calculator"></i>
            Simular Agora — É Grátis
            <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </RouterLink>
          <a
            href="#como-funciona"
            class="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-4 rounded-2xl"
          >
            <i class="fa-solid fa-play"></i>
            Como Funciona
          </a>
        </div>

        <!-- Prova social -->
        <div
          class="mt-12 flex flex-wrap items-center justify-center gap-8 text-white/70 text-sm animate-fade-in animate-delay-400"
        >
          <div class="flex items-center gap-2">
            <div class="flex -space-x-2">
              <div
                v-for="(letter, i) in ['A', 'M', 'R', 'J']"
                :key="i"
                class="w-8 h-8 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-xs text-white font-bold"
              >
                {{ letter }}
              </div>
            </div>
            <span>+3.200 gestores ativos</span>
          </div>
          <div class="flex items-center gap-1">
            <i v-for="n in 5" :key="n" class="fa-solid fa-star text-yellow-400 text-xs"></i>
            <span class="ml-1">4.9/5 de satisfação</span>
          </div>
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-lock text-green-400"></i>
            <span>Dados 100% seguros</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BENEFÍCIOS -->
  <section id="beneficios" class="section gradient-card">
    <div class="container-app">
      <div class="text-center mb-16">
        <span class="badge-primary mb-4">
          <i class="fa-solid fa-gem"></i>
          Benefícios
        </span>
        <h2 class="section-title">Por que <span class="gradient-text">3.200+ gestores</span> já usam?</h2>
        <p class="section-subtitle">
          Transforme dados em decisões estratégicas e impressione seus clientes com propostas
          profissionais.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <div
          v-for="(b, i) in beneficios"
          :key="i"
          class="card p-6 text-center group animate-fade-in"
          :style="{ animationDelay: `${i * 100}ms` }"
        >
          <div
            class="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-card"
          >
            <i :class="[b.icone, 'text-white text-xl']"></i>
          </div>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-3">{{ b.titulo }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ b.descricao }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- COMO FUNCIONA -->
  <section id="como-funciona" class="section bg-white dark:bg-gray-950">
    <div class="container-app">
      <div class="text-center mb-16">
        <span class="badge-primary mb-4">
          <i class="fa-solid fa-route"></i>
          Passo a Passo
        </span>
        <h2 class="section-title">Simples assim: <span class="gradient-text">3 passos</span></h2>
        <p class="section-subtitle">
          Em menos de 2 minutos você terá sua simulação completa com orçamento profissional.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div
          v-for="(item, i) in comoFunciona"
          :key="i"
          class="relative text-center animate-fade-in"
          :style="{ animationDelay: `${i * 150}ms` }"
        >
          <div
            class="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow"
          >
            <i :class="[item.icone, 'text-white text-2xl']"></i>
          </div>
          <span class="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2 block"
            >Passo {{ item.passo }}</span
          >
          <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">{{ item.titulo }}</h3>
          <p class="text-gray-500 dark:text-gray-400 leading-relaxed">{{ item.descricao }}</p>

          <div v-if="i < 2" class="hidden md:block absolute top-10 -right-6 lg:-right-8">
            <i class="fa-solid fa-arrow-right text-2xl text-primary-300"></i>
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <RouterLink id="cta-como-funciona" to="/ferramenta" class="btn-cta group">
          <i class="fa-solid fa-rocket"></i>
          Começar Agora — É Grátis
          <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- FUNCIONALIDADES -->
  <section id="funcionalidades" class="section gradient-card">
    <div class="container-app">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span class="badge-primary mb-4">
            <i class="fa-solid fa-list-check"></i>
            Funcionalidades
          </span>
          <h2 class="section-title text-left">
            Tudo que você precisa em <span class="gradient-text">uma só ferramenta</span>
          </h2>
          <div class="space-y-4 mt-8">
            <div
              v-for="(item, i) in [
                'Simulação com diferentes canais de tráfego pago',
                'Cálculo automático de ROI e conversões em tempo real',
                'Geração de orçamentos profissionais em PDF',
                'Interface intuitiva, moderna e responsiva',
                'Resultados baseados em métricas verificáveis',
                'Comparação entre cenários de campanha',
                'Análise e recomendações automáticas',
                'Processamento 100% local — dados seguros',
              ]"
              :key="i"
              class="flex items-center gap-3 animate-fade-in"
              :style="{ animationDelay: `${i * 80}ms` }"
            >
              <div
                class="w-6 h-6 bg-success-500 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <i class="fa-solid fa-check text-white text-xs"></i>
              </div>
              <span class="text-gray-700 dark:text-gray-300">{{ item }}</span>
            </div>
          </div>
          <div class="mt-8">
            <RouterLink id="cta-funcionalidades" to="/ferramenta" class="btn-primary btn-lg">
              <i class="fa-solid fa-calculator"></i>
              Acessar Calculadora
              <i class="fa-solid fa-arrow-right"></i>
            </RouterLink>
          </div>
        </div>

        <!-- Card de exemplo -->
        <div class="card p-8 shadow-floating">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
              <i class="fa-solid fa-chart-pie text-white"></i>
            </div>
            <h3 class="font-bold text-lg text-gray-900 dark:text-white">Exemplo de Resultado</h3>
          </div>
          <div class="space-y-4">
            <div
              v-for="(item, i) in [
                { label: 'Orçamento Total', valor: 'R$ 10.000' },
                { label: 'Cliques Estimados', valor: '2.500' },
                { label: 'Conversões', valor: '75' },
                { label: 'Custo por Conversão', valor: 'R$ 133,33' },
                { label: 'Receita Estimada', valor: 'R$ 37.500' },
              ]"
              :key="i"
              class="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0"
            >
              <span class="text-gray-500 dark:text-gray-400 text-sm">{{ item.label }}</span>
              <span class="font-semibold text-gray-900 dark:text-white">{{ item.valor }}</span>
            </div>
            <div class="gradient-primary rounded-xl p-4 text-center mt-4">
              <div class="text-3xl font-black text-white">+350%</div>
              <div class="text-white/80 text-sm">ROI Estimado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- DICAS -->
  <section id="dicas" class="section bg-white dark:bg-gray-950">
    <div class="container-app">
      <div class="text-center mb-16">
        <span class="badge-primary mb-4">
          <i class="fa-solid fa-lightbulb"></i>
          Dicas de Especialista
        </span>
        <h2 class="section-title">Maximize seus <span class="gradient-text">resultados</span></h2>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(dica, i) in dicas" :key="i" class="card p-6 group">
          <div
            class="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-500 transition-colors duration-300"
          >
            <i
              :class="[dica.icone, 'text-primary-600 group-hover:text-white transition-colors duration-300']"
            ></i>
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ dica.titulo }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ dica.descricao }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE -->
  <section id="sobre" class="section gradient-card">
    <div class="container-app">
      <div class="text-center mb-16">
        <span class="badge-primary mb-4">
          <i class="fa-solid fa-users"></i>
          Sobre Nós
        </span>
        <h2 class="section-title">
          Feita por quem entende de <span class="gradient-text">tráfego pago</span>
        </h2>
        <p class="section-subtitle">
          Desenvolvemos esta ferramenta para transformar a rotina de gestores de tráfego com dados
          precisos e orçamentos profissionais.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <h3 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
            Nossa <span class="gradient-text">Missão</span>
          </h3>
          <div class="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              A
              <strong class="text-gray-900 dark:text-white"
                >Calculadora de Campanha de Tráfego Pago</strong
              >
              nasceu da necessidade real de gestores de tráfego que precisavam de uma ferramenta
              rápida, precisa e profissional para planejar campanhas.
            </p>
            <p>
              Desenvolvida pelo <strong class="text-gray-900 dark:text-white">Grupo 3W Online</strong>,
              empresa especializada em desenvolvimento de sites e sistemas personalizados sob demanda,
              nossa ferramenta combina experiência em marketing digital com tecnologia de ponta.
            </p>
            <p>
              Acreditamos que <strong class="text-gray-900 dark:text-white">dados transformam decisões</strong>.
              Por isso, oferecemos uma solução 100% gratuita, segura e sem limitações, para que
              qualquer profissional possa calcular ROI, projetar conversões e gerar orçamentos que
              realmente convertem clientes.
            </p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div v-for="(stat, i) in stats" :key="i" class="card p-6 text-center">
            <div
              class="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center mx-auto mb-3"
            >
              <i :class="[stat.icone, 'text-white']"></i>
            </div>
            <div class="text-2xl font-black gradient-text">{{ stat.numero }}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>

      <!-- Valores -->
      <div class="mt-16">
        <div class="text-center mb-10">
          <h3 class="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
            Nossos <span class="gradient-text">Valores</span>
          </h3>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="(v, i) in valores" :key="i" class="card p-6 text-center group">
            <div
              class="w-14 h-14 bg-primary-100 dark:bg-primary-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-500 transition-colors duration-300"
            >
              <i
                :class="[v.icone, 'text-xl text-primary-600 group-hover:text-white transition-colors duration-300']"
              ></i>
            </div>
            <h4 class="font-bold text-gray-900 dark:text-white mb-2">{{ v.titulo }}</h4>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS (3W Online) -->
  <section id="servicos" class="section bg-white dark:bg-gray-950">
    <div class="container-app">
      <div class="text-center mb-16">
        <span class="badge-primary mb-4">
          <i class="fa-solid fa-code"></i>
          Serviços
        </span>
        <h2 class="section-title">
          Precisa de um site ou sistema <span class="gradient-text">sob medida</span>?
        </h2>
        <p class="section-subtitle">
          O <strong class="text-gray-900 dark:text-white">Grupo 3W Online</strong> — quem desenvolveu
          esta calculadora — cria sites e sistemas personalizados sob demanda para transformar as
          ideias do seu negócio em soluções digitais de alto impacto.
        </p>
      </div>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div v-for="(s, i) in servicos" :key="i" class="card p-6 text-center group">
          <div
            class="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300"
          >
            <i :class="[s.icone, 'text-white text-xl']"></i>
          </div>
          <h3 class="font-bold text-gray-900 dark:text-white mb-2">{{ s.titulo }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{{ s.desc }}</p>
        </div>
      </div>

      <div class="text-center">
        <a
          id="cta-servicos-3wonline"
          href="https://www.3wonline.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-cta group"
        >
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          Solicite seu Orçamento na 3W Online
          <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
        </a>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section id="faq" class="section gradient-card">
    <div class="container-app">
      <div class="text-center mb-16">
        <span class="badge-primary mb-4">
          <i class="fa-solid fa-circle-question"></i>
          FAQ
        </span>
        <h2 class="section-title">Perguntas <span class="gradient-text">Frequentes</span></h2>
      </div>
      <div class="max-w-3xl mx-auto space-y-4">
        <details v-for="(item, i) in faq" :id="`faq-item-${i}`" :key="i" class="card p-0 group">
          <summary
            class="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors list-none"
          >
            <span class="flex items-center gap-3">
              <i class="fa-solid fa-circle-question text-primary-500"></i>
              {{ item.pergunta }}
            </span>
            <i
              class="fa-solid fa-chevron-down text-gray-400 group-open:rotate-180 transition-transform duration-300 text-sm"
            ></i>
          </summary>
          <div
            class="px-5 pb-5 text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-4"
          >
            {{ item.resposta }}
          </div>
        </details>
      </div>
    </div>
  </section>

  <!-- CONTATO -->
  <section id="contato" class="section bg-white dark:bg-gray-950">
    <div class="container-app">
      <div class="text-center mb-16">
        <span class="badge-primary mb-4">
          <i class="fa-solid fa-envelope"></i>
          Contato
        </span>
        <h2 class="section-title">Fale <span class="gradient-text">conosco</span></h2>
        <p class="section-subtitle">
          Dúvidas, sugestões ou parcerias? Estamos prontos para ajudar. Fale direto pelos nossos
          canais — sem formulários, sem espera.
        </p>
      </div>

      <div class="grid lg:grid-cols-5 gap-12">
        <div class="lg:col-span-2">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Como podemos ajudar?</h3>
          <div class="space-y-6">
            <div
              v-for="(item, i) in [
                {
                  icone: 'fa-solid fa-headset',
                  titulo: 'Suporte Técnico',
                  desc: 'Problemas com a ferramenta? Estamos prontos para resolver.',
                },
                {
                  icone: 'fa-solid fa-lightbulb',
                  titulo: 'Sugestões',
                  desc: 'Tem uma ideia para melhorar a calculadora? Queremos ouvir!',
                },
                {
                  icone: 'fa-solid fa-handshake',
                  titulo: 'Parcerias',
                  desc: 'Interessado em parcerias ou integrações? Vamos conversar.',
                },
                {
                  icone: 'fa-solid fa-code',
                  titulo: 'Desenvolvimento Sob Demanda',
                  desc: 'Precisa de um sistema personalizado? O Grupo 3W Online desenvolve sob medida.',
                },
              ]"
              :key="i"
              class="flex gap-4 items-start"
            >
              <div
                class="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-xl flex items-center justify-center flex-shrink-0"
              >
                <i :class="[item.icone, 'text-primary-600 dark:text-primary-400']"></i>
              </div>
              <div>
                <h4 class="font-bold text-gray-900 dark:text-white mb-1">{{ item.titulo }}</h4>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ item.desc }}</p>
              </div>
            </div>
          </div>

          <div
            class="mt-8 card p-5 bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800"
          >
            <p class="text-sm text-gray-700 dark:text-gray-300">
              <i class="fa-solid fa-info-circle text-primary-500 mr-2"></i>
              Respondemos em até <strong>24 horas úteis</strong>. Para assuntos urgentes, mencione no
              assunto.
            </p>
          </div>
        </div>

        <div class="lg:col-span-3">
          <div class="card p-6 shadow-floating">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <i class="fa-solid fa-paper-plane text-primary-500"></i>
              Fale Conosco
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Entre em contato diretamente pelos canais abaixo. Estamos prontos para atender você!
            </p>

            <div class="space-y-6">
              <a
                href="https://wa.me/5541996924829"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-4 p-5 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:shadow-md transition-all duration-300 group"
                aria-label="Conversar pelo WhatsApp"
              >
                <div
                  class="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <i class="fa-brands fa-whatsapp text-white text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white">WhatsApp</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">(41) 99692-4829</p>
                </div>
                <i
                  class="fa-solid fa-arrow-right text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></i>
              </a>

              <a
                href="mailto:contato@3wonline.com.br"
                class="flex items-center gap-4 p-5 rounded-xl bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 hover:shadow-md transition-all duration-300 group"
                aria-label="Enviar e-mail"
              >
                <div
                  class="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                >
                  <i class="fa-solid fa-envelope text-white text-xl"></i>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 dark:text-white">E-mail</h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">contato@3wonline.com.br</p>
                </div>
                <i
                  class="fa-solid fa-arrow-right text-primary-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA 3W ONLINE -->
  <CtaSection />
</template>

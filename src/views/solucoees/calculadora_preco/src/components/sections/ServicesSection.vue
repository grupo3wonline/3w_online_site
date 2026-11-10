<script setup lang="ts">
import { Icon } from '@iconify/vue'

const services = [
  {
    icon: 'fa6-solid:laptop-code',
    title: 'Desenvolvimento de Sites',
    description:
      'Sites institucionais, landing pages e hotsites personalizados com design moderno e responsivo.',
    features: [
      'Design profissional e exclusivo',
      'SEO otimizado para Google',
      'Responsivo (mobile-first)',
      'Carregamento ultra-rápido',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: 'fa6-solid:gears',
    title: 'Sistemas Web Personalizados',
    description:
      'Desenvolvimento de sistemas sob demanda para atender necessidades específicas do seu negócio.',
    features: [
      'Análise completa de requisitos',
      'Arquitetura escalável',
      'Segurança e proteção de dados',
      'Integração com APIs',
    ],
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: 'fa6-solid:cart-shopping',
    title: 'E-commerce Completo',
    description:
      'Lojas virtuais profissionais com integração de pagamento, gestão de estoque e muito mais.',
    features: [
      'Catálogo de produtos ilimitado',
      'Gateway de pagamento integrado',
      'Gestão de pedidos e estoque',
      'Cupons e promoções',
    ],
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: 'fa6-solid:mobile-screen',
    title: 'Aplicativos Mobile',
    description:
      'Apps nativos ou híbridos para iOS e Android com performance e usabilidade excepcionais.',
    features: [
      'Design nativo para cada plataforma',
      'Push notifications',
      'Integração com APIs',
      'Modo offline',
    ],
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: 'fa6-solid:chart-line',
    title: 'Dashboards e BI',
    description:
      'Painéis analíticos e Business Intelligence para visualizar dados e tomar decisões estratégicas.',
    features: [
      'Visualização de dados em tempo real',
      'Gráficos interativos',
      'Relatórios personalizados',
      'Alertas automáticos',
    ],
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: 'fa6-solid:rocket',
    title: 'Consultoria Digital',
    description:
      'Orientação estratégica para transformação digital, marketing e otimização de processos.',
    features: [
      'Análise de processos',
      'Estratégia digital',
      'Otimização de performance',
      'Treinamento de equipes',
    ],
    color: 'from-indigo-500 to-blue-500',
  },
]

const methodology = [
  {
    step: '01',
    title: 'Análise',
    icon: 'fa6-solid:magnifying-glass',
    desc: 'Entendemos suas necessidades e objetivos',
  },
  {
    step: '02',
    title: 'Planejamento',
    icon: 'fa6-solid:sitemap',
    desc: 'Criamos a arquitetura e especificações',
  },
  {
    step: '03',
    title: 'Desenvolvimento',
    icon: 'fa6-solid:code',
    desc: 'Codificamos com as melhores práticas',
  },
  {
    step: '04',
    title: 'Testes',
    icon: 'fa6-solid:check-double',
    desc: 'Garantimos qualidade com testes rigorosos',
  },
  {
    step: '05',
    title: 'Entrega',
    icon: 'fa6-solid:rocket',
    desc: 'Publicamos e disponibilizamos sua solução',
  },
  {
    step: '06',
    title: 'Suporte',
    icon: 'fa6-solid:headset',
    desc: 'Acompanhamos e damos suporte contínuo',
  },
]

const techs = [
  'Vue.js',
  'React',
  'Node.js',
  'Laravel',
  'Python',
  'TypeScript',
  'Tailwind',
  'MySQL',
  'MongoDB',
  'AWS',
  'Docker',
  'Git',
]
</script>

<template>
  <section id="servicos" class="py-20">
    <div class="container">
      <div class="mx-auto mb-16 max-w-4xl space-y-6 text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-primary">
          <Icon icon="fa6-solid:briefcase" class="h-4 w-4" />
          <span class="font-semibold">Grupo 3w Online — Nossos Serviços</span>
        </div>
        <h2 class="text-3xl font-black text-foreground md:text-5xl">
          Soluções Digitais Sob Medida
        </h2>
        <p class="text-xl leading-relaxed text-muted-foreground">
          O <strong class="text-primary">Grupo 3w Online</strong> transforma ideias em realidade
          digital. Desenvolvemos sites, sistemas e aplicativos personalizados sob demanda, com
          tecnologia de ponta e design excepcional.
        </p>
      </div>

      <!-- Grid de serviços -->
      <div class="mx-auto mb-20 grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="service in services"
          :key="service.title"
          v-motion-fade-visible
          class="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:-translate-y-2 hover:shadow-elegant"
        >
          <div
            class="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br transition-transform duration-300 group-hover:scale-110"
            :class="service.color"
          >
            <Icon :icon="service.icon" class="h-7 w-7 text-white" />
          </div>
          <h3 class="mb-3 text-2xl font-bold text-foreground">{{ service.title }}</h3>
          <p class="mb-6 leading-relaxed text-muted-foreground">{{ service.description }}</p>
          <ul class="mb-6 space-y-2">
            <li
              v-for="f in service.features"
              :key="f"
              class="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Icon icon="fa6-solid:check" class="mt-1 h-3.5 w-3.5 flex-shrink-0 text-green-500" />
              <span>{{ f }}</span>
            </li>
          </ul>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:from-violet-700 hover:to-purple-700"
          >
            <Icon icon="fa6-solid:circle-info" class="h-4 w-4" />
            Saiba Mais
          </a>
        </div>
      </div>

      <!-- Metodologia -->
      <div class="mx-auto mb-20 max-w-6xl">
        <div class="mb-12 text-center">
          <h3 class="text-2xl font-black text-foreground md:text-4xl">
            <Icon icon="fa6-solid:list-check" class="mr-2 inline h-7 w-7 text-primary" />
            Nossa Metodologia
          </h3>
          <p class="mt-2 text-lg text-muted-foreground">
            Processo comprovado para garantir o sucesso do seu projeto
          </p>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="item in methodology"
            :key="item.step"
            class="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div class="absolute right-0 top-0 text-8xl font-black text-muted/40">
              {{ item.step }}
            </div>
            <div class="relative z-10">
              <div
                class="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent transition-transform duration-300 group-hover:scale-110"
              >
                <Icon :icon="item.icon" class="h-6 w-6 text-primary" />
              </div>
              <h4 class="mb-2 text-xl font-bold text-foreground">{{ item.title }}</h4>
              <p class="text-sm text-muted-foreground">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tecnologias -->
      <div class="mx-auto max-w-6xl">
        <div
          class="rounded-3xl bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 p-12 text-white shadow-2xl md:p-16"
        >
          <div class="mb-12 text-center">
            <h3 class="mb-4 text-2xl font-black md:text-4xl">
              <Icon icon="fa6-solid:layer-group" class="mr-2 inline h-7 w-7" />
              Tecnologias de Ponta
            </h3>
            <p class="text-xl text-white/90">
              Utilizamos as melhores e mais modernas tecnologias do mercado
            </p>
          </div>
          <div class="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-6">
            <div
              v-for="tech in techs"
              :key="tech"
              class="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20"
            >
              <Icon icon="fa6-solid:code" class="mx-auto mb-2 h-7 w-7" />
              <p class="font-semibold">{{ tech }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

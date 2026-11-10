<script setup lang="ts">
import { site } from '@/config/site'
import { useSeo } from '@/composables/useSeo'
import MarketingCalculator from '@/components/MarketingCalculator.vue'

useSeo(() => ({
  title: 'Calculadora Gratuita e Profissional',
  description: site.description,
  path: '/',
  ogType: 'website',
}))

const features = [
  {
    icon: 'fa-bolt',
    title: 'Cálculo Instantâneo',
    description: 'Obtenha o orçamento da sua campanha em segundos. Sem complicação, sem espera.',
  },
  {
    icon: 'fa-shield-alt',
    title: '100% Seguro',
    description: 'Seus dados são processados localmente. Nada é enviado para servidores externos.',
  },
  {
    icon: 'fa-dollar-sign',
    title: 'Totalmente Gratuito',
    description: 'Use sem limites, sem cadastro e sem custos escondidos. Simples assim.',
  },
  {
    icon: 'fa-mobile-alt',
    title: 'Mobile First',
    description: 'Interface otimizada para qualquer dispositivo. Calcule de onde estiver.',
  },
  {
    icon: 'fa-chart-line',
    title: 'Precisão Profissional',
    description: 'Fórmulas baseadas em padrões do mercado de marketing digital.',
  },
  {
    icon: 'fa-users',
    title: 'Para Todos',
    description: 'Ideal para influenciadores, agências, freelancers e criadores de conteúdo.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Informe os Seguidores',
    description: 'Digite a quantidade de seguidores ou visualizações esperadas para o conteúdo.',
  },
  {
    number: '02',
    title: 'Defina a Taxa',
    description: 'Insira o valor em centavos cobrado por seguidor ou visualização.',
  },
  {
    number: '03',
    title: 'Escolha a Duração',
    description: 'Determine quantos dias a campanha ficará ativa.',
  },
  {
    number: '04',
    title: 'Receba o Orçamento',
    description: 'Obtenha instantaneamente o valor total estimado para sua campanha.',
  },
]

const aboutFeatures = [
  {
    icon: 'fa-calculator',
    title: 'Cálculo Preciso',
    description: 'Fórmulas baseadas em padrões do mercado para orçamentos profissionais.',
  },
  {
    icon: 'fa-shield-alt',
    title: 'Privacidade Garantida',
    description: 'Seus dados são processados localmente, sem envio a servidores externos.',
  },
  {
    icon: 'fa-mobile-alt',
    title: 'Design Responsivo',
    description: 'Interface adaptada para funcionar perfeitamente em qualquer dispositivo.',
  },
  {
    icon: 'fa-infinity',
    title: 'Uso Ilimitado',
    description: 'Calcule quantas vezes precisar, sem restrições ou limites.',
  },
  {
    icon: 'fa-clock',
    title: 'Disponível 24/7',
    description: 'Acesse a qualquer momento, de qualquer lugar do mundo.',
  },
  {
    icon: 'fa-code',
    title: 'Tecnologia Moderna',
    description: 'Desenvolvida com as melhores práticas e tecnologias atuais.',
  },
]

const team = [
  {
    name: 'Grupo 3w Online',
    role: 'Empresa Desenvolvedora',
    description: 'Especialistas em desenvolvimento de sites e sistemas personalizados sob demanda.',
    icon: 'fa-building',
  },
  {
    name: 'HOTWYL | WILLFROMBRASIL',
    role: 'Desenvolvedor',
    description: 'Responsável pelo design e desenvolvimento desta ferramenta.',
    icon: 'fa-user-tie',
  },
]

const contactChannels = [
  {
    icon: 'fab fa-whatsapp',
    title: 'WhatsApp',
    value: site.contact.whatsapp,
    href: site.contact.whatsappLink,
    external: true,
    accent: 'text-green-500',
    bg: 'bg-green-500/10',
    hint: 'Resposta rápida no horário comercial',
  },
  {
    icon: 'fas fa-envelope',
    title: 'E-mail',
    value: site.contact.email,
    href: site.contact.emailLink,
    external: false,
    accent: 'text-primary',
    bg: 'bg-primary/10',
    hint: 'Ideal para propostas e orçamentos detalhados',
  },
  {
    icon: 'fas fa-globe',
    title: 'Website',
    value: site.contact.website,
    href: site.contact.websiteLink,
    external: true,
    accent: 'text-accent',
    bg: 'bg-accent/10',
    hint: 'Conheça todos os nossos serviços',
  },
]

const services = [
  {
    icon: 'fa-globe',
    title: 'Desenvolvimento de Sites',
    description:
      'Sites institucionais, landing pages e hotsites com design moderno, responsivo e otimizado para SEO.',
    features: ['Design Responsivo', 'SEO Otimizado', 'Alta Performance'],
  },
  {
    icon: 'fa-laptop-code',
    title: 'Sistemas Web',
    description:
      'Sistemas personalizados para gestão empresarial, CRM, ERP e automação de processos.',
    features: ['Sob Demanda', 'Escalável', 'Seguro'],
  },
  {
    icon: 'fa-mobile-alt',
    title: 'Aplicativos Mobile',
    description:
      'Aplicativos para iOS e Android com interface intuitiva e experiência do usuário excepcional.',
    features: ['Multiplataforma', 'UX Premium', 'Suporte Contínuo'],
  },
  {
    icon: 'fa-shopping-cart',
    title: 'E-commerce',
    description:
      'Lojas virtuais completas com integração de pagamentos, frete e gestão de estoque.',
    features: ['Integrações', 'Checkout Otimizado', 'Relatórios'],
  },
  {
    icon: 'fa-bullhorn',
    title: 'Marketing Digital',
    description:
      'Estratégias completas de marketing digital para aumentar sua visibilidade e conversões.',
    features: ['SEO', 'Redes Sociais', 'Ads'],
  },
  {
    icon: 'fa-headset',
    title: 'Suporte e Manutenção',
    description: 'Suporte técnico especializado e manutenção preventiva para seus sistemas.',
    features: ['24/7', 'SLA Garantido', 'Backups'],
  },
]

const benefits = [
  {
    icon: 'fa-award',
    title: 'Qualidade Premium',
    description: 'Projetos desenvolvidos com as melhores práticas e tecnologias do mercado.',
  },
  {
    icon: 'fa-handshake',
    title: 'Parceria de Confiança',
    description: 'Relacionamento próximo com nossos clientes em todas as etapas do projeto.',
  },
  {
    icon: 'fa-rocket',
    title: 'Entregas no Prazo',
    description: 'Compromisso com cronogramas e prazos acordados desde o início.',
  },
  {
    icon: 'fa-comments',
    title: 'Suporte Dedicado',
    description: 'Equipe pronta para atender suas necessidades mesmo após a entrega.',
  },
]

const process = [
  { step: '01', title: 'Briefing', icon: 'fa-comments' },
  { step: '02', title: 'Planejamento', icon: 'fa-project-diagram' },
  { step: '03', title: 'Desenvolvimento', icon: 'fa-code' },
  { step: '04', title: 'Entrega', icon: 'fa-rocket' },
]

const stats = [
  { value: '10k+', label: 'Cálculos Realizados', icon: 'fa-calculator' },
  { value: '98%', label: 'Satisfação', icon: 'fa-face-smile' },
  { value: '5s', label: 'Tempo Médio', icon: 'fa-bolt' },
  { value: '24/7', label: 'Disponível', icon: 'fa-clock' },
]

const testimonials = [
  {
    name: 'Maria S.',
    role: 'Influenciadora Digital',
    content:
      'Finalmente uma ferramenta que me ajuda a precificar corretamente minhas campanhas. Recomendo muito!',
    avatar: 'M',
  },
  {
    name: 'João P.',
    role: 'Dono de Agência',
    content: 'Uso diariamente para apresentar orçamentos aos clientes. Prático e profissional.',
    avatar: 'J',
  },
  {
    name: 'Ana L.',
    role: 'Criadora de Conteúdo',
    content:
      'Simples, rápido e gratuito. Exatamente o que eu precisava para organizar meus valores.',
    avatar: 'A',
  },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <!-- HERO -->
  <section
    class="hero-pattern relative flex min-h-[92vh] items-center justify-center overflow-hidden"
  >
    <div class="absolute inset-0 gradient-hero opacity-95"></div>
    <!-- Blobs decorativos -->
    <div
      class="float absolute left-[-4rem] top-24 h-80 w-80 rounded-full bg-white/10 blur-3xl"
    ></div>
    <div
      class="float absolute bottom-16 right-[-4rem] h-96 w-96 rounded-full bg-accent-2/20 blur-3xl"
      style="animation-delay: 2s"
    ></div>
    <!-- Grid pattern overlay -->
    <div
      class="absolute inset-0 opacity-[0.07]"
      style="
        background-image:
          linear-gradient(#fff 1px, transparent 1px),
          linear-gradient(90deg, #fff 1px, transparent 1px);
        background-size: 44px 44px;
        mask-image: radial-gradient(ellipse at center, #000 30%, transparent 75%);
      "
      aria-hidden="true"
    ></div>

    <div class="container relative mx-auto px-4 py-20 text-center">
      <div class="mx-auto max-w-4xl">
        <div
          v-motion-fade
          class="mb-8 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-md"
        >
          <span class="flex items-center gap-0.5 text-yellow-300">
            <i v-for="n in 5" :key="n" class="fas fa-star text-[10px]" aria-hidden="true"></i>
          </span>
          <span>Ferramenta #1 para Orçamentos de Marketing</span>
        </div>

        <h1
          class="mb-6 font-display text-4xl font-extrabold leading-[1.1] text-white text-balance md:text-6xl lg:text-7xl"
        >
          Calcule o valor ideal da sua
          <span class="relative inline-block">
            <span
              class="animate-gradient bg-gradient-to-r from-yellow-200 via-white to-yellow-200 bg-clip-text text-transparent"
            >
              campanha de marketing
            </span>
            <svg
              class="absolute -bottom-2 left-0 w-full text-white/40"
              viewBox="0 0 300 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 9C60 3 120 3 180 6C220 8 260 9 298 5"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
              />
            </svg>
          </span>
        </h1>

        <p
          class="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/85 text-pretty md:text-xl"
        >
          Ferramenta <strong class="text-white">100% gratuita</strong> para influenciadores,
          agências e criadores de conteúdo calcularem orçamentos de campanhas digitais de forma
          <strong class="text-white">rápida e profissional</strong>.
        </p>

        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            class="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-primary shadow-2xl transition-all hover:scale-105 hover:shadow-white/20 sm:w-auto"
            @click="scrollTo('calculadora')"
          >
            <i class="fas fa-calculator text-lg" aria-hidden="true"></i>
            Calcular Agora
            <i
              class="fas fa-arrow-right transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            ></i>
          </button>
          <button
            type="button"
            class="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:w-auto"
            @click="scrollTo('beneficios')"
          >
            <i class="fas fa-circle-info" aria-hidden="true"></i>
            Saiba Mais
          </button>
        </div>

        <div class="mt-12 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-white/80">
          <div
            v-for="badge in ['Gratuito', 'Sem Cadastro', 'Resultado Instantâneo', '100% Seguro']"
            :key="badge"
            class="flex items-center gap-2"
          >
            <i class="fas fa-circle-check text-green-300" aria-hidden="true"></i>
            <span>{{ badge }}</span>
          </div>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/60 transition-colors hover:text-white"
      aria-label="Rolar para benefícios"
      @click="scrollTo('beneficios')"
    >
      <i class="fas fa-chevron-down text-2xl" aria-hidden="true"></i>
    </button>
  </section>

  <!-- BENEFÍCIOS -->
  <section id="beneficios" class="mesh-bg bg-background px-4 py-24">
    <div class="container relative z-10 mx-auto">
      <div class="mb-16 text-center">
        <span class="badge mb-4">
          <i class="fas fa-star" aria-hidden="true"></i>
          Recursos
        </span>
        <h2 class="mb-4 text-3xl font-bold text-foreground text-balance md:text-4xl">
          Por que usar nossa Calculadora?
        </h2>
        <p class="mx-auto max-w-2xl text-muted-foreground text-pretty">
          Desenvolvida pensando em você, nossa ferramenta oferece tudo que você precisa para
          precificar suas campanhas com confiança.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 80 } }"
          class="card-premium group"
        >
          <div class="icon-circle mb-4 transition-transform duration-300 group-hover:scale-110">
            <i :class="['fas text-xl text-primary', f.icon]" aria-hidden="true"></i>
          </div>
          <h3 class="mb-2 text-lg font-semibold text-foreground">{{ f.title }}</h3>
          <p class="text-sm leading-relaxed text-muted-foreground">{{ f.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CALCULADORA -->
  <section id="calculadora" class="bg-secondary/30 px-4 py-20">
    <div class="container mx-auto max-w-4xl">
      <div class="mb-10 text-center">
        <span class="badge mb-4">
          <i class="fas fa-calculator" aria-hidden="true"></i>
          A Ferramenta
        </span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Calculadora de Orçamento
        </h2>
        <p class="mx-auto max-w-2xl text-muted-foreground">
          Preencha os campos abaixo para calcular o valor ideal da sua campanha de marketing
          digital.
        </p>
      </div>
      <MarketingCalculator />
    </div>
  </section>

  <!-- COMO FUNCIONA -->
  <section class="bg-background px-4 py-20">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <span class="badge mb-4">
          <i class="fas fa-list-ol" aria-hidden="true"></i>
          Passo a Passo
        </span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Como Funciona?</h2>
        <p class="mx-auto max-w-2xl text-muted-foreground">
          Em apenas 4 passos simples, você terá o orçamento da sua campanha calculado.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="(step, i) in steps" :key="step.number" class="relative">
          <div
            v-if="i < steps.length - 1"
            class="absolute left-[60%] top-12 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent lg:block"
          ></div>
          <div class="card-premium relative z-10 text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-cta text-2xl font-bold text-white shadow-lg"
            >
              {{ step.number }}
            </div>
            <h3 class="mb-2 text-lg font-semibold text-foreground">{{ step.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="mt-12 text-center">
        <button
          type="button"
          class="btn-primary px-10 py-4 text-lg"
          @click="scrollTo('calculadora')"
        >
          <i class="fas fa-play" aria-hidden="true"></i>
          Começar Agora
        </button>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="mesh-bg bg-secondary/30 px-4 py-16">
    <div class="container relative z-10 mx-auto">
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        <div
          v-for="(s, i) in stats"
          :key="s.label"
          v-motion
          :initial="{ opacity: 0, scale: 0.9 }"
          :visible-once="{ opacity: 1, scale: 1, transition: { delay: i * 90 } }"
          class="stats-card"
        >
          <div class="icon-circle mx-auto mb-3">
            <i :class="['fas text-lg text-primary', s.icon]" aria-hidden="true"></i>
          </div>
          <div class="gradient-text mb-1 text-3xl font-extrabold md:text-4xl">{{ s.value }}</div>
          <div class="text-sm text-muted-foreground">{{ s.label }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE -->
  <section id="sobre" class="scroll-mt-24 bg-background px-4 py-20">
    <div class="container mx-auto">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span class="badge mb-4">
            <i class="fas fa-bullseye" aria-hidden="true"></i>
            Nossa Missão
          </span>
          <h2 class="mb-6 text-3xl font-bold text-foreground md:text-4xl">
            Simplificar a Precificação de Campanhas Digitais
          </h2>
          <p class="mb-6 leading-relaxed text-muted-foreground">
            Sabemos que precificar campanhas de marketing digital pode ser um desafio. Por isso,
            criamos esta ferramenta para ajudar <strong>influenciadores</strong>,
            <strong>agências</strong> e <strong>criadores de conteúdo</strong> a calcularem
            orçamentos de forma rápida, precisa e profissional.
          </p>
          <p class="mb-6 leading-relaxed text-muted-foreground">
            Nossa calculadora utiliza uma fórmula simples e eficaz baseada em padrões do mercado,
            considerando o número de seguidores, taxa por visualização e duração da campanha para
            chegar ao valor ideal.
          </p>
          <div class="flex flex-wrap gap-4">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <i class="fas fa-check-circle text-green-500" aria-hidden="true"></i> 100% Gratuito
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <i class="fas fa-check-circle text-green-500" aria-hidden="true"></i> Sem Cadastro
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <i class="fas fa-check-circle text-green-500" aria-hidden="true"></i> Resultado
              Instantâneo
            </div>
          </div>
        </div>
        <div class="card-premium p-8 text-center">
          <div
            class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-3xl gradient-cta shadow-lg"
          >
            <i class="fas fa-chart-line text-4xl text-white" aria-hidden="true"></i>
          </div>
          <h3 class="mb-2 text-2xl font-bold text-foreground">+10.000</h3>
          <p class="mb-6 text-muted-foreground">Cálculos Realizados</p>
          <div class="grid grid-cols-2 gap-4 text-center">
            <div class="rounded-xl bg-secondary/50 p-4">
              <div class="text-xl font-bold text-foreground">98%</div>
              <div class="text-xs text-muted-foreground">Satisfação</div>
            </div>
            <div class="rounded-xl bg-secondary/50 p-4">
              <div class="text-xl font-bold text-foreground">5s</div>
              <div class="text-xs text-muted-foreground">Tempo Médio</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recursos da ferramenta -->
      <div class="mt-20">
        <div class="mb-12 text-center">
          <span class="badge mb-4">
            <i class="fas fa-star" aria-hidden="true"></i>
            Recursos
          </span>
          <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            O Que Nossa Ferramenta Oferece
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div v-for="f in aboutFeatures" :key="f.title" class="card-premium">
            <div class="icon-circle mb-4">
              <i :class="['fas text-xl text-primary', f.icon]" aria-hidden="true"></i>
            </div>
            <h3 class="mb-2 text-lg font-semibold text-foreground">{{ f.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ f.description }}</p>
          </div>
        </div>
      </div>

      <!-- Equipe -->
      <div class="mt-20">
        <div class="mb-12 text-center">
          <span class="badge mb-4">
            <i class="fas fa-users" aria-hidden="true"></i>
            Equipe
          </span>
          <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Quem Está Por Trás</h2>
        </div>
        <div class="mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2">
          <div v-for="member in team" :key="member.name" class="card-premium text-center">
            <div
              class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl gradient-cta shadow-lg"
            >
              <i :class="['fas text-2xl text-white', member.icon]" aria-hidden="true"></i>
            </div>
            <h3 class="mb-1 text-xl font-bold text-foreground">{{ member.name }}</h3>
            <p class="mb-3 text-sm text-primary">{{ member.role }}</p>
            <p class="text-sm text-muted-foreground">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SERVIÇOS 3W ONLINE -->
  <section id="servicos" class="scroll-mt-24 bg-secondary/30 px-4 py-20">
    <div class="container mx-auto">
      <div class="mb-12 text-center">
        <span class="badge mb-4">
          <i class="fas fa-cogs" aria-hidden="true"></i>
          Soluções Digitais Completas
        </span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Serviços do Grupo 3w Online
        </h2>
        <p class="mx-auto max-w-2xl text-muted-foreground">
          Além da calculadora, o Grupo 3w Online desenvolve sites e sistemas personalizados sob
          demanda, sempre com foco em resultados.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="service in services" :key="service.title" class="card-premium group">
          <div class="icon-circle mb-4 transition-transform group-hover:scale-110">
            <i :class="['fas text-xl text-primary', service.icon]" aria-hidden="true"></i>
          </div>
          <h3 class="mb-3 text-xl font-semibold text-foreground">{{ service.title }}</h3>
          <p class="mb-4 text-sm text-muted-foreground">{{ service.description }}</p>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="feat in service.features"
              :key="feat"
              class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {{ feat }}
            </span>
          </div>
        </div>
      </div>

      <!-- Diferenciais -->
      <div class="mt-20">
        <div class="mb-12 text-center">
          <span class="badge mb-4">
            <i class="fas fa-trophy" aria-hidden="true"></i>
            Por Que Nos Escolher
          </span>
          <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Diferenciais que Fazem a Diferença
          </h2>
        </div>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="b in benefits" :key="b.title" class="text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-cta shadow-lg"
            >
              <i :class="['fas text-2xl text-white', b.icon]" aria-hidden="true"></i>
            </div>
            <h3 class="mb-2 text-lg font-semibold text-foreground">{{ b.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ b.description }}</p>
          </div>
        </div>
      </div>

      <!-- Processo -->
      <div class="mt-20">
        <div class="mb-12 text-center">
          <span class="badge mb-4">
            <i class="fas fa-tasks" aria-hidden="true"></i>
            Nosso Processo
          </span>
          <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Como Trabalhamos</h2>
        </div>
        <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-4">
          <div v-for="(item, i) in process" :key="item.step" class="relative text-center">
            <div
              v-if="i < process.length - 1"
              class="absolute left-[60%] top-8 hidden h-0.5 w-full bg-gradient-to-r from-primary/50 to-transparent md:block"
            ></div>
            <div
              class="relative z-10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl gradient-cta shadow-lg"
            >
              <i :class="['fas text-xl text-white', item.icon]" aria-hidden="true"></i>
            </div>
            <div class="mb-1 text-sm font-bold text-primary">{{ item.step }}</div>
            <h3 class="font-semibold text-foreground">{{ item.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section class="bg-background px-4 py-20">
    <div class="container mx-auto">
      <div class="mb-16 text-center">
        <span class="badge mb-4">
          <i class="fas fa-quote-left" aria-hidden="true"></i>
          Depoimentos
        </span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          O que Dizem Nossos Usuários
        </h2>
      </div>
      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { delay: i * 100 } }"
          class="card-premium relative"
        >
          <i
            class="fas fa-quote-right absolute right-6 top-6 text-3xl text-primary/15"
            aria-hidden="true"
          ></i>
          <div class="mb-4 flex items-center gap-1 text-yellow-400">
            <i v-for="n in 5" :key="n" class="fas fa-star text-sm" aria-hidden="true"></i>
          </div>
          <p class="mb-6 leading-relaxed text-muted-foreground">"{{ t.content }}"</p>
          <div class="flex items-center gap-3">
            <div
              class="flex h-11 w-11 items-center justify-center rounded-full gradient-cta font-bold text-white shadow-glow"
            >
              {{ t.avatar }}
            </div>
            <div>
              <div class="text-sm font-semibold text-foreground">{{ t.name }}</div>
              <div class="text-xs text-muted-foreground">{{ t.role }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- CONTATO -->
  <section id="contato" class="scroll-mt-24 bg-secondary/30 px-4 py-20">
    <div class="container mx-auto max-w-5xl">
      <div class="mb-12 text-center">
        <span class="badge mb-4">
          <i class="fas fa-envelope" aria-hidden="true"></i>
          Fale Conosco
        </span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Entre em Contato</h2>
        <p class="mx-auto max-w-2xl text-muted-foreground">
          Tem uma ideia, dúvida ou precisa de um orçamento personalizado? A equipe do Grupo 3w
          Online está pronta para atender você.
        </p>
      </div>

      <!-- Sobre a empresa -->
      <div class="card-premium mb-8">
        <h3 class="mb-4 flex items-center gap-3 text-xl font-bold text-foreground">
          <div class="flex h-11 w-11 items-center justify-center rounded-xl gradient-cta">
            <i class="fas fa-building text-white" aria-hidden="true"></i>
          </div>
          {{ site.developer.company }}
        </h3>
        <p class="text-sm leading-relaxed text-muted-foreground">
          Somos uma empresa especializada em
          <strong>desenvolvimento de sites e sistemas personalizados sob demanda</strong>.
          Transformamos ideias em soluções digitais de alta qualidade — do site institucional ao
          sistema web completo — sempre com foco em resultado, performance e segurança. Se você
          precisa de uma ferramenta como esta calculadora, ou de algo totalmente sob medida para o
          seu negócio, nós desenvolvemos para você.
        </p>
      </div>

      <!-- Canais de contato -->
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <a
          v-for="c in contactChannels"
          :key="c.title"
          :href="c.href"
          :target="c.external ? '_blank' : undefined"
          :rel="c.external ? 'noopener noreferrer' : undefined"
          class="card-premium group flex flex-col items-center text-center"
        >
          <div
            :class="[
              'mb-4 flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110',
              c.bg,
            ]"
          >
            <i :class="[c.icon, 'text-2xl', c.accent]" aria-hidden="true"></i>
          </div>
          <h3 class="mb-1 font-semibold text-foreground">{{ c.title }}</h3>
          <p class="mb-2 font-medium text-foreground group-hover:text-primary">{{ c.value }}</p>
          <p class="text-xs text-muted-foreground">{{ c.hint }}</p>
        </a>
      </div>

      <!-- CTA persuasivo -->
      <div
        class="card-premium mt-10 overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 text-center"
      >
        <div
          class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl gradient-cta shadow-lg"
        >
          <i class="fas fa-rocket text-2xl text-white" aria-hidden="true"></i>
        </div>
        <h3 class="mb-3 text-2xl font-bold text-foreground md:text-3xl">
          Sua próxima solução digital começa com uma conversa
        </h3>
        <p class="mx-auto mb-6 max-w-2xl text-muted-foreground">
          Enquanto você lê isto, seus concorrentes já estão investindo em presença digital. Saia na
          frente: fale agora com o Grupo 3w Online e receba uma proposta sob medida para transformar
          sua ideia em um site ou sistema de verdade — rápido, seguro e feito para converter.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <a
            :href="site.contact.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary justify-center px-8 py-4 text-base"
          >
            <i class="fab fa-whatsapp text-lg" aria-hidden="true"></i>
            Chamar no WhatsApp
          </a>
          <a
            :href="site.developer.companyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-ghost px-8 py-4"
          >
            <i class="fas fa-globe" aria-hidden="true"></i>
            Conhecer a 3w Online
            <i class="fas fa-external-link-alt text-xs" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA FINAL -->
  <section class="cta-section">
    <div class="container relative z-10 mx-auto max-w-3xl text-center">
      <span
        class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
      >
        <i class="fas fa-fire text-orange-300" aria-hidden="true"></i>
        Vagas limitadas para novos projetos este mês
      </span>
      <h2 class="mb-4 font-display text-3xl font-extrabold text-white text-balance md:text-5xl">
        Pronto para transformar sua ideia em realidade?
      </h2>
      <p class="mx-auto mb-8 max-w-xl text-white/85 text-pretty">
        O Grupo 3w Online desenvolve sites e sistemas personalizados sob demanda. Junte-se a
        milhares de profissionais e leve seu negócio para o próximo nível — antes que seu
        concorrente faça.
      </p>
      <div class="flex flex-col justify-center gap-4 sm:flex-row">
        <button
          type="button"
          class="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-8 py-4 font-bold text-primary shadow-2xl transition-all hover:scale-105"
          @click="scrollTo('calculadora')"
        >
          <i class="fas fa-calculator" aria-hidden="true"></i>
          Calcular Agora — É Grátis!
          <i
            class="fas fa-arrow-right transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          ></i>
        </button>
        <a
          :href="site.developer.companyUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/30 bg-white/10 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
        >
          <i class="fas fa-rocket" aria-hidden="true"></i>
          Solicitar Orçamento
          <i class="fas fa-external-link-alt text-sm" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  </section>
</template>

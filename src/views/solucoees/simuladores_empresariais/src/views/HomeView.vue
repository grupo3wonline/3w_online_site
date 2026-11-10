<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import SecaoFerramentas from '@/components/simuladores/SecaoFerramentas.vue'
import SectionNav from '@/components/layout/SectionNav.vue'
import CountUp from '@/components/ui/CountUp.vue'

const LINK_3W = 'https://www.3wonline.com.br'
const WHATS = `https://wa.me/5541996924829?text=${encodeURIComponent(
  'Olá! Vim pelos Simuladores Empresariais e gostaria de falar sobre um projeto.'
)}`

const stats = [
  { value: '3.500+', label: 'Simulações realizadas', icon: 'lucide:bar-chart-3' },
  { value: '98%', label: 'Satisfação dos usuários', icon: 'lucide:star' },
  { value: '100%', label: 'Gratuito e sem limites', icon: 'lucide:shield-check' },
  { value: '+40', label: 'Indicadores calculados', icon: 'lucide:calculator' },
]

const beneficios = [
  {
    icon: 'lucide:calculator',
    title: 'Simulações Precisas',
    description:
      'Ferramentas baseadas em metodologias empresariais consolidadas para análises financeiras detalhadas.',
    tooltip: 'Metodologias validadas por especialistas em gestão financeira',
  },
  {
    icon: 'lucide:trending-up',
    title: 'Crescimento Estratégico',
    description:
      'Identifique oportunidades de otimização com indicadores-chave como ROI, CAC e LTV.',
    tooltip: 'Análise de ROI, CAC, LTV e outros indicadores essenciais',
  },
  {
    icon: 'lucide:heart-pulse',
    title: 'Saúde Empresarial',
    description:
      'Monitore a saúde financeira da sua empresa com métricas essenciais e relatórios detalhados.',
    tooltip: 'Mais de 40 indicadores financeiros para análise completa',
  },
  {
    icon: 'lucide:award',
    title: 'Resultados Profissionais',
    description:
      'Relatórios detalhados que podem ser impressos e usados em apresentações executivas.',
    tooltip: 'Exportação e impressão otimizada para reuniões',
  },
]

const funcionalidades = [
  'Simulador de Orçamento Empresarial',
  'Simulador de Orçamento de Marketing',
  'Simulador de Saúde da Empresa',
  'Gráficos interativos e relatórios',
  'Exportar, compartilhar e imprimir',
  'Interface responsiva e mobile-first',
]

const valores = [
  {
    icon: 'lucide:shield-check',
    title: 'Segurança',
    description: 'Dados processados localmente no navegador. Nada é armazenado.',
  },
  {
    icon: 'lucide:zap',
    title: 'Performance',
    description: 'Resultados instantâneos, otimizado para qualquer dispositivo.',
  },
  {
    icon: 'lucide:target',
    title: 'Precisão',
    description: 'Metodologias validadas em gestão financeira e contabilidade.',
  },
  {
    icon: 'lucide:users',
    title: 'Acessibilidade',
    description: '100% gratuito, sem cadastro e sem limites de uso.',
  },
]

const setores = [
  {
    icon: 'lucide:store',
    nome: 'Comércio',
    desc: 'Equilibre estoque, margem e ponto de equilíbrio para vender mais lucrando.',
  },
  {
    icon: 'lucide:factory',
    nome: 'Indústria',
    desc: 'Dimensione custos de produção e capacidade com base em dados reais.',
  },
  {
    icon: 'lucide:laptop',
    nome: 'Tecnologia / SaaS',
    desc: 'Acompanhe CAC, LTV e retenção para crescer de forma sustentável.',
  },
  {
    icon: 'lucide:briefcase',
    nome: 'Serviços',
    desc: 'Precifique com clareza e planeje o investimento em marketing.',
  },
  {
    icon: 'lucide:utensils',
    nome: 'Alimentação',
    desc: 'Controle custos variáveis e descubra sua margem ideal.',
  },
  {
    icon: 'lucide:heart-handshake',
    nome: 'Consultoria',
    desc: 'Projete faturamento e valuation para decisões estratégicas.',
  },
]

const antesDepois = {
  antes: [
    'Decisões no "achismo" e na intuição',
    'Planilhas confusas e desatualizadas',
    'Sem visão de ROI, CAC ou LTV',
    'Dificuldade em precificar e investir',
  ],
  depois: [
    'Decisões guiadas por números claros',
    'Simulações em segundos, sem instalar nada',
    'Mais de 40 indicadores calculados',
    'Clareza para precificar, investir e crescer',
  ],
}

const passos = [
  {
    n: '1',
    icon: 'lucide:mouse-pointer-click',
    title: 'Escolha o Simulador',
    description: 'Orçamento empresarial, marketing ou saúde da empresa.',
  },
  {
    n: '2',
    icon: 'lucide:keyboard',
    title: 'Insira os Dados',
    description: 'Preencha os campos. Tudo é processado localmente.',
  },
  {
    n: '3',
    icon: 'lucide:file-check-2',
    title: 'Obtenha Resultados',
    description: 'Visualize gráficos, indicadores e exporte relatórios.',
  },
]

const depoimentos = [
  {
    name: 'Carlos Silva',
    role: 'CEO, TechStart',
    text: 'As simulações me ajudaram a tomar decisões mais assertivas sobre investimentos em marketing.',
    rating: 5,
  },
  {
    name: 'Ana Rodrigues',
    role: 'Diretora Financeira',
    text: 'Ferramenta essencial para quem quer ter controle real sobre o negócio.',
    rating: 5,
  },
  {
    name: 'Roberto Santos',
    role: 'Empreendedor',
    text: 'Simples de usar e extremamente útil. Relatórios profissionais e bem estruturados.',
    rating: 5,
  },
]

const servicos = [
  {
    icon: 'lucide:globe',
    title: 'Sites Institucionais',
    description: 'Sites modernos, responsivos e otimizados para SEO.',
  },
  {
    icon: 'lucide:code',
    title: 'Sistemas Web',
    description: 'Sistemas personalizados que automatizam processos.',
  },
  {
    icon: 'lucide:smartphone',
    title: 'Aplicativos Mobile',
    description: 'Apps nativos e híbridos para iOS e Android.',
  },
  {
    icon: 'lucide:database',
    title: 'Integrações',
    description: 'APIs, webhooks e sincronização entre sistemas.',
  },
  {
    icon: 'lucide:palette',
    title: 'UI/UX Design',
    description: 'Interfaces focadas na experiência do usuário.',
  },
  {
    icon: 'lucide:headphones',
    title: 'Suporte e Manutenção',
    description: 'Monitoramento e atualizações contínuas.',
  },
]

const garantias = [
  {
    icon: 'lucide:lock',
    title: 'Privacidade por Design',
    desc: 'Nenhum dado sai do seu navegador. Sem cadastro, sem rastreio dos seus números.',
  },
  {
    icon: 'lucide:badge-check',
    title: 'Conformidade Legal',
    desc: 'Alinhado a LGPD, GDPR, CCPA e POPIA.',
  },
  {
    icon: 'lucide:gift',
    title: '100% Gratuito',
    desc: 'Todas as ferramentas, sem limites e sem pegadinhas.',
  },
]

const faqs = [
  {
    q: 'Preciso pagar ou me cadastrar?',
    a: 'Não. Todos os simuladores são gratuitos, sem cadastro e sem limite de uso.',
  },
  {
    q: 'Meus dados ficam seguros?',
    a: 'Sim. Todo o cálculo acontece no seu navegador — nada é enviado ou armazenado.',
  },
  {
    q: 'Os resultados substituem um contador?',
    a: 'Não. São estimativas para orientar decisões. Para decisões definitivas, consulte um profissional.',
  },
  {
    q: 'Funciona no celular?',
    a: 'Sim. A interface é mobile-first e funciona bem em qualquer dispositivo.',
  },
]

const simuladoresPreview = [
  {
    icon: 'lucide:calculator',
    title: 'Orçamento Empresarial',
    desc: 'Divisão do faturamento entre vendas, operações e produção + margem, ponto de equilíbrio e lucratividade.',
  },
  {
    icon: 'lucide:trending-up',
    title: 'Orçamento de Marketing',
    desc: 'Investimento ideal por tipo de negócio, distribuição por canal e métricas de CAC, ROAS, CTR e LTV.',
  },
  {
    icon: 'lucide:heart-pulse',
    title: 'Saúde da Empresa',
    desc: 'Raio-x completo: EBITDA, valuation, liquidez, endividamento e +40 indicadores financeiros.',
  },
  {
    icon: 'lucide:tag',
    title: 'Precificação e Markup',
    desc: 'Preço de venda ideal cobrindo custo, margem, impostos, taxas de cartão e frete.',
  },
]

// Referência à seção de ferramentas para ativar a aba certa a partir de âncoras
const route = useRoute()
type Aba = 'empresarial' | 'marketing' | 'saude' | 'precificacao'
const secaoFerramentasRef = ref<{ ativar: (aba: Aba) => void } | null>(null)

function irParaFerramentas() {
  document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Ativa a aba do simulador conforme o hash (#empresarial, #marketing, #saude). */
function aplicarHash() {
  const hash = route.hash.replace('#', '')
  if (['empresarial', 'marketing', 'saude', 'precificacao'].includes(hash)) {
    secaoFerramentasRef.value?.ativar(hash as Aba)
    document.getElementById('ferramentas')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

onMounted(() => {
  if (route.hash) setTimeout(aplicarHash, 100)
})
watch(() => route.hash, aplicarHash)
</script>

<template>
  <SectionNav />

  <!-- HERO -->
  <section id="inicio" class="relative overflow-hidden mesh-bg py-20 text-white md:py-28 lg:py-36">
    <div class="absolute inset-0 grid-pattern opacity-40" />
    <div
      class="absolute -right-32 top-10 h-72 w-72 rounded-full bg-brand/30 blur-3xl animate-float"
    />
    <div
      class="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-primary-light/30 blur-3xl animate-float animation-delay-400"
    />

    <div class="container relative z-10">
      <div class="mx-auto max-w-4xl text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
        >
          <span
            class="flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px] shadow-green-400"
          ></span>
          <span class="text-sm font-medium">100% Gratuito • Sem Cadastro • Uso Ilimitado</span>
        </div>
        <h1
          class="mb-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Decisões empresariais
          <span
            class="block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent"
          >
            guiadas por dados
          </span>
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-lg opacity-90 sm:text-xl">
          Simuladores profissionais de <strong>orçamento</strong>, <strong>marketing</strong> e
          <strong>saúde financeira</strong>. Calcule ROI, CAC, LTV, EBITDA e mais de 40 indicadores
          em segundos.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#ferramentas" @click.prevent="irParaFerramentas()">
            <Button class="btn-hero pulse-glow w-full sm:w-auto">
              <Icon icon="lucide:rocket" class="h-5 w-5" />
              Começar Simulação Grátis
              <Icon icon="lucide:arrow-right" class="h-5 w-5" />
            </Button>
          </a>
          <a href="#como-funciona">
            <Button
              variant="outline"
              size="lg"
              class="w-full border-white/40 text-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <Icon icon="lucide:play-circle" class="h-5 w-5" />
              Como Funciona
            </Button>
          </a>
        </div>

        <!-- Floating preview cards -->
        <div class="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(sim, i) in simuladoresPreview"
            :key="sim.title"
            class="glass-effect p-5 text-left"
            :class="i % 2 === 1 ? 'lg:-translate-y-4' : ''"
          >
            <Icon :icon="sim.icon" class="mb-3 h-8 w-8 text-white" />
            <p class="font-semibold">{{ sim.title }}</p>
            <p class="mt-1 text-sm text-white/70">{{ sim.desc.split('.')[0] }}.</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="border-b border-border bg-background py-10">
    <div class="container">
      <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          v-reveal
          class="flex items-center gap-4 rounded-2xl border border-border bg-card p-5"
        >
          <span
            class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/10 to-brand/10"
          >
            <Icon :icon="stat.icon" class="h-6 w-6 text-brand" />
          </span>
          <div>
            <div class="text-2xl font-bold text-foreground md:text-3xl">
              <CountUp :value="stat.value" />
            </div>
            <div class="text-xs text-muted-foreground md:text-sm">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- BENEFÍCIOS -->
  <section id="beneficios" class="bg-background py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center md:mb-16">
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:sparkles" class="h-4 w-4" />Por que escolher?</span
        >
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          Benefícios que viram <span class="text-gradient">resultado</span>
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          Desenvolvidos com base em metodologias financeiras consolidadas e experiência empresarial
          real.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Tooltip v-for="b in beneficios" :key="b.title" :text="b.tooltip" class="w-full">
          <Card v-reveal gradient class="card-hover group h-full cursor-help p-6 text-center">
            <div
              class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary transition-transform group-hover:scale-110 group-hover:rotate-3"
            >
              <Icon :icon="b.icon" class="h-8 w-8 text-primary-foreground" />
            </div>
            <h3 class="mb-2 text-xl font-semibold">{{ b.title }}</h3>
            <p class="text-sm text-muted-foreground">{{ b.description }}</p>
          </Card>
        </Tooltip>
      </div>
    </div>
  </section>

  <!-- ANTES x DEPOIS -->
  <section class="bg-background-secondary py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:arrow-left-right" class="h-4 w-4" />Transformação</span
        >
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Do achismo à gestão orientada por dados
        </h2>
      </div>
      <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
        <Card v-reveal class="border-danger/30 p-6">
          <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-danger">
            <Icon icon="lucide:circle-x" class="h-5 w-5" />Sem os simuladores
          </h3>
          <ul class="space-y-3">
            <li
              v-for="item in antesDepois.antes"
              :key="item"
              class="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Icon icon="lucide:minus" class="mt-0.5 h-4 w-4 flex-shrink-0 text-danger" />{{
                item
              }}
            </li>
          </ul>
        </Card>
        <Card v-reveal gradient class="border-success/30 p-6">
          <h3 class="mb-4 flex items-center gap-2 text-lg font-semibold text-success">
            <Icon icon="lucide:circle-check-big" class="h-5 w-5" />Com o SimuladorPro
          </h3>
          <ul class="space-y-3">
            <li
              v-for="item in antesDepois.depois"
              :key="item"
              class="flex items-start gap-2 text-sm text-foreground"
            >
              <Icon icon="lucide:check" class="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />{{
                item
              }}
            </li>
          </ul>
        </Card>
      </div>
    </div>
  </section>

  <!-- FUNCIONALIDADES -->
  <section class="bg-background py-16 md:py-24">
    <div class="container grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
      <div v-reveal>
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:layout-grid" class="h-4 w-4" />Funcionalidades</span
        >
        <h2 class="mb-6 text-3xl font-bold text-foreground md:text-4xl">
          Ferramentas completas para o seu negócio
        </h2>
        <p class="mb-8 text-lg text-muted-foreground">
          Análises abrangentes para todas as áreas críticas. Aplique o
          <strong>Princípio de Pareto</strong>: 20% das decisões certas geram 80% dos resultados.
        </p>
        <ul class="space-y-4">
          <li v-for="f in funcionalidades" :key="f" class="flex items-center gap-3">
            <span
              class="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-success/10"
            >
              <Icon icon="lucide:check" class="h-5 w-5 text-success" />
            </span>
            <span class="text-foreground">{{ f }}</span>
          </li>
        </ul>
        <a href="#ferramentas" class="mt-8 inline-block" @click.prevent="irParaFerramentas()">
          <Button variant="brand"
            ><Icon icon="lucide:arrow-right" class="h-4 w-4" />Acessar Ferramentas</Button
          >
        </a>
      </div>
      <div v-reveal class="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Card gradient class="card-hover p-6">
          <Icon
            icon="lucide:calculator"
            class="mb-3 h-10 w-10 rounded-lg bg-primary/10 p-2 text-primary"
          />
          <h3 class="mb-2 font-semibold">Orçamento Empresarial</h3>
          <p class="text-sm text-muted-foreground">
            Divisão estratégica do faturamento entre vendas, operações e produção.
          </p>
        </Card>
        <Card gradient class="card-hover p-6">
          <Icon
            icon="lucide:trending-up"
            class="mb-3 h-10 w-10 rounded-lg bg-brand/10 p-2 text-brand"
          />
          <h3 class="mb-2 font-semibold">Marketing ROI</h3>
          <p class="text-sm text-muted-foreground">
            Investimentos otimizados em marketing por tipo de negócio.
          </p>
        </Card>
        <Card gradient class="card-hover p-6 sm:col-span-2">
          <Icon
            icon="lucide:heart-pulse"
            class="mb-3 h-10 w-10 rounded-lg bg-success/10 p-2 text-success"
          />
          <h3 class="mb-2 font-semibold">Saúde Empresarial</h3>
          <p class="text-sm text-muted-foreground">
            Análise completa com ROI, CAC, LTV, EBITDA, valuation e +40 indicadores.
          </p>
        </Card>
      </div>
    </div>
  </section>

  <!-- CASOS DE USO POR SETOR -->
  <section class="bg-background-secondary py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:building-2" class="h-4 w-4" />Para o seu segmento</span
        >
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Feito para todo tipo de negócio
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          Independente do setor, os simuladores se adaptam à realidade da sua empresa.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Card
          v-for="s in setores"
          :key="s.nome"
          v-reveal
          class="card-hover group flex items-start gap-4 p-5"
        >
          <span
            class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-brand text-white transition-transform group-hover:scale-110"
          >
            <Icon :icon="s.icon" class="h-6 w-6" />
          </span>
          <div>
            <h3 class="font-semibold text-foreground">{{ s.nome }}</h3>
            <p class="mt-1 text-sm text-muted-foreground">{{ s.desc }}</p>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- COMO FUNCIONA -->
  <section id="como-funciona" class="bg-background py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:route" class="h-4 w-4" />Como Funciona</span
        >
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">3 passos e pronto</h2>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          Sem instalar nada, sem cadastro. Resultados profissionais em segundos.
        </p>
      </div>
      <div class="relative grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          class="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-primary/20 via-brand/40 to-primary/20 md:block"
        />
        <div v-for="p in passos" :key="p.n" v-reveal class="relative text-center">
          <div
            class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-brand text-white shadow-lg"
          >
            <Icon :icon="p.icon" class="h-7 w-7" />
          </div>
          <div class="mb-1 text-sm font-bold text-brand">Passo {{ p.n }}</div>
          <h3 class="mb-2 text-xl font-semibold">{{ p.title }}</h3>
          <p class="text-muted-foreground">{{ p.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- SOBRE (âncora #sobre) -->
  <section id="sobre" class="bg-background-secondary py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"><Icon icon="lucide:info" class="h-4 w-4" />Sobre Nós</span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Democratizar a análise financeira empresarial
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-muted-foreground">
          Acreditamos que todo empreendedor deve ter acesso a ferramentas profissionais. Por isso o
          SimuladorPro é 100% gratuito, sem cadastro e sem limites.
        </p>
      </div>
      <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card v-for="v in valores" :key="v.title" v-reveal gradient class="card-hover p-6">
          <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10">
            <Icon :icon="v.icon" class="h-6 w-6 text-brand" />
          </div>
          <h3 class="mb-2 text-lg font-semibold">{{ v.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ v.description }}</p>
        </Card>
      </div>
    </div>
  </section>

  <!-- DEPOIMENTOS -->
  <section class="bg-background py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"><Icon icon="lucide:quote" class="h-4 w-4" />Depoimentos</span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          O que dizem nossos usuários
        </h2>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card v-for="t in depoimentos" :key="t.name" v-reveal gradient class="card-hover p-6">
          <div class="mb-4 flex gap-1">
            <Icon
              v-for="i in t.rating"
              :key="i"
              icon="lucide:star"
              class="h-5 w-5 fill-warning text-warning"
            />
          </div>
          <p class="mb-4 italic text-muted-foreground">"{{ t.text }}"</p>
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-brand font-semibold text-white"
            >
              {{ t.name[0] }}
            </div>
            <div>
              <p class="font-semibold text-foreground">{{ t.name }}</p>
              <p class="text-sm text-muted-foreground">{{ t.role }}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </section>

  <!-- PRÉVIA DA FERRAMENTA -->
  <!-- FERRAMENTAS (âncora #ferramentas) — simuladores embutidos, carregados sob demanda -->
  <section id="ferramentas" class="scroll-mt-20 bg-background-secondary py-16 md:py-24">
    <SecaoFerramentas ref="secaoFerramentasRef" />
  </section>

  <!-- SERVIÇOS (âncora #servicos) -->
  <section id="servicos" class="bg-background py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:briefcase" class="h-4 w-4" />Grupo 3w Online</span
        >
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">
          Soluções digitais sob medida
        </h2>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          Além dos simuladores gratuitos, desenvolvemos sites e sistemas personalizados sob demanda.
        </p>
      </div>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card v-for="s in servicos" :key="s.title" v-reveal gradient class="card-hover group p-6">
          <div
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary transition-transform group-hover:scale-110"
          >
            <Icon :icon="s.icon" class="h-7 w-7 text-primary-foreground" />
          </div>
          <h3 class="mb-2 text-xl font-semibold">{{ s.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ s.description }}</p>
        </Card>
      </div>
    </div>
  </section>

  <!-- GARANTIAS / SEGURANÇA -->
  <section class="bg-background-secondary py-16 md:py-24">
    <div class="container">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card v-for="g in garantias" :key="g.title" v-reveal class="p-6 text-center">
          <div
            class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success/10"
          >
            <Icon :icon="g.icon" class="h-7 w-7 text-success" />
          </div>
          <h3 class="mb-2 text-lg font-semibold">{{ g.title }}</h3>
          <p class="text-sm text-muted-foreground">{{ g.desc }}</p>
        </Card>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="bg-background py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:circle-help" class="h-4 w-4" />Dúvidas Frequentes</span
        >
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Perguntas comuns</h2>
      </div>
      <div class="mx-auto grid max-w-3xl gap-4">
        <details
          v-for="faq in faqs"
          :key="faq.q"
          v-reveal
          class="group rounded-xl border border-border bg-card p-5"
        >
          <summary
            class="flex cursor-pointer items-center justify-between font-semibold text-foreground"
          >
            {{ faq.q }}
            <Icon
              icon="lucide:chevron-down"
              class="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180"
            />
          </summary>
          <p class="mt-3 text-sm text-muted-foreground">{{ faq.a }}</p>
        </details>
      </div>
    </div>
  </section>

  <!-- CONTATO (âncora #contato) — conteúdo completo, sem formulário -->
  <section id="contato" class="scroll-mt-20 bg-background-secondary py-16 md:py-24">
    <div class="container">
      <div v-reveal class="mb-12 text-center">
        <span class="badge-chip mb-4"><Icon icon="lucide:mail" class="h-4 w-4" />Contato</span>
        <h2 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">Fale Conosco</h2>
        <p class="mx-auto max-w-2xl text-lg text-muted-foreground">
          Tem uma ideia, dúvida ou precisa de uma solução sob medida? O
          <strong>Grupo 3w Online</strong> está pronto para transformar seu projeto em realidade.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
        <div v-reveal>
          <span class="badge-chip mb-4"
            ><Icon icon="lucide:building-2" class="h-4 w-4" />Grupo 3w Online</span
          >
          <h3 class="mb-4 text-2xl font-bold text-foreground">
            Sites e sistemas personalizados sob demanda
          </h3>
          <p class="mb-8 text-muted-foreground">
            Transformamos ideias em soluções digitais de sucesso. Atendimento direto, sem
            formulários intermediários — fale com a gente pelos canais abaixo.
          </p>
          <div class="space-y-4">
            <a
              :href="WHATS"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-success/10"
              >
                <Icon icon="fa6-brands:whatsapp" class="h-6 w-6 text-success" />
              </span>
              <span>
                <span class="block font-medium text-foreground">WhatsApp</span>
                <span class="text-primary">(41) 99692-4829</span>
              </span>
            </a>
            <a
              href="mailto:contato@3wonline.com.br"
              class="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10"
              >
                <Icon icon="lucide:mail" class="h-6 w-6 text-primary" />
              </span>
              <span>
                <span class="block font-medium text-foreground">E-mail</span>
                <span class="text-primary">contato@3wonline.com.br</span>
              </span>
            </a>
            <a
              :href="LINK_3W"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <span
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10"
              >
                <Icon icon="lucide:globe" class="h-6 w-6 text-primary" />
              </span>
              <span>
                <span class="block font-medium text-foreground">Website</span>
                <span class="text-primary">www.3wonline.com.br</span>
              </span>
            </a>
            <div class="flex items-start gap-4 rounded-lg bg-card p-4 shadow-sm">
              <span
                class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10"
              >
                <Icon icon="lucide:clock" class="h-6 w-6 text-primary" />
              </span>
              <span>
                <span class="block font-medium text-foreground">Horário</span>
                <span class="text-muted-foreground">Segunda a sexta, 9h às 18h</span>
              </span>
            </div>
          </div>
        </div>

        <!-- CTA persuasivo com escassez -->
        <div v-reveal>
          <Card gradient class="p-8">
            <span
              class="mb-4 inline-flex items-center gap-2 rounded-full bg-warning px-3 py-1 text-xs font-bold text-warning-foreground"
            >
              <Icon icon="lucide:flame" class="h-3.5 w-3.5" />Agenda limitada neste mês
            </span>
            <h3 class="mb-4 text-2xl font-bold text-foreground">
              Seu projeto merece sair do papel agora
            </h3>
            <p class="mb-6 text-muted-foreground">
              Cada mês reservamos um número limitado de projetos para garantir qualidade e prazo. Se
              você quer um site ou sistema sob medida, <strong>fale conosco hoje</strong> e assegure
              sua vaga antes que as posições se esgotem.
            </p>
            <ul class="mb-6 space-y-3">
              <li
                v-for="item in [
                  'Desenvolvimento sob demanda',
                  'Entrega ágil e iterativa',
                  'Suporte dedicado com SLA',
                ]"
                :key="item"
                class="flex items-center gap-2 text-foreground"
              >
                <Icon icon="lucide:check-circle-2" class="h-5 w-5 flex-shrink-0 text-success" />{{
                  item
                }}
              </li>
            </ul>
            <a :href="WHATS" target="_blank" rel="noopener noreferrer" class="block">
              <Button variant="success" class="w-full">
                <Icon icon="fa6-brands:whatsapp" class="h-5 w-5" />Chamar no WhatsApp
              </Button>
            </a>
            <a href="mailto:contato@3wonline.com.br" class="mt-3 block">
              <Button variant="outline" class="w-full">
                <Icon icon="lucide:mail" class="h-5 w-5" />Enviar E-mail
              </Button>
            </a>
          </Card>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA FINAL com escassez/urgência -->
  <section class="relative overflow-hidden mesh-bg py-16 text-white md:py-24">
    <div class="absolute inset-0 grid-pattern opacity-30" />
    <div class="container relative z-10">
      <div class="mx-auto max-w-3xl text-center">
        <span
          class="mb-6 inline-flex items-center gap-2 rounded-full bg-warning px-4 py-2 text-sm font-bold text-warning-foreground"
        >
          <Icon icon="lucide:flame" class="h-4 w-4" />Vagas de projetos limitadas neste mês
        </span>
        <h2 class="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
          Pronto para otimizar seu negócio?
        </h2>
        <p class="mb-8 text-lg opacity-90 md:text-xl">
          Comece agora com os simuladores <strong>gratuitos</strong>. E se precisar de uma solução
          sob medida, o Grupo 3w Online tem <strong>agenda limitada</strong> — garanta a sua.
        </p>
        <div class="flex flex-col justify-center gap-4 sm:flex-row">
          <a href="#ferramentas" @click.prevent="irParaFerramentas()">
            <Button class="btn-hero w-full sm:w-auto">
              <Icon icon="lucide:rocket" class="h-5 w-5" />Começar Agora - É Grátis!
            </Button>
          </a>
          <a :href="LINK_3W" target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              size="lg"
              class="w-full border-white/40 text-white hover:bg-white hover:text-primary sm:w-auto"
            >
              <Icon icon="lucide:external-link" class="h-5 w-5" />Falar com a 3w Online
            </Button>
          </a>
        </div>
        <p class="mt-4 text-sm text-white/70">
          Desenvolvimento de sites e sistemas personalizados sob demanda.
        </p>
      </div>
    </div>
  </section>
</template>

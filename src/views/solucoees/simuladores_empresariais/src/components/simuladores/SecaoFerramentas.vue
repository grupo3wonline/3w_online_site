<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Fuse from 'fuse.js'
import Card from '@/components/ui/Card.vue'
import Alert from '@/components/ui/Alert.vue'
import Input from '@/components/ui/Input.vue'

// Simuladores carregados sob demanda (mantém a home leve — os gráficos
// só entram no bundle quando o usuário abre a seção de ferramentas).
const SimuladorEmpresarial = defineAsyncComponent(
  () => import('@/components/simuladores/SimuladorEmpresarial.vue')
)
const SimuladorMarketing = defineAsyncComponent(
  () => import('@/components/simuladores/SimuladorMarketing.vue')
)
const SimuladorSaude = defineAsyncComponent(
  () => import('@/components/simuladores/SimuladorSaude.vue')
)
const SimuladorPrecificacao = defineAsyncComponent(
  () => import('@/components/simuladores/SimuladorPrecificacao.vue')
)

type Aba = 'empresarial' | 'marketing' | 'saude' | 'precificacao'
const abaAtiva = ref<Aba>('empresarial')

interface AbaInfo {
  id: Aba
  icon: string
  title: string
  short: string
  desc: string
  keywords: string[]
}

const abas: AbaInfo[] = [
  {
    id: 'empresarial',
    icon: 'lucide:calculator',
    title: 'Orçamento Empresarial',
    short: 'Empresarial',
    desc: 'Divisão do faturamento entre vendas, operações e produção.',
    keywords: [
      'orçamento',
      'faturamento',
      'margem bruta',
      'ponto de equilíbrio',
      'lucratividade',
      'custos',
      'setor',
      'vendas',
      'produção',
    ],
  },
  {
    id: 'marketing',
    icon: 'lucide:trending-up',
    title: 'Orçamento de Marketing',
    short: 'Marketing',
    desc: 'Investimentos otimizados por tipo de negócio.',
    keywords: [
      'marketing',
      'cac',
      'roas',
      'ctr',
      'ltv',
      'anúncios',
      'mídia',
      'seo',
      'tráfego',
      'conversão',
      'ticket',
    ],
  },
  {
    id: 'saude',
    icon: 'lucide:heart-pulse',
    title: 'Saúde da Empresa',
    short: 'Saúde',
    desc: 'Análise completa com ROI, CAC, LTV e +40 indicadores.',
    keywords: [
      'saúde',
      'roi',
      'roe',
      'ebitda',
      'ebit',
      'valuation',
      'liquidez',
      'endividamento',
      'patrimônio',
      'health score',
      'indicadores',
    ],
  },
  {
    id: 'precificacao',
    icon: 'lucide:tag',
    title: 'Precificação e Markup',
    short: 'Preço',
    desc: 'Preço de venda ideal com margem, impostos, taxas e frete.',
    keywords: [
      'preço',
      'precificação',
      'markup',
      'margem',
      'impostos',
      'taxas',
      'cartão',
      'marketplace',
      'frete',
      'lucro',
      'venda',
    ],
  },
]

const busca = ref('')
const fuse = new Fuse(abas, {
  keys: ['title', 'short', 'desc', 'keywords'],
  threshold: 0.4,
  ignoreLocation: true,
})
const sugestoes = computed(() => {
  const termo = busca.value.trim()
  if (termo.length < 2) return []
  return fuse
    .search(termo)
    .slice(0, 3)
    .map((r) => r.item)
})
function irPara(aba: Aba) {
  abaAtiva.value = aba
  busca.value = ''
  document
    .getElementById('painel-simulador')
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Permite ativar uma aba a partir de âncoras externas (#empresarial, etc.). */
function ativar(aba: Aba) {
  abaAtiva.value = aba
}
defineExpose({ ativar })

const dicas = [
  {
    emoji: '📊',
    title: 'Orçamento Empresarial',
    items: [
      'Use dados reais do último trimestre.',
      'Compare com períodos anteriores.',
      'Considere sazonalidades do setor.',
    ],
  },
  {
    emoji: '📈',
    title: 'Marketing',
    items: [
      'Defina o tipo de negócio antes de calcular.',
      'Ajuste conforme o ciclo de vendas.',
      'Monitore o ROI de cada canal.',
    ],
  },
  {
    emoji: '❤️',
    title: 'Saúde Empresarial',
    items: [
      'Atualize os dados mensalmente.',
      'Compare com benchmarks do setor.',
      'Foque nos KPIs mais críticos.',
    ],
  },
  {
    emoji: '🏷️',
    title: 'Precificação',
    items: [
      'Lembre que os percentuais incidem sobre o preço.',
      'Inclua taxas de cartão e marketplace.',
      'Revise a margem se o markup ficar baixo.',
    ],
  },
]
</script>

<template>
  <div class="container">
    <div class="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
      <div>
        <span class="badge-chip mb-4"
          ><Icon icon="lucide:wrench" class="h-4 w-4" />Ferramentas Gratuitas</span
        >
        <h2 class="text-3xl font-bold text-foreground md:text-4xl">Simuladores Empresariais</h2>
        <p class="mt-2 max-w-2xl text-lg text-muted-foreground">
          Escolha o simulador adequado e obtenha insights valiosos sobre o seu negócio.
        </p>
      </div>
      <!-- Busca inteligente -->
      <div class="relative w-full max-w-sm">
        <Icon
          icon="lucide:search"
          class="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          v-model="busca"
          type="search"
          placeholder="Buscar (ex.: ROI, CAC, markup, preço)"
          class="pl-10"
          aria-label="Buscar simulador por indicador"
        />
        <div
          v-if="sugestoes.length"
          class="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-border bg-card text-foreground shadow-xl"
        >
          <button
            v-for="s in sugestoes"
            :key="s.id"
            class="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-accent/60"
            @click="irPara(s.id)"
          >
            <Icon :icon="s.icon" class="h-5 w-5 text-brand" />
            <span>
              <span class="block text-sm font-medium">{{ s.title }}</span>
              <span class="block text-xs text-muted-foreground">{{ s.desc }}</span>
            </span>
          </button>
        </div>
      </div>
    </div>

    <Alert variant="warning" icon="lucide:triangle-alert" class="mb-8">
      <strong>Importante:</strong> Estas ferramentas destinam-se a simulações e análises
      preliminares. Para decisões estratégicas definitivas, consulte um profissional qualificado em
      gestão financeira ou contabilidade.
    </Alert>

    <!-- Seletor de abas -->
    <div id="painel-simulador" class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <button
        v-for="aba in abas"
        :key="aba.id"
        class="rounded-xl p-4 text-left transition-all"
        :class="
          abaAtiva === aba.id
            ? 'bg-primary text-primary-foreground shadow-lg'
            : 'border border-border bg-card hover:border-primary'
        "
        @click="abaAtiva = aba.id"
      >
        <div class="mb-2 flex items-center gap-3">
          <span
            class="flex h-10 w-10 items-center justify-center rounded-lg"
            :class="abaAtiva === aba.id ? 'bg-white/20' : 'bg-primary/10'"
          >
            <Icon
              :icon="aba.icon"
              class="h-5 w-5"
              :class="abaAtiva === aba.id ? 'text-white' : 'text-primary'"
            />
          </span>
          <span class="font-semibold">{{ aba.title }}</span>
        </div>
        <p class="text-sm" :class="abaAtiva === aba.id ? 'text-white/80' : 'text-muted-foreground'">
          {{ aba.desc }}
        </p>
      </button>
    </div>

    <!-- Conteúdo -->
    <KeepAlive>
      <SimuladorEmpresarial v-if="abaAtiva === 'empresarial'" />
      <SimuladorMarketing v-else-if="abaAtiva === 'marketing'" />
      <SimuladorSaude v-else-if="abaAtiva === 'saude'" />
      <SimuladorPrecificacao v-else />
    </KeepAlive>

    <!-- Dicas -->
    <Card gradient class="no-print mt-12 p-6">
      <h3 class="mb-4 flex items-center gap-2 text-2xl font-bold">
        <Icon icon="lucide:lightbulb" class="h-6 w-6 text-warning" />Dicas para Melhor
        Aproveitamento
      </h3>
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div v-for="dica in dicas" :key="dica.title">
          <h4 class="mb-2 flex items-center gap-2 font-semibold">
            <span>{{ dica.emoji }}</span
            >{{ dica.title }}
          </h4>
          <ul class="space-y-1 text-sm text-muted-foreground">
            <li v-for="item in dica.items" :key="item" class="flex items-start gap-2">
              <span class="mt-0.5 text-primary">•</span>{{ item }}
            </li>
          </ul>
        </div>
      </div>
    </Card>
  </div>
</template>

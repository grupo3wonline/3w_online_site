<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import VueApexCharts from 'vue3-apexcharts'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Select from '@/components/ui/Select.vue'
import HelpTip from '@/components/ui/HelpTip.vue'
import AcoesResultado from './AcoesResultado.vue'
import { formatarMoeda, paraNumero } from '@/lib/utils'
import {
  calcularOrcamentoMarketing,
  type ResultadoMarketing,
  type TipoNegocio,
} from '@/lib/calculos'
import { useAlerta } from '@/composables/useAlerta'
import { useLoadingStore } from '@/stores/loading'

const { erro, sucesso } = useAlerta()
const loading = useLoadingStore()

const PADRAO = {
  faturamento: '',
  tipo: '' as TipoNegocio | '',
  ticketMedio: '',
  metaClientes: '',
}
// Persistência local dos dados informados.
const dados = useStorage('sim-marketing', { ...PADRAO }, localStorage, { mergeDefaults: true })
const resultado = ref<ResultadoMarketing | null>(null)

const tipos = [
  { value: 'online', label: 'Online/Digital', desc: 'E-commerce, SaaS' },
  { value: 'servicos', label: 'Serviços', desc: 'Consultoria, profissionais' },
  { value: 'hibrido', label: 'Híbrido', desc: 'Loja física + online' },
  { value: 'fisico', label: 'Físico', desc: 'Varejo tradicional' },
]

const rotuloTipo: Record<TipoNegocio, string> = {
  online: 'Online/Digital',
  servicos: 'Serviços',
  hibrido: 'Híbrido',
  fisico: 'Físico',
}
const percTipo: Record<TipoNegocio, string> = {
  online: '20%',
  servicos: '17%',
  hibrido: '15%',
  fisico: '12%',
}

async function calcular() {
  const fat = paraNumero(dados.value.faturamento)
  if (fat <= 0) {
    erro('Por favor, insira um valor de faturamento válido.')
    return
  }
  if (!dados.value.tipo) {
    erro('Por favor, selecione o tipo de negócio.')
    return
  }
  await loading.comLoading(async () => {
    await new Promise((r) => setTimeout(r, 350))
    resultado.value = calcularOrcamentoMarketing({
      faturamento: fat,
      tipo: dados.value.tipo as TipoNegocio,
      ticketMedio: paraNumero(dados.value.ticketMedio),
      metaClientes: paraNumero(dados.value.metaClientes),
    })
  }, 'Calculando orçamento de marketing...')
  sucesso('Orçamento de marketing calculado com sucesso.', 'Simulação Concluída!')
}

function limpar() {
  dados.value = { ...PADRAO }
  resultado.value = null
}

const chartSeries = computed(() =>
  resultado.value
    ? [
        resultado.value.metricas.budgetSeo,
        resultado.value.metricas.budgetPago,
        resultado.value.metricas.budgetSocial,
        resultado.value.metricas.budgetEmail,
      ]
    : []
)
const chartOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'Inter, sans-serif' },
  labels: ['SEO & Conteúdo', 'Anúncios Pagos', 'Redes Sociais', 'E-mail Marketing'],
  colors: ['#2563eb', '#f59e0b', '#22c55e', '#0ea5e9'],
  legend: { position: 'bottom' },
  tooltip: { y: { formatter: (v: number) => formatarMoeda(v) } },
}))

const ltvCacRatio = computed(() =>
  resultado.value ? (resultado.value.metricas.ltv / resultado.value.metricas.cac).toFixed(1) : '0'
)

const resumo = computed(() => {
  const r = resultado.value
  if (!r) return []
  return [
    `Faturamento base: ${formatarMoeda(r.faturamento)}`,
    `Orçamento total de marketing: ${formatarMoeda(r.orcamento.total)}`,
    `Tecnologia: ${formatarMoeda(r.orcamento.tecnologia)}`,
    `Mídia: ${formatarMoeda(r.orcamento.midia)}`,
    `CAC estimado: ${formatarMoeda(r.metricas.cac)}`,
    `ROAS alvo: ${r.metricas.roas.toFixed(2)}:1`,
    `LTV estimado: ${formatarMoeda(r.metricas.ltv)}`,
    `Ratio LTV/CAC: ${ltvCacRatio.value}:1`,
  ]
})
</script>

<template>
  <div class="space-y-6">
    <Card gradient class="p-6">
      <h2 class="mb-1 flex items-center gap-2 text-2xl font-bold">
        <Icon icon="lucide:trending-up" class="h-6 w-6 text-primary" />
        Orçamento de Marketing
        <HelpTip
          text="Calcula o investimento ideal em marketing por tipo de negócio, dividindo entre tecnologia e mídia."
        />
      </h2>
      <p class="mb-6 text-sm text-muted-foreground">
        Obtenha o orçamento recomendado, distribuição por canal e métricas como CAC, ROAS, CTR e
        LTV.
      </p>

      <div class="space-y-4">
        <div>
          <Label for="mkt-fat"
            >Faturamento Mensal (R$)<HelpTip text="Faturamento bruto mensal da empresa."
          /></Label>
          <Input
            id="mkt-fat"
            v-model="dados.faturamento"
            type="number"
            placeholder="Ex: 50000"
            class="text-lg"
          />
        </div>
        <div>
          <Label for="mkt-tipo"
            >Tipo de Negócio<HelpTip text="Cada tipo tem percentuais e divisão diferentes."
          /></Label>
          <Select
            id="mkt-tipo"
            v-model="dados.tipo"
            :options="tipos"
            placeholder="Selecione o tipo de negócio"
          />
        </div>
        <div>
          <Label for="mkt-ticket">Ticket Médio (R$)<HelpTip text="Valor médio por venda." /></Label>
          <Input id="mkt-ticket" v-model="dados.ticketMedio" type="number" placeholder="Ex: 150" />
        </div>
        <div>
          <Label for="mkt-meta"
            >Meta de Novos Clientes/Mês<HelpTip
              text="Quantos novos clientes deseja conquistar por mês."
          /></Label>
          <Input id="mkt-meta" v-model="dados.metaClientes" type="number" placeholder="Ex: 50" />
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" class="flex-1" @click="calcular">
          <Icon icon="lucide:trending-up" class="h-5 w-5" />Calcular Orçamento de Marketing
        </Button>
        <Button variant="outline" size="lg" class="sm:w-auto" @click="limpar">
          <Icon icon="lucide:eraser" class="h-5 w-5" />Limpar
        </Button>
      </div>
    </Card>

    <div v-if="resultado" class="print-page">
      <Card gradient class="p-6">
        <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h3 class="text-2xl font-bold">📈 Resultado de Marketing</h3>
          <AcoesResultado titulo="Orçamento de Marketing — SimuladorPro" :linhas="resumo" />
        </div>

        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="rounded-lg bg-gradient-primary p-4 text-center text-primary-foreground">
            <p class="font-semibold">Faturamento Base</p>
            <p class="text-2xl font-bold">{{ formatarMoeda(resultado.faturamento) }}</p>
          </div>
          <div class="rounded-lg bg-accent p-4 text-center">
            <p class="font-semibold">Tipo de Negócio</p>
            <p class="text-xl font-bold">{{ rotuloTipo[resultado.tipo] }}</p>
            <p class="text-sm text-muted-foreground">
              Investimento: {{ percTipo[resultado.tipo] }} do faturamento
            </p>
          </div>
        </div>

        <div class="mb-6 rounded-lg bg-gradient-success p-6 text-center text-success-foreground">
          <p class="font-semibold">💰 Orçamento Total de Marketing</p>
          <p class="text-4xl font-bold">{{ formatarMoeda(resultado.orcamento.total) }}</p>
        </div>

        <div class="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="rounded-lg bg-card p-4">
            <VueApexCharts
              type="donut"
              height="300"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="rounded-lg bg-info p-4 text-center text-info-foreground">
              <p class="text-sm font-semibold">💸 CAC</p>
              <p class="text-lg font-bold">{{ formatarMoeda(resultado.metricas.cac) }}</p>
            </div>
            <div class="rounded-lg bg-gradient-success p-4 text-center text-success-foreground">
              <p class="text-sm font-semibold">📈 ROAS</p>
              <p class="text-lg font-bold">{{ resultado.metricas.roas.toFixed(2) }}:1</p>
            </div>
            <div class="rounded-lg bg-warning p-4 text-center text-warning-foreground">
              <p class="text-sm font-semibold">👁️ CTR</p>
              <p class="text-lg font-bold">{{ resultado.metricas.ctr.toFixed(2) }}%</p>
            </div>
            <div class="rounded-lg bg-primary p-4 text-center text-primary-foreground">
              <p class="text-sm font-semibold">🎯 Conversão</p>
              <p class="text-lg font-bold">{{ resultado.metricas.conversao.toFixed(2) }}%</p>
            </div>
          </div>
        </div>

        <div class="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          <p class="mb-2 font-semibold text-foreground">📋 Métricas-chave:</p>
          <p>
            <strong>CPM estimado:</strong> R$ {{ resultado.metricas.cpm.toFixed(2) }} por mil
            impressões
          </p>
          <p>
            <strong>LTV estimado:</strong> {{ formatarMoeda(resultado.metricas.ltv) }} por cliente
          </p>
          <p><strong>Ratio LTV/CAC:</strong> {{ ltvCacRatio }}:1 (ideal &gt; 3:1)</p>
        </div>
      </Card>
    </div>
  </div>
</template>

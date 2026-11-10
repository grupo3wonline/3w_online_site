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
  calcularOrcamentoEmpresarial,
  type ResultadoEmpresarial,
  type SetorEmpresarial,
} from '@/lib/calculos'
import { useAlerta } from '@/composables/useAlerta'
import { useLoadingStore } from '@/stores/loading'

const { erro, sucesso } = useAlerta()
const loading = useLoadingStore()

const PADRAO = {
  faturamento: '',
  custoFixo: '',
  custoVariavel: '',
  setor: 'servicos' as SetorEmpresarial,
}
// Persistência local (os dados ficam salvos no navegador do usuário).
const dados = useStorage('sim-empresarial', { ...PADRAO }, localStorage, { mergeDefaults: true })
const resultado = ref<ResultadoEmpresarial | null>(null)

const setores = [
  { value: 'servicos', label: 'Serviços' },
  { value: 'comercio', label: 'Comércio' },
  { value: 'industria', label: 'Indústria' },
  { value: 'tecnologia', label: 'Tecnologia' },
  { value: 'consultoria', label: 'Consultoria' },
]

async function calcular() {
  const fat = paraNumero(dados.value.faturamento)
  if (fat <= 0) {
    erro('Por favor, insira um valor de faturamento válido.')
    return
  }
  await loading.comLoading(async () => {
    await new Promise((r) => setTimeout(r, 350))
    resultado.value = calcularOrcamentoEmpresarial({
      faturamento: fat,
      custoFixo: paraNumero(dados.value.custoFixo),
      custoVariavel: paraNumero(dados.value.custoVariavel),
      setor: dados.value.setor,
    })
  }, 'Calculando orçamento...')
  sucesso('Orçamento empresarial calculado com sucesso.', 'Simulação Concluída!')
}

function limpar() {
  dados.value = { ...PADRAO }
  resultado.value = null
}

const chartSeries = computed(() =>
  resultado.value
    ? [
        resultado.value.divisao.vendas,
        resultado.value.divisao.operacional,
        resultado.value.divisao.producao,
      ]
    : []
)
const chartOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'Inter, sans-serif' },
  labels: ['Vendas', 'Operacional', 'Produção'],
  colors: ['#22c55e', '#2563eb', '#f59e0b'],
  legend: { position: 'bottom' },
  dataLabels: { enabled: true, formatter: (v: number) => `${v.toFixed(1)}%` },
  tooltip: { y: { formatter: (v: number) => formatarMoeda(v) } },
}))

const resumo = computed(() => {
  const r = resultado.value
  if (!r) return []
  return [
    `Faturamento base: ${formatarMoeda(r.faturamento)}`,
    `Vendas: ${formatarMoeda(r.divisao.vendas)}`,
    `Operacional: ${formatarMoeda(r.divisao.operacional)}`,
    `Produção: ${formatarMoeda(r.divisao.producao)}`,
    `Margem bruta: ${r.margemBruta.toFixed(2)}%`,
    `Ponto de equilíbrio: ${isFinite(r.pontoEquilibrio) ? formatarMoeda(r.pontoEquilibrio) : 'Inatingível'}`,
    `Lucratividade: ${r.lucratividade.toFixed(2)}%`,
    `Projeção anual: ${formatarMoeda(r.projecaoAnual)}`,
  ]
})
</script>

<template>
  <div class="space-y-6">
    <Card gradient class="p-6">
      <h2 class="mb-1 flex items-center gap-2 text-2xl font-bold">
        <Icon icon="lucide:calculator" class="h-6 w-6 text-primary" />
        Orçamento Empresarial
        <HelpTip
          text="Divide o faturamento entre vendas, operacional e produção conforme o setor selecionado."
        />
      </h2>
      <p class="mb-6 text-sm text-muted-foreground">
        Descubra a divisão ideal do seu faturamento e indicadores como margem bruta, ponto de
        equilíbrio e lucratividade.
      </p>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label for="emp-fat"
            >Faturamento Mensal (R$)<HelpTip text="Faturamento bruto mensal da empresa."
          /></Label>
          <Input
            id="emp-fat"
            v-model="dados.faturamento"
            type="number"
            placeholder="Ex: 50000"
            class="text-lg"
          />
        </div>
        <div>
          <Label for="emp-setor"
            >Setor da Empresa<HelpTip text="Cada setor tem proporções ideais diferentes."
          /></Label>
          <Select id="emp-setor" v-model="dados.setor" :options="setores" />
        </div>
        <div>
          <Label for="emp-cf"
            >Custos Fixos Mensais (R$)<HelpTip
              text="Aluguel, salários, energia — não variam com a produção."
          /></Label>
          <Input id="emp-cf" v-model="dados.custoFixo" type="number" placeholder="Ex: 15000" />
        </div>
        <div>
          <Label for="emp-cv"
            >Custos Variáveis Mensais (R$)<HelpTip
              text="Matéria-prima, comissões, frete — variam com a produção."
          /></Label>
          <Input id="emp-cv" v-model="dados.custoVariavel" type="number" placeholder="Ex: 20000" />
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" class="flex-1" @click="calcular">
          <Icon icon="lucide:calculator" class="h-5 w-5" />Calcular Orçamento Avançado
        </Button>
        <Button variant="outline" size="lg" class="sm:w-auto" @click="limpar">
          <Icon icon="lucide:eraser" class="h-5 w-5" />Limpar
        </Button>
      </div>
    </Card>

    <div v-if="resultado" class="print-page">
      <Card gradient class="p-6">
        <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h3 class="text-2xl font-bold">📊 Resultado da Simulação</h3>
          <AcoesResultado titulo="Orçamento Empresarial — SimuladorPro" :linhas="resumo" />
        </div>

        <div class="mb-6 rounded-lg bg-gradient-primary p-6 text-center text-primary-foreground">
          <p class="mb-2 font-semibold">Faturamento Base</p>
          <p class="text-3xl font-bold">{{ formatarMoeda(resultado.faturamento) }}</p>
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
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            <div class="rounded-lg bg-gradient-success p-4 text-center text-success-foreground">
              <p class="font-semibold">💼 Vendas</p>
              <p class="text-xl font-bold">{{ formatarMoeda(resultado.divisao.vendas) }}</p>
            </div>
            <div class="rounded-lg bg-primary p-4 text-center text-primary-foreground">
              <p class="font-semibold">⚙️ Operacional</p>
              <p class="text-xl font-bold">{{ formatarMoeda(resultado.divisao.operacional) }}</p>
            </div>
            <div class="rounded-lg bg-warning p-4 text-center text-warning-foreground">
              <p class="font-semibold">🏭 Produção</p>
              <p class="text-xl font-bold">{{ formatarMoeda(resultado.divisao.producao) }}</p>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">📈 Margem Bruta</p>
            <p class="text-xl font-bold">{{ resultado.margemBruta.toFixed(2) }}%</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">⚖️ Ponto de Equilíbrio</p>
            <p class="text-lg font-bold">
              {{
                isFinite(resultado.pontoEquilibrio)
                  ? formatarMoeda(resultado.pontoEquilibrio)
                  : 'Inatingível'
              }}
            </p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">💰 Lucratividade</p>
            <p class="text-xl font-bold">{{ resultado.lucratividade.toFixed(2) }}%</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">📊 Projeção Anual</p>
            <p class="text-lg font-bold">{{ formatarMoeda(resultado.projecaoAnual) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">⚡ Eficiência de Custos</p>
            <p class="text-lg font-bold">{{ resultado.eficienciaCustos.toFixed(2) }}%</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">🛡️ Reserva de Emergência</p>
            <p class="text-lg font-bold">{{ formatarMoeda(resultado.reservaEmergencia) }}</p>
          </div>
        </div>

        <div class="mt-6 rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          <p class="mb-2 font-semibold text-foreground">📋 Interpretação:</p>
          <ul class="space-y-1">
            <li>• <strong>Margem Bruta:</strong> ideal acima de 40% para sustentabilidade.</li>
            <li>• <strong>Ponto de Equilíbrio:</strong> faturamento mínimo para cobrir custos.</li>
            <li>
              • <strong>Lucratividade:</strong> meta mínima de 10-15% para crescimento saudável.
            </li>
          </ul>
        </div>
      </Card>
    </div>
  </div>
</template>

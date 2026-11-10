<script setup lang="ts">
import { computed, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import VueApexCharts from 'vue3-apexcharts'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import HelpTip from '@/components/ui/HelpTip.vue'
import AcoesResultado from './AcoesResultado.vue'
import { formatarMoeda, paraNumero } from '@/lib/utils'
import {
  calcularPrecificacao,
  diagnosticarPrecificacao,
  type ResultadoPrecificacao,
} from '@/lib/calculos'
import { useAlerta } from '@/composables/useAlerta'
import { useLoadingStore } from '@/stores/loading'

const { erro, sucesso } = useAlerta()
const loading = useLoadingStore()

const PADRAO = {
  custo: '',
  margemDesejada: '20',
  impostos: '6',
  taxas: '3',
  despesasOperacionais: '10',
  frete: '',
}
const dados = useStorage('sim-precificacao', { ...PADRAO }, localStorage, { mergeDefaults: true })
const resultado = ref<ResultadoPrecificacao | null>(null)

async function calcular() {
  const custo = paraNumero(dados.value.custo)
  if (custo <= 0) {
    erro('Informe o custo do produto/serviço (maior que zero).')
    return
  }
  const entrada = {
    custo,
    margemDesejada: paraNumero(dados.value.margemDesejada),
    impostos: paraNumero(dados.value.impostos),
    taxas: paraNumero(dados.value.taxas),
    despesasOperacionais: paraNumero(dados.value.despesasOperacionais),
    frete: paraNumero(dados.value.frete),
  }
  await loading.comLoading(async () => {
    await new Promise((r) => setTimeout(r, 300))
    resultado.value = calcularPrecificacao(entrada)
  }, 'Calculando preço de venda...')

  if (resultado.value && !resultado.value.viavel) {
    erro('A soma de margem, impostos, taxas e despesas atinge 100% ou mais. Reduza os percentuais.')
    return
  }
  sucesso('Preço de venda calculado com sucesso.', 'Precificação Concluída!')
}

function limpar() {
  dados.value = { ...PADRAO }
  resultado.value = null
}

const diagnosticos = computed(() =>
  resultado.value ? diagnosticarPrecificacao(resultado.value) : []
)

const corDiag: Record<string, string> = {
  positivo: 'text-success',
  atencao: 'text-warning',
  critico: 'text-danger',
}
const iconeDiag: Record<string, string> = {
  positivo: 'lucide:circle-check-big',
  atencao: 'lucide:circle-alert',
  critico: 'lucide:circle-x',
}

const chartSeries = computed(() => {
  const c = resultado.value?.composicao
  if (!c) return []
  return [c.custo, c.frete, c.impostos, c.taxas, c.despesasOperacionais, c.lucro]
})
const chartOptions = computed(() => ({
  chart: { type: 'donut', fontFamily: 'Inter, sans-serif' },
  labels: ['Custo', 'Frete', 'Impostos', 'Taxas', 'Despesas Op.', 'Lucro'],
  colors: ['#64748b', '#0ea5e9', '#f59e0b', '#a855f7', '#ef4444', '#22c55e'],
  legend: { position: 'bottom' },
  tooltip: { y: { formatter: (v: number) => formatarMoeda(v) } },
}))

const resumo = computed(() => {
  const r = resultado.value
  if (!r) return []
  return [
    `Preço de venda sugerido: ${formatarMoeda(r.precoVenda)}`,
    `Markup: ${r.markup.toFixed(2)}x sobre o custo`,
    `Lucro por unidade: ${formatarMoeda(r.composicao.lucro)}`,
    `Impostos: ${formatarMoeda(r.composicao.impostos)}`,
    `Taxas: ${formatarMoeda(r.composicao.taxas)}`,
    `Despesas operacionais: ${formatarMoeda(r.composicao.despesasOperacionais)}`,
    `Margem de contribuição: ${r.margemContribuicao.toFixed(1)}%`,
  ]
})
</script>

<template>
  <div class="space-y-6">
    <Card gradient class="p-6">
      <h2 class="mb-1 flex items-center gap-2 text-2xl font-bold">
        <Icon icon="lucide:tag" class="h-6 w-6 text-primary" />
        Precificação e Markup
        <HelpTip
          text="Calcula o preço de venda ideal a partir do custo, margem desejada, impostos, taxas e despesas — todos incidindo sobre o preço (padrão de mercado)."
        />
      </h2>
      <p class="mb-6 text-sm text-muted-foreground">
        Descubra por quanto vender para atingir a margem desejada já cobrindo impostos, taxas de
        cartão/marketplace e despesas operacionais.
      </p>

      <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label for="prc-custo"
            >Custo do Produto (R$)<HelpTip
              text="Custo direto: matéria-prima ou valor de aquisição."
          /></Label>
          <Input
            id="prc-custo"
            v-model="dados.custo"
            type="number"
            placeholder="Ex: 50"
            class="text-lg"
          />
        </div>
        <div>
          <Label for="prc-frete"
            >Frete / Embalagem (R$)<HelpTip text="Custo fixo por unidade com frete e embalagem."
          /></Label>
          <Input id="prc-frete" v-model="dados.frete" type="number" placeholder="Ex: 8" />
        </div>
        <div>
          <Label for="prc-margem"
            >Margem de Lucro Desejada (%)<HelpTip
              text="Lucro líquido desejado como percentual do preço de venda."
          /></Label>
          <Input
            id="prc-margem"
            v-model="dados.margemDesejada"
            type="number"
            placeholder="Ex: 20"
          />
        </div>
        <div>
          <Label for="prc-impostos"
            >Impostos sobre a Venda (%)<HelpTip text="Ex.: Simples Nacional, ICMS, ISS."
          /></Label>
          <Input id="prc-impostos" v-model="dados.impostos" type="number" placeholder="Ex: 6" />
        </div>
        <div>
          <Label for="prc-taxas"
            >Taxas de Cartão/Marketplace (%)<HelpTip
              text="Taxas de gateway, cartão ou comissão de marketplace."
          /></Label>
          <Input id="prc-taxas" v-model="dados.taxas" type="number" placeholder="Ex: 3" />
        </div>
        <div>
          <Label for="prc-desp"
            >Despesas Operacionais (%)<HelpTip
              text="Rateio de custos fixos (aluguel, equipe) por unidade."
          /></Label>
          <Input
            id="prc-desp"
            v-model="dados.despesasOperacionais"
            type="number"
            placeholder="Ex: 10"
          />
        </div>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" class="flex-1" @click="calcular">
          <Icon icon="lucide:tag" class="h-5 w-5" />Calcular Preço de Venda
        </Button>
        <Button variant="outline" size="lg" class="sm:w-auto" @click="limpar">
          <Icon icon="lucide:eraser" class="h-5 w-5" />Limpar
        </Button>
      </div>
    </Card>

    <div v-if="resultado && resultado.viavel" class="print-page">
      <Card gradient class="p-6">
        <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h3 class="text-2xl font-bold">🏷️ Resultado da Precificação</h3>
          <AcoesResultado titulo="Precificação e Markup — SimuladorPro" :linhas="resumo" />
        </div>

        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div
            class="rounded-lg bg-gradient-primary p-6 text-center text-primary-foreground md:col-span-1"
          >
            <p class="font-semibold">💰 Preço de Venda</p>
            <p class="text-3xl font-bold">{{ formatarMoeda(resultado.precoVenda) }}</p>
          </div>
          <div class="rounded-lg bg-gradient-success p-6 text-center text-success-foreground">
            <p class="font-semibold">📈 Markup</p>
            <p class="text-3xl font-bold">{{ resultado.markup.toFixed(2) }}x</p>
          </div>
          <div class="rounded-lg bg-warning p-6 text-center text-warning-foreground">
            <p class="font-semibold">🎯 Lucro por Unidade</p>
            <p class="text-3xl font-bold">{{ formatarMoeda(resultado.composicao.lucro) }}</p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="rounded-lg bg-card p-4">
            <VueApexCharts
              type="donut"
              height="300"
              :options="chartOptions"
              :series="chartSeries"
            />
          </div>
          <div class="space-y-3">
            <h4 class="font-semibold">Composição do Preço</h4>
            <div class="space-y-2 text-sm">
              <p class="flex justify-between">
                <span>Custo</span><strong>{{ formatarMoeda(resultado.composicao.custo) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>Frete / Embalagem</span
                ><strong>{{ formatarMoeda(resultado.composicao.frete) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>Impostos</span
                ><strong>{{ formatarMoeda(resultado.composicao.impostos) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>Taxas</span><strong>{{ formatarMoeda(resultado.composicao.taxas) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>Despesas operacionais</span
                ><strong>{{ formatarMoeda(resultado.composicao.despesasOperacionais) }}</strong>
              </p>
              <p class="flex justify-between border-t border-border pt-2 text-success">
                <span>Lucro</span><strong>{{ formatarMoeda(resultado.composicao.lucro) }}</strong>
              </p>
              <p class="flex justify-between border-t border-border pt-2">
                <span>Margem de contribuição</span
                ><strong>{{ resultado.margemContribuicao.toFixed(1) }}%</strong>
              </p>
            </div>
          </div>
        </div>

        <!-- Diagnósticos -->
        <div class="mt-6 rounded-lg bg-muted p-4">
          <h4 class="mb-2 font-semibold text-foreground">🔎 Diagnóstico</h4>
          <ul class="space-y-2 text-sm">
            <li v-for="(d, i) in diagnosticos" :key="i" class="flex items-start gap-2">
              <Icon
                :icon="iconeDiag[d.nivel]"
                :class="['mt-0.5 h-4 w-4 flex-shrink-0', corDiag[d.nivel]]"
              />
              <span class="text-muted-foreground">{{ d.mensagem }}</span>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  </div>
</template>

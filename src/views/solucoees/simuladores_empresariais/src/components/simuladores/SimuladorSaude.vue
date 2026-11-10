<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useStorage } from '@vueuse/core'
import { Icon } from '@iconify/vue'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'
import Collapsible from '@/components/ui/Collapsible.vue'
import HelpTip from '@/components/ui/HelpTip.vue'
import AcoesResultado from './AcoesResultado.vue'
import { formatarMoeda } from '@/lib/utils'
import { calcularSaudeEmpresa, type DadosEmpresa, type ResultadoSaude } from '@/lib/calculos'
import { useAlerta } from '@/composables/useAlerta'
import { useLoadingStore } from '@/stores/loading'

const { sucesso } = useAlerta()
const loading = useLoadingStore()

const PADRAO: DadosEmpresa = {
  faturamento: 50000,
  capital: 25000,
  estoque: 15000,
  custo: 800,
  ticket: 2500,
  pedidos: 50,
  vendas: 90,
  clientes: 100,
  frequenciaCompra: 3,
  novosClientes: 20,
  retencao: 70,
  midia_impressa: 2000,
  redes_sociais: 3000,
  site_blog: 1500,
  anuncios: 4000,
  loja_virtual: 800,
  marketplace: 1200,
  materia_prima: 8000,
  fabricacao: 5000,
  logistica: 2000,
  maquinario: 50000,
  mobiliario: 8000,
  imoveis: 200000,
  automoveis: 30000,
  eletronicos: 5000,
  equipamentosAdicionais: 3000,
  folha_pagamento: 18000,
  aluguel: 3000,
  luz: 800,
  agua: 300,
  telefonia: 400,
  internet: 200,
  papelaria: 150,
  limpeza: 300,
  sistemas: 500,
  treinamento: 800,
  seguranca: 600,
  servicos: 1200,
  despesaAdicionais: 800,
  custos_juridicos: 500,
  custos_contabeis: 800,
}

// Persistência local dos dados informados.
const dados = useStorage<DadosEmpresa>('sim-saude', { ...PADRAO }, localStorage, {
  mergeDefaults: true,
})

type Campo = { field: keyof DadosEmpresa; label: string; tip: string }

const secoes: { chave: string; titulo: string; emoji: string; aberta: boolean; campos: Campo[] }[] =
  [
    {
      chave: 'basicos',
      titulo: 'Dados Básicos da Empresa',
      emoji: '📊',
      aberta: true,
      campos: [
        { field: 'faturamento', label: 'Faturamento Mensal', tip: 'Receita bruta mensal.' },
        { field: 'capital', label: 'Capital Disponível', tip: 'Capital de giro disponível.' },
        { field: 'estoque', label: 'Valor do Estoque', tip: 'Valor total do estoque atual.' },
        { field: 'ticket', label: 'Ticket Médio', tip: 'Valor médio por venda.' },
        { field: 'pedidos', label: 'Número de Pedidos', tip: 'Quantidade de pedidos no período.' },
        { field: 'vendas', label: 'Vendas Realizadas', tip: 'Número total de vendas.' },
        { field: 'clientes', label: 'Número de Clientes', tip: 'Base total de clientes ativos.' },
        { field: 'novosClientes', label: 'Novos Clientes', tip: 'Clientes adquiridos no período.' },
        {
          field: 'retencao',
          label: 'Taxa de Retenção (%)',
          tip: 'Percentual de clientes que retornam.',
        },
      ],
    },
    {
      chave: 'marketing',
      titulo: 'Investimentos em Marketing',
      emoji: '📈',
      aberta: false,
      campos: [
        { field: 'midia_impressa', label: 'Mídia Impressa', tip: 'Jornais, revistas etc.' },
        { field: 'redes_sociais', label: 'Redes Sociais', tip: 'Facebook, Instagram etc.' },
        { field: 'site_blog', label: 'Site/Blog', tip: 'Custos com site, blog e SEO.' },
        { field: 'anuncios', label: 'Anúncios Online', tip: 'Google Ads, Meta Ads etc.' },
        { field: 'loja_virtual', label: 'Loja Virtual', tip: 'Custos com e-commerce.' },
        { field: 'marketplace', label: 'Marketplace', tip: 'Mercado Livre, Amazon etc.' },
      ],
    },
    {
      chave: 'producao',
      titulo: 'Custos de Produção',
      emoji: '🏭',
      aberta: false,
      campos: [
        { field: 'materia_prima', label: 'Matéria-prima', tip: 'Materiais diretos.' },
        { field: 'fabricacao', label: 'Fabricação', tip: 'Mão de obra direta.' },
        { field: 'logistica', label: 'Logística', tip: 'Transporte e distribuição.' },
      ],
    },
    {
      chave: 'patrimonio',
      titulo: 'Patrimônio da Empresa',
      emoji: '🏢',
      aberta: false,
      campos: [
        { field: 'maquinario', label: 'Maquinário', tip: 'Máquinas e equipamentos.' },
        { field: 'mobiliario', label: 'Mobiliário', tip: 'Móveis e utensílios.' },
        { field: 'imoveis', label: 'Imóveis', tip: 'Propriedades da empresa.' },
        { field: 'automoveis', label: 'Automóveis', tip: 'Frota de veículos.' },
        { field: 'eletronicos', label: 'Eletrônicos', tip: 'Computadores, celulares etc.' },
        {
          field: 'equipamentosAdicionais',
          label: 'Equipamentos Adicionais',
          tip: 'Outros equipamentos.',
        },
      ],
    },
    {
      chave: 'operacional',
      titulo: 'Custos Operacionais',
      emoji: '⚙️',
      aberta: false,
      campos: [
        { field: 'folha_pagamento', label: 'Folha de Pagamento', tip: 'Salários e encargos.' },
        { field: 'aluguel', label: 'Aluguel', tip: 'Aluguel de imóveis.' },
        { field: 'luz', label: 'Energia Elétrica', tip: 'Conta de luz.' },
        { field: 'agua', label: 'Água', tip: 'Conta de água.' },
        { field: 'telefonia', label: 'Telefonia', tip: 'Telefone fixo e móvel.' },
        { field: 'internet', label: 'Internet', tip: 'Conexão de internet.' },
        { field: 'papelaria', label: 'Papelaria', tip: 'Material de escritório.' },
        { field: 'limpeza', label: 'Limpeza', tip: 'Produtos e serviços de limpeza.' },
        { field: 'sistemas', label: 'Sistemas', tip: 'Software e licenças.' },
        { field: 'treinamento', label: 'Treinamento', tip: 'Capacitação de funcionários.' },
      ],
    },
    {
      chave: 'outros',
      titulo: 'Outros Custos',
      emoji: '📋',
      aberta: false,
      campos: [
        { field: 'seguranca', label: 'Segurança', tip: 'Vigilância e seguros.' },
        {
          field: 'servicos',
          label: 'Serviços Terceirizados',
          tip: 'Consultorias e serviços externos.',
        },
        { field: 'despesaAdicionais', label: 'Despesas Adicionais', tip: 'Outras despesas.' },
        { field: 'custos_juridicos', label: 'Custos Jurídicos', tip: 'Advogados e processos.' },
        {
          field: 'custos_contabeis',
          label: 'Custos Contábeis',
          tip: 'Contador e obrigações fiscais.',
        },
      ],
    },
  ]

const abertas = reactive<Record<string, boolean>>(
  Object.fromEntries(secoes.map((s) => [s.chave, s.aberta]))
)

const resultado = ref<ResultadoSaude | null>(null)

async function calcular() {
  await loading.comLoading(async () => {
    await new Promise((r) => setTimeout(r, 400))
    resultado.value = calcularSaudeEmpresa({ ...dados.value })
  }, 'Analisando saúde empresarial...')
  sucesso('Saúde empresarial calculada com sucesso.', 'Análise Concluída!')
}

function limpar() {
  dados.value = { ...PADRAO }
  resultado.value = null
}

/**
 * Health Score (0-100): pontuação didática que combina os principais
 * indicadores de saúde financeira em uma nota única e fácil de interpretar.
 */
const healthScore = computed(() => {
  const r = resultado.value
  if (!r) return 0
  let score = 0
  // Margem líquida positiva e saudável (até 30 pts)
  score += Math.max(0, Math.min(30, r.calc_margem_liquida))
  // Liquidez corrente (até 25 pts, ideal >= 1.5)
  score += Math.max(0, Math.min(25, (r.calc_current_ratio / 1.5) * 25))
  // ROE (até 20 pts, ideal >= 15%)
  score += Math.max(0, Math.min(20, ((r.calc_roe * 100) / 15) * 20))
  // LTV/CAC (até 15 pts, ideal >= 3)
  const ltvCac = r.calc_cac ? r.calc_ltv / r.calc_cac : 0
  score += Math.max(0, Math.min(15, (ltvCac / 3) * 15))
  // Endividamento controlado (até 10 pts, ideal <= 0.5)
  score += r.calc_debt_equity <= 0.5 ? 10 : Math.max(0, 10 - (r.calc_debt_equity - 0.5) * 10)
  return Math.round(Math.max(0, Math.min(100, score)))
})

const healthStatus = computed(() => {
  const s = healthScore.value
  if (s >= 75)
    return {
      label: 'Saudável',
      cor: 'text-success',
      bg: 'bg-success/10',
      icon: 'lucide:circle-check-big',
    }
  if (s >= 50)
    return {
      label: 'Atenção',
      cor: 'text-warning',
      bg: 'bg-warning/10',
      icon: 'lucide:circle-alert',
    }
  return { label: 'Crítico', cor: 'text-danger', bg: 'bg-danger/10', icon: 'lucide:circle-x' }
})

const resumo = computed(() => {
  const r = resultado.value
  if (!r) return []
  return [
    `Health Score: ${healthScore.value}/100 (${healthStatus.value.label})`,
    `Valuation (8x EBITDA): ${formatarMoeda(r.calc_valuation_multiplo)}`,
    `EBITDA: ${formatarMoeda(r.calc_ebitda)} (${r.calc_margem_ebitda.toFixed(1)}%)`,
    `Lucro líquido: ${formatarMoeda(r.calc_lucro)} (${r.calc_margem_liquida.toFixed(1)}%)`,
    `ROE: ${(r.calc_roe * 100).toFixed(1)}%`,
    `CAC: ${formatarMoeda(r.calc_cac)} | LTV: ${formatarMoeda(r.calc_ltv)}`,
    `Liquidez corrente: ${r.calc_current_ratio.toFixed(2)}`,
  ]
})
</script>

<template>
  <div class="space-y-6">
    <Card gradient class="p-6">
      <h2 class="mb-1 flex items-center gap-2 text-2xl font-bold">
        <Icon icon="lucide:heart-pulse" class="h-6 w-6 text-primary" />
        Saúde da Empresa
        <HelpTip
          text="Análise completa com +40 indicadores: ROI, ROE, CAC, LTV, EBITDA, valuation e mais."
        />
      </h2>
      <p class="mb-6 text-sm text-muted-foreground">
        Preencha as seções abaixo (já vêm com valores de exemplo) e obtenha um raio-x financeiro
        completo.
      </p>

      <div class="space-y-4">
        <Collapsible
          v-for="secao in secoes"
          :key="secao.chave"
          v-model:open="abertas[secao.chave]"
          :title="secao.titulo"
          :emoji="secao.emoji"
        >
          <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div v-for="campo in secao.campos" :key="campo.field">
              <Label>{{ campo.label }}<HelpTip :text="campo.tip" /></Label>
              <Input v-model.number="dados[campo.field]" type="number" />
            </div>
          </div>
        </Collapsible>
      </div>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <Button size="lg" class="flex-1" @click="calcular">
          <Icon icon="lucide:heart-pulse" class="h-5 w-5" />Analisar Saúde da Empresa
        </Button>
        <Button variant="outline" size="lg" class="sm:w-auto" @click="limpar">
          <Icon icon="lucide:eraser" class="h-5 w-5" />Restaurar padrão
        </Button>
      </div>
    </Card>

    <div v-if="resultado" class="print-page space-y-6">
      <Card gradient class="p-6">
        <div class="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <h3 class="text-2xl font-bold">❤️ Relatório de Saúde Empresarial</h3>
          <AcoesResultado titulo="Saúde da Empresa — SimuladorPro" :linhas="resumo" />
        </div>

        <!-- Health Score -->
        <div class="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div
            :class="[
              'flex flex-col items-center justify-center rounded-xl p-6 text-center',
              healthStatus.bg,
            ]"
          >
            <div class="relative mb-2 flex h-24 w-24 items-center justify-center">
              <svg class="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  stroke-width="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="8"
                  stroke-linecap="round"
                  :class="healthStatus.cor"
                  :stroke-dasharray="264"
                  :stroke-dashoffset="264 - (264 * healthScore) / 100"
                  style="transition: stroke-dashoffset 0.8s ease"
                />
              </svg>
              <span class="absolute text-2xl font-bold text-foreground">{{ healthScore }}</span>
            </div>
            <p :class="['flex items-center gap-1 font-semibold', healthStatus.cor]">
              <Icon :icon="healthStatus.icon" class="h-4 w-4" />{{ healthStatus.label }}
            </p>
            <p class="mt-1 text-xs text-muted-foreground">Health Score (0-100)</p>
          </div>

          <div
            class="rounded-xl bg-gradient-primary p-6 text-center text-primary-foreground md:col-span-2"
          >
            <p class="text-lg font-bold">💼 Valuation da Empresa</p>
            <p class="text-4xl font-bold">{{ formatarMoeda(resultado.calc_valuation_multiplo) }}</p>
            <p class="text-sm opacity-80">Baseado em 8x EBITDA</p>
          </div>
        </div>

        <div class="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          <div class="rounded-lg bg-gradient-success p-4 text-center text-success-foreground">
            <p class="text-sm font-semibold">📊 EBITDA</p>
            <p class="text-lg font-bold">{{ formatarMoeda(resultado.calc_ebitda) }}</p>
            <p class="text-xs opacity-80">{{ resultado.calc_margem_ebitda.toFixed(1) }}%</p>
          </div>
          <div class="rounded-lg bg-primary p-4 text-center text-primary-foreground">
            <p class="text-sm font-semibold">💰 EBIT</p>
            <p class="text-lg font-bold">{{ formatarMoeda(resultado.calc_ebit) }}</p>
            <p class="text-xs opacity-80">{{ resultado.calc_margem_ebit.toFixed(1) }}%</p>
          </div>
          <div class="rounded-lg bg-warning p-4 text-center text-warning-foreground">
            <p class="text-sm font-semibold">💡 Lucro Líquido</p>
            <p class="text-lg font-bold">{{ formatarMoeda(resultado.calc_lucro) }}</p>
            <p class="text-xs opacity-80">{{ resultado.calc_margem_liquida.toFixed(1) }}%</p>
          </div>
          <div class="rounded-lg bg-accent p-4 text-center text-accent-foreground">
            <p class="text-sm font-semibold">📈 ROE</p>
            <p class="text-lg font-bold">{{ (resultado.calc_roe * 100).toFixed(1) }}%</p>
          </div>
          <div class="rounded-lg bg-info p-4 text-center text-info-foreground">
            <p class="text-sm font-semibold">🎯 P/E</p>
            <p class="text-lg font-bold">{{ resultado.calc_price_earnings.toFixed(1) }}x</p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card class="p-4">
            <h4 class="mb-3 font-semibold">📈 Margens</h4>
            <div class="space-y-2 text-sm">
              <p class="flex justify-between">
                <span>Margem Bruta</span
                ><strong>{{ resultado.calc_gross_margin.toFixed(1) }}%</strong>
              </p>
              <p class="flex justify-between">
                <span>Margem EBITDA</span
                ><strong>{{ resultado.calc_margem_ebitda.toFixed(1) }}%</strong>
              </p>
              <p class="flex justify-between">
                <span>Margem Operacional</span
                ><strong>{{ resultado.calc_operating_margin.toFixed(1) }}%</strong>
              </p>
              <p class="flex justify-between">
                <span>Margem Líquida</span
                ><strong>{{ resultado.calc_margem_liquida.toFixed(1) }}%</strong>
              </p>
            </div>
          </Card>
          <Card class="p-4">
            <h4 class="mb-3 font-semibold">📊 Liquidez</h4>
            <div class="space-y-2 text-sm">
              <p class="flex justify-between">
                <span>Current Ratio</span
                ><strong>{{ resultado.calc_current_ratio.toFixed(2) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>Quick Ratio</span><strong>{{ resultado.calc_quick_ratio.toFixed(2) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>Working Capital</span
                ><strong>{{ formatarMoeda(resultado.calc_working_capital) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>Asset Turnover</span
                ><strong>{{ resultado.calc_asset_turnover.toFixed(2) }}x</strong>
              </p>
            </div>
          </Card>
          <Card class="p-4">
            <h4 class="mb-3 font-semibold">🎯 Performance</h4>
            <div class="space-y-2 text-sm">
              <p class="flex justify-between">
                <span>CAC</span><strong>{{ formatarMoeda(resultado.calc_cac) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>LTV</span><strong>{{ formatarMoeda(resultado.calc_ltv) }}</strong>
              </p>
              <p class="flex justify-between">
                <span>LTV/CAC</span
                ><strong>{{ (resultado.calc_ltv / resultado.calc_cac).toFixed(1) }}x</strong>
              </p>
              <p class="flex justify-between">
                <span>ROI</span><strong>{{ resultado.calc_roi.roi2.toFixed(1) }}%</strong>
              </p>
            </div>
          </Card>
        </div>

        <div class="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">📢 Marketing</p>
            <p class="font-bold">{{ formatarMoeda(resultado.calc_orc_mkt) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">💼 Vendas</p>
            <p class="font-bold">{{ formatarMoeda(resultado.calc_orc_vendas) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">🏭 Produção</p>
            <p class="font-bold">{{ formatarMoeda(resultado.calc_orc_producao) }}</p>
          </div>
          <div class="rounded-lg bg-muted p-4 text-center">
            <p class="text-sm font-semibold">⚙️ Operacional</p>
            <p class="font-bold">{{ formatarMoeda(resultado.calc_orc_operacional) }}</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

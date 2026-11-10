<template>
  <ToolShell
    title="Simulador: Alugar ou Comprar?"
    description="Compare financeiramente alugar versus comprar um imóvel considerando todos os custos e o retorno da entrada investida."
    icon="fa-house-chimney-window"
    icon-gradient="from-fuchsia-500 to-purple-700"
    orb-color="purple"
    :quick-tips="['Comparação lado a lado', 'Inclui IPTU e condomínio', 'Retorno da entrada investida']"
    :tips="[
      { title: 'Inclua todos os custos', text: 'Ao calcular o custo de compra, não esqueça ITBI (2-3%), escritura, registro e possíveis reformas iniciais.', type: 'warning' },
      { title: 'Oportunidade de investir', text: 'O valor da entrada aplicado em renda fixa pode superar a valorização do imóvel, especialmente em cenários de juros altos.', type: 'info' },
      { title: 'Longo prazo favorece compra', text: 'Em análises de 10+ anos, comprar geralmente supera alugar por construir patrimônio, mas depende da localização.', type: 'success' },
    ]"
    :examples="[
      { title: 'Imóvel R$ 500k, entrada R$ 100k', desc: 'Financiamento 30 anos a 10% a.a. | Aluguel R$ 2.000/mês | 10 anos', result: 'Comparar custo total de compra vs. aluguel acumulado' },
      { title: 'Entrada aplicada a 12% a.a.', desc: 'R$ 100k investido por 10 anos', result: 'Patrimônio: ~R$ 310k (retorno de 210%)' },
      { title: 'Ponto de equilíbrio', desc: 'Aluguel/mês ÷ Valor do imóvel = Yield', result: 'Acima de 0,5% a.m. = alugar pode ser melhor' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Comprar -->
          <div class="glass-panel p-4">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <i class="fas fa-home text-fuchsia-500"></i>Opção 1: Comprar
            </h4>
            <div class="grid grid-cols-2 gap-3">
              <BaseInput v-model="valorImovel"       label="Valor do Imóvel (R$)"       type="number" :min="0" step="10000" icon="fa-home"                   tooltip="Preço total de venda do imóvel." />
              <BaseInput v-model="entrada"           label="Entrada (R$)"               type="number" :min="0" step="5000"  icon="fa-hand-holding-dollar"    tooltip="Valor da entrada (mínimo 20% recomendado)." />
              <BaseInput v-model="prazoFinanciamento"label="Prazo Financiamento (anos)" type="number" :min="1" :max="35"   icon="fa-calendar"               hint="Máx. 35 anos" />
              <BaseInput v-model="taxaFinanciamento" label="Taxa de Juros (% a.a.)"     type="number"           step="0.1"  icon="fa-percentage"             tooltip="Taxa de juros anual do financiamento." />
              <BaseInput v-model="iptu"              label="IPTU Anual (R$)"            type="number" :min="0" step="100"   icon="fa-file-invoice-dollar"    hint="Valor anual do imposto" />
              <BaseInput v-model="condominio"        label="Condomínio/mês (R$)"        type="number" :min="0" step="50"    icon="fa-building"               hint="Se houver condomínio" />
            </div>
          </div>

          <!-- Alugar -->
          <div class="glass-panel p-4">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <i class="fas fa-key text-blue-500"></i>Opção 2: Alugar
            </h4>
            <div class="grid grid-cols-2 gap-3">
              <BaseInput v-model="valorAluguel"           label="Aluguel/mês (R$)"        type="number" :min="0" step="100"  icon="fa-key"          tooltip="Valor mensal do aluguel." />
              <BaseInput v-model="reajusteAluguel"        label="Reajuste Anual (%)"       type="number"          step="0.5"  icon="fa-arrow-up"     hint="Ex: 6% (IGPM médio)" />
              <BaseInput v-model="rendimentoInvestimento" label="Rendimento da Entrada (%)"type="number"          step="0.5"  icon="fa-chart-line"   tooltip="Rentabilidade anual se a entrada fosse investida." />
              <BaseInput v-model="prazoAnalise"           label="Prazo de Análise (anos)"  type="number" :min="1" :max="30"  icon="fa-hourglass"    hint="1 a 30 anos" />
            </div>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">Comparar Opções</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="resultado = null">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Veredicto -->
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">{{ prazoAnalise }} anos de análise</p>
              <p class="text-2xl font-black text-white mb-1">{{ resultado.melhorOpcao }}</p>
              <p class="text-emerald-300 text-sm font-semibold">{{ resultado.vantagem }}</p>
            </div>

            <!-- Comparativo -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-fuchsia-100 dark:ring-fuchsia-900">
                <div class="metric-glass-value text-fuchsia-600 dark:text-fuchsia-400">{{ fmtBRL(resultado.custoCompra) }}</div>
                <div class="metric-glass-label">Custo Comprar</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ fmtBRL(resultado.custoAluguel) }}</div>
                <div class="metric-glass-label">Custo Alugar</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ fmtBRL(resultado.patrimonioFinal) }}</div>
                <div class="metric-glass-label">Imóvel Valorizado</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ resultado.retornoInvestimento }}%</div>
                <div class="metric-glass-label">Retorno da Entrada</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-fuchsia-500"></i>Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div v-for="item in breakdown" :key="item.label"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ item.label }}</span>
                  <span :class="['font-bold', item.cls || 'text-gray-900 dark:text-white']">{{ item.value }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">{{ resultado.mensagem }} Considere também flexibilidade, estilo de vida e planos de mudança de cidade.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-house-chimney text-4xl mb-3 opacity-30 block text-fuchsia-400"></i>
          <p class="text-sm">Preencha os valores e compare as opções</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface ResultadoAluguel {
  custoCompra:         number
  custoAluguel:        number
  melhorOpcao:         string
  vantagem:            string
  mensagem:            string
  parcelaMedia:        number
  patrimonioFinal:     number
  retornoInvestimento: string
}

const valorImovel           = ref<number | ''>(500000)
const entrada               = ref<number | ''>(100000)
const prazoFinanciamento    = ref<number | ''>(30)
const taxaFinanciamento     = ref<number | ''>(10)
const iptu                  = ref<number | ''>(3000)
const condominio            = ref<number | ''>(500)
const valorAluguel          = ref<number | ''>(2000)
const reajusteAluguel       = ref<number | ''>(6)
const rendimentoInvestimento= ref<number | ''>(12)
const prazoAnalise          = ref<number | ''>(10)
const resultado             = ref<ResultadoAluguel | null>(null)

const fmtBRL = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

const breakdown = computed(() => {
  if (!resultado.value) return []
  const r = resultado.value
  return [
    { label: 'Parcela média (financiamento)', value: fmtBRL(r.parcelaMedia) },
    { label: 'Total pago (financiamento)',    value: fmtBRL(r.custoCompra),  cls: 'text-fuchsia-600 dark:text-fuchsia-400' },
    { label: 'Total pago (aluguel)',          value: fmtBRL(r.custoAluguel), cls: 'text-blue-600 dark:text-blue-400' },
    { label: 'Imóvel valorizado (5% a.a.)',   value: fmtBRL(r.patrimonioFinal) },
    { label: 'Retorno da entrada investida',  value: `${r.retornoInvestimento}%`, cls: 'text-teal-600 dark:text-teal-400' },
  ]
})

const calcular = () => {
  const vlIm   = Number(valorImovel.value) || 0
  const ent    = Number(entrada.value) || 0
  const vlFin  = vlIm - ent
  const nMeses = (Number(prazoFinanciamento.value) || 30) * 12
  const taxaMes= Number(taxaFinanciamento.value) / 100 / 12
  const anos   = Number(prazoAnalise.value) || 10
  const mesAn  = anos * 12
  const mesMin = Math.min(mesAn, nMeses)

  // Parcela PRICE
  const parcela = vlFin * (taxaMes * Math.pow(1 + taxaMes, nMeses)) / (Math.pow(1 + taxaMes, nMeses) - 1)

  // Custo de compra
  let custoCompra = ent + parcela * mesMin + Number(iptu.value) * anos + Number(condominio.value) * mesAn

  // Custo de aluguel
  let custoAluguel = 0; let aluguelAt = Number(valorAluguel.value) || 0
  for (let a = 0; a < anos; a++) { custoAluguel += aluguelAt * 12; aluguelAt *= (1 + Number(reajusteAluguel.value) / 100) }

  // Retorno da entrada investida
  const taxaInv = Number(rendimentoInvestimento.value) / 100
  const retorno = ((Math.pow(1 + taxaInv, anos) - 1) * 100).toFixed(1)

  // Imóvel valorizado 5% a.a.
  const patrimonioImovel = vlIm * Math.pow(1.05, anos)

  const melhor = custoCompra <= custoAluguel ? '✅ COMPRAR é mais vantajoso' : '✅ ALUGAR é mais vantajoso'
  const diff   = Math.abs(custoCompra - custoAluguel)
  const mensagem = custoCompra <= custoAluguel ? 'Comprar constrói patrimônio no longo prazo.' : 'Alugar oferece mais flexibilidade e liquidez.'

  resultado.value = {
    custoCompra, custoAluguel, melhorOpcao: melhor,
    vantagem: `Economia de ${fmtBRL(diff)}`, mensagem,
    parcelaMedia: parcela, patrimonioFinal: patrimonioImovel, retornoInvestimento: retorno,
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

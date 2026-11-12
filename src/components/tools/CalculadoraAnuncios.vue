<template>
  <ToolShell
    title="Calculadora de Anúncios"
    description="Calcule ROI, CPC, CPM, CTR e métricas de performance para campanhas de anúncios pagos."
    icon="fa-bullhorn"
    icon-gradient="from-orange-500 to-red-600"
    orb-color="orange"
    :quick-tips="['ROI de campanha', 'CPM, CPC e CTR', 'Análise de conversão']"
    :tips="[
      { title: 'CPM vs CPC', text: 'CPM é o custo por mil impressões — ideal para brand awareness. CPC é o custo por clique — melhor para conversões diretas.', type: 'info' },
      { title: 'CTR médio do mercado', text: 'Google Search: 2–10%. Display: 0,1–0,5%. Facebook: 0,9–1,5%. Abaixo disso, revise os criativos e segmentação.', type: 'warning' },
      { title: 'ROI saudável', text: 'ROI acima de 100% significa dobrar o investimento. Acima de 300% é excelente. ROI negativo exige revisão urgente da estratégia.', type: 'success' },
    ]"
    :examples="[
      { title: 'E-commerce', desc: 'R$ 2.000 investidos, 100 conversões, ticket R$ 80', result: 'ROI: 300%, CPA: R$ 20, Lucro: R$ 6.000' },
      { title: 'Google Ads B2B', desc: 'R$ 5.000, 50.000 impressões, 1.000 cliques, 30 conversões', result: 'CTR: 2%, CPC: R$ 5, CPL: R$ 167' },
      { title: 'Facebook Remarketing', desc: 'R$ 500, 20.000 impressões, 400 cliques, 20 vendas de R$ 50', result: 'ROAS: 2x, ROI: 100%' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="tool-body !mb-0 space-y-4">
        <div>
          <label class="input-aurora-label">
            <i class="fas fa-cogs mr-1.5 text-orange-500"></i>
            Tipo de Análise
          </label>
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="modo = 'roi'"
              :class="['p-3 rounded-xl border-2 transition-all text-sm font-semibold', modo === 'roi' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-400 hover:border-orange-300']"
            >
              <i class="fas fa-chart-line block mb-1 text-lg"></i>
              ROI e Conversão
            </button>
            <button
              @click="modo = 'metricas'"
              :class="['p-3 rounded-xl border-2 transition-all text-sm font-semibold', modo === 'metricas' ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300' : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-400 hover:border-orange-300']"
            >
              <i class="fas fa-chart-bar block mb-1 text-lg"></i>
              Métricas Detalhadas
            </button>
          </div>
        </div>

        <div v-if="modo === 'roi'" class="space-y-3">
          <BaseInput v-model="investimento" label="Investimento Total (R$)" type="number" :min="0" step="0.01" icon="fa-dollar-sign" tooltip="Valor total gasto na campanha de anúncios." />
          <BaseInput v-model="conversoes" label="Número de Conversões" type="number" :min="0" icon="fa-shopping-cart" tooltip="Quantidade de vendas, leads ou objetivos atingidos." />
          <BaseInput v-model="ticketMedio" label="Ticket Médio por Venda (R$)" type="number" :min="0" step="0.01" icon="fa-money-bill" tooltip="Valor médio de cada conversão ou venda." />
        </div>

        <div v-if="modo === 'metricas'" class="space-y-3">
          <BaseInput v-model="investimento" label="Investimento Total (R$)" type="number" :min="0" step="0.01" icon="fa-dollar-sign" />
          <BaseInput v-model="impressoes" label="Impressões" type="number" :min="0" icon="fa-eye" tooltip="Total de vezes que o anúncio foi exibido." />
          <BaseInput v-model="cliques" label="Cliques" type="number" :min="0" icon="fa-mouse-pointer" tooltip="Total de cliques no anúncio." />
          <BaseInput v-model="conversoes" label="Conversões" type="number" :min="0" icon="fa-check-circle" />
          <BaseInput v-model="faturamento" label="Faturamento Gerado (R$)" type="number" :min="0" step="0.01" icon="fa-chart-line" />
        </div>

        <div class="flex gap-3">
          <BaseButton variant="primary" icon="fa-calculator" @click="calcular" class="flex-1">
            Calcular Resultados
          </BaseButton>
          <BaseButton variant="outline" icon="fa-eraser" @click="limpar" />
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ resultado.titulo }}</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.valorPrincipal }}</p>
              <p class="text-orange-300 text-sm font-semibold">{{ resultado.subtitulo }}</p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div v-for="metrica in resultado.metricas" :key="metrica.label" class="metric-glass">
                <span class="metric-glass-value" :class="metrica.cor">{{ metrica.valor }}</span>
                <span class="metric-glass-label">{{ metrica.label }}</span>
              </div>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-orange-500"></i>
                Análise Detalhada
              </h4>
              <div class="space-y-1.5 text-sm">
                <div v-for="item in resultado.detalhes" :key="item.label"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ item.label }}</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ item.valor }}</span>
                </div>
              </div>
            </div>

            <div :class="resultado.performance === 'Excelente' ? 'tip-card-success' : resultado.performance === 'Ruim' ? 'tip-card-warning' : 'tip-card'">
              <i :class="['fas flex-shrink-0 mt-0.5', resultado.performance === 'Excelente' ? 'fa-check-circle text-emerald-500' : resultado.performance === 'Bom' ? 'fa-thumbs-up text-blue-500' : resultado.performance === 'Regular' ? 'fa-exclamation-triangle text-amber-500' : 'fa-times-circle text-red-500']"></i>
              <div>
                <strong class="block mb-0.5 text-xs">Performance: {{ resultado.performance }}</strong>
                <span class="text-xs">{{ resultado.recomendacao }}</span>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-bullhorn text-4xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Preencha os dados da campanha para ver as métricas</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref } from 'vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import Swal from 'sweetalert2'

const modo = ref('roi')
const investimento = ref(1000)
const conversoes = ref(50)
const ticketMedio = ref(100)
const impressoes = ref(50000)
const cliques = ref(1000)
const faturamento = ref(5000)

const resultado = ref(null)

const calcular = () => {
  const invest = Number(investimento.value)
  const conv = Number(conversoes.value)

  if (invest <= 0) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Digite o investimento', confirmButtonColor: '#2563eb' })
    return
  }

  if (modo.value === 'roi') {
    const ticket = Number(ticketMedio.value)

    if (conv <= 0 || ticket <= 0) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha todos os campos', confirmButtonColor: '#2563eb' })
      return
    }

    const receitaTotal = conv * ticket
    const lucro = receitaTotal - invest
    const roi = ((lucro / invest) * 100).toFixed(2)
    const cpa = (invest / conv).toFixed(2)

    let performance = 'Ruim'
    let recomendacao = 'ROI negativo. Revise estratégia de anúncios.'

    if (Number(roi) >= 300) {
      performance = 'Excelente'
      recomendacao = 'Campanha muito lucrativa! Considere aumentar o investimento.'
    } else if (Number(roi) >= 150) {
      performance = 'Bom'
      recomendacao = 'Bom retorno. Otimize para melhorar ainda mais.'
    } else if (Number(roi) >= 50) {
      performance = 'Regular'
      recomendacao = 'Retorno moderado. Teste novas segmentações.'
    }

    const dicas = []
    if (Number(cpa) > ticket * 0.3) dicas.push('CPA alto - otimize palavras-chave e segmentação')
    if (Number(roi) < 100) dicas.push('Teste diferentes criativos e públicos')
    dicas.push('Monitore métricas diariamente para ajustes rápidos')

    resultado.value = {
      titulo: 'ROI da Campanha',
      valorPrincipal: `${roi}%`,
      subtitulo: `Lucro: R$ ${lucro.toFixed(2)}`,
      metricas: [
        { label: 'Investimento', valor: `R$ ${invest.toFixed(2)}`, cor: 'text-orange-600 dark:text-orange-400' },
        { label: 'Receita', valor: `R$ ${receitaTotal.toFixed(2)}`, cor: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'CPA', valor: `R$ ${cpa}`, cor: 'text-blue-600 dark:text-blue-400' },
        { label: 'Conversões', valor: conv, cor: 'text-purple-600 dark:text-purple-400' },
      ],
      detalhes: [
        { label: 'Investimento Total', valor: `R$ ${invest.toFixed(2)}` },
        { label: 'Número de Conversões', valor: conv },
        { label: 'Ticket Médio', valor: `R$ ${ticket.toFixed(2)}` },
        { label: 'Receita Total', valor: `R$ ${receitaTotal.toFixed(2)}` },
        { label: 'Lucro Líquido', valor: `R$ ${lucro.toFixed(2)}` },
        { label: 'ROI', valor: `${roi}%` },
        { label: 'Custo por Aquisição', valor: `R$ ${cpa}` },
      ],
      performance,
      recomendacao,
      dicas,
    }
  } else {
    const impr = Number(impressoes.value)
    const clicks = Number(cliques.value)
    const fat = Number(faturamento.value)

    if (impr <= 0 || clicks <= 0 || conv <= 0 || fat <= 0) {
      Swal.fire({ icon: 'error', title: 'Erro', text: 'Preencha todos os campos', confirmButtonColor: '#2563eb' })
      return
    }

    const ctr = ((clicks / impr) * 100).toFixed(2)
    const taxaConversao = ((conv / clicks) * 100).toFixed(2)
    const cpc = (invest / clicks).toFixed(2)
    const cpm = ((invest / impr) * 1000).toFixed(2)
    const cpa = (invest / conv).toFixed(2)
    const lucro = fat - invest
    const roi = ((lucro / invest) * 100).toFixed(2)

    let performance = 'Ruim'
    let recomendacao = 'Métricas abaixo do esperado.'

    if (Number(roi) >= 200 && Number(ctr) >= 2 && Number(taxaConversao) >= 3) {
      performance = 'Excelente'
      recomendacao = 'Todas as métricas em níveis ótimos!'
    } else if (Number(roi) >= 100 && Number(ctr) >= 1) {
      performance = 'Bom'
      recomendacao = 'Boas métricas. Continue otimizando.'
    } else if (Number(roi) >= 0) {
      performance = 'Regular'
      recomendacao = 'Campanha equilibrada. Há espaço para melhorias.'
    }

    resultado.value = {
      titulo: 'ROI da Campanha',
      valorPrincipal: `${roi}%`,
      subtitulo: `Lucro: R$ ${lucro.toFixed(2)}`,
      metricas: [
        { label: 'CTR', valor: `${ctr}%`, cor: 'text-blue-600 dark:text-blue-400' },
        { label: 'Taxa Conv.', valor: `${taxaConversao}%`, cor: 'text-emerald-600 dark:text-emerald-400' },
        { label: 'CPC', valor: `R$ ${cpc}`, cor: 'text-orange-600 dark:text-orange-400' },
        { label: 'CPA', valor: `R$ ${cpa}`, cor: 'text-purple-600 dark:text-purple-400' },
      ],
      detalhes: [
        { label: 'Impressões', valor: impr.toLocaleString('pt-BR') },
        { label: 'Cliques', valor: clicks.toLocaleString('pt-BR') },
        { label: 'CTR', valor: `${ctr}%` },
        { label: 'Conversões', valor: conv },
        { label: 'Taxa de Conversão', valor: `${taxaConversao}%` },
        { label: 'CPC', valor: `R$ ${cpc}` },
        { label: 'CPM', valor: `R$ ${cpm}` },
        { label: 'CPA', valor: `R$ ${cpa}` },
        { label: 'Faturamento', valor: `R$ ${fat.toFixed(2)}` },
        { label: 'ROI', valor: `${roi}%` },
      ],
      performance,
      recomendacao,
    }
  }
}

const limpar = () => {
  investimento.value = 1000
  conversoes.value = 50
  ticketMedio.value = 100
  impressoes.value = 50000
  cliques.value = 1000
  faturamento.value = 5000
  resultado.value = null
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

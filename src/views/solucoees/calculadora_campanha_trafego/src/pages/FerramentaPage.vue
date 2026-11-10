<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useHead } from '@unhead/vue'
import { RouterLink } from 'vue-router'
import jsPDF from 'jspdf'
import AppTooltip from '@/components/ui/AppTooltip.vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'
import LoadingOverlay from '@/components/ui/LoadingOverlay.vue'
import { alertaSucesso, alertaErro, alertaInfo, alertaConfirmacao } from '@/utils/alertas'
import {
  calcularCampanha,
  parametrosValidos,
  recomendacaoPorRoi,
  formatarMoeda,
  formatarNumero,
  type ResultadosCampanha,
} from '@/utils/calculoTrafego'

useHead({
  title: 'Calculadora de Tráfego Pago — Simule ROI Grátis | 3W Online',
  meta: [
    { name: 'description', content: 'Calcule ROI, CPC, CTR e conversões de campanhas de tráfego pago. Gere orçamentos profissionais em PDF gratuitamente.' },
  ],
})

const breadcrumb = [
  { label: 'Início', to: '/' },
  { label: 'Ferramenta' },
]

const canais = [
  { valor: 'google-ads', label: 'Google Ads' },
  { valor: 'meta-ads', label: 'Meta Ads (Facebook/Instagram)' },
  { valor: 'linkedin-ads', label: 'LinkedIn Ads' },
  { valor: 'tiktok-ads', label: 'TikTok Ads' },
  { valor: 'youtube-ads', label: 'YouTube Ads' },
]

const inputs = reactive({
  orcamento: 10000,
  cpc: 4.0,
  ctr: 2.5,
  taxaConversao: 3.0,
  ticketMedio: 500,
  metaFaturamento: 35000,
  canal: 'google-ads',
  nomeCliente: '',
  emailCliente: '',
  nomeAgencia: 'Sua Agência',
})

const resultados = ref<ResultadosCampanha | null>(null)
const mostrarResultados = ref(false)
const carregando = ref(false)

function calcular() {
  if (!parametrosValidos(inputs)) {
    alertaErro('Dados inválidos', 'Preencha todos os campos numéricos com valores maiores que zero.')
    return
  }

  resultados.value = calcularCampanha(inputs)
  mostrarResultados.value = true
  alertaSucesso('Cálculo realizado!', 'Seus resultados estão prontos. Veja abaixo as projeções.')
}

async function reiniciar() {
  const confirmar = await alertaConfirmacao('Nova simulação', 'Deseja limpar os resultados atuais e fazer uma nova simulação?')
  if (confirmar) {
    mostrarResultados.value = false
    resultados.value = null
    alertaInfo('Calculadora reiniciada', 'Você pode fazer uma nova simulação.')
  }
}

function gerarPDF() {
  if (!resultados.value) return

  carregando.value = true

  setTimeout(() => {
    try {
      const doc = new jsPDF()
      const canalLabel = canais.find((c) => c.valor === inputs.canal)?.label || inputs.canal
      const r = resultados.value!

      doc.setFillColor(79, 70, 229)
      doc.rect(0, 0, 210, 35, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(22)
      doc.text('Orçamento de Tráfego Pago', 20, 22)
      doc.setFontSize(10)
      doc.text('Gerado pela Calculadora de Campanha de Tráfego — 3W Online', 20, 30)

      doc.setTextColor(0, 0, 0)

      doc.setFontSize(14)
      doc.text('Informações do Cliente', 20, 50)
      doc.setFontSize(11)
      doc.text(`Cliente: ${inputs.nomeCliente || 'Cliente'}`, 25, 60)
      doc.text(`Email: ${inputs.emailCliente || 'N/A'}`, 25, 67)
      doc.text(`Agência: ${inputs.nomeAgencia}`, 25, 74)
      doc.text(`Canal: ${canalLabel}`, 25, 81)
      doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 25, 88)

      doc.setFontSize(14)
      doc.text('Parâmetros da Campanha', 20, 105)
      doc.setFontSize(11)
      doc.text(`• Orçamento Total: ${formatarMoeda(inputs.orcamento)}`, 25, 115)
      doc.text(`• CPC Médio: ${formatarMoeda(inputs.cpc)}`, 25, 122)
      doc.text(`• CTR Esperado: ${inputs.ctr}%`, 25, 129)
      doc.text(`• Taxa de Conversão: ${inputs.taxaConversao}%`, 25, 136)
      doc.text(`• Ticket Médio: ${formatarMoeda(inputs.ticketMedio)}`, 25, 143)

      doc.setFontSize(14)
      doc.text('Resultados Projetados', 20, 160)
      doc.setFontSize(11)
      doc.text(`• Impressões Estimadas: ${formatarNumero(r.impressoes)}`, 25, 170)
      doc.text(`• Cliques Estimados: ${formatarNumero(r.cliques)}`, 25, 177)
      doc.text(`• Conversões Estimadas: ${r.conversoes}`, 25, 184)
      doc.text(`• Custo por Conversão: ${formatarMoeda(r.custoConversao)}`, 25, 191)
      doc.text(`• Receita Estimada: ${formatarMoeda(r.receita)}`, 25, 198)
      doc.text(`• ROI Projetado: ${r.roi > 0 ? '+' : ''}${r.roi.toFixed(1)}%`, 25, 205)

      doc.setFontSize(14)
      doc.text('Recomendações', 20, 222)
      doc.setFontSize(11)
      doc.text(recomendacaoPorRoi(r.roi), 25, 232)
      doc.text('• Monitore métricas semanalmente', 25, 242)
      doc.text('• Teste diferentes criativos e audiências', 25, 249)
      doc.text('• Ajuste lances com base na performance', 25, 256)

      doc.setFontSize(9)
      doc.setTextColor(128, 128, 128)
      doc.text('Este orçamento é uma estimativa. Resultados reais podem variar.', 20, 275)
      doc.text('Desenvolvido por 3W Online — www.3wonline.com.br', 20, 282)

      const nomeArquivo = `orcamento-trafego-${inputs.nomeCliente || 'cliente'}-${new Date().toISOString().slice(0, 10)}.pdf`
      doc.save(nomeArquivo)
      alertaSucesso('PDF gerado!', `O orçamento "${nomeArquivo}" foi baixado com sucesso.`)
    } catch {
      alertaErro('Erro ao gerar PDF', 'Ocorreu um erro inesperado. Tente novamente.')
    } finally {
      carregando.value = false
    }
  }, 500)
}

function ajudaCampo(texto: string) {
  alertaInfo('Ajuda', texto)
}
</script>

<template>
  <LoadingOverlay :visivel="carregando" />

  <section class="gradient-hero py-10">
    <div class="container-app flex flex-col sm:flex-row items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center">
          <i class="fa-solid fa-calculator text-white text-xl"></i>
        </div>
        <div>
          <h1 class="text-xl md:text-2xl font-black text-white">Calculadora de Tráfego Pago</h1>
          <p class="text-sm text-white/70">Simule ROI e gere orçamentos profissionais</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <button v-if="mostrarResultados" id="btn-baixar-pdf-header" class="btn bg-white text-primary-700 font-bold shadow-card hover:shadow-floating btn-sm" @click="gerarPDF">
          <i class="fa-solid fa-file-pdf"></i>
          Baixar PDF
        </button>
        <RouterLink to="/" class="btn bg-white/10 text-white border border-white/20 hover:bg-white/20 btn-sm">
          <i class="fa-solid fa-arrow-left"></i>
          Voltar
        </RouterLink>
      </div>
    </div>
  </section>

  <AppBreadcrumb :items="breadcrumb" />

  <section class="section gradient-card">
    <div class="container-app">
      <div class="grid lg:grid-cols-2 gap-8">
        <div class="space-y-6">
          <div class="card p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <i class="fa-solid fa-sliders text-white"></i>
              </div>
              <div>
                <h2 class="font-bold text-gray-900 dark:text-white">Parâmetros da Campanha</h2>
                <p class="text-xs text-gray-500 dark:text-gray-400">Insira os dados para calcular o ROI estimado</p>
              </div>
              <button class="ml-auto w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-600 dark:text-primary-400 flex items-center justify-center hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors" aria-label="Ajuda sobre parâmetros" @click="ajudaCampo('Preencha os parâmetros de campanha para obter projeções de desempenho. Use dados reais do seu nicho para resultados mais precisos.')">
                <i class="fa-solid fa-circle-question text-sm"></i>
              </button>
            </div>

            <div class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label flex items-center gap-1.5" for="orcamento">
                    Orçamento Total (R$)
                    <AppTooltip texto="Valor total investido na campanha">
                      <i class="fa-solid fa-circle-info text-primary-400 text-xs cursor-help"></i>
                    </AppTooltip>
                  </label>
                  <input id="orcamento" v-model.number="inputs.orcamento" type="number" class="input-field" placeholder="10000" autocomplete="off" min="0" />
                </div>
                <div>
                  <label class="label flex items-center gap-1.5" for="cpc">
                    CPC Médio (R$)
                    <AppTooltip texto="Custo por clique médio do canal">
                      <i class="fa-solid fa-circle-info text-primary-400 text-xs cursor-help"></i>
                    </AppTooltip>
                  </label>
                  <input id="cpc" v-model.number="inputs.cpc" type="number" step="0.01" class="input-field" placeholder="4.00" autocomplete="off" min="0" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label flex items-center gap-1.5" for="ctr">
                    CTR Esperado (%)
                    <AppTooltip texto="Taxa de cliques: % de impressões que viram cliques">
                      <i class="fa-solid fa-circle-info text-primary-400 text-xs cursor-help"></i>
                    </AppTooltip>
                  </label>
                  <input id="ctr" v-model.number="inputs.ctr" type="number" step="0.1" class="input-field" placeholder="2.5" autocomplete="off" min="0" max="100" />
                </div>
                <div>
                  <label class="label flex items-center gap-1.5" for="taxaConversao">
                    Taxa de Conversão (%)
                    <AppTooltip texto="% de cliques que geram uma conversão/venda">
                      <i class="fa-solid fa-circle-info text-primary-400 text-xs cursor-help"></i>
                    </AppTooltip>
                  </label>
                  <input id="taxaConversao" v-model.number="inputs.taxaConversao" type="number" step="0.1" class="input-field" placeholder="3.0" autocomplete="off" min="0" max="100" />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="label flex items-center gap-1.5" for="ticketMedio">
                    Ticket Médio (R$)
                    <AppTooltip texto="Valor médio de cada venda/contrato">
                      <i class="fa-solid fa-circle-info text-primary-400 text-xs cursor-help"></i>
                    </AppTooltip>
                  </label>
                  <input id="ticketMedio" v-model.number="inputs.ticketMedio" type="number" class="input-field" placeholder="500" autocomplete="off" min="0" />
                </div>
                <div>
                  <label class="label" for="canal">Canal de Tráfego</label>
                  <select id="canal" v-model="inputs.canal" class="input-field" autocomplete="off">
                    <option v-for="c in canais" :key="c.valor" :value="c.valor">{{ c.label }}</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="label flex items-center gap-1.5" for="metaFaturamento">
                  Meta de Faturamento (R$)
                  <AppTooltip texto="Receita desejada — campo opcional para referência">
                    <i class="fa-solid fa-circle-info text-primary-400 text-xs cursor-help"></i>
                  </AppTooltip>
                  <span class="text-xs text-gray-400 font-normal">(opcional)</span>
                </label>
                <input id="metaFaturamento" v-model.number="inputs.metaFaturamento" type="number" class="input-field" placeholder="35000" autocomplete="off" min="0" />
              </div>
            </div>
          </div>

          <div class="card p-6">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-10 h-10 bg-accent-100 dark:bg-accent-900/50 rounded-xl flex items-center justify-center">
                <i class="fa-solid fa-user-tie text-accent-600 dark:text-accent-400"></i>
              </div>
              <div>
                <h2 class="font-bold text-gray-900 dark:text-white">Dados do Cliente</h2>
                <p class="text-xs text-gray-500 dark:text-gray-400">Para gerar orçamento personalizado (opcional)</p>
              </div>
              <button class="ml-auto w-8 h-8 rounded-full bg-accent-100 dark:bg-accent-900/50 text-accent-600 dark:text-accent-400 flex items-center justify-center hover:bg-accent-200 dark:hover:bg-accent-800 transition-colors" aria-label="Ajuda sobre dados do cliente" @click="ajudaCampo('Preencha os dados do cliente para personalizar o PDF do orçamento. Campos opcionais.')">
                <i class="fa-solid fa-circle-question text-sm"></i>
              </button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="label" for="nomeCliente">Nome do Cliente</label>
                <input id="nomeCliente" v-model="inputs.nomeCliente" type="text" class="input-field" placeholder="Empresa ABC Ltda" autocomplete="off" />
              </div>
              <div>
                <label class="label" for="emailCliente">Email do Cliente</label>
                <input id="emailCliente" v-model="inputs.emailCliente" type="email" class="input-field" placeholder="contato@empresa.com" autocomplete="off" />
              </div>
              <div>
                <label class="label" for="nomeAgencia">Nome da sua Agência</label>
                <input id="nomeAgencia" v-model="inputs.nomeAgencia" type="text" class="input-field" placeholder="Sua Agência Digital" autocomplete="off" />
              </div>
            </div>
          </div>

          <div class="flex gap-4">
            <button id="btn-calcular-roi" class="btn-cta flex-1" @click="calcular">
              <i class="fa-solid fa-calculator"></i>
              Calcular ROI
            </button>
            <button v-if="mostrarResultados" id="btn-nova-simulacao" class="btn-outline" @click="reiniciar">
              <i class="fa-solid fa-rotate"></i>
              Nova
            </button>
          </div>
        </div>

        <div class="space-y-6">
          <template v-if="mostrarResultados && resultados">
            <div class="card p-6 shadow-floating ring-1 ring-primary-200 dark:ring-primary-800 animate-scale-in">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-10 h-10 bg-success-100 dark:bg-success-900/50 rounded-xl flex items-center justify-center">
                  <i class="fa-solid fa-chart-line text-success-600 dark:text-success-400"></i>
                </div>
                <div>
                  <h2 class="font-bold text-gray-900 dark:text-white">Resultados da Simulação</h2>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Projeções baseadas nos parâmetros informados</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 text-center">
                  <i class="fa-solid fa-mouse-pointer text-primary-500 text-xl mb-2"></i>
                  <div class="text-2xl font-black text-primary-700 dark:text-primary-300">{{ formatarNumero(resultados.cliques) }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Cliques Estimados</div>
                </div>
                <div class="bg-accent-50 dark:bg-accent-900/30 rounded-xl p-4 text-center">
                  <i class="fa-solid fa-bullseye text-accent-500 text-xl mb-2"></i>
                  <div class="text-2xl font-black text-accent-700 dark:text-accent-300">{{ resultados.conversoes }}</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">Conversões</div>
                </div>
              </div>

              <div class="divider"></div>

              <div class="space-y-3">
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Impressões Estimadas</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ formatarNumero(resultados.impressoes) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Custo por Conversão</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ formatarMoeda(resultados.custoConversao) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Receita Estimada</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ formatarMoeda(resultados.receita) }}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-sm text-gray-500 dark:text-gray-400">Ponto de Equilíbrio</span>
                  <span class="font-semibold text-gray-900 dark:text-white">{{ resultados.pontoEquilibrio }} vendas</span>
                </div>
              </div>

              <div class="divider"></div>

              <div :class="['rounded-xl p-5 text-center', resultados.roi >= 0 ? 'bg-success-50 dark:bg-success-900/30' : 'bg-red-50 dark:bg-red-900/30']">
                <div class="text-sm font-medium mb-1" :class="resultados.roi >= 0 ? 'text-success-600 dark:text-success-400' : 'text-red-600 dark:text-red-400'">
                  ROI Projetado
                </div>
                <div class="text-4xl font-black" :class="resultados.roi >= 0 ? 'text-success-700 dark:text-success-300' : 'text-red-700 dark:text-red-300'">
                  {{ resultados.roi > 0 ? '+' : '' }}{{ resultados.roi.toFixed(1) }}%
                </div>
              </div>
            </div>

            <button id="btn-baixar-pdf" class="btn-success w-full btn-lg" @click="gerarPDF">
              <i class="fa-solid fa-file-pdf"></i>
              Baixar Orçamento em PDF
              <i class="fa-solid fa-download"></i>
            </button>
          </template>

          <div v-else class="card p-8 text-center">
            <div class="w-20 h-20 bg-primary-100 dark:bg-primary-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <i class="fa-solid fa-chart-column text-primary-500 text-3xl"></i>
            </div>
            <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Seus resultados aparecerão aqui</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Preencha os parâmetros da campanha ao lado e clique em "Calcular ROI" para ver as projeções detalhadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

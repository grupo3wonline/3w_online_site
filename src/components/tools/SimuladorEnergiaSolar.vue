<template>
  <ToolShell
    title="Simulador de Energia Solar"
    description="Estime a economia com energia solar fotovoltaica residencial ou comercial."
    icon="fa-sun"
    icon-gradient="from-yellow-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['Payback 4–7 anos', 'Geração ~130 kWh/kWp', 'ROI em 25 anos']"
    :tips="[
      { title: 'Payback médio no Brasil', text: 'O retorno do investimento em energia solar no Brasil é de 4 a 7 anos, dependendo da região e do consumo.', type: 'info' },
      { title: 'Geração por painel', text: 'Cada kWp instalado gera aproximadamente 100–130 kWh/mês dependendo da região e irradiação solar local.' },
      { title: 'Valorização do imóvel', text: 'Imóveis com energia solar se valorizam entre 5% e 8% — além do IPTU Verde em vários municípios.', type: 'success' },
    ]"
    :examples="[
      { title: 'Residência 500 kWh/mês', desc: 'Sistema 5 kWp, tarifa R$ 0,85, custo R$ 25.000', result: 'Payback ~6 anos, economia de R$ 85.000 em 25 anos' },
      { title: 'Comércio 1500 kWh/mês', desc: 'Sistema 12 kWp, tarifa R$ 0,95, custo R$ 55.000', result: 'Payback ~5 anos, ROI superior a 300%' },
      { title: 'Pequena empresa', desc: 'Sistema 8 kWp, conta de R$ 1.200/mês', result: 'Economia de R$ 900/mês após a instalação' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="consumoMensal"
                label="Consumo Mensal (kWh)"
                type="number" :min="0" step="50"
                icon="fa-bolt"
                placeholder="500"
                tooltip="Consumo médio mensal em kWh. Encontre na sua conta de energia elétrica."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="tarifaEnergia"
                label="Tarifa (R$/kWh)"
                type="number" step="0.01"
                icon="fa-dollar-sign"
                placeholder="0.85"
                tooltip="Valor cobrado por kWh na sua conta de energia. Veja na fatura."
                @input="calcularAuto"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="potenciaSistema"
                label="Potência (kWp)"
                type="number" step="0.5"
                icon="fa-solar-panel"
                placeholder="5"
                tooltip="Potência total do sistema fotovoltaico a ser instalado."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="custoInstalacao"
                label="Custo Instalação (R$)"
                type="number" :min="0" step="1000"
                icon="fa-tag"
                placeholder="25000"
                tooltip="Custo total da instalação do sistema solar, incluindo painéis, inversor e mão de obra."
                @input="calcularAuto"
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="taxaAumento"
                label="Aumento Tarifa (%/ano)"
                type="number" step="0.5"
                icon="fa-chart-line"
                placeholder="5"
                hint="Histórico médio ~5-8% a.a."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="degradacao"
                label="Degradação (%/ano)"
                type="number" step="0.1"
                icon="fa-arrow-down"
                placeholder="0.5"
                hint="Perda eficiência anual ~0,5%"
                @input="calcularAuto"
              />
            </div>
          </div>

          <!-- Prévia dos cálculos -->
          <div class="grid grid-cols-2 gap-3 mt-4">
            <div class="glass-panel p-3 text-center">
              <div class="text-xs text-gray-500 dark:text-slate-400 mb-0.5">Geração Estimada</div>
              <div class="font-black text-amber-600 dark:text-amber-400 text-base">{{ geracaoMensal }} kWh/mês</div>
            </div>
            <div class="glass-panel p-3 text-center">
              <div class="text-xs text-gray-500 dark:text-slate-400 mb-0.5">Economia Mensal</div>
              <div class="font-black text-emerald-600 dark:text-emerald-400 text-base">R$ {{ economiaMensal }}</div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-solar-panel" @click="calcular" class="flex-1">
              Calcular Retorno
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Destaque principal -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Payback do Investimento</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.paybackAnos }} <span class="text-2xl font-semibold">anos</span></p>
              <p class="text-amber-300 text-sm font-semibold">
                <i class="fas fa-sync-alt mr-1"></i>
                {{ resultado.paybackMeses }} meses · ROI 25a: {{ resultado.roi }}%
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.economia5Anos }}</div>
                <div class="metric-glass-label">Economia 5 anos</div>
              </div>
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.economia10Anos }}</div>
                <div class="metric-glass-label">Economia 10 anos</div>
              </div>
              <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
                <div class="metric-glass-value text-amber-600 dark:text-amber-400">R$ {{ resultado.economia25Anos }}</div>
                <div class="metric-glass-label">Economia 25 anos</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ percentualReducao }}%</div>
                <div class="metric-glass-label">Redução na conta</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-leaf text-emerald-500"></i>
                Impacto Ambiental (25 anos)
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">CO₂ evitado</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ resultado.co2Evitado }} ton</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">Árvores equivalentes</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ resultado.arvores }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Energia total gerada</span>
                  <span class="font-bold text-blue-600 dark:text-blue-400">{{ resultado.energiaTotal }} MWh</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-sun text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Economia no ano 1: <strong>R$ {{ resultado.economiaAno1 }}</strong> · Ano 10: <strong>R$ {{ resultado.economiaAno10 }}</strong> · Ano 25: <strong>R$ {{ resultado.economiaAno25 }}</strong>
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-sun text-4xl mb-3 opacity-30 block text-amber-400"></i>
          <p class="text-sm">Preencha os dados para simular o retorno do investimento solar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const consumoMensal    = ref(500)
const tarifaEnergia    = ref(0.85)
const potenciaSistema  = ref(5)
const custoInstalacao  = ref(25000)
const taxaAumento      = ref(5)
const degradacao       = ref(0.5)
const resultado        = ref(null)

const geracaoMensal = computed(() => (Number(potenciaSistema.value) * 130).toFixed(0))

const economiaMensal = computed(() => {
  const geracao = Number(geracaoMensal.value)
  const consumo = Number(consumoMensal.value)
  return (Math.min(geracao, consumo) * Number(tarifaEnergia.value)).toFixed(2)
})

const percentualReducao = computed(() => {
  const geracao = Number(geracaoMensal.value)
  const consumo = Number(consumoMensal.value)
  if (!consumo) return 0
  return ((Math.min(geracao, consumo) / consumo) * 100).toFixed(0)
})

function calcular() {
  const custo = Number(custoInstalacao.value)
  if (!custo) { Swal.fire({ icon: 'warning', title: 'Informe o custo de instalação', confirmButtonColor: '#2563eb' }); return }

  const economiaInicial = Number(economiaMensal.value)
  const taxaAnual       = Number(taxaAumento.value) / 100
  const degradacaoAnual = Number(degradacao.value) / 100

  let economiaAcumulada = 0, paybackAnos = 0
  let economia5 = 0, economia10 = 0, economia25 = 0
  let economiaAno1 = 0, economiaAno10 = 0, economiaAno25 = 0

  for (let ano = 1; ano <= 25; ano++) {
    const fatorTarifa     = Math.pow(1 + taxaAnual, ano - 1)
    const fatorDegradacao = Math.pow(1 - degradacaoAnual, ano - 1)
    const economiaAnual   = economiaInicial * 12 * fatorTarifa * fatorDegradacao
    economiaAcumulada += economiaAnual
    if (economiaAcumulada >= custo && paybackAnos === 0) paybackAnos = ano
    if (ano === 1)  economiaAno1  = economiaAnual
    if (ano === 5)  economia5     = economiaAcumulada
    if (ano === 10) { economia10 = economiaAcumulada; economiaAno10 = economiaAnual }
    if (ano === 25) { economia25 = economiaAcumulada; economiaAno25 = economiaAnual }
  }

  const roi = ((economia25 / custo - 1) * 100)
  const energiaTotalKwh = Number(geracaoMensal.value) * 12 * 25

  resultado.value = {
    paybackAnos:    paybackAnos.toFixed(1),
    paybackMeses:   paybackAnos * 12,
    economia5Anos:  economia5.toFixed(2),
    economia10Anos: economia10.toFixed(2),
    economia25Anos: economia25.toFixed(2),
    economiaAno1:   economiaAno1.toFixed(2),
    economiaAno10:  economiaAno10.toFixed(2),
    economiaAno25:  economiaAno25.toFixed(2),
    roi:            roi.toFixed(0),
    co2Evitado:     (energiaTotalKwh * 0.0008).toFixed(1),
    arvores:        Math.round((energiaTotalKwh * 0.0008) / 0.021),
    energiaTotal:   (energiaTotalKwh / 1000).toFixed(1),
  }
}

function calcularAuto() {
  if (consumoMensal.value && tarifaEnergia.value && potenciaSistema.value && custoInstalacao.value) calcular()
}

function limpar() {
  consumoMensal.value = 500; tarifaEnergia.value = 0.85; potenciaSistema.value = 5
  custoInstalacao.value = 25000; taxaAumento.value = 5; degradacao.value = 0.5
  resultado.value = null
}

calcularAuto()
watch([consumoMensal, tarifaEnergia, potenciaSistema, custoInstalacao, taxaAumento, degradacao], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

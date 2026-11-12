<template>
  <ToolShell
    title="Simulador Tesouro Direto"
    description="Simule investimentos no Tesouro Direto: Tesouro Selic, IPCA+ e Prefixado com IR regressivo."
    icon="fa-landmark-flag"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Mínimo R$ 30', 'IR regressivo até 15%', 'Garantido pelo Tesouro Nacional']"
    :tips="[
      { title: 'Tesouro Selic', text: 'Menor risco, liquidez diária, ideal para reserva de emergência. Rende 100% da Selic, sem volatilidade de preço.', type: 'info' },
      { title: 'Tesouro IPCA+', text: 'Protege contra a inflação com taxa real fixa. Ideal para aposentadoria e objetivos de longo prazo (+5 anos).' },
      { title: 'IR Regressivo', text: 'Quanto mais tempo investe, menos IR paga: 22,5% (até 180d), 20% (181-360d), 17,5% (361-720d), 15% (acima de 720 dias).', type: 'success' },
    ]"
    :examples="[
      { title: 'Tesouro Selic, 2 anos', desc: 'R$ 1.000 + R$ 500/mês, Selic 13,25%', result: 'Líquido: ~R$ 14.800 (IR 15%, 2+ anos)' },
      { title: 'IPCA+ 6%, 5 anos', desc: 'R$ 5.000 + R$ 300/mês, IPCA 4,5%', result: 'Bruto: ~R$ 32.000 | Líquido (IR 15%): ~R$ 29.400' },
      { title: 'Prefixado 12% a.a., 3 anos', desc: 'R$ 10.000, sem aportes mensais', result: 'Líquido (IR 15%): ~R$ 13.580' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <!-- Tipo de Título -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-landmark-flag mr-1.5 text-emerald-500"></i>
                Tipo de Título
              </label>
              <div class="grid grid-cols-3 gap-2 mt-1">
                <button
                  v-for="tipo in tiposTitulo" :key="tipo.value"
                  @click="tipoTitulo = tipo.value; calcularAuto()"
                  :class="['p-2.5 rounded-xl border-2 text-sm transition-all text-center', tipoTitulo === tipo.value ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <i :class="['fas', tipo.icon, 'text-lg mb-1 block', tipoTitulo === tipo.value ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400']"></i>
                  <div class="font-bold text-xs">{{ tipo.label }}</div>
                  <div class="text-[9px] opacity-70">{{ tipo.desc }}</div>
                </button>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="valorInicial"
                label="Valor Inicial (R$)"
                type="number" :min="30" step="100"
                icon="fa-coins"
                placeholder="1000"
                hint="Mínimo R$ 30"
                tooltip="Valor inicial do investimento. Mínimo R$ 30 no Tesouro Direto."
                @input="calcularAuto"
              />
              <BaseInput
                v-model="aportesMensais"
                label="Aportes Mensais (R$)"
                type="number" :min="0" step="100"
                icon="fa-calendar-plus"
                placeholder="500"
                hint="0 se não houver aportes"
                @input="calcularAuto"
              />
            </div>

            <BaseInput
              v-model="prazoAnos"
              label="Prazo (anos)"
              type="number" :min="1" :max="30"
              icon="fa-hourglass-half"
              placeholder="5"
              hint="Quanto maior o prazo, menor o IR"
              @input="calcularAuto"
            />

            <BaseInput v-if="tipoTitulo === 'prefixado'"
              v-model="taxaAnual"
              label="Taxa Anual (%)"
              type="number" step="0.1"
              icon="fa-percentage"
              placeholder="12"
              hint="Taxa prefixada contratada"
              @input="calcularAuto"
            />
            <BaseInput v-if="tipoTitulo === 'selic'"
              v-model="taxaSelic"
              label="Taxa Selic (% a.a.)"
              type="number" step="0.1"
              icon="fa-percentage"
              placeholder="13.25"
              @input="calcularAuto"
            />
            <div v-if="tipoTitulo === 'ipca'" class="grid grid-cols-2 gap-3">
              <BaseInput
                v-model="taxaIPCA"
                label="IPCA esperado (%)"
                type="number" step="0.1"
                icon="fa-chart-area"
                placeholder="4.5"
                @input="calcularAuto"
              />
              <BaseInput
                v-model="taxaJuros"
                label="Juros reais (%)"
                type="number" step="0.1"
                icon="fa-plus"
                placeholder="6.0"
                hint="Taxa + no título"
                @input="calcularAuto"
              />
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Simular Investimento
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
              <p class="text-sm text-blue-200 mb-1">Valor Final (Líquido após IR)</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.valorLiquido }}</p>
              <p class="text-emerald-300 text-sm font-semibold">
                <i class="fas fa-trending-up mr-1"></i>
                {{ prazoAnos }} anos · IR {{ resultado.aliquotaIR }}% · Rentab. líquida: {{ resultado.rentabilidadeLiquida }}%
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">R$ {{ resultado.valorBruto }}</div>
                <div class="metric-glass-label">Valor bruto</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">R$ {{ resultado.totalInvestido }}</div>
                <div class="metric-glass-label">Total investido</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">R$ {{ resultado.rendimentoBruto }}</div>
                <div class="metric-glass-label">Rendimento bruto</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">R$ {{ resultado.impostoRenda }}</div>
                <div class="metric-glass-label">IR ({{ resultado.aliquotaIR }}%)</div>
              </div>
            </div>

            <!-- Taxas -->
            <div class="grid grid-cols-2 gap-3">
              <div class="glass-panel p-4 text-center">
                <div class="text-xs text-gray-500 dark:text-slate-400 mb-1">Rentabilidade Líquida</div>
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ resultado.rentabilidadeLiquida }}%</div>
              </div>
              <div class="glass-panel p-4 text-center">
                <div class="text-xs text-gray-500 dark:text-slate-400 mb-1">Taxa Anual Efetiva</div>
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ resultado.taxaEfetiva }}% a.a.</div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-landmark text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Tesouro Direto: investimento mínimo de R$ 30, garantido pelo Tesouro Nacional, resgate em qualquer dia útil (Tesouro Selic).
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-landmark-flag text-4xl mb-3 opacity-30 block text-emerald-400"></i>
          <p class="text-sm">Selecione o título e preencha os dados para simular o investimento</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipoTitulo    = ref('selic')
const valorInicial  = ref(1000)
const aportesMensais = ref(500)
const prazoAnos     = ref(5)
const taxaAnual     = ref(12)
const taxaSelic     = ref(13.25)
const taxaIPCA      = ref(4.5)
const taxaJuros     = ref(6.0)
const resultado     = ref(null)

const tiposTitulo = [
  { value: 'selic',     label: 'Tesouro Selic', desc: '100% da Selic', icon: 'fa-percent' },
  { value: 'prefixado', label: 'Prefixado',      desc: 'Taxa fixa',    icon: 'fa-lock' },
  { value: 'ipca',      label: 'IPCA+',          desc: 'IPCA + taxa',  icon: 'fa-chart-line' },
]

function calcular() {
  const valorInicio  = Number(valorInicial.value)
  const aporte       = Number(aportesMensais.value)
  const anos         = Number(prazoAnos.value)
  const meses        = anos * 12

  if (!valorInicio) { Swal.fire({ icon: 'warning', title: 'Informe o valor inicial', confirmButtonColor: '#2563eb' }); return }
  if (!anos)        { Swal.fire({ icon: 'warning', title: 'Informe o prazo em anos', confirmButtonColor: '#2563eb' }); return }

  let taxaMensal = 0
  if (tipoTitulo.value === 'selic')     taxaMensal = Math.pow(1 + Number(taxaSelic.value) / 100, 1/12) - 1
  else if (tipoTitulo.value === 'prefixado') taxaMensal = Math.pow(1 + Number(taxaAnual.value) / 100, 1/12) - 1
  else if (tipoTitulo.value === 'ipca') {
    const taxaTotal = (1 + Number(taxaIPCA.value)/100) * (1 + Number(taxaJuros.value)/100) - 1
    taxaMensal = Math.pow(1 + taxaTotal, 1/12) - 1
  }

  let saldo = valorInicio
  for (let i = 0; i < meses; i++) {
    saldo = saldo * (1 + taxaMensal) + aporte
  }

  const totalInvestido   = valorInicio + (aporte * meses)
  const rendimentoBruto  = saldo - totalInvestido
  const dias             = anos * 365
  let aliquotaIR = dias <= 180 ? 0.225 : dias <= 360 ? 0.20 : dias <= 720 ? 0.175 : 0.15
  const impostoRenda     = rendimentoBruto * aliquotaIR
  const valorLiquido     = saldo - impostoRenda
  const rentabilidadeLiquida = ((valorLiquido / totalInvestido - 1) * 100)
  const taxaEfetiva      = (Math.pow(valorLiquido / totalInvestido, 1/anos) - 1) * 100

  resultado.value = {
    valorBruto:            saldo.toFixed(2),
    valorLiquido:          valorLiquido.toFixed(2),
    totalInvestido:        totalInvestido.toFixed(2),
    rendimentoBruto:       rendimentoBruto.toFixed(2),
    impostoRenda:          impostoRenda.toFixed(2),
    aliquotaIR:            (aliquotaIR * 100).toFixed(1),
    rentabilidadeLiquida:  rentabilidadeLiquida.toFixed(2),
    taxaEfetiva:           taxaEfetiva.toFixed(2),
  }
}

function calcularAuto() {
  if (valorInicial.value && prazoAnos.value) calcular()
}

function limpar() {
  valorInicial.value = 1000; aportesMensais.value = 500; prazoAnos.value = 5
  taxaAnual.value = 12; taxaSelic.value = 13.25; taxaIPCA.value = 4.5; taxaJuros.value = 6.0
  resultado.value = null
}

calcularAuto()
watch([tipoTitulo, valorInicial, aportesMensais, prazoAnos, taxaAnual, taxaSelic, taxaIPCA, taxaJuros], calcularAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

<template>
  <ToolShell
    title="Simulador de INSS"
    description="Calcule a contribuição mensal do INSS 2025 pela tabela progressiva ou estime seu benefício futuro."
    icon="fa-shield-halved"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Tabela 2025 progressiva', 'Teto R$ 908,86', 'Benefício estimado']"
    :tips="[
      { title: 'Tabela INSS 2025', text: 'Faixas: 7,5% até R$ 1.412 | 9% até R$ 2.667 | 12% até R$ 4.000 | 14% até R$ 7.786. Teto: R$ 908,86.', type: 'info' },
      { title: 'Alíquota efetiva', text: 'O INSS usa tabela progressiva: você paga a alíquota mais alta apenas sobre a parte do salário que ultrapassa cada faixa.' },
      { title: 'Benefício mínimo', text: 'O benefício do INSS não pode ser inferior ao salário mínimo (R$ 1.412 em 2025), mesmo para quem contribuiu pouco.', type: 'success' },
    ]"
    :examples="[
      { title: 'Salário R$ 2.000', desc: 'Empregado CLT, tabela 2025', result: 'INSS: ~R$ 157,09 (alíquota efetiva 7,85%)' },
      { title: 'Salário R$ 5.000', desc: 'Empregado CLT, tabela 2025', result: 'INSS: ~R$ 489,22 (alíquota efetiva 9,78%)' },
      { title: 'Salário R$ 7.786+', desc: 'Teto do INSS 2025', result: 'INSS máximo: R$ 908,86 (teto da contribuição)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <!-- Abas -->
          <div class="grid grid-cols-2 gap-2 mb-4">
            <button
              @click="tipoCalculo = 'contribuicao'"
              :class="['p-3 rounded-xl font-semibold text-sm transition-all', tipoCalculo === 'contribuicao' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600']"
            >
              <i class="fas fa-money-bill-wave mr-1.5"></i>
              Contribuição
            </button>
            <button
              @click="tipoCalculo = 'beneficio'"
              :class="['p-3 rounded-xl font-semibold text-sm transition-all', tipoCalculo === 'beneficio' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-200 dark:hover:bg-slate-600']"
            >
              <i class="fas fa-gift mr-1.5"></i>
              Benefício Futuro
            </button>
          </div>

          <!-- Formulário Contribuição -->
          <div v-if="tipoCalculo === 'contribuicao'" class="space-y-3">
            <BaseInput
              v-model="salarioBruto"
              label="Salário Bruto (R$)"
              type="number" :min="0" step="100"
              icon="fa-money-bill"
              placeholder="3000"
              tooltip="Informe seu salário bruto mensal. O INSS é calculado sobre este valor."
              @input="calcularContribuicaoAuto"
            />
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-user-tie mr-1.5 text-blue-500"></i>
                Tipo de Segurado
              </label>
              <div class="grid grid-cols-2 gap-2 mt-1">
                <button
                  @click="tipoSegurado = 'empregado'; calcularContribuicaoAuto()"
                  :class="['p-3 rounded-xl border-2 text-sm transition-all text-left', tipoSegurado === 'empregado' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <div class="font-bold text-sm">Empregado CLT</div>
                  <div class="text-[10px] opacity-70 mt-0.5">Desconto 7,5% a 14%</div>
                </button>
                <button
                  @click="tipoSegurado = 'autonomo'; calcularContribuicaoAuto()"
                  :class="['p-3 rounded-xl border-2 text-sm transition-all text-left', tipoSegurado === 'autonomo' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-slate-600']"
                >
                  <div class="font-bold text-sm">Autônomo/MEI</div>
                  <div class="text-[10px] opacity-70 mt-0.5">Contribuição variável</div>
                </button>
              </div>
            </div>
          </div>

          <!-- Formulário Benefício -->
          <div v-else class="space-y-3">
            <BaseInput
              v-model="idadeAtual"
              label="Idade Atual"
              type="number" :min="18" :max="80"
              icon="fa-user"
              placeholder="35"
              @input="calcularBeneficioAuto"
            />
            <BaseInput
              v-model="tempoContribuicao"
              label="Tempo de Contribuição (anos)"
              type="number" :min="0" :max="50"
              icon="fa-calendar-check"
              placeholder="15"
              tooltip="Tempo total de contribuição ao INSS em anos."
              @input="calcularBeneficioAuto"
            />
            <BaseInput
              v-model="mediaSalarial"
              label="Média Salarial Histórica (R$)"
              type="number" :min="0" step="100"
              icon="fa-chart-line"
              placeholder="3500"
              hint="Média dos seus salários de contribuição"
              @input="calcularBeneficioAuto"
            />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton
              variant="success" icon="fa-calculator"
              @click="tipoCalculo === 'contribuicao' ? calcularContribuicao() : calcularBeneficio()"
              class="flex-1"
            >
              Calcular
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
              <p class="text-sm text-blue-200 mb-1">{{ resultado.titulo }}</p>
              <p class="text-5xl font-black text-white mb-2">R$ {{ resultado.valor }}</p>
              <p class="text-indigo-300 text-sm font-semibold">{{ resultado.subtitulo }}</p>
            </div>

            <!-- Detalhes -->
            <div v-if="resultado.detalhes" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-check text-blue-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-1.5">
                <div
                  v-for="item in resultado.detalhes" :key="item.label"
                  class="flex justify-between items-start py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0 text-sm"
                >
                  <div>
                    <div class="font-semibold text-gray-800 dark:text-slate-200">{{ item.label }}</div>
                    <div class="text-xs text-gray-500 dark:text-slate-400">{{ item.descricao }}</div>
                  </div>
                  <span class="font-bold text-blue-600 dark:text-blue-400 ml-2 shrink-0">{{ item.valor }}</span>
                </div>
              </div>
            </div>

            <!-- Tabela INSS (contribuição CLT) -->
            <div v-if="tipoCalculo === 'contribuicao' && tipoSegurado === 'empregado'" class="glass-panel p-4">
              <h4 class="text-xs font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-table text-indigo-500"></i>
                Tabela INSS 2025
              </h4>
              <div class="space-y-1 text-xs">
                <div v-for="f in faixasINSS" :key="f.faixa" class="flex justify-between py-1 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-600 dark:text-slate-300">{{ f.faixa }}</span>
                  <span :class="['font-bold', f.ativa ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500']">{{ f.aliquota }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">{{ resultado.infoTitulo }}</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-shield-halved text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Informe o salário para calcular a contribuição do INSS</p>
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

interface ResultadoINSS {
  titulo: string; valor: string; subtitulo: string
  detalhes?: { label: string; descricao: string; valor: string }[]; infoTitulo: string
}

const tipoCalculo       = ref('contribuicao')
const salarioBruto      = ref(3000)
const tipoSegurado      = ref('empregado')
const idadeAtual        = ref(35)
const tempoContribuicao = ref(15)
const mediaSalarial     = ref(3500)
const resultado         = ref<ResultadoINSS | null>(null)

const faixasINSS = computed(() => {
  const sal = Number(salarioBruto.value)
  return [
    { faixa: 'Até R$ 1.412,00',           aliquota: '7,5%',  ativa: sal > 0 },
    { faixa: 'R$ 1.412,01 – R$ 2.666,68', aliquota: '9%',    ativa: sal > 1412 },
    { faixa: 'R$ 2.666,69 – R$ 4.000,03', aliquota: '12%',   ativa: sal > 2666.68 },
    { faixa: 'R$ 4.000,04 – R$ 7.786,02', aliquota: '14%',   ativa: sal > 4000.03 },
    { faixa: 'Teto máximo',               aliquota: 'R$ 908,86', ativa: sal >= 7786.02 },
  ]
})

function calcularContribuicao() {
  const salario = Number(salarioBruto.value)
  if (!salario) { Swal.fire({ icon: 'warning', title: 'Informe o salário bruto', confirmButtonColor: '#2563eb' }); return }

  if (tipoSegurado.value === 'empregado') {
    let inss = 0
    if (salario <= 1412)        inss = salario * 0.075
    else if (salario <= 2666.68) inss = 1412 * 0.075 + (salario - 1412) * 0.09
    else if (salario <= 4000.03) inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (salario - 2666.68) * 0.12
    else if (salario <= 7786.02) inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (salario - 4000.03) * 0.14
    else                         inss = 1412 * 0.075 + (2666.68 - 1412) * 0.09 + (4000.03 - 2666.68) * 0.12 + (7786.02 - 4000.03) * 0.14

    const aliquotaEfetiva = (inss / salario) * 100
    const salarioLiquido  = salario - inss

    resultado.value = {
      titulo:    'Contribuição Mensal INSS',
      valor:     inss.toFixed(2),
      subtitulo: `Alíquota efetiva: ${aliquotaEfetiva.toFixed(2)}%`,
      detalhes: [
        { label: 'Salário bruto',      descricao: 'Valor antes dos descontos', valor: `R$ ${salario.toFixed(2)}` },
        { label: 'Desconto INSS',      descricao: 'Tabela progressiva 2025',   valor: `R$ ${inss.toFixed(2)}` },
        { label: 'Salário após INSS',  descricao: 'Sem descontar IRRF',        valor: `R$ ${salarioLiquido.toFixed(2)}` },
        { label: 'Contribuição anual', descricao: '12 × desconto mensal',      valor: `R$ ${(inss * 12).toFixed(2)}` },
      ],
      infoTitulo: 'Tabela progressiva: você paga alíquota maior apenas sobre a faixa excedente.',
    }
  } else {
    const contribuicaoMEI       = 70.60
    const contribuicaoAut11     = 1412 * 0.11
    const contribuicaoAut20     = salario * 0.20
    resultado.value = {
      titulo:    'Opções de Contribuição',
      valor:     contribuicaoAut20.toFixed(2),
      subtitulo: 'Autônomo contribuindo com 20%',
      detalhes: [
        { label: 'MEI (5%)',         descricao: 'Apenas aposentadoria por idade', valor: `R$ ${contribuicaoMEI.toFixed(2)}` },
        { label: 'Autônomo (11%)',   descricao: 'Apenas aposentadoria por idade', valor: `R$ ${contribuicaoAut11.toFixed(2)}` },
        { label: 'Autônomo (20%)',   descricao: 'Todos os benefícios',            valor: `R$ ${contribuicaoAut20.toFixed(2)}` },
      ],
      infoTitulo: 'MEI e 11% garantem apenas aposentadoria por idade. Para todos os benefícios, contribua com 20%.',
    }
  }
}

function calcularBeneficio() {
  const idade         = Number(idadeAtual.value)
  const tempoContrib  = Number(tempoContribuicao.value)
  const mediaSal      = Number(mediaSalarial.value)

  if (!mediaSal) { Swal.fire({ icon: 'warning', title: 'Informe a média salarial', confirmButtonColor: '#2563eb' }); return }

  let percentual = 0.60
  if (tempoContrib > 15) percentual += (tempoContrib - 15) * 0.02
  percentual = Math.min(percentual, 1.0)

  const beneficioEstimado  = Math.max(mediaSal * percentual, 1412)
  const anosRestantesHomem = Math.max(0, 65 - idade)
  const anosRestantesMulher = Math.max(0, 62 - idade)
  const tempoRestante      = Math.max(0, 15 - tempoContrib)

  resultado.value = {
    titulo:    'Benefício Estimado',
    valor:     beneficioEstimado.toFixed(2),
    subtitulo: `${(percentual * 100).toFixed(0)}% da média salarial`,
    detalhes: [
      { label: 'Tempo de contribuição',          descricao: 'Anos contribuídos',         valor: `${tempoContrib} anos` },
      { label: 'Percentual do benefício',         descricao: 'Com base no tempo',         valor: `${(percentual * 100).toFixed(0)}%` },
      { label: 'Idade para aposentar (Homem)',    descricao: 'Faltam ' + anosRestantesHomem + ' anos', valor: '65 anos' },
      { label: 'Idade para aposentar (Mulher)',   descricao: 'Faltam ' + anosRestantesMulher + ' anos', valor: '62 anos' },
      { label: 'Contribuição mínima faltante',   descricao: 'Para atingir 15 anos',      valor: `${tempoRestante} anos` },
    ],
    infoTitulo: 'Benefício = 60% + 2% por ano acima de 15 anos de contribuição. Mínimo: 1 salário mínimo.',
  }
}

function calcularContribuicaoAuto() {
  if (salarioBruto.value) calcularContribuicao()
}

function calcularBeneficioAuto() {
  if (mediaSalarial.value) calcularBeneficio()
}

function limpar() {
  salarioBruto.value = 3000; idadeAtual.value = 35; tempoContribuicao.value = 15
  mediaSalarial.value = 3500; resultado.value = null
}

calcularContribuicao()
watch(tipoCalculo, () => { resultado.value = null })
watch([salarioBruto, tipoSegurado], calcularContribuicaoAuto)
watch([idadeAtual, tempoContribuicao, mediaSalarial], calcularBeneficioAuto)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

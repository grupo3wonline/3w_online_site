<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
          <i class="fas fa-user-clock text-blue-600 dark:text-blue-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Simulador de Hora Extra</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule o valor das suas horas extras</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput v-model="salarioBruto" label="Salário Bruto (R$)" type="number" :min="0" step="100" icon="fa-solid fa-money-bill" />
          <BaseInput v-model="horasSemanais" label="Horas Semanais Contratuais" type="number" :min="1" :max="44" icon="fa-solid fa-clock" />
          <BaseInput v-model="horasExtras50" label="Horas Extras 50%" type="number" :min="0" step="0.5" icon="fa-solid fa-clock" />
          <BaseInput v-model="horasExtras100" label="Horas Extras 100%" type="number" :min="0" step="0.5" icon="fa-solid fa-clock" />
        </div>

        <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
            <div class="text-sm text-blue-800 dark:text-blue-300">
              <p class="font-semibold mb-1">Tipos de Hora Extra:</p>
              <ul class="text-xs space-y-1">
                <li><strong>50%:</strong> Dias úteis e sábados (segunda a sábado)</li>
                <li><strong>100%:</strong> Domingos e feriados</li>
              </ul>
            </div>
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>
          Calcular Horas Extras
        </BaseButton>

        <div v-if="resultado" class="space-y-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center text-white">
            <div class="text-sm font-medium mb-2">Total Horas Extras no Mês</div>
            <div class="text-5xl font-bold mb-2">R$ {{ resultado.totalHorasExtras }}</div>
            <div class="text-blue-100">{{ resultado.totalHoras }} horas trabalhadas além do contrato</div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.valorHoraNormal }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Hora Normal</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.valorHora50 }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Hora 50%</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.valorHora100 }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Valor Hora 100%</div>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">Horas Extras 50%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ horasExtras50 }} horas × R$ {{ resultado.valorHora50 }}</div>
              </div>
              <div class="text-xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.total50 }}</div>
            </div>
            <div class="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">Horas Extras 100%</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">{{ horasExtras100 }} horas × R$ {{ resultado.valorHora100 }}</div>
              </div>
              <div class="text-xl font-bold text-blue-600 dark:text-blue-400">R$ {{ resultado.total100 }}</div>
            </div>
            <div class="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg">
              <div>
                <div class="font-bold">Salário Final (com horas extras)</div>
                <div class="text-sm opacity-90">Salário base + horas extras</div>
              </div>
              <div class="text-2xl font-bold">R$ {{ resultado.salarioTotal }}</div>
            </div>
          </div>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4">
            <div class="flex">
              <i class="fas fa-exclamation-triangle text-yellow-600 dark:text-yellow-400 mt-1 mr-3"></i>
              <div class="text-sm text-yellow-800 dark:text-yellow-300">
                <p class="font-semibold mb-2">Limite Legal de Horas Extras:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li>Máximo de 2 horas extras por dia (CLT Art. 59)</li>
                  <li>Adicional mínimo de 50% sobre valor da hora normal</li>
                  <li>Horas aos domingos e feriados: adicional de 100%</li>
                  <li>Banco de horas deve ser acordado por convenção coletiva</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const salarioBruto = ref(3000)
const horasSemanais = ref(44)
const horasExtras50 = ref(10)
const horasExtras100 = ref(4)
const resultado = ref(null)

const calcular = () => {
  const salario = Number(salarioBruto.value)
  const horasSemana = Number(horasSemanais.value)
  const extras50 = Number(horasExtras50.value)
  const extras100 = Number(horasExtras100.value)
  
  // Cálculo do valor da hora normal
  // Horas mensais = (horas semanais × 52 semanas) / 12 meses
  const horasMensais = (horasSemana * 52) / 12
  const valorHoraNormal = salario / horasMensais
  
  // Valor das horas extras
  const valorHora50 = valorHoraNormal * 1.5
  const valorHora100 = valorHoraNormal * 2
  
  // Total de cada tipo
  const total50 = extras50 * valorHora50
  const total100 = extras100 * valorHora100
  
  // Total de horas extras
  const totalHorasExtras = total50 + total100
  const totalHoras = extras50 + extras100
  const salarioTotal = salario + totalHorasExtras

  resultado.value = {
    valorHoraNormal: valorHoraNormal.toFixed(2),
    valorHora50: valorHora50.toFixed(2),
    valorHora100: valorHora100.toFixed(2),
    total50: total50.toFixed(2),
    total100: total100.toFixed(2),
    totalHorasExtras: totalHorasExtras.toFixed(2),
    totalHoras: totalHoras.toFixed(1),
    salarioTotal: salarioTotal.toFixed(2)
  }

  trackToolUsage('Simulador Hora Extra', 'calculate')
}
</script>

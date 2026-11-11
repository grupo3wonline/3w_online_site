<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type RoomType = 'LIVING' | 'KITCHEN' | 'BATHROOM' | 'LAUNDRY' | 'GARAGE' | 'OFFICE'

interface CalculationResult {
  points: number; cableLength: number; totalPower: number
  current: number; circuitBreaker: number; wireGauge: string
}

const POWER_PER_M2: Record<RoomType, number> = {
  LIVING: 100, KITCHEN: 120, BATHROOM: 600, LAUNDRY: 200, GARAGE: 100, OFFICE: 100,
}

const ROOM_LABELS: Record<RoomType, string> = {
  LIVING: 'Sala / Quarto', KITCHEN: 'Cozinha', BATHROOM: 'Banheiro',
  LAUNDRY: 'Área de Serviço', GARAGE: 'Garagem', OFFICE: 'Escritório',
}

const form = reactive({ roomType: 'LIVING' as RoomType, width: 0, length: 0, ceilingHeight: 2.8 })
const resultado = ref<CalculationResult | null>(null)

const area = computed(() => form.width > 0 && form.length > 0 ? form.width * form.length : null)

function circuitBreaker(a: number): number {
  if (a <= 10) return 10
  if (a <= 16) return 16
  if (a <= 20) return 20
  if (a <= 25) return 25
  return 32
}

function wireGauge(a: number): string {
  if (a <= 10) return '1.5mm²'
  if (a <= 16) return '2.5mm²'
  if (a <= 20) return '4mm²'
  return '6mm²'
}

function calcular() {
  if (!form.width || !form.length || !form.ceilingHeight) {
    Swal.fire({ icon: 'warning', title: 'Preencha largura, comprimento e pé direito', confirmButtonColor: '#f59e0b' }); return
  }
  const a = form.width * form.length
  const points = Math.max(1, Math.ceil(a / 8)) // 1 ponto a cada 8m²
  const totalPower = a * POWER_PER_M2[form.roomType]
  const current = totalPower / 220 / 0.9 // fator de demanda
  const cb = circuitBreaker(current)
  // Comprimento: pontos * (pé direito + estimativa horizontal)
  const cableLength = points * (form.ceilingHeight + 3)

  resultado.value = {
    points, cableLength: Math.round(cableLength * 10) / 10,
    totalPower: Math.round(totalPower), current: Math.round(current * 10) / 10,
    circuitBreaker: cb, wireGauge: wireGauge(current),
  }
  Swal.fire({ icon: 'success', title: 'Cálculo concluído!', text: `${points} pontos, ${cableLength.toFixed(1)}m de cabo`, timer: 2000, showConfirmButton: false })
}

function limpar() { form.width = 0; form.length = 0; form.ceilingHeight = 2.8; resultado.value = null }
</script>

<template>
  <ToolShell

    title="Calculadora Elétrica"

    description="Calcule carga elétrica, potência e quantidade de pontos para projetos residenciais."

    icon="fa-bolt"

    icon-gradient="from-yellow-400 to-orange-600"

    orb-color="orange"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:lightning-bolt" class="text-yellow-400 w-7 h-7" />
        Calculadora de Ponto Elétrico
      </h1>
      <p class="text-blue-200 text-sm">Calcule pontos elétricos, comprimento de cabo e disjuntor (NBR 5410)</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:pencil-ruler" class="text-yellow-400 w-5 h-5" />
          Dados do Ambiente
        </h2>

        <div>
          <label class="input-aurora-label">Tipo de Ambiente</label>
          <select v-model="form.roomType" autocomplete="off"
            class="w-full input-aurora">
            <option v-for="(label, type) in ROOM_LABELS" :key="type" :value="type">{{ label }}</option>
          </select>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="input-aurora-label">Largura (m)</label>
            <input v-model.number="form.width" type="number" step="0.1" min="0" autocomplete="off" placeholder="Ex: 4.5"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Comprimento (m)</label>
            <input v-model.number="form.length" type="number" step="0.1" min="0" autocomplete="off" placeholder="Ex: 5.0"
              class="w-full input-aurora" />
          </div>
        </div>

        <div>
          <label class="input-aurora-label">Pé Direito (m)</label>
          <input v-model.number="form.ceilingHeight" type="number" step="0.1" min="2" autocomplete="off" placeholder="2.8"
            class="w-full input-aurora" />
        </div>

        <div v-if="area" class="bg-yellow-900/20 border border-yellow-500/20 rounded-lg p-3 text-center">
          <span class="text-yellow-300 text-sm font-medium">Área: {{ area.toFixed(1) }} m²</span>
        </div>

        <div class="flex gap-3">
          <button @click="calcular"
            class="flex-1 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultado -->
      <div class="space-y-4">
        <div v-if="resultado" class="glass-panel p-5 space-y-4">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:check-circle-outline" class="text-green-400 w-5 h-5" />
            Resultado
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="card in [
              { label: 'Pontos Elétricos', value: String(resultado.points), icon: 'mdi:power-plug-outline', cls: 'text-yellow-400 bg-yellow-900/20 border-yellow-500/20' },
              { label: 'Comprimento de Cabo', value: resultado.cableLength + 'm', icon: 'mdi:cable-data', cls: 'text-blue-400 bg-blue-900/20 border-blue-500/20' },
              { label: 'Potência Total', value: resultado.totalPower + 'W', icon: 'mdi:lightning-bolt', cls: 'text-orange-400 bg-orange-900/20 border-orange-500/20' },
              { label: 'Corrente', value: resultado.current + 'A', icon: 'mdi:sine-wave', cls: 'text-purple-400 bg-purple-900/20 border-purple-500/20' },
              { label: 'Disjuntor', value: resultado.circuitBreaker + 'A', icon: 'mdi:electric-switch', cls: 'text-red-400 bg-red-900/20 border-red-500/20' },
              { label: 'Bitola do Fio', value: resultado.wireGauge, icon: 'mdi:resistor', cls: 'text-green-400 bg-green-900/20 border-green-500/20' },
            ]" :key="card.label" :class="['border rounded-lg p-3 text-center', card.cls]">
              <Icon :icon="card.icon" class="w-5 h-5 mx-auto mb-1" />
              <div class="text-lg font-bold">{{ card.value }}</div>
              <div class="text-xs opacity-80">{{ card.label }}</div>
            </div>
          </div>
          <div class="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
            <p class="text-blue-200 text-xs flex items-start gap-2">
              <Icon icon="mdi:information-outline" class="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
              Calculado conforme NBR 5410. Consulte um eletricista para instalações críticas.
            </p>
          </div>
        </div>
        <div v-else class="glass-panel flex items-center justify-center p-10">
          <div class="text-center">
            <Icon icon="mdi:lightning-bolt" class="w-14 h-14 text-yellow-400/20 mx-auto mb-3" />
            <p class="text-blue-200 text-sm">Informe as dimensões e calcule</p>
          </div>
        </div>
      </div>
    </div>
  


  </ToolShell></template>
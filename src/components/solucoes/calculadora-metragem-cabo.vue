<script setup lang="ts">
import { reactive, ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface CalculoInput { lanceLongo: number; lanceCurto: number; numeroPontos: number; peDireito: number }
interface CalculoResultado {
  maiorDistancia: number; menorDistancia: number; alturaMaxima: number
  quantidadePontos: number; metragemMinima: number; metragemMaxima: number
}

const form = reactive<CalculoInput>({ lanceLongo: 0, lanceCurto: 0, numeroPontos: 0, peDireito: 0 })
const resultado = ref<CalculoResultado | null>(null)
const erros = ref<(keyof CalculoInput)[]>([])

const historico = ref<Array<CalculoInput & CalculoResultado>>([])

function round2(v: number) { return Math.round((v + Number.EPSILON) * 100) / 100 }

function calcular() {
  erros.value = []
  if (!(form.lanceLongo > 0)) erros.value.push('lanceLongo')
  if (!(form.lanceCurto > 0)) erros.value.push('lanceCurto')
  if (!(form.numeroPontos > 0)) erros.value.push('numeroPontos')
  if (!(form.peDireito > 0)) erros.value.push('peDireito')
  if (erros.value.length > 0) {
    Swal.fire({ icon: 'warning', title: 'Preencha todos os campos com valores maiores que zero', confirmButtonColor: '#3b82f6' })
    return
  }
  const { lanceLongo, lanceCurto, numeroPontos, peDireito } = form
  const maiorDistancia = round2(Math.max(lanceLongo, lanceCurto))
  const menorDistancia = round2(Math.min(lanceLongo, lanceCurto))
  const alturaMaxima = round2(peDireito * numeroPontos)
  const metragemMinima = round2(menorDistancia * numeroPontos)
  const metragemMaxima = round2(maiorDistancia * numeroPontos)
  resultado.value = { maiorDistancia, menorDistancia, alturaMaxima, quantidadePontos: numeroPontos, metragemMinima, metragemMaxima }
  historico.value = [{ ...form, ...resultado.value }, ...historico.value.slice(0, 4)]
  Swal.fire({ icon: 'success', title: 'Metragem calculada!', html: `Mínimo: <strong>${metragemMinima}m</strong> — Máximo: <strong>${metragemMaxima}m</strong>`, timer: 2000, showConfirmButton: false })
}

function limpar() { form.lanceLongo = 0; form.lanceCurto = 0; form.numeroPontos = 0; form.peDireito = 0; resultado.value = null; erros.value = [] }

const fields = [
  { key: 'lanceLongo' as const, label: 'Lançamento Longo (m)', icon: 'ph:arrows-out-line-horizontal-bold', help: 'Maior distância horizontal entre os pontos' },
  { key: 'lanceCurto' as const, label: 'Lançamento Curto (m)', icon: 'ph:arrows-in-line-horizontal-bold', help: 'Menor distância horizontal entre os pontos' },
  { key: 'numeroPontos' as const, label: 'Número de Pontos', icon: 'mdi:format-list-numbered', help: 'Quantidade total de pontos de cabos' },
  { key: 'peDireito' as const, label: 'Pé Direito (m)', icon: 'mdi:arrow-up', help: 'Altura do teto ao piso (pé direito)' },
]
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:cable-data" class="text-blue-400 w-7 h-7" />
        Calculadora de Metragem de Cabo
      </h1>
      <p class="text-blue-200 text-sm">Calcule a metragem mínima e máxima de cabos para instalações</p>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Formulário -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:pencil-ruler" class="text-blue-400 w-5 h-5" />
          Parâmetros da Instalação
        </h2>
        <div class="space-y-3">
          <div v-for="f in fields" :key="f.key">
            <label class="text-blue-200 text-xs font-medium block mb-1 flex items-center gap-1">
              <Icon :icon="f.icon" class="w-3.5 h-3.5" />
              {{ f.label }}
              <span class="text-blue-400/60" :title="f.help">ⓘ</span>
            </label>
            <input v-model.number="form[f.key]" type="number" :step="f.key === 'numeroPontos' ? '1' : '0.01'" min="0" autocomplete="off"
              :class="['w-full bg-[#0a1628] text-white border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50',
                erros.includes(f.key) ? 'border-red-500/50' : 'border-white/10']" />
            <p v-if="erros.includes(f.key)" class="text-red-400 text-xs mt-0.5">Campo obrigatório (valor &gt; 0)</p>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="calcular"
            class="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-lg transition-colors text-sm">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Resultados -->
      <div class="space-y-4">
        <div v-if="resultado" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:check-circle-outline" class="text-green-400 w-5 h-5" />
            Resultado do Cálculo
          </h3>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="card in [
              { label: 'Metragem Mínima', value: resultado.metragemMinima + 'm', icon: 'mdi:arrow-down', cls: 'text-green-400 bg-green-900/20 border-green-500/20' },
              { label: 'Metragem Máxima', value: resultado.metragemMaxima + 'm', icon: 'mdi:arrow-up', cls: 'text-red-400 bg-red-900/20 border-red-500/20' },
              { label: 'Maior Lançamento', value: resultado.maiorDistancia + 'm', icon: 'mdi:arrow-expand-horizontal', cls: 'text-blue-400 bg-blue-900/20 border-blue-500/20' },
              { label: 'Menor Lançamento', value: resultado.menorDistancia + 'm', icon: 'mdi:arrow-collapse-horizontal', cls: 'text-purple-400 bg-purple-900/20 border-purple-500/20' },
              { label: 'Altura Máxima', value: resultado.alturaMaxima + 'm', icon: 'mdi:arrow-up', cls: 'text-orange-400 bg-orange-900/20 border-orange-500/20' },
              { label: 'Qtd. Pontos', value: String(resultado.quantidadePontos), icon: 'mdi:format-list-numbered', cls: 'text-cyan-400 bg-cyan-900/20 border-cyan-500/20' },
            ]" :key="card.label" :class="['border rounded-lg p-3 text-center', card.cls]">
              <Icon :icon="card.icon" class="w-5 h-5 mx-auto mb-1" />
              <div class="text-lg font-bold">{{ card.value }}</div>
              <div class="text-xs opacity-80">{{ card.label }}</div>
            </div>
          </div>
        </div>
        <div v-else class="bg-[#0f1e3c] border border-white/10 rounded-xl flex items-center justify-center p-10">
          <div class="text-center">
            <Icon icon="mdi:cable-data" class="w-14 h-14 text-blue-400/20 mx-auto mb-3" />
            <p class="text-blue-200 text-sm">Preencha os campos e calcule a metragem</p>
          </div>
        </div>

        <!-- Histórico -->
        <div v-if="historico.length" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4">
          <h3 class="text-white text-sm font-semibold mb-2 flex items-center gap-2">
            <Icon icon="mdi:history" class="w-4 h-4 text-blue-400" /> Histórico
          </h3>
          <div class="space-y-1">
            <div v-for="(h, i) in historico" :key="i" class="text-xs flex justify-between border-b border-white/5 pb-1">
              <span class="text-blue-300">{{ h.numeroPontos }} pts, PD {{ h.peDireito }}m</span>
              <span class="text-white">{{ h.metragemMinima }}–{{ h.metragemMaxima }}m</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

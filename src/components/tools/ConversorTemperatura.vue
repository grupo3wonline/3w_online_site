<template>
  <ToolShell
    title="Conversor de Temperatura"
    description="Converta entre Celsius, Fahrenheit, Kelvin e Rankine com referências de temperatura do cotidiano."
    icon="fa-thermometer-half"
    icon-gradient="from-red-500 to-orange-600"
    orb-color="orange"
    :quick-tips="['4 escalas', 'Referências rápidas', 'Conversão ao digitar']"
    :tips="[
      { title: 'Fórmulas principais', text: '°F = (°C × 9/5) + 32 | K = °C + 273,15 | Ra = K × 1,8 (Rankine).' },
      { title: 'Escala Kelvin', text: 'O zero absoluto é −273,15°C (0 K). Não existem temperaturas negativas em Kelvin.', type: 'info' },
    ]"
    :examples="[
      { title: 'Temperatura corporal', desc: '36,5°C',  result: '97,7°F | 309,65K' },
      { title: 'Água ferve',           desc: '100°C',   result: '212°F | 373,15K' },
      { title: 'Zero absoluto',        desc: '−273,15°C', result: '−459,67°F | 0K' },
    ]"
  >

    <!-- Cards de temperatura -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <div
        v-for="u in unidades"
        :key="u.key"
        :class="['rounded-2xl p-5 border-2 transition-all', u.bgClass]"
      >
        <div class="flex items-center justify-between mb-3">
          <div>
            <span class="text-2xl font-black" :class="u.textClass">{{ u.sigla }}</span>
            <span class="text-xs text-gray-500 dark:text-slate-400 ml-1.5">{{ u.nome }}</span>
          </div>
          <span class="text-xl">{{ u.emoji }}</span>
        </div>
        <input
          v-model="valores[u.key]"
          type="number"
          step="0.01"
          class="w-full text-center text-3xl font-black bg-transparent border-0 border-b-2 outline-none pb-1"
          :class="[u.inputClass, 'dark:text-white']"
          @input="() => converter(u.key)"
        />
      </div>
    </div>

    <!-- Fórmulas -->
    <details class="mb-4">
      <summary class="accordion-trigger cursor-pointer text-sm select-none">
        <span class="flex items-center gap-2">
          <i class="fas fa-square-root-alt text-primary-500"></i>
          Fórmulas de conversão
        </span>
        <i class="fas fa-chevron-down text-xs text-gray-400"></i>
      </summary>
      <div class="mt-2 glass-panel p-4 space-y-1.5 text-xs font-mono text-gray-700 dark:text-slate-200">
        <p>°F = (°C × 9/5) + 32</p>
        <p>K  = °C + 273.15</p>
        <p>Ra = (°C + 273.15) × 1.8</p>
      </div>
    </details>

    <!-- Referências rápidas -->
    <div>
      <p class="input-aurora-label mb-3">
        <i class="fas fa-bookmark mr-1.5 text-orange-500"></i>
        Referências rápidas
      </p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          v-for="ref in referencias"
          :key="ref.nome"
          @click="usarReferencia(ref.celsius)"
          class="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-400 dark:hover:border-orange-600 hover:bg-orange-50/50 dark:hover:bg-orange-900/10 transition-all text-left"
        >
          <span class="text-[10px] text-gray-500 dark:text-slate-400 block leading-tight">{{ ref.nome }}</span>
          <span class="font-black text-orange-600 dark:text-orange-400 text-sm">{{ ref.celsius }}°C</span>
        </button>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'

type Escala = 'celsius' | 'fahrenheit' | 'kelvin' | 'rankine'

const valores = reactive<Record<Escala, number | ''>>({
  celsius:    0,
  fahrenheit: 32,
  kelvin:     273.15,
  rankine:    491.67,
})

const unidades = [
  { key: 'celsius'    as Escala, sigla: '°C', nome: 'Celsius',    emoji: '🌡️', bgClass: 'bg-gradient-to-br from-teal-50 to-teal-100/60 dark:from-teal-900/20 dark:to-teal-800/10 border-teal-200 dark:border-teal-800',   textClass: 'text-teal-700 dark:text-teal-300',    inputClass: 'border-teal-400 text-teal-700 dark:text-teal-200'   },
  { key: 'fahrenheit' as Escala, sigla: '°F', nome: 'Fahrenheit',  emoji: '🔥', bgClass: 'bg-gradient-to-br from-orange-50 to-orange-100/60 dark:from-orange-900/20 dark:to-orange-800/10 border-orange-200 dark:border-orange-800',textClass: 'text-orange-700 dark:text-orange-300',inputClass: 'border-orange-400 text-orange-700 dark:text-orange-200'},
  { key: 'kelvin'     as Escala, sigla: 'K',  nome: 'Kelvin',      emoji: '❄️', bgClass: 'bg-gradient-to-br from-blue-50 to-blue-100/60 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200 dark:border-blue-800',       textClass: 'text-blue-700 dark:text-blue-300',    inputClass: 'border-blue-400 text-blue-700 dark:text-blue-200'   },
  { key: 'rankine'    as Escala, sigla: '°Ra', nome: 'Rankine',    emoji: '🔬', bgClass: 'bg-gradient-to-br from-purple-50 to-purple-100/60 dark:from-purple-900/20 dark:to-purple-800/10 border-purple-200 dark:border-purple-800',textClass: 'text-purple-700 dark:text-purple-300',inputClass: 'border-purple-400 text-purple-700 dark:text-purple-200'},
]

const referencias = [
  { nome: 'Zero absoluto',         celsius: -273.15 },
  { nome: 'Nitrogênio líquido',     celsius: -196    },
  { nome: 'Ponto de fusão do gelo', celsius: 0       },
  { nome: 'Dia agradável',          celsius: 22      },
  { nome: 'Temperatura corporal',   celsius: 36.5    },
  { nome: 'Febre',                  celsius: 38.5    },
  { nome: 'Água ferve (1 atm)',     celsius: 100     },
  { nome: 'Pão saindo do forno',    celsius: 180     },
]

function converter(origem: Escala) {
  const v = Number(valores[origem])
  if (isNaN(v)) return

  let c = 0
  switch (origem) {
    case 'celsius':    c = v; break
    case 'fahrenheit': c = (v - 32) * 5 / 9; break
    case 'kelvin':     c = v - 273.15; break
    case 'rankine':    c = (v - 491.67) * 5 / 9; break
  }

  const r = (n: number) => Math.round(n * 100) / 100

  if (origem !== 'celsius')    valores.celsius    = r(c)
  if (origem !== 'fahrenheit') valores.fahrenheit = r(c * 9 / 5 + 32)
  if (origem !== 'kelvin')     valores.kelvin     = r(c + 273.15)
  if (origem !== 'rankine')    valores.rankine    = r((c + 273.15) * 1.8)
}

function usarReferencia(celsius: number) {
  valores.celsius = celsius
  converter('celsius')
}
</script>

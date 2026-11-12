<template>
  <ToolShell
    title="Conversor de Área"
    description="Converta entre m², cm², km², pés², acres, hectares e mais unidades de área."
    icon="fa-vector-square"
    icon-gradient="from-lime-500 to-green-700"
    orb-color="teal"
    :quick-tips="['10 unidades', 'Conversão ao digitar', 'Conversões rápidas']"
    :tips="[
      { title: 'Métricas de área', text: '1 m² = 10.000 cm² · 1 hectare = 10.000 m² · 1 km² = 100 hectares = 1.000.000 m².' },
      { title: 'Sistema imperial', text: '1 acre = 4.046,86 m² · 1 ft² = 0,0929 m² · 1 mi² = 2,59 km².', type: 'info' },
      { title: 'Agricultura', text: 'No Brasil, medidas rurais usam hectares. 1 alqueire paulista ≈ 2,42 ha · 1 alqueire mineiro ≈ 4,84 ha.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Sala de 15 m²', desc: '15 m² em pés quadrados', result: '161,46 ft²' },
      { title: 'Fazenda 500 ha', desc: '500 hectares em km²', result: '5 km²' },
      { title: '1 acre em m²', desc: '1 acre', result: '4.046,86 m²' },
    ]"
  >

    <!-- Cards de conversão -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
      <!-- De -->
      <div class="glass-panel p-4">
        <label class="input-aurora-label mb-2">
          <i class="fas fa-arrow-right mr-1.5 text-lime-500"></i>
          De
        </label>
        <select v-model="unidadeOrigem" @change="converter" class="input-aurora mb-3">
          <option v-for="u in unidades" :key="u.codigo" :value="u.codigo">{{ u.nome }}</option>
        </select>
        <input
          v-model="valorOrigem"
          @input="converter"
          type="number"
          step="0.001"
          placeholder="0"
          class="input-aurora w-full text-right text-2xl font-black"
        />
      </div>

      <!-- Para -->
      <div class="glass-panel p-4">
        <div class="flex items-center justify-between mb-2">
          <label class="input-aurora-label !mb-0">
            <i class="fas fa-arrow-left mr-1.5 text-lime-500"></i>
            Para
          </label>
          <button
            @click="inverter"
            class="p-2 rounded-xl bg-lime-50 dark:bg-lime-900/20 hover:bg-lime-100 dark:hover:bg-lime-900/40 transition-colors"
            title="Inverter conversão"
          >
            <i class="fas fa-exchange-alt text-lime-600 dark:text-lime-400 text-sm"></i>
          </button>
        </div>
        <select v-model="unidadeDestino" @change="converter" class="input-aurora mb-3">
          <option v-for="u in unidades" :key="u.codigo" :value="u.codigo">{{ u.nome }}</option>
        </select>
        <div class="w-full px-4 py-3 rounded-xl border-2 border-lime-400 dark:border-lime-600 bg-lime-50 dark:bg-lime-900/20 text-right text-2xl font-black text-lime-700 dark:text-lime-300">
          {{ valorDestino }}
        </div>
      </div>
    </div>

    <!-- Resultado principal -->
    <Transition name="scale-in" appear>
      <div v-if="Number(valorOrigem) > 0" class="space-y-4 mb-5">
        <!-- Métricas de outras unidades -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-list-check text-lime-500"></i>
            Conversões para outras unidades
          </h4>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div
              v-for="conv in conversoes"
              :key="conv.unidade"
              class="metric-glass ring-1 ring-lime-100 dark:ring-lime-900 cursor-pointer hover:ring-lime-400 dark:hover:ring-lime-600 transition-all"
              @click="unidadeDestino = conv.unidade; converter()"
              title="Clique para selecionar"
            >
              <div class="metric-glass-value text-lime-700 dark:text-lime-300 text-base">{{ conv.valor }}</div>
              <div class="metric-glass-label">{{ conv.nomeBreve }}</div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Conversões rápidas -->
    <div>
      <label class="input-aurora-label mb-2">
        <i class="fas fa-bolt mr-1.5 text-lime-500"></i>
        Conversões rápidas
      </label>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          v-for="conv in conversoesRapidas"
          :key="conv.de + conv.para"
          @click="usarConversao(conv)"
          class="p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-lime-400 dark:hover:border-lime-600 hover:bg-lime-50/50 dark:hover:bg-lime-900/10 transition-all text-left"
        >
          <span class="text-xs font-bold text-lime-600 dark:text-lime-400 block">{{ conv.de }} → {{ conv.para }}</span>
          <span class="text-[10px] text-gray-500 dark:text-slate-400">{{ conv.desc }}</span>
        </button>
      </div>
    </div>

    <!-- Referência rápida -->
    <div class="mt-4 tip-card">
      <i class="fas fa-info-circle text-lime-600 flex-shrink-0 mt-0.5"></i>
      <span class="text-xs">
        1 m² = 10.000 cm² = 0,0001 ha · 1 ha = 10.000 m² · 1 km² = 100 ha · 1 acre = 4.047 m²
      </span>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'

interface Unidade { codigo: string; nome: string; nomeBreve: string; paraM2: number }

const unidades: Unidade[] = [
  { codigo: 'mm2',  nome: 'Milímetro² (mm²)',   nomeBreve: 'mm²',  paraM2: 0.000001 },
  { codigo: 'cm2',  nome: 'Centímetro² (cm²)',  nomeBreve: 'cm²',  paraM2: 0.0001 },
  { codigo: 'm2',   nome: 'Metro² (m²)',         nomeBreve: 'm²',   paraM2: 1 },
  { codigo: 'ha',   nome: 'Hectare (ha)',        nomeBreve: 'ha',   paraM2: 10000 },
  { codigo: 'km2',  nome: 'Quilômetro² (km²)',   nomeBreve: 'km²',  paraM2: 1000000 },
  { codigo: 'in2',  nome: 'Polegada² (in²)',     nomeBreve: 'in²',  paraM2: 0.00064516 },
  { codigo: 'ft2',  nome: 'Pé² (ft²)',           nomeBreve: 'ft²',  paraM2: 0.092903 },
  { codigo: 'yd2',  nome: 'Jarda² (yd²)',        nomeBreve: 'yd²',  paraM2: 0.836127 },
  { codigo: 'acre', nome: 'Acre',               nomeBreve: 'acre', paraM2: 4046.86 },
  { codigo: 'mi2',  nome: 'Milha² (mi²)',        nomeBreve: 'mi²',  paraM2: 2589988 },
]

const conversoesRapidas = [
  { de: 'm²',   para: 'ft²',  desc: 'Metro → Pé',      deCode: 'm2',  paraCode: 'ft2' },
  { de: 'ha',   para: 'acre', desc: 'Hectare → Acre',   deCode: 'ha',  paraCode: 'acre' },
  { de: 'km²',  para: 'mi²',  desc: 'Km² → Milha²',    deCode: 'km2', paraCode: 'mi2' },
  { de: 'ft²',  para: 'm²',   desc: 'Pé → Metro',      deCode: 'ft2', paraCode: 'm2' },
]

const unidadeOrigem  = ref('m2')
const unidadeDestino = ref('ft2')
const valorOrigem    = ref(100)
const valorDestino   = ref('0')

const calcVal = (valor: number, de: string, para: string): string => {
  const uDe   = unidades.find(u => u.codigo === de)
  const uPara = unidades.find(u => u.codigo === para)
  if (!uDe || !uPara) return '0'
  const em2 = valor * uDe.paraM2
  const v   = em2 / uPara.paraM2
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 0.001 && v !== 0)) return v.toExponential(3)
  return v.toFixed(4).replace(/\.?0+$/, '') || '0'
}

const converter = () => {
  const v = Number(valorOrigem.value) || 0
  valorDestino.value = calcVal(v, unidadeOrigem.value, unidadeDestino.value)
}

const conversoes = computed(() => {
  const v = Number(valorOrigem.value) || 0
  return unidades
    .filter(u => u.codigo !== unidadeOrigem.value)
    .slice(0, 6)
    .map(u => ({ unidade: u.codigo, nomeBreve: u.nomeBreve, valor: calcVal(v, unidadeOrigem.value, u.codigo) }))
})

const inverter = () => {
  const tmp = unidadeOrigem.value
  unidadeOrigem.value  = unidadeDestino.value
  unidadeDestino.value = tmp
  converter()
}

const usarConversao = (conv: { deCode: string; paraCode: string }) => {
  unidadeOrigem.value  = conv.deCode
  unidadeDestino.value = conv.paraCode
  converter()
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

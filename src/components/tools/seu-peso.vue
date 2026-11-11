<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'

type View = 'calculator' | 'tracking'

const activeView = ref<View>('calculator')

// Calculator
const form = reactive({ peso: '', altura: '', idade: '', sexo: 'masculino' as 'masculino' | 'feminino' })
const resultado = ref<{
  imc: number; categoria: string; pesoMin: number; pesoMax: number
  difMin: number; difMax: number; classificacao: 'abaixo' | 'normal' | 'acima'
} | null>(null)
const notification = ref('')

// Tracking
const historico = ref<{ data: string; peso: number; imc: number }[]>(
  (() => { try { return JSON.parse(localStorage.getItem('sp-historico') || '[]') } catch { return [] } })()
)
const novoRegistro = ref({ peso: '', data: new Date().toISOString().split('T')[0] })

function getCategoria(imc: number) {
  if (imc < 18.5) return { label: 'Abaixo do peso', color: 'text-blue-400' }
  if (imc < 25) return { label: 'Peso ideal', color: 'text-green-400' }
  if (imc < 30) return { label: 'Sobrepeso', color: 'text-yellow-400' }
  if (imc < 35) return { label: 'Obesidade grau I', color: 'text-orange-400' }
  if (imc < 40) return { label: 'Obesidade grau II', color: 'text-red-400' }
  return { label: 'Obesidade grau III', color: 'text-red-600' }
}

function calcular() {
  const peso = parseFloat(form.peso)
  const altura = parseFloat(form.altura) / 100
  if (!peso || !altura || altura < 0.5 || altura > 2.5 || peso < 2) {
    notification.value = 'Dados inválidos. Verifique altura e peso.'
    setTimeout(() => { notification.value = '' }, 2500)
    return
  }

  const imc = peso / (altura * altura)
  const cat = getCategoria(imc)
  const pesoMin = 18.5 * altura * altura
  const pesoMax = 24.9 * altura * altura
  const classificacao = peso < pesoMin ? 'abaixo' : peso > pesoMax ? 'acima' : 'normal'
  const difMin = peso - pesoMin
  const difMax = peso - pesoMax

  resultado.value = {
    imc: Math.round(imc * 10) / 10,
    categoria: cat.label,
    pesoMin: Math.round(pesoMin * 10) / 10,
    pesoMax: Math.round(pesoMax * 10) / 10,
    difMin: Math.round(difMin * 10) / 10,
    difMax: Math.round(difMax * 10) / 10,
    classificacao,
  }
}

function limpar() {
  Object.assign(form, { peso: '', altura: '', idade: '', sexo: 'masculino' })
  resultado.value = null
}

function adicionarRegistro() {
  const p = parseFloat(novoRegistro.value.peso)
  const alt = parseFloat(form.altura || '170') / 100
  if (!p || p < 20 || p > 300) return
  const imc = alt > 0 ? Math.round((p / (alt * alt)) * 10) / 10 : 0
  const entry = { data: novoRegistro.value.data, peso: p, imc }
  historico.value = [entry, ...historico.value].slice(0, 20)
  try { localStorage.setItem('sp-historico', JSON.stringify(historico.value)) } catch {}
  novoRegistro.value.peso = ''
  notification.value = 'Registro adicionado!'
  setTimeout(() => { notification.value = '' }, 2000)
}

function removerRegistro(i: number) {
  historico.value.splice(i, 1)
  try { localStorage.setItem('sp-historico', JSON.stringify(historico.value)) } catch {}
}

const imcGauge = computed(() => resultado.value ? Math.min(100, (resultado.value.imc / 40) * 100) : 0)

const categoriaColor = computed(() => {
  if (!resultado.value) return ''
  return getCategoria(resultado.value.imc).color
})

const tendencia = computed(() => {
  if (historico.value.length < 2) return null
  const diff = historico.value[0].peso - historico.value[1].peso
  return { diff: Math.abs(diff).toFixed(1), up: diff > 0 }
})
</script>

<template>
  <ToolShell

    title="Seu Peso"

    description="Monitore e acompanhe seu peso com gráficos de evolução e metas."

    icon="fa-weight-scale"

    icon-gradient="from-blue-500 to-cyan-600"

    orb-color="blue"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:scale-bathroom" class="text-teal-400 w-7 h-7" />
        Seu Peso
      </h1>
      <p class="text-blue-200 text-sm">Calculadora de IMC e acompanhamento de peso</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2">
      <button v-for="[v, l, ic] in [['calculator','Calculadora IMC','mdi:calculator-variant'],['tracking','Acompanhamento','mdi:chart-line']] as const"
        :key="v" @click="activeView = v"
        :class="['flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border',
          activeView === v ? 'bg-teal-600 border-teal-500 text-white' : 'bg-[#0f1e3c] border-white/10 text-blue-200 hover:bg-white/10']">
        <Icon :icon="ic" class="w-4 h-4" />{{ l }}
      </button>
    </div>

    <!-- Calculator -->
    <div v-if="activeView === 'calculator'" class="grid lg:grid-cols-2 gap-5">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:account" class="text-teal-400 w-5 h-5" /> Dados</h2>
        <div class="space-y-3">
          <div>
            <label class="input-aurora-label">Peso atual (kg)</label>
            <input v-model="form.peso" type="number" step="0.1" min="2" max="300" placeholder="70.5" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Altura (cm)</label>
            <input v-model="form.altura" type="number" step="1" min="50" max="250" placeholder="175" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Sexo</label>
            <div class="grid grid-cols-2 gap-2">
              <button @click="form.sexo = 'masculino'" :class="['py-2 rounded-lg text-sm font-medium border transition-all', form.sexo === 'masculino' ? 'bg-teal-600 border-teal-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/5']">Masculino</button>
              <button @click="form.sexo = 'feminino'" :class="['py-2 rounded-lg text-sm font-medium border transition-all', form.sexo === 'feminino' ? 'bg-teal-600 border-teal-500 text-white' : 'border-white/10 text-blue-200 hover:bg-white/5']">Feminino</button>
            </div>
          </div>
        </div>
        <div class="flex gap-3">
          <button @click="calcular" class="flex-1 bg-teal-600 hover:bg-teal-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
            <Icon icon="mdi:calculator" class="w-4 h-4" /> Calcular IMC
          </button>
          <button @click="limpar" class="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-lg transition-colors">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:chart-donut" class="text-teal-400 w-5 h-5" /> Resultado</h2>
        <template v-if="resultado">
          <div class="text-center">
            <div class="text-5xl font-extrabold text-white mb-1">{{ resultado.imc }}</div>
            <div :class="['text-sm font-semibold', categoriaColor]">{{ resultado.categoria }}</div>
          </div>
          <!-- IMC bar -->
          <div class="relative h-3 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-600 rounded-full">
            <div class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full border-2 border-gray-900 shadow"
              :style="{ left: `${Math.min(95, Math.max(2, imcGauge))}%` }"></div>
          </div>
          <div class="flex justify-between text-[10px] text-blue-300"><span>Abaixo (18.5)</span><span>Normal (25)</span><span>Sobrepeso (30)</span><span>Obesidade</span></div>

          <div class="bg-[#0a1628] rounded-lg p-4 space-y-2">
            <div class="flex justify-between text-sm"><span class="text-blue-200">Peso mínimo ideal:</span><span class="text-white">{{ resultado.pesoMin }}kg</span></div>
            <div class="flex justify-between text-sm"><span class="text-blue-200">Peso máximo ideal:</span><span class="text-white">{{ resultado.pesoMax }}kg</span></div>
            <div v-if="resultado.classificacao === 'abaixo'" class="text-blue-300 text-sm">
              Você está {{ Math.abs(resultado.difMin) }}kg abaixo do mínimo ideal.
            </div>
            <div v-else-if="resultado.classificacao === 'acima'" class="text-orange-300 text-sm">
              Você está {{ resultado.difMax }}kg acima do máximo ideal.
            </div>
            <div v-else class="text-green-400 text-sm flex items-center gap-1">
              <Icon icon="mdi:check-circle" class="w-4 h-4" /> Parabéns! Você está no peso ideal.
            </div>
          </div>
        </template>
        <div v-else class="flex flex-col items-center justify-center h-32">
          <Icon icon="mdi:scale-bathroom" class="w-10 h-10 text-teal-400/20 mb-2" />
          <p class="text-blue-200 text-sm">Preencha e calcule</p>
        </div>
      </div>
    </div>

    <!-- Tracking -->
    <div v-if="activeView === 'tracking'" class="space-y-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:plus-circle" class="text-teal-400 w-5 h-5" /> Adicionar Registro</h2>
        <div class="flex gap-3 flex-wrap">
          <div class="flex-1 min-w-32">
            <label class="input-aurora-label">Peso (kg)</label>
            <input v-model="novoRegistro.peso" type="number" step="0.1" min="20" max="300" placeholder="70.5" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div class="flex-1 min-w-36">
            <label class="input-aurora-label">Data</label>
            <input v-model="novoRegistro.data" type="date"
              class="w-full input-aurora" />
          </div>
          <div class="flex items-end">
            <button @click="adicionarRegistro" class="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors">
              Adicionar
            </button>
          </div>
        </div>

        <div v-if="tendencia" class="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3 flex items-center gap-2">
          <Icon :icon="tendencia.up ? 'mdi:trending-up' : 'mdi:trending-down'" :class="tendencia.up ? 'text-red-400' : 'text-green-400'" class="w-5 h-5" />
          <span class="text-blue-200 text-sm">
            Tendência: {{ tendencia.up ? 'ganhou' : 'perdeu' }} {{ tendencia.diff }}kg desde o último registro.
          </span>
        </div>
      </div>

      <div v-if="historico.length" class="glass-panel p-5">
        <h2 class="text-white font-semibold mb-3 flex items-center gap-2"><Icon icon="mdi:history" class="text-teal-400 w-5 h-5" /> Histórico ({{ historico.length }} registros)</h2>

        <!-- Bar chart -->
        <div class="mb-4 space-y-1" v-if="historico.length > 0">
          <div v-for="(h, i) in historico.slice(0, 10)" :key="i" class="flex items-center gap-2 text-xs">
            <span class="text-blue-300 w-20 shrink-0 text-right">{{ new Date(h.data).toLocaleDateString('pt-BR') }}</span>
            <div class="flex-1 h-5 bg-gray-800 rounded relative">
              <div class="h-5 rounded bg-teal-600/70" :style="{ width: `${Math.min(100, (h.peso / 150) * 100)}%` }"></div>
              <span class="absolute right-2 top-0 text-white text-xs leading-5">{{ h.peso }}kg</span>
            </div>
            <span :class="['w-10 text-right', h.imc < 18.5 ? 'text-blue-400' : h.imc < 25 ? 'text-green-400' : h.imc < 30 ? 'text-yellow-400' : 'text-red-400']">{{ h.imc }}</span>
            <button @click="removerRegistro(i)" class="text-gray-500 hover:text-red-400 transition-colors">
              <Icon icon="mdi:close" class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div v-else class="glass-panel flex items-center justify-center p-10">
        <div class="text-center">
          <Icon icon="mdi:chart-line-variant" class="w-12 h-12 text-teal-400/20 mx-auto mb-2" />
          <p class="text-blue-200 text-sm">Adicione registros para ver a evolução</p>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="notification" :class="['fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg', notification.startsWith('Dados') ? 'bg-red-600' : 'bg-green-600']">{{ notification }}</div>
    </Transition>
  


  </ToolShell></template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
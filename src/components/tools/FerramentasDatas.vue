<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const slugTabMap: Record<string, string> = {
  'contador-dias': 'contador', 'somar-dias': 'somar', 'subtrair-dias': 'subtrair',
}
const aba = ref('contador')
onMounted(() => { aba.value = slugTabMap[route.params.slug as string] || 'contador' })
watch(() => route.params.slug, (s) => { if (s) aba.value = slugTabMap[s as string] || aba.value })

const tabs = [
  { id: 'contador', label: 'Contador de Dias', icon: 'mdi:calendar-range-outline' },
  { id: 'somar', label: 'Somar Dias', icon: 'mdi:calendar-plus-outline' },
  { id: 'subtrair', label: 'Subtrair Dias', icon: 'mdi:calendar-minus-outline' },
]

// Contador
const dataInicio = ref('')
const dataFim = ref('')

const diff = computed(() => {
  if (!dataInicio.value || !dataFim.value) return null
  const d1 = new Date(dataInicio.value + 'T00:00:00')
  const d2 = new Date(dataFim.value + 'T00:00:00')
  const ms = d2.getTime() - d1.getTime()
  const dias = Math.round(ms / (1000 * 60 * 60 * 24))
  const semanas = Math.floor(Math.abs(dias) / 7)
  const meses = Math.abs(d2.getMonth() - d1.getMonth() + (d2.getFullYear() - d1.getFullYear()) * 12)
  const anos = Math.abs(d2.getFullYear() - d1.getFullYear())
  return { dias, semanas, meses, anos, futuro: d2 > d1 }
})

// Somar
const dataBase = ref('')
const diasSomar = ref(30)
const dataResultadoSomar = computed(() => {
  if (!dataBase.value) return ''
  const d = new Date(dataBase.value + 'T00:00:00')
  d.setDate(d.getDate() + diasSomar.value)
  return d.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})
const dataResultadoSomarISO = computed(() => {
  if (!dataBase.value) return ''
  const d = new Date(dataBase.value + 'T00:00:00')
  d.setDate(d.getDate() + diasSomar.value)
  return d.toISOString().split('T')[0]
})

// Subtrair
const dataBaseSubt = ref('')
const diasSubtrair = ref(30)
const dataResultadoSubt = computed(() => {
  if (!dataBaseSubt.value) return ''
  const d = new Date(dataBaseSubt.value + 'T00:00:00')
  d.setDate(d.getDate() - diasSubtrair.value)
  return d.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
})

function copiar(text: string) { navigator.clipboard.writeText(text); Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false }) }

onMounted(() => {
  const hoje = new Date().toISOString().split('T')[0]
  dataBase.value = hoje; dataBaseSubt.value = hoje
  dataInicio.value = hoje
  const fimD = new Date(); fimD.setMonth(fimD.getMonth() + 3)
  dataFim.value = fimD.toISOString().split('T')[0]
})
</script>

<template>
  <ToolShell title="Ferramentas de Datas" description="Conte dias entre datas, some ou subtraia dias a uma data."
    icon="fa-calendar-alt" icon-gradient="from-orange-500 to-amber-700" orb-color="orange"
    :quick-tips="['Resultado imediato','Inclui semanas e meses','Formato brasileiro']"
    :tips="[{title:'Uso',text:'Selecione a operação e preencha as datas.'}]">

    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-orange-600 text-white border-orange-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- Contador de dias -->
    <div v-if="aba==='contador'" class="glass-panel p-5 space-y-4">
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="text-xs text-blue-300 mb-1 block">Data inicial</label><input v-model="dataInicio" type="date" class="w-full input-aurora" /></div>
        <div><label class="text-xs text-blue-300 mb-1 block">Data final</label><input v-model="dataFim" type="date" class="w-full input-aurora" /></div>
      </div>
      <div v-if="diff" class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="bg-white/5 p-4 rounded-xl">
          <p class="text-3xl font-bold font-mono" :class="diff.dias >= 0 ? 'text-green-400' : 'text-red-400'">{{ Math.abs(diff.dias) }}</p>
          <p class="text-xs text-blue-300 mt-1">Dias</p>
        </div>
        <div class="bg-white/5 p-4 rounded-xl">
          <p class="text-3xl font-bold font-mono text-white">{{ diff.semanas }}</p>
          <p class="text-xs text-blue-300 mt-1">Semanas</p>
        </div>
        <div class="bg-white/5 p-4 rounded-xl">
          <p class="text-3xl font-bold font-mono text-white">{{ diff.meses }}</p>
          <p class="text-xs text-blue-300 mt-1">Meses</p>
        </div>
        <div class="bg-white/5 p-4 rounded-xl">
          <p class="text-3xl font-bold font-mono text-white">{{ diff.anos }}</p>
          <p class="text-xs text-blue-300 mt-1">Anos</p>
        </div>
      </div>
      <p v-if="diff" class="text-sm text-blue-200 text-center">
        {{ diff.futuro ? '📅 Faltam' : '📅 Passaram' }} <strong>{{ Math.abs(diff.dias) }} dias</strong>
        entre as datas selecionadas.
      </p>
    </div>

    <!-- Somar dias -->
    <div v-if="aba==='somar'" class="glass-panel p-5 space-y-4">
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="text-xs text-blue-300 mb-1 block">Data base</label><input v-model="dataBase" type="date" class="w-full input-aurora" /></div>
        <div><label class="text-xs text-blue-300 mb-1 block">Dias a somar</label><input v-model.number="diasSomar" type="number" min="0" class="w-full input-aurora" /></div>
      </div>
      <div v-if="dataResultadoSomar" class="p-4 bg-white/5 rounded-xl text-center">
        <p class="text-xs text-blue-300 mb-2">Resultado:</p>
        <p class="text-xl font-bold text-white capitalize">{{ dataResultadoSomar }}</p>
        <p class="font-mono text-blue-300 text-sm mt-1">{{ dataResultadoSomarISO }}</p>
      </div>
      <button v-if="dataResultadoSomarISO" @click="copiar(dataResultadoSomarISO)" class="btn-glass text-sm py-1.5 px-3"><Icon icon="mdi:content-copy" class="w-4 h-4 mr-1 inline" />Copiar data</button>
    </div>

    <!-- Subtrair dias -->
    <div v-if="aba==='subtrair'" class="glass-panel p-5 space-y-4">
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="text-xs text-blue-300 mb-1 block">Data base</label><input v-model="dataBaseSubt" type="date" class="w-full input-aurora" /></div>
        <div><label class="text-xs text-blue-300 mb-1 block">Dias a subtrair</label><input v-model.number="diasSubtrair" type="number" min="0" class="w-full input-aurora" /></div>
      </div>
      <div v-if="dataResultadoSubt" class="p-4 bg-white/5 rounded-xl text-center">
        <p class="text-xs text-blue-300 mb-2">Resultado:</p>
        <p class="text-xl font-bold text-white capitalize">{{ dataResultadoSubt }}</p>
      </div>
    </div>
  </ToolShell>
</template>


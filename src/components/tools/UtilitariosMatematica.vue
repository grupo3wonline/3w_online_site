<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute()
const slugTabMap: Record<string, string> = {
  'numero-por-extenso': 'extenso', 'fatorar-numero': 'fatorar',
  'resto-divisao': 'resto', 'numeros-aleatorios': 'aleatorio',
}
const aba = ref('extenso')
onMounted(() => { aba.value = slugTabMap[route.params.slug as string] || 'extenso' })
watch(() => route.params.slug, (s) => { if (s) aba.value = slugTabMap[s as string] || aba.value })

const tabs = [
  { id: 'extenso', label: 'Número por Extenso', icon: 'mdi:alphabetical' },
  { id: 'fatorar', label: 'Fatorar Número', icon: 'mdi:function-variant' },
  { id: 'resto', label: 'Resto da Divisão', icon: 'mdi:division' },
  { id: 'aleatorio', label: 'Números Aleatórios', icon: 'mdi:dice-5-outline' },
]

// ─── Número por extenso ───────────────────────────────────────────────────────
const numExtenso = ref(1234.56)
const extensoMoeda = ref(true)

function numeroParaExtenso(n: number, moeda = true): string {
  if (n < 0) return 'menos ' + numeroParaExtenso(-n, moeda)
  if (n === 0) return moeda ? 'zero reais' : 'zero'
  const inteiro = Math.floor(n)
  const cents = Math.round((n - inteiro) * 100)
  const un = ['','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove']
  const dz = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa']
  const ct = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos']
  function menorMil(x: number): string {
    if (x === 0) return ''; if (x === 100) return 'cem'
    const c = Math.floor(x/100), r = x%100, d = Math.floor(r/10), u = r%10
    let s = c > 0 ? ct[c] : ''; if(c>0&&r>0) s += ' e '
    if(r>=20){s+=dz[d];if(u>0)s+=' e '+un[u]}else if(r>0)s+=un[r]; return s
  }
  function ext(x: number): string {
    if(x===0)return'zero'; const mi=Math.floor(x/1000000),ml=Math.floor((x%1000000)/1000),rs=x%1000; let s=''
    if(mi>0){s+=menorMil(mi)+(mi===1?' milhão':' milhões');if(ml>0||rs>0)s+=' e '}
    if(ml>0){s+=menorMil(ml)+' mil';if(rs>0)s+=' e '} if(rs>0)s+=menorMil(rs); return s
  }
  if (!moeda) return ext(inteiro)
  let txt = ext(inteiro) + (inteiro === 1 ? ' real' : ' reais')
  if (cents > 0) txt += ' e ' + ext(cents) + (cents === 1 ? ' centavo' : ' centavos')
  return txt
}

const resultadoExtenso = computed(() => {
  const n = parseFloat(String(numExtenso.value))
  if (isNaN(n)) return ''
  return numeroParaExtenso(n, extensoMoeda.value)
})

// ─── Fatorar ──────────────────────────────────────────────────────────────────
const numFatorar = ref(360)
interface Fator { primo: number; exp: number }
const fatores = computed<Fator[]>(() => {
  let n = Math.abs(Math.floor(numFatorar.value)) || 1
  const result: Fator[] = []
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      let exp = 0; while (n % i === 0) { exp++; n = Math.floor(n / i) }
      result.push({ primo: i, exp })
    }
  }
  if (n > 1) result.push({ primo: n, exp: 1 })
  return result
})
const fatorStr = computed(() => fatores.value.length ? fatores.value.map(f => f.exp > 1 ? `${f.primo}^${f.exp}` : f.primo).join(' × ') : (numFatorar.value === 1 ? '1' : 'primo'))

// ─── Resto da divisão ─────────────────────────────────────────────────────────
const dividendo = ref(17)
const divisor = ref(5)
const quociente = computed(() => Math.floor(dividendo.value / divisor.value))
const resto = computed(() => dividendo.value % divisor.value)

// ─── Números aleatórios ───────────────────────────────────────────────────────
const rMin = ref(1); const rMax = ref(100); const rQtd = ref(10); const rUnicos = ref(true)
const numerosAleatorios = ref<number[]>([])

function gerarAleatorios() {
  const min = Math.ceil(rMin.value), max = Math.floor(rMax.value)
  const qtd = Math.min(rQtd.value, max - min + 1, 1000)
  if (rUnicos.value) {
    const pool = Array.from({length: max - min + 1}, (_, i) => i + min)
    for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i+1));[pool[i],pool[j]]=[pool[j],pool[i]] }
    numerosAleatorios.value = pool.slice(0, qtd)
  } else {
    numerosAleatorios.value = Array.from({length: qtd}, () => Math.floor(Math.random() * (max - min + 1)) + min)
  }
}

function copiar(text: string) { navigator.clipboard.writeText(text); Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false }) }

onMounted(gerarAleatorios)
</script>

<template>
  <ToolShell title="Utilitários Matemáticos" description="Número por extenso, fatoração, resto da divisão e números aleatórios."
    icon="fa-calculator" icon-gradient="from-cyan-500 to-blue-700" orb-color="cyan"
    :quick-tips="['Resultado instantâneo','Fatoração prima','Números aleatórios únicos']"
    :tips="[{title:'Uso',text:'Selecione a operação e preencha os campos.'}]">

    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-cyan-600 text-white border-cyan-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- Número por extenso -->
    <div v-if="aba==='extenso'" class="glass-panel p-5 space-y-4">
      <div class="flex gap-3 items-end flex-wrap">
        <div class="flex-1"><label class="text-xs text-blue-300 mb-1 block">Número</label><input v-model.number="numExtenso" type="number" step="0.01" class="w-full input-aurora text-xl font-mono" /></div>
        <label class="flex items-center gap-2 pb-2.5 cursor-pointer"><input type="checkbox" v-model="extensoMoeda" class="accent-cyan-500 w-4 h-4" /><span class="text-sm text-blue-200">Moeda (R$)</span></label>
      </div>
      <div v-if="resultadoExtenso" class="p-4 bg-white/5 rounded-xl">
        <p class="text-xs text-blue-300 mb-1">Por extenso:</p>
        <p class="text-lg text-white font-semibold capitalize leading-relaxed">{{ resultadoExtenso }}</p>
      </div>
      <button @click="copiar(resultadoExtenso)" class="btn-glass text-sm py-2 px-4"><Icon icon="mdi:content-copy" class="w-4 h-4 mr-1 inline" />Copiar</button>
    </div>

    <!-- Fatorar -->
    <div v-if="aba==='fatorar'" class="glass-panel p-5 space-y-4">
      <div><label class="text-xs text-blue-300 mb-1 block">Número a fatorar</label><input v-model.number="numFatorar" type="number" min="1" class="w-full input-aurora text-xl font-mono" /></div>
      <div v-if="fatores.length" class="space-y-2">
        <p class="text-sm text-blue-300">Fatorização prima:</p>
        <div class="p-4 bg-white/5 rounded-xl flex flex-wrap gap-3 items-center">
          <span class="text-xl font-bold text-white">{{ numFatorar }}</span>
          <span class="text-blue-400">=</span>
          <span v-for="(f, i) in fatores" :key="i" class="flex items-center gap-1">
            <span class="bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 font-mono font-bold px-3 py-1 rounded-lg text-lg">{{ f.primo }}<sup v-if="f.exp>1" class="text-sm">{{ f.exp }}</sup></span>
            <span v-if="i < fatores.length-1" class="text-blue-400 text-xl">×</span>
          </span>
        </div>
        <p class="text-xs text-blue-300 font-mono">{{ numFatorar }} = {{ fatorStr }}</p>
      </div>
      <div v-else class="p-4 bg-white/5 rounded-xl"><p class="text-blue-300">{{ numFatorar }} é um número primo.</p></div>
    </div>

    <!-- Resto da divisão -->
    <div v-if="aba==='resto'" class="glass-panel p-5 space-y-4">
      <div class="grid grid-cols-2 gap-3">
        <div><label class="text-xs text-blue-300 mb-1 block">Dividendo</label><input v-model.number="dividendo" type="number" class="w-full input-aurora text-xl font-mono" /></div>
        <div><label class="text-xs text-blue-300 mb-1 block">Divisor</label><input v-model.number="divisor" type="number" class="w-full input-aurora text-xl font-mono" /></div>
      </div>
      <div v-if="divisor" class="p-4 bg-white/5 rounded-xl grid grid-cols-3 gap-3 text-center">
        <div><p class="text-blue-300 text-xs mb-1">Quociente</p><p class="text-2xl font-bold font-mono text-white">{{ quociente }}</p></div>
        <div><p class="text-blue-300 text-xs mb-1">Resto</p><p class="text-2xl font-bold font-mono text-green-400">{{ resto }}</p></div>
        <div><p class="text-blue-300 text-xs mb-1">Resultado</p><p class="text-sm font-mono text-blue-200">{{ dividendo }} = {{ divisor }} × {{ quociente }} + {{ resto }}</p></div>
      </div>
    </div>

    <!-- Números aleatórios -->
    <div v-if="aba==='aleatorio'" class="glass-panel p-5 space-y-4">
      <div class="flex flex-wrap gap-3 items-end">
        <div><label class="text-xs text-blue-300 mb-1 block">Mínimo</label><input v-model.number="rMin" type="number" class="w-24 input-aurora" /></div>
        <div><label class="text-xs text-blue-300 mb-1 block">Máximo</label><input v-model.number="rMax" type="number" class="w-24 input-aurora" /></div>
        <div><label class="text-xs text-blue-300 mb-1 block">Quantidade</label><input v-model.number="rQtd" type="number" min="1" max="1000" class="w-24 input-aurora" /></div>
        <label class="flex items-center gap-2 pb-2.5 cursor-pointer"><input type="checkbox" v-model="rUnicos" class="accent-cyan-500 w-4 h-4" /><span class="text-sm text-blue-200">Únicos</span></label>
        <button @click="gerarAleatorios" class="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-colors pb-2.5">
          <Icon icon="mdi:refresh" class="w-4 h-4" /> Sortear
        </button>
      </div>
      <div v-if="numerosAleatorios.length" class="space-y-2">
        <div class="flex justify-between items-center">
          <span class="text-xs text-blue-300">{{ numerosAleatorios.length }} números gerados</span>
          <button @click="copiar(numerosAleatorios.join(', '))" class="text-xs text-blue-400 hover:text-white"><Icon icon="mdi:content-copy" class="w-3.5 h-3.5 inline mr-1" />Copiar</button>
        </div>
        <div class="flex flex-wrap gap-2 p-3 bg-white/5 rounded-lg max-h-60 overflow-y-auto">
          <span v-for="n in numerosAleatorios" :key="n" class="font-mono text-white bg-cyan-600/20 border border-cyan-500/30 px-2 py-0.5 rounded text-sm">{{ n }}</span>
        </div>
      </div>
    </div>
  </ToolShell>
</template>


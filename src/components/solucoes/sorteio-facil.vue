<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

type DrawTab = 'names' | 'numbers' | 'groups'
type GroupMode = 'count' | 'size'

const activeTab = ref<DrawTab>('names')

// --- Names Draw ---
const namesRaw = ref('')
const namesQty = ref(1)
const namesRepeat = ref(false)
const namesResult = ref<string[] | null>(null)

const namesList = computed(() =>
  namesRaw.value.split(/\r?\n/).map(n => n.trim()).filter(Boolean)
)

function shuffleArr<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function sampleNames(arr: string[], qty: number, withReplacement: boolean): string[] {
  if (withReplacement) return Array.from({ length: qty }, () => arr[Math.floor(Math.random() * arr.length)])
  if (qty >= arr.length) return shuffleArr(arr)
  return shuffleArr(arr).slice(0, qty)
}

function drawNames() {
  if (namesList.value.length < 2) {
    Swal.fire({ icon: 'warning', title: 'Lista curta', text: 'Insira pelo menos 2 nomes.', confirmButtonColor: '#3b82f6' })
    return
  }
  if (!namesRepeat.value && namesQty.value > namesList.value.length) {
    Swal.fire({ icon: 'warning', title: 'Limite excedido', text: 'Sem repetição, a quantidade não pode exceder o número de nomes.', confirmButtonColor: '#3b82f6' })
    return
  }
  namesResult.value = sampleNames(namesList.value, Math.max(1, namesQty.value), namesRepeat.value)
}

// --- Number Draw ---
const numMin = ref(1)
const numMax = ref(100)
const numQty = ref(1)
const numRepeat = ref(false)
const numResult = ref<number[] | null>(null)

function drawNumbers() {
  if (numMin.value > numMax.value) {
    Swal.fire({ icon: 'warning', title: 'Intervalo inválido', text: 'Mínimo deve ser ≤ máximo.', confirmButtonColor: '#3b82f6' })
    return
  }
  const rangeSize = numMax.value - numMin.value + 1
  if (!numRepeat.value && numQty.value > rangeSize) {
    Swal.fire({ icon: 'warning', title: 'Limite excedido', text: 'Sem repetição, a quantidade não pode exceder o tamanho do intervalo.', confirmButtonColor: '#3b82f6' })
    return
  }
  if (numRepeat.value) {
    numResult.value = Array.from({ length: numQty.value }, () =>
      Math.floor(Math.random() * (numMax.value - numMin.value + 1)) + numMin.value
    )
  } else {
    const pool = Array.from({ length: rangeSize }, (_, i) => numMin.value + i)
    numResult.value = shuffleArr(pool).slice(0, numQty.value)
  }
}

// --- Groups Draw ---
const groupsRaw = ref('')
const groupMode = ref<GroupMode>('count')
const groupValue = ref(2)
const groupsResult = ref<string[][] | null>(null)

const groupsList = computed(() =>
  groupsRaw.value.split(/\r?\n/).map(n => n.trim()).filter(Boolean)
)

function drawGroups() {
  if (groupsList.value.length < 2) {
    Swal.fire({ icon: 'warning', title: 'Lista curta', text: 'Insira pelo menos 2 nomes.', confirmButtonColor: '#3b82f6' })
    return
  }
  const shuffled = shuffleArr(groupsList.value)
  const groups: string[][] = []
  if (groupMode.value === 'count') {
    const cnt = Math.max(1, groupValue.value)
    for (let i = 0; i < cnt; i++) groups.push([])
    shuffled.forEach((name, idx) => groups[idx % cnt].push(name))
  } else {
    const sz = Math.max(1, groupValue.value)
    for (let i = 0; i < shuffled.length; i += sz) groups.push(shuffled.slice(i, i + sz))
  }
  groupsResult.value = groups
}

// --- Copy ---
const copiedText = ref(false)
async function copyResult(text: string) {
  await navigator.clipboard.writeText(text)
  copiedText.value = true
  setTimeout(() => { copiedText.value = false }, 2000)
}

const namesResultText = computed(() => namesResult.value?.join('\n') ?? '')
const numResultText = computed(() => numResult.value?.join(', ') ?? '')
const groupsResultText = computed(() =>
  groupsResult.value?.map((g, i) => `Grupo ${i + 1}: ${g.join(', ')}`).join('\n') ?? ''
)

const tabs: { key: DrawTab; label: string; icon: string }[] = [
  { key: 'names', label: 'Por Nomes', icon: 'mdi:account-group-outline' },
  { key: 'numbers', label: 'Por Números', icon: 'mdi:dice-multiple-outline' },
  { key: 'groups', label: 'Por Grupos', icon: 'mdi:group' },
]
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:trophy-outline" class="text-yellow-400 w-7 h-7" />
        Sorteio Fácil
      </h1>
      <p class="text-blue-300/70 text-sm">Sorteios rápidos e transparentes</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 bg-[#111d3a] border border-white/10 rounded-xl p-1 mb-6">
      <button
        v-for="tab in tabs" :key="tab.key"
        @click="activeTab = tab.key"
        :class="activeTab === tab.key ? 'bg-blue-600 text-white shadow' : 'text-blue-300 hover:text-white hover:bg-white/5'"
        class="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-medium transition-all"
      >
        <Icon :icon="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Names Tab -->
    <div v-if="activeTab === 'names'" class="grid md:grid-cols-2 gap-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Participantes</h2>
        <textarea
          v-model="namesRaw"
          rows="8"
          placeholder="Ana&#10;Bruno&#10;Carla&#10;..."
          class="w-full bg-[#0a1628] border border-white/10 text-white rounded-lg px-3 py-2 text-sm resize-none focus:border-blue-500 focus:outline-none placeholder-blue-300/30"
        />
        <div class="flex gap-4 items-end">
          <div class="flex-1">
            <label class="text-blue-300 text-xs mb-1 block">Quantidade de sorteados</label>
            <input type="number" v-model.number="namesQty" min="1"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
          <label class="flex items-center gap-2 cursor-pointer pb-1.5">
            <input type="checkbox" v-model="namesRepeat" class="w-4 h-4 accent-blue-500" />
            <span class="text-blue-200 text-sm">Repetição</span>
          </label>
        </div>
        <button @click="drawNames"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
          <Icon icon="mdi:shuffle-variant" class="w-4 h-4" />
          Sortear
        </button>
      </div>

      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Resultado</h2>
        <div v-if="namesResult" class="space-y-2">
          <div v-for="(name, i) in namesResult" :key="i"
            class="flex items-center gap-3 bg-[#0a1628] border border-white/10 rounded-lg px-4 py-2.5">
            <span class="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">{{ i + 1 }}</span>
            <span class="font-semibold text-white">{{ name }}</span>
          </div>
        </div>
        <div v-else class="text-center py-12 text-blue-300/40">
          <Icon icon="mdi:trophy-outline" class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">O resultado aparecerá aqui</p>
        </div>
        <button v-if="namesResult" @click="copyResult(namesResultText)"
          :class="copiedText ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
          class="w-full py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
          <Icon :icon="copiedText ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
          {{ copiedText ? 'Copiado!' : 'Copiar Resultado' }}
        </button>
      </div>
    </div>

    <!-- Numbers Tab -->
    <div v-if="activeTab === 'numbers'" class="grid md:grid-cols-2 gap-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Parâmetros</h2>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="text-blue-300 text-xs mb-1 block">Mínimo</label>
            <input type="number" v-model.number="numMin"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
          <div>
            <label class="text-blue-300 text-xs mb-1 block">Máximo</label>
            <input type="number" v-model.number="numMax"
              class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
          </div>
        </div>
        <div>
          <label class="text-blue-300 text-xs mb-1 block">Quantidade</label>
          <input type="number" v-model.number="numQty" min="1"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="numRepeat" class="w-4 h-4 accent-blue-500" />
          <span class="text-blue-200 text-sm">Permitir repetição</span>
        </label>
        <button @click="drawNumbers"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
          <Icon icon="mdi:dice-multiple-outline" class="w-4 h-4" />
          Sortear Números
        </button>
      </div>

      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Resultado</h2>
        <div v-if="numResult">
          <div class="text-3xl font-bold text-white tracking-wide text-center py-4">
            {{ numResult.join(' · ') }}
          </div>
          <button @click="copyResult(numResultText)"
            :class="copiedText ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
            class="w-full py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 mt-2">
            <Icon :icon="copiedText ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
            {{ copiedText ? 'Copiado!' : 'Copiar Resultado' }}
          </button>
        </div>
        <div v-else class="text-center py-12 text-blue-300/40">
          <Icon icon="mdi:numeric" class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">Defina os parâmetros e sorteie</p>
        </div>
      </div>
    </div>

    <!-- Groups Tab -->
    <div v-if="activeTab === 'groups'" class="grid md:grid-cols-2 gap-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Participantes e Configurações</h2>
        <textarea
          v-model="groupsRaw"
          rows="7"
          placeholder="Ana&#10;Bruno&#10;Carla&#10;..."
          class="w-full bg-[#0a1628] border border-white/10 text-white rounded-lg px-3 py-2 text-sm resize-none focus:border-blue-500 focus:outline-none placeholder-blue-300/30"
        />
        <div class="flex gap-2">
          <label
            v-for="m in [{ val: 'count', label: 'Nº de grupos' }, { val: 'size', label: 'Pessoas/grupo' }]"
            :key="m.val"
            class="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 cursor-pointer text-sm transition-colors"
            :class="groupMode === m.val ? 'border-blue-500 bg-blue-600/20 text-white' : 'border-white/20 text-blue-300 hover:border-blue-400'"
          >
            <input type="radio" v-model="groupMode" :value="m.val" class="sr-only" />
            {{ m.label }}
          </label>
        </div>
        <div>
          <label class="text-blue-300 text-xs mb-1 block">{{ groupMode === 'count' ? 'Quantidade de grupos' : 'Tamanho do grupo' }}</label>
          <input type="number" v-model.number="groupValue" min="1"
            class="w-full bg-[#0a1628] border border-white/20 text-white rounded px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none" />
        </div>
        <button @click="drawGroups"
          class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
          <Icon icon="mdi:group" class="w-4 h-4" />
          Gerar Grupos
        </button>
      </div>

      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-4">
        <h2 class="text-sm font-semibold text-blue-200">Resultado</h2>
        <div v-if="groupsResult" class="grid grid-cols-2 gap-3">
          <div v-for="(g, i) in groupsResult" :key="i"
            class="bg-[#0a1628] border border-white/10 rounded-lg p-3">
            <div class="text-blue-400 text-xs font-semibold mb-2">Grupo {{ i + 1 }}</div>
            <ul class="space-y-1">
              <li v-for="(name, j) in g" :key="j" class="text-sm text-blue-100">{{ name }}</li>
            </ul>
          </div>
        </div>
        <div v-else class="text-center py-12 text-blue-300/40">
          <Icon icon="mdi:group" class="w-12 h-12 mx-auto mb-2" />
          <p class="text-sm">Os grupos aparecerão aqui</p>
        </div>
        <button v-if="groupsResult" @click="copyResult(groupsResultText)"
          :class="copiedText ? 'bg-emerald-700' : 'bg-white/10 hover:bg-white/20'"
          class="w-full py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2">
          <Icon :icon="copiedText ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
          {{ copiedText ? 'Copiado!' : 'Copiar Resultado' }}
        </button>
      </div>
    </div>
  </div>
</template>

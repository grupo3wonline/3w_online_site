<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

type DrawTab = 'names' | 'numbers' | 'groups'
type GroupMode = 'count' | 'size'

const activeTab = ref<DrawTab>('names')

// --- Nomes ---
const namesRaw    = ref('')
const namesQty    = ref(1)
const namesRepeat = ref(false)
const namesResult = ref<string[] | null>(null)

const namesList = computed(() => namesRaw.value.split(/\r?\n/).map(n => n.trim()).filter(Boolean))

function shuffleArr<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function drawNames() {
  if (namesList.value.length < 2) {
    Swal.fire({ icon: 'warning', title: 'Insira pelo menos 2 nomes', confirmButtonColor: '#2563eb' }); return
  }
  if (!namesRepeat.value && namesQty.value > namesList.value.length) {
    Swal.fire({ icon: 'warning', title: 'Quantidade maior que a lista', confirmButtonColor: '#2563eb' }); return
  }
  namesResult.value = namesRepeat.value
    ? Array.from({ length: namesQty.value }, () => namesList.value[Math.floor(Math.random() * namesList.value.length)])
    : shuffleArr(namesList.value).slice(0, Math.max(1, namesQty.value))
}

// --- Números ---
const numMin    = ref(1)
const numMax    = ref(100)
const numQty    = ref(1)
const numRepeat = ref(false)
const numResult = ref<number[] | null>(null)

function drawNumbers() {
  if (numMin.value > numMax.value) {
    Swal.fire({ icon: 'warning', title: 'Mínimo deve ser ≤ máximo', confirmButtonColor: '#2563eb' }); return
  }
  const rangeSize = numMax.value - numMin.value + 1
  if (!numRepeat.value && numQty.value > rangeSize) {
    Swal.fire({ icon: 'warning', title: 'Quantidade maior que o intervalo', confirmButtonColor: '#2563eb' }); return
  }
  if (numRepeat.value) {
    numResult.value = Array.from({ length: numQty.value }, () => Math.floor(Math.random() * (numMax.value - numMin.value + 1)) + numMin.value)
  } else {
    numResult.value = shuffleArr(Array.from({ length: rangeSize }, (_, i) => numMin.value + i)).slice(0, numQty.value)
  }
}

// --- Grupos ---
const groupsRaw  = ref('')
const groupMode  = ref<GroupMode>('count')
const groupValue = ref(2)
const groupsResult = ref<string[][] | null>(null)

const groupsList = computed(() => groupsRaw.value.split(/\r?\n/).map(n => n.trim()).filter(Boolean))

function drawGroups() {
  if (groupsList.value.length < 2) {
    Swal.fire({ icon: 'warning', title: 'Insira pelo menos 2 nomes', confirmButtonColor: '#2563eb' }); return
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

// --- Copiar ---
const copiedText = ref(false)
async function copyResult(text: string) {
  await navigator.clipboard.writeText(text)
  copiedText.value = true; setTimeout(() => { copiedText.value = false }, 2000)
}

const namesResultText  = computed(() => namesResult.value?.join('\n') ?? '')
const numResultText    = computed(() => numResult.value?.join(', ') ?? '')
const groupsResultText = computed(() => groupsResult.value?.map((g, i) => `Grupo ${i + 1}: ${g.join(', ')}`).join('\n') ?? '')

const tabs: { key: DrawTab; label: string; icon: string }[] = [
  { key: 'names',   label: 'Por Nomes',   icon: 'fa-users'  },
  { key: 'numbers', label: 'Por Números', icon: 'fa-dice'   },
  { key: 'groups',  label: 'Por Grupos',  icon: 'fa-layer-group' },
]
</script>

<template>
  <ToolShell
    title="Sorteio Fácil"
    description="Sorteios rápidos e transparentes por nomes, números ou divisão em grupos."
    icon="fa-trophy"
    icon-gradient="from-yellow-500 to-orange-600"
    orb-color="orange"
    :quick-tips="['Sorteio por nomes', 'Sorteio numérico', 'Divisão em grupos']"
    :tips="[
      { title: 'Sorteio justo', text: 'O algoritmo usa o Fisher-Yates shuffle, garantindo distribuição verdadeiramente aleatória.' },
      { title: 'Sem repetição', text: 'Com a opção Repetição desativada, cada nome/número só aparece uma vez no resultado.' },
      { title: 'Grupos equilibrados', text: 'No modo Por Grupos, os participantes são embaralhados e distribuídos uniformemente.' },
    ]"
    :examples="[
      { title: 'Amigo Secreto', desc: 'Liste os participantes e sorteie 1 por vez com repetição desativada', result: 'Cada pessoa sorteada uma vez' },
      { title: 'Mega da Virada', desc: 'Mínimo 1 / Máximo 60 / Quantidade 6 / Sem repetição', result: '6 números únicos entre 1 e 60' },
      { title: 'Times de futebol', desc: '10 jogadores divididos em 2 grupos', result: 'Grupo 1 (5 jogadores) + Grupo 2 (5 jogadores)' },
    ]"
  >
    <!-- Abas -->
    <div class="flex gap-1 bg-gray-100 dark:bg-slate-800 rounded-xl p-1 mb-5">
      <button
        v-for="tab in tabs" :key="tab.key"
        @click="activeTab = tab.key"
        :class="[
          'flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all',
          activeTab === tab.key ? 'bg-white dark:bg-slate-700 text-primary-700 dark:text-primary-300 shadow-sm' : 'text-gray-500 dark:text-slate-400 hover:text-gray-700'
        ]"
      >
        <i :class="['fas', tab.icon, 'text-xs']"></i>
        {{ tab.label }}
      </button>
    </div>

    <!-- Por Nomes -->
    <div v-if="activeTab === 'names'" class="grid md:grid-cols-2 gap-4">
      <div class="tool-body !mb-0 space-y-3">
        <div>
          <label class="input-aurora-label"><i class="fas fa-users mr-1.5 text-primary-500"></i>Participantes (um por linha)</label>
          <textarea v-model="namesRaw" rows="7" placeholder="Ana&#10;Bruno&#10;Carla&#10;Daniel&#10;..."
            class="w-full input-aurora resize-none font-mono text-sm mt-1" />
        </div>
        <BaseInput v-model="namesQty" label="Quantidade a sortear" type="number" :min="1" icon="fa-hashtag" />
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="namesRepeat" class="checkbox-aurora" />
          <span class="text-sm text-gray-700 dark:text-slate-200">Permitir repetição</span>
        </label>
        <BaseButton variant="success" icon="fa-shuffle" @click="drawNames" class="w-full">Sortear</BaseButton>
      </div>
      <div class="glass-panel p-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3">Resultado</h3>
        <Transition name="scale-in" appear>
          <div v-if="namesResult" class="space-y-2">
            <div v-for="(name, i) in namesResult" :key="i"
              class="flex items-center gap-3 bg-gray-50 dark:bg-slate-800 rounded-lg px-3 py-2">
              <span class="w-6 h-6 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center font-bold shrink-0">{{ i + 1 }}</span>
              <span class="font-semibold text-gray-900 dark:text-white text-sm">{{ name }}</span>
            </div>
            <button @click="copyResult(namesResultText)"
              :class="['w-full mt-2 py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2', copiedText ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700' : 'btn-glass']">
              <i :class="['fas', copiedText ? 'fa-check' : 'fa-copy']"></i>
              {{ copiedText ? 'Copiado!' : 'Copiar Resultado' }}
            </button>
          </div>
        </Transition>
        <div v-if="!namesResult" class="text-center py-10 text-gray-400 dark:text-slate-500">
          <i class="fas fa-trophy text-3xl mb-2 block opacity-30"></i>
          <p class="text-xs">O resultado aparecerá aqui</p>
        </div>
      </div>
    </div>

    <!-- Por Números -->
    <div v-if="activeTab === 'numbers'" class="grid md:grid-cols-2 gap-4">
      <div class="tool-body !mb-0 space-y-3">
        <div class="grid grid-cols-2 gap-3">
          <BaseInput v-model="numMin" label="Mínimo" type="number" icon="fa-arrow-down" />
          <BaseInput v-model="numMax" label="Máximo" type="number" icon="fa-arrow-up" />
        </div>
        <BaseInput v-model="numQty" label="Quantidade" type="number" :min="1" icon="fa-hashtag" />
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="numRepeat" class="checkbox-aurora" />
          <span class="text-sm text-gray-700 dark:text-slate-200">Permitir repetição</span>
        </label>
        <BaseButton variant="success" icon="fa-dice" @click="drawNumbers" class="w-full">Sortear Números</BaseButton>
      </div>
      <div class="glass-panel p-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3">Resultado</h3>
        <Transition name="scale-in" appear>
          <div v-if="numResult">
            <div class="text-3xl font-black text-primary-600 dark:text-primary-400 tracking-wide text-center py-4">
              {{ numResult.join(' · ') }}
            </div>
            <button @click="copyResult(numResultText)"
              :class="['w-full py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-2', copiedText ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700' : 'btn-glass']">
              <i :class="['fas', copiedText ? 'fa-check' : 'fa-copy']"></i>
              {{ copiedText ? 'Copiado!' : 'Copiar Resultado' }}
            </button>
          </div>
        </Transition>
        <div v-if="!numResult" class="text-center py-10 text-gray-400 dark:text-slate-500">
          <i class="fas fa-dice text-3xl mb-2 block opacity-30"></i>
          <p class="text-xs">Defina o intervalo e sorteie</p>
        </div>
      </div>
    </div>

    <!-- Por Grupos -->
    <div v-if="activeTab === 'groups'" class="grid md:grid-cols-2 gap-4">
      <div class="tool-body !mb-0 space-y-3">
        <div>
          <label class="input-aurora-label"><i class="fas fa-layer-group mr-1.5 text-primary-500"></i>Participantes (um por linha)</label>
          <textarea v-model="groupsRaw" rows="6" placeholder="Ana&#10;Bruno&#10;Carla&#10;..."
            class="w-full input-aurora resize-none font-mono text-sm mt-1" />
        </div>
        <div class="flex gap-2">
          <label v-for="m in [{ val: 'count', label: 'Nº de grupos' }, { val: 'size', label: 'Pessoas/grupo' }]" :key="m.val"
            class="flex-1 flex items-center justify-center gap-2 border-2 rounded-xl py-2 cursor-pointer text-sm font-semibold transition-all"
            :class="groupMode === m.val ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-gray-200 dark:border-slate-600 text-gray-500'">
            <input type="radio" v-model="groupMode" :value="m.val" class="sr-only" />
            {{ m.label }}
          </label>
        </div>
        <BaseInput v-model="groupValue" :label="groupMode === 'count' ? 'Número de grupos' : 'Pessoas por grupo'" type="number" :min="1" icon="fa-hashtag" />
        <BaseButton variant="success" icon="fa-layer-group" @click="drawGroups" class="w-full">Gerar Grupos</BaseButton>
      </div>
      <div class="glass-panel p-4">
        <h3 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3">Resultado</h3>
        <Transition name="scale-in" appear>
          <div v-if="groupsResult" class="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto">
            <div v-for="(g, i) in groupsResult" :key="i" class="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
              <div class="text-primary-600 dark:text-primary-400 text-xs font-bold mb-1.5">Grupo {{ i + 1 }}</div>
              <ul class="space-y-0.5">
                <li v-for="(name, j) in g" :key="j" class="text-xs text-gray-700 dark:text-slate-200">{{ name }}</li>
              </ul>
            </div>
          </div>
        </Transition>
        <div v-if="!groupsResult" class="text-center py-10 text-gray-400 dark:text-slate-500">
          <i class="fas fa-layer-group text-3xl mb-2 block opacity-30"></i>
          <p class="text-xs">Os grupos aparecerão aqui</p>
        </div>
        <button v-if="groupsResult" @click="copyResult(groupsResultText)"
          :class="['w-full mt-2 py-2 rounded-lg text-sm flex items-center justify-center gap-2', copiedText ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700' : 'btn-glass']">
          <i :class="['fas', copiedText ? 'fa-check' : 'fa-copy']"></i>
          {{ copiedText ? 'Copiado!' : 'Copiar Grupos' }}
        </button>
      </div>
    </div>
  </ToolShell>
</template>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all .3s ease; }
.scale-in-enter-from { transform: scale(.97); opacity: 0; }
.scale-in-leave-to  { opacity: 0; }
</style>

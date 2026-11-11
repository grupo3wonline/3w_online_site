<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const text = ref('')
const mode = ref<'email' | 'cpf' | 'cnpj'>('email')
const dedupe = ref(true)
const separator = ref<'comma' | 'semicolon' | 'newline'>('comma')
const sortOrder = ref<'none' | 'asc' | 'desc'>('none')
const docFormat = ref<'formatted' | 'raw'>('formatted')
const groupSize = ref(0)
const results = ref<string[]>([])
const elapsed = ref(0)
const page = ref(1)
const perPage = 100

const EMAIL_RE = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
const CPF_RE   = /(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/g
const CNPJ_RE  = /(\d{2}\.?\d{3}\.?\d{3}\/??\d{4}-?\d{2})/g

const onlyDigits = (s: string) => s.replace(/\D/g, '')

function isValidCPF(raw: string) {
  const c = onlyDigits(raw)
  if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false
  let s = 0
  for (let i = 0; i < 9; i++) s += +c[i] * (10 - i)
  let d1 = (s * 10) % 11; if (d1 === 10) d1 = 0
  if (d1 !== +c[9]) return false
  s = 0
  for (let i = 0; i < 10; i++) s += +c[i] * (11 - i)
  let d2 = (s * 10) % 11; if (d2 === 10) d2 = 0
  return d2 === +c[10]
}

function isValidCNPJ(raw: string) {
  const c = onlyDigits(raw)
  if (c.length !== 14 || /^(\d)\1{13}$/.test(c)) return false
  const calc = (base: string, w: number[]) => {
    let s = 0
    for (let i = 0; i < w.length; i++) s += +base[i] * w[i]
    const r = s % 11; return r < 2 ? 0 : 11 - r
  }
  if (calc(c.slice(0, 12), [5,4,3,2,9,8,7,6,5,4,3,2]) !== +c[12]) return false
  return calc(c.slice(0, 13), [6,5,4,3,2,9,8,7,6,5,4,3,2]) === +c[13]
}

const formatCPF = (d: string) => { const v = onlyDigits(d); return `${v.slice(0,3)}.${v.slice(3,6)}.${v.slice(6,9)}-${v.slice(9,11)}` }
const formatCNPJ = (d: string) => { const v = onlyDigits(d); return `${v.slice(0,2)}.${v.slice(2,5)}.${v.slice(5,8)}/${v.slice(8,12)}-${v.slice(12,14)}` }

const finalResults = computed(() => {
  let arr = results.value.slice()
  if (mode.value !== 'email' && docFormat.value === 'formatted') {
    arr = arr.map(r => mode.value === 'cpf' ? formatCPF(r) : formatCNPJ(r))
  }
  if (sortOrder.value === 'asc') return [...arr].sort((a, b) => a.localeCompare(b, 'pt-BR'))
  if (sortOrder.value === 'desc') return [...arr].sort((a, b) => b.localeCompare(a, 'pt-BR'))
  return arr
})

const totalPages = computed(() => Math.max(1, Math.ceil(finalResults.value.length / perPage)))
const pageItems = computed(() => finalResults.value.slice((page.value - 1) * perPage, page.value * perPage))

const sepChar = computed(() => separator.value === 'comma' ? ',' : separator.value === 'semicolon' ? ';' : '\n')
const formattedOutput = computed(() => {
  const gs = groupSize.value || finalResults.value.length
  const groups: string[][] = []
  for (let i = 0; i < finalResults.value.length; i += gs) groups.push(finalResults.value.slice(i, i + gs))
  return groups.map(g => g.join(sepChar.value)).join('\n\n')
})

function extract() {
  const t0 = performance.now()
  let raw: string[] = []
  if (mode.value === 'email') {
    raw = (text.value.match(EMAIL_RE) || []).map(e => e.toLowerCase())
  } else if (mode.value === 'cpf') {
    raw = (text.value.match(CPF_RE) || []).map(onlyDigits).filter(isValidCPF)
  } else {
    raw = (text.value.match(CNPJ_RE) || []).map(onlyDigits).filter(isValidCNPJ)
  }
  const unique = dedupe.value ? Array.from(new Set(raw)) : raw
  results.value = unique
  elapsed.value = performance.now() - t0
  page.value = 1
  const label = mode.value === 'email' ? 'e-mails' : mode.value === 'cpf' ? 'CPFs' : 'CNPJs'
  if (unique.length) {
    Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 })
      .fire({ icon: 'success', title: `${unique.length} ${label} encontrado(s)` })
  } else {
    Swal.fire({ icon: 'info', title: 'Nenhum resultado', text: 'Verifique o texto ou troque o tipo.', confirmButtonColor: '#3b82f6' })
  }
}

async function copyOutput() {
  if (!formattedOutput.value) return
  await navigator.clipboard.writeText(formattedOutput.value)
  Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1400 })
    .fire({ icon: 'success', title: 'Copiado!' })
}

function download(ext: string) {
  let content = formattedOutput.value
  let mime = 'text/plain'
  if (ext === 'csv') {
    const header = mode.value
    content = [header, ...finalResults.value].join('\n')
    mime = 'text/csv'
  } else if (ext === 'xml') {
    const root = mode.value === 'email' ? 'emails' : mode.value + 's'
    const item = mode.value
    content = `<${root}>\n${finalResults.value.map(e => `  <${item}>${e}</${item}>`).join('\n')}\n</${root}>`
    mime = 'application/xml'
  }
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `${mode.value}-extraidos.${ext}`; a.click()
  URL.revokeObjectURL(url)
}

function fillExample() {
  text.value = 'Entre em contato: contato@empresa.com, vendas@empresa.com.br\nCPF: 123.456.789-09 e 987.654.321-00\nCNPJ: 11.222.333/0001-81'
}
</script>

<template>
  <ToolShell

    title="Extrator E-mail/CPF/CNPJ"

    description="Extraia e-mails, CPFs e CNPJs simultaneamente de qualquer texto."

    icon="fa-filter"

    icon-gradient="from-indigo-500 to-purple-700"

    orb-color="purple"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:text-search" class="text-blue-400 w-7 h-7" />
        Extrator — E-mail, CPF e CNPJ
      </h1>
      <p class="text-blue-200 text-sm">Cole um texto e extraia e-mails, CPFs e CNPJs válidos em segundos</p>
    </div>

    <!-- Input Card -->
    <div class="glass-panel p-5 space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-white font-semibold">Texto de Entrada</h2>
        <div class="flex gap-2">
          <button @click="fillExample" class="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg transition-colors">
            Exemplo
          </button>
          <button @click="text = ''" class="text-xs px-3 py-1.5 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg transition-colors">
            <Icon icon="mdi:trash-can-outline" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <textarea
        v-model="text"
        :maxlength="100000"
        rows="6"
        placeholder="Cole aqui até 100.000 caracteres..."
        class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg p-3 text-sm font-mono resize-y focus:outline-none focus:ring-2 focus:ring-blue-500/50"
      ></textarea>

      <!-- Options -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div class="space-y-1">
          <label class="text-xs text-blue-200">Tipo</label>
          <select v-model="mode"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option value="email">E-mail</option>
            <option value="cpf">CPF</option>
            <option value="cnpj">CNPJ</option>
          </select>
        </div>

        <div v-if="mode !== 'email'" class="space-y-1">
          <label class="text-xs text-blue-200">Formato</label>
          <select v-model="docFormat"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option value="formatted">Com pontuação</option>
            <option value="raw">Sem pontuação</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-xs text-blue-200">Separador</label>
          <select v-model="separator"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option value="comma">Vírgula (,)</option>
            <option value="semicolon">Ponto e vírgula (;)</option>
            <option value="newline">Quebra de linha</option>
          </select>
        </div>

        <div class="space-y-1">
          <label class="text-xs text-blue-200">Ordenar</label>
          <select v-model="sortOrder"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option value="none">Sem ordenação</option>
            <option value="asc">A-Z (crescente)</option>
            <option value="desc">Z-A (decrescente)</option>
          </select>
        </div>

        <div class="flex items-center gap-2 col-span-2 md:col-span-1">
          <input type="checkbox" v-model="dedupe" id="dedupe"
            class="w-3.5 h-3.5 rounded border-white/20 bg-transparent text-blue-500" />
          <label for="dedupe" class="text-xs text-blue-200 cursor-pointer">Eliminar duplicados</label>
        </div>

        <div class="space-y-1">
          <label class="text-xs text-blue-200">Agrupar em blocos</label>
          <input v-model.number="groupSize" type="number" min="0" placeholder="0 = sem agrupamento"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
      </div>

      <!-- Action buttons -->
      <div class="flex flex-wrap gap-2">
        <button @click="extract" :disabled="!text.trim()"
          class="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm">
          <Icon icon="mdi:rocket-launch-outline" class="w-4 h-4" />
          Extrair {{ mode === 'email' ? 'E-mails' : mode === 'cpf' ? 'CPFs' : 'CNPJs' }}
        </button>
        <button @click="copyOutput" :disabled="!results.length"
          class="bg-white/5 hover:bg-white/10 disabled:opacity-40 text-blue-300 hover:text-white border border-white/10 px-4 py-2.5 rounded-lg transition-colors text-sm flex items-center gap-2">
          <Icon icon="mdi:content-copy" class="w-4 h-4" />
          Copiar
        </button>
        <button @click="download('txt')" :disabled="!results.length"
          class="bg-white/5 hover:bg-white/10 disabled:opacity-40 text-blue-300 hover:text-white border border-white/10 px-4 py-2.5 rounded-lg transition-colors text-sm">.TXT</button>
        <button @click="download('csv')" :disabled="!results.length"
          class="bg-white/5 hover:bg-white/10 disabled:opacity-40 text-blue-300 hover:text-white border border-white/10 px-4 py-2.5 rounded-lg transition-colors text-sm">.CSV</button>
        <button @click="download('xml')" :disabled="!results.length"
          class="bg-white/5 hover:bg-white/10 disabled:opacity-40 text-blue-300 hover:text-white border border-white/10 px-4 py-2.5 rounded-lg transition-colors text-sm">.XML</button>
      </div>

      <div class="flex gap-4 text-xs text-blue-300">
        <span>Total: <strong class="text-white">{{ results.length }}</strong></span>
        <span>Tempo: {{ Math.round(elapsed) }} ms</span>
        <span>Entrada: {{ text.length.toLocaleString() }} chars</span>
      </div>
    </div>

    <!-- Output -->
    <div v-if="results.length" class="glass-panel p-5 space-y-4">
      <h2 class="text-white font-semibold">Resultados ({{ results.length }})</h2>

      <!-- Formatted output -->
      <textarea :value="formattedOutput" readonly rows="5"
        class="w-full bg-[#0a1628] text-blue-200 border border-white/10 rounded-lg p-3 text-sm font-mono resize-y focus:outline-none" />

      <!-- List -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h3 class="text-sm text-blue-200 font-medium">Lista</h3>
          <span class="text-xs text-blue-300">Página {{ page }} de {{ totalPages }}</span>
        </div>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1.5">
          <li v-for="(item, i) in pageItems" :key="i"
            class="bg-[#0a1628] border border-white/5 rounded-lg px-3 py-1.5 text-xs text-blue-200 font-mono truncate">
            {{ item }}
          </li>
        </ul>
        <div v-if="totalPages > 1" class="flex gap-2 justify-end">
          <button @click="page--" :disabled="page <= 1"
            class="px-3 py-1 bg-white/5 hover:bg-white/10 text-blue-300 disabled:opacity-40 border border-white/10 rounded-lg text-xs">Anterior</button>
          <button @click="page++" :disabled="page >= totalPages"
            class="px-3 py-1 bg-white/5 hover:bg-white/10 text-blue-300 disabled:opacity-40 border border-white/10 rounded-lg text-xs">Próxima</button>
        </div>
      </div>
    </div>
  


  </ToolShell></template>
<template>
  <ToolShell
    title="JSON Formatter & Validator"
    description="Formate, valide, minifique, ordene e analise JSON — com syntax highlight e exportação."
    icon="fa-file-code"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['Syntax highlight', 'Format / Minify', 'Validação em tempo real', 'Escape / Unescape']"
    :tips="jsonTips"
  >
    <!-- ── Barra de ações ──────────────────────────────────────────────────── -->
    <div class="btn-row !mb-4">
      <!-- Formatar com opção de indent -->
      <div class="relative group">
        <button @click="formatar()" class="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors">
          <Icon icon="mdi:code-json" class="w-4 h-4" /> Formatar
          <Icon icon="mdi:chevron-down" class="w-3.5 h-3.5" />
        </button>
        <div class="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-lg shadow-xl z-20 hidden group-hover:flex flex-col min-w-32 py-1">
          <button @click="indent='2';formatar()" :class="['px-3 py-1.5 text-left text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors', indent==='2'?'text-indigo-600 font-bold':'text-gray-700 dark:text-slate-200']">2 espaços</button>
          <button @click="indent='4';formatar()" :class="['px-3 py-1.5 text-left text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors', indent==='4'?'text-indigo-600 font-bold':'text-gray-700 dark:text-slate-200']">4 espaços</button>
          <button @click="indent='tab';formatar()" :class="['px-3 py-1.5 text-left text-xs hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors', indent==='tab'?'text-indigo-600 font-bold':'text-gray-700 dark:text-slate-200']">Tab</button>
        </div>
      </div>

      <button @click="minificar()" class="flex items-center gap-1.5 px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:compress-horizontal" class="w-4 h-4" /> Minificar
      </button>

      <button @click="validar()" class="flex items-center gap-1.5 px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:check-circle-outline" class="w-4 h-4" /> Validar
      </button>

      <button @click="sortarChaves()" class="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 hover:border-white/20 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:sort-alphabetical-ascending" class="w-4 h-4" /> Ordenar Chaves
      </button>

      <button @click="escaparJSON()" class="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 hover:border-white/20 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:format-quote-close" class="w-4 h-4" /> Escapar
      </button>

      <button @click="desescaparJSON()" class="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 hover:border-white/20 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:format-quote-open" class="w-4 h-4" /> Desescapar
      </button>

      <button @click="removerComentarios()" class="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 hover:border-white/20 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:comment-remove-outline" class="w-4 h-4" /> Sem Comentários
      </button>

      <!-- Separador + utilitários -->
      <div class="w-px h-7 bg-white/10 hidden sm:block"></div>

      <label class="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-blue-300 border border-white/10 rounded-lg text-sm cursor-pointer transition-colors">
        <Icon icon="mdi:upload-outline" class="w-4 h-4" /> Upload
        <input type="file" accept=".json,.txt" class="hidden" @change="carregarArquivo" />
      </label>

      <button @click="limpar()" class="flex items-center gap-1.5 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:delete-outline" class="w-4 h-4" /> Limpar
      </button>
    </div>

    <!-- ── Painel principal: input + output ──────────────────────────────── -->
    <div class="grid lg:grid-cols-2 gap-4">

      <!-- Input -->
      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
            <Icon icon="mdi:pencil-outline" class="w-3.5 h-3.5" /> Entrada (JSON)
          </label>
          <span class="text-[11px] text-blue-400">{{ entrada.length }} chars</span>
        </div>
        <textarea
          v-model="entrada"
          @input="validar()"
          @paste="onPaste"
          rows="22"
          spellcheck="false"
          placeholder='{"nome": "João", "idade": 30, "ativo": true}'
          class="input-aurora font-mono text-sm resize-y flex-1"
        ></textarea>
        <div class="flex gap-2 mt-2">
          <button @click="colar()" class="flex items-center gap-1.5 text-xs text-blue-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10">
            <Icon icon="mdi:content-paste" class="w-3.5 h-3.5" /> Colar
          </button>
          <button @click="copiarEntrada()" class="flex items-center gap-1.5 text-xs text-blue-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10">
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" /> Copiar entrada
          </button>
          <label class="flex items-center gap-1.5 text-xs text-blue-400 cursor-pointer ml-auto">
            <input type="checkbox" v-model="autoFormat" class="accent-indigo-500 w-3 h-3" />
            Auto-formatar ao colar
          </label>
        </div>
      </div>

      <!-- Output -->
      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
            <Icon icon="mdi:eye-outline" class="w-3.5 h-3.5" />
            Saída
            <span v-if="statusValido === true" class="flex items-center gap-1 text-emerald-400 text-[11px] font-normal">
              <Icon icon="mdi:check-circle" class="w-3.5 h-3.5" /> Válido
            </span>
            <span v-else-if="statusValido === false" class="flex items-center gap-1 text-red-400 text-[11px] font-normal">
              <Icon icon="mdi:close-circle" class="w-3.5 h-3.5" /> Inválido
            </span>
          </label>
          <div class="flex gap-1.5">
            <button @click="copiarSaida()" :disabled="!saida" class="flex items-center gap-1 text-xs text-blue-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30">
              <Icon :icon="copiado ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" :class="copiado?'text-emerald-400':''" />
              {{ copiado ? 'Copiado!' : 'Copiar' }}
            </button>
            <button @click="baixar()" :disabled="!saida" class="flex items-center gap-1 text-xs text-blue-400 hover:text-white transition-colors px-2 py-1 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30">
              <Icon icon="mdi:download-outline" class="w-3.5 h-3.5" /> .json
            </button>
          </div>
        </div>

        <!-- Erro de parsing -->
        <div v-if="erro" class="mb-2 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs font-mono text-red-300 flex items-start gap-2">
          <Icon icon="mdi:alert-circle-outline" class="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p class="font-semibold text-red-400 mb-0.5">Erro de sintaxe</p>
            <p>{{ erro }}</p>
          </div>
        </div>

        <!-- JSON com syntax highlighting -->
        <div class="flex-1 relative group">
          <pre
            v-if="saida"
            class="json-output w-full h-full min-h-[22rem] rounded-xl bg-[#0d1b30] dark:bg-[#0d1b30] border border-white/10 p-4 overflow-auto text-sm font-mono leading-relaxed"
            v-html="highlighted"
          ></pre>
          <div v-else class="flex items-center justify-center min-h-[22rem] rounded-xl bg-white/5 border border-white/10 text-blue-300/40">
            <div class="text-center">
              <Icon icon="mdi:code-json" class="w-16 h-16 mx-auto mb-2 opacity-30" />
              <p class="text-sm">Saída aparecerá aqui</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Stats ─────────────────────────────────────────────────────────── -->
    <div v-if="stats" class="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
      <div v-for="s in statsItems" :key="s.label" class="glass-panel px-3 py-2 text-center">
        <p class="text-[11px] text-blue-300 mb-0.5">{{ s.label }}</p>
        <p class="text-sm font-bold font-mono text-white">{{ s.value }}</p>
      </div>
    </div>

    <!-- ── Painel de exemplos ─────────────────────────────────────────────── -->
    <div class="mt-4 glass-panel p-4">
      <p class="text-xs font-semibold text-blue-300 mb-2">Exemplos rápidos:</p>
      <div class="flex flex-wrap gap-2.5">
        <button v-for="ex in exemplos" :key="ex.label"
          @click="carregarExemplo(ex.json)"
          class="text-xs px-2.5 py-1 bg-white/5 hover:bg-white/15 border border-white/10 hover:border-indigo-400/40 text-blue-300 hover:text-white rounded-lg transition-colors">
          {{ ex.label }}
        </button>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import Swal from 'sweetalert2'

// ─── Estado ──────────────────────────────────────────────────────────────────
const jsonTips = [
  { title: 'Aspas duplas obrigatórias', text: 'JSON requer aspas duplas em strings e chaves. Aspas simples causam erro de parsing.', type: 'warning' as const },
  { title: 'Sem trailing comma', text: 'Vírgulas após o último item de objeto/array não são permitidas em JSON puro.', type: 'warning' as const },
  { title: 'Suporte a JSONC', text: 'O botão "Remover Comentários" limpa comentários de linha e de bloco antes de validar.', type: 'info' as const },
]

const entrada     = ref('')
const saida       = ref('')
const erro        = ref('')
const statusValido = ref<boolean | null>(null)
const indent      = ref<'2'|'4'|'tab'>('2')
const autoFormat  = ref(false)
const copiado     = ref(false)

interface Stats { linhas: number; chars: number; kb: string; objetos: number; arrays: number; strings: number; nums: number; booleans: number; nulls: number; chaves: number; profundidade: number }
const stats = ref<Stats | null>(null)

// ─── Syntax highlight ─────────────────────────────────────────────────────────
function colorizar(json: string): string {
  return json
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(
      /("(?:\\u[0-9a-fA-F]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(?:true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
      (match) => {
        if (/^"/.test(match)) {
          return /:$/.test(match)
            ? `<span class="jk">${match}</span>`   // key
            : `<span class="js">${match}</span>`   // string
        }
        if (/true|false/.test(match)) return `<span class="jb">${match}</span>` // boolean
        if (/null/.test(match))       return `<span class="jz">${match}</span>` // null
        return `<span class="jn">${match}</span>`                               // number
      }
    )
}

const highlighted = computed(() => saida.value ? colorizar(saida.value) : '')

// ─── Stats analysis ───────────────────────────────────────────────────────────
function analisar(obj: unknown, depth = 0): Stats {
  const s: Stats = { linhas: 0, chars: 0, kb: '0', objetos: 0, arrays: 0, strings: 0, nums: 0, booleans: 0, nulls: 0, chaves: 0, profundidade: depth }
  function walk(v: unknown, d: number) {
    s.profundidade = Math.max(s.profundidade, d)
    if (v === null) { s.nulls++; return }
    if (typeof v === 'string') { s.strings++; return }
    if (typeof v === 'number') { s.nums++; return }
    if (typeof v === 'boolean') { s.booleans++; return }
    if (Array.isArray(v)) { s.arrays++; v.forEach(x => walk(x, d + 1)); return }
    if (typeof v === 'object' && v !== null) {
      s.objetos++
      for (const [, val] of Object.entries(v as Record<string, unknown>)) {
        s.chaves++
        walk(val, d + 1)
      }
    }
  }
  walk(obj, 0)
  return s
}

const statsItems = computed(() => {
  if (!stats.value) return []
  const s = stats.value
  return [
    { label: 'Linhas', value: s.linhas },
    { label: 'Chars', value: s.chars },
    { label: 'Tamanho', value: `${s.kb} KB` },
    { label: 'Objetos', value: s.objetos },
    { label: 'Arrays', value: s.arrays },
    { label: 'Chaves', value: s.chaves },
    { label: 'Profundidade', value: s.profundidade },
  ]
})

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getIndent(): number | string { return indent.value === 'tab' ? '\t' : parseInt(indent.value) }

function parse(): { ok: boolean; val: unknown } {
  try { return { ok: true, val: JSON.parse(entrada.value.trim()) }
  } catch (e: any) { erro.value = e.message; return { ok: false, val: null } }
}

// ─── Ações ────────────────────────────────────────────────────────────────────
function validar() {
  if (!entrada.value.trim()) { saida.value = ''; erro.value = ''; statusValido.value = null; stats.value = null; return }
  erro.value = ''
  const { ok, val } = parse()
  statusValido.value = ok
  if (ok) {
    if (!saida.value) saida.value = entrada.value
    const s = analisar(val)
    s.linhas = entrada.value.split('\n').length
    s.chars = entrada.value.length
    s.kb = (new Blob([entrada.value]).size / 1024).toFixed(2)
    stats.value = s
  } else {
    stats.value = null
  }
}

function formatar() {
  erro.value = ''
  const { ok, val } = parse()
  if (!ok) { Swal.fire({ icon: 'error', title: 'JSON inválido', text: erro.value, confirmButtonColor: '#4f46e5' }); return }
  const ind = getIndent()
  saida.value = JSON.stringify(val, null, ind as number)
  statusValido.value = true
  const s = analisar(val)
  s.linhas = saida.value.split('\n').length
  s.chars  = saida.value.length
  s.kb     = (new Blob([saida.value]).size / 1024).toFixed(2)
  stats.value = s
}

function minificar() {
  erro.value = ''
  const { ok, val } = parse()
  if (!ok) { Swal.fire({ icon: 'error', title: 'JSON inválido', text: erro.value, confirmButtonColor: '#4f46e5' }); return }
  saida.value = JSON.stringify(val)
  statusValido.value = true
  const s = analisar(val)
  s.linhas = 1; s.chars = saida.value.length; s.kb = (new Blob([saida.value]).size / 1024).toFixed(2)
  stats.value = s
}

function sortarChaves() {
  erro.value = ''
  const { ok, val } = parse()
  if (!ok) { Swal.fire({ icon: 'error', title: 'JSON inválido', text: erro.value, confirmButtonColor: '#4f46e5' }); return }
  function sortObj(o: unknown): unknown {
    if (Array.isArray(o)) return o.map(sortObj)
    if (o && typeof o === 'object' && !Array.isArray(o)) {
      const sorted: Record<string, unknown> = {}
      Object.keys(o as object).sort().forEach(k => { sorted[k] = sortObj((o as Record<string, unknown>)[k]) })
      return sorted
    }
    return o
  }
  const sorted = sortObj(val)
  entrada.value = JSON.stringify(sorted, null, getIndent() as number)
  saida.value   = entrada.value
  statusValido.value = true
  Swal.fire({ icon: 'success', title: 'Chaves ordenadas!', timer: 1200, showConfirmButton: false })
}

function escaparJSON() {
  if (!entrada.value.trim()) return
  saida.value = JSON.stringify(entrada.value)
}

function desescaparJSON() {
  if (!entrada.value.trim()) return
  try {
    const val = JSON.parse(entrada.value)
    saida.value = typeof val === 'string' ? val : JSON.stringify(val, null, getIndent() as number)
  } catch {
    // Try unescaping manually
    try {
      saida.value = JSON.parse('"' + entrada.value.replace(/^"|"$/g, '').replace(/'/g, "\\'") + '"')
    } catch (e: any) {
      erro.value = e.message
    }
  }
}

function removerComentarios() {
  // Remove // and /* */ comments
  const limpo = entrada.value
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '')
    .replace(/,\s*([}\]])/g, '$1') // remove trailing commas
  entrada.value = limpo
  validar()
}

function limpar() {
  entrada.value = ''; saida.value = ''; erro.value = ''; statusValido.value = null; stats.value = null
}

async function colar() {
  try {
    const text = await navigator.clipboard.readText()
    entrada.value = text
    if (autoFormat.value) formatar()
    else validar()
  } catch { Swal.fire({ icon: 'error', title: 'Sem permissão para colar', timer: 1500, showConfirmButton: false }) }
}

function onPaste(e: ClipboardEvent) {
  if (autoFormat.value) {
    setTimeout(() => { formatar() }, 0)
  } else {
    setTimeout(() => { validar() }, 0)
  }
}

function copiarEntrada() {
  navigator.clipboard.writeText(entrada.value)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}

function copiarSaida() {
  navigator.clipboard.writeText(saida.value)
  copiado.value = true
  setTimeout(() => { copiado.value = false }, 2000)
}

function baixar() {
  if (!saida.value) return
  const blob = new Blob([saida.value], { type: 'application/json' })
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'formatted.json'
  a.click()
  URL.revokeObjectURL(a.href)
}

function carregarArquivo(e: Event) {
  const f = (e.target as HTMLInputElement).files?.[0]
  if (!f) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    entrada.value = ev.target?.result as string
    if (autoFormat.value) formatar()
    else validar()
  }
  reader.readAsText(f, 'UTF-8')
  ;(e.target as HTMLInputElement).value = ''
}

function carregarExemplo(json: string) {
  entrada.value = json
  formatar()
}

// ─── Exemplos ─────────────────────────────────────────────────────────────────
const exemplos = [
  { label: 'Usuário', json: '{"id":1,"nome":"João Silva","email":"joao@exemplo.com","ativo":true,"roles":["admin","user"],"endereco":{"cep":"01310-100","cidade":"São Paulo","uf":"SP"}}' },
  { label: 'Produto', json: '{"id":42,"nome":"Notebook Pro","preco":3499.90,"estoque":15,"categorias":["informatica","eletronica"],"especificacoes":{"cpu":"Intel i7","ram":"16GB","armazenamento":"512GB SSD"},"disponivel":true}' },
  { label: 'API Response', json: '{"status":"success","code":200,"data":{"users":[{"id":1,"nome":"Alice"},{"id":2,"nome":"Bob"}],"total":2,"pagina":1},"timestamp":"2024-01-15T10:30:00Z"}' },
  { label: 'Config', json: '{"app":{"name":"MyApp","version":"2.0.0","debug":false},"database":{"host":"localhost","port":5432,"name":"mydb"},"features":{"darkMode":true,"notifications":true,"analytics":false}}' },
  { label: 'Array', json: '[{"id":1,"produto":"Caneta","qtd":100},{"id":2,"produto":"Papel","qtd":500},{"id":3,"produto":"Clipe","qtd":1000}]' },
]
</script>

<style>
/* ── JSON Syntax Colors ─────────────────────────────────────────── */
.json-output { color: #d4d4d4; }
.jk { color: #9cdcfe; }   /* keys  */
.js { color: #ce9178; }   /* strings */
.jn { color: #b5cea8; }   /* numbers */
.jb { color: #569cd6; }   /* booleans */
.jz { color: #808080; }   /* null */
</style>


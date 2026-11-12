<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

type Tool = 'base64' | 'uuid' | 'json' | 'md5' | 'password' | 'jwt' | 'string'
const activeTool = ref<Tool>('base64')

// Base64
const b64Input = ref('')
const b64Output = ref('')
function b64Encode() { try { b64Output.value = btoa(unescape(encodeURIComponent(b64Input.value))) } catch { b64Output.value = 'Erro de codificação' } }
function b64Decode() { try { b64Output.value = decodeURIComponent(escape(atob(b64Input.value))) } catch { b64Output.value = 'Base64 inválido' } }

// UUID
const uuids = ref<string[]>([])
const uuidCount = ref(5)
function genUUID() {
  uuids.value = Array.from({ length: uuidCount.value }, () =>
    'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
  )
}

// JSON formatter
const jsonInput = ref('{\n  "nome": "DevToolkit",\n  "versao": "1.0"\n}')
const jsonOutput = ref('')
const jsonError = ref('')
function formatJSON() {
  try {
    jsonOutput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 2)
    jsonError.value = ''
  } catch (e) {
    jsonError.value = (e as Error).message; jsonOutput.value = ''
  }
}
function minifyJSON() {
  try {
    jsonOutput.value = JSON.stringify(JSON.parse(jsonInput.value))
    jsonError.value = ''
  } catch (e) {
    jsonError.value = (e as Error).message; jsonOutput.value = ''
  }
}

// Password
const pwdLength = ref(16)
const pwdOptions = ref({ upper: true, lower: true, digits: true, symbols: true })
const passwords = ref<string[]>([])
function genPassword() {
  const chars = [
    pwdOptions.value.upper ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : '',
    pwdOptions.value.lower ? 'abcdefghjkmnpqrstuvwxyz' : '',
    pwdOptions.value.digits ? '23456789' : '',
    pwdOptions.value.symbols ? '!@#$%&*' : '',
  ].join('')
  if (!chars) return
  passwords.value = Array.from({ length: 5 }, () =>
    Array.from({ length: pwdLength.value }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  )
}

// String formatter
const strInput = ref('Hello World, this is DevToolkit!')
const strOutput = ref('')
function transformStr(op: string) {
  const s = strInput.value
  const ops: Record<string, () => string> = {
    upper: () => s.toUpperCase(),
    lower: () => s.toLowerCase(),
    slug: () => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''),
    camel: () => s.replace(/(?:^|\s+)\w/g, (m, i) => i === 0 ? m.trim().toLowerCase() : m.trim().toUpperCase()).replace(/\s/g,''),
    snake: () => s.toLowerCase().replace(/\s+/g, '_'),
    words: () => String(s.trim().split(/\s+/).length),
    chars: () => String(s.length),
    reverse: () => s.split('').reverse().join(''),
  }
  strOutput.value = (ops[op] || (() => s))()
}

// JWT decode
const jwtInput = ref('')
const jwtResult = ref<{ header: unknown; payload: unknown } | null>(null)
const jwtError = ref('')
function decodeJWT() {
  try {
    const parts = jwtInput.value.split('.')
    if (parts.length !== 3) throw new Error('JWT inválido (deve ter 3 partes)')
    const decode = (s: string) => JSON.parse(decodeURIComponent(escape(atob(s.replace(/-/g,'+').replace(/_/g,'/')))))
    jwtResult.value = { header: decode(parts[0]), payload: decode(parts[1]) }
    jwtError.value = ''
  } catch (e) {
    jwtError.value = (e as Error).message; jwtResult.value = null
  }
}

const notification = ref('')
async function copy(text: string) {
  await navigator.clipboard.writeText(text)
  notification.value = 'Copiado!'; setTimeout(() => { notification.value = '' }, 1500)
}

const tools: { id: Tool; label: string; icon: string }[] = [
  { id: 'base64', label: 'Base64', icon: 'mdi:code-json' },
  { id: 'uuid', label: 'UUID', icon: 'mdi:identifier' },
  { id: 'json', label: 'JSON', icon: 'mdi:code-braces' },
  { id: 'password', label: 'Senha', icon: 'mdi:lock-outline' },
  { id: 'string', label: 'String', icon: 'mdi:format-text' },
  { id: 'jwt', label: 'JWT', icon: 'mdi:shield-key' },
]
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:toolbox" class="text-blue-400 w-7 h-7" />
        Dev Toolkit Suite
      </h1>
      <p class="text-blue-200 text-sm">Ferramentas essenciais para desenvolvedores — tudo local, sem uploads</p>
    </div>

    <!-- Tool tabs -->
    <div class="flex flex-wrap gap-2">
      <button v-for="t in tools" :key="t.id" @click="activeTool = t.id"
        :class="['flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border',
          activeTool === t.id ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#0f1e3c] border-white/10 text-blue-200 hover:bg-white/10']">
        <Icon :icon="t.icon" class="w-4 h-4" />{{ t.label }}
      </button>
    </div>

    <!-- Base64 -->
    <div v-if="activeTool === 'base64'" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:code-json" class="text-blue-400 w-5 h-5" /> Base64 Converter</h2>
      <textarea v-model="b64Input" rows="4" placeholder="Texto ou Base64 aqui..." class="w-full input-aurora font-mono resize-none" />
      <div class="flex gap-3">
        <button @click="b64Encode" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Codificar</button>
        <button @click="b64Decode" class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Decodificar</button>
        <button v-if="b64Output" @click="copy(b64Output)" class="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-copy" class="w-4 h-4" /></button>
      </div>
      <textarea v-if="b64Output" :value="b64Output" readonly rows="4" class="w-full bg-gray-950 text-green-300 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono resize-none" />
    </div>

    <!-- UUID -->
    <div v-if="activeTool === 'uuid'" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:identifier" class="text-blue-400 w-5 h-5" /> UUID v4 Generator</h2>
      <div class="flex items-center gap-4">
        <label class="text-blue-200 text-sm">Quantidade:</label>
        <input v-model.number="uuidCount" type="number" min="1" max="20" class="w-20 input-aurora" />
        <button @click="genUUID" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
          <Icon icon="mdi:cog" class="w-4 h-4" /> Gerar
        </button>
        <button v-if="uuids.length" @click="copy(uuids.join('\n'))" class="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-copy" class="w-4 h-4" /></button>
      </div>
      <div v-if="uuids.length" class="space-y-1.5">
        <div v-for="(u, i) in uuids" :key="i" class="flex items-center justify-between bg-[#0a1628] rounded-lg px-3 py-2">
          <span class="text-white font-mono text-sm">{{ u }}</span>
          <button @click="copy(u)" class="text-blue-300 hover:text-white ml-3"><Icon icon="mdi:content-copy" class="w-4 h-4" /></button>
        </div>
      </div>
    </div>

    <!-- JSON -->
    <div v-if="activeTool === 'json'" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:code-braces" class="text-blue-400 w-5 h-5" /> JSON Formatter</h2>
      <textarea v-model="jsonInput" rows="6" placeholder="Cole seu JSON aqui..." class="w-full input-aurora font-mono resize-none" />
      <div class="flex gap-3">
        <button @click="formatJSON" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Formatar</button>
        <button @click="minifyJSON" class="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Minificar</button>
        <button v-if="jsonOutput" @click="copy(jsonOutput)" class="bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-copy" class="w-4 h-4" /></button>
      </div>
      <div v-if="jsonError" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">{{ jsonError }}</div>
      <textarea v-if="jsonOutput" :value="jsonOutput" readonly rows="8" class="w-full bg-gray-950 text-green-300 border border-white/10 rounded-lg px-3 py-2 text-sm font-mono resize-none" />
    </div>

    <!-- Password -->
    <div v-if="activeTool === 'password'" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:lock-outline" class="text-blue-400 w-5 h-5" /> Gerador de Senhas</h2>
      <div class="flex flex-wrap gap-4 items-center">
        <div class="flex items-center gap-2">
          <label class="text-blue-200 text-sm">Comprimento:</label>
          <input v-model.number="pwdLength" type="number" min="6" max="64" class="w-20 input-aurora" />
        </div>
        <label v-for="[k, l] in [['upper','Maiúsculas'],['lower','Minúsculas'],['digits','Números'],['symbols','Símbolos']] as const" :key="k" class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" v-model="(pwdOptions as any)[k]" class="rounded accent-blue-500" />
          <span class="text-blue-200 text-sm">{{ l }}</span>
        </label>
        <button @click="genPassword" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Gerar</button>
      </div>
      <div v-if="passwords.length" class="space-y-1.5">
        <div v-for="(p, i) in passwords" :key="i" class="flex items-center justify-between bg-[#0a1628] rounded-lg px-3 py-2">
          <span class="text-white font-mono text-sm tracking-widest">{{ p }}</span>
          <button @click="copy(p)" class="text-blue-300 hover:text-white ml-3"><Icon icon="mdi:content-copy" class="w-4 h-4" /></button>
        </div>
      </div>
    </div>

    <!-- String -->
    <div v-if="activeTool === 'string'" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:format-text" class="text-blue-400 w-5 h-5" /> String Formatter</h2>
      <textarea v-model="strInput" rows="3" class="w-full input-aurora resize-none" />
      <div class="flex flex-wrap gap-2">
        <button v-for="[op, lbl] in [['upper','MAIÚSCULAS'],['lower','minúsculas'],['slug','slug-url'],['camel','camelCase'],['snake','snake_case'],['reverse','reverso'],['words','palavras'],['chars','caracteres']] as const" :key="op"
          @click="transformStr(op)" class="bg-white/10 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">{{ lbl }}</button>
      </div>
      <div v-if="strOutput" class="flex items-center gap-3">
        <div class="flex-1 bg-[#0a1628] rounded-lg px-3 py-2 font-mono text-sm text-green-300 break-all">{{ strOutput }}</div>
        <button @click="copy(strOutput)" class="text-blue-300 hover:text-white"><Icon icon="mdi:content-copy" class="w-5 h-5" /></button>
      </div>
    </div>

    <!-- JWT -->
    <div v-if="activeTool === 'jwt'" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:shield-key" class="text-blue-400 w-5 h-5" /> JWT Decoder</h2>
      <textarea v-model="jwtInput" rows="4" placeholder="Cole o token JWT aqui..." class="w-full input-aurora font-mono resize-none" />
      <button @click="decodeJWT" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">Decodificar</button>
      <div v-if="jwtError" class="bg-red-900/30 border border-red-500/50 rounded-lg p-3 text-red-300 text-sm">{{ jwtError }}</div>
      <div v-if="jwtResult" class="space-y-3">
        <div class="bg-[#0a1628] rounded-lg p-3">
          <p class="text-blue-300 text-xs font-semibold mb-1">Header:</p>
          <pre class="text-green-300 text-xs overflow-auto">{{ JSON.stringify(jwtResult.header, null, 2) }}</pre>
        </div>
        <div class="bg-[#0a1628] rounded-lg p-3">
          <p class="text-blue-300 text-xs font-semibold mb-1">Payload:</p>
          <pre class="text-green-300 text-xs overflow-auto">{{ JSON.stringify(jwtResult.payload, null, 2) }}</pre>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
        {{ notification }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

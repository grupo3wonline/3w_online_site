<template>
  <ToolShell
    title="ASCII / Encoding Converter"
    description="Converta texto entre ASCII, Hex, Binário, Decimal, Base64, Unicode e Entidades HTML."
    icon="fa-terminal"
    icon-gradient="from-cyan-500 to-blue-700"
    orb-color="cyan"
    :quick-tips="['9 formatos', 'Bidirecional', 'Análise por caractere']"
    :tips="asciiTips"
  >

    <!-- Tabs de modo -->
    <div class="tab-row">
      <button v-for="t in tabs" :key="t.id" @click="aba = t.id"
        :class="['px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border',
          aba===t.id?'bg-cyan-600 text-white border-cyan-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        {{ t.label }}
      </button>
    </div>

    <!-- ══ ABA: CONVERSOR MULTI-FORMAT ═════════════════════════════════ -->
    <div v-if="aba==='multi'" class="space-y-4">
      <!-- Input texto -->
      <div class="glass-panel p-4">
        <div class="flex justify-between items-center mb-2">
          <label class="text-xs font-semibold text-blue-300">Texto de entrada</label>
          <div class="flex gap-2 items-center">
            <span class="text-[11px] text-blue-400">{{ textoEntrada.length }} chars</span>
            <button @click="textoEntrada=''" class="text-xs text-red-400 hover:text-red-300">Limpar</button>
          </div>
        </div>
        <textarea v-model="textoEntrada" @input="converter()" rows="4" class="input-aurora w-full font-mono text-sm"
          placeholder="Digite ou cole o texto para ver todas as codificações..."></textarea>
      </div>

      <!-- Saídas em grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div v-for="formato in formatos" :key="formato.id" class="glass-panel p-3">
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-semibold text-blue-300">{{ formato.label }}</label>
            <button @click="copiar(saidas[formato.id as SaidasKey])" class="text-[11px] text-blue-400 hover:text-white flex items-center gap-1">
              <Icon icon="mdi:content-copy" class="w-3 h-3" /> Copiar
            </button>
          </div>
          <textarea :value="saidas[formato.id as SaidasKey]" readonly rows="3" class="input-aurora w-full font-mono text-xs bg-white/5 cursor-text resize-none"></textarea>
        </div>
      </div>
    </div>

    <!-- ══ ABA: DECODE (QUALQUER FORMAT → TEXTO) ════════════════════ -->
    <div v-if="aba==='decode'" class="space-y-4">
      <div class="glass-panel p-4 space-y-3">
        <div>
          <label class="text-xs font-semibold text-blue-300 mb-1.5 block">Formato de entrada</label>
          <select v-model="decodeFormato" class="input-aurora">
            <option v-for="f in formatosDecod" :key="f.id" :value="f.id">{{ f.label }}</option>
          </select>
        </div>
        <div>
          <label class="text-xs font-semibold text-blue-300 mb-1.5 block">Valor para decodificar</label>
          <textarea v-model="decodeEntrada" @input="decodeExec()" rows="5" class="input-aurora w-full font-mono text-sm"
            :placeholder="decodePlaceholder"></textarea>
        </div>
      </div>
      <div v-if="decodeSaida" class="glass-panel p-4">
        <div class="flex justify-between items-center mb-2">
          <label class="text-xs font-semibold text-blue-300">Texto decodificado</label>
          <button @click="copiar(decodeSaida)" class="text-xs text-blue-400 hover:text-white flex items-center gap-1"><Icon icon="mdi:content-copy" class="w-3 h-3" /> Copiar</button>
        </div>
        <textarea :value="decodeSaida" readonly rows="4" class="input-aurora w-full font-mono text-sm bg-white/5 cursor-text resize-none"></textarea>
      </div>
      <div v-if="decodeErro" class="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
        <Icon icon="mdi:alert-circle-outline" class="w-4 h-4 shrink-0" /> {{ decodeErro }}
      </div>
    </div>

    <!-- ══ ABA: INFO POR CARACTERE ════════════════════════════════════ -->
    <div v-if="aba==='char'" class="space-y-4">
      <div class="glass-panel p-4">
        <label class="text-xs font-semibold text-blue-300 mb-1.5 block">Caractere ou texto para analisar</label>
        <input v-model="charInput" @input="analisarChar()" maxlength="1" class="input-aurora text-3xl font-mono w-24 text-center" placeholder="A" />
        <p class="text-xs text-blue-400 mt-1">Digite 1 caractere</p>
      </div>

      <div v-if="charInfo" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div v-for="item in charInfo" :key="item.label" class="glass-panel p-3 flex items-start gap-3">
          <div class="shrink-0 w-8 h-8 rounded-lg bg-cyan-600/20 flex items-center justify-center">
            <Icon :icon="item.icon" class="w-4 h-4 text-cyan-400" />
          </div>
          <div class="min-w-0">
            <p class="text-[10px] text-blue-300 mb-0.5">{{ item.label }}</p>
            <p class="font-mono text-sm font-semibold text-white break-all">{{ item.valor }}</p>
          </div>
          <button @click="copiar(item.valor)" class="ml-auto text-[10px] text-blue-400 hover:text-white shrink-0"><Icon icon="mdi:content-copy" class="w-3 h-3" /></button>
        </div>
      </div>

      <!-- Tabela ASCII extendida -->
      <div class="glass-panel p-4">
        <h3 class="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Icon icon="mdi:table-of-contents" class="w-4 h-4 text-cyan-400" />
          Tabela ASCII (32–127)
        </h3>
        <div class="overflow-auto max-h-80">
          <table class="w-full text-xs font-mono">
            <thead class="sticky top-0 bg-[#0d1b30]">
              <tr class="text-blue-300">
                <th class="p-1.5 text-left">Dec</th>
                <th class="p-1.5 text-left">Hex</th>
                <th class="p-1.5 text-left">Oct</th>
                <th class="p-1.5 text-left">Bin</th>
                <th class="p-1.5 text-left">Char</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="n in asciiTable" :key="n" class="border-b border-white/5 hover:bg-white/5 cursor-pointer"
                @click="charInput=String.fromCharCode(n);analisarChar()">
                <td class="p-1.5 text-blue-200">{{ n }}</td>
                <td class="p-1.5 text-blue-200">{{ n.toString(16).toUpperCase().padStart(2,'0') }}</td>
                <td class="p-1.5 text-blue-200">{{ n.toString(8).padStart(3,'0') }}</td>
                <td class="p-1.5 text-blue-200">{{ n.toString(2).padStart(8,'0') }}</td>
                <td class="p-1.5 text-white font-bold">{{ n < 32 ? asciiControl[n] ?? '' : String.fromCharCode(n) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import Swal from 'sweetalert2'

const asciiTips = [
  { title: 'Separadores', text: 'Decimal e Hexadecimal usam espaço como separador entre os códigos de cada caractere.', type: 'info' as const },
  { title: 'Binário', text: 'Cada byte é representado como 8 bits. Para texto UTF-8 com acentos, caracteres usam múltiplos bytes.', type: 'info' as const },
  { title: 'HTML Entities', text: 'Entidades HTML nomeadas (&amp;, &lt;) funcionam apenas para caracteres especiais. Os demais usam forma numérica (&#65;).', type: 'info' as const },
]

const tabs = [
  { id: 'multi' as const,  label: 'Texto → Todos os formatos' },
  { id: 'decode' as const, label: 'Formato → Texto' },
  { id: 'char' as const,   label: 'Info por Caractere' },
]
const aba = ref<'multi'|'decode'|'char'>('multi')

// ─── Texto → todos os formatos ────────────────────────────────────────────────
const textoEntrada = ref('Olá Mundo!')

const formatos = [
  { id: 'ascii',    label: 'ASCII Decimal (separado por espaço)' },
  { id: 'hex',      label: 'Hexadecimal (sep. por espaço)' },
  { id: 'bin',      label: 'Binário (sep. por espaço)' },
  { id: 'oct',      label: 'Octal (sep. por espaço)' },
  { id: 'base64',   label: 'Base64' },
  { id: 'unicode',  label: 'Unicode (U+XXXX)' },
  { id: 'urlenc',   label: 'URL Encoding (%XX)' },
  { id: 'entNum',   label: 'Entidade HTML por Número (&#N;)' },
  { id: 'entNome',  label: 'Entidade HTML por Nome (&amp; etc.)' },
]

const namedEntities: Record<string, string> = {
  '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;','©':'&copy;','®':'&reg;','™':'&trade;',
  '€':'&euro;','£':'&pound;','¥':'&yen;','¢':'&cent;','§':'&sect;','¶':'&para;','°':'&deg;','±':'&plusmn;',
  '×':'&times;','÷':'&divide;','²':'&sup2;','³':'&sup3;','½':'&frac12;','¼':'&frac14;','¾':'&frac34;',
  '←':'&larr;','→':'&rarr;','↑':'&uarr;','↓':'&darr;','↔':'&harr;','«':'&laquo;','»':'&raquo;',
  '–':'&ndash;','—':'&mdash;','…':'&hellip;','•':'&bull;','′':'&prime;','″':'&Prime;',
  'α':'&alpha;','β':'&beta;','γ':'&gamma;','δ':'&delta;','π':'&pi;','σ':'&sigma;','Ω':'&Omega;',
  '∞':'&infin;','∑':'&sum;','√':'&radic;','∫':'&int;','≤':'&le;','≥':'&ge;','≠':'&ne;','≈':'&asymp;',
  '♠':'&spades;','♣':'&clubs;','♥':'&hearts;','♦':'&diams;',
  'é':'&eacute;','è':'&egrave;','ê':'&ecirc;','ë':'&euml;','à':'&agrave;','â':'&acirc;',
  'á':'&aacute;','ã':'&atilde;','ç':'&ccedil;','ó':'&oacute;','ô':'&ocirc;','õ':'&otilde;',
  'ú':'&uacute;','ü':'&uuml;','í':'&iacute;','î':'&icirc;',
  'Á':'&Aacute;','É':'&Eacute;','Ó':'&Oacute;','Ú':'&Uacute;','Ã':'&Atilde;',
  'Ç':'&Ccedil;','Ô':'&Ocirc;','Ê':'&Ecirc;','Â':'&Acirc;','Î':'&Icirc;','Õ':'&Otilde;',
}

function textToAscii(t: string)   { return Array.from(t).map(c => c.charCodeAt(0)).join(' ') }
function textToHex(t: string)     { return Array.from(t).map(c => c.charCodeAt(0).toString(16).toUpperCase().padStart(2,'0')).join(' ') }
function textToBin(t: string)     { return Array.from(t).map(c => c.charCodeAt(0).toString(2).padStart(8,'0')).join(' ') }
function textToOct(t: string)     { return Array.from(t).map(c => c.charCodeAt(0).toString(8).padStart(3,'0')).join(' ') }
function textToBase64(t: string)  { try { return btoa(unescape(encodeURIComponent(t))) } catch { return 'Erro: contém caracteres inválidos' } }
function textToUnicode(t: string) { return Array.from(t).map(c => 'U+' + c.codePointAt(0)!.toString(16).toUpperCase().padStart(4,'0')).join(' ') }
function textToUrlEnc(t: string)  { return encodeURIComponent(t) }
function textToEntNum(t: string)  { return Array.from(t).map(c => `&#${c.charCodeAt(0)};`).join('') }
function textToEntNome(t: string) { return Array.from(t).map(c => namedEntities[c] || c).join('') }

type SaidasKey = 'ascii'|'hex'|'bin'|'oct'|'base64'|'unicode'|'urlenc'|'entNum'|'entNome'
type SaidasMap = Record<SaidasKey, string>
const saidas = ref<SaidasMap>({ ascii:'', hex:'', bin:'', oct:'', base64:'', unicode:'', urlenc:'', entNum:'', entNome:'' })

function converter() {
  const t = textoEntrada.value
  saidas.value = {
    ascii:   textToAscii(t),
    hex:     textToHex(t),
    bin:     textToBin(t),
    oct:     textToOct(t),
    base64:  textToBase64(t),
    unicode: textToUnicode(t),
    urlenc:  textToUrlEnc(t),
    entNum:  textToEntNum(t),
    entNome: textToEntNome(t),
  }
}

converter()

// ─── Decode: formato → texto ──────────────────────────────────────────────────
const decodeFormato  = ref('ascii')
const decodeEntrada  = ref('')
const decodeSaida    = ref('')
const decodeErro     = ref('')

const formatosDecod = [
  { id: 'ascii',   label: 'ASCII Decimal (separado por espaço)' },
  { id: 'hex',     label: 'Hexadecimal (separado por espaço)' },
  { id: 'bin',     label: 'Binário (separado por espaço)' },
  { id: 'base64',  label: 'Base64' },
  { id: 'unicode', label: 'Unicode (U+XXXX)' },
  { id: 'urlenc',  label: 'URL Encoding (%XX)' },
  { id: 'entNum',  label: 'Entidade HTML Numérica (&#N;)' },
]

const decodePlaceholder = computed(() => {
  switch(decodeFormato.value) {
    case 'ascii':   return '79 108 225 32 77 117 110 100 111 33'
    case 'hex':     return '4F 6C C1 20 4D 75 6E 64 6F 21'
    case 'bin':     return '01001111 01101100 11000001 00100000 ...'
    case 'base64':  return 'T2zDoSBNdW5kbyE='
    case 'unicode': return 'U+004F U+006C U+00E1 U+0020 U+004D...'
    case 'urlenc':  return 'Ol%C3%A1%20Mundo%21'
    case 'entNum':  return '&#79;&#108;&#225;&#32;...'
    default: return 'Cole o valor aqui...'
  }
})

function decodeExec() {
  decodeErro.value = ''; decodeSaida.value = ''
  const v = decodeEntrada.value.trim()
  if (!v) return
  try {
    switch(decodeFormato.value) {
      case 'ascii':   decodeSaida.value = v.split(/\s+/).map(n => String.fromCharCode(parseInt(n))).join(''); break
      case 'hex':     decodeSaida.value = v.split(/\s+/).map(h => String.fromCharCode(parseInt(h,16))).join(''); break
      case 'bin':     decodeSaida.value = v.split(/\s+/).map(b => String.fromCharCode(parseInt(b,2))).join(''); break
      case 'base64':  decodeSaida.value = decodeURIComponent(escape(atob(v.replace(/\s/g,'')))); break
      case 'unicode': decodeSaida.value = v.split(/\s+/).map(u => String.fromCodePoint(parseInt(u.replace('U+','0x')))).join(''); break
      case 'urlenc':  decodeSaida.value = decodeURIComponent(v); break
      case 'entNum':  decodeSaida.value = v.replace(/&#(\d+);/g, (_,n) => String.fromCharCode(parseInt(n))); break
    }
  } catch (e: any) { decodeErro.value = 'Erro ao decodificar: ' + e.message }
}

// ─── Info por caractere ───────────────────────────────────────────────────────
const charInput = ref('A')
const charInfo  = ref<{label:string;valor:string;icon:string}[]>([])

const asciiTable  = Array.from({length: 96}, (_, i) => i + 32)
const asciiControl: Record<number, string> = {0:'NUL',1:'SOH',2:'STX',3:'ETX',4:'EOT',5:'ENQ',6:'ACK',7:'BEL',8:'BS',9:'HT',10:'LF',11:'VT',12:'FF',13:'CR',14:'SO',15:'SI',27:'ESC',32:'SPACE',127:'DEL'}

function analisarChar() {
  const c = charInput.value
  if (!c) { charInfo.value = []; return }
  const cp = c.codePointAt(0) || 0
  const hex = cp.toString(16).toUpperCase().padStart(4,'0')
  charInfo.value = [
    { label: 'Caractere', valor: c, icon: 'mdi:format-text' },
    { label: 'Decimal (ASCII/Unicode)', valor: String(cp), icon: 'mdi:numeric' },
    { label: 'Hexadecimal', valor: '0x' + hex, icon: 'mdi:pound' },
    { label: 'Octal', valor: '0' + cp.toString(8), icon: 'mdi:numeric-8-box-outline' },
    { label: 'Binário (8 bits)', valor: cp.toString(2).padStart(8,'0'), icon: 'mdi:code-tags' },
    { label: 'Unicode', valor: 'U+' + hex, icon: 'mdi:alphabetical' },
    { label: 'Base64', valor: btoa(c), icon: 'mdi:code-braces' },
    { label: 'Entidade HTML por Número', valor: `&#${cp};`, icon: 'mdi:xml' },
    { label: 'Entidade HTML por Nome', valor: namedEntities[c] || `(sem entidade nomeada)`, icon: 'mdi:xml' },
    { label: 'URL Encoded', valor: encodeURIComponent(c), icon: 'mdi:link' },
    { label: 'JSON Escaped', valor: JSON.stringify(c), icon: 'mdi:code-json' },
    { label: 'HTML Escape (\\u)', valor: `\\u${hex}`, icon: 'mdi:slash-forward' },
  ]
}

analisarChar()

function copiar(text: string) {
  navigator.clipboard.writeText(text)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 800, showConfirmButton: false })
}
</script>


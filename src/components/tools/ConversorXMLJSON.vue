<template>
  <ToolShell
    title="Conversor XML ↔ JSON"
    description="Converta entre XML e JSON de forma bidirecional. Atributos, namespaces e tags aninhadas são preservados."
    icon="fa-file-code"
    icon-gradient="from-orange-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['XML → JSON', 'JSON → XML', 'Validação automática']"
    :tips="[
      { title: 'Atributos XML', text: 'Atributos XML são convertidos para a propriedade @attributes no JSON resultante.' },
      { title: 'Tags repetidas', text: 'Tags XML repetidas no mesmo nível são automaticamente convertidas em arrays JSON.', type: 'info' },
      { title: 'JSON → XML', text: 'Ao converter JSON para XML, o objeto raiz recebe a tag <root>. Personalize conforme necessário.', type: 'warning' },
    ]"
    :examples="[
      { title: 'XML simples', desc: 'Input: &lt;pessoa&gt;&lt;nome&gt;João&lt;/nome&gt;&lt;/pessoa&gt;', result: 'JSON com chave pessoa contendo chave nome: João' },
      { title: 'Com atributos', desc: 'Input: &lt;item id=1&gt;Texto&lt;/item&gt;', result: 'JSON com @attributes.id = 1 e #text = Texto' },
      { title: 'Tags repetidas', desc: 'Input: &lt;lista&gt;&lt;item&gt;A&lt;/item&gt;&lt;item&gt;B&lt;/item&gt;&lt;/lista&gt;', result: 'JSON com lista.item como array [A, B]' },
    ]"
  >
    <div class="space-y-4">
      <!-- Seletor de modo -->
      <div class="tool-body !mb-0">
        <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
          <button
            @click="modo = 'xml-json'"
            :class="['flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all', modo === 'xml-json' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700']"
          >
            <i class="fas fa-arrow-right mr-2"></i>XML → JSON
          </button>
          <button
            @click="modo = 'json-xml'"
            :class="['flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all', modo === 'json-xml' ? 'bg-orange-600 text-white shadow' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700']"
          >
            <i class="fas fa-arrow-left mr-2"></i>JSON → XML
          </button>
        </div>
      </div>

      <!-- Editor duplo -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Entrada -->
        <div class="tool-body !mb-0 space-y-2">
          <label class="input-aurora-label">
            <i :class="['fas mr-1.5', modo === 'xml-json' ? 'fa-code text-orange-500' : 'fa-braces text-amber-500']"></i>
            {{ modo === 'xml-json' ? 'XML de Entrada' : 'JSON de Entrada' }}
          </label>
          <textarea
            v-model="input"
            @input="converter"
            rows="18"
            :placeholder="modo === 'xml-json' ? xmlPlaceholder : jsonPlaceholder"
            class="input-aurora font-mono text-sm resize-y"
          ></textarea>
          <div class="flex gap-2">
            <BaseButton variant="outline" icon="fa-trash" size="sm" @click="limpar">Limpar</BaseButton>
            <BaseButton variant="success" icon="fa-play" size="sm" @click="converter" class="flex-1">Converter</BaseButton>
          </div>
        </div>

        <!-- Saída -->
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="input-aurora-label !mb-0">
              <i :class="['fas mr-1.5', modo === 'xml-json' ? 'fa-braces text-amber-500' : 'fa-code text-orange-500']"></i>
              {{ modo === 'xml-json' ? 'JSON Resultante' : 'XML Resultante' }}
            </label>
            <BaseButton v-if="output" variant="primary" icon="fa-copy" size="xs" @click="copiar">Copiar</BaseButton>
          </div>

          <div
            class="min-h-[380px] rounded-xl border font-mono text-sm p-4 overflow-auto bg-gray-50 dark:bg-slate-900"
            :class="erro ? 'border-red-400 dark:border-red-600' : 'border-gray-200 dark:border-slate-700'"
          >
            <div v-if="erro" class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0"></i>
              <span class="text-xs">{{ erro }}</span>
            </div>
            <pre v-else-if="output" class="text-gray-900 dark:text-slate-100 text-xs whitespace-pre-wrap">{{ output }}</pre>
            <div v-else class="text-center py-12 text-gray-400 dark:text-slate-500">
              <i class="fas fa-file-code text-3xl mb-3 opacity-30 block text-orange-400"></i>
              <p class="text-sm">O resultado aparece aqui</p>
            </div>
          </div>

          <BaseButton v-if="output && !erro" variant="outline" icon="fa-indent" size="sm" class="w-full" @click="formatarOutput">
            Formatar saída
          </BaseButton>
        </div>
      </div>

      <!-- Métricas -->
      <Transition name="scale-in">
        <div v-if="output && !erro" class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
            <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ input.split('\n').length }}</div>
            <div class="metric-glass-label">Linhas entrada</div>
          </div>
          <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
            <div class="metric-glass-value text-amber-600 dark:text-amber-400">{{ output.split('\n').length }}</div>
            <div class="metric-glass-label">Linhas saída</div>
          </div>
          <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
            <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ input.length }}</div>
            <div class="metric-glass-label">Bytes entrada</div>
          </div>
          <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
            <div class="metric-glass-value text-amber-600 dark:text-amber-400">{{ output.length }}</div>
            <div class="metric-glass-label">Bytes saída</div>
          </div>
        </div>
      </Transition>

      <!-- Dica de casos de uso -->
      <div class="glass-panel p-4">
        <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
          <i class="fas fa-lightbulb text-amber-500"></i>
          Casos de uso comuns
        </h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-gray-600 dark:text-slate-300">
          <span><i class="fas fa-check text-teal-500 mr-1"></i> Integração de APIs</span>
          <span><i class="fas fa-check text-teal-500 mr-1"></i> Migração de configs</span>
          <span><i class="fas fa-check text-teal-500 mr-1"></i> SOAP → REST</span>
          <span><i class="fas fa-check text-teal-500 mr-1"></i> Dados legados</span>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const xmlPlaceholder = `<?xml version="1.0"?>\n<root>\n  <name>João</name>\n</root>`
const jsonPlaceholder = `{\n  "name": "João"\n}`
const modo   = ref('xml-json')
const input  = ref(`<?xml version="1.0" encoding="UTF-8"?>
<pessoa>
  <nome>João Silva</nome>
  <idade>30</idade>
  <email>joao@example.com</email>
  <endereco>
    <rua>Av. Paulista</rua>
    <cidade>São Paulo</cidade>
  </endereco>
  <hobbies>
    <hobby>Leitura</hobby>
    <hobby>Games</hobby>
  </hobbies>
</pessoa>`)
const output = ref('')
const erro   = ref('')

// ── XML → JSON ────────────────────────────────────────────────────
const parseXMLNode = (node: Element): Record<string, unknown> => {
  const obj: Record<string, unknown> = {}
  if (node.attributes?.length) {
    const attrs: Record<string, string> = {}
    for (let i = 0; i < node.attributes.length; i++) {
      const a = node.attributes[i]
      attrs[a.name] = a.value
    }
    obj['@attributes'] = attrs
  }
  if (node.hasChildNodes()) {
    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i]
      if (child.nodeType === 3) {
        const text = (child.nodeValue ?? '').trim()
        if (text) obj['#text'] = text
      } else if (child.nodeType === 1) {
        const childObj = parseXMLNode(child as Element)
        if (obj[child.nodeName]) {
          if (!Array.isArray(obj[child.nodeName])) obj[child.nodeName] = [obj[child.nodeName]]
          ;(obj[child.nodeName] as unknown[]).push(childObj)
        } else {
          obj[child.nodeName] = childObj
        }
      }
    }
  }
  if (Object.keys(obj).length === 1 && obj['#text']) return obj['#text'] as Record<string, unknown>
  return obj
}

const xmlToJSON = (xml: string) => {
  const parser = new DOMParser()
  const xmlDoc = parser.parseFromString(xml, 'text/xml')
  if (xmlDoc.getElementsByTagName('parsererror').length > 0) throw new Error('XML inválido')
  return JSON.stringify(parseXMLNode(xmlDoc.documentElement), null, 2)
}

// ── JSON → XML ────────────────────────────────────────────────────
const objectToXML = (obj: unknown, tagName: string, indent = 0): string => {
  const spaces = '  '.repeat(indent)
  if (typeof obj !== 'object' || obj === null) return `${spaces}<${tagName}>${obj}</${tagName}>\n`
  if (Array.isArray(obj)) return obj.map(item => objectToXML(item, 'item', indent)).join('')
  let xml = `${spaces}<${tagName}>\n`
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) xml += objectToXML(value, key, indent + 1)
    else xml += `${spaces}  <${key}>${value}</${key}>\n`
  }
  xml += `${spaces}</${tagName}>\n`
  return xml
}

const jsonToXML = (json: string) => {
  const obj = JSON.parse(json)
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + objectToXML(obj, 'root', 0)
}

// ── Converter ─────────────────────────────────────────────────────
const converter = () => {
  erro.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    output.value = modo.value === 'xml-json' ? xmlToJSON(input.value) : jsonToXML(input.value)
  } catch (e) {
    erro.value = (e as Error).message
    output.value = ''
  }
}

const formatarOutput = () => {
  if (!output.value || erro.value) return
  try {
    if (modo.value === 'xml-json') output.value = JSON.stringify(JSON.parse(output.value), null, 2)
  } catch {}
}

const limpar = () => { input.value = ''; output.value = ''; erro.value = '' }

const copiar = async () => {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    Swal.fire({ title: 'Copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

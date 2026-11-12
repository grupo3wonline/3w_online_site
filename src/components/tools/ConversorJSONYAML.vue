<template>
  <ToolShell
    title="Conversor JSON ↔ YAML"
    description="Converta entre JSON e YAML com validação automática. Ideal para configurações de Docker, Kubernetes, CI/CD e APIs."
    icon="fa-file-code"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['JSON ↔ YAML bidirecional', 'Validação de sintaxe', 'Formatar e minificar JSON']"
    :tips="[
      { title: 'YAML usa indentação', text: 'No YAML, a hierarquia é definida por espaços (nao tabs). Use 2 espaços por nível. Chaves e colchetes sao opcionais.', type: 'info' },
      { title: 'JSON é mais verboso', text: 'JSON requer aspas em todas as chaves e vírgulas entre propriedades. YAML é mais legível por humanos.', type: 'info' },
      { title: 'Tipos de dados', text: 'YAML detecta tipos automaticamente: true vira booleano, 1.5 vira float. Use aspas simples para forcar string.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Configuração Docker', desc: 'JSON de serviço com portas e environment', result: 'services: api: image: node / ports: 3000:3000' },
      { title: 'Variáveis aninhadas', desc: 'JSON: db com host e port', result: 'YAML: db: / host: localhost / port: 5432' },
      { title: 'Array de itens', desc: 'JSON: array [item1, item2, item3]', result: 'YAML: - item1 / - item2 / - item3' },
    ]"
  >

    <!-- Seletor de modo -->
    <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-4">
      <button
        @click="modo = 'json-yaml'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'json-yaml' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-right mr-1.5"></i>JSON → YAML
      </button>
      <button
        @click="modo = 'yaml-json'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'yaml-json' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-left mr-1.5"></i>YAML → JSON
      </button>
    </div>

    <!-- Editor -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Entrada -->
      <div class="tool-body !mb-0">
        <label class="input-aurora-label">
          <i class="fas fa-file-alt mr-1.5 text-indigo-500"></i>
          {{ modo === 'json-yaml' ? 'JSON de Entrada' : 'YAML de Entrada' }}
        </label>
        <textarea
          v-model="input"
          @input="converter"
          rows="16"
          :placeholder="modo === 'json-yaml' ? '{ name: John, age: 30 }' : 'name: John'"
          class="input-aurora resize-none font-mono text-sm"
        ></textarea>
      </div>

      <!-- Saída -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="input-aurora-label !mb-0">
            <i class="fas fa-file-code mr-1.5 text-blue-500"></i>
            {{ modo === 'json-yaml' ? 'YAML de Saída' : 'JSON de Saída' }}
          </label>
          <BaseButton v-if="output" variant="outline" size="xs" icon="fa-copy" @click="copiar">Copiar</BaseButton>
        </div>

        <Transition name="scale-in" appear>
          <div v-if="output || erro">
            <div
              class="glass-panel font-mono text-sm overflow-auto"
              :class="erro ? 'border-red-400 dark:border-red-600' : ''"
              style="min-height: 16rem; max-height: 25rem;"
            >
              <pre v-if="!erro" class="text-gray-800 dark:text-slate-100 whitespace-pre p-2">{{ output }}</pre>
              <div v-else class="p-4">
                <div class="tip-card-warning">
                  <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0"></i>
                  <span class="text-xs">{{ erro }}</span>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!output && !erro" class="glass-panel text-center py-10 text-gray-400 dark:text-slate-500">
          <i class="fas fa-file-code text-3xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Cole seu {{ modo === 'json-yaml' ? 'JSON' : 'YAML' }} no painel ao lado</p>
        </div>
      </div>
    </div>

    <!-- Ações -->
    <div class="flex flex-wrap gap-2 mt-4">
      <BaseButton v-if="modo === 'yaml-json'" variant="primary" size="sm" icon="fa-indent" @click="formatarJSON">
        Formatar JSON
      </BaseButton>
      <BaseButton v-if="modo === 'yaml-json'" variant="outline" size="sm" icon="fa-compress" @click="minificarJSON">
        Minificar JSON
      </BaseButton>
      <BaseButton variant="outline" size="sm" icon="fa-trash" @click="limpar" class="ml-auto">
        Limpar
      </BaseButton>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
        <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ input.split('\n').length }}</div>
        <div class="metric-glass-label">Linhas entrada</div>
      </div>
      <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
        <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ output.split('\n').length }}</div>
        <div class="metric-glass-label">Linhas saída</div>
      </div>
      <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
        <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ input.length }}</div>
        <div class="metric-glass-label">Bytes entrada</div>
      </div>
      <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
        <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ output.length }}</div>
        <div class="metric-glass-label">Bytes saída</div>
      </div>
    </div>

    <div class="tip-card mt-4">
      <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
      <span class="text-xs">YAML é amplamente usado em Docker Compose, GitHub Actions, Kubernetes e Ansible. JSON é padrão para APIs REST.</span>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const modo   = ref('json-yaml')
const input  = ref(`{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "city": "New York",
    "country": "USA"
  },
  "hobbies": ["reading", "gaming", "coding"]
}`)
const output = ref('')
const erro   = ref('')

const objectToYAML = (obj, indent = 0) => {
  const sp = '  '.repeat(indent)
  let yaml = ''
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) yaml += `${sp}-\n${objectToYAML(item, indent + 1)}`
      else yaml += `${sp}- ${item}\n`
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) yaml += `${sp}${key}:\n${objectToYAML(value, indent + 1)}`
      else yaml += `${sp}${key}: ${value}\n`
    }
  }
  return yaml
}

const jsonToYAML = (json) => {
  try {
    return objectToYAML(JSON.parse(json))
  } catch (e) {
    throw new Error(`JSON inválido: ${e.message}`)
  }
}

const parseYAML = (lines, startIndex) => {
  const obj = {}
  let i = startIndex
  const baseIndent = lines[i]?.search(/\S/) ?? 0
  while (i < lines.length) {
    const line = lines[i]
    const indent = line.search(/\S/)
    if (indent < baseIndent) break
    if (indent > baseIndent) { i++; continue }
    const trimmed = line.trim()
    if (trimmed.includes(':')) {
      const colonIdx = trimmed.indexOf(':')
      const key   = trimmed.slice(0, colonIdx).trim()
      const value = trimmed.slice(colonIdx + 1).trim()
      if (!value) {
        const nextIndent = lines[i + 1]?.search(/\S/) ?? 0
        if (nextIndent > indent) {
          const nested = parseYAML(lines, i + 1)
          obj[key] = nested.value
          i = nested.index
          continue
        }
      } else {
        obj[key] = isNaN(value) || value === '' ? value : Number(value)
      }
    }
    i++
  }
  return { value: obj, index: i }
}

const yamlToJSON = (yaml) => {
  try {
    const lines = yaml.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'))
    return JSON.stringify(parseYAML(lines, 0).value, null, 2)
  } catch (e) {
    throw new Error(`YAML inválido: ${e.message}`)
  }
}

const converter = () => {
  erro.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    output.value = modo.value === 'json-yaml' ? jsonToYAML(input.value) : yamlToJSON(input.value)
  } catch (e) {
    erro.value = e.message
    output.value = ''
  }
}

const formatarJSON = () => {
  if (output.value && !erro.value) {
    try { output.value = JSON.stringify(JSON.parse(output.value), null, 2) } catch {}
  }
}

const minificarJSON = () => {
  if (output.value && !erro.value) {
    try { output.value = JSON.stringify(JSON.parse(output.value)) } catch {}
  }
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
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

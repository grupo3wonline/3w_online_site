<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 dark:bg-cyan-900/30 rounded-full mb-4">
          <i class="fas fa-exchange-alt text-cyan-600 dark:text-cyan-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor JSON ↔ YAML</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre JSON e YAML facilmente</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'json-yaml'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'json-yaml' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-right mr-2"></i>
            JSON → YAML
          </button>
          <button @click="modo = 'yaml-json'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'yaml-json' ? 'bg-cyan-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-left mr-2"></i>
            YAML → JSON
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ modo === 'json-yaml' ? 'JSON' : 'YAML' }}
            </label>
            <textarea v-model="input" @input="converter" rows="16" :placeholder="modo === 'json-yaml' ? '{ \u0022name\u0022: \u0022John\u0022 }' : 'name: John'" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none font-mono text-sm"></textarea>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ modo === 'json-yaml' ? 'YAML' : 'JSON' }}
              </label>
              <button @click="copiar" class="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors">
                <i class="fas fa-copy mr-1"></i>
                Copiar
              </button>
            </div>
            <div class="h-[420px] px-4 py-3 border rounded-lg bg-gray-50 dark:bg-gray-900 overflow-auto" :class="erro ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'">
              <pre v-if="!erro" class="text-gray-900 dark:text-gray-100 text-sm font-mono">{{ output }}</pre>
              <div v-else class="text-red-600 dark:text-red-400 text-sm">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                {{ erro }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="formatarJSON" v-if="modo === 'yaml-json'" class="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm transition-colors">
            <i class="fas fa-indent mr-2"></i>
            Formatar JSON
          </button>
          <button @click="minificarJSON" v-if="modo === 'yaml-json'" class="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm transition-colors">
            <i class="fas fa-compress mr-2"></i>
            Minificar JSON
          </button>
          <button @click="limpar" class="ml-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm transition-colors">
            <i class="fas fa-trash mr-2"></i>
            Limpar
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ input.split('\n').length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Linhas Entrada</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ output.split('\n').length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Linhas Saída</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ input.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Bytes Entrada</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{{ output.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Bytes Saída</div>
          </div>
        </div>

        <div class="bg-cyan-50 dark:bg-cyan-900/20 border-l-4 border-cyan-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-cyan-600 dark:text-cyan-400 mt-1 mr-3"></i>
            <div class="text-sm text-cyan-800 dark:text-cyan-300">
              <p class="font-semibold mb-2">Dicas:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li><strong>JSON:</strong> Use aspas duplas, vírgulas entre propriedades</li>
                <li><strong>YAML:</strong> Use indentação (2 espaços), sem vírgulas</li>
                <li>Validação automática detecta erros de sintaxe</li>
                <li>Ideal para configurações, Docker Compose, Kubernetes, etc.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const modo = ref('json-yaml')
const input = ref(`{
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
const erro = ref('')

const jsonToYAML = (json) => {
  try {
    const obj = JSON.parse(json)
    return objectToYAML(obj, 0)
  } catch (e) {
    throw new Error(`JSON inválido: ${e.message}`)
  }
}

const objectToYAML = (obj, indent = 0) => {
  const spaces = '  '.repeat(indent)
  let yaml = ''
  
  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'object' && item !== null) {
        yaml += `${spaces}-\n${objectToYAML(item, indent + 1)}`
      } else {
        yaml += `${spaces}- ${item}\n`
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'object' && value !== null) {
        yaml += `${spaces}${key}:\n${objectToYAML(value, indent + 1)}`
      } else {
        yaml += `${spaces}${key}: ${value}\n`
      }
    }
  }
  
  return yaml
}

const yamlToJSON = (yaml) => {
  try {
    const lines = yaml.split('\n').filter(line => line.trim() && !line.trim().startsWith('#'))
    const result = parseYAML(lines, 0)
    return JSON.stringify(result.value, null, 2)
  } catch (e) {
    throw new Error(`YAML inválido: ${e.message}`)
  }
}

const parseYAML = (lines, startIndex) => {
  const obj = {}
  let i = startIndex
  const baseIndent = lines[i]?.search(/\S/) || 0
  
  while (i < lines.length) {
    const line = lines[i]
    const indent = line.search(/\S/)
    
    if (indent < baseIndent) break
    if (indent > baseIndent) {
      i++
      continue
    }
    
    const trimmed = line.trim()
    
    if (trimmed.includes(':')) {
      const [key, ...valueParts] = trimmed.split(':')
      const value = valueParts.join(':').trim()
      
      if (!value) {
        const nextIndent = lines[i + 1]?.search(/\S/) || 0
        if (nextIndent > indent) {
          const nested = parseYAML(lines, i + 1)
          obj[key.trim()] = nested.value
          i = nested.index
          continue
        }
      } else {
        obj[key.trim()] = isNaN(value) ? value : Number(value)
      }
    }
    
    i++
  }
  
  return { value: obj, index: i }
}

const converter = () => {
  erro.value = ''
  
  if (!input.value.trim()) {
    output.value = ''
    return
  }
  
  try {
    if (modo.value === 'json-yaml') {
      output.value = jsonToYAML(input.value)
    } else {
      output.value = yamlToJSON(input.value)
    }
    
    trackToolUsage('Conversor JSON/YAML', modo.value)
  } catch (e) {
    erro.value = e.message
    output.value = ''
  }
}

const formatarJSON = () => {
  if (output.value && !erro.value) {
    try {
      const obj = JSON.parse(output.value)
      output.value = JSON.stringify(obj, null, 2)
    } catch {
      // Já está formatado
    }
  }
}

const minificarJSON = () => {
  if (output.value && !erro.value) {
    try {
      const obj = JSON.parse(output.value)
      output.value = JSON.stringify(obj)
    } catch {
      // Já está minificado
    }
  }
}

const limpar = () => {
  input.value = ''
  output.value = ''
  erro.value = ''
}

const copiar = async () => {
  if (!output.value) return
  
  try {
    await navigator.clipboard.writeText(output.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'Código copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

// Conversão inicial
converter()
</script>

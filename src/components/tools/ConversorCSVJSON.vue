<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-lime-100 dark:bg-lime-900/30 rounded-full mb-4">
          <i class="fas fa-file-csv text-lime-600 dark:text-lime-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor CSV ↔ JSON</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre CSV e JSON bidirecionalmente</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'csv-json'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'csv-json' ? 'bg-lime-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-right mr-2"></i>
            CSV → JSON
          </button>
          <button @click="modo = 'json-csv'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'json-csv' ? 'bg-lime-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-arrow-left mr-2"></i>
            JSON → CSV
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" v-if="modo === 'csv-json'">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Delimitador CSV</label>
            <select v-model="delimitador" @change="converter" class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
              <option value=",">,  (vírgula)</option>
              <option value=";">; (ponto e vírgula)</option>
              <option value="\t">Tab</option>
              <option value="|">| (pipe)</option>
            </select>
          </div>
          <div class="flex items-end">
            <label class="flex items-center cursor-pointer">
              <input v-model="primeiraLinhaHeader" @change="converter" type="checkbox" class="w-4 h-4 text-lime-600 rounded">
              <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Primeira linha é cabeçalho</span>
            </label>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {{ modo === 'csv-json' ? 'CSV' : 'JSON' }}
            </label>
            <textarea v-model="input" @input="converter" rows="16" :placeholder="modo === 'csv-json' ? 'nome,idade,cidade\nJoão,30,SP' : '[{ \u0022nome\u0022: \u0022João\u0022 }]'" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-lime-500 focus:border-transparent resize-none font-mono text-sm"></textarea>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ modo === 'csv-json' ? 'JSON' : 'CSV' }}
              </label>
              <button @click="copiar" class="px-3 py-1.5 bg-lime-600 hover:bg-lime-700 text-white rounded-lg text-sm transition-colors">
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
          <button @click="baixarArquivo" class="px-4 py-2 bg-lime-600 hover:bg-lime-700 text-white rounded-lg text-sm transition-colors">
            <i class="fas fa-download mr-2"></i>
            Baixar {{ modo === 'csv-json' ? 'JSON' : 'CSV' }}
          </button>
          <button @click="limpar" class="ml-auto px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm transition-colors">
            <i class="fas fa-trash mr-2"></i>
            Limpar
          </button>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-lime-600 dark:text-lime-400">{{ contarLinhas(input) }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Linhas/Registros</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-lime-600 dark:text-lime-400">{{ contarColunas() }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Colunas/Campos</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-lime-600 dark:text-lime-400">{{ input.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Bytes Entrada</div>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-lime-600 dark:text-lime-400">{{ output.length }}</div>
            <div class="text-sm text-gray-600 dark:text-gray-400">Bytes Saída</div>
          </div>
        </div>

        <div class="bg-lime-50 dark:bg-lime-900/20 border-l-4 border-lime-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-lime-600 dark:text-lime-400 mt-1 mr-3"></i>
            <div class="text-sm text-lime-800 dark:text-lime-300">
              <p class="font-semibold mb-2">Recursos:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>Detecção automática de cabeçalhos no CSV</li>
                <li>Suporte a múltiplos delimitadores (vírgula, ponto e vírgula, tab, pipe)</li>
                <li>Conversão bidirecional: CSV ↔ JSON</li>
                <li>Ideal para importar/exportar dados entre sistemas</li>
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

const modo = ref('csv-json')
const delimitador = ref(',')
const primeiraLinhaHeader = ref(true)
const input = ref(`nome,idade,cidade,profissao
João Silva,30,São Paulo,Desenvolvedor
Maria Santos,25,Rio de Janeiro,Designer
Pedro Costa,35,Belo Horizonte,Gerente`)
const output = ref('')
const erro = ref('')

const csvToJSON = (csv) => {
  try {
    const linhas = csv.trim().split('\n')
    if (linhas.length === 0) return '[]'
    
    const del = delimitador.value
    let headers = []
    let dados = []
    
    if (primeiraLinhaHeader.value) {
      headers = linhas[0].split(del).map(h => h.trim())
      dados = linhas.slice(1)
    } else {
      const primLinha = linhas[0].split(del)
      headers = primLinha.map((_, i) => `campo${i + 1}`)
      dados = linhas
    }
    
    const resultado = dados.map(linha => {
      const valores = linha.split(del)
      const obj = {}
      headers.forEach((header, i) => {
        const valor = valores[i]?.trim() || ''
        obj[header] = isNaN(valor) ? valor : Number(valor)
      })
      return obj
    })
    
    return JSON.stringify(resultado, null, 2)
  } catch (e) {
    throw new Error(`Erro ao converter CSV: ${e.message}`)
  }
}

const jsonToCSV = (json) => {
  try {
    const arr = JSON.parse(json)
    if (!Array.isArray(arr) || arr.length === 0) {
      throw new Error('JSON deve ser um array de objetos')
    }
    
    const headers = Object.keys(arr[0])
    let csv = headers.join(',') + '\n'
    
    for (const obj of arr) {
      const valores = headers.map(h => {
        const valor = obj[h]
        if (typeof valor === 'string' && valor.includes(',')) {
          return `"${valor}"`
        }
        return valor
      })
      csv += valores.join(',') + '\n'
    }
    
    return csv
  } catch (e) {
    throw new Error(`JSON inválido: ${e.message}`)
  }
}

const converter = () => {
  erro.value = ''
  
  if (!input.value.trim()) {
    output.value = ''
    return
  }
  
  try {
    if (modo.value === 'csv-json') {
      output.value = csvToJSON(input.value)
    } else {
      output.value = jsonToCSV(input.value)
    }
    
    trackToolUsage('Conversor CSV/JSON', modo.value)
  } catch (e) {
    erro.value = e.message
    output.value = ''
  }
}

const contarLinhas = (texto) => {
  return texto.trim().split('\n').length
}

const contarColunas = () => {
  if (!input.value.trim()) return 0
  
  try {
    if (modo.value === 'csv-json') {
      const primeiraLinha = input.value.trim().split('\n')[0]
      return primeiraLinha.split(delimitador.value).length
    } else {
      const arr = JSON.parse(input.value)
      return Array.isArray(arr) && arr.length > 0 ? Object.keys(arr[0]).length : 0
    }
  } catch {
    return 0
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
      text: 'Dados copiados para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarArquivo = () => {
  if (!output.value) return
  
  const extensao = modo.value === 'csv-json' ? 'json' : 'csv'
  const tipo = modo.value === 'csv-json' ? 'application/json' : 'text/csv;charset=utf-8;'
  const BOM = extensao === 'csv' ? '\uFEFF' : ''
  
  const blob = new Blob([BOM + output.value], { type: tipo })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `dados_convertidos.${extensao}`
  a.click()
  URL.revokeObjectURL(url)
}

// Conversão inicial
converter()
</script>

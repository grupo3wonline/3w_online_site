<template>
  <ToolShell
    title="Conversor CSV ↔ JSON"
    description="Converta dados entre CSV e JSON de forma bidirecional. Suporte a múltiplos delimitadores e detecção automática de cabeçalhos."
    icon="fa-file-csv"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['Conversão bidirecional', 'Múltiplos delimitadores', 'Download do resultado']"
    :tips="[
      { title: 'Cabeçalho CSV', text: 'A primeira linha do CSV deve conter os nomes das colunas. Ative a opcao primeira-linha-cabecalho para mapeamento correto.', type: 'info' },
      { title: 'JSON para CSV', text: 'O JSON de entrada deve ser um array de objetos. Objetos aninhados serao tratados como strings planas.', type: 'warning' },
      { title: 'Delimitadores', text: 'Use ponto e virgula (;) para CSVs do Excel em portugues. Virgula (,) e o padrao internacional (RFC 4180).', type: 'info' },
    ]"
    :examples="[
      { title: 'CSV simples', desc: 'linha1: nome,idade,cidade / linha2: Joao,30,SP', result: 'Array JSON com objetos nome/idade/cidade' },
      { title: 'CSV com ponto e virgula', desc: 'nome;valor / Produto A;10.5', result: 'Array JSON: nome=Produto A, valor=10.5' },
      { title: 'JSON para CSV', desc: 'Array JSON com id e item', result: 'CSV: id,item / 1,A' },
    ]"
  >

    <!-- Seletor de modo -->
    <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-4">
      <button
        @click="modo = 'csv-json'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'csv-json' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-right mr-1.5"></i>CSV → JSON
      </button>
      <button
        @click="modo = 'json-csv'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'json-csv' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-left mr-1.5"></i>JSON → CSV
      </button>
    </div>

    <!-- Opções CSV -->
    <div v-if="modo === 'csv-json'" class="tool-body !mb-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="input-aurora-label">
            <i class="fas fa-columns mr-1.5 text-teal-500"></i>
            Delimitador
          </label>
          <select v-model="delimitador" @change="converter" class="input-aurora">
            <option value=",">, (vírgula)</option>
            <option value=";">; (ponto e vírgula)</option>
            <option value="\t">Tab</option>
            <option value="|">| (pipe)</option>
          </select>
        </div>
        <div class="flex items-end pb-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              v-model="primeiraLinhaHeader"
              @change="converter"
              type="checkbox"
              class="checkbox-aurora"
            />
            <span class="text-sm text-gray-700 dark:text-slate-200">Primeira linha é cabeçalho</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Editor -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Entrada -->
      <div class="tool-body !mb-0">
        <label class="input-aurora-label">
          <i class="fas fa-file-alt mr-1.5 text-teal-500"></i>
          {{ modo === 'csv-json' ? 'CSV de Entrada' : 'JSON de Entrada' }}
        </label>
        <textarea
          v-model="input"
          @input="converter"
          rows="14"
          :placeholder="modo === 'csv-json' ? 'nome,idade,cidade' : '[{ nome: Joao, idade: 30 }]'"
          class="input-aurora resize-none font-mono text-sm"
        ></textarea>
      </div>

      <!-- Saída -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="input-aurora-label !mb-0">
            <i class="fas fa-file-code mr-1.5 text-teal-500"></i>
            {{ modo === 'csv-json' ? 'JSON de Saída' : 'CSV de Saída' }}
          </label>
          <BaseButton v-if="output" variant="outline" size="xs" icon="fa-copy" @click="copiar">
            Copiar
          </BaseButton>
        </div>

        <Transition name="scale-in" appear>
          <div v-if="output || erro">
            <div
              class="glass-panel font-mono text-sm overflow-auto"
              :class="erro ? 'border-red-400 dark:border-red-600' : ''"
              style="min-height: 14rem; max-height: 25rem;"
            >
              <pre v-if="!erro" class="text-gray-800 dark:text-slate-100 whitespace-pre-wrap break-all p-2">{{ output }}</pre>
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
          <i class="fas fa-file-csv text-3xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Cole seus dados de {{ modo === 'csv-json' ? 'CSV' : 'JSON' }} no painel ao lado</p>
        </div>
      </div>
    </div>

    <!-- Ações -->
    <div class="flex flex-wrap gap-3 mt-4">
      <BaseButton variant="success" icon="fa-download" @click="baixarArquivo" :disabled="!output">
        Baixar {{ modo === 'csv-json' ? 'JSON' : 'CSV' }}
      </BaseButton>
      <BaseButton variant="outline" icon="fa-trash" @click="limpar" class="ml-auto">
        Limpar
      </BaseButton>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
        <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ contarLinhas(input) }}</div>
        <div class="metric-glass-label">Linhas / Registros</div>
      </div>
      <div class="metric-glass ring-1 ring-cyan-100 dark:ring-cyan-900">
        <div class="metric-glass-value text-cyan-600 dark:text-cyan-400">{{ contarColunas() }}</div>
        <div class="metric-glass-label">Colunas / Campos</div>
      </div>
      <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
        <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ input.length }}</div>
        <div class="metric-glass-label">Bytes Entrada</div>
      </div>
      <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
        <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ output.length }}</div>
        <div class="metric-glass-label">Bytes Saída</div>
      </div>
    </div>

    <div class="tip-card-success mt-4">
      <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
      <span class="text-xs">Conversão em tempo real — os dados são processados diretamente no navegador, sem envio para servidores externos.</span>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const modo               = ref('csv-json')
const delimitador        = ref(',')
const primeiraLinhaHeader = ref(true)
const input  = ref(`nome,idade,cidade,profissao\nJoão Silva,30,São Paulo,Desenvolvedor\nMaria Santos,25,Rio de Janeiro,Designer\nPedro Costa,35,Belo Horizonte,Gerente`)
const output = ref('')
const erro   = ref('')

const csvToJSON = (csv: string) => {
  const linhas = csv.trim().split('\n')
  if (!linhas.length) return '[]'
  const del = delimitador.value
  let headers = []
  let dados   = []
  if (primeiraLinhaHeader.value) {
    headers = linhas[0].split(del).map((h: string) => h.trim())
    dados   = linhas.slice(1)
  } else {
    const cols = linhas[0].split(del)
    headers = cols.map((_: string, i: number) => `campo${i + 1}`)
    dados   = linhas
  }
  const resultado = dados.filter((l: string) => l.trim()).map((linha: string) => {
    const valores = linha.split(del)
    const obj: Record<string, string | number> = {}
    headers.forEach((h: string, i: number) => {
      const v = (valores[i] ?? '').trim()
      obj[h] = isNaN(Number(v)) || v === '' ? v : Number(v)
    })
    return obj
  })
  return JSON.stringify(resultado, null, 2)
}

const jsonToCSV = (json: string) => {
  const arr = JSON.parse(json)
  if (!Array.isArray(arr) || !arr.length) throw new Error('JSON deve ser um array de objetos')
  const headers = Object.keys(arr[0])
  let csv = headers.join(',') + '\n'
  for (const obj of arr) {
    const valores = headers.map(h => {
      const v = obj[h]
      if (typeof v === 'string' && (v.includes(',') || v.includes('"'))) return `"${v.replace(/"/g, '""')}"`
      return v
    })
    csv += valores.join(',') + '\n'
  }
  return csv
}

const converter = () => {
  erro.value = ''
  if (!input.value.trim()) { output.value = ''; return }
  try {
    output.value = modo.value === 'csv-json' ? csvToJSON(input.value) : jsonToCSV(input.value)
  } catch (e) {
    erro.value = (e as Error).message
    output.value = ''
  }
}

const contarLinhas  = (texto: string) => texto.trim().split('\n').filter((l: string) => l).length
const contarColunas = () => {
  if (!input.value.trim()) return 0
  try {
    if (modo.value === 'csv-json') return input.value.trim().split('\n')[0].split(delimitador.value).length
    const arr = JSON.parse(input.value)
    return Array.isArray(arr) && arr.length ? Object.keys(arr[0]).length : 0
  } catch { return 0 }
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

const baixarArquivo = () => {
  if (!output.value) return
  const ext  = modo.value === 'csv-json' ? 'json' : 'csv'
  const tipo = ext === 'json' ? 'application/json' : 'text/csv;charset=utf-8;'
  const BOM  = ext === 'csv' ? '\uFEFF' : ''
  const blob = new Blob([BOM + output.value], { type: tipo })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `dados_convertidos.${ext}`; a.click()
  URL.revokeObjectURL(url)
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

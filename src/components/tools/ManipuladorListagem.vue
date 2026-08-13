<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-cyan-100 rounded-full mb-4">
          <i class="fas fa-list-ul text-cyan-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Manipulador de Listagem</h1>
        <p class="text-gray-600">Organize, ordene e manipule listas de texto</p>
      </div>

      <div class="space-y-6">
        <!-- Entrada de Lista -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Lista de Itens (um por linha)
          </label>
          <textarea
            v-model="listaEntrada"
            placeholder="Digite ou cole sua lista aqui, um item por linha..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            rows="10"
          ></textarea>
          <p class="text-sm text-gray-500 mt-2">
            {{ itensOriginal.length }} item(ns) na lista
          </p>
        </div>

        <!-- Operações -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Operações Disponíveis
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              v-for="op in operacoes"
              :key="op.value"
              @click="aplicarOperacao(op.value)"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-left hover:border-cyan-500 hover:bg-cyan-50',
                'border-gray-200'
              ]"
            >
              <i :class="`${op.icon} text-cyan-600 mb-2`"></i>
              <div class="font-medium text-gray-900 text-sm">{{ op.label }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ op.descricao }}</div>
            </button>
          </div>
        </div>

        <!-- Opções Adicionais -->
        <div class="bg-gray-50 rounded-lg p-4 space-y-3">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Opções
          </label>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.ignorarVazios"
                type="checkbox"
                class="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
              />
              <span class="ml-3 text-gray-700 text-sm">Ignorar linhas vazias</span>
            </label>
            
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.trimEspacos"
                type="checkbox"
                class="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
              />
              <span class="ml-3 text-gray-700 text-sm">Remover espaços extras</span>
            </label>
            
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.caseSensitive"
                type="checkbox"
                class="w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
              />
              <span class="ml-3 text-gray-700 text-sm">Diferenciar maiúsculas/minúsculas</span>
            </label>
          </div>
        </div>

        <!-- Resultado -->
        <div v-if="listaResultado" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              Resultado: {{ itensResultado.length }} item(ns)
            </h3>
            <div class="flex gap-2">
              <button
                @click="copiar"
                class="flex items-center gap-2 px-4 py-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              >
                <i class="fas fa-copy"></i>
                <span>Copiar</span>
              </button>
              <button
                @click="aplicarAoOriginal"
                class="flex items-center gap-2 px-4 py-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              >
                <i class="fas fa-arrow-left"></i>
                <span>Aplicar</span>
              </button>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6 max-h-96 overflow-y-auto">
            <pre class="text-gray-700 whitespace-pre-wrap font-mono text-sm">{{ listaResultado }}</pre>
          </div>

          <!-- Estatísticas Comparativas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div class="text-center">
              <div class="text-2xl font-bold text-cyan-600">{{ itensOriginal.length }}</div>
              <div class="text-sm text-gray-600">Itens Originais</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-cyan-600">{{ itensResultado.length }}</div>
              <div class="text-sm text-gray-600">Itens Resultado</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-cyan-600">
                {{ itensOriginal.length - itensResultado.length }}
              </div>
              <div class="text-sm text-gray-600">Itens Removidos</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-cyan-600">{{ listaResultado.length }}</div>
              <div class="text-sm text-gray-600">Total Caracteres</div>
            </div>
          </div>
        </div>

        <!-- Botão Limpar -->
        <BaseButton @click="limpar" variant="outline" class="w-full">
          <i class="fas fa-eraser mr-2"></i>
          Limpar Tudo
        </BaseButton>

        <!-- Dica -->
        <div class="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-cyan-600 mt-1"></i>
            <div class="text-sm text-cyan-900">
              <strong>Dica:</strong> Cole sua lista e escolha uma operação acima. 
              Use "Aplicar" para substituir a lista original pelo resultado.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'

const operacoes = [
  { value: 'ordenarAZ', label: 'Ordenar A-Z', icon: 'fas fa-sort-alpha-down', descricao: 'Ordem alfabética' },
  { value: 'ordenarZA', label: 'Ordenar Z-A', icon: 'fas fa-sort-alpha-up', descricao: 'Ordem reversa' },
  { value: 'removerDuplicatas', label: 'Remover Duplicatas', icon: 'fas fa-clone', descricao: 'Apenas únicos' },
  { value: 'numerar', label: 'Numerar Itens', icon: 'fas fa-list-ol', descricao: '1. Item' },
  { value: 'embaralhar', label: 'Embaralhar', icon: 'fas fa-random', descricao: 'Ordem aleatória' },
  { value: 'inverter', label: 'Inverter Ordem', icon: 'fas fa-exchange-alt', descricao: 'Última primeiro' },
  { value: 'maiusculas', label: 'MAIÚSCULAS', icon: 'fas fa-arrow-up', descricao: 'Texto grande' },
  { value: 'minusculas', label: 'minúsculas', icon: 'fas fa-arrow-down', descricao: 'Texto pequeno' },
  { value: 'contarItens', label: 'Contar por Item', icon: 'fas fa-hashtag', descricao: 'Qtd repetições' },
  { value: 'prefixo', label: 'Adicionar Prefixo', icon: 'fas fa-arrow-right', descricao: 'Texto antes' },
  { value: 'sufixo', label: 'Adicionar Sufixo', icon: 'fas fa-arrow-left', descricao: 'Texto depois' },
  { value: 'marcarBullet', label: 'Marcadores •', icon: 'fas fa-circle', descricao: '• Item' }
]

const listaEntrada = ref('')
const listaResultado = ref('')

const opcoes = ref({
  ignorarVazios: true,
  trimEspacos: true,
  caseSensitive: false
})

// Processar lista de entrada
const processarLista = (texto) => {
  let itens = texto.split('\n')
  
  if (opcoes.value.ignorarVazios) {
    itens = itens.filter(item => item.trim().length > 0)
  }
  
  if (opcoes.value.trimEspacos) {
    itens = itens.map(item => item.trim())
  }
  
  return itens
}

// Computados
const itensOriginal = computed(() => processarLista(listaEntrada.value))
const itensResultado = computed(() => processarLista(listaResultado.value))

// Operações
const ordenarAZ = (itens) => {
  return [...itens].sort((a, b) => {
    const textA = opcoes.value.caseSensitive ? a : a.toLowerCase()
    const textB = opcoes.value.caseSensitive ? b : b.toLowerCase()
    return textA.localeCompare(textB)
  })
}

const ordenarZA = (itens) => {
  return ordenarAZ(itens).reverse()
}

const removerDuplicatas = (itens) => {
  if (opcoes.value.caseSensitive) {
    return [...new Set(itens)]
  }
  const seen = new Map()
  return itens.filter(item => {
    const key = item.toLowerCase()
    if (seen.has(key)) return false
    seen.set(key, true)
    return true
  })
}

const numerar = (itens) => {
  return itens.map((item, index) => `${index + 1}. ${item}`)
}

const embaralhar = (itens) => {
  const resultado = [...itens]
  for (let i = resultado.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultado[i], resultado[j]] = [resultado[j], resultado[i]]
  }
  return resultado
}

const inverter = (itens) => {
  return [...itens].reverse()
}

const maiusculas = (itens) => {
  return itens.map(item => item.toUpperCase())
}

const minusculas = (itens) => {
  return itens.map(item => item.toLowerCase())
}

const contarItens = (itens) => {
  const contagem = {}
  const chave = opcoes.value.caseSensitive ? (item) => item : (item) => item.toLowerCase()
  
  itens.forEach(item => {
    const k = chave(item)
    contagem[k] = (contagem[k] || 0) + 1
  })
  
  const resultado = []
  const processados = new Set()
  
  itens.forEach(item => {
    const k = chave(item)
    if (!processados.has(k)) {
      resultado.push(`${item} (${contagem[k]}x)`)
      processados.add(k)
    }
  })
  
  return resultado
}

const adicionarPrefixo = async (itens) => {
  const { value: prefixo } = await Swal.fire({
    title: 'Adicionar Prefixo',
    input: 'text',
    inputLabel: 'Digite o prefixo a adicionar',
    inputPlaceholder: 'Ex: - ',
    showCancelButton: true,
    cancelButtonText: 'Cancelar'
  })
  
  if (prefixo !== undefined) {
    return itens.map(item => `${prefixo}${item}`)
  }
  return itens
}

const adicionarSufixo = async (itens) => {
  const { value: sufixo } = await Swal.fire({
    title: 'Adicionar Sufixo',
    input: 'text',
    inputLabel: 'Digite o sufixo a adicionar',
    inputPlaceholder: 'Ex: ;',
    showCancelButton: true,
    cancelButtonText: 'Cancelar'
  })
  
  if (sufixo !== undefined) {
    return itens.map(item => `${item}${sufixo}`)
  }
  return itens
}

const marcarBullet = (itens) => {
  return itens.map(item => `• ${item}`)
}

// Aplicar operação
const aplicarOperacao = async (operacao) => {
  if (itensOriginal.value.length === 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: 'Digite uma lista para manipular'
    })
    return
  }

  let resultado = [...itensOriginal.value]

  switch (operacao) {
    case 'ordenarAZ':
      resultado = ordenarAZ(resultado)
      break
    case 'ordenarZA':
      resultado = ordenarZA(resultado)
      break
    case 'removerDuplicatas':
      resultado = removerDuplicatas(resultado)
      break
    case 'numerar':
      resultado = numerar(resultado)
      break
    case 'embaralhar':
      resultado = embaralhar(resultado)
      break
    case 'inverter':
      resultado = inverter(resultado)
      break
    case 'maiusculas':
      resultado = maiusculas(resultado)
      break
    case 'minusculas':
      resultado = minusculas(resultado)
      break
    case 'contarItens':
      resultado = contarItens(resultado)
      break
    case 'prefixo':
      resultado = await adicionarPrefixo(resultado)
      break
    case 'sufixo':
      resultado = await adicionarSufixo(resultado)
      break
    case 'marcarBullet':
      resultado = marcarBullet(resultado)
      break
  }

  listaResultado.value = resultado.join('\n')
}

// Copiar
const copiar = async () => {
  try {
    await navigator.clipboard.writeText(listaResultado.value)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Lista copiada para a área de transferência',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: 'Não foi possível copiar'
    })
  }
}

// Aplicar ao original
const aplicarAoOriginal = () => {
  listaEntrada.value = listaResultado.value
  listaResultado.value = ''
  Swal.fire({
    icon: 'success',
    title: 'Aplicado!',
    text: 'Resultado aplicado à lista original',
    timer: 1500,
    showConfirmButton: false
  })
}

// Limpar
const limpar = () => {
  listaEntrada.value = ''
  listaResultado.value = ''
}
</script>

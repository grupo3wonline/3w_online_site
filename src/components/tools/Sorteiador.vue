<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <i class="fas fa-dice text-blue-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Sorteiador</h1>
        <p class="text-gray-600">Sorteie números ou nomes de forma aleatória</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Sorteio -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Sorteio
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="tipoSorteio = 'numeros'"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-center',
                tipoSorteio === 'numeros'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              ]"
            >
              <i class="fas fa-hashtag text-2xl mb-2"></i>
              <div class="font-medium">Números</div>
            </button>
            <button
              @click="tipoSorteio = 'nomes'"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-center',
                tipoSorteio === 'nomes'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              ]"
            >
              <i class="fas fa-users text-2xl mb-2"></i>
              <div class="font-medium">Nomes</div>
            </button>
          </div>
        </div>

        <!-- Sorteio de Números -->
        <div v-if="tipoSorteio === 'numeros'" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <BaseInput
              v-model="numeroMin"
              label="Número Mínimo"
              type="number"
              icon="fa-solid fa-arrow-down"
            />
            <BaseInput
              v-model="numeroMax"
              label="Número Máximo"
              type="number"
              icon="fa-solid fa-arrow-up"
            />
          </div>
          <BaseInput
            v-model="quantidade"
            label="Quantidade de Números"
            type="number"
            :min="1"
            icon="fa-solid fa-list-ol"
          />
          <label class="flex items-center cursor-pointer">
            <input
              v-model="permitirRepetidos"
              type="checkbox"
              class="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span class="ml-3 text-gray-700">Permitir números repetidos</span>
          </label>
        </div>

        <!-- Sorteio de Nomes -->
        <div v-if="tipoSorteio === 'nomes'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Lista de Nomes
            </label>
            <textarea
              v-model="listaNomes"
              placeholder="Digite os nomes, um por linha"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="6"
            ></textarea>
            <p class="text-sm text-gray-500 mt-2">
              {{ nomesArray.length }} nome(s) na lista
            </p>
          </div>
          <BaseInput
            v-model="quantidadeNomes"
            label="Quantidade de Nomes a Sortear"
            type="number"
            :min="1"
            :max="nomesArray.length"
            icon="fa-solid fa-list-ol"
          />
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4">
          <BaseButton @click="sortear" variant="primary" class="flex-1" :disabled="!podeSortear">
            <i class="fas fa-random mr-2"></i>
            Sortear
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado com Animação -->
        <div v-if="exibirResultado" class="space-y-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-center">
            <div class="text-white text-sm font-medium mb-4">
              {{ animando ? '🎲 Sorteando...' : '🎉 Resultado do Sorteio' }}
            </div>
            <div class="bg-white rounded-xl p-6">
              <div v-if="tipoSorteio === 'numeros'" class="space-y-2">
                <div v-if="resultadoNumeros.length === 1" class="text-6xl font-bold text-blue-600">
                  {{ resultadoNumeros[0] }}
                </div>
                <div v-else class="flex flex-wrap gap-3 justify-center">
                  <span
                    v-for="(num, index) in resultadoNumeros"
                    :key="index"
                    class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-700 rounded-lg text-2xl font-bold"
                  >
                    {{ num }}
                  </span>
                </div>
              </div>
              <div v-else class="space-y-2">
                <div v-if="resultadoNomes.length === 1" class="text-3xl font-bold text-blue-600">
                  {{ resultadoNomes[0] }}
                </div>
                <div v-else class="space-y-2">
                  <div
                    v-for="(nome, index) in resultadoNomes"
                    :key="index"
                    class="bg-blue-50 text-blue-700 rounded-lg px-4 py-3 text-lg font-medium"
                  >
                    {{ index + 1 }}. {{ nome }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Histórico -->
        <div v-if="historico.length > 0" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Histórico de Sorteios</h3>
            <button
              @click="limparHistorico"
              class="text-sm text-red-600 hover:text-red-700"
            >
              Limpar Histórico
            </button>
          </div>
          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div
              v-for="(item, index) in historico"
              :key="index"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-gray-600">
                  {{ item.tipo === 'numeros' ? '🔢 Números' : '👥 Nomes' }}
                </span>
                <span class="text-xs text-gray-500">{{ item.data }}</span>
              </div>
              <div class="text-gray-800">
                {{ item.resultado }}
              </div>
            </div>
          </div>
        </div>

        <!-- Dica -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-blue-600 mt-1"></i>
            <div class="text-sm text-blue-900">
              <strong>Dica:</strong> Para sortear nomes, digite um nome por linha. 
              Você pode sortear múltiplos vencedores ao mesmo tempo!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'

const tipoSorteio = ref('numeros')
const numeroMin = ref(1)
const numeroMax = ref(100)
const quantidade = ref(1)
const permitirRepetidos = ref(false)

const listaNomes = ref('')
const quantidadeNomes = ref(1)

const exibirResultado = ref(false)
const animando = ref(false)
const resultadoNumeros = ref([])
const resultadoNomes = ref([])
const historico = ref([])

// Computados
const nomesArray = computed(() => {
  return listaNomes.value
    .split('\n')
    .map(nome => nome.trim())
    .filter(nome => nome.length > 0)
})

const podeSortear = computed(() => {
  if (tipoSorteio.value === 'numeros') {
    const min = Number(numeroMin.value)
    const max = Number(numeroMax.value)
    const qtd = Number(quantidade.value)
    
    if (min >= max) return false
    if (qtd < 1) return false
    if (!permitirRepetidos.value && qtd > (max - min + 1)) return false
    
    return true
  } else {
    return nomesArray.value.length > 0 && quantidadeNomes.value > 0 && quantidadeNomes.value <= nomesArray.value.length
  }
})

// Funções
const sortear = async () => {
  if (!podeSortear.value) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: tipoSorteio.value === 'numeros' 
        ? 'Verifique os valores informados' 
        : 'Adicione nomes à lista antes de sortear'
    })
    return
  }

  // Animação
  animando.value = true
  exibirResultado.value = true

  await new Promise(resolve => setTimeout(resolve, 1000))

  if (tipoSorteio.value === 'numeros') {
    sortearNumeros()
  } else {
    sortearNomes()
  }

  animando.value = false
}

const sortearNumeros = () => {
  const min = Number(numeroMin.value)
  const max = Number(numeroMax.value)
  const qtd = Number(quantidade.value)
  const numeros = []

  if (permitirRepetidos.value) {
    for (let i = 0; i < qtd; i++) {
      numeros.push(Math.floor(Math.random() * (max - min + 1)) + min)
    }
  } else {
    const disponiveis = []
    for (let i = min; i <= max; i++) {
      disponiveis.push(i)
    }
    
    for (let i = 0; i < qtd; i++) {
      const indice = Math.floor(Math.random() * disponiveis.length)
      numeros.push(disponiveis[indice])
      disponiveis.splice(indice, 1)
    }
  }

  resultadoNumeros.value = numeros.sort((a, b) => a - b)
  
  adicionarAoHistorico({
    tipo: 'numeros',
    resultado: resultadoNumeros.value.join(', '),
    data: new Date().toLocaleString('pt-BR')
  })
}

const sortearNomes = () => {
  const qtd = Number(quantidadeNomes.value)
  const nomes = [...nomesArray.value]
  const sorteados = []

  for (let i = 0; i < qtd; i++) {
    const indice = Math.floor(Math.random() * nomes.length)
    sorteados.push(nomes[indice])
    nomes.splice(indice, 1)
  }

  resultadoNomes.value = sorteados
  
  adicionarAoHistorico({
    tipo: 'nomes',
    resultado: sorteados.join(', '),
    data: new Date().toLocaleString('pt-BR')
  })
}

const adicionarAoHistorico = (item) => {
  historico.value.unshift(item)
  if (historico.value.length > 10) {
    historico.value.pop()
  }
}

const limparHistorico = () => {
  historico.value = []
}

const limpar = () => {
  exibirResultado.value = false
  resultadoNumeros.value = []
  resultadoNomes.value = []
  
  if (tipoSorteio.value === 'numeros') {
    numeroMin.value = 1
    numeroMax.value = 100
    quantidade.value = 1
    permitirRepetidos.value = false
  } else {
    listaNomes.value = ''
    quantidadeNomes.value = 1
  }
}
</script>

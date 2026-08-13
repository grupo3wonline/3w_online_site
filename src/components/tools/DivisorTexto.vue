<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
          <i class="fas fa-scissors text-orange-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Divisor de Texto</h1>
        <p class="text-gray-600">Divida textos longos em partes menores</p>
      </div>

      <div class="space-y-6">
        <!-- Texto de Entrada -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Texto para Dividir
          </label>
          <textarea
            v-model="textoEntrada"
            placeholder="Cole ou digite o texto que deseja dividir..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            rows="8"
          ></textarea>
          <p class="text-sm text-gray-500 mt-2">
            {{ textoEntrada.length }} caracteres
          </p>
        </div>

        <!-- Tipo de Divisão -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Dividir Por
          </label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button
              v-for="tipo in tiposDivisao"
              :key="tipo.value"
              @click="tipoDivisao = tipo.value"
              :class="[
                'p-3 rounded-lg border-2 transition-all text-center',
                tipoDivisao === tipo.value
                  ? 'border-orange-500 bg-orange-50 text-orange-700'
                  : 'border-gray-200 hover:border-orange-300'
              ]"
            >
              <i :class="`${tipo.icon} mb-1`"></i>
              <div class="text-sm font-medium">{{ tipo.label }}</div>
            </button>
          </div>
        </div>

        <!-- Configurações -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-if="tipoDivisao === 'caracteres'"
            v-model="maxCaracteres"
            label="Máximo de Caracteres por Parte"
            type="number"
            :min="1"
            icon="fa-solid fa-text-width"
          />
          
          <BaseInput
            v-if="tipoDivisao === 'palavras'"
            v-model="maxPalavras"
            label="Máximo de Palavras por Parte"
            type="number"
            :min="1"
            icon="fa-solid fa-font"
          />
          
          <BaseInput
            v-if="tipoDivisao === 'linhas'"
            v-model="maxLinhas"
            label="Máximo de Linhas por Parte"
            type="number"
            :min="1"
            icon="fa-solid fa-align-left"
          />
          
          <BaseInput
            v-if="tipoDivisao === 'partes'"
            v-model="numeroParts"
            label="Número de Partes"
            type="number"
            :min="1"
            icon="fa-solid fa-list-ol"
          />
        </div>

        <!-- Opções -->
        <div v-if="tipoDivisao === 'caracteres' || tipoDivisao === 'palavras'" class="space-y-2">
          <label class="flex items-center cursor-pointer">
            <input
              v-model="manterPalavrasInteiras"
              type="checkbox"
              class="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
            />
            <span class="ml-3 text-gray-700">Manter palavras inteiras (não dividir no meio)</span>
          </label>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4">
          <BaseButton @click="dividir" variant="primary" class="flex-1" :disabled="!textoEntrada">
            <i class="fas fa-cut mr-2"></i>
            Dividir Texto
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultados -->
        <div v-if="partes.length > 0" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">
              Resultado: {{ partes.length }} parte(s)
            </h3>
            <button
              @click="copiarTudo"
              class="text-sm text-orange-600 hover:text-orange-700"
            >
              <i class="fas fa-copy mr-1"></i>
              Copiar Tudo
            </button>
          </div>

          <!-- Partes -->
          <div class="space-y-3 max-h-96 overflow-y-auto">
            <div
              v-for="(parte, index) in partes"
              :key="index"
              class="bg-gray-50 rounded-lg p-4 border border-gray-200"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-orange-600">
                  Parte {{ index + 1 }}
                </span>
                <div class="flex items-center gap-2">
                  <span class="text-xs text-gray-500">
                    {{ parte.length }} caracteres
                  </span>
                  <button
                    @click="copiarParte(parte, index)"
                    class="p-1 text-orange-600 hover:bg-orange-50 rounded transition-colors"
                    title="Copiar esta parte"
                  >
                    <i class="fas fa-copy text-sm"></i>
                  </button>
                </div>
              </div>
              <p class="text-gray-700 whitespace-pre-wrap text-sm">{{ parte }}</p>
            </div>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-600">{{ partes.length }}</div>
              <div class="text-sm text-gray-600">Partes</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-600">{{ mediaCaracteres }}</div>
              <div class="text-sm text-gray-600">Média Caracteres</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-600">{{ menorParte }}</div>
              <div class="text-sm text-gray-600">Menor Parte</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-orange-600">{{ maiorParte }}</div>
              <div class="text-sm text-gray-600">Maior Parte</div>
            </div>
          </div>
        </div>

        <!-- Dica -->
        <div class="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-orange-600 mt-1"></i>
            <div class="text-sm text-orange-900">
              <strong>Dica:</strong> Use esta ferramenta para dividir textos longos em posts para redes sociais, 
              SMS, ou para facilitar a leitura em partes menores.
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

const tiposDivisao = [
  { value: 'caracteres', label: 'Caracteres', icon: 'fas fa-text-width' },
  { value: 'palavras', label: 'Palavras', icon: 'fas fa-font' },
  { value: 'linhas', label: 'Linhas', icon: 'fas fa-align-left' },
  { value: 'partes', label: 'Partes', icon: 'fas fa-list-ol' }
]

const textoEntrada = ref('')
const tipoDivisao = ref('caracteres')
const maxCaracteres = ref(280)
const maxPalavras = ref(50)
const maxLinhas = ref(10)
const numeroParts = ref(3)
const manterPalavrasInteiras = ref(true)
const partes = ref([])

// Dividir por caracteres
const dividirPorCaracteres = () => {
  const resultado = []
  let textoRestante = textoEntrada.value
  const max = Number(maxCaracteres.value)

  while (textoRestante.length > 0) {
    let parte = textoRestante.substring(0, max)
    
    if (manterPalavrasInteiras.value && textoRestante.length > max) {
      const ultimoEspaco = parte.lastIndexOf(' ')
      if (ultimoEspaco > 0) {
        parte = parte.substring(0, ultimoEspaco)
      }
    }
    
    resultado.push(parte.trim())
    textoRestante = textoRestante.substring(parte.length).trim()
  }
  
  return resultado
}

// Dividir por palavras
const dividirPorPalavras = () => {
  const palavras = textoEntrada.value.split(/\s+/)
  const resultado = []
  const max = Number(maxPalavras.value)
  
  for (let i = 0; i < palavras.length; i += max) {
    const parte = palavras.slice(i, i + max).join(' ')
    resultado.push(parte)
  }
  
  return resultado
}

// Dividir por linhas
const dividirPorLinhas = () => {
  const linhas = textoEntrada.value.split('\n')
  const resultado = []
  const max = Number(maxLinhas.value)
  
  for (let i = 0; i < linhas.length; i += max) {
    const parte = linhas.slice(i, i + max).join('\n')
    resultado.push(parte)
  }
  
  return resultado
}

// Dividir em número específico de partes
const dividirEmPartes = () => {
  const resultado = []
  const num = Number(numeroParts.value)
  const tamanho = Math.ceil(textoEntrada.value.length / num)
  let textoRestante = textoEntrada.value
  
  while (textoRestante.length > 0 && resultado.length < num) {
    let parte = textoRestante.substring(0, tamanho)
    
    if (manterPalavrasInteiras.value && textoRestante.length > tamanho) {
      const ultimoEspaco = parte.lastIndexOf(' ')
      if (ultimoEspaco > 0) {
        parte = parte.substring(0, ultimoEspaco)
      }
    }
    
    resultado.push(parte.trim())
    textoRestante = textoRestante.substring(parte.length).trim()
  }
  
  return resultado
}

// Função principal de divisão
const dividir = () => {
  if (!textoEntrada.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: 'Digite um texto para dividir'
    })
    return
  }

  switch (tipoDivisao.value) {
    case 'caracteres':
      partes.value = dividirPorCaracteres()
      break
    case 'palavras':
      partes.value = dividirPorPalavras()
      break
    case 'linhas':
      partes.value = dividirPorLinhas()
      break
    case 'partes':
      partes.value = dividirEmPartes()
      break
  }
}

// Estatísticas
const mediaCaracteres = computed(() => {
  if (partes.value.length === 0) return 0
  const total = partes.value.reduce((sum, p) => sum + p.length, 0)
  return Math.round(total / partes.value.length)
})

const menorParte = computed(() => {
  if (partes.value.length === 0) return 0
  return Math.min(...partes.value.map(p => p.length))
})

const maiorParte = computed(() => {
  if (partes.value.length === 0) return 0
  return Math.max(...partes.value.map(p => p.length))
})

// Copiar parte
const copiarParte = async (parte, index) => {
  try {
    await navigator.clipboard.writeText(parte)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: `Parte ${index + 1} copiada`,
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

// Copiar tudo
const copiarTudo = async () => {
  try {
    const texto = partes.value.join('\n\n--- Parte ---\n\n')
    await navigator.clipboard.writeText(texto)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Todas as partes copiadas',
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

// Limpar
const limpar = () => {
  textoEntrada.value = ''
  partes.value = []
  maxCaracteres.value = 280
  maxPalavras.value = 50
  maxLinhas.value = 10
  numeroParts.value = 3
  manterPalavrasInteiras.value = true
}
</script>

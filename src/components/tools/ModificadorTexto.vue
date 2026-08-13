<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
          <i class="fas fa-magic text-pink-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Modificador de Texto</h1>
        <p class="text-gray-600">Transforme e modifique textos de diversas formas</p>
      </div>

      <div class="space-y-6">
        <!-- Texto de Entrada -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Texto para Modificar
          </label>
          <textarea
            v-model="textoEntrada"
            @input="aplicarTransformacao"
            placeholder="Digite ou cole seu texto aqui..."
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none"
            rows="6"
          ></textarea>
        </div>

        <!-- Transformações -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-3">
            Transformações Disponíveis
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <button
              v-for="transform in transformacoes"
              :key="transform.value"
              @click="transformacaoAtiva = transform.value; aplicarTransformacao()"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-left',
                transformacaoAtiva === transform.value
                  ? 'border-pink-500 bg-pink-50'
                  : 'border-gray-200 hover:border-pink-300'
              ]"
            >
              <i :class="`${transform.icon} text-pink-600 mb-2`"></i>
              <div class="font-medium text-gray-900 text-sm">{{ transform.label }}</div>
              <div class="text-xs text-gray-500 mt-1">{{ transform.exemplo }}</div>
            </button>
          </div>
        </div>

        <!-- Resultado -->
        <div v-if="textoResultado && textoEntrada" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Resultado</h3>
            <button
              @click="copiar"
              class="flex items-center gap-2 px-4 py-2 text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
            >
              <i class="fas fa-copy"></i>
              <span>Copiar</span>
            </button>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6">
            <p class="text-gray-700 whitespace-pre-wrap">{{ textoResultado }}</p>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-4 gap-4 pt-4 border-t">
            <div class="text-center">
              <div class="text-2xl font-bold text-pink-600">{{ stats.caracteres }}</div>
              <div class="text-sm text-gray-600">Caracteres</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-pink-600">{{ stats.palavras }}</div>
              <div class="text-sm text-gray-600">Palavras</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-pink-600">{{ stats.linhas }}</div>
              <div class="text-sm text-gray-600">Linhas</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-pink-600">{{ stats.maiusculas }}</div>
              <div class="text-sm text-gray-600">Maiúsculas</div>
            </div>
          </div>
        </div>

        <!-- Botão Limpar -->
        <BaseButton @click="limpar" variant="outline" class="w-full">
          <i class="fas fa-eraser mr-2"></i>
          Limpar
        </BaseButton>

        <!-- Dica -->
        <div class="bg-pink-50 border border-pink-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-pink-600 mt-1"></i>
            <div class="text-sm text-pink-900">
              <strong>Dica:</strong> Escolha uma transformação acima e o texto será automaticamente 
              convertido. Perfeito para formatação rápida de textos!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'

const transformacoes = [
  { value: 'maiusculas', label: 'MAIÚSCULAS', icon: 'fas fa-arrow-up', exemplo: 'TEXTO EXEMPLO' },
  { value: 'minusculas', label: 'minúsculas', icon: 'fas fa-arrow-down', exemplo: 'texto exemplo' },
  { value: 'capitalizar', label: 'Capitalizar', icon: 'fas fa-font', exemplo: 'Texto Exemplo' },
  { value: 'frase', label: 'Frase', icon: 'fas fa-paragraph', exemplo: 'Texto exemplo.' },
  { value: 'alternar', label: 'AlTeRnAr', icon: 'fas fa-random', exemplo: 'TeXtO eXeMpLo' },
  { value: 'inverter', label: 'Inverter', icon: 'fas fa-undo', exemplo: 'olpmexe otxeT' },
  { value: 'camelCase', label: 'camelCase', icon: 'fas fa-code', exemplo: 'textoExemplo' },
  { value: 'snake_case', label: 'snake_case', icon: 'fas fa-code', exemplo: 'texto_exemplo' },
  { value: 'kebab-case', label: 'kebab-case', icon: 'fas fa-minus', exemplo: 'texto-exemplo' },
  { value: 'removerEspacos', label: 'RemoverEspaços', icon: 'fas fa-compress', exemplo: 'textoexemplo' },
  { value: 'removerLinhas', label: 'Remover Quebras', icon: 'fas fa-align-justify', exemplo: 'Texto em linha' },
  { value: 'duplicar', label: 'Duplicar', icon: 'fas fa-copy', exemplo: 'Texto Texto' }
]

const textoEntrada = ref('')
const transformacaoAtiva = ref('maiusculas')
const textoResultado = ref('')

const stats = reactive({
  caracteres: 0,
  palavras: 0,
  linhas: 0,
  maiusculas: 0
})

// Funções de transformação
const aplicarMaiusculas = (texto) => texto.toUpperCase()
const aplicarMinusculas = (texto) => texto.toLowerCase()

const aplicarCapitalizar = (texto) => {
  return texto.split(' ').map(palavra => 
    palavra.charAt(0).toUpperCase() + palavra.slice(1).toLowerCase()
  ).join(' ')
}

const aplicarFrase = (texto) => {
  return texto.split('. ').map(frase => 
    frase.charAt(0).toUpperCase() + frase.slice(1).toLowerCase()
  ).join('. ')
}

const aplicarAlternar = (texto) => {
  return texto.split('').map((char, i) => 
    i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
  ).join('')
}

const aplicarInverter = (texto) => {
  return texto.split('').reverse().join('')
}

const aplicarCamelCase = (texto) => {
  return texto.toLowerCase()
    .split(/[\s-_]+/)
    .map((palavra, i) => i === 0 ? palavra : palavra.charAt(0).toUpperCase() + palavra.slice(1))
    .join('')
}

const aplicarSnakeCase = (texto) => {
  return texto.toLowerCase()
    .trim()
    .replace(/\s+/g, '_')
    .replace(/[^\w_]/g, '')
}

const aplicarKebabCase = (texto) => {
  return texto.toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
}

const aplicarRemoverEspacos = (texto) => {
  return texto.replace(/\s+/g, '')
}

const aplicarRemoverLinhas = (texto) => {
  return texto.replace(/\n+/g, ' ').replace(/\s+/g, ' ')
}

const aplicarDuplicar = (texto) => {
  return `${texto} ${texto}`
}

// Aplicar transformação
const aplicarTransformacao = () => {
  if (!textoEntrada.value) {
    textoResultado.value = ''
    return
  }

  let resultado = textoEntrada.value

  switch (transformacaoAtiva.value) {
    case 'maiusculas':
      resultado = aplicarMaiusculas(resultado)
      break
    case 'minusculas':
      resultado = aplicarMinusculas(resultado)
      break
    case 'capitalizar':
      resultado = aplicarCapitalizar(resultado)
      break
    case 'frase':
      resultado = aplicarFrase(resultado)
      break
    case 'alternar':
      resultado = aplicarAlternar(resultado)
      break
    case 'inverter':
      resultado = aplicarInverter(resultado)
      break
    case 'camelCase':
      resultado = aplicarCamelCase(resultado)
      break
    case 'snake_case':
      resultado = aplicarSnakeCase(resultado)
      break
    case 'kebab-case':
      resultado = aplicarKebabCase(resultado)
      break
    case 'removerEspacos':
      resultado = aplicarRemoverEspacos(resultado)
      break
    case 'removerLinhas':
      resultado = aplicarRemoverLinhas(resultado)
      break
    case 'duplicar':
      resultado = aplicarDuplicar(resultado)
      break
  }

  textoResultado.value = resultado
  calcularStats()
}

// Calcular estatísticas
const calcularStats = () => {
  stats.caracteres = textoResultado.value.length
  stats.palavras = textoResultado.value.trim().split(/\s+/).filter(p => p).length
  stats.linhas = textoResultado.value.split('\n').length
  stats.maiusculas = (textoResultado.value.match(/[A-Z]/g) || []).length
}

// Copiar
const copiar = async () => {
  try {
    await navigator.clipboard.writeText(textoResultado.value)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Texto copiado para a área de transferência',
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
  textoResultado.value = ''
  stats.caracteres = 0
  stats.palavras = 0
  stats.linhas = 0
  stats.maiusculas = 0
}
</script>

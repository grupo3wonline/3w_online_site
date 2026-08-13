<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <i class="fas fa-link text-green-600 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gerador de URL Amigável</h1>
        <p class="text-gray-600">Converta textos em URLs amigáveis (slugs) e URLs seguras</p>
      </div>

      <div class="space-y-6">
        <!-- Tipo de Conversão -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Conversão
          </label>
          <div class="grid grid-cols-2 gap-4">
            <button
              @click="tipoConversao = 'slug'"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-center',
                tipoConversao === 'slug'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300'
              ]"
            >
              <i class="fas fa-pen-fancy text-2xl mb-2"></i>
              <div class="font-medium">Slug</div>
              <div class="text-xs text-gray-500 mt-1">texto-amigavel-url</div>
            </button>
            <button
              @click="tipoConversao = 'encode'"
              :class="[
                'p-4 rounded-lg border-2 transition-all text-center',
                tipoConversao === 'encode'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-200 hover:border-green-300'
              ]"
            >
              <i class="fas fa-shield-alt text-2xl mb-2"></i>
              <div class="font-medium">URL Encode</div>
              <div class="text-xs text-gray-500 mt-1">texto%20codificado</div>
            </button>
          </div>
        </div>

        <!-- Entrada de Texto -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Texto para Converter
          </label>
          <textarea
            v-model="textoEntrada"
            @input="converter"
            :placeholder="tipoConversao === 'slug' ? 'Digite um título ou texto...' : 'Digite uma URL ou texto...'"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            rows="4"
          ></textarea>
        </div>

        <!-- Opções para Slug -->
        <div v-if="tipoConversao === 'slug'" class="space-y-3">
          <label class="block text-sm font-medium text-gray-700">Opções</label>
          
          <div class="space-y-2">
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.lowercase"
                @change="converter"
                type="checkbox"
                class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <span class="ml-3 text-gray-700">Converter para minúsculas</span>
            </label>
            
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.removeAccents"
                @change="converter"
                type="checkbox"
                class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <span class="ml-3 text-gray-700">Remover acentos</span>
            </label>
            
            <label class="flex items-center cursor-pointer">
              <input
                v-model="opcoes.removeSpecial"
                @change="converter"
                type="checkbox"
                class="w-5 h-5 text-green-600 rounded focus:ring-green-500"
              />
              <span class="ml-3 text-gray-700">Remover caracteres especiais</span>
            </label>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Separador
            </label>
            <div class="flex gap-2">
              <button
                v-for="sep in separadores"
                :key="sep.value"
                @click="opcoes.separador = sep.value; converter()"
                :class="[
                  'px-4 py-2 rounded-lg border-2 transition-all',
                  opcoes.separador === sep.value
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : 'border-gray-200 hover:border-green-300'
                ]"
              >
                {{ sep.label }}
              </button>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4">
          <BaseButton @click="converter" variant="primary" class="flex-1">
            <i class="fas fa-sync-alt mr-2"></i>
            Converter
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div v-if="resultado" class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Resultado</h3>
            <button
              @click="copiar"
              class="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            >
              <i class="fas fa-copy"></i>
              <span>Copiar</span>
            </button>
          </div>
          
          <div class="bg-gray-50 rounded-lg p-6">
            <code class="text-green-700 text-lg font-mono break-all">{{ resultado }}</code>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-3 gap-4 pt-4 border-t">
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ textoEntrada.length }}</div>
              <div class="text-sm text-gray-600">Original</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">{{ resultado.length }}</div>
              <div class="text-sm text-gray-600">Convertido</div>
            </div>
            <div class="text-center">
              <div class="text-2xl font-bold text-green-600">
                {{ ((resultado.length / textoEntrada.length) * 100).toFixed(0) }}%
              </div>
              <div class="text-sm text-gray-600">Compressão</div>
            </div>
          </div>
        </div>

        <!-- Exemplos -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
          <div class="flex items-start gap-3">
            <i class="fas fa-lightbulb text-green-600 mt-1"></i>
            <div class="text-sm text-green-900 space-y-2">
              <p><strong>Exemplos de Uso:</strong></p>
              <div class="space-y-1 font-mono text-xs bg-white rounded p-2">
                <div v-if="tipoConversao === 'slug'">
                  <p class="text-gray-600">Entrada: "Como Fazer um Bolo de Chocolate?"</p>
                  <p class="text-green-700">Slug: "como-fazer-um-bolo-de-chocolate"</p>
                </div>
                <div v-else>
                  <p class="text-gray-600">Entrada: "https://site.com/busca?q=teste espaço"</p>
                  <p class="text-green-700">Encoded: "https://site.com/busca?q=teste%20espa%C3%A7o"</p>
                </div>
              </div>
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

const tipoConversao = ref('slug')
const textoEntrada = ref('')
const resultado = ref('')

const separadores = [
  { value: '-', label: 'Hífen (-)' },
  { value: '_', label: 'Underscore (_)' },
  { value: '.', label: 'Ponto (.)' }
]

const opcoes = reactive({
  lowercase: true,
  removeAccents: true,
  removeSpecial: true,
  separador: '-'
})

// Função para remover acentos
const removerAcentos = (texto) => {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// Converter para Slug
const converterParaSlug = (texto) => {
  let slug = texto

  // Lowercase
  if (opcoes.lowercase) {
    slug = slug.toLowerCase()
  }

  // Remover acentos
  if (opcoes.removeAccents) {
    slug = removerAcentos(slug)
  }

  // Remover caracteres especiais
  if (opcoes.removeSpecial) {
    slug = slug.replace(/[^\w\s-]/g, '')
  }

  // Substituir espaços pelo separador
  slug = slug.trim().replace(/\s+/g, opcoes.separador)

  // Remover separadores duplicados
  const sepRegex = new RegExp(`${opcoes.separador}+`, 'g')
  slug = slug.replace(sepRegex, opcoes.separador)

  // Remover separadores do início e fim
  const cleanRegex = new RegExp(`^${opcoes.separador}+|${opcoes.separador}+$`, 'g')
  slug = slug.replace(cleanRegex, '')

  return slug
}

// URL Encode
const urlEncode = (texto) => {
  try {
    return encodeURIComponent(texto)
  } catch (e) {
    return texto
  }
}

// Converter
const converter = () => {
  if (!textoEntrada.value.trim()) {
    resultado.value = ''
    return
  }

  if (tipoConversao.value === 'slug') {
    resultado.value = converterParaSlug(textoEntrada.value)
  } else {
    resultado.value = urlEncode(textoEntrada.value)
  }
}

// Copiar
const copiar = async () => {
  try {
    await navigator.clipboard.writeText(resultado.value)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'URL copiada para a área de transferência',
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
  resultado.value = ''
  opcoes.lowercase = true
  opcoes.removeAccents = true
  opcoes.removeSpecial = true
  opcoes.separador = '-'
}
</script>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-hashtag text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Hash</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere hashes criptográficos para segurança e integridade</p>
      </div>

      <div class="space-y-6">
        <!-- Entrada de Texto -->
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <i class="fas fa-keyboard mr-2"></i>
            Texto para Hash
          </label>
          <textarea
            v-model="textoEntrada"
            @input="gerarHashes"
            rows="4"
            placeholder="Digite ou cole o texto aqui..."
            class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
          ></textarea>
          <div class="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {{ textoEntrada.length }} caracteres
          </div>
        </div>

        <!-- Opções -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2">
            <input
              type="checkbox"
              id="maiusculas"
              v-model="maiusculas"
              @change="gerarHashes"
              class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
            >
            <label for="maiusculas" class="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
              MAIÚSCULAS
            </label>
          </div>
        </div>

        <!-- Hashes Gerados -->
        <div v-if="textoEntrada" class="space-y-3">
          <div
            v-for="hash in hashesGerados"
            :key="hash.algoritmo"
            class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-gray-900 dark:text-white">{{ hash.algoritmo }}</span>
                <span class="text-xs text-gray-500 dark:text-gray-400">
                  {{ hash.tamanho }} bits
                </span>
              </div>
              <button
                @click="copiar(hash.valor, hash.algoritmo)"
                class="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors text-sm"
              >
                <i class="fas fa-copy mr-1"></i>
                Copiar
              </button>
            </div>
            <code class="block w-full p-3 bg-white dark:bg-gray-600 rounded text-sm text-purple-600 dark:text-purple-400 font-mono break-all">
              {{ hash.valor }}
            </code>
          </div>
        </div>

        <!-- Informações sobre Algoritmos -->
        <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
            <div class="text-sm text-purple-800 dark:text-purple-300">
              <p class="font-semibold mb-2">Sobre os Algoritmos:</p>
              <ul class="list-disc list-inside space-y-1">
                <li><strong>MD5:</strong> 128 bits - Rápido mas não recomendado para segurança (vulnerável)</li>
                <li><strong>SHA-1:</strong> 160 bits - Legado, não usar para novas aplicações</li>
                <li><strong>SHA-256:</strong> 256 bits - Padrão atual, seguro e amplamente usado</li>
                <li><strong>SHA-512:</strong> 512 bits - Mais seguro, ideal para senhas e dados sensíveis</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Casos de Uso -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-shield-halved text-purple-600 dark:text-purple-400"></i>
              <h3 class="font-semibold text-gray-900 dark:text-white">Segurança</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Use SHA-256 ou SHA-512 para hash de senhas, tokens de autenticação e dados sensíveis.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-file-zipper text-purple-600 dark:text-purple-400"></i>
              <h3 class="font-semibold text-gray-900 dark:text-white">Integridade</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Verifique a integridade de arquivos e dados com checksums usando qualquer algoritmo.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-database text-purple-600 dark:text-purple-400"></i>
              <h3 class="font-semibold text-gray-900 dark:text-white">Cache</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Gere chaves de cache únicas baseadas no conteúdo usando MD5 ou SHA-1.
            </p>
          </div>

          <div class="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4">
            <div class="flex items-center gap-2 mb-2">
              <i class="fas fa-fingerprint text-purple-600 dark:text-purple-400"></i>
              <h3 class="font-semibold text-gray-900 dark:text-white">Identificação</h3>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Crie identificadores únicos para dados sem revelar o conteúdo original.
            </p>
          </div>
        </div>

        <!-- Comparador de Hashes -->
        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-code-compare text-purple-600 dark:text-purple-400 mr-2"></i>
            Comparar Hashes
          </h3>
          
          <div class="space-y-3">
            <input
              v-model="hash1"
              type="text"
              placeholder="Cole o primeiro hash aqui"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white font-mono text-sm"
            />
            <input
              v-model="hash2"
              type="text"
              placeholder="Cole o segundo hash aqui"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-900 dark:text-white font-mono text-sm"
            />
            
            <div v-if="hash1 && hash2" class="p-4 rounded-lg" :class="hash1 === hash2 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'">
              <div class="flex items-center gap-2">
                <i :class="hash1 === hash2 ? 'fas fa-check-circle text-green-600' : 'fas fa-times-circle text-red-600'"></i>
                <span :class="hash1 === hash2 ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'" class="font-medium">
                  {{ hash1 === hash2 ? 'Hashes são idênticos!' : 'Hashes são diferentes!' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4">
          <BaseButton @click="copiarTodos" variant="primary" class="flex-1" :disabled="!textoEntrada">
            <i class="fas fa-copy mr-2"></i>
            Copiar Todos
          </BaseButton>
          <BaseButton @click="baixarTxt" variant="outline" :disabled="!textoEntrada">
            <i class="fas fa-download mr-2"></i>
            Baixar
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const textoEntrada = ref('')
const maiusculas = ref(false)
const hash1 = ref('')
const hash2 = ref('')

const hashesGerados = ref([])

// Função para gerar hash usando Web Crypto API
const gerarHash = async (algoritmo, texto) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(texto)
  const hashBuffer = await crypto.subtle.digest(algoritmo, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return maiusculas.value ? hashHex.toUpperCase() : hashHex
}

// Funções MD5 e SHA-1 (implementação simples usando SubtleCrypto)
const gerarHashes = async () => {
  if (!textoEntrada.value) {
    hashesGerados.value = []
    return
  }

  try {
    const hashes = []

    // SHA-1
    const sha1 = await gerarHash('SHA-1', textoEntrada.value)
    hashes.push({ algoritmo: 'SHA-1', valor: sha1, tamanho: 160 })

    // SHA-256
    const sha256 = await gerarHash('SHA-256', textoEntrada.value)
    hashes.push({ algoritmo: 'SHA-256', valor: sha256, tamanho: 256 })

    // SHA-384
    const sha384 = await gerarHash('SHA-384', textoEntrada.value)
    hashes.push({ algoritmo: 'SHA-384', valor: sha384, tamanho: 384 })

    // SHA-512
    const sha512 = await gerarHash('SHA-512', textoEntrada.value)
    hashes.push({ algoritmo: 'SHA-512', valor: sha512, tamanho: 512 })

    hashesGerados.value = hashes
    trackToolUsage('Gerador Hash', 'generate')
  } catch (error) {
    console.error('Erro ao gerar hashes:', error)
  }
}

const copiar = async (valor, algoritmo) => {
  try {
    await navigator.clipboard.writeText(valor)
    trackConversion('copy', algoritmo)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: `Hash ${algoritmo} copiado`,
      timer: 1000,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarTodos = async () => {
  const texto = hashesGerados.value.map(h => `${h.algoritmo}: ${h.valor}`).join('\n')
  try {
    await navigator.clipboard.writeText(texto)
    trackConversion('copy', 'all-hashes')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'Todos os hashes copiados',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const baixarTxt = () => {
  let conteudo = `HASHES GERADOS\n\n`
  conteudo += `Texto original: ${textoEntrada.value}\n\n`
  
  for (const hash of hashesGerados.value) {
    conteudo += `${hash.algoritmo} (${hash.tamanho} bits):\n${hash.valor}\n\n`
  }

  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `hashes-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)

  trackConversion('download', 'hashes')
  Swal.fire({
    icon: 'success',
    title: 'Download iniciado!',
    timer: 1500,
    showConfirmButton: false
  })
}

const limpar = () => {
  textoEntrada.value = ''
  hashesGerados.value = []
  hash1.value = ''
  hash2.value = ''
}
</script>

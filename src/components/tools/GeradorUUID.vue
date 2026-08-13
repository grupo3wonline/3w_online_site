<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
          <i class="fas fa-fingerprint text-purple-600 dark:text-purple-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de UUID</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere identificadores únicos universais (UUID/GUID)</p>
      </div>

      <div class="space-y-6">
        <!-- Versão do UUID -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="versao in versoes"
            :key="versao.id"
            @click="versaoSelecionada = versao.id"
            class="p-4 rounded-lg font-medium transition-all"
            :class="versaoSelecionada === versao.id 
              ? 'bg-purple-600 text-white shadow-lg' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <div class="text-lg font-bold mb-1">{{ versao.nome }}</div>
            <div class="text-xs">{{ versao.descricao }}</div>
          </button>
        </div>

        <!-- Quantidade -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="quantidade"
            label="Quantidade de UUIDs"
            type="number"
            :min="1"
            :max="100"
            icon="fa-solid fa-hashtag"
          />

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-text-width text-purple-600 dark:text-purple-400 mr-2"></i>
              Formato
            </label>
            <select 
              v-model="formato" 
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="hifen">Com hífen (padrão)</option>
              <option value="sem-hifen">Sem hífen</option>
              <option value="maiuscula">Maiúscula</option>
              <option value="chaves">Com chaves {}</option>
              <option value="urn">URN</option>
            </select>
          </div>
        </div>

        <!-- Botões -->
        <div class="flex gap-4">
          <BaseButton @click="gerar" variant="primary" class="flex-1">
            <i class="fas fa-rotate mr-2"></i>
            Gerar UUIDs
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- UUIDs Gerados -->
        <div v-if="uuids.length > 0" class="space-y-4">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ uuids.length }} UUID(s) gerado(s)
              </h3>
              <div class="flex gap-2">
                <button
                  @click="copiarTodos"
                  class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <i class="fas fa-copy mr-2"></i>
                  Copiar Todos
                </button>
                <button
                  @click="baixarTxt"
                  class="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm"
                >
                  <i class="fas fa-download mr-2"></i>
                  Baixar TXT
                </button>
              </div>
            </div>

            <div class="space-y-2 max-h-96 overflow-y-auto">
              <div
                v-for="(uuid, index) in uuids"
                :key="index"
                class="flex items-center justify-between bg-white dark:bg-gray-600 rounded-lg p-3 group"
              >
                <code class="text-sm text-purple-600 dark:text-purple-400 font-mono flex-1">
                  {{ uuid }}
                </code>
                <button
                  @click="copiar(uuid)"
                  class="ml-3 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Estatísticas -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ uuids.length }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Total Gerado</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ versaoSelecionada }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Versão</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ comprimentoUUID }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Caracteres</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-purple-600 dark:text-purple-400">128-bit</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Tamanho</div>
            </div>
          </div>

          <!-- Informações -->
          <div class="bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-purple-600 dark:text-purple-400 mt-1 mr-3"></i>
              <div class="text-sm text-purple-800 dark:text-purple-300">
                <p class="font-semibold mb-2">Sobre UUID versão {{ versaoSelecionada }}:</p>
                <p>{{ descricaoVersao }}</p>
              </div>
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
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const versoes = [
  { id: 'v4', nome: 'UUID v4', descricao: 'Aleatório' },
  { id: 'v1', nome: 'UUID v1', descricao: 'Timestamp' },
  { id: 'v3', nome: 'UUID v3', descricao: 'MD5 Hash' },
  { id: 'v5', nome: 'UUID v5', descricao: 'SHA-1 Hash' }
]

const versaoSelecionada = ref('v4')
const quantidade = ref(5)
const formato = ref('hifen')
const uuids = ref([])

const comprimentoUUID = computed(() => {
  if (uuids.value.length === 0) return 0
  return uuids.value[0].length
})

const descricaoVersao = computed(() => {
  const descricoes = {
    v1: 'Baseado em timestamp e endereço MAC. Útil quando você precisa de IDs ordenáveis cronologicamente.',
    v3: 'Baseado em hash MD5 de um namespace e nome. Determinístico - mesmo input gera mesmo UUID.',
    v4: 'Completamente aleatório. Mais usado e recomendado para a maioria dos casos. Alta entropia.',
    v5: 'Baseado em hash SHA-1 de um namespace e nome. Similar ao v3 mas mais seguro.'
  }
  return descricoes[versaoSelecionada.value] || ''
})

const gerarUUIDv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const gerarUUIDv1 = () => {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 0x3fff)
  const clockSeq = random.toString(16).padStart(4, '0')
  
  const timeLow = (timestamp & 0xffffffff).toString(16).padStart(8, '0')
  const timeMid = ((timestamp >> 32) & 0xffff).toString(16).padStart(4, '0')
  const timeHigh = (((timestamp >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0')
  
  const node = Array.from({ length: 12 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('')
  
  return `${timeLow}-${timeMid}-${timeHigh}-${clockSeq}-${node}`
}

const formatarUUID = (uuid) => {
  switch (formato.value) {
    case 'sem-hifen':
      return uuid.replace(/-/g, '')
    case 'maiuscula':
      return uuid.toUpperCase()
    case 'chaves':
      return `{${uuid}}`
    case 'urn':
      return `urn:uuid:${uuid}`
    default:
      return uuid
  }
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  
  if (qtd < 1 || qtd > 100) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Quantidade deve estar entre 1 e 100' })
    return
  }

  const novosUUIDs = []
  for (let i = 0; i < qtd; i++) {
    let uuid
    if (versaoSelecionada.value === 'v1') {
      uuid = gerarUUIDv1()
    } else {
      uuid = gerarUUIDv4()
    }
    novosUUIDs.push(formatarUUID(uuid))
  }

  uuids.value = novosUUIDs
  trackToolUsage('Gerador UUID', 'generate')
}

const copiar = async (uuid) => {
  try {
    await navigator.clipboard.writeText(uuid)
    trackConversion('copy', 'uuid')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'UUID copiado para a área de transferência',
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const copiarTodos = async () => {
  try {
    await navigator.clipboard.writeText(uuids.value.join('\n'))
    trackConversion('copy', 'uuid-all')
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: `${uuids.value.length} UUIDs copiados`,
      timer: 1500,
      showConfirmButton: false
    })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const baixarTxt = () => {
  const blob = new Blob([uuids.value.join('\n')], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `uuids-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)
  
  trackConversion('download', 'uuid')
  Swal.fire({
    icon: 'success',
    title: 'Download iniciado!',
    timer: 1500,
    showConfirmButton: false
  })
}

const limpar = () => {
  uuids.value = []
  quantidade.value = 5
}
</script>

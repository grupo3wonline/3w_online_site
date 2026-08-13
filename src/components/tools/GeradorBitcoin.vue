<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full mb-4">
          <i class="fab fa-bitcoin text-amber-600 dark:text-amber-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Endereço Bitcoin</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere endereços Bitcoin fictícios para testes</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tipo de Endereço</label>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button @click="tipoEndereco = 'p2pkh'" class="p-4 rounded-lg border-2 transition-all" :class="tipoEndereco === 'p2pkh' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">P2PKH (Legacy)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Começa com 1</div>
            </button>
            <button @click="tipoEndereco = 'p2sh'" class="p-4 rounded-lg border-2 transition-all" :class="tipoEndereco === 'p2sh' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">P2SH</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Começa com 3</div>
            </button>
            <button @click="tipoEndereco = 'bech32'" class="p-4 rounded-lg border-2 transition-all" :class="tipoEndereco === 'bech32' ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' : 'border-gray-300 dark:border-gray-600'">
              <div class="font-bold text-gray-900 dark:text-white">Bech32 (SegWit)</div>
              <div class="text-xs text-gray-600 dark:text-gray-400 mt-1">Começa com bc1</div>
            </button>
          </div>
        </div>

        <BaseInput v-model="quantidade" label="Quantidade de Endereços" type="number" :min="1" :max="50" icon="fa-solid fa-hashtag" />

        <BaseButton @click="gerar" variant="primary" class="w-full">
          <i class="fab fa-bitcoin mr-2"></i>
          Gerar Endereços Bitcoin
        </BaseButton>

        <div v-if="enderecos.length" class="space-y-4">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-bold text-gray-900 dark:text-white">{{ enderecos.length }} Endereços Gerados</h3>
            <BaseButton @click="baixarTXT" variant="secondary" size="sm">
              <i class="fas fa-download mr-2"></i>
              Baixar TXT
            </BaseButton>
          </div>

          <div v-for="(item, index) in enderecos" :key="index" class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
            <div class="flex justify-between items-start mb-4">
              <div class="flex-1">
                <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Endereço {{ index + 1 }}</div>
                <div class="font-mono text-sm font-semibold text-gray-900 dark:text-white break-all">{{ item.endereco }}</div>
              </div>
              <button @click="copiar(item.endereco)" class="ml-4 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm transition-colors shrink-0">
                <i class="fas fa-copy"></i>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div class="flex items-center">
                <i class="fas fa-tag text-amber-600 dark:text-amber-400 w-4 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-400">Tipo:</span>
                <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{ item.tipo }}</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-ruler text-amber-600 dark:text-amber-400 w-4 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-400">Tamanho:</span>
                <span class="ml-2 font-semibold text-gray-900 dark:text-white">{{ item.endereco.length }} chars</span>
              </div>
              <div class="flex items-center">
                <i class="fas fa-network-wired text-amber-600 dark:text-amber-400 w-4 mr-2"></i>
                <span class="text-gray-600 dark:text-gray-400">Network:</span>
                <span class="ml-2 font-semibold text-gray-900 dark:text-white">Mainnet</span>
              </div>
            </div>

            <div v-if="item.chavePrivada" class="mt-4 pt-4 border-t border-amber-200 dark:border-amber-800">
              <div class="text-xs text-gray-600 dark:text-gray-400 mb-1">Chave Privada (Fictícia)</div>
              <div class="font-mono text-xs text-gray-700 dark:text-gray-300 break-all">{{ item.chavePrivada }}</div>
            </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4">
            <div class="flex">
              <i class="fas fa-exclamation-triangle text-red-600 dark:text-red-400 mt-1 mr-3"></i>
              <div class="text-sm text-red-800 dark:text-red-300">
                <p class="font-semibold mb-2">⚠️ AVISO IMPORTANTE:</p>
                <ul class="list-disc list-inside space-y-1 text-xs">
                  <li>Estes endereços são <strong>FICTÍCIOS</strong> e gerados apenas para TESTES</li>
                  <li>NÃO envie Bitcoin real para estes endereços</li>
                  <li>NÃO use para transações reais ou aplicações em produção</li>
                  <li>Destinado exclusivamente para desenvolvimento e homologação</li>
                  <li>Chaves privadas são aleatórias e não controlam fundos reais</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage, trackConversion } = useAnalytics()

const tipoEndereco = ref('p2pkh')
const quantidade = ref(5)
const enderecos = ref([])

const caracteres = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
const caracteresHex = '0123456789abcdef'

const gerarStringAleatoria = (tamanho, chars) => {
  let resultado = ''
  for (let i = 0; i < tamanho; i++) {
    resultado += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return resultado
}

const gerarEnderecoP2PKH = () => {
  return '1' + gerarStringAleatoria(33, caracteres)
}

const gerarEnderecoP2SH = () => {
  return '3' + gerarStringAleatoria(33, caracteres)
}

const gerarEnderecoBech32 = () => {
  const tamanho = 39 + Math.floor(Math.random() * 3)
  return 'bc1q' + gerarStringAleatoria(tamanho, caracteres.toLowerCase())
}

const gerarChavePrivada = () => {
  return gerarStringAleatoria(64, caracteresHex)
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  enderecos.value = []
  
  let tipoNome = ''
  
  for (let i = 0; i < qtd; i++) {
    let endereco = ''
    
    if (tipoEndereco.value === 'p2pkh') {
      endereco = gerarEnderecoP2PKH()
      tipoNome = 'P2PKH (Legacy)'
    } else if (tipoEndereco.value === 'p2sh') {
      endereco = gerarEnderecoP2SH()
      tipoNome = 'P2SH'
    } else {
      endereco = gerarEnderecoBech32()
      tipoNome = 'Bech32 (SegWit)'
    }
    
    enderecos.value.push({
      endereco,
      tipo: tipoNome,
      chavePrivada: gerarChavePrivada()
    })
  }

  trackToolUsage('Gerador Bitcoin', 'generate', { tipo: tipoEndereco.value, quantidade: qtd })
  trackConversion('Gerador Bitcoin', 'generation_complete')
}

const copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    Swal.fire({
      title: 'Copiado!',
      text: 'Endereço copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const baixarTXT = () => {
  let conteudo = 'ENDEREÇOS BITCOIN FICTÍCIOS PARA TESTE\n'
  conteudo += '=======================================\n\n'
  
  enderecos.value.forEach((item, index) => {
    conteudo += `ENDEREÇO ${index + 1}\n`
    conteudo += `Tipo: ${item.tipo}\n`
    conteudo += `Endereço: ${item.endereco}\n`
    conteudo += `Chave Privada: ${item.chavePrivada}\n`
    conteudo += '\n---\n\n'
  })
  
  conteudo += '\n⚠️ AVISO: Estes endereços são FICTÍCIOS e gerados apenas para TESTES.\n'
  conteudo += 'NÃO envie Bitcoin real para estes endereços!\n'
  
  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'enderecos-bitcoin-teste.txt'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

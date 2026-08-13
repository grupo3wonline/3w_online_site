<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-rose-100 dark:bg-rose-900/30 rounded-full mb-4">
          <i class="fas fa-credit-card text-rose-600 dark:text-rose-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Cartão de Crédito</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere números de cartão válidos para teste</p>
      </div>

      <div class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Bandeira</label>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <button v-for="bandeira in bandeiras" :key="bandeira.id" @click="bandeiraSelecionada = bandeira.id; gerar()" class="p-4 rounded-lg border-2 transition-all" :class="bandeiraSelecionada === bandeira.id ? 'border-rose-600 bg-rose-50 dark:bg-rose-900/30' : 'border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700'">
              <div class="text-center">
                <i :class="[bandeira.icon, 'text-2xl mb-2', bandeiraSelecionada === bandeira.id ? 'text-rose-600' : 'text-gray-400']"></i>
                <div class="text-sm font-medium">{{ bandeira.nome }}</div>
              </div>
            </button>
          </div>
        </div>

        <BaseInput v-model="quantidade" label="Quantidade" type="number" :min="1" :max="20" icon="fa-solid fa-hashtag" />

        <BaseButton @click="gerar" variant="primary" class="w-full">
          <i class="fas fa-magic mr-2"></i>
          Gerar Cartões
        </BaseButton>

        <div v-if="cartoes.length > 0" class="space-y-4">
          <div class="bg-rose-50 dark:bg-rose-900/20 border-l-4 border-rose-500 p-4 mb-4">
            <div class="flex">
              <i class="fas fa-exclamation-triangle text-rose-600 dark:text-rose-400 mt-1 mr-3"></i>
              <div class="text-sm text-rose-800 dark:text-rose-300">
                <p class="font-semibold mb-1">⚠️ AVISO IMPORTANTE:</p>
                <p>Estes números são válidos APENAS para testes em ambientes de desenvolvimento. NÃO use em produção ou para fraudes (crime previsto em lei).</p>
              </div>
            </div>
          </div>

          <div class="space-y-3">
            <div v-for="(cartao, index) in cartoes" :key="index" class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white shadow-lg">
              <div class="flex items-center justify-between mb-4">
                <i :class="getBandeiraAtual().icon" class="text-3xl text-white"></i>
                <button @click="copiar(cartao.numero)" class="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg transition-colors text-sm">
                  <i class="fas fa-copy mr-1"></i>Copiar
                </button>
              </div>
              
              <div class="space-y-3">
                <div>
                  <div class="text-xs text-gray-400 mb-1">Número do Cartão</div>
                  <div class="text-2xl font-mono tracking-wider">{{ cartao.numeroFormatado }}</div>
                </div>
                
                <div class="grid grid-cols-3 gap-4">
                  <div>
                    <div class="text-xs text-gray-400 mb-1">Validade</div>
                    <div class="text-lg font-mono">{{ cartao.validade }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-400 mb-1">CVV</div>
                    <div class="text-lg font-mono">{{ cartao.cvv }}</div>
                  </div>
                  <div>
                    <div class="text-xs text-gray-400 mb-1">Bandeira</div>
                    <div class="text-sm">{{ getBandeiraAtual().nome }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <BaseButton @click="baixarTxt" variant="outline" class="w-full">
            <i class="fas fa-download mr-2"></i>
            Baixar Todos
          </BaseButton>
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

const bandeiras = [
  { id: 'visa', nome: 'Visa', icon: 'fab fa-cc-visa', prefixo: '4' },
  { id: 'mastercard', nome: 'Mastercard', icon: 'fab fa-cc-mastercard', prefixo: '5' },
  { id: 'amex', nome: 'Amex', icon: 'fab fa-cc-amex', prefixo: '37' },
  { id: 'elo', nome: 'Elo', icon: 'fas fa-credit-card', prefixo: '636368' }
]

const bandeiraSelecionada = ref('visa')
const quantidade = ref(5)
const cartoes = ref([])

const getBandeiraAtual = () => bandeiras.find(b => b.id === bandeiraSelecionada.value)

const luhn = (numero) => {
  let soma = 0
  let dobrar = false
  
  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = Number.parseInt(numero[i], 10)
    
    if (dobrar) {
      digito *= 2
      if (digito > 9) digito -= 9
    }
    
    soma += digito
    dobrar = !dobrar
  }
  
  return (10 - (soma % 10)) % 10
}

const gerarNumero = () => {
  const bandeira = getBandeiraAtual()
  let numero = bandeira.prefixo
  
  const tamanho = bandeira.id === 'amex' ? 15 : 16
  const faltam = tamanho - numero.length - 1
  
  for (let i = 0; i < faltam; i++) {
    numero += Math.floor(Math.random() * 10)
  }
  
  numero += luhn(numero)
  return numero
}

const formatarNumero = (numero) => {
  if (numero.length === 15) {
    return numero.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
  }
  return numero.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
}

const gerar = () => {
  cartoes.value = []
  const qtd = Number(quantidade.value)
  
  for (let i = 0; i < qtd; i++) {
    const numero = gerarNumero()
    const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    const ano = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2)
    const cvv = String(Math.floor(Math.random() * 900) + 100)
    
    cartoes.value.push({
      numero,
      numeroFormatado: formatarNumero(numero),
      validade: `${mes}/${ano}`,
      cvv
    })
  }
  
  trackToolUsage('Gerador Cartão', 'generate')
}

const copiar = async (numero) => {
  try {
    await navigator.clipboard.writeText(numero)
    trackConversion('copy', 'card')
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch (error) {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const baixarTxt = () => {
  let conteudo = `CARTÕES DE CRÉDITO - ${getBandeiraAtual().nome.toUpperCase()}\n\n`
  conteudo += 'ATENÇÃO: USE APENAS PARA TESTES!\n\n'
  
  for (const cartao of cartoes.value) {
    conteudo += `Número: ${cartao.numeroFormatado}\n`
    conteudo += `Validade: ${cartao.validade}\n`
    conteudo += `CVV: ${cartao.cvv}\n\n`
  }

  const blob = new Blob([conteudo], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `cartoes-${bandeiraSelecionada.value}-${Date.now()}.txt`
  link.click()
  URL.revokeObjectURL(url)

  trackConversion('download', 'cards')
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
}

gerar()
</script>

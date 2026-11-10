<template>
  <ToolShell
    title="Gerador de Cartão de Crédito"
    description="Gere números de cartão de crédito válidos pelo algoritmo de Luhn para testes de formulários e integração de pagamentos."
    icon="fa-credit-card"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['4 bandeiras', 'Algoritmo Luhn', 'Apenas para testes']"
    :tips="[
      { title: 'Algoritmo de Luhn', text: 'O algoritmo de Luhn é usado para validar números de cartão. Os números gerados passam na validação, mas não correspondem a cartões reais.' },
      { title: 'CVV e Validade', text: 'O CVV e a data de validade são gerados aleatoriamente e não correspondem a nenhum cartão bancário real.', type: 'info' },
      { title: '⚠️ Uso legal apenas', text: 'Use exclusivamente para testes de desenvolvimento. Fraude com cartões é crime previsto em lei.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Visa de teste', desc: 'Bandeira: Visa, Quantidade: 1', result: '4xxx xxxx xxxx xxxx (formato Visa)' },
      { title: 'Mastercard', desc: 'Bandeira: Mastercard, Quantidade: 5', result: '5xxx xxxx xxxx xxxx' },
      { title: 'Amex', desc: 'Bandeira: American Express, Quantidade: 1', result: '37xx xxxxxx xxxxx (15 dígitos)' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Bandeiras -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-credit-card mr-1.5 text-blue-500"></i>
              Bandeira
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="b in bandeiras"
                :key="b.id"
                @click="bandeiraSelecionada = b.id; gerar()"
                :class="[
                  'p-3 rounded-xl border-2 transition-all text-center',
                  bandeiraSelecionada === b.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-blue-300'
                ]"
              >
                <i :class="[b.icon, 'text-2xl mb-1 block', bandeiraSelecionada === b.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400']"></i>
                <span class="text-xs font-semibold text-gray-700 dark:text-slate-200">{{ b.nome }}</span>
              </button>
            </div>
          </div>

          <BaseInput
            v-model="quantidade"
            label="Quantidade de cartões"
            type="number"
            :min="1"
            :max="20"
            icon="fa-hashtag"
            hint="Máximo: 20 cartões por geração"
            tooltip="Quantos cartões de teste você quer gerar."
          />

          <BaseButton variant="primary" icon="fa-magic" @click="gerar" class="w-full">
            Gerar Cartões
          </BaseButton>
        </div>

        <!-- Aviso -->
        <div class="tip-card-warning">
          <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
          <div class="text-xs">
            <strong class="block mb-1">⚠️ Apenas para ambiente de desenvolvimento</strong>
            NÃO use estes dados em transações reais. Fraude é crime previsto em lei.
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in">
          <div v-if="cartoes.length > 0" class="space-y-4">
            <!-- Cabeçalho -->
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Cartões gerados</p>
              <p class="text-5xl font-black text-white mb-1">{{ cartoes.length }}</p>
              <p class="text-blue-300 text-sm font-semibold">{{ getBandeiraAtual().nome }}</p>
            </div>

            <!-- Ação baixar -->
            <BaseButton variant="outline" icon="fa-download" @click="baixarTxt" class="w-full">
              Baixar TXT
            </BaseButton>

            <!-- Cartões -->
            <div class="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              <div
                v-for="(cartao, index) in cartoes"
                :key="index"
                class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 text-white shadow-lg ring-1 ring-white/10"
              >
                <div class="flex items-center justify-between mb-4">
                  <i :class="[getBandeiraAtual().icon, 'text-3xl text-white']"></i>
                  <button @click="copiar(cartao.numero)" class="px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-sm transition-colors">
                    <i class="fas fa-copy mr-1 text-xs"></i>Copiar
                  </button>
                </div>
                <div class="text-xs text-gray-400 mb-1">Número do Cartão</div>
                <div class="text-xl font-mono tracking-widest mb-4">{{ cartao.numeroFormatado }}</div>
                <div class="grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <div class="text-gray-400 mb-0.5">Validade</div>
                    <div class="font-mono font-bold">{{ cartao.validade }}</div>
                  </div>
                  <div>
                    <div class="text-gray-400 mb-0.5">CVV</div>
                    <div class="font-mono font-bold">{{ cartao.cvv }}</div>
                  </div>
                  <div>
                    <div class="text-gray-400 mb-0.5">Bandeira</div>
                    <div class="font-bold">{{ getBandeiraAtual().nome }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!cartoes.length" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-credit-card text-3xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Selecione uma bandeira e clique em <strong>Gerar Cartões</strong></p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const bandeiras = [
  { id: 'visa',       nome: 'Visa',       icon: 'fab fa-cc-visa',       prefixo: '4',      tam: 16 },
  { id: 'mastercard', nome: 'Mastercard', icon: 'fab fa-cc-mastercard', prefixo: '5',      tam: 16 },
  { id: 'amex',       nome: 'Amex',       icon: 'fab fa-cc-amex',       prefixo: '37',     tam: 15 },
  { id: 'elo',        nome: 'Elo',        icon: 'fas fa-credit-card',   prefixo: '636368', tam: 16 },
]

const bandeiraSelecionada = ref('visa')
const quantidade          = ref(3)
const cartoes             = ref([])

const getBandeiraAtual = () => bandeiras.find(b => b.id === bandeiraSelecionada.value) || bandeiras[0]

const luhn = (num) => {
  let soma = 0; let dobrar = false
  for (let i = num.length - 1; i >= 0; i--) {
    let d = parseInt(num[i], 10)
    if (dobrar) { d *= 2; if (d > 9) d -= 9 }
    soma += d; dobrar = !dobrar
  }
  return (10 - (soma % 10)) % 10
}

const gerarNumero = () => {
  const b = getBandeiraAtual()
  let num = b.prefixo
  const faltam = b.tam - num.length - 1
  for (let i = 0; i < faltam; i++) num += Math.floor(Math.random() * 10)
  num += luhn(num)
  return num
}

const formatarNumero = (num) => {
  if (num.length === 15) return num.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3')
  return num.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4')
}

const gerar = () => {
  const qtd = Number(quantidade.value)
  cartoes.value = Array.from({ length: qtd }, () => {
    const numero = gerarNumero()
    const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
    const ano = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2)
    const cvv = String(Math.floor(Math.random() * 900) + 100)
    return { numero, numeroFormatado: formatarNumero(numero), validade: `${mes}/${ano}`, cvv }
  })
}

const copiar = async (num) => {
  try {
    await navigator.clipboard.writeText(num)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

const baixarTxt = () => {
  let c = `CARTÕES DE CRÉDITO - ${getBandeiraAtual().nome.toUpperCase()}\n\nATENÇÃO: USE APENAS PARA TESTES!\n\n`
  for (const cartao of cartoes.value) {
    c += `Número: ${cartao.numeroFormatado}\nValidade: ${cartao.validade}\nCVV: ${cartao.cvv}\n\n`
  }
  const blob = new Blob([c], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url; link.download = `cartoes-${bandeiraSelecionada.value}-${Date.now()}.txt`; link.click()
  URL.revokeObjectURL(url)
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
}

gerar()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

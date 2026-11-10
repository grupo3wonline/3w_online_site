<template>
  <ToolShell
    title="Validador de Cartão de Crédito"
    description="Valide números de cartão pelo algoritmo de Luhn e detecte a bandeira automaticamente."
    icon="fa-credit-card"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Algoritmo de Luhn', 'Detecta bandeira auto', 'Apenas estrutura verificada']"
    :tips="[
      { title: 'O que é o algoritmo de Luhn', text: 'O algoritmo de Luhn verifica o dígito verificador do cartão, detectando erros de digitação. Não confirma se o cartão existe ou tem saldo.', type: 'info' },
      { title: 'Bandeiras suportadas', text: 'Visa, Mastercard, American Express, Discover, JCB e Elo. A detecção é feita pelos primeiros dígitos do número do cartão.' },
      { title: 'Privacidade', text: 'Nenhum dado é enviado para servidores. Toda validação ocorre localmente no seu navegador, sem transmissão de informações.', type: 'success' },
    ]"
    :examples="[
      { title: 'Visa (teste)', desc: '4532 0151 0902 6996 — número fictício', result: 'Válido pela Luhn — Bandeira: Visa' },
      { title: 'Mastercard (teste)', desc: '5425 2334 3010 9903 — número fictício', result: 'Válido pela Luhn — Bandeira: Mastercard' },
      { title: 'Número inválido', desc: '1234 5678 9012 3456 — estrutura errada', result: 'Inválido — falha no dígito verificador' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-3">
            <BaseInput
              v-model="cartao"
              label="Número do Cartão"
              type="text"
              icon="fa-credit-card"
              placeholder="0000 0000 0000 0000"
              tooltip="Digite o número do cartão para validação. Os espaços são adicionados automaticamente."
              @input="validar"
            />

            <!-- Visual do cartão -->
            <div class="relative h-36 rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-5 overflow-hidden border border-slate-600">
              <!-- Chip -->
              <div class="absolute top-5 left-5 w-10 h-7 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-md opacity-90"></div>
              <!-- Número -->
              <div class="absolute bottom-8 left-5 right-5 font-mono text-lg font-bold text-white/90 tracking-widest">
                {{ cartaoFormatado || '•••• •••• •••• ••••' }}
              </div>
              <!-- Bandeira -->
              <div v-if="bandeira" class="absolute top-5 right-5">
                <span :class="['text-sm font-black px-2 py-1 rounded-lg', getBandeiraStyle()]">{{ bandeira }}</span>
              </div>
              <!-- Orbs decorativos -->
              <div class="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/5"></div>
              <div class="absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-white/5"></div>
            </div>
          </div>

          <div class="mt-4">
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar" class="w-full">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Bandeiras -->
        <div class="glass-panel p-4">
          <p class="text-xs font-semibold text-gray-600 dark:text-slate-300 mb-3">Bandeiras suportadas</p>
          <div class="flex flex-wrap gap-2">
            <span v-for="b in bandeirasInfo" :key="b.nome" :class="['stat-pill text-xs', bandeira === b.nome ? 'ring-2 ring-blue-400' : '']">
              <i :class="['fas', b.icon, 'text-xs']"></i>
              {{ b.nome }}
            </span>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">
            <!-- Destaque principal -->
            <div :class="['tool-header text-center py-7', valido ? '' : 'bg-gradient-to-br from-red-600 via-red-700 to-rose-800']">
              <div class="mb-3">
                <i :class="['fas text-5xl mb-2 block', valido ? 'fa-check-circle text-emerald-400' : 'fa-times-circle text-red-300']"></i>
              </div>
              <p class="text-2xl font-black text-white mb-1">{{ valido ? 'Cartão Válido' : 'Cartão Inválido' }}</p>
              <p :class="['text-sm font-semibold', valido ? 'text-emerald-300' : 'text-red-300']">
                {{ valido ? `Luhn verificado — ${bandeira}` : 'Falha no dígito verificador' }}
              </p>
            </div>

            <!-- Detalhes (cartão válido) -->
            <div v-if="valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-blue-500"></i>
                Informações do Cartão
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Número formatado</span>
                  <span class="font-mono font-bold">{{ cartaoFormatado }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Bandeira</span>
                  <span :class="['font-bold', getBandeiraTextColor()]">{{ bandeira }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Dígitos</span>
                  <span class="font-bold">{{ cartao.replace(/\D/g, '').length }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Validação Luhn</span>
                  <span class="font-bold text-emerald-600 dark:text-emerald-400">
                    <i class="fas fa-check-circle mr-1"></i>Passou
                  </span>
                </div>
              </div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-info-circle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                O algoritmo de Luhn verifica apenas a estrutura matemática. Não confirma se o cartão existe, está ativo ou tem saldo disponível.
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-credit-card text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Digite um número de cartão para validar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const cartao    = ref('')
const resultado = ref(false)
const valido    = ref(false)
const bandeira  = ref('')

const bandeirasInfo = [
  { nome: 'Visa',              icon: 'fa-cc-visa' },
  { nome: 'Mastercard',        icon: 'fa-cc-mastercard' },
  { nome: 'American Express',  icon: 'fa-cc-amex' },
  { nome: 'Discover',          icon: 'fa-cc-discover' },
  { nome: 'JCB',               icon: 'fa-credit-card' },
  { nome: 'Elo',               icon: 'fa-credit-card' },
]

const cartaoFormatado = computed(() => {
  const nums = cartao.value.replace(/\D/g, '')
  return nums.match(/.{1,4}/g)?.join(' ') || nums
})

function validarLuhn(numero: string): boolean {
  let soma = 0, dobrar = false
  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = parseInt(numero[i])
    if (dobrar) { digito *= 2; if (digito > 9) digito -= 9 }
    soma += digito; dobrar = !dobrar
  }
  return soma % 10 === 0
}

function detectarBandeira(numero: string): string {
  if (/^4/.test(numero))                     return 'Visa'
  if (/^5[1-5]/.test(numero))               return 'Mastercard'
  if (/^2[2-7]/.test(numero))               return 'Mastercard'
  if (/^3[47]/.test(numero))                return 'American Express'
  if (/^6(?:011|5)/.test(numero))           return 'Discover'
  if (/^35/.test(numero))                   return 'JCB'
  if (/^(4011|438935|45|45163|4576)/.test(numero)) return 'Elo'
  return 'Desconhecida'
}

function getBandeiraStyle(): string {
  const m: Record<string, string> = {
    'Visa':             'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    'Mastercard':       'bg-orange-100 dark:bg-orange-900/40 text-orange-700 dark:text-orange-300',
    'American Express': 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300',
    'Discover':         'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300',
    'JCB':              'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    'Elo':              'bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300',
  }
  return m[bandeira.value] || 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200'
}

function getBandeiraTextColor(): string {
  const m: Record<string, string> = {
    'Visa':             'text-blue-600 dark:text-blue-400',
    'Mastercard':       'text-orange-600 dark:text-orange-400',
    'American Express': 'text-green-600 dark:text-green-400',
    'Discover':         'text-purple-600 dark:text-purple-400',
    'JCB':              'text-red-600 dark:text-red-400',
    'Elo':              'text-teal-600 dark:text-teal-400',
  }
  return m[bandeira.value] || 'text-gray-600'
}

function validar() {
  if (!cartao.value) { resultado.value = false; return }
  const nums = cartao.value.replace(/\D/g, '')
  if (nums.length < 13 || nums.length > 19) {
    resultado.value = true; valido.value = false; return
  }
  const isValid = validarLuhn(nums)
  resultado.value = true; valido.value = isValid
  bandeira.value = isValid ? detectarBandeira(nums) : ''
}

function limpar() {
  cartao.value = ''; resultado.value = false; valido.value = false; bandeira.value = ''
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

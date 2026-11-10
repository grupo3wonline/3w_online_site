<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const pixKey = ref('')
const result = ref<{ valid: boolean; type: string; msg: string } | null>(null)

const pixTypes = [
  { label: 'CPF', icon: 'mdi:card-account-details-outline', example: '000.000.000-00' },
  { label: 'CNPJ', icon: 'mdi:domain', example: '00.000.000/0001-00' },
  { label: 'Telefone', icon: 'mdi:phone-outline', example: '+5511999999999' },
  { label: 'E-mail', icon: 'mdi:email-outline', example: 'nome@email.com' },
  { label: 'Chave aleatória', icon: 'mdi:key-variant', example: '123e4567-e89b-12d3-a456-426614174000' },
]

function cleanCPF(s: string) { return s.replace(/\D/g, '') }
function cleanCNPJ(s: string) { return s.replace(/\D/g, '') }

function validateCPF(cpf: string): boolean {
  const d = cleanCPF(cpf)
  if (d.length !== 11 || /^(\d)\1+$/.test(d)) return false
  let sum = 0
  for (let i = 0; i < 9; i++) sum += parseInt(d[i]) * (10 - i)
  let r = (sum * 10) % 11; if (r === 10 || r === 11) r = 0
  if (r !== parseInt(d[9])) return false
  sum = 0
  for (let i = 0; i < 10; i++) sum += parseInt(d[i]) * (11 - i)
  r = (sum * 10) % 11; if (r === 10 || r === 11) r = 0
  return r === parseInt(d[10])
}

function validateCNPJ(cnpj: string): boolean {
  const d = cleanCNPJ(cnpj)
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false
  const calc = (n: string, weights: number[]) =>
    weights.reduce((s, w, i) => s + parseInt(n[i]) * w, 0)
  const r1 = calc(d, [5,4,3,2,9,8,7,6,5,4,3,2])
  const d1 = r1 % 11 < 2 ? 0 : 11 - (r1 % 11)
  if (d1 !== parseInt(d[12])) return false
  const r2 = calc(d, [6,5,4,3,2,9,8,7,6,5,4,3,2])
  const d2 = r2 % 11 < 2 ? 0 : 11 - (r2 % 11)
  return d2 === parseInt(d[13])
}

function validatePhone(phone: string): boolean {
  return /^\+55\d{10,11}$/.test(phone.replace(/\s|-/g, ''))
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validateUUID(uuid: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)
}

function validate() {
  const key = pixKey.value.trim()
  if (!key) { result.value = null; return }

  if (validateCPF(key) || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(key)) {
    const valid = validateCPF(key)
    result.value = { valid, type: 'CPF', msg: valid ? 'CPF válido como chave PIX' : 'CPF inválido — verifique os dígitos verificadores' }
    return
  }
  if (validateCNPJ(key) || /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(key)) {
    const valid = validateCNPJ(key)
    result.value = { valid, type: 'CNPJ', msg: valid ? 'CNPJ válido como chave PIX' : 'CNPJ inválido — verifique os dígitos verificadores' }
    return
  }
  if (key.startsWith('+55') || /^\+\d{11,13}$/.test(key)) {
    const valid = validatePhone(key)
    result.value = { valid, type: 'Telefone', msg: valid ? 'Telefone válido como chave PIX' : 'Telefone inválido — use o formato +55DDDNÚMERO' }
    return
  }
  if (key.includes('@')) {
    const valid = validateEmail(key)
    result.value = { valid, type: 'E-mail', msg: valid ? 'E-mail válido como chave PIX' : 'E-mail inválido — verifique o formato' }
    return
  }
  if (validateUUID(key)) {
    result.value = { valid: true, type: 'Chave aleatória (UUID)', msg: 'Chave aleatória PIX com formato UUID válido' }
    return
  }
  result.value = { valid: false, type: 'Desconhecido', msg: 'Formato de chave PIX não reconhecido. Verifique o tipo e tente novamente.' }
}
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:qrcode-scan" class="text-emerald-400 w-7 h-7" />
        Consulta de Chave PIX
      </h1>
      <p class="text-blue-300/70 text-sm">Validação de chaves PIX no lado do cliente</p>
    </div>

    <div class="max-w-xl mx-auto space-y-4">
      <!-- Types Reference -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <h2 class="text-sm font-semibold text-blue-200 mb-3">Tipos de chave PIX aceitos:</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div v-for="t in pixTypes" :key="t.label"
            class="bg-[#0a1628] border border-white/10 rounded-lg p-3">
            <div class="flex items-center gap-2 mb-1">
              <Icon :icon="t.icon" class="w-4 h-4 text-emerald-400" />
              <span class="text-xs font-semibold text-white">{{ t.label }}</span>
            </div>
            <div class="text-xs text-blue-300/60 font-mono">{{ t.example }}</div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-5 space-y-3">
        <label class="text-blue-200 text-sm font-medium">Digite a chave PIX para validar</label>
        <input
          v-model="pixKey"
          @input="validate"
          placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória..."
          class="w-full bg-[#0a1628] border border-white/20 text-white rounded-lg px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none placeholder-blue-300/30"
        />
        <button @click="validate"
          class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2 transition-colors text-sm">
          <Icon icon="mdi:check-circle-outline" class="w-4 h-4" />
          Validar Chave
        </button>
      </div>

      <!-- Result -->
      <div v-if="result"
        :class="result.valid ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-red-500/40 bg-red-500/5'"
        class="bg-[#111d3a] border rounded-xl p-5 flex items-start gap-3"
      >
        <Icon
          :icon="result.valid ? 'mdi:check-circle' : 'mdi:close-circle'"
          :class="result.valid ? 'text-emerald-400' : 'text-red-400'"
          class="w-6 h-6 flex-shrink-0 mt-0.5"
        />
        <div>
          <div class="font-semibold text-sm" :class="result.valid ? 'text-emerald-300' : 'text-red-300'">
            {{ result.valid ? '✓ Chave válida' : '✗ Chave inválida' }}
          </div>
          <div class="text-xs text-blue-300/70 mt-1">Tipo identificado: <span class="text-blue-200">{{ result.type }}</span></div>
          <div class="text-xs text-blue-300 mt-1">{{ result.msg }}</div>
        </div>
      </div>

      <!-- Note -->
      <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 text-xs text-blue-300">
        <Icon icon="mdi:information-outline" class="w-4 h-4 flex-shrink-0 mt-0.5 text-blue-400" />
        <p>Esta ferramenta realiza validação de formato no navegador. Para consultar o nome do titular da chave, acesse o aplicativo do seu banco.</p>
      </div>
    </div>
  </div>
</template>

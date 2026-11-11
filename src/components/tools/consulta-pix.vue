<script setup lang="ts">
import { ref } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const pixKey = ref('')
const result = ref<{ valid: boolean; type: string; msg: string } | null>(null)

const pixTypes = [
  { label: 'CPF',           example: '000.000.000-00',                  icon: 'fa-id-card'  },
  { label: 'CNPJ',          example: '00.000.000/0001-00',              icon: 'fa-building'  },
  { label: 'Telefone',      example: '+5511999999999',                  icon: 'fa-phone'     },
  { label: 'E-mail',        example: 'nome@email.com',                  icon: 'fa-envelope'  },
  { label: 'Chave aleatória',example: '123e4567-e89b-…',               icon: 'fa-key'       },
]

function cleanNum(s: string) { return s.replace(/\D/g, '') }

function validateCPF(cpf: string): boolean {
  const d = cleanNum(cpf)
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
  const d = cleanNum(cnpj)
  if (d.length !== 14 || /^(\d)\1+$/.test(d)) return false
  const calc = (n: string, ws: number[]) => ws.reduce((s, w, i) => s + parseInt(n[i]) * w, 0)
  const r1 = calc(d, [5,4,3,2,9,8,7,6,5,4,3,2])
  const d1 = r1 % 11 < 2 ? 0 : 11 - (r1 % 11)
  if (d1 !== parseInt(d[12])) return false
  const r2 = calc(d, [6,5,4,3,2,9,8,7,6,5,4,3,2])
  const d2 = r2 % 11 < 2 ? 0 : 11 - (r2 % 11)
  return d2 === parseInt(d[13])
}

function validate() {
  const key = pixKey.value.trim()
  if (!key) { result.value = null; return }

  if (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(key) || /^\d{11}$/.test(key)) {
    const valid = validateCPF(key)
    result.value = { valid, type: 'CPF', msg: valid ? 'CPF válido como chave PIX' : 'CPF inválido — verifique os dígitos verificadores' }; return
  }
  if (/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/.test(key) || /^\d{14}$/.test(key)) {
    const valid = validateCNPJ(key)
    result.value = { valid, type: 'CNPJ', msg: valid ? 'CNPJ válido como chave PIX' : 'CNPJ inválido — verifique os dígitos verificadores' }; return
  }
  if (key.startsWith('+55')) {
    const valid = /^\+55\d{10,11}$/.test(key.replace(/\s|-/g, ''))
    result.value = { valid, type: 'Telefone', msg: valid ? 'Telefone válido como chave PIX' : 'Formato inválido — use +55DDDNÚMERO' }; return
  }
  if (key.includes('@')) {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)
    result.value = { valid, type: 'E-mail', msg: valid ? 'E-mail válido como chave PIX' : 'E-mail inválido — verifique o formato' }; return
  }
  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(key)) {
    result.value = { valid: true, type: 'Chave aleatória (UUID)', msg: 'Chave aleatória PIX com formato UUID válido' }; return
  }
  result.value = { valid: false, type: 'Desconhecido', msg: 'Formato não reconhecido. Verifique o tipo e tente novamente.' }
}
</script>

<template>
  <ToolShell
    title="Consulta de Chave PIX"
    description="Valide se uma chave PIX (CPF, CNPJ, e-mail, telefone ou chave aleatória) tem formato correto."
    icon="fa-qrcode"
    icon-gradient="from-emerald-500 to-teal-700"
    orb-color="emerald"
    :quick-tips="['CPF/CNPJ com dígitos', 'E-mail e telefone', 'UUID aleatório']"
    :tips="[
      { title: 'Validação local', text: 'Esta ferramenta valida apenas o formato da chave no seu navegador, sem fazer consultas externas ou revelar dados de titularidade.' },
      { title: 'Telefone PIX', text: 'O formato padrão é +55 seguido de DDD + número, sem espaços: +5541999999999.' },
      { title: 'Chave aleatória', text: 'É um UUID v4 gerado pelo banco. Exemplo: 123e4567-e89b-12d3-a456-426614174000.' },
    ]"
    :examples="[
      { title: 'CPF válido', desc: '000.000.000-00 (formato com pontos e traço)', result: 'Validação passa se os dígitos verificadores forem corretos' },
      { title: 'Telefone', desc: '+5541999999999', result: 'Válido — prefixo +55, DDD e 9 dígitos' },
      { title: 'UUID', desc: '550e8400-e29b-41d4-a716-446655440000', result: 'Chave aleatória válida' },
    ]"
  >
    <div class="max-w-lg mx-auto space-y-5">
      <!-- Tipos de chave -->
      <div class="glass-panel p-4">
        <p class="input-aurora-label mb-3"><i class="fas fa-info-circle mr-1.5 text-teal-500"></i>Tipos de chave aceitos</p>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div v-for="t in pixTypes" :key="t.label" class="bg-gray-50 dark:bg-slate-800 rounded-lg p-3">
            <div class="flex items-center gap-2 mb-1">
              <i :class="['fas', t.icon, 'text-xs text-teal-600 dark:text-teal-400']"></i>
              <span class="text-xs font-semibold text-gray-800 dark:text-slate-200">{{ t.label }}</span>
            </div>
            <div class="text-[10px] text-gray-500 dark:text-slate-400 font-mono truncate">{{ t.example }}</div>
          </div>
        </div>
      </div>

      <!-- Input -->
      <div class="tool-body !mb-0 space-y-3">
        <div>
          <label class="input-aurora-label"><i class="fas fa-key mr-1.5 text-teal-500"></i>Chave PIX</label>
          <input v-model="pixKey" @input="validate" placeholder="CPF, CNPJ, e-mail, telefone ou chave aleatória..."
            class="w-full input-aurora mt-1" />
        </div>
        <BaseButton variant="success" icon="fa-circle-check" @click="validate" class="w-full">Validar Chave</BaseButton>
      </div>

      <!-- Resultado -->
      <Transition name="scale-in" appear>
        <div v-if="result"
          :class="result.valid ? 'tool-result-success' : 'tool-result-danger'"
          class="tool-result p-4 flex items-start gap-3"
        >
          <i :class="['fas text-xl flex-shrink-0 mt-0.5', result.valid ? 'fa-circle-check' : 'fa-circle-xmark']"></i>
          <div>
            <p class="font-bold text-sm">{{ result.valid ? 'Chave válida' : 'Chave inválida' }}</p>
            <p class="text-xs mt-0.5 opacity-80">Tipo identificado: <strong>{{ result.type }}</strong></p>
            <p class="text-xs mt-1 opacity-70">{{ result.msg }}</p>
          </div>
        </div>
      </Transition>

      <div class="tip-card">
        <i class="fas fa-shield-halved text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5"></i>
        <p class="text-xs">Validação 100% local. Nenhum dado é enviado a servidores externos. Para consultar o titular, acesse o app do seu banco.</p>
      </div>
    </div>
  </ToolShell>
</template>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all .3s ease; }
.scale-in-enter-from { transform: scale(.97); opacity: 0; }
.scale-in-leave-to  { opacity: 0; }
</style>

<template>
  <ToolShell
    title="Validador de CNPJ"
    description="Valide CNPJs com verificação matemática completa dos dígitos verificadores e formatação automática."
    icon="fa-building"
    icon-gradient="from-indigo-500 to-blue-800"
    orb-color="indigo"
    :quick-tips="['Validação matemática', 'Formatação automática', 'Lote de CNPJs']"
    :tips="[
      { title: 'Apenas estrutura', text: 'Esta ferramenta valida apenas a estrutura matemática do CNPJ. Não verifica situação cadastral na Receita Federal.' },
      { title: 'Consulta oficial', text: 'Para consultar a situação cadastral real, acesse: www.receita.fazenda.gov.br', type: 'info' },
    ]"
    :examples="[
      { title: 'CNPJ formatado',  desc: '11.222.333/0001-81', result: '✅ CNPJ válido' },
      { title: 'CNPJ sem máscara', desc: '11222333000181',    result: '✅ CNPJ válido' },
    ]"
  >
    <div class="tool-body">
      <BaseInput
        v-model="cnpjRaw"
        label="CNPJ para validar"
        icon="fa-building"
        placeholder="00.000.000/0000-00"
        :max="18"
        clearable
        tooltip="Digite ou cole o CNPJ. Aceita com ou sem formatação."
        :error="erro"
        hint="Aceita: 00.000.000/0001-00 ou 00000000000100"
        @input="onInput"
        @enter="validar"
      />

      <div v-if="cnpjFormatado" class="mt-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40">
        <span class="text-xs text-blue-600 dark:text-blue-300 font-mono">
          <i class="fas fa-magic mr-1.5"></i>
          Formatado: <strong>{{ cnpjFormatado }}</strong>
        </span>
      </div>

      <div class="flex gap-3 mt-4">
        <BaseButton variant="primary" icon="fa-search" @click="validar" class="flex-1">Validar CNPJ</BaseButton>
        <BaseButton variant="outline" icon="fa-trash-alt" @click="limpar">Limpar</BaseButton>
      </div>
    </div>

    <Transition name="scale-in">
      <div v-if="resultado !== null" class="mt-4">
        <div :class="[
          'flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border-2',
          resultado.valido
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/15 border-emerald-300 dark:border-emerald-700'
            : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/15 border-red-300 dark:border-red-700',
        ]">
          <div :class="[
            'w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 mx-auto sm:mx-0 shadow-lg',
            resultado.valido ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 'bg-gradient-to-br from-red-400 to-rose-600',
          ]">
            <i :class="['fas', resultado.valido ? 'fa-check' : 'fa-times']"></i>
          </div>
          <div>
            <h3 :class="['text-xl font-black', resultado.valido ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400']">
              {{ resultado.valido ? 'CNPJ Válido ✓' : 'CNPJ Inválido ✗' }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{{ resultado.mensagem }}</p>
            <div v-if="resultado.valido" class="flex flex-wrap gap-2 mt-2">
              <span class="stat-pill font-mono text-xs">{{ cnpjFormatado }}</span>
              <span class="stat-pill text-xs">Matriz/Filial: {{ resultado.estabelecimento }}</span>
            </div>
          </div>
        </div>

        <div v-if="resultado.valido" class="mt-3 flex gap-2">
          <button @click="copiar(false)" class="copy-btn flex-1 justify-center py-2">
            <i class="fas fa-copy"></i> Copiar sem máscara
          </button>
          <button @click="copiar(true)" class="copy-btn flex-1 justify-center py-2">
            <i class="fas fa-copy"></i> Copiar formatado
          </button>
        </div>
      </div>
    </Transition>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const cnpjRaw = ref('')
const erro    = ref('')

interface ResultadoCNPJ { valido: boolean; mensagem: string; estabelecimento: string }
const resultado = ref<ResultadoCNPJ | null>(null)

const cnpjSoNums = computed(() => cnpjRaw.value.replace(/\D/g, ''))
const cnpjFormatado = computed(() => {
  const n = cnpjSoNums.value
  if (n.length < 2)  return ''
  if (n.length <= 5) return `${n.slice(0,2)}.${n.slice(2)}`
  if (n.length <= 8) return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5)}`
  if (n.length <= 12)return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5,8)}/${n.slice(8)}`
  return `${n.slice(0,2)}.${n.slice(2,5)}.${n.slice(5,8)}/${n.slice(8,12)}-${n.slice(12,14)}`
})

function calcularDigito(cnpj: string, pesos: number[]): number {
  let soma = 0
  for (let i = 0; i < pesos.length; i++) soma += parseInt(cnpj[i]) * pesos[i]
  const r = soma % 11
  return r < 2 ? 0 : 11 - r
}

function validarCNPJ(cnpj: string): ResultadoCNPJ {
  const n = cnpj.replace(/\D/g, '')
  if (n.length !== 14)         return { valido: false, mensagem: 'CNPJ deve ter 14 dígitos.', estabelecimento: '' }
  if (/^(\d)\1{13}$/.test(n)) return { valido: false, mensagem: 'CNPJ inválido — dígitos repetidos.', estabelecimento: '' }
  const p1 = [5,4,3,2,9,8,7,6,5,4,3,2]
  const p2 = [6,5,4,3,2,9,8,7,6,5,4,3,2]
  const d1 = calcularDigito(n, p1)
  const d2 = calcularDigito(n, p2)
  if (d1 !== parseInt(n[12]) || d2 !== parseInt(n[13]))
    return { valido: false, mensagem: `Dígitos verificadores incorretos.`, estabelecimento: '' }
  const ord = parseInt(n.slice(8,12))
  return { valido: true, mensagem: 'CNPJ estruturalmente válido.', estabelecimento: ord === 1 ? 'Matriz' : `Filial ${ord}` }
}

function onInput() { erro.value = ''; resultado.value = null }

function validar() {
  const n = cnpjSoNums.value
  if (!n) { erro.value = 'Digite um CNPJ.'; return }
  if (n.length !== 14) { erro.value = `CNPJ incompleto (${n.length}/14 dígitos).`; return }
  erro.value = ''
  resultado.value = validarCNPJ(n)
}

function limpar() { cnpjRaw.value = ''; erro.value = ''; resultado.value = null }

async function copiar(formatado: boolean) {
  await navigator.clipboard.writeText(formatado ? cnpjFormatado.value : cnpjSoNums.value)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1500 })
}
</script>
<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

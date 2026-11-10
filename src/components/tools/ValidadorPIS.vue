<template>
  <ToolShell
    title="Validador de PIS/PASEP"
    description="Valide números PIS/PASEP/NIT com verificação do dígito verificador pelo Módulo 11."
    icon="fa-id-badge"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Valida PIS, PASEP e NIT', 'Módulo 11', 'Formato automático']"
    :tips="[
      { title: 'PIS, PASEP e NIT', text: 'PIS é para empregados do setor privado. PASEP para servidores públicos. NIT para trabalhadores autônomos. Os três usam a mesma estrutura de 11 dígitos.', type: 'info' },
      { title: 'Primeiro emprego', text: 'O PIS é gerado na primeira vinculação empregatícia do trabalhador e permanece o mesmo por toda a vida.', type: 'info' },
      { title: 'Dígito verificador', text: 'O último dígito é calculado multiplicando os 10 primeiros pelos pesos [3,2,9,8,7,6,5,4,3,2] e aplicando mod 11.', type: 'warning' },
    ]"
    :examples="[
      { title: 'PIS válido', desc: '12345678919', result: 'PIS válido — 123.45678.91-9' },
      { title: 'Com formatação', desc: '123.45678.91-9', result: 'PIS válido' },
      { title: 'Inválido', desc: '12345678910', result: 'PIS inválido — dígito verificador incorreto' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="pis"
            label="PIS / PASEP / NIT"
            icon="fa-id-badge"
            placeholder="000.00000.00-0"
            tooltip="Digite os 11 dígitos do PIS/PASEP/NIT com ou sem pontuação."
            hint="11 dígitos numéricos"
            @input="validar"
            :maxlength="14"
          />
          <div class="flex gap-3 mt-3">
            <BaseButton variant="primary" icon="fa-check-circle" @click="validar" class="flex-1">
              Validar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Número formatado -->
        <div v-if="valido" class="glass-panel p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">PIS formatado</p>
          <p class="font-mono text-2xl font-black text-gray-900 dark:text-white tracking-wider">{{ pisFormatado }}</p>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? 'PIS Válido' : 'PIS Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">
                {{ valido ? 'Dígito verificador correto' : mensagemErro }}
              </p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido" class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ digitoVerificador }}</div>
                <div class="metric-glass-label">Dígito verif.</div>
              </div>
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">11</div>
                <div class="metric-glass-label">Dígitos totais</div>
              </div>
            </div>

            <!-- Detalhamento do cálculo -->
            <div v-if="valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-calculator text-blue-500"></i>
                Estrutura
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Sequencial</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ pisNums.slice(0,10) }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Dígito verificador</span>
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ digitoVerificador }}</span>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-shield-alt text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">PIS/PASEP estruturalmente válido pela regra do Módulo 11.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-id-badge text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Digite um PIS/PASEP/NIT para validar</p>
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

const pis         = ref('')
const resultado   = ref(false)
const valido      = ref(false)
const mensagemErro = ref('')

const pisNums = computed(() => pis.value.replace(/\D/g, ''))

const pisFormatado = computed(() => {
  const n = pisNums.value
  if (n.length !== 11) return pis.value
  return `${n.slice(0,3)}.${n.slice(3,8)}.${n.slice(8,10)}-${n.slice(10)}`
})

const digitoVerificador = computed(() => pisNums.value.slice(-1))

const calcularPIS = (str: string): boolean => {
  if (str.length !== 11) return false
  const pesos = [3,2,9,8,7,6,5,4,3,2]
  let soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(str[i]) * pesos[i]
  const resto  = soma % 11
  const digito = resto < 2 ? 0 : 11 - resto
  return digito === parseInt(str[10])
}

const validar = () => {
  if (!pis.value.trim()) { resultado.value = false; return }

  const nums = pisNums.value

  if (nums.length !== 11) {
    valido.value      = false
    mensagemErro.value = `Deve ter 11 dígitos (encontrado: ${nums.length})`
    resultado.value   = true
    return
  }

  if (calcularPIS(nums)) {
    valido.value = true; mensagemErro.value = ''
  } else {
    valido.value = false; mensagemErro.value = 'Dígito verificador incorreto'
  }

  resultado.value = true
}

const limpar = () => { pis.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

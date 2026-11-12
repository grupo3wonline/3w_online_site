<template>
  <ToolShell
    title="Validador de Título de Eleitor"
    description="Valide títulos de eleitor brasileiros com verificação dos dois dígitos verificadores e identificação do estado."
    icon="fa-vote-yea"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['12 dígitos', 'Identifica o estado', '2 dígitos verificadores']"
    :tips="[
      { title: 'Estrutura do título', text: 'O título tem 12 dígitos: 8 do número sequencial + 2 do código de estado + 2 dígitos verificadores.', type: 'info' },
      { title: 'Código de estado', text: 'Os dígitos 9 e 10 indicam o estado de emissão. Ex: 01 = SP, 02 = MG, 03 = RJ, 19 = DF.', type: 'info' },
      { title: 'Dois verificadores', text: 'O primeiro dígito verifica os 8 primeiros. O segundo verifica os dígitos 9, 10 e 11 juntos.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Título válido', desc: '000000000119', result: 'Válido — Estado: DF' },
      { title: 'Com espaços',   desc: '0000 0000 0119', result: 'Válido — espaços são ignorados' },
      { title: 'Inválido',      desc: '000000000199', result: 'Inválido — dígito verificador incorreto ou UF inválida' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="titulo"
            label="Título de Eleitor"
            icon="fa-vote-yea"
            placeholder="0000 0000 0000"
            tooltip="Digite os 12 dígitos do Título de Eleitor, com ou sem espaços."
            hint="12 dígitos numéricos"
            @input="validar"
          />
          <div class="flex gap-3 mt-3">
            <BaseButton variant="success" icon="fa-check-circle" @click="validar" class="flex-1">
              Validar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Título formatado -->
        <div v-if="valido" class="glass-panel p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">Título formatado</p>
          <p class="font-mono text-2xl font-black text-gray-900 dark:text-white tracking-widest">{{ tituloFormatado }}</p>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? 'Título Válido' : 'Título Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido" class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ uf }}</div>
                <div class="metric-glass-label">Estado (UF)</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400 font-mono">{{ digitos }}</div>
                <div class="metric-glass-label">Dígitos verif.</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">12</div>
                <div class="metric-glass-label">Dígitos totais</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div v-if="valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-green-500"></i>
                Estrutura
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Sequencial</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ tituloNums.slice(0,8) }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Código do estado</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ tituloNums.slice(8,10) }} ({{ uf }})</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Dígitos verificadores</span>
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ digitos }}</span>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-landmark text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Título emitido no estado <strong>{{ uf }}</strong> com dígitos verificadores corretos.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-vote-yea text-4xl mb-3 opacity-30 block text-green-400"></i>
          <p class="text-sm">Digite um Título de Eleitor para validar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const titulo    = ref('')
const resultado = ref(false)
const valido    = ref(false)
const mensagem  = ref('')
const uf        = ref('')
const digitos   = ref('')

const tituloNums = computed(() => titulo.value.replace(/\D/g,''))

const tituloFormatado = computed(() => {
  const n = tituloNums.value
  if (n.length === 12) return `${n.slice(0,4)} ${n.slice(4,8)} ${n.slice(8,12)}`
  return titulo.value
})

const ufCodes: Record<string, string> = {
  '01':'SP','02':'MG','03':'RJ','04':'RS','05':'BA','06':'PR',
  '07':'CE','08':'PE','09':'SC','10':'GO','11':'PB','12':'MT',
  '13':'ES','14':'PI','15':'RN','16':'AL','17':'MA','18':'MS',
  '19':'DF','20':'SE','21':'RO','22':'AC','23':'AM','24':'RR',
  '25':'AP','26':'PA','27':'TO','28':'EX',
}

const validar = () => {
  if (!titulo.value.trim()) { resultado.value = false; return }

  const nums = tituloNums.value

  if (nums.length !== 12) {
    valido.value   = false
    mensagem.value = `O título deve ter 12 dígitos (encontrado: ${nums.length})`
    resultado.value = true
    return
  }

  const codigoUF = nums.slice(8, 10)
  const d1       = parseInt(nums[10])
  const d2       = parseInt(nums[11])

  // Cálculo dos dígitos verificadores
  const primD = parseInt(nums.slice(0, 8)) % 11
  const segD  = parseInt(nums.slice(8, 11)) % 11

  if (primD % 10 === d1 && segD % 10 === d2 && ufCodes[codigoUF]) {
    valido.value   = true
    mensagem.value = 'Título de Eleitor válido'
    uf.value       = ufCodes[codigoUF]
    digitos.value  = `${d1}${d2}`
  } else {
    valido.value   = false
    mensagem.value = ufCodes[codigoUF] ? 'Dígitos verificadores inválidos' : `Código de estado inválido (${codigoUF})`
  }

  resultado.value = true
}

const limpar = () => {
  titulo.value = ''; resultado.value = false; valido.value = false
  uf.value = ''; digitos.value = ''
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

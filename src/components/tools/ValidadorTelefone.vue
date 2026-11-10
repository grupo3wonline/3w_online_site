<template>
  <ToolShell
    title="Validador de Telefone"
    description="Valide e formate números de telefone brasileiros (fixo e celular) com verificação de DDD pela ANATEL."
    icon="fa-phone"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Celular e fixo', 'DDDs da ANATEL', 'Formatação automática']"
    :tips="[
      { title: 'Celular', text: 'Celulares têm 11 dígitos: DDD (2) + 9 inicial + número (8). Ex: (11) 9 8765-4321.', type: 'info' },
      { title: 'Fixo', text: 'Fixos têm 10 dígitos: DDD (2) + número (8). Ex: (11) 3456-7890.', type: 'info' },
      { title: 'DDDs válidos', text: 'São aceitos apenas os DDDs cadastrados na ANATEL. DDDs como 00, 01 e 10 não existem.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Celular SP',   desc: '(11) 98765-4321', result: 'Celular válido — DDD 11, São Paulo' },
      { title: 'Fixo RJ',      desc: '(21) 3456-7890',  result: 'Fixo válido — DDD 21, Rio de Janeiro' },
      { title: 'DDD inválido', desc: '(10) 98765-4321', result: 'Inválido — DDD 10 não cadastrado' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="telefone"
            label="Número de Telefone"
            icon="fa-phone"
            placeholder="(11) 98765-4321"
            tooltip="Digite o telefone com DDD. Aceita celular (11 dígitos) ou fixo (10 dígitos)."
            hint="Formato: (DDD) 9XXXX-XXXX ou (DDD) XXXX-XXXX"
            @input="validar"
            :maxlength="15"
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

        <!-- Número formatado -->
        <div v-if="valido && info" class="glass-panel p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">Número formatado</p>
          <p class="font-mono text-2xl font-black text-gray-900 dark:text-white">{{ telefoneFormatado }}</p>
        </div>

        <!-- Dica de formatos -->
        <div class="tip-card">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <div class="text-xs">
            <p class="font-semibold mb-0.5">Formatos aceitos</p>
            <p>Celular: (00) 90000-0000 ou (00) 00000-0000</p>
            <p>Fixo: (00) 0000-0000</p>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? 'Telefone Válido' : 'Telefone Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido && info" class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ info.ddd }}</div>
                <div class="metric-glass-label">DDD</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400 text-sm font-mono">{{ info.numero }}</div>
                <div class="metric-glass-label">Número</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ info.tipo }}</div>
                <div class="metric-glass-label">Tipo</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div v-if="valido && info" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-green-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">DDD</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ info.ddd }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Número</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ info.numero }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Tipo</span>
                  <span :class="['font-bold px-2 py-0.5 rounded-full text-xs', info.tipo === 'Celular' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300']">
                    {{ info.tipo }}
                  </span>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Número <strong>{{ info?.tipo?.toLowerCase() }}</strong> com DDD <strong>{{ info?.ddd }}</strong> válido pela ANATEL.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-phone text-4xl mb-3 opacity-30 block text-green-400"></i>
          <p class="text-sm">Digite um telefone para validar</p>
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

const telefone  = ref('')
const resultado = ref(false)
const valido    = ref(false)
const mensagem  = ref('')

const dddsValidos = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,63,64,65,66,67,68,69,71,73,74,75,77,79,81,82,83,84,85,86,87,88,89,91,92,93,94,95,96,97,98,99]

const info = computed(() => {
  if (!valido.value) return null
  const nums   = telefone.value.replace(/\D/g, '')
  const ddd    = nums.slice(0, 2)
  const numero = nums.slice(2)
  const tipo   = numero.length === 9 ? 'Celular' : 'Fixo'
  return { ddd, numero, tipo }
})

const telefoneFormatado = computed(() => {
  if (!info.value) return telefone.value
  const { ddd, numero } = info.value
  const n = numero.length === 9
    ? `${numero.slice(0,5)}-${numero.slice(5)}`
    : `${numero.slice(0,4)}-${numero.slice(4)}`
  return `(${ddd}) ${n}`
})

const validar = () => {
  if (!telefone.value.trim()) { resultado.value = false; return }

  const nums = telefone.value.replace(/\D/g, '')

  if (nums.length < 10 || nums.length > 11) {
    valido.value = false; mensagem.value = 'Deve ter 10 (fixo) ou 11 (celular) dígitos'; resultado.value = true; return
  }

  const ddd = parseInt(nums.slice(0, 2))
  if (!dddsValidos.includes(ddd)) {
    valido.value = false; mensagem.value = `DDD ${ddd} inválido pela ANATEL`; resultado.value = true; return
  }

  if (nums.length === 11 && nums[2] !== '9') {
    valido.value = false; mensagem.value = 'Celular (11 dígitos) deve começar com 9 após o DDD'; resultado.value = true; return
  }

  valido.value   = true
  mensagem.value = `Número ${nums.length === 11 ? 'celular' : 'fixo'} brasileiro válido`
  resultado.value = true
}

const limpar = () => { telefone.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

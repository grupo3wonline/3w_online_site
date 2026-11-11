<template>
  <ToolShell
    title="Validador de RENAVAM"
    description="Valide o Registro Nacional de Veículos Automotores (RENAVAM) com verificação do dígito verificador pelo Módulo 11."
    icon="fa-car-side"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['9 ou 11 dígitos', 'Módulo 11', 'Formato padronizado']"
    :tips="[
      { title: 'O que é RENAVAM?', text: 'O RENAVAM (Registro Nacional de Veículos Automotores) é o número único de identificação do veículo no Brasil, presente no CRLV.', type: 'info' },
      { title: 'Estrutura', text: 'O RENAVAM tem 11 dígitos (9 do número + 2 zeros à esquerda). O último é o dígito verificador calculado pelo Módulo 11.', type: 'info' },
      { title: 'Pesos do Módulo 11', text: 'Os pesos usados são [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]. Se o resto for 10, o dígito verificador é 0.', type: 'warning' },
    ]"
    :examples="[
      { title: 'RENAVAM válido',   desc: '00000000225',   result: 'RENAVAM válido' },
      { title: 'Com 9 dígitos',    desc: '000000225',    result: 'RENAVAM válido (completado com zeros)' },
      { title: 'RENAVAM inválido', desc: '00000000226',  result: 'RENAVAM inválido — dígito verificador incorreto' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="renavam"
            label="RENAVAM"
            icon="fa-car-side"
            placeholder="00000000000"
            tooltip="Digite os 9 ou 11 dígitos do RENAVAM. Se tiver 9, zeros serão adicionados à esquerda automaticamente."
            hint="9 ou 11 dígitos numéricos"
            @input="validar"
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
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">RENAVAM padronizado (11 dígitos)</p>
          <p class="font-mono text-2xl font-black text-gray-900 dark:text-white tracking-widest">{{ renavamFormatado }}</p>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? 'RENAVAM Válido' : 'RENAVAM Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
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

            <!-- Detalhamento -->
            <div v-if="valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-blue-500"></i>
                Estrutura do RENAVAM
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Número base</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ renavamFormatado.slice(0,10) }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Dígito verificador</span>
                  <span class="font-mono font-bold text-emerald-600 dark:text-emerald-400">{{ digitoVerificador }}</span>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-shield-halved text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">RENAVAM válido pela regra do Módulo 11. Encontrado no CRLV do veículo.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-car-side text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Digite um RENAVAM para validar</p>
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

const renavam   = ref('')
const resultado = ref(false)
const valido    = ref(false)
const mensagem  = ref('')

const renavamFormatado = computed(() => {
  const nums = renavam.value.replace(/\D/g, '')
  return nums.padStart(11, '0').slice(0, 11)
})

const digitoVerificador = computed(() => renavamFormatado.value.slice(-1))

const validar = () => {
  if (!renavam.value.trim()) { resultado.value = false; return }

  const nums = renavam.value.replace(/\D/g, '').padStart(11, '0')

  if (nums.length !== 11) {
    valido.value   = false
    mensagem.value = 'O RENAVAM deve ter 9 ou 11 dígitos'
    resultado.value = true
    return
  }

  const pesos  = [3,2,9,8,7,6,5,4,3,2]
  let soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(nums[i]) * pesos[i]

  const digitoCalc   = (soma * 10) % 11
  const digitoFinal  = digitoCalc === 10 ? 0 : digitoCalc
  const digitoInform = parseInt(nums[10])

  if (digitoFinal === digitoInform) {
    valido.value   = true
    mensagem.value = 'RENAVAM válido — Módulo 11 aprovado'
  } else {
    valido.value   = false
    mensagem.value = `RENAVAM inválido — esperado dígito ${digitoFinal}, encontrado ${digitoInform}`
  }

  resultado.value = true
}

const limpar = () => { renavam.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>


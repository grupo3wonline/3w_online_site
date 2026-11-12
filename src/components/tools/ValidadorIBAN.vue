<template>
  <ToolShell
    title="Validador de IBAN"
    description="Valide IBANs internacionais de qualquer país com verificação do algoritmo MOD-97."
    icon="fa-building-columns"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Validação MOD-97', 'Suporte internacional', 'Detecta país emissor']"
    :tips="[
      { title: 'O que é IBAN?', text: 'IBAN (International Bank Account Number) é um código padrão internacional para identificar contas bancárias. Possui de 15 a 34 caracteres.', type: 'info' },
      { title: 'Estrutura', text: 'Os 2 primeiros caracteres são o código do país (ISO 3166-1). Os 2 seguintes são dígitos verificadores calculados pelo MOD-97.', type: 'info' },
      { title: 'Brasil', text: 'O Brasil não utiliza IBAN como padrão. Os formatos BR são usados apenas em operações internacionais.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Alemanha', desc: 'DE89370400440532013000', result: 'IBAN válido — País: DE, Check: 89' },
      { title: 'Portugal', desc: 'PT50000201231234567890154', result: 'IBAN válido — País: PT, Check: 50' },
      { title: 'Inválido', desc: 'BR1800000000141455123924100C3', result: 'IBAN inválido — dígito verificador incorreto' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="iban"
            label="IBAN"
            icon="fa-building-columns"
            placeholder="DE89 3704 0044 0532 0130 00"
            tooltip="Informe o IBAN sem espaços ou com espaços a cada 4 caracteres. Ex: DE89370400440532013000"
            hint="De 15 a 34 caracteres alfanuméricos"
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

        <!-- IBAN formatado -->
        <div v-if="valido" class="glass-panel p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">IBAN formatado</p>
          <p class="font-mono text-xl font-black text-gray-900 dark:text-white tracking-widest break-all">{{ ibanFormatado }}</p>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? 'IBAN Válido' : 'IBAN Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido" class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ pais }}</div>
                <div class="metric-glass-label">País</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ checkDigits }}</div>
                <div class="metric-glass-label">Check Digits</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ comprimento }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
            </div>

            <!-- Detalhamento quando válido -->
            <div v-if="valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-blue-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Código do país</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ pais }} ({{ nomePais }})</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Dígitos verificadores</span>
                  <span class="font-bold font-mono text-gray-900 dark:text-white">{{ checkDigits }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">BBAN (número da conta)</span>
                  <span class="font-bold font-mono text-gray-900 dark:text-white text-xs">{{ bban }}</span>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-shield-halved text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Verificação MOD-97 aprovada. Este IBAN está estruturalmente correto.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-building-columns text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Digite um IBAN para validar</p>
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

const iban        = ref('')
const resultado   = ref(false)
const valido      = ref(false)
const mensagem    = ref('')
const pais        = ref('')
const checkDigits = ref('')
const bban        = ref('')
const comprimento = ref(0)

const paisNomes: Record<string, string> = {
  DE: 'Alemanha', PT: 'Portugal', ES: 'Espanha', FR: 'França', IT: 'Itália',
  GB: 'Reino Unido', NL: 'Holanda', BE: 'Bélgica', CH: 'Suíça', AT: 'Áustria',
  BR: 'Brasil', AR: 'Argentina', US: 'Estados Unidos',
}

const nomePais = computed(() => paisNomes[pais.value] || pais.value || '—')

const ibanFormatado = computed(() => {
  const limpo = iban.value.toUpperCase().replace(/\s/g, '')
  return limpo.match(/.{1,4}/g)?.join(' ') || limpo
})

const mod97 = (str: string): number => {
  let remainder = str
  while (remainder.length > 2) {
    const block = remainder.slice(0, 9)
    remainder = (parseInt(block, 10) % 97).toString() + remainder.slice(block.length)
  }
  return parseInt(remainder, 10) % 97
}

const validar = () => {
  if (!iban.value.trim()) { resultado.value = false; return }

  const limpo = iban.value.toUpperCase().replace(/\s/g, '')

  if (limpo.length < 15 || limpo.length > 34) {
    valido.value = false
    mensagem.value = 'IBAN deve ter entre 15 e 34 caracteres'
    resultado.value = true
    return
  }

  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]+$/.test(limpo)) {
    valido.value = false
    mensagem.value = 'Formato inválido — deve começar com 2 letras e 2 dígitos'
    resultado.value = true
    return
  }

  const rearranged = limpo.slice(4) + limpo.slice(0, 4)
  const numeric    = rearranged.replace(/[A-Z]/g, ch => String(ch.charCodeAt(0) - 55))

  if (mod97(numeric) === 1) {
    valido.value    = true
    mensagem.value  = 'IBAN válido — verificação MOD-97 aprovada'
    pais.value      = limpo.slice(0, 2)
    checkDigits.value = limpo.slice(2, 4)
    bban.value      = limpo.slice(4)
    comprimento.value = limpo.length
  } else {
    valido.value   = false
    mensagem.value = 'IBAN inválido — dígito verificador incorreto'
  }

  resultado.value = true
}

const limpar = () => {
  iban.value = ''; resultado.value = false; valido.value = false
  pais.value = ''; checkDigits.value = ''; bban.value = ''
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>


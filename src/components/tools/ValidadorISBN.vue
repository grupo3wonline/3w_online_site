<template>
  <ToolShell
    title="Validador de ISBN"
    description="Valide e converta ISBNs de livros nos formatos ISBN-10 e ISBN-13 com dígito verificador."
    icon="fa-book"
    icon-gradient="from-amber-500 to-orange-700"
    orb-color="orange"
    :quick-tips="['ISBN-10 e ISBN-13', 'Dígito verificador', 'Formato automático']"
    :tips="[
      { title: 'ISBN-13', text: 'O padrão atual. Começa com 978 ou 979. Os últimos 3 dígitos são o grupo de publicação e o verificador final.', type: 'info' },
      { title: 'ISBN-10', text: 'Padrão anterior, ainda aceito. Tem 10 dígitos (o último pode ser X, valendo 10 no cálculo mod 11).', type: 'info' },
      { title: 'Dígito verificador', text: 'O último dígito é calculado a partir dos anteriores. Um ISBN com dígito errado é considerado inválido.', type: 'warning' },
    ]"
    :examples="[
      { title: 'ISBN-13 válido', desc: '978-3-16-148410-0', result: 'ISBN-13 válido' },
      { title: 'ISBN-10 válido', desc: '0-306-40615-2', result: 'ISBN-10 válido' },
      { title: 'ISBN inválido', desc: '978-3-16-148410-1', result: 'ISBN-13 inválido — dígito verificador incorreto' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="isbn"
            label="ISBN"
            icon="fa-barcode"
            placeholder="978-3-16-148410-0"
            tooltip="Digite o ISBN-10 ou ISBN-13, com ou sem hifens. Apenas os dígitos serão verificados."
            hint="ISBN-10 (10 dígitos) ou ISBN-13 (13 dígitos)"
            @input="validar"
          />
          <div class="flex gap-3 mt-3">
            <BaseButton variant="warning" icon="fa-check-circle" @click="validar" class="flex-1">
              Validar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- ISBN formatado -->
        <div v-if="valido" class="glass-panel p-4 text-center">
          <p class="text-xs text-gray-500 dark:text-slate-400 mb-1">ISBN formatado</p>
          <p class="font-mono text-2xl font-black text-gray-900 dark:text-white tracking-wider">{{ isbnFormatado }}</p>
          <span :class="['inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold', tipo === 'ISBN-13' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300']">
            {{ tipo }}
          </span>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? mensagem : 'ISBN Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">
                {{ valido ? tipo : mensagem }}
              </p>
            </div>

            <!-- Detalhamento ISBN-13 -->
            <div v-if="valido && tipo === 'ISBN-13'" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-amber-500"></i>
                Estrutura ISBN-13
              </h4>
              <div class="grid grid-cols-5 gap-1 text-center text-xs">
                <div class="p-2 rounded bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                  <div class="font-black text-amber-700 dark:text-amber-300">{{ prefixo }}</div>
                  <div class="text-gray-500 mt-0.5">Prefixo</div>
                </div>
                <div class="p-2 rounded bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                  <div class="font-black text-blue-700 dark:text-blue-300">{{ grupoIdioma }}</div>
                  <div class="text-gray-500 mt-0.5">Idioma</div>
                </div>
                <div class="p-2 rounded bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                  <div class="font-black text-purple-700 dark:text-purple-300 text-xs">...</div>
                  <div class="text-gray-500 mt-0.5">Editora</div>
                </div>
                <div class="p-2 rounded bg-teal-50 dark:bg-teal-900/20 border border-teal-100 dark:border-teal-800">
                  <div class="font-black text-teal-700 dark:text-teal-300 text-xs">...</div>
                  <div class="text-gray-500 mt-0.5">Título</div>
                </div>
                <div class="p-2 rounded bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                  <div class="font-black text-green-700 dark:text-green-300">{{ digitoVerificador }}</div>
                  <div class="text-gray-500 mt-0.5">Verif.</div>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Dígito verificador correto — este {{ tipo }} é genuíno.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-book text-4xl mb-3 opacity-30 block text-amber-400"></i>
          <p class="text-sm">Digite um ISBN para validar</p>
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

const isbn     = ref('')
const resultado = ref(false)
const valido   = ref(false)
const mensagem = ref('')
const tipo     = ref('')

const isbnFormatado = computed(() => {
  const nums = isbn.value.replace(/[^0-9X]/gi, '')
  if (nums.length === 10) return `${nums.slice(0,1)}-${nums.slice(1,4)}-${nums.slice(4,9)}-${nums.slice(9)}`
  if (nums.length === 13) return `${nums.slice(0,3)}-${nums.slice(3,4)}-${nums.slice(4,6)}-${nums.slice(6,12)}-${nums.slice(12)}`
  return isbn.value
})

const prefixo         = computed(() => isbn.value.replace(/[^0-9X]/gi,'').slice(0,3))
const grupoIdioma     = computed(() => isbn.value.replace(/[^0-9X]/gi,'').slice(3,4))
const digitoVerificador = computed(() => isbn.value.replace(/[^0-9X]/gi,'').slice(-1))

const validarISBN10 = (nums: string) => {
  if (nums.length !== 10) return false
  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(nums[i]) * (10 - i)
  const ck = nums[9].toUpperCase() === 'X' ? 10 : parseInt(nums[9])
  soma += ck
  return soma % 11 === 0
}

const validarISBN13 = (nums: string) => {
  if (nums.length !== 13) return false
  let soma = 0
  for (let i = 0; i < 12; i++) soma += parseInt(nums[i]) * (i % 2 === 0 ? 1 : 3)
  const ck = (10 - (soma % 10)) % 10
  return ck === parseInt(nums[12])
}

const validar = () => {
  if (!isbn.value.trim()) { resultado.value = false; return }

  const nums = isbn.value.replace(/[^0-9X]/gi, '').toUpperCase()

  if (nums.length === 10) {
    if (validarISBN10(nums)) {
      valido.value = true; tipo.value = 'ISBN-10'; mensagem.value = 'ISBN-10 válido'
    } else {
      valido.value = false; mensagem.value = 'ISBN-10 inválido — dígito verificador incorreto'
    }
  } else if (nums.length === 13) {
    if (validarISBN13(nums)) {
      valido.value = true; tipo.value = 'ISBN-13'; mensagem.value = 'ISBN-13 válido'
    } else {
      valido.value = false; mensagem.value = 'ISBN-13 inválido — dígito verificador incorreto'
    }
  } else {
    valido.value = false; mensagem.value = `ISBN deve ter 10 ou 13 dígitos (encontrado: ${nums.length})`
  }

  resultado.value = true
}

const limpar = () => { isbn.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

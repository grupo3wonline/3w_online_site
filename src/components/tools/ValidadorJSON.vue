<template>
  <ToolShell
    title="Validador de JSON"
    description="Valide, formate e minifique JSON com análise de estrutura e destaque de erros de sintaxe."
    icon="fa-file-code"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['Validação em tempo real', 'Formatar / Minificar', 'Estatísticas de tamanho']"
    :tips="jsonTips"
    :examples="jsonExamples"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <label class="input-aurora-label">
            <i class="fas fa-code mr-1.5 text-indigo-500"></i>
            Código JSON
          </label>
          <textarea
            v-model="json"
            @input="validar"
            class="input-aurora font-mono text-sm resize-y"
            rows="12"
            placeholder='{"nome": "João",&#10;  "idade": 30,&#10;  "ativo": true,&#10;  "tags": ["web", "dev"]&#10;}'
          ></textarea>
          <div class="flex gap-2 mt-3">
            <BaseButton variant="primary" icon="fa-indent" @click="formatar" class="flex-1">
              Formatar
            </BaseButton>
            <BaseButton variant="secondary" icon="fa-compress-alt" @click="minificar" class="flex-1">
              Minificar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
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
              <p class="text-2xl font-black text-white">{{ valido ? 'JSON Válido' : 'JSON Inválido' }}</p>
              <p :class="['text-sm mt-1 px-4', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido" class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ stats.linhas }}</div>
                <div class="metric-glass-label">Linhas</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ stats.caracteres }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ stats.tamanho }} KB</div>
                <div class="metric-glass-label">Tamanho</div>
              </div>
            </div>

            <!-- Dica de erro -->
            <div v-if="!valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-bug text-red-500"></i>
                Detalhe do Erro
              </h4>
              <div class="tip-card-warning">
                <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
                <span class="text-xs font-mono">{{ mensagem }}</span>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">JSON bem formado. Use "Formatar" para identar ou "Minificar" para compactar.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-file-code text-4xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Cole seu JSON ao lado para validar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const jsonTips = [
  { title: 'Aspas duplas', text: 'JSON requer aspas duplas em strings e chaves. Aspas simples causam erro de parsing.', type: 'warning' },
  { title: 'null vs undefined', text: 'Use null para valores nulos. undefined não é válido em JSON e será removido na serialização.', type: 'info' },
  { title: 'Vírgula final', text: 'Trailing commas (vírgulas após o último item) não são permitidas em JSON puro.', type: 'warning' },
]
const jsonExamples = [
  { title: 'Objeto simples', desc: 'Entrada: {"nome": "João", "idade": 30}', result: 'JSON válido — 2 chaves' },
  { title: 'Array de objetos', desc: 'Entrada: [{"id": 1}, {"id": 2}]', result: 'JSON válido — array com 2 itens' },
  { title: 'Aspas simples', desc: "Entrada: {nome: 'João'}", result: 'JSON inválido — aspas simples não são permitidas' },
]

const json      = ref('')
const resultado = ref(false)
const valido    = ref(false)
const mensagem  = ref('')

const stats = computed(() => {
  if (!valido.value) return { linhas: 0, caracteres: 0, tamanho: '0.00' }
  return {
    linhas:     json.value.split('\n').length,
    caracteres: json.value.length,
    tamanho:    (new Blob([json.value]).size / 1024).toFixed(2),
  }
})

const validar = () => {
  if (!json.value.trim()) { resultado.value = false; return }
  try {
    JSON.parse(json.value)
    valido.value   = true
    mensagem.value = 'JSON válido e bem formado'
  } catch (e: any) {
    valido.value   = false
    mensagem.value = e.message
  }
  resultado.value = true
}

const formatar = () => {
  try {
    json.value = JSON.stringify(JSON.parse(json.value), null, 2)
    validar()
    Swal.fire({ icon: 'success', title: 'JSON Formatado!', timer: 1500, showConfirmButton: false, confirmButtonColor: '#2563eb' })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao formatar', text: 'Corrija o JSON antes de formatar.', confirmButtonColor: '#2563eb' })
  }
}

const minificar = () => {
  try {
    json.value = JSON.stringify(JSON.parse(json.value))
    validar()
    Swal.fire({ icon: 'success', title: 'JSON Minificado!', timer: 1500, showConfirmButton: false, confirmButtonColor: '#2563eb' })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao minificar', text: 'Corrija o JSON antes de minificar.', confirmButtonColor: '#2563eb' })
  }
}

const limpar = () => { json.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

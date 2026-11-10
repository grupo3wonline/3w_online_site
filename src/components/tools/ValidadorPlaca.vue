<template>
  <ToolShell
    title="Validador de Placa Veicular"
    description="Valide placas no padrão antigo brasileiro (AAA-9999) e no novo padrão Mercosul (AAA9A99)."
    icon="fa-car"
    icon-gradient="from-slate-500 to-gray-700"
    orb-color="blue"
    :quick-tips="['Padrão antigo e Mercosul', 'Formatação automática', 'Detecta o formato']"
    :tips="[
      { title: 'Padrão Antigo', text: 'Formato: 3 letras + 4 números (ex: ABC-1234). Válido para veículos emplacados antes de 2018 no Brasil.', type: 'info' },
      { title: 'Padrão Mercosul', text: 'Formato: 3 letras + 1 número + 1 letra + 2 números (ex: ABC1D23). Adotado a partir de 2018 e obrigatório para novos veículos.', type: 'info' },
      { title: 'Estado da placa', text: 'A combinação de letras e números não determina o estado isoladamente. O estado estava presente na placa física (adesivo).', type: 'warning' },
    ]"
    :examples="[
      { title: 'Padrão antigo',  desc: 'ABC-1234', result: 'Válida — formato antigo (pré-2018)' },
      { title: 'Mercosul',       desc: 'ABC1D23',  result: 'Válida — padrão Mercosul' },
      { title: 'Com espaço',     desc: 'ABC 1234', result: 'Válida — aceita espaço ou hífen' },
      { title: 'Inválida',       desc: 'AB-1234',  result: 'Inválida — deve ter 3 letras no início' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="placa"
            label="Placa do Veículo"
            icon="fa-car"
            placeholder="ABC-1234 ou ABC1D23"
            tooltip="Digite a placa com ou sem hífen. Padrão antigo: AAA-9999. Mercosul: AAA9A99."
            hint="Aceita padrão antigo (AAA-9999) e Mercosul (AAA9A99)"
            @input="validar"
            :maxlength="8"
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

        <!-- Placa formatada -->
        <div v-if="valido" class="glass-panel p-4 text-center">
          <div class="inline-block bg-white dark:bg-slate-800 border-4 border-gray-800 dark:border-gray-200 rounded-xl px-6 py-3 shadow-lg">
            <p class="font-black text-3xl text-gray-900 dark:text-white tracking-widest font-mono">{{ placaFormatada }}</p>
            <p class="text-xs text-gray-500 dark:text-slate-400 mt-1">🇧🇷 Brasil</p>
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
              <p class="text-2xl font-black text-white">{{ valido ? 'Placa Válida' : 'Placa Inválida' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Tipo de placa -->
            <div v-if="valido" class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-slate-100 dark:ring-slate-700">
                <div :class="['metric-glass-value', tipo === 'Mercosul' ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400']">
                  {{ tipo }}
                </div>
                <div class="metric-glass-label">Padrão</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">7</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div v-if="valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-blue-500"></i>
                Detalhamento
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Padrão</span>
                  <span :class="['font-bold px-2 py-0.5 rounded-full text-xs', tipo === 'Mercosul' ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300']">
                    {{ tipo }}
                  </span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Letras iniciais</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ placaFormatada.replace(/[^A-Z]/g,'').slice(0,3) }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Vigência</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ tipo === 'Mercosul' ? 'A partir de 2018' : 'Antes de 2018' }}</span>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Placa no padrão <strong>{{ tipo }}</strong> — estrutura válida.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-car text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Digite uma placa para validar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const placa         = ref('')
const resultado     = ref(false)
const valido        = ref(false)
const mensagem      = ref('')
const placaFormatada = ref('')
const tipo          = ref('')

const validar = () => {
  if (!placa.value.trim()) { resultado.value = false; return }

  const limpa  = placa.value.toUpperCase().replace(/[^A-Z0-9]/g, '')
  const antiga = /^[A-Z]{3}\d{4}$/
  const mercosul = /^[A-Z]{3}\d[A-Z]\d{2}$/

  if (antiga.test(limpa)) {
    valido.value        = true
    mensagem.value      = 'Placa no formato antigo (pré-2018)'
    placaFormatada.value = `${limpa.slice(0,3)}-${limpa.slice(3)}`
    tipo.value          = 'Antiga'
  } else if (mercosul.test(limpa)) {
    valido.value        = true
    mensagem.value      = 'Placa no padrão Mercosul (pós-2018)'
    placaFormatada.value = limpa
    tipo.value          = 'Mercosul'
  } else {
    valido.value   = false
    mensagem.value = 'Formato inválido — use AAA-9999 (antiga) ou AAA9A99 (Mercosul)'
  }

  resultado.value = true
}

const limpar = () => {
  placa.value = ''; resultado.value = false; valido.value = false
  placaFormatada.value = ''; tipo.value = ''
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

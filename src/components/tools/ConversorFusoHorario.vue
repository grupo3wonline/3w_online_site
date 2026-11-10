<template>
  <ToolShell
    title="Conversor de Fuso Horário"
    description="Converta horários entre fusos horários de qualquer parte do mundo. Relógio mundial em tempo real."
    icon="fa-clock"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['12 fusos pré-configurados', 'Relógio em tempo real', 'Horário de Brasília incluído']"
    :tips="[
      { title: 'UTC (Tempo Universal)', text: 'UTC é o padrão mundial. Brasília fica em UTC-3 no horário normal. UTC não tem horário de verão.', type: 'info' },
      { title: 'Horário de Verão', text: 'Países como EUA e Europa ajustam seus relógios 1 hora para frente no verão. Isso altera o offset UTC temporariamente.', type: 'warning' },
      { title: 'Fusos do Brasil', text: 'UTC-2: Fernando de Noronha | UTC-3: Brasília | UTC-4: Amazonas e MT | UTC-5: Acre.', type: 'info' },
    ]"
    :examples="[
      { title: 'Reunião global', desc: '14h00 em Brasília (UTC-3)', result: '19h00 em Londres | 17h00 UTC | 11h00 em Los Angeles' },
      { title: 'Entrega internacional', desc: '09h00 em Tóquio (UTC+9)', result: '01h00 em Brasília | 00h00 UTC do dia anterior' },
      { title: 'Suporte técnico', desc: '23h00 em São Paulo', result: '02h00 UTC+1 | 20h00 New York | 06h00 Dubai' },
    ]"
  >
    <!-- Horário atual -->
    <div class="glass-panel p-5 mb-5">
      <div class="text-center">
        <div class="text-xs text-gray-500 dark:text-slate-400 mb-1 uppercase tracking-wide">Horário Local Atual</div>
        <div class="text-4xl font-black text-gray-900 dark:text-white font-mono tracking-tight">{{ horaAtual }}</div>
        <div class="text-sm text-gray-500 dark:text-slate-400 mt-1 capitalize">{{ dataAtual }}</div>
      </div>
    </div>

    <!-- Formulário -->
    <div class="tool-body !mb-0">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="input-aurora-label">
            <i class="fas fa-calendar-alt mr-1.5 text-purple-500"></i>
            Data e Hora de Origem
          </label>
          <input
            v-model="dataHoraInput"
            type="datetime-local"
            class="input-aurora"
          />
        </div>
        <div>
          <label class="input-aurora-label">
            <i class="fas fa-globe mr-1.5 text-violet-500"></i>
            Fuso de Origem
          </label>
          <select v-model="fusoOrigem" class="input-aurora">
            <option v-for="fuso in fusos" :key="fuso.value" :value="fuso.value">{{ fuso.nome }}</option>
          </select>
        </div>
      </div>

      <div class="mt-4">
        <BaseButton variant="primary" icon="fa-sync-alt" @click="converter" class="w-full">
          Converter para Todos os Fusos
        </BaseButton>
      </div>
    </div>

    <!-- Resultados -->
    <Transition name="scale-in" appear>
      <div v-if="conversoes.length" class="mt-5 space-y-3">
        <div class="tool-header text-center py-5">
          <p class="text-sm text-blue-200 mb-1">Hora de Origem</p>
          <p class="text-4xl font-black text-white font-mono">{{ conversoes.find(c => c.fuso === fusoOrigem)?.hora || '—' }}</p>
          <p class="text-blue-200 text-sm mt-1">{{ fusos.find(f => f.value === fusoOrigem)?.nome }}</p>
        </div>

        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-globe-americas text-purple-500"></i>
            Horários ao redor do mundo
          </h4>
          <div class="space-y-2">
            <div
              v-for="conv in conversoes"
              :key="conv.fuso"
              :class="[
                'flex justify-between items-center p-3 rounded-xl transition-all',
                conv.fuso === fusoOrigem
                  ? 'bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800'
                  : 'bg-gray-50 dark:bg-slate-800/50 hover:bg-purple-50/50 dark:hover:bg-purple-900/10'
              ]"
            >
              <div>
                <div class="text-sm font-bold text-gray-900 dark:text-white">{{ conv.nome }}</div>
                <div class="text-xs text-gray-400 dark:text-slate-500">{{ conv.offset }}</div>
              </div>
              <div class="text-right">
                <div class="text-xl font-black font-mono text-purple-600 dark:text-purple-400">{{ conv.hora }}</div>
                <div class="text-xs text-gray-400 dark:text-slate-500">{{ conv.data }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="tip-card-success">
          <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">Horários calculados com base no fuso selecionado. Horários de verão podem alterar os offsets UTC.</span>
        </div>
      </div>
    </Transition>

    <div v-if="!conversoes.length" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500 mt-4">
      <i class="fas fa-clock text-3xl mb-3 opacity-30 block text-purple-400"></i>
      <p class="text-sm">Selecione uma data, horário e fuso de origem para converter</p>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import { ref, onMounted, onUnmounted } from 'vue'

const horaAtual    = ref('')
const dataAtual    = ref('')
const dataHoraInput = ref('')
const fusoOrigem   = ref('America/Sao_Paulo')
const conversoes   = ref([])

const fusos = [
  { nome: 'Brasil — São Paulo (UTC-3)',    value: 'America/Sao_Paulo'    },
  { nome: 'Brasil — Manaus (UTC-4)',       value: 'America/Manaus'       },
  { nome: 'Brasil — Rio Branco (UTC-5)',   value: 'America/Rio_Branco'   },
  { nome: 'Brasil — Noronha (UTC-2)',      value: 'America/Noronha'      },
  { nome: 'Nova York (UTC-5/-4)',          value: 'America/New_York'     },
  { nome: 'Los Angeles (UTC-8/-7)',        value: 'America/Los_Angeles'  },
  { nome: 'Londres (UTC+0/+1)',            value: 'Europe/London'        },
  { nome: 'Paris (UTC+1/+2)',              value: 'Europe/Paris'         },
  { nome: 'Dubai (UTC+4)',                 value: 'Asia/Dubai'           },
  { nome: 'Tóquio (UTC+9)',               value: 'Asia/Tokyo'           },
  { nome: 'Sydney (UTC+10/+11)',           value: 'Australia/Sydney'     },
  { nome: 'UTC',                           value: 'UTC'                  },
]

let intervalo = null

const atualizarHoraAtual = () => {
  const agora = new Date()
  horaAtual.value = agora.toLocaleTimeString('pt-BR')
  dataAtual.value = agora.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
}

const getOffset = (data, timeZone) => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })
    const parts = formatter.formatToParts(data)
    const tz = parts.find(p => p.type === 'timeZoneName')
    return tz ? tz.value : timeZone
  } catch { return timeZone }
}

const converter = () => {
  if (!dataHoraInput.value) {
    const agora = new Date()
    dataHoraInput.value = agora.toISOString().slice(0, 16)
  }
  const dataOrigem = new Date(dataHoraInput.value)
  conversoes.value = fusos.map(fuso => {
    const dataConv = new Date(dataOrigem.toLocaleString('en-US', { timeZone: fuso.value }))
    return {
      nome:   fuso.nome,
      fuso:   fuso.value,
      hora:   dataConv.toLocaleTimeString('pt-BR'),
      data:   dataConv.toLocaleDateString('pt-BR'),
      offset: getOffset(dataConv, fuso.value),
    }
  })
}

onMounted(() => {
  atualizarHoraAtual()
  intervalo = setInterval(atualizarHoraAtual, 1000)
  const agora = new Date()
  dataHoraInput.value = agora.toISOString().slice(0, 16)
})

onUnmounted(() => { if (intervalo) clearInterval(intervalo) })
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

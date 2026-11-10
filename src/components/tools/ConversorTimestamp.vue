<template>
  <ToolShell
    title="Conversor de Timestamp Unix"
    description="Converta timestamps Unix para datas legíveis e vice-versa. Exibe o timestamp atual em tempo real."
    icon="fa-clock-rotate-left"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Timestamp Unix em tempo real', 'Timestamp ↔ Data', 'Segundos e milissegundos']"
    :tips="[
      { title: 'O que é Unix Timestamp?', text: 'É o número de segundos decorridos desde 01/01/1970 00:00:00 UTC (Epoch). Não é afetado por fusos horários.', type: 'info' },
      { title: 'JavaScript usa ms', text: 'JavaScript usa milissegundos: Date.now() retorna ms. Divida por 1000 para obter segundos. PHP e C usam segundos.', type: 'warning' },
      { title: 'Bug do ano 2038', text: 'Sistemas 32-bit transbordam em 19/01/2038 às 03:14:07 UTC (máximo de int32 assinado). Sistemas 64-bit não têm esse problema.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Epoch zero', desc: '0 (timestamp Unix)', result: '01/01/1970 00:00:00 UTC — início do tempo Unix' },
      { title: 'Exemplo recente', desc: '1700000000 (timestamp)', result: '14/11/2023 22:13:20 (horário Brasília UTC-3)' },
      { title: 'Converter data', desc: '01/01/2025 00:00:00', result: 'Timestamp: 1735689600 | MS: 1735689600000' },
    ]"
  >

    <!-- Timestamp atual em tempo real -->
    <div class="glass-panel p-5 mb-5">
      <div class="text-center">
        <div class="text-xs text-gray-500 dark:text-slate-400 mb-2 uppercase tracking-wide">Timestamp Unix Atual</div>
        <div class="text-4xl font-black font-mono text-purple-600 dark:text-purple-400">{{ timestampAtual }}</div>
        <div class="text-xs text-gray-400 dark:text-slate-500 mt-1">segundos desde 01/01/1970 UTC</div>
        <div class="mt-3">
          <BaseButton variant="outline" size="xs" icon="fa-copy" @click="copiar(timestampAtual.toString())">
            Copiar timestamp
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Seletor de modo -->
    <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-4">
      <button
        @click="modo = 'timestamp-data'"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'timestamp-data' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-right mr-1.5"></i>Timestamp → Data
      </button>
      <button
        @click="modo = 'data-timestamp'"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'data-timestamp' ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-left mr-1.5"></i>Data → Timestamp
      </button>
    </div>

    <!-- Formulário -->
    <div class="tool-body !mb-0">
      <div v-if="modo === 'timestamp-data'">
        <BaseInput
          v-model="timestampInput"
          label="Timestamp Unix (segundos)"
          type="number"
          icon="fa-hashtag"
          placeholder="1700000000"
          tooltip="Digite um timestamp Unix em segundos. Timestamps em milissegundos (13 dígitos) são divididos por 1000 automaticamente."
          hint="Ex: 1700000000 (segundos) ou 1700000000000 (milissegundos)"
          @input="converterTimestampParaData"
        />
      </div>
      <div v-else>
        <label class="input-aurora-label">
          <i class="fas fa-calendar-alt mr-1.5 text-purple-500"></i>
          Data e Hora
        </label>
        <input
          v-model="dataInput"
          @input="converterDataParaTimestamp"
          type="datetime-local"
          class="input-aurora"
        />
        <p class="input-aurora-hint">Selecione a data e hora no fuso local do seu navegador</p>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in" appear>
      <div v-if="resultado" class="mt-5 space-y-4">
        <div class="tool-header text-center py-5">
          <p class="text-sm text-blue-200 mb-1">Data Completa</p>
          <p class="text-2xl font-black text-white">{{ resultado.dataCompleta }}</p>
          <div class="mt-3">
            <BaseButton variant="glass" size="sm" icon="fa-copy" @click="copiar(resultado.dataCompleta)">
              Copiar data
            </BaseButton>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
            <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ resultado.data }}</div>
            <div class="metric-glass-label">Data</div>
          </div>
          <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
            <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ resultado.hora }}</div>
            <div class="metric-glass-label">Hora</div>
          </div>
        </div>

        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-clock text-purple-500"></i>
            Formatos de Timestamp
          </h4>
          <div class="space-y-2">
            <div
              v-for="item in [
                { label: 'Timestamp (s)',  value: resultado.timestamp,   hint: 'PHP, Python, Unix' },
                { label: 'Timestamp (ms)', value: resultado.timestampMs, hint: 'JavaScript, Java' },
                { label: 'ISO 8601',       value: resultado.iso,         hint: 'Web, APIs REST' },
              ]"
              :key="item.label"
              class="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800/50"
            >
              <div>
                <div class="text-xs text-gray-500 dark:text-slate-400">{{ item.label }}</div>
                <div class="font-mono font-bold text-sm text-purple-600 dark:text-purple-400">{{ item.value }}</div>
                <div class="text-xs text-gray-400 dark:text-slate-500">{{ item.hint }}</div>
              </div>
              <BaseButton variant="ghost" size="xs" icon="fa-copy" @click="copiar(String(item.value))" tooltip="Copiar" />
            </div>
          </div>
        </div>

        <div class="tip-card-success">
          <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">Timestamps são independentes de fuso horário — representam o mesmo instante em todo o mundo.</span>
        </div>
      </div>
    </Transition>

    <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500 mt-4">
      <i class="fas fa-clock-rotate-left text-3xl mb-3 opacity-30 block text-purple-400"></i>
      <p class="text-sm">Digite um timestamp ou selecione uma data para converter</p>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import Swal from 'sweetalert2'

const modo            = ref('timestamp-data')
const timestampAtual  = ref(Math.floor(Date.now() / 1000))
const timestampInput  = ref('')
const dataInput       = ref('')
const resultado       = ref(null)

let intervalo = null

const buildResultado = (data, ts) => ({
  dataCompleta: data.toLocaleString('pt-BR'),
  data:         data.toLocaleDateString('pt-BR'),
  hora:         data.toLocaleTimeString('pt-BR'),
  timestamp:    ts,
  timestampMs:  ts * 1000,
  iso:          data.toISOString(),
})

const converterTimestampParaData = () => {
  let ts = Number(timestampInput.value)
  if (!ts || ts <= 0) { resultado.value = null; return }
  if (ts > 1e12) ts = Math.floor(ts / 1000) // milissegundos → segundos
  resultado.value = buildResultado(new Date(ts * 1000), ts)
}

const converterDataParaTimestamp = () => {
  if (!dataInput.value) { resultado.value = null; return }
  const data = new Date(dataInput.value)
  const ts   = Math.floor(data.getTime() / 1000)
  resultado.value = buildResultado(data, ts)
}

const copiar = async (texto) => {
  try {
    await navigator.clipboard.writeText(texto)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}

onMounted(() => {
  intervalo = setInterval(() => { timestampAtual.value = Math.floor(Date.now() / 1000) }, 1000)
})
onUnmounted(() => { if (intervalo) clearInterval(intervalo) })
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

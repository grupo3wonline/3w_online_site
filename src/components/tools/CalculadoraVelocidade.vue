<template>
  <ToolShell
    title="Calculadora de Velocidade"
    description="Calcule velocidade (V), distância (D) ou tempo (T) com conversão de unidades."
    icon="fa-gauge-high"
    icon-gradient="from-violet-500 to-purple-700"
    orb-color="purple"
    :quick-tips="['V = D ÷ T', 'D = V × T', 'T = D ÷ V']"
    :tips="[
      { title: 'Fórmulas principais', text: 'Velocidade (MRU): V = D/T · Distância: D = V×T · Tempo: T = D/V. Válido para Movimento Retilíneo Uniforme.' },
      { title: 'Unidades', text: '1 nó = 1,852 km/h (náutico) · 1 mph = 1,609 km/h · 1 m/s = 3,6 km/h.', type: 'info' },
      { title: 'Aceleração', text: 'Esta calculadora assume velocidade constante (MRU). Para aceleração use cinemática com MRU/MRUV.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Velocidade de viagem', desc: 'Percorreu 240 km em 3 horas', result: 'V = 80 km/h' },
      { title: 'Distância percorrida', desc: 'V = 120 km/h durante 2,5 horas', result: 'D = 300 km' },
      { title: 'Tempo de trajeto', desc: '540 km a 90 km/h', result: 'T = 6 horas' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <!-- Seleção do que calcular -->
          <div class="mb-4">
            <label class="input-aurora-label">
              <i class="fas fa-question-circle mr-1.5 text-violet-500"></i>
              O que deseja calcular?
            </label>
            <div class="grid grid-cols-3 gap-2 mt-2">
              <button
                v-for="op in opcoes"
                :key="op.id"
                @click="calculo = op.id; calculado = false"
                :class="['p-3 rounded-xl border-2 transition-all text-center', calculo === op.id ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30 shadow-md' : 'border-gray-200 dark:border-slate-700 hover:border-violet-300']"
              >
                <i :class="[op.icon, 'text-xl mb-1 block', calculo === op.id ? 'text-violet-600 dark:text-violet-400' : 'text-gray-400']"></i>
                <span :class="['text-xs font-medium', calculo === op.id ? 'text-violet-900 dark:text-violet-300' : 'text-gray-500']">{{ op.nome }}</span>
              </button>
            </div>
          </div>

          <!-- Campos -->
          <div class="glass-panel p-4 space-y-3">
            <div v-if="calculo === 'velocidade'" class="grid grid-cols-2 gap-3">
              <BaseInput v-model="distancia" label="Distância (km)" type="number" step="0.01" icon="fa-road" tooltip="Distância total percorrida em quilômetros." />
              <BaseInput v-model="tempo"     label="Tempo (horas)"  type="number" step="0.01" icon="fa-clock" tooltip="Duração em horas. Ex.: 1h30 = 1.5" />
            </div>
            <div v-else-if="calculo === 'distancia'" class="grid grid-cols-2 gap-3">
              <BaseInput v-model="velocidade" label="Velocidade (km/h)" type="number" step="0.01" icon="fa-gauge-high" tooltip="Velocidade média em km/h." />
              <BaseInput v-model="tempo"      label="Tempo (horas)"     type="number" step="0.01" icon="fa-clock" />
            </div>
            <div v-else class="grid grid-cols-2 gap-3">
              <BaseInput v-model="distancia"  label="Distância (km)"    type="number" step="0.01" icon="fa-road" />
              <BaseInput v-model="velocidade" label="Velocidade (km/h)"  type="number" step="0.01" icon="fa-gauge-high" />
            </div>
            <p class="text-xs text-gray-500 dark:text-slate-400 font-mono">
              V = D ÷ T  ·  D = V × T  ·  T = D ÷ V
            </p>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular {{ { velocidade: 'Velocidade', distancia: 'Distância', tempo: 'Tempo' }[calculo] }}
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
          <div v-if="calculado" class="space-y-4">
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ getTitulo() }}</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultadoFmt }}</p>
              <p class="text-violet-300 text-sm">{{ getUnidade() }}</p>
            </div>

            <!-- Os três valores -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
                <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ Number(velocidade).toFixed(2) }}</div>
                <div class="metric-glass-label">km/h</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ Number(distancia).toFixed(2) }}</div>
                <div class="metric-glass-label">km</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ Number(tempo).toFixed(2) }}</div>
                <div class="metric-glass-label">horas</div>
              </div>
            </div>

            <!-- Conversões -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-exchange-alt text-violet-500"></i>
                Conversões
              </h4>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div v-for="(conv, i) in conversoes" :key="i"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
                  <span class="text-gray-500 dark:text-slate-400">{{ conv.label }}</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ conv.valor }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Tempo em formato legível: <strong>{{ tempoFormatado }}</strong>
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!calculado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-gauge-high text-4xl mb-3 opacity-30 block text-violet-400"></i>
          <p class="text-sm">Escolha o que calcular e informe os valores</p>
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
import BaseInput from '@/components/tools/common/BaseInput.vue'

const opcoes = [
  { id: 'velocidade', nome: 'Velocidade', icon: 'fas fa-tachometer-alt' },
  { id: 'distancia',  nome: 'Distância',  icon: 'fas fa-road' },
  { id: 'tempo',      nome: 'Tempo',      icon: 'fas fa-clock' },
]

const calculo    = ref('velocidade')
const calculado  = ref(false)
const velocidade = ref(80)
const distancia  = ref(160)
const tempo      = ref(2)

const getTitulo  = () => ({ velocidade: 'Velocidade Média', distancia: 'Distância Percorrida', tempo: 'Tempo de Trajeto' }[calculo.value])
const getUnidade = () => ({ velocidade: 'km/h (quilômetros por hora)', distancia: 'quilômetros', tempo: 'horas' }[calculo.value])

const resultadoFmt = computed(() => {
  const v = { velocidade: Number(velocidade.value), distancia: Number(distancia.value), tempo: Number(tempo.value) }[calculo.value]
  return v.toFixed(2) + ' ' + ({ velocidade: 'km/h', distancia: 'km', tempo: 'h' }[calculo.value])
})

const tempoFormatado = computed(() => {
  const h = Number(tempo.value)
  const hh = Math.floor(h), mm = Math.round((h - hh) * 60)
  return mm > 0 ? `${hh}h ${mm}min` : `${hh}h`
})

const conversoes = computed(() => {
  const v = Number(velocidade.value)
  const d = Number(distancia.value)
  const t = Number(tempo.value)
  return [
    { label: 'Velocidade em m/s',     valor: (v / 3.6).toFixed(2) + ' m/s' },
    { label: 'Velocidade em mph',     valor: (v / 1.60934).toFixed(2) + ' mph' },
    { label: 'Velocidade em nós',     valor: (v / 1.852).toFixed(2) + ' kt' },
    { label: 'Distância em metros',   valor: (d * 1000).toLocaleString('pt-BR') + ' m' },
    { label: 'Distância em milhas',   valor: (d / 1.60934).toFixed(2) + ' mi' },
    { label: 'Tempo em minutos',      valor: Math.round(t * 60).toLocaleString('pt-BR') + ' min' },
  ]
})

const calcular = () => {
  switch (calculo.value) {
    case 'velocidade':
      if (!distancia.value || !tempo.value) { Swal.fire({ icon: 'warning', title: 'Informe distância e tempo', confirmButtonColor: '#2563eb' }); return }
      velocidade.value = Number(distancia.value) / Number(tempo.value); break
    case 'distancia':
      if (!velocidade.value || !tempo.value) { Swal.fire({ icon: 'warning', title: 'Informe velocidade e tempo', confirmButtonColor: '#2563eb' }); return }
      distancia.value = Number(velocidade.value) * Number(tempo.value); break
    case 'tempo':
      if (!distancia.value || !velocidade.value) { Swal.fire({ icon: 'warning', title: 'Informe distância e velocidade', confirmButtonColor: '#2563eb' }); return }
      tempo.value = Number(distancia.value) / Number(velocidade.value); break
  }
  calculado.value = true
}

const limpar = () => {
  velocidade.value = 80; distancia.value = 160; tempo.value = 2; calculado.value = false
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

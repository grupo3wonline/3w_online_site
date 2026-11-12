<template>
  <ToolShell
    title="Conversor de Velocidade"
    description="Converta entre km/h, m/s, mph, nós, Mach e pés por segundo. Com referências de velocidade do cotidiano."
    icon="fa-tachometer-alt"
    icon-gradient="from-blue-500 to-cyan-700"
    orb-color="blue"
    :quick-tips="['6 unidades de velocidade', 'Referências do cotidiano', 'Troca de sentido com 1 clique']"
    :tips="[
      { title: 'Mach e velocidade do som', text: 'Mach 1 ≈ 343 m/s (1.235 km/h) ao nível do mar a 20°C. Varia com temperatura, altitude e meio. Aviões supersônicos excedem Mach 1.', type: 'info' },
      { title: 'Nó náutico', text: '1 nó = 1 milha náutica por hora = 1,852 km/h. Usado em aviação e marinha. METAR e NOTAM usam nós para vento.', type: 'info' },
      { title: 'mph nos EUA', text: 'O sistema imperial usa mph (milhas por hora). 60 mph ≈ 96,56 km/h. Rodovias nos EUA costumam ter limite de 65–75 mph.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Avião comercial', desc: '900 km/h em Mach e mph', result: 'Mach 0,728 | 559 mph | 250 m/s | 486 knots' },
      { title: 'Limite de velocidade', desc: '110 km/h em mph', result: '68,35 mph (limite de rodovia no Brasil)' },
      { title: 'Velocidade do som', desc: '1 Mach em km/h e m/s', result: '1.235 km/h | 343 m/s | 667 knots' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-arrow-up mr-1.5 text-blue-500"></i>
                De (Unidade de origem)
              </label>
              <select v-model="unidadeOrigem" @change="converter" class="input-aurora">
                <option v-for="u in unidades" :key="u.codigo" :value="u.codigo">{{ u.nome }}</option>
              </select>
            </div>

            <BaseInput
              v-model="valorOrigem"
              label="Valor"
              type="number"
              step="0.1"
              icon="fa-tachometer-alt"
              placeholder="100"
              tooltip="Digite o valor na unidade de origem selecionada acima."
              hint="Aceita decimais (ex: 100.5, 1.5)"
              @input="converter"
            />

            <div class="flex justify-center">
              <BaseButton variant="secondary" size="sm" icon="fa-exchange-alt" @click="inverter" tooltip="Inverter as unidades">
                Inverter
              </BaseButton>
            </div>

            <div>
              <label class="input-aurora-label">
                <i class="fas fa-arrow-down mr-1.5 text-cyan-500"></i>
                Para (Unidade de destino)
              </label>
              <select v-model="unidadeDestino" @change="converter" class="input-aurora">
                <option v-for="u in unidades" :key="u.codigo" :value="u.codigo">{{ u.nome }}</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Referências -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-bookmark text-blue-500"></i>
            Referências de velocidade
          </h4>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="ref in referenciasVelocidade"
              :key="ref.nome"
              @click="usarReferencia(ref)"
              class="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all text-left"
            >
              <div class="text-xs text-gray-500 dark:text-slate-400 leading-tight">{{ ref.nome }}</div>
              <div class="font-bold text-blue-600 dark:text-blue-400 text-sm">{{ ref.valor }} {{ ref.unidade }}</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="valorDestino !== '0'" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Resultado</p>
              <p class="text-5xl font-black text-white font-mono">{{ valorDestino }}</p>
              <p class="text-blue-200 text-sm mt-2">{{ unidades.find(u => u.codigo === unidadeDestino)?.nome }}</p>
            </div>

            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-alt text-primary-500"></i>
                Todas as unidades
              </h4>
              <div class="space-y-1.5">
                <div
                  v-for="conv in conversoes"
                  :key="conv.unidade"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <span class="text-xs text-gray-500 dark:text-slate-400">{{ conv.nome }}</span>
                  <span class="font-bold text-sm text-sky-600 dark:text-sky-400 font-mono">{{ conv.valor }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs"><strong>{{ Number(valorOrigem).toLocaleString('pt-BR') }} {{ unidadeOrigem }}</strong> = <strong>{{ valorDestino }} {{ unidadeDestino }}</strong></span>
            </div>
          </div>
        </Transition>

        <div v-if="valorDestino === '0'" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-tachometer-alt text-3xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Informe um valor ou clique em uma referência para converter</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import { ref } from 'vue'

const unidadeOrigem  = ref('kmh')
const unidadeDestino = ref('mph')
const valorOrigem    = ref(100)
const valorDestino   = ref('0')
const conversoes     = ref([])

const unidades = [
  { codigo: 'ms',   nome: 'Metro/segundo (m/s)',   paraMS: 1        },
  { codigo: 'kmh',  nome: 'Quilômetro/hora (km/h)', paraMS: 0.277778 },
  { codigo: 'mph',  nome: 'Milha/hora (mph)',       paraMS: 0.44704  },
  { codigo: 'fps',  nome: 'Pé/segundo (ft/s)',     paraMS: 0.3048   },
  { codigo: 'knot', nome: 'Nó (knot)',              paraMS: 0.514444 },
  { codigo: 'mach', nome: 'Mach',                   paraMS: 343      },
]

const referenciasVelocidade = [
  { nome: 'Pessoa caminhando', valor: 5,    unidade: 'km/h' },
  { nome: 'Ciclista',          valor: 25,   unidade: 'km/h' },
  { nome: 'Limite urbano',     valor: 60,   unidade: 'km/h' },
  { nome: 'Rodovia',           valor: 110,  unidade: 'km/h' },
  { nome: 'Trem de alta vel.', valor: 300,  unidade: 'km/h' },
  { nome: 'Avião comercial',   valor: 900,  unidade: 'km/h' },
  { nome: 'Velocidade do som', valor: 1235, unidade: 'km/h' },
  { nome: 'Órbita (ISS)',      valor: 27600, unidade: 'km/h' },
]

const fmtValor = (v) => {
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 0.001 && v !== 0)) return v.toExponential(4)
  return v.toPrecision(6).replace(/\.?0+$/, '')
}

const calcularValor = (valor, de, para) => {
  const uDe   = unidades.find(u => u.codigo === de)
  const uPara = unidades.find(u => u.codigo === para)
  if (!uDe || !uPara) return '0'
  return fmtValor((valor * uDe.paraMS) / uPara.paraMS)
}

const converter = () => {
  const v = Number(valorOrigem.value) || 0
  valorDestino.value = calcularValor(v, unidadeOrigem.value, unidadeDestino.value)
  conversoes.value   = unidades
    .filter(u => u.codigo !== unidadeOrigem.value)
    .map(u => ({ unidade: u.codigo, nome: u.nome, valor: calcularValor(v, unidadeOrigem.value, u.codigo) }))
}

const inverter = () => {
  const temp = unidadeOrigem.value
  unidadeOrigem.value  = unidadeDestino.value
  unidadeDestino.value = temp
  converter()
}

const usarReferencia = (ref) => {
  unidadeOrigem.value = 'kmh'
  valorOrigem.value   = ref.valor
  converter()
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

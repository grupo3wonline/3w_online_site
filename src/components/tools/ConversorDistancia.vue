<template>
  <ToolShell
    title="Conversor de Distância"
    description="Converta entre metros, quilômetros, milhas, pés, jardas, polegadas e milhas náuticas com precisão."
    icon="fa-ruler"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['9 unidades suportadas', 'Conversão ao digitar', 'Troca de sentido com 1 clique']"
    :tips="[
      { title: 'Sistema Métrico vs Imperial', text: '1 milha = 1,609344 km. 1 pé = 30,48 cm. 1 polegada = 2,54 cm. 1 jarda = 0,9144 m.', type: 'info' },
      { title: 'Milha Náutica', text: '1 milha náutica (nmi) = 1.852 metros, definida como 1 minuto de latitude. Usada em aviação e marinha.', type: 'info' },
      { title: 'Precisão', text: 'Para valores muito grandes ou muito pequenos, o resultado é exibido em notação científica (ex: 1.23e+6).', type: 'warning' },
    ]"
    :examples="[
      { title: 'Maratona', desc: '42,195 km em milhas', result: '26,219 mi (a distância oficial de uma maratona)' },
      { title: 'Altura média', desc: '1,75 m em pés e polegadas', result: '5,741 pés = 5 pés e 8,9 polegadas' },
      { title: 'Distância aérea', desc: '1 milha náutica em metros', result: '1.852 m = 1,852 km' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <!-- De -->
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
              step="0.001"
              icon="fa-ruler-horizontal"
              placeholder="1"
              tooltip="Digite o valor na unidade de origem selecionada acima."
              hint="Aceita decimais (ex: 1.5, 0.001)"
              @input="converter"
            />

            <!-- Botão troca -->
            <div class="flex justify-center">
              <BaseButton variant="secondary" size="sm" icon="fa-exchange-alt" @click="inverter" tooltip="Trocar unidades de origem e destino">
                Inverter
              </BaseButton>
            </div>

            <!-- Para -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-arrow-down mr-1.5 text-indigo-500"></i>
                Para (Unidade de destino)
              </label>
              <select v-model="unidadeDestino" @change="converter" class="input-aurora">
                <option v-for="u in unidades" :key="u.codigo" :value="u.codigo">{{ u.nome }}</option>
              </select>
            </div>
          </div>

          <!-- Conversões rápidas -->
          <div class="mt-4">
            <p class="input-aurora-label mb-2">
              <i class="fas fa-bolt mr-1.5 text-blue-500"></i>Conversões rápidas
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="conv in conversoesRapidas"
                :key="conv.de + conv.para"
                @click="usarConversao(conv)"
                class="p-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all text-left"
              >
                <span class="text-xs font-bold text-blue-600 dark:text-blue-400">{{ conv.de }} → {{ conv.para }}</span>
              </button>
            </div>
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
                Todas as conversões
              </h4>
              <div class="space-y-1.5">
                <div
                  v-for="conv in conversoes"
                  :key="conv.unidade"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <span class="text-xs text-gray-500 dark:text-slate-400">{{ conv.nome }}</span>
                  <span class="font-bold text-sm text-blue-600 dark:text-blue-400 font-mono">{{ conv.valor }}</span>
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
          <i class="fas fa-ruler text-3xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Informe um valor acima para ver as conversões de distância</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import { ref } from 'vue'

const unidadeOrigem  = ref('m')
const unidadeDestino = ref('ft')
const valorOrigem    = ref(1)
const valorDestino   = ref('0')
const conversoes     = ref([])

const unidades = [
  { codigo: 'mm',  nome: 'Milímetro (mm)',        paraMetros: 0.001    },
  { codigo: 'cm',  nome: 'Centímetro (cm)',        paraMetros: 0.01     },
  { codigo: 'm',   nome: 'Metro (m)',              paraMetros: 1        },
  { codigo: 'km',  nome: 'Quilômetro (km)',        paraMetros: 1000     },
  { codigo: 'in',  nome: 'Polegada (in)',          paraMetros: 0.0254   },
  { codigo: 'ft',  nome: 'Pé (ft)',               paraMetros: 0.3048   },
  { codigo: 'yd',  nome: 'Jarda (yd)',             paraMetros: 0.9144   },
  { codigo: 'mi',  nome: 'Milha (mi)',             paraMetros: 1609.34  },
  { codigo: 'nmi', nome: 'Milha náutica (nmi)',    paraMetros: 1852     },
]

const conversoesRapidas = [
  { de: 'm',  para: 'ft'  },
  { de: 'km', para: 'mi'  },
  { de: 'cm', para: 'in'  },
  { de: 'ft', para: 'm'   },
]

const fmtValor = (v) => {
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 0.001 && v !== 0)) return v.toExponential(4)
  return v.toPrecision(6).replace(/\.?0+$/, '')
}

const calcularValor = (valor, de, para) => {
  const uDe   = unidades.find(u => u.codigo === de)
  const uPara = unidades.find(u => u.codigo === para)
  if (!uDe || !uPara) return '0'
  const metros = valor * uDe.paraMetros
  const result = metros / uPara.paraMetros
  return fmtValor(result)
}

const converter = () => {
  const valor = Number(valorOrigem.value) || 0
  valorDestino.value = calcularValor(valor, unidadeOrigem.value, unidadeDestino.value)
  conversoes.value = unidades
    .filter(u => u.codigo !== unidadeOrigem.value)
    .map(u => ({ unidade: u.codigo, nome: u.nome, valor: calcularValor(valor, unidadeOrigem.value, u.codigo) }))
}

const inverter = () => {
  const temp = unidadeOrigem.value
  unidadeOrigem.value  = unidadeDestino.value
  unidadeDestino.value = temp
  converter()
}

const usarConversao = (c) => {
  unidadeOrigem.value  = c.de
  unidadeDestino.value = c.para
  converter()
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

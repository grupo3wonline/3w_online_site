<template>
  <ToolShell
    title="Conversor de Peso e Massa"
    description="Converta entre kg, g, mg, libras, onças, toneladas e mais unidades de massa com precisão científica."
    icon="fa-weight-hanging"
    icon-gradient="from-yellow-500 to-orange-600"
    orb-color="orange"
    :quick-tips="['9 unidades de massa', 'Sistema Métrico e Imperial', 'Troca de sentido com 1 clique']"
    :tips="[
      { title: 'Libra vs Quilograma', text: '1 kg = 2,20462 lb. 1 lb = 453,592 g. Libras são usadas nos EUA e Grã-Bretanha. Quilogramas são o padrão do SI.', type: 'info' },
      { title: 'Onça troy vs avoirdupois', text: '1 onça comum (oz) = 28,3495 g. 1 onça troy (ozt) = 31,1035 g. A onça troy é usada para metais preciosos (ouro, prata).', type: 'warning' },
      { title: 'Stone britânico', text: '1 stone (st) = 14 libras = 6,35 kg. Usado no Reino Unido para peso corporal.', type: 'info' },
    ]"
    :examples="[
      { title: 'Bagagem aérea', desc: '23 kg em libras', result: '50,706 lb (limite comum em voos internacionais)' },
      { title: 'Ouro fino', desc: '1 troy ounce em gramas', result: '31,1035 g (padrão do mercado de commodities)' },
      { title: 'Recém-nascido', desc: '3,5 kg em lb e oz', result: '7,716 lb = 7 libras e 11,46 onças' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-arrow-up mr-1.5 text-yellow-500"></i>
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
              icon="fa-scale-balanced"
              placeholder="1"
              tooltip="Digite o valor na unidade de origem selecionada acima."
              hint="Aceita decimais (ex: 1.5, 0.001)"
              @input="converter"
            />

            <div class="flex justify-center">
              <BaseButton variant="warning" size="sm" icon="fa-exchange-alt" @click="inverter" tooltip="Inverter as unidades">
                Inverter
              </BaseButton>
            </div>

            <div>
              <label class="input-aurora-label">
                <i class="fas fa-arrow-down mr-1.5 text-orange-500"></i>
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
              <i class="fas fa-bolt mr-1.5 text-yellow-500"></i>Conversões rápidas
            </p>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="conv in conversoesRapidas"
                :key="conv.de + conv.para"
                @click="usarConversao(conv)"
                class="p-2 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-yellow-400 dark:hover:border-yellow-600 hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-all text-left"
              >
                <span class="text-xs font-bold text-yellow-600 dark:text-yellow-400">{{ conv.de }} → {{ conv.para }}</span>
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
                Todas as unidades
              </h4>
              <div class="space-y-1.5">
                <div
                  v-for="conv in conversoes"
                  :key="conv.unidade"
                  class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <span class="text-xs text-gray-500 dark:text-slate-400">{{ conv.nome }}</span>
                  <span class="font-bold text-sm text-yellow-600 dark:text-yellow-400 font-mono">{{ conv.valor }}</span>
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
          <i class="fas fa-weight-hanging text-3xl mb-3 opacity-30 block text-yellow-400"></i>
          <p class="text-sm">Informe um valor acima para ver as conversões de peso e massa</p>
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

const unidadeOrigem  = ref('kg')
const unidadeDestino = ref('lb')
const valorOrigem    = ref(1)
const valorDestino   = ref('0')
interface ConversaoItem { unidade: string; nome: string; valor: string }
const conversoes     = ref<ConversaoItem[]>([])

const unidades = [
  { codigo: 'mg',     nome: 'Miligrama (mg)',    paraGramas: 0.001     },
  { codigo: 'g',      nome: 'Grama (g)',          paraGramas: 1         },
  { codigo: 'kg',     nome: 'Quilograma (kg)',    paraGramas: 1000      },
  { codigo: 't',      nome: 'Tonelada (t)',       paraGramas: 1000000   },
  { codigo: 'oz',     nome: 'Onça (oz)',          paraGramas: 28.3495   },
  { codigo: 'lb',     nome: 'Libra (lb)',         paraGramas: 453.592   },
  { codigo: 'st',     nome: 'Stone (st)',         paraGramas: 6350.29   },
  { codigo: 'ton-us', nome: 'Tonelada US',        paraGramas: 907185    },
  { codigo: 'ton-uk', nome: 'Tonelada UK',        paraGramas: 1016047   },
]

const conversoesRapidas = [
  { de: 'kg', para: 'lb'  },
  { de: 'g',  para: 'oz'  },
  { de: 'lb', para: 'kg'  },
  { de: 't',  para: 'kg'  },
]

const fmtValor = (v: number) => {
  if (Math.abs(v) >= 1e6 || (Math.abs(v) < 0.0001 && v !== 0)) return v.toExponential(4)
  return v.toPrecision(6).replace(/\.?0+$/, '')
}

const calcularValor = (valor: number, de: string, para: string) => {
  const uDe   = unidades.find(u => u.codigo === de)
  const uPara = unidades.find(u => u.codigo === para)
  if (!uDe || !uPara) return '0'
  return fmtValor((valor * uDe.paraGramas) / uPara.paraGramas)
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

const usarConversao = (c: { de: string; para: string }) => {
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


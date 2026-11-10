<template>
  <ToolShell
    title="Conversor de Volume"
    description="Converta entre litros, mililitros, m³, galões, pints, onças fluidas e muito mais com precisão."
    icon="fa-flask"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['10 unidades', 'Conversão ao digitar', 'Referências rápidas']"
    :tips="[
      { title: 'Sistema Métrico vs Imperial', text: '1 galão americano = 3,785 litros | 1 pint = 0,473 litros | 1 fl oz = 29,57 mL.' },
      { title: 'Culinária', text: '1 xícara (cup) = 240 mL | 1 colher de sopa (tbsp) = 15 mL | 1 colher de chá (tsp) = 5 mL.', type: 'info' },
      { title: 'Dica de precisão', text: 'Para valores muito pequenos ou muito grandes, o resultado é exibido em notação científica.', type: 'warning' },
    ]"
    :examples="[
      { title: '1 litro em mililitros', desc: '1 L', result: '1.000 mL' },
      { title: '1 galão em litros', desc: '1 gal (US)', result: '3,785 L' },
      { title: '1 m³ em litros', desc: '1 m³', result: '1.000 L' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="tool-body !mb-0 space-y-4">
        <div>
          <label class="input-aurora-label">
            <i class="fas fa-flask mr-1.5 text-teal-500"></i>
            De
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
          icon="fa-hashtag"
          placeholder="0"
          tooltip="Digite o valor que deseja converter."
          @input="converter"
        />

        <div>
          <label class="input-aurora-label">
            <i class="fas fa-arrow-down mr-1.5 text-cyan-500"></i>
            Para
          </label>
          <select v-model="unidadeDestino" @change="converter" class="input-aurora">
            <option v-for="u in unidades" :key="u.codigo" :value="u.codigo">{{ u.nome }}</option>
          </select>
        </div>

        <div class="flex gap-3">
          <BaseButton variant="success" icon="fa-exchange-alt" @click="inverter" class="flex-1">
            Inverter
          </BaseButton>
          <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
            Limpar
          </BaseButton>
        </div>

        <!-- Conversões rápidas -->
        <div>
          <p class="input-aurora-label mb-2">
            <i class="fas fa-bolt mr-1.5 text-teal-500"></i>
            Conversões rápidas
          </p>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="conv in conversoesRapidas"
              :key="conv.de + conv.para"
              @click="usarConversao(conv)"
              class="p-2.5 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-teal-400 dark:hover:border-teal-600 hover:bg-teal-50/50 dark:hover:bg-teal-900/10 transition-all text-left"
            >
              <span class="text-xs text-gray-700 dark:text-slate-200 font-semibold">{{ conv.de }} → {{ conv.para }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="valorOrigem !== '' && valorOrigem !== null" class="space-y-4">
            <!-- Resultado principal -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">Resultado</p>
              <p class="text-5xl font-black text-white mb-2">{{ valorDestino }}</p>
              <p class="text-teal-300 text-sm font-semibold">{{ getNomeUnidade(unidadeDestino) }}</p>
            </div>

            <!-- Todas as conversões -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list text-teal-500"></i>
                Conversões simultâneas
              </h4>
              <div class="space-y-2">
                <div
                  v-for="conv in conversoes"
                  :key="conv.unidade"
                  class="flex justify-between items-center py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0"
                >
                  <span class="text-xs text-gray-500 dark:text-slate-400">{{ conv.nome }}</span>
                  <span class="font-bold text-sm text-teal-700 dark:text-teal-300 font-mono">{{ conv.valor }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card">
              <i class="fas fa-info-circle text-teal-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Conversão de <strong>{{ getNomeUnidade(unidadeOrigem) }}</strong> para <strong>{{ getNomeUnidade(unidadeDestino) }}</strong>:
                fator {{ getFator(unidadeOrigem, unidadeDestino).toFixed(6) }}
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="valorOrigem === '' || valorOrigem === null" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-flask text-3xl mb-3 opacity-30 block text-teal-400"></i>
          <p class="text-sm">Digite um valor para converter</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const unidadeOrigem  = ref('L')
const unidadeDestino = ref('gal')
const valorOrigem    = ref<number | ''>(1)
const valorDestino   = ref('0')
const conversoes     = ref([])

const unidades = [
  { codigo: 'mL',   nome: 'Mililitro (mL)',         paraLitros: 0.001 },
  { codigo: 'L',    nome: 'Litro (L)',               paraLitros: 1 },
  { codigo: 'm3',   nome: 'Metro cúbico (m³)',       paraLitros: 1000 },
  { codigo: 'cm3',  nome: 'Centímetro cúbico (cm³)', paraLitros: 0.001 },
  { codigo: 'tsp',  nome: 'Colher de chá (tsp)',     paraLitros: 0.00493 },
  { codigo: 'tbsp', nome: 'Colher de sopa (tbsp)',   paraLitros: 0.01479 },
  { codigo: 'floz', nome: 'Onça fluida (fl oz)',     paraLitros: 0.02957 },
  { codigo: 'cup',  nome: 'Xícara (cup)',            paraLitros: 0.2366 },
  { codigo: 'pt',   nome: 'Pint (pt)',               paraLitros: 0.4732 },
  { codigo: 'gal',  nome: 'Galão EUA (gal)',         paraLitros: 3.7854 },
]

const conversoesRapidas = [
  { de: 'L', para: 'mL' }, { de: 'L', para: 'gal' },
  { de: 'mL', para: 'floz' }, { de: 'cup', para: 'mL' },
  { de: 'm3', para: 'L' }, { de: 'pt', para: 'L' },
]

const getNomeUnidade = (codigo) => unidades.find(u => u.codigo === codigo)?.nome || codigo

const calcularValor = (valor, de, para) => {
  const uDe   = unidades.find(u => u.codigo === de)
  const uPara = unidades.find(u => u.codigo === para)
  if (!uDe || !uPara) return '0'
  const litros    = valor * uDe.paraLitros
  const resultado = litros / uPara.paraLitros
  if (resultado >= 1000 || (resultado < 0.01 && resultado > 0)) return resultado.toExponential(3)
  return resultado.toFixed(4).replace(/\.?0+$/, '') || '0'
}

const getFator = (de, para) => {
  const uDe   = unidades.find(u => u.codigo === de)
  const uPara = unidades.find(u => u.codigo === para)
  if (!uDe || !uPara) return 1
  return uDe.paraLitros / uPara.paraLitros
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
  unidadeOrigem.value = unidadeDestino.value
  unidadeDestino.value = temp
  converter()
}

const usarConversao = (conv) => {
  unidadeOrigem.value  = conv.de
  unidadeDestino.value = conv.para
  converter()
}

const limpar = () => {
  valorOrigem.value = ''
  valorDestino.value = '0'
  conversoes.value = []
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

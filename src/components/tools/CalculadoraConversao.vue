<template>
  <ToolShell
    title="Conversor de Unidades"
    description="Converta entre as principais unidades de medida: comprimento, peso, volume, temperatura e mais."
    icon="fa-arrows-rotate"
    icon-gradient="from-cyan-500 to-teal-700"
    orb-color="cyan"
    :quick-tips="['8 categorias', 'Conversão em tempo real', 'Referências rápidas']"
    :tips="[
      { title: 'Comprimento', text: '1 pé = 30,48 cm | 1 polegada = 2,54 cm | 1 milha = 1,609 km.' },
      { title: 'Peso', text: '1 libra = 0,453592 kg | 1 onça = 28,35 g.', type: 'info' },
      { title: 'Temperatura', text: '°F = (°C × 9/5) + 32 | K = °C + 273,15. Zero absoluto = −273,15°C.', type: 'info' },
    ]"
    :examples="[
      { title: 'Distância', desc: '100 km em milhas', result: '62,14 mi' },
      { title: 'Peso', desc: '70 kg em libras', result: '154,32 lb' },
      { title: 'Temperatura', desc: '36,5°C em Fahrenheit', result: '97,7°F' },
    ]"
  >
    <div class="space-y-5">
      <!-- Seleção de Categoria -->
      <div class="glass-panel p-4">
        <label class="input-aurora-label mb-3">
          <i class="fas fa-th-large mr-1.5 text-cyan-500"></i>
          Categoria
        </label>
        <div class="grid grid-cols-4 gap-2">
          <button
            v-for="cat in categorias"
            :key="cat.id"
            @click="categoriaSelecionada = cat.id"
            :class="['p-3 rounded-xl font-medium transition-all text-xs text-center', categoriaSelecionada === cat.id ? 'bg-cyan-600 text-white shadow-md' : 'bg-gray-50 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20']"
          >
            <i :class="[cat.icon, 'text-lg block mb-1']"></i>
            {{ cat.nome }}
          </button>
        </div>
      </div>

      <!-- Valor e Unidades -->
      <div class="tool-body space-y-4">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <BaseInput
            v-model="valor"
            label="Valor"
            type="number"
            step="any"
            icon="fa-hashtag"
            @input="converter"
          />
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-arrow-right text-cyan-600 dark:text-cyan-400 mr-1.5"></i>
              De
            </label>
            <select v-model="unidadeOrigem" @change="converter" class="input-aurora">
              <option v-for="unidade in unidadesDisponiveis" :key="unidade.id" :value="unidade.id">
                {{ unidade.nome }} ({{ unidade.simbolo }})
              </option>
            </select>
          </div>
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-arrow-left text-cyan-600 dark:text-cyan-400 mr-1.5"></i>
              Para
            </label>
            <select v-model="unidadeDestino" @change="converter" class="input-aurora">
              <option v-for="unidade in unidadesDisponiveis" :key="unidade.id" :value="unidade.id">
                {{ unidade.nome }} ({{ unidade.simbolo }})
              </option>
            </select>
          </div>
        </div>

        <div class="flex gap-3">
          <BaseButton variant="outline" icon="fa-repeat" @click="trocarUnidades" class="flex-1">
            Inverter Unidades
          </BaseButton>
          <BaseButton variant="outline" icon="fa-eraser" @click="limpar" />
        </div>
      </div>

      <!-- Resultado Principal -->
      <Transition name="scale-in">
        <div v-if="resultado" class="space-y-4">
          <div class="tool-header text-center py-7">
            <p class="text-sm text-blue-200 mb-1">Resultado</p>
            <p class="text-5xl font-black text-white mb-2">{{ resultado.valor }}</p>
            <p class="text-cyan-300 text-sm font-semibold">{{ resultado.unidade }}</p>
          </div>

          <!-- Conversões Rápidas -->
          <div v-if="conversoesRapidas.length > 0" class="glass-panel p-4">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <i class="fas fa-bolt text-cyan-500"></i>
              Conversões Rápidas
            </h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <div
                v-for="(conv, index) in conversoesRapidas"
                :key="index"
                class="flex justify-between items-center px-3 py-2 rounded-lg bg-white dark:bg-slate-700 border border-gray-100 dark:border-slate-600"
              >
                <span class="text-xs text-gray-600 dark:text-gray-300">{{ conv.nome }}</span>
                <span class="font-bold text-sm text-cyan-600 dark:text-cyan-400">{{ conv.valor }}</span>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
        <i class="fas fa-arrows-rotate text-4xl mb-3 opacity-30 block text-cyan-400"></i>
        <p class="text-sm">Selecione a categoria, insira um valor e escolha as unidades</p>
      </div>

      <div class="tip-card">
        <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
        <span class="text-xs">Os valores são convertidos em tempo real conforme você digita.</span>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, watch } from 'vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const categorias = [
  { id: 'comprimento', nome: 'Comprimento', icon: 'fas fa-ruler' },
  { id: 'peso',        nome: 'Peso',         icon: 'fas fa-weight-hanging' },
  { id: 'temperatura', nome: 'Temperatura',  icon: 'fas fa-temperature-half' },
  { id: 'volume',      nome: 'Volume',        icon: 'fas fa-flask' },
  { id: 'area',        nome: 'Área',          icon: 'fas fa-vector-square' },
  { id: 'velocidade',  nome: 'Velocidade',   icon: 'fas fa-gauge-high' },
  { id: 'tempo',       nome: 'Tempo',         icon: 'fas fa-clock' },
  { id: 'dados',       nome: 'Dados',         icon: 'fas fa-database' },
]

const unidades = {
  comprimento: [
    { id: 'mm', nome: 'Milímetros', simbolo: 'mm', fator: 0.001 },
    { id: 'cm', nome: 'Centímetros', simbolo: 'cm', fator: 0.01 },
    { id: 'm',  nome: 'Metros',      simbolo: 'm',  fator: 1 },
    { id: 'km', nome: 'Quilômetros', simbolo: 'km', fator: 1000 },
    { id: 'in', nome: 'Polegadas',   simbolo: 'in', fator: 0.0254 },
    { id: 'ft', nome: 'Pés',         simbolo: 'ft', fator: 0.3048 },
    { id: 'yd', nome: 'Jardas',      simbolo: 'yd', fator: 0.9144 },
    { id: 'mi', nome: 'Milhas',      simbolo: 'mi', fator: 1609.34 },
  ],
  peso: [
    { id: 'mg', nome: 'Miligramas',   simbolo: 'mg', fator: 0.000001 },
    { id: 'g',  nome: 'Gramas',       simbolo: 'g',  fator: 0.001 },
    { id: 'kg', nome: 'Quilogramas',  simbolo: 'kg', fator: 1 },
    { id: 't',  nome: 'Toneladas',    simbolo: 't',  fator: 1000 },
    { id: 'oz', nome: 'Onças',        simbolo: 'oz', fator: 0.0283495 },
    { id: 'lb', nome: 'Libras',       simbolo: 'lb', fator: 0.453592 },
  ],
  temperatura: [
    { id: 'c', nome: 'Celsius',    simbolo: '°C' },
    { id: 'f', nome: 'Fahrenheit', simbolo: '°F' },
    { id: 'k', nome: 'Kelvin',     simbolo: 'K'  },
  ],
  volume: [
    { id: 'ml',    nome: 'Mililitros',    simbolo: 'ml',    fator: 0.001 },
    { id: 'l',     nome: 'Litros',        simbolo: 'L',     fator: 1 },
    { id: 'm3',    nome: 'Metros Cúbicos', simbolo: 'm³',   fator: 1000 },
    { id: 'gal',   nome: 'Galões (US)',   simbolo: 'gal',   fator: 3.78541 },
    { id: 'oz-fl', nome: 'Onças Fluidas', simbolo: 'fl oz', fator: 0.0295735 },
  ],
  area: [
    { id: 'mm2', nome: 'Milímetros²',    simbolo: 'mm²', fator: 0.000001 },
    { id: 'm2',  nome: 'Metros²',        simbolo: 'm²',  fator: 1 },
    { id: 'km2', nome: 'Quilômetros²',   simbolo: 'km²', fator: 1000000 },
    { id: 'ha',  nome: 'Hectares',       simbolo: 'ha',  fator: 10000 },
    { id: 'ft2', nome: 'Pés²',           simbolo: 'ft²', fator: 0.092903 },
    { id: 'ac',  nome: 'Acres',          simbolo: 'ac',  fator: 4046.86 },
  ],
  velocidade: [
    { id: 'mps',  nome: 'Metros/segundo', simbolo: 'm/s',  fator: 1 },
    { id: 'kmh',  nome: 'Km/hora',        simbolo: 'km/h', fator: 0.277778 },
    { id: 'mph',  nome: 'Milhas/hora',    simbolo: 'mph',  fator: 0.44704 },
    { id: 'knot', nome: 'Nós',            simbolo: 'kn',   fator: 0.514444 },
  ],
  tempo: [
    { id: 'ms',  nome: 'Milissegundos', simbolo: 'ms',  fator: 0.001 },
    { id: 's',   nome: 'Segundos',      simbolo: 's',   fator: 1 },
    { id: 'min', nome: 'Minutos',       simbolo: 'min', fator: 60 },
    { id: 'h',   nome: 'Horas',         simbolo: 'h',   fator: 3600 },
    { id: 'd',   nome: 'Dias',          simbolo: 'd',   fator: 86400 },
    { id: 'sem', nome: 'Semanas',       simbolo: 'sem', fator: 604800 },
  ],
  dados: [
    { id: 'b',  nome: 'Bytes',     simbolo: 'B',  fator: 1 },
    { id: 'kb', nome: 'Kilobytes', simbolo: 'KB', fator: 1024 },
    { id: 'mb', nome: 'Megabytes', simbolo: 'MB', fator: 1048576 },
    { id: 'gb', nome: 'Gigabytes', simbolo: 'GB', fator: 1073741824 },
    { id: 'tb', nome: 'Terabytes', simbolo: 'TB', fator: 1099511627776 },
  ],
}

const categoriaSelecionada = ref('comprimento')
interface ResultadoConversao { valor: string; unidade: string | undefined }

const valor          = ref(1)
const unidadeOrigem  = ref('m')
const unidadeDestino = ref('km')
const resultado      = ref<ResultadoConversao | null>(null)

const unidadesDisponiveis = computed(() => unidades[categoriaSelecionada.value as keyof typeof unidades])

type UnidadeItem = { id: string; nome: string; simbolo: string; fator?: number }

const conversoesRapidas = computed(() => {
  if (!valor.value || !resultado.value) return []
  return (unidadesDisponiveis.value as UnidadeItem[])
    .filter((u: UnidadeItem) => u.id !== unidadeOrigem.value)
    .slice(0, 6)
    .map((unidade: UnidadeItem) => ({
      nome: unidade.simbolo,
      valor: converterValor(Number(valor.value), unidadeOrigem.value, unidade.id),
    }))
})

watch(categoriaSelecionada, () => {
  unidadeOrigem.value = unidadesDisponiveis.value[0].id
  unidadeDestino.value = unidadesDisponiveis.value[1]?.id || unidadesDisponiveis.value[0].id
  converter()
})

const converterValor = (val: number, origem: string, destino: string) => {
  if (categoriaSelecionada.value === 'temperatura') return converterTemperatura(val, origem, destino)
  const unidOrigem  = unidadesDisponiveis.value.find((u: { id: string }) => u.id === origem)
  const unidDestino = unidadesDisponiveis.value.find((u: { id: string }) => u.id === destino)
  if (!unidOrigem || !unidDestino || !('fator' in unidOrigem) || !('fator' in unidDestino)) return '0'
  const valorBase = val * (unidOrigem as { fator: number }).fator
  return (valorBase / (unidDestino as { fator: number }).fator).toLocaleString('pt-BR', { maximumFractionDigits: 6 })
}

const converterTemperatura = (val: number, origem: string, destino: string) => {
  let celsius = 0
  if (origem === 'c') celsius = val
  else if (origem === 'f') celsius = (val - 32) * 5 / 9
  else if (origem === 'k') celsius = val - 273.15

  let res = 0
  if (destino === 'c') res = celsius
  else if (destino === 'f') res = celsius * 9 / 5 + 32
  else if (destino === 'k') res = celsius + 273.15

  return res.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

const converter = () => {
  if (!valor.value) { resultado.value = null; return }
  const unidDestino = unidadesDisponiveis.value.find((u: { id: string }) => u.id === unidadeDestino.value)
  resultado.value = {
    valor: converterValor(Number(valor.value), unidadeOrigem.value, unidadeDestino.value),
    unidade: unidDestino?.nome,
  }
}

const trocarUnidades = () => {
  const temp = unidadeOrigem.value
  unidadeOrigem.value = unidadeDestino.value
  unidadeDestino.value = temp
  converter()
}

const limpar = () => {
  valor.value = 1
  resultado.value = null
  converter()
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

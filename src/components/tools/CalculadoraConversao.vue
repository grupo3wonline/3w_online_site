<template>
  <div class="max-w-5xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-arrows-rotate text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Calculadora de Conversão de Unidades</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta entre diferentes unidades de medida</p>
      </div>

      <div class="space-y-6">
        <!-- Seleção de Categoria -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            v-for="cat in categorias"
            :key="cat.id"
            @click="categoriaSelecionada = cat.id"
            class="p-4 rounded-lg font-medium transition-all hover:scale-105"
            :class="categoriaSelecionada === cat.id 
              ? 'bg-indigo-600 text-white shadow-lg' 
              : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300'"
          >
            <i :class="cat.icon" class="text-2xl mb-2"></i>
            <div class="text-sm">{{ cat.nome }}</div>
          </button>
        </div>

        <!-- Valor e Unidades -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <BaseInput
            v-model="valor"
            label="Valor"
            type="number"
            step="any"
            icon="fa-solid fa-hashtag"
            @input="converter"
          />

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-arrow-right text-indigo-600 dark:text-indigo-400 mr-2"></i>
              De
            </label>
            <select 
              v-model="unidadeOrigem" 
              @change="converter"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option v-for="unidade in unidadesDisponiveis" :key="unidade.id" :value="unidade.id">
                {{ unidade.nome }} ({{ unidade.simbolo }})
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-arrow-left text-indigo-600 dark:text-indigo-400 mr-2"></i>
              Para
            </label>
            <select 
              v-model="unidadeDestino" 
              @change="converter"
              class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option v-for="unidade in unidadesDisponiveis" :key="unidade.id" :value="unidade.id">
                {{ unidade.nome }} ({{ unidade.simbolo }})
              </option>
            </select>
          </div>
        </div>

        <!-- Resultado Principal -->
        <div v-if="resultado" class="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <div class="text-sm font-medium mb-2">Resultado</div>
          <div class="text-5xl font-bold mb-2">{{ resultado.valor }}</div>
          <div class="text-indigo-100">{{ resultado.unidade }}</div>
        </div>

        <!-- Conversões Rápidas -->
        <div v-if="conversoesRapidas.length > 0" class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <h4 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <i class="fas fa-bolt text-indigo-600 dark:text-indigo-400"></i>
            Conversões Rápidas
          </h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div 
              v-for="(conv, index) in conversoesRapidas" 
              :key="index"
              class="bg-white dark:bg-gray-600 rounded-lg p-4 flex justify-between items-center"
            >
              <span class="text-sm text-gray-600 dark:text-gray-300">{{ conv.nome }}</span>
              <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ conv.valor }}</span>
            </div>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="flex gap-4">
          <BaseButton @click="trocarUnidades" variant="outline" class="flex-1">
            <i class="fas fa-repeat mr-2"></i>
            Inverter Unidades
          </BaseButton>
          <BaseButton @click="limpar" variant="outline">
            <i class="fas fa-eraser"></i>
          </BaseButton>
        </div>

        <!-- Informações -->
        <div class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-indigo-600 dark:text-indigo-400 mt-1 mr-3"></i>
            <div class="text-sm text-indigo-800 dark:text-indigo-300">
              <p class="font-semibold mb-2">Dica:</p>
              <p>Os valores são convertidos em tempo real conforme você digita. Use o botão "Inverter Unidades" para trocar rapidamente entre origem e destino.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import BaseInput from './common/BaseInput.vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const categorias = [
  { id: 'comprimento', nome: 'Comprimento', icon: 'fas fa-ruler' },
  { id: 'peso', nome: 'Peso', icon: 'fas fa-weight-hanging' },
  { id: 'temperatura', nome: 'Temperatura', icon: 'fas fa-temperature-half' },
  { id: 'volume', nome: 'Volume', icon: 'fas fa-flask' },
  { id: 'area', nome: 'Área', icon: 'fas fa-vector-square' },
  { id: 'velocidade', nome: 'Velocidade', icon: 'fas fa-gauge-high' },
  { id: 'tempo', nome: 'Tempo', icon: 'fas fa-clock' },
  { id: 'dados', nome: 'Dados', icon: 'fas fa-database' }
]

const unidades = {
  comprimento: [
    { id: 'mm', nome: 'Milímetros', simbolo: 'mm', fator: 0.001 },
    { id: 'cm', nome: 'Centímetros', simbolo: 'cm', fator: 0.01 },
    { id: 'm', nome: 'Metros', simbolo: 'm', fator: 1 },
    { id: 'km', nome: 'Quilômetros', simbolo: 'km', fator: 1000 },
    { id: 'in', nome: 'Polegadas', simbolo: 'in', fator: 0.0254 },
    { id: 'ft', nome: 'Pés', simbolo: 'ft', fator: 0.3048 },
    { id: 'yd', nome: 'Jardas', simbolo: 'yd', fator: 0.9144 },
    { id: 'mi', nome: 'Milhas', simbolo: 'mi', fator: 1609.34 }
  ],
  peso: [
    { id: 'mg', nome: 'Miligramas', simbolo: 'mg', fator: 0.000001 },
    { id: 'g', nome: 'Gramas', simbolo: 'g', fator: 0.001 },
    { id: 'kg', nome: 'Quilogramas', simbolo: 'kg', fator: 1 },
    { id: 't', nome: 'Toneladas', simbolo: 't', fator: 1000 },
    { id: 'oz', nome: 'Onças', simbolo: 'oz', fator: 0.0283495 },
    { id: 'lb', nome: 'Libras', simbolo: 'lb', fator: 0.453592 }
  ],
  temperatura: [
    { id: 'c', nome: 'Celsius', simbolo: '°C' },
    { id: 'f', nome: 'Fahrenheit', simbolo: '°F' },
    { id: 'k', nome: 'Kelvin', simbolo: 'K' }
  ],
  volume: [
    { id: 'ml', nome: 'Mililitros', simbolo: 'ml', fator: 0.001 },
    { id: 'l', nome: 'Litros', simbolo: 'L', fator: 1 },
    { id: 'm3', nome: 'Metros Cúbicos', simbolo: 'm³', fator: 1000 },
    { id: 'gal', nome: 'Galões (US)', simbolo: 'gal', fator: 3.78541 },
    { id: 'oz-fl', nome: 'Onças Fluidas', simbolo: 'fl oz', fator: 0.0295735 }
  ],
  area: [
    { id: 'mm2', nome: 'Milímetros²', simbolo: 'mm²', fator: 0.000001 },
    { id: 'm2', nome: 'Metros²', simbolo: 'm²', fator: 1 },
    { id: 'km2', nome: 'Quilômetros²', simbolo: 'km²', fator: 1000000 },
    { id: 'ha', nome: 'Hectares', simbolo: 'ha', fator: 10000 },
    { id: 'ft2', nome: 'Pés²', simbolo: 'ft²', fator: 0.092903 },
    { id: 'ac', nome: 'Acres', simbolo: 'ac', fator: 4046.86 }
  ],
  velocidade: [
    { id: 'mps', nome: 'Metros/segundo', simbolo: 'm/s', fator: 1 },
    { id: 'kmh', nome: 'Km/hora', simbolo: 'km/h', fator: 0.277778 },
    { id: 'mph', nome: 'Milhas/hora', simbolo: 'mph', fator: 0.44704 },
    { id: 'knot', nome: 'Nós', simbolo: 'kn', fator: 0.514444 }
  ],
  tempo: [
    { id: 'ms', nome: 'Milissegundos', simbolo: 'ms', fator: 0.001 },
    { id: 's', nome: 'Segundos', simbolo: 's', fator: 1 },
    { id: 'min', nome: 'Minutos', simbolo: 'min', fator: 60 },
    { id: 'h', nome: 'Horas', simbolo: 'h', fator: 3600 },
    { id: 'd', nome: 'Dias', simbolo: 'd', fator: 86400 },
    { id: 'sem', nome: 'Semanas', simbolo: 'sem', fator: 604800 }
  ],
  dados: [
    { id: 'b', nome: 'Bytes', simbolo: 'B', fator: 1 },
    { id: 'kb', nome: 'Kilobytes', simbolo: 'KB', fator: 1024 },
    { id: 'mb', nome: 'Megabytes', simbolo: 'MB', fator: 1048576 },
    { id: 'gb', nome: 'Gigabytes', simbolo: 'GB', fator: 1073741824 },
    { id: 'tb', nome: 'Terabytes', simbolo: 'TB', fator: 1099511627776 }
  ]
}

const categoriaSelecionada = ref('comprimento')
const valor = ref(1)
const unidadeOrigem = ref('m')
const unidadeDestino = ref('km')
const resultado = ref(null)

const unidadesDisponiveis = computed(() => unidades[categoriaSelecionada.value])

const conversoesRapidas = computed(() => {
  if (!valor.value || !resultado.value) return []
  
  const unidadesParaConverter = unidadesDisponiveis.value
    .filter(u => u.id !== unidadeOrigem.value)
    .slice(0, 6)
  
  return unidadesParaConverter.map(unidade => ({
    nome: unidade.simbolo,
    valor: converterValor(Number(valor.value), unidadeOrigem.value, unidade.id)
  }))
})

watch(categoriaSelecionada, () => {
  unidadeOrigem.value = unidadesDisponiveis.value[0].id
  unidadeDestino.value = unidadesDisponiveis.value[1]?.id || unidadesDisponiveis.value[0].id
  converter()
})

const converterValor = (val, origem, destino) => {
  if (categoriaSelecionada.value === 'temperatura') {
    return converterTemperatura(val, origem, destino)
  }
  
  const unidOrigem = unidadesDisponiveis.value.find(u => u.id === origem)
  const unidDestino = unidadesDisponiveis.value.find(u => u.id === destino)
  
  const valorBase = val * unidOrigem.fator
  const resultado = valorBase / unidDestino.fator
  
  return resultado.toLocaleString('pt-BR', { maximumFractionDigits: 6 })
}

const converterTemperatura = (val, origem, destino) => {
  let celsius = 0
  
  if (origem === 'c') celsius = val
  else if (origem === 'f') celsius = (val - 32) * 5/9
  else if (origem === 'k') celsius = val - 273.15
  
  let resultado = 0
  if (destino === 'c') resultado = celsius
  else if (destino === 'f') resultado = celsius * 9/5 + 32
  else if (destino === 'k') resultado = celsius + 273.15
  
  return resultado.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
}

const converter = () => {
  if (!valor.value) {
    resultado.value = null
    return
  }
  
  const unidDestino = unidadesDisponiveis.value.find(u => u.id === unidadeDestino.value)
  const valorConvertido = converterValor(Number(valor.value), unidadeOrigem.value, unidadeDestino.value)
  
  resultado.value = {
    valor: valorConvertido,
    unidade: unidDestino.nome
  }
  
  trackToolUsage('Calculadora Conversão', 'convert')
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

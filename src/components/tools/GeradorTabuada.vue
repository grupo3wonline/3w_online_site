<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-4">
          <i class="fas fa-table text-indigo-600 dark:text-indigo-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Gerador de Tabuada</h1>
        <p class="text-gray-600 dark:text-gray-400">Gere tabuadas de multiplicação personalizadas</p>
      </div>

      <div class="space-y-6">
        <div class="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-6">
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <label for="numero" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Número da Tabuada
              </label>
              <input
                id="numero"
                v-model.number="numero"
                type="number"
                min="1"
                max="100"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label for="inicio" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Multiplicar de
              </label>
              <input
                id="inicio"
                v-model.number="inicio"
                type="number"
                min="1"
                max="100"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label for="fim" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Até
              </label>
              <input
                id="fim"
                v-model.number="fim"
                type="number"
                min="1"
                max="100"
                class="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div class="mt-4">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tabuadas Rápidas
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="n in [2, 3, 4, 5, 6, 7, 8, 9, 10]"
                :key="n"
                @click="setNumero(n)"
                class="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-800 text-indigo-700 dark:text-indigo-300 rounded-lg transition-colors"
              >
                {{ n }}x
              </button>
            </div>
          </div>
        </div>

        <BaseButton @click="gerarTabuada" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Gerar Tabuada
        </BaseButton>

        <div v-if="tabuadaGerada" class="space-y-4">
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white">
                Tabuada do {{ numero }}
              </h3>
              <div class="flex gap-2">
                <button @click="copiarTabuada" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                  <i class="fas fa-copy mr-2"></i>Copiar
                </button>
                <button @click="imprimirTabuada" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
                  <i class="fas fa-print mr-2"></i>Imprimir
                </button>
              </div>
            </div>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              <div
                v-for="item in tabuada"
                :key="item.multiplicador"
                class="bg-white dark:bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
              >
                <div class="text-lg font-mono text-center">
                  <span class="text-indigo-600 dark:text-indigo-400 font-bold">{{ numero }}</span>
                  <span class="text-gray-400 mx-2">×</span>
                  <span class="text-purple-600 dark:text-purple-400 font-bold">{{ item.multiplicador }}</span>
                  <span class="text-gray-400 mx-2">=</span>
                  <span class="text-green-600 dark:text-green-400 font-bold text-xl">{{ item.resultado }}</span>
                </div>
              </div>
            </div>
          </div>

          <div id="tabuada-print" class="hidden print:block">
            <h2 class="text-2xl font-bold text-center mb-4">Tabuada do {{ numero }}</h2>
            <div class="space-y-2">
              <div v-for="item in tabuada" :key="item.multiplicador" class="text-lg font-mono">
                {{ numero }} × {{ item.multiplicador }} = {{ item.resultado }}
              </div>
            </div>
          </div>
        </div>

        <div class="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-500 p-4">
          <div class="flex">
            <i class="fas fa-lightbulb text-indigo-600 dark:text-indigo-400 mt-1 mr-3"></i>
            <div class="text-sm text-indigo-800 dark:text-indigo-300">
              <p class="font-semibold mb-2">Dicas:</p>
              <ul class="list-disc list-inside space-y-1 text-xs">
                <li>Tabuada tradicional: multiplique de 1 até 10</li>
                <li>Personalize o intervalo para criar exercícios</li>
                <li>Use as tabuadas rápidas para números comuns</li>
                <li>Imprima para estudar offline</li>
                <li>Aceita números de 1 até 100</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import BaseButton from './common/BaseButton.vue'
import { useAnalytics } from '../../composables/useAnalytics'
import Swal from 'sweetalert2'

const { trackToolUsage } = useAnalytics()

const numero = ref(5)
const inicio = ref(1)
const fim = ref(10)
const tabuadaGerada = ref(false)
const tabuada = ref([])

const setNumero = (n) => {
  numero.value = n
  gerarTabuada()
}

const gerarTabuada = () => {
  if (inicio.value > fim.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Intervalo Inválido',
      text: 'O início deve ser menor ou igual ao fim',
      confirmButtonColor: '#6366f1'
    })
    return
  }

  tabuada.value = []
  
  for (let i = inicio.value; i <= fim.value; i++) {
    tabuada.value.push({
      multiplicador: i,
      resultado: numero.value * i
    })
  }

  tabuadaGerada.value = true
  
  trackToolUsage('Gerador Tabuada', 'generate', { number: numero.value })
  
  Swal.fire({
    icon: 'success',
    title: 'Tabuada Gerada!',
    text: `Tabuada do ${numero.value} criada`,
    confirmButtonColor: '#6366f1'
  })
}

const copiarTabuada = () => {
  let texto = `Tabuada do ${numero.value}\n\n`
  
  for (const item of tabuada.value) {
    texto += `${numero.value} × ${item.multiplicador} = ${item.resultado}\n`
  }
  
  navigator.clipboard.writeText(texto)
  
  trackToolUsage('Gerador Tabuada', 'copy')
  
  Swal.fire({
    icon: 'success',
    title: 'Tabuada Copiada!',
    timer: 2000,
    showConfirmButton: false
  })
}

const imprimirTabuada = () => {
  window.print()
  trackToolUsage('Gerador Tabuada', 'print')
}
</script>

<style scoped>
@media print {
  body * {
    visibility: hidden;
  }
  #tabuada-print,
  #tabuada-print * {
    visibility: visible;
  }
  #tabuada-print {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>

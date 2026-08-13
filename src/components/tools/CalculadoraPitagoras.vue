<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <i class="fas fa-drafting-compass text-orange-600 dark:text-orange-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Teorema de Pitágoras</h1>
        <p class="text-gray-600 dark:text-gray-400">Calcule os lados de triângulos retângulos</p>
      </div>

      <div class="space-y-6">
        <div class="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-6">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">O que deseja calcular?</label>
          <div class="grid grid-cols-3 gap-3">
            <button v-for="modo in modos" :key="modo.id" @click="modoSelecionado = modo.id"
              :class="['p-4 rounded-lg border-2 transition-all', 
                modoSelecionado === modo.id 
                  ? 'border-orange-600 bg-orange-50 dark:bg-orange-900/30' 
                  : 'border-gray-200 dark:border-gray-600']">
              <i :class="[modo.icon, 'text-2xl mb-2', 
                modoSelecionado === modo.id ? 'text-orange-600' : 'text-gray-400']"></i>
              <div :class="['text-xs font-medium', 
                modoSelecionado === modo.id ? 'text-orange-900 dark:text-orange-300' : 'text-gray-600']">
                {{ modo.nome }}
              </div>
            </button>
          </div>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6">
          <div class="text-center mb-4">
            <div class="text-2xl font-bold text-gray-900 dark:text-white mb-2">a² + b² = c²</div>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              onde <strong>c</strong> é a hipotenusa (lado maior) e <strong>a</strong> e <strong>b</strong> são os catetos
            </p>
          </div>
          
          <div class="flex justify-center">
            <svg width="200" height="150" viewBox="0 0 200 150">
              <polygon points="20,130 180,130 180,20" fill="rgba(249, 115, 22, 0.1)" stroke="rgb(249, 115, 22)" stroke-width="2"/>
              <line x1="20" y1="130" x2="180" y2="20" stroke="rgb(239, 68, 68)" stroke-width="2"/>
              <text x="100" y="145" text-anchor="middle" class="fill-gray-700 dark:fill-gray-300 text-sm">cateto a</text>
              <text x="190" y="75" text-anchor="start" class="fill-gray-700 dark:fill-gray-300 text-sm">cateto b</text>
              <text x="90" y="65" text-anchor="middle" class="fill-red-600 text-sm font-bold">hipotenusa c</text>
            </svg>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
          <div v-if="modoSelecionado === 'hipotenusa'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="catetoA" label="Cateto a (cm)" type="number" step="0.01" />
            <BaseInput v-model="catetoB" label="Cateto b (cm)" type="number" step="0.01" />
          </div>

          <div v-if="modoSelecionado === 'catetoA'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="hipotenusa" label="Hipotenusa c (cm)" type="number" step="0.01" />
            <BaseInput v-model="catetoB" label="Cateto b (cm)" type="number" step="0.01" />
          </div>

          <div v-if="modoSelecionado === 'catetoB'" class="grid md:grid-cols-2 gap-4">
            <BaseInput v-model="hipotenusa" label="Hipotenusa c (cm)" type="number" step="0.01" />
            <BaseInput v-model="catetoA" label="Cateto a (cm)" type="number" step="0.01" />
          </div>
        </div>

        <BaseButton @click="calcular" variant="primary" class="w-full">
          <i class="fas fa-calculator mr-2"></i>Calcular
        </BaseButton>

        <div v-if="calculado" class="space-y-4">
          <div class="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/30 rounded-lg p-8">
            <div class="text-center">
              <div class="text-sm text-gray-600 dark:text-gray-400 mb-2">Resultado</div>
              <div class="text-5xl font-bold text-orange-600 dark:text-orange-400 mb-4">
                {{ resultado.toFixed(2) }} cm
              </div>
              <div class="text-lg text-gray-700 dark:text-gray-300 mb-6">
                {{ getTitulo() }}: {{ resultado.toFixed(2) }} cm
              </div>
              
              <div class="grid md:grid-cols-3 gap-4">
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Cateto a</div>
                  <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {{ modoSelecionado === 'catetoA' ? resultado.toFixed(2) : Number(catetoA).toFixed(2) }} cm
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Cateto b</div>
                  <div class="text-2xl font-bold text-green-600 dark:text-green-400">
                    {{ modoSelecionado === 'catetoB' ? resultado.toFixed(2) : Number(catetoB).toFixed(2) }} cm
                  </div>
                </div>
                <div class="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Hipotenusa c</div>
                  <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                    {{ modoSelecionado === 'hipotenusa' ? resultado.toFixed(2) : Number(hipotenusa).toFixed(2) }} cm
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white dark:bg-gray-700 rounded-lg p-6">
            <h4 class="font-semibold text-gray-900 dark:text-white mb-3">Cálculo Detalhado</h4>
            <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300" v-html="explicacao"></div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 gap-4">
          <div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4">
            <div class="flex">
              <i class="fas fa-lightbulb text-orange-600 dark:text-orange-400 mt-1 mr-3"></i>
              <div class="text-sm text-orange-800 dark:text-orange-300">
                <p class="font-semibold mb-1">Teorema de Pitágoras</p>
                <p class="text-xs">Em um triângulo retângulo, o quadrado da hipotenusa é igual à soma dos quadrados dos catetos.</p>
              </div>
            </div>
          </div>

          <div class="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-4">
            <div class="flex">
              <i class="fas fa-info-circle text-blue-600 dark:text-blue-400 mt-1 mr-3"></i>
              <div class="text-sm text-blue-800 dark:text-blue-300">
                <p class="font-semibold mb-1">Aplicações</p>
                <p class="text-xs">Usado em construção civil, navegação, cálculo de distâncias e muito mais.</p>
              </div>
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
import BaseInput from './common/BaseInput.vue'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const modos = [
  { id: 'hipotenusa', nome: 'Hipotenusa (c)', icon: 'fas fa-slash' },
  { id: 'catetoA', nome: 'Cateto a', icon: 'fas fa-minus' },
  { id: 'catetoB', nome: 'Cateto b', icon: 'fas fa-grip-lines-vertical' }
]

const modoSelecionado = ref('hipotenusa')
const catetoA = ref(3)
const catetoB = ref(4)
const hipotenusa = ref(5)
const calculado = ref(false)
const resultado = ref(0)
const explicacao = ref('')

const calcular = () => {
  let valor = 0
  let explicacaoTexto = ''

  switch (modoSelecionado.value) {
    case 'hipotenusa':
      valor = Math.sqrt(Math.pow(Number(catetoA.value), 2) + Math.pow(Number(catetoB.value), 2))
      explicacaoTexto = `
        <strong>Fórmula:</strong> c² = a² + b²<br>
        <strong>Substituindo:</strong> c² = ${catetoA.value}² + ${catetoB.value}²<br>
        <strong>Calculando:</strong> c² = ${Math.pow(Number(catetoA.value), 2)} + ${Math.pow(Number(catetoB.value), 2)}<br>
        <strong>Somando:</strong> c² = ${Math.pow(Number(catetoA.value), 2) + Math.pow(Number(catetoB.value), 2)}<br>
        <strong>Raiz quadrada:</strong> c = √${Math.pow(Number(catetoA.value), 2) + Math.pow(Number(catetoB.value), 2)} = ${valor.toFixed(2)} cm
      `
      break

    case 'catetoA':
      valor = Math.sqrt(Math.pow(Number(hipotenusa.value), 2) - Math.pow(Number(catetoB.value), 2))
      explicacaoTexto = `
        <strong>Fórmula:</strong> a² = c² - b²<br>
        <strong>Substituindo:</strong> a² = ${hipotenusa.value}² - ${catetoB.value}²<br>
        <strong>Calculando:</strong> a² = ${Math.pow(Number(hipotenusa.value), 2)} - ${Math.pow(Number(catetoB.value), 2)}<br>
        <strong>Subtraindo:</strong> a² = ${Math.pow(Number(hipotenusa.value), 2) - Math.pow(Number(catetoB.value), 2)}<br>
        <strong>Raiz quadrada:</strong> a = √${Math.pow(Number(hipotenusa.value), 2) - Math.pow(Number(catetoB.value), 2)} = ${valor.toFixed(2)} cm
      `
      break

    case 'catetoB':
      valor = Math.sqrt(Math.pow(Number(hipotenusa.value), 2) - Math.pow(Number(catetoA.value), 2))
      explicacaoTexto = `
        <strong>Fórmula:</strong> b² = c² - a²<br>
        <strong>Substituindo:</strong> b² = ${hipotenusa.value}² - ${catetoA.value}²<br>
        <strong>Calculando:</strong> b² = ${Math.pow(Number(hipotenusa.value), 2)} - ${Math.pow(Number(catetoA.value), 2)}<br>
        <strong>Subtraindo:</strong> b² = ${Math.pow(Number(hipotenusa.value), 2) - Math.pow(Number(catetoA.value), 2)}<br>
        <strong>Raiz quadrada:</strong> b = √${Math.pow(Number(hipotenusa.value), 2) - Math.pow(Number(catetoA.value), 2)} = ${valor.toFixed(2)} cm
      `
      break
  }

  resultado.value = valor
  explicacao.value = explicacaoTexto
  calculado.value = true
  trackToolUsage('Calculadora Pitagoras', 'calculate', { mode: modoSelecionado.value })
}

const getTitulo = () => {
  const titulos = {
    hipotenusa: 'Hipotenusa (c)',
    catetoA: 'Cateto a',
    catetoB: 'Cateto b'
  }
  return titulos[modoSelecionado.value]
}
</script>

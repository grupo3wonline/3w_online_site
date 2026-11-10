<template>
  <ToolShell
    title="Teorema de Pitágoras"
    description="Calcule qualquer lado de um triângulo retângulo com a² + b² = c² e ângulos internos."
    icon="fa-ruler-combined"
    icon-gradient="from-orange-500 to-red-700"
    orb-color="orange"
    :quick-tips="['Hipotenusa ou cateto', 'Ângulos internos', 'Passo a passo']"
    :tips="[
      { title: 'Teorema de Pitágoras', text: 'Em todo triângulo retângulo: a² + b² = c², onde c é a hipotenusa (lado oposto ao ângulo reto).' },
      { title: 'Hipotenusa', text: 'É sempre o maior lado do triângulo retângulo, oposto ao ângulo de 90°.', type: 'info' },
      { title: 'Ternas pitagóricas', text: 'Conjuntos inteiros clássicos: (3,4,5), (5,12,13), (8,15,17), (7,24,25).', type: 'warning' },
    ]"
    :examples="[
      { title: 'Hipotenusa clássica', desc: 'Cateto a=3, cateto b=4', result: 'Hipotenusa c = 5 cm' },
      { title: 'Encontrar cateto', desc: 'Hipotenusa c=13, cateto b=5', result: 'Cateto a = 12 cm' },
      { title: 'Escada na parede', desc: 'Hipotenusa (escada)=5m, distância do chão=3m', result: 'Altura na parede = 4 m' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <div class="space-y-4">
            <!-- Seleção de modo -->
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-question-circle mr-1.5 text-orange-500"></i>
                O que deseja calcular?
              </label>
              <div class="grid grid-cols-3 gap-2 mt-2">
                <button
                  v-for="modo in modos"
                  :key="modo.id"
                  @click="modoSelecionado = modo.id; resultado = null"
                  :class="[
                    'p-3 rounded-xl border-2 transition-all text-center',
                    modoSelecionado === modo.id
                      ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 shadow-md'
                      : 'border-gray-200 dark:border-slate-700 hover:border-orange-300',
                  ]"
                >
                  <i :class="[modo.icon, 'text-xl mb-1 block', modoSelecionado === modo.id ? 'text-orange-600 dark:text-orange-400' : 'text-gray-400']"></i>
                  <span :class="['text-xs font-medium', modoSelecionado === modo.id ? 'text-orange-900 dark:text-orange-300' : 'text-gray-500 dark:text-slate-400']">
                    {{ modo.nome }}
                  </span>
                </button>
              </div>
            </div>

            <!-- Visualização -->
            <div class="glass-panel p-4 text-center">
              <p class="text-lg font-black text-gray-800 dark:text-white mb-1">a² + b² = c²</p>
              <p class="text-xs text-gray-500 dark:text-slate-400">c = hipotenusa · a, b = catetos</p>
              <svg width="160" height="120" viewBox="0 0 200 150" class="mx-auto mt-2 opacity-80">
                <polygon points="20,130 180,130 180,20" fill="rgba(249, 115, 22, 0.1)" stroke="rgb(249, 115, 22)" stroke-width="2"/>
                <line x1="20" y1="130" x2="180" y2="20" stroke="rgb(239, 68, 68)" stroke-width="2.5"/>
                <text x="100" y="145" text-anchor="middle" fill="#6b7280" font-size="12">cateto a</text>
                <text x="188" y="80" text-anchor="start" fill="#6b7280" font-size="12">b</text>
                <text x="88" y="68" text-anchor="middle" fill="#ef4444" font-size="11" font-weight="bold">c</text>
              </svg>
            </div>

            <!-- Campos dinâmicos -->
            <div class="glass-panel p-4">
              <div v-if="modoSelecionado === 'hipotenusa'" class="grid grid-cols-2 gap-3">
                <BaseInput v-model="catetoA" label="Cateto a" type="number" step="0.01" icon="fa-ruler" tooltip="Comprimento do cateto a (lado horizontal)." />
                <BaseInput v-model="catetoB" label="Cateto b" type="number" step="0.01" icon="fa-ruler" tooltip="Comprimento do cateto b (lado vertical)." />
              </div>
              <div v-else-if="modoSelecionado === 'catetoA'" class="grid grid-cols-2 gap-3">
                <BaseInput v-model="hipotenusa" label="Hipotenusa c" type="number" step="0.01" icon="fa-ruler" tooltip="Comprimento da hipotenusa (maior lado)." />
                <BaseInput v-model="catetoB" label="Cateto b" type="number" step="0.01" icon="fa-ruler" />
              </div>
              <div v-else class="grid grid-cols-2 gap-3">
                <BaseInput v-model="hipotenusa" label="Hipotenusa c" type="number" step="0.01" icon="fa-ruler" />
                <BaseInput v-model="catetoA" label="Cateto a" type="number" step="0.01" icon="fa-ruler" />
              </div>
            </div>
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-calculator" @click="calcular" class="flex-1">
              Calcular
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
          <div v-if="resultado !== null" class="space-y-4">
            <!-- Destaque -->
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-1">{{ getTitulo() }}</p>
              <p class="text-5xl font-black text-white mb-2">{{ resultado.toFixed(4) }} cm</p>
              <p class="text-orange-300 text-sm">Triângulo retângulo</p>
            </div>

            <!-- Os três lados -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">
                  {{ modoSelecionado === 'catetoA' ? resultado.toFixed(2) : Number(catetoA).toFixed(2) }}
                </div>
                <div class="metric-glass-label">Cateto a</div>
              </div>
              <div class="metric-glass ring-1 ring-green-100 dark:ring-green-900">
                <div class="metric-glass-value text-green-600 dark:text-green-400">
                  {{ modoSelecionado === 'catetoB' ? resultado.toFixed(2) : Number(catetoB).toFixed(2) }}
                </div>
                <div class="metric-glass-label">Cateto b</div>
              </div>
              <div class="metric-glass ring-1 ring-red-100 dark:ring-red-900">
                <div class="metric-glass-value text-red-600 dark:text-red-400">
                  {{ modoSelecionado === 'hipotenusa' ? resultado.toFixed(2) : Number(hipotenusa).toFixed(2) }}
                </div>
                <div class="metric-glass-label">Hipotenusa c</div>
              </div>
            </div>

            <!-- Passo a passo -->
            <div class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list-ol text-orange-500"></i>
                Cálculo Detalhado
              </h4>
              <div class="text-sm text-gray-700 dark:text-slate-300 space-y-1" v-html="explicacao"></div>
            </div>

            <div class="tip-card-warning">
              <i class="fas fa-lightbulb text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                Ângulos internos: α = {{ angulos.alpha }}° · β = {{ angulos.beta }}° · 90°
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="resultado === null" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-ruler-combined text-4xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Escolha o que calcular e informe os valores</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import DOMPurify from 'dompurify'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const modos = [
  { id: 'hipotenusa', nome: 'Hipotenusa (c)', icon: 'fas fa-slash' },
  { id: 'catetoA',    nome: 'Cateto a',       icon: 'fas fa-minus' },
  { id: 'catetoB',    nome: 'Cateto b',       icon: 'fas fa-grip-lines-vertical' },
]

const modoSelecionado = ref('hipotenusa')
const catetoA    = ref(3)
const catetoB    = ref(4)
const hipotenusa = ref(5)
const resultado  = ref(null)
const explicacao = ref('')
const angulos    = reactive({ alpha: 0, beta: 0 })

const calcular = () => {
  let valor = 0
  let explicacaoTexto = ''

  switch (modoSelecionado.value) {
    case 'hipotenusa': {
      const a = Number(catetoA.value), b = Number(catetoB.value)
      if (!a || !b) { Swal.fire({ icon: 'warning', title: 'Informe os catetos', confirmButtonColor: '#2563eb' }); return }
      valor = Math.sqrt(a * a + b * b)
      explicacaoTexto = `<strong>Fórmula:</strong> c² = a² + b²<br><strong>Substituindo:</strong> c² = ${a}² + ${b}² = ${a*a} + ${b*b} = ${a*a+b*b}<br><strong>Resultado:</strong> c = √${a*a+b*b} = ${valor.toFixed(4)} cm`
      angulos.alpha = Number((Math.atan(a / b) * 180 / Math.PI).toFixed(1))
      angulos.beta  = Number((90 - angulos.alpha).toFixed(1))
      break
    }
    case 'catetoA': {
      const c = Number(hipotenusa.value), b = Number(catetoB.value)
      if (!c || !b || c <= b) { Swal.fire({ icon: 'warning', title: 'Hipotenusa deve ser maior que cateto b', confirmButtonColor: '#2563eb' }); return }
      valor = Math.sqrt(c * c - b * b)
      explicacaoTexto = `<strong>Fórmula:</strong> a² = c² − b²<br><strong>Substituindo:</strong> a² = ${c}² − ${b}² = ${c*c} − ${b*b} = ${c*c-b*b}<br><strong>Resultado:</strong> a = √${c*c-b*b} = ${valor.toFixed(4)} cm`
      angulos.alpha = Number((Math.atan(valor / b) * 180 / Math.PI).toFixed(1))
      angulos.beta  = Number((90 - angulos.alpha).toFixed(1))
      break
    }
    case 'catetoB': {
      const c = Number(hipotenusa.value), a = Number(catetoA.value)
      if (!c || !a || c <= a) { Swal.fire({ icon: 'warning', title: 'Hipotenusa deve ser maior que cateto a', confirmButtonColor: '#2563eb' }); return }
      valor = Math.sqrt(c * c - a * a)
      explicacaoTexto = `<strong>Fórmula:</strong> b² = c² − a²<br><strong>Substituindo:</strong> b² = ${c}² − ${a}² = ${c*c} − ${a*a} = ${c*c-a*a}<br><strong>Resultado:</strong> b = √${c*c-a*a} = ${valor.toFixed(4)} cm`
      angulos.alpha = Number((Math.atan(a / valor) * 180 / Math.PI).toFixed(1))
      angulos.beta  = Number((90 - angulos.alpha).toFixed(1))
      break
    }
  }

  resultado.value  = valor
  explicacao.value = DOMPurify.sanitize(explicacaoTexto)
}

const getTitulo = () => ({ hipotenusa: 'Hipotenusa (c)', catetoA: 'Cateto a', catetoB: 'Cateto b' }[modoSelecionado.value])

const limpar = () => {
  catetoA.value = 3; catetoB.value = 4; hipotenusa.value = 5
  resultado.value = null; explicacao.value = ''
  angulos.alpha = 0; angulos.beta = 0
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

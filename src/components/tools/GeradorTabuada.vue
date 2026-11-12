<template>
  <ToolShell
    title="Gerador de Tabuada"
    description="Gere tabuadas completas de qualquer número com intervalo personalizado e impressão."
    icon="fa-table"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Qualquer número 1–100', 'Intervalo personalizado', 'Imprima para estudar']"
    :tips="[
      { title: 'Tabuada tradicional', text: 'A tabuada padrão vai de 1×1 até 10×10. Use os botões rápidos para acessar as mais comuns.', type: 'info' },
      { title: 'Personalize o intervalo', text: 'Ajuste os campos De e Até para criar exercícios com multiplicações além do 10.', type: 'info' },
      { title: 'Para professores', text: 'Use o botão Imprimir para gerar folhas de estudo para os alunos sem precisar de outro software.', type: 'success' },
    ]"
    :examples="[
      { title: 'Tabuada do 7', desc: 'Número: 7 | De: 1 | Até: 10', result: '7×1=7, 7×2=14, ... 7×10=70' },
      { title: 'Exercício avançado', desc: 'Número: 13 | De: 1 | Até: 12', result: '13×1=13, 13×2=26, ... 13×12=156' },
      { title: 'Revisão rápida', desc: 'Clique em qualquer número nos Atalhos', result: 'Gera e exibe a tabuada automaticamente' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Configuração -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <BaseInput
            v-model="numero"
            label="Número da Tabuada"
            type="number"
            :min="1"
            :max="100"
            icon="fa-hashtag"
            tooltip="Número base da tabuada. Aceita de 1 a 100."
          />

          <div class="grid grid-cols-2 gap-3">
            <BaseInput
              v-model="inicio"
              label="Multiplicar de"
              type="number"
              :min="1"
              :max="100"
              icon="fa-arrow-right"
              hint="Início do intervalo"
            />
            <BaseInput
              v-model="fim"
              label="Até"
              type="number"
              :min="1"
              :max="100"
              icon="fa-arrow-left"
              hint="Fim do intervalo"
            />
          </div>

          <!-- Atalhos rápidos -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-bolt mr-1.5 text-amber-500"></i>
              Atalhos Rápidos
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="n in [2,3,4,5,6,7,8,9,10,11,12]"
                :key="n"
                @click="setNumero(n)"
                class="px-3 py-1.5 rounded-lg text-sm font-bold bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/50 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors"
              >
                {{ n }}×
              </button>
            </div>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="primary" icon="fa-calculator" @click="gerarTabuada" class="flex-1">Gerar Tabuada</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="tabuadaGerada = false">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="tabuadaGerada" class="space-y-4">
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Tabuada do</p>
              <p class="text-5xl font-black text-white mb-1">{{ numero }}</p>
              <p class="text-purple-300 text-sm font-semibold">
                <i class="fas fa-times mr-1"></i>{{ tabuada.length }} multiplicações
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ tabuada[0]?.resultado ?? 0 }}</div>
                <div class="metric-glass-label">Menor resultado</div>
              </div>
              <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
                <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ tabuada[tabuada.length-1]?.resultado ?? 0 }}</div>
                <div class="metric-glass-label">Maior resultado</div>
              </div>
            </div>

            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-table text-purple-500"></i>Tabuada do {{ numero }}
                </h4>
                <div class="flex gap-2">
                  <button @click="copiarTabuada" class="copy-btn"><i class="fas fa-copy mr-1"></i>Copiar</button>
                  <button @click="imprimirTabuada" class="copy-btn"><i class="fas fa-print mr-1"></i>Imprimir</button>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-2">
                <div
                  v-for="item in tabuada"
                  :key="item.multiplicador"
                  class="flex items-center justify-between p-2 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800/40"
                >
                  <span class="font-mono text-sm">
                    <span class="text-purple-600 dark:text-purple-400 font-bold">{{ numero }}</span>
                    <span class="text-gray-400 mx-1">×</span>
                    <span class="text-violet-600 dark:text-violet-400 font-bold">{{ item.multiplicador }}</span>
                  </span>
                  <span class="font-mono font-black text-green-600 dark:text-green-400 text-base">= {{ item.resultado }}</span>
                </div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-lightbulb text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Dica: Estude a tabuada cobrindo o resultado com o dedo e tente responder antes de olhar!</span>
            </div>
          </div>
        </Transition>

        <div v-if="!tabuadaGerada" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-table text-4xl mb-3 opacity-30 block text-purple-400"></i>
          <p class="text-sm">Escolha um número e clique em Gerar Tabuada</p>
        </div>
      </div>
    </div>

    <!-- Print area (hidden, shown on print) -->
    <div id="tabuada-print" class="hidden print:block">
      <h2 class="text-2xl font-bold text-center mb-4">Tabuada do {{ numero }}</h2>
      <div class="space-y-1">
        <div v-for="item in tabuada" :key="item.multiplicador" class="text-lg font-mono">
          {{ numero }} × {{ item.multiplicador }} = {{ item.resultado }}
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

interface TabuadaItem { multiplicador: number; resultado: number }

const numero       = ref(5)
const inicio       = ref(1)
const fim          = ref(10)
const tabuadaGerada= ref(false)
const tabuada      = ref<TabuadaItem[]>([])

const setNumero = (n: number) => { numero.value = n; gerarTabuada() }

const gerarTabuada = () => {
  if (inicio.value > fim.value) {
    Swal.fire({ icon: 'warning', title: 'Intervalo Inválido', text: 'O início deve ser menor ou igual ao fim.', confirmButtonColor: '#7c3aed' })
    return
  }
  tabuada.value = []
  for (let i = inicio.value; i <= fim.value; i++) {
    tabuada.value.push({ multiplicador: i, resultado: numero.value * i })
  }
  tabuadaGerada.value = true
}

const copiarTabuada = () => {
  const txt = `Tabuada do ${numero.value}\n\n` + tabuada.value.map(it => `${numero.value} × ${it.multiplicador} = ${it.resultado}`).join('\n')
  navigator.clipboard.writeText(txt)
  Swal.fire({ icon: 'success', title: 'Copiado!', timer: 2000, showConfirmButton: false })
}

const imprimirTabuada = () => { window.print() }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }

@media print {
  body * { visibility: hidden; }
  #tabuada-print, #tabuada-print * { visibility: visible; }
  #tabuada-print { position: absolute; left: 0; top: 0; }
}
</style>

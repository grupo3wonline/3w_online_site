<template>
  <ToolShell
    title="Sorteiador"
    description="Realize sorteios de nomes ou números de forma transparente e aleatória."
    icon="fa-dice"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Aleatoriedade real', 'Nomes ou números', 'Histórico completo']"
    :tips="[
      { title: 'Aleatoriedade', text: 'Os sorteios usam Math.random() com alta entropia — adequado para rifas, sorteios de brindes e gincanas informais.', type: 'info' },
      { title: 'Sem repeticoes', text: 'Desmarque a opcao de repetidos para garantir que cada numero ou nome apareca no maximo uma vez no sorteio.' },
      { title: 'Multiplos vencedores', text: 'Voce pode sortear varios vencedores de uma so vez. Informe a quantidade desejada antes de sortear.', type: 'success' },
    ]"
    :examples="[
      { title: 'Rifa de 1 a 100', desc: 'Sortear 1 número entre 1 e 100', result: 'Resultado: número único sem repetição' },
      { title: 'Sorteio de equipes', desc: 'Lista de 20 nomes, sortear 2 vencedores', result: '2 nomes selecionados aleatoriamente sem repetição' },
      { title: 'Loteria interna', desc: 'Sortear 6 números entre 1 e 60', result: '6 números únicos em ordem crescente' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <!-- Tipo de sorteio -->
          <div class="mb-4">
            <label class="input-aurora-label">
              <i class="fas fa-dice mr-1.5 text-purple-500"></i>
              Tipo de Sorteio
            </label>
            <div class="grid grid-cols-2 gap-2 mt-1">
              <button
                @click="tipoSorteio = 'numeros'"
                :class="['p-3 rounded-xl border-2 text-sm transition-all text-center', tipoSorteio === 'numeros' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-slate-600']"
              >
                <i class="fas fa-hashtag text-lg mb-1 block text-purple-600 dark:text-purple-400"></i>
                <div class="font-bold">Números</div>
              </button>
              <button
                @click="tipoSorteio = 'nomes'"
                :class="['p-3 rounded-xl border-2 text-sm transition-all text-center', tipoSorteio === 'nomes' ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-slate-600']"
              >
                <i class="fas fa-users text-lg mb-1 block text-purple-600 dark:text-purple-400"></i>
                <div class="font-bold">Nomes</div>
              </button>
            </div>
          </div>

          <!-- Sorteio de números -->
          <div v-if="tipoSorteio === 'numeros'" class="space-y-3">
            <div class="grid grid-cols-2 gap-3">
              <BaseInput v-model="numeroMin" label="Mínimo" type="number" icon="fa-arrow-down" placeholder="1" />
              <BaseInput v-model="numeroMax" label="Máximo" type="number" icon="fa-arrow-up" placeholder="100" />
            </div>
            <BaseInput
              v-model="quantidade"
              label="Quantidade de Números"
              type="number" :min="1"
              icon="fa-list-ol"
              placeholder="1"
              hint="Quantos números sortear"
            />
            <label class="checkbox-aurora cursor-pointer select-none">
              <input v-model="permitirRepetidos" type="checkbox" class="w-4 h-4 rounded text-purple-600" />
              <span class="text-sm font-medium">Permitir números repetidos</span>
            </label>
          </div>

          <!-- Sorteio de nomes -->
          <div v-else class="space-y-3">
            <div>
              <label class="input-aurora-label">
                <i class="fas fa-list mr-1.5 text-purple-500"></i>
                Lista de Participantes
              </label>
              <textarea
                v-model="listaNomes"
                placeholder="Digite os nomes, um por linha"
                class="input-aurora resize-y"
                rows="5"
              ></textarea>
              <p class="input-aurora-hint">{{ nomesArray.length }} participante(s) na lista</p>
            </div>
            <BaseInput
              v-model="quantidadeNomes"
              label="Quantidade de Vencedores"
              type="number" :min="1" :max="nomesArray.length || 1"
              icon="fa-trophy"
              placeholder="1"
              hint="Quantos nomes sortear"
            />
          </div>

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-dice" @click="sortear" :disabled="!podeSortear" class="flex-1">
              Sortear
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div class="space-y-4">
        <!-- Resultado do sorteio -->
        <Transition name="scale-in" appear>
          <div v-if="exibirResultado" class="space-y-4">
            <div class="tool-header text-center py-7">
              <p class="text-sm text-blue-200 mb-3">
                {{ animando ? '🎲 Sorteando...' : '🎉 Resultado do Sorteio' }}
              </p>

              <!-- Número único -->
              <div v-if="tipoSorteio === 'numeros' && resultadoNumeros.length === 1" class="text-7xl font-black text-white mb-2">
                {{ resultadoNumeros[0] }}
              </div>

              <!-- Múltiplos números -->
              <div v-else-if="tipoSorteio === 'numeros'" class="flex flex-wrap gap-2 justify-center">
                <span
                  v-for="(num, i) in resultadoNumeros" :key="i"
                  class="inline-flex items-center justify-center min-w-[3rem] h-12 px-3 bg-white/20 text-white rounded-xl text-xl font-black border border-white/30"
                >
                  {{ num }}
                </span>
              </div>

              <!-- Nome único -->
              <div v-else-if="tipoSorteio === 'nomes' && resultadoNomes.length === 1" class="text-3xl font-black text-white mb-2 break-words px-2">
                {{ resultadoNomes[0] }}
              </div>

              <!-- Múltiplos nomes -->
              <div v-else class="space-y-2 max-h-48 overflow-y-auto px-2">
                <div
                  v-for="(nome, i) in resultadoNomes" :key="i"
                  class="bg-white/15 text-white rounded-xl px-4 py-2 text-base font-semibold border border-white/20 text-left"
                >
                  {{ i + 1 }}. {{ nome }}
                </div>
              </div>
            </div>
          </div>
        </Transition>

        <!-- Empty state -->
        <div v-if="!exibirResultado" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-dice text-4xl mb-3 opacity-30 block text-purple-400"></i>
          <p class="text-sm">Configure o sorteio e clique em "Sortear"</p>
        </div>

        <!-- Histórico -->
        <div v-if="historico.length > 0" class="glass-panel p-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
              <i class="fas fa-history text-purple-500"></i>
              Histórico de Sorteios
            </h4>
            <button @click="limparHistorico" class="text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">
              <i class="fas fa-trash-alt mr-1"></i>
              Limpar
            </button>
          </div>
          <div class="space-y-2 max-h-48 overflow-y-auto">
            <div v-for="(item, i) in historico" :key="i" class="flex justify-between items-start text-xs py-1.5 border-b border-gray-100 dark:border-slate-700 last:border-0">
              <div>
                <span :class="['badge-aurora mr-1', item.tipo === 'numeros' ? 'badge-aurora-blue' : 'badge-aurora-purple']">
                  {{ item.tipo === 'numeros' ? '🔢' : '👥' }}
                </span>
                <span class="text-gray-700 dark:text-slate-200">{{ item.resultado }}</span>
              </div>
              <span class="text-gray-400 ml-2 shrink-0">{{ item.data }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const tipoSorteio      = ref('numeros')
const numeroMin        = ref(1)
const numeroMax        = ref(100)
const quantidade       = ref(1)
const permitirRepetidos = ref(false)
const listaNomes       = ref('')
const quantidadeNomes  = ref(1)
const exibirResultado  = ref(false)
const animando         = ref(false)
interface HistoricoItem { tipo: string; resultado: string; data: string }
const resultadoNumeros = ref<number[]>([])
const resultadoNomes   = ref<string[]>([])
const historico        = ref<HistoricoItem[]>([])

const nomesArray = computed(() =>
  listaNomes.value.split('\n').map(n => n.trim()).filter(n => n.length > 0)
)

const podeSortear = computed(() => {
  if (tipoSorteio.value === 'numeros') {
    const min = Number(numeroMin.value), max = Number(numeroMax.value), qtd = Number(quantidade.value)
    if (min >= max || qtd < 1) return false
    if (!permitirRepetidos.value && qtd > (max - min + 1)) return false
    return true
  }
  return nomesArray.value.length > 0 && quantidadeNomes.value > 0 && quantidadeNomes.value <= nomesArray.value.length
})

async function sortear() {
  if (!podeSortear.value) {
    Swal.fire({ icon: 'error', title: 'Erro', text: tipoSorteio.value === 'numeros' ? 'Verifique os valores informados.' : 'Adicione nomes à lista antes de sortear.', confirmButtonColor: '#2563eb' })
    return
  }
  animando.value = true; exibirResultado.value = true
  await new Promise(r => setTimeout(r, 800))

  if (tipoSorteio.value === 'numeros') {
    const min = Number(numeroMin.value), max = Number(numeroMax.value), qtd = Number(quantidade.value)
    const numeros = []
    if (permitirRepetidos.value) {
      for (let i = 0; i < qtd; i++) numeros.push(Math.floor(Math.random() * (max - min + 1)) + min)
    } else {
      const disp = Array.from({ length: max - min + 1 }, (_, i) => i + min)
      for (let i = 0; i < qtd; i++) {
        const idx = Math.floor(Math.random() * disp.length)
        numeros.push(disp[idx]); disp.splice(idx, 1)
      }
    }
    resultadoNumeros.value = numeros.sort((a, b) => a - b)
    adicionarHistorico({ tipo: 'numeros', resultado: resultadoNumeros.value.join(', '), data: new Date().toLocaleString('pt-BR') })
  } else {
    const qtd = Number(quantidadeNomes.value), nomes = [...nomesArray.value], sorteados = []
    for (let i = 0; i < qtd; i++) {
      const idx = Math.floor(Math.random() * nomes.length)
      sorteados.push(nomes[idx]); nomes.splice(idx, 1)
    }
    resultadoNomes.value = sorteados
    adicionarHistorico({ tipo: 'nomes', resultado: sorteados.join(', '), data: new Date().toLocaleString('pt-BR') })
  }
  animando.value = false
}

function adicionarHistorico(item: HistoricoItem) {
  historico.value.unshift(item)
  if (historico.value.length > 10) historico.value.pop()
}

function limparHistorico() { historico.value = [] }

function limpar() {
  exibirResultado.value = false; resultadoNumeros.value = []; resultadoNomes.value = []
  if (tipoSorteio.value === 'numeros') {
    numeroMin.value = 1; numeroMax.value = 100; quantidade.value = 1; permitirRepetidos.value = false
  } else {
    listaNomes.value = ''; quantidadeNomes.value = 1
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

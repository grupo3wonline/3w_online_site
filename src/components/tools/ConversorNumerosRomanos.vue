<template>
  <ToolShell
    title="Conversor de Números Romanos"
    description="Converta números arábicos para romanos e vice-versa. Suporte de 1 a 3.999 com exemplos históricos."
    icon="fa-landmark"
    icon-gradient="from-amber-500 to-yellow-700"
    orb-color="orange"
    :quick-tips="['Arábico ↔ Romano', 'Suporte 1 – 3.999', 'Exemplos históricos']"
    :tips="[
      { title: 'Regra de subtração', text: 'IV = 4, IX = 9, XL = 40, XC = 90, CD = 400, CM = 900. O símbolo menor antes do maior indica subtração.', type: 'info' },
      { title: 'Limite máximo', text: 'O sistema romano tradicional vai até 3.999 (MMMCMXCIX). Acima disso, eram usadas barras sobre as letras para multiplicar por 1.000.', type: 'warning' },
      { title: 'Regra de repetição', text: 'Um símbolo pode aparecer no máximo 3 vezes seguidas (III = 3, não IIII). Exceto M, que pode aparecer 4+ vezes.', type: 'info' },
    ]"
    :examples="[
      { title: 'Ano atual', desc: '2024 (arábico) para romano', result: 'MMXXIV' },
      { title: 'Super Bowl', desc: 'Super Bowl LV = ?', result: 'LV = 55 | LVI = 56 | LVII = 57 | LVIII = 58' },
      { title: 'Regra IX', desc: 'IX, XL, CD e CM são formas subtrativas', result: 'IX=9, XL=40, XC=90, CD=400, CM=900' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Entrada -->
      <div class="space-y-4">
        <!-- Seletor de modo -->
        <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl">
          <button
            @click="modo = 'arabico-romano'; converter()"
            :class="[
              'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
              modo === 'arabico-romano' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
            ]"
          >
            <i class="fas fa-arrow-right mr-1.5"></i>Arábico → Romano
          </button>
          <button
            @click="modo = 'romano-arabico'; converter()"
            :class="[
              'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
              modo === 'romano-arabico' ? 'bg-amber-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
            ]"
          >
            <i class="fas fa-arrow-left mr-1.5"></i>Romano → Arábico
          </button>
        </div>

        <div class="tool-body !mb-0">
          <BaseInput
            v-model="input"
            :label="modo === 'arabico-romano' ? 'Número Arábico (1–3999)' : 'Número Romano'"
            icon="fa-keyboard"
            :placeholder="modo === 'arabico-romano' ? '2024' : 'MMXXIV'"
            :tooltip="modo === 'arabico-romano' ? 'Digite um número inteiro entre 1 e 3.999.' : 'Use apenas os símbolos I, V, X, L, C, D, M.'"
            :hint="modo === 'arabico-romano' ? 'Intervalo: 1 a 3.999' : 'Ex: XIV, MMXXIV, MCMXCIX'"
            @input="converter"
          />

          <div class="flex gap-3 mt-4">
            <BaseButton variant="success" icon="fa-sync-alt" @click="converter" class="flex-1">
              Converter
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Exemplos rápidos -->
        <div class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-bookmark text-amber-500"></i>
            Exemplos históricos
          </h4>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="ex in exemplos"
              :key="ex.arabico"
              @click="usarExemplo(ex)"
              class="p-2 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-amber-50/50 dark:hover:bg-amber-900/10 transition-all text-center"
            >
              <div class="text-base font-black text-amber-600 dark:text-amber-400">{{ ex.romano }}</div>
              <div class="text-xs text-gray-500 dark:text-slate-400">= {{ ex.arabico }}</div>
            </button>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="output" class="space-y-4">
            <div class="tool-header text-center py-10">
              <p class="text-sm text-blue-200 mb-3">Resultado</p>
              <p class="text-6xl font-black text-white tracking-wider">{{ output }}</p>
              <div class="mt-4">
                <BaseButton variant="glass" size="sm" icon="fa-copy" @click="copiar">
                  Copiar resultado
                </BaseButton>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
                <div class="metric-glass-value text-amber-600 dark:text-amber-400">{{ modo === 'arabico-romano' ? input : output }}</div>
                <div class="metric-glass-label">Arábico</div>
              </div>
              <div class="metric-glass ring-1 ring-yellow-100 dark:ring-yellow-900">
                <div class="metric-glass-value text-yellow-600 dark:text-yellow-400">{{ modo === 'romano-arabico' ? input.toUpperCase() : output }}</div>
                <div class="metric-glass-label">Romano</div>
              </div>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">O número romano possui <strong>{{ output.length }}</strong> símbolo(s). Clique nos exemplos históricos para explorar mais conversões.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!output" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-landmark text-3xl mb-3 opacity-30 block text-amber-400"></i>
          <p class="text-sm">Digite um número ou clique em um exemplo histórico para converter</p>
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
import Swal from 'sweetalert2'

const modo   = ref('arabico-romano')
const input  = ref('2024')
const output = ref('')

const exemplos = [
  { arabico: '1',    romano: 'I'       },
  { arabico: '10',   romano: 'X'       },
  { arabico: '50',   romano: 'L'       },
  { arabico: '100',  romano: 'C'       },
  { arabico: '500',  romano: 'D'       },
  { arabico: '1000', romano: 'M'       },
  { arabico: '2024', romano: 'MMXXIV'  },
  { arabico: '1999', romano: 'MCMXCIX' },
  { arabico: '444',  romano: 'CDXLIV'  },
]

const arabicoParaRomano = (num) => {
  const n = parseInt(num)
  if (isNaN(n) || n < 1 || n > 3999) throw new Error('Digite um número entre 1 e 3.999')
  const tbl = [{v:1000,s:'M'},{v:900,s:'CM'},{v:500,s:'D'},{v:400,s:'CD'},{v:100,s:'C'},{v:90,s:'XC'},{v:50,s:'L'},{v:40,s:'XL'},{v:10,s:'X'},{v:9,s:'IX'},{v:5,s:'V'},{v:4,s:'IV'},{v:1,s:'I'}]
  let r = '', rest = n
  for (const { v, s } of tbl) while (rest >= v) { r += s; rest -= v }
  return r
}

const romanoParaArabico = (romano) => {
  const str = romano.toUpperCase().trim()
  if (!/^[MDCLXVI]+$/.test(str)) throw new Error('Use apenas algarismos romanos: M, D, C, L, X, V, I')
  const vals = { M:1000, D:500, C:100, L:50, X:10, V:5, I:1 }
  let total = 0, prev = 0
  for (let i = str.length - 1; i >= 0; i--) {
    const cur = vals[str[i]]
    total += cur < prev ? -cur : cur
    prev = cur
  }
  return total.toString()
}

const converter = () => {
  if (!input.value.trim()) { output.value = ''; return }
  try {
    output.value = modo.value === 'arabico-romano'
      ? arabicoParaRomano(input.value)
      : romanoParaArabico(input.value)
  } catch (e) {
    output.value = ''
    Swal.fire({ title: 'Erro', text: e.message, icon: 'error', confirmButtonColor: '#2563eb' })
  }
}

const usarExemplo = (ex) => {
  if (modo.value === 'arabico-romano') input.value = ex.arabico
  else input.value = ex.romano
  converter()
}

const limpar = () => { input.value = ''; output.value = '' }

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    Swal.fire({ title: 'Copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

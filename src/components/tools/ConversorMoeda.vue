<template>
  <ToolShell
    title="Conversor de Moedas"
    description="Converta entre as principais moedas mundiais com taxas aproximadas. Para operações financeiras, consulte seu banco."
    icon="fa-money-bill-wave"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['15+ moedas', 'Conversão bidirecional', 'Tabela completa']"
    :tips="[
      { title: 'Taxas estimadas', text: 'As taxas desta calculadora são referências aproximadas. Para câmbio real, consulte seu banco ou corretora.' },
      { title: 'IOF e spread', text: 'Ao comprar moeda no banco, o valor real inclui IOF (1,1% a 6,38%) e spread bancário.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Real para Dólar', desc: 'R$ 1.000 BRL',   result: 'Aprox. US$ 200 USD (taxa ~5.0)' },
      { title: 'Euro para Real',  desc: '€ 500 EUR',       result: 'Aprox. R$ 2.750 BRL (taxa ~5.5)' },
    ]"
  >

    <div class="tool-body">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <!-- De -->
        <div>
          <label class="input-aurora-label">
            <i class="fas fa-arrow-right-from-bracket mr-1.5 text-blue-500"></i>
            De
          </label>
          <div class="flex gap-2">
            <select v-model="moedaDe" class="input-aurora w-24 flex-shrink-0" @change="converter">
              <option v-for="m in moedas" :key="m.code" :value="m.code">{{ m.code }}</option>
            </select>
            <input v-model.number="valorDe" type="number" min="0" step="0.01"
              class="input-aurora flex-1" placeholder="1000" @input="converter" />
          </div>
          <p class="input-aurora-hint">{{ moedas.find(m => m.code === moedaDe)?.nome }}</p>
        </div>

        <!-- Troca -->
        <div class="flex flex-col sm:items-start">
          <div class="hidden sm:flex items-end h-10 pb-1 mt-6">
            <button @click="trocar" class="copy-btn" title="Trocar moedas">
              <i class="fas fa-arrows-rotate"></i>
              Trocar
            </button>
          </div>
        </div>

        <!-- Para -->
        <div class="sm:-mt-2">
          <label class="input-aurora-label">
            <i class="fas fa-arrow-right-to-bracket mr-1.5 text-teal-500"></i>
            Para
          </label>
          <div class="flex gap-2">
            <select v-model="moedaPara" class="input-aurora w-24 flex-shrink-0" @change="converter">
              <option v-for="m in moedas" :key="m.code" :value="m.code">{{ m.code }}</option>
            </select>
            <div class="flex-1 relative">
              <input :value="valorPara.toFixed(2)" readonly
                class="input-aurora w-full font-bold text-primary-700 dark:text-primary-300 bg-primary-50 dark:bg-primary-900/20 cursor-default" />
              <button @click="copiarResultado" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary-600 transition-colors" title="Copiar">
                <i class="fas fa-copy text-xs"></i>
              </button>
            </div>
          </div>
          <p class="input-aurora-hint">{{ moedas.find(m => m.code === moedaPara)?.nome }}</p>
        </div>

        <div class="flex items-end sm:mt-0 mt-0">
          <button @click="trocar" class="btn-aurora w-full sm:w-auto">
            <i class="fas fa-arrows-rotate mr-1.5"></i>
            Inverter moedas
          </button>
        </div>
      </div>

      <!-- Taxa e resultado -->
      <div v-if="taxa" class="tool-result-info">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p class="text-sm text-blue-800 dark:text-blue-200">
              <strong>1 {{ moedaDe }}</strong> = <strong>{{ taxa.toFixed(4) }} {{ moedaPara }}</strong>
            </p>
            <p class="text-xs text-blue-600 dark:text-blue-300 mt-0.5">
              Inverso: 1 {{ moedaPara }} = {{ (1/taxa).toFixed(4) }} {{ moedaDe }}
            </p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-black text-blue-700 dark:text-blue-300">
              {{ moedas.find(m => m.code === moedaPara)?.symbol }}{{ valorPara.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
            </p>
            <p class="text-xs text-blue-500 dark:text-blue-400">{{ moedas.find(m => m.code === moedaPara)?.nome }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabela comparativa de todas as moedas -->
    <div class="mt-4">
      <button @click="tabelaOpen = !tabelaOpen" class="accordion-trigger">
        <span class="flex items-center gap-2 text-sm">
          <i class="fas fa-table text-primary-500"></i>
          Tabela completa — {{ valorDe }} {{ moedaDe }} em outras moedas
        </span>
        <i :class="['fas', tabelaOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400']"></i>
      </button>
      <Transition name="accordion">
        <div v-if="tabelaOpen" class="mt-3 glass-panel overflow-hidden">
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0 divide-x divide-y divide-gray-100 dark:divide-slate-700">
            <div
              v-for="m in moedasOrdenadas"
              :key="m.code"
              class="p-3 hover:bg-primary-50/50 dark:hover:bg-primary-900/10 transition-colors cursor-pointer"
              @click="moedaPara = m.code; converter()"
            >
              <div class="flex items-center justify-between gap-2">
                <div>
                  <span class="font-bold text-sm text-gray-900 dark:text-white">{{ m.code }}</span>
                  <span class="text-[10px] text-gray-500 dark:text-slate-400 ml-1">{{ m.symbol }}</span>
                </div>
                <span class="text-xs font-semibold text-primary-600 dark:text-primary-400 tabular-nums">
                  {{ (valorDe * taxas[moedaDe] / taxas[m.code]).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                </span>
              </div>
              <p class="text-[10px] text-gray-400 dark:text-slate-500 truncate">{{ m.nome }}</p>
            </div>
          </div>
        </div>
      </Transition>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'

const tabelaOpen = ref(false)
const moedaDe    = ref('BRL')
const moedaPara  = ref('USD')
const valorDe    = ref<number>(1000)
const valorPara  = ref(0)
const taxa       = ref(0)

// Taxas aproximadas relativas ao USD
const taxas: Record<string, number> = {
  USD: 1, EUR: 0.93, GBP: 0.79, JPY: 148.5, BRL: 5.05,
  ARS: 835, CAD: 1.37, AUD: 1.54, CHF: 0.89, CNY: 7.24,
  MXN: 17.1, CLP: 950, COP: 4100, PEN: 3.73,
  NZD: 1.63, ZAR: 18.6, INR: 83.2, NOK: 10.6, SEK: 10.9, DKK: 6.92,
}

interface Moeda { code: string; nome: string; symbol: string }

const moedas: Moeda[] = [
  { code: 'BRL', nome: 'Real Brasileiro',       symbol: 'R$'   },
  { code: 'USD', nome: 'Dólar Americano',        symbol: '$'    },
  { code: 'EUR', nome: 'Euro',                   symbol: '€'    },
  { code: 'GBP', nome: 'Libra Esterlina',        symbol: '£'    },
  { code: 'JPY', nome: 'Iene Japonês',           symbol: '¥'    },
  { code: 'CAD', nome: 'Dólar Canadense',        symbol: 'C$'   },
  { code: 'AUD', nome: 'Dólar Australiano',      symbol: 'A$'   },
  { code: 'CHF', nome: 'Franco Suíço',           symbol: 'Fr'   },
  { code: 'CNY', nome: 'Yuan Chinês',            symbol: '¥'    },
  { code: 'MXN', nome: 'Peso Mexicano',          symbol: '$'    },
  { code: 'ARS', nome: 'Peso Argentino',         symbol: '$'    },
  { code: 'CLP', nome: 'Peso Chileno',           symbol: '$'    },
  { code: 'COP', nome: 'Peso Colombiano',        symbol: '$'    },
  { code: 'PEN', nome: 'Sol Peruano',            symbol: 'S/'   },
  { code: 'NZD', nome: 'Dólar Neozelandês',      symbol: 'NZ$'  },
  { code: 'ZAR', nome: 'Rand Sul-Africano',      symbol: 'R'    },
  { code: 'INR', nome: 'Rúpia Indiana',          symbol: '₹'    },
  { code: 'NOK', nome: 'Coroa Norueguesa',       symbol: 'kr'   },
  { code: 'SEK', nome: 'Coroa Sueca',            symbol: 'kr'   },
  { code: 'DKK', nome: 'Coroa Dinamarquesa',     symbol: 'kr'   },
]

const moedasOrdenadas = computed(() => moedas.filter(m => m.code !== moedaDe.value))

function converter() {
  const vd = Number(valorDe.value) || 0
  const rDe = taxas[moedaDe.value]
  const rPa = taxas[moedaPara.value]
  if (!rDe || !rPa) return
  taxa.value     = rPa / rDe
  valorPara.value = vd * taxa.value
}

function trocar() {
  const tmp   = moedaDe.value
  moedaDe.value  = moedaPara.value
  moedaPara.value = tmp
  converter()
}

async function copiarResultado() {
  await navigator.clipboard.writeText(valorPara.value.toFixed(2))
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1500 })
}

converter()
</script>

<style scoped>
.accordion-enter-active, .accordion-leave-active { transition: all 0.25s ease; overflow: hidden; max-height: 600px; }
.accordion-enter-from, .accordion-leave-to       { max-height: 0; opacity: 0; }
</style>

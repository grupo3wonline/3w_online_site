<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

type Tab = 'preco' | 'parcelamento' | 'orcamento'
const activeTab = ref<Tab>('preco')
const notification = ref('')

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
function parse(s: string) { return parseFloat(s.replace(',', '.')) || 0 }

// === Preço de Venda ===
const custo = ref('')
const metodo = ref<'margem' | 'markup'>('margem')
const percentual = ref('')

const resultPreco = computed(() => {
  const c = parse(custo.value)
  const p = parse(percentual.value)
  if (c <= 0 || p <= 0) return null
  const precoVenda = metodo.value === 'margem' ? c / (1 - p / 100) : c * (1 + p / 100)
  const lucro = precoVenda - c
  const markup = precoVenda / c
  const margemLiq = (lucro / precoVenda) * 100
  return { precoVenda, lucro, markup, margemLiq }
})

// === Parcelamento ===
const valorParc = ref('')
const nParcelas = ref('12')
const jurosMes = ref('')

const resultParc = computed(() => {
  const v = parse(valorParc.value)
  const n = parseInt(nParcelas.value) || 1
  const j = parse(jurosMes.value) / 100
  if (v <= 0) return null
  if (j <= 0) {
    const parc = v / n
    return { valorParcela: parc, totalPago: v, totalJuros: 0, parcelas: Array.from({ length: Math.min(n, 24) }, (_, i) => ({ num: i + 1, val: parc })) }
  }
  // Tabela Price
  const parc = v * (j * Math.pow(1 + j, n)) / (Math.pow(1 + j, n) - 1)
  const totalPago = parc * n
  const totalJuros = totalPago - v
  return { valorParcela: parc, totalPago, totalJuros, parcelas: Array.from({ length: Math.min(n, 24) }, (_, i) => ({ num: i + 1, val: parc })) }
})

// === Orçamento ===
const orcItems = ref([{ desc: '', qty: 1, price: 0 }])
const orcDiscount = ref(0)
const orcObs = ref('')

const orcSubtotal = computed(() => orcItems.value.reduce((s, i) => s + i.qty * i.price, 0))
const orcTotal = computed(() => Math.max(0, orcSubtotal.value - orcDiscount.value))

function addItem() { orcItems.value.push({ desc: '', qty: 1, price: 0 }) }
function removeItem(i: number) { if (orcItems.value.length > 1) orcItems.value.splice(i, 1) }

function printOrc() {
  const lines = orcItems.value.map(it => `${it.desc} x${it.qty} = ${fmt(it.qty * it.price)}`).join('\n')
  const content = `ORÇAMENTO\n${'='.repeat(40)}\n${lines}\n${'='.repeat(40)}\nSubtotal: ${fmt(orcSubtotal.value)}\nDesconto: ${fmt(orcDiscount.value)}\nTOTAL: ${fmt(orcTotal.value)}\n\nObservações: ${orcObs.value}`
  navigator.clipboard.writeText(content)
  toast('Orçamento copiado!')
}

function toast(msg: string) {
  notification.value = msg; setTimeout(() => { notification.value = '' }, 2000)
}
</script>

<template>
  <ToolShell

    title="Empreenda Fácil"

    description="Ferramenta completa de planejamento para empreendedores e pequenos negócios."

    icon="fa-store"

    icon-gradient="from-amber-500 to-orange-600"

    orb-color="orange"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:store" class="text-orange-400 w-7 h-7" />
        Empreenda Fácil
      </h1>
      <p class="text-blue-200 text-sm">Ferramentas de gestão comercial para empreendedores</p>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2">
      <button v-for="[id, lbl, ic] in [['preco','Preço de Venda','mdi:tag'], ['parcelamento','Parcelamento','mdi:credit-card'], ['orcamento','Orçamento','mdi:file-document']] as const"
        :key="id" @click="activeTab = id"
        :class="['flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border',
          activeTab === id ? 'bg-orange-600 border-orange-500 text-white' : 'bg-[#0f1e3c] border-white/10 text-blue-200 hover:bg-white/10']">
        <Icon :icon="ic" class="w-4 h-4" />{{ lbl }}
      </button>
    </div>

    <!-- Preço de Venda -->
    <div v-if="activeTab === 'preco'" class="grid lg:grid-cols-2 gap-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:tag" class="text-orange-400 w-5 h-5" /> Precificação</h2>
        <div class="space-y-3">
          <div>
            <label class="input-aurora-label">Custo do produto/serviço (R$)</label>
            <input v-model="custo" type="number" step="0.01" min="0" placeholder="100,00" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Método</label>
            <div class="flex gap-2">
              <button @click="metodo = 'margem'" :class="['flex-1 py-2 rounded-lg text-sm font-medium transition-all', metodo === 'margem' ? 'bg-orange-600 text-white' : 'bg-white/5 text-blue-200 hover:bg-white/10']">Margem sobre venda</button>
              <button @click="metodo = 'markup'" :class="['flex-1 py-2 rounded-lg text-sm font-medium transition-all', metodo === 'markup' ? 'bg-orange-600 text-white' : 'bg-white/5 text-blue-200 hover:bg-white/10']">Markup sobre custo</button>
            </div>
          </div>
          <div>
            <label class="input-aurora-label">{{ metodo === 'markup' ? 'Markup (%)' : 'Margem (%)' }}</label>
            <input v-model="percentual" type="number" step="0.1" min="0" placeholder="30" autocomplete="off"
              class="w-full input-aurora" />
          </div>
        </div>
      </div>
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:calculator" class="text-orange-400 w-5 h-5" /> Resultado</h2>
        <template v-if="resultPreco">
          <div class="space-y-2">
            <div class="flex justify-between text-sm"><span class="text-blue-200">Custo:</span><span class="text-white">{{ fmt(parse(custo)) }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-blue-200">Lucro:</span><span class="text-green-400">{{ fmt(resultPreco.lucro) }}</span></div>
            <div class="flex justify-between text-sm"><span class="text-blue-200">Markup:</span><span class="text-white">{{ resultPreco.markup.toFixed(2) }}x</span></div>
            <div class="flex justify-between text-sm"><span class="text-blue-200">Margem líquida:</span><span class="text-white">{{ resultPreco.margemLiq.toFixed(1) }}%</span></div>
            <div class="border-t border-white/10 pt-2 flex justify-between text-lg font-bold">
              <span class="text-white">Preço de venda:</span>
              <span class="text-orange-400">{{ fmt(resultPreco.precoVenda) }}</span>
            </div>
          </div>
        </template>
        <div v-else class="text-center py-8">
          <Icon icon="mdi:tag-outline" class="w-12 h-12 text-orange-400/20 mx-auto mb-2" />
          <p class="text-blue-200 text-sm">Preencha os dados para calcular</p>
        </div>
      </div>
    </div>

    <!-- Parcelamento -->
    <div v-if="activeTab === 'parcelamento'" class="grid lg:grid-cols-2 gap-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:credit-card" class="text-orange-400 w-5 h-5" /> Dados</h2>
        <div class="space-y-3">
          <div>
            <label class="input-aurora-label">Valor total (R$)</label>
            <input v-model="valorParc" type="number" step="0.01" min="0" placeholder="1200,00" autocomplete="off"
              class="w-full input-aurora" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="input-aurora-label">Nº de parcelas</label>
              <input v-model="nParcelas" type="number" min="1" max="60" autocomplete="off"
                class="w-full input-aurora" />
            </div>
            <div>
              <label class="input-aurora-label">Juros ao mês (%)</label>
              <input v-model="jurosMes" type="number" step="0.01" min="0" placeholder="0 = sem juros" autocomplete="off"
                class="w-full input-aurora" />
            </div>
          </div>
        </div>
      </div>
      <div class="glass-panel p-5 space-y-3">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:calculator" class="text-orange-400 w-5 h-5" /> Resultado</h2>
        <template v-if="resultParc">
          <div class="text-center bg-orange-600/20 rounded-lg p-3 mb-2">
            <p class="text-blue-200 text-xs">Valor da parcela</p>
            <p class="text-orange-300 text-2xl font-bold">{{ fmt(resultParc.valorParcela) }}</p>
          </div>
          <div class="space-y-1 text-sm">
            <div class="flex justify-between"><span class="text-blue-200">Total pago:</span><span class="text-white">{{ fmt(resultParc.totalPago) }}</span></div>
            <div class="flex justify-between"><span class="text-blue-200">Total de juros:</span><span class="text-red-300">{{ fmt(resultParc.totalJuros) }}</span></div>
          </div>
          <div class="max-h-40 overflow-y-auto space-y-1 mt-2">
            <div v-for="p in resultParc.parcelas" :key="p.num" class="flex justify-between text-xs bg-[#0a1628] rounded px-2 py-1">
              <span class="text-blue-200">Parcela {{ p.num }}</span>
              <span class="text-white">{{ fmt(p.val) }}</span>
            </div>
          </div>
        </template>
        <div v-else class="text-center py-8">
          <Icon icon="mdi:credit-card-outline" class="w-12 h-12 text-orange-400/20 mx-auto mb-2" />
          <p class="text-blue-200 text-sm">Preencha os dados para simular</p>
        </div>
      </div>
    </div>

    <!-- Orçamento -->
    <div v-if="activeTab === 'orcamento'" class="space-y-4">
      <div class="glass-panel p-5 space-y-4">
        <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:file-document" class="text-orange-400 w-5 h-5" /> Itens do Orçamento</h2>
        <div class="space-y-2">
          <div v-for="(item, i) in orcItems" :key="i" class="grid grid-cols-12 gap-2 items-center">
            <input v-model="item.desc" placeholder="Descrição do item" autocomplete="off"
              class="col-span-6 bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
            <input v-model.number="item.qty" type="number" min="1" placeholder="Qtd"
              class="col-span-2 bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-2 text-sm text-center focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
            <input v-model.number="item.price" type="number" min="0" step="0.01" placeholder="Valor"
              class="col-span-3 bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
            <button @click="removeItem(i)" class="col-span-1 text-red-400 hover:text-red-300 flex justify-center">
              <Icon icon="mdi:trash-can" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <button @click="addItem" class="text-blue-300 hover:text-white text-sm flex items-center gap-1.5 transition-colors">
          <Icon icon="mdi:plus" class="w-4 h-4" /> Adicionar item
        </button>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="input-aurora-label">Desconto (R$)</label>
            <input v-model.number="orcDiscount" type="number" min="0" step="0.01" placeholder="0"
              class="w-full input-aurora" />
          </div>
          <div>
            <label class="input-aurora-label">Observações</label>
            <input v-model="orcObs" type="text" placeholder="Informações adicionais" autocomplete="off"
              class="w-full input-aurora" />
          </div>
        </div>
      </div>

      <div class="glass-panel p-5 space-y-3">
        <div class="flex justify-between text-sm"><span class="text-blue-200">Subtotal:</span><span class="text-white">{{ fmt(orcSubtotal) }}</span></div>
        <div v-if="orcDiscount > 0" class="flex justify-between text-sm"><span class="text-blue-200">Desconto:</span><span class="text-red-300">-{{ fmt(orcDiscount) }}</span></div>
        <div class="flex justify-between text-lg font-bold border-t border-white/10 pt-2">
          <span class="text-white">Total:</span><span class="text-orange-400">{{ fmt(orcTotal) }}</span>
        </div>
        <button @click="printOrc" class="w-full bg-orange-600 hover:bg-orange-500 text-white py-2.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors">
          <Icon icon="mdi:content-copy" class="w-4 h-4" /> Copiar Orçamento
        </button>
      </div>
    </div>

    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">{{ notification }}</div>
    </Transition>
  


  </ToolShell></template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
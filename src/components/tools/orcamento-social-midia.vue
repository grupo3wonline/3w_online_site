<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, reactive, computed } from 'vue'
import { Icon } from '@iconify/vue'

type DiscountType = 'percent' | 'fixed'

interface Service {
  id: number
  name: string
  category: string
  enabled: boolean
  price: number
  quantity: number
  custom?: boolean
}

function fmt(v: number) {
  return v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const client = reactive({
  providerName: '',
  providerContact: '',
  clientName: '',
  clientEmail: '',
  observations: '',
  validityDays: 15,
})

let nextId = 100
const defaultServices: Service[] = [
  { id: 1, name: 'Gestão de Instagram', category: 'Redes Sociais', enabled: false, price: 800, quantity: 1 },
  { id: 2, name: 'Gestão de Facebook', category: 'Redes Sociais', enabled: false, price: 600, quantity: 1 },
  { id: 3, name: 'Gestão de LinkedIn', category: 'Redes Sociais', enabled: false, price: 700, quantity: 1 },
  { id: 4, name: 'Criação de Conteúdo (mensal)', category: 'Conteúdo', enabled: false, price: 1200, quantity: 1 },
  { id: 5, name: 'Design de Posts (pack 15)', category: 'Conteúdo', enabled: false, price: 500, quantity: 1 },
  { id: 6, name: 'Stories (pack 20)', category: 'Conteúdo', enabled: false, price: 400, quantity: 1 },
  { id: 7, name: 'Tráfego Pago (gestão)', category: 'Mídia Paga', enabled: false, price: 900, quantity: 1 },
  { id: 8, name: 'Relatório de Performance', category: 'Análise', enabled: false, price: 350, quantity: 1 },
  { id: 9, name: 'Consultoria Estratégica (hora)', category: 'Consultoria', enabled: false, price: 250, quantity: 1 },
  { id: 10, name: 'Identidade Visual', category: 'Design', enabled: false, price: 2000, quantity: 1 },
]

const services = ref<Service[]>(defaultServices.map(s => ({ ...s })))
const discountType = ref<DiscountType>('percent')
const discountValue = ref(0)
const budgetNumber = ref(`ORÇ-${Date.now().toString().slice(-6)}`)
const notification = ref('')
const copied = ref(false)

const lineSubtotal = (s: Service) => s.price * s.quantity
const enabledServices = computed(() => services.value.filter(s => s.enabled))
const subtotal = computed(() => enabledServices.value.reduce((acc, s) => acc + lineSubtotal(s), 0))
const discountAmount = computed(() => {
  if (!discountValue.value) return 0
  return discountType.value === 'percent'
    ? Math.min(subtotal.value, (subtotal.value * discountValue.value) / 100)
    : Math.min(subtotal.value, discountValue.value)
})
const total = computed(() => Math.max(0, subtotal.value - discountAmount.value))
const hasSelection = computed(() => enabledServices.value.length > 0)

function addCustomService() {
  services.value.push({
    id: ++nextId,
    name: `Serviço Personalizado ${nextId - 99}`,
    category: 'Personalizado',
    enabled: true,
    price: 0,
    quantity: 1,
    custom: true,
  })
}

function removeService(id: number) {
  services.value = services.value.filter(s => s.id !== id)
}

function reset() {
  services.value = defaultServices.map(s => ({ ...s }))
  discountValue.value = 0
  discountType.value = 'percent'
  budgetNumber.value = `ORÇ-${Date.now().toString().slice(-6)}`
  Object.assign(client, { providerName: '', providerContact: '', clientName: '', clientEmail: '', observations: '', validityDays: 15 })
}

async function copySummary() {
  const lines = [
    `ORÇAMENTO Nº ${budgetNumber.value}`,
    '='.repeat(40),
    `Prestador: ${client.providerName || 'Não informado'}`,
    `Cliente: ${client.clientName || 'Não informado'}`,
    '',
    'SERVIÇOS:',
    ...enabledServices.value.map(s => `  ${s.name} x${s.quantity} = ${fmt(lineSubtotal(s))}`),
    '',
    `Subtotal: ${fmt(subtotal.value)}`,
    discountAmount.value > 0 ? `Desconto: -${fmt(discountAmount.value)}` : '',
    `TOTAL: ${fmt(total.value)}`,
    '',
    `Validade: ${client.validityDays} dias`,
    client.observations ? `Observações: ${client.observations}` : '',
  ].filter(Boolean)

  await navigator.clipboard.writeText(lines.join('\n'))
  copied.value = true
  notification.value = 'Orçamento copiado!'
  setTimeout(() => { copied.value = false; notification.value = '' }, 2000)
}

function toast(msg: string) { notification.value = msg; setTimeout(() => { notification.value = '' }, 2000) }
</script>

<template>
  <ToolShell

    title="Orçamento Social Mídia"

    description="Monte o orçamento completo para gerenciamento de redes sociais de clientes."

    icon="fa-chart-bar"

    icon-gradient="from-pink-500 to-rose-700"

    orb-color="purple"

    :quick-tips="['Resultados instantâneos', 'Sem cadastro', '100% client-side']"

    :tips="[{ title: 'Uso recomendado', text: 'Preencha todos os campos e veja o resultado em tempo real.' }]"

  >

    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:calculator" class="text-purple-400 w-7 h-7" />
        Orçamento Social Mídia
      </h1>
      <p class="text-blue-200 text-sm">Calculadora de orçamento para serviços de marketing digital</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-5">
      <!-- Left: config -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Provider / Client -->
        <div class="glass-panel p-5 space-y-3">
          <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:account-tie" class="text-purple-400 w-5 h-5" /> Dados do Prestador</h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <input v-model="client.providerName" type="text" placeholder="Seu nome / empresa" autocomplete="off"
              class="input-aurora" />
            <input v-model="client.providerContact" type="text" placeholder="Contato (tel / e-mail)" autocomplete="off"
              class="input-aurora" />
          </div>
        </div>

        <div class="glass-panel p-5 space-y-3">
          <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:file-account" class="text-purple-400 w-5 h-5" /> Dados do Cliente</h2>
          <div class="grid sm:grid-cols-2 gap-3">
            <input v-model="client.clientName" type="text" placeholder="Nome do cliente" autocomplete="off"
              class="input-aurora" />
            <input v-model="client.clientEmail" type="email" placeholder="E-mail" autocomplete="off"
              class="input-aurora" />
          </div>
          <textarea v-model="client.observations" rows="2" placeholder="Observações sobre o projeto..."
            class="w-full input-aurora" />
        </div>

        <!-- Services -->
        <div class="glass-panel p-5 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:format-list-checks" class="text-purple-400 w-5 h-5" /> Serviços</h2>
            <button @click="addCustomService" class="bg-purple-700 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <Icon icon="mdi:plus" class="w-3.5 h-3.5" /> Personalizado
            </button>
          </div>
          <div class="space-y-2">
            <div v-for="svc in services" :key="svc.id"
              :class="['rounded-lg border p-3 transition-all', svc.enabled ? 'border-purple-500/50 bg-purple-900/10' : 'border-white/10 bg-[#0a1628]']">
              <div class="flex items-start gap-3">
                <input type="checkbox" v-model="svc.enabled" class="mt-1 h-4 w-4 accent-purple-500 cursor-pointer" />
                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span v-if="!svc.custom" class="text-sm font-medium text-white">{{ svc.name }}</span>
                    <input v-else v-model="svc.name" type="text" autocomplete="off" class="flex-1 bg-transparent text-white text-sm font-medium border-b border-white/20 outline-none focus:border-purple-500" />
                    <span class="text-xs text-purple-300 bg-purple-900/30 px-1.5 py-0.5 rounded">{{ svc.category }}</span>
                  </div>
                  <div v-if="svc.enabled" class="grid grid-cols-2 gap-2 mt-2">
                    <div>
                      <label class="text-blue-200 text-xs">Preço (R$)</label>
                      <input v-model.number="svc.price" type="number" min="0" step="0.01" autocomplete="off"
                        class="w-full bg-[#0f1e3c] text-white border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50" />
                    </div>
                    <div>
                      <label class="text-blue-200 text-xs">Qtd</label>
                      <input v-model.number="svc.quantity" type="number" min="1" autocomplete="off"
                        class="w-full bg-[#0f1e3c] text-white border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500/50" />
                    </div>
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <span v-if="svc.enabled" class="text-purple-300 text-xs font-semibold whitespace-nowrap">{{ fmt(lineSubtotal(svc)) }}</span>
                  <button @click="removeService(svc.id)" class="text-gray-500 hover:text-red-400 transition-colors">
                    <Icon icon="mdi:trash-can" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Discount -->
        <div class="glass-panel p-5 space-y-3">
          <h2 class="text-white font-semibold flex items-center gap-2"><Icon icon="mdi:tag-multiple" class="text-purple-400 w-5 h-5" /> Desconto</h2>
          <div class="flex items-end gap-4 flex-wrap">
            <div>
              <label class="input-aurora-label">Tipo</label>
              <div class="flex overflow-hidden rounded-lg border border-white/10">
                <button @click="discountType = 'percent'" :class="['px-4 py-2 text-sm font-medium transition-colors', discountType === 'percent' ? 'bg-purple-600 text-white' : 'bg-[#0a1628] text-blue-200 hover:bg-white/10']">%</button>
                <button @click="discountType = 'fixed'" :class="['px-4 py-2 text-sm font-medium transition-colors', discountType === 'fixed' ? 'bg-purple-600 text-white' : 'bg-[#0a1628] text-blue-200 hover:bg-white/10']">R$</button>
              </div>
            </div>
            <div class="flex-1">
              <label class="input-aurora-label">Valor</label>
              <input v-model.number="discountValue" type="number" min="0" step="0.01" autocomplete="off"
                class="w-full input-aurora" />
            </div>
          </div>
        </div>
      </div>

      <!-- Right: summary -->
      <div class="space-y-4">
        <div class="glass-panel p-5 sticky top-24 space-y-3">
          <div class="text-center border-b border-white/10 pb-3">
            <h2 class="text-white font-bold text-lg">Resumo</h2>
            <p class="text-blue-300 text-xs">Nº {{ budgetNumber }}</p>
          </div>

          <div class="space-y-2 min-h-20">
            <div v-for="svc in enabledServices" :key="svc.id" class="flex justify-between text-sm">
              <span class="text-blue-200 truncate flex-1 mr-2">{{ svc.name }}</span>
              <span class="text-white whitespace-nowrap">{{ fmt(lineSubtotal(svc)) }}</span>
            </div>
            <p v-if="!hasSelection" class="text-blue-300/50 text-xs text-center py-2">Nenhum serviço selecionado</p>
          </div>

          <div v-if="hasSelection" class="border-t border-white/10 pt-3 space-y-2">
            <div class="flex justify-between text-sm"><span class="text-blue-200">Subtotal</span><span class="text-white">{{ fmt(subtotal) }}</span></div>
            <div v-if="discountAmount > 0" class="flex justify-between text-sm text-green-400"><span>Desconto</span><span>-{{ fmt(discountAmount) }}</span></div>
            <div class="flex justify-between text-lg font-bold border-t border-white/10 pt-2">
              <span class="text-white">Total</span><span class="text-purple-400">{{ fmt(total) }}</span>
            </div>
          </div>

          <div class="space-y-2 mt-2">
            <button :disabled="!hasSelection" @click="copySummary"
              :class="['w-full py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors', !hasSelection ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : copied ? 'bg-green-600 text-white' : 'bg-purple-600 hover:bg-purple-500 text-white']">
              <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-4 h-4" />
              {{ copied ? 'Copiado!' : 'Copiar Orçamento' }}
            </button>
            <button @click="reset" class="w-full py-2 text-sm font-medium text-gray-400 hover:text-red-400 transition-colors flex items-center justify-center gap-2">
              <Icon icon="mdi:broom" class="w-4 h-4" /> Limpar
            </button>
          </div>
        </div>
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
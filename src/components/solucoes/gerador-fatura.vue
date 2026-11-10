<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

interface Item { name: string; description: string; quantity: number; amount: number }
interface Party { name: string; address: string; phone: string }
interface InvoiceInfo { number: string; date: string; paymentDate: string }

const selectedCurrency = ref('BRL')
const billTo = ref<Party>({ name: '', address: '', phone: '' })
const shipTo = ref<Party>({ name: '', address: '', phone: '' })
const yourCompany = ref<Party>({ name: '', address: '', phone: '' })
const invoice = ref<InvoiceInfo>({ number: '', date: '', paymentDate: '' })
const items = ref<Item[]>([{ name: '', description: '', quantity: 1, amount: 0 }])
const taxPercentage = ref(0)
const notes = ref('')

const currencies = [
  { code: 'BRL', symbol: 'R$' }, { code: 'USD', symbol: '$' }, { code: 'EUR', symbol: '€' }
]

function formatCurrency(val: number) {
  const sym = currencies.find(c => c.code === selectedCurrency.value)?.symbol || 'R$'
  return `${sym} ${val.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
}

function genNumber() {
  const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const digits = '0123456789'
  let r = ''
  for (let i = 0; i < 2; i++) r += alpha[Math.floor(Math.random() * 26)]
  for (let i = 0; i < 4; i++) r += digits[Math.floor(Math.random() * 10)]
  return r
}

onMounted(() => {
  invoice.value.number = genNumber()
  invoice.value.date = new Date().toISOString().split('T')[0]
  const due = new Date(); due.setDate(due.getDate() + 30)
  invoice.value.paymentDate = due.toISOString().split('T')[0]
  const saved = localStorage.getItem('gf_invoice')
  if (saved) {
    try {
      const d = JSON.parse(saved)
      billTo.value = d.billTo || billTo.value
      shipTo.value = d.shipTo || shipTo.value
      yourCompany.value = d.yourCompany || yourCompany.value
      items.value = d.items || items.value
      taxPercentage.value = d.taxPercentage || 0
      notes.value = d.notes || ''
      selectedCurrency.value = d.selectedCurrency || 'BRL'
    } catch {}
  }
})

const subTotal = computed(() => items.value.reduce((s, i) => s + i.quantity * i.amount, 0))
const taxAmount = computed(() => (subTotal.value * taxPercentage.value) / 100)
const grandTotal = computed(() => subTotal.value + taxAmount.value)

function addItem() {
  items.value.push({ name: '', description: '', quantity: 1, amount: 0 })
}

function removeItem(index: number) {
  items.value.splice(index, 1)
}

function saveData() {
  localStorage.setItem('gf_invoice', JSON.stringify({
    billTo: billTo.value, shipTo: shipTo.value, yourCompany: yourCompany.value,
    items: items.value, taxPercentage: taxPercentage.value,
    notes: notes.value, selectedCurrency: selectedCurrency.value,
  }))
  Swal.fire({ icon: 'success', title: 'Dados salvos!', timer: 1500, showConfirmButton: false })
}

function clearForm() {
  billTo.value = { name: '', address: '', phone: '' }
  shipTo.value = { name: '', address: '', phone: '' }
  yourCompany.value = { name: '', address: '', phone: '' }
  invoice.value = { number: genNumber(), date: new Date().toISOString().split('T')[0], paymentDate: '' }
  items.value = [{ name: '', description: '', quantity: 1, amount: 0 }]
  taxPercentage.value = 0
  notes.value = ''
  localStorage.removeItem('gf_invoice')
  Swal.fire({ icon: 'success', title: 'Formulário limpo!', timer: 1500, showConfirmButton: false })
}

function fillExample() {
  billTo.value = { name: 'João Silva', address: 'Rua das Flores, 123, São Paulo - SP', phone: '(11) 99999-9999' }
  shipTo.value = { name: 'Maria Santos', address: 'Av. Paulista, 456, São Paulo - SP', phone: '(11) 88888-8888' }
  yourCompany.value = { name: 'Minha Empresa Ltda', address: 'Rua Comercial, 789, São Paulo - SP', phone: '(11) 7777-7777' }
  items.value = [
    { name: 'Consultoria', description: 'Serviço de consultoria', quantity: 10, amount: 150 },
    { name: 'Design', description: 'Materiais visuais', quantity: 5, amount: 200 },
    { name: 'Desenvolvimento Web', description: 'Site responsivo', quantity: 1, amount: 2500 },
  ]
  taxPercentage.value = 10
  notes.value = 'Obrigado pela preferência! Aguardamos seu retorno.'
  Swal.fire({ icon: 'success', title: 'Dados de exemplo carregados!', timer: 1500, showConfirmButton: false })
}

function printInvoice() {
  window.print()
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:file-document-outline" class="text-blue-400 w-7 h-7" />
        Gerador de Faturas
      </h1>
      <p class="text-blue-200 text-sm">Crie faturas profissionais e salve localmente</p>
    </div>

    <!-- Action buttons -->
    <div class="flex flex-wrap gap-2 justify-center">
      <button @click="saveData"
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm transition-colors">
        <Icon icon="mdi:content-save-outline" class="w-4 h-4" />
        Salvar
      </button>
      <button @click="fillExample"
        class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:magic-staff" class="w-4 h-4" />
        Exemplo
      </button>
      <button @click="printInvoice"
        class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:printer-outline" class="w-4 h-4" />
        Imprimir
      </button>
      <button @click="clearForm"
        class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:trash-can-outline" class="w-4 h-4" />
        Limpar
      </button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6">
      <!-- Left column: form fields -->
      <div class="space-y-5">
        <!-- Currency -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white">Moeda</h3>
          <select v-model="selectedCurrency"
            class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50">
            <option v-for="c in currencies" :key="c.code" :value="c.code">{{ c.code }} ({{ c.symbol }})</option>
          </select>
        </div>

        <!-- Bill To -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:account-outline" class="text-blue-400 w-4 h-4" />
            Faturar Para (Bill To)
          </h3>
          <input v-model="billTo.name" placeholder="Nome / Empresa" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          <input v-model="billTo.address" placeholder="Endereço" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          <input v-model="billTo.phone" placeholder="Telefone" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>

        <!-- Ship To -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:truck-delivery-outline" class="text-blue-400 w-4 h-4" />
            Enviar Para (Ship To)
          </h3>
          <input v-model="shipTo.name" placeholder="Nome / Empresa" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          <input v-model="shipTo.address" placeholder="Endereço" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          <input v-model="shipTo.phone" placeholder="Telefone" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>

        <!-- Invoice info -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:file-document-edit-outline" class="text-blue-400 w-4 h-4" />
            Informações da Nota Fiscal
          </h3>
          <div class="grid grid-cols-3 gap-3">
            <div class="space-y-1">
              <label class="text-xs text-blue-200">Número</label>
              <input v-model="invoice.number" class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
            <div class="space-y-1">
              <label class="text-xs text-blue-200">Data</label>
              <input type="date" v-model="invoice.date" class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
            <div class="space-y-1">
              <label class="text-xs text-blue-200">Vencimento</label>
              <input type="date" v-model="invoice.paymentDate" class="w-full bg-[#0a1628] text-white border border-white/10 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
            </div>
          </div>
        </div>

        <!-- Your Company -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:office-building-outline" class="text-blue-400 w-4 h-4" />
            Sua Empresa
          </h3>
          <input v-model="yourCompany.name" placeholder="Nome da Empresa" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          <input v-model="yourCompany.address" placeholder="Endereço Completo" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
          <input v-model="yourCompany.phone" placeholder="Telefone" class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
      </div>

      <!-- Right column: items + summary -->
      <div class="space-y-5">
        <!-- Items -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <div class="flex items-center justify-between">
            <h3 class="text-sm font-semibold text-white flex items-center gap-2">
              <Icon icon="mdi:format-list-bulleted" class="text-blue-400 w-4 h-4" />
              Itens
            </h3>
            <button @click="addItem"
              class="flex items-center gap-1 px-3 py-1.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg text-xs transition-colors">
              <Icon icon="mdi:plus" class="w-3.5 h-3.5" />
              Adicionar
            </button>
          </div>

          <div v-for="(item, i) in items" :key="i" class="bg-[#0a1628] border border-white/5 rounded-lg p-3 space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs text-blue-300">Item {{ i + 1 }}</span>
              <button @click="removeItem(i)" v-if="items.length > 1"
                class="text-red-400 hover:text-red-300 p-0.5">
                <Icon icon="mdi:close" class="w-3.5 h-3.5" />
              </button>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <input v-model="item.name" placeholder="Nome do item" class="col-span-2 bg-[#0f1e3c] text-white placeholder-blue-300/40 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none" />
              <input v-model="item.description" placeholder="Descrição" class="col-span-2 bg-[#0f1e3c] text-white placeholder-blue-300/40 border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none" />
              <div class="space-y-0.5">
                <label class="text-xs text-blue-300">Qtd</label>
                <input type="number" v-model.number="item.quantity" min="0"
                  class="w-full bg-[#0f1e3c] text-white border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none" />
              </div>
              <div class="space-y-0.5">
                <label class="text-xs text-blue-300">Valor Unit.</label>
                <input type="number" v-model.number="item.amount" min="0" step="0.01"
                  class="w-full bg-[#0f1e3c] text-white border border-white/10 rounded px-2 py-1.5 text-xs focus:outline-none" />
              </div>
              <div class="col-span-2 text-right text-xs text-blue-300">
                Total: <span class="text-white font-semibold">{{ formatCurrency(item.quantity * item.amount) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Summary -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:calculator-variant-outline" class="text-blue-400 w-4 h-4" />
            Resumo Financeiro
          </h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-blue-300">Subtotal:</span>
              <span class="text-white font-medium">{{ formatCurrency(subTotal) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-blue-300">Imposto (%):</span>
              <input type="number" v-model.number="taxPercentage" min="0" max="100" step="0.1"
                class="w-20 bg-[#0a1628] text-white text-center border border-white/10 rounded-lg px-2 py-1 text-sm focus:outline-none" />
            </div>
            <div class="flex justify-between">
              <span class="text-blue-300">Valor Imposto:</span>
              <span class="text-white font-medium">{{ formatCurrency(taxAmount) }}</span>
            </div>
            <div class="border-t border-white/10 pt-2 flex justify-between text-base font-bold">
              <span class="text-blue-300">Total Geral:</span>
              <span class="text-blue-400">{{ formatCurrency(grandTotal) }}</span>
            </div>
          </div>
        </div>

        <!-- Notes -->
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:note-text-outline" class="text-blue-400 w-4 h-4" />
            Observações
          </h3>
          <textarea v-model="notes" rows="3" placeholder="Observações da fatura..."
            class="w-full bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
        </div>
      </div>
    </div>
  </div>
</template>

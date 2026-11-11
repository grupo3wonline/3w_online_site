<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_recibo_simples'

const form = ref({
  numero: '',
  cidade: '',
  data: '',
  pagadorNome: '',
  pagadorCpfCnpj: '',
  pagadorEndereco: '',
  valor: '',
  referente: '',
  formaPagamento: 'Dinheiro',
  recebedorNome: '',
  recebedorCpfCnpj: '',
  recebedorEndereco: '',
})

const formasPagamento = ['Dinheiro', 'PIX', 'Transferência bancária', 'Cheque', 'Boleto bancário', 'Cartão de débito', 'Cartão de crédito']

function valorExtenso(raw: string): string {
  const n = parseFloat(raw.replace(',', '.'))
  if (!n || isNaN(n)) return '(valor por extenso)'
  const inteiro = Math.floor(n)
  const cents = Math.round((n - inteiro) * 100)
  const un = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove',
    'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
  const dz = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
  const ct = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']
  function menorMil(x: number): string {
    if (x === 0) return ''
    if (x === 100) return 'cem'
    const c = Math.floor(x / 100); const r = x % 100; const d = Math.floor(r / 10); const u = r % 10
    let s = c > 0 ? ct[c] : ''
    if (c > 0 && r > 0) s += ' e '
    if (r >= 20) { s += dz[d]; if (u > 0) s += ' e ' + un[u] }
    else if (r > 0) s += un[r]
    return s
  }
  function ext(x: number): string {
    if (x === 0) return 'zero'
    const mi = Math.floor(x / 1000000); const ml = Math.floor((x % 1000000) / 1000); const rs = x % 1000
    let s = ''
    if (mi > 0) { s += menorMil(mi) + (mi === 1 ? ' milhão' : ' milhões'); if (ml > 0 || rs > 0) s += ' e ' }
    if (ml > 0) { s += menorMil(ml) + ' mil'; if (rs > 0) s += ' e ' }
    if (rs > 0) s += menorMil(rs)
    return s
  }
  let t = ext(inteiro) + (inteiro === 1 ? ' real' : ' reais')
  if (cents > 0) t += ' e ' + ext(cents) + (cents === 1 ? ' centavo' : ' centavos')
  return t
}

function formatDate(d: string) {
  if (!d) return '__/__/____'
  const [y, m, day] = d.split('-')
  return `${day}/${m}/${y}`
}

function formatBRL(raw: string) {
  const n = parseFloat(raw.replace(',', '.'))
  if (isNaN(n)) return 'R$ 0,00'
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

const valorFmt = computed(() => formatBRL(form.value.valor))
const valorExt = computed(() => valorExtenso(form.value.valor))

onMounted(() => {
  form.value.data = new Date().toISOString().split('T')[0]
  form.value.numero = String(Math.floor(Math.random() * 90000) + 10000)
  form.value.cidade = 'São Paulo - SP'
  const saved = localStorage.getItem(LS_KEY)
  if (saved) { try { Object.assign(form.value, JSON.parse(saved)) } catch {} }
})

function salvar() {
  localStorage.setItem(LS_KEY, JSON.stringify(form.value))
  Swal.fire({ icon: 'success', title: 'Dados salvos!', timer: 1500, showConfirmButton: false })
}

function limpar() {
  localStorage.removeItem(LS_KEY)
  Object.assign(form.value, { pagadorNome: '', pagadorCpfCnpj: '', pagadorEndereco: '', valor: '', referente: '', formaPagamento: 'Dinheiro', recebedorNome: '', recebedorCpfCnpj: '', recebedorEndereco: '' })
  form.value.numero = String(Math.floor(Math.random() * 90000) + 10000)
  Swal.fire({ icon: 'success', title: 'Formulário limpo!', timer: 1500, showConfirmButton: false })
}

function exemplo() {
  Object.assign(form.value, { pagadorNome: 'Carlos Eduardo Mendes', pagadorCpfCnpj: '123.456.789-00', pagadorEndereco: 'Rua das Acácias, 456 – Centro – São Paulo/SP', valor: '1500.00', referente: 'Prestação de serviços de consultoria', formaPagamento: 'PIX', recebedorNome: 'Ana Paula Ferreira', recebedorCpfCnpj: '987.654.321-00', recebedorEndereco: 'Av. Paulista, 1000 – Bela Vista – São Paulo/SP' })
  Swal.fire({ icon: 'success', title: 'Exemplo carregado!', timer: 1500, showConfirmButton: false })
}

function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell
    title="Recibo Simples"
    description="Gere comprovantes de pagamento rápidos e profissionais, prontos para imprimir ou salvar como PDF."
    icon="fa-receipt"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="green"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Como usar', text: 'Preencha os dados do pagador, recebedor e o valor. Clique em Gerar PDF para imprimir ou salvar.' }]"
  >

    <!-- Ações -->
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-colors">
        <Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF
      </button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo
      </button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar
      </button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors">
        <Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar
      </button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Identificação</h3>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-blue-300 mb-1.5 block">Nº do Recibo</label>
              <input v-model="form.numero" class="w-full input-aurora" placeholder="00001" />
            </div>
            <div>
              <label class="text-xs text-blue-300 mb-1.5 block">Data</label>
              <input v-model="form.data" type="date" class="w-full input-aurora" />
            </div>
          </div>
          <div>
            <label class="text-xs text-blue-300 mb-1.5 block">Cidade</label>
            <input v-model="form.cidade" class="w-full input-aurora" placeholder="São Paulo - SP" />
          </div>
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:account-cash" class="text-green-400 w-4 h-4" /> Pagador
          </h3>
          <input v-model="form.pagadorNome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <input v-model="form.pagadorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.pagadorEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:currency-brl" class="text-green-400 w-4 h-4" /> Pagamento
          </h3>
          <input v-model="form.valor" class="w-full input-aurora" placeholder="Valor (ex: 1500.00)" type="number" step="0.01" />
          <input v-model="form.referente" class="w-full input-aurora" placeholder="Referente a (ex: Prestação de serviços de...)" />
          <select v-model="form.formaPagamento" class="w-full input-aurora">
            <option v-for="f in formasPagamento" :key="f">{{ f }}</option>
          </select>
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center gap-2">
            <Icon icon="mdi:account-check" class="text-green-400 w-4 h-4" /> Recebedor
          </h3>
          <input v-model="form.recebedorNome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <input v-model="form.recebedorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.recebedorEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
      </div>

      <!-- Preview -->
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2">
          <Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia do Documento
        </h3>
        <div id="doc-recibo-simples" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-6">
            <div class="text-xs text-gray-500 mb-1">Nº {{ form.numero || '00001' }}</div>
            <h1 class="text-2xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-6">RECIBO</h1>
          </div>
          <p class="mb-4">
            Recebi de <strong>{{ form.pagadorNome || '[Nome do Pagador]' }}</strong>
            <span v-if="form.pagadorCpfCnpj">, inscrito(a) no CPF/CNPJ sob o nº <strong>{{ form.pagadorCpfCnpj }}</strong></span>
            <span v-if="form.pagadorEndereco">, residente/domiciliado(a) em {{ form.pagadorEndereco }}</span>,
            a importância de <strong>{{ valorFmt }} ({{ valorExt }})</strong>,
            referente a <strong>{{ form.referente || '[descrição do pagamento]' }}</strong>,
            mediante pagamento via <strong>{{ form.formaPagamento }}</strong>.
          </p>
          <p class="mb-6">
            Por ser verdade, assino o presente recibo para que produza os seus devidos efeitos legais.
          </p>
          <p class="mb-8 text-right">{{ form.cidade || '[Cidade]' }}, {{ formatDate(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 text-center">
            <p class="font-semibold">{{ form.recebedorNome || '[Nome do Recebedor]' }}</p>
            <p class="text-xs text-gray-600" v-if="form.recebedorCpfCnpj">CPF/CNPJ: {{ form.recebedorCpfCnpj }}</p>
            <p class="text-xs text-gray-600" v-if="form.recebedorEndereco">{{ form.recebedorEndereco }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Preview apenas para print -->
    <div class="hidden print-only">
      <div id="doc-recibo-simples-print" class="doc-preview bg-white text-gray-900 p-8 text-sm font-serif leading-relaxed">
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-recibo-simples, #doc-recibo-simples * { visibility: visible; }
  #doc-recibo-simples { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>



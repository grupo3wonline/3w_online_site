<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_recibo_servico'

const form = ref({
  numero: '', cidade: '', data: '',
  prestadorNome: '', prestadorCpfCnpj: '', prestadorEndereco: '', prestadorTelefone: '',
  contratanteNome: '', contratanteCpfCnpj: '', contratanteEndereco: '',
  descricaoServico: '', dataServico: '', valor: '', formaPagamento: 'PIX',
})

const formas = ['Dinheiro', 'PIX', 'Transferência bancária', 'Cheque', 'Boleto bancário']

function valorExtenso(raw: string): string {
  const n = parseFloat(raw.replace(',', '.'))
  if (!n || isNaN(n)) return '(valor por extenso)'
  const un = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove']
  const dz = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa']
  const ct = ['', 'cento', 'duzentos', 'trezentos', 'quatrocentos', 'quinhentos', 'seiscentos', 'setecentos', 'oitocentos', 'novecentos']
  function menorMil(x: number): string {
    if (x === 0) return ''; if (x === 100) return 'cem'
    const c = Math.floor(x / 100); const r = x % 100; const d = Math.floor(r / 10); const u = r % 10
    let s = c > 0 ? ct[c] : ''; if (c > 0 && r > 0) s += ' e '
    if (r >= 20) { s += dz[d]; if (u > 0) s += ' e ' + un[u] } else if (r > 0) s += un[r]; return s
  }
  function ext(x: number): string {
    if (x === 0) return 'zero'
    const mi = Math.floor(x / 1000000); const ml = Math.floor((x % 1000000) / 1000); const rs = x % 1000
    let s = ''; if (mi > 0) { s += menorMil(mi) + (mi === 1 ? ' milhão' : ' milhões'); if (ml > 0 || rs > 0) s += ' e ' }
    if (ml > 0) { s += menorMil(ml) + ' mil'; if (rs > 0) s += ' e ' }; if (rs > 0) s += menorMil(rs); return s
  }
  const inteiro = Math.floor(n); const cents = Math.round((n - inteiro) * 100)
  let t = ext(inteiro) + (inteiro === 1 ? ' real' : ' reais')
  if (cents > 0) t += ' e ' + ext(cents) + (cents === 1 ? ' centavo' : ' centavos')
  return t
}
function fmt(d: string) { if (!d) return '__/__/____'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}` }
function fmtBRL(raw: string) { const n = parseFloat(raw.replace(',', '.')); if (isNaN(n)) return 'R$ 0,00'; return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }

const valorFmt = computed(() => fmtBRL(form.value.valor))
const valorExt = computed(() => valorExtenso(form.value.valor))

onMounted(() => {
  form.value.data = new Date().toISOString().split('T')[0]
  form.value.numero = String(Math.floor(Math.random() * 90000) + 10000)
  form.value.cidade = 'São Paulo - SP'
  const saved = localStorage.getItem(LS_KEY); if (saved) { try { Object.assign(form.value, JSON.parse(saved)) } catch {} }
})

function salvar() { localStorage.setItem(LS_KEY, JSON.stringify(form.value)); Swal.fire({ icon: 'success', title: 'Dados salvos!', timer: 1500, showConfirmButton: false }) }
function limpar() { localStorage.removeItem(LS_KEY); form.value = { numero: String(Math.floor(Math.random() * 90000) + 10000), cidade: '', data: new Date().toISOString().split('T')[0], prestadorNome: '', prestadorCpfCnpj: '', prestadorEndereco: '', prestadorTelefone: '', contratanteNome: '', contratanteCpfCnpj: '', contratanteEndereco: '', descricaoServico: '', dataServico: '', valor: '', formaPagamento: 'PIX' }; Swal.fire({ icon: 'success', title: 'Limpo!', timer: 1500, showConfirmButton: false }) }
function exemplo() { Object.assign(form.value, { prestadorNome: 'Marina Costa Souza', prestadorCpfCnpj: '321.654.987-00', prestadorEndereco: 'Rua dos Ipês, 200 – Jardins – São Paulo/SP', prestadorTelefone: '(11) 99887-6655', contratanteNome: 'Tech Solutions Ltda', contratanteCpfCnpj: '12.345.678/0001-90', contratanteEndereco: 'Av. Brigadeiro Faria Lima, 500 – São Paulo/SP', descricaoServico: 'Desenvolvimento de identidade visual e criação de materiais gráficos para campanha digital', dataServico: form.value.data, valor: '2800.00', formaPagamento: 'Transferência bancária' }); Swal.fire({ icon: 'success', title: 'Exemplo carregado!', timer: 1500, showConfirmButton: false }) }
function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell title="Recibo de Serviço" description="Recibo completo para prestação de serviços profissionais, pronto para impressão em PDF." icon="fa-file-invoice" icon-gradient="from-blue-500 to-sky-700" orb-color="blue"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha os dados do prestador, contratante e serviço realizado. Clique em Gerar PDF.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Identificação</h3>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Nº Recibo</label><input v-model="form.numero" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Emissão</label><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
          </div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Cidade</label><input v-model="form.cidade" class="w-full input-aurora" /></div>
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Prestador de Serviço</h3>
          <input v-model="form.prestadorNome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <input v-model="form.prestadorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.prestadorEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
          <input v-model="form.prestadorTelefone" class="w-full input-aurora" placeholder="Telefone / WhatsApp" />
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Contratante</h3>
          <input v-model="form.contratanteNome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <input v-model="form.contratanteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.contratanteEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Serviço e Pagamento</h3>
          <textarea v-model="form.descricaoServico" rows="3" class="w-full input-aurora resize-none" placeholder="Descrição detalhada do serviço prestado"></textarea>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Data de execução do serviço</label><input v-model="form.dataServico" type="date" class="w-full input-aurora" /></div>
          <input v-model="form.valor" type="number" step="0.01" class="w-full input-aurora" placeholder="Valor (ex: 1500.00)" />
          <select v-model="form.formaPagamento" class="w-full input-aurora"><option v-for="f in formas" :key="f">{{ f }}</option></select>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-recibo-servico" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-6">
            <div class="text-xs text-gray-500 mb-1">Nº {{ form.numero || '00001' }}</div>
            <h1 class="text-2xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">RECIBO DE SERVIÇO</h1>
          </div>
          <p class="mb-4">
            Eu, <strong>{{ form.prestadorNome || '[Prestador]' }}</strong>
            <span v-if="form.prestadorCpfCnpj">, portador(a) do CPF/CNPJ <strong>{{ form.prestadorCpfCnpj }}</strong></span>
            <span v-if="form.prestadorEndereco">, residente em {{ form.prestadorEndereco }}</span>,
            declaro ter recebido de <strong>{{ form.contratanteNome || '[Contratante]' }}</strong>
            <span v-if="form.contratanteCpfCnpj"> (CPF/CNPJ: {{ form.contratanteCpfCnpj }})</span>
            a importância de <strong>{{ valorFmt }} ({{ valorExt }})</strong>,
            referente à prestação do seguinte serviço: <strong>{{ form.descricaoServico || '[descrição do serviço]' }}</strong>
            <span v-if="form.dataServico">, realizado em {{ fmt(form.dataServico) }}</span>,
            mediante pagamento via <strong>{{ form.formaPagamento }}</strong>.
          </p>
          <p class="mb-6">Por ser verdade, assino o presente recibo dando plena quitação do valor acima descrito.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ fmt(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 text-center">
            <p class="font-semibold">{{ form.prestadorNome || '[Nome do Prestador]' }}</p>
            <p class="text-xs text-gray-600" v-if="form.prestadorCpfCnpj">CPF/CNPJ: {{ form.prestadorCpfCnpj }}</p>
            <p class="text-xs text-gray-600" v-if="form.prestadorTelefone">Tel: {{ form.prestadorTelefone }}</p>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-recibo-servico, #doc-recibo-servico * { visibility: visible; }
  #doc-recibo-servico { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>



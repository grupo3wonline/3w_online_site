<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_recibo_aluguel'
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

const form = ref({
  numero: '', cidade: '', data: '',
  locadorNome: '', locadorCpfCnpj: '',
  locatarioNome: '', locatarioCpfCnpj: '',
  imovelEndereco: '',
  mesReferencia: '', anoReferencia: '',
  valorAluguel: '', valorCondominio: '', valorIPTU: '', valorOutros: '',
  dataPagamento: '',
})

function fmtBRL(raw: string) { const n = parseFloat(raw.replace(',', '.')); if (!raw || isNaN(n)) return ''; return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function fmt(d: string) { if (!d) return '__/__/____'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}` }

const totalNum = computed(() => {
  const a = parseFloat(form.value.valorAluguel || '0')
  const b = parseFloat(form.value.valorCondominio || '0')
  const c = parseFloat(form.value.valorIPTU || '0')
  const d2 = parseFloat(form.value.valorOutros || '0')
  return (isNaN(a) ? 0 : a) + (isNaN(b) ? 0 : b) + (isNaN(c) ? 0 : c) + (isNaN(d2) ? 0 : d2)
})
const totalFmt = computed(() => totalNum.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))

onMounted(() => {
  form.value.data = new Date().toISOString().split('T')[0]
  form.value.dataPagamento = new Date().toISOString().split('T')[0]
  form.value.numero = String(Math.floor(Math.random() * 90000) + 10000)
  form.value.cidade = 'São Paulo - SP'
  const now = new Date(); form.value.mesReferencia = MESES[now.getMonth()]; form.value.anoReferencia = String(now.getFullYear())
  const saved = localStorage.getItem(LS_KEY); if (saved) { try { Object.assign(form.value, JSON.parse(saved)) } catch {} }
})

function salvar() { localStorage.setItem(LS_KEY, JSON.stringify(form.value)); Swal.fire({ icon: 'success', title: 'Dados salvos!', timer: 1500, showConfirmButton: false }) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value, { locadorNome: '', locadorCpfCnpj: '', locatarioNome: '', locatarioCpfCnpj: '', imovelEndereco: '', valorAluguel: '', valorCondominio: '', valorIPTU: '', valorOutros: '', dataPagamento: form.value.data }); Swal.fire({ icon: 'success', title: 'Limpo!', timer: 1500, showConfirmButton: false }) }
function exemplo() { Object.assign(form.value, { locadorNome: 'Roberto Almeida', locadorCpfCnpj: '111.222.333-44', locatarioNome: 'Fernanda Lima', locatarioCpfCnpj: '555.666.777-88', imovelEndereco: 'Rua dos Pinheiros, 150, Apto 32 – Pinheiros – São Paulo/SP – CEP 05.422-000', valorAluguel: '1800.00', valorCondominio: '250.00', valorIPTU: '0', valorOutros: '0' }); Swal.fire({ icon: 'success', title: 'Exemplo carregado!', timer: 1500, showConfirmButton: false }) }
function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell title="Recibo de Aluguel" description="Recibo de aluguel completo para locadores, com todos os encargos e referência do período." icon="fa-home" icon-gradient="from-orange-500 to-amber-700" orb-color="orange"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha locador, locatário, endereço do imóvel e valores. Clique em Gerar PDF.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
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
          <h3 class="text-sm font-semibold text-white">Locador (quem recebe)</h3>
          <input v-model="form.locadorNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.locadorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Locatário (quem paga)</h3>
          <input v-model="form.locatarioNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.locatarioCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Imóvel e Período</h3>
          <textarea v-model="form.imovelEndereco" rows="2" class="w-full input-aurora resize-none" placeholder="Endereço completo do imóvel"></textarea>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-blue-300 mb-1.5 block">Mês de Referência</label>
              <select v-model="form.mesReferencia" class="w-full input-aurora"><option v-for="m in MESES" :key="m">{{ m }}</option></select>
            </div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Ano</label><input v-model="form.anoReferencia" class="w-full input-aurora" placeholder="2025" /></div>
          </div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Data do Pagamento</label><input v-model="form.dataPagamento" type="date" class="w-full input-aurora" /></div>
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Valores</h3>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Aluguel (R$)</label><input v-model="form.valorAluguel" type="number" step="0.01" class="w-full input-aurora" /></div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Condomínio (R$)</label><input v-model="form.valorCondominio" type="number" step="0.01" class="w-full input-aurora" placeholder="0,00" /></div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">IPTU (R$)</label><input v-model="form.valorIPTU" type="number" step="0.01" class="w-full input-aurora" placeholder="0,00" /></div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Outros encargos (R$)</label><input v-model="form.valorOutros" type="number" step="0.01" class="w-full input-aurora" placeholder="0,00" /></div>
          <div class="pt-2 border-t border-white/10 flex justify-between items-center">
            <span class="text-sm text-blue-300 font-semibold">Total:</span>
            <span class="text-lg font-bold text-green-400">{{ totalFmt }}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-recibo-aluguel" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-6">
            <div class="text-xs text-gray-500 mb-1">Nº {{ form.numero }}</div>
            <h1 class="text-2xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">RECIBO DE ALUGUEL</h1>
          </div>
          <p class="mb-3"><strong>Referência:</strong> {{ form.mesReferencia }} / {{ form.anoReferencia }}</p>
          <p class="mb-4">
            Recebi de <strong>{{ form.locatarioNome || '[Locatário]' }}</strong>
            <span v-if="form.locatarioCpfCnpj"> (CPF/CNPJ: {{ form.locatarioCpfCnpj }})</span>,
            referente ao aluguel do imóvel situado à <strong>{{ form.imovelEndereco || '[Endereço do imóvel]' }}</strong>,
            os valores discriminados abaixo:
          </p>
          <table class="w-full mb-4 text-sm border-collapse">
            <thead><tr class="border-b border-gray-400"><th class="text-left py-1">Descrição</th><th class="text-right py-1">Valor</th></tr></thead>
            <tbody>
              <tr v-if="form.valorAluguel" class="border-b border-gray-200"><td class="py-1">Aluguel</td><td class="text-right">{{ fmtBRL(form.valorAluguel) }}</td></tr>
              <tr v-if="parseFloat(form.valorCondominio) > 0" class="border-b border-gray-200"><td class="py-1">Condomínio</td><td class="text-right">{{ fmtBRL(form.valorCondominio) }}</td></tr>
              <tr v-if="parseFloat(form.valorIPTU) > 0" class="border-b border-gray-200"><td class="py-1">IPTU</td><td class="text-right">{{ fmtBRL(form.valorIPTU) }}</td></tr>
              <tr v-if="parseFloat(form.valorOutros) > 0" class="border-b border-gray-200"><td class="py-1">Outros encargos</td><td class="text-right">{{ fmtBRL(form.valorOutros) }}</td></tr>
              <tr class="font-bold border-t-2 border-gray-900"><td class="py-1">TOTAL</td><td class="text-right">{{ totalFmt }}</td></tr>
            </tbody>
          </table>
          <p class="mb-6" v-if="form.dataPagamento">Pagamento efetuado em: {{ fmt(form.dataPagamento) }}</p>
          <p class="mb-6">Por ser verdade, assino o presente recibo dando plena quitação do período de referência.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ fmt(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 text-center">
            <p class="font-semibold">{{ form.locadorNome || '[Nome do Locador]' }}</p>
            <p class="text-xs text-gray-600" v-if="form.locadorCpfCnpj">CPF/CNPJ: {{ form.locadorCpfCnpj }}</p>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-recibo-aluguel, #doc-recibo-aluguel * { visibility: visible; }
  #doc-recibo-aluguel { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>



<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_recibo_salario'
const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

const form = ref({
  cidade: '', data: '',
  empresaNome: '', empresaCnpj: '', empresaEndereco: '',
  empregadoNome: '', empregadoCpf: '', empregadoCargo: '', empregadoPis: '',
  mesReferencia: '', anoReferencia: '',
  salarioBruto: '', descontoINSS: '', descontoIRRF: '', descontoOutros: '', descontoOutrosDesc: '',
})

function fmtBRL(raw: string) { const n = parseFloat(raw.replace(',', '.')); if (!raw || isNaN(n)) return ''; return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
function fmt(d: string) { if (!d) return '__/__/____'; const [y, m, day] = d.split('-'); return `${day}/${m}/${y}` }

const totalDescontos = computed(() => {
  const a = parseFloat(form.value.descontoINSS || '0'), b = parseFloat(form.value.descontoIRRF || '0'), c = parseFloat(form.value.descontoOutros || '0')
  return (isNaN(a)?0:a) + (isNaN(b)?0:b) + (isNaN(c)?0:c)
})
const salarioLiquido = computed(() => {
  const bruto = parseFloat(form.value.salarioBruto || '0')
  return isNaN(bruto) ? 0 : bruto - totalDescontos.value
})
const salarioLiquidoFmt = computed(() => salarioLiquido.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }))

onMounted(() => {
  form.value.data = new Date().toISOString().split('T')[0]
  form.value.cidade = 'São Paulo - SP'
  const now = new Date(); form.value.mesReferencia = MESES[now.getMonth()]; form.value.anoReferencia = String(now.getFullYear())
  const saved = localStorage.getItem(LS_KEY); if (saved) { try { Object.assign(form.value, JSON.parse(saved)) } catch {} }
})

function salvar() { localStorage.setItem(LS_KEY, JSON.stringify(form.value)); Swal.fire({ icon: 'success', title: 'Dados salvos!', timer: 1500, showConfirmButton: false }) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value, { empresaNome: '', empresaCnpj: '', empresaEndereco: '', empregadoNome: '', empregadoCpf: '', empregadoCargo: '', empregadoPis: '', salarioBruto: '', descontoINSS: '', descontoIRRF: '', descontoOutros: '', descontoOutrosDesc: '' }); Swal.fire({ icon: 'success', title: 'Limpo!', timer: 1500, showConfirmButton: false }) }
function exemplo() { Object.assign(form.value, { empresaNome: 'Empresa Exemplo Ltda', empresaCnpj: '00.000.000/0001-00', empresaEndereco: 'Rua Exemplo, 100 – Centro – São Paulo/SP', empregadoNome: 'João da Silva', empregadoCpf: '000.000.000-00', empregadoCargo: 'Analista de Sistemas', empregadoPis: '000.00000.00-0', salarioBruto: '5000.00', descontoINSS: '550.00', descontoIRRF: '250.00', descontoOutros: '', descontoOutrosDesc: '' }); Swal.fire({ icon: 'success', title: 'Exemplo carregado!', timer: 1500, showConfirmButton: false }) }
function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell title="Recibo de Salário" description="Comprovante de pagamento de salário com todos os descontos e salário líquido." icon="fa-money-bill-wave" icon-gradient="from-teal-500 to-green-700" orb-color="teal"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha dados da empresa, empregado e valores. Clique em Gerar PDF.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Período e Localização</h3>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Mês de Referência</label><select v-model="form.mesReferencia" class="w-full input-aurora"><option v-for="m in MESES" :key="m">{{ m }}</option></select></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Ano</label><input v-model="form.anoReferencia" class="w-full input-aurora" /></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Cidade</label><input v-model="form.cidade" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Emissão</label><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
          </div>
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Empresa</h3>
          <input v-model="form.empresaNome" class="w-full input-aurora" placeholder="Razão Social" />
          <input v-model="form.empresaCnpj" class="w-full input-aurora" placeholder="CNPJ" />
          <input v-model="form.empresaEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Empregado</h3>
          <input v-model="form.empregadoNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.empregadoCpf" class="w-full input-aurora" placeholder="CPF" />
          <input v-model="form.empregadoCargo" class="w-full input-aurora" placeholder="Cargo / Função" />
          <input v-model="form.empregadoPis" class="w-full input-aurora" placeholder="PIS / NIT" />
        </div>

        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Remuneração</h3>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Salário Bruto (R$)</label><input v-model="form.salarioBruto" type="number" step="0.01" class="w-full input-aurora" /></div>
          <div class="border-t border-white/10 pt-3 space-y-2">
            <p class="text-xs text-blue-300 font-semibold">Descontos:</p>
            <div><label class="text-xs text-blue-300 mb-1.5 block">INSS (R$)</label><input v-model="form.descontoINSS" type="number" step="0.01" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">IRRF (R$)</label><input v-model="form.descontoIRRF" type="number" step="0.01" class="w-full input-aurora" /></div>
            <div class="grid grid-cols-2 gap-3">
              <div><label class="text-xs text-blue-300 mb-1.5 block">Outros (R$)</label><input v-model="form.descontoOutros" type="number" step="0.01" class="w-full input-aurora" /></div>
              <div><label class="text-xs text-blue-300 mb-1.5 block">Descrição</label><input v-model="form.descontoOutrosDesc" class="w-full input-aurora" placeholder="Vale alimentação..." /></div>
            </div>
          </div>
          <div class="border-t border-white/10 pt-2 flex justify-between">
            <span class="text-sm text-blue-300 font-semibold">Salário Líquido:</span>
            <span class="text-lg font-bold text-green-400">{{ salarioLiquidoFmt }}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-recibo-salario" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-5">
            <h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">RECIBO DE PAGAMENTO DE SALÁRIO</h1>
          </div>
          <div class="grid grid-cols-2 gap-4 mb-4 text-xs border border-gray-300 p-3">
            <div><p class="font-semibold">Empresa</p><p>{{ form.empresaNome || '[Empresa]' }}</p><p v-if="form.empresaCnpj">CNPJ: {{ form.empresaCnpj }}</p><p v-if="form.empresaEndereco" class="text-gray-600">{{ form.empresaEndereco }}</p></div>
            <div><p class="font-semibold">Referência</p><p>{{ form.mesReferencia }} / {{ form.anoReferencia }}</p></div>
          </div>
          <div class="border border-gray-300 p-3 mb-4 text-xs">
            <div class="grid grid-cols-3 gap-3">
              <div><p class="font-semibold">Empregado</p><p>{{ form.empregadoNome || '[Nome]' }}</p></div>
              <div><p class="font-semibold">CPF</p><p>{{ form.empregadoCpf || '-' }}</p></div>
              <div><p class="font-semibold">PIS</p><p>{{ form.empregadoPis || '-' }}</p></div>
            </div>
            <div class="mt-2"><p class="font-semibold">Cargo</p><p>{{ form.empregadoCargo || '-' }}</p></div>
          </div>
          <table class="w-full text-xs mb-4 border-collapse">
            <thead class="bg-gray-100"><tr><th class="border border-gray-300 p-1 text-left">Descrição</th><th class="border border-gray-300 p-1 text-right">Vencimentos</th><th class="border border-gray-300 p-1 text-right">Descontos</th></tr></thead>
            <tbody>
              <tr><td class="border border-gray-300 p-1">Salário Base</td><td class="border border-gray-300 p-1 text-right">{{ fmtBRL(form.salarioBruto) }}</td><td class="border border-gray-300 p-1"></td></tr>
              <tr v-if="form.descontoINSS"><td class="border border-gray-300 p-1">INSS</td><td class="border border-gray-300 p-1"></td><td class="border border-gray-300 p-1 text-right">{{ fmtBRL(form.descontoINSS) }}</td></tr>
              <tr v-if="form.descontoIRRF"><td class="border border-gray-300 p-1">IRRF</td><td class="border border-gray-300 p-1"></td><td class="border border-gray-300 p-1 text-right">{{ fmtBRL(form.descontoIRRF) }}</td></tr>
              <tr v-if="parseFloat(form.descontoOutros) > 0"><td class="border border-gray-300 p-1">{{ form.descontoOutrosDesc || 'Outros' }}</td><td class="border border-gray-300 p-1"></td><td class="border border-gray-300 p-1 text-right">{{ fmtBRL(form.descontoOutros) }}</td></tr>
              <tr class="font-bold bg-gray-50"><td class="border border-gray-300 p-1">TOTAL</td><td class="border border-gray-300 p-1 text-right">{{ fmtBRL(form.salarioBruto) }}</td><td class="border border-gray-300 p-1 text-right">{{ totalDescontos.toLocaleString('pt-BR', {style:'currency',currency:'BRL'}) }}</td></tr>
            </tbody>
          </table>
          <div class="text-right font-bold border-2 border-gray-900 p-2 inline-block mb-4">LÍQUIDO A RECEBER: {{ salarioLiquidoFmt }}</div>
          <p class="text-xs text-gray-600 mb-6">Declaro ter recebido a importância líquida acima especificada.</p>
          <div class="grid grid-cols-2 gap-8 mt-8">
            <div class="text-center border-t border-gray-400 pt-2"><p class="text-xs">Empresa / Responsável</p></div>
            <div class="text-center border-t border-gray-400 pt-2"><p class="text-xs">{{ form.empregadoNome || 'Empregado' }}</p></div>
          </div>
          <p class="text-xs text-right mt-4 text-gray-600">{{ form.cidade || '[Cidade]' }}, {{ fmt(form.data) }}</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-recibo-salario, #doc-recibo-salario * { visibility: visible; }
  #doc-recibo-salario { position: fixed; top: 0; left: 0; right: 0; padding: 1.5cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>



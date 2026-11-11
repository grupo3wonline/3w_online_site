<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_renda_mei'
const form = ref({ cidade: '', data: '', nome: '', cpf: '', cnpj: '', atividade: '', periodoInicio: '', periodoFim: '', faturamento: '', finalidade: 'fins cadastrais e financeiros' })

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function fmtBRL(raw: string) { const n=parseFloat(raw.replace(',','.')); if(!raw||isNaN(n)) return '[faturamento]'; return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }

const faturamentoFmt = computed(() => fmtBRL(form.value.faturamento))

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',cpf:'',cnpj:'',atividade:'',periodoInicio:'',periodoFim:'',faturamento:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Maria Aparecida Ramos',cpf:'123.456.789-00',cnpj:'12.345.678/0001-00',atividade:'Comerciante de alimentos e doces artesanais',periodoInicio:'2025-01-01',periodoFim:'2025-12-31',faturamento:'4500.00',finalidade:'aprovação de crédito em imobiliária e cadastro bancário'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Comprovante de Renda MEI" description="Declaração de faturamento mensal do Microempreendedor Individual, para banco e imobiliária." icon="fa-store" icon-gradient="from-green-500 to-emerald-700" orb-color="green"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha dados do MEI e faturamento. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dados do MEI</h3>
          <input v-model="form.nome" class="w-full input-aurora" placeholder="Nome completo do titular" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.cnpj" class="w-full input-aurora" placeholder="CNPJ MEI" /></div>
          <input v-model="form.atividade" class="w-full input-aurora" placeholder="Atividade empresarial" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Período e Faturamento</h3>
          <div class="grid grid-cols-2 gap-3"><div><label class="text-xs text-blue-300 mb-1.5 block">Período Início</label><input v-model="form.periodoInicio" type="date" class="w-full input-aurora" /></div><div><label class="text-xs text-blue-300 mb-1.5 block">Período Fim</label><input v-model="form.periodoFim" type="date" class="w-full input-aurora" /></div></div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Faturamento Mensal Médio (R$)</label><input v-model="form.faturamento" type="number" step="0.01" class="w-full input-aurora" /></div>
          <input v-model="form.finalidade" class="w-full input-aurora" placeholder="Finalidade" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-renda-mei" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-2">COMPROVANTE DE RENDA – MEI</h1></div>
          <p class="mb-5 text-justify">Eu, <strong>{{ form.nome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.cpf || '[CPF]' }}</strong>, Microempreendedor(a) Individual inscrito(a) no CNPJ nº <strong>{{ form.cnpj || '[CNPJ]' }}</strong>, atuante na atividade de <strong>{{ form.atividade || '[atividade]' }}</strong>, declaro, para fins de <strong>{{ form.finalidade }}</strong>, que meu faturamento mensal médio<span v-if="form.periodoInicio"> no período de <strong>{{ fmt(form.periodoInicio) }}</strong> a <strong>{{ fmt(form.periodoFim) }}</strong></span> foi de aproximadamente <strong>{{ faturamentoFmt }}</strong>.</p>
          <p class="mb-6 text-justify">Declaro estar ciente de que a falsidade desta declaração sujeita-me às penalidades previstas em lei.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.nome || '[Nome do MEI]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.cpf }}</p><p class="text-xs text-gray-600">CNPJ: {{ form.cnpj }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-renda-mei, #doc-renda-mei * { visibility: visible; } #doc-renda-mei { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_renda_informal'
const form = ref({ cidade: '', data: '', nome: '', cpf: '', rg: '', atividade: '', rendaMensal: '', finalidade: 'fins cadastrais e comprovação de renda' })

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }
function fmtBRL(raw: string) { const n=parseFloat(raw.replace(',','.')); if(!raw||isNaN(n)) return '[renda]'; return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }
const rendaFmt = computed(() => fmtBRL(form.value.rendaMensal))

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',cpf:'',rg:'',atividade:'',rendaMensal:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Francisca dos Santos',cpf:'666.777.888-99',rg:'66.777.888-9',atividade:'diarista e prestadora de serviços domésticos',rendaMensal:'2000.00',finalidade:'locação de imóvel residencial'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de Renda Informal" description="Autodeclaração de renda para autônomos sem CNPJ, como diaristas e vendedores." icon="fa-hand-holding-usd" icon-gradient="from-yellow-500 to-amber-700" orb-color="orange"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha seus dados e renda mensal. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dados do Declarante</h3>
          <input v-model="form.nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.rg" class="w-full input-aurora" placeholder="RG" /></div>
          <input v-model="form.atividade" class="w-full input-aurora" placeholder="Atividade exercida (ex: diarista, vendedor ambulante)" />
          <input v-model="form.rendaMensal" type="number" step="0.01" class="w-full input-aurora" placeholder="Renda mensal média (R$)" />
          <input v-model="form.finalidade" class="w-full input-aurora" placeholder="Finalidade (ex: locação de imóvel)" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-renda-informal" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-2">DECLARAÇÃO DE RENDA INFORMAL</h1></div>
          <p class="mb-5 text-justify">Eu, <strong>{{ form.nome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.cpf || '[CPF]' }}</strong><span v-if="form.rg">, RG nº <strong>{{ form.rg }}</strong></span>, declaro, para fins de <strong>{{ form.finalidade }}</strong>, que exerço a atividade de <strong>{{ form.atividade || '[atividade]' }}</strong> de forma autônoma e informal, auferindo uma renda mensal média de aproximadamente <strong>{{ rendaFmt }}</strong>.</p>
          <p class="mb-5 text-justify">Declaro não possuir CNPJ e não manter vínculo empregatício formal, sendo minha renda proveniente exclusivamente das atividades acima mencionadas.</p>
          <p class="mb-6 text-justify">Declaro ainda estar ciente de que a falsidade das informações aqui prestadas sujeita-me às penalidades previstas no art. 299 do Código Penal.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.nome || '[Nome]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.cpf }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-renda-informal, #doc-renda-informal * { visibility: visible; } #doc-renda-informal { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



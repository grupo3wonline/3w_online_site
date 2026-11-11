<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_decl_uniao_estavel'
const estadosCivis = ['Solteiro(a)','Divorciado(a)','Viúvo(a)']
const form = ref({ cidade: '', data: '', dataUniao: '',
  d1Nome: '', d1Cpf: '', d1Rg: '', d1EstadoCivil: 'Solteiro(a)', d1Nascimento: '', d1Profissao: '',
  d2Nome: '', d2Cpf: '', d2Rg: '', d2EstadoCivil: 'Solteiro(a)', d2Nascimento: '', d2Profissao: '',
  enderecoComum: '', finalidade: 'que se fizerem necessários',
})
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }
onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{d1Nome:'',d1Cpf:'',d1Rg:'',d1Nascimento:'',d1Profissao:'',d2Nome:'',d2Cpf:'',d2Rg:'',d2Nascimento:'',d2Profissao:'',enderecoComum:'',dataUniao:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{d1Nome:'Carlos Alberto Mendes',d1Cpf:'111.222.333-44',d1Rg:'12.345.678-9',d1EstadoCivil:'Solteiro(a)',d1Nascimento:'1985-03-15',d1Profissao:'Engenheiro Civil',d2Nome:'Fernanda Costa Mendes',d2Cpf:'555.666.777-88',d2Rg:'98.765.432-1',d2EstadoCivil:'Solteiro(a)',d2Nascimento:'1988-07-22',d2Profissao:'Advogada',enderecoComum:'Rua das Palmeiras, 200, Apto 50 – Jardins – São Paulo/SP',dataUniao:'2018-01-10'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de União Estável" description="Formalize sua união estável com declaração válida para bancos, INSS e órgãos públicos." icon="fa-heart" icon-gradient="from-pink-500 to-red-700" orb-color="pink"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha os dados de ambos os declarantes. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Declarante 1</h3>
          <input v-model="form.d1Nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.d1Cpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.d1Rg" class="w-full input-aurora" placeholder="RG" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.d1Nascimento" type="date" class="w-full input-aurora" /><select v-model="form.d1EstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.d1Profissao" class="w-full input-aurora" placeholder="Profissão" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Declarante 2</h3>
          <input v-model="form.d2Nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.d2Cpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.d2Rg" class="w-full input-aurora" placeholder="RG" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.d2Nascimento" type="date" class="w-full input-aurora" /><select v-model="form.d2EstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.d2Profissao" class="w-full input-aurora" placeholder="Profissão" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">União e Dados</h3>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Data de início da união</label><input v-model="form.dataUniao" type="date" class="w-full input-aurora" /></div>
          <input v-model="form.enderecoComum" class="w-full input-aurora" placeholder="Endereço comum" />
          <input v-model="form.finalidade" class="w-full input-aurora" placeholder="Finalidade" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-decl-uniao-estavel" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">DECLARAÇÃO DE UNIÃO ESTÁVEL</h1></div>
          <p class="mb-5 text-justify">Nós, <strong>{{ form.d1Nome || '[Declarante 1]' }}</strong>, portador(a) do CPF nº {{ form.d1Cpf || '[CPF]' }}<span v-if="form.d1Rg">, RG {{ form.d1Rg }}</span><span v-if="form.d1Nascimento">, nascido(a) em {{ fmt(form.d1Nascimento) }}</span>, {{ form.d1EstadoCivil }}, profissão {{ form.d1Profissao || '[profissão]' }},</p>
          <p class="mb-5 text-justify">e <strong>{{ form.d2Nome || '[Declarante 2]' }}</strong>, portador(a) do CPF nº {{ form.d2Cpf || '[CPF]' }}<span v-if="form.d2Rg">, RG {{ form.d2Rg }}</span><span v-if="form.d2Nascimento">, nascido(a) em {{ fmt(form.d2Nascimento) }}</span>, {{ form.d2EstadoCivil }}, profissão {{ form.d2Profissao || '[profissão]' }},</p>
          <p class="mb-5 text-justify">ambos residentes à <strong>{{ form.enderecoComum || '[endereço]' }}</strong>, declaramos, para os fins de direito e para {{ form.finalidade }}, que vivemos em união estável desde <strong>{{ fmt(form.dataUniao) }}</strong>, em convivência pública, contínua e duradoura, com objetivo de constituição de família, nos termos do art. 1.723 do Código Civil.</p>
          <p class="mb-6 text-justify">Declaramos ainda estar cientes de que a falsidade desta declaração nos sujeita às penas previstas em lei.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div class="text-center border-t border-gray-400 pt-2"><p class="font-semibold text-sm">{{ form.d1Nome || 'Declarante 1' }}</p><p class="text-xs text-gray-600">CPF: {{ form.d1Cpf }}</p></div>
            <div class="text-center border-t border-gray-400 pt-2"><p class="font-semibold text-sm">{{ form.d2Nome || 'Declarante 2' }}</p><p class="text-xs text-gray-600">CPF: {{ form.d2Cpf }}</p></div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-decl-uniao-estavel, #doc-decl-uniao-estavel * { visibility: visible; } #doc-decl-uniao-estavel { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



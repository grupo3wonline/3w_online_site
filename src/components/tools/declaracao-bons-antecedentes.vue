<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_bons_antecedentes'
const form = ref({ cidade: '', data: '', nome: '', cpf: '', rg: '', estadoCivil: 'Solteiro(a)', profissao: '', endereco: '', finalidade: 'concurso público' })
const estadosCivis = ['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)','União estável']

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',cpf:'',rg:'',profissao:'',endereco:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Amanda Cristina Ferreira',cpf:'444.555.666-77',rg:'33.444.555-6',estadoCivil:'Solteiro(a)',profissao:'Administradora',endereco:'Rua do Comércio, 100 – Centro – São Paulo/SP',finalidade:'processo seletivo na empresa Empresa XYZ Ltda'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de Bons Antecedentes" description="Autodeclaração de ausência de antecedentes criminais para concursos e empregos." icon="fa-shield-halved" icon-gradient="from-blue-500 to-indigo-700" orb-color="blue"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha seus dados pessoais e a finalidade. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
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
          <div class="grid grid-cols-2 gap-3"><select v-model="form.estadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select><input v-model="form.profissao" class="w-full input-aurora" placeholder="Profissão" /></div>
          <input v-model="form.endereco" class="w-full input-aurora" placeholder="Endereço completo" />
          <input v-model="form.finalidade" class="w-full input-aurora" placeholder="Finalidade (ex: concurso público, processo seletivo...)" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Local e Data</h3>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-bons-antecedentes" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">DECLARAÇÃO DE BONS ANTECEDENTES</h1></div>
          <p class="mb-6 text-justify">Eu, <strong>{{ form.nome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.cpf || '[CPF]' }}</strong><span v-if="form.rg">, RG nº <strong>{{ form.rg }}</strong></span>, <strong>{{ form.estadoCivil }}</strong><span v-if="form.profissao">, profissão <strong>{{ form.profissao }}</strong></span>, residente e domiciliado(a) à <strong>{{ form.endereco || '[endereço]' }}</strong>, declaro, sob as penas da lei, para fins de <strong>{{ form.finalidade }}</strong>, que não possuo antecedentes criminais, não respondendo a nenhum processo criminal em andamento, nem condenação transitada em julgado.</p>
          <p class="mb-6 text-justify">Declaro ainda estar ciente de que a falsidade desta declaração sujeita-me às penas previstas no art. 299 do Código Penal.</p>
          <p class="mb-6 text-justify">Por ser verdade, firmo a presente declaração.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.nome || '[Nome]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.cpf }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-bons-antecedentes, #doc-bons-antecedentes * { visibility: visible; } #doc-bons-antecedentes { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



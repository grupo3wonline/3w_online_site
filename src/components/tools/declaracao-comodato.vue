<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_comodato'
const form = ref({ cidade: '', data: '', numero: '',
  comodanteNome: '', comodanteCpfCnpj: '', comodanteEndereco: '',
  comodatarioNome: '', comodatarioCpfCnpj: '', comodatarioEndereco: '',
  bemDescricao: '', dataInicio: '', dataFim: '',
  clausulas: 'O bem será utilizado exclusivamente para fins residenciais/comerciais acordados.\nÉ vedado ao comodatário ceder, sublocar ou emprestar o bem a terceiros.\nFindo o prazo, o comodatário deve restituir o bem em perfeito estado de conservação.\nO comodatário responde por quaisquer danos causados ao bem.',
  t1Nome: '', t1Cpf: '', t2Nome: '', t2Cpf: '',
})

function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; form.value.dataInicio=new Date().toISOString().split('T')[0]; form.value.numero=String(Math.floor(Math.random()*90000)+10000); const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{comodanteNome:'',comodanteCpfCnpj:'',comodanteEndereco:'',comodatarioNome:'',comodatarioCpfCnpj:'',comodatarioEndereco:'',bemDescricao:'',dataFim:'',t1Nome:'',t1Cpf:'',t2Nome:'',t2Cpf:''}); form.value.numero=String(Math.floor(Math.random()*90000)+10000); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{comodanteNome:'Roberto Lima',comodanteCpfCnpj:'100.200.300-40',comodanteEndereco:'Rua dos Jardins, 100 – SP',comodatarioNome:'Ana Beatriz Lima',comodatarioCpfCnpj:'500.600.700-80',comodatarioEndereco:'Rua das Flores, 200 – SP',bemDescricao:'Imóvel residencial situado à Rua das Palmeiras, 50 – Jardins – São Paulo/SP, composto por 2 dormitórios, sala, cozinha e banheiro',dataFim:'2025-12-31',t1Nome:'Carlos Souza',t1Cpf:'111.222.333-44',t2Nome:'Maria Santos',t2Cpf:'555.666.777-88'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de Comodato" description="Cessão gratuita de imóvel ou bem com prazo e partes identificadas." icon="fa-key" icon-gradient="from-amber-500 to-yellow-700" orb-color="orange"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha comodante, comodatário e dados do bem cedido. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Comodante (cede o bem)</h3>
          <input v-model="form.comodanteNome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <input v-model="form.comodanteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.comodanteEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Comodatário (recebe o bem)</h3>
          <input v-model="form.comodatarioNome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <input v-model="form.comodatarioCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.comodatarioEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Bem e Prazo</h3>
          <textarea v-model="form.bemDescricao" rows="3" class="w-full input-aurora resize-none" placeholder="Descrição completa do bem cedido"></textarea>
          <div class="grid grid-cols-2 gap-3"><div><label class="text-xs text-blue-300 mb-1.5 block">Início</label><input v-model="form.dataInicio" type="date" class="w-full input-aurora" /></div><div><label class="text-xs text-blue-300 mb-1.5 block">Fim (opcional)</label><input v-model="form.dataFim" type="date" class="w-full input-aurora" /></div></div>
          <textarea v-model="form.clausulas" rows="4" class="w-full input-aurora resize-none text-xs" placeholder="Cláusulas..."></textarea>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Testemunhas</h3>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.t1Nome" class="w-full input-aurora text-xs" placeholder="Nome T1" /><input v-model="form.t1Cpf" class="w-full input-aurora text-xs" placeholder="CPF T1" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.t2Nome" class="w-full input-aurora text-xs" placeholder="Nome T2" /><input v-model="form.t2Cpf" class="w-full input-aurora text-xs" placeholder="CPF T2" /></div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-comodato" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-6"><div class="text-xs text-gray-500 mb-1">Nº {{ form.numero }}</div><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">DECLARAÇÃO DE COMODATO</h1></div>
          <p class="mb-4 text-justify"><strong>COMODANTE:</strong> {{ form.comodanteNome || '[Comodante]' }}, CPF/CNPJ: {{ form.comodanteCpfCnpj || '[CPF]' }}, residente à {{ form.comodanteEndereco || '[endereço]' }}.</p>
          <p class="mb-4 text-justify"><strong>COMODATÁRIO:</strong> {{ form.comodatarioNome || '[Comodatário]' }}, CPF/CNPJ: {{ form.comodatarioCpfCnpj || '[CPF]' }}, residente à {{ form.comodatarioEndereco || '[endereço]' }}.</p>
          <p class="mb-4 text-justify">O COMODANTE cede, em comodato (empréstimo gratuito), ao COMODATÁRIO o seguinte bem: <strong>{{ form.bemDescricao || '[descrição do bem]' }}</strong>, pelo período de <strong>{{ fmt(form.dataInicio) }}</strong> a <strong>{{ form.dataFim ? fmt(form.dataFim) : 'prazo indeterminado' }}</strong>.</p>
          <p class="mb-3 font-semibold">Cláusulas:</p>
          <div v-for="(c,i) in form.clausulas.split('\n').filter(l=>l.trim())" :key="i" class="mb-1 text-justify text-xs">{{ i+1 }}. {{ c }}</div>
          <div class="grid grid-cols-2 gap-6 mt-8 pt-4 border-t border-gray-400">
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="font-semibold text-xs">{{ form.comodanteNome || 'Comodante' }}</p></div></div>
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="font-semibold text-xs">{{ form.comodatarioNome || 'Comodatário' }}</p></div></div>
          </div>
          <div v-if="form.t1Nome||form.t2Nome" class="grid grid-cols-2 gap-6 mt-4">
            <div v-if="form.t1Nome" class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs">{{ form.t1Nome }}</p><p class="text-xs text-gray-600">CPF: {{ form.t1Cpf }}</p><p class="text-xs text-gray-500">Testemunha 1</p></div></div>
            <div v-if="form.t2Nome" class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs">{{ form.t2Nome }}</p><p class="text-xs text-gray-600">CPF: {{ form.t2Cpf }}</p><p class="text-xs text-gray-500">Testemunha 2</p></div></div>
          </div>
          <p class="text-xs text-right mt-4">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-comodato, #doc-comodato * { visibility: visible; } #doc-comodato { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



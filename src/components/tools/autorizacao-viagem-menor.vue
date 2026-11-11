<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_viagem_menor'
const form = ref({ cidade: '', data: '',
  menorNome: '', menorCpf: '', menorNascimento: '', menorFiliacao: '',
  tipoViagem: 'nacional',
  resp1Nome: '', resp1Cpf: '', resp1Parentesco: 'mãe',
  resp2Nome: '', resp2Cpf: '', resp2Parentesco: 'pai',
  acompanhanteNome: '', acompanhanteCpf: '', acompanhanteParentesco: '', acompanhanteViaja: false,
  destino: '', dataPartida: '', dataRetorno: '',
  modal: 'aéreo',
})

const parentescos = ['mãe','pai','avó/avô','tio(a)','responsável legal']
const modais = ['aéreo','rodoviário','ferroviário','marítimo','outro']

function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{menorNome:'',menorCpf:'',menorNascimento:'',menorFiliacao:'',resp1Nome:'',resp1Cpf:'',resp2Nome:'',resp2Cpf:'',acompanhanteNome:'',acompanhanteCpf:'',acompanhanteParentesco:'',destino:'',dataPartida:'',dataRetorno:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{menorNome:'Pedro Henrique Saraiva',menorCpf:'001.002.003-04',menorNascimento:'2015-07-20',menorFiliacao:'Filho de Carlos Saraiva e Ana Maria Saraiva',tipoViagem:'nacional',resp1Nome:'Ana Maria Saraiva',resp1Cpf:'100.200.300-40',resp1Parentesco:'mãe',resp2Nome:'Carlos Saraiva',resp2Cpf:'500.600.700-80',resp2Parentesco:'pai',acompanhanteViaja:false,destino:'Rio de Janeiro – RJ',dataPartida:'2025-07-01',dataRetorno:'2025-07-10',modal:'aéreo'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Autorização de Viagem para Menor" description="Autorize a viagem de criança ou adolescente, nacional ou internacional, no formato CNJ." icon="fa-plane" icon-gradient="from-sky-500 to-blue-700" orb-color="blue"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Aviso',text:'Recomendado reconhecimento de firma em cartório. Verifique as exigências da Polícia Federal para viagens internacionais.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dados do Menor</h3>
          <input v-model="form.menorNome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.menorCpf" class="w-full input-aurora" placeholder="CPF / Passaporte" /><input v-model="form.menorNascimento" type="date" class="w-full input-aurora" /></div>
          <input v-model="form.menorFiliacao" class="w-full input-aurora" placeholder="Filiação (filho(a) de...)" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Tipo de Viagem</h3>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="form.tipoViagem" value="nacional" class="accent-blue-500" /><span class="text-sm text-blue-200">Nacional</span></label>
            <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="form.tipoViagem" value="internacional" class="accent-blue-500" /><span class="text-sm text-blue-200">Internacional</span></label>
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Responsáveis Autorizantes</h3>
          <div class="grid grid-cols-3 gap-3"><input v-model="form.resp1Nome" class="w-full input-aurora col-span-2 text-xs" placeholder="Nome Responsável 1" /><select v-model="form.resp1Parentesco" class="w-full input-aurora text-xs"><option v-for="p in parentescos" :key="p">{{ p }}</option></select></div>
          <input v-model="form.resp1Cpf" class="w-full input-aurora text-xs" placeholder="CPF Responsável 1" />
          <div class="grid grid-cols-3 gap-3"><input v-model="form.resp2Nome" class="w-full input-aurora col-span-2 text-xs" placeholder="Nome Responsável 2 (opcional)" /><select v-model="form.resp2Parentesco" class="w-full input-aurora text-xs"><option v-for="p in parentescos" :key="p">{{ p }}</option></select></div>
          <input v-model="form.resp2Cpf" class="w-full input-aurora text-xs" placeholder="CPF Responsável 2" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Acompanhante (se houver)</h3>
          <label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" v-model="form.acompanhanteViaja" class="accent-blue-500" /><span class="text-sm text-blue-200">Menor viaja com acompanhante</span></label>
          <template v-if="form.acompanhanteViaja">
            <input v-model="form.acompanhanteNome" class="w-full input-aurora text-xs" placeholder="Nome do acompanhante" />
            <div class="grid grid-cols-2 gap-3"><input v-model="form.acompanhanteCpf" class="w-full input-aurora text-xs" placeholder="CPF" /><input v-model="form.acompanhanteParentesco" class="w-full input-aurora text-xs" placeholder="Parentesco / Relação" /></div>
          </template>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Destino e Período</h3>
          <input v-model="form.destino" class="w-full input-aurora" placeholder="Destino (cidade/país)" />
          <div class="grid grid-cols-2 gap-3"><div><label class="text-xs text-blue-300 mb-1.5 block">Partida</label><input v-model="form.dataPartida" type="date" class="w-full input-aurora" /></div><div><label class="text-xs text-blue-300 mb-1.5 block">Retorno</label><input v-model="form.dataRetorno" type="date" class="w-full input-aurora" /></div></div>
          <select v-model="form.modal" class="w-full input-aurora"><option v-for="m in modais" :key="m">{{ m }}</option></select>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-viagem-menor" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-xs font-serif leading-relaxed">
          <div class="text-center mb-5"><h1 class="text-base font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 inline-block px-4">AUTORIZAÇÃO DE VIAGEM<br>PARA MENOR DE IDADE</h1><p class="text-xs text-gray-500 mt-1">Viagem {{ form.tipoViagem === 'nacional' ? 'Nacional' : 'Internacional' }}</p></div>
          <p class="mb-3 text-justify">Eu(Nós), <strong>{{ form.resp1Nome || '[Responsável 1]' }}</strong>, {{ form.resp1Parentesco }}, CPF {{ form.resp1Cpf || '[CPF]' }}<span v-if="form.resp2Nome">, e <strong>{{ form.resp2Nome }}</strong>, {{ form.resp2Parentesco }}, CPF {{ form.resp2Cpf }}</span>, autorizamos o(a) menor <strong>{{ form.menorNome || '[menor]' }}</strong>, CPF/passaporte {{ form.menorCpf || '[CPF]' }}, nascido(a) em {{ fmt(form.menorNascimento) }}<span v-if="form.menorFiliacao">, {{ form.menorFiliacao }}</span>, a viajar<span v-if="form.acompanhanteViaja"> acompanhado(a) de <strong>{{ form.acompanhanteNome }}</strong> ({{ form.acompanhanteParentesco }}, CPF: {{ form.acompanhanteCpf }})</span><span v-else> desacompanhado(a)</span> para <strong>{{ form.destino || '[destino]' }}</strong>, via modal <strong>{{ form.modal }}</strong>, no período de <strong>{{ fmt(form.dataPartida) }}</strong> a <strong>{{ fmt(form.dataRetorno) }}</strong>.</p>
          <p class="mb-3 text-justify">Esta autorização é válida exclusivamente para a viagem acima descrita, nos termos do Estatuto da Criança e do Adolescente (Lei nº 8.069/90) e da Resolução nº 295/2019 do CNJ.</p>
          <p class="text-right mb-4">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div :class="form.resp2Nome ? 'grid grid-cols-2 gap-6' : 'flex justify-center'">
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.resp1Nome || 'Responsável 1' }}</p><p class="text-xs text-gray-600">{{ form.resp1Parentesco }} – CPF: {{ form.resp1Cpf }}</p></div></div>
            <div v-if="form.resp2Nome" class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.resp2Nome }}</p><p class="text-xs text-gray-600">{{ form.resp2Parentesco }} – CPF: {{ form.resp2Cpf }}</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-viagem-menor, #doc-viagem-menor * { visibility: visible; } #doc-viagem-menor { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



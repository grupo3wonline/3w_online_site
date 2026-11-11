<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_contrato_uniao_estavel'
const estadosCivis = ['Solteiro(a)','Divorciado(a)','Viúvo(a)']
const regimes = ['Comunhão Parcial de Bens','Comunhão Universal de Bens','Separação Total de Bens']
const form = ref({ cidade: '', data: '', dataInicio: '', regime: 'Comunhão Parcial de Bens',
  p1Nome: '', p1Cpf: '', p1Rg: '', p1EstadoCivil: 'Solteiro(a)', p1Nascimento: '', p1Profissao: '', p1Endereco: '',
  p2Nome: '', p2Cpf: '', p2Rg: '', p2EstadoCivil: 'Solteiro(a)', p2Nascimento: '', p2Profissao: '', p2Endereco: '',
  enderecoComum: '',
})

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{p1Nome:'',p1Cpf:'',p1Rg:'',p1Nascimento:'',p1Profissao:'',p1Endereco:'',p2Nome:'',p2Cpf:'',p2Rg:'',p2Nascimento:'',p2Profissao:'',p2Endereco:'',enderecoComum:'',dataInicio:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{p1Nome:'André Luis Martins',p1Cpf:'100.200.300-40',p1Rg:'10.020.030-4',p1EstadoCivil:'Solteiro(a)',p1Nascimento:'1985-04-10',p1Profissao:'Médico',p1Endereco:'Rua das Magnólias, 100 – SP',p2Nome:'Renata Alves Martins',p2Cpf:'500.600.700-80',p2Rg:'50.060.070-8',p2EstadoCivil:'Solteiro(a)',p2Nascimento:'1988-09-25',p2Profissao:'Enfermeira',p2Endereco:'Rua das Magnólias, 100 – SP',enderecoComum:'Rua das Magnólias, 100 – Jardins – São Paulo/SP',regime:'Comunhão Parcial de Bens',dataInicio:'2020-02-14'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Contrato de União Estável" description="Formalize a convivência e escolha o regime de bens: comunhão parcial, universal ou separação total." icon="fa-ring" icon-gradient="from-pink-500 to-red-700" orb-color="pink"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Recomendação',text:'Para maior validade jurídica, registre este contrato em cartório. Este gerador é um modelo-base.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Convivente 1</h3>
          <input v-model="form.p1Nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.p1Cpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.p1Rg" class="w-full input-aurora" placeholder="RG" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.p1Nascimento" type="date" class="w-full input-aurora" /><select v-model="form.p1EstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.p1Profissao" class="w-full input-aurora" placeholder="Profissão" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Convivente 2</h3>
          <input v-model="form.p2Nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.p2Cpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.p2Rg" class="w-full input-aurora" placeholder="RG" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.p2Nascimento" type="date" class="w-full input-aurora" /><select v-model="form.p2EstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.p2Profissao" class="w-full input-aurora" placeholder="Profissão" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">União e Regime de Bens</h3>
          <input v-model="form.enderecoComum" class="w-full input-aurora" placeholder="Endereço comum do casal" />
          <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Início da Convivência</label><input v-model="form.dataInicio" type="date" class="w-full input-aurora" /></div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Regime de Bens</label><select v-model="form.regime" class="w-full input-aurora"><option v-for="r in regimes" :key="r">{{ r }}</option></select></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-contrato-uniao-estavel" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-xs font-serif leading-relaxed">
          <div class="text-center mb-5"><h1 class="text-lg font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">CONTRATO DE UNIÃO ESTÁVEL</h1></div>
          <p class="mb-3 text-justify"><strong>Convivente 1:</strong> {{ form.p1Nome || '[Nome]' }}, CPF: {{ form.p1Cpf || '[CPF]' }}<span v-if="form.p1Rg">, RG: {{ form.p1Rg }}</span><span v-if="form.p1Nascimento">, nascido(a) em {{ fmt(form.p1Nascimento) }}</span>, {{ form.p1EstadoCivil }}<span v-if="form.p1Profissao">, {{ form.p1Profissao }}</span>.</p>
          <p class="mb-3 text-justify"><strong>Convivente 2:</strong> {{ form.p2Nome || '[Nome]' }}, CPF: {{ form.p2Cpf || '[CPF]' }}<span v-if="form.p2Rg">, RG: {{ form.p2Rg }}</span><span v-if="form.p2Nascimento">, nascido(a) em {{ fmt(form.p2Nascimento) }}</span>, {{ form.p2EstadoCivil }}<span v-if="form.p2Profissao">, {{ form.p2Profissao }}</span>.</p>
          <p class="mb-3 text-justify">Os conviventes acima declarados, que convivem em união estável desde <strong>{{ fmt(form.dataInicio) }}</strong>, residentes à <strong>{{ form.enderecoComum || '[endereço]' }}</strong>, nos termos do art. 1.723 do Código Civil, firmam o presente contrato, regulando os efeitos patrimoniais da união estável sob o regime de <strong>{{ form.regime }}</strong>.</p>
          <div class="mb-3">
            <p class="font-semibold mb-1">Disposições Principais:</p>
            <ul class="list-disc pl-5 space-y-0.5 text-xs">
              <template v-if="form.regime === 'Comunhão Parcial de Bens'">
                <li>Comunicam-se os bens adquiridos onerosamente na constância da união.</li>
                <li>Excluem-se os bens anteriores à união e os recebidos por herança ou doação.</li>
              </template>
              <template v-else-if="form.regime === 'Comunhão Universal de Bens'">
                <li>Comunicam-se todos os bens presentes e futuros de ambos os conviventes.</li>
                <li>Incluem-se bens anteriores à união, herança e doações.</li>
              </template>
              <template v-else>
                <li>Cada convivente mantém a propriedade exclusiva de seus bens presentes e futuros.</li>
                <li>Nenhum bem se comunica entre as partes durante ou após a união.</li>
              </template>
              <li>Em caso de dissolução, aplicam-se as regras do regime eleito.</li>
              <li>As partes poderão alterar este contrato mediante distrato escrito.</li>
            </ul>
          </div>
          <p class="text-right mb-4">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="grid grid-cols-2 gap-6 mt-4">
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.p1Nome || 'Convivente 1' }}</p><p class="text-xs text-gray-600">CPF: {{ form.p1Cpf }}</p></div></div>
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.p2Nome || 'Convivente 2' }}</p><p class="text-xs text-gray-600">CPF: {{ form.p2Cpf }}</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-contrato-uniao-estavel, #doc-contrato-uniao-estavel * { visibility: visible; } #doc-contrato-uniao-estavel { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



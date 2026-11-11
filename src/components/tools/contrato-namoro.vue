<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_contrato_namoro'
const estadosCivis = ['Solteiro(a)','Divorciado(a)','Viúvo(a)']
const form = ref({ cidade: '', data: '', dataInicio: '',
  p1Nome: '', p1Cpf: '', p1EstadoCivil: 'Solteiro(a)', p1Profissao: '', p1Endereco: '',
  p2Nome: '', p2Cpf: '', p2EstadoCivil: 'Solteiro(a)', p2Profissao: '', p2Endereco: '',
})

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{p1Nome:'',p1Cpf:'',p1Profissao:'',p1Endereco:'',p2Nome:'',p2Cpf:'',p2Profissao:'',p2Endereco:'',dataInicio:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{p1Nome:'Lucas Andrade Silva',p1Cpf:'111.222.333-44',p1EstadoCivil:'Solteiro(a)',p1Profissao:'Desenvolvedor de Software',p1Endereco:'Rua Alpha, 100 – São Paulo/SP',p2Nome:'Mariana Costa Lima',p2Cpf:'555.666.777-88',p2EstadoCivil:'Solteiro(a)',p2Profissao:'Designer Gráfica',p2Endereco:'Rua Beta, 200 – São Paulo/SP',dataInicio:'2024-06-15'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Contrato de Namoro" description="Declare a independência patrimonial do relacionamento, sem caracterizar união estável." icon="fa-heart-crack" icon-gradient="from-rose-500 to-pink-700" orb-color="pink"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Aviso',text:'Este documento não tem valor jurídico definitivo. Consulte um advogado para segurança total.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Parte 1</h3>
          <input v-model="form.p1Nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.p1Cpf" class="w-full input-aurora" placeholder="CPF" /><select v-model="form.p1EstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.p1Profissao" class="w-full input-aurora" placeholder="Profissão" />
          <input v-model="form.p1Endereco" class="w-full input-aurora" placeholder="Endereço" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Parte 2</h3>
          <input v-model="form.p2Nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.p2Cpf" class="w-full input-aurora" placeholder="CPF" /><select v-model="form.p2EstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.p2Profissao" class="w-full input-aurora" placeholder="Profissão" />
          <input v-model="form.p2Endereco" class="w-full input-aurora" placeholder="Endereço" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Datas</h3>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Início do Relacionamento</label><input v-model="form.dataInicio" type="date" class="w-full input-aurora" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-contrato-namoro" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-xs font-serif leading-relaxed">
          <div class="text-center mb-6"><h1 class="text-lg font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">CONTRATO DE NAMORO</h1></div>
          <p class="mb-3 text-justify"><strong>Parte 1:</strong> {{ form.p1Nome || '[Nome]' }}, CPF: {{ form.p1Cpf || '[CPF]' }}, {{ form.p1EstadoCivil }}<span v-if="form.p1Profissao">, {{ form.p1Profissao }}</span><span v-if="form.p1Endereco">, residente à {{ form.p1Endereco }}</span>.</p>
          <p class="mb-3 text-justify"><strong>Parte 2:</strong> {{ form.p2Nome || '[Nome]' }}, CPF: {{ form.p2Cpf || '[CPF]' }}, {{ form.p2EstadoCivil }}<span v-if="form.p2Profissao">, {{ form.p2Profissao }}</span><span v-if="form.p2Endereco">, residente à {{ form.p2Endereco }}</span>.</p>
          <p class="mb-3 text-justify">As partes acima identificadas declaram expressamente que, desde <strong>{{ fmt(form.dataInicio) }}</strong>, mantêm entre si um relacionamento afetivo na modalidade de <strong>namoro</strong>, sem qualquer intenção de constituir família nos moldes do art. 1.723 do Código Civil.</p>
          <p class="mb-2 font-semibold">As partes acordam:</p>
          <ol class="list-decimal pl-5 mb-4 space-y-1 text-xs">
            <li>O relacionamento não configura união estável, não gerando, portanto, qualquer direito sobre o patrimônio da outra parte.</li>
            <li>Cada parte mantém a plena independência patrimonial sobre seus bens presentes e futuros.</li>
            <li>Despesas pessoais são de responsabilidade individual de cada parte.</li>
            <li>Eventuais despesas compartilhadas serão tratadas como mera liberalidade, sem gerar direito a reembolso.</li>
            <li>O presente instrumento não impede a conversão futura em união estável, caso as partes assim decidam por acordo expresso.</li>
          </ol>
          <p class="mb-5 text-justify text-xs">Declaram as partes estarem cientes do conteúdo deste contrato, firmando-o de livre e espontânea vontade.</p>
          <p class="text-right mb-6 text-xs">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="grid grid-cols-2 gap-6 mt-6">
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.p1Nome || 'Parte 1' }}</p><p class="text-xs text-gray-600">CPF: {{ form.p1Cpf }}</p></div></div>
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.p2Nome || 'Parte 2' }}</p><p class="text-xs text-gray-600">CPF: {{ form.p2Cpf }}</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-contrato-namoro, #doc-contrato-namoro * { visibility: visible; } #doc-contrato-namoro { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



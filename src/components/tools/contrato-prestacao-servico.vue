<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_contrato_servico'
const formasPgto = ['À vista','Parcelado','Mensal','Por etapas']
const form = ref({ cidade: '', data: '', numero: '',
  contratanteNome: '', contratanteCpfCnpj: '', contratanteEndereco: '',
  contratadoNome: '', contratadoCpfCnpj: '', contratadoEndereco: '',
  descricaoServico: '', dataInicio: '', dataFim: '', valor: '', formaPagamento: 'À vista',
  multaRescisao: '20', t1Nome: '', t1Cpf: '', t2Nome: '', t2Cpf: '',
})

function fmtBRL(raw: string) { const n=parseFloat(raw.replace(',','.')); if(!raw||isNaN(n)) return '[valor]'; return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; form.value.numero=String(Math.floor(Math.random()*90000)+10000); const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{contratanteNome:'',contratanteCpfCnpj:'',contratanteEndereco:'',contratadoNome:'',contratadoCpfCnpj:'',contratadoEndereco:'',descricaoServico:'',dataInicio:'',dataFim:'',valor:'',t1Nome:'',t1Cpf:'',t2Nome:'',t2Cpf:''}); form.value.numero=String(Math.floor(Math.random()*90000)+10000); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{contratanteNome:'Tech Startup Ltda',contratanteCpfCnpj:'11.222.333/0001-44',contratanteEndereco:'Av. Faria Lima, 1000 – São Paulo/SP',contratadoNome:'Paulo Rodrigues (Freelancer)',contratadoCpfCnpj:'222.333.444-55',contratadoEndereco:'Rua dos Programadores, 50 – SP',descricaoServico:'Desenvolvimento de sistema web em Vue.js e Node.js, incluindo cadastros de usuários, dashboard e integração com API de pagamento.',dataInicio:'2025-02-01',dataFim:'2025-04-30',valor:'15000.00',formaPagamento:'Por etapas',multaRescisao:'20',t1Nome:'Carla Souza',t1Cpf:'111.000.111-22',t2Nome:'Pedro Almeida',t2Cpf:'333.000.333-44'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Contrato de Prestação de Serviço" description="Combine por escrito o serviço, prazo e valor antes de começar, para autônomo, MEI ou empresa." icon="fa-file-contract" icon-gradient="from-blue-500 to-indigo-700" orb-color="blue"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Recomendação',text:'Para contratos de alto valor, considere reconhecer as assinaturas em cartório.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Contratante</h3>
          <input v-model="form.contratanteNome" class="w-full input-aurora" placeholder="Nome / Razão social" />
          <input v-model="form.contratanteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.contratanteEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Contratado</h3>
          <input v-model="form.contratadoNome" class="w-full input-aurora" placeholder="Nome / Razão social" />
          <input v-model="form.contratadoCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.contratadoEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Serviço e Valores</h3>
          <textarea v-model="form.descricaoServico" rows="3" class="w-full input-aurora resize-none" placeholder="Descrição detalhada do serviço contratado"></textarea>
          <div class="grid grid-cols-2 gap-3"><div><label class="text-xs text-blue-300 mb-1.5 block">Início</label><input v-model="form.dataInicio" type="date" class="w-full input-aurora" /></div><div><label class="text-xs text-blue-300 mb-1.5 block">Fim / Entrega</label><input v-model="form.dataFim" type="date" class="w-full input-aurora" /></div></div>
          <input v-model="form.valor" type="number" step="0.01" class="w-full input-aurora" placeholder="Valor total (R$)" />
          <select v-model="form.formaPagamento" class="w-full input-aurora"><option v-for="f in formasPgto" :key="f">{{ f }}</option></select>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Multa por rescisão antecipada (%)</label><input v-model="form.multaRescisao" type="number" class="w-full input-aurora" /></div>
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
        <div id="doc-contrato-servico" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-xs font-serif leading-relaxed">
          <div class="text-center mb-4"><div class="text-xs text-gray-500 mb-0.5">Contrato nº {{ form.numero }}</div><h1 class="text-base font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 inline-block px-4">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1></div>
          <p class="mb-2"><strong>CONTRATANTE:</strong> {{ form.contratanteNome || '[Contratante]' }}, CPF/CNPJ: {{ form.contratanteCpfCnpj || '[CPF]' }}, residente/sediado à {{ form.contratanteEndereco || '[endereço]' }}.</p>
          <p class="mb-2"><strong>CONTRATADO:</strong> {{ form.contratadoNome || '[Contratado]' }}, CPF/CNPJ: {{ form.contratadoCpfCnpj || '[CPF]' }}, residente/sediado à {{ form.contratadoEndereco || '[endereço]' }}.</p>
          <p class="mb-3 font-semibold">Cláusulas:</p>
          <ol class="list-decimal pl-4 mb-3 space-y-1 text-xs">
            <li><strong>Objeto:</strong> O CONTRATADO prestará ao CONTRATANTE os seguintes serviços: {{ form.descricaoServico || '[descrição dos serviços]' }}</li>
            <li><strong>Prazo:</strong> Os serviços serão realizados no período de <strong>{{ fmt(form.dataInicio) }}</strong> a <strong>{{ fmt(form.dataFim) }}</strong>.</li>
            <li><strong>Valor:</strong> O CONTRATANTE pagará ao CONTRATADO o valor total de <strong>{{ fmtBRL(form.valor) }}</strong>, na modalidade <strong>{{ form.formaPagamento }}</strong>.</li>
            <li><strong>Rescisão:</strong> Em caso de rescisão antecipada por qualquer das partes, incidirá multa de <strong>{{ form.multaRescisao }}%</strong> sobre o valor total do contrato.</li>
            <li><strong>Independência:</strong> O CONTRATADO atua como prestador de serviços autônomo, não existindo vínculo empregatício.</li>
            <li><strong>Foro:</strong> Fica eleito o foro da comarca de {{ form.cidade || '[Cidade]' }} para dirimir quaisquer controvérsias.</li>
          </ol>
          <p class="text-right mb-3">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="grid grid-cols-2 gap-4 mt-4">
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.contratanteNome || 'Contratante' }}</p><p class="text-xs text-gray-600">{{ form.contratanteCpfCnpj }}</p></div></div>
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.contratadoNome || 'Contratado' }}</p><p class="text-xs text-gray-600">{{ form.contratadoCpfCnpj }}</p></div></div>
          </div>
          <div v-if="form.t1Nome||form.t2Nome" class="grid grid-cols-2 gap-4 mt-3">
            <div v-if="form.t1Nome" class="text-center"><div class="border-t border-gray-400 mt-4 pt-1"><p class="text-xs">{{ form.t1Nome }}</p><p class="text-xs text-gray-500">CPF: {{ form.t1Cpf }} – Testemunha 1</p></div></div>
            <div v-if="form.t2Nome" class="text-center"><div class="border-t border-gray-400 mt-4 pt-1"><p class="text-xs">{{ form.t2Nome }}</p><p class="text-xs text-gray-500">CPF: {{ form.t2Cpf }} – Testemunha 2</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-contrato-servico, #doc-contrato-servico * { visibility: visible; } #doc-contrato-servico { position: fixed; top: 0; left: 0; right: 0; padding: 1.5cm; background: white; } @page { size: A4; margin: 1.5cm; } }
</style>



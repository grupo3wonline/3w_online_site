<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_contrato_aluguel'
const indices = ['IGPM','IPCA','INPC','Sem reajuste']
const estadosCivis = ['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)','União estável']
const form = ref({ cidade: '', data: '', numero: '',
  locadorNome: '', locadorCpfCnpj: '', locadorEstadoCivil: 'Solteiro(a)', locadorEndereco: '',
  locatarioNome: '', locatarioCpfCnpj: '', locatarioEstadoCivil: 'Solteiro(a)', locatarioProfissao: '', locatarioEndereco: '',
  fiadorNome: '', fiadorCpfCnpj: '', fiadorEndereco: '',
  imovelEndereco: '', valorAluguel: '', valorCondominio: '', valorIPTU: '',
  dataInicio: '', duracao: '12', indiceReajuste: 'IGPM',
  multaRescisao: '3', t1Nome: '', t1Cpf: '', t2Nome: '', t2Cpf: '',
})

function fmtBRL(raw: string) { const n=parseFloat(raw.replace(',','.')); if(!raw||isNaN(n)) return ''; return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

const dataFim = computed(() => {
  if(!form.value.dataInicio||!form.value.duracao) return '___/___/____'
  const d=new Date(form.value.dataInicio); d.setMonth(d.getMonth()+parseInt(form.value.duracao)); return fmt(d.toISOString().split('T')[0])
})

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; form.value.numero=String(Math.floor(Math.random()*90000)+10000); const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{locadorNome:'',locadorCpfCnpj:'',locadorEndereco:'',locatarioNome:'',locatarioCpfCnpj:'',locatarioProfissao:'',locatarioEndereco:'',fiadorNome:'',fiadorCpfCnpj:'',fiadorEndereco:'',imovelEndereco:'',valorAluguel:'',valorCondominio:'',valorIPTU:'',dataInicio:'',t1Nome:'',t1Cpf:'',t2Nome:'',t2Cpf:''}); form.value.numero=String(Math.floor(Math.random()*90000)+10000); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{locadorNome:'José Carlos Oliveira',locadorCpfCnpj:'100.200.300-40',locadorEstadoCivil:'Casado(a)',locadorEndereco:'Rua dos Proprietários, 100 – SP',locatarioNome:'Ana Beatriz Ferreira',locatarioCpfCnpj:'500.600.700-80',locatarioEstadoCivil:'Solteiro(a)',locatarioProfissao:'Analista de RH',locatarioEndereco:'Rua Provisória, 50 – SP',imovelEndereco:'Rua dos Inquilinos, 200, Apto 32 – Jardins – São Paulo/SP – CEP 01310-100',valorAluguel:'2200.00',valorCondominio:'350.00',valorIPTU:'80.00',dataInicio:'2025-02-01',duracao:'30',indiceReajuste:'IGPM',multaRescisao:'3',t1Nome:'Pedro Souza',t1Cpf:'111.222.333-44',t2Nome:'Carla Lima',t2Cpf:'555.666.777-88'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Contrato de Aluguel Residencial" description="Contrato completo com valor, prazo, multas, reajuste e encargos entre locador e locatário." icon="fa-home" icon-gradient="from-orange-500 to-red-700" orb-color="orange"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Recomendação',text:'Para maior segurança jurídica, registre o contrato no cartório de registro de imóveis.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Locador</h3>
          <input v-model="form.locadorNome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.locadorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" /><select v-model="form.locadorEstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.locadorEndereco" class="w-full input-aurora" placeholder="Endereço do locador" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Locatário</h3>
          <input v-model="form.locatarioNome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.locatarioCpfCnpj" class="w-full input-aurora" placeholder="CPF" /><select v-model="form.locatarioEstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.locatarioProfissao" class="w-full input-aurora" placeholder="Profissão" />
          <input v-model="form.locatarioEndereco" class="w-full input-aurora" placeholder="Endereço atual do locatário" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Fiador (opcional)</h3>
          <input v-model="form.fiadorNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.fiadorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.fiadorEndereco" class="w-full input-aurora" placeholder="Endereço" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Imóvel e Valores</h3>
          <textarea v-model="form.imovelEndereco" rows="2" class="w-full input-aurora resize-none" placeholder="Endereço completo do imóvel"></textarea>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Aluguel (R$)</label><input v-model="form.valorAluguel" type="number" step="0.01" class="w-full input-aurora" /></div>
          <div class="grid grid-cols-2 gap-3"><div><label class="text-xs text-blue-300 mb-1.5 block">Condomínio (R$)</label><input v-model="form.valorCondominio" type="number" step="0.01" class="w-full input-aurora" /></div><div><label class="text-xs text-blue-300 mb-1.5 block">IPTU mensal (R$)</label><input v-model="form.valorIPTU" type="number" step="0.01" class="w-full input-aurora" /></div></div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Prazo e Reajuste</h3>
          <div class="grid grid-cols-2 gap-3"><div><label class="text-xs text-blue-300 mb-1.5 block">Início</label><input v-model="form.dataInicio" type="date" class="w-full input-aurora" /></div><div><label class="text-xs text-blue-300 mb-1.5 block">Duração (meses)</label><input v-model="form.duracao" type="number" class="w-full input-aurora" /></div></div>
          <div class="grid grid-cols-2 gap-3"><div><label class="text-xs text-blue-300 mb-1.5 block">Índice de Reajuste</label><select v-model="form.indiceReajuste" class="w-full input-aurora"><option v-for="i in indices" :key="i">{{ i }}</option></select></div><div><label class="text-xs text-blue-300 mb-1.5 block">Multa rescisão (meses)</label><input v-model="form.multaRescisao" type="number" class="w-full input-aurora" /></div></div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Testemunhas e Data</h3>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.t1Nome" class="w-full input-aurora text-xs" placeholder="Nome T1" /><input v-model="form.t1Cpf" class="w-full input-aurora text-xs" placeholder="CPF T1" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.t2Nome" class="w-full input-aurora text-xs" placeholder="Nome T2" /><input v-model="form.t2Cpf" class="w-full input-aurora text-xs" placeholder="CPF T2" /></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-contrato-aluguel" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-xs font-serif leading-relaxed">
          <div class="text-center mb-4"><div class="text-xs text-gray-500 mb-0.5">Contrato nº {{ form.numero }}</div><h1 class="text-base font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-1 inline-block px-4">CONTRATO DE LOCAÇÃO RESIDENCIAL</h1></div>
          <p class="mb-2"><strong>LOCADOR:</strong> {{ form.locadorNome || '[Locador]' }}, CPF/CNPJ {{ form.locadorCpfCnpj || '[CPF]' }}, {{ form.locadorEstadoCivil }}, residente à {{ form.locadorEndereco || '[endereço]' }}.</p>
          <p class="mb-2"><strong>LOCATÁRIO:</strong> {{ form.locatarioNome || '[Locatário]' }}, CPF {{ form.locatarioCpfCnpj || '[CPF]' }}, {{ form.locatarioEstadoCivil }}<span v-if="form.locatarioProfissao">, {{ form.locatarioProfissao }}</span>, residente à {{ form.locatarioEndereco || '[endereço]' }}.</p>
          <p v-if="form.fiadorNome" class="mb-2"><strong>FIADOR:</strong> {{ form.fiadorNome }}, CPF/CNPJ {{ form.fiadorCpfCnpj }}, residente à {{ form.fiadorEndereco }}.</p>
          <p class="mb-3 font-semibold">Cláusulas:</p>
          <ol class="list-decimal pl-4 mb-3 space-y-1 text-xs">
            <li><strong>Objeto:</strong> O LOCADOR cede em locação ao LOCATÁRIO o imóvel situado à <strong>{{ form.imovelEndereco || '[endereço do imóvel]' }}</strong>.</li>
            <li><strong>Prazo:</strong> <strong>{{ form.duracao }} meses</strong>, de {{ fmt(form.dataInicio) }} a {{ dataFim }}, renovável automaticamente por igual período.</li>
            <li><strong>Aluguel:</strong> <strong>{{ fmtBRL(form.valorAluguel) }}</strong> mensais<span v-if="form.valorCondominio"> + condomínio {{ fmtBRL(form.valorCondominio) }}</span><span v-if="form.valorIPTU"> + IPTU {{ fmtBRL(form.valorIPTU) }}</span>. Pagamento até o 5º dia útil do mês.</li>
            <li><strong>Reajuste:</strong> Anual pelo índice <strong>{{ form.indiceReajuste }}</strong>.</li>
            <li><strong>Rescisão:</strong> Multa equivalente a <strong>{{ form.multaRescisao }} meses</strong> de aluguel, proporcional ao tempo restante.</li>
            <li><strong>Uso:</strong> Exclusivamente residencial, vedada sublocação.</li>
            <li><strong>Devolução:</strong> O imóvel deve ser devolvido nas mesmas condições em que foi recebido.</li>
            <li><strong>Foro:</strong> {{ form.cidade || '[Cidade]' }}</li>
          </ol>
          <p class="text-right mb-3">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="grid grid-cols-2 gap-4 mt-3">
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.locadorNome || 'Locador' }}</p><p class="text-xs text-gray-600">{{ form.locadorCpfCnpj }}</p></div></div>
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs font-semibold">{{ form.locatarioNome || 'Locatário' }}</p><p class="text-xs text-gray-600">{{ form.locatarioCpfCnpj }}</p></div></div>
          </div>
          <div v-if="form.fiadorNome" class="mt-3 text-center"><div class="border-t border-gray-400 mt-4 pt-1 mx-auto w-48"><p class="text-xs font-semibold">{{ form.fiadorNome }}</p><p class="text-xs text-gray-600">Fiador – CPF: {{ form.fiadorCpfCnpj }}</p></div></div>
          <div v-if="form.t1Nome||form.t2Nome" class="grid grid-cols-2 gap-4 mt-3">
            <div v-if="form.t1Nome" class="text-center"><div class="border-t border-gray-400 mt-4 pt-1"><p class="text-xs">{{ form.t1Nome }}</p><p class="text-xs text-gray-500">CPF: {{ form.t1Cpf }} – T1</p></div></div>
            <div v-if="form.t2Nome" class="text-center"><div class="border-t border-gray-400 mt-4 pt-1"><p class="text-xs">{{ form.t2Nome }}</p><p class="text-xs text-gray-500">CPF: {{ form.t2Cpf }} – T2</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-contrato-aluguel, #doc-contrato-aluguel * { visibility: visible; } #doc-contrato-aluguel { position: fixed; top: 0; left: 0; right: 0; padding: 1.5cm; background: white; } @page { size: A4; margin: 1.5cm; } }
</style>



<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_procuracao'
const estadosCivis = ['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)','União estável']
const finalidades = ['Banco / Financeiro','INSS / Previdência','Detran / Veículos','Cartório','Imóveis','Geral','Personalizado']

const form = ref({
  cidade: '', data: '', prazo: '',
  outorganteNome: '', outorganteCpfCnpj: '', outorganteEstadoCivil: 'Solteiro(a)', outorganteProfissao: '', outorganteEndereco: '',
  outorgadoNome: '', outorgadoCpfCnpj: '', outorgadoEstadoCivil: 'Solteiro(a)', outorgadoProfissao: '', outorgadoEndereco: '',
  finalidade: 'Banco / Financeiro',
  poderes: '',
})

const poderesPadrao: Record<string, string> = {
  'Banco / Financeiro': 'movimentar contas bancárias, sacar e depositar valores, contratar operações de crédito, assinar cheques, realizar transferências e demais operações bancárias em nome do(a) outorgante.',
  'INSS / Previdência': 'requerer, receber e dar quitação de benefícios previdenciários junto ao INSS, incluindo aposentadoria, pensão por morte, auxílio-doença, BPC/LOAS e demais benefícios, podendo assinar documentos e recursos.',
  'Detran / Veículos': 'licenciar, transferir, registrar e representar o(a) outorgante perante o Detran e demais órgãos de trânsito, podendo assinar documentos e DUT relativos a veículos automotores.',
  'Cartório': 'representar o(a) outorgante perante cartórios de registro de imóveis, notas e protestos, podendo assinar escrituras, registros e demais atos notariais.',
  'Imóveis': 'vender, comprar, dar em garantia, locar ou sub-locar imóveis em nome do(a) outorgante, podendo assinar contratos, escrituras e demais documentos necessários.',
  'Geral': 'representar o(a) outorgante em todos os atos da vida civil, podendo assinar documentos, contratos e declarações em seu nome.',
  'Personalizado': '',
}

function atualizarPoderes() { if(form.value.finalidade !== 'Personalizado') form.value.poderes = poderesPadrao[form.value.finalidade] || '' }

function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => {
  form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'
  form.value.poderes = poderesPadrao['Banco / Financeiro']
  const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}}
})
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{outorganteNome:'',outorganteCpfCnpj:'',outorganteProfissao:'',outorganteEndereco:'',outorgadoNome:'',outorgadoCpfCnpj:'',outorgadoProfissao:'',outorgadoEndereco:'',prazo:''}); form.value.poderes=poderesPadrao[form.value.finalidade]||''; Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{outorganteNome:'Maria Clara Oliveira',outorganteCpfCnpj:'222.333.444-55',outorganteEstadoCivil:'Casado(a)',outorganteProfissao:'Professora',outorganteEndereco:'Rua das Rosas, 300 – Moema – São Paulo/SP',outorgadoNome:'Paulo Roberto Oliveira',outorgadoCpfCnpj:'666.777.888-99',outorgadoEstadoCivil:'Casado(a)',outorgadoProfissao:'Empresário',outorgadoEndereco:'Rua das Rosas, 300 – Moema – São Paulo/SP',finalidade:'Banco / Financeiro',prazo:'31/12/2025'}); atualizarPoderes(); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Procuração Particular" description="Delegue poderes específicos a outra pessoa para banco, INSS, Detran ou cartório." icon="fa-stamp" icon-gradient="from-violet-500 to-purple-700" orb-color="purple"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha os dados do outorgante, outorgado e poderes. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Outorgante (quem dá poderes)</h3>
          <input v-model="form.outorganteNome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.outorganteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" /><select v-model="form.outorganteEstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.outorganteProfissao" class="w-full input-aurora" placeholder="Profissão" />
          <input v-model="form.outorganteEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Outorgado (quem recebe poderes)</h3>
          <input v-model="form.outorgadoNome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.outorgadoCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" /><select v-model="form.outorgadoEstadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
          <input v-model="form.outorgadoProfissao" class="w-full input-aurora" placeholder="Profissão" />
          <input v-model="form.outorgadoEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Poderes e Vigência</h3>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Finalidade</label><select v-model="form.finalidade" @change="atualizarPoderes" class="w-full input-aurora"><option v-for="f in finalidades" :key="f">{{ f }}</option></select></div>
          <textarea v-model="form.poderes" rows="4" class="w-full input-aurora resize-none text-xs" placeholder="Descreva os poderes outorgados..."></textarea>
          <input v-model="form.prazo" class="w-full input-aurora" placeholder="Prazo de validade (ex: 31/12/2025 ou 'indeterminado')" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-procuracao" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">PROCURAÇÃO PARTICULAR</h1></div>
          <p class="mb-5 text-justify"><strong>OUTORGANTE:</strong> <strong>{{ form.outorganteNome || '[Nome]' }}</strong>, portador(a) do CPF/CNPJ nº {{ form.outorganteCpfCnpj || '[CPF]' }}, {{ form.outorganteEstadoCivil }}<span v-if="form.outorganteProfissao">, {{ form.outorganteProfissao }}</span>, residente à {{ form.outorganteEndereco || '[endereço]' }}.</p>
          <p class="mb-5 text-justify"><strong>OUTORGADO:</strong> <strong>{{ form.outorgadoNome || '[Nome]' }}</strong>, portador(a) do CPF/CNPJ nº {{ form.outorgadoCpfCnpj || '[CPF]' }}, {{ form.outorgadoEstadoCivil }}<span v-if="form.outorgadoProfissao">, {{ form.outorgadoProfissao }}</span>, residente à {{ form.outorgadoEndereco || '[endereço]' }}.</p>
          <p class="mb-5 text-justify">O(A) outorgante, pelo presente instrumento particular de procuração, nomeia e constitui seu bastante procurador o(a) outorgado(a) acima qualificado(a), conferindo-lhe os seguintes poderes:</p>
          <p class="mb-5 text-justify italic border-l-4 border-gray-400 pl-4">{{ form.poderes || '[Poderes outorgados]' }}</p>
          <p v-if="form.prazo" class="mb-5 text-justify">Esta procuração é válida até: <strong>{{ form.prazo }}</strong>.</p>
          <p class="mb-6 text-justify">O(A) outorgante declara ser verdadeiras as informações acima prestadas e assina o presente instrumento.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.outorganteNome || '[Outorgante]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.outorganteCpfCnpj }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-procuracao, #doc-procuracao * { visibility: visible; } #doc-procuracao { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



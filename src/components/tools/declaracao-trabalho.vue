<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_decl_trabalho'
const vinculos = ['CLT – Contrato de Trabalho com Carteira Assinada','MEI – Microempreendedor Individual','Autônomo / Prestador de Serviço','Estagiário','Temporário','Jovem Aprendiz']
const finalidades = ['fins cadastrais', 'concessão de crédito', 'locação de imóvel', 'comprovação de renda', 'vistos e passaportes', 'outros fins que se fizerem necessários']

const form = ref({ cidade: '', data: '',
  empresaNome: '', empresaCnpj: '', empresaEndereco: '', responsavelNome: '', responsavelCargo: '',
  colaboradorNome: '', colaboradorCpf: '', colaboradorCargo: '', colaboradorSalario: '', dataAdmissao: '',
  vinculo: 'CLT – Contrato de Trabalho com Carteira Assinada',
  finalidade: 'fins cadastrais',
})

function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function fmtBRL(raw: string) { const n=parseFloat(raw.replace(',','.')); if(!raw||isNaN(n)) return ''; return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{empresaNome:'',empresaCnpj:'',empresaEndereco:'',responsavelNome:'',responsavelCargo:'',colaboradorNome:'',colaboradorCpf:'',colaboradorCargo:'',colaboradorSalario:'',dataAdmissao:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{empresaNome:'TechSolutions Desenvolvimento Ltda',empresaCnpj:'00.111.222/0001-33',empresaEndereco:'Av. Paulista, 1500, 10º andar – São Paulo/SP',responsavelNome:'Andrea Lima Santana',responsavelCargo:'Diretora de Recursos Humanos',colaboradorNome:'Rafael Souza Pinto',colaboradorCpf:'444.555.666-77',colaboradorCargo:'Analista de Sistemas Sênior',colaboradorSalario:'8500.00',dataAdmissao:'2022-03-01',vinculo:'CLT – Contrato de Trabalho com Carteira Assinada',finalidade:'locação de imóvel'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de Trabalho" description="A empresa declara o vínculo, a função e o salário do colaborador para fins cadastrais." icon="fa-briefcase" icon-gradient="from-slate-500 to-blue-700" orb-color="blue"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha dados da empresa e do colaborador. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Empresa / Contratante</h3>
          <input v-model="form.empresaNome" class="w-full input-aurora" placeholder="Razão Social / Nome" />
          <input v-model="form.empresaCnpj" class="w-full input-aurora" placeholder="CNPJ / CPF" />
          <input v-model="form.empresaEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.responsavelNome" class="w-full input-aurora" placeholder="Nome do responsável" /><input v-model="form.responsavelCargo" class="w-full input-aurora" placeholder="Cargo do responsável" /></div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Colaborador</h3>
          <input v-model="form.colaboradorNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.colaboradorCpf" class="w-full input-aurora" placeholder="CPF" />
          <input v-model="form.colaboradorCargo" class="w-full input-aurora" placeholder="Cargo / Função" />
          <input v-model="form.colaboradorSalario" type="number" step="0.01" class="w-full input-aurora" placeholder="Salário bruto (R$)" />
          <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Admissão</label><input v-model="form.dataAdmissao" type="date" class="w-full input-aurora" /></div>
          <select v-model="form.vinculo" class="w-full input-aurora"><option v-for="v in vinculos" :key="v">{{ v }}</option></select>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Finalidade e Data</h3>
          <select v-model="form.finalidade" class="w-full input-aurora"><option v-for="f in finalidades" :key="f">{{ f }}</option></select>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-decl-trabalho" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">DECLARAÇÃO DE TRABALHO</h1></div>
          <p class="mb-5 text-justify"><strong>{{ form.empresaNome || '[Empresa]' }}</strong>, inscrita no CNPJ/CPF nº <strong>{{ form.empresaCnpj || '[CNPJ]' }}</strong>, com sede à <strong>{{ form.empresaEndereco || '[endereço]' }}</strong>, neste ato representada por seu(sua) responsável <strong>{{ form.responsavelNome || '[Responsável]' }}</strong>, <strong>{{ form.responsavelCargo || '[Cargo]' }}</strong>, declara para os devidos fins de <strong>{{ form.finalidade }}</strong> que:</p>
          <p class="mb-5 text-justify"><strong>{{ form.colaboradorNome || '[Colaborador]' }}</strong>, portador(a) do CPF nº <strong>{{ form.colaboradorCpf || '[CPF]' }}</strong>, exerce o cargo de <strong>{{ form.colaboradorCargo || '[Cargo]' }}</strong><span v-if="form.dataAdmissao"> desde <strong>{{ fmt(form.dataAdmissao) }}</strong></span>, com remuneração bruta de <strong>{{ fmtBRL(form.colaboradorSalario) || '[salário]' }}</strong>, sob o regime de vínculo <strong>{{ form.vinculo }}</strong>.</p>
          <p class="mb-6 text-justify">O(A) colaborador(a) encontra-se em plena atividade na data desta declaração, com suas obrigações trabalhistas e fiscais devidamente cumpridas por esta empresa.</p>
          <p class="mb-6 text-justify">Esta declaração é emitida a pedido do(a) interessado(a), para fins de <strong>{{ form.finalidade }}</strong>.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div class="text-center border-t border-gray-400 pt-2"><p class="font-semibold text-sm">{{ form.responsavelNome || '[Responsável]' }}</p><p class="text-xs text-gray-600">{{ form.responsavelCargo }}</p><p class="text-xs text-gray-600">{{ form.empresaNome }}</p></div>
            <div class="border border-gray-300 p-3 text-xs rounded">
              <p class="font-semibold mb-1">Empresa:</p><p>{{ form.empresaNome }}</p><p v-if="form.empresaCnpj">CNPJ: {{ form.empresaCnpj }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-decl-trabalho, #doc-decl-trabalho * { visibility: visible; } #doc-decl-trabalho { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



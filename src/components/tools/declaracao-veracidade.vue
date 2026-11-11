<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_veracidade'
const form = ref({ cidade: '', data: '', nome: '', cpf: '', rg: '', profissao: '', endereco: '', assunto: '', descricao: '', finalidade: 'fins que se fizerem necessários' })

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',cpf:'',rg:'',profissao:'',endereco:'',assunto:'',descricao:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Roberto Alves Santos',cpf:'777.888.999-00',rg:'77.888.999-0',profissao:'Contador',endereco:'Av. das Nações, 400 – São Paulo/SP',assunto:'Documentos para abertura de empresa',descricao:'Declaro que todos os documentos apresentados neste processo são autênticos e as informações neles contidas são verdadeiras, incluindo dados cadastrais, endereço e qualificação pessoal.',finalidade:'abertura de processo de registro de empresa'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de Veracidade" description="Confirma autenticidade de informações e documentos para processos e cadastros." icon="fa-check-double" icon-gradient="from-teal-500 to-cyan-700" orb-color="teal"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha seus dados e descreva as informações/documentos que certifica. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
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
          <input v-model="form.profissao" class="w-full input-aurora" placeholder="Profissão" />
          <input v-model="form.endereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Declaração</h3>
          <input v-model="form.assunto" class="w-full input-aurora" placeholder="Assunto / Documento referenciado" />
          <textarea v-model="form.descricao" rows="4" class="w-full input-aurora resize-none" placeholder="Descreva as informações/documentos que você certifica como verdadeiros..."></textarea>
          <input v-model="form.finalidade" class="w-full input-aurora" placeholder="Finalidade" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-veracidade" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">DECLARAÇÃO DE VERACIDADE</h1></div>
          <p class="mb-5 text-justify">Eu, <strong>{{ form.nome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.cpf || '[CPF]' }}</strong><span v-if="form.rg">, RG nº <strong>{{ form.rg }}</strong></span><span v-if="form.profissao">, profissão <strong>{{ form.profissao }}</strong></span>, residente à <strong>{{ form.endereco || '[endereço]' }}</strong>, declaro, para fins de <strong>{{ form.finalidade }}</strong>, que as informações e documentos referentes a <strong>{{ form.assunto || '[assunto]' }}</strong> são <strong>autênticos e verdadeiros</strong>.</p>
          <p v-if="form.descricao" class="mb-5 text-justify italic border-l-4 border-gray-300 pl-4">{{ form.descricao }}</p>
          <p class="mb-5 text-justify">Estou ciente de que a falsidade desta declaração sujeita-me às penas previstas no art. 299 do Código Penal.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.nome || '[Nome]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.cpf }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-veracidade, #doc-veracidade * { visibility: visible; } #doc-veracidade { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



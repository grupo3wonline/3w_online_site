<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_dependencia_econ'
const parentescos = ['filho(a)','cônjuge/companheiro(a)','pai/mãe','irmão(ã)','neto(a)','menor sob guarda']
const finalidades = ['INSS / Previdência Social','Imposto de Renda','Plano de saúde','Benefício de empresa','Pensão alimentícia','Outros']
const form = ref({ cidade: '', data: '', nome: '', cpf: '', profissao: '', endereco: '', dependenteNome: '', dependenteCpf: '', parentesco: 'filho(a)', finalidade: 'INSS / Previdência Social', descricao: '' })

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',cpf:'',profissao:'',endereco:'',dependenteNome:'',dependenteCpf:'',descricao:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Paulo Henrique Martins',cpf:'200.300.400-50',profissao:'Engenheiro',endereco:'Av. das Américas, 300 – São Paulo/SP',dependenteNome:'Lucas Henrique Martins',dependenteCpf:'900.800.700-60',parentesco:'filho(a)',finalidade:'Plano de saúde',descricao:'O dependente é estudante, sem renda própria, e reside com o declarante, sendo sustentado integralmente por este.'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de Dependência Econômica" description="Para INSS, IR e planos de saúde: comprova dependência de filho, cônjuge ou outro." icon="fa-users" icon-gradient="from-cyan-500 to-teal-700" orb-color="cyan"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha dados do declarante e dependente. Selecione a finalidade. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Declarante</h3>
          <input v-model="form.nome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.cpf" class="w-full input-aurora" placeholder="CPF" />
          <input v-model="form.profissao" class="w-full input-aurora" placeholder="Profissão" />
          <input v-model="form.endereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dependente</h3>
          <input v-model="form.dependenteNome" class="w-full input-aurora" placeholder="Nome completo do dependente" />
          <input v-model="form.dependenteCpf" class="w-full input-aurora" placeholder="CPF do dependente" />
          <div><label class="text-xs text-blue-300 mb-1.5 block">Grau de Parentesco</label><select v-model="form.parentesco" class="w-full input-aurora"><option v-for="p in parentescos" :key="p">{{ p }}</option></select></div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Finalidade</h3>
          <select v-model="form.finalidade" class="w-full input-aurora"><option v-for="f in finalidades" :key="f">{{ f }}</option></select>
          <textarea v-model="form.descricao" rows="3" class="w-full input-aurora resize-none" placeholder="Descreva a situação de dependência (opcional)"></textarea>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-dependencia-econ" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-2">DECLARAÇÃO DE DEPENDÊNCIA ECONÔMICA</h1></div>
          <p class="mb-5 text-justify">Eu, <strong>{{ form.nome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.cpf || '[CPF]' }}</strong><span v-if="form.profissao">, profissão <strong>{{ form.profissao }}</strong></span>, residente à <strong>{{ form.endereco || '[endereço]' }}</strong>, declaro, para fins de <strong>{{ form.finalidade }}</strong>, que <strong>{{ form.dependenteNome || '[Dependente]' }}</strong>, portador(a) do CPF nº <strong>{{ form.dependenteCpf || '[CPF]' }}</strong>, na qualidade de meu(minha) <strong>{{ form.parentesco }}</strong>, é economicamente dependente de mim, não possuindo renda própria suficiente para o seu sustento.</p>
          <p v-if="form.descricao" class="mb-5 text-justify italic border-l-4 border-gray-300 pl-4">{{ form.descricao }}</p>
          <p class="mb-6 text-justify">Declaro ainda estar ciente de que a falsidade desta declaração sujeita-me às penas previstas em lei.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.nome || '[Nome]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.cpf }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-dependencia-econ, #doc-dependencia-econ * { visibility: visible; } #doc-dependencia-econ { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



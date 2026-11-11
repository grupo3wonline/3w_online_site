<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_anuencia'
const form = ref({ cidade: '', data: '',
  anuenteNome: '', anuenteCpfCnpj: '', anuenteQualificacao: 'cônjuge',
  declaranteNome: '', declaranteCpfCnpj: '',
  tipoNegocio: 'Venda de imóvel', bemDescricao: '', valor: '', observacoes: '',
})
const qualificacoes = ['cônjuge','sócio(a)','co-proprietário(a)','representante legal']
const tiposNegocio = ['Venda de imóvel','Locação de imóvel','Venda de quotas societárias','Contratação de empréstimo','Outros']

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{anuenteNome:'',anuenteCpfCnpj:'',declaranteNome:'',declaranteCpfCnpj:'',bemDescricao:'',valor:'',observacoes:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{anuenteNome:'Claudia Ferreira Lima',anuenteCpfCnpj:'300.400.500-60',anuenteQualificacao:'cônjuge',declaranteNome:'João Ferreira Lima',declaranteCpfCnpj:'700.800.900-01',tipoNegocio:'Venda de imóvel',bemDescricao:'Imóvel situado à Rua dos Ipês, 100 – Jardins – São Paulo/SP, Matrícula nº 12345',valor:'R$ 350.000,00',observacoes:''}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Declaração de Anuência" description="Autorização de cônjuge ou sócio para venda ou locação de imóvel ou bem." icon="fa-thumbs-up" icon-gradient="from-indigo-500 to-blue-700" orb-color="indigo"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha dados do anuente, declarante e negócio. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Anuente (quem autoriza)</h3>
          <input v-model="form.anuenteNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.anuenteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <select v-model="form.anuenteQualificacao" class="w-full input-aurora"><option v-for="q in qualificacoes" :key="q">{{ q }}</option></select>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Declarante (quem pratica o negócio)</h3>
          <input v-model="form.declaranteNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.declaranteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Negócio</h3>
          <select v-model="form.tipoNegocio" class="w-full input-aurora"><option v-for="t in tiposNegocio" :key="t">{{ t }}</option></select>
          <textarea v-model="form.bemDescricao" rows="2" class="w-full input-aurora resize-none" placeholder="Descrição do bem / negócio"></textarea>
          <input v-model="form.valor" class="w-full input-aurora" placeholder="Valor (opcional)" />
          <textarea v-model="form.observacoes" rows="2" class="w-full input-aurora resize-none" placeholder="Observações"></textarea>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-anuencia" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">DECLARAÇÃO DE ANUÊNCIA</h1></div>
          <p class="mb-5 text-justify">Eu, <strong>{{ form.anuenteNome || '[Anuente]' }}</strong>, portador(a) do CPF/CNPJ nº <strong>{{ form.anuenteCpfCnpj || '[CPF]' }}</strong>, na qualidade de <strong>{{ form.anuenteQualificacao }}</strong> de <strong>{{ form.declaranteNome || '[Declarante]' }}</strong>, portador(a) do CPF/CNPJ nº <strong>{{ form.declaranteCpfCnpj || '[CPF]' }}</strong>, declaro expressamente que <strong>autorizo e anuio</strong> ao seguinte negócio jurídico:</p>
          <p class="mb-5 text-justify italic border-l-4 border-gray-400 pl-4"><strong>{{ form.tipoNegocio }}:</strong> {{ form.bemDescricao || '[descrição do bem/negócio]' }}<span v-if="form.valor"> – Valor: {{ form.valor }}</span>.</p>
          <p v-if="form.observacoes" class="mb-5 text-justify">Observações: {{ form.observacoes }}</p>
          <p class="mb-6 text-justify">Por ser verdade, firmo a presente declaração, dando meu consentimento expresso e irrevogável para a realização do negócio acima descrito.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.anuenteNome || '[Anuente]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.anuenteCpfCnpj }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-anuencia, #doc-anuencia * { visibility: visible; } #doc-anuencia { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_termo_quitacao'
const form = ref({ cidade: '', data: '', numero: '', tipoQuitacao: 'Total',
  credorNome: '', credorCpfCnpj: '', credorEndereco: '',
  devedorNome: '', devedorCpfCnpj: '', devedorEndereco: '',
  valor: '', referencia: '', dataPagamento: '',
})

function valorExtenso(raw: string): string {
  const n = parseFloat(raw.replace(',','.')); if(!n||isNaN(n)) return '(valor por extenso)'
  const un=['','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove']
  const dz=['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa']
  const ct=['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos']
  function menorMil(x: number): string { if(x===0) return ''; if(x===100) return 'cem'; const c=Math.floor(x/100),r=x%100,d=Math.floor(r/10),u=r%10; let s=c>0?ct[c]:''; if(c>0&&r>0)s+=' e '; if(r>=20){s+=dz[d];if(u>0)s+=' e '+un[u]}else if(r>0)s+=un[r]; return s }
  function ext(x: number): string { if(x===0) return 'zero'; const mi=Math.floor(x/1000000),ml=Math.floor((x%1000000)/1000),rs=x%1000; let s=''; if(mi>0){s+=menorMil(mi)+(mi===1?' milhão':' milhões');if(ml>0||rs>0)s+=' e '} if(ml>0){s+=menorMil(ml)+' mil';if(rs>0)s+=' e '} if(rs>0)s+=menorMil(rs); return s }
  const inteiro=Math.floor(n),cents=Math.round((n-inteiro)*100); let t=ext(inteiro)+(inteiro===1?' real':' reais'); if(cents>0)t+=' e '+ext(cents)+(cents===1?' centavo':' centavos'); return t
}
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function fmtBRL(raw: string) { const n=parseFloat(raw.replace(',','.')); if(isNaN(n)) return 'R$ 0,00'; return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

const valorFmt = computed(() => fmtBRL(form.value.valor))
const valorExt = computed(() => valorExtenso(form.value.valor))

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.dataPagamento=new Date().toISOString().split('T')[0]; form.value.numero=String(Math.floor(Math.random()*90000)+10000); form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{credorNome:'',credorCpfCnpj:'',credorEndereco:'',devedorNome:'',devedorCpfCnpj:'',devedorEndereco:'',valor:'',referencia:''}); form.value.numero=String(Math.floor(Math.random()*90000)+10000); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{credorNome:'Banco XYZ S.A.',credorCpfCnpj:'00.000.000/0001-00',credorEndereco:'Av. Financeira, 1000 – São Paulo/SP',devedorNome:'José Aparecido Lima',devedorCpfCnpj:'333.444.555-66',devedorEndereco:'Rua dos Trabalhadores, 50 – São Paulo/SP',valor:'12000.00',referencia:'Empréstimo pessoal – Contrato nº 2023/0001',tipoQuitacao:'Total',dataPagamento:form.value.data}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Termo de Quitação" description="Declaração de quitação total ou parcial de dívida, com valor por extenso." icon="fa-check-circle" icon-gradient="from-green-500 to-teal-700" orb-color="green"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha credor, devedor e valor. Selecione quitação total ou parcial. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Identificação</h3>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.numero" class="w-full input-aurora" placeholder="Nº do Termo" /><select v-model="form.tipoQuitacao" class="w-full input-aurora"><option>Total</option><option>Parcial</option></select></div>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Credor (quem recebe)</h3>
          <input v-model="form.credorNome" class="w-full input-aurora" placeholder="Nome / Razão social" />
          <input v-model="form.credorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.credorEndereco" class="w-full input-aurora" placeholder="Endereço" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Devedor (quem paga)</h3>
          <input v-model="form.devedorNome" class="w-full input-aurora" placeholder="Nome / Razão social" />
          <input v-model="form.devedorCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.devedorEndereco" class="w-full input-aurora" placeholder="Endereço" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dívida e Pagamento</h3>
          <input v-model="form.valor" type="number" step="0.01" class="w-full input-aurora" placeholder="Valor pago (R$)" />
          <input v-model="form.referencia" class="w-full input-aurora" placeholder="Referência da dívida (ex: Empréstimo, Contrato nº...)" />
          <div><label class="text-xs text-blue-300 mb-1.5 block">Data do Pagamento</label><input v-model="form.dataPagamento" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-termo-quitacao" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-6"><div class="text-xs text-gray-500 mb-1">Nº {{ form.numero }}</div><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">TERMO DE QUITAÇÃO {{ form.tipoQuitacao.toUpperCase() }}</h1></div>
          <p class="mb-5 text-justify">Eu, <strong>{{ form.credorNome || '[Credor]' }}</strong>, portador(a) do CPF/CNPJ nº <strong>{{ form.credorCpfCnpj || '[CPF/CNPJ]' }}</strong><span v-if="form.credorEndereco">, residente à {{ form.credorEndereco }}</span>, declaro ter recebido de <strong>{{ form.devedorNome || '[Devedor]' }}</strong>, portador(a) do CPF/CNPJ nº <strong>{{ form.devedorCpfCnpj || '[CPF/CNPJ]' }}</strong><span v-if="form.devedorEndereco">, residente à {{ form.devedorEndereco }}</span>, a importância de <strong>{{ valorFmt }} ({{ valorExt }})</strong><span v-if="form.dataPagamento">, no dia {{ fmt(form.dataPagamento) }}</span>, referente a: <strong>{{ form.referencia || '[descrição da dívida]' }}</strong>.</p>
          <p class="mb-5 text-justify">Recebo a título de quitação <strong>{{ form.tipoQuitacao.toLowerCase() }}</strong> do débito acima mencionado<span v-if="form.tipoQuitacao==='Total'">, nada mais tendo a cobrar do devedor a título do referido débito, para qualquer fim de direito</span><span v-else="">, mantendo o saldo remanescente em aberto</span>.</p>
          <p class="mb-6 text-justify">Dou ao devedor, pelo presente instrumento, plena, geral e irrevogável quitação do valor recebido.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.credorNome || '[Credor]' }}</p><p class="text-xs text-gray-600">CPF/CNPJ: {{ form.credorCpfCnpj }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-termo-quitacao, #doc-termo-quitacao * { visibility: visible; } #doc-termo-quitacao { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



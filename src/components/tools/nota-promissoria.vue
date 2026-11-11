<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_nota_promissoria'

const form = ref({
  numero: '', cidade: '', data: '', vencimento: '',
  valor: '', localPagamento: '',
  emitente: { nome: '', cpfCnpj: '', endereco: '', cidade: '' },
  beneficiario: { nome: '', cpfCnpj: '' },
})

function valorExtenso(raw: string): string {
  const n = parseFloat(raw.replace(',', '.'))
  if (!n || isNaN(n)) return '(valor por extenso)'
  const un = ['','um','dois','três','quatro','cinco','seis','sete','oito','nove','dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove']
  const dz = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa']
  const ct = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos']
  function menorMil(x: number): string {
    if (x===0) return ''; if (x===100) return 'cem'
    const c=Math.floor(x/100),r=x%100,d=Math.floor(r/10),u=r%10; let s=c>0?ct[c]:''; if(c>0&&r>0)s+=' e '
    if(r>=20){s+=dz[d];if(u>0)s+=' e '+un[u]}else if(r>0)s+=un[r]; return s
  }
  function ext(x: number): string {
    if(x===0) return 'zero'; const mi=Math.floor(x/1000000),ml=Math.floor((x%1000000)/1000),rs=x%1000; let s=''
    if(mi>0){s+=menorMil(mi)+(mi===1?' milhão':' milhões');if(ml>0||rs>0)s+=' e '}
    if(ml>0){s+=menorMil(ml)+' mil';if(rs>0)s+=' e '} if(rs>0)s+=menorMil(rs); return s
  }
  const inteiro=Math.floor(n),cents=Math.round((n-inteiro)*100); let t=ext(inteiro)+(inteiro===1?' real':' reais'); if(cents>0)t+=' e '+ext(cents)+(cents===1?' centavo':' centavos'); return t
}
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function fmtBRL(raw: string) { const n=parseFloat(raw.replace(',','.')); if(isNaN(n)) return 'R$ 0,00'; return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }

const valorFmt = computed(() => fmtBRL(form.value.valor))
const valorExt = computed(() => valorExtenso(form.value.valor))

onMounted(() => {
  form.value.data = new Date().toISOString().split('T')[0]
  const due = new Date(); due.setDate(due.getDate()+30); form.value.vencimento = due.toISOString().split('T')[0]
  form.value.numero = String(Math.floor(Math.random()*90000)+10000)
  form.value.cidade = 'São Paulo - SP'
  const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}}
})

function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{valor:'',localPagamento:'',emitente:{nome:'',cpfCnpj:'',endereco:'',cidade:''},beneficiario:{nome:'',cpfCnpj:''}}); form.value.numero=String(Math.floor(Math.random()*90000)+10000); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{valor:'5000.00',localPagamento:'Agência Banco do Brasil – Av. Paulista, 1000 – São Paulo/SP',emitente:{nome:'Pedro Henrique Vieira',cpfCnpj:'222.333.444-55',endereco:'Rua do Comércio, 300 – Centro – São Paulo/SP',cidade:'São Paulo/SP'},beneficiario:{nome:'Inversora Capital Ltda',cpfCnpj:'98.765.432/0001-10'}}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell title="Nota Promissória" description="Nota promissória válida juridicamente, pronta para imprimir e assinar." icon="fa-file-invoice-dollar" icon-gradient="from-purple-500 to-violet-700" orb-color="purple"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha os dados do emitente, beneficiário, valor e vencimento. Clique em Gerar PDF.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Identificação</h3>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Nº da Nota</label><input v-model="form.numero" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Cidade de Emissão</label><input v-model="form.cidade" class="w-full input-aurora" /></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Emissão</label><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Vencimento</label><input v-model="form.vencimento" type="date" class="w-full input-aurora" /></div>
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Valor e Local de Pagamento</h3>
          <input v-model="form.valor" type="number" step="0.01" class="w-full input-aurora" placeholder="Valor (ex: 5000.00)" />
          <input v-model="form.localPagamento" class="w-full input-aurora" placeholder="Local de pagamento (banco, agência)" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Emitente (devedor)</h3>
          <input v-model="form.emitente.nome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.emitente.cpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.emitente.endereco" class="w-full input-aurora" placeholder="Endereço completo" />
          <input v-model="form.emitente.cidade" class="w-full input-aurora" placeholder="Cidade/UF" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Beneficiário (credor)</h3>
          <input v-model="form.beneficiario.nome" class="w-full input-aurora" placeholder="Nome completo / Razão social" />
          <input v-model="form.beneficiario.cpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-nota-promissoria" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-sm font-serif leading-relaxed border-2 border-gray-900">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-2xl font-bold uppercase tracking-widest">NOTA PROMISSÓRIA</h1>
              <p class="text-xs text-gray-600">Nº {{ form.numero }}</p>
            </div>
            <div class="text-right border-2 border-gray-900 p-3">
              <p class="text-xs font-semibold uppercase">Valor</p>
              <p class="text-xl font-bold">{{ valorFmt }}</p>
            </div>
          </div>
          <p class="mb-4 leading-7">
            No dia <strong>{{ fmt(form.vencimento) }}</strong>, pagarei por esta <em>única via de NOTA PROMISSÓRIA</em> a
            <strong>{{ form.beneficiario.nome || '[Beneficiário]' }}</strong>
            <span v-if="form.beneficiario.cpfCnpj"> (CPF/CNPJ: {{ form.beneficiario.cpfCnpj }})</span>,
            ou à sua ordem, a quantia de <strong>{{ valorFmt }} ({{ valorExt }})</strong>,
            em moeda corrente nacional, pagável em <strong>{{ form.localPagamento || '[Local de pagamento]' }}</strong>.
          </p>
          <p class="mb-6 text-xs text-gray-600">Emitido em: {{ form.cidade || '[Cidade]' }}, {{ fmt(form.data) }}</p>
          <div class="grid grid-cols-2 gap-4 mt-8 border-t border-gray-400 pt-4">
            <div>
              <p class="text-xs font-semibold mb-1">Emitente</p>
              <p>{{ form.emitente.nome || '[Nome do Emitente]' }}</p>
              <p class="text-xs text-gray-600" v-if="form.emitente.cpfCnpj">CPF/CNPJ: {{ form.emitente.cpfCnpj }}</p>
              <p class="text-xs text-gray-600" v-if="form.emitente.endereco">{{ form.emitente.endereco }}</p>
            </div>
            <div class="text-center">
              <div class="mt-6 border-t border-gray-400 pt-2"><p class="text-xs">Assinatura do Emitente</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-nota-promissoria, #doc-nota-promissoria * { visibility: visible; }
  #doc-nota-promissoria { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; }
  @page { size: A4; margin: 2cm; }
}
</style>



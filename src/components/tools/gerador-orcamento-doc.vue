<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_orcamento'
interface Item { descricao: string; qtd: number; unidade: string; valorUnit: number }

const form = ref({
  numero: '', cidade: '', dataEmissao: '', validade: '',
  empresaNome: '', empresaCnpj: '', empresaEndereco: '', empresaTelefone: '', empresaEmail: '',
  clienteNome: '', clienteCpfCnpj: '', clienteEndereco: '',
  items: [] as Item[],
  desconto: '', condicoesPagamento: 'À vista', observacoes: '',
})

function fmtBRL(n: number) { return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }

const subtotal = computed(() => form.value.items.reduce((s,i)=>s+i.qtd*i.valorUnit,0))
const descontoNum = computed(() => { const d=parseFloat(form.value.desconto||'0'); return isNaN(d)?0:d })
const total = computed(() => subtotal.value - descontoNum.value)

function addItem() { form.value.items.push({descricao:'',qtd:1,unidade:'un',valorUnit:0}) }
function removeItem(i: number) { form.value.items.splice(i,1) }

onMounted(() => {
  form.value.dataEmissao = new Date().toISOString().split('T')[0]
  const vl = new Date(); vl.setDate(vl.getDate()+15); form.value.validade = vl.toISOString().split('T')[0]
  form.value.numero = String(Math.floor(Math.random()*90000)+10000)
  form.value.cidade = 'São Paulo - SP'
  form.value.items = [{descricao:'',qtd:1,unidade:'un',valorUnit:0}]
  const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}}
})

function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{empresaNome:'',empresaCnpj:'',empresaEndereco:'',empresaTelefone:'',empresaEmail:'',clienteNome:'',clienteCpfCnpj:'',clienteEndereco:'',items:[{descricao:'',qtd:1,unidade:'un',valorUnit:0}],desconto:'',observacoes:''}); form.value.numero=String(Math.floor(Math.random()*90000)+10000); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{empresaNome:'Studio Visual Criativo',empresaCnpj:'12.345.678/0001-99',empresaEndereco:'Rua Design, 100 – Vila Madalena – São Paulo/SP',empresaTelefone:'(11) 99876-5432',empresaEmail:'contato@studiovisual.com.br',clienteNome:'Maria Aparecida Souza',clienteCpfCnpj:'111.222.333-44',clienteEndereco:'Av. Central, 500 – São Paulo/SP',items:[{descricao:'Identidade Visual Completa',qtd:1,unidade:'un',valorUnit:2500},{descricao:'Criação de Logotipo',qtd:1,unidade:'un',valorUnit:800},{descricao:'Design de Cartão de Visita',qtd:1,unidade:'un',valorUnit:200}],desconto:'0',condicoesPagamento:'50% de entrada e 50% na entrega',observacoes:'Orçamento válido por 15 dias. Inclui até 3 revisões por item.'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell title="Gerador de Orçamento" description="Crie orçamentos profissionais e detalhados para seus clientes, prontos para imprimir." icon="fa-file-alt" icon-gradient="from-amber-500 to-orange-700" orb-color="orange"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha dados da empresa, cliente e itens. Clique em Gerar PDF.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dados do Orçamento</h3>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Nº Orçamento</label><input v-model="form.numero" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Cidade</label><input v-model="form.cidade" class="w-full input-aurora" /></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Emissão</label><input v-model="form.dataEmissao" type="date" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Válido até</label><input v-model="form.validade" type="date" class="w-full input-aurora" /></div>
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Empresa / Prestador</h3>
          <input v-model="form.empresaNome" class="w-full input-aurora" placeholder="Nome / Razão social" />
          <input v-model="form.empresaCnpj" class="w-full input-aurora" placeholder="CNPJ / CPF" />
          <input v-model="form.empresaEndereco" class="w-full input-aurora" placeholder="Endereço" />
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.empresaTelefone" class="w-full input-aurora" placeholder="Telefone" />
            <input v-model="form.empresaEmail" class="w-full input-aurora" placeholder="E-mail" />
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Cliente</h3>
          <input v-model="form.clienteNome" class="w-full input-aurora" placeholder="Nome / Razão social" />
          <input v-model="form.clienteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.clienteEndereco" class="w-full input-aurora" placeholder="Endereço" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center justify-between">
            <span>Itens</span>
            <button @click="addItem" class="text-xs text-blue-400 hover:text-blue-200 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Adicionar</button>
          </h3>
          <div v-for="(item,i) in form.items" :key="i" class="flex gap-2 items-center">
            <input v-model="item.descricao" class="flex-1 input-aurora text-xs" placeholder="Descrição" />
            <input v-model.number="item.qtd" type="number" class="w-14 input-aurora text-xs" placeholder="Qtd" />
            <input v-model="item.unidade" class="w-14 input-aurora text-xs" placeholder="un" />
            <input v-model.number="item.valorUnit" type="number" step="0.01" class="w-20 input-aurora text-xs" placeholder="R$" />
            <button @click="removeItem(i)" class="text-red-400 hover:text-red-300 shrink-0"><Icon icon="mdi:close-circle" class="w-4 h-4" /></button>
          </div>
          <div class="space-y-1 pt-2 border-t border-white/10 text-xs">
            <div class="flex justify-between"><span class="text-blue-300">Subtotal:</span><span class="font-semibold text-white">{{ fmtBRL(subtotal) }}</span></div>
            <div class="flex items-center justify-between gap-2"><span class="text-blue-300 shrink-0">Desconto (R$):</span><input v-model="form.desconto" type="number" step="0.01" class="w-24 input-aurora text-xs" /></div>
            <div class="flex justify-between border-t border-white/10 pt-1"><span class="text-blue-300 font-bold">TOTAL:</span><span class="font-bold text-green-400 text-sm">{{ fmtBRL(total) }}</span></div>
          </div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Condições de Pagamento</label><input v-model="form.condicoesPagamento" class="w-full input-aurora" /></div>
          <textarea v-model="form.observacoes" rows="2" class="w-full input-aurora resize-none text-xs" placeholder="Observações gerais"></textarea>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-orcamento" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-xs font-sans leading-relaxed">
          <div class="flex justify-between items-start border-b-2 border-gray-900 pb-3 mb-4">
            <div>
              <h1 class="text-lg font-bold uppercase tracking-wide">ORÇAMENTO</h1>
              <p class="text-gray-500">Nº {{ form.numero }}</p>
            </div>
            <div class="text-right text-xs">
              <p class="font-semibold">{{ form.empresaNome || '[Empresa]' }}</p>
              <p v-if="form.empresaCnpj">CNPJ: {{ form.empresaCnpj }}</p>
              <p v-if="form.empresaTelefone">Tel: {{ form.empresaTelefone }}</p>
              <p v-if="form.empresaEmail">{{ form.empresaEmail }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-4 text-xs">
            <div class="border border-gray-200 p-2 rounded"><p class="font-semibold text-gray-500 uppercase text-[9px] mb-1">Cliente</p><p class="font-semibold">{{ form.clienteNome || '[Cliente]' }}</p><p v-if="form.clienteCpfCnpj">{{ form.clienteCpfCnpj }}</p><p v-if="form.clienteEndereco" class="text-gray-500">{{ form.clienteEndereco }}</p></div>
            <div class="border border-gray-200 p-2 rounded"><p class="font-semibold text-gray-500 uppercase text-[9px] mb-1">Datas</p><p>Emissão: {{ fmt(form.dataEmissao) }}</p><p>Validade: {{ fmt(form.validade) }}</p></div>
          </div>
          <table class="w-full text-xs mb-3 border-collapse">
            <thead class="bg-gray-100"><tr><th class="border border-gray-300 p-1 text-left">Descrição</th><th class="border border-gray-300 p-1 text-center w-12">Qtd</th><th class="border border-gray-300 p-1 text-center w-10">Un</th><th class="border border-gray-300 p-1 text-right w-20">Unit.</th><th class="border border-gray-300 p-1 text-right w-20">Total</th></tr></thead>
            <tbody>
              <tr v-for="(item,i) in form.items" :key="i" class="border-b border-gray-200"><td class="p-1">{{ item.descricao || '-' }}</td><td class="p-1 text-center">{{ item.qtd }}</td><td class="p-1 text-center">{{ item.unidade }}</td><td class="p-1 text-right">{{ fmtBRL(item.valorUnit) }}</td><td class="p-1 text-right font-semibold">{{ fmtBRL(item.qtd*item.valorUnit) }}</td></tr>
            </tbody>
          </table>
          <div class="text-right mb-3 text-xs space-y-1">
            <p>Subtotal: {{ fmtBRL(subtotal) }}</p>
            <p v-if="descontoNum>0">Desconto: ({{ fmtBRL(descontoNum) }})</p>
            <p class="font-bold text-sm border-t border-gray-900 pt-1">TOTAL: {{ fmtBRL(total) }}</p>
          </div>
          <div v-if="form.condicoesPagamento" class="border border-gray-200 p-2 rounded text-xs mb-3"><p class="font-semibold">Condições de Pagamento:</p><p>{{ form.condicoesPagamento }}</p></div>
          <div v-if="form.observacoes" class="border border-gray-200 p-2 rounded text-xs mb-3"><p class="font-semibold">Observações:</p><p>{{ form.observacoes }}</p></div>
          <div class="grid grid-cols-2 gap-6 mt-6 pt-3 border-t border-gray-400 text-xs text-center">
            <div><div class="border-t border-gray-400 mt-6 pt-1"><p>{{ form.empresaNome || 'Empresa' }}</p></div></div>
            <div><div class="border-t border-gray-400 mt-6 pt-1"><p>Aceite do Cliente</p></div></div>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-orcamento, #doc-orcamento * { visibility: visible; }
  #doc-orcamento { position: fixed; top: 0; left: 0; right: 0; padding: 1.5cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>



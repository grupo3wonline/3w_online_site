<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_ordem_servico'

interface Item { descricao: string; qtd: number; unidade: string; valorUnit: number }

const form = ref({
  numero: '', cidade: '', dataAbertura: '', dataPrevista: '', status: 'Aberta',
  clienteNome: '', clienteCpfCnpj: '', clienteTelefone: '', clienteEndereco: '',
  tecnico: '', descricaoServico: '', observacoes: '',
  items: [] as Item[],
})

function fmtBRL(n: number) { return n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}) }
function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }

const totalItems = computed(() => form.value.items.reduce((s,i)=>s+i.qtd*i.valorUnit,0))

function addItem() { form.value.items.push({descricao:'',qtd:1,unidade:'un',valorUnit:0}) }
function removeItem(i: number) { form.value.items.splice(i,1) }

onMounted(() => {
  form.value.dataAbertura = new Date().toISOString().split('T')[0]
  const dp = new Date(); dp.setDate(dp.getDate()+3); form.value.dataPrevista = dp.toISOString().split('T')[0]
  form.value.numero = String(Math.floor(Math.random()*90000)+10000)
  form.value.cidade = 'São Paulo - SP'
  form.value.items = [{descricao:'',qtd:1,unidade:'un',valorUnit:0}]
  const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}}
})

function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{clienteNome:'',clienteCpfCnpj:'',clienteTelefone:'',clienteEndereco:'',tecnico:'',descricaoServico:'',observacoes:'',items:[{descricao:'',qtd:1,unidade:'un',valorUnit:0}]}); form.value.numero=String(Math.floor(Math.random()*90000)+10000); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{clienteNome:'Empresa ABC Ltda',clienteCpfCnpj:'12.345.678/0001-99',clienteTelefone:'(11) 3344-5566',clienteEndereco:'Rua Comercial, 500 – Centro',tecnico:'João Técnico',descricaoServico:'Manutenção preventiva de equipamentos de ar condicionado – limpeza de filtros, carga de gás e verificação geral dos compressores.',observacoes:'Verificar também tomadas e fiação elétrica.',items:[{descricao:'Mão de obra (serviço técnico)',qtd:1,unidade:'un',valorUnit:300},{descricao:'Gás R-410A',qtd:2,unidade:'kg',valorUnit:85},{descricao:'Filtros de ar',qtd:4,unidade:'un',valorUnit:25}]}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell title="Ordem de Serviço" description="Ordem de serviço completa e profissional com itens, materiais e assinaturas." icon="fa-clipboard-list" icon-gradient="from-indigo-500 to-blue-700" orb-color="indigo"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha os dados do cliente, serviço e itens/materiais. Clique em Gerar PDF.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Identificação da OS</h3>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Nº OS</label><input v-model="form.numero" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Status</label><select v-model="form.status" class="w-full input-aurora"><option>Aberta</option><option>Em andamento</option><option>Concluída</option><option>Cancelada</option></select></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Data de Abertura</label><input v-model="form.dataAbertura" type="date" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Previsão de Conclusão</label><input v-model="form.dataPrevista" type="date" class="w-full input-aurora" /></div>
          </div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Cidade</label><input v-model="form.cidade" class="w-full input-aurora" /></div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Cliente</h3>
          <input v-model="form.clienteNome" class="w-full input-aurora" placeholder="Nome / Razão social" />
          <input v-model="form.clienteCpfCnpj" class="w-full input-aurora" placeholder="CPF / CNPJ" />
          <input v-model="form.clienteTelefone" class="w-full input-aurora" placeholder="Telefone / WhatsApp" />
          <input v-model="form.clienteEndereco" class="w-full input-aurora" placeholder="Endereço" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Serviço</h3>
          <input v-model="form.tecnico" class="w-full input-aurora" placeholder="Técnico / Equipe responsável" />
          <textarea v-model="form.descricaoServico" rows="3" class="w-full input-aurora resize-none" placeholder="Descrição detalhada do serviço"></textarea>
          <textarea v-model="form.observacoes" rows="2" class="w-full input-aurora resize-none" placeholder="Observações"></textarea>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center justify-between">
            <span>Itens / Materiais</span>
            <button @click="addItem" class="text-xs text-blue-400 hover:text-blue-200 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Adicionar</button>
          </h3>
          <div v-for="(item,i) in form.items" :key="i" class="flex gap-2 items-center">
            <input v-model="item.descricao" class="flex-1 input-aurora" placeholder="Descrição" />
            <input v-model.number="item.qtd" type="number" class="w-14 input-aurora" placeholder="Qtd" />
            <input v-model="item.unidade" class="w-14 input-aurora" placeholder="un" />
            <input v-model.number="item.valorUnit" type="number" step="0.01" class="w-20 input-aurora" placeholder="R$" />
            <button @click="removeItem(i)" class="text-red-400 hover:text-red-300"><Icon icon="mdi:close-circle" class="w-4 h-4" /></button>
          </div>
          <div class="flex justify-between pt-2 border-t border-white/10"><span class="text-sm text-blue-300">Total:</span><span class="text-green-400 font-bold">{{ fmtBRL(totalItems) }}</span></div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-ordem-servico" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-xs font-sans leading-relaxed">
          <div class="flex justify-between items-center mb-4 border-b-2 border-gray-900 pb-3">
            <h1 class="text-lg font-bold uppercase tracking-wide">ORDEM DE SERVIÇO</h1>
            <div class="text-right"><p class="text-xs text-gray-500">OS Nº</p><p class="text-xl font-bold">{{ form.numero }}</p><span class="text-xs font-semibold px-2 py-0.5 rounded" :class="form.status==='Concluída'?'bg-green-100 text-green-700':'bg-yellow-100 text-yellow-700'">{{ form.status }}</span></div>
          </div>
          <div class="grid grid-cols-2 gap-3 mb-3 text-xs">
            <div class="border border-gray-300 p-2"><p class="font-semibold text-gray-500 uppercase text-[10px]">Data de Abertura</p><p>{{ fmt(form.dataAbertura) }}</p></div>
            <div class="border border-gray-300 p-2"><p class="font-semibold text-gray-500 uppercase text-[10px]">Previsão de Conclusão</p><p>{{ fmt(form.dataPrevista) }}</p></div>
          </div>
          <div class="border border-gray-300 p-2 mb-3 text-xs">
            <p class="font-semibold text-gray-500 uppercase text-[10px] mb-1">Cliente</p>
            <p class="font-semibold">{{ form.clienteNome || '[Cliente]' }}</p>
            <p v-if="form.clienteCpfCnpj">CPF/CNPJ: {{ form.clienteCpfCnpj }}</p>
            <p v-if="form.clienteTelefone">Tel: {{ form.clienteTelefone }}</p>
            <p v-if="form.clienteEndereco">{{ form.clienteEndereco }}</p>
          </div>
          <div class="border border-gray-300 p-2 mb-3 text-xs">
            <p class="font-semibold text-gray-500 uppercase text-[10px] mb-1">Descrição do Serviço</p>
            <p v-if="form.tecnico" class="text-gray-600">Responsável: <strong>{{ form.tecnico }}</strong></p>
            <p>{{ form.descricaoServico || '[Descrição do serviço]' }}</p>
            <p v-if="form.observacoes" class="text-gray-500 mt-1">Obs: {{ form.observacoes }}</p>
          </div>
          <table v-if="form.items.some(i=>i.descricao)" class="w-full text-xs mb-3 border-collapse">
            <thead class="bg-gray-100"><tr><th class="border border-gray-300 p-1 text-left">Descrição</th><th class="border border-gray-300 p-1 text-center">Qtd</th><th class="border border-gray-300 p-1 text-center">Un</th><th class="border border-gray-300 p-1 text-right">Unit.</th><th class="border border-gray-300 p-1 text-right">Total</th></tr></thead>
            <tbody>
              <tr v-for="(item,i) in form.items" :key="i" class="border-b border-gray-200"><td class="p-1">{{ item.descricao }}</td><td class="p-1 text-center">{{ item.qtd }}</td><td class="p-1 text-center">{{ item.unidade }}</td><td class="p-1 text-right">{{ fmtBRL(item.valorUnit) }}</td><td class="p-1 text-right font-semibold">{{ fmtBRL(item.qtd*item.valorUnit) }}</td></tr>
              <tr class="font-bold bg-gray-50"><td colspan="4" class="p-1 text-right">TOTAL</td><td class="p-1 text-right">{{ fmtBRL(totalItems) }}</td></tr>
            </tbody>
          </table>
          <div class="grid grid-cols-2 gap-6 mt-6 pt-3 border-t border-gray-400">
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs">Técnico Responsável</p><p class="text-xs text-gray-600">{{ form.tecnico || '' }}</p></div></div>
            <div class="text-center"><div class="border-t border-gray-400 mt-6 pt-1"><p class="text-xs">Assinatura do Cliente</p><p class="text-xs text-gray-600">{{ form.clienteNome || '' }}</p></div></div>
          </div>
          <p class="text-xs text-right mt-2 text-gray-500">{{ form.cidade || '[Cidade]' }}, {{ fmt(form.dataAbertura) }}</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-ordem-servico, #doc-ordem-servico * { visibility: visible; }
  #doc-ordem-servico { position: fixed; top: 0; left: 0; right: 0; padding: 1.5cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>



<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_decl_residencia'
const form = ref({
  cidade: '', data: '',
  nome: '', cpf: '', rg: '', estadoCivil: 'Solteiro(a)', nacionalidade: 'brasileira',
  rua: '', numero: '', complemento: '', bairro: '', cidadeEndereco: '', estado: 'SP', cep: '',
  tempoResidencia: '', finalidade: 'cadastros e fins que se fizerem necessários',
})
const estados = ['AC','AL','AM','AP','BA','CE','DF','ES','GO','MA','MG','MS','MT','PA','PB','PE','PI','PR','RJ','RN','RO','RR','RS','SC','SE','SP','TO']
const estadosCivis = ['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)','União estável']

function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) {
  if(!d) return '______'
  const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']
  const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}`
}

onMounted(() => {
  form.value.data = new Date().toISOString().split('T')[0]; form.value.cidade = 'São Paulo - SP'
  const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}}
})

function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',cpf:'',rg:'',rua:'',numero:'',complemento:'',bairro:'',cidadeEndereco:'',cep:'',tempoResidencia:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Luiza Beatriz Carvalho',cpf:'123.456.789-00',rg:'12.345.678-9',estadoCivil:'Solteiro(a)',rua:'Rua dos Jardins',numero:'123',complemento:'Apto 45',bairro:'Vila Nova',cidadeEndereco:'São Paulo',estado:'SP',cep:'01310-100',tempoResidencia:'2 anos'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }

const enderecoCompleto = () => {
  const f = form.value
  let e = f.rua + (f.numero ? ', '+f.numero : '') + (f.complemento ? ', '+f.complemento : '')
  if(f.bairro) e += ' – '+f.bairro; if(f.cidadeEndereco) e += ' – '+f.cidadeEndereco+'/'+f.estado; if(f.cep) e += ' – CEP '+f.cep
  return e || '[Endereço completo]'
}
</script>

<template>
  <ToolShell title="Declaração de Residência" description="Comprove seu endereço residencial com declaração válida para bancos, escolas e órgãos públicos." icon="fa-home" icon-gradient="from-cyan-500 to-blue-700" orb-color="cyan"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha seus dados pessoais e endereço. Clique em Gerar PDF para imprimir.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dados do Declarante</h3>
          <input v-model="form.nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.cpf" class="w-full input-aurora" placeholder="CPF" />
            <input v-model="form.rg" class="w-full input-aurora" placeholder="RG" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Estado Civil</label><select v-model="form.estadoCivil" class="w-full input-aurora"><option v-for="e in estadosCivis" :key="e">{{ e }}</option></select></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Nacionalidade</label><input v-model="form.nacionalidade" class="w-full input-aurora" /></div>
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Endereço</h3>
          <div class="grid grid-cols-3 gap-3">
            <div class="col-span-2"><input v-model="form.rua" class="w-full input-aurora" placeholder="Rua / Av." /></div>
            <div><input v-model="form.numero" class="w-full input-aurora" placeholder="Nº" /></div>
          </div>
          <input v-model="form.complemento" class="w-full input-aurora" placeholder="Complemento (Apto, Bloco...)" />
          <input v-model="form.bairro" class="w-full input-aurora" placeholder="Bairro" />
          <div class="grid grid-cols-3 gap-3">
            <div class="col-span-2"><input v-model="form.cidadeEndereco" class="w-full input-aurora" placeholder="Cidade" /></div>
            <div><select v-model="form.estado" class="w-full input-aurora"><option v-for="e in estados" :key="e">{{ e }}</option></select></div>
          </div>
          <input v-model="form.cep" class="w-full input-aurora" placeholder="CEP" />
          <input v-model="form.tempoResidencia" class="w-full input-aurora" placeholder="Há quanto tempo reside (ex: 3 anos)" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Localização e Data</h3>
          <div class="grid grid-cols-2 gap-3">
            <div><label class="text-xs text-blue-300 mb-1.5 block">Cidade</label><input v-model="form.cidade" class="w-full input-aurora" /></div>
            <div><label class="text-xs text-blue-300 mb-1.5 block">Data</label><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
          </div>
          <div><label class="text-xs text-blue-300 mb-1.5 block">Finalidade</label><input v-model="form.finalidade" class="w-full input-aurora" /></div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-decl-residencia" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8">
            <h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">DECLARAÇÃO DE RESIDÊNCIA</h1>
          </div>
          <p class="mb-6 text-justify">
            Eu, <strong>{{ form.nome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.cpf || '[CPF]' }}</strong><span v-if="form.rg">, RG nº <strong>{{ form.rg }}</strong></span>,
            <strong>{{ form.estadoCivil }}</strong>, de nacionalidade <strong>{{ form.nacionalidade }}</strong>,
            residente e domiciliado(a) à <strong>{{ enderecoCompleto() }}</strong><span v-if="form.tempoResidencia">, neste endereço há <strong>{{ form.tempoResidencia }}</strong></span>,
            venho por meio desta, declarar para os devidos fins, que o endereço acima mencionado é o meu endereço residencial atual.
          </p>
          <p class="mb-6 text-justify">
            Declaro ainda ser a presente declaração verdadeira e assumo inteira responsabilidade pelas informações prestadas,
            estando ciente das penalidades previstas em lei para declarações falsas.
          </p>
          <p class="mb-10 text-justify">
            Por ser verdade, firmo a presente declaração para fins de <strong>{{ form.finalidade }}</strong>.
          </p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center">
            <p class="font-semibold">{{ form.nome || '[Nome do Declarante]' }}</p>
            <p class="text-xs text-gray-600">CPF: {{ form.cpf || '-' }}</p>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-decl-residencia, #doc-decl-residencia * { visibility: visible; }
  #doc-decl-residencia { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; }
  @page { size: A4; margin: 2cm; }
}
</style>



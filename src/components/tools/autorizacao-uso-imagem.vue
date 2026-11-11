<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_uso_imagem'
const form = ref({ cidade: '', data: '', tipoAutorizante: 'adulto',
  autorizanteNome: '', autorizanteCpf: '', autorizanteEndereco: '',
  representanteNome: '', representanteCpf: '', representanteParentesco: '',
  menorNome: '', menorCpf: '',
  empresaNome: '', finalidade: '', periodo: '', remuneracao: 'gratuito', remuneracaoValor: '',
})

function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{autorizanteNome:'',autorizanteCpf:'',autorizanteEndereco:'',representanteNome:'',representanteCpf:'',menorNome:'',menorCpf:'',empresaNome:'',finalidade:'',periodo:'',remuneracaoValor:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{tipoAutorizante:'adulto',autorizanteNome:'Carla Maria Souza',autorizanteCpf:'888.999.000-11',autorizanteEndereco:'Rua dos Artistas, 200 – Pinheiros – São Paulo/SP',empresaNome:'Agência Criativa Digital Ltda',finalidade:'campanhas publicitárias digitais e impressas, redes sociais e materiais de divulgação institucional',periodo:'01/01/2025 a 31/12/2025',remuneracao:'gratuito'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Autorização de Uso de Imagem" description="Consentimento formal para uso de fotos e vídeos, para adultos ou menores de idade." icon="fa-camera" icon-gradient="from-pink-500 to-fuchsia-700" orb-color="pink"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Selecione adulto ou menor. Preencha os dados e clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Tipo de Autorização</h3>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="form.tipoAutorizante" value="adulto" class="accent-blue-500" /><span class="text-sm text-blue-200">Adulto</span></label>
            <label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="form.tipoAutorizante" value="menor" class="accent-blue-500" /><span class="text-sm text-blue-200">Menor de Idade</span></label>
          </div>
        </div>
        <div v-if="form.tipoAutorizante==='adulto'" class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Autorizante</h3>
          <input v-model="form.autorizanteNome" class="w-full input-aurora" placeholder="Nome completo" />
          <input v-model="form.autorizanteCpf" class="w-full input-aurora" placeholder="CPF" />
          <input v-model="form.autorizanteEndereco" class="w-full input-aurora" placeholder="Endereço completo" />
        </div>
        <div v-if="form.tipoAutorizante==='menor'" class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Menor</h3>
          <input v-model="form.menorNome" class="w-full input-aurora" placeholder="Nome do menor" />
          <input v-model="form.menorCpf" class="w-full input-aurora" placeholder="CPF do menor" />
          <h3 class="text-sm font-semibold text-white mt-2">Representante Legal</h3>
          <input v-model="form.representanteNome" class="w-full input-aurora" placeholder="Nome completo do responsável" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.representanteCpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.representanteParentesco" class="w-full input-aurora" placeholder="Parentesco (mãe/pai)" /></div>
          <input v-model="form.autorizanteEndereco" class="w-full input-aurora" placeholder="Endereço do responsável" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Uso da Imagem</h3>
          <input v-model="form.empresaNome" class="w-full input-aurora" placeholder="Empresa / Pessoa que usará a imagem" />
          <textarea v-model="form.finalidade" rows="2" class="w-full input-aurora resize-none" placeholder="Finalidade do uso (ex: campanhas publicitárias, redes sociais...)" />
          <input v-model="form.periodo" class="w-full input-aurora" placeholder="Período de vigência (ex: 01/01/2025 a 31/12/2025)" />
          <div class="flex gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="form.remuneracao" value="gratuito" class="accent-blue-500" /><span class="text-sm text-blue-200">Gratuito</span></label><label class="flex items-center gap-2 cursor-pointer"><input type="radio" v-model="form.remuneracao" value="remunerado" class="accent-blue-500" /><span class="text-sm text-blue-200">Remunerado</span></label></div>
          <input v-if="form.remuneracao==='remunerado'" v-model="form.remuneracaoValor" class="w-full input-aurora" placeholder="Valor da remuneração" />
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Local e Data</h3>
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-uso-imagem" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-4">AUTORIZAÇÃO DE USO DE IMAGEM</h1></div>
          <template v-if="form.tipoAutorizante==='adulto'">
            <p class="mb-5 text-justify">Eu, <strong>{{ form.autorizanteNome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.autorizanteCpf || '[CPF]' }}</strong>, residente à <strong>{{ form.autorizanteEndereco || '[endereço]' }}</strong>, autorizo <strong>{{ form.empresaNome || '[empresa]' }}</strong> a utilizar minha imagem (fotografias e/ou vídeos) para fins de <strong>{{ form.finalidade || '[finalidade]' }}</strong>, pelo período de <strong>{{ form.periodo || '[período]' }}</strong>, de forma <strong>{{ form.remuneracao === 'gratuito' ? 'gratuita' : 'remunerada no valor de ' + form.remuneracaoValor }}</strong>.</p>
          </template>
          <template v-else>
            <p class="mb-5 text-justify">Eu, <strong>{{ form.representanteNome || '[Responsável]' }}</strong>, portador(a) do CPF nº <strong>{{ form.representanteCpf || '[CPF]' }}</strong>, na qualidade de <strong>{{ form.representanteParentesco || 'responsável legal' }}</strong> do(a) menor <strong>{{ form.menorNome || '[menor]' }}</strong>, CPF nº {{ form.menorCpf || '[CPF]' }}, residente à <strong>{{ form.autorizanteEndereco || '[endereço]' }}</strong>, autorizo <strong>{{ form.empresaNome || '[empresa]' }}</strong> a utilizar a imagem do(a) referido(a) menor para fins de <strong>{{ form.finalidade || '[finalidade]' }}</strong>, pelo período de <strong>{{ form.periodo || '[período]' }}</strong>, de forma <strong>{{ form.remuneracao === 'gratuito' ? 'gratuita' : 'remunerada no valor de ' + form.remuneracaoValor }}</strong>.</p>
          </template>
          <p class="mb-6 text-justify">Esta autorização abrange o uso em qualquer meio de comunicação (físico e digital), sendo permitida a edição, corte e adaptação das imagens para os fins autorizados.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.tipoAutorizante==='adulto' ? (form.autorizanteNome||'[Autorizante]') : (form.representanteNome||'[Responsável]') }}</p><p class="text-xs text-gray-600">CPF: {{ form.tipoAutorizante==='adulto' ? form.autorizanteCpf : form.representanteCpf }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-uso-imagem, #doc-uso-imagem * { visibility: visible; } #doc-uso-imagem { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_etnico_racial'
const racas = ['Branca','Preta','Parda','Amarela','Indígena']
const finalidades = ['Cotas em universidade pública (SISU/FIES)','Cotas em concurso público','Programa de inclusão racial','Outros fins']
const form = ref({ cidade: '', data: '', nome: '', cpf: '', nascimento: '', raca: 'Parda', finalidade: 'Cotas em universidade pública (SISU/FIES)', finObs: '' })

function fmt(d: string) { if(!d) return '__/__/____'; const[y,m,day]=d.split('-'); return `${day}/${m}/${y}` }
function dataLong(d: string) { if(!d) return '______'; const ms=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro']; const[y,m,day]=d.split('-'); return `${parseInt(day)} de ${ms[parseInt(m)-1]} de ${y}` }

onMounted(() => { form.value.data=new Date().toISOString().split('T')[0]; form.value.cidade='São Paulo - SP'; const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}} })
function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',cpf:'',nascimento:'',finObs:''}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Beatriz dos Santos',cpf:'555.666.777-88',nascimento:'2000-05-20',raca:'Preta',finalidade:'Cotas em universidade pública (SISU/FIES)'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>
<template>
  <ToolShell title="Autodeclaração Étnico-Racial" description="Raça/cor conforme IBGE para cotas em universidades e concursos públicos." icon="fa-users" icon-gradient="from-orange-500 to-red-700" orb-color="orange"
    :quick-tips="['100% gratuito','Sem cadastro','Exporta em PDF']"
    :tips="[{title:'Uso',text:'Preencha seus dados e selecione raça/cor. Clique em Gerar PDF.'}]">
    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>
    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dados do Declarante</h3>
          <input v-model="form.nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cpf" class="w-full input-aurora" placeholder="CPF" /><input v-model="form.nascimento" type="date" class="w-full input-aurora" /></div>
          <div>
            <label class="text-xs text-blue-300 mb-1.5 block">Cor/Raça (conforme IBGE)</label>
            <div class="flex flex-wrap gap-2">
              <label v-for="r in racas" :key="r" class="flex items-center gap-1.5 cursor-pointer">
                <input type="radio" v-model="form.raca" :value="r" class="accent-blue-500" />
                <span class="text-sm text-blue-200">{{ r }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Finalidade e Data</h3>
          <select v-model="form.finalidade" class="w-full input-aurora"><option v-for="f in finalidades" :key="f">{{ f }}</option></select>
          <input v-model="form.finObs" class="w-full input-aurora" placeholder="Especifique (ex: nome da instituição)" />
          <div class="grid grid-cols-2 gap-3"><input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade" /><input v-model="form.data" type="date" class="w-full input-aurora" /></div>
        </div>
      </div>
      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-etnico-racial" class="doc-preview bg-white text-gray-900 p-8 shadow-lg rounded-lg text-sm font-serif leading-relaxed">
          <div class="text-center mb-8"><h1 class="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-900 pb-2 inline-block px-2">AUTODECLARAÇÃO ÉTNICO-RACIAL</h1></div>
          <p class="mb-6 text-justify">Eu, <strong>{{ form.nome || '[Nome]' }}</strong>, portador(a) do CPF nº <strong>{{ form.cpf || '[CPF]' }}</strong><span v-if="form.nascimento">, nascido(a) em {{ fmt(form.nascimento) }}</span>, declaro, para fins de <strong>{{ form.finalidade }}{{ form.finObs ? ' – '+form.finObs : '' }}</strong>, que me autodeclaro da cor/raça <strong>{{ form.raca }}</strong>, conforme classificação adotada pelo Instituto Brasileiro de Geografia e Estatística – IBGE.</p>
          <p class="mb-6 text-justify">Declaro estar ciente de que a falsidade desta declaração sujeita-me à pena prevista no art. 299 do Código Penal, sem prejuízo de outros efeitos legais, incluindo a anulação do ato praticado com base nesta declaração.</p>
          <p class="mb-6 text-justify">Por ser verdade, firmo a presente autodeclaração.</p>
          <p class="text-right mb-10">{{ form.cidade || '[Cidade]' }}, {{ dataLong(form.data) }}</p>
          <div class="mt-10 pt-4 border-t border-gray-400 mx-auto w-64 text-center"><p class="font-semibold">{{ form.nome || '[Nome]' }}</p><p class="text-xs text-gray-600">CPF: {{ form.cpf }}</p></div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>
<style>
@media print { body * { visibility: hidden; } #doc-etnico-racial, #doc-etnico-racial * { visibility: visible; } #doc-etnico-racial { position: fixed; top: 0; left: 0; right: 0; padding: 2cm; background: white; } @page { size: A4; margin: 2cm; } }
</style>



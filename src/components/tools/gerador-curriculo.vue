<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const LS_KEY = 'doc_curriculo'
interface Exp { empresa: string; cargo: string; periodo: string; descricao: string }
interface Edu { instituicao: string; curso: string; periodo: string }
interface Curso { nome: string; instituicao: string; cargaHoraria: string }

const form = ref({
  nome: '', email: '', telefone: '', cidade: '', linkedin: '', github: '',
  objetivo: '',
  experiencias: [] as Exp[],
  formacoes: [] as Edu[],
  habilidades: '',
  idiomas: '',
  cursos: [] as Curso[],
  informacoesAdicionais: '',
})

onMounted(() => {
  form.value.experiencias = [{empresa:'',cargo:'',periodo:'',descricao:''}]
  form.value.formacoes = [{instituicao:'',curso:'',periodo:''}]
  form.value.cursos = []
  const saved=localStorage.getItem(LS_KEY); if(saved){try{Object.assign(form.value,JSON.parse(saved))}catch{}}
})

function addExp() { form.value.experiencias.push({empresa:'',cargo:'',periodo:'',descricao:''}) }
function removeExp(i: number) { form.value.experiencias.splice(i,1) }
function addEdu() { form.value.formacoes.push({instituicao:'',curso:'',periodo:''}) }
function removeEdu(i: number) { form.value.formacoes.splice(i,1) }
function addCurso() { form.value.cursos.push({nome:'',instituicao:'',cargaHoraria:''}) }
function removeCurso(i: number) { form.value.cursos.splice(i,1) }

function salvar() { localStorage.setItem(LS_KEY,JSON.stringify(form.value)); Swal.fire({icon:'success',title:'Dados salvos!',timer:1500,showConfirmButton:false}) }
function limpar() { localStorage.removeItem(LS_KEY); Object.assign(form.value,{nome:'',email:'',telefone:'',cidade:'',linkedin:'',github:'',objetivo:'',habilidades:'',idiomas:'',informacoesAdicionais:'',experiencias:[{empresa:'',cargo:'',periodo:'',descricao:''}],formacoes:[{instituicao:'',curso:'',periodo:''}],cursos:[]}); Swal.fire({icon:'success',title:'Limpo!',timer:1500,showConfirmButton:false}) }
function exemplo() { Object.assign(form.value,{nome:'Lucas Fernandes Ramos',email:'lucas.ramos@email.com',telefone:'(11) 99999-8888',cidade:'São Paulo - SP',linkedin:'linkedin.com/in/lucasramos',github:'github.com/lucasramos',objetivo:'Desenvolvedor Full Stack com 5 anos de experiência em aplicações web. Busco oportunidades para aplicar meus conhecimentos em React, Node.js e Vue.js em projetos desafiadores.',habilidades:'JavaScript, TypeScript, Vue.js, React, Node.js, PostgreSQL, MySQL, Docker, Git, AWS',idiomas:'Português – Nativo\nInglês – Avançado (C1)\nEspanhol – Intermediário',experiencias:[{empresa:'Tech Solutions Ltda',cargo:'Desenvolvedor Full Stack',periodo:'Jan 2022 – Atual',descricao:'Desenvolvimento e manutenção de aplicações web com Vue.js e Node.js. Integração de APIs REST e GraphQL.'},{empresa:'StartupX',cargo:'Desenvolvedor Front-end',periodo:'Mar 2020 – Dez 2021',descricao:'Criação de interfaces responsivas com React e TypeScript. Redução de 40% no tempo de carregamento.'}],formacoes:[{instituicao:'Universidade Mackenzie',curso:'Bacharelado em Ciência da Computação',periodo:'2016 – 2020'}],cursos:[{nome:'AWS Cloud Practitioner',instituicao:'Amazon Web Services',cargaHoraria:'40h'}],informacoesAdicionais:'Disponibilidade imediata. Habilitação categoria B.'}); Swal.fire({icon:'success',title:'Exemplo carregado!',timer:1500,showConfirmButton:false}) }
function gerarPDF() { window.print() }
</script>

<template>
  <ToolShell title="Gerador de Currículo" description="Monte seu currículo profissional em minutos e exporte em PDF." icon="fa-id-card" icon-gradient="from-pink-500 to-rose-700" orb-color="pink"
    :quick-tips="['100% gratuito', 'Sem cadastro', 'Exporta em PDF']"
    :tips="[{ title: 'Uso', text: 'Preencha todas as seções. Clique em Gerar PDF para imprimir ou salvar como PDF.' }]">

    <div class="btn-row justify-center no-print">
      <button @click="gerarPDF" class="flex items-center gap-2 px-5 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-semibold transition-colors"><Icon icon="mdi:file-pdf-box" class="w-4 h-4" /> Gerar PDF</button>
      <button @click="exemplo" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:magic-staff" class="w-4 h-4" /> Exemplo</button>
      <button @click="salvar" class="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg text-sm transition-colors"><Icon icon="mdi:content-save-outline" class="w-4 h-4" /> Salvar</button>
      <button @click="limpar" class="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20 rounded-lg text-sm transition-colors"><Icon icon="mdi:trash-can-outline" class="w-4 h-4" /> Limpar</button>
    </div>

    <div class="grid lg:grid-cols-2 gap-6 no-print">
      <div class="space-y-4">
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Dados Pessoais</h3>
          <input v-model="form.nome" class="w-full input-aurora" placeholder="Nome completo" />
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.email" class="w-full input-aurora" placeholder="E-mail" />
            <input v-model="form.telefone" class="w-full input-aurora" placeholder="Telefone" />
          </div>
          <input v-model="form.cidade" class="w-full input-aurora" placeholder="Cidade - UF" />
          <div class="grid grid-cols-2 gap-3">
            <input v-model="form.linkedin" class="w-full input-aurora" placeholder="LinkedIn" />
            <input v-model="form.github" class="w-full input-aurora" placeholder="GitHub (opcional)" />
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Objetivo Profissional</h3>
          <textarea v-model="form.objetivo" rows="3" class="w-full input-aurora resize-none" placeholder="Descreva seu objetivo profissional..."></textarea>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center justify-between"><span>Experiências</span><button @click="addExp" class="text-xs text-blue-400 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Add</button></h3>
          <div v-for="(e,i) in form.experiencias" :key="i" class="border border-white/10 rounded-lg p-3 space-y-2">
            <div class="flex justify-between items-center"><span class="text-xs text-blue-300">Exp. {{ i+1 }}</span><button @click="removeExp(i)" class="text-red-400"><Icon icon="mdi:close" class="w-3 h-3" /></button></div>
            <input v-model="e.empresa" class="w-full input-aurora text-xs" placeholder="Empresa" />
            <div class="grid grid-cols-2 gap-3"><input v-model="e.cargo" class="w-full input-aurora text-xs" placeholder="Cargo" /><input v-model="e.periodo" class="w-full input-aurora text-xs" placeholder="Período" /></div>
            <textarea v-model="e.descricao" rows="2" class="w-full input-aurora resize-none text-xs" placeholder="Atividades realizadas"></textarea>
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center justify-between"><span>Formação Acadêmica</span><button @click="addEdu" class="text-xs text-blue-400 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Add</button></h3>
          <div v-for="(e,i) in form.formacoes" :key="i" class="border border-white/10 rounded-lg p-3 space-y-2">
            <div class="flex justify-between"><span class="text-xs text-blue-300">Formação {{ i+1 }}</span><button @click="removeEdu(i)" class="text-red-400"><Icon icon="mdi:close" class="w-3 h-3" /></button></div>
            <input v-model="e.curso" class="w-full input-aurora text-xs" placeholder="Curso" />
            <div class="grid grid-cols-2 gap-3"><input v-model="e.instituicao" class="w-full input-aurora text-xs" placeholder="Instituição" /><input v-model="e.periodo" class="w-full input-aurora text-xs" placeholder="Período" /></div>
          </div>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Habilidades</h3>
          <textarea v-model="form.habilidades" rows="2" class="w-full input-aurora resize-none" placeholder="Ex: JavaScript, Python, Excel..."></textarea>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white">Idiomas</h3>
          <textarea v-model="form.idiomas" rows="2" class="w-full input-aurora resize-none" placeholder="Ex: Inglês – Fluente&#10;Espanhol – Básico"></textarea>
        </div>
        <div class="glass-panel p-4 space-y-4">
          <h3 class="text-sm font-semibold text-white flex items-center justify-between"><span>Cursos & Certificações</span><button @click="addCurso" class="text-xs text-blue-400 flex items-center gap-1"><Icon icon="mdi:plus-circle" class="w-4 h-4" /> Add</button></h3>
          <div v-for="(c,i) in form.cursos" :key="i" class="flex gap-2 items-center">
            <input v-model="c.nome" class="flex-1 input-aurora text-xs" placeholder="Curso" />
            <input v-model="c.instituicao" class="flex-1 input-aurora text-xs" placeholder="Instituição" />
            <input v-model="c.cargaHoraria" class="w-16 input-aurora text-xs" placeholder="Carga" />
            <button @click="removeCurso(i)" class="text-red-400 shrink-0"><Icon icon="mdi:close-circle" class="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      <div>
        <h3 class="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"><Icon icon="mdi:eye-outline" class="w-4 h-4" /> Prévia</h3>
        <div id="doc-curriculo" class="doc-preview bg-white text-gray-900 p-6 shadow-lg rounded-lg text-xs font-sans leading-relaxed">
          <div class="border-b-2 border-gray-900 pb-3 mb-4">
            <h1 class="text-xl font-bold text-gray-900">{{ form.nome || '[Seu Nome]' }}</h1>
            <div class="flex flex-wrap gap-3 text-xs text-gray-600 mt-1">
              <span v-if="form.email">📧 {{ form.email }}</span>
              <span v-if="form.telefone">📞 {{ form.telefone }}</span>
              <span v-if="form.cidade">📍 {{ form.cidade }}</span>
              <span v-if="form.linkedin">💼 {{ form.linkedin }}</span>
              <span v-if="form.github">💻 {{ form.github }}</span>
            </div>
          </div>
          <div v-if="form.objetivo" class="mb-3">
            <h2 class="text-xs font-bold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">Objetivo</h2>
            <p class="text-xs leading-relaxed">{{ form.objetivo }}</p>
          </div>
          <div v-if="form.experiencias.some(e=>e.empresa)" class="mb-3">
            <h2 class="text-xs font-bold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">Experiência Profissional</h2>
            <div v-for="(e,i) in form.experiencias" :key="i" class="mb-2">
              <div class="flex justify-between"><p class="font-semibold">{{ e.cargo }}</p><p class="text-gray-500">{{ e.periodo }}</p></div>
              <p class="text-gray-600 font-medium">{{ e.empresa }}</p>
              <p v-if="e.descricao" class="text-gray-700 mt-0.5">{{ e.descricao }}</p>
            </div>
          </div>
          <div v-if="form.formacoes.some(e=>e.instituicao)" class="mb-3">
            <h2 class="text-xs font-bold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">Formação Acadêmica</h2>
            <div v-for="(e,i) in form.formacoes" :key="i" class="mb-1">
              <div class="flex justify-between"><p class="font-semibold">{{ e.curso }}</p><p class="text-gray-500">{{ e.periodo }}</p></div>
              <p class="text-gray-600">{{ e.instituicao }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div v-if="form.habilidades">
              <h2 class="text-xs font-bold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">Habilidades</h2>
              <p class="text-xs leading-relaxed">{{ form.habilidades }}</p>
            </div>
            <div v-if="form.idiomas">
              <h2 class="text-xs font-bold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">Idiomas</h2>
              <p class="text-xs whitespace-pre-line">{{ form.idiomas }}</p>
            </div>
          </div>
          <div v-if="form.cursos.some(c=>c.nome)" class="mt-3">
            <h2 class="text-xs font-bold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">Cursos & Certificações</h2>
            <div v-for="(c,i) in form.cursos" :key="i" class="flex justify-between mb-0.5">
              <span class="font-semibold">{{ c.nome }}</span>
              <span class="text-gray-500">{{ c.instituicao }}<span v-if="c.cargaHoraria"> – {{ c.cargaHoraria }}</span></span>
            </div>
          </div>
          <div v-if="form.informacoesAdicionais" class="mt-3">
            <h2 class="text-xs font-bold uppercase text-gray-500 border-b border-gray-200 pb-1 mb-2">Informações Adicionais</h2>
            <p>{{ form.informacoesAdicionais }}</p>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<style>
@media print {
  body * { visibility: hidden; }
  #doc-curriculo, #doc-curriculo * { visibility: visible; }
  #doc-curriculo { position: fixed; top: 0; left: 0; right: 0; padding: 1.5cm; background: white; }
  @page { size: A4; margin: 1.5cm; }
}
</style>



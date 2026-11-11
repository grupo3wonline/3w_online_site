<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const busca = ref('')
const categoriaAtiva = ref('todos')

const categorias = [
  { id: 'todos', label: 'Todos' }, { id: 'matematica', label: 'Matemática' },
  { id: 'moeda', label: 'Moedas' }, { id: 'setas', label: 'Setas' },
  { id: 'emoji', label: 'Emoji' }, { id: 'geometria', label: 'Geometria' },
  { id: 'marcas', label: 'Marcas Comerciais' }, { id: 'pontuacao', label: 'Pontuação Especial' },
  { id: 'grecia', label: 'Letras Gregas' }, { id: 'musica', label: 'Música' },
  { id: 'misc', label: 'Diversos' },
]

const simbolos = [
  // Matemática
  ...[['±','mais-menos','matematica'],['÷','divisão','matematica'],['×','multiplicação','matematica'],['≠','diferente','matematica'],['≈','aproximadamente','matematica'],['≡','equivalente','matematica'],['≤','menor ou igual','matematica'],['≥','maior ou igual','matematica'],['∞','infinito','matematica'],['√','raiz quadrada','matematica'],['∑','somatório','matematica'],['∫','integral','matematica'],['π','pi','matematica'],['°','grau','matematica'],['¹','sobrescrito 1','matematica'],['²','ao quadrado','matematica'],['³','ao cubo','matematica'],['¼','um quarto','matematica'],['½','metade','matematica'],['¾','três quartos','matematica'],['%','porcentagem','matematica'],['‰','por mil','matematica']],
  // Moedas
  ...[['$','dólar','moeda'],['€','euro','moeda'],['£','libra','moeda'],['¥','iene','moeda'],['₹','rúpia','moeda'],['₽','rublo','moeda'],['₿','bitcoin','moeda'],['₩','won','moeda'],['¢','centavo','moeda'],['R$','real brasileiro','moeda']],
  // Setas
  ...[['←','seta esquerda','setas'],['→','seta direita','setas'],['↑','seta para cima','setas'],['↓','seta para baixo','setas'],['↔','seta bidirecional','setas'],['↕','seta vertical','setas'],['⇐','seta dupla esquerda','setas'],['⇒','seta dupla direita','setas'],['⇔','seta dupla bidirecional','setas'],['➔','seta grossa direita','setas'],['➨','seta preenchida','setas'],['⬅','seta preenchida esquerda','setas']],
  // Emoji/Símbolos comuns
  ...[['★','estrela cheia','emoji'],['☆','estrela vazia','emoji'],['♥','coração cheio','emoji'],['♡','coração vazio','emoji'],['☑','caixa marcada','emoji'],['☐','caixa vazia','emoji'],['☒','caixa X','emoji'],['✓','checkmark','emoji'],['✗','X','emoji'],['✘','X grosso','emoji'],['☺','sorriso','emoji'],['☻','sorriso preto','emoji'],['☼','sol','emoji'],['☾','lua','emoji'],['✉','carta','emoji'],['✆','telefone','emoji'],['⚠','atenção','emoji'],['✈','avião','emoji'],['⚡','raio','emoji'],['❄','floco de neve','emoji'],['♻','reciclagem','emoji']],
  // Geometria
  ...[['●','círculo cheio','geometria'],['○','círculo vazio','geometria'],['■','quadrado cheio','geometria'],['□','quadrado vazio','geometria'],['▲','triângulo cima','geometria'],['▼','triângulo baixo','geometria'],['◆','losango cheio','geometria'],['◇','losango vazio','geometria'],['▶','triângulo direita','geometria'],['◀','triângulo esquerda','geometria'],['⬛','quadrado grande','geometria'],['⬜','quadrado grande vazio','geometria']],
  // Marcas comerciais
  ...[['©','copyright','marcas'],['®','registrado','marcas'],['™','trademark','marcas'],['℠','service mark','marcas']],
  // Pontuação especial
  ...[['«','aspas duplas abrindo','pontuacao'],['»','aspas duplas fechando','pontuacao'],['‹','aspas simples abrindo','pontuacao'],['›','aspas simples fechando','pontuacao'],['„','aspas baixas','pontuacao'],['"','aspas esquerda','pontuacao'],['"','aspas direita','pontuacao'],['•','marcador','pontuacao'],['·','ponto médio','pontuacao'],['…','reticências','pontuacao'],['—','travessão','pontuacao'],['–','meia-risca','pontuacao'],['¿','interrogação invertida','pontuacao'],['¡','exclamação invertida','pontuacao']],
  // Letras gregas
  ...[['α','alpha','grecia'],['β','beta','grecia'],['γ','gamma','grecia'],['δ','delta','grecia'],['ε','epsilon','grecia'],['θ','theta','grecia'],['λ','lambda','grecia'],['μ','mu','grecia'],['ξ','xi','grecia'],['σ','sigma','grecia'],['τ','tau','grecia'],['φ','phi','grecia'],['ψ','psi','grecia'],['ω','omega','grecia'],['Δ','Delta','grecia'],['Σ','Sigma maiúsculo','grecia'],['Ω','Omega maiúsculo','grecia']],
  // Música
  ...[['♩','nota','musica'],['♪','nota dupla','musica'],['♫','notas','musica'],['♬','notas duplas','musica'],['♭','bemol','musica'],['♮','bequadro','musica'],['♯','sustenido','musica']],
  // Diversos
  ...[['§','parágrafo','misc'],['¶','pilcrow','misc'],['№','número','misc'],['Ω','ohm','misc'],['†','cruz','misc'],['‡','cruz dupla','misc'],['⁂','asterismo','misc'],['☯','yin yang','misc'],['✝','cruz latina','misc'],['⚜','flor de lis','misc'],['⚫','círculo preto','misc'],['⚪','círculo branco','misc']],
].map(([s, n, c]) => ({ simbolo: s as string, nome: n as string, categoria: c as string }))

const simbolosFiltrados = computed(() => {
  let list = simbolos
  if (categoriaAtiva.value !== 'todos') list = list.filter(s => s.categoria === categoriaAtiva.value)
  if (busca.value.trim()) {
    const q = busca.value.toLowerCase()
    list = list.filter(s => s.nome.includes(q) || s.simbolo.includes(q))
  }
  return list
})

function copiar(s: string) {
  navigator.clipboard.writeText(s)
  Swal.fire({ icon: 'success', title: `"${s}" copiado!`, timer: 800, showConfirmButton: false })
}
</script>

<template>
  <ToolShell title="Símbolos para Copiar" description="Clique em qualquer símbolo para copiá-lo. Mais de 150 símbolos organizados por categoria."
    icon="fa-star" icon-gradient="from-yellow-500 to-amber-700" orb-color="orange"
    :quick-tips="['150+ símbolos','Busca instantânea','Clique para copiar']"
    :tips="[{title:'Uso',text:'Clique no símbolo para copiar. Use a busca ou filtros de categoria.'}]">

    <div class="mb-4 flex flex-col sm:flex-row gap-3">
      <div class="relative flex-1">
        <Icon icon="mdi:magnify" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
        <input v-model="busca" placeholder="Buscar símbolo..." class="w-full pl-9 input-aurora" />
      </div>
    </div>

    <div class="flex flex-wrap gap-1.5 mb-5">
      <button v-for="cat in categorias" :key="cat.id" @click="categoriaAtiva = cat.id"
        :class="['px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border',
          categoriaAtiva===cat.id?'bg-amber-600 text-white border-amber-500':'bg-white/5 text-blue-300 border-white/10 hover:bg-white/10']">
        {{ cat.label }}
      </button>
    </div>

    <p class="text-xs text-blue-300 mb-3">{{ simbolosFiltrados.length }} símbolos encontrados</p>

    <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
      <button v-for="s in simbolosFiltrados" :key="s.simbolo + s.nome"
        @click="copiar(s.simbolo)"
        :title="s.nome"
        class="flex flex-col items-center justify-center p-2 bg-white/5 hover:bg-white/15 border border-white/10 rounded-lg aspect-square transition-all group hover:border-amber-400">
        <span class="text-2xl text-white leading-none mb-1">{{ s.simbolo }}</span>
        <span class="text-[9px] text-blue-400 group-hover:text-amber-300 text-center leading-tight truncate w-full">{{ s.nome }}</span>
      </button>
    </div>
  </ToolShell>
</template>

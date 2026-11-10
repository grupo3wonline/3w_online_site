<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

interface Question {
  text: string
  options: { label: string; areas: string[] }[]
}

const questions: Question[] = [
  {
    text: 'O que mais te motiva no trabalho?',
    options: [
      { label: 'Resolver problemas técnicos e criar soluções', areas: ['tecnologia', 'engenharia'] },
      { label: 'Ajudar pessoas e fazer diferença na vida delas', areas: ['saude', 'educacao', 'assistencia'] },
      { label: 'Criar algo novo, seja arte, produto ou empresa', areas: ['criatividade', 'empreendedorismo'] },
      { label: 'Analisar dados, números e estratégias', areas: ['negocios', 'financas'] },
    ],
  },
  {
    text: 'Qual ambiente de trabalho você prefere?',
    options: [
      { label: 'Escritório ou home office com autonomia', areas: ['tecnologia', 'negocios', 'criatividade'] },
      { label: 'Em contato direto com pessoas (clínicas, escolas, escritórios)', areas: ['saude', 'educacao', 'direito'] },
      { label: 'Ao ar livre, laboratórios ou ambientes variados', areas: ['engenharia', 'ciencias'] },
      { label: 'Liderando equipes e tomando decisões', areas: ['gestao', 'empreendedorismo', 'negocios'] },
    ],
  },
  {
    text: 'Que tipo de tarefa você executa melhor?',
    options: [
      { label: 'Programar, configurar sistemas, analisar dados', areas: ['tecnologia', 'ciencias'] },
      { label: 'Comunicar, persuadir e criar relacionamentos', areas: ['comunicacao', 'marketing', 'educacao'] },
      { label: 'Planejar, organizar processos e recursos', areas: ['gestao', 'negocios', 'engenharia'] },
      { label: 'Criar, desenhar, escrever ou expressar ideias', areas: ['criatividade', 'comunicacao', 'marketing'] },
    ],
  },
  {
    text: 'Qual dessas áreas mais desperta sua curiosidade?',
    options: [
      { label: 'Medicina, psicologia, enfermagem, nutrição', areas: ['saude'] },
      { label: 'Programação, inteligência artificial, TI, games', areas: ['tecnologia'] },
      { label: 'Direito, política, sociologia, relações internacionais', areas: ['direito', 'humanidades'] },
      { label: 'Administração, marketing, finanças, startups', areas: ['negocios', 'empreendedorismo', 'financas'] },
    ],
  },
  {
    text: 'Como você prefere aprender?',
    options: [
      { label: 'Praticando, construindo, experimentando', areas: ['tecnologia', 'engenharia', 'criatividade'] },
      { label: 'Lendo, pesquisando, estudando teoria', areas: ['ciencias', 'direito', 'humanidades'] },
      { label: 'Interagindo com pessoas, debates, discussões', areas: ['educacao', 'comunicacao', 'gestao'] },
      { label: 'Observando cases reais e aplicando estratégias', areas: ['negocios', 'financas', 'empreendedorismo'] },
    ],
  },
  {
    text: 'Qual dessas conquistas seria mais significativa para você?',
    options: [
      { label: 'Criar um produto ou app que milhões usem', areas: ['tecnologia', 'empreendedorismo'] },
      { label: 'Curar um paciente ou mudar a vida de um aluno', areas: ['saude', 'educacao'] },
      { label: 'Construir uma empresa de sucesso ou liderar um grande time', areas: ['gestao', 'empreendedorismo', 'negocios'] },
      { label: 'Publicar uma obra, ganhar um prêmio criativo ou comunicar causas', areas: ['criatividade', 'comunicacao', 'humanidades'] },
    ],
  },
]

const areaLabels: Record<string, { name: string; examples: string[]; icon: string; color: string }> = {
  tecnologia: { name: 'Tecnologia & TI', examples: ['Engenharia de Software', 'Ciência de Dados', 'Cibersegurança', 'Desenvolvimento Web'], icon: 'mdi:laptop-account', color: 'text-blue-400' },
  saude: { name: 'Saúde & Bem-estar', examples: ['Medicina', 'Psicologia', 'Enfermagem', 'Nutrição', 'Fisioterapia'], icon: 'mdi:heart-pulse', color: 'text-red-400' },
  negocios: { name: 'Negócios & Gestão', examples: ['Administração', 'Marketing', 'Finanças', 'Contabilidade'], icon: 'mdi:briefcase-outline', color: 'text-yellow-400' },
  criatividade: { name: 'Artes & Criatividade', examples: ['Design Gráfico', 'Arquitetura', 'Cinema', 'Moda', 'Publicidade'], icon: 'mdi:palette-outline', color: 'text-purple-400' },
  educacao: { name: 'Educação & Social', examples: ['Pedagogia', 'Serviço Social', 'Assistência Social', 'Letras'], icon: 'mdi:school-outline', color: 'text-green-400' },
  engenharia: { name: 'Engenharia & Ciências', examples: ['Engenharia Civil', 'Elétrica', 'Mecânica', 'Química', 'Física'], icon: 'mdi:cog-outline', color: 'text-orange-400' },
  comunicacao: { name: 'Comunicação & Mídia', examples: ['Jornalismo', 'Publicidade', 'Relações Públicas', 'Produção Cultural'], icon: 'mdi:microphone-outline', color: 'text-pink-400' },
  empreendedorismo: { name: 'Empreendedorismo & Inovação', examples: ['Startups', 'Gestão de Produtos', 'Consultoria', 'Investimentos'], icon: 'mdi:rocket-launch-outline', color: 'text-emerald-400' },
  direito: { name: 'Direito & Humanidades', examples: ['Direito', 'Relações Internacionais', 'Ciências Políticas'], icon: 'mdi:scale-balance', color: 'text-indigo-400' },
  financas: { name: 'Finanças & Economia', examples: ['Economia', 'Finanças', 'Contabilidade', 'Atuária'], icon: 'mdi:currency-brl', color: 'text-cyan-400' },
  gestao: { name: 'Gestão & Liderança', examples: ['Gestão de Empresas', 'RH', 'Logística', 'Projetos'], icon: 'mdi:account-group-outline', color: 'text-amber-400' },
  ciencias: { name: 'Ciências & Pesquisa', examples: ['Biologia', 'Química', 'Física', 'Matemática', 'Biotecnologia'], icon: 'mdi:flask-outline', color: 'text-teal-400' },
  humanidades: { name: 'Ciências Humanas', examples: ['Filosofia', 'História', 'Sociologia', 'Antropologia'], icon: 'mdi:book-open-outline', color: 'text-violet-400' },
  marketing: { name: 'Marketing & Vendas', examples: ['Marketing Digital', 'Vendas', 'E-commerce', 'Growth Hacking'], icon: 'mdi:trending-up', color: 'text-rose-400' },
  assistencia: { name: 'Assistência & Cuidado', examples: ['Medicina', 'Serviço Social', 'Assistência Médica'], icon: 'mdi:hand-heart-outline', color: 'text-pink-300' },
}

const currentQ = ref(0)
const answers = ref<number[]>([])
const showResult = ref(false)

function selectOption(optIdx: number) {
  answers.value[currentQ.value] = optIdx
}

function next() {
  if (currentQ.value < questions.length - 1) currentQ.value++
  else showResult.value = true
}

function prev() {
  if (currentQ.value > 0) currentQ.value--
}

function restart() {
  currentQ.value = 0
  answers.value = []
  showResult.value = false
}

const topAreas = computed(() => {
  if (!showResult.value) return []
  const scores: Record<string, number> = {}
  answers.value.forEach((optIdx, qIdx) => {
    const opt = questions[qIdx]?.options[optIdx]
    if (!opt) return
    opt.areas.forEach(area => { scores[area] = (scores[area] ?? 0) + 1 })
  })
  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([area, score]) => ({ area, score, info: areaLabels[area] }))
    .filter(r => r.info)
})

const progress = computed(() => ((currentQ.value + 1) / questions.length) * 100)
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:compass-outline" class="text-blue-400 w-7 h-7" />
        Teste Vocacional
      </h1>
      <p class="text-blue-300/70 text-sm">Descubra sua vocação profissional</p>
    </div>

    <!-- Quiz -->
    <div v-if="!showResult" class="max-w-xl mx-auto space-y-4">
      <!-- Progress -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4">
        <div class="flex justify-between text-xs text-blue-300/70 mb-2">
          <span>Pergunta {{ currentQ + 1 }} de {{ questions.length }}</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full bg-white/10 rounded-full h-2">
          <div class="bg-blue-500 h-2 rounded-full transition-all" :style="`width: ${progress}%`" />
        </div>
      </div>

      <!-- Question Card -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-6 space-y-4">
        <h2 class="text-white font-semibold">{{ questions[currentQ].text }}</h2>
        <div class="space-y-2">
          <label v-for="(opt, idx) in questions[currentQ].options" :key="idx"
            class="flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all"
            :class="answers[currentQ] === idx
              ? 'border-blue-500 bg-blue-600/20'
              : 'border-white/10 hover:border-blue-400/50 hover:bg-white/5'"
          >
            <input type="radio" :name="`q${currentQ}`" :value="idx"
              :checked="answers[currentQ] === idx"
              @change="selectOption(idx)" class="sr-only" />
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
              :class="answers[currentQ] === idx ? 'border-blue-400 bg-blue-500' : 'border-white/30'">
              <div v-if="answers[currentQ] === idx" class="w-2 h-2 rounded-full bg-white" />
            </div>
            <span class="text-blue-100 text-sm leading-relaxed">{{ opt.label }}</span>
          </label>
        </div>

        <div class="flex justify-between pt-2">
          <button @click="prev" :disabled="currentQ === 0"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-blue-200 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors">
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Anterior
          </button>
          <button @click="next" :disabled="answers[currentQ] === undefined"
            class="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg text-sm transition-colors">
            {{ currentQ === questions.length - 1 ? 'Ver Resultado' : 'Próxima' }}
            <Icon icon="mdi:arrow-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="showResult" class="max-w-xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-blue-500/30 rounded-xl p-6 text-center">
        <Icon icon="mdi:star-circle-outline" class="w-14 h-14 mx-auto mb-3 text-blue-400" />
        <h2 class="text-xl font-bold text-white mb-2">Suas áreas de maior afinidade</h2>
        <p class="text-blue-300/70 text-sm">Com base nas suas respostas, você tem maior compatibilidade com:</p>
      </div>

      <div v-for="(item, rank) in topAreas" :key="item.area"
        class="bg-[#111d3a] border rounded-xl p-5 transition-all"
        :class="rank === 0 ? 'border-blue-500/50' : 'border-white/10'"
      >
        <div class="flex items-center gap-3 mb-3">
          <div v-if="rank === 0" class="text-yellow-400 text-xs font-bold bg-yellow-400/20 px-2 py-0.5 rounded-full">🥇 1ª opção</div>
          <div v-else-if="rank === 1" class="text-blue-300/60 text-xs font-medium">🥈 2ª opção</div>
          <div v-else class="text-blue-300/60 text-xs font-medium">🥉 3ª opção</div>
        </div>
        <div class="flex items-center gap-3 mb-3">
          <Icon :icon="item.info.icon" :class="`w-7 h-7 ${item.info.color}`" />
          <span class="text-white font-semibold">{{ item.info.name }}</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <span v-for="ex in item.info.examples" :key="ex"
            class="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-blue-200">
            {{ ex }}
          </span>
        </div>
      </div>

      <div class="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-xs text-blue-300 text-center">
        Este teste é uma orientação inicial. Converse com orientadores e pesquise profundamente cada área antes de decidir.
      </div>

      <button @click="restart"
        class="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
        <Icon icon="mdi:refresh" class="w-4 h-4" />
        Refazer o Teste
      </button>
    </div>
  </div>
</template>

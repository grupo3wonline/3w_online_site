<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

type TestType = null | 'mbti' | 'disc' | 'enneagram'

interface Question {
  text: string
  options: { label: string; value: string }[]
}

const selectedTest = ref<TestType>(null)
const currentQ = ref(0)
const answers = ref<string[]>([])
const showResult = ref(false)

// --- MBTI Mini Test (8 questions) ---
const mbtiQuestions: Question[] = [
  { text: 'Como você prefere recuperar energia?', options: [
    { label: 'Estar com outras pessoas (grupos, festas)', value: 'E' },
    { label: 'Estar sozinho ou com poucos amigos', value: 'I' },
  ]},
  { text: 'Como você absorve informações?', options: [
    { label: 'Através de fatos concretos e detalhes práticos', value: 'S' },
    { label: 'Através de padrões, teorias e possibilidades', value: 'N' },
  ]},
  { text: 'Como você toma decisões?', options: [
    { label: 'Com base em lógica e objetividade', value: 'T' },
    { label: 'Com base em valores e sentimentos', value: 'F' },
  ]},
  { text: 'Como você lida com o dia a dia?', options: [
    { label: 'Prefiro planejamento, estrutura e decisões claras', value: 'J' },
    { label: 'Prefiro flexibilidade, espontaneidade e opções abertas', value: 'P' },
  ]},
  { text: 'Em grupos, você costuma:', options: [
    { label: 'Ser um dos primeiros a falar e compartilhar ideias', value: 'E' },
    { label: 'Ouvir primeiro antes de contribuir', value: 'I' },
  ]},
  { text: 'Ao planejar férias, você prefere:', options: [
    { label: 'Um roteiro detalhado com tudo organizado', value: 'J' },
    { label: 'Deixar em aberto e decidir na hora', value: 'P' },
  ]},
  { text: 'Quando resolve problemas, você confia mais em:', options: [
    { label: 'Experiências passadas e métodos comprovados', value: 'S' },
    { label: 'Intuição e novas abordagens criativas', value: 'N' },
  ]},
  { text: 'Ao ajudar alguém, você prioriza:', options: [
    { label: 'Dar um conselho prático e racional', value: 'T' },
    { label: 'Oferecer apoio emocional e empatia', value: 'F' },
  ]},
]

const mbtiTypes: Record<string, { name: string; desc: string; icon: string }> = {
  INTJ: { name: 'INTJ — O Arquiteto', desc: 'Estrategista visionário, independente e determinado. Exige alto desempenho de si e dos outros.', icon: 'mdi:chess-king' },
  INTP: { name: 'INTP — O Lógico', desc: 'Pensador inventivo com sede de conhecimento. Ama teorias e padrões complexos.', icon: 'mdi:atom-variant' },
  ENTJ: { name: 'ENTJ — O Comandante', desc: 'Líder nato, audacioso e forte. Enxerga o caminho e arrasta outros consigo.', icon: 'mdi:crown-outline' },
  ENTP: { name: 'ENTP — O Debatedor', desc: 'Espírito desafiador que adora debates intelectuais e novas ideias.', icon: 'mdi:lightbulb-on-outline' },
  INFJ: { name: 'INFJ — O Advogado', desc: 'Idealista reservado com grande empatia. Busca significado profundo em tudo.', icon: 'mdi:heart-outline' },
  INFP: { name: 'INFP — O Mediador', desc: 'Idealista poético e empático, guiado por valores profundos e criatividade.', icon: 'mdi:feather' },
  ENFJ: { name: 'ENFJ — O Protagonista', desc: 'Líder carismático que inspira e ajuda os outros a crescer.', icon: 'mdi:account-star-outline' },
  ENFP: { name: 'ENFP — O Ativista', desc: 'Espírito livre, criativo e sociável. Vê a vida como cheia de possibilidades.', icon: 'mdi:fire' },
  ISTJ: { name: 'ISTJ — O Inspetor', desc: 'Responsável e metódico. Respeita regras e cumpre compromissos.', icon: 'mdi:shield-check-outline' },
  ISFJ: { name: 'ISFJ — O Defensor', desc: 'Protetor dedicado. Trabalha silenciosamente para apoiar quem ama.', icon: 'mdi:heart-multiple-outline' },
  ESTJ: { name: 'ESTJ — O Executivo', desc: 'Organizador eficiente. Acredita em lei, ordem e valores tradicionais.', icon: 'mdi:briefcase-outline' },
  ESFJ: { name: 'ESFJ — O Cônsul', desc: 'Cuidadoso e popular. Acredita em dever, harmonia e conexões.', icon: 'mdi:account-group-outline' },
  ISTP: { name: 'ISTP — O Virtuoso', desc: 'Mestre em ferramentas e mecânica. Prático, reservado e observador.', icon: 'mdi:tools' },
  ISFP: { name: 'ISFP — O Aventureiro', desc: 'Artista sensível e aberto. Vive intensamente o momento presente.', icon: 'mdi:palette-outline' },
  ESTP: { name: 'ESTP — O Empreendedor', desc: 'Esperto e enérgico. Age primeiro, pensa depois. Adora resolver crises.', icon: 'mdi:lightning-bolt-outline' },
  ESFP: { name: 'ESFP — O Animador', desc: 'Espontâneo e entusiasmado. Faz tudo mais divertido para todos.', icon: 'mdi:star-outline' },
}

function computeMBTI(): string {
  const count: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
  answers.value.forEach(a => { if (a in count) count[a]++ })
  return [
    count.E >= count.I ? 'E' : 'I',
    count.S >= count.N ? 'S' : 'N',
    count.T >= count.F ? 'T' : 'F',
    count.J >= count.P ? 'J' : 'P',
  ].join('')
}

const result = computed(() => {
  if (!showResult.value) return null
  const type = computeMBTI()
  return mbtiTypes[type] ?? { name: `Tipo ${type}`, desc: 'Perfil único — continue explorando!', icon: 'mdi:brain' }
})

function selectAnswer(val: string) {
  answers.value[currentQ.value] = val
}

function next() {
  if (currentQ.value < mbtiQuestions.length - 1) currentQ.value++
  else showResult.value = true
}

function prev() {
  if (currentQ.value > 0) currentQ.value--
}

function startTest(type: TestType) {
  selectedTest.value = type
  currentQ.value = 0
  answers.value = []
  showResult.value = false
}

function reset() {
  selectedTest.value = null
  currentQ.value = 0
  answers.value = []
  showResult.value = false
}

const progress = computed(() => ((currentQ.value + 1) / mbtiQuestions.length) * 100)

const availableTests = [
  { id: 'mbti', name: 'MBTI — 16 Personalidades', desc: 'Descubra seu tipo entre as 16 personalidades MBTI', icon: 'mdi:compass-outline', color: 'violet', questions: 8, duration: '5 min' },
  { id: 'disc', name: 'DISC Comportamental', desc: 'Mapeie seu perfil entre Dominante, Influente, Estável e Cauteloso', icon: 'mdi:chart-pie', color: 'blue', questions: 8, duration: '5 min' },
  { id: 'enneagram', name: 'Eneagrama Básico', desc: 'Descubra qual dos 9 tipos de personalidade é o seu', icon: 'mdi:star-david', color: 'indigo', questions: 8, duration: '5 min' },
]
</script>

<template>
  <div class="bg-[#0a1628] text-white min-h-screen p-4 md:p-6">
    <!-- Header -->
    <div class="text-center mb-6">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:brain" class="text-violet-400 w-7 h-7" />
        Teste de Personalidade
      </h1>
      <p class="text-blue-300/70 text-sm">Descubra seu perfil comportamental</p>
    </div>

    <!-- Back button -->
    <div v-if="selectedTest" class="mb-4">
      <button @click="reset" class="flex items-center gap-2 text-blue-300 hover:text-white text-sm transition-colors">
        <Icon icon="mdi:arrow-left" class="w-4 h-4" />
        Escolher outro teste
      </button>
    </div>

    <!-- Test Selector -->
    <div v-if="!selectedTest" class="max-w-2xl mx-auto space-y-4">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 text-center">
        <p class="text-blue-300 text-sm">Escolha um teste para descobrir mais sobre sua personalidade</p>
      </div>

      <button v-for="test in availableTests" :key="test.id"
        @click="startTest(test.id as TestType)"
        class="w-full bg-[#111d3a] border border-white/10 hover:border-violet-500/50 rounded-xl p-5 text-left transition-all group">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center flex-shrink-0">
            <Icon :icon="test.icon" class="w-6 h-6 text-violet-400" />
          </div>
          <div class="flex-1">
            <div class="text-white font-semibold text-sm group-hover:text-violet-300 transition-colors">{{ test.name }}</div>
            <div class="text-blue-300/60 text-xs mt-0.5">{{ test.desc }}</div>
          </div>
          <div class="text-right flex-shrink-0">
            <div class="text-blue-300/60 text-xs">{{ test.questions }} perguntas</div>
            <div class="text-blue-300/60 text-xs">~{{ test.duration }}</div>
          </div>
        </div>
      </button>
    </div>

    <!-- MBTI Test -->
    <div v-if="selectedTest === 'mbti' && !showResult" class="max-w-xl mx-auto">
      <!-- Progress -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-4 mb-4">
        <div class="flex justify-between text-xs text-blue-300/70 mb-2">
          <span>Pergunta {{ currentQ + 1 }} de {{ mbtiQuestions.length }}</span>
          <span>{{ Math.round(progress) }}%</span>
        </div>
        <div class="w-full bg-white/10 rounded-full h-2">
          <div class="bg-violet-500 h-2 rounded-full transition-all" :style="`width: ${progress}%`" />
        </div>
      </div>

      <!-- Question -->
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-6 space-y-4">
        <h2 class="text-white font-semibold">{{ mbtiQuestions[currentQ].text }}</h2>
        <div class="space-y-3">
          <label v-for="opt in mbtiQuestions[currentQ].options" :key="opt.value"
            class="flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all"
            :class="answers[currentQ] === opt.value
              ? 'border-violet-500 bg-violet-600/20'
              : 'border-white/10 hover:border-violet-400/50 hover:bg-white/5'"
          >
            <input type="radio" :name="`q${currentQ}`" :value="opt.value"
              :checked="answers[currentQ] === opt.value"
              @change="selectAnswer(opt.value)" class="sr-only" />
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors"
              :class="answers[currentQ] === opt.value ? 'border-violet-400 bg-violet-500' : 'border-white/30'">
              <div v-if="answers[currentQ] === opt.value" class="w-2 h-2 rounded-full bg-white" />
            </div>
            <span class="text-blue-100 text-sm">{{ opt.label }}</span>
          </label>
        </div>

        <div class="flex justify-between pt-2">
          <button @click="prev" :disabled="currentQ === 0"
            class="flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-blue-200 hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors">
            <Icon icon="mdi:arrow-left" class="w-4 h-4" />
            Anterior
          </button>
          <button @click="next" :disabled="!answers[currentQ]"
            class="flex items-center gap-2 px-5 py-2 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors">
            {{ currentQ === mbtiQuestions.length - 1 ? 'Ver Resultado' : 'Próxima' }}
            <Icon icon="mdi:arrow-right" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Result -->
    <div v-if="showResult && result" class="max-w-xl mx-auto">
      <div class="bg-[#111d3a] border border-violet-500/40 rounded-xl p-6 text-center space-y-4">
        <div class="w-20 h-20 rounded-full bg-violet-600/20 flex items-center justify-center mx-auto">
          <Icon :icon="result.icon" class="w-10 h-10 text-violet-400" />
        </div>
        <div>
          <h2 class="text-2xl font-bold text-white mb-2">{{ result.name }}</h2>
          <p class="text-blue-300 text-sm leading-relaxed">{{ result.desc }}</p>
        </div>
        <div class="flex gap-3 justify-center">
          <button @click="startTest('mbti')"
            class="flex items-center gap-2 px-5 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm transition-colors">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
            Refazer
          </button>
          <button @click="reset"
            class="flex items-center gap-2 px-5 py-2 border border-white/20 hover:bg-white/5 rounded-lg text-sm transition-colors">
            Outros Testes
          </button>
        </div>
      </div>
    </div>

    <!-- DISC / Enneagram Placeholders -->
    <div v-if="(selectedTest === 'disc' || selectedTest === 'enneagram') && !showResult"
      class="max-w-xl mx-auto">
      <div class="bg-[#111d3a] border border-white/10 rounded-xl p-8 text-center space-y-4">
        <Icon icon="mdi:tools" class="w-12 h-12 mx-auto text-violet-400" />
        <h2 class="text-white font-semibold">{{ selectedTest === 'disc' ? 'DISC Comportamental' : 'Eneagrama' }}</h2>
        <p class="text-blue-300 text-sm">Este teste está sendo desenvolvido e estará disponível em breve.</p>
        <p class="text-blue-300/50 text-xs">Enquanto isso, experimente o teste MBTI!</p>
        <div class="flex gap-3 justify-center pt-2">
          <button @click="startTest('mbti')"
            class="px-5 py-2 bg-violet-600 hover:bg-violet-500 rounded-lg text-sm transition-colors">
            Fazer Teste MBTI
          </button>
          <button @click="reset"
            class="px-5 py-2 border border-white/20 hover:bg-white/5 rounded-lg text-sm transition-colors">
            Voltar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const sampleTexts = [
  'O rápido desenvolvimento da tecnologia moderna transformou completamente nossa maneira de viver, trabalhar e nos comunicarmos uns com os outros.',
  'A prática constante da digitação é fundamental para aumentar a velocidade e a precisão na escrita digital. Treinar todos os dias traz resultados.',
  'Dominar o teclado permite maior produtividade no trabalho e facilita a expressão de ideias através da escrita eficiente e rápida.',
  'A concentração e a paciência são qualidades essenciais para o aprendizado eficaz da digitação rápida e precisa em qualquer idioma.',
]

const durations = [
  { value: 30, label: '30s' },
  { value: 60, label: '1 min' },
  { value: 120, label: '2 min' },
  { value: 300, label: '5 min' },
]

const testDuration = ref(60)
const timeLeft = ref(60)
const isActive = ref(false)
const isComplete = ref(false)
const currentText = ref(sampleTexts[0])
const typedText = ref('')
const errors = ref(0)
const intervalId = ref<ReturnType<typeof setInterval> | null>(null)

const wpm = computed(() => {
  const elapsed = (testDuration.value - timeLeft.value) / 60
  if (elapsed <= 0) return 0
  return Math.round((typedText.value.length / 5) / elapsed)
})

const accuracy = computed(() => {
  if (!typedText.value.length) return 100
  return Math.max(0, Math.round(((typedText.value.length - errors.value) / typedText.value.length) * 100))
})

const progress = computed(() => ((testDuration.value - timeLeft.value) / testDuration.value) * 100)

const timeDisplay = computed(() => {
  const m = Math.floor(timeLeft.value / 60)
  const s = timeLeft.value % 60
  return `${m}:${s.toString().padStart(2, '0')}`
})

function startTimer() {
  if (intervalId.value) return
  intervalId.value = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      stopTimer()
      isActive.value = false
      isComplete.value = true
    }
  }, 1000)
}

function stopTimer() {
  if (intervalId.value) { clearInterval(intervalId.value); intervalId.value = null }
}

function handleInput(e: Event) {
  const val = (e.target as HTMLTextAreaElement).value
  if (!isActive.value && !isComplete.value) {
    isActive.value = true
    startTimer()
  }
  typedText.value = val
  let err = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i] !== currentText.value[i]) err++
  }
  errors.value = err
}

function togglePause() {
  if (isComplete.value) return
  isActive.value = !isActive.value
  if (isActive.value) startTimer()
  else stopTimer()
}

function resetTest() {
  stopTimer()
  isActive.value = false
  isComplete.value = false
  timeLeft.value = testDuration.value
  typedText.value = ''
  errors.value = 0
  currentText.value = sampleTexts[Math.floor(Math.random() * sampleTexts.length)]
}

function changeDuration(d: number) {
  if (isActive.value) return
  testDuration.value = d
  timeLeft.value = d
}

watch(testDuration, resetTest)

onUnmounted(stopTimer)

type CharClass = 'correct' | 'incorrect' | 'current' | 'pending'
function charClass(index: number): CharClass {
  if (index < typedText.value.length) {
    return typedText.value[index] === currentText.value[index] ? 'correct' : 'incorrect'
  }
  if (index === typedText.value.length) return 'current'
  return 'pending'
}

function wpmLabel(w: number) {
  if (w >= 40) return { text: 'Excelente!', cls: 'text-green-400' }
  if (w >= 25) return { text: 'Bom', cls: 'text-yellow-400' }
  return { text: 'Continue praticando', cls: 'text-orange-400' }
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-6">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:keyboard-outline" class="text-blue-400 w-7 h-7" />
        Digitador — Teste de Velocidade
      </h1>
      <p class="text-blue-200 text-sm">Meça sua velocidade e precisão na digitação</p>
    </div>

    <!-- Controls -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <!-- Duration selection -->
        <div class="flex gap-2">
          <button v-for="d in durations" :key="d.value"
            @click="changeDuration(d.value)"
            :disabled="isActive"
            :class="testDuration === d.value ? 'bg-blue-600 text-white' : 'bg-white/5 text-blue-300 hover:text-white border border-white/10'"
            class="px-4 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50">
            {{ d.label }}
          </button>
        </div>

        <div class="flex gap-2">
          <button @click="togglePause"
            :disabled="!typedText.length || isComplete"
            class="p-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg transition-colors disabled:opacity-40">
            <Icon :icon="isActive ? 'mdi:pause' : 'mdi:play'" class="w-4 h-4" />
          </button>
          <button @click="resetTest"
            class="p-2 bg-white/5 hover:bg-white/10 text-blue-300 hover:text-white border border-white/10 rounded-lg transition-colors">
            <Icon icon="mdi:refresh" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="stat in [
        { icon: 'mdi:speedometer', value: wpm, label: 'PPM', cls: 'text-blue-400' },
        { icon: 'mdi:target', value: accuracy + '%', label: 'Precisão', cls: 'text-green-400' },
        { icon: 'mdi:timer-outline', value: timeDisplay, label: 'Tempo', cls: 'text-yellow-400' },
        { icon: 'mdi:close-circle-outline', value: errors, label: 'Erros', cls: 'text-red-400' },
      ]" :key="stat.label"
        class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 text-center">
        <Icon :icon="stat.icon" class="w-7 h-7 mx-auto mb-2" :class="stat.cls" />
        <div class="text-2xl font-bold text-white">{{ stat.value }}</div>
        <div class="text-blue-300 text-xs">{{ stat.label }}</div>
      </div>
    </div>

    <!-- Progress bar -->
    <div class="space-y-1">
      <div class="flex justify-between text-xs text-blue-300">
        <span>Progresso do Teste</span>
        <span>{{ Math.round(progress) }}%</span>
      </div>
      <div class="w-full bg-white/10 rounded-full h-2">
        <div class="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
          :style="{ width: progress + '%' }" />
      </div>
    </div>

    <!-- Text display -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
      <h2 class="text-white font-semibold text-sm">Texto para Digitação</h2>
      <div class="p-4 bg-[#0a1628] rounded-lg leading-relaxed text-base font-mono tracking-wide">
        <span v-for="(char, i) in currentText" :key="i"
          :class="{
            'text-green-400': charClass(i) === 'correct',
            'bg-red-500/40 text-red-300': charClass(i) === 'incorrect',
            'bg-blue-500/30 text-white': charClass(i) === 'current',
            'text-blue-300/50': charClass(i) === 'pending',
          }">{{ char }}</span>
      </div>
    </div>

    <!-- Typing area -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-3">
      <h2 class="text-white font-semibold text-sm">Digite Aqui</h2>
      <textarea
        :value="typedText"
        @input="handleInput"
        :disabled="isComplete"
        placeholder="Comece a digitar para iniciar o teste..."
        class="w-full h-28 bg-[#0a1628] text-white placeholder-blue-300/40 border border-white/10 rounded-lg p-3 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60"
      ></textarea>
    </div>

    <!-- Results -->
    <div v-if="isComplete" class="bg-green-900/20 border border-green-500/20 rounded-xl p-6 space-y-4">
      <h2 class="text-green-400 font-bold text-lg flex items-center gap-2">
        <Icon icon="mdi:trophy-outline" class="w-6 h-6" />
        Teste Concluído!
      </h2>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="space-y-2 text-sm">
          <p class="text-blue-200">Velocidade: <span class="text-white font-semibold">{{ wpm }} PPM</span></p>
          <p class="text-blue-200">Precisão: <span class="text-white font-semibold">{{ accuracy }}%</span></p>
          <p class="text-blue-200">Erros: <span class="text-white font-semibold">{{ errors }}</span></p>
          <p class="text-blue-200">Caracteres: <span class="text-white font-semibold">{{ typedText.length }}</span></p>
        </div>
        <div class="space-y-2">
          <span :class="wpmLabel(wpm).cls" class="text-sm font-semibold">{{ wpmLabel(wpm).text }}</span>
          <div>
            <span v-if="accuracy >= 95" class="inline-block bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full mr-1">Precisão Excelente!</span>
            <span v-else-if="accuracy >= 85" class="inline-block bg-yellow-500/20 text-yellow-400 text-xs px-2 py-1 rounded-full mr-1">Boa Precisão</span>
            <span v-else class="inline-block bg-red-500/20 text-red-400 text-xs px-2 py-1 rounded-full mr-1">Foque na Precisão</span>
          </div>
        </div>
      </div>
      <button @click="resetTest"
        class="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm">
        <Icon icon="mdi:refresh" class="w-4 h-4" />
        Fazer Novo Teste
      </button>
    </div>
  </div>
</template>

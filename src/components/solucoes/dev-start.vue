<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

type View = 'editor' | 'exercicios' | 'fluxograma'
const activeView = ref<View>('editor')
const code = ref(`// DevStart Academy — Editor de Código\n// Aprenda programação de forma interativa!\n\nfunction saudacao(nome) {\n  return "Olá, " + nome + "! Bem-vindo ao DevStart!"\n}\n\nconsole.log(saudacao("Estudante"))\n\n// Desafio: crie uma função que soma dois números\n`)
const output = ref<string[]>([])
const desafioIndex = ref(0)
const respostas = ref<Record<number, boolean>>({})
const notification = ref('')

const desafios = [
  { titulo: 'Variáveis', descricao: 'Declare uma variável chamada "nome" com seu nome.', dica: 'Use: let nome = "SeuNome"', esperado: /let\s+nome\s*=\s*["'].+["']/ },
  { titulo: 'Função Soma', descricao: 'Crie uma função chamada "soma" que recebe dois números e retorna a soma.', dica: 'Use: function soma(a, b) { return a + b }', esperado: /function\s+soma\s*\(/ },
  { titulo: 'Loop', descricao: 'Crie um loop que imprime os números de 1 a 5.', dica: 'Use: for (let i = 1; i <= 5; i++) { console.log(i) }', esperado: /for\s*\(/ },
  { titulo: 'Array', descricao: 'Crie um array chamado "frutas" com 3 frutas.', dica: 'Use: const frutas = ["maçã", "banana", "laranja"]', esperado: /const\s+frutas\s*=\s*\[/ },
  { titulo: 'Objeto', descricao: 'Crie um objeto chamado "pessoa" com nome e idade.', dica: 'Use: const pessoa = { nome: "Ana", idade: 25 }', esperado: /const\s+pessoa\s*=\s*\{/ },
]

const desafioAtual = computed(() => desafios[desafioIndex.value])

const progresso = computed(() => {
  const resolvidos = Object.values(respostas.value).filter(Boolean).length
  return Math.round((resolvidos / desafios.length) * 100)
})

const fluxograma = [
  { id: 1, tipo: 'inicio', label: 'INÍCIO', color: 'bg-green-600' },
  { id: 2, tipo: 'processo', label: 'Receber dados', color: 'bg-blue-600' },
  { id: 3, tipo: 'decisao', label: 'Dados válidos?', color: 'bg-yellow-600' },
  { id: 4, tipo: 'processo', label: 'Processar dados', color: 'bg-blue-600' },
  { id: 5, tipo: 'saida', label: 'Exibir resultado', color: 'bg-purple-600' },
  { id: 6, tipo: 'fim', label: 'FIM', color: 'bg-red-600' },
]

function runCode() {
  output.value = []
  const logs: string[] = []
  const fakeConsole = { log: (...args: unknown[]) => logs.push(args.map(String).join(' ')) }
  try {
    const fn = new Function('console', code.value)
    fn(fakeConsole)
    output.value = logs.length ? logs : ['(sem saída)']
  } catch (e) {
    output.value = [`❌ Erro: ${(e as Error).message}`]
  }
}

function verificarDesafio() {
  const ok = desafioAtual.value.esperado.test(code.value)
  respostas.value[desafioIndex.value] = ok
  notification.value = ok ? '✅ Desafio concluído!' : '❌ Tente novamente. Leia a dica!'
  setTimeout(() => { notification.value = '' }, 2500)
}

function proximoDesafio() {
  if (desafioIndex.value < desafios.length - 1) desafioIndex.value++
}

function anteriorDesafio() {
  if (desafioIndex.value > 0) desafioIndex.value--
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-5">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:school" class="text-green-400 w-7 h-7" />
        DevStart Academy
      </h1>
      <p class="text-blue-200 text-sm">Aprenda programação de forma interativa e gamificada</p>
    </div>

    <!-- View tabs -->
    <div class="flex gap-2">
      <button v-for="v in [{ id: 'editor', label: 'Editor', icon: 'mdi:code-braces' }, { id: 'exercicios', label: 'Exercícios', icon: 'mdi:trophy' }, { id: 'fluxograma', label: 'Fluxograma', icon: 'mdi:chart-timeline-variant' }] as const"
        :key="v.id" @click="activeView = v.id"
        :class="['flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all border',
          activeView === v.id ? 'bg-green-600 border-green-500 text-white' : 'bg-[#0f1e3c] border-white/10 text-blue-200 hover:bg-white/10']">
        <Icon :icon="v.icon" class="w-4 h-4" />{{ v.label }}
      </button>
    </div>

    <!-- Editor view -->
    <div v-if="activeView === 'editor'" class="grid lg:grid-cols-2 gap-4">
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
        <div class="flex items-center justify-between">
          <h2 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:javascript" class="text-yellow-400 w-5 h-5" /> Editor JavaScript
          </h2>
          <button @click="runCode" class="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-1.5 transition-colors">
            <Icon icon="mdi:play" class="w-4 h-4" /> Executar
          </button>
        </div>
        <textarea v-model="code" spellcheck="false" rows="14"
          class="w-full bg-gray-950 text-gray-100 font-mono text-sm p-3 rounded-lg border border-white/10 resize-none outline-none focus:ring-2 focus:ring-green-500/50" />
      </div>
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
        <h2 class="text-white font-semibold flex items-center gap-2">
          <Icon icon="mdi:console" class="text-green-400 w-5 h-5" /> Console
        </h2>
        <div class="bg-gray-950 rounded-lg p-3 min-h-[200px] font-mono text-sm">
          <div v-if="!output.length" class="text-gray-500">Execute o código para ver a saída...</div>
          <div v-for="(l, i) in output" :key="i" :class="['mb-1', l.startsWith('❌') ? 'text-red-400' : 'text-green-300']">
            &gt; {{ l }}
          </div>
        </div>
        <div class="bg-blue-900/30 border border-blue-500/30 rounded-lg p-3">
          <p class="text-blue-200 text-xs font-semibold mb-1">💡 Dica de programação:</p>
          <p class="text-blue-300 text-xs">Use <code class="bg-blue-900/50 px-1 rounded">console.log()</code> para imprimir valores. Experimente declarar variáveis com <code class="bg-blue-900/50 px-1 rounded">let</code> ou <code class="bg-blue-900/50 px-1 rounded">const</code>.</p>
        </div>
      </div>
    </div>

    <!-- Exercícios view -->
    <div v-if="activeView === 'exercicios'" class="space-y-4">
      <!-- Progresso -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-white text-sm font-semibold">Progresso</span>
          <span class="text-green-400 text-sm font-bold">{{ progresso }}%</span>
        </div>
        <div class="h-2 bg-gray-700 rounded-full"><div class="h-2 bg-green-500 rounded-full transition-all" :style="{ width: progresso + '%' }"></div></div>
      </div>

      <div class="grid lg:grid-cols-2 gap-4">
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5 space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="bg-green-600 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center">{{ desafioIndex + 1 }}</div>
              <h2 class="text-white font-semibold">{{ desafioAtual.titulo }}</h2>
              <Icon v-if="respostas[desafioIndex]" icon="mdi:check-circle" class="text-green-400 w-5 h-5" />
            </div>
            <div class="flex gap-1">
              <button @click="anteriorDesafio" :disabled="desafioIndex === 0" class="p-1.5 rounded text-gray-400 hover:text-white disabled:opacity-30 transition-colors">
                <Icon icon="mdi:chevron-left" class="w-5 h-5" />
              </button>
              <button @click="proximoDesafio" :disabled="desafioIndex === desafios.length - 1" class="p-1.5 rounded text-gray-400 hover:text-white disabled:opacity-30 transition-colors">
                <Icon icon="mdi:chevron-right" class="w-5 h-5" />
              </button>
            </div>
          </div>
          <p class="text-blue-200">{{ desafioAtual.descricao }}</p>
          <div class="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-3">
            <p class="text-yellow-300 text-xs font-semibold mb-1">💡 Dica:</p>
            <code class="text-yellow-200 text-xs">{{ desafioAtual.dica }}</code>
          </div>
          <button @click="verificarDesafio" class="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2">
            <Icon icon="mdi:check" class="w-4 h-4" /> Verificar resposta
          </button>
        </div>
        <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-4 space-y-3">
          <h3 class="text-white font-semibold flex items-center gap-2">
            <Icon icon="mdi:pencil" class="text-green-400 w-5 h-5" /> Sua resposta
          </h3>
          <textarea v-model="code" spellcheck="false" rows="10"
            class="w-full bg-gray-950 text-gray-100 font-mono text-sm p-3 rounded-lg border border-white/10 resize-none outline-none focus:ring-2 focus:ring-green-500/50" />
          <button @click="runCode" class="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors">
            <Icon icon="mdi:play" class="w-4 h-4" /> Executar
          </button>
        </div>
      </div>

      <!-- Lista de desafios -->
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-2">
        <button v-for="(d, i) in desafios" :key="i" @click="desafioIndex = i"
          :class="['p-3 rounded-lg border text-xs font-medium text-center transition-all',
            i === desafioIndex ? 'border-green-500 bg-green-600/20 text-green-300' :
            respostas[i] ? 'border-green-500/50 bg-green-900/20 text-green-400' : 'border-white/10 bg-[#0f1e3c] text-blue-200 hover:bg-white/10']">
          <Icon :icon="respostas[i] ? 'mdi:check-circle' : 'mdi:circle-outline'" class="w-4 h-4 mx-auto mb-1" />
          {{ d.titulo }}
        </button>
      </div>
    </div>

    <!-- Fluxograma view -->
    <div v-if="activeView === 'fluxograma'" class="bg-[#0f1e3c] border border-white/10 rounded-xl p-5">
      <h2 class="text-white font-semibold mb-4 flex items-center gap-2">
        <Icon icon="mdi:chart-timeline-variant" class="text-blue-400 w-5 h-5" /> Lógica de Fluxo
      </h2>
      <div class="flex flex-col items-center gap-3">
        <div v-for="(node, i) in fluxograma" :key="node.id" class="flex flex-col items-center">
          <div :class="[node.color, 'text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg', node.tipo === 'decisao' ? 'transform rotate-0 border-2 border-white/30' : '']">
            {{ node.tipo === 'decisao' ? '◇ ' : '' }}{{ node.label }}
          </div>
          <div v-if="i < fluxograma.length - 1" class="flex flex-col items-center">
            <div class="w-0.5 h-6 bg-gray-500"></div>
            <Icon icon="mdi:chevron-down" class="text-gray-400 w-4 h-4 -mt-1" />
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="fade">
      <div v-if="notification" :class="['fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg', notification.startsWith('✅') ? 'bg-green-600' : 'bg-red-600']">
        {{ notification }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

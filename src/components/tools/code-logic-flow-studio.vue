<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'

const code = ref(`algoritmo "Exemplo Simples"
var
    nome
inicio
    escreva("Bem-vindo ao CodeLogic!")
    escreva("Qual é o seu nome?")
    leia(nome)
    
    se (nome == "") entao
        escreva("Você não digitou um nome :(")
    senao
        escreva("Olá, " + nome + "! Vamos programar.")
    fimse
fimalgoritmo`)

const logs = ref<{ message: string; type: 'normal' | 'error' | 'system' | 'output' }[]>([
  { message: 'CodeLogic Flow Studio iniciado. Clique em Executar para rodar seu código.', type: 'system' },
])

const isRunning = ref(false)
const currentTab = ref<'code' | 'help'>('code')

// Simple pseudo-code interpreter
async function runCode() {
  isRunning.value = true
  logs.value = []
  addLog('Compilando e executando...', 'system')

  const lines = code.value.split('\n')
  const variables: Record<string, string> = {}
  let inAlgo = false
  let inVar = false
  let started = false

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i].trim()
    if (!raw) continue

    if (raw.toLowerCase().startsWith('algoritmo')) { inAlgo = true; continue }
    if (raw.toLowerCase() === 'var') { inVar = true; continue }
    if (raw.toLowerCase() === 'inicio') { inVar = false; started = true; continue }
    if (raw.toLowerCase().startsWith('fimalgoritmo')) { addLog('Execução finalizada.', 'system'); break }

    if (inVar) {
      const varName = raw.replace(/,/g, '').trim()
      if (varName) variables[varName] = ''
      continue
    }

    if (!started) continue

    // escreva
    if (/^escreva\s*\(/i.test(raw)) {
      const content = raw.replace(/^escreva\s*\(/i, '').replace(/\)\s*$/, '')
      let output = content.replace(/"/g, '')
      for (const [k, v] of Object.entries(variables)) {
        output = output.replace(new RegExp(`\\b${k}\\b`, 'g'), v || `[${k}]`)
      }
      output = output.replace(/\s*\+\s*/g, '').replace(/\[\w+\]/g, s => variables[s.slice(1, -1)] || s)
      addLog(output, 'output')
      continue
    }

    // leia
    if (/^leia\s*\(/i.test(raw)) {
      const varName = raw.replace(/^leia\s*\(/i, '').replace(/\)\s*$/, '').trim()
      const { value } = await Swal.fire({
        title: 'Entrada de Dados', text: `Digite o valor para '${varName}':`,
        input: 'text', inputPlaceholder: 'Digite aqui...',
        background: '#1e293b', color: '#fff', confirmButtonColor: '#4f46e5',
        showCancelButton: false, allowOutsideClick: false,
        inputAttributes: { autocomplete: 'off' },
      })
      variables[varName] = value || ''
      continue
    }
  }
  isRunning.value = false
}

function addLog(msg: string, type: 'normal' | 'error' | 'system' | 'output' = 'normal') {
  logs.value.push({ message: msg, type })
}

function clearLogs() {
  logs.value = []
  addLog('Console limpo.', 'system')
}

function showHelp() {
  Swal.fire({
    title: 'Central de Ajuda — CodeLogic',
    width: 600,
    html: `
      <div style="text-align:left;font-size:0.875rem;line-height:1.6">
        <h4 style="margin-bottom:0.5rem;font-weight:bold">Sintaxe suportada:</h4>
        <ul style="font-family:monospace;background:#1e293b;padding:0.75rem;border-radius:0.5rem;color:#94a3b8">
          <li><span style="color:#a78bfa">algoritmo</span> "Nome" ... <span style="color:#a78bfa">fimalgoritmo</span></li>
          <li><span style="color:#60a5fa">var</span> nome_da_var</li>
          <li><span style="color:#60a5fa">inicio</span> / <span style="color:#60a5fa">fim</span></li>
          <li><span style="color:#34d399">escreva</span>("texto") — exibe no console</li>
          <li><span style="color:#34d399">leia</span>(variavel) — lê entrada do usuário</li>
          <li><span style="color:#fb923c">se</span> (cond) <span style="color:#fb923c">entao</span> ... <span style="color:#fb923c">senao</span> ... <span style="color:#fb923c">fimse</span></li>
        </ul>
        <p style="margin-top:0.75rem;color:#64748b">Dica: Use os exemplos no editor e modifique-os para aprender.</p>
      </div>`,
    confirmButtonText: 'Entendi!', confirmButtonColor: '#4f46e5',
    background: '#0f172a', color: '#fff',
  })
}

const examples = [
  { name: 'Olá Mundo', code: `algoritmo "Olá Mundo"\nvar\n    nome\ninicio\n    leia(nome)\n    escreva("Olá, " + nome + "!")\nfimalgoritmo` },
  { name: 'Calculadora Simples', code: `algoritmo "Calculadora"\nvar\n    a\n    b\ninicio\n    escreva("Digite o primeiro número:")\n    leia(a)\n    escreva("Digite o segundo número:")\n    leia(b)\n    escreva("Resultado: " + a)\nfimalgoritmo` },
]

function loadExample(ex: { name: string; code: string }) {
  code.value = ex.code
  Swal.fire({ icon: 'success', title: `Exemplo "${ex.name}" carregado!`, timer: 1200, showConfirmButton: false })
}

const logTypeStyle: Record<string, string> = {
  system: 'text-blue-400', error: 'text-red-400', output: 'text-green-300', normal: 'text-white',
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 space-y-4">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-white mb-1 flex items-center justify-center gap-2">
        <Icon icon="mdi:code-braces-box" class="text-indigo-400 w-7 h-7" />
        Code Logic Flow Studio
      </h1>
      <p class="text-blue-200 text-sm">Aprenda lógica de programação com pseudocódigo interativo e execução em tempo real</p>
    </div>

    <!-- Toolbar -->
    <div class="bg-[#0f1e3c] border border-white/10 rounded-xl p-3 flex flex-wrap items-center gap-2">
      <button @click="runCode" :disabled="isRunning"
        class="flex items-center gap-2 bg-green-700 hover:bg-green-600 disabled:opacity-50 text-white font-semibold px-4 py-2 rounded-lg transition-colors text-sm">
        <Icon :icon="isRunning ? 'mdi:loading' : 'mdi:play'" :class="[isRunning ? 'animate-spin' : '', 'w-4 h-4']" />
        {{ isRunning ? 'Executando...' : 'Executar' }}
      </button>
      <button @click="clearLogs" class="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors text-sm">
        <Icon icon="mdi:delete-outline" class="w-4 h-4" /> Limpar Console
      </button>
      <button @click="showHelp" class="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg transition-colors text-sm">
        <Icon icon="mdi:help-circle-outline" class="w-4 h-4" /> Ajuda
      </button>
      <div class="flex gap-2 ml-auto">
        <span class="text-blue-300 text-xs self-center">Exemplos:</span>
        <button v-for="ex in examples" :key="ex.name" @click="loadExample(ex)"
          class="bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 border border-indigo-500/30 text-xs px-2.5 py-1.5 rounded-lg transition-colors">
          {{ ex.name }}
        </button>
      </div>
    </div>

    <!-- Editor + Console -->
    <div class="grid lg:grid-cols-2 gap-4">
      <!-- Editor -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl overflow-hidden">
        <div class="flex items-center px-4 py-2 bg-black/20 border-b border-white/10">
          <Icon icon="mdi:code-tags" class="text-indigo-400 w-4 h-4 mr-2" />
          <span class="text-white text-sm font-medium">Editor de Código</span>
          <span class="ml-auto text-blue-300 text-xs">Pseudocódigo (Portugol)</span>
        </div>
        <textarea
          v-model="code"
          spellcheck="false"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          rows="22"
          class="w-full bg-transparent text-green-300 font-mono text-sm p-4 resize-none focus:outline-none leading-relaxed"
          style="tab-size: 2;"
        ></textarea>
      </div>

      <!-- Console -->
      <div class="bg-[#0f1e3c] border border-white/10 rounded-xl overflow-hidden">
        <div class="flex items-center px-4 py-2 bg-black/20 border-b border-white/10">
          <Icon icon="mdi:console" class="text-green-400 w-4 h-4 mr-2" />
          <span class="text-white text-sm font-medium">Console de Saída</span>
          <span class="ml-auto text-blue-300 text-xs">{{ logs.length }} linhas</span>
        </div>
        <div class="p-4 h-[calc(22rem)] overflow-y-auto font-mono text-sm space-y-1">
          <div v-for="(log, i) in logs" :key="i" :class="['flex gap-2', logTypeStyle[log.type] ?? 'text-white']">
            <span class="text-white/30 select-none shrink-0">></span>
            <span>{{ log.message }}</span>
          </div>
          <div v-if="isRunning" class="flex gap-2 text-yellow-400">
            <span class="text-white/30 select-none shrink-0">></span>
            <span class="animate-pulse">Aguardando entrada do usuário...</span>
          </div>
          <div v-if="!logs.length" class="text-blue-300/50 text-xs">Console limpo. Execute o código para ver a saída.</div>
        </div>
      </div>
    </div>

    <!-- Dicas -->
    <div class="bg-[#0f1e3c] border border-indigo-500/20 rounded-xl p-4">
      <h3 class="text-indigo-300 font-semibold text-sm mb-2 flex items-center gap-2">
        <Icon icon="mdi:lightbulb-outline" class="w-4 h-4" /> Dicas de Uso
      </h3>
      <div class="grid sm:grid-cols-3 gap-2 text-xs text-blue-200">
        <div class="flex items-start gap-2"><Icon icon="mdi:check-circle-outline" class="text-green-400 w-4 h-4 mt-0.5 shrink-0" /><span>Use <code class="text-green-300">escreva("texto")</code> para exibir mensagens no console</span></div>
        <div class="flex items-start gap-2"><Icon icon="mdi:check-circle-outline" class="text-green-400 w-4 h-4 mt-0.5 shrink-0" /><span>Use <code class="text-green-300">leia(variavel)</code> para receber dados do usuário</span></div>
        <div class="flex items-start gap-2"><Icon icon="mdi:check-circle-outline" class="text-green-400 w-4 h-4 mt-0.5 shrink-0" /><span>Use os exemplos para aprender a sintaxe básica</span></div>
      </div>
    </div>
  </div>
</template>

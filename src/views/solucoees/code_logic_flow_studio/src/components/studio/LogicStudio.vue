<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import Swal from 'sweetalert2'
import CodeEditor from './CodeEditor.vue'
import Flowchart from './Flowchart.vue'
import Console from './Console.vue'
import Toolbar from './Toolbar.vue'
import { Interpreter } from '@/utils/interpreter'

const code = ref(`algoritmo "Exemplo Simples"
var
    nome
inicio
    escreva("Bem-vindo ao LogicFlow!")
    escreva("Qual é o seu nome?")
    leia(nome)
    
    se (nome == "") entao
        escreva("Você não digitou um nome :(")
    senao
        escreva("Olá, " + nome + "! Vamos programar.")
    fimse
fimalgoritmo`)

const currentTab = ref('code')
const logs = ref([])
const editorRef = ref(null)
const currentTip = ref("Dica: Use 'escreva' para mostrar mensagens.")

// Interpreter
const interpreter = new Interpreter()

const runCode = async () => {
    currentTab.value = 'code' // Switch to code/console view
    logs.value = [] // Clear logs
    addLog("Compilando e executando...", "system")
    
    interpreter.setCallbacks(
        (msg, type) => addLog(msg, type),
        async (varName) => {
            const { value } = await Swal.fire({
                title: 'Entrada de Dados',
                text: `Digite o valor para '${varName}':`,
                input: 'text',
                background: '#1e293b',
                color: '#fff',
                inputPlaceholder: 'Digite aqui...',
                confirmButtonColor: '#4f46e5',
                showCancelButton: false,
                allowOutsideClick: false,
                inputAttributes: {
                    autocomplete: 'off'
                }
            })
            return value || ""
        },
        () => addLog("Execução finalizada.", "system")
    )
    
    await interpreter.run(code.value)
}

const addLog = (msg, type = 'normal') => {
    logs.value.push({ message: msg, type })
}

const clearLogs = () => {
    logs.value = []
    addLog("Console limpo.", "system")
}

const showHelp = () => {
    Swal.fire({
        title: 'Central de Ajuda CodeLogic',
        width: '600px',
        html: `
            <div class="text-left space-y-4">
                <div class="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg border border-brand-200 dark:border-brand-900/50">
                    <h3 class="font-bold text-brand-600 dark:text-brand-400 mb-1"><i class="fa-solid fa-graduation-cap"></i> Bem-vindo ao CodeLogic!</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-300">
                        Esta plataforma foi desenvolvida para ajudar iniciantes a aprender lógica de programação de forma interativa e visual.
                    </p>
                </div>

                <div>
                    <h4 class="font-bold text-slate-800 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
                        <i class="fa-solid fa-code"></i> Pseudocódigo
                    </h4>
                    <ul class="text-sm space-y-1 text-slate-600 dark:text-gray-400 font-mono bg-slate-50 dark:bg-slate-900 p-2 rounded">
                        <li><span class="text-purple-500">início</span> - Marca o início do programa</li>
                        <li><span class="text-purple-500">fim</span> - Marca o fim do programa</li>
                        <li><span class="text-blue-500">escreva</span>("texto") - Exibe texto na tela</li>
                        <li><span class="text-orange-500">variavel</span> = ler() - Lê entrada do usuário</li>
                        <li><span class="text-green-500">se</span> condição <span class="text-green-500">entao</span> ... <span class="text-green-500">fimse</span> - Condicional</li>
                        <li><span class="text-red-500">enquanto</span> condição ... <span class="text-red-500">fimenquanto</span> - Repetição</li>
                    </ul>
                </div>

                <div>
                     <h4 class="font-bold text-slate-800 dark:text-white mb-2 border-b border-gray-200 dark:border-gray-700 pb-1">
                        <i class="fa-solid fa-shapes"></i> Recursos
                    </h4>
                    <ul class="list-disc pl-5 text-sm text-slate-600 dark:text-gray-400 space-y-1">
                        <li><strong>Fluxogramas:</strong> Converta seu código para ver a lógica visualmente.</li>
                        <li><strong>Blocos:</strong> Use os botões laterais para arrastar snippets prontos.</li>
                        <li><strong>Execução:</strong> Veja o resultado em tempo real no terminal.</li>
                    </ul>
                </div>
            </div>
        `,
        icon: 'info',
        confirmButtonText: 'Entendi, vamos codar!',
        confirmButtonColor: '#4f46e5',
        background: '#fff', 
        customClass: {
            popup: 'dark:bg-slate-800 dark:text-white'
        }
    })
}

const snippets = {
    escreva: 'escreva("Olá Mundo")\n',
    leia: 'leia(variavel)\n',
    se: 'se (1 == 1) entao\n    escreva("V")\nsenao\n    escreva("F")\nfimse\n',
    enquanto: 'enquanto (x < 10) faca\n    x = x + 1\nfimenquanto\n',
    var: 'var\n    nome_variavel\n'
}

const insertSnippet = (id) => {
    const snippet = snippets[id] || ''
    if (editorRef.value) {
        editorRef.value.insertText(snippet)
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: 'Bloco adicionado!',
            showConfirmButton: false,
            timer: 1500
        })
    }
}

// Tips Logic
const tips = [
    "Dica: Use indentação para organizar seu código",
    "Lembre-se: Todo comando termina com quebra de linha",
    "Atalho: Ctrl+Enter para executar o código",
    "Converta entre formatos para visualizar de diferentes formas",
    "Use 'leia(var)' para pegar dados do usuário",
    "Experimente olhar o Fluxograma para entender o caminho dos dados"
]
let tipInterval
onMounted(() => {
    tipInterval = setInterval(() => {
        currentTip.value = "Dica: " + tips[Math.floor(Math.random() * tips.length)]
    }, 10000)
})
onUnmounted(() => {
    if (tipInterval) clearInterval(tipInterval)
})
</script>

<template>
    <div class="flex flex-col lg:flex-row h-full lg:h-[85vh] border-y border-slate-700 shadow-2xl">
        <!-- Toolbar -->
        <Toolbar @add-snippet="insertSnippet">
            <template #tip>{{ currentTip }}</template>
        </Toolbar>
        
        <!-- Main Area -->
        <main class="flex-1 flex flex-col min-w-0 bg-dark-editor relative">
            <!-- Tabs Header -->
            <div class="flex flex-wrap justify-between items-center border-b border-slate-700 bg-dark-panel p-2 z-20">
                <div class="flex">
                    <button @click="currentTab = 'code'" 
                        class="px-6 py-2 text-sm font-medium transition flex items-center gap-2 border-b-2"
                        :class="currentTab === 'code' ? 'border-brand-500 text-white bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white'">
                        <i class="fa-solid fa-code"></i> Editor
                    </button>
                    <button @click="currentTab = 'flow'" 
                        class="px-6 py-2 text-sm font-medium transition flex items-center gap-2 border-b-2"
                        :class="currentTab === 'flow' ? 'border-brand-500 text-white bg-slate-800/50' : 'border-transparent text-slate-400 hover:text-white'">
                        <i class="fa-solid fa-diagram-project"></i> Fluxograma
                    </button>
                </div>
                <div class="flex gap-2">
                    <button @click="showHelp" class="p-2 text-slate-400 hover:text-white transition" title="Ajuda">
                        <i class="fa-regular fa-circle-question text-lg"></i>
                    </button>
                    <button @click="runCode" 
                        class="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-green-900/40 transition hover:scale-105 active:scale-95">
                        <i class="fa-solid fa-play"></i> <span class="hidden sm:inline">Executar</span>
                    </button>
                </div>
            </div>
            
            <!-- Workbench -->
            <div class="flex-1 relative flex overflow-hidden">
                <CodeEditor v-show="currentTab === 'code'" v-model="code" ref="editorRef" />
                <Flowchart v-if="currentTab === 'flow'" :code="code" />
            </div>
            
            <!-- Console -->
            <Console :logs="logs" @clear="clearLogs" />
        </main>
    </div>
</template>

<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-900/30 rounded-full mb-4">
          <i class="fab fa-markdown text-slate-600 dark:text-slate-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor Markdown</h1>
        <p class="text-gray-600 dark:text-gray-400">Converta Markdown para HTML e visualize</p>
      </div>

      <div class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Markdown
            </label>
            <textarea v-model="markdown" @input="converter" rows="18" placeholder="Digite seu Markdown aqui..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-slate-500 focus:border-transparent resize-none font-mono text-sm"></textarea>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Preview HTML
              </label>
              <div class="flex gap-2">
                <button @click="visualizacao = 'preview'" class="px-3 py-1 rounded-lg text-xs font-medium transition-colors" :class="visualizacao === 'preview' ? 'bg-slate-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'">
                  Preview
                </button>
                <button @click="visualizacao = 'html'" class="px-3 py-1 rounded-lg text-xs font-medium transition-colors" :class="visualizacao === 'html' ? 'bg-slate-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'">
                  HTML
                </button>
              </div>
            </div>
            <div v-if="visualizacao === 'preview'" class="h-[464px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 overflow-auto prose dark:prose-invert max-w-none" v-html="html"></div>
            <textarea v-else v-model="html" readonly rows="18" class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white resize-none font-mono text-sm"></textarea>
          </div>
        </div>

        <div class="flex gap-3">
          <button @click="copiarHTML" class="flex-1 px-4 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors">
            <i class="fas fa-code mr-2"></i>
            Copiar HTML
          </button>
          <button @click="copiarMarkdown" class="flex-1 px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg font-medium transition-colors">
            <i class="fab fa-markdown mr-2"></i>
            Copiar Markdown
          </button>
        </div>

        <div class="bg-slate-50 dark:bg-slate-900/20 border-l-4 border-slate-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-slate-600 dark:text-slate-400 mt-1 mr-3"></i>
            <div class="text-sm text-slate-800 dark:text-slate-300">
              <p class="font-semibold mb-2">Sintaxe Markdown Suportada:</p>
              <div class="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div><span class="font-mono"># Título</span> → H1</div>
                <div><span class="font-mono">**negrito**</span> → <strong>negrito</strong></div>
                <div><span class="font-mono">## Subtítulo</span> → H2</div>
                <div><span class="font-mono">*itálico*</span> → <em>itálico</em></div>
                <div><span class="font-mono">- Lista</span> → Bullet list</div>
                <div><span class="font-mono">`código`</span> → <code>código</code></div>
                <div><span class="font-mono">1. Lista</span> → Numbered list</div>
                <div><span class="font-mono">[link](url)</span> → Link</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const markdown = ref(`# Título Principal

## Subtítulo

Este é um parágrafo com **texto em negrito** e *texto em itálico*.

### Lista não ordenada:
- Item 1
- Item 2
- Item 3

### Lista ordenada:
1. Primeiro
2. Segundo
3. Terceiro

### Link e Código:
Visite [Google](https://google.com)

\`código inline\`

\`\`\`
bloco de código
\`\`\`
`)

const html = ref('')
const visualizacao = ref('preview')

const markdownToHTML = (md) => {
  let result = md
  
  // Código em bloco
  result = result.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  
  // Títulos
  result = result.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  result = result.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  result = result.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // Negrito e itálico
  result = result.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
  result = result.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  result = result.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // Links
  result = result.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  
  // Código inline
  result = result.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // Listas não ordenadas
  result = result.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>')
  result = result.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  
  // Listas ordenadas
  result = result.replace(/^\s*\d+\.\s+(.*)$/gim, '<li>$1</li>')
  
  // Parágrafos
  result = result.replace(/^(?!<[hlu]|<pre)(.*$)/gim, '<p>$1</p>')
  
  // Limpar <p> vazios
  result = result.replace(/<p><\/p>/g, '')
  result = result.replace(/<p>(\s*)<\/p>/g, '')
  
  return result
}

const converter = () => {
  html.value = markdownToHTML(markdown.value)
  
  if (markdown.value) {
    trackToolUsage('Conversor Markdown', 'convert')
  }
}

const copiarHTML = async () => {
  try {
    await navigator.clipboard.writeText(html.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'HTML copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const copiarMarkdown = async () => {
  try {
    await navigator.clipboard.writeText(markdown.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'Markdown copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

// Conversão inicial
converter()
</script>

<style>
.prose {
  color: inherit;
}

.prose h1 {
  font-size: 2em;
  font-weight: bold;
  margin: 0.67em 0;
}

.prose h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0.75em 0;
}

.prose h3 {
  font-size: 1.17em;
  font-weight: bold;
  margin: 0.83em 0;
}

.prose p {
  margin: 1em 0;
}

.prose ul, .prose ol {
  margin: 1em 0;
  padding-left: 2em;
}

.prose li {
  margin: 0.5em 0;
}

.prose code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.dark .prose code {
  background-color: rgba(255, 255, 255, 0.05);
}

.prose pre {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1em;
  border-radius: 5px;
  overflow-x: auto;
}

.dark .prose pre {
  background-color: rgba(255, 255, 255, 0.05);
}

.prose pre code {
  background: none;
  padding: 0;
}

.prose a {
  color: #3b82f6;
  text-decoration: underline;
}
</style>

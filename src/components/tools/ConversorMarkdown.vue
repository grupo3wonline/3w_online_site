<template>
  <ToolShell
    title="Conversor Markdown"
    description="Converta Markdown para HTML com visualização em tempo real. Suporte aos elementos mais comuns do CommonMark."
    icon="fa-markdown"
    icon-gradient="from-slate-600 to-gray-800"
    orb-color="blue"
    :quick-tips="['Preview em tempo real', 'Visualizar HTML gerado', 'Exportar HTML sanitizado']"
    :tips="[
      { title: 'Títulos e parágrafos', text: '# H1, ## H2, ### H3. Linha em branco separa paragrafos. Dois espacos no final de linha criam quebra de linha.', type: 'info' },
      { title: 'Ênfase e código', text: 'Use **negrito**, *itálico*, codigo inline com crase e bloco de codigo com 3 crases. Combinavel com asteriscos triplos.', type: 'info' },
      { title: 'Links e imagens', text: '[texto](url) para links. ![alt](url) para imagens. Adicione titulo entre aspas apos a URL dentro do parentese.', type: 'info' },
    ]"
    :examples="[
      { title: 'Cabeçalho + lista', desc: '## Título seguido de - Item 1, - Item 2', result: 'h2 Título + ul com li Item 1 e li Item 2' },
      { title: 'Link com código', desc: 'Use fetch() com link para MDN', result: 'a href com code fetch() dentro do texto' },
      { title: 'Tabela simples', desc: 'Col1 | Col2 com separador --- | ---', result: 'Tabela HTML com thead e tbody gerados automaticamente' },
    ]"
  >

    <!-- Editor -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Entrada Markdown -->
      <div class="tool-body !mb-0">
        <label class="input-aurora-label">
          <i class="fab fa-markdown mr-1.5 text-slate-500"></i>
          Markdown
        </label>
        <textarea
          v-model="markdown"
          @input="converter"
          rows="18"
          placeholder="Digite seu Markdown aqui..."
          class="input-aurora resize-none font-mono text-sm"
        ></textarea>

        <div class="flex gap-2 mt-3">
          <BaseButton variant="outline" size="sm" icon="fa-copy" @click="copiarMarkdown">
            Copiar MD
          </BaseButton>
        </div>
      </div>

      <!-- Preview / HTML -->
      <div>
        <div class="flex items-center justify-between mb-1.5">
          <label class="input-aurora-label !mb-0">
            <i class="fas fa-eye mr-1.5 text-blue-500"></i>
            Saída
          </label>
          <div class="flex items-center gap-1 p-1 bg-gray-100 dark:bg-slate-800 rounded-lg">
            <button
              @click="visualizacao = 'preview'"
              :class="[
                'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                visualizacao === 'preview' ? 'bg-slate-600 text-white' : 'text-gray-600 dark:text-slate-300',
              ]"
            >
              <i class="fas fa-eye mr-1"></i>Preview
            </button>
            <button
              @click="visualizacao = 'html'"
              :class="[
                'px-3 py-1 rounded-md text-xs font-semibold transition-all',
                visualizacao === 'html' ? 'bg-slate-600 text-white' : 'text-gray-600 dark:text-slate-300',
              ]"
            >
              <i class="fas fa-code mr-1"></i>HTML
            </button>
          </div>
        </div>

        <Transition name="scale-in" appear>
          <div>
            <div
              v-if="visualizacao === 'preview'"
              class="glass-panel prose dark:prose-invert max-w-none overflow-auto"
              style="min-height: 25rem;"
              v-html="html"
            ></div>
            <textarea
              v-else
              :value="html"
              readonly
              rows="18"
              class="input-aurora resize-none font-mono text-xs"
            ></textarea>
          </div>
        </Transition>

        <div class="flex gap-2 mt-3">
          <BaseButton variant="success" size="sm" icon="fa-code" @click="copiarHTML">
            Copiar HTML
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Estatísticas -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
      <div class="metric-glass ring-1 ring-slate-100 dark:ring-slate-700">
        <div class="metric-glass-value text-slate-600 dark:text-slate-300">{{ markdown.split('\n').length }}</div>
        <div class="metric-glass-label">Linhas MD</div>
      </div>
      <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
        <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ contarPalavras() }}</div>
        <div class="metric-glass-label">Palavras</div>
      </div>
      <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
        <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ markdown.length }}</div>
        <div class="metric-glass-label">Chars MD</div>
      </div>
      <div class="metric-glass ring-1 ring-violet-100 dark:ring-violet-900">
        <div class="metric-glass-value text-violet-600 dark:text-violet-400">{{ html.length }}</div>
        <div class="metric-glass-label">Chars HTML</div>
      </div>
    </div>

    <div class="tip-card-success mt-4">
      <i class="fas fa-shield-halved text-emerald-500 flex-shrink-0 mt-0.5"></i>
      <span class="text-xs">O HTML gerado é sanitizado com DOMPurify para prevenir ataques XSS antes de ser renderizado no preview.</span>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import { ref } from 'vue'
import DOMPurify from 'dompurify'
import Swal from 'sweetalert2'

const markdown     = ref(`# Título Principal

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
const html          = ref('')
const visualizacao  = ref('preview')

const contarPalavras = () => markdown.value.trim().split(/\s+/).filter(w => w).length

const markdownToHTML = (md) => {
  let r = md
  r = r.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
  r = r.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  r = r.replace(/^## (.*$)/gim,  '<h2>$1</h2>')
  r = r.replace(/^# (.*$)/gim,   '<h1>$1</h1>')
  r = r.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
  r = r.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  r = r.replace(/\*(.*?)\*/g,    '<em>$1</em>')
  r = r.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
  r = r.replace(/`([^`]+)`/g,    '<code>$1</code>')
  r = r.replace(/^\s*[-*]\s+(.*)$/gim, '<li>$1</li>')
  r = r.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
  r = r.replace(/^\s*\d+\.\s+(.*)$/gim, '<li>$1</li>')
  r = r.replace(/^(?!<[huplo]|<pre)(.*$)/gim, '<p>$1</p>')
  r = r.replace(/<p><\/p>/g, '')
  r = r.replace(/<p>(\s*)<\/p>/g, '')
  return r
}

const converter = () => {
  html.value = DOMPurify.sanitize(markdownToHTML(markdown.value))
}

const copiarHTML = async () => {
  try {
    await navigator.clipboard.writeText(html.value)
    Swal.fire({ title: 'HTML Copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

const copiarMarkdown = async () => {
  try {
    await navigator.clipboard.writeText(markdown.value)
    Swal.fire({ title: 'Markdown Copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}

converter()
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }

.prose { color: inherit; }
.prose h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; }
.prose h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; }
.prose h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; }
.prose p  { margin: 1em 0; }
.prose ul, .prose ol { margin: 1em 0; padding-left: 2em; }
.prose li { margin: 0.5em 0; }
.prose code { background-color: rgba(0,0,0,.05); padding: 0.2em 0.4em; border-radius: 3px; font-family: monospace; }
.dark .prose code { background-color: rgba(255,255,255,.05); }
.prose pre { background-color: rgba(0,0,0,.05); padding: 1em; border-radius: 5px; overflow-x: auto; }
.dark .prose pre { background-color: rgba(255,255,255,.05); }
.prose pre code { background: none; padding: 0; }
.prose a { color: #3b82f6; text-decoration: underline; }
</style>


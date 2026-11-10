<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useClipboard } from '@vueuse/core'
import { useAiStore } from '@/stores/ai'
import { simulateCodeExecution } from '@/services/aiService'
import { useSeo } from '@/composables/useSeo'

const props = defineProps<{
  language: 'portugol' | 'visualg' | 'php'
  title: string
}>()

const aiStore = useAiStore()

useSeo({
  title: computed(() => `${props.title} | DevStart`),
  description: computed(() => `Editor de ${props.title} com execução simulada por IA.`),
  path: computed(() => `/ferramentas/${props.language}`),
})

interface Guide {
  description: string
  snippets: { label: string; code: string }[]
  tips: string
  links?: { title: string; url: string }[]
}

const LANGUAGE_GUIDES: Record<string, Guide> = {
  portugol: {
    description:
      'O Portugol (Portugol Studio) é uma pseudolinguagem baseada em C, ideal para aprender lógica estruturada em português.',
    snippets: [
      { label: 'Estrutura', code: 'programa {\n  funcao inicio() {\n    // seu código aqui\n  }\n}' },
      { label: 'Escrever', code: 'escreva("Olá Mundo")' },
      { label: 'Ler', code: 'cadeia nome\nleia(nome)' },
      { label: 'Se/Senão', code: 'se (condicao) {\n\n} senao {\n\n}' },
      { label: 'Para', code: 'para (inteiro i=0; i<10; i++) {\n\n}' },
    ],
    tips: 'O código sempre começa na funcao inicio(). Use chaves {} para blocos.',
  },
  visualg: {
    description:
      'O VisualG é um interpretador de algoritmos muito usado em cursos técnicos, com sintaxe verbosa e rígida.',
    snippets: [
      { label: 'Estrutura', code: 'Algoritmo "nome"\nVar\nInicio\nFimalgoritmo' },
      { label: 'Escreval', code: 'Escreval("Pula linha")' },
      { label: 'Ler', code: 'Leia(variavel)' },
      { label: 'Se/Entao', code: 'Se (x > 0) entao\nFimse' },
      { label: 'Para', code: 'Para i de 1 ate 10 faca\nFimpara' },
    ],
    tips: 'Declare todas as variáveis na seção Var antes do Inicio.',
  },
  php: {
    description:
      'PHP é uma linguagem executada no servidor, amplamente usada para sites dinâmicos e APIs.',
    snippets: [
      { label: 'Tags', code: '<?php\n  echo "Olá Mundo";\n?>' },
      { label: 'Variável', code: '$nome = "Maria";\n$idade = 25;' },
      { label: 'Condicional', code: 'if ($idade >= 18) {\n  echo "Maior";\n} else {\n  echo "Menor";\n}' },
      { label: 'Array', code: '$frutas = array("Maçã", "Banana");\necho $frutas[0];' },
      { label: 'Função', code: 'function somar($a, $b) {\n  return $a + $b;\n}' },
    ],
    tips: 'Toda variável começa com $ e o ponto e vírgula é obrigatório.',
    links: [
      { title: 'Manual Oficial do PHP (pt-BR)', url: 'https://www.php.net/manual/pt_BR/' },
      { title: 'W3Schools PHP', url: 'https://www.w3schools.com/php/' },
    ],
  },
}

const code = ref('')
const output = ref('')
const isLoading = ref(false)

const guide = computed(() => LANGUAGE_GUIDES[props.language])
const fileExt = computed(() =>
  props.language === 'php' ? 'php' : props.language === 'portugol' ? 'por' : 'alg',
)

const placeholder = computed(() => {
  if (props.language === 'portugol')
    return 'programa {\n  funcao inicio() {\n    escreva("Olá Mundo")\n  }\n}'
  if (props.language === 'visualg')
    return 'Algoritmo "Exemplo"\nVar\nInicio\n   Escreval("Olá Mundo")\nFimalgoritmo'
  return '<?php\n  echo "Olá Mundo PHP";\n?>'
})

async function run() {
  if (!code.value.trim()) {
    Swal.fire({
      icon: 'warning',
      title: 'Código vazio',
      text: 'Escreva algum código antes de executar!',
      timer: 2000,
      showConfirmButton: false,
    })
    return
  }
  isLoading.value = true
  output.value = 'Compilando e executando (simulado via IA)...'
  output.value = await simulateCodeExecution(
    aiStore.provider,
    aiStore.currentKey(),
    code.value,
    props.language,
  )
  isLoading.value = false
}

function insertSnippet(snippet: string) {
  code.value += (code.value ? '\n\n' : '') + snippet
}

const { copy, copied, isSupported: clipboardSupported } = useClipboard()
const showSnippets = ref(false)

function copySnippet(snippet: string) {
  copy(snippet)
}

function showHelp() {
  const g = guide.value
  const linksHtml = g.links
    ? `<div class="mb-2 rounded border border-brand-200 bg-brand-50 p-2 text-left"><b class="text-xs uppercase text-brand-700">Documentação</b><ul class="mt-1">${g.links
        .map(
          (l) =>
            `<li><a href="${l.url}" target="_blank" class="text-xs text-brand-600 hover:underline">${l.title}</a></li>`,
        )
        .join('')}</ul></div>`
    : ''
  Swal.fire({
    title: `Guia: ${props.title}`,
    html: `<div class="text-left text-sm space-y-3"><p>${g.description}</p>${linksHtml}<p class="rounded bg-amber-50 p-2 text-amber-800"><b>Dica:</b> ${g.tips}</p></div>`,
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#7c3aed',
    width: '500px',
  })
}

function handleKeydown(e: KeyboardEvent) {
  if (e.ctrlKey && e.key === 'Enter') run()
}
</script>

<template>
  <div class="container-page flex flex-col py-6">
    <div class="card mb-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div class="flex items-center gap-3">
        <span class="rounded-lg bg-brand-100 p-2 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300">
          <Icon
            icon="lucide:terminal"
            class="h-6 w-6"
          />
        </span>
        <div>
          <h1 class="text-xl font-bold text-slate-800 dark:text-white">
            {{ title }}
          </h1>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            {{ language === 'php' ? 'Backend Web' : 'Pseudocódigo / Lógica estruturada' }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn-ghost text-sm"
          :class="{ 'text-brand-600': showSnippets }"
          @click="showSnippets = !showSnippets"
        >
          <Icon
            icon="lucide:code"
            class="h-4 w-4"
          /> Snippets
        </button>
        <button
          type="button"
          class="btn-ghost text-sm"
          @click="showHelp"
        >
          <Icon
            icon="lucide:circle-info"
            class="h-4 w-4 text-brand-500"
          /> Guia
        </button>
        <button
          type="button"
          class="btn-primary"
          :disabled="isLoading"
          @click="run"
        >
          <Icon
            :icon="isLoading ? 'lucide:loader-circle' : 'lucide:play'"
            class="h-4 w-4"
            :class="{ 'animate-spin': isLoading }"
          />
          {{ isLoading ? 'Rodando...' : 'Executar' }}
        </button>
      </div>
    </div>

    <!-- Painel de snippets -->
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="showSnippets"
        class="card mb-4 p-4"
      >
        <div class="mb-3 flex items-center gap-2 text-sm font-bold text-slate-600 dark:text-slate-300">
          <Icon
            icon="lucide:code"
            class="h-4 w-4"
          /> Snippets — clique para inserir ou copiar
        </div>
        <div class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="s in guide.snippets"
            :key="s.label"
            class="group flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800"
          >
            <button
              type="button"
              class="flex-1 text-left"
              :title="`Inserir ${s.label}`"
              @click="insertSnippet(s.code)"
            >
              <span class="block text-sm font-semibold text-brand-600 dark:text-brand-400">{{ s.label }}</span>
              <span class="block truncate font-mono text-xs text-slate-500">{{ s.code.replace(/\n/g, ' ') }}</span>
            </button>
            <button
              v-if="clipboardSupported"
              type="button"
              class="ml-2 rounded p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700"
              :title="`Copiar ${s.label}`"
              @click="copySnippet(s.code)"
            >
              <Icon
                :icon="copied ? 'lucide:check' : 'lucide:copy'"
                class="h-4 w-4"
                :class="{ 'text-green-500': copied }"
              />
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <div class="grid gap-4 lg:grid-cols-3">
      <!-- Editor -->
      <div class="card flex flex-col overflow-hidden lg:col-span-2">
        <div class="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-2 font-mono text-xs text-slate-300">
          <span class="flex items-center gap-2"><Icon
            icon="lucide:file-code"
            class="h-4 w-4"
          /> editor.{{ fileExt }}</span>
          <div class="flex gap-2">
            <button
              v-for="s in guide.snippets.slice(0, 3)"
              :key="s.label"
              type="button"
              class="rounded px-2 hover:bg-slate-700 hover:text-white"
              :title="`Inserir: ${s.label}`"
              @click="insertSnippet(s.code)"
            >
              + {{ s.label }}
            </button>
          </div>
        </div>
        <textarea
          v-model="code"
          :placeholder="placeholder"
          spellcheck="false"
          autocomplete="off"
          class="h-96 w-full resize-none bg-slate-900 p-4 font-mono text-sm leading-relaxed text-brand-200 focus:outline-none"
          @keydown="handleKeydown"
        />
      </div>

      <!-- Output -->
      <div class="card flex flex-col overflow-hidden border-black bg-black">
        <div class="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-4 py-2 font-mono text-xs text-slate-400">
          <span class="flex items-center gap-2"><Icon
            icon="lucide:terminal"
            class="h-4 w-4"
          /> Console</span>
          <button
            v-if="output"
            type="button"
            class="hover:text-white"
            aria-label="Limpar console"
            @click="output = ''"
          >
            <Icon
              icon="lucide:trash-2"
              class="h-4 w-4"
            />
          </button>
        </div>
        <pre class="h-96 flex-1 overflow-auto whitespace-pre-wrap p-4 font-mono text-sm text-green-400">{{ output || '// A saída do programa aparecerá aqui...' }}</pre>
      </div>
    </div>
  </div>
</template>

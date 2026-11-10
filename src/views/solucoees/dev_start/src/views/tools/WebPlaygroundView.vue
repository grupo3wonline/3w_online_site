<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { Icon } from '@iconify/vue'
import Swal from 'sweetalert2'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Playground Web | DevStart',
  description: 'Combine HTML, CSS e JavaScript e veja o resultado ao vivo.',
  path: '/ferramentas/web',
})

const html = ref(
  '<h1>Olá Mundo</h1>\n<p>Edite o HTML ao lado e veja a mágica!</p>\n<button class="btn">Me clique</button>',
)
const css = ref(
  'body {\n  font-family: sans-serif;\n  background: #f8fafc;\n  color: #334155;\n  padding: 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nh1 { color: #7c3aed; }\n\n.btn {\n  margin-top: 10px;\n  padding: 10px 20px;\n  background: #7c3aed;\n  color: white;\n  border: none;\n  border-radius: 6px;\n  cursor: pointer;\n}',
)
const js = ref(
  'document.querySelector(".btn").addEventListener("click", () => {\n  alert("Você clicou no botão!");\n});',
)
const srcDoc = ref('')

let timer: number | undefined

function render() {
  const closeScript = '<' + '/script>'
  srcDoc.value = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${css.value}</style></head><body>${html.value}<script>${js.value}${closeScript}</body></html>`
}

watch(
  [html, css, js],
  () => {
    window.clearTimeout(timer)
    timer = window.setTimeout(render, 600)
  },
  { immediate: true },
)

onBeforeUnmount(() => window.clearTimeout(timer))

const guides = {
  html: {
    title: 'HTML5 (Estrutura)',
    desc: 'HyperText Markup Language é o esqueleto da página: define títulos, parágrafos, imagens etc.',
    tips: 'Use tags semânticas e lembre de fechar as tags.',
  },
  css: {
    title: 'CSS3 (Estilo)',
    desc: 'Controla a aparência: cores, fontes, espaçamento e layout.',
    tips: 'Use ponto (.) para classes e cerquilha (#) para IDs.',
  },
  js: {
    title: 'JavaScript (Lógica)',
    desc: 'Adiciona interatividade e comportamento à página.',
    tips: 'Use console.log() para depurar sem interromper a página.',
  },
}

function showGuide(type: 'html' | 'css' | 'js') {
  const g = guides[type]
  Swal.fire({
    title: g.title,
    html: `<div class="text-left text-sm space-y-3"><p>${g.desc}</p><p class="rounded bg-amber-50 p-2 text-amber-800"><b>Dica:</b> ${g.tips}</p></div>`,
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#7c3aed',
  })
}

function showGeneralGuide() {
  Swal.fire({
    title: 'HTML, CSS, JS Sandbox',
    html: '<div class="text-left text-sm space-y-2"><p>Combine três tecnologias:</p><ul class="list-disc pl-5"><li><b>HTML</b>: estrutura</li><li><b>CSS</b>: estilo</li><li><b>JS</b>: comportamento</li></ul><p class="mt-2 text-slate-500">O preview atualiza automaticamente após uma pausa na digitação.</p></div>',
    icon: 'info',
    confirmButtonText: 'Vamos codar!',
    confirmButtonColor: '#7c3aed',
  })
}
</script>

<template>
  <div class="container-page flex flex-col py-6">
    <div class="card mb-4 flex items-center justify-between p-4">
      <h1 class="flex items-center gap-2 text-xl font-bold text-slate-800 dark:text-white">
        <span class="rounded-lg bg-slate-800 p-2 text-white"><Icon
          icon="lucide:code-2"
          class="h-5 w-5"
        /></span>
        Playground Web
      </h1>
      <button
        type="button"
        class="btn-secondary text-sm"
        @click="showGeneralGuide"
      >
        <Icon
          icon="lucide:circle-help"
          class="h-4 w-4"
        /> Como funciona?
      </button>
    </div>

    <div class="grid gap-4 lg:grid-cols-3">
      <div
        v-for="editor in (['html', 'css', 'js'] as const)"
        :key="editor"
        class="card flex flex-col overflow-hidden"
      >
        <div class="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-800">
          <span class="text-sm font-bold uppercase text-slate-700 dark:text-slate-200">{{ editor }}</span>
          <button
            type="button"
            class="text-slate-400 hover:text-brand-500"
            :aria-label="`Ajuda ${editor}`"
            @click="showGuide(editor)"
          >
            <Icon
              icon="lucide:circle-help"
              class="h-4 w-4"
            />
          </button>
        </div>
        <textarea
          v-if="editor === 'html'"
          v-model="html"
          spellcheck="false"
          autocomplete="off"
          class="h-48 w-full resize-none bg-slate-900 p-3 font-mono text-xs leading-relaxed text-orange-100 focus:outline-none"
        />
        <textarea
          v-else-if="editor === 'css'"
          v-model="css"
          spellcheck="false"
          autocomplete="off"
          class="h-48 w-full resize-none bg-slate-900 p-3 font-mono text-xs leading-relaxed text-blue-100 focus:outline-none"
        />
        <textarea
          v-else
          v-model="js"
          spellcheck="false"
          autocomplete="off"
          class="h-48 w-full resize-none bg-slate-900 p-3 font-mono text-xs leading-relaxed text-yellow-100 focus:outline-none"
        />
      </div>
    </div>

    <div class="card mt-4 flex flex-col overflow-hidden">
      <div class="flex items-center justify-between border-b border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800">
        <span class="flex items-center gap-2"><Icon
          icon="lucide:monitor"
          class="h-4 w-4"
        /> Resultado / Preview</span>
        <span class="rounded-full bg-green-100 px-2 text-green-700">Auto-run</span>
      </div>
      <iframe
        :srcdoc="srcDoc"
        title="Resultado do Playground"
        sandbox="allow-scripts allow-modals"
        class="h-80 w-full bg-white"
      />
    </div>
  </div>
</template>

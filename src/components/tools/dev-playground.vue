<script setup lang="ts">
import { ref, watch, onMounted, nextTick, computed } from 'vue'
import { Icon } from '@iconify/vue'

type Lang = 'html' | 'css' | 'js'
const activeEditor = ref<Lang>('html')
const html = ref('')
const css = ref('')
const js = ref('')
const previewFrame = ref<HTMLIFrameElement | null>(null)
const refreshKey = ref(0)
const logs = ref<{ type: string; msg: string }[]>([])
const notification = ref('')
const savedAt = ref('')
const viewport = ref<'mobile' | 'tablet' | 'desktop'>('desktop')
const showConsole = ref(false)

const defaultHtml = `<h1>Dev Playground</h1>\n<p>Editor de código com preview em tempo real.</p>\n<button id="btn">Clique aqui</button>`
const defaultCss = `body { font-family: system-ui, sans-serif; padding: 2rem; background: #0f172a; color: #e2e8f0; }\nh1 { color: #818cf8; }\nbutton { margin-top: 1rem; padding: .6rem 1.4rem; background: #6366f1; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; }`
const defaultJs = `document.getElementById('btn')?.addEventListener('click', () => {\n  console.log('Clicado!')\n  document.body.style.background = '#1e1b4b'\n})`

const viewportClass = computed(() => ({
  mobile: 'w-80',
  tablet: 'w-[640px]',
  desktop: 'w-full',
}[viewport.value]))

function buildSrc() {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${css.value}</style></head><body>${html.value}<script>
  const _c = console.log.bind(console)
  console.log = (...a) => { parent.postMessage({type:'log',msg:a.join(' ')},'*'); _c(...a) }
  window.onerror = (m)=>{ parent.postMessage({type:'err',msg:m},'*') }
  ${js.value}<\/script></body></html>`
}

function run() {
  logs.value = []
  refreshKey.value++
  if (previewFrame.value) {
    const doc = previewFrame.value.contentWindow?.document
    if (!doc) return
    const src = buildSrc()
    doc.open(); doc.write(src); doc.close()
  }
  save()
  toast('Executado!')
}

function save() {
  localStorage.setItem('dp_html', html.value)
  localStorage.setItem('dp_css', css.value)
  localStorage.setItem('dp_js', js.value)
  savedAt.value = new Date().toLocaleTimeString('pt-BR')
}

async function copyActive() {
  const val = activeEditor.value === 'html' ? html.value : activeEditor.value === 'css' ? css.value : js.value
  await navigator.clipboard.writeText(val)
  toast(`${activeEditor.value.toUpperCase()} copiado!`)
}

function reset() {
  html.value = defaultHtml; css.value = defaultCss; js.value = defaultJs
  nextTick(run)
}

function toast(msg: string) {
  notification.value = msg
  setTimeout(() => { notification.value = '' }, 2000)
}

function onMessage(e: MessageEvent) {
  if (e.data?.type === 'log') logs.value.push({ type: 'log', msg: e.data.msg })
  if (e.data?.type === 'err') logs.value.push({ type: 'error', msg: e.data.msg })
}

let debounce: ReturnType<typeof setTimeout>
watch([html, css, js], () => {
  clearTimeout(debounce)
  debounce = setTimeout(run, 1000)
})

onMounted(() => {
  html.value = localStorage.getItem('dp_html') || defaultHtml
  css.value = localStorage.getItem('dp_css') || defaultCss
  js.value = localStorage.getItem('dp_js') || defaultJs
  window.addEventListener('message', onMessage)
  nextTick(run)
})

const tabs: { key: Lang; label: string; icon: string; color: string }[] = [
  { key: 'html', label: 'HTML', icon: 'mdi:language-html5', color: 'text-orange-400' },
  { key: 'css', label: 'CSS', icon: 'mdi:language-css3', color: 'text-blue-400' },
  { key: 'js', label: 'JS', icon: 'mdi:language-javascript', color: 'text-yellow-400' },
]
</script>

<template>
  <div class="flex flex-col h-[640px] bg-gray-950 text-white rounded-xl overflow-hidden border border-white/10">
    <!-- Toolbar -->
    <div class="bg-gray-900 border-b border-gray-700 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
      <div class="flex items-center gap-2">
        <Icon icon="mdi:code-braces" class="text-indigo-400 w-5 h-5" />
        <span class="font-bold text-sm">Dev Playground</span>
        <span v-if="savedAt" class="text-xs text-emerald-400 flex items-center gap-1">
          <Icon icon="mdi:check-circle" class="w-3 h-3" /> Salvo {{ savedAt }}
        </span>
      </div>
      <div class="flex items-center gap-1.5">
        <button v-for="vp in (['mobile','tablet','desktop'] as const)" :key="vp" @click="viewport = vp"
          :class="['p-1.5 rounded transition-colors', viewport === vp ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white']" :title="vp">
          <Icon :icon="vp === 'mobile' ? 'mdi:cellphone' : vp === 'tablet' ? 'mdi:tablet' : 'mdi:monitor'" class="w-4 h-4" />
        </button>
        <button @click="showConsole = !showConsole" :class="['p-1.5 rounded transition-colors', showConsole ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white']" title="Console">
          <Icon icon="mdi:console" class="w-4 h-4" />
        </button>
        <button @click="copyActive" class="text-gray-400 hover:text-white p-1.5 rounded transition-colors" title="Copiar">
          <Icon icon="mdi:content-copy" class="w-4 h-4" />
        </button>
        <button @click="reset" class="text-gray-400 hover:text-white p-1.5 rounded transition-colors" title="Restaurar exemplo">
          <Icon icon="mdi:refresh" class="w-4 h-4" />
        </button>
        <button @click="run" class="bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors">
          <Icon icon="mdi:play" class="w-3.5 h-3.5" /> Executar
        </button>
      </div>
    </div>

    <!-- Editor tabs -->
    <div class="bg-gray-900 border-b border-gray-700 flex shrink-0">
      <button v-for="t in tabs" :key="t.key" @click="activeEditor = t.key"
        :class="['flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors',
          activeEditor === t.key ? `border-indigo-500 ${t.color} bg-gray-800/50` : 'border-transparent text-gray-400 hover:text-gray-200']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- Split area -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Code editor -->
      <div class="w-1/2 flex flex-col border-r border-gray-700">
        <textarea v-show="activeEditor === 'html'" v-model="html" spellcheck="false" class="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-3 resize-none outline-none" />
        <textarea v-show="activeEditor === 'css'" v-model="css" spellcheck="false" class="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-3 resize-none outline-none" />
        <textarea v-show="activeEditor === 'js'" v-model="js" spellcheck="false" class="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-3 resize-none outline-none" />
      </div>

      <!-- Preview + console -->
      <div class="w-1/2 flex flex-col">
        <div class="bg-gray-100 border-b border-gray-200 px-3 py-1.5 flex items-center justify-between shrink-0">
          <span class="text-gray-700 text-xs font-medium flex items-center gap-1.5">
            <Icon icon="mdi:eye" class="w-4 h-4" /> Preview
          </span>
        </div>
        <div class="flex-1 flex justify-center bg-gray-200 overflow-auto">
          <div :class="['transition-all duration-300 h-full bg-white', viewportClass]">
            <iframe ref="previewFrame" class="w-full h-full border-none" sandbox="allow-scripts allow-same-origin" />
          </div>
        </div>

        <!-- Console -->
        <div v-if="showConsole" class="h-28 border-t border-gray-700 bg-gray-900 overflow-y-auto p-2">
          <div class="flex items-center justify-between mb-1">
            <span class="text-gray-400 text-xs">Console</span>
            <button @click="logs = []" class="text-gray-500 hover:text-white text-xs">Limpar</button>
          </div>
          <div v-if="!logs.length" class="text-gray-500 text-xs">Sem logs.</div>
          <div v-for="(l, i) in logs" :key="i" :class="['font-mono text-xs', l.type === 'error' ? 'text-red-400' : 'text-green-300']">
            &gt; {{ l.msg }}
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <Transition name="fade">
      <div v-if="notification" class="fixed bottom-4 right-4 z-50 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg">
        {{ notification }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

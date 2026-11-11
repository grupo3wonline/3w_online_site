<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { Icon } from '@iconify/vue'

const htmlCode = ref('')
const cssCode = ref('')
const jsCode = ref('')
const phpCode = ref('')
const activeTab = ref<'html' | 'css' | 'js' | 'php' | 'result'>('html')
const isMobile = ref(false)
const previewFrame = ref<HTMLIFrameElement | null>(null)
const isLoading = ref(false)
const notification = ref('')
const notifType = ref<'success' | 'info'>('success')

const tabs = [
  { id: 'html' as const, label: 'HTML', icon: 'mdi:language-html5', color: 'text-orange-400' },
  { id: 'css' as const, label: 'CSS', icon: 'mdi:language-css3', color: 'text-blue-400' },
  { id: 'js' as const, label: 'JS', icon: 'mdi:language-javascript', color: 'text-yellow-400' },
  { id: 'php' as const, label: 'PHP', icon: 'mdi:language-php', color: 'text-purple-400' },
  { id: 'result' as const, label: 'Preview', icon: 'mdi:eye', color: 'text-green-400' },
]

const defaultHTML = `<div class="container">\n  <h1>CodeMaster Studio</h1>\n  <p>Edite HTML, CSS, JS e PHP simulado em tempo real.</p>\n  <button onclick="document.body.style.background='#1a1a2e'">Mudar fundo</button>\n</div>`
const defaultCSS = `body { font-family: 'Inter', sans-serif; padding: 2rem; background: #f8fafc; color: #334155; }\n.container { max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 16px rgba(0,0,0,.1); }\nh1 { color: #7c3aed; margin-bottom: .5rem; }\nbutton { margin-top: 1rem; padding: .5rem 1.2rem; background: #7c3aed; color: white; border: none; border-radius: 6px; cursor: pointer; }`
const defaultJS = `console.log('CodeMaster pronto!');`
const defaultPHP = `<?php\n$msg = "PHP simulado ativo!";\necho "<p class='php-out'>$msg</p>";\n?>`

function transpilePHP(code: string): string {
  let vars: Record<string, string> = {}
  const varRx = /\$([a-zA-Z_]\w*)\s*=\s*(["'])(.*?)\2\s*;/g
  let m
  while ((m = varRx.exec(code)) !== null) vars[m[1]] = m[3]
  let out = code.replace(/\$([a-zA-Z_]\w*)/g, (_, k) => vars[k] ?? '')
  out = out.replace(/echo\s+(["'])(.*?)\1\s*;/g, '$2')
  out = out.replace(/<\?php[\s\S]*?\?>/g, (s) => s.replace(/<\?php|<\?|\?>/g, ''))
  return out
}

function updatePreview() {
  if (!previewFrame.value) return
  const phpOut = transpilePHP(phpCode.value)
  const src = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>.php-out{background:#f3e8ff;border-left:4px solid #7c3aed;padding:.8rem;margin-top:.5rem;font-family:monospace}${cssCode.value}</style></head><body>${htmlCode.value}${phpOut}<script>${jsCode.value}<\/script></body></html>`
  const doc = previewFrame.value.contentWindow?.document
  if (!doc) return
  doc.open(); doc.write(src); doc.close()
  localStorage.setItem('cm_html', htmlCode.value)
  localStorage.setItem('cm_css', cssCode.value)
  localStorage.setItem('cm_js', jsCode.value)
  localStorage.setItem('cm_php', phpCode.value)
}

function runCode() {
  isLoading.value = true
  setTimeout(() => { updatePreview(); isLoading.value = false; toast('Executado com sucesso!', 'success') }, 300)
}

function toast(msg: string, type: 'success' | 'info' = 'info') {
  notification.value = msg; notifType.value = type
  setTimeout(() => { notification.value = '' }, 2500)
}

function saveLocal() {
  updatePreview()
  toast('Salvo no navegador!', 'success')
}

function downloadCode() {
  const content = `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<style>${cssCode.value}</style>\n</head>\n<body>\n${htmlCode.value}\n${transpilePHP(phpCode.value)}\n<script>${jsCode.value}<\/script>\n</body>\n</html>`
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([content], { type: 'text/html' }))
  a.download = 'projeto-codemaster.html'; a.click()
  URL.revokeObjectURL(a.href)
  toast('Arquivo baixado!', 'success')
}

async function copyCode(text: string) {
  await navigator.clipboard.writeText(text)
  toast('Copiado!', 'success')
}

let debounce: ReturnType<typeof setTimeout>
watch([htmlCode, cssCode, jsCode, phpCode], () => {
  clearTimeout(debounce)
  debounce = setTimeout(updatePreview, 800)
})

onMounted(() => {
  htmlCode.value = localStorage.getItem('cm_html') || defaultHTML
  cssCode.value = localStorage.getItem('cm_css') || defaultCSS
  jsCode.value = localStorage.getItem('cm_js') || defaultJS
  phpCode.value = localStorage.getItem('cm_php') || defaultPHP
  isMobile.value = window.innerWidth < 768
  window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 768 })
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); runCode() }
  })
  nextTick(updatePreview)
})
</script>

<template>
  <div class="flex flex-col h-[600px] bg-gray-900 text-white rounded-xl overflow-hidden border border-white/10">
    <!-- Toolbar -->
    <div class="bg-gray-800 border-b border-gray-700 px-3 py-2 flex items-center justify-between gap-2 shrink-0">
      <div class="flex items-center gap-2">
        <div class="bg-gradient-to-br from-indigo-500 to-purple-600 w-7 h-7 rounded-lg flex items-center justify-center">
          <Icon icon="mdi:code-tags" class="text-white w-4 h-4" />
        </div>
        <span class="font-bold text-sm text-white">CodeMaster <span class="text-xs text-purple-400 border border-purple-500/50 rounded px-1">Studio</span></span>
      </div>
      <div class="flex items-center gap-1.5">
        <button @click="runCode" class="bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5">
          <Icon icon="mdi:play" class="w-3.5 h-3.5" /><span class="hidden sm:inline">Executar</span>
        </button>
        <button @click="saveLocal" title="Salvar" class="bg-gray-700 hover:bg-gray-600 p-1.5 rounded-md transition-colors"><Icon icon="mdi:content-save" class="w-4 h-4" /></button>
        <button @click="downloadCode" title="Baixar" class="bg-gray-700 hover:bg-gray-600 p-1.5 rounded-md transition-colors"><Icon icon="mdi:download" class="w-4 h-4" /></button>
      </div>
    </div>

    <!-- Tab bar -->
    <div class="bg-gray-800 border-b border-gray-700 flex shrink-0">
      <button v-for="t in tabs" :key="t.id" @click="activeTab = t.id"
        :class="['flex items-center gap-1.5 px-3 py-2 text-xs font-medium border-b-2 transition-colors',
          activeTab === t.id ? `border-purple-500 ${t.color} bg-gray-700/50` : 'border-transparent text-gray-400 hover:text-gray-200']">
        <Icon :icon="t.icon" class="w-3.5 h-3.5" />{{ t.label }}
      </button>
    </div>

    <!-- Content area -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Editor pane -->
      <div v-show="activeTab !== 'result'" class="flex-1 flex flex-col overflow-hidden">
        <div class="flex items-center justify-between bg-gray-800 px-3 py-1 text-xs text-gray-400 border-b border-gray-700">
          <span>{{ activeTab.toUpperCase() }}</span>
          <button @click="copyCode(activeTab === 'html' ? htmlCode : activeTab === 'css' ? cssCode : activeTab === 'js' ? jsCode : phpCode)" class="hover:text-white transition-colors">
            <Icon icon="mdi:content-copy" class="w-3.5 h-3.5" />
          </button>
        </div>
        <textarea v-show="activeTab === 'html'" v-model="htmlCode" spellcheck="false" placeholder="<!-- HTML -->"
          class="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-3 resize-none outline-none" />
        <textarea v-show="activeTab === 'css'" v-model="cssCode" spellcheck="false" placeholder="/* CSS */"
          class="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-3 resize-none outline-none" />
        <textarea v-show="activeTab === 'js'" v-model="jsCode" spellcheck="false" placeholder="// JavaScript"
          class="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-3 resize-none outline-none" />
        <textarea v-show="activeTab === 'php'" v-model="phpCode" spellcheck="false" placeholder="<?php // PHP ?>"
          class="flex-1 bg-gray-950 text-gray-100 font-mono text-sm p-3 resize-none outline-none" />
      </div>

      <!-- Preview pane -->
      <div v-show="activeTab === 'result'" class="flex-1 flex flex-col overflow-hidden">
        <div class="bg-gray-100 border-b border-gray-300 px-3 py-1.5 flex items-center justify-between shrink-0">
          <span class="text-gray-700 text-xs font-bold flex items-center gap-1.5">
            <Icon icon="mdi:monitor" class="w-4 h-4" /> Preview
          </span>
          <span class="text-gray-400 text-[10px]">Auto-refresh 800ms</span>
        </div>
        <div class="relative flex-1">
          <iframe ref="previewFrame" class="w-full h-full bg-white border-none" sandbox="allow-scripts allow-modals allow-same-origin" />
          <div v-if="isLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center">
            <div class="animate-spin rounded-full h-7 w-7 border-b-2 border-purple-600"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Help bar -->
    <div class="bg-gray-800 text-gray-500 text-[10px] py-1.5 px-3 flex justify-between border-t border-gray-700 shrink-0">
      <span>Ctrl+Enter para executar</span>
      <span>HTML • CSS • JS • PHP simulado</span>
    </div>

    <!-- Toast -->
    <Transition name="fade">
      <div v-if="notification" :class="['fixed bottom-4 right-4 z-50 px-4 py-2 rounded-lg text-white text-sm font-medium shadow-lg', notifType === 'success' ? 'bg-green-600' : 'bg-blue-600']">
        {{ notification }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

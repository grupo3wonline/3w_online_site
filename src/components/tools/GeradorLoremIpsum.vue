<template>
  <ToolShell
    title="Gerador de Lorem Ipsum"
    description="Gere texto placeholder profissional em parágrafos, palavras ou bytes para mockups e wireframes."
    icon="fa-paragraph"
    icon-gradient="from-teal-500 to-cyan-700"
    orb-color="teal"
    :quick-tips="['Parágrafos, palavras ou bytes', 'Iniciar com Lorem ipsum', '100% offline']"
    :tips="[
      { text: 'Lorem Ipsum é texto padrão de impressão e design desde os anos 1500 — sem significado semântico.' },
      { text: 'Use para preencher layouts, mockups e wireframes antes de ter o conteúdo real.', type: 'info' },
    ]"
  >
    <div class="tool-body">
      <!-- Tipo de geração -->
      <div class="mb-4">
        <label class="input-aurora-label">Tipo de geração</label>
        <div class="grid grid-cols-3 gap-2">
          <button
            v-for="t in tipos"
            :key="t.value"
            :class="['p-3 rounded-xl border-2 text-center text-xs font-semibold transition-all',
              tipoSelecionado === t.value
                ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:border-teal-400']"
            @click="tipoSelecionado = t.value as 'paragrafos' | 'palavras' | 'bytes'"
          >
            <i :class="['fas', t.icon, 'block mb-1', tipoSelecionado === t.value ? 'text-white' : 'text-teal-500']"></i>
            {{ t.label }}
          </button>
        </div>
      </div>

      <BaseInput
        v-model="quantidade"
        :label="`Quantidade de ${tipoSelecionado === 'paragrafos' ? 'Parágrafos' : tipoSelecionado === 'palavras' ? 'Palavras' : 'Bytes'}`"
        type="number"
        icon="fa-hashtag"
        :min="1"
        :max="tipoSelecionado === 'paragrafos' ? 20 : tipoSelecionado === 'palavras' ? 500 : 5000"
        :placeholder="tipoSelecionado === 'paragrafos' ? '3' : tipoSelecionado === 'palavras' ? '100' : '1000'"
      />

      <label class="checkbox-aurora mt-3">
        <input v-model="iniciarComLorem" type="checkbox" class="w-4 h-4 accent-teal-600" />
        <span class="text-sm font-medium">Iniciar com &ldquo;Lorem ipsum dolor sit amet...&rdquo;</span>
      </label>

      <div class="flex gap-3 mt-4">
        <BaseButton variant="secondary" icon="fa-magic" @click="gerarTexto" class="flex-1">
          Gerar Texto
        </BaseButton>
        <BaseButton variant="outline" icon="fa-sync-alt" @click="gerarTexto" title="Regerar">
          Novo
        </BaseButton>
        <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="fade-in-up">
      <div v-if="textoGerado" class="mt-4 space-y-3">
        <!-- Stats -->
        <div class="grid grid-cols-4 gap-2.5">
          <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
            <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ stats.paragrafos }}</div>
            <div class="metric-glass-label">Parágrafos</div>
          </div>
          <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
            <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ stats.palavras }}</div>
            <div class="metric-glass-label">Palavras</div>
          </div>
          <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
            <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ stats.caracteres }}</div>
            <div class="metric-glass-label">Caracteres</div>
          </div>
          <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
            <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ stats.bytes }}</div>
            <div class="metric-glass-label">Bytes</div>
          </div>
        </div>

        <!-- Texto -->
        <div class="glass-panel p-4">
          <div class="flex items-center justify-between mb-3">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200">Texto Gerado</h4>
            <button @click="copiarTexto" class="copy-btn">
              <i :class="['fas', copiado ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
              {{ copiado ? 'Copiado!' : 'Copiar tudo' }}
            </button>
          </div>
          <div class="max-h-72 overflow-y-auto text-sm text-gray-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-serif">
            {{ textoGerado }}
          </div>
        </div>
      </div>
    </Transition>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

// ─── Estado ───────────────────────────────────────────────────────────────────
const tipoSelecionado = ref<'paragrafos' | 'palavras' | 'bytes'>('paragrafos')
const quantidade      = ref<number | ''>(3)
const iniciarComLorem = ref(true)
const textoGerado     = ref('')
const copiado         = ref(false)

const stats = reactive({ paragrafos: 0, palavras: 0, caracteres: 0, bytes: 0 })

const tipos = [
  { value: 'paragrafos', label: 'Parágrafos', icon: 'fa-align-left' },
  { value: 'palavras',   label: 'Palavras',   icon: 'fa-font'       },
  { value: 'bytes',      label: 'Bytes',       icon: 'fa-database'   },
]

// ─── Banco de palavras ────────────────────────────────────────────────────────
const PALAVRAS = [
  'lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do',
  'eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim',
  'ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi',
  'aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit',
  'voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint',
  'occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt',
  'mollit','anim','id','est','laborum','at','vero','eos','accusamus','iusto','odio',
  'dignissimos','ducimus','blanditiis','praesentium','voluptatum','deleniti','atque',
  'corrupti','quos','quas','molestias','excepturi','occaecati','cupiditate','provident',
  'similique','mollitia','vitae','dicta','explicabo','nemo','ipsam','quia','voluptas',
  'aspernatur','aut','odit','fugit','consequuntur','magni','dolores','ratione','sequi',
]

const LOREM_INICIO = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

const rnd = () => PALAVRAS[Math.floor(Math.random() * PALAVRAS.length)]

function gerarFrase() {
  const len = Math.floor(Math.random() * 8) + 5
  const ws  = Array.from({ length: len }, rnd)
  const s   = ws.join(' ')
  return s.charAt(0).toUpperCase() + s.slice(1) + '.'
}

function gerarParagrafo() {
  const frases = Math.floor(Math.random() * 4) + 3
  return Array.from({ length: frases }, gerarFrase).join(' ')
}

// ─── Geração ──────────────────────────────────────────────────────────────────
function gerarTexto() {
  const qtd = Number(quantidade.value) || 1
  let resultado = ''

  if (tipoSelecionado.value === 'paragrafos') {
    const ps = iniciarComLorem.value ? [LOREM_INICIO] : []
    for (let i = ps.length; i < qtd; i++) ps.push(gerarParagrafo())
    resultado = ps.join('\n\n')
  }
  else if (tipoSelecionado.value === 'palavras') {
    const ws = iniciarComLorem.value ? LOREM_INICIO.split(' ') : []
    while (ws.length < qtd) ws.push(rnd())
    resultado = ws.slice(0, qtd).join(' ')
  }
  else {
    let txt = iniciarComLorem.value ? LOREM_INICIO + ' ' : ''
    while (new Blob([txt]).size < qtd) txt += rnd() + ' '
    while (new Blob([txt]).size > qtd && txt.length) txt = txt.slice(0, -1)
    resultado = txt.trim()
  }

  textoGerado.value     = resultado
  stats.caracteres      = resultado.length
  stats.palavras        = resultado.trim().split(/\s+/).filter(Boolean).length
  stats.paragrafos      = resultado.split(/\n\n+/).filter(p => p.trim()).length
  stats.bytes           = new Blob([resultado]).size
}

async function copiarTexto() {
  await navigator.clipboard.writeText(textoGerado.value)
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Texto copiado!', showConfirmButton: false, timer: 1800 })
}

function limpar() {
  textoGerado.value = ''; quantidade.value = 3
  Object.assign(stats, { paragrafos: 0, palavras: 0, caracteres: 0, bytes: 0 })
}

gerarTexto()
</script>

<style scoped>
.fade-in-up-enter-active, .fade-in-up-leave-active { transition: all 0.3s ease; }
.fade-in-up-enter-from { transform: translateY(10px); opacity: 0; }
.fade-in-up-leave-to   { opacity: 0; }
</style>

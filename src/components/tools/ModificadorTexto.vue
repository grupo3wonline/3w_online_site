<template>
  <ToolShell
    title="Modificador de Texto"
    description="Transforme textos com 15+ operações: maiúsculas, camelCase, slug, inverter, remover espaços e mais."
    icon="fa-font"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['15+ transformações', 'Resultado em tempo real', 'Cópia com 1 clique']"
    :tips="[
      { text: 'As transformações são aplicadas ao texto de entrada sem alterar o original.' },
      { text: 'camelCase: palavrasJuntas. PascalCase: PalavrasJuntas. snake_case: palavras_separadas.', type: 'info' },
    ]"
  >
    <div class="tool-body">
      <label class="input-aurora-label">
        <i class="fas fa-align-left mr-1.5 text-indigo-500"></i>
        Texto de entrada
      </label>
      <textarea
        v-model="entrada"
        rows="5"
        class="input-aurora resize-y"
        placeholder="Cole ou digite o texto que deseja transformar..."
      ></textarea>
      <p class="input-aurora-hint">{{ entrada.length }} caracteres · {{ contarPalavras(entrada) }} palavras</p>
    </div>

    <!-- Grid de transformações -->
    <div class="mt-4">
      <label class="input-aurora-label mb-3">
        <i class="fas fa-wand-magic-sparkles mr-1.5 text-indigo-500"></i>
        Escolha a transformação
      </label>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        <button
          v-for="t in transformacoes"
          :key="t.id"
          :class="['p-3 rounded-xl border-2 text-left text-xs font-semibold transition-all',
            transformacaoAtiva === t.id
              ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
              : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:border-indigo-400']"
          @click="transformacaoAtiva = t.id; aplicar()"
        >
          <i :class="['fas', t.icon, 'block mb-1', transformacaoAtiva === t.id ? 'text-white' : 'text-indigo-500']"></i>
          {{ t.label }}
        </button>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in">
      <div v-if="saida && entrada" class="mt-4 glass-panel p-4">
        <div class="flex items-center justify-between mb-3">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
            <i class="fas fa-arrow-right text-indigo-500 text-xs"></i>
            Resultado
          </h4>
          <div class="flex gap-2">
            <button @click="copiar" class="copy-btn">
              <i :class="['fas', copiado ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
              {{ copiado ? 'Copiado!' : 'Copiar' }}
            </button>
            <button @click="usarComoEntrada" class="copy-btn">
              <i class="fas fa-arrow-up text-xs"></i>
              Usar como entrada
            </button>
          </div>
        </div>
        <div class="bg-gray-50 dark:bg-slate-700/50 rounded-xl p-3 max-h-48 overflow-y-auto">
          <pre class="text-sm text-gray-900 dark:text-white whitespace-pre-wrap break-all font-sans">{{ saida }}</pre>
        </div>
        <p class="input-aurora-hint mt-2">{{ saida.length }} caracteres · {{ contarPalavras(saida) }} palavras</p>
      </div>
    </Transition>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'

const entrada           = ref('')
const saida             = ref('')
const transformacaoAtiva= ref('maiusculas')
const copiado           = ref(false)

const transformacoes = [
  { id: 'maiusculas',      label: 'MAIÚSCULAS',          icon: 'fa-arrow-up'        },
  { id: 'minusculas',      label: 'minúsculas',          icon: 'fa-arrow-down'      },
  { id: 'titulo',          label: 'Título Case',          icon: 'fa-heading'         },
  { id: 'camelCase',       label: 'camelCase',            icon: 'fa-code'            },
  { id: 'PascalCase',      label: 'PascalCase',           icon: 'fa-p'               },
  { id: 'snake_case',      label: 'snake_case',           icon: 'fa-minus'           },
  { id: 'kebab-case',      label: 'kebab-case',           icon: 'fa-align-center'    },
  { id: 'slug',            label: 'slug-url',             icon: 'fa-link'            },
  { id: 'inverter',        label: 'Inverter texto',       icon: 'fa-arrows-left-right'},
  { id: 'remover-espacos', label: 'Remover espaços extra',icon: 'fa-compress-alt'    },
  { id: 'remover-linhas',  label: 'Remover linhas vazias',icon: 'fa-list-ul'         },
  { id: 'inverter-linhas', label: 'Inverter linhas',      icon: 'fa-sort'            },
  { id: 'ordenar-linhas',  label: 'Ordenar linhas A→Z',   icon: 'fa-sort-alpha-down' },
  { id: 'unico-linhas',    label: 'Remover duplicatas',   icon: 'fa-filter'          },
  { id: 'base64',          label: 'Codificar Base64',     icon: 'fa-lock'            },
]

function contarPalavras(txt: string): number {
  return txt.trim() ? txt.trim().split(/\s+/).length : 0
}

function toCamel(s: string): string {
  return s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
}

function toPascal(s: string): string {
  const c = toCamel(s)
  return c.charAt(0).toUpperCase() + c.slice(1)
}

function toSlug(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-')
}

function aplicar() {
  const t = entrada.value
  switch (transformacaoAtiva.value) {
    case 'maiusculas':      saida.value = t.toUpperCase(); break
    case 'minusculas':      saida.value = t.toLowerCase(); break
    case 'titulo':          saida.value = t.replace(/\b\w/g, c => c.toUpperCase()); break
    case 'camelCase':       saida.value = toCamel(t); break
    case 'PascalCase':      saida.value = toPascal(t); break
    case 'snake_case':      saida.value = t.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, ''); break
    case 'kebab-case':      saida.value = t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); break
    case 'slug':            saida.value = toSlug(t); break
    case 'inverter':        saida.value = t.split('').reverse().join(''); break
    case 'remover-espacos': saida.value = t.replace(/[ \t]+/g, ' ').trim(); break
    case 'remover-linhas':  saida.value = t.split('\n').filter(l => l.trim()).join('\n'); break
    case 'inverter-linhas': saida.value = t.split('\n').reverse().join('\n'); break
    case 'ordenar-linhas':  saida.value = t.split('\n').sort((a,b) => a.localeCompare(b)).join('\n'); break
    case 'unico-linhas':    saida.value = [...new Set(t.split('\n'))].join('\n'); break
    case 'base64':          saida.value = btoa(unescape(encodeURIComponent(t))); break
    default: saida.value = t
  }
}

async function copiar() {
  await navigator.clipboard.writeText(saida.value)
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1400 })
}

function usarComoEntrada() {
  entrada.value = saida.value
  aplicar()
}

watch(entrada, aplicar)
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.2s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

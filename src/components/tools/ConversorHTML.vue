<template>
  <ToolShell
    title="Conversor de Entidades HTML"
    description="Encode e decode caracteres especiais para entidades HTML. Essencial para segurança e exibição correta de conteúdo."
    icon="fa-code"
    icon-gradient="from-orange-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['Encode · Decode instantâneo', 'Contador de caracteres', 'Botões de inserção rápida']"
    :tips="[
      { title: 'Por que fazer Encode?', text: 'Encode protege contra XSS (Cross-Site Scripting) ao exibir input de usuários em HTML. Sempre encode antes de renderizar.', type: 'warning' },
      { title: 'Entidades numéricas', text: 'Além das nomeadas (&amp;), existem entidades numéricas: &#38; (decimal) ou &#x26; (hexadecimal). Ambas funcionam em todos os navegadores.', type: 'info' },
      { title: 'Espaço inseparável', text: '&nbsp; cria um espaço que não quebra a linha. Útil para manter palavras juntas em layout responsivo.', type: 'info' },
    ]"
    :examples="[
      { title: 'Exibir código HTML', desc: '<h1>Olá mundo</h1>', result: '&lt;h1&gt;Olá mundo&lt;/h1&gt;' },
      { title: 'URL com âncora', desc: 'https://site.com/page?q=hello&lang=pt', result: 'https://site.com/page?q=hello&amp;lang=pt' },
      { title: 'Texto com aspas', desc: 'Ele disse: Ola!', result: 'Ele disse: &amp;quot;Ola!&amp;quot;' },
    ]"
  >

    <!-- Seletor de modo -->
    <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-4">
      <button
        @click="modo = 'encode'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'encode' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-lock mr-1.5"></i>Encode (Texto → HTML)
      </button>
      <button
        @click="modo = 'decode'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'decode' ? 'bg-orange-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-unlock mr-1.5"></i>Decode (HTML → Texto)
      </button>
    </div>

    <!-- Entrada -->
    <div class="tool-body !mb-4">
      <label class="input-aurora-label">
        <i class="fas fa-file-code mr-1.5 text-orange-500"></i>
        {{ modo === 'encode' ? 'Texto Original' : 'HTML com Entidades' }}
      </label>
      <textarea
        v-model="input"
        @input="converter"
        rows="6"
        placeholder="Digite ou cole o conteúdo aqui..."
        class="input-aurora resize-y font-mono text-sm"
      ></textarea>

      <!-- Botões de inserção rápida -->
      <div class="mt-3">
        <p class="text-xs text-gray-500 dark:text-slate-400 mb-2">Inserir caractere especial:</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="char in caracteresRapidos"
            :key="char.label"
            @click="inserirCaractere(char.valor)"
            class="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/10 transition-all font-mono text-sm font-bold text-orange-600 dark:text-orange-400"
            :title="char.desc"
          >
            {{ char.label }}
          </button>
        </div>
      </div>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in" appear>
      <div v-if="output" class="space-y-4">
        <div class="glass-panel p-4">
          <div class="flex items-center justify-between mb-2">
            <label class="input-aurora-label !mb-0">
              <i class="fas fa-file-alt mr-1.5 text-orange-500"></i>
              {{ modo === 'encode' ? 'HTML Encoded' : 'Texto Decodificado' }}
            </label>
            <BaseButton variant="outline" size="xs" icon="fa-copy" @click="copiar">Copiar</BaseButton>
          </div>
          <pre class="text-gray-800 dark:text-slate-100 text-sm font-mono whitespace-pre-wrap break-all bg-gray-50 dark:bg-slate-900/50 rounded-lg p-3">{{ output }}</pre>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
            <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ input.length }}</div>
            <div class="metric-glass-label">Chars entrada</div>
          </div>
          <div class="metric-glass ring-1 ring-amber-100 dark:ring-amber-900">
            <div class="metric-glass-value text-amber-600 dark:text-amber-400">{{ output.length }}</div>
            <div class="metric-glass-label">Chars saída</div>
          </div>
        </div>

        <div class="tip-card-warning">
          <i class="fas fa-shield-alt text-amber-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">Sempre aplique HTML encode antes de exibir conteúdo de usuários para evitar ataques XSS.</span>
        </div>
      </div>
    </Transition>

    <div v-if="!output" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
      <i class="fas fa-code text-3xl mb-3 opacity-30 block text-orange-400"></i>
      <p class="text-sm">Digite ou cole o texto no campo acima para converter as entidades HTML</p>
    </div>

    <!-- Referência rápida -->
    <div class="glass-panel p-4 mt-4">
      <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <i class="fas fa-bookmark text-orange-500"></i>
        Entidades HTML mais comuns
      </h4>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
        <div v-for="e in entidades" :key="e.entidade" class="flex items-center justify-between p-2 bg-gray-50 dark:bg-slate-800 rounded-lg">
          <code class="text-orange-600 dark:text-orange-400 font-bold">{{ e.entidade }}</code>
          <span class="text-gray-500 dark:text-slate-400">{{ e.char }}</span>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const modo   = ref('encode')
const input  = ref('')
const output = ref('')

const caracteresRapidos = [
  { label: '<',    valor: '<',     desc: 'Menor que'       },
  { label: '>',    valor: '>',     desc: 'Maior que'       },
  { label: '&',    valor: '&',     desc: 'E comercial'     },
  { label: '"',    valor: '"',     desc: 'Aspas duplas'    },
  { label: "'",    valor: "'",     desc: 'Aspas simples'   },
  { label: '©',    valor: '©',     desc: 'Copyright'       },
  { label: '®',    valor: '®',     desc: 'Marca registrada'},
  { label: '€',    valor: '€',     desc: 'Euro'            },
]

const entidades = [
  { entidade: '&lt;',   char: '<'    },
  { entidade: '&gt;',   char: '>'    },
  { entidade: '&amp;',  char: '&'    },
  { entidade: '&quot;', char: '"'    },
  { entidade: '&apos;', char: "'"    },
  { entidade: '&nbsp;', char: 'espaço' },
  { entidade: '&copy;', char: '©'   },
  { entidade: '&reg;',  char: '®'   },
  { entidade: '&euro;', char: '€'   },
]

const htmlEncode = (text) => {
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' }
  return text.replace(/[&<>"']/g, m => map[m])
}

const htmlDecode = (text) => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

const converter = () => {
  output.value = modo.value === 'encode' ? htmlEncode(input.value) : htmlDecode(input.value)
}

const inserirCaractere = (char) => {
  input.value += char
  converter()
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    Swal.fire({ title: 'Copiado!', icon: 'success', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

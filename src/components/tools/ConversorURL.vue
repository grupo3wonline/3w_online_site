<template>
  <ToolShell
    title="Conversor URL Encode/Decode"
    description="Encode e decode URLs de forma segura. Converta caracteres especiais para o formato compatível com URIs e vice-versa."
    icon="fa-link"
    icon-gradient="from-sky-500 to-blue-700"
    orb-color="blue"
    :quick-tips="['Encode · Decode instantâneo', 'Referência de caracteres', 'Copia com 1 clique']"
    :tips="[
      { title: 'Quando usar Encode?', text: 'Sempre que incluir texto de usuário em query strings ou paths de URL. Espaços viram %20, acentos são codificados, etc.', type: 'warning' },
      { title: 'encodeURI vs encodeURIComponent', text: 'encodeURI preserva a estrutura da URL (mantém :, /, ?, &). encodeURIComponent codifica tudo, ideal para valores de parâmetros.', type: 'info' },
      { title: 'URL com + vs %20', text: 'Em query strings, espaços podem ser + ou %20. Em paths, use %20. Esta ferramenta usa o padrão encodeURIComponent (%20).', type: 'info' },
    ]"
    :examples="[
      { title: 'Query string', desc: 'nome=João Silva&cidade=São Paulo', result: 'nome%3DJ%C3%A3o%20Silva%26cidade%3DS%C3%A3o%20Paulo' },
      { title: 'URL com espaços', desc: 'https://site.com/minha página', result: 'https://site.com/minha%20p%C3%A1gina' },
      { title: 'Decodificar', desc: 'hello%20world%21', result: 'hello world!' },
    ]"
  >

    <!-- Seletor de modo -->
    <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-4">
      <button
        @click="modo = 'encode'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'encode' ? 'bg-sky-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-right mr-1.5"></i>Encode
      </button>
      <button
        @click="modo = 'decode'; converter()"
        :class="[
          'flex-1 py-2.5 px-4 rounded-lg font-semibold text-sm transition-all',
          modo === 'decode' ? 'bg-sky-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700',
        ]"
      >
        <i class="fas fa-arrow-left mr-1.5"></i>Decode
      </button>
    </div>

    <!-- Entrada -->
    <div class="tool-body !mb-4">
      <label class="input-aurora-label">
        <i class="fas fa-keyboard mr-1.5 text-sky-500"></i>
        {{ modo === 'encode' ? 'Texto / URL de Entrada' : 'URL Encodada' }}
      </label>
      <textarea
        v-model="entrada"
        @input="converter"
        rows="5"
        :placeholder="modo === 'encode'
          ? 'Digite ou cole a URL/texto para encodar...\nhttps://site.com/busca?q=olá mundo&lang=pt'
          : 'Cole a URL encodada para decodar...\nhttps%3A%2F%2Fsite.com%2Fbusca%3Fq%3Dol%C3%A1%20mundo'"
        class="input-aurora resize-y font-mono text-sm"
      ></textarea>
    </div>

    <!-- Resultado -->
    <Transition name="scale-in" appear>
      <div v-if="saida" class="space-y-4">
        <div class="glass-panel p-4">
          <div class="flex items-center justify-between mb-2">
            <label class="input-aurora-label !mb-0">
              <i class="fas fa-link mr-1.5 text-sky-500"></i>
              {{ modo === 'encode' ? 'URL Encodada' : 'Texto Decodificado' }}
            </label>
            <BaseButton variant="outline" size="xs" icon="fa-copy" @click="copiar">Copiar</BaseButton>
          </div>
          <pre class="text-gray-800 dark:text-slate-100 text-sm font-mono whitespace-pre-wrap break-all bg-gray-50 dark:bg-slate-900/50 rounded-lg p-3">{{ saida }}</pre>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <div class="metric-glass ring-1 ring-sky-100 dark:ring-sky-900">
            <div class="metric-glass-value text-sky-600 dark:text-sky-400">{{ entrada.length }}</div>
            <div class="metric-glass-label">Chars entrada</div>
          </div>
          <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
            <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ saida.length }}</div>
            <div class="metric-glass-label">Chars saída</div>
          </div>
        </div>

        <div class="tip-card-warning">
          <i class="fas fa-shield-halved text-amber-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">Sempre encode parâmetros de URL antes de enviá-los para evitar ataques de injeção e garantir compatibilidade com todos os navegadores.</span>
        </div>
      </div>
    </Transition>

    <div v-if="!saida" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
      <i class="fas fa-link text-3xl mb-3 opacity-30 block text-sky-400"></i>
      <p class="text-sm">{{ modo === 'encode' ? 'Digite a URL ou texto para encodar' : 'Cole a URL encodada para decodificar' }}</p>
    </div>

    <!-- Referência -->
    <div class="glass-panel p-4 mt-4">
      <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
        <i class="fas fa-bookmark text-sky-500"></i>
        Caracteres codificados mais comuns
      </h4>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div
          v-for="ref in referencias"
          :key="ref.char"
          class="p-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-center border border-gray-200 dark:border-slate-700"
        >
          <div class="text-xs text-gray-400 dark:text-slate-500 mb-0.5">{{ ref.desc }}</div>
          <div class="font-mono font-bold text-sky-600 dark:text-sky-400 text-xs">{{ ref.encoded }}</div>
        </div>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import { ref } from 'vue'
import Swal from 'sweetalert2'

const modo    = ref<'encode' | 'decode'>('encode')
const entrada = ref<string>('')
const saida   = ref<string>('')

const referencias = [
  { char: ' ',  desc: 'Espaço',   encoded: '%20' },
  { char: '&',  desc: 'E comer.', encoded: '%26' },
  { char: '=',  desc: 'Igual',    encoded: '%3D' },
  { char: '?',  desc: 'Interroga', encoded: '%3F' },
  { char: '#',  desc: 'Hash',     encoded: '%23' },
  { char: '/',  desc: 'Barra',    encoded: '%2F' },
  { char: ':',  desc: 'Dois p.',  encoded: '%3A' },
  { char: '+',  desc: 'Mais',     encoded: '%2B' },
]

const converter = (): void => {
  if (!entrada.value) { saida.value = ''; return }
  try {
    saida.value = modo.value === 'encode'
      ? encodeURIComponent(entrada.value)
      : decodeURIComponent(entrada.value)
  } catch {
    saida.value = 'Erro: formato inválido para decodificação'
  }
}

const copiar = async (): Promise<void> => {
  try {
    await navigator.clipboard.writeText(saida.value)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1000, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro', text: 'Não foi possível copiar' })
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>


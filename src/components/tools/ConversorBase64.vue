<template>
  <ToolShell
    title="Conversor Base64"
    description="Encode e decode Base64 — converta texto, URLs ou código para Base64 e vice-versa com suporte a UTF-8."
    icon="fa-code"
    icon-gradient="from-indigo-500 to-blue-800"
    orb-color="indigo"
    :quick-tips="['Encode & decode', 'Suporte UTF-8', 'Preview instantâneo']"
    :tips="base64Tips"
    :examples="base64Examples"
  >

    <div class="tool-body">
      <!-- Toggle de modo -->
      <div class="flex gap-2 p-1 bg-gray-100 dark:bg-slate-700 rounded-xl mb-4">
        <button
          :class="['flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2',
            modo === 'encode' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600']"
          @click="modo = 'encode'; converter()"
        >
          <i class="fas fa-arrow-right text-xs"></i>
          Texto → Base64 (Encode)
        </button>
        <button
          :class="['flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2',
            modo === 'decode' ? 'bg-indigo-600 text-white shadow-sm' : 'text-gray-600 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600']"
          @click="modo = 'decode'; converter()"
        >
          <i class="fas fa-arrow-left text-xs"></i>
          Base64 → Texto (Decode)
        </button>
      </div>

      <!-- Entrada -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-1.5">
          <label class="input-aurora-label !mb-0">
            <i :class="['fas mr-1.5 text-sm', modo === 'encode' ? 'fa-align-left text-indigo-500' : 'fa-code text-blue-500']"></i>
            {{ modo === 'encode' ? 'Texto de entrada' : 'Base64 de entrada' }}
          </label>
          <span class="text-[11px] text-gray-400 dark:text-slate-500">{{ entrada.length }} caracteres</span>
        </div>
        <textarea
          v-model="entrada"
          @input="converter"
          rows="5"
          :placeholder="modo === 'encode' ? 'Digite ou cole o texto aqui...' : 'Cole o Base64 aqui para decodificar...'"
          class="input-aurora resize-y font-mono text-sm"
        ></textarea>
      </div>

      <!-- Ações rápidas -->
      <div class="flex gap-2 mb-4">
        <button @click="colar" class="copy-btn">
          <i class="fas fa-paste"></i> Colar
        </button>
        <button @click="entrada = ''; saida = ''; erro = ''" class="copy-btn">
          <i class="fas fa-eraser"></i> Limpar
        </button>
        <button @click="trocar" class="copy-btn" title="Trocar entrada/saída">
          <i class="fas fa-arrows-rotate"></i> Trocar
        </button>
        <div class="ml-auto flex items-center gap-2">
          <label class="flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" v-model="urlSafe" @change="converter" class="w-3.5 h-3.5 accent-indigo-600" />
            URL-safe
          </label>
        </div>
      </div>

      <!-- Erro -->
      <div v-if="erro" class="tip-card-warning mb-4">
        <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
        <span class="text-xs">{{ erro }}</span>
      </div>

      <!-- Resultado -->
      <Transition name="scale-in">
        <div v-if="saida && !erro">
          <div class="flex items-center justify-between mb-1.5">
            <label class="input-aurora-label !mb-0">
              <i :class="['fas mr-1.5 text-sm', modo === 'encode' ? 'fa-code text-blue-500' : 'fa-align-left text-green-500']"></i>
              {{ modo === 'encode' ? 'Base64 gerado' : 'Texto decodificado' }}
            </label>
            <div class="flex items-center gap-2 text-[11px] text-gray-400 dark:text-slate-500">
              <span>{{ saida.length }} chars</span>
              <span>|</span>
              <span>+{{ sizeIncrease }}% tamanho</span>
            </div>
          </div>
          <div class="relative">
            <textarea
              :value="saida"
              readonly
              rows="5"
              class="input-aurora resize-y font-mono text-sm bg-gray-50/80 dark:bg-slate-700/60 cursor-text"
            ></textarea>
            <div class="absolute top-2 right-2 flex gap-1.5">
              <button @click="copiar" class="copy-btn py-1">
                <i :class="['fas', copiado ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
                {{ copiado ? 'Copiado!' : 'Copiar' }}
              </button>
            </div>
          </div>

          <!-- Tamanho comparativo -->
          <div class="mt-3 glass-panel p-3">
            <div class="flex items-center gap-4 text-xs">
              <div class="flex-1">
                <p class="text-gray-500 dark:text-slate-400 mb-1">Original</p>
                <div class="strength-track">
                  <div class="strength-bar bg-blue-500" :style="{ width: '100%' }"></div>
                </div>
                <p class="font-mono font-bold text-gray-700 dark:text-slate-200 mt-0.5">{{ entrada.length }} chars</p>
              </div>
              <i class="fas fa-arrow-right text-gray-300 dark:text-slate-600"></i>
              <div class="flex-1">
                <p class="text-gray-500 dark:text-slate-400 mb-1">{{ modo === 'encode' ? 'Base64' : 'Decoded' }}</p>
                <div class="strength-track">
                  <div class="strength-bar" :class="modo === 'encode' ? 'bg-indigo-500' : 'bg-green-500'"
                    :style="{ width: Math.min((saida.length / entrada.length) * 100, 100) + '%' }"></div>
                </div>
                <p class="font-mono font-bold text-gray-700 dark:text-slate-200 mt-0.5">{{ saida.length }} chars</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'

const base64Examples = [
  { title: 'Texto simples', desc: 'Encode: Ola mundo!', code: 'T2zDoSBtdW5kbyE=', result: 'Decodificando volta ao original' },
  { title: 'JWT token',     desc: 'Payload de um JWT',  code: 'eyJzdWIiOiIxMjM0NTY3ODkw...', result: 'JSON com dados do usuario' },
  { title: 'Data URI',      desc: 'Imagem em Base64',   code: 'data_image_png_base64_iVBOR...', result: 'Embedding de imagens em HTML/CSS' },
]

const base64Tips = [
  { title: 'Base64 nao e criptografia', text: 'Base64 e apenas uma codificacao. Qualquer pessoa pode decodificar. Nao use para proteger dados sensiveis.' },
  { title: 'URL-safe Base64', text: 'Padrao URL usa traco e underline ao inves de mais e barra. Use para tokens JWT, parametros de URL e cookies.', type: 'info' as const },
  { title: 'Tamanho aumenta', text: 'O encoding Base64 aumenta o tamanho em ~33%. 100 bytes viram ~137 caracteres.', type: 'warning' as const },
]

const modo    = ref<'encode' | 'decode'>('encode')
const entrada = ref('')
const saida   = ref('')
const erro    = ref('')
const copiado = ref(false)
const urlSafe = ref(false)

const sizeIncrease = computed(() => {
  if (!entrada.value || !saida.value) return 0
  return Math.round(((saida.value.length / entrada.value.length) - 1) * 100)
})

function converter() {
  erro.value  = ''
  saida.value = ''
  if (!entrada.value) return
  try {
    if (modo.value === 'encode') {
      let r = btoa(unescape(encodeURIComponent(entrada.value)))
      if (urlSafe.value) r = r.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
      saida.value = r
    } else {
      let v = entrada.value
      if (urlSafe.value) v = v.replace(/-/g, '+').replace(/_/g, '/')
      saida.value = decodeURIComponent(escape(atob(v)))
    }
  } catch {
    erro.value = 'Erro ao converter. Verifique se o Base64 está correto e completo.'
  }
}

async function copiar() {
  await navigator.clipboard.writeText(saida.value)
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
}

async function colar() {
  try {
    entrada.value = await navigator.clipboard.readText()
    converter()
  } catch {
    Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Permissão de clipboard negada', showConfirmButton: false, timer: 2000 })
  }
}

function trocar() {
  if (!saida.value) return
  entrada.value = saida.value
  modo.value    = modo.value === 'encode' ? 'decode' : 'encode'
  converter()
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

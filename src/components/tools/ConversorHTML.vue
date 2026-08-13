<template>
  <div class="max-w-4xl mx-auto">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-4">
          <i class="fas fa-code text-orange-600 dark:text-orange-400 text-2xl"></i>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Conversor HTML</h1>
        <p class="text-gray-600 dark:text-gray-400">Encode e decode entidades HTML</p>
      </div>

      <div class="space-y-6">
        <div class="flex gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <button @click="modo = 'encode'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'encode' ? 'bg-orange-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-lock mr-2"></i>
            Encode (Text → HTML)
          </button>
          <button @click="modo = 'decode'" class="flex-1 py-3 px-4 rounded-lg font-medium transition-colors" :class="modo === 'decode' ? 'bg-orange-600 text-white' : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'">
            <i class="fas fa-unlock mr-2"></i>
            Decode (HTML → Text)
          </button>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {{ modo === 'encode' ? 'Texto Original' : 'Código HTML' }}
          </label>
          <textarea v-model="input" @input="converter" rows="8" placeholder="Digite ou cole aqui..." class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none font-mono text-sm"></textarea>
        </div>

        <div class="grid grid-cols-3 gap-4">
          <button @click="inserirCaractere('<')" class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg font-mono text-lg transition-colors">
            &lt;
          </button>
          <button @click="inserirCaractere('>')" class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg font-mono text-lg transition-colors">
            &gt;
          </button>
          <button @click="inserirCaractere('&')" class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg font-mono text-lg transition-colors">
            &amp;
          </button>
          <button @click="inserirCaractere('&quot;')" class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg font-mono text-lg transition-colors">
            &quot;
          </button>
          <button @click="inserirCaractere(`&apos;`)" class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg font-mono text-lg transition-colors">
            &apos;
          </button>
          <button @click="inserirCaractere('&nbsp;')" class="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-orange-900/20 rounded-lg font-mono text-lg transition-colors">
            &nbsp;
          </button>
        </div>

        <div v-if="output" class="space-y-4">
          <div>
            <div class="flex justify-between items-center mb-2">
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ modo === 'encode' ? 'HTML Encoded' : 'Texto Decodificado' }}
              </label>
              <button @click="copiar" class="px-3 py-1.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm transition-colors">
                <i class="fas fa-copy mr-1"></i>
                Copiar
              </button>
            </div>
            <div class="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <pre class="text-gray-900 dark:text-gray-100 text-sm font-mono whitespace-pre-wrap break-all">{{ output }}</pre>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ input.length }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Caracteres Entrada</div>
            </div>
            <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center">
              <div class="text-2xl font-bold text-orange-600 dark:text-orange-400">{{ output.length }}</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Caracteres Saída</div>
            </div>
          </div>
        </div>

        <div class="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-4">
          <div class="flex">
            <i class="fas fa-info-circle text-orange-600 dark:text-orange-400 mt-1 mr-3"></i>
            <div class="text-sm text-orange-800 dark:text-orange-300">
              <p class="font-semibold mb-2">Entidades HTML Comuns:</p>
              <ul class="grid grid-cols-2 gap-2 text-xs">
                <li><span class="font-mono">&amp;lt;</span> = &lt;</li>
                <li><span class="font-mono">&amp;gt;</span> = &gt;</li>
                <li><span class="font-mono">&amp;amp;</span> = &amp;</li>
                <li><span class="font-mono">&amp;quot;</span> = "</li>
                <li><span class="font-mono">&amp;apos;</span> = '</li>
                <li><span class="font-mono">&amp;nbsp;</span> = (espaço)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useAnalytics } from '../../composables/useAnalytics'

const { trackToolUsage } = useAnalytics()

const modo = ref('encode')
const input = ref('')
const output = ref('')

const htmlEncode = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
    ' ': '&nbsp;'
  }
  return text.replace(/[&<>"' ]/g, (m) => map[m])
}

const htmlDecode = (text) => {
  const textarea = document.createElement('textarea')
  textarea.innerHTML = text
  return textarea.value
}

const converter = () => {
  if (modo.value === 'encode') {
    output.value = htmlEncode(input.value)
  } else {
    output.value = htmlDecode(input.value)
  }
  
  if (input.value) {
    trackToolUsage('Conversor HTML', modo.value)
  }
}

const inserirCaractere = (char) => {
  input.value += char
  converter()
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(output.value)
    Swal.fire({
      title: 'Copiado!',
      text: 'Texto copiado para área de transferência',
      icon: 'success',
      timer: 1500,
      showConfirmButton: false
    })
  } catch {
    Swal.fire('Erro', 'Não foi possível copiar', 'error')
  }
}
</script>

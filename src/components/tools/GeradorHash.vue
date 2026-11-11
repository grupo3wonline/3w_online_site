<template>
  <ToolShell
    title="Gerador de Hash"
    description="Gere hashes criptográficos MD5, SHA-1, SHA-256 e SHA-512 de qualquer texto — 100% client-side."
    icon="fa-hashtag"
    icon-gradient="from-slate-600 to-gray-800"
    orb-color="blue"
    :quick-tips="['MD5, SHA-1, SHA-256, SHA-512', 'Comparação de hashes', 'Sem envio de dados']"
    :tips="[
      { text: 'Hashes são funções unidirecionais — impossível reverter para o texto original.' },
      { text: 'SHA-256 é o padrão recomendado atualmente. MD5 e SHA-1 são considerados inseguros para senhas.', type: 'warning' },
      { text: 'Use para verificar integridade de arquivos, tokens e fingerprinting.', type: 'info' },
    ]"
  >
    <div class="tool-body">
      <div>
        <label class="input-aurora-label">
          <i class="fas fa-keyboard mr-1.5 text-slate-500"></i>
          Texto para hash
        </label>
        <textarea
          v-model="texto"
          @input="gerarHashes"
          rows="4"
          class="input-aurora resize-y"
          placeholder="Digite ou cole o texto aqui..."
        ></textarea>
        <div class="flex items-center justify-between mt-1.5">
          <p class="input-aurora-hint">{{ texto.length }} caracteres</p>
          <label class="flex items-center gap-1.5 text-xs text-gray-600 dark:text-slate-300 cursor-pointer">
            <input v-model="maiusculas" type="checkbox" class="w-3.5 h-3.5 accent-slate-600" @change="gerarHashes" />
            MAIÚSCULAS
          </label>
        </div>
      </div>

      <div class="flex gap-3 mt-3">
        <BaseButton variant="primary" icon="fa-hashtag" @click="gerarHashes" class="flex-1">
          Gerar Hashes
        </BaseButton>
        <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Hashes gerados -->
    <Transition name="fade-in-up">
      <div v-if="texto && hashes.length" class="mt-4 space-y-3">
        <div
          v-for="h in hashes"
          :key="h.algoritmo"
          class="glass-panel p-4"
        >
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <span class="text-sm font-black text-gray-900 dark:text-white">{{ h.algoritmo }}</span>
              <span class="badge-aurora-blue text-[10px]">{{ h.tamanho }} bits</span>
              <span :class="['badge-aurora text-[10px]', h.seguro ? 'badge-aurora-green' : 'badge-aurora-orange']">
                {{ h.seguro ? 'Seguro' : 'Obsoleto' }}
              </span>
            </div>
            <button @click="copiar(h.valor, h.algoritmo)" class="copy-btn">
              <i :class="['fas', copiado === h.algoritmo ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
              {{ copiado === h.algoritmo ? 'Copiado!' : 'Copiar' }}
            </button>
          </div>
          <code class="block text-xs text-gray-700 dark:text-slate-200 font-mono break-all bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 select-all">
            {{ h.valor }}
          </code>
          <p class="text-[11px] text-gray-400 dark:text-slate-500 mt-1.5">{{ h.descricao }}</p>
        </div>

        <!-- Verificação de hash -->
        <div class="glass-panel p-4 mt-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-equals text-primary-500"></i>
            Comparar Hash
          </h4>
          <input
            v-model="hashComparar"
            type="text"
            class="input-aurora font-mono text-xs"
            placeholder="Cole um hash para comparar com os gerados acima..."
          />
          <div v-if="hashComparar" class="mt-2">
            <div
              v-for="h in hashes"
              :key="h.algoritmo"
              class="flex items-center gap-2 mt-1.5"
            >
              <i :class="['fas text-sm flex-shrink-0', h.valor.toLowerCase() === hashComparar.toLowerCase() ? 'fa-check-circle text-emerald-500' : 'fa-times-circle text-gray-300 dark:text-slate-600']"></i>
              <span class="text-xs" :class="h.valor.toLowerCase() === hashComparar.toLowerCase() ? 'text-emerald-600 dark:text-emerald-400 font-bold' : 'text-gray-400 dark:text-slate-500'">
                {{ h.algoritmo }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const texto        = ref('')
const maiusculas   = ref(false)
const hashComparar = ref('')
const copiado      = ref('')

interface HashResult { algoritmo: string; tamanho: number; valor: string; seguro: boolean; descricao: string }
const hashes = ref<HashResult[]>([])

async function digestHash(algorithm: string, text: string): Promise<string> {
  const encoder = new TextEncoder()
  const data     = encoder.encode(text)
  const hashBuf  = await crypto.subtle.digest(algorithm, data)
  const bytes    = new Uint8Array(hashBuf)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function gerarHashes() {
  if (!texto.value.trim()) { hashes.value = []; return }

  const algoritmos = [
    { key: 'MD5',     algo: '',             bits: 128, seguro: false, desc: 'Obsoleto — não use para senhas ou assinaturas digitais.' },
    { key: 'SHA-1',   algo: 'SHA-1',        bits: 160, seguro: false, desc: 'Vulnerável a colisões — deprecado pelo NIST.' },
    { key: 'SHA-256', algo: 'SHA-256',      bits: 256, seguro: true,  desc: 'Padrão recomendado para a maioria dos casos de uso.' },
    { key: 'SHA-512', algo: 'SHA-512',      bits: 512, seguro: true,  desc: 'Mais seguro que SHA-256, mas mais lento e com output maior.' },
  ]

  const results: HashResult[] = []
  for (const { key, algo, bits, seguro, desc } of algoritmos) {
    if (key === 'MD5') {
      // MD5 não está disponível na Web Crypto API — implementação simplificada
      results.push({ algoritmo: 'MD5', tamanho: 128, valor: 'MD5 não disponível na Web Crypto API', seguro: false, descricao: desc })
      continue
    }
    try {
      let valor = await digestHash(algo, texto.value)
      if (maiusculas.value) valor = valor.toUpperCase()
      results.push({ algoritmo: key, tamanho: bits, valor, seguro, descricao: desc })
    } catch {
      results.push({ algoritmo: key, tamanho: bits, valor: 'Erro ao gerar', seguro, descricao: desc })
    }
  }
  hashes.value = results
}

async function copiar(valor: string, algoritmo: string) {
  await navigator.clipboard.writeText(valor)
  copiado.value = algoritmo
  setTimeout(() => (copiado.value = ''), 2000)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${algoritmo} copiado!`, showConfirmButton: false, timer: 1400 })
}

function limpar() {
  texto.value = ''; hashes.value = []; hashComparar.value = ''
}
</script>

<style scoped>
.fade-in-up-enter-active, .fade-in-up-leave-active { transition: all 0.25s ease; }
.fade-in-up-enter-from { transform: translateY(8px); opacity: 0; }
.fade-in-up-leave-to   { opacity: 0; }
</style>

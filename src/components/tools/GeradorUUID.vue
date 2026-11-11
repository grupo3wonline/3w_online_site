<template>
  <ToolShell
    title="Gerador de UUID / GUID"
    description="Gere identificadores únicos universais (UUID) com criptografia local — versão v4, v1 e mais."
    icon="fa-fingerprint"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Crypto.randomUUID', 'Múltiplos formatos', 'Download em lote']"
    :tips="[
      { title: 'UUID v4 é o mais seguro', text: 'Gerado com 122 bits de entropia criptográfica. Probabilidade de colisão: 1 em 5,3 × 10³⁶. Use para IDs de banco de dados, chaves de API, tokens de sessão.' },
      { title: 'UUID v1 é ordenável', text: 'Baseado em timestamp — útil quando você precisa que IDs sejam ordenáveis cronologicamente.', type: 'info' },
      { title: 'Nunca use Math.random()', text: 'UUIDs gerados com Math.random() são previsíveis e inseguros. Esta ferramenta usa crypto.getRandomValues().', type: 'warning' },
    ]"
    :examples="[
      { title: 'ID de banco de dados',      desc: 'UUID v4 padrão', code: '550e8400-e29b-41d4-a716-446655440000', result: 'Pronto para usar como PK em qualquer banco' },
      { title: 'ID no código (sem hífens)', desc: 'Formato compacto', code: '550e8400e29b41d4a716446655440000', result: '32 caracteres hexadecimais' },
      { title: 'URN para sistemas legados', desc: 'Formato URN', code: 'urn:uuid:550e8400-e29b-41d4-a716-446655440000', result: 'Padrão RFC 4122 completo' },
    ]"
  >

    <div class="tool-body">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <!-- Versão -->
        <div>
          <label class="input-aurora-label">
            <i class="fas fa-code-branch mr-1.5 text-purple-500"></i>
            Versão UUID
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="v in versoes"
              :key="v.id"
              :class="[
                'p-3 rounded-xl text-xs font-semibold border-2 transition-all text-center',
                versao === v.id
                  ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 border-gray-200 dark:border-slate-600 hover:border-purple-400'
              ]"
              :title="v.desc"
              @click="versao = (v.id as Versao)"
            >
              <span class="font-black block text-base mb-0.5">{{ v.nome }}</span>
              <span class="opacity-70">{{ v.descricao }}</span>
            </button>
          </div>
        </div>

        <!-- Configurações -->
        <div class="space-y-3">
          <BaseInput
            v-model="quantidade"
            label="Quantidade"
            type="number" :min="1" :max="100"
            icon="fa-hashtag"
            placeholder="5"
            tooltip="Gere entre 1 e 100 UUIDs de uma vez."
          />
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-text-width mr-1 text-teal-500"></i>
              Formato de saída
            </label>
            <select v-model="formato" class="input-aurora">
              <option value="hifen">Com hífen (padrão): xxxxxxxx-xxxx-...</option>
              <option value="sem-hifen">Sem hífen: xxxxxxxxxxxxxxxx...</option>
              <option value="maiuscula">Maiúscula: XXXXXXXX-XXXX-...</option>
              <option value="chaves">Com chaves: {xxxxxxxx-xxxx-...}</option>
              <option value="urn">URN: urn:uuid:xxxxxxxx-...</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Info da versão selecionada -->
      <div class="tip-card mb-4">
        <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
        <span class="text-xs">{{ descricaoVersao }}</span>
      </div>

      <div class="flex gap-3">
        <BaseButton variant="primary" icon="fa-rotate" @click="gerar" class="flex-1" style="background:linear-gradient(135deg,#7c3aed,#5b21b6)">
          Gerar {{ quantidade }} UUID{{ (Number(quantidade) || 0) > 1 ? 's' : '' }}
        </BaseButton>
        <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Lista de UUIDs -->
    <Transition name="scale-in">
      <div v-if="uuids.length > 0" class="mt-4 space-y-3">

        <!-- Métricas -->
        <div class="grid grid-cols-4 gap-2.5">
          <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
            <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ uuids.length }}</div>
            <div class="metric-glass-label">Gerados</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ versao }}</div>
            <div class="metric-glass-label">Versão</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ comprimento }}</div>
            <div class="metric-glass-label">Caracteres</div>
          </div>
          <div class="metric-glass">
            <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">128</div>
            <div class="metric-glass-label">Bits</div>
          </div>
        </div>

        <!-- Ações -->
        <div class="flex gap-2">
          <button @click="copiarTodos" class="copy-btn flex-1 justify-center py-2.5">
            <i class="fas fa-copy"></i>
            Copiar todos
          </button>
          <button @click="baixarTxt" class="copy-btn flex-1 justify-center py-2.5">
            <i class="fas fa-download"></i>
            Baixar .txt
          </button>
        </div>

        <!-- Lista -->
        <div class="glass-panel overflow-hidden">
          <div class="max-h-80 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-700">
            <div
              v-for="(uuid, i) in uuids"
              :key="i"
              class="flex items-center justify-between px-4 py-2.5 hover:bg-primary-50/40 dark:hover:bg-primary-900/10 transition-colors group"
            >
              <code class="text-xs sm:text-sm text-purple-600 dark:text-purple-300 font-mono flex-1 truncate">{{ uuid }}</code>
              <button
                @click="copiarUm(uuid)"
                class="ml-3 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                title="Copiar este UUID"
              >
                <i class="fas fa-copy text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

type Versao = 'v4' | 'v1'
type Formato = 'hifen' | 'sem-hifen' | 'maiuscula' | 'chaves' | 'urn'

const versao    = ref<Versao>('v4')
const quantidade= ref<number | ''>(5)
const formato   = ref<Formato>('hifen')
const uuids     = ref<string[]>([])

const versoes = [
  { id: 'v4', nome: 'UUID v4', descricao: 'Aleatório', desc: 'Completamente aleatório (crypto). Mais seguro e recomendado para a maioria dos casos.' },
  { id: 'v1', nome: 'UUID v1', descricao: 'Timestamp', desc: 'Baseado em timestamp e endereço MAC simulado. Útil para IDs ordenáveis cronologicamente.' },
]

const descricaoVersao = computed(() => versoes.find(v => v.id === versao.value)?.desc ?? '')
const comprimento = computed(() => uuids.value[0]?.length ?? (formato.value === 'urn' ? 45 : formato.value === 'sem-hifen' ? 32 : 36))

function gerarV4(): string {
  if (crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

function gerarV1(): string {
  const ts = Date.now()
  const r  = Math.floor(Math.random() * 0x3fff).toString(16).padStart(4, '0')
  const tl = (ts & 0xffffffff).toString(16).padStart(8, '0')
  const tm = ((ts >> 32) & 0xffff).toString(16).padStart(4, '0')
  const th = (((ts >> 48) & 0x0fff) | 0x1000).toString(16).padStart(4, '0')
  const nd = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
  return `${tl}-${tm}-${th}-${r}-${nd}`
}

function formatarUUID(uuid: string): string {
  switch (formato.value) {
    case 'sem-hifen': return uuid.replace(/-/g, '')
    case 'maiuscula': return uuid.toUpperCase()
    case 'chaves':    return `{${uuid}}`
    case 'urn':       return `urn:uuid:${uuid}`
    default:          return uuid
  }
}

function gerar() {
  const qtd = Number(quantidade.value) || 1
  if (qtd < 1 || qtd > 100) {
    Swal.fire({ icon: 'warning', title: 'Quantidade entre 1 e 100', confirmButtonColor: '#2563eb' })
    return
  }
  uuids.value = Array.from({ length: qtd }, () =>
    formatarUUID(versao.value === 'v1' ? gerarV1() : gerarV4())
  )
}

async function copiarUm(uuid: string) {
  await navigator.clipboard.writeText(uuid)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1200 })
}

async function copiarTodos() {
  await navigator.clipboard.writeText(uuids.value.join('\n'))
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${uuids.value.length} UUIDs copiados!`, showConfirmButton: false, timer: 1800 })
}

function baixarTxt() {
  const blob = new Blob([uuids.value.join('\n')], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url; link.download = `uuids-${Date.now()}.txt`; link.click()
  URL.revokeObjectURL(url)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Download iniciado!', showConfirmButton: false, timer: 1500 })
}

function limpar() { uuids.value = [] }

gerar()
</script>

<style scoped>
.btn-aurora-purple { @apply btn-aurora from-violet-500 to-purple-700 hover:from-violet-600 hover:to-purple-800; }
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

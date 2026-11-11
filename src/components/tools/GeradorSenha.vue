<template>
  <ToolShell
    title="Gerador de Senhas Seguras"
    description="Crie senhas fortes com criptografia local — seus dados jamais saem do navegador."
    icon="fa-lock"
    icon-gradient="from-violet-500 to-purple-700"
    orb-color="purple"
    :quick-tips="['100% Client-Side', 'Sem armazenamento', 'Entropia criptográfica']"
    :tips="[
      { title: 'Comprimento ideal', text: 'Senhas com 16+ caracteres são exponencialmente mais difíceis de quebrar por força bruta.' },
      { title: 'Símbolos aumentam a segurança', text: 'Incluir símbolos especiais multiplica por 32x o espaço de busca do atacante.', type: 'info' },
      { title: 'Não reutilize senhas', text: 'Use um gerenciador de senhas (Bitwarden, 1Password) para guardar senhas únicas por site.', type: 'warning' },
    ]"
    :examples="[
      { title: 'Senha para conta bancária',  desc: '20 caracteres, maiúsculas + números + símbolos.', result: 'xK#9mP!2rQv@LnTw&8Yc' },
      { title: 'Senha para Wi-Fi doméstico', desc: '16 caracteres, letras + números.',                result: 'Ak5rPm8vXn2wQj9L' },
      { title: 'PIN de 8 dígitos',           desc: 'Apenas números, 8 caracteres.',                   result: '74920318' },
    ]"
  >
    <!-- ── Painel de configuração ─────────────────────────────── -->
    <div class="tool-body">
      <!-- Comprimento -->
      <div class="mb-5">
        <div class="flex items-center justify-between mb-2">
          <label class="input-aurora-label">
            <i class="fas fa-ruler-horizontal mr-1.5 text-primary-500"></i>
            Comprimento da Senha
          </label>
          <span class="text-2xl font-black text-primary-600 dark:text-primary-400 tabular-nums">
            {{ comprimento }}
          </span>
        </div>
        <input
          v-model.number="comprimento"
          type="range"
          :min="4"
          :max="128"
          class="range-aurora"
          @input="gerarSenha"
        />
        <div class="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 mt-1">
          <span>4 (mínimo)</span>
          <span>Recomendado: 16–32</span>
          <span>128 (máximo)</span>
        </div>
      </div>

      <!-- Opções de caracteres -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
        <label
          v-for="opt in opcoes"
          :key="opt.key"
          class="checkbox-aurora"
          :class="{ 'ring-1 ring-primary-400 dark:ring-primary-500 bg-primary-50/60 dark:bg-primary-900/20': form[opt.key as keyof typeof form] }"
        >
          <input
            type="checkbox"
            v-model="form[opt.key as keyof typeof form]"
            class="w-4 h-4 rounded text-primary-600 accent-primary-600"
            @change="gerarSenha"
          />
          <div class="flex-1 min-w-0">
            <span class="font-semibold text-sm">{{ opt.label }}</span>
            <span class="text-[11px] text-gray-500 dark:text-slate-400 ml-1.5">{{ opt.example }}</span>
          </div>
          <i :class="['fas', opt.icon, 'text-xs', opt.color]"></i>
        </label>
      </div>

      <!-- Excluir ambíguos -->
      <label class="checkbox-aurora">
        <input type="checkbox" v-model="excluirAmbiguos" class="w-4 h-4 rounded accent-primary-600" @change="gerarSenha" />
        <div>
          <span class="font-semibold text-sm">Excluir caracteres ambíguos</span>
          <p class="text-[11px] text-gray-500 dark:text-slate-400">Remove 0, O, l, 1 para evitar confusão visual</p>
        </div>
        <i class="fas fa-eye-slash text-xs text-gray-400"></i>
      </label>
    </div>

    <!-- ── Resultado ─────────────────────────────────────────── -->
    <div v-if="senhaGerada" class="tool-result-info">

      <!-- Senha em destaque -->
      <div class="bg-slate-900 dark:bg-slate-950 rounded-xl p-4 mb-4">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs font-semibold text-slate-400">
            <i class="fas fa-key mr-1"></i>
            Senha Gerada
          </span>
          <div class="flex items-center gap-2">
            <!-- Badge de força -->
            <span :class="['badge-aurora text-[11px]', forcaBadgeClass]">
              <i :class="['fas', forcaIcon, 'text-[9px]']"></i>
              {{ forcaLabel }}
            </span>
            <button @click="copiar" class="copy-btn" :title="copiado ? 'Copiado!' : 'Copiar senha'">
              <i :class="['fas', copiado ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
              {{ copiado ? 'Copiado!' : 'Copiar' }}
            </button>
          </div>
        </div>
        <p class="font-mono text-lg sm:text-xl text-white break-all leading-relaxed select-all">
          {{ senhaGerada }}
        </p>
      </div>

      <!-- Barra de força -->
      <div class="mb-4">
        <div class="flex items-center justify-between mb-1.5 text-xs font-semibold">
          <span class="text-gray-700 dark:text-slate-200">Força da senha</span>
          <span :class="forcaTextClass">{{ forcaLabel }} ({{ forca }}/5)</span>
        </div>
        <div class="strength-track">
          <div
            class="strength-bar"
            :class="forcaBarClass"
            :style="{ width: `${(forca / 5) * 100}%` }"
          ></div>
        </div>
      </div>

      <!-- Métricas -->
      <div class="grid grid-cols-3 gap-3 mb-4">
        <div class="metric-glass">
          <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ comprimento }}</div>
          <div class="metric-glass-label">Caracteres</div>
        </div>
        <div class="metric-glass">
          <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ entropia.toFixed(0) }}</div>
          <div class="metric-glass-label">Bits de Entropia</div>
        </div>
        <div class="metric-glass">
          <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ tempoCrack }}</div>
          <div class="metric-glass-label">Tempo p/ quebrar</div>
        </div>
      </div>

      <!-- Sugestão de uso -->
      <div :class="['tip-card', forca < 3 ? 'tip-card-warning' : 'tip-card-success']">
        <i :class="['fas', forca < 3 ? 'fa-exclamation-triangle text-amber-500' : 'fa-shield-halved text-emerald-500', 'flex-shrink-0 mt-0.5']"></i>
        <span>{{ sugestao }}</span>
      </div>
    </div>

    <!-- ── Ações ─────────────────────────────────────────────── -->
    <div class="flex flex-col sm:flex-row gap-3 mt-2">
      <BaseButton variant="primary" icon="fa-sync-alt" @click="gerarSenha" class="flex-1">
        Nova Senha
      </BaseButton>
      <BaseButton variant="success" icon="fa-copy" @click="copiar" :disabled="!senhaGerada">
        {{ copiado ? 'Copiado!' : 'Copiar Senha' }}
      </BaseButton>
      <BaseButton variant="outline" icon="fa-list-ul" @click="gerarLote" :disabled="!senhaGerada">
        Gerar Lote
      </BaseButton>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

// ─── Estado ───────────────────────────────────────────────────────
const comprimento   = ref(16)
const excluirAmbiguos = ref(false)
const senhaGerada   = ref('')
const copiado       = ref(false)

const form = ref({
  maiusculas: true,
  minusculas: true,
  numeros:    true,
  simbolos:   false,
})

const opcoes = [
  { key: 'maiusculas', label: 'Maiúsculas',  example: 'A–Z',       icon: 'fa-font',           color: 'text-blue-500'   },
  { key: 'minusculas', label: 'Minúsculas',  example: 'a–z',       icon: 'fa-font',           color: 'text-green-500'  },
  { key: 'numeros',    label: 'Números',      example: '0–9',       icon: 'fa-hashtag',        color: 'text-purple-500' },
  { key: 'simbolos',   label: 'Símbolos',     example: '!@#$%^&*',  icon: 'fa-star-of-david',  color: 'text-orange-500' },
]

// ─── Geração ──────────────────────────────────────────────────────
const CHARS = {
  maiusculas: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  minusculas: 'abcdefghijklmnopqrstuvwxyz',
  numeros:    '0123456789',
  simbolos:   '!@#$%^&*()-_=+[]{}|;:,.<>?',
}

const AMBIGUOS = /[0O1l]/g

function gerarSenha() {
  let pool = ''
  if (form.value.maiusculas) pool += CHARS.maiusculas
  if (form.value.minusculas) pool += CHARS.minusculas
  if (form.value.numeros)    pool += CHARS.numeros
  if (form.value.simbolos)   pool += CHARS.simbolos

  if (!pool) {
    Swal.fire({ icon: 'warning', title: 'Selecione pelo menos um tipo de caractere!', confirmButtonColor: '#2563eb' })
    return
  }

  if (excluirAmbiguos.value) pool = pool.replace(AMBIGUOS, '')

  const array = new Uint32Array(comprimento.value)
  crypto.getRandomValues(array)
  senhaGerada.value = Array.from(array, (n) => pool[n % pool.length]).join('')
}

// ─── Métricas ─────────────────────────────────────────────────────
const poolSize = computed(() => {
  let size = 0
  if (form.value.maiusculas) size += 26
  if (form.value.minusculas) size += 26
  if (form.value.numeros)    size += 10
  if (form.value.simbolos)   size += 32
  if (excluirAmbiguos.value) size = Math.max(size - 4, 1)
  return size
})

const entropia = computed(() => comprimento.value * Math.log2(poolSize.value || 1))

const forca = computed(() => {
  const e = entropia.value
  if (e < 28) return 1
  if (e < 36) return 2
  if (e < 60) return 3
  if (e < 128) return 4
  return 5
})

const forcaLabel = computed(() => ['', 'Muito Fraca', 'Fraca', 'Média', 'Forte', 'Muito Forte'][forca.value])
const forcaIcon  = computed(() => ['', 'fa-times-circle', 'fa-exclamation-circle', 'fa-minus-circle', 'fa-check-circle', 'fa-shield-halved'][forca.value])

const forcaBarClass = computed(() => [
  '', 'bg-red-500', 'bg-orange-500', 'bg-amber-400', 'bg-emerald-500', 'bg-primary-500',
][forca.value])

const forcaTextClass = computed(() => [
  '', 'text-red-500', 'text-orange-500', 'text-amber-500', 'text-emerald-500', 'text-primary-500',
][forca.value])

const forcaBadgeClass = computed(() => [
  '', 'badge-aurora bg-red-100 text-red-700', 'badge-aurora bg-orange-100 text-orange-700',
  'badge-aurora-orange', 'badge-aurora-green', 'badge-aurora-blue',
][forca.value])

const tempoCrack = computed(() => {
  const bits = entropia.value
  if (bits < 28) return '< 1s'
  if (bits < 40) return 'segundos'
  if (bits < 56) return 'horas'
  if (bits < 70) return 'anos'
  if (bits < 90) return 'séculos'
  return '∞ eterno'
})

const sugestao = computed(() => {
  if (forca.value <= 2) return 'Senha fraca. Aumente o comprimento para 16+ e adicione símbolos.'
  if (forca.value === 3) return 'Senha aceitável para uso geral. Para contas críticas, use 20+ caracteres.'
  if (forca.value === 4) return 'Senha forte. Adequada para contas bancárias e e-mails principais.'
  return 'Senha muito forte! Praticamente impossível de quebrar por força bruta.'
})

// ─── Ações ────────────────────────────────────────────────────────
async function copiar() {
  if (!senhaGerada.value) return
  await navigator.clipboard.writeText(senhaGerada.value)
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
}

async function gerarLote() {
  const { value: qtd } = await Swal.fire({
    title: 'Gerar Lote de Senhas',
    input: 'number',
    inputLabel: 'Quantas senhas deseja gerar?',
    inputValue: 10,
    inputAttributes: { min: '1', max: '50' },
    confirmButtonText: 'Gerar',
    confirmButtonColor: '#2563eb',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
  })
  if (!qtd) return

  let pool = ''
  if (form.value.maiusculas) pool += CHARS.maiusculas
  if (form.value.minusculas) pool += CHARS.minusculas
  if (form.value.numeros)    pool += CHARS.numeros
  if (form.value.simbolos)   pool += CHARS.simbolos
  if (excluirAmbiguos.value) pool = pool.replace(AMBIGUOS, '')

  const lote: string[] = []
  for (let i = 0; i < Number(qtd); i++) {
    const arr = new Uint32Array(comprimento.value)
    crypto.getRandomValues(arr)
    lote.push(Array.from(arr, (n) => pool[n % pool.length]).join(''))
  }

  Swal.fire({
    title: `${qtd} Senhas Geradas`,
    html: `<div style="text-align:left;font-family:monospace;font-size:0.85rem;line-height:1.8;max-height:300px;overflow-y:auto;background:#1e293b;padding:12px;border-radius:8px;color:#a3e635">${lote.join('<br>')}</div>`,
    confirmButtonText: 'Copiar Todas',
    confirmButtonColor: '#2563eb',
    showCancelButton: true,
    cancelButtonText: 'Fechar',
    preConfirm: () => navigator.clipboard.writeText(lote.join('\n')),
  })
}

onMounted(gerarSenha)
</script>

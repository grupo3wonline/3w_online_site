<template>
  <ToolShell
    title="Validador de CPF"
    description="Valide CPFs brasileiros com verificação de dígitos verificadores e formatação automática."
    icon="fa-id-card"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['100% Client-Side', 'Sem envio de dados', 'Verificação real']"
    :tips="[
      { title: 'Apenas para validação', text: 'Esta ferramenta verifica apenas a estrutura matemática do CPF. Não valida a existência ou situação do CPF na Receita Federal.' },
      { title: 'CPFs para teste',       text: 'Gere CPFs válidos para ambiente de desenvolvimento usando o Gerador de CPF/CNPJ desta suíte.', type: 'info' },
      { title: 'LGPD e Privacidade',    text: 'Nenhum CPF é registrado ou enviado. O processamento ocorre 100% no navegador.', type: 'success' },
    ]"
    :examples="[
      { title: 'CPF válido formatado',    desc: '111.444.777-35 → válido',    result: '✅ CPF válido' },
      { title: 'CPF válido sem máscara',  desc: '11144477735 → válido',       result: '✅ CPF válido' },
      { title: 'CPF sequencial inválido', desc: '111.111.111-11 → inválido',  result: '❌ Dígitos verificadores incorretos' },
    ]"
  >
    <!-- ── Entrada ────────────────────────────────────────────── -->
    <div class="tool-body">
      <BaseInput
        v-model="cpfRaw"
        label="CPF para validar"
        icon="fa-id-card"
        placeholder="000.000.000-00 ou 00000000000"
        :max="14"
        tooltip="Digite ou cole o CPF. Aceita com ou sem formatação. Máximo de 14 caracteres incluindo pontos e traço."
        hint="Aceita os formatos: 000.000.000-00 ou 00000000000"
        :error="erro"
        clearable
        @input="onInput"
        @enter="validar"
      />

      <!-- CPF formatado em tempo real -->
      <div v-if="cpfFormatado" class="mt-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40">
        <span class="text-xs text-blue-600 dark:text-blue-300">
          <i class="fas fa-magic mr-1.5"></i>
          Formatado: <strong class="font-mono">{{ cpfFormatado }}</strong>
        </span>
      </div>

      <div class="flex gap-3 mt-4">
        <BaseButton variant="primary" icon="fa-search" @click="validar" class="flex-1">
          Validar CPF
        </BaseButton>
        <BaseButton variant="outline" icon="fa-trash-alt" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- ── Resultado ─────────────────────────────────────────── -->
    <Transition name="scale-in">
      <div v-if="resultado !== null" class="mt-4">

        <!-- Badge de resultado grande -->
        <div :class="[
          'flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl border-2 text-center sm:text-left',
          resultado.valido
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/15 border-emerald-300 dark:border-emerald-700'
            : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/15 border-red-300 dark:border-red-700',
        ]">
          <div :class="[
            'w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 mx-auto sm:mx-0 shadow-lg',
            resultado.valido ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 'bg-gradient-to-br from-red-400 to-rose-600',
          ]">
            <i :class="['fas', resultado.valido ? 'fa-check' : 'fa-times']"></i>
          </div>
          <div>
            <h3 :class="['text-xl font-black', resultado.valido ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400']">
              {{ resultado.valido ? 'CPF Válido ✓' : 'CPF Inválido ✗' }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{{ resultado.mensagem }}</p>
            <div v-if="resultado.valido" class="flex flex-wrap gap-2 mt-2">
              <span class="stat-pill">
                <i class="fas fa-id-card text-blue-500 text-[10px]"></i>
                {{ cpfFormatado }}
              </span>
              <span class="stat-pill">
                <i class="fas fa-hashtag text-purple-500 text-[10px]"></i>
                {{ resultado.digito1 }}-{{ resultado.digito2 }} (dígitos)
              </span>
            </div>
          </div>
        </div>

        <!-- Detalhes técnicos (válido) -->
        <div v-if="resultado.valido" class="mt-4 glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-cogs text-primary-500"></i>
            Análise Técnica
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50">
              <span class="font-semibold text-gray-500 dark:text-slate-400">CPF sem formatação</span>
              <p class="font-mono font-bold text-gray-900 dark:text-white mt-0.5">{{ cpfSoNums }}</p>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50">
              <span class="font-semibold text-gray-500 dark:text-slate-400">Dígitos verificadores</span>
              <p class="font-mono font-bold text-gray-900 dark:text-white mt-0.5">{{ resultado.digito1 }} e {{ resultado.digito2 }}</p>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50">
              <span class="font-semibold text-gray-500 dark:text-slate-400">Algoritmo</span>
              <p class="font-bold text-gray-900 dark:text-white mt-0.5">Módulo 11 — Receita Federal</p>
            </div>
            <div class="p-3 rounded-lg bg-gray-50 dark:bg-slate-700/50">
              <span class="font-semibold text-gray-500 dark:text-slate-400">Privacidade</span>
              <p class="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">🔒 Dados locais</p>
            </div>
          </div>
        </div>

        <!-- Ação de copiar -->
        <div v-if="resultado.valido" class="mt-3 flex gap-2">
          <button @click="copiarCPF(false)" class="copy-btn flex-1 justify-center py-2">
            <i class="fas fa-copy"></i>
            Copiar sem máscara
          </button>
          <button @click="copiarCPF(true)" class="copy-btn flex-1 justify-center py-2">
            <i class="fas fa-copy"></i>
            Copiar formatado
          </button>
        </div>
      </div>
    </Transition>

    <!-- ── Validação em lote ───────────────────────────────── -->
    <div class="mt-5">
      <button @click="toggleLote" class="accordion-trigger">
        <span class="flex items-center gap-2 text-sm">
          <i class="fas fa-list-check text-primary-500"></i>
          Validação em Lote
        </span>
        <i :class="['fas', loteOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400']"></i>
      </button>
      <Transition name="accordion">
        <div v-if="loteOpen" class="mt-3 space-y-3">
          <BaseInput
            v-model="cpfsLote"
            type="textarea"
            label="Cole múltiplos CPFs (um por linha)"
            placeholder="111.444.777-35&#10;52998224725&#10;000.000.000-00"
            :rows="6"
          />
          <BaseButton variant="primary" icon="fa-check-double" @click="validarLote" class="w-full">
            Validar Todos
          </BaseButton>
        </div>
      </Transition>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

// ─── Estado ───────────────────────────────────────────────────────
const cpfRaw    = ref('')
const erro      = ref('')
const loteOpen  = ref(false)
const cpfsLote  = ref('')

interface ResultadoCPF {
  valido:    boolean
  mensagem:  string
  digito1:   number
  digito2:   number
}

const resultado = ref<ResultadoCPF | null>(null)

// ─── Formatação ───────────────────────────────────────────────────
const cpfSoNums = computed(() => cpfRaw.value.replace(/\D/g, ''))

const cpfFormatado = computed(() => {
  const n = cpfSoNums.value
  if (n.length < 3) return ''
  if (n.length <= 6) return `${n.slice(0,3)}.${n.slice(3)}`
  if (n.length <= 9) return `${n.slice(0,3)}.${n.slice(3,6)}.${n.slice(6)}`
  return `${n.slice(0,3)}.${n.slice(3,6)}.${n.slice(6,9)}-${n.slice(9,11)}`
})

// ─── Algoritmo de validação ───────────────────────────────────────
function calcularDigito(cpf: string, pos: number): number {
  let soma = 0
  for (let i = 0; i < pos; i++) soma += parseInt(cpf[i]) * (pos + 1 - i)
  const resto = (soma * 10) % 11
  return resto === 10 || resto === 11 ? 0 : resto
}

function validarCPF(cpf: string): ResultadoCPF {
  const n = cpf.replace(/\D/g, '')
  if (n.length !== 11)      return { valido: false, mensagem: 'CPF deve ter exatamente 11 dígitos.', digito1: 0, digito2: 0 }
  if (/^(\d)\1{10}$/.test(n)) return { valido: false, mensagem: 'CPF inválido — sequência repetida de dígitos.', digito1: 0, digito2: 0 }
  const d1 = calcularDigito(n, 9)
  const d2 = calcularDigito(n, 10)
  if (d1 !== parseInt(n[9]) || d2 !== parseInt(n[10])) {
    return { valido: false, mensagem: `Dígitos verificadores incorretos (esperado: ${d1}${d2}, recebido: ${n[9]}${n[10]}).`, digito1: d1, digito2: d2 }
  }
  return { valido: true, mensagem: 'CPF estruturalmente válido (dígitos verificadores corretos).', digito1: d1, digito2: d2 }
}

// ─── Handlers ─────────────────────────────────────────────────────
function onInput() {
  erro.value = ''
  resultado.value = null
  if (cpfSoNums.value.length > 11) {
    cpfRaw.value = cpfFormatado.value.slice(0, 14)
  }
}

function validar() {
  const n = cpfSoNums.value
  if (!n) { erro.value = 'Digite um CPF para validar.'; return }
  if (n.length !== 11) { erro.value = `CPF incompleto (${n.length}/11 dígitos).`; return }
  erro.value = ''
  resultado.value = validarCPF(n)
}

function limpar() {
  cpfRaw.value = ''
  erro.value   = ''
  resultado.value = null
}

async function copiarCPF(formatado: boolean) {
  const val = formatado ? cpfFormatado.value : cpfSoNums.value
  await navigator.clipboard.writeText(val)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'CPF copiado!', showConfirmButton: false, timer: 1800 })
}

function toggleLote() { loteOpen.value = !loteOpen.value }

function validarLote() {
  const lines = cpfsLote.value.split('\n').map(l => l.trim()).filter(Boolean)
  if (!lines.length) return

  const rows = lines.map(l => {
    const r = validarCPF(l)
    const f = l.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
    return `<tr>
      <td style="padding:4px 8px;font-family:monospace">${f}</td>
      <td style="padding:4px 8px;font-weight:bold;color:${r.valido ? '#059669' : '#dc2626'}">${r.valido ? '✅ Válido' : '❌ Inválido'}</td>
      <td style="padding:4px 8px;font-size:0.75rem;color:#6b7280">${r.mensagem}</td>
    </tr>`
  }).join('')

  const validos   = lines.filter(l => validarCPF(l).valido).length
  const invalidos = lines.length - validos

  Swal.fire({
    title: `Resultado: ${lines.length} CPFs`,
    html: `
      <div style="margin-bottom:12px;display:flex;gap:12px;justify-content:center">
        <span style="background:#d1fae5;color:#065f46;padding:4px 10px;border-radius:20px;font-size:0.8rem;font-weight:bold">✅ Válidos: ${validos}</span>
        <span style="background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:20px;font-size:0.8rem;font-weight:bold">❌ Inválidos: ${invalidos}</span>
      </div>
      <div style="max-height:300px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:8px">
        <table style="width:100%;border-collapse:collapse;font-size:0.8rem">
          <thead style="background:#f9fafb;position:sticky;top:0">
            <tr><th style="padding:6px 8px;text-align:left">CPF</th><th style="padding:6px 8px">Status</th><th style="padding:6px 8px;text-align:left">Detalhe</th></tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`,
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#2563eb',
    width: 640,
  })
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
.accordion-enter-active, .accordion-leave-active { transition: all 0.25s ease; overflow: hidden; max-height: 600px; }
.accordion-enter-from, .accordion-leave-to       { max-height: 0; opacity: 0; }
</style>

<template>
  <ToolShell
    title="Validador de CEP"
    description="Valide CEPs brasileiros, consulte o endereço completo via ViaCEP e formate automaticamente."
    icon="fa-map-marker-alt"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Formato 00000-000', 'Consulta ViaCEP', 'Validação em lote']"
    :tips="[
      { text: 'CEP tem exatamente 8 dígitos numéricos. Pontuação é opcional.' },
      { text: 'A consulta de endereço usa a API pública ViaCEP (online necessário).', type: 'info' },
      { text: 'CEPs com prefixo 01000 a 09999 são do município de São Paulo.', type: 'info' },
    ]"
  >
    <div class="tool-body">
      <BaseInput
        v-model="cep"
        label="CEP"
        icon="fa-map-marker-alt"
        placeholder="00000-000"
        clearable
        tooltip="Digite o CEP com ou sem hífens. Aceita exatamente 8 dígitos numéricos."
        :error="erro"
        @input="onInput"
        @enter="validar"
        :max="9"
      />

      <div class="flex gap-3 mt-4">
        <BaseButton variant="success" icon="fa-check" @click="validar" class="flex-1">
          Validar CEP
        </BaseButton>
        <BaseButton variant="primary" icon="fa-search" @click="consultarCep" :loading="consultando">
          Consultar Endereço
        </BaseButton>
        <BaseButton variant="outline" icon="fa-trash-alt" @click="limpar">
          Limpar
        </BaseButton>
      </div>
    </div>

    <!-- Resultado de validação -->
    <Transition name="scale-in">
      <div v-if="resultado" class="mt-4 space-y-4">
        <div :class="[
          'flex items-center gap-4 p-5 rounded-2xl border-2',
          valido
            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/15 border-emerald-300 dark:border-emerald-700'
            : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/15 border-red-300 dark:border-red-700',
        ]">
          <div :class="['w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg', valido ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 'bg-gradient-to-br from-red-400 to-rose-600']">
            <i :class="['fas', valido ? 'fa-check' : 'fa-times']"></i>
          </div>
          <div>
            <h3 :class="['text-xl font-black', valido ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400']">
              {{ valido ? 'CEP Válido ✓' : 'CEP Inválido ✗' }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{{ mensagem }}</p>
            <div v-if="valido" class="flex gap-2 mt-2">
              <span class="stat-pill font-mono">{{ cepFormatado }}</span>
            </div>
          </div>
        </div>

        <!-- Dados do endereço (da API) -->
        <div v-if="endereco" class="glass-panel p-4">
          <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
            <i class="fas fa-map-pin text-emerald-500"></i>
            Endereço Encontrado
          </h4>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div v-for="campo in camposEndereco" :key="campo.label"
              class="p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl border border-gray-100 dark:border-slate-600">
              <p class="text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase mb-0.5">{{ campo.label }}</p>
              <p class="font-bold text-gray-900 dark:text-white text-sm">{{ campo.valor || '—' }}</p>
            </div>
          </div>
          <button @click="copiarEndereco" class="copy-btn mt-3 w-full justify-center py-2.5">
            <i class="fas fa-copy"></i>
            Copiar endereço completo
          </button>
        </div>

        <!-- Sem dados de endereço mas CEP válido -->
        <div v-else-if="valido && !consultando" class="tip-card">
          <i class="fas fa-info-circle text-blue-500 flex-shrink-0 mt-0.5"></i>
          <span class="text-xs">
            CEP válido estruturalmente. Clique em <strong>"Consultar Endereço"</strong> para buscar o endereço via ViaCEP.
          </span>
        </div>

        <!-- Ações de cópia -->
        <div v-if="valido" class="flex gap-2">
          <button @click="copiarCEP(false)" class="copy-btn flex-1 justify-center py-2.5">
            <i class="fas fa-copy"></i> Copiar sem máscara
          </button>
          <button @click="copiarCEP(true)" class="copy-btn flex-1 justify-center py-2.5">
            <i class="fas fa-copy"></i> Copiar formatado
          </button>
        </div>
      </div>
    </Transition>

    <!-- Lote -->
    <div class="mt-5">
      <button @click="loteOpen = !loteOpen" class="accordion-trigger">
        <span class="flex items-center gap-2 text-sm">
          <i class="fas fa-list-check text-primary-500"></i>
          Validar múltiplos CEPs
        </span>
        <i :class="['fas', loteOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400']"></i>
      </button>
      <Transition name="accordion">
        <div v-if="loteOpen" class="mt-3 space-y-3">
          <BaseInput v-model="cepsLote" type="textarea" label="Cole CEPs (um por linha)"
            placeholder="01310-100&#10;20040-020&#10;80010-000" :rows="5" />
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

// ─── Estado ───────────────────────────────────────────────────────────────────
const cep         = ref('')
const resultado   = ref(false)
const valido      = ref(false)
const mensagem    = ref('')
const erro        = ref('')
const consultando = ref(false)
const loteOpen    = ref(false)
const cepsLote    = ref('')

interface Endereco { logradouro: string; bairro: string; localidade: string; uf: string; estado?: string; ddd?: string }
const endereco = ref<Endereco | null>(null)

// ─── Computed ─────────────────────────────────────────────────────────────────
const cepSoNums = computed(() => cep.value.replace(/\D/g, ''))
const cepFormatado = computed(() => {
  const n = cepSoNums.value
  return n.length === 8 ? `${n.slice(0,5)}-${n.slice(5)}` : n
})

const camposEndereco = computed(() => {
  if (!endereco.value) return []
  return [
    { label: 'Logradouro', valor: endereco.value.logradouro },
    { label: 'Bairro',     valor: endereco.value.bairro     },
    { label: 'Cidade',     valor: endereco.value.localidade },
    { label: 'Estado',     valor: `${endereco.value.uf} — ${endereco.value.estado ?? ''}` },
    { label: 'CEP',        valor: cepFormatado.value        },
    { label: 'DDD',        valor: endereco.value.ddd        },
  ]
})

// ─── Validação ────────────────────────────────────────────────────────────────
function onInput() {
  erro.value  = ''
  resultado.value = false
  endereco.value  = null
}

function validar() {
  const n = cepSoNums.value
  if (!n)        { erro.value = 'Digite um CEP.'; return }
  if (n.length !== 8) { erro.value = `CEP incompleto (${n.length}/8 dígitos).`; return }

  erro.value = ''
  resultado.value = true
  valido.value    = true
  mensagem.value  = 'CEP com formato válido (8 dígitos).'
}

async function consultarCep() {
  validar()
  if (!valido.value) return

  consultando.value = true
  endereco.value    = null
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cepSoNums.value}/json/`)
    const data = await res.json()
    if (data.erro) {
      mensagem.value = 'CEP não encontrado na base do ViaCEP.'
    } else {
      endereco.value = data
      mensagem.value = 'Endereço encontrado via ViaCEP!'
    }
  } catch {
    Swal.fire({ icon: 'warning', title: 'Sem conexão', text: 'Não foi possível consultar o ViaCEP. Verifique sua conexão.', confirmButtonColor: '#2563eb' })
  } finally {
    consultando.value = false
  }
}

function limpar() {
  cep.value = ''; resultado.value = false; valido.value = false
  mensagem.value = ''; erro.value = ''; endereco.value = null
}

async function copiarCEP(formatado: boolean) {
  await navigator.clipboard.writeText(formatado ? cepFormatado.value : cepSoNums.value)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1400 })
}

async function copiarEndereco() {
  if (!endereco.value) return
  const e = endereco.value
  const txt = `${e.logradouro}, ${e.bairro} — ${e.localidade}/${e.uf} — CEP: ${cepFormatado.value}`
  await navigator.clipboard.writeText(txt)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Endereço copiado!', showConfirmButton: false, timer: 1800 })
}

function validarLote() {
  const lines = cepsLote.value.split('\n').map(l => l.trim()).filter(Boolean)
  if (!lines.length) return
  const rows = lines.map(l => {
    const n = l.replace(/\D/g, '')
    const ok = n.length === 8
    const fmt = n.length === 8 ? `${n.slice(0,5)}-${n.slice(5)}` : l
    return `<tr><td style="padding:4px 8px;font-family:monospace">${fmt}</td><td style="font-weight:bold;color:${ok ? '#059669' : '#dc2626'}">${ok ? '✅' : '❌'}</td></tr>`
  }).join('')
  const v = lines.filter(l => l.replace(/\D/g, '').length === 8).length
  Swal.fire({
    title: `${lines.length} CEPs`,
    html: `<div style="margin-bottom:10px"><span style="background:#d1fae5;color:#065f46;padding:3px 10px;border-radius:20px;font-size:0.8rem">✅ ${v}</span> <span style="background:#fee2e2;color:#991b1b;padding:3px 10px;border-radius:20px;font-size:0.8rem">❌ ${lines.length - v}</span></div><div style="max-height:250px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:8px"><table style="width:100%;border-collapse:collapse;font-size:0.85rem"><tbody>${rows}</tbody></table></div>`,
    confirmButtonText: 'Fechar', confirmButtonColor: '#2563eb', width: 420,
  })
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.25s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
.accordion-enter-active, .accordion-leave-active { transition: all 0.25s ease; overflow: hidden; max-height: 400px; }
.accordion-enter-from, .accordion-leave-to       { max-height: 0; opacity: 0; }
</style>

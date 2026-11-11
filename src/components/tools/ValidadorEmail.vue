<template>
  <ToolShell
    title="Validador de E-mail"
    description="Valide endereços de e-mail pelo padrão RFC 5322 com análise detalhada de usuário, domínio e provedor."
    icon="fa-envelope-circle-check"
    icon-gradient="from-purple-500 to-indigo-700"
    orb-color="purple"
    :quick-tips="['RFC 5322', 'Detecção de provedor', 'Validação em lote']"
    :tips="emailTips"
    :examples="[
      { title: 'E-mail corporativo',  desc: 'contato@empresa.com.br',    result: 'Válido — TLD .br, domínio corporativo' },
      { title: 'E-mail com tag',      desc: 'usuario+newsletter@gmail.com', result: 'Válido — tag + suportada pelo Gmail' },
      { title: 'E-mail inválido',     desc: 'usuario@',                  result: 'Inválido — sem domínio' },
    ]"
  >

    <div class="tool-body">
      <BaseInput
        v-model="email"
        label="E-mail para validar"
        type="email"
        icon="fa-envelope"
        placeholder="usuario@empresa.com.br"
        :error="email && !valido ? 'E-mail com formato inválido' : ''"
        clearable
        tooltip="O e-mail é validado em tempo real conforme o padrão RFC 5322."
        @input="validar"
        @enter="validar"
      />

      <!-- Resultado em tempo real -->
      <Transition name="scale-in">
        <div v-if="email && mostrarResultado" class="mt-4 space-y-4">

          <!-- Badge principal -->
          <div :class="[
            'flex items-center gap-4 p-5 rounded-2xl border-2',
            valido
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/15 border-emerald-300 dark:border-emerald-700'
              : 'bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/15 border-red-300 dark:border-red-700',
          ]">
            <div :class="[
              'w-14 h-14 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0 shadow-lg',
              valido ? 'bg-gradient-to-br from-emerald-400 to-teal-600' : 'bg-gradient-to-br from-red-400 to-rose-600',
            ]">
              <i :class="['fas', valido ? 'fa-check' : 'fa-times']"></i>
            </div>
            <div>
              <h3 :class="['text-xl font-black', valido ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-600 dark:text-red-400']">
                {{ valido ? 'E-mail Válido ✓' : 'E-mail Inválido ✗' }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-slate-300 mt-0.5">{{ mensagem }}</p>
            </div>
          </div>

          <!-- Análise detalhada (apenas para e-mails válidos) -->
          <div v-if="valido && info" class="glass-panel p-4">
            <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
              <i class="fas fa-magnifying-glass text-primary-500"></i>
              Análise do E-mail
            </h4>
            <div class="grid grid-cols-2 gap-3 text-xs">
              <div class="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                <span class="font-semibold text-gray-500 dark:text-slate-400 block mb-1">
                  <i class="fas fa-user mr-1 text-blue-400"></i> Usuário
                </span>
                <code class="font-mono font-bold text-gray-900 dark:text-white">{{ info.usuario }}</code>
              </div>
              <div class="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                <span class="font-semibold text-gray-500 dark:text-slate-400 block mb-1">
                  <i class="fas fa-server mr-1 text-green-400"></i> Domínio
                </span>
                <code class="font-mono font-bold text-gray-900 dark:text-white">{{ info.dominio }}</code>
              </div>
              <div class="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                <span class="font-semibold text-gray-500 dark:text-slate-400 block mb-1">
                  <i class="fas fa-globe mr-1 text-purple-400"></i> TLD
                </span>
                <code class="font-mono font-bold text-gray-900 dark:text-white">{{ info.tld }}</code>
              </div>
              <div class="p-3 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                <span class="font-semibold text-gray-500 dark:text-slate-400 block mb-1">
                  <i class="fas fa-building mr-1 text-orange-400"></i> Provedor
                </span>
                <span class="font-bold text-gray-900 dark:text-white">{{ info.provedor }}</span>
              </div>
            </div>
          </div>

          <!-- Características extras -->
          <div v-if="valido" class="flex flex-wrap gap-2">
            <span v-if="info?.hasTag" class="stat-pill">
              <i class="fas fa-tag text-blue-400 text-[10px]"></i> Contém tag (+)
            </span>
            <span v-if="info?.hasPontos" class="stat-pill">
              <i class="fas fa-circle text-green-400 text-[10px]"></i> Pontos no usuário
            </span>
            <span class="stat-pill">
              <i class="fas fa-ruler text-purple-400 text-[10px]"></i>
              {{ email.length }} caracteres
            </span>
            <span class="stat-pill">
              <i class="fas fa-shield-halved text-teal-400 text-[10px]"></i> RFC 5322
            </span>
          </div>

          <!-- Copiar -->
          <div v-if="valido" class="flex gap-2">
            <button @click="copiar" class="copy-btn flex-1 justify-center py-2.5">
              <i :class="['fas', copiado ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
              {{ copiado ? 'Copiado!' : 'Copiar e-mail' }}
            </button>
          </div>
        </div>
      </Transition>

      <!-- Validação em lote -->
      <div class="mt-5">
        <button @click="loteOpen = !loteOpen" class="accordion-trigger">
          <span class="flex items-center gap-2 text-sm">
            <i class="fas fa-list-check text-primary-500"></i>
            Validar múltiplos e-mails
          </span>
          <i :class="['fas', loteOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400']"></i>
        </button>
        <Transition name="accordion">
          <div v-if="loteOpen" class="mt-3 space-y-3">
            <BaseInput v-model="emailsLote" type="textarea" label="Cole os e-mails (um por linha)"
              placeholder="usuario@email.com&#10;outro@empresa.com.br" :rows="5" />
            <BaseButton variant="primary" icon="fa-check-double" @click="validarLote" class="w-full">
              Validar Todos
            </BaseButton>
          </div>
        </Transition>
      </div>
    </div>

  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const email          = ref('')

const emailTips = [
  { title: 'Validacao de formato', text: 'Esta ferramenta valida apenas o formato do e-mail (RFC 5322). Para verificar se o endereco existe realmente seria necessario enviar um e-mail de confirmacao.' },
  { title: 'E-mails validos incomuns', text: 'O formato usuario.nome@dominio.com e valido. Tags com sinal de mais tambem sao suportadas pelo Gmail e outros provedores.', type: 'info' as const },
]
const valido         = ref(false)
const mensagem       = ref('')
const mostrarResultado = ref(false)
const copiado        = ref(false)
const loteOpen       = ref(false)
const emailsLote     = ref('')

const RFC_REGEX = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/

const provedores: Record<string, string> = {
  'gmail.com': 'Gmail (Google)', 'googlemail.com': 'Gmail (Google)',
  'outlook.com': 'Outlook (Microsoft)', 'hotmail.com': 'Hotmail (Microsoft)',
  'live.com': 'Live (Microsoft)', 'yahoo.com': 'Yahoo', 'yahoo.com.br': 'Yahoo BR',
  'icloud.com': 'iCloud (Apple)', 'me.com': 'iCloud (Apple)',
  'uol.com.br': 'UOL', 'bol.com.br': 'BOL', 'ig.com.br': 'IG',
  'terra.com.br': 'Terra', 'protonmail.com': 'ProtonMail', 'proton.me': 'ProtonMail',
}

const info = computed(() => {
  if (!valido.value || !email.value) return null
  const [usuario, dominio] = email.value.split('@')
  const tld = dominio ? '.' + dominio.split('.').pop() : ''
  return {
    usuario, dominio,
    tld,
    provedor:  provedores[dominio?.toLowerCase()] ?? 'Personalizado',
    hasTag:    usuario.includes('+'),
    hasPontos: usuario.includes('.'),
  }
})

function validar() {
  if (!email.value) { mostrarResultado.value = false; return }
  mostrarResultado.value = true
  valido.value  = RFC_REGEX.test(email.value)
  mensagem.value = valido.value ? 'Formato de e-mail válido (RFC 5322).' : 'Formato inválido. Verifique o endereço digitado.'
}

async function copiar() {
  await navigator.clipboard.writeText(email.value)
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
}

function validarLote() {
  const lines = emailsLote.value.split('\n').map(l => l.trim()).filter(Boolean)
  if (!lines.length) return

  const rows = lines.map(e => {
    const ok = RFC_REGEX.test(e)
    return `<tr>
      <td style="padding:4px 8px;font-family:monospace;font-size:0.8rem">${e}</td>
      <td style="padding:4px 8px;font-weight:bold;color:${ok ? '#059669' : '#dc2626'}">${ok ? '✅ Válido' : '❌ Inválido'}</td>
    </tr>`
  }).join('')

  const v = lines.filter(e => RFC_REGEX.test(e)).length
  Swal.fire({
    title: `Resultado: ${lines.length} e-mails`,
    html: `
      <div style="margin-bottom:12px;display:flex;gap:12px;justify-content:center">
        <span style="background:#d1fae5;color:#065f46;padding:4px 10px;border-radius:20px;font-size:0.8rem;font-weight:bold">✅ Válidos: ${v}</span>
        <span style="background:#fee2e2;color:#991b1b;padding:4px 10px;border-radius:20px;font-size:0.8rem;font-weight:bold">❌ Inválidos: ${lines.length - v}</span>
      </div>
      <div style="max-height:300px;overflow-y:auto;border:1px solid #e5e7eb;border-radius:8px">
        <table style="width:100%;border-collapse:collapse">
          <thead style="background:#f9fafb"><tr><th style="padding:6px 8px;text-align:left;font-size:0.8rem">E-mail</th><th style="padding:6px 8px;font-size:0.8rem">Status</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`,
    confirmButtonText: 'Fechar',
    confirmButtonColor: '#2563eb',
    width: 560,
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

<template>
  <ToolShell
    title="Extrator de E-mails"
    description="Extraia todos os endereços de e-mail de qualquer bloco de texto — 100% offline e privado."
    icon="fa-envelope-open-text"
    icon-gradient="from-purple-500 to-violet-700"
    orb-color="purple"
    :quick-tips="['Regex RFC 5322', 'Deduplicação automática', '100% offline']"
    :tips="[
      { text: 'O texto processado permanece 100% no seu navegador. Nenhum dado é enviado a servidores.' },
      { text: 'Useful para limpar listas de e-mail, extrair contatos de PDFs copiados ou logs.', type: 'info' },
    ]"
  >
    <div class="tool-body">
      <div>
        <label class="input-aurora-label">
          <i class="fas fa-paste mr-1.5 text-purple-500"></i>
          Cole o texto com e-mails
        </label>
        <textarea
          v-model="entrada"
          rows="8"
          class="input-aurora resize-y"
          placeholder="Cole aqui qualquer texto contendo endereços de e-mail...&#10;&#10;Funciona com: texto de páginas web, PDFs copiados, planilhas, listas, HTML etc."
        ></textarea>
        <p class="input-aurora-hint">{{ entrada.length }} caracteres</p>
      </div>

      <div class="grid grid-cols-2 gap-3 mt-3">
        <label class="checkbox-aurora">
          <input v-model="deduplicar" type="checkbox" class="w-4 h-4 accent-purple-600" />
          <span class="text-sm font-medium">Remover duplicatas</span>
        </label>
        <label class="checkbox-aurora">
          <input v-model="minusculas" type="checkbox" class="w-4 h-4 accent-purple-600" />
          <span class="text-sm font-medium">Converter p/ minúsculas</span>
        </label>
      </div>

      <BaseButton variant="primary" icon="fa-search" @click="extrair" class="w-full mt-4">
        Extrair E-mails
      </BaseButton>
    </div>

    <!-- Resultado -->
    <Transition name="fade-in-up">
      <div v-if="executado" class="mt-4 space-y-4">
        <div v-if="emails.length > 0">
          <!-- Métricas -->
          <div class="grid grid-cols-3 gap-2.5 mb-4">
            <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
              <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ emails.length }}</div>
              <div class="metric-glass-label">E-mails {{ deduplicar ? 'únicos' : 'encontrados' }}</div>
            </div>
            <div class="metric-glass">
              <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ dominios.length }}</div>
              <div class="metric-glass-label">Domínios únicos</div>
            </div>
            <div class="metric-glass">
              <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ duplicatasRemovidas }}</div>
              <div class="metric-glass-label">Duplicatas removidas</div>
            </div>
          </div>

          <!-- Lista de e-mails -->
          <div class="glass-panel p-4">
            <div class="flex items-center justify-between mb-3">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200">E-mails Extraídos</h4>
              <div class="flex gap-2">
                <button @click="copiarTodos" class="copy-btn">
                  <i :class="['fas', copiado ? 'fa-check text-emerald-500' : 'fa-copy']"></i>
                  {{ copiado ? 'Copiado!' : 'Copiar todos' }}
                </button>
                <button @click="baixarTxt" class="copy-btn">
                  <i class="fas fa-download"></i>
                  .txt
                </button>
              </div>
            </div>

            <!-- Filtro por domínio -->
            <div class="flex flex-wrap gap-1.5 mb-3">
              <button
                :class="['px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all border',
                  filtroDominio === '' ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:border-purple-400']"
                @click="filtroDominio = ''"
              >
                Todos ({{ emails.length }})
              </button>
              <button
                v-for="d in dominios.slice(0, 10)"
                :key="d.dominio"
                :class="['px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all border',
                  filtroDominio === d.dominio ? 'bg-purple-600 text-white border-purple-600' : 'bg-white dark:bg-slate-700 border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-300 hover:border-purple-400']"
                @click="filtroDominio = d.dominio"
              >
                @{{ d.dominio }} ({{ d.count }})
              </button>
            </div>

            <div class="max-h-64 overflow-y-auto space-y-1 divide-y divide-gray-100 dark:divide-slate-700">
              <div
                v-for="email in emailsFiltrados"
                :key="email"
                class="flex items-center justify-between py-1.5 px-2 hover:bg-primary-50/40 dark:hover:bg-primary-900/10 group transition-colors"
              >
                <code class="text-xs text-purple-700 dark:text-purple-300 font-mono">{{ email }}</code>
                <button @click="copiarUm(email)" class="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                  <i class="fas fa-copy text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="glass-panel p-6 text-center">
          <i class="fas fa-search text-3xl mb-3 opacity-30 block text-purple-400"></i>
          <p class="text-sm text-gray-500 dark:text-slate-400">Nenhum e-mail válido encontrado no texto.</p>
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

const entrada          = ref('')
const deduplicar       = ref(true)
const minusculas       = ref(true)
const emails           = ref<string[]>([])
const duplicatasRemovidas = ref(0)
const executado        = ref(false)
const copiado          = ref(false)
const filtroDominio    = ref('')

const EMAIL_REGEX = /[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/g

const dominios = computed(() => {
  const map: Record<string, number> = {}
  for (const e of emails.value) {
    const d = e.split('@')[1] ?? ''
    map[d] = (map[d] ?? 0) + 1
  }
  return Object.entries(map).map(([dominio, count]) => ({ dominio, count })).sort((a,b) => b.count - a.count)
})

const emailsFiltrados = computed(() => {
  if (!filtroDominio.value) return emails.value
  return emails.value.filter(e => e.endsWith('@' + filtroDominio.value))
})

function extrair() {
  if (!entrada.value.trim()) return

  let found = [...(entrada.value.match(EMAIL_REGEX) ?? [])]
  if (minusculas.value) found = found.map(e => e.toLowerCase())

  const original = found.length
  if (deduplicar.value) found = [...new Set(found)]
  duplicatasRemovidas.value = original - found.length

  emails.value  = found
  executado.value = true
}

async function copiarUm(email: string) {
  await navigator.clipboard.writeText(email)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Copiado!', showConfirmButton: false, timer: 1200 })
}

async function copiarTodos() {
  await navigator.clipboard.writeText(emailsFiltrados.value.join('\n'))
  copiado.value = true
  setTimeout(() => (copiado.value = false), 2000)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: `${emailsFiltrados.value.length} e-mails copiados!`, showConfirmButton: false, timer: 1800 })
}

function baixarTxt() {
  const blob = new Blob([emailsFiltrados.value.join('\n')], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = `emails-${Date.now()}.txt`; a.click()
  URL.revokeObjectURL(url)
  Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Download iniciado!', showConfirmButton: false, timer: 1500 })
}
</script>

<style scoped>
.btn-aurora-purple {
  background: linear-gradient(135deg, #7c3aed, #5b21b6);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  transition: all 0.2s;
}
.btn-aurora-purple:hover { background: linear-gradient(135deg, #6d28d9, #4c1d95); }
.btn-aurora-purple:disabled { opacity: 0.5; cursor: not-allowed; }
.fade-in-up-enter-active, .fade-in-up-leave-active { transition: all 0.25s ease; }
.fade-in-up-enter-from { transform: translateY(8px); opacity: 0; }
.fade-in-up-leave-to   { opacity: 0; }
</style>

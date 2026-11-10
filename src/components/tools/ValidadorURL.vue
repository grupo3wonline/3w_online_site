<template>
  <ToolShell
    title="Validador de URL"
    description="Valide URLs e analise protocolo, domínio, porta, caminho e parâmetros de query string."
    icon="fa-link"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Análise completa', 'Query string', 'Protocolo e domínio']"
    :tips="[
      { title: 'Protocolo obrigatório', text: 'URLs válidas precisam do protocolo (http:// ou https://). Sem ele, a URL é inválida.', type: 'warning' },
      { title: 'Query string', text: 'Parâmetros ficam após o ? separados por &. Ex: ?id=1&nome=João. Cada par chave=valor é exibido separadamente.', type: 'info' },
      { title: 'HTTPS vs HTTP', text: 'Prefira sempre https:// para sites em produção. HTTP transmite dados sem criptografia.', type: 'warning' },
    ]"
    :examples="[
      { title: 'URL simples',  desc: 'https://exemplo.com', result: 'Válida — protocolo https, sem parâmetros' },
      { title: 'Com path',     desc: 'https://api.site.com/v1/users?id=42&page=1', result: 'Válida — 2 parâmetros: id=42, page=1' },
      { title: 'Sem protocolo', desc: 'exemplo.com', result: 'Inválida — protocolo http:// ou https:// obrigatório' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <BaseInput
            v-model="url"
            label="URL"
            icon="fa-link"
            placeholder="https://exemplo.com/pagina?id=1"
            tooltip="Digite a URL completa com o protocolo (http:// ou https://). Suporta porta, caminho e query string."
            hint="Inclua sempre o protocolo (https://)"
            @input="validar"
          />
          <div class="flex gap-3 mt-3">
            <BaseButton variant="primary" icon="fa-check-circle" @click="validar" class="flex-1">
              Validar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
          </div>
        </div>

        <!-- Protocolo badge -->
        <div v-if="valido && info" class="glass-panel p-4">
          <div class="flex items-center gap-3">
            <span :class="['text-xs font-bold px-3 py-1.5 rounded-full', info.protocolo === 'https' ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300' : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300']">
              <i :class="['fas mr-1', info.protocolo === 'https' ? 'fa-lock' : 'fa-lock-open']"></i>
              {{ info.protocolo.toUpperCase() }}
            </span>
            <span class="text-sm font-mono text-gray-700 dark:text-slate-200 break-all">{{ info.dominio }}</span>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="resultado" class="space-y-4">

            <!-- Status principal -->
            <div :class="['tool-header text-center py-6', valido ? '' : 'from-red-900/60 to-red-800/40']">
              <i :class="['text-5xl mb-3 block', valido ? 'fas fa-check-circle text-emerald-400' : 'fas fa-times-circle text-red-400']"></i>
              <p class="text-2xl font-black text-white">{{ valido ? 'URL Válida' : 'URL Inválida' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido && info" class="grid grid-cols-2 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div :class="['metric-glass-value', info.protocolo === 'https' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400']">
                  {{ info.protocolo.toUpperCase() }}
                </div>
                <div class="metric-glass-label">Protocolo</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ info.parametros.length }}</div>
                <div class="metric-glass-label">Parâmetros</div>
              </div>
            </div>

            <!-- Detalhamento -->
            <div v-if="valido && info" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-search text-blue-500"></i>
                Análise da URL
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Protocolo</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ info.protocolo }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Domínio</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ info.dominio }}</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Porta</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ info.porta || 'padrão' }}</span>
                </div>
                <div class="flex justify-between py-1.5" :class="info.parametros.length ? 'border-b border-gray-100 dark:border-slate-700' : ''">
                  <span class="text-gray-600 dark:text-slate-300">Caminho</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">{{ info.caminho || '/' }}</span>
                </div>
              </div>
            </div>

            <!-- Parâmetros -->
            <div v-if="valido && info && info.parametros.length > 0" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-filter text-purple-500"></i>
                Query String ({{ info.parametros.length }} parâmetro{{ info.parametros.length > 1 ? 's' : '' }})
              </h4>
              <div class="space-y-1.5">
                <div
                  v-for="param in info.parametros"
                  :key="param.chave"
                  class="flex justify-between items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 text-xs"
                >
                  <span class="font-mono font-bold text-blue-700 dark:text-blue-300">{{ param.chave }}</span>
                  <span class="font-mono text-gray-700 dark:text-slate-200">{{ param.valor }}</span>
                </div>
              </div>
            </div>

            <div v-if="valido && info && info.protocolo !== 'https'" class="tip-card-warning">
              <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">URL usa <strong>HTTP</strong> sem criptografia. Para produção, use sempre <strong>HTTPS</strong>.</span>
            </div>
            <div v-else-if="valido" class="tip-card-success">
              <i class="fas fa-lock text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">URL válida com protocolo seguro <strong>HTTPS</strong>.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-link text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Digite uma URL para validar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const url       = ref('')
const resultado = ref(false)
const valido    = ref(false)
const mensagem  = ref('')

interface Param { chave: string; valor: string }
interface UrlInfo { protocolo: string; dominio: string; porta: string; caminho: string; parametros: Param[] }

const info = computed((): UrlInfo | null => {
  if (!valido.value) return null
  try {
    const u = new URL(url.value)
    const params: Param[] = []
    u.searchParams.forEach((valor, chave) => params.push({ chave, valor }))
    return { protocolo: u.protocol.replace(':',''), dominio: u.hostname, porta: u.port, caminho: u.pathname, parametros: params }
  } catch { return null }
})

const validar = () => {
  if (!url.value.trim()) { resultado.value = false; return }
  try {
    new URL(url.value)
    valido.value   = true
    mensagem.value = 'URL válida e bem formada'
  } catch {
    valido.value   = false
    mensagem.value = 'URL inválida — verifique o protocolo (https://) e o formato'
  }
  resultado.value = true
}

const limpar = () => { url.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

<template>
  <ToolShell
    title="Testador de Regex"
    description="Teste expressões regulares com realce de capturas, contagem de matches e flags configuráveis."
    icon="fa-terminal"
    icon-gradient="from-green-500 to-emerald-700"
    orb-color="emerald"
    :quick-tips="['Flags g, i, m', 'Realce de matches', 'Contador de capturas']"
    :tips="[
      { title: 'Metacaracteres', text: '^ = início | $ = fim | . = qualquer char | * = 0 ou mais | + = 1 ou mais | ? = 0 ou 1 | \\d = dígito | \\w = palavra | \\s = espaço', type: 'info' },
      { title: 'Grupos de captura', text: 'Use () para capturar grupos. Ex: (\\d{2})/(\\d{2})/(\\d{4}) captura dia, mês e ano separadamente.', type: 'info' },
      { title: 'Flag global (g)', text: 'Sem a flag g, apenas o primeiro match é retornado. Use g para encontrar todas as ocorrências.', type: 'warning' },
    ]"
    :examples="[
      { title: 'CPF',    desc: 'Regex: \\d{3}\\.\\d{3}\\.\\d{3}-\\d{2} | Texto: 123.456.789-09', result: '1 match' },
      { title: 'E-mail', desc: 'Regex: [\\w.-]+@[\\w-]+\\.[a-z]{2,} | Texto: user@email.com', result: '1 match' },
      { title: 'Placa',  desc: 'Regex: [A-Z]{3}[\\-\\s]?\\d{4} | Texto: ABC-1234, XYZ 5678', result: '2 matches (com flag g)' },
    ]"
  >
    <div class="space-y-5">

      <!-- Painel de entrada -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

        <!-- Regex + Flags -->
        <div class="tool-body !mb-0 space-y-3">
          <BaseInput
            v-model="pattern"
            label="Expressão Regular"
            icon="fa-terminal"
            placeholder="[A-Z]{3}-\d{4}"
            tooltip="Digite a expressão regular sem as barras delimitadoras. As flags são selecionadas abaixo."
            hint="Sem barras / / — use as flags abaixo"
            @input="testar"
          />

          <!-- Flags -->
          <div class="glass-panel p-3">
            <p class="input-aurora-label mb-2">
              <i class="fas fa-flag mr-1.5 text-emerald-500"></i>
              Flags
            </p>
            <div class="flex flex-wrap gap-4">
              <label v-for="f in flagsList" :key="f.key" class="flex items-center gap-2 cursor-pointer select-none">
                <input
                  v-model="flags[f.key]"
                  type="checkbox"
                  class="checkbox-aurora"
                  @change="testar"
                />
                <span class="text-sm text-gray-700 dark:text-slate-200">
                  <code class="text-emerald-600 dark:text-emerald-400 font-bold">{{ f.key }}</code>
                  — {{ f.desc }}
                </span>
              </label>
            </div>
          </div>

          <!-- Texto de teste -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-align-left mr-1.5 text-blue-500"></i>
              Texto para testar
            </label>
            <textarea
              v-model="texto"
              @input="testar"
              class="input-aurora font-mono text-sm resize-y"
              rows="5"
              placeholder="Cole o texto aqui para testar a expressão..."
            ></textarea>
          </div>

          <BaseButton variant="success" icon="fa-play" @click="testar" class="w-full">
            Executar Teste
          </BaseButton>
        </div>

        <!-- Resultado -->
        <div class="space-y-4">
          <Transition name="scale-in" appear>
            <div v-if="resultado && !erro" class="space-y-4">

              <!-- Status -->
              <div :class="['tool-header text-center py-5', matches.length > 0 ? '' : 'from-amber-900/60 to-amber-800/40']">
                <p class="text-5xl font-black text-white mb-2">{{ matches.length }}</p>
                <p :class="['text-sm', matches.length > 0 ? 'text-emerald-300' : 'text-amber-300']">
                  {{ matches.length === 0 ? 'Nenhuma correspondência' : matches.length === 1 ? 'correspondência encontrada' : 'correspondências encontradas' }}
                </p>
              </div>

              <!-- Métricas -->
              <div class="grid grid-cols-2 gap-3">
                <div class="metric-glass ring-1 ring-emerald-100 dark:ring-emerald-900">
                  <div class="metric-glass-value text-emerald-600 dark:text-emerald-400">{{ matches.length }}</div>
                  <div class="metric-glass-label">Matches</div>
                </div>
                <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                  <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ flagsAtivas }}</div>
                  <div class="metric-glass-label">Flags ativas</div>
                </div>
              </div>

              <!-- Lista de matches -->
              <div v-if="matches.length > 0" class="glass-panel p-4">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                  <i class="fas fa-list text-emerald-500"></i>
                  Correspondências
                </h4>
                <div class="space-y-1.5 max-h-40 overflow-y-auto">
                  <div
                    v-for="(m, i) in matches"
                    :key="i"
                    class="flex items-center gap-2 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800"
                  >
                    <span class="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black flex-shrink-0">{{ i+1 }}</span>
                    <code class="text-xs text-emerald-800 dark:text-emerald-300 font-mono">{{ m }}</code>
                  </div>
                </div>
              </div>

              <!-- Texto com realce -->
              <div v-if="textoHighlighted && matches.length > 0" class="glass-panel p-4">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                  <i class="fas fa-highlighter text-yellow-500"></i>
                  Texto com destaque
                </h4>
                <div
                  class="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg font-mono text-xs whitespace-pre-wrap leading-relaxed"
                  v-html="textoHighlighted"
                ></div>
              </div>
            </div>
          </Transition>

          <!-- Erro de regex -->
          <div v-if="erro" class="tip-card-warning">
            <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
            <div>
              <p class="text-xs font-bold">Erro na Expressão Regular</p>
              <p class="text-xs font-mono mt-0.5">{{ erro }}</p>
            </div>
          </div>

          <div v-if="!resultado && !erro" class="glass-panel text-center py-12 text-gray-400">
            <i class="fas fa-terminal text-4xl mb-3 opacity-30 block text-emerald-400"></i>
            <p class="text-sm">Digite uma regex e um texto para testar</p>
          </div>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import DOMPurify from 'dompurify'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'

const pattern  = ref('')
const texto    = ref('')
const flags    = ref({ g: true, i: false, m: false })
const resultado = ref(false)
const matches  = ref<string[]>([])
const erro     = ref('')
const textoHighlighted = ref('')

const flagsList = [
  { key: 'g', desc: 'Global (todas as ocorrências)' },
  { key: 'i', desc: 'Case-insensitive' },
  { key: 'm', desc: 'Multiline' },
]

const flagsAtivas = computed(() => {
  return Object.entries(flags.value).filter(([,v]) => v).map(([k]) => k).join('') || 'nenhuma'
})

const testar = () => {
  erro.value = ''
  if (!pattern.value || !texto.value) { resultado.value = false; return }

  try {
    const flagStr = (flags.value.g ? 'g' : '') + (flags.value.i ? 'i' : '') + (flags.value.m ? 'm' : '')
    const regex   = new RegExp(pattern.value, flagStr)
    const found   = texto.value.match(regex) || []
    matches.value = found

    // Realce
    let highlighted = texto.value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
    if (found.length > 0) {
      const safePattern = pattern.value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      try {
        const rh = new RegExp(pattern.value, flagStr)
        highlighted = texto.value
          .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
          .replace(rh, m => `<mark class="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">${m}</mark>`)
      } catch {}
    }
    textoHighlighted.value = DOMPurify.sanitize(highlighted)
    resultado.value = true
  } catch (e: any) {
    erro.value = e.message
    resultado.value = false
  }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

<template>
  <ToolShell
    title="Gerador de Prefixo e Sufixo"
    description="Adicione prefixos e sufixos em massa a listas de texto — ideal para SQL, arrays, HTML e Markdown."
    icon="fa-text-width"
    icon-gradient="from-indigo-500 to-blue-700"
    orb-color="indigo"
    :quick-tips="['Processa centenas de linhas', 'Templates prontos', 'Baixe o resultado em .txt']"
    :tips="[
      { title: 'SQL INSERT', text: 'Use Prefixo: (\' e Sufixo: \'), para gerar VALUES de INSERT rapidamente em lote.', type: 'info' },
      { title: 'Array JS/Python', text: 'Prefixo: \'  e Sufixo: \',  cria arrays de strings com um clique.', type: 'info' },
      { title: 'HTML List', text: 'Prefixo: <li>  e Sufixo: </li>  converte uma lista de texto simples em HTML semântico.', type: 'success' },
    ]"
    :examples="[
      { title: 'Array JavaScript', desc: 'Prefixo: \' | Sufixo: \',', result: '\'maçã\',  \'banana\',' },
      { title: 'SQL INSERT', desc: 'Prefixo: (\' | Sufixo: \'),', result: '(\'João\'),  (\'Maria\'),' },
      { title: 'Markdown Checklist', desc: 'Prefixo: - [ ] | Sem sufixo', result: '- [ ] Tarefa 1  - [ ] Tarefa 2' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0 space-y-4">
          <!-- Texto de entrada -->
          <div>
            <label class="input-aurora-label">
              <i class="fas fa-align-left mr-1.5 text-indigo-500"></i>
              Texto (uma linha por item)
            </label>
            <textarea
              v-model="textoEntrada"
              @input="gerar"
              placeholder="Digite ou cole seu texto aqui..."
              class="input-aurora resize-none"
              rows="8"
            ></textarea>
            <p class="input-aurora-hint">{{ linhas.length }} linha(s)</p>
          </div>

          <!-- Prefixo e Sufixo -->
          <div class="grid grid-cols-2 gap-3">
            <BaseInput
              v-model="prefixo"
              @input="gerar"
              label="Prefixo"
              placeholder="Ex: ' ou <li>"
              icon="fa-arrow-right"
              tooltip="Texto inserido ANTES de cada linha do resultado."
            />
            <BaseInput
              v-model="sufixo"
              @input="gerar"
              label="Sufixo"
              placeholder="Ex: ', ou </li>"
              icon="fa-arrow-left"
              tooltip="Texto inserido DEPOIS de cada linha do resultado."
            />
          </div>

          <!-- Templates Rápidos -->
          <div>
            <label class="input-aurora-label mb-2">
              <i class="fas fa-bolt mr-1.5 text-amber-500"></i>
              Templates Rápidos
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="template in templates"
                :key="template.nome"
                @click="aplicarTemplate(template)"
                class="p-2.5 rounded-xl border-2 border-gray-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left"
              >
                <div class="font-semibold text-gray-900 dark:text-white text-xs mb-0.5">{{ template.nome }}</div>
                <code class="text-[10px] text-indigo-600 dark:text-indigo-400">{{ template.exemplo }}</code>
              </button>
            </div>
          </div>

          <!-- Opções -->
          <div class="glass-panel p-3 space-y-2">
            <label class="input-aurora-label !mb-0">Opções de transformação</label>
            <div class="grid grid-cols-2 gap-2 mt-2">
              <label v-for="opt in opcoesList" :key="opt.key" class="checkbox-aurora">
                <input v-model="opcoes[opt.key]" @change="gerar" type="checkbox" />
                <span>{{ opt.label }}</span>
              </label>
            </div>
          </div>

          <div class="flex gap-3">
            <BaseButton variant="success" icon="fa-wand-magic-sparkles" @click="gerar" class="flex-1">Gerar</BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">Limpar</BaseButton>
          </div>
        </div>
      </div>

      <!-- Resultado -->
      <div>
        <Transition name="scale-in" appear>
          <div v-if="textoResultado && textoEntrada" class="space-y-4">
            <!-- Destaque principal -->
            <div class="tool-header text-center py-5">
              <p class="text-sm text-blue-200 mb-1">Resultado gerado</p>
              <p class="text-4xl font-black text-white mb-2">{{ linhas.length }}</p>
              <p class="text-indigo-300 text-sm font-semibold">
                <i class="fas fa-check-circle mr-1"></i>linhas processadas
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-indigo-100 dark:ring-indigo-900">
                <div class="metric-glass-value text-indigo-600 dark:text-indigo-400">{{ linhas.length }}</div>
                <div class="metric-glass-label">Linhas</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ textoResultado.length }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">
                  {{ textoEntrada ? ((textoResultado.length / textoEntrada.length) * 100).toFixed(0) : 0 }}%
                </div>
                <div class="metric-glass-label">Aumento</div>
              </div>
            </div>

            <!-- Saída -->
            <div class="glass-panel p-4">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 flex items-center gap-2">
                  <i class="fas fa-code text-indigo-500"></i>Saída
                </h4>
                <div class="flex gap-2">
                  <button @click="copiar" class="copy-btn">
                    <i class="fas fa-copy mr-1"></i>Copiar
                  </button>
                  <button @click="baixarArquivo" class="copy-btn">
                    <i class="fas fa-download mr-1"></i>Baixar
                  </button>
                </div>
              </div>
              <pre class="text-gray-700 dark:text-slate-200 whitespace-pre-wrap font-mono text-xs max-h-72 overflow-y-auto select-all">{{ textoResultado }}</pre>
            </div>

            <div class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">Resultado pronto! Copie ou baixe o arquivo .txt com um clique.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!textoResultado || !textoEntrada" class="glass-panel text-center py-12 text-gray-400 dark:text-slate-500">
          <i class="fas fa-text-width text-4xl mb-3 opacity-30 block text-indigo-400"></i>
          <p class="text-sm">Cole seu texto e defina prefixo/sufixo para ver o resultado</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseInput from '@/components/tools/common/BaseInput.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const templates = [
  { nome: "Array JS",    prefixo: "'",     sufixo: "',",    exemplo: "'item'," },
  { nome: "SQL INSERT",  prefixo: "('",    sufixo: "'),",   exemplo: "('val')," },
  { nome: "HTML List",   prefixo: '<li>',  sufixo: '</li>', exemplo: '<li>item</li>' },
  { nome: "Markdown",    prefixo: '- [ ] ',sufixo: '',      exemplo: '- [ ] item' },
  { nome: "JSON Array",  prefixo: '"',     sufixo: '",',    exemplo: '"item",' },
  { nome: "CSV",         prefixo: '',      sufixo: ',',     exemplo: 'item,' },
  { nome: "Python",      prefixo: "'",     sufixo: "',",    exemplo: "'item'," },
  { nome: "Bullet •",    prefixo: '• ',    sufixo: '',      exemplo: '• item' },
]

const opcoesList = [
  { key: 'ignorarVazias', label: 'Ignorar vazias' },
  { key: 'numerar',       label: 'Numerar linhas' },
  { key: 'aspasSimples',  label: "Aspas simples ''" },
  { key: 'aspasDuplas',   label: 'Aspas duplas ""' },
]

const textoEntrada   = ref('')
const prefixo        = ref('')
const sufixo         = ref('')
const textoResultado = ref('')
const opcoes         = ref({ ignorarVazias: true, numerar: false, aspasSimples: false, aspasDuplas: false })

const linhas = computed(() => {
  let items = textoEntrada.value.split('\n')
  if (opcoes.value.ignorarVazias) items = items.filter(l => l.trim().length > 0)
  return items
})

const aplicarTemplate = (t) => { prefixo.value = t.prefixo; sufixo.value = t.sufixo; gerar() }

const gerar = () => {
  if (!textoEntrada.value) { textoResultado.value = ''; return }
  textoResultado.value = linhas.value.map((linha, i) => {
    let txt = opcoes.value.aspasSimples ? `'${linha}'` : opcoes.value.aspasDuplas ? `"${linha}"` : linha
    txt = `${prefixo.value}${txt}${sufixo.value}`
    return opcoes.value.numerar ? `${i + 1}. ${txt}` : txt
  }).join('\n')
}

const copiar = async () => {
  try {
    await navigator.clipboard.writeText(textoResultado.value)
    Swal.fire({ icon: 'success', title: 'Copiado!', timer: 1500, showConfirmButton: false })
  } catch {
    Swal.fire({ icon: 'error', title: 'Erro ao copiar' })
  }
}

const baixarArquivo = () => {
  const blob = new Blob([textoResultado.value], { type: 'text/plain' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = 'resultado.txt'
  document.body.appendChild(a); a.click()
  document.body.removeChild(a); URL.revokeObjectURL(url)
  Swal.fire({ icon: 'success', title: 'Download iniciado!', timer: 1500, showConfirmButton: false })
}

const limpar = () => {
  textoEntrada.value = ''; prefixo.value = ''; sufixo.value = ''; textoResultado.value = ''
  opcoes.value = { ignorarVazias: true, numerar: false, aspasSimples: false, aspasDuplas: false }
}
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from                            { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to                              { opacity: 0; }
</style>

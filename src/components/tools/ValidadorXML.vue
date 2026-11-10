<template>
  <ToolShell
    title="Validador de XML"
    description="Valide documentos XML verificando a correta formação de tags, atributos e estrutura hierárquica."
    icon="fa-file-code"
    icon-gradient="from-orange-500 to-amber-700"
    orb-color="orange"
    :quick-tips="['Validação de estrutura', 'Detecta erros de parser', 'Contagem de elementos']"
    :tips="[
      { title: 'XML é case-sensitive', text: '<Tag> e <tag> são elementos diferentes em XML. O fechamento deve usar exatamente o mesmo nome.', type: 'warning' },
      { title: 'Tag de fechamento', text: 'Todo elemento deve ter sua tag de fechamento. Ex: <item>conteúdo</item>. Exceção: tags auto-fechantes como <br/>.', type: 'info' },
      { title: 'Declaração XML', text: 'A linha de declaração XML (<?xml ...?>) não é obrigatória, mas é recomendada para documentos XML formais.', type: 'info' },
    ]"
    :examples="xmlExamples"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <label class="input-aurora-label">
            <i class="fas fa-code mr-1.5 text-orange-500"></i>
            Código XML
          </label>
          <textarea
            v-model="xml"
            @input="validar"
            class="input-aurora font-mono text-sm resize-y"
            rows="12"
            placeholder="<?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?>&#10;<root>&#10;  <item id=&quot;1&quot;>&#10;    <nome>Exemplo</nome>&#10;    <valor>42</valor>&#10;  </item>&#10;</root>"
          ></textarea>
          <div class="flex gap-3 mt-3">
            <BaseButton variant="warning" icon="fa-check-circle" @click="validar" class="flex-1">
              Validar
            </BaseButton>
            <BaseButton variant="outline" icon="fa-eraser" @click="limpar">
              Limpar
            </BaseButton>
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
              <p class="text-2xl font-black text-white">{{ valido ? 'XML Válido' : 'XML Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Métricas quando válido -->
            <div v-if="valido" class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ stats.elementos }}</div>
                <div class="metric-glass-label">Elementos</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ stats.atributos }}</div>
                <div class="metric-glass-label">Atributos</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ stats.linhas }}</div>
                <div class="metric-glass-label">Linhas</div>
              </div>
            </div>

            <!-- Detalhe do erro -->
            <div v-if="!valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-bug text-red-500"></i>
                Detalhe do Erro
              </h4>
              <div class="tip-card-warning">
                <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
                <span class="text-xs font-mono">{{ erroDetalhe }}</span>
              </div>
            </div>

            <!-- Detalhamento quando válido -->
            <div v-if="valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-info-circle text-orange-500"></i>
                Informações
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Elemento raiz</span>
                  <span class="font-mono font-bold text-gray-900 dark:text-white">&lt;{{ rootElement }}&gt;</span>
                </div>
                <div class="flex justify-between py-1.5 border-b border-gray-100 dark:border-slate-700">
                  <span class="text-gray-600 dark:text-slate-300">Declaração XML</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ temDeclaracao ? 'Presente' : 'Ausente' }}</span>
                </div>
                <div class="flex justify-between py-1.5">
                  <span class="text-gray-600 dark:text-slate-300">Tamanho</span>
                  <span class="font-bold text-gray-900 dark:text-white">{{ tamanhoKB }} KB</span>
                </div>
              </div>
            </div>

            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">XML bem formado com <strong>{{ stats.elementos }}</strong> elemento(s) e <strong>{{ stats.atributos }}</strong> atributo(s).</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-file-code text-4xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Cole seu XML ao lado para validar</p>
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

const xmlExamples = [
  { title: 'XML válido',      desc: 'Entrada: <root><item>Texto</item></root>', result: 'XML bem formado' },
  { title: 'Com declaração',  desc: 'Adicione a declaração XML na primeira linha', result: 'XML bem formado' },
  { title: 'Tag não fechada', desc: 'Entrada: <root><item>Texto</root>', result: 'XML inválido — tag <item> não foi fechada' },
]

const xml        = ref('')
const resultado  = ref(false)
const valido     = ref(false)
const mensagem   = ref('')
const erroDetalhe = ref('')
const rootElement = ref('')
const temDeclaracao = ref(false)

const stats = computed(() => ({
  elementos: valido.value ? (xml.value.match(/<[^/!?][^>]*>/g) || []).length : 0,
  atributos: valido.value ? (xml.value.match(/\s\w+="[^"]*"/g) || []).length : 0,
  linhas:    xml.value.split('\n').length,
}))

const tamanhoKB = computed(() => (new Blob([xml.value]).size / 1024).toFixed(2))

const validar = () => {
  if (!xml.value.trim()) { resultado.value = false; return }

  try {
    const parser = new DOMParser()
    const doc    = parser.parseFromString(xml.value, 'text/xml')
    const erros  = doc.getElementsByTagName('parsererror')

    if (erros.length > 0) {
      valido.value     = false
      mensagem.value   = 'XML mal formado — erro de estrutura detectado'
      erroDetalhe.value = erros[0].textContent?.trim().split('\n')[0] || 'Erro de parsing desconhecido'
    } else {
      valido.value        = true
      mensagem.value      = 'XML bem formado'
      erroDetalhe.value   = ''
      rootElement.value   = doc.documentElement?.tagName || '—'
      temDeclaracao.value = xml.value.trimStart().startsWith('<?xml')
    }
  } catch (e: any) {
    valido.value      = false
    mensagem.value    = 'Erro ao analisar o XML'
    erroDetalhe.value = e.message
  }

  resultado.value = true
}

const limpar = () => { xml.value = ''; resultado.value = false; valido.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

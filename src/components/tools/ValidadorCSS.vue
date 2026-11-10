<template>
  <ToolShell
    title="Validador de CSS"
    description="Valide folhas de estilo CSS com detecção de erros de sintaxe, chaves desbalanceadas e análise de estatísticas."
    icon="fa-css3-alt"
    icon-gradient="from-blue-500 to-indigo-700"
    orb-color="blue"
    :quick-tips="['Detecta chaves abertas', 'Conta seletores e props', 'Validação em tempo real']"
    :tips="[
      { title: 'Chaves balanceadas', text: 'Cada { deve ter um } correspondente. Uma chave faltando quebra todo o restante do CSS.', type: 'warning' },
      { title: 'Use Stylelint em projetos', text: 'Para projetos reais, integre o Stylelint ao seu processo de build para validação mais completa.', type: 'info' },
      { title: 'CSS inválido e layout', text: 'Um erro de CSS pode fazer o layout quebrar silenciosamente — o navegador ignora regras inválidas.', type: 'warning' },
    ]"
    :examples="[
      { title: 'CSS simples', desc: 'body { color: #333; font-size: 16px; }', result: 'Válido — 1 seletor, 2 propriedades' },
      { title: 'Chave faltando', desc: 'body { color: red; h1 { font-size: 2rem; }', result: 'Inválido — chaves desbalanceadas' },
      { title: 'Múltiplas regras', desc: '.card { padding: 1rem; } .btn { background: blue; }', result: 'Válido — 2 seletores, 2 propriedades' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <label class="input-aurora-label">
            <i class="fas fa-code mr-1.5 text-blue-500"></i>
            Código CSS
          </label>
          <textarea
            v-model="css"
            @input="validar"
            class="input-aurora font-mono text-sm resize-y"
            rows="12"
            placeholder="body {&#10;  color: #333;&#10;  font-size: 16px;&#10;}&#10;&#10;h1 {&#10;  font-weight: bold;&#10;}"
          ></textarea>
          <div class="flex gap-3 mt-3">
            <BaseButton variant="primary" icon="fa-check-circle" @click="validar" class="flex-1">
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
              <p class="text-2xl font-black text-white">{{ valido ? 'CSS Válido' : 'CSS Inválido' }}</p>
              <p :class="['text-sm mt-1', valido ? 'text-emerald-300' : 'text-red-300']">{{ mensagem }}</p>
            </div>

            <!-- Métricas -->
            <div v-if="valido" class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ stats.seletores }}</div>
                <div class="metric-glass-label">Seletores</div>
              </div>
              <div class="metric-glass ring-1 ring-purple-100 dark:ring-purple-900">
                <div class="metric-glass-value text-purple-600 dark:text-purple-400">{{ stats.propriedades }}</div>
                <div class="metric-glass-label">Propriedades</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ stats.linhas }}</div>
                <div class="metric-glass-label">Linhas</div>
              </div>
            </div>

            <!-- Detalhes de erro -->
            <div v-if="!valido" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-2 flex items-center gap-2">
                <i class="fas fa-bug text-red-500"></i>
                Detalhe do Erro
              </h4>
              <div class="tip-card-warning">
                <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5"></i>
                <span class="text-xs">{{ detalhesErro }}</span>
              </div>
            </div>

            <!-- Dica de sucesso -->
            <div v-if="valido" class="tip-card-success">
              <i class="fas fa-check-circle text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">
                CSS bem formado com <strong>{{ stats.seletores }}</strong> seletor(es) e
                <strong>{{ stats.propriedades }}</strong> propriedade(s) definida(s).
              </span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-css3-alt text-4xl mb-3 opacity-30 block text-blue-400"></i>
          <p class="text-sm">Cole seu CSS ao lado para validar</p>
        </div>
      </div>
    </div>
  </ToolShell>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ToolShell from '@/components/tools/common/ToolShell.vue'
import BaseButton from '@/components/tools/common/BaseButton.vue'

const css        = ref('')
const resultado  = ref(false)
const valido     = ref(false)
const mensagem   = ref('')
const detalhesErro = ref('')

const stats = computed(() => ({
  seletores:    (css.value.match(/[^{}]+(?=\{)/g) || []).filter(s => s.trim()).length,
  propriedades: (css.value.match(/[\w-]+\s*:\s*[^;]+;/g) || []).length,
  linhas:       css.value.split('\n').length,
}))

const validar = () => {
  if (!css.value.trim()) { resultado.value = false; return }

  let abre = 0, fecha = 0
  for (const ch of css.value) {
    if (ch === '{') abre++
    if (ch === '}') fecha++
  }

  if (abre !== fecha) {
    valido.value = false
    mensagem.value = 'CSS inválido — chaves não balanceadas'
    detalhesErro.value = `${abre} chave(s) aberta(s) × ${fecha} fechada(s). Diferença: ${Math.abs(abre - fecha)}.`
  } else {
    valido.value = true
    mensagem.value = 'Estrutura de chaves válida'
    detalhesErro.value = ''
  }
  resultado.value = true
}

const limpar = () => { css.value = ''; resultado.value = false }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

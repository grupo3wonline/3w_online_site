<template>
  <ToolShell
    title="Validador de HTML"
    description="Valide estrutura HTML detectando tags não fechadas, DOCTYPE ausente e problemas de semântica."
    icon="fa-html5"
    icon-gradient="from-orange-500 to-red-700"
    orb-color="orange"
    :quick-tips="['Detecta tags abertas', 'Verifica DOCTYPE', 'Semântica HTML5']"
    :tips="[
      { title: 'HTML semântico e SEO', text: 'Tags semânticas como <article>, <section>, <nav> e <header> melhoram SEO e acessibilidade.', type: 'info' },
      { title: 'Tags auto-fechantes', text: 'Tags como <img>, <br>, <hr>, <input>, <meta> e <link> não precisam de tag de fechamento.', type: 'info' },
      { title: 'DOCTYPE obrigatório', text: '<!DOCTYPE html> deve ser a primeira linha de qualquer documento HTML5 válido.', type: 'warning' },
    ]"
    :examples="[
      { title: 'HTML mínimo válido', desc: '<!DOCTYPE html><html><head><title>T</title></head><body></body></html>', result: '0 problemas encontrados' },
      { title: 'Sem DOCTYPE', desc: '<html><body><p>Texto</p></body></html>', result: '1 problema: DOCTYPE não declarado' },
      { title: 'Tag não fechada', desc: '<div><p>Texto</div>', result: '1 problema: <p> não foi fechada' },
    ]"
  >
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">

      <!-- Formulário -->
      <div class="space-y-4">
        <div class="tool-body !mb-0">
          <label class="input-aurora-label">
            <i class="fas fa-code mr-1.5 text-orange-500"></i>
            Código HTML
          </label>
          <textarea
            v-model="html"
            @input="validar"
            class="input-aurora font-mono text-sm resize-y"
            rows="12"
            placeholder="<!DOCTYPE html>&#10;<html>&#10;  <head>&#10;    <title>Minha Página</title>&#10;  </head>&#10;  <body>&#10;    <h1>Olá Mundo</h1>&#10;  </body>&#10;</html>"
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
            <div :class="['tool-header text-center py-6', problemas.length === 0 ? '' : 'from-amber-900/60 to-amber-800/40']">
              <i :class="['text-5xl mb-3 block', problemas.length === 0 ? 'fas fa-check-circle text-emerald-400' : 'fas fa-exclamation-triangle text-amber-400']"></i>
              <p class="text-4xl font-black text-white mb-1">{{ problemas.length }}</p>
              <p :class="['text-sm', problemas.length === 0 ? 'text-emerald-300' : 'text-amber-300']">
                {{ problemas.length === 0 ? 'Nenhum problema encontrado' : problemas.length === 1 ? 'problema encontrado' : 'problemas encontrados' }}
              </p>
            </div>

            <!-- Métricas -->
            <div class="grid grid-cols-3 gap-3">
              <div class="metric-glass ring-1 ring-orange-100 dark:ring-orange-900">
                <div class="metric-glass-value text-orange-600 dark:text-orange-400">{{ stats.tags }}</div>
                <div class="metric-glass-label">Tags</div>
              </div>
              <div class="metric-glass ring-1 ring-blue-100 dark:ring-blue-900">
                <div class="metric-glass-value text-blue-600 dark:text-blue-400">{{ stats.linhas }}</div>
                <div class="metric-glass-label">Linhas</div>
              </div>
              <div class="metric-glass ring-1 ring-teal-100 dark:ring-teal-900">
                <div class="metric-glass-value text-teal-600 dark:text-teal-400">{{ stats.caracteres }}</div>
                <div class="metric-glass-label">Caracteres</div>
              </div>
            </div>

            <!-- Lista de problemas -->
            <div v-if="problemas.length > 0" class="glass-panel p-4">
              <h4 class="text-sm font-bold text-gray-700 dark:text-slate-200 mb-3 flex items-center gap-2">
                <i class="fas fa-list text-amber-500"></i>
                Problemas Detectados
              </h4>
              <div class="space-y-2">
                <div
                  v-for="(prob, i) in problemas"
                  :key="i"
                  class="tip-card-warning"
                >
                  <i class="fas fa-exclamation-triangle text-amber-500 flex-shrink-0 mt-0.5 text-xs"></i>
                  <span class="text-xs">{{ prob }}</span>
                </div>
              </div>
            </div>

            <!-- Dica de sucesso -->
            <div v-if="problemas.length === 0" class="tip-card-success">
              <i class="fas fa-award text-emerald-500 flex-shrink-0 mt-0.5"></i>
              <span class="text-xs">HTML estruturalmente correto com <strong>{{ stats.tags }}</strong> tags detectadas.</span>
            </div>
          </div>
        </Transition>

        <div v-if="!resultado" class="glass-panel text-center py-12 text-gray-400">
          <i class="fas fa-html5 text-4xl mb-3 opacity-30 block text-orange-400"></i>
          <p class="text-sm">Cole seu HTML ao lado para validar</p>
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

const html     = ref('')
const resultado = ref(false)
const problemas = ref<string[]>([])

const stats = computed(() => ({
  tags:       (html.value.match(/<[^>]+>/g) || []).length,
  linhas:     html.value.split('\n').length,
  caracteres: html.value.length,
}))

const validar = () => {
  if (!html.value) { resultado.value = false; return }

  const probs: string[] = []

  if (!html.value.includes('<!DOCTYPE')) probs.push('DOCTYPE não declarado — adicione <!DOCTYPE html> na primeira linha')
  if (!html.value.includes('<html')) probs.push('Tag <html> não encontrada')
  if (!html.value.includes('<head')) probs.push('Tag <head> não encontrada')
  if (!html.value.includes('<body')) probs.push('Tag <body> não encontrada')

  const autoFechamento = ['img','br','hr','input','meta','link','area','base','col','embed','param','source','track','wbr']
  const tagsAbertura = (html.value.match(/<(\w+)(?:\s|>)/g) || [])
    .map(t => { const m = t.match(/<(\w+)/); return m ? m[1].toLowerCase() : '' })
    .filter(Boolean)
  const tagsFechamento = (html.value.match(/<\/(\w+)>/g) || [])
    .map(t => { const m = t.match(/<\/(\w+)>/); return m ? m[1].toLowerCase() : '' })
    .filter(Boolean)

  tagsAbertura.forEach(tag => {
    if (!autoFechamento.includes(tag) && !tagsFechamento.includes(tag)) {
      probs.push(`Tag <${tag}> não foi fechada`)
    }
  })

  problemas.value = [...new Set(probs)]
  resultado.value = true
}

const limpar = () => { html.value = ''; resultado.value = false; problemas.value = [] }
</script>

<style scoped>
.scale-in-enter-active, .scale-in-leave-active { transition: all 0.3s ease; }
.scale-in-enter-from { transform: scale(0.97); opacity: 0; }
.scale-in-leave-to   { opacity: 0; }
</style>

<!--
  ToolShell.vue — Layout padrão Aurora Glass para ferramentas individuais.

  Uso:
  <ToolShell
    title="Nome da Ferramenta"
    description="Descrição curta"
    icon="fa-calculator"
    icon-gradient="from-blue-500 to-primary-600"
    :tips="[{ title: 'Dica', text: 'Dica de uso...', type: 'info' }]"
    :examples="[{ title: 'Exemplo 1', desc: 'Descrição do exemplo', result: 'Resultado' }]"
    :quick-tips="['Client-Side', 'Gratuito']"
  >
    <!-- slot padrão: conteúdo principal -->
    <!-- slot name="header": cabeçalho personalizado abaixo do header padrão -->
  </ToolShell>
-->
<template>
  <article class="tool-shell animate-fade-in-up" :aria-label="title">

    <!-- ── Cabeçalho Aurora ─────────────────────────────────────── -->
    <header :class="['tool-header relative', !$slots.header ? 'pb-7' : '']" role="banner">
      <!-- Orbs decorativos de fundo -->
      <div
        class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
        :class="`bg-${orbColor}-400`"
        aria-hidden="true"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none"
        :class="`bg-${orbColor}-300`"
        aria-hidden="true"
      ></div>

      <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Ícone + Título + Descrição -->
        <div class="flex items-center gap-4">
          <div
            :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0',
              'bg-gradient-to-br', iconGradient || 'from-white/20 to-white/10',
              'border border-white/20',
            ]"
            aria-hidden="true"
          >
            <i :class="['fas', icon, 'text-2xl text-white']"></i>
          </div>
          <div>
            <h1 class="text-xl sm:text-2xl font-black text-white leading-tight">{{ title }}</h1>
            <p v-if="description" class="text-sm text-blue-200 mt-0.5 max-w-lg leading-relaxed">
              {{ description }}
            </p>
          </div>
        </div>

        <!-- Ações rápidas: Compartilhar + Ajuda -->
        <div class="flex items-center gap-2 flex-shrink-0 print:hidden">
          <button
            class="btn-glass text-xs py-1.5 px-3"
            title="Compartilhar no WhatsApp"
            aria-label="Compartilhar ferramenta no WhatsApp"
            @click="shareWhatsApp"
          >
            <i class="fas fa-share-alt mr-1" aria-hidden="true"></i>
            Compartilhar
          </button>
          <button
            v-if="tips?.length || examples?.length"
            class="btn-glass text-xs py-1.5 px-3"
            title="Ajuda e exemplos de uso"
            aria-label="Abrir ajuda e exemplos"
            @click="helpSwal"
          >
            <i class="fas fa-question-circle mr-1" aria-hidden="true"></i>
            Ajuda
          </button>
        </div>
      </div>

      <!-- Slot de header personalizado -->
      <slot name="header"></slot>
    </header>

    <!-- ══ Aurora Glass Surface ════════════════════════════════════
         Em modo claro: fundo dark-navy garante contraste para todos
         os elementos glass (text-white, bg-white/5, etc.).
         O div filho class="dark" força todas as variantes dark: do
         Tailwind — independente do tema do sistema operacional.
    ═══════════════════════════════════════════════════════════════ -->
    <div class="aurora-glass-surface">
      <div class="dark px-4 sm:px-5 pt-5 pb-7">

        <!-- ── Dicas rápidas (pills) ──────────────────────────── -->
        <div
          v-if="quickTips?.length"
          class="flex flex-wrap gap-2 mb-5"
          role="list"
          aria-label="Características da ferramenta"
        >
          <span
            v-for="qt in quickTips"
            :key="qt"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-200 border border-primary-500/30"
            role="listitem"
          >
            <i class="fas fa-check-circle text-primary-400 text-[10px]" aria-hidden="true"></i>
            {{ qt }}
          </span>
        </div>

        <!-- ── Conteúdo principal ──────────────────────────────── -->
        <main>
          <slot></slot>
        </main>

        <!-- ── Seção de Dicas ──────────────────────────────────── -->
        <section v-if="tips?.length" class="mt-5 space-y-3 print:hidden" aria-label="Dicas e boas práticas">
          <button
            class="accordion-trigger text-sm"
            :aria-expanded="tipsOpen"
            aria-controls="tips-panel"
            @click="tipsOpen = !tipsOpen"
          >
            <span class="flex items-center gap-2">
              <i class="fas fa-lightbulb text-amber-500" aria-hidden="true"></i>
              Dicas &amp; Boas Práticas
              <span class="badge-aurora-orange">{{ tips.length }}</span>
            </span>
            <i
              :class="['fas', tipsOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400 transition-transform']"
              aria-hidden="true"
            ></i>
          </button>
          <Transition name="accordion">
            <div v-if="tipsOpen" id="tips-panel" class="space-y-2.5">
              <div
                v-for="(tip, i) in tips"
                :key="i"
                :class="[
                  'tip-card',
                  tip.type === 'warning' ? 'tip-card-warning' : tip.type === 'success' ? 'tip-card-success' : ''
                ]"
                role="note"
              >
                <i
                  :class="[
                    'fas mt-0.5 flex-shrink-0 text-sm',
                    tip.type === 'warning' ? 'fa-exclamation-triangle text-amber-500' :
                    tip.type === 'success' ? 'fa-check-circle text-emerald-500' :
                    'fa-info-circle text-blue-500'
                  ]"
                  aria-hidden="true"
                ></i>
                <div>
                  <strong v-if="tip.title" class="block mb-0.5">{{ tip.title }}</strong>
                  <span>{{ tip.text }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </section>

        <!-- ── Seção de Exemplos ───────────────────────────────── -->
        <section v-if="examples?.length" class="mt-3 space-y-3 print:hidden" aria-label="Exemplos de uso">
          <button
            class="accordion-trigger text-sm"
            :aria-expanded="examplesOpen"
            aria-controls="examples-panel"
            @click="examplesOpen = !examplesOpen"
          >
            <span class="flex items-center gap-2">
              <i class="fas fa-code text-purple-500" aria-hidden="true"></i>
              Exemplos de Uso
              <span class="badge-aurora-purple">{{ examples.length }}</span>
            </span>
            <i
              :class="['fas', examplesOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400 transition-transform']"
              aria-hidden="true"
            ></i>
          </button>
          <Transition name="accordion">
            <div v-if="examplesOpen" id="examples-panel" class="space-y-3">
              <div
                v-for="(ex, i) in examples"
                :key="i"
                class="glass-panel p-4"
              >
                <div class="flex items-start gap-2.5 mb-2">
                  <span
                    class="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[11px] font-black flex-shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {{ i + 1 }}
                  </span>
                  <div>
                    <strong v-if="ex.title" class="text-xs font-bold text-gray-900 dark:text-white block mb-0.5">
                      {{ ex.title }}
                    </strong>
                    <p class="text-xs text-gray-600 dark:text-slate-300 leading-relaxed">{{ ex.desc }}</p>
                  </div>
                </div>
                <div v-if="ex.code" class="example-block mt-2">{{ ex.code }}</div>
                <div
                  v-if="ex.result"
                  class="mt-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 text-xs text-emerald-700 dark:text-emerald-300"
                >
                  <i class="fas fa-arrow-right mr-1.5 text-[10px]" aria-hidden="true"></i>
                  <strong>Resultado:</strong> {{ ex.result }}
                </div>
              </div>
            </div>
          </Transition>
        </section>

        <!-- ── Rodapé de privacidade ───────────────────────────── -->
        <footer class="mt-6 pt-4 border-t border-white/10 print:hidden">
          <p class="text-xs text-blue-300/60 text-center flex items-center justify-center gap-1.5">
            <i class="fas fa-shield-halved text-green-500/70 text-[11px]" aria-hidden="true"></i>
            Processamento 100% local — nenhum dado é enviado a servidores.
          </p>
        </footer>

      </div><!-- /dark -->
    </div><!-- /aurora-glass-surface -->

  </article><!-- /tool-shell -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'

export interface TipItem {
  title?: string
  text:   string
  type?:  'info' | 'warning' | 'success'
}

export interface ExampleItem {
  title?:  string
  desc:    string
  code?:   string
  result?: string
}

const props = withDefaults(defineProps<{
  title:         string
  description?:  string
  icon:          string
  iconGradient?: string
  orbColor?:     string
  tips?:         TipItem[]
  examples?:     ExampleItem[]
  quickTips?:    string[]
}>(), {
  description:  '',
  iconGradient: 'from-primary-500 to-primary-700',
  orbColor:     'blue',
  tips:         () => [],
  examples:     () => [],
  quickTips:    () => [],
})

const tipsOpen     = ref(false)
const examplesOpen = ref(false)

// ── Compartilhar / Ajuda ──────────────────────────────────────────
const shareWhatsApp = () => {
  if (typeof window === 'undefined') return
  const url  = window.location.href
  const text = encodeURIComponent(`Confira esta ferramenta gratuita: ${props.title} — ${url}`)
  window.open(`https://wa.me/?text=${text}`, '_blank', 'noopener,noreferrer')
}

const helpSwal = () => {
  if (!props.tips?.length && !props.examples?.length) return

  const tipsHtml = (props.tips ?? []).map(t => {
    const icon = t.type === 'warning' ? '⚠️' : t.type === 'success' ? '✅' : 'ℹ️'
    return `<li style="margin:6px 0;text-align:left">${icon} ${t.title ? `<strong>${t.title}:</strong> ` : ''}${t.text}</li>`
  }).join('')

  const exHtml = (props.examples ?? []).map((e, i) => {
    const resultHtml = e.result ? `<div style="margin-top:4px;padding:4px 8px;background:#d1fae5;border-radius:6px;font-size:0.75rem;color:#065f46">→ ${e.result}</div>` : ''
    return `<li style="margin:6px 0;text-align:left"><strong>${i + 1}. ${e.title || ''}</strong><br><small style="color:#6b7280">${e.desc}</small>${resultHtml}</li>`
  }).join('')

  Swal.fire({
    title: `<i class="fas fa-question-circle" style="color:#2563eb"></i> ${props.title}`,
    html: `
      ${props.description ? `<p style="font-size:0.85rem;color:#6b7280;margin-bottom:12px">${props.description}</p>` : ''}
      ${tipsHtml ? `<strong style="font-size:0.8rem;color:#374151">💡 Dicas:</strong><ul style="list-style:none;padding:0;margin:4px 0 12px">${tipsHtml}</ul>` : ''}
      ${exHtml ? `<strong style="font-size:0.8rem;color:#374151">🧩 Exemplos:</strong><ul style="list-style:none;padding:0;margin:4px 0">${exHtml}</ul>` : ''}
    `,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#2563eb',
    showCloseButton: true,
    width: 540,
  })
}
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
  max-height: 1200px;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}

@media print {
  .tool-shell {
    break-inside: avoid;
  }
}
</style>

<!--
  ToolShell.vue - Layout padrao Aurora Glass para ferramentas individuais.

  Uso:
  <ToolShell
    title="Nome da Ferramenta"
    description="Descricao curta"
    icon="fa-calculator"
    icon-gradient="from-blue-500 to-primary-600"
    :tips="[{ text: 'Dica de uso...', type: 'info' }]"
    :examples="[{ title: 'Exemplo 1', desc: 'Descricao do exemplo' }]"
  >
    slot para o conteudo principal
  </ToolShell>
-->
<template>
  <div class="tool-shell animate-fade-in-up">

    <!-- ── Cabeçalho Aurora ─────────────────────────────────────── -->
    <div :class="['tool-header relative', !$slots.header ? 'pb-7' : '']">
      <!-- Orb decorativo de fundo -->
      <div class="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
           :class="`bg-${orbColor}-400`"></div>
      <div class="absolute bottom-0 left-0 w-32 h-32 rounded-full blur-2xl opacity-15 pointer-events-none"
           :class="`bg-${orbColor}-300`"></div>

      <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <!-- Ícone + Título + Descrição -->
        <div class="flex items-center gap-4">
          <div
            :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0',
              'bg-gradient-to-br', iconGradient || 'from-white/20 to-white/10',
              'border border-white/20',
            ]"
          >
            <i :class="['fas', icon, 'text-2xl text-white']"></i>
          </div>
          <div>
            <h2 class="text-xl sm:text-2xl font-black text-white leading-tight">{{ title }}</h2>
            <p v-if="description" class="text-sm text-blue-200 mt-0.5 max-w-lg leading-relaxed">
              {{ description }}
            </p>
          </div>
        </div>

        <!-- Ações rápidas -->
        <div class="flex items-center gap-2 flex-shrink-0">
          <button @click="shareWhatsApp" class="btn-glass text-xs py-1.5 px-3" title="Compartilhar no WhatsApp">
            <i class="fas fa-share-alt mr-1"></i>
            Compartilhar
          </button>
          <button @click="helpSwal" v-if="tips?.length || examples?.length" class="btn-glass text-xs py-1.5 px-3" title="Ajuda & Exemplos">
            <i class="fas fa-question-circle mr-1"></i>
            Ajuda
          </button>
        </div>
      </div>

      <!-- Slot de header personalizado -->
      <slot name="header"></slot>
    </div>

    <!-- ══ Aurora Glass Surface ════════════════════════════════════
         Em modo claro: fundo dark-navy garante contraste para todos
         os elementos glass (text-white, bg-white/5, etc.).
         O div filho class="dark" força todas as variantes dark: do
         Tailwind — independente do tema do sistema operacional.
    ═══════════════════════════════════════════════════════════════ -->
    <div class="aurora-glass-surface">
      <div class="dark px-4 sm:px-5 pt-5 pb-7">

        <!-- ── Dicas rápidas (pills) ──────────────────────────── -->
        <div v-if="quickTips?.length" class="flex flex-wrap gap-2 mb-5">
          <span
            v-for="qt in quickTips"
            :key="qt"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-200 border border-primary-500/30"
          >
            <i class="fas fa-check-circle text-primary-400 text-[10px]"></i>
            {{ qt }}
          </span>
        </div>

        <!-- ── Conteúdo principal ──────────────────────────────── -->
        <slot></slot>

        <!-- ── Seção de Dicas ──────────────────────────────────── -->
        <div v-if="tips?.length" class="mt-5 space-y-3">
          <button
            @click="tipsOpen = !tipsOpen"
            class="accordion-trigger text-sm"
          >
            <span class="flex items-center gap-2">
              <i class="fas fa-lightbulb text-amber-500"></i>
              Dicas & Boas Práticas
              <span class="badge-aurora-orange">{{ tips.length }}</span>
            </span>
            <i :class="['fas', tipsOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400 transition-transform']"></i>
          </button>
          <Transition name="accordion">
            <div v-if="tipsOpen" class="space-y-2.5">
              <div
                v-for="(tip, i) in tips"
                :key="i"
                :class="[
                  'tip-card',
                  tip.type === 'warning' ? 'tip-card-warning' : tip.type === 'success' ? 'tip-card-success' : ''
                ]"
              >
                <i :class="[
                  'fas mt-0.5 flex-shrink-0 text-sm',
                  tip.type === 'warning' ? 'fa-exclamation-triangle text-amber-500' :
                  tip.type === 'success' ? 'fa-check-circle text-emerald-500' :
                  'fa-info-circle text-blue-500'
                ]"></i>
                <div>
                  <strong v-if="tip.title" class="block mb-0.5">{{ tip.title }}</strong>
                  <span>{{ tip.text }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- ── Seção de Exemplos ───────────────────────────────── -->
        <div v-if="examples?.length" class="mt-3 space-y-3">
          <button
            @click="examplesOpen = !examplesOpen"
            class="accordion-trigger text-sm"
          >
            <span class="flex items-center gap-2">
              <i class="fas fa-code text-purple-500"></i>
              Exemplos de Uso
              <span class="badge-aurora-purple">{{ examples.length }}</span>
            </span>
            <i :class="['fas', examplesOpen ? 'fa-chevron-up' : 'fa-chevron-down', 'text-xs text-gray-400 transition-transform']"></i>
          </button>
          <Transition name="accordion">
            <div v-if="examplesOpen" class="space-y-3">
              <div
                v-for="(ex, i) in examples"
                :key="i"
                class="glass-panel p-4"
              >
                <div class="flex items-start gap-2.5 mb-2">
                  <span class="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-[11px] font-black flex-shrink-0 mt-0.5">
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
                <div v-if="ex.result" class="mt-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/40 text-xs text-emerald-700 dark:text-emerald-300">
                  <i class="fas fa-arrow-right mr-1.5 text-[10px]"></i>
                  <strong>Resultado:</strong> {{ ex.result }}
                </div>
              </div>
            </div>
          </Transition>
        </div>

      </div><!-- /dark -->
    </div><!-- /aurora-glass-surface -->

  </div><!-- /tool-shell -->
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

// ── Ações de compartilhamento / ajuda ─────────────────────────────
const shareWhatsApp = () => {
  if (typeof window === 'undefined') return
  const url  = window.location.href
  const text = encodeURIComponent(`Confira esta ferramenta gratuita: ${props.title} — ${url}`)
  window.open(`https://wa.me/?text=${text}`, '_blank')
}

const helpSwal = () => {
  if (!props.tips?.length && !props.examples?.length) return
  const tipsHtml = (props.tips ?? [])
    .map(t => `<li style="margin:4px 0;text-align:left"><small>${t.text}</small></li>`)
    .join('')
  const exHtml = (props.examples ?? [])
    .map(e => `<li style="margin:4px 0;text-align:left"><strong>${e.title || ''}</strong><br><small>${e.desc}</small></li>`)
    .join('')

  Swal.fire({
    title: `<i class="fas fa-question-circle" style="color:#2563eb"></i> ${props.title}`,
    html: `
      ${props.description ? `<p style="font-size:0.85rem;color:#6b7280;margin-bottom:12px">${props.description}</p>` : ''}
      ${tipsHtml ? `<strong style="font-size:0.8rem;color:#374151">💡 Dicas:</strong><ul style="list-style:disc;padding-left:16px;margin:4px 0 12px">${tipsHtml}</ul>` : ''}
      ${exHtml ? `<strong style="font-size:0.8rem;color:#374151">🧩 Exemplos:</strong><ul style="list-style:decimal;padding-left:16px;margin:4px 0">${exHtml}</ul>` : ''}
    `,
    confirmButtonText: 'Entendido <i class="fas fa-check ml-1"></i>',
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
  max-height: 1000px;
}
.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}
</style>

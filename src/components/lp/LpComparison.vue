<!--
  LpComparison.vue — Tabela de comparação 3W Online vs Concorrentes vs DIY.

  Elemento poderoso de conversão que usa âncoragem de valor e eliminação
  de objeções. Mostra claramente por que a 3W Online é a melhor escolha.

  Props:
  - rows: array de linhas de comparação
  - ctaLabel: texto do botão final
  - ctaUrl: destino do botão
-->
<template>
  <section class="section-padding bg-slate-50 dark:bg-slate-800/50 print:hidden">
    <div class="container">
      <div class="text-center mb-10">
        <span class="section-label">Por que a 3W Online?</span>
        <h2 class="section-title">Compare Antes de Decidir</h2>
        <p class="section-subtitle max-w-2xl mx-auto">
          Veja o que você recebe ao escolher a 3W Online em relação às alternativas do mercado.
        </p>
      </div>

      <!-- Tabela de comparação -->
      <div class="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <table class="w-full text-xs sm:text-sm border-collapse" role="grid" aria-label="Comparativo de serviços">
          <thead>
            <tr>
              <th class="p-4 text-left font-bold text-gray-700 dark:text-slate-200 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 w-2/5">
                Critério
              </th>
              <th class="p-4 text-center bg-primary-600 text-white border-b border-primary-500 w-1/5">
                <div class="font-black text-sm">3W Online</div>
                <div class="text-[11px] text-primary-200 font-normal">Recomendado</div>
              </th>
              <th class="p-4 text-center font-bold text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 w-1/5">
                Agência Genérica
              </th>
              <th class="p-4 text-center font-bold text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 w-1/5">
                Freelancer / DIY
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, i) in computedRows"
              :key="i"
              :class="[
                'border-b border-gray-100 dark:border-slate-700 last:border-0 transition-colors',
                i % 2 === 0 ? 'bg-white dark:bg-slate-800/80' : 'bg-slate-50/50 dark:bg-slate-900/40',
              ]"
            >
              <!-- Critério -->
              <td class="p-4 text-gray-700 dark:text-slate-200 font-medium">
                {{ row.criterion }}
              </td>

              <!-- 3W Online (highlighted) -->
              <td class="p-4 text-center bg-primary-50/60 dark:bg-primary-900/10">
                <span v-if="row.us === true" class="inline-flex items-center justify-center w-6 h-6 bg-emerald-500 rounded-full" aria-label="Sim">
                  <i class="fas fa-check text-white text-[10px]" aria-hidden="true"></i>
                </span>
                <span v-else-if="row.us === false" class="inline-flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full" aria-label="Não">
                  <i class="fas fa-times text-red-500 text-[10px]" aria-hidden="true"></i>
                </span>
                <span v-else class="text-xs font-bold text-primary-700 dark:text-primary-300">{{ row.us }}</span>
              </td>

              <!-- Agência Genérica -->
              <td class="p-4 text-center">
                <span v-if="row.agency === true" class="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full" aria-label="Sim">
                  <i class="fas fa-check text-emerald-500 text-[10px]" aria-hidden="true"></i>
                </span>
                <span v-else-if="row.agency === false" class="inline-flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full" aria-label="Não">
                  <i class="fas fa-times text-red-500 text-[10px]" aria-hidden="true"></i>
                </span>
                <span v-else class="text-xs text-gray-500 dark:text-slate-400">{{ row.agency }}</span>
              </td>

              <!-- Freelancer / DIY -->
              <td class="p-4 text-center">
                <span v-if="row.diy === true" class="inline-flex items-center justify-center w-6 h-6 bg-emerald-100 dark:bg-emerald-900/30 rounded-full" aria-label="Sim">
                  <i class="fas fa-check text-emerald-500 text-[10px]" aria-hidden="true"></i>
                </span>
                <span v-else-if="row.diy === false" class="inline-flex items-center justify-center w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full" aria-label="Não">
                  <i class="fas fa-times text-red-500 text-[10px]" aria-hidden="true"></i>
                </span>
                <span v-else class="text-xs text-gray-500 dark:text-slate-400">{{ row.diy }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- CTA abaixo da tabela -->
      <div class="text-center mt-8">
        <p class="text-xs text-gray-500 dark:text-slate-400 mb-4">
          <i class="fas fa-award text-amber-500 mr-1" aria-hidden="true"></i>
          Escolhida por +150 empresas no Brasil • Sem fidelidade • Garantia de 30 dias
        </p>
        <a
          :href="ctaUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-primary text-sm shadow-md"
        >
          <i class="fab fa-whatsapp mr-2" aria-hidden="true"></i>
          {{ ctaLabel }}
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

export interface ComparisonRow {
  criterion: string
  us:        boolean | string
  agency:    boolean | string
  diy:       boolean | string
}

const props = withDefaults(defineProps<{
  rows?:     ComparisonRow[]
  ctaLabel?: string
  ctaUrl?:   string
}>(), {
  rows:     () => [],
  ctaLabel: 'Escolher a 3W Online Agora',
  ctaUrl:   'https://wa.me/5541996924829?text=Olá! Gostaria de falar com um especialista.',
})

// Defaults se nenhuma row for passada
const defaultRows: ComparisonRow[] = [
  { criterion: 'Transparência e relatórios mensais',  us: true,              agency: 'Parcial',      diy: false         },
  { criterion: 'Sem fidelidade ou multa rescisória',  us: true,              agency: false,          diy: true          },
  { criterion: 'Equipe técnica especializada',        us: true,              agency: 'Variável',     diy: false         },
  { criterion: 'Suporte dedicado via WhatsApp',       us: true,              agency: false,          diy: false         },
  { criterion: 'ROI mensurável e comprovado',         us: true,              agency: 'Parcial',      diy: false         },
  { criterion: 'Setup em até 48 horas',               us: true,              agency: false,          diy: false         },
  { criterion: 'Garantia de 30 dias',                 us: true,              agency: false,          diy: false         },
  { criterion: 'Custo mensal a partir de R$ 500',     us: true,              agency: false,          diy: 'Sem taxa'    },
]

const computedRows = computed(() => props.rows.length > 0 ? props.rows : defaultRows)
</script>

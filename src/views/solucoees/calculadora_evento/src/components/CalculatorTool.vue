<script setup lang="ts">
import { ref } from 'vue'
import Swal from 'sweetalert2'
import { useClipboard } from '@vueuse/core'
import { formatCurrency } from '@/lib/utils'
import {
  calculateEvent,
  eventSchema,
  formatResultSummary,
  type EventInput,
  type EventResult,
} from '@/lib/calc'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()
const { copy } = useClipboard()

async function copyResult() {
  if (!result.value) return
  const summary = formatResultSummary(result.value)
  try {
    await copy(summary)
    Swal.fire({
      icon: 'success',
      title: 'Copiado!',
      text: 'O resumo do orçamento foi copiado para a área de transferência.',
      confirmButtonColor: '#22c55e',
      timer: 2000,
      timerProgressBar: true,
    })
  } catch {
    Swal.fire({
      icon: 'error',
      title: 'Não foi possível copiar',
      text: 'Seu navegador bloqueou o acesso à área de transferência. Copie manualmente.',
      confirmButtonColor: '#3b82f6',
    })
  }
}

const form = ref<EventInput>({
  vlr_diaria: 1500,
  qtd_pessoas: 40,
  qtd_pagante: 10,
  duracao_dias: 5,
  outras_despesas: 3000,
  n_vezes: 5,
})

// Valores exibidos (mascarados) para os campos monetários; iniciam com os defaults formatados.
const currencyDisplay = ref<Record<'vlr_diaria' | 'outras_despesas', string>>({
  vlr_diaria: '1.500,00',
  outras_despesas: '3.000,00',
})

const result = ref<EventResult | null>(null)
const isCalculating = ref(false)

interface Field {
  key: keyof EventInput
  label: string
  icon: string
  placeholder: string
  tip: string
  /** 'currency' aplica máscara monetária (Maska); 'integer' aceita apenas inteiros. */
  kind: 'currency' | 'integer'
  prefix?: string
}

const fields: Field[] = [
  { key: 'vlr_diaria', label: 'Valor da Diária', icon: 'fa-solid fa-money-bill-wave', placeholder: '1.500,00', prefix: 'R$', tip: 'Custo diário do local/hospedagem', kind: 'currency' },
  { key: 'duracao_dias', label: 'Duração (dias)', icon: 'fa-solid fa-calendar-days', placeholder: '5', tip: 'Quantidade de dias do evento', kind: 'integer' },
  { key: 'qtd_pessoas', label: 'Total de Participantes', icon: 'fa-solid fa-users', placeholder: '40', tip: 'Número total de pessoas no evento', kind: 'integer' },
  { key: 'qtd_pagante', label: 'Participantes Pagantes', icon: 'fa-solid fa-credit-card', placeholder: '10', tip: 'Quantos vão pagar pelo evento', kind: 'integer' },
  { key: 'outras_despesas', label: 'Outras Despesas', icon: 'fa-solid fa-receipt', placeholder: '3.000,00', prefix: 'R$', tip: 'Gastos extras (transporte, materiais, etc)', kind: 'currency' },
  { key: 'n_vezes', label: 'Número de Parcelas', icon: 'fa-solid fa-divide', placeholder: '5', tip: 'Em quantas vezes dividir o pagamento', kind: 'integer' },
]

// Opções da máscara monetária Maska (pt-BR): milhar com ponto, decimal com vírgula.
// `onMaska` recebe o detalhe (masked/unmasked) a cada digitação.
function currencyOptions(key: 'vlr_diaria' | 'outras_despesas') {
  return {
    number: {
      locale: 'pt-BR',
      fraction: 2,
      unsigned: true,
    },
    onMaska: (detail: { masked: string; unmasked: string }) => onCurrencyMaska(key, detail),
  }
}

// Captura os valores emitidos pela diretiva Maska: `masked` para exibição e
// `unmasked` para o valor numérico usado no cálculo.
function onCurrencyMaska(
  key: 'vlr_diaria' | 'outras_despesas',
  detail: { masked: string; unmasked: string },
) {
  currencyDisplay.value[key] = detail.masked
  const normalized = detail.unmasked.replace(',', '.')
  const value = Number.parseFloat(normalized)
  form.value[key] = Number.isFinite(value) ? value : 0
}

function calculate() {
  const parsed = eventSchema.safeParse(form.value)
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Verifique os dados informados.'
    Swal.fire({ icon: 'warning', title: 'Atenção!', text: firstError, confirmButtonColor: '#3b82f6' })
    return
  }

  isCalculating.value = true
  ui.setLoading(true)

  setTimeout(() => {
    result.value = calculateEvent(parsed.data)
    isCalculating.value = false
    ui.setLoading(false)
    Swal.fire({ icon: 'success', title: 'Cálculo Realizado!', text: 'Confira os resultados detalhados abaixo.', confirmButtonColor: '#22c55e', timer: 2000, timerProgressBar: true })
  }, 600)
}

function reset() {
  Swal.fire({
    title: 'Limpar Dados?',
    text: 'Isso vai resetar todos os campos do formulário.',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3b82f6',
    cancelButtonColor: '#6b7280',
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
  }).then((r) => {
    if (r.isConfirmed) {
      form.value = { vlr_diaria: 0, qtd_pessoas: 1, qtd_pagante: 1, duracao_dias: 1, outras_despesas: 0, n_vezes: 1 }
      currencyDisplay.value = { vlr_diaria: '', outras_despesas: '' }
      result.value = null
    }
  })
}
</script>

<template>
  <div class="grid lg:grid-cols-2 gap-6 lg:gap-8 max-w-7xl mx-auto">
    <!-- Form -->
    <div class="bg-card border border-border/50 rounded-xl shadow-card p-6">
      <h3 class="flex items-center gap-2 text-xl md:text-2xl font-bold mb-6">
        <i class="fa-solid fa-calculator text-primary"></i>
        Dados do Evento
        <span class="ml-auto text-muted-foreground text-sm font-normal cursor-help" title="Preencha todos os campos para calcular">
          <i class="fa-solid fa-circle-question"></i>
        </span>
      </h3>

      <form class="grid sm:grid-cols-2 gap-4 mb-6" autocomplete="off" @submit.prevent="calculate">
        <div v-for="field in fields" :key="field.key" class="space-y-2">
          <label :for="field.key" class="flex items-center gap-2 text-sm font-medium text-foreground">
            <i :class="[field.icon, 'text-muted-foreground text-xs']"></i>
            {{ field.label }}
            <span class="text-muted-foreground cursor-help" :title="field.tip">
              <i class="fa-solid fa-circle-question text-xs"></i>
            </span>
          </label>
          <div class="relative">
            <span v-if="field.prefix" class="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{{ field.prefix }}</span>
            <!-- Campo monetário com máscara pt-BR (Maska) -->
            <input
              v-if="field.kind === 'currency'"
              :id="field.key"
              v-maska="currencyOptions(field.key as 'vlr_diaria' | 'outras_despesas')"
              type="text"
              inputmode="decimal"
              autocomplete="off"
              :value="currencyDisplay[field.key as 'vlr_diaria' | 'outras_despesas']"
              :placeholder="field.placeholder"
              :class="['w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm transition-all input-glow', field.prefix ? 'pl-10' : '']"
            />
            <!-- Campo inteiro -->
            <input
              v-else
              :id="field.key"
              v-model.number="form[field.key]"
              type="number"
              min="1"
              step="1"
              autocomplete="off"
              :placeholder="field.placeholder"
              :class="['w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm transition-all input-glow', field.prefix ? 'pl-10' : '']"
            />
          </div>
        </div>
      </form>

      <!-- Tip -->
      <div class="p-4 bg-primary/5 rounded-lg border border-primary/20 mb-6">
        <div class="flex gap-3">
          <i class="fa-solid fa-lightbulb text-primary mt-0.5"></i>
          <p class="text-sm text-muted-foreground">
            <strong class="text-foreground">Dica:</strong> O cálculo inclui automaticamente 11% de reserva de emergência para imprevistos e alimentação estimada em R$ 42,83 por pessoa/refeição (2 refeições/dia).
          </p>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          :disabled="isCalculating"
          class="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium bg-gradient-hero text-white btn-glow transition-all hover:opacity-90 disabled:opacity-50"
          @click="calculate"
        >
          <i :class="isCalculating ? 'fa-solid fa-spinner animate-spin' : 'fa-solid fa-calculator'"></i>
          {{ isCalculating ? 'Calculando...' : 'Calcular Custos' }}
        </button>
        <button
          type="button"
          class="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          @click="reset"
        >
          <i class="fa-solid fa-rotate-right"></i>
          Limpar
        </button>
      </div>
    </div>

    <!-- Results -->
    <div class="space-y-6">
      <div v-if="result" class="bg-card border border-border/50 rounded-xl shadow-card p-6 animate-fade-in">
        <div class="flex items-center justify-between gap-2 mb-6">
          <h3 class="flex items-center gap-2 text-xl md:text-2xl font-bold text-secondary">
            <i class="fa-solid fa-circle-check"></i>
            Resultado do Cálculo
          </h3>
          <button
            type="button"
            class="shrink-0 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Copiar resumo do orçamento"
            aria-label="Copiar resumo do orçamento"
            @click="copyResult"
          >
            <i class="fa-solid fa-copy"></i>
            <span class="hidden sm:inline">Copiar</span>
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-6">
          <div class="bg-muted/50 rounded-xl p-4 text-center">
            <div class="text-2xl md:text-3xl font-bold text-primary">{{ result.participantes }}</div>
            <div class="text-sm text-muted-foreground">Participantes</div>
          </div>
          <div class="bg-muted/50 rounded-xl p-4 text-center">
            <div class="text-2xl md:text-3xl font-bold text-primary">{{ result.dias }}</div>
            <div class="text-sm text-muted-foreground">Dias</div>
          </div>
        </div>

        <hr class="border-border mb-6" />

        <h4 class="text-lg font-semibold flex items-center gap-2 mb-4">
          <i class="fa-solid fa-receipt text-muted-foreground"></i>
          Detalhamento de Custos
        </h4>
        <div class="space-y-2 mb-6">
          <div class="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span class="text-muted-foreground">Valor da Diária:</span>
            <span class="font-medium">{{ formatCurrency(result.valor_diaria) }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span class="text-muted-foreground">Total Estadia:</span>
            <span class="font-medium">{{ formatCurrency(result.total_estadia) }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span class="text-muted-foreground">Total Alimentação:</span>
            <span class="font-medium">{{ formatCurrency(result.total_alimentacao) }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
            <span class="text-muted-foreground">Gastos Adicionais:</span>
            <span class="font-medium">{{ formatCurrency(result.gastos_adicionais) }}</span>
          </div>
          <div class="flex justify-between items-center p-3 bg-accent/10 rounded-lg border-l-4 border-accent">
            <span class="text-muted-foreground">Caixa de Reserva (11%):</span>
            <span class="font-semibold text-accent">{{ formatCurrency(result.valor_reserva) }}</span>
          </div>
        </div>

        <hr class="border-border mb-6" />

        <div class="bg-primary/10 rounded-xl p-6 border border-primary/20 text-center mb-4">
          <div class="text-sm text-muted-foreground mb-1">Total Geral do Evento</div>
          <div class="text-3xl md:text-4xl font-bold text-primary">{{ formatCurrency(result.total_geral) }}</div>
        </div>

        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="bg-secondary/10 rounded-xl p-4 text-center border-l-4 border-secondary">
            <div class="text-xl font-bold text-secondary">{{ result.pagantes }}</div>
            <div class="text-sm text-muted-foreground">Pagantes</div>
          </div>
          <div class="bg-secondary/10 rounded-xl p-4 text-center border-l-4 border-secondary">
            <div class="text-xl font-bold text-secondary">{{ result.parcelas }}x</div>
            <div class="text-sm text-muted-foreground">Parcelas</div>
          </div>
        </div>

        <div class="bg-gradient-hero rounded-xl p-6 text-center text-white">
          <div class="text-sm opacity-80 mb-1">Valor por Parcela/Pessoa</div>
          <div class="text-3xl md:text-4xl font-bold">{{ formatCurrency(result.valor_parcela) }}</div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="bg-card border border-border/50 rounded-xl shadow-card p-6">
        <div class="text-center py-12">
          <div class="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <i class="fa-solid fa-calculator text-3xl text-muted-foreground"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Aguardando Cálculo</h3>
          <p class="text-muted-foreground max-w-sm mx-auto">
            Preencha os dados do evento e clique em "Calcular Custos" para ver os resultados detalhados.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

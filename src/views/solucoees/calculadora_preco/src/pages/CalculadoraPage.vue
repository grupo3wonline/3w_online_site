<script setup lang="ts">
import { reactive, ref } from 'vue'
import Swal from 'sweetalert2'
import { Icon } from '@iconify/vue'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import CalculatorForm, { type CalculatorFields } from '@/components/calculator/CalculatorForm.vue'
import CalculatorResult from '@/components/calculator/CalculatorResult.vue'
import { calculatorSchema } from '@/components/calculator/schema'
import { calcularPreco, type CalculatorResult as Result } from '@/composables/useCalculator'
import { useCalculatorHistory } from '@/composables/useCalculatorHistory'
import { parseNumber, formatBRL } from '@/lib/utils'
import { useUiStore } from '@/stores/ui'
import { trackEvent } from '@/lib/analytics'

const ui = useUiStore()
const { history, add: addHistory, clear: clearHistory } = useCalculatorHistory()

const fields = reactive<CalculatorFields>({
  custoFixo: '',
  custoVariavel: '',
  margem: '',
  impostos: '',
})
const errors = reactive<Record<string, string>>({})
const result = ref<Result | null>(null)

function updateFields(value: CalculatorFields) {
  Object.assign(fields, value)
}

function validate() {
  Object.keys(errors).forEach((k) => delete errors[k])
  const parsed = calculatorSchema.safeParse({
    custoFixo: parseNumber(fields.custoFixo),
    custoVariavel: parseNumber(fields.custoVariavel),
    margem: parseNumber(fields.margem),
    impostos: parseNumber(fields.impostos),
  })
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as string
      if (key && !errors[key]) errors[key] = issue.message
    }
    return null
  }
  return parsed.data
}

async function onCalcular() {
  const data = validate()
  if (!data) {
    await Swal.fire({
      icon: 'warning',
      title: 'Atenção!',
      text: errors.custoFixo || 'Verifique os campos e tente novamente.',
      confirmButtonColor: '#7c3aed',
    })
    return
  }

  await ui.withLoading(async () => {
    // Pequeno atraso para exibir o overlay em cálculos instantâneos.
    await new Promise((r) => setTimeout(r, 350))
    result.value = calcularPreco(data)
  }, 'Calculando o melhor preço...')

  addHistory(data, result.value!)
  trackEvent('calcular_preco', { preco: result.value?.precoFinal })

  await Swal.fire({
    icon: 'success',
    title: 'Cálculo Realizado!',
    html: `<p class="text-lg mb-2">Preço sugerido:</p><p class="text-3xl font-bold" style="color:#7c3aed">${formatBRL(
      result.value!.precoFinal,
    )}</p>`,
    confirmButtonColor: '#7c3aed',
  })
}

function onLimpar() {
  fields.custoFixo = ''
  fields.custoVariavel = ''
  fields.margem = ''
  fields.impostos = ''
  Object.keys(errors).forEach((k) => delete errors[k])
  result.value = null
}

function restore(entry: (typeof history.value)[number]) {
  fields.custoFixo = String(entry.input.custoFixo)
  fields.custoVariavel = String(entry.input.custoVariavel)
  fields.margem = String(entry.input.margem)
  fields.impostos = String(entry.input.impostos)
  result.value = entry.result
}

const dicas = [
  'Revise seus custos regularmente para manter a precificação atualizada.',
  'Pesquise o mercado para verificar se o preço está competitivo.',
  'Considere o valor percebido pelo cliente, não apenas os custos.',
  'Margem muito baixa pode inviabilizar o negócio no longo prazo.',
]
</script>

<template>
  <div class="py-16">
    <div class="container">
      <div class="mx-auto mb-12 max-w-4xl space-y-4 text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-primary">
          <Icon icon="fa6-solid:calculator" class="h-4 w-4" />
          <span class="font-semibold">Ferramenta de Cálculo</span>
        </div>
        <h1 class="text-4xl font-black text-foreground md:text-6xl">Calculadora de Preços</h1>
        <p class="text-xl leading-relaxed text-muted-foreground">
          Preencha os campos abaixo para descobrir o preço ideal do seu produto ou serviço
        </p>
      </div>

      <div class="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
        <CalculatorForm
          :model-value="fields"
          :errors="errors"
          @update:model-value="updateFields"
          @calcular="onCalcular"
          @limpar="onLimpar"
        />

        <div class="space-y-6">
          <CalculatorResult v-if="result" :result="result" />

          <Card v-if="history.length" class="shadow-card">
            <CardHeader>
              <div class="flex items-center justify-between">
                <CardTitle class="flex items-center gap-2 text-xl">
                  <Icon icon="fa6-solid:clock-rotate-left" class="h-5 w-5 text-primary" />
                  Cálculos Recentes
                </CardTitle>
                <button
                  type="button"
                  class="text-sm text-muted-foreground transition-colors hover:text-destructive"
                  @click="clearHistory"
                >
                  Limpar
                </button>
              </div>
            </CardHeader>
            <CardContent class="space-y-2">
              <button
                v-for="entry in history"
                :key="entry.id"
                type="button"
                class="flex w-full items-center justify-between rounded-lg border border-border px-4 py-3 text-left transition-colors hover:bg-accent"
                @click="restore(entry)"
              >
                <span class="text-sm text-muted-foreground">
                  Custo {{ formatBRL(entry.result.custoTotal) }} · Margem {{ entry.input.margem }}%
                </span>
                <span class="font-bold text-primary">{{ formatBRL(entry.result.precoFinal) }}</span>
              </button>
            </CardContent>
          </Card>

          <Card class="shadow-card">
            <CardHeader>
              <CardTitle class="flex items-center gap-2 text-xl">
                <Icon icon="fa6-solid:lightbulb" class="h-5 w-5 text-amber-500" />
                Dicas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3 text-sm">
              <div v-for="dica in dicas" :key="dica" class="flex items-start gap-3">
                <Icon icon="fa6-solid:check" class="mt-1 h-4 w-4 flex-shrink-0 text-green-500" />
                <p class="text-muted-foreground">{{ dica }}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
</template>

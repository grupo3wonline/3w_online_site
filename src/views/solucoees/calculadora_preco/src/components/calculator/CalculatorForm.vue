<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { vMaska } from 'maska/vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

export interface CalculatorFields {
  custoFixo: string
  custoVariavel: string
  margem: string
  impostos: string
}

defineProps<{ modelValue: CalculatorFields; errors: Record<string, string> }>()
const emit = defineEmits<{
  'update:modelValue': [value: CalculatorFields]
  calcular: []
  limpar: []
}>()

// Máscaras Maska: moeda pt-BR (2 casas) para custos, número inteiro/decimal para percentuais.
const moneyMask = {
  number: { locale: 'pt-BR', fraction: 2, unsigned: true },
}
const percentMask = {
  number: { locale: 'pt-BR', fraction: 2, unsigned: true },
}

const fields = [
  {
    key: 'custoFixo' as const,
    label: 'Custo Fixo (R$)',
    placeholder: '0,00',
    prefix: 'R$',
    mask: moneyMask,
    help: 'Custos que não variam com vendas: aluguel, salários, contas fixas.',
  },
  {
    key: 'custoVariavel' as const,
    label: 'Custo Variável (R$)',
    placeholder: '0,00',
    prefix: 'R$',
    mask: moneyMask,
    help: 'Custos que variam: matéria-prima, comissões, embalagens.',
  },
  {
    key: 'margem' as const,
    label: 'Margem de Lucro (%)',
    placeholder: '0',
    prefix: '%',
    mask: percentMask,
    help: 'Percentual de lucro desejado. Recomendado: 20% a 40%.',
  },
  {
    key: 'impostos' as const,
    label: 'Impostos (%)',
    placeholder: '0',
    prefix: '%',
    mask: percentMask,
    help: 'Percentual de impostos sobre vendas (consulte seu contador).',
  },
]

function onInput(key: keyof CalculatorFields, value: string, current: CalculatorFields) {
  emit('update:modelValue', { ...current, [key]: value })
}
</script>

<template>
  <Card class="border-2 border-violet-200 shadow-elegant dark:border-violet-800">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Icon icon="fa6-solid:pen-to-square" class="h-5 w-5 text-primary" />
        Dados do Cálculo
      </CardTitle>
      <CardDescription
        >Insira os valores com atenção para obter resultados precisos</CardDescription
      >
    </CardHeader>
    <CardContent class="space-y-6">
      <form autocomplete="off" novalidate @submit.prevent="emit('calcular')">
        <div v-for="field in fields" :key="field.key" class="space-y-2">
          <div class="flex items-center justify-between">
            <Label :for="field.key" class="text-base font-semibold">{{ field.label }}</Label>
            <TooltipProvider :delay-duration="150">
              <Tooltip>
                <TooltipTrigger as="button" type="button" :aria-label="`Ajuda: ${field.label}`">
                  <Icon icon="fa6-solid:circle-question" class="h-4 w-4 text-primary" />
                </TooltipTrigger>
                <TooltipContent side="left">{{ field.help }}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div class="relative">
            <span
              class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground"
            >
              {{ field.prefix }}
            </span>
            <input
              :id="field.key"
              v-maska="field.mask"
              :value="modelValue[field.key]"
              type="text"
              inputmode="decimal"
              autocomplete="off"
              :placeholder="field.placeholder"
              :aria-invalid="!!errors[field.key]"
              class="flex h-12 w-full rounded-lg border bg-background py-2 pl-10 pr-3 text-lg ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              :class="errors[field.key] ? 'border-destructive' : 'border-input'"
              @input="onInput(field.key, ($event.target as HTMLInputElement).value, modelValue)"
            />
          </div>
          <p v-if="errors[field.key]" class="flex items-center gap-1 text-sm text-destructive">
            <Icon icon="fa6-solid:circle-exclamation" class="h-3.5 w-3.5" />
            {{ errors[field.key] }}
          </p>
        </div>

        <div class="flex gap-4 pt-6">
          <Button type="submit" size="lg" class="flex-1">
            <Icon icon="fa6-solid:calculator" class="h-5 w-5" />
            Calcular Preço
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            aria-label="Limpar formulário"
            @click="emit('limpar')"
          >
            <Icon icon="fa6-solid:eraser" class="h-5 w-5" />
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>

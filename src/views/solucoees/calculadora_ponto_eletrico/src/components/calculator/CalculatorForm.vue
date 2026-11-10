<script setup lang="ts">
import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useI18n } from 'vue-i18n'
import { Icon, Button, Tooltip, Card } from '@/components/ui'
import ResultChart from './ResultChart.vue'
import { calculatorSchema } from '@/schemas/calculator.schema'
import { useCalculator } from '@/composables/useCalculator'
import { useLoading } from '@/composables/useLoading'
import { useToast } from '@/composables/useToast'
import { useCalculatorStore } from '@/stores/calculator'
import { ROOM_TYPE_LABELS, ELECTRICAL_CONSTANTS } from '@/utils/constants'
import {
  formatArea,
  formatVolume,
  formatLength,
  formatPower,
  formatNumber,
} from '@/utils/formatters'
import type { CalculationResult, RoomType } from '@/types/calculator'

const { t } = useI18n()
const { performCalculation } = useCalculator()
const { withLoading } = useLoading()
const toast = useToast()
const store = useCalculatorStore()

const result = ref<CalculationResult | null>(null)

const roomTypes = Object.entries(ROOM_TYPE_LABELS) as [RoomType, string][]

const { defineField, handleSubmit, errors, resetForm, meta } = useForm({
  validationSchema: toTypedSchema(calculatorSchema),
  initialValues: {
    roomType: 'LIVING' as RoomType,
    width: undefined as unknown as number,
    length: undefined as unknown as number,
    ceilingHeight: ELECTRICAL_CONSTANTS.DEFAULT_CEILING_HEIGHT,
  },
})

const [roomType] = defineField('roomType')
const [width] = defineField('width')
const [length] = defineField('length')
const [ceilingHeight] = defineField('ceilingHeight')

const liveArea = computed(() => {
  if (width.value && length.value) return width.value * length.value
  return null
})

const onSubmit = handleSubmit(async (values) => {
  try {
    const res = await withLoading(
      () => performCalculation(values.width, values.length, values.ceilingHeight, values.roomType),
      t('loading.calculating'),
    )
    result.value = res
    store.saveCalculation(res)
    toast.success('Cálculo concluído com sucesso.')
  } catch {
    toast.error('Não foi possível concluir o cálculo.')
  }
})

const onReset = (): void => {
  result.value = null
  resetForm()
}

const resultItems = computed(() => {
  if (!result.value) return []
  const c = result.value.calculated
  return [
    {
      icon: 'lucide:plug-zap',
      label: t('calculator.results.points'),
      value: String(c.points),
      highlight: true,
    },
    {
      icon: 'lucide:cable',
      label: t('calculator.results.cableLength'),
      value: formatLength(c.cableLength),
      highlight: true,
    },
    {
      icon: 'lucide:gauge',
      label: t('calculator.results.totalPower'),
      value: formatPower(c.totalPower),
    },
    {
      icon: 'lucide:activity',
      label: t('calculator.results.current'),
      value: `${formatNumber(c.current, 1)} A`,
    },
    {
      icon: 'lucide:shield-check',
      label: t('calculator.results.circuitBreaker'),
      value: `${c.circuitBreaker} A`,
    },
    {
      icon: 'lucide:cable',
      label: t('calculator.results.cableGauge'),
      value: `${formatNumber(c.cableGauge, 1)} mm²`,
    },
    { icon: 'lucide:ruler', label: t('calculator.results.area'), value: formatArea(c.area) },
    { icon: 'lucide:box', label: t('calculator.results.volume'), value: formatVolume(c.volume) },
  ]
})
</script>

<template>
  <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
    <!-- Formulário -->
    <Card class="p-6 sm:p-8">
      <h2 class="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
        <Icon icon="lucide:calculator" class="h-6 w-6 text-primary" />
        {{ t('calculator.formTitle') }}
      </h2>

      <form autocomplete="off" novalidate class="space-y-5" @submit="onSubmit">
        <!-- Tipo de ambiente -->
        <div>
          <label
            for="roomType"
            class="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground"
          >
            {{ t('calculator.fields.roomType') }}
            <Tooltip :content="t('calculator.help.roomType')">
              <span class="text-muted-foreground"
                ><Icon icon="lucide:circle-help" class="h-4 w-4"
              /></span>
            </Tooltip>
          </label>
          <select
            id="roomType"
            v-model="roomType"
            autocomplete="off"
            class="flex h-11 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option v-for="[value, label] in roomTypes" :key="value" :value="value">
              {{ label }}
            </option>
          </select>
        </div>

        <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <!-- Largura -->
          <div>
            <label
              for="width"
              class="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground"
            >
              {{ t('calculator.fields.width') }}
              <Tooltip :content="t('calculator.help.width')">
                <span class="text-muted-foreground"
                  ><Icon icon="lucide:circle-help" class="h-4 w-4"
                /></span>
              </Tooltip>
            </label>
            <input
              id="width"
              v-model.number="width"
              type="number"
              inputmode="decimal"
              step="0.1"
              min="0.1"
              autocomplete="off"
              :placeholder="t('calculator.placeholders.width')"
              class="flex h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              :class="errors.width ? 'border-destructive' : 'border-input'"
            />
            <p v-if="errors.width" class="mt-1 text-xs text-destructive">{{ errors.width }}</p>
          </div>

          <!-- Comprimento -->
          <div>
            <label
              for="length"
              class="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground"
            >
              {{ t('calculator.fields.length') }}
              <Tooltip :content="t('calculator.help.length')">
                <span class="text-muted-foreground"
                  ><Icon icon="lucide:circle-help" class="h-4 w-4"
                /></span>
              </Tooltip>
            </label>
            <input
              id="length"
              v-model.number="length"
              type="number"
              inputmode="decimal"
              step="0.1"
              min="0.1"
              autocomplete="off"
              :placeholder="t('calculator.placeholders.length')"
              class="flex h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              :class="errors.length ? 'border-destructive' : 'border-input'"
            />
            <p v-if="errors.length" class="mt-1 text-xs text-destructive">{{ errors.length }}</p>
          </div>
        </div>

        <!-- Pé-direito -->
        <div>
          <label
            for="ceilingHeight"
            class="mb-1.5 flex items-center gap-2 text-sm font-medium text-foreground"
          >
            {{ t('calculator.fields.ceilingHeight') }}
            <Tooltip :content="t('calculator.help.ceilingHeight')">
              <span class="text-muted-foreground"
                ><Icon icon="lucide:circle-help" class="h-4 w-4"
              /></span>
            </Tooltip>
          </label>
          <input
            id="ceilingHeight"
            v-model.number="ceilingHeight"
            type="number"
            inputmode="decimal"
            step="0.1"
            min="2"
            max="5"
            autocomplete="off"
            :placeholder="t('calculator.placeholders.ceilingHeight')"
            class="flex h-11 w-full rounded-lg border bg-background px-3 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            :class="errors.ceilingHeight ? 'border-destructive' : 'border-input'"
          />
          <p v-if="errors.ceilingHeight" class="mt-1 text-xs text-destructive">
            {{ errors.ceilingHeight }}
          </p>
        </div>

        <!-- Área ao vivo -->
        <div
          v-if="liveArea"
          class="flex items-center gap-2 rounded-lg bg-muted p-3 text-sm text-muted-foreground"
        >
          <Icon icon="lucide:ruler" class="h-4 w-4" />
          {{ t('calculator.liveArea') }}:
          <strong class="text-foreground">{{ formatArea(liveArea) }}</strong>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" size="lg" class="flex-1" :disabled="!meta.valid && meta.dirty">
            <Icon icon="lucide:calculator" class="h-5 w-5" />
            {{ t('actions.calculate') }}
          </Button>
          <Button type="button" variant="outline" size="lg" @click="onReset">
            <Icon icon="lucide:rotate-ccw" class="h-5 w-5" />
            {{ t('actions.clear') }}
          </Button>
        </div>
      </form>

      <div
        class="mt-6 flex items-start gap-3 rounded-lg border border-electric-500/30 bg-electric-50 p-4 text-sm dark:bg-electric-500/10"
      >
        <Icon icon="lucide:lightbulb" class="mt-0.5 h-5 w-5 flex-shrink-0 text-electric-600" />
        <div>
          <p class="font-semibold text-foreground">{{ t('calculator.tipTitle') }}</p>
          <p class="text-muted-foreground">{{ t('calculator.tip') }}</p>
        </div>
      </div>
    </Card>

    <!-- Resultados -->
    <div class="space-y-6">
      <Card class="p-6 sm:p-8">
        <h2 class="mb-6 flex items-center gap-2 text-xl font-bold text-foreground">
          <Icon icon="lucide:circle-check" class="h-6 w-6 text-green-500" />
          {{ t('calculator.resultsTitle') }}
        </h2>

        <div
          v-if="!result"
          class="flex flex-col items-center gap-3 py-10 text-center text-muted-foreground"
        >
          <Icon icon="lucide:calculator" class="h-10 w-10" />
          <p>{{ t('calculator.emptyResults') }}</p>
        </div>

        <div v-else class="space-y-6">
          <div class="grid grid-cols-2 gap-3">
            <div
              v-for="item in resultItems"
              :key="item.label"
              class="rounded-lg border border-border p-3 text-center"
              :class="item.highlight ? 'bg-primary/5' : 'bg-muted/40'"
            >
              <Icon :icon="item.icon" class="mx-auto mb-1 h-5 w-5 text-primary" />
              <div class="text-lg font-bold text-foreground">{{ item.value }}</div>
              <div class="text-xs text-muted-foreground">{{ item.label }}</div>
            </div>
          </div>

          <div>
            <h3 class="mb-2 text-sm font-semibold text-foreground">
              {{ t('calculator.results.chartTitle') }}
            </h3>
            <ResultChart :calculated="result.calculated" />
          </div>
        </div>
      </Card>

      <div
        class="flex items-start gap-3 rounded-lg border border-border bg-muted/40 p-4 text-xs text-muted-foreground"
      >
        <Icon icon="lucide:triangle-alert" class="mt-0.5 h-4 w-4 flex-shrink-0 text-electric-600" />
        <p>{{ t('calculator.disclaimer') }}</p>
      </div>
    </div>
  </div>
</template>

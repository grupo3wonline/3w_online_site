<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useClipboard } from '@vueuse/core'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatBRL } from '@/lib/utils'
import type { CalculatorResult } from '@/composables/useCalculator'
import PriceChart from './PriceChart.vue'

const props = defineProps<{ result: CalculatorResult }>()

const { copy, isSupported } = useClipboard()
const copied = ref(false)

async function copyResult() {
  const text = [
    'Calculadora de Preços — Grupo 3w Online',
    `Preço Sugerido: ${formatBRL(props.result.precoFinal)}`,
    `Custo Total: ${formatBRL(props.result.custoTotal)}`,
    `Lucro Estimado: ${formatBRL(props.result.lucroEstimado)}`,
    `Impostos: ${formatBRL(props.result.valorImpostos)}`,
  ].join('\n')
  await copy(text)
  copied.value = true
  setTimeout(() => (copied.value = false), 2000)
}
</script>

<template>
  <Card
    class="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-elegant dark:border-green-800 dark:from-green-950 dark:to-emerald-950"
  >
    <CardHeader>
      <div class="flex items-center justify-between">
        <CardTitle class="flex items-center gap-2 text-green-700 dark:text-green-400">
          <Icon icon="fa6-solid:circle-check" class="h-6 w-6" />
          Resultado
        </CardTitle>
        <Button
          v-if="isSupported"
          variant="outline"
          size="sm"
          :aria-label="copied ? 'Copiado' : 'Copiar resultado'"
          @click="copyResult"
        >
          <Icon :icon="copied ? 'fa6-solid:check' : 'fa6-solid:copy'" class="h-4 w-4" />
          {{ copied ? 'Copiado!' : 'Copiar' }}
        </Button>
      </div>
    </CardHeader>
    <CardContent class="space-y-6">
      <div class="text-center">
        <p class="mb-2 text-sm text-muted-foreground">Preço Sugerido</p>
        <p class="text-4xl font-black text-green-600 dark:text-green-400 md:text-5xl">
          {{ formatBRL(result.precoFinal) }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="rounded-xl bg-white/60 p-4 dark:bg-slate-800/60">
          <p class="mb-1 text-xs text-muted-foreground">Custo Total</p>
          <p class="text-xl font-bold text-foreground">{{ formatBRL(result.custoTotal) }}</p>
        </div>
        <div class="rounded-xl bg-white/60 p-4 dark:bg-slate-800/60">
          <p class="mb-1 text-xs text-muted-foreground">Lucro Estimado</p>
          <p class="text-xl font-bold text-foreground">{{ formatBRL(result.lucroEstimado) }}</p>
        </div>
      </div>

      <div class="rounded-xl bg-white/60 p-4 dark:bg-slate-800/60">
        <p class="mb-3 text-center text-sm font-semibold text-foreground">Composição do Preço</p>
        <PriceChart
          :custo-total="result.custoTotal"
          :lucro-estimado="result.lucroEstimado"
          :valor-impostos="result.valorImpostos"
        />
      </div>
    </CardContent>
  </Card>
</template>

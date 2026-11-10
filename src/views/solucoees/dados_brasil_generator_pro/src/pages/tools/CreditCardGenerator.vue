<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import ResultList from '@/components/tools/ResultList.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generateCreditCard } from '@/lib/brazil-generators'
import { useUiStore } from '@/stores/ui'
import { sleep } from '@/lib/utils'

const ui = useUiStore()
const brand = ref<'visa' | 'mastercard' | 'amex' | 'elo'>('visa')
const formatted = ref(true)
const quantity = ref(1)
const results = ref<string[]>([])

const brands = [
  { id: 'visa', label: 'Visa', icon: 'lucide:credit-card' },
  { id: 'mastercard', label: 'Mastercard', icon: 'lucide:credit-card' },
  { id: 'amex', label: 'Amex', icon: 'lucide:credit-card' },
  { id: 'elo', label: 'Elo', icon: 'lucide:credit-card' },
] as const

async function run() {
  const qty = Math.min(Math.max(1, quantity.value), 50)
  quantity.value = qty
  await ui.withLoading(async () => {
    await sleep(180)
    results.value = Array.from({ length: qty }, () => generateCreditCard(formatted.value, brand.value))
  }, 'Gerando...')
}
</script>

<template>
  <ToolPageLayout
    slug="gerador-cartao-credito"
    tip="Números válidos pelo algoritmo Luhn, apenas para testes de integração de pagamento. Não são cartões reais."
  >
    <div class="rounded-2xl border border-border bg-card p-6">
      <div class="space-y-5">
        <div>
          <p class="mb-2 font-medium">Bandeira</p>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <button
              v-for="b in brands"
              :key="b.id"
              type="button"
              class="flex items-center justify-center gap-1.5 rounded-xl border p-3 text-sm font-semibold transition-colors"
              :class="brand === b.id ? 'border-primary bg-primary/10 text-primary' : 'border-border'"
              @click="brand = b.id"
            >
              <Icon :icon="b.icon" class="h-4 w-4" /> {{ b.label }}
            </button>
          </div>
        </div>

        <label class="flex cursor-pointer items-center justify-between rounded-xl bg-secondary/60 p-4">
          <span class="font-medium">Com espaços (0000 0000 0000 0000)</span>
          <input v-model="formatted" type="checkbox" class="h-5 w-5 accent-primary" />
        </label>

        <div class="flex items-center justify-between gap-4">
          <label class="font-medium" for="cc-qty">Quantidade</label>
          <input
            id="cc-qty"
            v-model.number="quantity"
            type="number"
            min="1"
            max="50"
            autocomplete="off"
            class="h-11 w-24 rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <BaseButton block size="lg" @click="run">
          <Icon icon="lucide:refresh-cw" class="h-5 w-5" /> Gerar cartão
        </BaseButton>
      </div>
    </div>

    <ResultList :items="results" />
  </ToolPageLayout>
</template>

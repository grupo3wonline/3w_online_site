<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import ResultList from '@/components/tools/ResultList.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generatePlate } from '@/lib/brazil-generators'
import { useUiStore } from '@/stores/ui'
import { sleep } from '@/lib/utils'

const ui = useUiStore()
const mercosul = ref(true)
const quantity = ref(1)
const results = ref<string[]>([])

async function run() {
  const qty = Math.min(Math.max(1, quantity.value), 50)
  quantity.value = qty
  await ui.withLoading(async () => {
    await sleep(180)
    results.value = Array.from({ length: qty }, () => generatePlate(mercosul.value))
  }, 'Gerando...')
}
</script>

<template>
  <ToolPageLayout slug="gerador-placa-veiculo" tip="Padrão Mercosul: AAA1A11. Padrão antigo: AAA-1234.">
    <div class="rounded-2xl border border-border bg-card p-6">
      <div class="space-y-5">
        <div class="grid grid-cols-2 gap-3">
          <button
            type="button"
            class="rounded-xl border p-4 text-center font-semibold transition-colors"
            :class="mercosul ? 'border-primary bg-primary/10 text-primary' : 'border-border'"
            @click="mercosul = true"
          >
            Mercosul
          </button>
          <button
            type="button"
            class="rounded-xl border p-4 text-center font-semibold transition-colors"
            :class="!mercosul ? 'border-primary bg-primary/10 text-primary' : 'border-border'"
            @click="mercosul = false"
          >
            Antiga
          </button>
        </div>

        <div class="flex items-center justify-between gap-4">
          <label class="font-medium" for="plate-qty">Quantidade</label>
          <input
            id="plate-qty"
            v-model.number="quantity"
            type="number"
            min="1"
            max="50"
            autocomplete="off"
            class="h-11 w-24 rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <BaseButton block size="lg" @click="run">
          <Icon icon="lucide:refresh-cw" class="h-5 w-5" /> Gerar placa
        </BaseButton>
      </div>
    </div>

    <ResultList :items="results" />
  </ToolPageLayout>
</template>

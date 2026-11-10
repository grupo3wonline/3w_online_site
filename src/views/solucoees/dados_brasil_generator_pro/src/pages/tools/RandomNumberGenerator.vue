<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import ResultList from '@/components/tools/ResultList.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { drawNumbers } from '@/lib/dev-tools'

const min = ref(1)
const max = ref(100)
const count = ref(6)
const unique = ref(true)
const results = ref<string[]>([])

function run() {
  const nums = drawNumbers(min.value, max.value, Math.max(1, count.value), unique.value)
  results.value = nums.map(String)
}
</script>

<template>
  <ToolPageLayout
    slug="sorteador-numeros"
    tip="Ative 'números únicos' para sorteios sem repetição (rifas, bingos). Desative para permitir repetição."
  >
    <div class="space-y-5 rounded-2xl border border-border bg-card p-6">
      <div class="grid grid-cols-3 gap-3">
        <div>
          <label class="mb-1 block text-sm font-medium" for="rn-min">Mínimo</label>
          <input id="rn-min" v-model.number="min" type="number" autocomplete="off" class="h-11 w-full rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium" for="rn-max">Máximo</label>
          <input id="rn-max" v-model.number="max" type="number" autocomplete="off" class="h-11 w-full rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary" />
        </div>
        <div>
          <label class="mb-1 block text-sm font-medium" for="rn-count">Qtd.</label>
          <input id="rn-count" v-model.number="count" type="number" min="1" autocomplete="off" class="h-11 w-full rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary" />
        </div>
      </div>

      <label class="flex cursor-pointer items-center justify-between rounded-xl bg-secondary/60 p-3">
        <span class="text-sm font-medium">Números únicos (sem repetição)</span>
        <input v-model="unique" type="checkbox" class="h-5 w-5 accent-primary" />
      </label>

      <BaseButton block size="lg" @click="run">
        <Icon icon="lucide:dices" class="h-5 w-5" /> Sortear
      </BaseButton>
    </div>

    <ResultList :items="results" />
  </ToolPageLayout>
</template>

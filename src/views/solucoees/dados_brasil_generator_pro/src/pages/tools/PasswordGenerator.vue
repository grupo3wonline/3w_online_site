<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import ResultList from '@/components/tools/ResultList.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generatePassword } from '@/lib/dev-tools'

const length = ref(16)
const upper = ref(true)
const lower = ref(true)
const numbers = ref(true)
const symbols = ref(true)
const quantity = ref(1)
const results = ref<string[]>([])

function run() {
  const qty = Math.min(Math.max(1, quantity.value), 20)
  quantity.value = qty
  const len = Math.min(Math.max(4, length.value), 64)
  length.value = len
  results.value = Array.from({ length: qty }, () =>
    generatePassword({ length: len, upper: upper.value, lower: lower.value, numbers: numbers.value, symbols: symbols.value }),
  )
}

const options = [
  { key: upper, label: 'Maiúsculas (A-Z)' },
  { key: lower, label: 'Minúsculas (a-z)' },
  { key: numbers, label: 'Números (0-9)' },
  { key: symbols, label: 'Símbolos (!@#$)' },
]
</script>

<template>
  <ToolPageLayout
    slug="gerador-senhas"
    tip="Senhas geradas com crypto (aleatoriedade forte). Nada é enviado à internet — tudo acontece no seu navegador."
  >
    <div class="space-y-5 rounded-2xl border border-border bg-card p-6">
      <div>
        <div class="mb-2 flex items-center justify-between">
          <label class="font-medium" for="pw-len">Tamanho</label>
          <span class="font-mono text-primary">{{ length }}</span>
        </div>
        <input id="pw-len" v-model.number="length" type="range" min="4" max="64" class="w-full accent-primary" />
      </div>

      <div class="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <label
          v-for="(opt, i) in options"
          :key="i"
          class="flex cursor-pointer items-center justify-between rounded-xl bg-secondary/60 p-3"
        >
          <span class="text-sm font-medium">{{ opt.label }}</span>
          <input v-model="opt.key.value" type="checkbox" class="h-5 w-5 accent-primary" />
        </label>
      </div>

      <div class="flex items-center justify-between gap-4">
        <label class="font-medium" for="pw-qty">Quantidade</label>
        <input
          id="pw-qty"
          v-model.number="quantity"
          type="number"
          min="1"
          max="20"
          autocomplete="off"
          class="h-11 w-24 rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      <BaseButton block size="lg" @click="run">
        <Icon icon="lucide:key-round" class="h-5 w-5" /> Gerar senha
      </BaseButton>
    </div>

    <ResultList :items="results" />
  </ToolPageLayout>
</template>

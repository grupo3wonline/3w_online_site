<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from './ToolPageLayout.vue'
import ResultList from './ResultList.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import HelpTip from '@/components/ui/HelpTip.vue'
import { useUiStore } from '@/stores/ui'
import { sleep } from '@/lib/utils'

/**
 * Gerador genérico configurável por props.
 * Cobre o padrão: [opção de formatação] + quantidade + gerar → lista → copiar.
 */
const props = withDefaults(
  defineProps<{
    slug: string
    /** função que gera um item; recebe o estado de formatação */
    generate: (formatted: boolean) => string
    tip?: string
    example?: string
    /** exibe checkbox "com pontuação" */
    formatOption?: boolean
    formatLabel?: string
    maxQuantity?: number
  }>(),
  {
    formatOption: false,
    formatLabel: 'Com pontuação',
    maxQuantity: 50,
  },
)

const ui = useUiStore()
const quantity = ref(1)
const formatted = ref(true)
const results = ref<string[]>([])

async function run() {
  const qty = Math.min(Math.max(1, quantity.value), props.maxQuantity)
  quantity.value = qty
  await ui.withLoading(async () => {
    await sleep(180)
    results.value = Array.from({ length: qty }, () => props.generate(formatted.value))
  }, 'Gerando...')
}
</script>

<template>
  <ToolPageLayout :slug="slug" :tip="tip">
    <div class="rounded-2xl border border-border bg-card p-6">
      <div class="space-y-5">
        <!-- Opção de formatação -->
        <label
          v-if="formatOption"
          class="flex cursor-pointer items-center justify-between rounded-xl bg-secondary/60 p-4"
        >
          <span class="flex items-center gap-2 font-medium">
            {{ formatLabel }}
            <HelpTip text="Adiciona a pontuação/máscara padrão ao valor gerado." />
          </span>
          <input v-model="formatted" type="checkbox" class="h-5 w-5 accent-primary" />
        </label>

        <!-- Quantidade -->
        <div class="flex items-center justify-between gap-4">
          <label class="flex items-center gap-2 font-medium" :for="`${slug}-qty`">
            Quantidade
            <HelpTip text="Quantos valores gerar de uma vez." />
          </label>
          <input
            :id="`${slug}-qty`"
            v-model.number="quantity"
            type="number"
            min="1"
            :max="maxQuantity"
            autocomplete="off"
            class="h-11 w-24 rounded-lg border border-border bg-background px-3 text-center outline-none focus:border-primary focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        <BaseButton block size="lg" @click="run">
          <Icon icon="lucide:refresh-cw" class="h-5 w-5" /> Gerar
        </BaseButton>
      </div>
    </div>

    <p v-if="example" class="text-center text-sm text-muted-foreground">
      <strong>Exemplo:</strong> <span class="font-mono">{{ example }}</span>
    </p>

    <ResultList :items="results" />
  </ToolPageLayout>
</template>

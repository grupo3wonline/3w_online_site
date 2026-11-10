<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import DataCardResult from '@/components/tools/DataCardResult.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generateVehicle } from '@/lib/brazil-generators'
import { useUiStore } from '@/stores/ui'
import { sleep } from '@/lib/utils'

const ui = useUiStore()
const fields = ref<{ label: string; value: string }[]>([])

async function run() {
  await ui.withLoading(async () => {
    await sleep(200)
    const v = generateVehicle()
    fields.value = [
      { label: 'Marca', value: v.brand },
      { label: 'Modelo', value: v.model },
      { label: 'Ano', value: String(v.year) },
      { label: 'Cor', value: v.color },
      { label: 'Placa', value: v.plate },
      { label: 'RENAVAM', value: v.renavam },
    ]
  }, 'Gerando veículo...')
}
</script>

<template>
  <ToolPageLayout slug="gerador-veiculos" tip="Veículo fictício com marca, modelo, placa e RENAVAM coerentes.">
    <div class="rounded-2xl border border-border bg-card p-6">
      <BaseButton block size="lg" @click="run">
        <Icon icon="lucide:car" class="h-5 w-5" /> Gerar veículo
      </BaseButton>
    </div>
    <DataCardResult :fields="fields" />
  </ToolPageLayout>
</template>

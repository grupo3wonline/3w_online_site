<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import DataCardResult from '@/components/tools/DataCardResult.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generateBankAccount } from '@/lib/brazil-generators'
import { useUiStore } from '@/stores/ui'
import { sleep } from '@/lib/utils'

const ui = useUiStore()
const fields = ref<{ label: string; value: string }[]>([])

async function run() {
  await ui.withLoading(async () => {
    await sleep(200)
    const b = generateBankAccount()
    fields.value = [
      { label: 'Banco', value: `${b.bankCode} - ${b.bankName}` },
      { label: 'Agência', value: b.agency },
      { label: 'Conta', value: b.account },
    ]
  }, 'Gerando conta...')
}
</script>

<template>
  <ToolPageLayout slug="gerador-conta-bancaria" tip="Agência e conta fictícias de bancos brasileiros conhecidos.">
    <div class="rounded-2xl border border-border bg-card p-6">
      <BaseButton block size="lg" @click="run">
        <Icon icon="lucide:wallet" class="h-5 w-5" /> Gerar conta bancária
      </BaseButton>
    </div>
    <DataCardResult :fields="fields" />
  </ToolPageLayout>
</template>

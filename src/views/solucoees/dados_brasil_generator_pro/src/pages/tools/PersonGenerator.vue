<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import DataCardResult from '@/components/tools/DataCardResult.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generateName, generateEmail, generateCPF, generateAddress } from '@/lib/brazil-generators'
import { useUiStore } from '@/stores/ui'
import { sleep } from '@/lib/utils'

const ui = useUiStore()
const fields = ref<{ label: string; value: string }[]>([])

async function run() {
  await ui.withLoading(async () => {
    await sleep(200)
    const name = generateName()
    const addr = generateAddress()
    fields.value = [
      { label: 'Nome completo', value: name },
      { label: 'CPF', value: generateCPF() },
      { label: 'E-mail', value: generateEmail(name) },
      { label: 'CEP', value: addr.cep },
      { label: 'Endereço', value: `${addr.street}, ${addr.number} - ${addr.neighborhood}` },
      { label: 'Cidade/UF', value: `${addr.city} - ${addr.uf}` },
    ]
  }, 'Gerando perfil...')
}
</script>

<template>
  <ToolPageLayout
    slug="gerador-pessoas"
    tip="Gera um perfil fictício completo. Útil para popular bancos de dados de teste e formulários."
  >
    <div class="rounded-2xl border border-border bg-card p-6">
      <BaseButton block size="lg" @click="run">
        <Icon icon="lucide:user-round-plus" class="h-5 w-5" /> Gerar pessoa
      </BaseButton>
    </div>
    <DataCardResult :fields="fields" />
  </ToolPageLayout>
</template>

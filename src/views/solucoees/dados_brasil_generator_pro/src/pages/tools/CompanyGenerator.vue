<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import ToolPageLayout from '@/components/tools/ToolPageLayout.vue'
import DataCardResult from '@/components/tools/DataCardResult.vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { generateCompany } from '@/lib/brazil-generators'
import { useUiStore } from '@/stores/ui'
import { sleep } from '@/lib/utils'

const ui = useUiStore()
const fields = ref<{ label: string; value: string }[]>([])

async function run() {
  await ui.withLoading(async () => {
    await sleep(200)
    const c = generateCompany()
    fields.value = [
      { label: 'Razão social', value: c.name },
      { label: 'CNPJ', value: c.cnpj },
      { label: 'Inscrição Estadual', value: c.ie },
      { label: 'Abertura', value: c.openingDate },
      { label: 'E-mail', value: c.email },
      { label: 'Telefone', value: c.phone },
      { label: 'Endereço', value: c.address },
      { label: 'Cidade', value: c.city },
      { label: 'CEP', value: c.cep },
    ]
  }, 'Gerando empresa...')
}
</script>

<template>
  <ToolPageLayout slug="gerador-empresas" tip="Perfil corporativo fictício completo para testes de cadastros B2B.">
    <div class="rounded-2xl border border-border bg-card p-6">
      <BaseButton block size="lg" @click="run">
        <Icon icon="lucide:building-2" class="h-5 w-5" /> Gerar empresa
      </BaseButton>
    </div>
    <DataCardResult :fields="fields" />
  </ToolPageLayout>
</template>

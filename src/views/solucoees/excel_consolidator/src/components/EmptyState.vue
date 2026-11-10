<script setup lang="ts">
  import { Icon } from '@iconify/vue'

  const steps = [
    {
      title: 'Carregue os Arquivos',
      description:
        'Arraste múltiplos arquivos Excel (.xlsx, .xls) ou CSV para a zona de upload acima.',
      icon: 'mdi:cloud-upload-outline',
    },
    {
      title: 'Unificação Automática',
      description:
        'As colunas com o mesmo nome são combinadas automaticamente em uma tabela única.',
      icon: 'mdi:table-merge-cells',
    },
    {
      title: 'Exportação em 1-Clique',
      description:
        'Baixe o resultado unificado completo em um novo arquivo Excel pronto para uso.',
      icon: 'mdi:download-circle-outline',
    },
  ]
</script>

<template>
  <div class="glass-card mx-auto max-w-2xl space-y-4 rounded-2xl p-6 text-center sm:p-8">
    <Icon icon="mdi:information-outline" class="mx-auto h-8 w-8 text-emerald-400" />
    <h3 class="text-base font-bold text-white">Como funciona a consolidação?</h3>
    <p class="text-xs text-slate-400">
      Esta ferramenta unifica múltiplas planilhas em uma tabela única. Todo o processamento é
      feito localmente no seu navegador — nenhum dado é enviado para servidores externos.
    </p>

    <div class="grid grid-cols-1 gap-4 pt-2 text-left text-xs sm:grid-cols-3">
      <div
        v-for="(step, index) in steps"
        :key="index"
        v-motion
        :initial="{ opacity: 0, y: 15 }"
        :visible-once="{ opacity: 1, y: 0, transition: { delay: (index + 1) * 100 } }"
        class="rounded-xl border border-slate-800/80 bg-slate-900/60 p-4"
      >
        <div class="mb-2 flex items-center gap-2">
          <Icon :icon="step.icon" class="h-4 w-4 text-emerald-400" />
          <span class="font-bold text-emerald-400">{{ step.title }}</span>
        </div>
        <p class="text-slate-400">{{ step.description }}</p>
      </div>
    </div>

    <div
      class="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3 text-xs text-emerald-300/80"
    >
      <Icon icon="mdi:lightbulb-outline" class="mb-0.5 inline h-3.5 w-3.5" />
      <strong>Dica:</strong> Clique no botão "Carregar Exemplo" no cabeçalho para experimentar
      com dados de demonstração.
    </div>
  </div>
</template>

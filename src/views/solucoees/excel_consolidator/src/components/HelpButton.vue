<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { useAlert } from '@/composables/useAlert'

  const alert = useAlert()

  function showHelp() {
    alert.info(
      'Como usar o Consolidador Excel',
      `
      <div style="text-align: left; font-size: 13px; line-height: 1.9; color: #94a3b8;">
        <p><strong style="color: #10b981;">1. Carregue os Arquivos</strong><br/>
        Arraste e solte múltiplos arquivos Excel (.xlsx, .xls) ou CSV na zona de upload, ou clique para selecionar.</p>
        <br/>
        <p><strong style="color: #10b981;">2. Unificação Automática</strong><br/>
        O sistema combina automaticamente todas as linhas e abas em uma única tabela. Colunas com o mesmo nome são alinhadas.</p>
        <br/>
        <p><strong style="color: #10b981;">3. Pesquise e Ordene</strong><br/>
        Use a barra de busca inteligente para filtrar dados e clique nos cabeçalhos da tabela para ordenar.</p>
        <br/>
        <p><strong style="color: #10b981;">4. Exporte o Resultado</strong><br/>
        Baixe o resultado consolidado como Excel (.xlsx) ou CSV (.csv) com um único clique.</p>
        <br/>
        <p style="padding: 8px 12px; background: rgba(16,185,129,0.1); border-radius: 8px; border: 1px solid rgba(16,185,129,0.2);">
          💡 <strong style="color: #fff;">Dica:</strong> Todo o processamento é feito localmente no seu navegador. Nenhum dado é enviado para servidores externos.
        </p>
      </div>
    `,
    )
  }
</script>

<template>
  <button
    class="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 text-slate-400 transition duration-200 hover:border-emerald-500/50 hover:text-emerald-400"
    title="Clique para obter ajuda sobre como usar a ferramenta"
    aria-label="Abrir ajuda"
    @click="showHelp"
  >
    <Icon icon="mdi:help-circle-outline" class="h-5 w-5" />
  </button>
</template>

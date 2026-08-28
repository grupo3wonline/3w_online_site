<template>
  <div class="error-page min-h-[80vh] flex flex-col justify-center bg-slate-900 text-white relative overflow-hidden py-16 px-4">
    <!-- Efeitos de Fundo -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(234,88,12,0.2),rgba(255,255,255,0))] pointer-events-none"></div>

    <div class="container max-w-3xl mx-auto relative z-10 text-center">
      <!-- Badge de Status -->
      <div class="inline-flex items-center gap-2 bg-orange-500/10 text-orange-300 border border-orange-500/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
        <Icon icon="mdi:server-network-off" class="w-4 h-4 text-orange-400" />
        <span>ERRO 500 • INSTABILIDADE NO SERVIDOR</span>
      </div>

      <!-- Título -->
      <h1 class="text-7xl sm:text-9xl font-black bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-200 bg-clip-text text-transparent mb-2 tracking-tight">
        500
      </h1>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">
        Instabilidade Temporária
      </h2>
      <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
        Nosso servidor encontrou um imprevisto temporário ao processar sua solicitação. Nossos sistemas já registraram a ocorrência para correção imediata. Tente recarregar a página.
      </p>

      <!-- Botões de Ação -->
      <div class="flex flex-wrap items-center justify-center gap-3.5 mb-8">
        <button
          @click="reloadPage"
          class="btn-primary !bg-primary-600 hover:!bg-primary-500 text-xs sm:text-sm font-bold !py-3 !px-6 shadow-xl flex items-center gap-2"
        >
          <Icon icon="mdi:refresh" class="w-4 h-4" />
          Recarregar Página
        </button>
        <RouterLink to="/" class="btn-secondary !bg-slate-800 hover:!bg-slate-700 !text-white text-xs sm:text-sm font-bold !py-3 !px-6 border border-slate-700 flex items-center gap-2">
          <Icon icon="mdi:home" class="w-4 h-4" />
          Ir para o Início
        </RouterLink>
        <a
          href="https://wa.me/5541996924829?text=Olá! Ocorreu um erro 500 ao tentar acessar uma página no site da 3W Online."
          target="_blank"
          rel="noopener noreferrer"
          class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-lg transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:whatsapp" class="w-4 h-4" />
          Avisar Suporte no WhatsApp
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Instabilidade no Servidor (Erro 500) | 3W Online',
  description: 'Instabilidade temporária no servidor.',
  noindex: true,
})

function reloadPage(): void {
  window.location.reload()
}
</script>

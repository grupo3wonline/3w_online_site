<template>
  <div class="error-page min-h-[80vh] flex flex-col justify-center bg-slate-900 text-white relative overflow-hidden py-16 px-4">
    <!-- Efeitos de Fundo -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(220,38,38,0.2),rgba(255,255,255,0))] pointer-events-none"></div>

    <div class="container max-w-3xl mx-auto relative z-10 text-center">
      <!-- Badge de Status -->
      <div class="inline-flex items-center gap-2 bg-red-500/10 text-red-300 border border-red-500/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
        <Icon icon="mdi:shield-lock-outline" class="w-4 h-4 text-red-400" />
        <span>ERRO 403 • ACESSO RESTRITO</span>
      </div>

      <!-- Título -->
      <h1 class="text-7xl sm:text-9xl font-black bg-gradient-to-r from-red-400 via-rose-300 to-amber-300 bg-clip-text text-transparent mb-2 tracking-tight">
        403
      </h1>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">
        Acesso Não Autorizado
      </h2>
      <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
        Você não possui permissões suficientes para acessar este diretório ou recurso protegido. Caso acredite que isto seja um equívoco, entre em contato com nossa equipe técnica.
      </p>

      <!-- Botões de Ação -->
      <div class="flex flex-wrap items-center justify-center gap-3.5 mb-8">
        <RouterLink to="/" class="btn-primary !bg-primary-600 hover:!bg-primary-500 text-xs sm:text-sm font-bold !py-3 !px-6 shadow-xl flex items-center gap-2">
          <Icon icon="mdi:home" class="w-4 h-4" />
          Retornar ao Início
        </RouterLink>
        <RouterLink to="/contato" class="btn-secondary !bg-slate-800 hover:!bg-slate-700 !text-white text-xs sm:text-sm font-bold !py-3 !px-6 border border-slate-700 flex items-center gap-2">
          <Icon icon="mdi:email-outline" class="w-4 h-4" />
          Falar com o Suporte
        </RouterLink>
        <a
          href="https://wa.me/5541996924829?text=Olá! Recebi um aviso de erro 403 no site da 3W Online e gostaria de orientações."
          target="_blank"
          rel="noopener noreferrer"
          class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-lg transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:whatsapp" class="w-4 h-4" />
          WhatsApp Técnico
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
  title: 'Acesso Restrito (Erro 403) | 3W Online',
  description: 'Acesso restrito ou não autorizado.',
  noindex: true,
})
</script>

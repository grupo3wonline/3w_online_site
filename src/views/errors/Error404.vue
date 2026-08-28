<template>
  <div class="error-page min-h-[80vh] flex flex-col justify-center bg-slate-900 text-white relative overflow-hidden py-16 px-4">
    <!-- Efeitos de Fundo -->
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(37,99,235,0.25),rgba(255,255,255,0))] pointer-events-none"></div>

    <div class="container max-w-3xl mx-auto relative z-10 text-center">
      <!-- Badge de Status -->
      <div class="inline-flex items-center gap-2 bg-amber-500/10 text-amber-300 border border-amber-500/20 px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
        <Icon icon="mdi:compass-off" class="w-4 h-4 text-amber-400" />
        <span>ERRO 404 • PÁGINA NÃO ENCONTRADA</span>
      </div>

      <!-- Título de Impacto -->
      <h1 class="text-7xl sm:text-9xl font-black bg-gradient-to-r from-blue-400 via-primary-300 to-indigo-300 bg-clip-text text-transparent mb-2 tracking-tight">
        404
      </h1>
      <h2 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">
        Ops! O link que você procurou não está por aqui.
      </h2>
      <p class="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
        A página pode ter sido movida, atualizada ou o endereço foi digitado incorretamente. Escolha um dos caminhos abaixo para continuar navegando:
      </p>

      <!-- Botões de Ação Principal -->
      <div class="flex flex-wrap items-center justify-center gap-3.5 mb-12">
        <RouterLink to="/" class="btn-primary !bg-primary-600 hover:!bg-primary-500 text-xs sm:text-sm font-bold !py-3 !px-6 shadow-xl shadow-primary-600/20 flex items-center gap-2">
          <Icon icon="mdi:home" class="w-4 h-4" />
          Ir para a Página Inicial
        </RouterLink>
        <RouterLink to="/servicos" class="btn-secondary !bg-slate-800 hover:!bg-slate-700 !text-white text-xs sm:text-sm font-bold !py-3 !px-6 border border-slate-700 flex items-center gap-2">
          <Icon icon="mdi:briefcase-outline" class="w-4 h-4" />
          Ver Nossos Serviços
        </RouterLink>
        <a
          href="https://wa.me/5541996924829?text=Olá! Estava navegando no site da 3W Online e encontrei um link quebrado."
          target="_blank"
          rel="noopener noreferrer"
          class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold py-3 px-5 rounded-xl shadow-lg transition-colors flex items-center gap-2"
        >
          <Icon icon="mdi:whatsapp" class="w-4 h-4" />
          Falar no WhatsApp
        </a>
      </div>

      <!-- Atalhos Rápidos para Páginas Populares -->
      <div class="p-6 rounded-2xl bg-slate-800/60 border border-slate-700/70 backdrop-blur-sm text-left">
        <h3 class="text-xs uppercase font-bold text-slate-400 tracking-wider mb-4 flex items-center gap-1.5">
          <Icon icon="mdi:lightning-bolt" class="w-4 h-4 text-amber-400" />
          Atalhos Mais Acessados na 3W Online:
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <RouterLink to="/servicos/criacao-sites" class="p-2.5 rounded-lg bg-slate-900/80 hover:bg-primary-950/60 border border-slate-700/50 hover:border-primary-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-2">
            <Icon icon="mdi:web" class="w-4 h-4 text-primary-400" />
            <span>Criação de Sites</span>
          </RouterLink>
          <RouterLink to="/servicos/criacao-sistemas" class="p-2.5 rounded-lg bg-slate-900/80 hover:bg-primary-950/60 border border-slate-700/50 hover:border-primary-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-2">
            <Icon icon="mdi:cog-outline" class="w-4 h-4 text-blue-400" />
            <span>Sistemas Sob Medida</span>
          </RouterLink>
          <RouterLink to="/servicos/automacao-ia" class="p-2.5 rounded-lg bg-slate-900/80 hover:bg-primary-950/60 border border-slate-700/50 hover:border-primary-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-2">
            <Icon icon="mdi:robot-outline" class="w-4 h-4 text-emerald-400" />
            <span>Automação & IA</span>
          </RouterLink>
          <RouterLink to="/servicos/gestao-anuncios" class="p-2.5 rounded-lg bg-slate-900/80 hover:bg-primary-950/60 border border-slate-700/50 hover:border-primary-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-2">
            <Icon icon="mdi:google-ads" class="w-4 h-4 text-yellow-400" />
            <span>Gestão de Anúncios</span>
          </RouterLink>
          <RouterLink to="/ferramentas" class="p-2.5 rounded-lg bg-slate-900/80 hover:bg-primary-950/60 border border-slate-700/50 hover:border-primary-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-2">
            <Icon icon="mdi:tools" class="w-4 h-4 text-purple-400" />
            <span>120+ Ferramentas Grátis</span>
          </RouterLink>
          <RouterLink to="/contato" class="p-2.5 rounded-lg bg-slate-900/80 hover:bg-primary-950/60 border border-slate-700/50 hover:border-primary-500/50 text-slate-200 hover:text-white transition-all flex items-center gap-2">
            <Icon icon="mdi:email-outline" class="w-4 h-4 text-pink-400" />
            <span>Fale Conosco / Orçamento</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

const { applySeo } = useSeo()
applySeo({
  title: 'Página Não Encontrada (Erro 404) | 3W Online',
  description: 'A página solicitada não foi encontrada. Retorne à página inicial ou consulte nossos serviços digitais.',
  noindex: true,
})
</script>

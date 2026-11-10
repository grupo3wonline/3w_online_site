<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Política de Privacidade',
  path: '/privacidade',
  description:
    'Política de Privacidade da Calculadora de Indicadores Financeiros em conformidade com LGPD, GDPR, CCPA e POPIA.',
})

const laws = [
  { tag: 'LGPD', desc: 'Lei Geral de Proteção de Dados (Brasil — Lei nº 13.709/2018)' },
  { tag: 'GDPR', desc: 'General Data Protection Regulation (União Europeia)' },
  { tag: 'CCPA', desc: 'California Consumer Privacy Act (EUA — Califórnia)' },
  { tag: 'POPIA', desc: 'Protection of Personal Information Act (África do Sul)' },
]

const sections = [
  {
    title: '1. Dados coletados',
    body: 'Esta aplicação não coleta dados pessoais. Todos os cálculos são realizados localmente no seu navegador e nenhum dado financeiro é transmitido a servidores.',
  },
  {
    title: '2. Armazenamento local',
    body: 'Utilizamos o localStorage apenas para preferência de tema (claro/escuro) e para registrar seu consentimento de privacidade.',
  },
  {
    title: '3. Cookies e análise',
    body: 'Ferramentas de análise (Google Analytics 4 e Google Tag Manager) só são carregadas após o seu consentimento explícito. Você pode recusar sem prejuízo ao uso da calculadora. O IP é anonimizado.',
  },
  {
    title: '4. Seus direitos',
    body: 'Você pode revogar o consentimento e limpar os dados do localStorage a qualquer momento pelas configurações do navegador. Sob LGPD/GDPR/CCPA/POPIA, você tem direito de acesso, correção e exclusão.',
  },
]
</script>

<template>
  <div class="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
    <div class="text-center">
      <div
        class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-glow"
      >
        <Icon icon="mdi:shield-check-outline" class="text-2xl" />
      </div>
      <h1 class="text-3xl font-bold text-ink-900 dark:text-white">Política de Privacidade</h1>
      <p class="mx-auto mt-2 max-w-md text-sm text-ink-500 dark:text-ink-400">
        Em conformidade com as principais normas globais de privacidade.
      </p>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div v-for="law in laws" :key="law.tag" class="surface p-4">
        <span class="badge-primary">{{ law.tag }}</span>
        <p class="mt-2 text-sm text-ink-600 dark:text-ink-300">{{ law.desc }}</p>
      </div>
    </div>

    <div class="mt-8 space-y-4">
      <section v-for="s in sections" :key="s.title" class="surface p-5">
        <h2 class="mb-1.5 font-bold text-ink-900 dark:text-white">{{ s.title }}</h2>
        <p class="text-sm leading-relaxed text-ink-600 dark:text-ink-300">{{ s.body }}</p>
      </section>

      <section class="surface p-5">
        <h2 class="mb-1.5 font-bold text-ink-900 dark:text-white">5. Contato do responsável</h2>
        <p class="text-sm leading-relaxed text-ink-600 dark:text-ink-300">
          Dúvidas sobre privacidade:
          <a href="mailto:contato@3wonline.com.br" class="text-primary-600 underline"
            >contato@3wonline.com.br</a
          >
          ou WhatsApp
          <a
            href="https://wa.me/5541996924829"
            target="_blank"
            rel="noopener noreferrer"
            class="text-primary-600 underline"
            >(41) 99692-4829</a
          >.
        </p>
      </section>
    </div>
  </div>
</template>

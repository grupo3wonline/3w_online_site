<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer
    class="relative overflow-hidden border-t border-ink-200/60 bg-ink-50 transition-colors duration-300 dark:border-ink-800 dark:bg-ink-950"
  >
    <!-- Faixa de destaque superior -->
    <div class="h-1 w-full bg-brand-gradient"></div>

    <!-- CTA -->
    <div class="border-b border-ink-200/60 dark:border-ink-800">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:px-6 lg:flex-row lg:px-8 lg:text-left"
      >
        <div>
          <h2 class="text-lg font-bold text-ink-900 dark:text-white">
            Pronto para analisar sua empresa?
          </h2>
          <p class="mt-1 text-sm text-ink-500 dark:text-ink-400">
            Comece agora — gratuito, sem cadastro e direto no seu navegador.
          </p>
        </div>
        <RouterLink :to="{ name: 'calculator' }" class="btn-primary shrink-0">
          <Icon icon="mdi:calculator-variant-outline" /> Abrir a calculadora
        </RouterLink>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-3">
        <div>
          <div class="mb-4 flex items-center gap-2.5">
            <div
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white"
            >
              <Icon icon="mdi:chart-line-variant" />
            </div>
            <span class="font-extrabold text-ink-900 dark:text-white">Calculadora Financeira</span>
          </div>
          <p class="max-w-xs text-sm leading-relaxed text-ink-500 dark:text-ink-400">
            Ferramenta gratuita para análise da saúde financeira de empresas. EBITDA, ROE, ROA,
            liquidez e mais — em segundos.
          </p>
        </div>

        <div>
          <h3 class="mb-4 text-xs font-bold uppercase tracking-wider text-ink-400">Navegação</h3>
          <ul class="space-y-2.5 text-sm text-ink-500 dark:text-ink-400">
            <li>
              <RouterLink :to="{ name: 'home' }" class="transition-colors hover:text-primary-600"
                >Início</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ name: 'calculator' }"
                class="transition-colors hover:text-primary-600"
                >Calculadora</RouterLink
              >
            </li>
            <li>
              <RouterLink
                :to="{ name: 'home', hash: '#contato' }"
                class="transition-colors hover:text-primary-600"
                >Contato</RouterLink
              >
            </li>
            <li>
              <RouterLink :to="{ name: 'privacy' }" class="transition-colors hover:text-primary-600"
                >Privacidade</RouterLink
              >
            </li>
          </ul>
        </div>

        <div>
          <h3 class="mb-4 text-xs font-bold uppercase tracking-wider text-ink-400">Contato</h3>
          <ul class="space-y-3 text-sm text-ink-500 dark:text-ink-400">
            <li>
              <a
                href="https://wa.me/5541996924829"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-2.5 transition-colors hover:text-primary-600"
              >
                <span
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-100 text-accent-600 dark:bg-accent-500/15 dark:text-accent-300"
                >
                  <Icon icon="mdi:whatsapp" />
                </span>
                (41) 99692-4829
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@3wonline.com.br"
                class="group flex items-center gap-2.5 transition-colors hover:text-primary-600"
              >
                <span
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
                >
                  <Icon icon="mdi:email-outline" />
                </span>
                contato@3wonline.com.br
              </a>
            </li>
            <li>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="group flex items-center gap-2.5 transition-colors hover:text-primary-600"
              >
                <span
                  class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-500/15 dark:text-primary-300"
                >
                  <Icon icon="mdi:web" />
                </span>
                www.3wonline.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col items-center gap-1 border-t border-ink-200/60 pt-6 text-center text-xs text-ink-500 dark:border-ink-800 dark:text-ink-400"
      >
        <p>© {{ year }} Grupo 3W Online — sites e sistemas personalizados sob demanda.</p>
        <p>
          Sistema desenvolvido pelo desenvolvedor
          <strong class="text-ink-700 dark:text-ink-200">HOTWYL | WILLFROMBRASIL</strong>.
        </p>
      </div>
    </div>
  </footer>
</template>

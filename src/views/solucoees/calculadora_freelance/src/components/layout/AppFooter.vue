<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { COMPANY, DEVELOPER, SOCIAL_LINKS } from '@/lib/constants'

const currentYear = new Date().getFullYear()

const quickLinks = [
  { label: 'Início', to: '/' },
  { label: 'Calculadora', to: '/calculadora' },
  { label: 'Contato', to: '/#contato' },
]

const legalLinks = [
  { label: 'Termos de Uso', to: '/termos' },
  { label: 'Política de Privacidade', to: '/privacidade' },
]
</script>

<template>
  <footer class="relative mt-auto overflow-hidden bg-gray-950 text-white">
    <!-- Brilho decorativo -->
    <div
      class="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-600/20 blur-3xl"
      aria-hidden="true"
    ></div>

    <div class="container-app relative z-10 py-14">
      <div class="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
        <!-- Sobre -->
        <div class="lg:col-span-1">
          <div class="mb-4 flex items-center gap-3">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient shadow-soft"
            >
              <i class="fas fa-calculator text-lg text-white"></i>
            </div>
            <h3 class="font-display text-lg font-bold">Calculadora Freelancer</h3>
          </div>
          <p class="text-sm leading-relaxed text-gray-400">
            Ferramenta profissional e gratuita para freelancers calcularem valor/hora, orçamentos e
            prazos. Processamento 100% local e seguro.
          </p>
          <div class="mt-5 flex gap-3">
            <a
              v-for="social in SOCIAL_LINKS"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:ring-brand-500"
              :aria-label="social.name"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Links rápidos -->
        <nav aria-label="Links rápidos">
          <h4
            class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-300"
          >
            <i class="fas fa-link text-brand-400"></i> Navegação
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in quickLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <i
                  class="fas fa-angle-right text-brand-400 transition-transform group-hover:translate-x-1"
                ></i>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Legal -->
        <nav aria-label="Links legais">
          <h4
            class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-300"
          >
            <i class="fas fa-shield-halved text-brand-400"></i> Legal
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in legalLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="group flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
              >
                <i
                  class="fas fa-angle-right text-brand-400 transition-transform group-hover:translate-x-1"
                ></i>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Desenvolvido por -->
        <div>
          <h4
            class="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-gray-300"
          >
            <i class="fas fa-code text-brand-400"></i> Desenvolvido por
          </h4>
          <a
            :href="COMPANY.site"
            target="_blank"
            rel="noopener noreferrer"
            class="group block rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-brand-500/60 hover:bg-white/[0.07]"
          >
            <div class="mb-2 flex items-center gap-3">
              <div class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient">
                <i class="fas fa-globe text-white"></i>
              </div>
              <h5
                class="font-display text-lg font-bold transition-colors group-hover:text-brand-300"
              >
                {{ COMPANY.legalName }}
              </h5>
            </div>
            <p class="text-xs leading-relaxed text-gray-400">{{ COMPANY.tagline }}</p>
          </a>
        </div>
      </div>

      <!-- Barra inferior -->
      <div class="mt-10 border-t border-white/10 pt-8">
        <div
          class="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left"
        >
          <p class="text-sm text-gray-400">
            © {{ currentYear }} <strong class="text-white">Calculadora Freelancer</strong>. Todos os
            direitos reservados.
          </p>
          <p class="text-sm text-gray-400">
            Sistema desenvolvido pelo desenvolvedor
            <a
              :href="COMPANY.site"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-brand-400 transition-colors hover:text-brand-300"
            >
              {{ DEVELOPER.credit }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

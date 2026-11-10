<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useAnchorNav } from '@/composables/useAnchorNav'

const { goToAnchor } = useAnchorNav()
const currentYear = new Date().getFullYear()

const quickLinks = [
  { to: '/#inicio', label: 'Início', anchor: true },
  { to: '/#beneficios', label: 'Benefícios', anchor: true },
  { to: '/#servicos', label: 'Serviços', anchor: true },
  { to: '/calculadora', label: 'Calculadora', anchor: false },
  { to: '/#contato', label: 'Contato', anchor: true },
]

const legalLinks = [
  { to: '/termos', label: 'Termos de Uso' },
  { to: '/privacidade', label: 'Política de Privacidade' },
]

const social = [
  { href: 'https://www.facebook.com/3wonline', icon: 'fa6-brands:facebook-f', label: 'Facebook' },
  { href: 'https://www.instagram.com/3wonline', icon: 'fa6-brands:instagram', label: 'Instagram' },
  {
    href: 'https://www.linkedin.com/company/3wonline',
    icon: 'fa6-brands:linkedin-in',
    label: 'LinkedIn',
  },
]
</script>

<template>
  <footer class="mt-20 bg-gradient-to-br from-slate-900 via-violet-900 to-purple-900 text-white">
    <div class="container py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Sobre -->
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 p-3 shadow-lg">
              <Icon icon="fa6-solid:calculator" class="h-5 w-5 text-white" />
            </div>
            <h3 class="text-lg font-bold">Calculadora de Preços</h3>
          </div>
          <p class="text-sm leading-relaxed text-slate-300">
            Ferramenta profissional e gratuita para calcular preços de produtos e serviços com
            precisão. Desenvolvida para empreendedores, freelancers e empresas.
          </p>
          <div class="flex gap-3">
            <a
              v-for="s in social"
              :key="s.href"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-all duration-300 hover:scale-110 hover:bg-white/20"
              :aria-label="s.label"
            >
              <Icon :icon="s.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Links rápidos -->
        <div class="space-y-4">
          <h3 class="flex items-center text-lg font-bold">
            <Icon icon="fa6-solid:link" class="mr-2 h-4 w-4 text-violet-400" />
            Links Rápidos
          </h3>
          <ul class="space-y-2">
            <li v-for="l in quickLinks" :key="l.to">
              <button
                v-if="l.anchor"
                type="button"
                class="inline-flex items-center text-sm text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-white"
                @click="goToAnchor(l.to)"
              >
                <Icon icon="fa6-solid:chevron-right" class="mr-2 h-2.5 w-2.5" />
                {{ l.label }}
              </button>
              <RouterLink
                v-else
                :to="l.to"
                class="inline-flex items-center text-sm text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-white"
              >
                <Icon icon="fa6-solid:chevron-right" class="mr-2 h-2.5 w-2.5" />
                {{ l.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div class="space-y-4">
          <h3 class="flex items-center text-lg font-bold">
            <Icon icon="fa6-solid:shield-halved" class="mr-2 h-4 w-4 text-violet-400" />
            Legal & Privacidade
          </h3>
          <ul class="space-y-2">
            <li v-for="l in legalLinks" :key="l.to">
              <RouterLink
                :to="l.to"
                class="inline-flex items-center text-sm text-slate-300 transition-all duration-300 hover:translate-x-1 hover:text-white"
              >
                <Icon icon="fa6-solid:chevron-right" class="mr-2 h-2.5 w-2.5" />
                {{ l.label }}
              </RouterLink>
            </li>
            <li class="flex items-center text-sm text-slate-300">
              <Icon icon="fa6-solid:circle-check" class="mr-2 h-3 w-3 text-green-400" />
              Conforme LGPD, GDPR, CCPA e POPIA
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div class="space-y-4">
          <h3 class="flex items-center text-lg font-bold">
            <Icon icon="fa6-solid:headset" class="mr-2 h-4 w-4 text-violet-400" />
            Contato
          </h3>
          <ul class="space-y-3 text-sm text-slate-300">
            <li class="flex items-start gap-3">
              <Icon icon="fa6-solid:envelope" class="mt-1 h-4 w-4 text-violet-400" />
              <a href="mailto:contato@3wonline.com.br" class="transition-colors hover:text-white">
                contato@3wonline.com.br
              </a>
            </li>
            <li class="flex items-start gap-3">
              <Icon icon="fa6-brands:whatsapp" class="mt-1 h-4 w-4 text-violet-400" />
              <a
                href="https://wa.me/5541996924829"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors hover:text-white"
              >
                (41) 99692-4829
              </a>
            </li>
            <li class="flex items-start gap-3">
              <Icon icon="fa6-solid:globe" class="mt-1 h-4 w-4 text-violet-400" />
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors hover:text-white"
              >
                www.3wonline.com.br
              </a>
            </li>
          </ul>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 px-6 py-3 text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-violet-600 hover:to-purple-600"
          >
            <Icon icon="fa6-solid:rocket" class="h-4 w-4" />
            Conheça o Grupo 3w Online
          </a>
        </div>
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row"
      >
        <div class="text-center text-sm text-slate-300 md:text-left">
          <p>© {{ currentYear }} <strong>Grupo 3w Online</strong> — {{ $t('footer.rights') }}</p>
          <p class="mt-1 text-xs">{{ $t('footer.tagline') }}</p>
        </div>
        <p class="flex items-center gap-2 text-sm text-slate-300">
          <Icon icon="fa6-solid:code" class="h-4 w-4 text-violet-400" />
          sistema desenvolvido pelo desenvolvedor
          <strong class="text-white">HOTWYL | WILLFROMBRASIL</strong>
        </p>
      </div>
    </div>
  </footer>
</template>

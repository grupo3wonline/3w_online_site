<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, type RouteLocationRaw } from 'vue-router'
import { Icon } from '@iconify/vue'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import { company, siteConfig, socialLinks } from '@/config/site'

const currentYear = computed(() => new Date().getFullYear())

interface FooterLink {
  to: RouteLocationRaw
  label: string
}

const quickLinks: FooterLink[] = [
  { to: '/', label: 'Início' },
  { to: { path: '/', hash: '#sobre' }, label: 'Sobre' },
  { to: { path: '/', hash: '#servicos' }, label: 'Serviços' },
  { to: '/calculadora', label: 'Calculadora' },
]

const resourceLinks: FooterLink[] = [
  { to: { path: '/', hash: '#ferramentas' }, label: 'Ferramentas' },
  { to: { path: '/', hash: '#contato' }, label: 'Contato' },
]

const legalLinks: FooterLink[] = [
  { to: '/politica-privacidade', label: 'Política de Privacidade' },
  { to: '/termos-uso', label: 'Termos de Uso' },
]
</script>

<template>
  <footer class="mt-auto bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <!-- Sobre -->
        <div class="space-y-4">
          <BrandLogo :size="40" />
          <p class="text-sm text-gray-300">
            Ferramenta profissional para criação de orçamentos de social mídia.
          </p>
          <div class="flex gap-3">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-purple-400 transition hover:text-purple-300"
              :aria-label="social.name"
            >
              <Icon :icon="social.icon" class="text-xl" aria-hidden="true" />
            </a>
          </div>
        </div>

        <!-- Links rápidos -->
        <div>
          <h3 class="mb-4 flex items-center gap-2 text-base font-semibold">
            <Icon icon="fa6-solid:link" class="text-purple-400" aria-hidden="true" /> Links Rápidos
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.label">
              <RouterLink
                :to="link.to"
                class="flex items-center gap-2 text-sm text-gray-300 transition hover:text-purple-400"
              >
                <Icon icon="fa6-solid:chevron-right" class="text-xs" aria-hidden="true" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Recursos -->
        <div>
          <h3 class="mb-4 flex items-center gap-2 text-base font-semibold">
            <Icon icon="fa6-solid:screwdriver-wrench" class="text-purple-400" aria-hidden="true" />
            Recursos
          </h3>
          <ul class="space-y-2">
            <li v-for="link in resourceLinks" :key="link.label">
              <RouterLink
                :to="link.to"
                class="flex items-center gap-2 text-sm text-gray-300 transition hover:text-purple-400"
              >
                <Icon icon="fa6-solid:chevron-right" class="text-xs" aria-hidden="true" />
                {{ link.label }}
              </RouterLink>
            </li>
            <li>
              <a
                :href="company.website"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-sm text-gray-300 transition hover:text-purple-400"
              >
                <Icon icon="fa6-solid:chevron-right" class="text-xs" aria-hidden="true" />
                {{ company.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="mb-4 flex items-center gap-2 text-base font-semibold">
            <Icon icon="fa6-solid:shield-halved" class="text-purple-400" aria-hidden="true" /> Legal
          </h3>
          <ul class="space-y-2">
            <li v-for="link in legalLinks" :key="link.label">
              <RouterLink
                :to="link.to"
                class="flex items-center gap-2 text-sm text-gray-300 transition hover:text-purple-400"
              >
                <Icon icon="fa6-solid:chevron-right" class="text-xs" aria-hidden="true" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
          <p class="mt-4 text-xs text-gray-400">Conformidade: LGPD · GDPR · CCPA · POPIA</p>
        </div>
      </div>

      <!-- Copyright + crédito do desenvolvedor -->
      <div class="mt-8 border-t border-purple-800/30 pt-8">
        <div
          class="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left"
        >
          <p class="text-sm text-gray-400">
            © {{ currentYear }} {{ siteConfig.name }}. {{ 'Todos os direitos reservados.' }}
          </p>
          <p class="text-sm text-gray-400">
            Sistema desenvolvido pelo desenvolvedor
            <span class="font-semibold text-purple-300">{{ company.developer }}</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<template>
  <footer class="bg-slate-900 dark:bg-slate-950 text-slate-300 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-md"
            >
              <i class="fa-solid fa-file-lines text-white text-sm" aria-hidden="true"></i>
            </div>
            <span class="text-lg font-bold text-white">{{ t('brand.name') }}</span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed mb-4">
            Ferramenta online gratuita para análise e comparação de textos. Processamento 100% local — seus dados
            nunca saem do navegador.
          </p>
          <div class="flex flex-wrap items-center gap-2">
            <span class="badge badge-success text-[10px]">
              <i class="fa-solid fa-shield-halved mr-1" aria-hidden="true"></i> LGPD · GDPR
            </span>
            <span class="badge badge-info text-[10px]">
              <i class="fa-solid fa-lock mr-1" aria-hidden="true"></i> 100% Local
            </span>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navegação</h3>
          <ul class="space-y-3">
            <li v-for="link in navLinks" :key="link.label">
              <router-link
                :to="link.to"
                class="text-sm text-slate-400 hover:text-primary-400 transition-colors flex items-center gap-2"
              >
                <i :class="link.icon" class="w-4 text-xs" aria-hidden="true"></i>{{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Recursos</h3>
          <ul class="space-y-3">
            <li v-for="res in resources" :key="res.label" class="text-sm text-slate-400 flex items-center gap-2">
              <i :class="res.icon" class="w-4 text-xs" aria-hidden="true"></i>{{ res.label }}
            </li>
          </ul>
        </div>

        <!-- Developer -->
        <div>
          <h3 class="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
            {{ t('footer.developedBy') }}
          </h3>
          <p class="text-sm text-slate-300 font-semibold mb-2">{{ t('footer.developer') }}</p>
          <p class="text-sm text-slate-400 mb-3">Empresa desenvolvedora:</p>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            <i class="fa-solid fa-globe" aria-hidden="true"></i>
            {{ t('footer.company') }}
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true"></i>
          </a>
          <p class="text-xs text-slate-500 mt-3 leading-relaxed">
            Desenvolvimento de sites e sistemas personalizados sob demanda. Soluções digitais de alta performance.
          </p>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="mt-12 pt-8 border-t border-slate-800">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-slate-500 text-center md:text-left">
            © {{ currentYear }} {{ t('brand.name') }} — {{ t('footer.rights') }}.
            {{ t('footer.developedBy') }} <strong class="text-slate-400">{{ t('footer.developer') }}</strong>
          </p>
          <div class="flex items-center gap-5">
            <button
              type="button"
              class="text-xs text-slate-500 hover:text-primary-400 transition-colors flex items-center gap-1"
              @click="consent.reopen()"
            >
              <i class="fa-solid fa-cookie-bite" aria-hidden="true"></i> {{ t('footer.privacySettings') }}
            </button>
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="text-xs text-slate-500 hover:text-primary-400 transition-colors flex items-center gap-1"
            >
              <i class="fa-solid fa-globe" aria-hidden="true"></i> 3wonline.com.br
            </a>
            <span class="text-xs text-slate-600">v{{ version }}</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useConsentStore } from '@/stores/consent'

const { t } = useI18n()
const consent = useConsentStore()
const currentYear = new Date().getFullYear()
const version = '3.0.0'

const navLinks = computed(() => [
  { to: { path: '/' }, label: t('nav.home'), icon: 'fa-solid fa-house' },
  { to: '/ferramenta', label: t('nav.tool'), icon: 'fa-solid fa-chart-bar' },
  { to: { path: '/', hash: '#sobre' }, label: t('nav.about'), icon: 'fa-solid fa-circle-info' },
  { to: { path: '/', hash: '#servicos' }, label: t('nav.services'), icon: 'fa-solid fa-briefcase' },
  { to: { path: '/', hash: '#contato' }, label: t('nav.contact'), icon: 'fa-solid fa-envelope' }
])

const resources = [
  { label: 'Contador de Palavras', icon: 'fa-solid fa-spell-check' },
  { label: 'Contador de Caracteres', icon: 'fa-solid fa-font' },
  { label: 'Comparador de Textos', icon: 'fa-solid fa-code-compare' },
  { label: 'Upload de Arquivos', icon: 'fa-solid fa-file-arrow-up' }
]
</script>

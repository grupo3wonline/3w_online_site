<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { SITE, COMPANY, DEVELOPER } from '@/config/site'

const { t } = useI18n()
const year = new Date().getFullYear()

const quickLinks = [
  { label: () => t('nav.home'), to: '/' },
  { label: () => t('nav.calculator'), to: '/calculadora' },
  { label: () => t('nav.howItWorks'), to: '/#como-funciona' },
  { label: () => t('nav.contact'), to: '/#contato' },
]

const legalLinks = [
  { label: () => t('nav.terms'), to: '/termos-de-uso' },
  { label: () => t('nav.privacy'), to: '/politica-de-privacidade' },
]

const resources = [
  () => t('common.free'),
  () => t('common.noSignup'),
  () => t('common.accurate'),
  () => t('common.responsive'),
]
</script>

<template>
  <footer class="relative overflow-hidden bg-gray-950 text-gray-300">
    <!-- Linha superior com gradiente da marca -->
    <div class="h-1 w-full bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500"></div>

    <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div class="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <!-- Marca -->
        <div>
          <div class="mb-4 flex items-center gap-2.5">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg shadow-primary-600/30"
            >
              <Icon icon="ph:lightning-fill" class="h-6 w-6" aria-hidden="true" />
            </span>
            <span class="font-display text-xl font-bold text-white">{{ SITE.name }}</span>
          </div>
          <p class="text-sm leading-relaxed text-gray-400">{{ t('footer.brandDesc') }}</p>
          <a
            :href="COMPANY.url"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-800 bg-gray-900 px-4 py-2 text-sm font-medium text-primary-400 transition-colors hover:border-primary-500 hover:text-primary-300"
          >
            <Icon icon="ph:globe-bold" class="h-4 w-4" aria-hidden="true" />
            {{ COMPANY.name }}
          </a>
        </div>

        <!-- Links rápidos -->
        <nav aria-label="Links rápidos">
          <h4 class="mb-4 font-display text-base font-semibold text-white">
            {{ t('footer.quickLinks') }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in quickLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400"
              >
                <Icon icon="ph:caret-right-bold" class="h-3 w-3" aria-hidden="true" />
                {{ link.label() }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Legal -->
        <nav aria-label="Links legais">
          <h4 class="mb-4 font-display text-base font-semibold text-white">
            {{ t('footer.legal') }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li v-for="link in legalLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="inline-flex items-center gap-2 text-gray-400 transition-colors hover:text-primary-400"
              >
                <Icon icon="ph:caret-right-bold" class="h-3 w-3" aria-hidden="true" />
                {{ link.label() }}
              </RouterLink>
            </li>
            <li class="flex items-center gap-2 pt-1 text-gray-400">
              <Icon
                icon="ph:shield-check-bold"
                class="h-4 w-4 text-primary-500"
                aria-hidden="true"
              />
              {{ t('footer.complianceLgpd') }}
            </li>
          </ul>
        </nav>

        <!-- Recursos -->
        <div>
          <h4 class="mb-4 font-display text-base font-semibold text-white">
            {{ t('footer.resources') }}
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li
              v-for="(res, i) in resources"
              :key="i"
              class="flex items-center gap-2 text-gray-400"
            >
              <Icon
                icon="ph:check-circle-bold"
                class="h-4 w-4 text-primary-500"
                aria-hidden="true"
              />
              {{ res() }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Rodapé inferior -->
      <div class="mt-12 border-t border-gray-800 pt-8">
        <div
          class="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left"
        >
          <div class="text-sm text-gray-400">
            <p class="mb-1">{{ year }} &copy; {{ SITE.fullName }}. {{ t('footer.rights') }}</p>
            <p class="text-xs">
              {{ t('footer.developedBy') }}
              <strong class="text-gradient font-semibold">{{ DEVELOPER.name }}</strong>
              |
              <a
                :href="COMPANY.url"
                target="_blank"
                rel="noopener noreferrer"
                class="font-semibold text-primary-400 transition-colors hover:text-primary-300"
              >
                {{ COMPANY.name }}
              </a>
            </p>
          </div>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span class="flex items-center gap-1.5">
              <span class="relative flex h-2 w-2">
                <span
                  class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"
                ></span>
                <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
              </span>
              {{ t('footer.online') }}
            </span>
            <span class="flex items-center gap-1.5">
              <Icon icon="ph:lock-simple-bold" class="h-3.5 w-3.5" aria-hidden="true" />
              {{ t('footer.secure') }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

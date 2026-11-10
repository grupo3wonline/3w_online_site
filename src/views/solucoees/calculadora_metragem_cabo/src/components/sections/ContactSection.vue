<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useI18n } from 'vue-i18n'
import { COMPANY } from '@/config/site'

const { t } = useI18n()

const trust = [
  { icon: 'ph:shield-check-bold', key: 'secure' },
  { icon: 'ph:lightning-bold', key: 'fast' },
  { icon: 'ph:handshake-bold', key: 'professional' },
]
</script>

<template>
  <section id="contato" class="section scroll-mt-24 bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl">
      <div class="text-center">
        <span
          class="badge bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300"
        >
          <Icon icon="ph:chat-circle-dots-bold" class="h-4 w-4" aria-hidden="true" />
          {{ t('contact.badge') }}
        </span>
        <h2 class="section-title mt-4">{{ t('contact.title') }}</h2>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
        <!-- WhatsApp -->
        <a
          :href="COMPANY.whatsappLink"
          target="_blank"
          rel="noopener noreferrer"
          class="card card-hover group flex flex-col items-center p-8 text-center"
        >
          <span
            class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg transition-transform group-hover:scale-110"
          >
            <Icon icon="ph:whatsapp-logo-bold" class="h-8 w-8" aria-hidden="true" />
          </span>
          <h3 class="mt-5 font-display text-lg font-semibold text-gray-900 dark:text-white">
            {{ t('contact.whatsappTitle') }}
          </h3>
          <p class="mt-1 text-gray-600 dark:text-gray-400">{{ COMPANY.whatsapp }}</p>
          <span
            class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-green-500 px-5 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-green-600"
          >
            {{ t('contact.whatsappCta') }}
            <Icon icon="ph:arrow-right-bold" class="h-4 w-4" aria-hidden="true" />
          </span>
        </a>

        <!-- E-mail -->
        <a
          :href="COMPANY.emailLink"
          class="card card-hover group flex flex-col items-center p-8 text-center"
        >
          <span
            class="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg transition-transform group-hover:scale-110"
          >
            <Icon icon="ph:envelope-simple-bold" class="h-8 w-8" aria-hidden="true" />
          </span>
          <h3 class="mt-5 font-display text-lg font-semibold text-gray-900 dark:text-white">
            {{ t('contact.emailTitle') }}
          </h3>
          <p class="mt-1 break-all text-gray-600 dark:text-gray-400">{{ COMPANY.email }}</p>
          <span
            class="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-5 py-2 text-sm font-semibold text-white transition-colors group-hover:bg-primary-700"
          >
            {{ t('contact.emailCta') }}
            <Icon icon="ph:arrow-right-bold" class="h-4 w-4" aria-hidden="true" />
          </span>
        </a>
      </div>

      <ul
        class="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-600 dark:text-gray-400"
      >
        <li v-for="item in trust" :key="item.key" class="flex items-center gap-2">
          <Icon :icon="item.icon" class="h-5 w-5 text-primary-600" aria-hidden="true" />
          {{ t(`contact.trust.${item.key}`) }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { Icon, Button, Card } from '@/components/ui'
import SectionHeading from './SectionHeading.vue'
import { COMPANY } from '@/utils/constants'

const { t } = useI18n()
</script>

<template>
  <section id="contato" class="py-16 sm:py-20" aria-labelledby="contact-title">
    <div class="container mx-auto px-4 sm:px-6">
      <SectionHeading
        id="contact-title"
        gradient
        :title="t('contact.title')"
        :subtitle="t('contact.subtitle')"
      />

      <div class="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
        <Card hover class="flex flex-col items-center p-8 text-center">
          <span
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-600"
          >
            <Icon icon="lucide:message-circle" class="h-7 w-7" />
          </span>
          <h3 class="mb-1 text-lg font-bold text-foreground">{{ t('contact.whatsapp') }}</h3>
          <p class="mb-4 text-muted-foreground">{{ COMPANY.whatsappDisplay }}</p>
          <Button
            as="a"
            :href="COMPANY.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-green-600 hover:bg-green-700"
          >
            <Icon icon="lucide:message-circle" class="h-5 w-5" />
            {{ t('contact.whatsappCta') }}
          </Button>
        </Card>

        <Card hover class="flex flex-col items-center p-8 text-center">
          <span
            class="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
          >
            <Icon icon="lucide:mail" class="h-7 w-7" />
          </span>
          <h3 class="mb-1 text-lg font-bold text-foreground">{{ t('contact.email') }}</h3>
          <p class="mb-4 break-all text-muted-foreground">{{ COMPANY.email }}</p>
          <Button as="a" :href="`mailto:${COMPANY.email}`">
            <Icon icon="lucide:mail" class="h-5 w-5" />
            {{ t('contact.emailCta') }}
          </Button>
        </Card>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import { Icon } from '@/components/ui'
import SectionHeading from './SectionHeading.vue'

const { t } = useI18n()

const faqKeys = ['q1', 'q2', 'q3', 'q4'] as const

// Dados estruturados FAQPage (AEO) — melhora a compreensão por buscadores/assistentes.
const faqJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqKeys.map((key) => ({
    '@type': 'Question',
    name: t(`home.faq.items.${key}.q`),
    acceptedAnswer: { '@type': 'Answer', text: t(`home.faq.items.${key}.a`) },
  })),
}))

useHead({
  script: [
    computed(() => ({
      type: 'application/ld+json',
      children: JSON.stringify(faqJsonLd.value),
    })),
  ],
})
</script>

<template>
  <section id="faq" class="bg-muted/40 py-16 sm:py-20" aria-labelledby="faq-title">
    <div class="container mx-auto px-4 sm:px-6">
      <SectionHeading id="faq-title" gradient :title="t('home.faq.title')" />

      <div class="mx-auto max-w-3xl space-y-4">
        <details
          v-for="key in faqKeys"
          :key="key"
          class="group rounded-xl border border-border bg-card p-5 shadow-sm transition-colors open:ring-1 open:ring-primary-600/20"
        >
          <summary
            class="flex cursor-pointer items-center justify-between gap-4 font-semibold text-foreground"
          >
            {{ t(`home.faq.items.${key}.q`) }}
            <Icon
              icon="lucide:chevron-right"
              class="h-5 w-5 flex-shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
            />
          </summary>
          <p class="mt-3 text-sm text-muted-foreground">
            {{ t(`home.faq.items.${key}.a`) }}
          </p>
        </details>
      </div>
    </div>
  </section>
</template>

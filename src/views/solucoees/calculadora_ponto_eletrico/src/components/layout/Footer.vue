<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Icon } from '@/components/ui'
import { ROUTES, ANCHORS, COMPANY } from '@/utils/constants'

const { t } = useI18n()
const currentYear = new Date().getFullYear()

const quickLinks = computed(() => [
  { path: ROUTES.HOME, label: t('nav.home'), icon: 'lucide:home' },
  { path: ANCHORS.CALCULATOR, label: t('nav.calculator'), icon: 'lucide:calculator' },
  { path: ANCHORS.TOOLS, label: t('nav.tools'), icon: 'lucide:sparkles' },
  { path: ANCHORS.ABOUT, label: t('nav.about'), icon: 'lucide:info' },
  { path: ANCHORS.SERVICES, label: t('nav.services'), icon: 'lucide:code-2' },
  { path: ANCHORS.CONTACT, label: t('nav.contact'), icon: 'lucide:mail' },
])

const legalLinks = computed(() => [
  { path: ROUTES.TERMS, label: t('legal.terms'), icon: 'lucide:file-text' },
  { path: ROUTES.PRIVACY, label: t('legal.privacy'), icon: 'lucide:shield-check' },
])

const socials = [
  { href: COMPANY.site, icon: 'lucide:globe', label: 'Website' },
  { href: 'https://www.facebook.com/3wonline', icon: 'lucide:facebook', label: 'Facebook' },
  { href: 'https://www.instagram.com/3wonline', icon: 'lucide:instagram', label: 'Instagram' },
]
</script>

<template>
  <footer class="mt-auto border-t border-border bg-muted/40">
    <div class="container mx-auto px-4 py-10 sm:px-6 sm:py-12">
      <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Sobre -->
        <div>
          <div class="mb-4 flex items-center gap-3">
            <span class="icon-badge h-10 w-10">
              <Icon icon="lucide:zap" class="h-5 w-5" />
            </span>
            <span class="text-lg font-bold text-foreground">{{ t('app.shortName') }}</span>
          </div>
          <p class="mb-4 text-sm text-muted-foreground">{{ t('app.description') }}</p>
          <div class="flex gap-2">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-background text-primary transition-transform hover:scale-110"
              :title="social.label"
              :aria-label="social.label"
            >
              <Icon :icon="social.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Links rápidos -->
        <div>
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
            {{ t('footer.quickLinks') }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon :icon="link.icon" class="mr-2 h-4 w-4" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
            {{ t('footer.legal') }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in legalLinks" :key="link.path">
              <RouterLink
                :to="link.path"
                class="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <Icon :icon="link.icon" class="mr-2 h-4 w-4" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
          <div class="mt-4 flex items-center gap-2 rounded-lg bg-background p-3 text-xs">
            <Icon icon="lucide:lock" class="h-4 w-4 text-green-500" />
            <span class="text-muted-foreground">
              <strong class="text-foreground">{{ t('footer.secure') }}</strong
              ><br />
              {{ t('footer.secureNote') }}
            </span>
          </div>
        </div>

        <!-- Agência / CTA -->
        <div>
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">
            {{ t('footer.agency') }}
          </h3>
          <p class="mb-4 text-sm text-muted-foreground">{{ t('footer.agencyTagline') }}</p>
          <a
            :href="COMPANY.site"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
          >
            <Icon icon="lucide:rocket" class="h-4 w-4" />
            {{ t('actions.requestQuote') }}
          </a>
        </div>
      </div>

      <!-- Desenvolvedor -->
      <div class="border-t border-border pt-6 text-center">
        <p class="mb-2 text-sm text-muted-foreground">
          {{ t('footer.developedBy', { developer: COMPANY.developer }) }}
        </p>
        <p class="text-xs text-muted-foreground">
          © {{ currentYear }} {{ t('app.name') }} — {{ t('footer.rights') }}
        </p>
      </div>
    </div>
  </footer>
</template>

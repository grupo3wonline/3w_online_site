<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import { company, developer } from '@/config/site'

const currentYear = new Date().getFullYear()

const quickLinks = [
  { label: 'Início', to: '/', hash: '' },
  { label: 'Benefícios', to: '/', hash: '#beneficios' },
  { label: 'Recursos', to: '/', hash: '#recursos' },
  { label: 'Serviços', to: '/', hash: '#servicos' },
  { label: 'Playground', to: '/playground', hash: '' },
  { label: 'Contato', to: '/', hash: '#contato' },
]

const legalLinks = [
  { label: 'Termos de Uso', to: '/termos' },
  { label: 'Política de Privacidade', to: '/privacidade' },
]

const socials = [
  { icon: 'mdi:web', href: company.site, label: 'Website' },
  { icon: 'mdi:facebook', href: company.social.facebook, label: 'Facebook' },
  { icon: 'mdi:instagram', href: company.social.instagram, label: 'Instagram' },
  { icon: 'mdi:linkedin', href: company.social.linkedin, label: 'LinkedIn' },
]
</script>

<template>
  <footer class="border-t bg-background/95">
    <div class="container-page grid grid-cols-1 gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
      <!-- Sobre -->
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="flex h-10 w-10 items-center justify-center rounded-xl gradient-brand">
            <Icon icon="lucide:code-2" class="h-6 w-6 text-white" />
          </span>
          <span class="text-xl font-bold gradient-text">DevPlayground</span>
        </div>
        <p class="text-sm text-muted-foreground">
          Editor de código online profissional para HTML, CSS, JavaScript e PHP. Uma solução da
          <strong>{{ company.name }}</strong>.
        </p>
        <div class="flex gap-2">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.label"
            class="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-primary hover:text-white"
          >
            <Icon :icon="s.icon" class="h-5 w-5" />
          </a>
        </div>
      </div>

      <!-- Links rápidos -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Links Rápidos</h3>
        <ul class="space-y-2">
          <li v-for="link in quickLinks" :key="link.label">
            <RouterLink
              :to="{ path: link.to, hash: link.hash || undefined }"
              class="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Legal -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Legal &amp; Privacidade</h3>
        <ul class="space-y-2">
          <li v-for="link in legalLinks" :key="link.label">
            <RouterLink
              :to="link.to"
              class="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {{ link.label }}
            </RouterLink>
          </li>
          <li class="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon icon="lucide:shield-check" class="h-4 w-4 text-emerald-500" />
            LGPD • GDPR • CCPA • POPIA
          </li>
        </ul>
      </div>

      <!-- CTA empresa -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Precisa de um Sistema?</h3>
        <p class="text-sm text-muted-foreground">
          A <strong>{{ company.name }}</strong> {{ company.tagline.toLowerCase() }}.
        </p>
        <a :href="company.site" target="_blank" rel="noopener noreferrer">
          <BaseButton block>
            <Icon icon="lucide:rocket" class="h-4 w-4" />
            Solicitar Orçamento
          </BaseButton>
        </a>
        <div class="space-y-1 text-sm text-muted-foreground">
          <a
            :href="company.whatsapp.link"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Icon icon="mdi:whatsapp" class="h-4 w-4 text-emerald-500" />
            {{ company.whatsapp.display }}
          </a>
          <a
            :href="company.emailLink"
            class="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Icon icon="lucide:mail" class="h-4 w-4 text-primary" />
            {{ company.email }}
          </a>
        </div>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="border-t">
      <div
        class="container-page flex flex-col items-center justify-between gap-3 py-5 text-center md:flex-row md:text-left"
      >
        <p class="text-sm text-muted-foreground">
          © {{ currentYear }} <strong>DevPlayground</strong>. {{ $t('footer.rights') }}
        </p>
        <p class="text-sm text-muted-foreground">
          {{ developer.credit.replace(developer.label, '') }}
          <a
            :href="company.site"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-primary hover:underline"
          >
            {{ developer.label }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

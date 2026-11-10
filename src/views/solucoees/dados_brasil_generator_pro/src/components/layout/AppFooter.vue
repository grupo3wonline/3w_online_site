<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { siteConfig } from '@/config/site'
import { getToolsByCategory } from '@/data/tools'

const year = new Date().getFullYear()
const topGenerators = getToolsByCategory('gerador').slice(0, 6)
const topValidators = getToolsByCategory('validador').slice(0, 6)

const navLinks = [
  { name: 'Início', to: '/' },
  { name: 'Ferramentas', to: '/#ferramentas' },
  { name: 'Sobre', to: '/#sobre' },
  { name: 'Serviços', to: '/#servicos' },
  { name: 'Contato', to: '/#contato' },
]
const legalLinks = [
  { name: 'Política de Privacidade', to: '/privacidade' },
  { name: 'Termos de Uso', to: '/termos' },
  { name: 'Política de Cookies', to: '/cookies' },
]
</script>

<template>
  <footer class="mt-24 border-t border-border bg-card/40">
    <div class="container-app py-14">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
        <!-- Brand -->
        <div class="col-span-2 lg:col-span-1">
          <div class="mb-4 flex items-center gap-2.5">
            <span class="grid h-9 w-9 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Icon icon="lucide:database-zap" class="h-5 w-5" />
            </span>
            <span class="font-extrabold">Gerador Brasil Pro</span>
          </div>
          <p class="text-sm leading-relaxed text-muted-foreground">
            {{ siteConfig.description }}
          </p>
        </div>

        <!-- Navegação -->
        <nav aria-label="Rodapé - navegação">
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Navegação</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="l in navLinks" :key="l.to">
              <RouterLink :to="l.to" class="text-muted-foreground transition-colors hover:text-primary">
                {{ l.name }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Geradores -->
        <nav aria-label="Rodapé - geradores">
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Geradores</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="t in topGenerators" :key="t.slug">
              <RouterLink
                :to="`/ferramentas/${t.slug}`"
                class="text-muted-foreground transition-colors hover:text-primary"
              >
                {{ t.title }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Validadores -->
        <nav aria-label="Rodapé - validadores">
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Validadores</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="t in topValidators" :key="t.slug">
              <RouterLink
                :to="`/ferramentas/${t.slug}`"
                class="text-muted-foreground transition-colors hover:text-primary"
              >
                {{ t.title }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Legal + Contato -->
        <nav aria-label="Rodapé - legal">
          <h3 class="mb-4 text-sm font-bold uppercase tracking-wider text-foreground">Legal</h3>
          <ul class="space-y-2.5 text-sm">
            <li v-for="l in legalLinks" :key="l.to">
              <RouterLink :to="l.to" class="text-muted-foreground transition-colors hover:text-primary">
                {{ l.name }}
              </RouterLink>
            </li>
          </ul>
          <div class="mt-4 flex gap-3">
            <a
              :href="siteConfig.developer.whatsappLink"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon icon="lucide:message-circle" class="h-5 w-5" />
            </a>
            <a
              :href="`mailto:${siteConfig.developer.email}`"
              aria-label="E-mail"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon icon="lucide:mail" class="h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>

      <!-- Disclaimer -->
      <div class="mt-10 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-muted-foreground">
        <Icon icon="lucide:shield-alert" class="mr-1 inline h-4 w-4 text-amber-500" />
        {{ $t('footer.disclaimer') }}
      </div>

      <!-- Bottom bar -->
      <div
        class="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row"
      >
        <p>© {{ year }} {{ siteConfig.name }}. {{ $t('footer.rights') }}</p>
        <p class="flex items-center gap-1.5">
          {{ $t('footer.developedBy') }}
          <a
            :href="siteConfig.developer.site"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-primary hover:underline"
          >
            {{ siteConfig.developer.name }}
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

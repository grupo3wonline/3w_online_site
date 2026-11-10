<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { TOOLS, COMPANY, NAV_LINKS } from '@/config/site'

const year = new Date().getFullYear()

const socials = [
  { icon: 'fa6-brands:facebook-f', label: 'Facebook', href: COMPANY.site },
  { icon: 'fa6-brands:instagram', label: 'Instagram', href: COMPANY.site },
  { icon: 'fa6-brands:linkedin-in', label: 'LinkedIn', href: COMPANY.site },
  { icon: 'fa6-brands:whatsapp', label: 'WhatsApp', href: COMPANY.whatsappLink },
]
</script>

<template>
  <footer class="border-t bg-muted/40">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Marca -->
        <div class="space-y-4">
          <RouterLink to="/" class="flex items-center gap-2 text-lg font-bold">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-purple-600 text-white"
            >
              <Icon icon="lucide:wrench" class="h-5 w-5" />
            </span>
            Dev Toolkit
          </RouterLink>
          <p class="text-sm text-muted-foreground">
            Ferramentas essenciais para desenvolvedores. Rápido, seguro e 100% no seu navegador.
          </p>
          <div class="flex gap-2">
            <a
              v-for="s in socials"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="s.label"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-input text-muted-foreground transition-colors hover:bg-accent hover:text-primary"
            >
              <Icon :icon="s.icon" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Navegação -->
        <nav aria-label="Navegação do rodapé">
          <h3 class="mb-4 text-sm font-semibold">Navegação</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="link in NAV_LINKS" :key="link.to">
              <RouterLink :to="link.to" class="text-muted-foreground transition-colors hover:text-primary">
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Ferramentas -->
        <nav aria-label="Ferramentas">
          <h3 class="mb-4 text-sm font-semibold">Ferramentas</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="tool in TOOLS" :key="tool.slug">
              <RouterLink
                :to="tool.path"
                class="text-muted-foreground transition-colors hover:text-primary"
              >
                {{ tool.title }}
              </RouterLink>
            </li>
          </ul>
        </nav>

        <!-- Contato + Legal -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">Contato</h3>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                :href="`mailto:${COMPANY.email}`"
                class="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon icon="lucide:mail" class="h-4 w-4" />
                {{ COMPANY.email }}
              </a>
            </li>
            <li>
              <a
                :href="COMPANY.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon icon="fa6-brands:whatsapp" class="h-4 w-4" />
                {{ COMPANY.whatsapp }}
              </a>
            </li>
            <li>
              <a
                :href="COMPANY.site"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon icon="lucide:globe" class="h-4 w-4" />
                www.3wonline.com.br
              </a>
            </li>
          </ul>
          <h3 class="mb-3 mt-6 text-sm font-semibold">Legal</h3>
          <ul class="space-y-2 text-sm">
            <li>
              <RouterLink to="/termos" class="text-muted-foreground transition-colors hover:text-primary">
                Termos de Uso
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/privacidade" class="text-muted-foreground transition-colors hover:text-primary">
                Política de Privacidade
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center text-sm text-muted-foreground md:flex-row md:text-left"
      >
        <p>&copy; {{ year }} Dev Toolkit Suite Essentials. {{ 'Todos os direitos reservados.' }}</p>
        <div class="flex items-center gap-2">
          <Icon icon="lucide:shield-check" class="h-4 w-4 text-[hsl(var(--success))]" />
          <span>Protegido &amp; Seguro</span>
        </div>
      </div>

      <!-- Assinatura do desenvolvedor -->
      <div class="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
        Sistema desenvolvido pelo desenvolvedor
        <a
          :href="COMPANY.site"
          target="_blank"
          rel="noopener noreferrer"
          class="font-semibold text-gradient"
        >
          {{ COMPANY.developer }}
        </a>
      </div>
    </div>
  </footer>
</template>

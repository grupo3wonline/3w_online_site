<script setup lang="ts">
import { site } from '@/config/site'

const currentYear = new Date().getFullYear()

const quickLinks = [
  { to: '/', label: 'Início' },
  { to: '/#sobre', label: 'Sobre' },
  { to: '/#servicos', label: 'Serviços' },
  { to: '/#contato', label: 'Contato' },
]

const legalLinks = [
  { to: '/termos-de-uso', label: 'Termos de Uso' },
  { to: '/politica-de-privacidade', label: 'Política de Privacidade' },
]
</script>

<template>
  <footer class="mesh-bg relative border-t border-border bg-card">
    <div class="container relative z-10 mx-auto px-4 py-14">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        <!-- Brand -->
        <div class="lg:col-span-2">
          <RouterLink to="/" class="group mb-4 flex items-center gap-3">
            <div
              class="flex h-12 w-12 items-center justify-center rounded-2xl gradient-cta shadow-glow transition-transform group-hover:scale-105"
            >
              <i class="fas fa-chart-line text-xl text-white" aria-hidden="true"></i>
            </div>
            <div>
              <h3 class="font-display text-xl font-bold text-foreground">Calculadora</h3>
              <p class="text-sm text-muted-foreground">Marketing Digital</p>
            </div>
          </RouterLink>
          <p class="mb-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Ferramenta gratuita para calcular orçamentos de campanhas de marketing digital. Ideal
            para influenciadores, agências e criadores de conteúdo que buscam precificar seus
            serviços de forma profissional.
          </p>
          <div class="flex gap-3">
            <a
              :href="site.contact.websiteLink"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
              aria-label="Site 3w Online"
            >
              <i class="fas fa-globe" aria-hidden="true"></i>
            </a>
            <a
              :href="site.contact.instagram"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-pink-500/10 hover:text-pink-500"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram" aria-hidden="true"></i>
            </a>
            <a
              :href="site.contact.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-muted-foreground transition-all hover:bg-blue-500/10 hover:text-blue-500"
              aria-label="LinkedIn"
            >
              <i class="fab fa-linkedin-in" aria-hidden="true"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h4 class="mb-4 flex items-center gap-2 font-semibold text-foreground">
            <i class="fas fa-link text-sm text-primary" aria-hidden="true"></i>
            Links Rápidos
          </h4>
          <ul class="space-y-2">
            <li v-for="link in quickLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <i
                  class="fas fa-chevron-right text-xs opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                ></i>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal + Contato -->
        <div>
          <h4 class="mb-4 flex items-center gap-2 font-semibold text-foreground">
            <i class="fas fa-shield-alt text-sm text-primary" aria-hidden="true"></i>
            Legal
          </h4>
          <ul class="space-y-2">
            <li v-for="link in legalLinks" :key="link.to">
              <RouterLink
                :to="link.to"
                class="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
              >
                <i
                  class="fas fa-chevron-right text-xs opacity-0 transition-opacity group-hover:opacity-100"
                  aria-hidden="true"
                ></i>
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>

          <h4 class="mb-3 mt-6 flex items-center gap-2 font-semibold text-foreground">
            <i class="fas fa-headset text-sm text-primary" aria-hidden="true"></i>
            Suporte
          </h4>
          <a
            :href="site.contact.whatsappLink"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <i class="fab fa-whatsapp text-xs" aria-hidden="true"></i>
            {{ site.contact.whatsapp }}
          </a>
          <a
            :href="site.contact.emailLink"
            class="mt-2 flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            <i class="fas fa-envelope text-xs" aria-hidden="true"></i>
            {{ site.contact.email }}
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="relative z-10 border-t border-border">
      <div class="container mx-auto px-4 py-5">
        <div
          class="flex flex-col items-center justify-between gap-3 text-center md:flex-row md:text-left"
        >
          <p class="text-sm text-muted-foreground">
            © {{ currentYear }} {{ site.name }}. Todos os direitos reservados.
          </p>
          <p
            class="flex flex-wrap items-center justify-center gap-1.5 text-sm text-muted-foreground"
          >
            <span>Sistema desenvolvido pelo desenvolvedor</span>
            <a
              :href="site.developer.companyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-primary hover:underline"
            >
              HOTWYL | WILLFROMBRASIL
            </a>
            <span class="text-muted-foreground/50">|</span>
            <a
              :href="site.developer.companyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-medium text-primary hover:underline"
            >
              {{ site.developer.company }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

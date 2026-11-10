<script setup lang="ts">
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { footerNav } from "@/config/navigation";
import { siteConfig, whatsappLink } from "@/config/site";

const year = new Date().getFullYear();
</script>

<template>
  <footer class="mt-auto border-t border-border bg-muted/30">
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
        <!-- Marca -->
        <div class="col-span-2 md:col-span-1">
          <RouterLink to="/" class="mb-3 flex items-center gap-2.5">
            <span
              class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft"
            >
              <Icon icon="lucide:file-check-2" class="h-5 w-5 text-white" />
            </span>
            <span class="font-display text-lg font-bold tracking-tight">
              Empreenda<span class="text-gradient">Fácil</span>
            </span>
          </RouterLink>
          <p class="text-sm text-muted-foreground">
            {{ siteConfig.tagline }}. Simplifique a gestão do seu negócio com ferramentas gratuitas
            e profissionais.
          </p>
        </div>

        <!-- Ferramentas -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">Ferramentas</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="item in footerNav.ferramentas" :key="item.to">
              <RouterLink
                :to="item.to"
                class="text-muted-foreground transition-colors hover:text-primary"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Institucional -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">Institucional</h3>
          <ul class="space-y-2 text-sm">
            <li v-for="item in footerNav.institucional" :key="item.to">
              <RouterLink
                :to="item.to"
                class="text-muted-foreground transition-colors hover:text-primary"
              >
                {{ item.label }}
              </RouterLink>
            </li>
            <li v-for="item in footerNav.legal" :key="item.to">
              <RouterLink
                :to="item.to"
                class="text-muted-foreground transition-colors hover:text-primary"
              >
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contato / Empresa -->
        <div>
          <h3 class="mb-4 text-sm font-semibold">{{ siteConfig.company.name }}</h3>
          <ul class="space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                :href="whatsappLink()"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon icon="lucide:message-circle" class="h-4 w-4" />
                {{ siteConfig.company.whatsappDisplay }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${siteConfig.company.email}`"
                class="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon icon="lucide:mail" class="h-4 w-4" />
                {{ siteConfig.company.email }}
              </a>
            </li>
            <li>
              <a
                :href="siteConfig.company.site"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon icon="lucide:globe" class="h-4 w-4" />
                Site oficial
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
        <p class="mb-1">&copy; {{ year }} {{ siteConfig.name }}. Todos os direitos reservados.</p>
        <p>
          Sistema desenvolvido pelo desenvolvedor
          <a
            :href="siteConfig.developer.github"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-primary hover:underline"
            >{{ siteConfig.developer.name }}</a
          >
          <span class="mx-1">|</span>
          <a
            :href="siteConfig.company.site"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-primary hover:underline"
            >{{ siteConfig.company.name }}</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

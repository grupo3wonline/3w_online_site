<script setup lang="ts">
import { RouterLink, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import AppLogo from "@/components/brand/AppLogo.vue";

const router = useRouter();
const year = new Date().getFullYear();

const WHATSAPP = "5541996924829";
const WHATSAPP_LABEL = "(41) 99692-4829";
const EMAIL = "contato@3wonline.com.br";
const SITE = "https://www.3wonline.com.br";

function goToSection(hash: string) {
  router.push({ name: "home", hash });
}
</script>

<template>
  <footer class="mt-auto border-t border-border bg-muted/40">
    <div class="container-app py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div class="space-y-4">
          <AppLogo :size="34" />
          <p class="text-sm text-muted-foreground">
            A calculadora definitiva para programadores estimarem projetos e gerarem orçamentos
            profissionais.
          </p>
        </div>

        <nav
          class="space-y-4"
          aria-label="Navegação do rodapé - Produto"
        >
          <h4 class="font-semibold text-foreground">
            Produto
          </h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>
              <RouterLink
                :to="{ name: 'tool' }"
                class="transition-colors hover:text-primary"
              >
                Calculadora
              </RouterLink>
            </li>
            <li>
              <button
                class="transition-colors hover:text-primary"
                @click="goToSection('#servicos')"
              >
                Serviços
              </button>
            </li>
            <li>
              <button
                class="transition-colors hover:text-primary"
                @click="goToSection('#sobre')"
              >
                Sobre
              </button>
            </li>
          </ul>
        </nav>

        <nav
          class="space-y-4"
          aria-label="Navegação do rodapé - Legal"
        >
          <h4 class="font-semibold text-foreground">
            Legal
          </h4>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li>
              <RouterLink
                :to="{ name: 'terms' }"
                class="transition-colors hover:text-primary"
              >
                Termos de Uso
              </RouterLink>
            </li>
            <li>
              <RouterLink
                :to="{ name: 'privacy' }"
                class="transition-colors hover:text-primary"
              >
                Política de Privacidade
              </RouterLink>
            </li>
            <li>
              <button
                class="transition-colors hover:text-primary"
                @click="goToSection('#contato')"
              >
                Contato
              </button>
            </li>
          </ul>
        </nav>

        <div class="space-y-4">
          <h4 class="font-semibold text-foreground">
            Contato
          </h4>
          <ul class="space-y-3 text-sm text-muted-foreground">
            <li>
              <a
                :href="`https://wa.me/${WHATSAPP}`"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon
                  icon="fa6-brands:whatsapp"
                  class="h-4 w-4"
                />
                {{ WHATSAPP_LABEL }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${EMAIL}`"
                class="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon
                  icon="lucide:mail"
                  class="h-4 w-4"
                />
                {{ EMAIL }}
              </a>
            </li>
            <li>
              <a
                :href="SITE"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 transition-colors hover:text-primary"
              >
                <Icon
                  icon="lucide:globe"
                  class="h-4 w-4"
                />
                www.3wonline.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-8 space-y-2 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>&copy; {{ year }} Grupo 3w Online. Todos os direitos reservados.</p>
        <p class="text-xs font-medium">
          Sistema desenvolvido pelo desenvolvedor
          <span class="text-primary">HOTWYL | WILLFROMBRASIL</span>
        </p>
      </div>
    </div>
  </footer>
</template>

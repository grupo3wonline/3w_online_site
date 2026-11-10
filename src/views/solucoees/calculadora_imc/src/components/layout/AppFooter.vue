<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border bg-card">
    <div class="container py-10">
      <div class="grid gap-8 md:grid-cols-4">
        <!-- Marca -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span
              class="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-primary"
            >
              <Icon icon="lucide:calculator" class="h-6 w-6 text-primary-foreground" />
            </span>
            <span class="text-xl font-bold">
              Calculadora<span class="text-primary"> IMC</span>
            </span>
          </div>
          <p class="text-sm text-muted-foreground">
            Ferramenta completa e gratuita para calcular IMC, metas de saúde e orientações
            nutricionais personalizadas. 100% no seu dispositivo.
          </p>
        </div>

        <!-- Navegação -->
        <div class="space-y-4">
          <h3 class="font-semibold">Navegação</h3>
          <nav class="flex flex-col gap-2 text-sm" aria-label="Links do rodapé">
            <RouterLink to="/" class="text-muted-foreground transition-colors hover:text-primary">
              Início
            </RouterLink>
            <RouterLink
              to="/calculadora"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              Calculadora
            </RouterLink>
            <RouterLink
              to="/#contato"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              Contato
            </RouterLink>
          </nav>
        </div>

        <!-- Legal -->
        <div class="space-y-4">
          <h3 class="font-semibold">Informações Legais</h3>
          <nav class="flex flex-col gap-2 text-sm" aria-label="Links legais">
            <RouterLink
              to="/termos-de-uso"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              Termos de Uso
            </RouterLink>
            <RouterLink
              to="/politica-de-privacidade"
              class="text-muted-foreground transition-colors hover:text-primary"
            >
              Política de Privacidade
            </RouterLink>
          </nav>
        </div>

        <!-- CTA desenvolvedora -->
        <div class="space-y-4">
          <h3 class="font-semibold">Precisa de um site ou sistema?</h3>
          <p class="text-sm text-muted-foreground">
            O <strong class="text-foreground">Grupo 3W Online</strong> desenvolve sites e sistemas
            personalizados sob demanda.
          </p>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Icon icon="lucide:rocket" class="h-4 w-4" />
            Solicitar orçamento
          </a>
        </div>
      </div>

      <!-- Barra inferior -->
      <div class="mt-8 border-t border-border pt-6">
        <div class="flex flex-col items-center justify-between gap-3 text-center md:flex-row">
          <p class="text-sm text-muted-foreground">
            © {{ currentYear }} Calculadora de IMC. Todos os direitos reservados.
          </p>
          <p class="text-sm text-muted-foreground">
            sistema desenvolvido pelo desenvolvedor
            <span class="font-semibold text-primary">HOTWYL | WILLFROMBRASIL</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

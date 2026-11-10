<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { contato, menuLegal, menuPrincipal, menuSimuladores } from '@/composables/useNavegacao'

const ano = new Date().getFullYear()
const linksRapidos = menuPrincipal
const simuladores = menuSimuladores
const legais = menuLegal
const redes: { rede: string; url: string }[] = [
  { rede: 'facebook', url: contato.site },
  { rede: 'instagram', url: contato.site },
  { rede: 'linkedin', url: contato.site },
  { rede: 'youtube', url: contato.site },
]
</script>

<template>
  <footer class="bg-gradient-hero text-primary-foreground">
    <div class="container py-12 lg:py-16">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <!-- Marca -->
        <div>
          <RouterLink to="/" class="mb-4 flex items-center gap-2">
            <div
              class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/25"
            >
              <Icon icon="lucide:calculator" class="h-6 w-6 text-white" />
            </div>
            <span class="text-xl font-bold">SimuladorPro</span>
          </RouterLink>
          <p class="mb-6 text-sm text-white/80">
            Ferramentas inteligentes para gestão empresarial baseadas em metodologias financeiras
            consolidadas. Decisões estratégicas com dados precisos.
          </p>
          <div class="mb-6 flex gap-4">
            <a
              v-for="r in redes"
              :key="r.rede"
              :href="r.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-white/80 transition-colors hover:text-white"
              :aria-label="r.rede"
            >
              <Icon :icon="`fa6-brands:${r.rede}`" class="h-5 w-5" />
            </a>
          </div>

          <!-- Contato rápido -->
          <ul class="space-y-2 text-sm">
            <li>
              <a
                :href="contato.whatsappUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Icon icon="fa6-brands:whatsapp" class="h-4 w-4" />{{ contato.whatsappLabel }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${contato.email}`"
                class="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
              >
                <Icon icon="lucide:mail" class="h-4 w-4" />{{ contato.email }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Navegação -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Navegação</h3>
          <ul class="space-y-2">
            <li v-for="link in linksRapidos" :key="link.to">
              <RouterLink
                :to="link.to"
                class="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <Icon :icon="link.icon" class="h-4 w-4 opacity-70" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Simuladores -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Simuladores</h3>
          <ul class="space-y-2">
            <li v-for="item in simuladores" :key="item.to">
              <RouterLink
                :to="item.to"
                class="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <Icon :icon="item.icon" class="h-4 w-4 opacity-70" />
                {{ item.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal + desenvolvedor -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Legal</h3>
          <ul class="mb-6 space-y-2">
            <li v-for="link in legais" :key="link.to">
              <RouterLink
                :to="link.to"
                class="flex items-center gap-2 text-sm text-white/80 transition-colors hover:text-white"
              >
                <Icon :icon="link.icon" class="h-4 w-4 opacity-70" />
                {{ link.label }}
              </RouterLink>
            </li>
          </ul>
          <div class="border-t border-white/20 pt-4">
            <h4 class="mb-2 text-sm font-medium">Desenvolvido por</h4>
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-white transition-colors hover:text-accent"
            >
              Grupo 3w Online
            </a>
            <p class="mt-1 text-xs text-white/60">Sites e sistemas personalizados sob demanda</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="border-t border-white/10">
      <div class="container py-6">
        <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div class="text-center md:text-left">
            <p class="text-sm text-white/80">
              © {{ ano }} SimuladorPro. Todos os direitos reservados.
            </p>
            <p class="mt-1 text-xs text-white/60">
              Sistema desenvolvido pelo desenvolvedor
              <strong class="text-white/80">HOTWYL | WILLFROMBRASIL</strong>
            </p>
          </div>
          <div class="flex items-center gap-4 text-xs text-white/60">
            <span class="flex items-center gap-1">
              <Icon icon="lucide:shield-check" class="h-4 w-4" />
              Dados seguros
            </span>
            <span class="flex items-center gap-1">
              <Icon icon="lucide:lock" class="h-4 w-4" />
              Processamento local
            </span>
          </div>
        </div>
        <div class="mt-4 border-t border-white/10 pt-4 text-center">
          <p class="text-xs text-white/50">
            <Icon icon="lucide:triangle-alert" class="mr-1 inline h-3 w-3" />
            Ferramenta destinada apenas para simulações. Consulte sempre um profissional para
            decisões estratégicas.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { SITE } from '@/lib/utils'

const currentYear = new Date().getFullYear()

const footerLinks = {
  navegacao: [
    { name: 'Início', to: '/' },
    { name: 'Ferramentas', to: '/ferramentas' },
    { name: 'Contato', to: '/#contato' },
  ],
  legal: [
    { name: 'Termos de Uso', to: '/termos' },
    { name: 'Privacidade', to: '/privacidade' },
  ],
}

const social = [
  { icon: 'fa6-brands:whatsapp', url: SITE.whatsappLink, label: 'WhatsApp' },
  { icon: 'fa6-solid:envelope', url: `mailto:${SITE.email}`, label: 'E-mail' },
  { icon: 'fa6-solid:globe', url: SITE.companyUrl, label: 'Website' },
]
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <!-- CTA Banner -->
    <div class="bg-gradient-to-r from-violet-600 to-indigo-600">
      <div class="container mx-auto px-4 py-8 md:py-12">
        <div
          class="flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left"
        >
          <div>
            <h3 class="mb-2 text-xl font-bold text-white md:text-2xl">
              <Icon
                icon="lucide:rocket"
                class="mr-2 inline h-6 w-6"
              />
              Transforme Sua Presença Digital
            </h3>
            <p class="max-w-lg text-sm text-violet-100 md:text-base">
              O {{ SITE.company }} desenvolve sites e sistemas personalizados sob demanda. Conte com
              especialistas para elevar seu negócio ao próximo nível.
            </p>
          </div>
          <a
            :href="SITE.ctaUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center whitespace-nowrap rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-xl transition-all hover:bg-violet-50 hover:shadow-2xl"
          >
            <Icon
              icon="lucide:external-link"
              class="mr-2 h-4 w-4"
            />
            Solicite um Orçamento
          </a>
        </div>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="container mx-auto px-4 py-10 md:py-14">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <!-- Marca -->
        <div>
          <RouterLink
            to="/"
            class="mb-4 flex items-center gap-3"
          >
            <div class="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 p-2.5 shadow-lg">
              <Icon
                icon="lucide:calculator"
                class="h-5 w-5 text-white"
              />
            </div>
            <div class="leading-tight">
              <span class="block text-base font-bold text-white">Calculadora Social</span>
              <span class="text-[10px] font-medium text-gray-500">por 3W Online</span>
            </div>
          </RouterLink>
          <p class="mb-4 text-sm leading-relaxed text-gray-400">
            Calculadora profissional e gratuita para gestão de redes sociais. Descubra o valor ideal
            dos seus serviços.
          </p>
          <div class="flex gap-3">
            <a
              v-for="item in social"
              :key="item.label"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition-all hover:scale-110 hover:bg-violet-600 hover:shadow-lg"
              :aria-label="item.label"
            >
              <Icon
                :icon="item.icon"
                class="h-4 w-4"
              />
            </a>
          </div>
        </div>

        <!-- Navegação -->
        <div>
          <h4 class="mb-4 flex items-center gap-2 text-sm font-bold text-white">
            <Icon
              icon="lucide:compass"
              class="h-4 w-4 text-violet-400"
            />
            Navegação
          </h4>
          <ul class="space-y-2.5">
            <li
              v-for="link in footerLinks.navegacao"
              :key="link.to"
            >
              <RouterLink
                :to="link.to"
                class="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="mb-4 flex items-center gap-2 text-sm font-bold text-white">
            <Icon
              icon="lucide:shield-check"
              class="h-4 w-4 text-violet-400"
            />
            Legal
          </h4>
          <ul class="space-y-2.5">
            <li
              v-for="link in footerLinks.legal"
              :key="link.to"
            >
              <RouterLink
                :to="link.to"
                class="text-sm text-gray-400 transition-colors hover:text-white"
              >
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contato -->
        <div>
          <h4 class="mb-4 flex items-center gap-2 text-sm font-bold text-white">
            <Icon
              icon="lucide:phone"
              class="h-4 w-4 text-violet-400"
            />
            Contato
          </h4>
          <ul class="space-y-2.5 text-sm">
            <li>
              <a
                :href="SITE.whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
              >
                <Icon
                  icon="fa6-brands:whatsapp"
                  class="h-4 w-4 text-green-500"
                />
                {{ SITE.whatsappDisplay }}
              </a>
            </li>
            <li>
              <a
                :href="`mailto:${SITE.email}`"
                class="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
              >
                <Icon
                  icon="lucide:mail"
                  class="h-4 w-4 text-violet-400"
                />
                {{ SITE.email }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="border-t border-gray-800">
      <div class="container mx-auto px-4 py-5">
        <div class="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p class="text-center text-xs text-gray-500 md:text-left">
            © {{ currentYear }} {{ SITE.name }}. Sistema desenvolvido pelo desenvolvedor
            <a
              :href="SITE.companyUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="font-semibold text-violet-400 transition-colors hover:text-violet-300"
            >
              HOTWYL | WILLFROMBRASIL
            </a>
          </p>
          <p class="flex items-center gap-1 text-xs text-gray-500">
            <Icon
              icon="lucide:shield-check"
              class="h-4 w-4 text-green-500"
            />
            LGPD · GDPR · CCPA · POPIA
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

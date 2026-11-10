<template>
  <footer class="bg-gray-900 dark:bg-gray-950 text-white">
    <!-- CTA Section -->
    <div class="gradient-hero py-12">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-2xl lg:text-3xl font-bold text-white mb-4">
          Precisa de um site ou sistema personalizado?
        </h3>
        <p class="text-white/80 mb-6 max-w-2xl mx-auto">
          O Grupo 3W Online desenvolve sites e sistemas sob demanda para sua empresa.
          Transforme suas ideias em soluções digitais de sucesso!
        </p>
        <a
          href="https://www.3wonline.com.br"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-lg hover:bg-white/90 transition-colors"
        >
          <i class="fa-solid fa-globe"></i>
          Conheça a 3W Online
        </a>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        <!-- Brand -->
        <div class="space-y-4">
          <router-link to="/" class="flex items-center space-x-3">
            <div class="bg-white/10 rounded-xl p-2">
              <i class="fa-solid fa-calculator text-white text-lg"></i>
            </div>
            <div>
              <span class="text-lg font-bold">Calculadora</span>
              <span class="text-lg font-bold text-primary-400 ml-1">Empresarial</span>
            </div>
          </router-link>
          <p class="text-white/70 text-sm leading-relaxed">
            Ferramentas profissionais e gratuitas para empreendedores tomarem
            decisões financeiras inteligentes.
          </p>

          <!-- Social Links -->
          <div class="flex gap-3 pt-2">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
              :aria-label="social.label"
            >
              <i :class="social.icon" class="text-lg"></i>
            </a>
          </div>
        </div>

        <!-- Ferramentas -->
        <div>
          <h4 class="font-semibold text-white mb-4">Ferramentas</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.ferramentas" :key="link.path">
              <router-link
                :to="link.path"
                class="text-white/70 hover:text-white text-sm transition-colors"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Empresa -->
        <div>
          <h4 class="font-semibold text-white mb-4">Empresa</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.empresa" :key="link.path">
              <router-link
                :to="link.path"
                class="text-white/70 hover:text-white text-sm transition-colors"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-semibold text-white mb-4">Legal</h4>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.legal" :key="link.path">
              <router-link
                :to="link.path"
                class="text-white/70 hover:text-white text-sm transition-colors"
              >
                {{ link.label }}
              </router-link>
            </li>
          </ul>

          <!-- Contato direto -->
          <div class="mt-6 space-y-2 border-t border-white/10 pt-4">
            <a
              :href="`mailto:${company.email}`"
              class="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <i class="fa-solid fa-envelope"></i>
              {{ company.email }}
            </a>
            <a
              :href="contatoSocial.whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
            >
              <i class="fa-brands fa-whatsapp"></i>
              {{ company.whatsappDisplay }}
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="border-t border-white/10">
      <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p class="text-sm text-white/60">
            © {{ currentYear }} Calculadora Empresarial. Todos os direitos reservados.
          </p>
          <p class="flex items-center gap-1 text-sm text-white/60">
            Sistema desenvolvido pelo desenvolvedor
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="ml-1 font-medium text-white transition-colors hover:text-primary-400"
            >
              HOTWYL | WILLFROMBRASIL
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { SITE } from '@/config/site'

const currentYear = new Date().getFullYear()
const company = SITE.company
const contatoSocial = SITE.social

const socialLinks = [
  { icon: 'fa-brands fa-facebook-f', url: SITE.social.facebook, label: 'Facebook' },
  { icon: 'fa-brands fa-instagram', url: SITE.social.instagram, label: 'Instagram' },
  { icon: 'fa-brands fa-linkedin-in', url: SITE.social.linkedin, label: 'LinkedIn' },
  { icon: 'fa-brands fa-whatsapp', url: SITE.social.whatsapp, label: 'WhatsApp' }
]

const footerLinks = {
  ferramentas: [
    { label: 'Calculadora de Juros', path: '/calculadora-juros' },
    { label: 'Preço de Produto', path: '/calculadora-produto' },
    { label: 'Valor da Hora', path: '/calculadora-hora' },
    { label: 'Todas as Calculadoras', path: '/calculadoras' }
  ],
  empresa: [
    { label: 'Início', path: '/' },
    { label: 'Sobre Nós', path: '/sobre' },
    { label: 'Contato', path: '/contato' }
  ],
  legal: [
    { label: 'Termos de Uso', path: '/termos' },
    { label: 'Política de Privacidade', path: '/privacidade' }
  ]
}
</script>

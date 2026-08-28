<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        <!-- Company Info -->
        <div class="space-y-4">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/20">
              <span class="text-white font-black text-xs">3W</span>
            </div>
            <div>
              <span class="text-base font-bold text-white block leading-tight">Grupo 3W Online</span>
            </div>
          </div>
          <p class="text-gray-400 text-xs leading-relaxed">
            Sua parceira estratégica em marketing digital, desenvolvimento de sites, sistemas sob medida e automação com IA. Resultados reais e comprovados.
          </p>

          <!-- Trust Badges -->
          <div class="flex flex-wrap gap-2 pt-1">
            <span class="inline-flex items-center px-2 py-1 bg-green-950/60 border border-green-700/50 rounded text-[10px] text-green-400 font-medium">
              <Icon icon="mdi:shield-check" class="w-3.5 h-3.5 mr-1" />
              LGPD • GDPR • CCPA • POPIA
            </span>
            <span class="inline-flex items-center px-2 py-1 bg-blue-950/60 border border-blue-700/50 rounded text-[10px] text-blue-400 font-medium">
              <Icon icon="mdi:google" class="w-3.5 h-3.5 mr-1" />
              Google Partner
            </span>
          </div>

          <!-- Social Links -->
          <div class="flex items-center gap-2 pt-2">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-8 h-8 bg-slate-800 hover:bg-primary-600 rounded-full flex items-center justify-center text-gray-300 hover:text-white transition-colors"
              :aria-label="social.label"
            >
              <Icon :icon="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="footer-title">NAVEGAÇÃO</h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.path">
              <RouterLink :to="link.path" class="footer-link text-xs flex items-center gap-1.5">
                <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-primary-500" />
                <span>{{ link.label }}</span>
                <span v-if="link.badge" class="ml-1 px-1.5 py-0.2 bg-secondary-500/20 text-secondary-300 text-[9px] font-bold rounded">
                  {{ link.badge }}
                </span>
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="footer-title">SERVIÇOS EM DESTAQUE</h3>
          <ul class="space-y-2">
            <li v-for="service in serviceLinks" :key="service.path">
              <RouterLink :to="service.path" class="footer-link text-xs flex items-center gap-1.5">
                <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-primary-500" />
                {{ service.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Contact & Location -->
        <div>
          <h3 class="footer-title">CONTATO & ATENDIMENTO</h3>
          <ul class="space-y-2.5">
            <li class="flex items-center gap-2 text-xs text-gray-300">
              <Icon icon="mdi:phone" class="w-4 h-4 text-primary-400 shrink-0" />
              <a href="tel:+5541996924829" class="footer-link">(41) 99692-4829</a>
            </li>
            <li class="flex items-center gap-2 text-xs text-gray-300">
              <Icon icon="mdi:email-outline" class="w-4 h-4 text-primary-400 shrink-0" />
              <a href="mailto:contato@3wonline.com.br" class="footer-link">contato@3wonline.com.br</a>
            </li>
            <li class="flex items-start gap-2 text-xs text-gray-300">
              <Icon icon="mdi:map-marker-outline" class="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
              <span>Curitiba, Paraná — Brasil (Atendimento Global & Remoto)</span>
            </li>
            <li class="flex items-center gap-2 text-xs text-gray-300">
              <Icon icon="mdi:clock-outline" class="w-4 h-4 text-primary-400 shrink-0" />
              <span>Seg–Sex: 8h às 18h</span>
            </li>
          </ul>

          <div class="mt-4 pt-2">
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de falar com um especialista da 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors shadow-sm w-full justify-center"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-slate-800/80 pt-6 mt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-xs text-center md:text-left">
            © {{ currentYear }} Grupo 3W Online. Todos os direitos reservados.
          </p>
          <div class="flex flex-wrap justify-center items-center gap-4 text-xs">
            <RouterLink to="/privacidade" class="footer-link">Política de Privacidade Global</RouterLink>
            <span class="text-gray-700">•</span>
            <RouterLink to="/termos" class="footer-link">Termos de Uso</RouterLink>
            <span class="text-gray-700">•</span>
            <RouterLink to="/regulamento" class="footer-link">Regulamento</RouterLink>
            <span class="text-gray-700">•</span>
            <RouterLink to="/pagamento" class="footer-link">Pagamento</RouterLink>
            <span class="text-gray-700">•</span>
            <button
              @click="openPreferences"
              class="footer-link text-primary-400 hover:text-primary-300 font-semibold cursor-pointer underline flex items-center gap-1"
            >
              <Icon icon="mdi:cookie-cog-outline" class="w-3.5 h-3.5" />
              Preferências de Privacidade
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { usePrivacyConsent } from '@/composables/usePrivacyConsent'

const { openPreferences } = usePrivacyConsent()
const currentYear = new Date().getFullYear()

const navLinks = [
  { path: '/', label: 'Página Inicial' },
  { path: '/sobre', label: 'Sobre Nós' },
  { path: '/servicos', label: 'Nossos Serviços' },
  { path: '/ferramentas', label: 'Ferramentas Gratuitas', badge: '120+' },
  { path: '/institucional', label: 'Institucional' },
  { path: '/contato', label: 'Fale Conosco' },
]

const serviceLinks = [
  { path: '/servicos/criacao-sites', label: 'Criação de Sites' },
  { path: '/servicos/criacao-sistemas', label: 'Sistemas Web Sob Medida' },
  { path: '/servicos/automacao-ia', label: 'Automação & IA' },
  { path: '/servicos/gestao-anuncios', label: 'Gestão de Anúncios (Ads)' },
  { path: '/servicos/gestao-redes-sociais', label: 'Gestão de Redes Sociais' },
  { path: '/servicos/marketing-digital', label: 'Marketing Digital' },
  { path: '/servicos/desenvolvimento-apps', label: 'Apps Mobile' },
  { path: '/servicos/design-grafico', label: 'Design Gráfico' },
]

const socialLinks = [
  { label: 'Instagram', url: 'https://www.instagram.com/grupo3wonline', icon: 'mdi:instagram' },
  { label: 'Facebook', url: 'https://www.facebook.com/grupo3wonline', icon: 'mdi:facebook' },
  { label: 'WhatsApp', url: 'https://wa.me/5541996924829', icon: 'mdi:whatsapp' },
]
</script>

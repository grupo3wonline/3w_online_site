<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <!-- Main Footer Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Company Info -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xs">3W</span>
            </div>
            <span class="text-lg font-bold">Grupo 3W Online</span>
          </div>
          <p class="text-gray-400 text-sm mb-4 leading-relaxed">
            Sua parceira estratégica em marketing digital, desenvolvimento web e soluções
            tecnológicas que geram resultados reais.
          </p>
          <!-- Trust Badges -->
          <div class="flex flex-wrap gap-2 mb-4">
            <span class="inline-flex items-center px-2 py-1 bg-green-900/30 border border-green-700/50 rounded text-[10px] text-green-400 font-medium">
              <Icon icon="mdi:shield-check" class="w-3 h-3 mr-1" />
              LGPD Conformidade
            </span>
            <span class="inline-flex items-center px-2 py-1 bg-blue-900/30 border border-blue-700/50 rounded text-[10px] text-blue-400 font-medium">
              <Icon icon="mdi:google" class="w-3 h-3 mr-1" />
              Google Partner
            </span>
          </div>
          <!-- Social Links -->
          <div class="flex gap-3">
            <a v-for="social in socialLinks" :key="social.label" :href="social.url" target="_blank" rel="noopener noreferrer" class="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors" :aria-label="social.label">
              <Icon :icon="social.icon" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Navigation -->
        <div>
          <h3 class="footer-title">NAVEGAÇÃO</h3>
          <ul class="space-y-2">
            <li v-for="link in navLinks" :key="link.path">
              <RouterLink :to="link.path" class="footer-link text-sm flex items-center gap-1">
                <span class="text-gray-500">›</span> {{ link.label }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Services -->
        <div>
          <h3 class="footer-title">SERVIÇOS</h3>
          <ul class="space-y-2">
            <li v-for="service in serviceLinks" :key="service.path">
              <RouterLink :to="service.path" class="footer-link text-sm flex items-center gap-1">
                <span class="text-gray-500">›</span> {{ service.label }}
              </RouterLink>
            </li>
          </ul>

        </div>

        <!-- Contact -->
        <div>
          <h3 class="footer-title">CONTATO</h3>
          <ul class="space-y-3">
            <li class="flex items-center gap-2 text-sm text-gray-300">
              <Icon icon="mdi:phone" class="w-4 h-4 text-primary-400 flex-shrink-0" />
              <a href="tel:+5541996924829" class="footer-link">(41) 99692-4829</a>
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-300">
              <Icon icon="mdi:email" class="w-4 h-4 text-primary-400 flex-shrink-0" />
              <a href="mailto:contato@3wonline.com.br" class="footer-link">contato@3wonline.com.br</a>
            </li>
            <li class="flex items-start gap-2 text-sm text-gray-300">
              <Icon icon="mdi:map-marker" class="w-4 h-4 text-primary-400 flex-shrink-0 mt-0.5" />
              <span>Curitiba, Paraná — Brasil</span>
            </li>
            <li class="flex items-center gap-2 text-sm text-gray-300">
              <Icon icon="mdi:clock-outline" class="w-4 h-4 text-primary-400 flex-shrink-0" />
              <span>Seg–Sex: 8h–18h</span>
            </li>
          </ul>
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de saber mais sobre os serviços da 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4" />
            Falar no WhatsApp
          </a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="border-t border-gray-800 pt-6 mt-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-500 text-xs text-center md:text-left">
            © {{ currentYear }} Grupo 3W Online. Todos os direitos reservados.
          </p>
          <div class="flex flex-wrap justify-center gap-3 text-xs">
            <RouterLink to="/privacidade" class="footer-link">Privacidade</RouterLink>
            <span class="text-gray-700">•</span>
            <RouterLink to="/termos" class="footer-link">Termos de Uso</RouterLink>
            <span class="text-gray-700">•</span>
            <RouterLink to="/regulamento" class="footer-link">Regulamento</RouterLink>
          </div>
        </div>
        <!-- Developer Credit -->
        <p class="text-center text-gray-600 text-[11px] mt-4">
          Sistema desenvolvido pelo desenvolvedor
          <span class="text-primary-400 font-semibold">HOTWYL</span> |
          <span class="text-primary-400 font-semibold">WILLFROMBRASIL</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const currentYear = new Date().getFullYear()

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/sobre', label: 'Sobre Nós' },
  { path: '/institucional', label: 'Institucional' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/contato', label: 'Contato' },
  { path: '/servicos/consultoria-marketing', label: 'Consultoria' },
]

const serviceLinks = [
  { path: '/servicos/gestao-redes-sociais', label: 'Redes Sociais' },
  { path: '/servicos/gestao-anuncios', label: 'Gestão de Anúncios' },
  { path: '/servicos/criacao-sites', label: 'Criação de Sites' },
  { path: '/servicos/desenvolvimento-apps', label: 'Apps Mobile' },
  { path: '/servicos/design-grafico', label: 'Design Gráfico' },
  { path: '/servicos/marketing-digital', label: 'Marketing Digital' },
  { path: '/servicos/criacao-sistemas', label: 'Sistemas Web' },
  { path: '/servicos/automacao-ia', label: 'Automação e IA' },
]

const socialLinks = [
  { label: 'Facebook', url: 'https://www.facebook.com/grupo3wonline', icon: 'mdi:facebook' },
  { label: 'Instagram', url: 'https://www.instagram.com/grupo3wonline', icon: 'mdi:instagram' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/company/grupo3wonline', icon: 'mdi:linkedin' },
  { label: 'YouTube', url: 'https://www.youtube.com/@grupo3wonline', icon: 'mdi:youtube' },
  { label: 'WhatsApp', url: 'https://wa.me/5541996924829', icon: 'mdi:whatsapp' },
]
</script>

<script setup>
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()

const footerLinks = {
  ferramenta: [
    { name: 'Conversor', path: '/#ferramenta' },
    { name: 'Tabela de Referência', path: '/#tabela' },
    { name: 'Como Usar', path: '/sobre#como-usar' }
  ],
  empresa: [
    { name: 'Sobre Nós', path: '/sobre' },
    { name: 'Contato', path: '/contato' },
    { name: 'Grupo 3W Online', url: 'https://www.3wonline.com.br', external: true }
  ],
  legal: [
    { name: 'Termos de Uso', path: '/termos-de-uso' },
    { name: 'Política de Privacidade', path: '/politica-de-privacidade' }
  ]
}

const socialLinks = [
  { name: 'Website', icon: 'fas fa-globe', url: 'https://www.3wonline.com.br' },
  { name: 'LinkedIn', icon: 'fab fa-linkedin', url: 'https://www.linkedin.com/company/3wonline' },
  { name: 'Instagram', icon: 'fab fa-instagram', url: 'https://www.instagram.com/3wonline' }
]
</script>

<template>
  <footer class="bg-gray-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800">
    <!-- Main Footer -->
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        <!-- Brand Section -->
        <div class="lg:col-span-1">
          <RouterLink to="/" class="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <i class="fas fa-code text-blue-500"></i>
            Entity Converter Pro
          </RouterLink>
          <p class="text-gray-400 text-sm mb-4">
            Ferramenta profissional e gratuita para conversão de caracteres especiais em HTML Entities. 
            100% Client-Side, segura e em conformidade com a LGPD.
          </p>
          <div class="flex gap-3">
            <a 
              v-for="social in socialLinks" 
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center transition-colors duration-200"
              :title="social.name"
              :aria-label="social.name"
            >
              <i :class="social.icon"></i>
            </a>
          </div>
        </div>

        <!-- Ferramenta Links -->
        <div>
          <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-wrench text-blue-500"></i>
            Ferramenta
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.ferramenta" :key="link.name">
              <a 
                :href="link.path"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <i class="fas fa-chevron-right text-xs text-blue-500"></i>
                {{ link.name }}
              </a>
            </li>
          </ul>
        </div>

        <!-- Empresa Links -->
        <div>
          <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-building text-blue-500"></i>
            Empresa
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.empresa" :key="link.name">
              <a 
                v-if="link.external"
                :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <i class="fas fa-chevron-right text-xs text-blue-500"></i>
                {{ link.name }}
                <i class="fas fa-external-link-alt text-xs"></i>
              </a>
              <RouterLink 
                v-else
                :to="link.path"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <i class="fas fa-chevron-right text-xs text-blue-500"></i>
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Legal Links -->
        <div>
          <h3 class="text-white font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-balance-scale text-blue-500"></i>
            Legal
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks.legal" :key="link.name">
              <RouterLink 
                :to="link.path"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2"
              >
                <i class="fas fa-chevron-right text-xs text-blue-500"></i>
                {{ link.name }}
              </RouterLink>
            </li>
          </ul>
          
          <!-- LGPD Badge -->
          <div class="mt-4 p-3 bg-green-900/30 border border-green-800 rounded-lg">
            <p class="text-green-400 text-xs flex items-center gap-2">
              <i class="fas fa-shield-alt"></i>
              Em conformidade com a LGPD
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Footer -->
    <div class="border-t border-gray-800">
      <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div class="text-gray-400 text-center md:text-left">
            <p>&copy; {{ currentYear }} Entity Converter Pro. Todos os direitos reservados.</p>
            <p class="mt-1">
              Sistema desenvolvido pelo desenvolvedor 
              <span class="text-blue-400 font-semibold">hotwyl - willfrombrasil</span>
            </p>
          </div>
          
          <div class="flex items-center gap-2 text-gray-400">
            <span>Desenvolvido por</span>
            <a 
              href="https://www.3wonline.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              <i class="fas fa-rocket"></i>
              Grupo 3W Online
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>


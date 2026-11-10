<template>
  <footer class="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Main Footer Content -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- Sobre a Ferramenta -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3 mb-4">
            <div class="relative">
              <i class="fas fa-image text-2xl text-red-500"></i>
              <i class="fab fa-youtube absolute -bottom-1 -right-1 text-xs text-red-500"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold">3w OmniHub</h3>
              <p class="text-xs text-gray-400">Thumbnail YouTube</p>
            </div>
          </div>
          <p class="text-sm text-gray-400 leading-relaxed">
            A melhor ferramenta para baixar miniaturas do YouTube em alta qualidade. 
            <span class="text-red-500 font-semibold">100% gratuita</span>, rápida e fácil de usar.
          </p>
          <div class="flex space-x-3">
            <a href="https://www.facebook.com/3wonline" target="_blank" rel="noopener noreferrer" 
               class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
               title="Facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/3wonline" target="_blank" rel="noopener noreferrer" 
               class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
               title="Instagram">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/company/3wonline" target="_blank" rel="noopener noreferrer" 
               class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-red-600 transition-colors duration-300"
               title="LinkedIn">
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Links Rápidos -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-red-500">
            <i class="fas fa-link mr-2"></i>Links Rápidos
          </h3>
          <ul class="space-y-3 text-sm">
            <li>
              <router-link to="/" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                <i class="fas fa-chevron-right text-xs mr-2 text-red-500"></i>Início
              </router-link>
            </li>
            <li>
              <router-link to="/tool" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                <i class="fas fa-chevron-right text-xs mr-2 text-red-500"></i>Ferramenta
              </router-link>
            </li>
            <li>
              <router-link to="/sobre" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                <i class="fas fa-chevron-right text-xs mr-2 text-red-500"></i>Sobre
              </router-link>
            </li>
            <li>
              <router-link to="/contato" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                <i class="fas fa-chevron-right text-xs mr-2 text-red-500"></i>Contato
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-red-500">
            <i class="fas fa-shield-alt mr-2"></i>Legal
          </h3>
          <ul class="space-y-3 text-sm">
            <li>
              <router-link to="/politica-privacidade" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                <i class="fas fa-chevron-right text-xs mr-2 text-red-500"></i>Política de Privacidade
              </router-link>
            </li>
            <li>
              <router-link to="/termos-uso" class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-all duration-200">
                <i class="fas fa-chevron-right text-xs mr-2 text-red-500"></i>Termos de Uso
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Grupo 3w Online -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-red-500">
            <i class="fas fa-building mr-2"></i>Desenvolvedor
          </h3>
          <p class="text-sm text-gray-400 mb-4 leading-relaxed">
            Desenvolvido por <span class="text-white font-semibold">Grupo 3w Online</span>
          </p>
          <p class="text-xs text-gray-500 mb-4">
            Desenvolvemos sites e sistemas personalizados sob demanda.
          </p>
          <a 
            href="https://www.3wonline.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors duration-300"
          >
            <i class="fas fa-external-link-alt mr-2"></i>Visite nosso site
          </a>
          <p class="text-xs text-gray-500 mt-4">
            Sistema desenvolvido pelo desenvolvedor 
            <span class="text-red-400 font-medium">HotWyl - WillFromBrasil</span>
          </p>
        </div>
      </div>

      <!-- Bottom Footer -->
      <div class="pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p class="text-gray-400 text-center md:text-left">
            © {{ currentYear }} 3w OmniHub - Thumbnail YouTube Downloader. 
            <span class="hidden sm:inline">Todos os direitos reservados.</span>
          </p>
          
          <div class="flex items-center gap-4">
            <router-link 
              to="/politica-privacidade" 
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Privacidade
            </router-link>
            <span class="text-gray-600">|</span>
            <router-link 
              to="/termos-uso" 
              class="text-gray-400 hover:text-white transition-colors duration-200"
            >
              Termos
            </router-link>
            <span class="text-gray-600">|</span>
            <a 
              href="https://www.3wonline.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              class="text-red-400 hover:text-white transition-colors duration-200 flex items-center"
            >
              <i class="fas fa-heart text-red-500 mr-1 animate-pulse"></i>
              Grupo 3w Online
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

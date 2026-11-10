<template>
  <footer class="bg-gray-900 dark:bg-black text-gray-300 py-12 mt-20 border-t-4 border-blue-600 dark:border-blue-400">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <!-- About -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <i class="fas fa-image text-2xl text-blue-500"></i>
            <h3 class="text-white font-bold text-lg">3w OmniHub</h3>
          </div>
          <p class="text-sm text-gray-400 mb-4 leading-relaxed">
            Adicione marca d'água profissional em suas imagens de forma rápida,
            fácil e totalmente gratuita. 100% processado no navegador,
            garantindo sua privacidade e segurança.
          </p>
          <div class="flex gap-3">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              title="Site do Grupo 3w Online"
            >
              <i class="fas fa-globe text-lg"></i>
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              title="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              title="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors duration-300"
              title="LinkedIn"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <i class="fas fa-link text-blue-500"></i>
            Links Rápidos
          </h3>
          <ul class="space-y-3 text-sm">
            <li>
              <router-link
                to="/"
                class="hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs text-gray-600 group-hover:text-blue-400 transition-colors"></i>
                Início
              </router-link>
            </li>
            <li>
              <router-link
                to="/app"
                class="hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs text-gray-600 group-hover:text-blue-400 transition-colors"></i>
                Aplicação
              </router-link>
            </li>
            <li>
              <router-link
                to="/sobre"
                class="hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs text-gray-600 group-hover:text-blue-400 transition-colors"></i>
                Sobre
              </router-link>
            </li>
            <li>
              <router-link
                to="/contato"
                class="hover:text-blue-400 transition-colors flex items-center gap-2 group"
              >
                <i class="fas fa-chevron-right text-xs text-gray-600 group-hover:text-blue-400 transition-colors"></i>
                Contato
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Features -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <i class="fas fa-check-circle text-blue-500"></i>
            Recursos
          </h3>
          <ul class="space-y-3 text-sm">
            <li class="flex items-center gap-2">
              <i class="fas fa-check text-green-500"></i>
              100% Gratuito
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-check text-green-500"></i>
              Processamento Local
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-check text-green-500"></i>
              Sem Cadastro
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-check text-green-500"></i>
              Sem Limites
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-check text-green-500"></i>
              100% Seguro
            </li>
            <li class="flex items-center gap-2">
              <i class="fas fa-check text-green-500"></i>
              Responsivo
            </li>
          </ul>
        </div>

        <!-- Company Info -->
        <div>
          <h3 class="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <i class="fas fa-building text-blue-500"></i>
            Grupo 3w Online
          </h3>
          <p class="text-sm text-gray-400 mb-4 leading-relaxed">
            Desenvolvemos sites e sistemas personalizados sob demanda. Soluções
            tecnológicas inovadoras para o seu negócio.
          </p>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
          >
            <i class="fas fa-external-link-alt"></i>
            Conheça nossos serviços
          </a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div
        class="border-t border-gray-800 pt-6 text-center text-sm text-gray-500"
      >
        <div class="flex flex-wrap justify-center gap-4 mb-4">
          <router-link
            to="/termos-de-uso"
            class="hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <i class="fas fa-file-contract text-xs"></i>
            Termos de Uso
          </router-link>
          <span class="text-gray-700">•</span>
          <router-link
            to="/politica-de-privacidade"
            class="hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <i class="fas fa-shield-alt text-xs"></i>
            Política de Privacidade
          </router-link>
        </div>
        
        <div class="space-y-2">
          <p class="flex items-center justify-center gap-2 flex-wrap">
            &copy; {{ currentYear }} 3w OmniHub - Marca D'água Pro. Todos os direitos reservados.
          </p>
          <p class="flex items-center justify-center gap-2 text-xs">
            <i class="fas fa-code text-blue-500"></i>
            Sistema desenvolvido pelo desenvolvedor 
            <span class="font-semibold text-blue-400">hotwyl - willfrombrasil</span>
          </p>
          <p class="mt-2 flex items-center justify-center gap-1">
            Desenvolvido com
            <i class="fas fa-heart text-red-500 animate-pulse"></i>
            e
            <i class="fas fa-coffee text-yellow-600"></i>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

<template>
  <footer class="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 border-t border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- About Section -->
        <div class="col-span-1 md:col-span-2">
          <div class="flex items-center space-x-3 mb-4">
            <div
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg shadow-lg"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                ></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold">Calculadora de Rendimento Salarial</h3>
          </div>
          <p class="text-gray-400 mb-4 leading-relaxed">
            Ferramenta gratuita e profissional para calcular seu rendimento salarial em
            diferentes períodos. Desenvolvida com tecnologia moderna para ajudar no seu planejamento
            financeiro pessoal e empresarial.
          </p>
          <div class="flex items-center space-x-2 text-sm text-gray-400">
            <i class="fas fa-shield-alt text-blue-400"></i>
            <span>100% Seguro e Privado</span>
            <span class="mx-2">•</span>
            <i class="fas fa-bolt text-yellow-400"></i>
            <span>Rápido e Eficiente</span>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h4 class="text-lg font-semibold mb-4 flex items-center">
            <i class="fas fa-link mr-2 text-blue-400"></i>
            Links Úteis
          </h4>
          <ul class="space-y-2 text-gray-400">
            <li>
              <router-link to="/" class="hover:text-blue-400 transition-colors flex items-center">
                <i class="fas fa-home w-4 mr-2"></i>
                Calculadora
              </router-link>
            </li>
            <li>
              <router-link
                to="/recursos"
                class="hover:text-blue-400 transition-colors flex items-center"
              >
                <i class="fas fa-star w-4 mr-2"></i>
                Recursos
              </router-link>
            </li>
            <li>
              <router-link
                to="/sobre"
                class="hover:text-blue-400 transition-colors flex items-center"
              >
                <i class="fas fa-info-circle w-4 mr-2"></i>
                Sobre
              </router-link>
            </li>
            <li>
              <router-link
                to="/contato"
                class="hover:text-blue-400 transition-colors flex items-center"
              >
                <i class="fas fa-envelope w-4 mr-2"></i>
                Contato
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="text-lg font-semibold mb-4 flex items-center">
            <i class="fas fa-balance-scale mr-2 text-blue-400"></i>
            Legal
          </h4>
          <ul class="space-y-2 text-gray-400">
            <li>
              <router-link
                to="/privacidade"
                class="hover:text-blue-400 transition-colors flex items-center"
              >
                <i class="fas fa-user-shield w-4 mr-2"></i>
                Política de Privacidade
              </router-link>
            </li>
            <li>
              <router-link
                to="/termos"
                class="hover:text-blue-400 transition-colors flex items-center"
              >
                <i class="fas fa-file-contract w-4 mr-2"></i>
                Termos de Uso
              </router-link>
            </li>
            <li>
              <button
                @click="manageCookies"
                class="hover:text-blue-400 transition-colors text-left flex items-center"
              >
                <i class="fas fa-cookie-bite w-4 mr-2"></i>
                Gerenciar Cookies
              </button>
            </li>
            <li>
              <a
                href="https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd"
                target="_blank"
                rel="noopener noreferrer"
                class="hover:text-blue-400 transition-colors flex items-center"
              >
                <i class="fas fa-gavel w-4 mr-2"></i>
                LGPD
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Developer Info & Copyright -->
      <div class="border-t border-gray-800 mt-8 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <!-- Developer -->
          <div class="text-center md:text-left">
            <p class="text-gray-400 text-sm mb-2">
              © {{ currentYear }} Calculadora de Rendimento Salarial. Todos os direitos reservados.
            </p>
            <p class="text-gray-500 text-xs flex items-center justify-center md:justify-start">
              <i class="fas fa-code mr-2 text-blue-400"></i>
              Sistema desenvolvido pelo desenvolvedor 
              <span class="mx-1 font-semibold text-blue-400">HotWyl</span> 
              <span class="mx-1">-</span>
              <a 
                href="https://github.com/willfrombrasil" 
                target="_blank" 
                rel="noopener noreferrer"
                class="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
              >
                <i class="fab fa-github mr-1"></i>
                willfrombrasil
              </a>
            </p>
          </div>
          
          <!-- Company -->
          <div class="text-center md:text-right">
            <p class="text-gray-400 text-sm mb-2">
              Desenvolvido com 
              <i class="fas fa-heart text-red-500 mx-1 animate-pulse"></i> 
              por
            </p>
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors font-semibold"
            >
              <i class="fas fa-globe mr-2"></i>
              Grupo 3w Online
              <i class="fas fa-external-link-alt ml-2 text-xs"></i>
            </a>
            <p class="text-gray-500 text-xs mt-1">
              Sites e Sistemas Personalizados Sob Demanda
            </p>
          </div>
        </div>
        
        <!-- Quick Links Bottom -->
        <div class="flex flex-wrap justify-center items-center space-x-6 text-sm text-gray-500 mt-6">
          <router-link
            to="/privacidade"
            class="hover:text-blue-400 transition-colors"
          >
            Privacidade
          </router-link>
          <span>•</span>
          <router-link
            to="/termos"
            class="hover:text-blue-400 transition-colors"
          >
            Termos de Uso
          </router-link>
          <span>•</span>
          <button
            @click="manageCookies"
            class="hover:text-blue-400 transition-colors"
          >
            Cookies
          </button>
          <span>•</span>
          <a
            href="https://www.3wonline.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-400 transition-colors"
          >
            3w Online
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { useConsent } from "@/composables/useConsent";

export default {
  name: "AppFooter",
  setup() {
    const { openBanner } = useConsent();

    const currentYear = computed(() => {
      return new Date().getFullYear();
    });

    const manageCookies = () => {
      openBanner();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    return {
      currentYear,
      manageCookies,
    };
  },
};
</script>

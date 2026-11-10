<template>
  <footer class="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="col-span-2">
          <div class="flex items-center space-x-2 mb-4">
            <i class="fab fa-youtube text-3xl text-youtube-red"></i>
            <span class="text-2xl font-bold">ThumbnailPro</span>
          </div>
          <p class="text-gray-400 mb-6 max-w-md leading-relaxed">
            A ferramenta mais rápida e confiável para extrair thumbnails do
            YouTube em alta qualidade (até 4K). 100% grátis, seguro e sem limites.
            Desenvolvido para criadores de conteúdo e profissionais.
          </p>
          <div class="flex space-x-4">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-youtube-red transition-colors duration-200"
              title="Visite o Grupo 3w Online"
            >
              <i class="fas fa-globe text-2xl"></i>
            </a>
            <a
              href="mailto:contato@3wonline.com.br"
              class="text-gray-400 hover:text-youtube-red transition-colors duration-200"
              title="Entre em contato"
            >
              <i class="fas fa-envelope text-2xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/company/3wonline"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-youtube-red transition-colors duration-200"
              title="LinkedIn"
            >
              <i class="fab fa-linkedin text-2xl"></i>
            </a>
            <a
              href="https://github.com/3wonline"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-youtube-red transition-colors duration-200"
              title="GitHub"
            >
              <i class="fab fa-github text-2xl"></i>
            </a>
          </div>
        </div>

        <!-- Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white">
            <i class="fas fa-tools mr-2 text-youtube-red"></i>
            Ferramenta
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/extractor"
                class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-download mr-2 text-youtube-red"></i>
                Extrator de Thumbnails
              </router-link>
            </li>
            <li>
              <router-link
                to="/faq"
                class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-question-circle mr-2"></i>
                Perguntas Frequentes
              </router-link>
            </li>
            <li>
              <router-link
                to="/depoimentos"
                class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-star mr-2"></i>
                Depoimentos
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-white">
            <i class="fas fa-headset mr-2 text-youtube-red"></i>
            Suporte
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/sobre"
                class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-info-circle mr-2"></i>
                Sobre Nós
              </router-link>
            </li>
            <li>
              <router-link
                to="/contato"
                class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-envelope mr-2"></i>
                Contato
              </router-link>
            </li>
            <li>
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-building mr-2"></i>
                Grupo 3w Online
              </a>
            </li>
            <li>
              <a
                href="mailto:contato@3wonline.com.br"
                class="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <i class="fas fa-bug mr-2"></i>
                Reportar Bug
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 dark:border-gray-700 mt-12 pt-8">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div class="text-gray-400 text-sm text-center md:text-left">
            <p class="mb-1">
              © {{ currentYear }} ThumbnailPro. Todos os direitos reservados.
            </p>
            <p class="text-xs">
              <i class="fas fa-code mr-1"></i>
              Sistema desenvolvido pelo desenvolvedor 
              <a
                href="https://github.com/willfrombrasil"
                target="_blank"
                rel="noopener noreferrer"
                class="text-youtube-red hover:text-white transition-colors font-semibold"
              >hotwyl - willfrombrasil</a>
              | 
              <a
                href="https://www.3wonline.com.br"
                target="_blank"
                rel="noopener noreferrer"
                class="text-youtube-red hover:text-white transition-colors font-semibold"
              >Grupo 3w Online</a>
            </p>
          </div>
          <div class="flex flex-wrap justify-center gap-4 md:gap-6">
            <router-link
              to="/privacidade"
              class="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
            >
              <i class="fas fa-shield-alt mr-1"></i>
              Privacidade
            </router-link>
            <router-link
              to="/termos"
              class="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
            >
              <i class="fas fa-file-contract mr-1"></i>
              Termos de Uso
            </router-link>
            <button
              @click="openCookieSettings"
              class="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center"
            >
              <i class="fas fa-cookie-bite mr-1"></i>
              Cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from "vue";
import { useCookies } from "../composables/useCookies.js";

export default {
  name: "Footer",
  setup() {
    const currentYear = computed(() => new Date().getFullYear());
    const { revokeConsent } = useCookies();

    const openCookieSettings = () => {
      revokeConsent();
      window.location.reload();
    };

    return {
      currentYear,
      openCookieSettings,
    };
  },
};
</script>

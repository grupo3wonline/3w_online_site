<template>
  <footer
    class="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand & Description -->
        <div class="col-span-1 md:col-span-2 lg:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div class="bg-primary-600 dark:bg-primary-500 p-2 rounded-lg">
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold">InvestSim</span>
          </div>
          <p class="text-gray-400 mb-4 max-w-md leading-relaxed">
            Simule seus investimentos de forma intuitiva e planeje seu futuro
            financeiro com nossa ferramenta avançada, gratuita e fácil de usar.
          </p>
          <p class="text-sm text-gray-500 mb-4">
            ✓ Sem cadastro &nbsp; ✓ 100% gratuito &nbsp; ✓ Resultados
            instantâneos
          </p>
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              href="https://www.3wonline.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-primary-600 dark:hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
              aria-label="Website"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.3wonline.com.br/contact/"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 bg-gray-800 dark:bg-gray-900 hover:bg-primary-600 dark:hover:bg-primary-500 rounded-lg flex items-center justify-center transition-all transform hover:scale-110"
              aria-label="Contato"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- Navegação -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4"
          >
            Navegação
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Início
              </router-link>
            </li>
            <li>
              <router-link
                to="/simulador"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Simulador
              </router-link>
            </li>
            <li>
              <router-link
                to="/sobre"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Sobre
              </router-link>
            </li>
            <li>
              <router-link
                to="/contato"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contato
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Suporte & Recursos -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4"
          >
            Suporte
          </h3>
          <ul class="space-y-3">
            <li>
              <a
                href="https://www.3wonline.com.br/contact/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                Suporte Técnico
              </a>
            </li>
            <li>
              <a
                href="https://www.3wonline.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Grupo 3w Online
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3
            class="text-sm font-semibold text-gray-400 tracking-wider uppercase mb-4"
          >
            Legal
          </h3>
          <ul class="space-y-3">
            <li>
              <router-link
                to="/politica-de-privacidade"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Política de Privacidade
              </router-link>
            </li>
            <li>
              <router-link
                to="/termos-de-uso"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Termos de Uso
              </router-link>
            </li>
            <li>
              <a
                href="https://www.gov.br/anpd/pt-br"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                LGPD - ANPD
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p class="text-gray-400 text-sm text-center md:text-left">
            © {{ currentYear }} InvestSim - Todos os direitos reservados
          </p>
          <div class="flex items-center gap-4 text-xs text-gray-500">
            <span>v1.0.0</span>
            <span>•</span>
            <span>Vue.js 3 + Tailwind CSS</span>
          </div>
        </div>
        
        <!-- Developer Credits -->
        <div class="mt-6 text-center">
          <p class="text-gray-500 text-sm">
            Sistema desenvolvido por
            <a
              href="https://www.3wonline.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-400 hover:text-primary-300 transition-colors font-semibold"
            >
              Grupo 3w Online
            </a>
            • Desenvolvedor:
            <a
              href="https://github.com/willfrombrasil"
              target="_blank"
              rel="noopener noreferrer"
              class="text-primary-400 hover:text-primary-300 transition-colors font-semibold inline-flex items-center gap-1"
              title="Hotwyl - Will from Brasil"
            >
              <i class="fas fa-code"></i>
              Hotwyl (willfrombrasil)
            </a>
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

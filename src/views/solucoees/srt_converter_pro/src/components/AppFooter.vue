<template>
  <footer
    class="bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 text-white relative overflow-hidden"
  >
    <!-- Background decoration -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-10 left-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <!-- Brand Section -->
        <div class="lg:col-span-2">
          <div class="flex items-center space-x-3 mb-6">
            <LogoIcon class="w-10 h-10 text-purple-400" />
            <div>
              <span class="text-2xl font-bold">SRT Converter Pro</span>
              <div class="text-sm text-purple-300">Legendas Profissionais</div>
            </div>
          </div>
          <p class="text-gray-300 mb-6 max-w-md leading-relaxed">
            A ferramenta mais avançada e gratuita para converter roteiros em
            legendas SRT profissionais. Perfeita para criadores de conteúdo,
            produtores e profissionais de vídeo.
          </p>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div class="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <div class="text-xl font-bold text-yellow-400">10k+</div>
              <div class="text-xs text-gray-400">Conversões</div>
            </div>
            <div class="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <div class="text-xl font-bold text-green-400">100%</div>
              <div class="text-xs text-gray-400">Gratuito</div>
            </div>
            <div class="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm">
              <div class="text-xl font-bold text-blue-400">5⭐</div>
              <div class="text-xs text-gray-400">Avaliação</div>
            </div>
          </div>
        </div>

        <!-- Resources -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-purple-300">
            🚀 Recursos
          </h3>
          <ul class="space-y-3 text-gray-300">
            <li>
              <router-link
                to="/converter"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>⚡</span>
                <span>Conversor SRT</span>
              </router-link>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>🎯</span>
                <span>Formatação Automática</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>💾</span>
                <span>Download Gratuito</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>🔒</span>
                <span>100% Seguro</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-purple-300">💬 Suporte</h3>
          <ul class="space-y-3 text-gray-300">
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>❓</span>
                <span>FAQ</span>
              </a>
            </li>
            <li>
              <router-link
                to="/contato"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>📧</span>
                <span>Contato</span>
              </router-link>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>📚</span>
                <span>Tutoriais</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>📝</span>
                <span>Blog</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-lg font-semibold mb-4 text-purple-300">⚖️ Legal</h3>
          <ul class="space-y-3 text-gray-300">
            <li>
              <router-link
                to="/privacidade"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>🔒</span>
                <span>Política de Privacidade</span>
              </router-link>
            </li>
            <li>
              <router-link
                to="/termos"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>📜</span>
                <span>Termos de Uso</span>
              </router-link>
            </li>
            <li>
              <a
                href="#"
                class="hover:text-white transition-colors flex items-center space-x-2"
              >
                <span>🍪</span>
                <span>Gerenciar Cookies</span>
              </a>
            </li>
            <li>
              <div class="flex items-center space-x-2 text-green-400">
                <span>✅</span>
                <span>Conformidade LGPD</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Section -->
      <div class="border-t border-gray-700 mt-12 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div class="text-center md:text-left">
            <p class="text-gray-400 text-sm">
              &copy; {{ new Date().getFullYear() }} SRT Converter Pro. Todos os
              direitos reservados.
            </p>
            <p class="text-gray-400 text-sm mt-1">
              Sistema desenvolvido pelo desenvolvedor hotwyl - willfrombrasil.
            </p>
            <div
              class="flex items-center justify-center md:justify-start space-x-4 mt-2"
            >
              <router-link
                to="/privacidade"
                class="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Privacidade
              </router-link>
              <span class="text-gray-600">•</span>
              <router-link
                to="/termos"
                class="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Termos
              </router-link>
              <span class="text-gray-600">•</span>
              <button
                @click="manageCookies"
                class="text-xs text-gray-400 hover:text-white transition-colors"
              >
                Gerenciar Cookies
              </button>
            </div>
          </div>

          <!-- Tech Badge -->
          <div
            class="flex flex-col md:flex-row md:items-center md:space-x-2 text-sm text-gray-400 mt-6"
          >
            <span
              >Sistema desenvolvido pelo desenvolvedor
              <strong>hotwyl - willfrombrasil</strong>.</span
            >
            <span class="hidden md:inline">|</span>
            <span
              >Desenvolvido com ❤️ por
              <a
                href="https://www.3wonline.com.br/"
                target="_blank"
                class="text-secondary-400 hover:text-white transition-colors"
                >Grupo 3w Online</a
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import LogoIcon from "../components/icons/LogoIcon.vue";
import { useConsent } from "../composables/useConsent";

const { clearConsent } = useConsent();

const manageCookies = () => {
  clearConsent();
};
</script>

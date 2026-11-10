<template>
  <header
    class="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 dark:from-blue-800 dark:via-indigo-900 dark:to-purple-900 text-white shadow-lg sticky top-0 z-50 backdrop-blur-sm transition-colors duration-300"
  >
    <div class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group" title="Ir para página inicial">
          <div
            class="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
          >
            <i class="fas fa-image text-2xl text-blue-600 dark:text-blue-400"></i>
          </div>
          <div class="hidden sm:block">
            <h1 class="text-xl font-bold leading-tight">3w OmniHub</h1>
            <p class="text-xs text-blue-100 dark:text-blue-200">Marca D'água Profissional</p>
          </div>
        </router-link>

        <!-- Navigation -->
        <nav
          class="hidden lg:flex items-center gap-6"
          aria-label="Menu de navegação principal"
        >
          <router-link
            to="/"
            class="hover:text-blue-100 transition-colors font-medium flex items-center gap-2"
            title="Página inicial"
          >
            <i class="fas fa-home"></i>
            Início
          </router-link>
          <router-link
            to="/app"
            class="hover:text-blue-100 transition-colors font-medium flex items-center gap-2"
            title="Acessar ferramenta de marca d'água"
          >
            <i class="fas fa-edit"></i>
            Aplicação
          </router-link>
          <router-link
            to="/sobre"
            class="hover:text-blue-100 transition-colors font-medium flex items-center gap-2"
            title="Saiba mais sobre o projeto"
          >
            <i class="fas fa-info-circle"></i>
            Sobre
          </router-link>
          <router-link
            to="/contato"
            class="hover:text-blue-100 transition-colors font-medium flex items-center gap-2"
            title="Entre em contato conosco"
          >
            <i class="fas fa-envelope"></i>
            Contato
          </router-link>

          <!-- Theme Toggle -->
          <div class="relative group">
            <button
              @click="toggleTheme"
              class="p-2.5 hover:bg-white/10 rounded-lg transition-all duration-300 flex items-center gap-2"
              :title="`Alternar tema (atual: ${getThemeLabel()})`"
            >
              <i v-if="theme === 'light'" class="fas fa-sun text-lg"></i>
              <i v-else-if="theme === 'dark'" class="fas fa-moon text-lg"></i>
              <i v-else class="fas fa-circle-half-stroke text-lg"></i>
            </button>
            
            <!-- Tooltip -->
            <div class="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
              {{ getThemeLabel() }}
            </div>
          </div>

          <!-- Help Button -->
          <div class="relative group">
            <button
              @click="showHelp"
              class="p-2.5 hover:bg-white/10 rounded-lg transition-all duration-300"
              title="Ajuda e instruções"
            >
              <i class="fas fa-question-circle text-lg"></i>
            </button>
            
            <!-- Tooltip -->
            <div class="absolute top-full right-0 mt-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap">
              Ajuda
            </div>
          </div>
        </nav>

        <!-- Mobile Menu Button -->
        <button
          @click="mobileMenuOpen = !mobileMenuOpen"
          class="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
          :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
        >
          <i v-if="!mobileMenuOpen" class="fas fa-bars text-xl"></i>
          <i v-else class="fas fa-times text-xl"></i>
        </button>
      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-2 max-h-0"
        leave-to-class="opacity-0 -translate-y-2 max-h-0"
        enter-to-class="opacity-100 translate-y-0 max-h-96"
        leave-from-class="opacity-100 translate-y-0 max-h-96"
      >
        <nav
          v-if="mobileMenuOpen"
          class="lg:hidden mt-4 pt-4 border-t border-white/20 space-y-2"
          aria-label="Menu de navegação mobile"
        >
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="flex items-center gap-3 py-2.5 hover:bg-white/10 rounded-lg px-3 transition-colors"
          >
            <i class="fas fa-home w-5"></i>
            Início
          </router-link>
          <router-link
            to="/app"
            @click="mobileMenuOpen = false"
            class="flex items-center gap-3 py-2.5 hover:bg-white/10 rounded-lg px-3 transition-colors"
          >
            <i class="fas fa-edit w-5"></i>
            Aplicação
          </router-link>
          <router-link
            to="/sobre"
            @click="mobileMenuOpen = false"
            class="flex items-center gap-3 py-2.5 hover:bg-white/10 rounded-lg px-3 transition-colors"
          >
            <i class="fas fa-info-circle w-5"></i>
            Sobre
          </router-link>
          <router-link
            to="/contato"
            @click="mobileMenuOpen = false"
            class="flex items-center gap-3 py-2.5 hover:bg-white/10 rounded-lg px-3 transition-colors"
          >
            <i class="fas fa-envelope w-5"></i>
            Contato
          </router-link>
          
          <div class="border-t border-white/20 pt-2 mt-2">
            <button
              @click="toggleTheme"
              class="w-full flex items-center justify-between py-2.5 hover:bg-white/10 rounded-lg px-3 transition-colors"
            >
              <span class="flex items-center gap-3">
                <i v-if="theme === 'light'" class="fas fa-sun w-5"></i>
                <i v-else-if="theme === 'dark'" class="fas fa-moon w-5"></i>
                <i v-else class="fas fa-circle-half-stroke w-5"></i>
                Tema
              </span>
              <span class="text-sm text-blue-200">{{ getThemeLabel() }}</span>
            </button>
            
            <button
              @click="showHelp"
              class="w-full flex items-center gap-3 py-2.5 hover:bg-white/10 rounded-lg px-3 transition-colors"
            >
              <i class="fas fa-question-circle w-5"></i>
              Ajuda
            </button>
          </div>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useTheme } from "@/composables/useTheme";
import { useAlert } from "@/composables/useAlert";

const { theme, toggleTheme } = useTheme();
const { showInfo } = useAlert();
const mobileMenuOpen = ref(false);

const getThemeLabel = () => {
  if (theme.value === 'light') return 'Claro';
  if (theme.value === 'dark') return 'Escuro';
  return 'Automático';
};

const showHelp = () => {
  mobileMenuOpen.value = false;
  showInfo(
    'Adicione marca d\'água em suas imagens de forma simples e profissional. Faça upload de uma ou várias imagens, personalize o texto ou logo, escolha a posição e baixe suas imagens protegidas. Todo o processamento é feito localmente no seu navegador, garantindo 100% de privacidade!',
    '💡 Como usar a ferramenta'
  );
};
</script>

<style scoped>
/* Smooth transitions */
.max-h-0 {
  max-height: 0;
  overflow: hidden;
}

.max-h-96 {
  max-height: 24rem;
  overflow: hidden;
}
</style>

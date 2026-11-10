<template>
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-2xl border-t-4 border-indigo-600"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Banner Simples -->
        <div
          v-if="!showDetails"
          class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div class="flex-1">
            <h3
              class="text-lg font-semibold text-gray-900 dark:text-white mb-2"
            >
              🍪 Utilizamos cookies
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300">
              Usamos cookies essenciais para o funcionamento do site e cookies
              opcionais para melhorar sua experiência. Você pode escolher quais
              tipos de cookies aceitar.
              <router-link
                to="/privacidade"
                class="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
              >
                Saiba mais
              </router-link>
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              @click="handleAcceptNecessary"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Apenas Necessários
            </button>
            <button
              @click="showDetails = true"
              class="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            >
              Personalizar
            </button>
            <button
              @click="handleAcceptAll"
              class="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Aceitar Todos
            </button>
          </div>
        </div>

        <!-- Detalhes e Personalização -->
        <div v-else class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Configurações de Cookies
            </h3>
            <button
              @click="showDetails = false"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Fechar detalhes"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <p class="text-sm text-gray-600 dark:text-gray-300">
            Personalize suas preferências de cookies. Os cookies necessários são
            essenciais para o funcionamento do site.
          </p>

          <!-- Opções de Cookies -->
          <div class="space-y-3 max-h-60 overflow-y-auto pr-2">
            <!-- Necessários -->
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    Cookies Necessários
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Essenciais para o funcionamento básico do site. Não podem
                    ser desabilitados.
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    type="checkbox"
                    :checked="true"
                    disabled
                    class="w-5 h-5 text-indigo-600 bg-gray-300 rounded cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            <!-- Analytics -->
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    Cookies de Análise
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Nos ajudam a entender como você usa o site para melhorar a
                    experiência.
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    v-model="preferences.analytics"
                    type="checkbox"
                    class="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <!-- Marketing -->
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    Cookies de Marketing
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Usados para exibir anúncios relevantes e medir a eficácia de
                    campanhas.
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    v-model="preferences.marketing"
                    type="checkbox"
                    class="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <!-- Preferências -->
            <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <h4 class="font-medium text-gray-900 dark:text-white">
                    Cookies de Preferências
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Guardam suas preferências pessoais, como idioma e tema.
                  </p>
                </div>
                <div class="ml-4">
                  <input
                    v-model="preferences.preferences"
                    type="checkbox"
                    class="w-5 h-5 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Botões de Ação -->
          <div
            class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-600"
          >
            <button
              @click="handleSavePreferences"
              class="flex-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-md"
            >
              Salvar Preferências
            </button>
            <button
              @click="handleAcceptAll"
              class="flex-1 px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50 transition-colors"
            >
              Aceitar Todos
            </button>
          </div>

          <!-- Links -->
          <div class="text-center pt-2">
            <router-link
              to="/privacidade"
              class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline mr-4"
            >
              Política de Privacidade
            </router-link>
            <router-link
              to="/termos"
              class="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Termos de Uso
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { ref, watch } from "vue";
import { useConsent } from "@/composables/useConsent";

export default {
  name: "CookieConsent",
  setup() {
    const { showBanner, acceptAll, acceptNecessary, saveConsent } =
      useConsent();

    const showDetails = ref(false);
    const preferences = ref({
      analytics: false,
      marketing: false,
      preferences: false,
    });

    const handleAcceptAll = () => {
      acceptAll();
      showDetails.value = false;
    };

    const handleAcceptNecessary = () => {
      acceptNecessary();
      showDetails.value = false;
    };

    const handleSavePreferences = () => {
      saveConsent(preferences.value);
      showDetails.value = false;
    };

    // Reseta preferências quando fecha os detalhes
    watch(showDetails, (value) => {
      if (!value) {
        preferences.value = {
          analytics: false,
          marketing: false,
          preferences: false,
        };
      }
    });

    return {
      showBanner,
      showDetails,
      preferences,
      handleAcceptAll,
      handleAcceptNecessary,
      handleSavePreferences,
    };
  },
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-700 rounded;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>

<template>
  <Transition name="slide-up">
    <section
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t-2 border-primary-500 shadow-2xl"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <!-- Simple View -->
        <div
          v-if="!showDetails"
          class="flex flex-col lg:flex-row items-start lg:items-center gap-4"
        >
          <!-- Icon & Content -->
          <div class="flex items-start gap-4 flex-1">
            <div
              class="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center"
            >
              <svg
                class="w-6 h-6 text-primary-600 dark:text-primary-400"
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
            </div>
            <div class="flex-1">
              <h3
                id="cookie-banner-title"
                class="text-lg font-bold text-gray-900 dark:text-white mb-2"
              >
                🍪 Nós Respeitamos sua Privacidade
              </h3>
              <p
                id="cookie-banner-description"
                class="text-sm text-gray-600 dark:text-gray-300 leading-relaxed"
              >
                Utilizamos cookies essenciais para o funcionamento do site e
                cookies analíticos para melhorar sua experiência. Seus dados são
                protegidos conforme a
                <router-link
                  to="/politica-de-privacidade"
                  class="text-primary-600 dark:text-primary-400 hover:underline font-semibold"
                >
                  LGPD </router-link
                >.
              </p>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              @click="handleAcceptEssential"
              class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Apenas Essenciais
            </button>
            <button
              @click="showDetails = true"
              class="px-4 py-2 text-sm font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
            >
              Personalizar
            </button>
            <button
              @click="handleAcceptAll"
              class="px-6 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-lg transition-colors shadow-lg"
            >
              Aceitar Todos
            </button>
          </div>
        </div>

        <!-- Detailed View -->
        <div v-else class="space-y-6">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white">
              Configurações de Privacidade
            </h3>
            <button
              @click="showDetails = false"
              class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Fechar configurações"
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

          <!-- Cookie Categories -->
          <div class="space-y-4">
            <!-- Essential Cookies -->
            <div
              class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-l-4 border-green-500"
            >
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <svg
                      class="w-5 h-5 text-green-600 dark:text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <h4 class="font-semibold text-gray-900 dark:text-white">
                      Cookies Essenciais
                    </h4>
                    <span
                      class="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded-full"
                    >
                      Sempre Ativo
                    </span>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300">
                    Necessários para o funcionamento básico do site. Não podem
                    ser desativados.
                  </p>
                </div>
              </div>
            </div>

            <!-- Analytics Cookies -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <svg
                      class="w-5 h-5 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <h4 class="font-semibold text-gray-900 dark:text-white">
                      Cookies Analíticos
                    </h4>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Nos ajudam a entender como você usa o site para melhorar sua
                    experiência. Ex: Google Analytics.
                  </p>
                </div>
                <div class="ml-4">
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                    aria-label="Habilitar cookies analíticos"
                  >
                    <input
                      v-model="preferences.analytics"
                      type="checkbox"
                      class="sr-only peer"
                      aria-label="Cookies analíticos"
                    />
                    <div
                      class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
                    ></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Marketing Cookies -->
            <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <div class="flex items-start justify-between">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <svg
                      class="w-5 h-5 text-purple-600 dark:text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                    <h4 class="font-semibold text-gray-900 dark:text-white">
                      Cookies de Marketing
                    </h4>
                  </div>
                  <p class="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    Utilizados para personalizar conteúdo e anúncios (atualmente
                    não utilizamos).
                  </p>
                </div>
                <div class="ml-4">
                  <label
                    class="relative inline-flex items-center cursor-pointer"
                    aria-label="Habilitar cookies de marketing"
                  >
                    <input
                      v-model="preferences.marketing"
                      type="checkbox"
                      class="sr-only peer"
                      aria-label="Cookies de marketing"
                    />
                    <div
                      class="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"
                    ></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Links -->
          <div
            class="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300"
          >
            <router-link
              to="/politica-de-privacidade"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              📄 Política de Privacidade
            </router-link>
            <router-link
              to="/termos-de-uso"
              class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              📋 Termos de Uso
            </router-link>
          </div>

          <!-- Actions -->
          <div class="flex flex-col sm:flex-row gap-3">
            <button
              @click="handleSavePreferences"
              class="flex-1 px-6 py-3 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 rounded-lg transition-colors shadow-lg"
            >
              Salvar Preferências
            </button>
            <button
              @click="handleAcceptAll"
              class="flex-1 px-6 py-3 text-sm font-medium text-primary-700 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useConsent } from "@/composables/useConsent";

const {
  showBanner,
  acceptAll,
  acceptEssentialOnly,
  acceptCustom,
  loadConsent,
} = useConsent();

const showDetails = ref(false);
const preferences = ref({
  analytics: false,
  marketing: false,
});

onMounted(() => {
  loadConsent();
});

const handleAcceptAll = () => {
  acceptAll();
  showDetails.value = false;
};

const handleAcceptEssential = () => {
  acceptEssentialOnly();
  showDetails.value = false;
};

const handleSavePreferences = () => {
  acceptCustom(preferences.value);
  showDetails.value = false;
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>

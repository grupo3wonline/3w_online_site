<template>
  <Teleport to="body">
    <Transition name="slide-up">
      <div
        v-if="!hasConsented"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t-4 border-youtube-red"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div
            class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <!-- Conteúdo -->
            <div class="flex-1">
              <div class="flex items-start gap-3">
                <Cookie class="w-6 h-6 text-youtube-red flex-shrink-0 mt-1" />
                <div>
                  <h3
                    id="cookie-consent-title"
                    class="text-lg font-bold text-gray-900 mb-2"
                  >
                    🍪 Usamos cookies para melhorar sua experiência
                  </h3>
                  <p
                    id="cookie-consent-description"
                    class="text-gray-600 text-sm leading-relaxed"
                  >
                    Utilizamos cookies essenciais para o funcionamento do site
                    e, com seu consentimento, cookies analíticos para melhorar
                    nossos serviços. Você pode escolher quais categorias deseja
                    aceitar ou rejeitar. Para mais informações, consulte nossa
                    <router-link
                      to="/privacidade"
                      class="text-youtube-red hover:underline font-medium"
                    >
                      Política de Privacidade </router-link
                    >.
                  </p>
                </div>
              </div>
            </div>

            <!-- Ações -->
            <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                @click="showDetails = true"
                class="btn-secondary text-sm px-4 py-2 whitespace-nowrap"
                aria-label="Personalizar preferências de cookies"
              >
                <Settings class="w-4 h-4 mr-2" />
                Personalizar
              </button>
              <button
                @click="acceptNecessary"
                class="btn-secondary text-sm px-4 py-2 whitespace-nowrap"
                aria-label="Aceitar apenas cookies necessários"
              >
                <X class="w-4 h-4 mr-2" />
                Apenas Necessários
              </button>
              <button
                @click="acceptAllCookies"
                class="btn-primary text-sm px-6 py-2 whitespace-nowrap"
                aria-label="Aceitar todos os cookies"
              >
                <Check class="w-4 h-4 mr-2" />
                Aceitar Todos
              </button>
            </div>
          </div>

          <!-- Modal de Detalhes -->
          <Transition name="fade">
            <div
              v-if="showDetails"
              class="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              @click.self="showDetails = false"
            >
              <div
                class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                role="dialog"
                aria-labelledby="cookie-details-title"
              >
                <div
                  class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
                >
                  <h2
                    id="cookie-details-title"
                    class="text-2xl font-bold text-gray-900"
                  >
                    Preferências de Cookies
                  </h2>
                  <button
                    @click="showDetails = false"
                    class="text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Fechar"
                  >
                    <X class="w-6 h-6" />
                  </button>
                </div>

                <div class="p-6 space-y-6">
                  <!-- Necessários -->
                  <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex items-start gap-3">
                        <Shield
                          class="w-5 h-5 text-youtube-red flex-shrink-0 mt-1"
                        />
                        <div>
                          <h3 class="font-bold text-gray-900 mb-1">
                            Cookies Necessários
                          </h3>
                          <p class="text-sm text-gray-600">
                            Essenciais para o funcionamento básico do site. Não
                            podem ser desativados.
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          checked
                          disabled
                          class="w-5 h-5 text-youtube-red rounded opacity-50 cursor-not-allowed"
                          aria-label="Cookies necessários - sempre ativos"
                        />
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 mt-2 pl-8">
                      <strong>Exemplos:</strong> Autenticação, segurança,
                      preferências de interface
                    </div>
                  </div>

                  <!-- Analytics -->
                  <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex items-start gap-3">
                        <BarChart
                          class="w-5 h-5 text-blue-600 flex-shrink-0 mt-1"
                        />
                        <div>
                          <h3 class="font-bold text-gray-900 mb-1">
                            Cookies de Análise
                          </h3>
                          <p class="text-sm text-gray-600">
                            Nos ajudam a entender como você usa o site para
                            melhorar a experiência.
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="preferences.analytics"
                          class="w-5 h-5 text-youtube-red rounded focus:ring-2 focus:ring-youtube-red cursor-pointer"
                          aria-label="Aceitar cookies de análise"
                        />
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 mt-2 pl-8">
                      <strong>Exemplos:</strong> Google Analytics, estatísticas
                      de uso
                    </div>
                  </div>

                  <!-- Marketing -->
                  <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex items-start gap-3">
                        <Target
                          class="w-5 h-5 text-green-600 flex-shrink-0 mt-1"
                        />
                        <div>
                          <h3 class="font-bold text-gray-900 mb-1">
                            Cookies de Marketing
                          </h3>
                          <p class="text-sm text-gray-600">
                            Usados para personalizar anúncios e conteúdo
                            relevante para você.
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="preferences.marketing"
                          class="w-5 h-5 text-youtube-red rounded focus:ring-2 focus:ring-youtube-red cursor-pointer"
                          aria-label="Aceitar cookies de marketing"
                        />
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 mt-2 pl-8">
                      <strong>Exemplos:</strong> Anúncios personalizados,
                      remarketing
                    </div>
                  </div>

                  <!-- Preferências -->
                  <div class="border border-gray-200 rounded-lg p-4">
                    <div class="flex items-start justify-between mb-3">
                      <div class="flex items-start gap-3">
                        <Sliders
                          class="w-5 h-5 text-purple-600 flex-shrink-0 mt-1"
                        />
                        <div>
                          <h3 class="font-bold text-gray-900 mb-1">
                            Cookies de Preferências
                          </h3>
                          <p class="text-sm text-gray-600">
                            Salvam suas configurações e preferências pessoais do
                            site.
                          </p>
                        </div>
                      </div>
                      <div class="flex items-center">
                        <input
                          type="checkbox"
                          v-model="preferences.preferences"
                          class="w-5 h-5 text-youtube-red rounded focus:ring-2 focus:ring-youtube-red cursor-pointer"
                          aria-label="Aceitar cookies de preferências"
                        />
                      </div>
                    </div>
                    <div class="text-xs text-gray-500 mt-2 pl-8">
                      <strong>Exemplos:</strong> Idioma, tema, histórico de uso
                    </div>
                  </div>
                </div>

                <div
                  class="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3"
                >
                  <button
                    @click="showDetails = false"
                    class="btn-secondary px-6 py-2"
                  >
                    Cancelar
                  </button>
                  <button
                    @click="savePreferences"
                    class="btn-primary px-6 py-2"
                  >
                    <Save class="w-4 h-4 mr-2" />
                    Salvar Preferências
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script>
import { ref } from "vue";
import {
  Cookie,
  Settings,
  Check,
  X,
  Shield,
  BarChart,
  Target,
  Sliders,
  Save,
} from "lucide-vue-next";
import { useCookies } from "../composables/useCookies.js";

export default {
  name: "CookieConsent",
  components: {
    Cookie,
    Settings,
    Check,
    X,
    Shield,
    BarChart,
    Target,
    Sliders,
    Save,
  },
  setup() {
    const { hasConsented, acceptAll, acceptNecessaryOnly, setConsent } =
      useCookies();
    const showDetails = ref(false);
    const preferences = ref({
      analytics: false,
      marketing: false,
      preferences: false,
    });

    const acceptAllCookies = () => {
      acceptAll();
    };

    const acceptNecessary = () => {
      acceptNecessaryOnly();
    };

    const savePreferences = () => {
      setConsent(preferences.value);
      showDetails.value = false;
    };

    return {
      hasConsented,
      showDetails,
      preferences,
      acceptAllCookies,
      acceptNecessary,
      savePreferences,
    };
  },
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-up-enter-from {
  transform: translateY(100%);
}

.slide-up-leave-to {
  transform: translateY(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

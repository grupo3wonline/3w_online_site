<template>
  <transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t-4 border-purple-600"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4"
        >
          <!-- Content -->
          <div class="flex-1">
            <div class="flex items-start space-x-3">
              <div class="flex-shrink-0 text-3xl" aria-hidden="true">🍪</div>
              <div>
                <h3
                  id="cookie-consent-title"
                  class="text-lg font-bold text-gray-900 mb-2"
                >
                  Usamos cookies e dados pessoais
                </h3>
                <p
                  id="cookie-consent-description"
                  class="text-sm text-gray-600 leading-relaxed max-w-3xl"
                >
                  Este site utiliza cookies e coleta dados pessoais para
                  melhorar sua experiência, analisar o tráfego e personalizar
                  conteúdo, em conformidade com a
                  <strong class="text-purple-600"
                    >LGPD (Lei Geral de Proteção de Dados)</strong
                  >. Ao continuar navegando, você concorda com nossa
                  <router-link
                    to="/privacidade"
                    class="text-purple-600 hover:text-purple-700 underline font-medium"
                  >
                    Política de Privacidade
                  </router-link>
                  e
                  <router-link
                    to="/termos"
                    class="text-purple-600 hover:text-purple-700 underline font-medium"
                  >
                    Termos de Uso </router-link
                  >.
                </p>
              </div>
            </div>

            <!-- Detailed Options (Expandable) -->
            <div
              v-if="showDetails"
              class="mt-4 ml-11 space-y-3 bg-gray-50 p-4 rounded-lg"
            >
              <div class="flex items-start space-x-3">
                <input
                  id="cookie-necessary"
                  type="checkbox"
                  checked
                  disabled
                  class="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 cursor-not-allowed opacity-50"
                  aria-describedby="cookie-necessary-description"
                />
                <div class="flex-1">
                  <label
                    for="cookie-necessary"
                    class="text-sm font-semibold text-gray-900 cursor-not-allowed"
                  >
                    Cookies Necessários (Obrigatórios)
                  </label>
                  <p
                    id="cookie-necessary-description"
                    class="text-xs text-gray-600 mt-1"
                  >
                    Essenciais para o funcionamento básico do site. Não podem
                    ser desativados.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <input
                  id="cookie-analytics"
                  v-model="preferences.analytics"
                  type="checkbox"
                  class="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  aria-describedby="cookie-analytics-description"
                />
                <div class="flex-1">
                  <label
                    for="cookie-analytics"
                    class="text-sm font-semibold text-gray-900 cursor-pointer"
                  >
                    Cookies Analíticos
                  </label>
                  <p
                    id="cookie-analytics-description"
                    class="text-xs text-gray-600 mt-1"
                  >
                    Coletam informações sobre como você usa o site para nos
                    ajudar a melhorar.
                  </p>
                </div>
              </div>

              <div class="flex items-start space-x-3">
                <input
                  id="cookie-marketing"
                  v-model="preferences.marketing"
                  type="checkbox"
                  class="mt-1 w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer"
                  aria-describedby="cookie-marketing-description"
                />
                <div class="flex-1">
                  <label
                    for="cookie-marketing"
                    class="text-sm font-semibold text-gray-900 cursor-pointer"
                  >
                    Cookies de Marketing
                  </label>
                  <p
                    id="cookie-marketing-description"
                    class="text-xs text-gray-600 mt-1"
                  >
                    Usados para exibir anúncios relevantes e medir a eficácia
                    das campanhas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div
            class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto"
          >
            <button
              v-if="!showDetails"
              @click="showDetails = true"
              class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 whitespace-nowrap"
              aria-label="Personalizar preferências de cookies"
            >
              ⚙️ Personalizar
            </button>

            <button
              v-if="showDetails"
              @click="handleSavePreferences"
              class="px-4 py-2.5 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 whitespace-nowrap"
              aria-label="Salvar preferências personalizadas"
            >
              💾 Salvar Preferências
            </button>

            <button
              v-if="!showDetails"
              @click="handleRejectAll"
              class="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 whitespace-nowrap"
              aria-label="Aceitar apenas cookies necessários"
            >
              ✋ Apenas Necessários
            </button>

            <button
              @click="handleAcceptAll"
              class="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 shadow-md whitespace-nowrap"
              aria-label="Aceitar todos os cookies"
            >
              ✅ Aceitar Todos
            </button>
          </div>
        </div>

        <!-- LGPD Information -->
        <div
          class="mt-4 ml-11 flex items-start space-x-2 text-xs text-gray-500"
        >
          <span class="flex-shrink-0" aria-hidden="true">🔒</span>
          <p>
            Seus dados estão seguros. Você pode alterar suas preferências a
            qualquer momento. Saiba mais sobre seus direitos em nossa
            <router-link
              to="/privacidade"
              class="text-purple-600 hover:text-purple-700 underline font-medium"
            >
              Política de Privacidade </router-link
            >.
          </p>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useConsent } from "../../composables/useConsent";
import { useToast } from "../../composables/useToast";

const { showBanner, loadConsent, acceptAll, rejectAll, saveConsent } =
  useConsent();
const toast = useToast();

const showDetails = ref(false);
const preferences = ref({
  necessary: true,
  analytics: true,
  marketing: false,
});

const handleAcceptAll = () => {
  acceptAll();
  toast.success("Preferências salvas", "Todos os cookies foram aceitos.");
};

const handleRejectAll = () => {
  rejectAll();
  toast.info("Preferências salvas", "Apenas cookies necessários serão usados.");
};

const handleSavePreferences = () => {
  saveConsent(preferences.value);
  toast.success(
    "Preferências salvas",
    "Suas preferências foram atualizadas com sucesso."
  );
};

onMounted(() => {
  loadConsent();
});
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.4s ease;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>

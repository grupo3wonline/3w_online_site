<template>
  <Transition name="slide-up">
    <aside
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white shadow-2xl border-t-4 border-red-600"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div class="flex-1">
            <h3
              id="cookie-banner-title"
              class="text-lg font-semibold mb-2 flex items-center"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Aviso sobre Cookies e Privacidade
            </h3>
            <p
              id="cookie-banner-description"
              class="text-gray-300 text-sm leading-relaxed"
            >
              Este site utiliza cookies para melhorar sua experiência de
              navegação, analisar o tráfego do site e personalizar conteúdo.
              Utilizamos o Google Analytics para análise estatística. Ao
              continuar navegando, você concorda com nossa
              <router-link
                to="/politica-privacidade"
                class="text-red-400 hover:text-red-300 underline font-medium"
                >Política de Privacidade</router-link
              >
              e
              <router-link
                to="/termos-uso"
                class="text-red-400 hover:text-red-300 underline font-medium"
                >Termos de Uso</router-link
              >.
            </p>
          </div>
          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              @click="rejectCookies"
              class="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 text-sm whitespace-nowrap"
              aria-label="Rejeitar cookies opcionais"
            >
              Apenas Necessários
            </button>
            <button
              @click="acceptCookies"
              class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 text-sm whitespace-nowrap shadow-lg"
              aria-label="Aceitar todos os cookies"
            >
              Aceitar Todos
            </button>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showBanner = ref(false);

const COOKIE_CONSENT_KEY = "cookie_consent";
const COOKIE_CONSENT_DATE = "cookie_consent_date";

onMounted(() => {
  checkCookieConsent();
});

const checkCookieConsent = () => {
  const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
  const consentDate = localStorage.getItem(COOKIE_CONSENT_DATE);

  // Mostrar banner se não houver consentimento ou se passou mais de 6 meses
  if (!consent || !consentDate) {
    showBanner.value = true;
  } else {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    if (new Date(consentDate) < sixMonthsAgo) {
      showBanner.value = true;
    }
  }
};

const acceptCookies = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
  localStorage.setItem(COOKIE_CONSENT_DATE, new Date().toISOString());
  showBanner.value = false;

  // Habilitar Google Analytics se já não estiver
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "granted",
    });
  }
};

const rejectCookies = () => {
  localStorage.setItem(COOKIE_CONSENT_KEY, "rejected");
  localStorage.setItem(COOKIE_CONSENT_DATE, new Date().toISOString());
  showBanner.value = false;

  // Desabilitar Google Analytics
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
    });
  }
};
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
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

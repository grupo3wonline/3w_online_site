<template>
  <Teleport to="body">
    <Transition name="cookie-banner">
      <div
        v-if="!accepted"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t-2 border-primary-500 shadow-2xl"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div class="flex items-start space-x-3 flex-1">
              <svg
                class="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fill-rule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                  clip-rule="evenodd"
                />
              </svg>
              <div class="flex-1">
                <p
                  class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed"
                >
                  Usamos cookies essenciais para garantir o funcionamento do
                  site e cookies de preferência para melhorar sua experiência.
                  Ao continuar navegando, você concorda com nossa
                  <router-link
                    to="/privacidade"
                    class="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >Política de Privacidade</router-link
                  >
                  e
                  <router-link
                    to="/termos"
                    class="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                    >Termos de Uso</router-link
                  >.
                </p>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <button
                @click="acceptCookies"
                class="px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg whitespace-nowrap"
              >
                Aceitar
              </button>
              <button
                @click="rejectCookies"
                class="px-6 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold rounded-lg transition-colors duration-200 whitespace-nowrap"
              >
                Recusar
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";

const accepted = ref(true);

onMounted(() => {
  // Check if user has already accepted or rejected cookies
  const cookieConsent = localStorage.getItem("cookie-consent");

  if (!cookieConsent) {
    // Show banner after a short delay for better UX
    setTimeout(() => {
      accepted.value = false;
    }, 1000);
  }
});

const acceptCookies = () => {
  localStorage.setItem("cookie-consent", "accepted");
  accepted.value = true;

  // Here you can initialize analytics or other tracking services
  // Example: initializeGoogleAnalytics()
};

const rejectCookies = () => {
  localStorage.setItem("cookie-consent", "rejected");
  accepted.value = true;

  // Disable non-essential cookies
  // Only essential cookies will be used
};
</script>

<style scoped>
.cookie-banner-enter-active,
.cookie-banner-leave-active {
  transition: all 0.4s ease;
}

.cookie-banner-enter-from {
  opacity: 0;
  transform: translateY(100%);
}

.cookie-banner-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>

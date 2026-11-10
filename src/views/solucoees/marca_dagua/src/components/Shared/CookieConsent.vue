<template>
  <Transition name="slide-up">
    <div
      v-if="showBanner"
      class="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-2xl border-t-4 border-blue-500 dark:border-blue-400"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div class="container mx-auto px-4 py-6 max-w-6xl">
        <div
          class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        >
          <div class="flex-1">
            <div class="flex items-start gap-3">
              <i class="fas fa-cookie-bite text-3xl text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1"></i>
              <div>
                <h3 id="cookie-consent-title" class="font-bold text-gray-900 dark:text-white mb-2 text-lg">
                  🔒 Privacidade e Proteção de Dados (LGPD)
                </h3>
                <p id="cookie-consent-description" class="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  Este site utiliza cookies <strong>apenas essenciais</strong> para garantir o funcionamento adequado e salvar suas preferências (como tema claro/escuro). 
                  <span class="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-semibold">
                    <i class="fas fa-shield-alt mr-1"></i>
                    100% SEGURO
                  </span>
                </p>
                <p class="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  <i class="fas fa-check-circle text-green-500 mr-1"></i>
                  Todas as imagens são processadas <strong>localmente no seu navegador</strong> e 
                  <strong class="text-blue-600 dark:text-blue-400">nunca são enviadas para nossos servidores</strong>.
                </p>
                <p class="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  Ao continuar navegando, você concorda com nossa 
                  <router-link
                    to="/politica-de-privacidade"
                    class="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <i class="fas fa-file-shield mr-1"></i>Política de Privacidade
                  </router-link>
                  e
                  <router-link
                    to="/termos-de-uso"
                    class="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    <i class="fas fa-file-contract mr-1"></i>Termos de Uso
                  </router-link>.
                </p>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              @click="rejectCookies"
              class="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 font-medium flex items-center justify-center gap-2"
            >
              <i class="fas fa-times-circle"></i>
              Rejeitar
            </button>
            <button
              @click="acceptCookies"
              class="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <i class="fas fa-check-circle"></i>
              Aceitar e Continuar
            </button>
          </div>
        </div>

        <!-- Additional Info -->
        <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <details class="text-sm">
            <summary class="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-2">
              <i class="fas fa-info-circle"></i>
              Saiba mais sobre como protegemos seus dados
            </summary>
            <div class="mt-3 pl-6 space-y-2 text-gray-600 dark:text-gray-400">
              <p class="flex items-start gap-2">
                <i class="fas fa-lock text-green-500 mt-0.5"></i>
                <span><strong>Processamento Local:</strong> Suas imagens são processadas 100% no seu navegador usando JavaScript. Nada é enviado para nossos servidores.</span>
              </p>
              <p class="flex items-start gap-2">
                <i class="fas fa-user-shield text-blue-500 mt-0.5"></i>
                <span><strong>Privacidade Total:</strong> Não coletamos, armazenamos ou compartilhamos suas imagens ou dados pessoais.</span>
              </p>
              <p class="flex items-start gap-2">
                <i class="fas fa-cookie text-yellow-600 mt-0.5"></i>
                <span><strong>Cookies Essenciais:</strong> Usamos apenas cookies necessários para salvar suas preferências (tema, idioma).</span>
              </p>
              <p class="flex items-start gap-2">
                <i class="fas fa-chart-line text-purple-500 mt-0.5"></i>
                <span><strong>Analytics:</strong> Utilizamos Google Analytics apenas para entender como melhorar a ferramenta, sem identificar usuários individualmente.</span>
              </p>
              <p class="flex items-start gap-2">
                <i class="fas fa-balance-scale text-indigo-500 mt-0.5"></i>
                <span><strong>Conformidade LGPD:</strong> Em total conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</span>
              </p>
            </div>
          </details>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useStorage } from "@vueuse/core";

const cookieConsent = useStorage("cookie-consent", null);
const showBanner = ref(false);

onMounted(() => {
  // Show banner only if user hasn't made a choice yet
  if (cookieConsent.value === null) {
    // Small delay to make the animation smoother
    setTimeout(() => {
      showBanner.value = true;
    }, 1000);
  }
});

const acceptCookies = () => {
  cookieConsent.value = "accepted";
  showBanner.value = false;
  
  // Track consent in Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
};

const rejectCookies = () => {
  cookieConsent.value = "rejected";
  showBanner.value = false;
  
  // Disable analytics if rejected
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': 'denied'
    });
  }
};
</script>

<style scoped>
.slide-up-enter-active {
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.slide-up-leave-active {
  transition: all 0.3s ease-in;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

details summary::-webkit-details-marker {
  display: none;
}

details[open] summary i {
  transform: rotate(90deg);
}

details summary i {
  transition: transform 0.3s ease;
}
</style>

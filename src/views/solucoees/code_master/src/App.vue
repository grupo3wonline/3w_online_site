<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
    <router-view></router-view>

    <!-- Cookie Consent Banner (LGPD) -->
    <div v-if="!cookieAccepted" class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-50 flex flex-col md:flex-row items-center justify-between gap-4 transition-transform transform translate-y-0" :class="{ 'translate-y-full': cookieAccepted }">
      <div class="text-sm text-gray-600 dark:text-gray-300 max-w-4xl">
        <p><strong>Este site utiliza cookies.</strong> Usamos cookies para melhorar sua experiência, personalizar publicidade e recomendar conteúdo de seu interesse. Ao continuar navegando, você concorda com a nossa <router-link to="/politica-privacidade" class="text-purple-600 hover:underline">Política de Privacidade</router-link>.</p>
      </div>
      <div class="flex gap-2 shrink-0">
        <button @click="acceptCookies" class="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium text-sm transition-colors shadow-lg shadow-purple-500/30">
          Aceitar e Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const cookieAccepted = ref(true); // Default true to avoid flash, check in mounted

onMounted(() => {
  const stored = localStorage.getItem('cm_cookies_accepted');
  if (!stored) {
    cookieAccepted.value = false;
  }
});

const acceptCookies = () => {
  localStorage.setItem('cm_cookies_accepted', 'true');
  cookieAccepted.value = true;
};
</script>

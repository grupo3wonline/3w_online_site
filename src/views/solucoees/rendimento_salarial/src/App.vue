<template>
  <div
    id="app"
    class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300"
  >
    <AppHeader />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter />

    <!-- Toast Notifications -->
    <ToastNotification :toasts="toasts" @remove="removeToast" />

    <!-- Cookie Consent Banner -->
    <CookieConsent />
  </div>
</template>

<script>
import { provide, onMounted } from "vue";
import AppHeader from "@/components/AppHeader.vue";
import AppFooter from "@/components/AppFooter.vue";
import ToastNotification from "@/components/ui/ToastNotification.vue";
import CookieConsent from "@/components/CookieConsent.vue";
import { useToast } from "@/composables/useToast";
import { useDarkMode } from "@/composables/useDarkMode";
import { useConsent } from "@/composables/useConsent";

export default {
  name: "App",
  components: {
    AppHeader,
    AppFooter,
    ToastNotification,
    CookieConsent,
  },
  setup() {
    // Inicializa dark mode
    const { initialize: initDarkMode } = useDarkMode();
    initDarkMode();

    // Setup global toast
    const { toasts, removeToast } = useToast();

    // Provide toast para componentes filhos
    provide("toast", { toasts, removeToast });

    // Inicializa sistema de consentimento LGPD
    const { initialize: initConsent } = useConsent();
    onMounted(() => {
      initConsent();
    });

    return {
      toasts,
      removeToast,
    };
  },
};
</script>

<style>
#app {
  font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Dark mode support */
:root {
  color-scheme: light dark;
}

@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: dark;
  }
}
</style>

<template>
  <div id="app" :class="isDark ? 'dark' : ''" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
    <Navbar />
    <router-view />
    <Footer />
    <CookieConsent />
    <NotificationToast />
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { useDarkMode } from './composables/useDarkMode'
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import CookieConsent from "./components/CookieConsent.vue";
import NotificationToast from "./components/NotificationToast.vue";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    CookieConsent,
    NotificationToast,
  },
  setup() {
    const { isDark } = useDarkMode()

    onMounted(() => {
      // Inicializa tema
      const savedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.classList.add('dark')
      }
    })

    return {
      isDark
    }
  }
};
</script>

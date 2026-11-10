<template>
  <div id="app" class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Cookie Consent Banner -->
    <CookieConsent />

    <!-- Back to Top Button -->
    <BackToTop />

    <!-- Header -->
    <Header />

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
          enter-active-class="transition ease-out duration-200"
          enter-from-class="opacity-0 transform translate-y-2"
          enter-to-class="opacity-100 transform translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CookieConsent from './components/CookieConsent.vue'
import BackToTop from './components/BackToTop.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useDarkMode } from './composables/useDarkMode'

const router = useRouter()
const { initTheme } = useDarkMode()

onMounted(() => {
  // Inicializar tema
  initTheme()
  
  // Track pageview no Google Analytics
  if (window.gtag) {
    router.afterEach((to) => {
      window.gtag('config', 'G-J06THXX0MW', {
        page_path: to.path,
        page_title: to.meta.title || document.title,
        page_location: window.location.href
      })
    })
  }
  
  // Track pageview no GTM
  if (window.dataLayer) {
    router.afterEach((to) => {
      window.dataLayer.push({
        event: 'pageview',
        page: {
          path: to.path,
          title: to.meta.title || document.title,
          location: window.location.href
        }
      })
    })
  }
})
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

main {
  flex: 1;
}

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Dark mode support */
html.dark {
  color-scheme: dark;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

html.dark ::-webkit-scrollbar-track {
  background: #1f2937;
}

::-webkit-scrollbar-thumb {
  background: #dc2626;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b91c1c;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Loading animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

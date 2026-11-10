<template>
  <div id="app" class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Navigation -->
    <NavBar />

    <!-- Main Content -->
    <main class="flex-1">
      <router-view v-slot="{ Component }">
        <transition
          name="fade"
          mode="out-in"
          @before-enter="beforeEnter"
          @enter="enter"
          @leave="leave"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- Toast Notifications -->
    <ToastContainer />

    <!-- Cookie Consent Banner -->
    <CookieConsent />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onErrorCaptured } from "vue";
import NavBar from "./components/NavBar.vue";
import AppFooter from "./components/AppFooter.vue";
import ToastContainer from "./components/common/ToastContainer.vue";
import CookieConsent from "./components/common/CookieConsent.vue";
import { useToast } from "./composables/useToast";
import { trackError } from "./utils/analytics";

const toast = useToast();

// Page transition handlers
const beforeEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
};

const enter = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  setTimeout(() => {
    element.style.transition = "opacity 0.3s ease, transform 0.3s ease";
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    setTimeout(done, 300);
  }, 10);
};

const leave = (el: Element, done: () => void) => {
  const element = el as HTMLElement;
  element.style.transition = "opacity 0.2s ease, transform 0.2s ease";
  element.style.opacity = "0";
  element.style.transform = "translateY(-20px)";
  setTimeout(done, 200);
};

// Global error handler
onErrorCaptured((err, instance, info) => {
  console.error("Error captured:", err, info);

  // Track error
  trackError("app_error", err.message);

  // Show user-friendly error message
  toast.error(
    "Ocorreu um erro",
    "Algo deu errado. Por favor, tente novamente."
  );

  // Prevent error from propagating
  return false;
});

// Initialize app
onMounted(() => {
  // Remove loading screen if exists
  const loader = document.getElementById("app-loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 300);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>

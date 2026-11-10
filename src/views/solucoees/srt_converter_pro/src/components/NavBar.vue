<template>
  <nav
    class="bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-50 transition-all duration-200"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link
          to="/"
          class="flex items-center space-x-3 text-xl font-bold text-purple-600 hover:text-purple-700 transition-all duration-200 group"
        >
          <LogoIcon
            class="w-8 h-8 group-hover:scale-110 transition-transform duration-200"
          />
          <span class="hidden sm:block">SRT Converter Pro</span>
          <span class="sm:hidden">SRT Pro</span>
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-6">
          <router-link
            to="/"
            class="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
            :class="{ 'text-purple-600 bg-purple-50': $route.name === 'Home' }"
          >
            🏠 Início
          </router-link>
          <router-link
            to="/sobre"
            class="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
            :class="{ 'text-purple-600 bg-purple-50': $route.name === 'About' }"
          >
            ℹ️ Sobre
          </router-link>

          <router-link
            to="/contato"
            class="text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50"
            :class="{
              'text-purple-600 bg-purple-50': $route.name === 'Contact',
            }"
          >
            💬 Contato
          </router-link>

          <div class="flex items-center space-x-3">
            <router-link
              to="/converter"
              class="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              ⚡ Converter Agora
            </router-link>

            <!-- Theme toggle -->
            <button
              @click="handleCycleClick"
              title="Alternar tema (claro / escuro / sistema)"
              class="ml-2 p-2 rounded-md text-gray-700 hover:text-purple-600"
              :aria-pressed="isDark"
            >
              <i
                :class="
                  theme === 'auto'
                    ? 'fa-solid fa-adjust'
                    : isDark
                      ? 'fa-solid fa-sun'
                      : 'fa-solid fa-moon'
                "
              ></i>
            </button>

            <!-- Help button -->
            <button
              @click="helpOpen = true"
              title="Ajuda"
              class="ml-2 p-2 rounded-md text-gray-700 hover:text-purple-600"
            >
              <i class="fa-solid fa-circle-question"></i>
            </button>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            class="text-gray-700 hover:text-purple-600 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            :class="{ 'text-purple-600 bg-purple-50': isMobileMenuOpen }"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!isMobileMenuOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm animate-slide-down"
    >
      <div class="px-4 py-3 space-y-3">
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50 w-full"
          :class="{ 'text-purple-600 bg-purple-50': $route.name === 'Home' }"
        >
          <span>🏠</span>
          <span>Início</span>
        </router-link>

        <router-link
          to="/contato"
          @click="closeMobileMenu"
          class="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50 w-full"
          :class="{ 'text-purple-600 bg-purple-50': $route.name === 'Contact' }"
        >
          <span>💬</span>
          <span>Contato</span>
        </router-link>

        <router-link
          to="/sobre"
          @click="closeMobileMenu"
          class="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors px-3 py-2 rounded-lg hover:bg-purple-50 w-full"
          :class="{ 'text-purple-600 bg-purple-50': $route.name === 'About' }"
        >
          <span>ℹ️</span>
          <span>Sobre</span>
        </router-link>

        <router-link
          to="/converter"
          @click="closeMobileMenu"
          class="flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 w-full shadow-lg"
        >
          <span>⚡</span>
          <span>Converter Agora</span>
        </router-link>

        <div class="pt-3">
          <button
            @click="handleCycleClick"
            class="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:text-purple-600 bg-white/50"
            :aria-pressed="isDark"
            aria-label="Alternar tema (claro, escuro, sistema)"
          >
            <i
              :class="
                theme === 'auto'
                  ? 'fa-solid fa-adjust'
                  : isDark
                    ? 'fa-solid fa-sun'
                    : 'fa-solid fa-moon'
              "
            ></i>
            <span
              >Alternar tema —
              <span class="font-semibold">{{ theme }}</span></span
            >
          </button>
        </div>
      </div>
    </div>
  </nav>
  <span class="sr-only" aria-live="polite" aria-atomic="true">{{
    themeMessage
  }}</span>
  <HelpModal :open="helpOpen" @close="helpOpen = false" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useToast } from "@/composables/useToast";
import { useRoute } from "vue-router";
import LogoIcon from "../components/icons/LogoIcon.vue";
import { useTheme } from "@/composables/useTheme";
import HelpModal from "./common/HelpModal.vue";

const $route = useRoute();
const isMobileMenuOpen = ref(false);
const helpOpen = ref(false);
const { theme, isDark, cycleTheme } = useTheme();
const { success: toastSuccess } = useToast();
const themeMessage = ref("");

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Keyboard shortcut: Shift+T to cycle theme
const _handleKeydown = (e: KeyboardEvent) => {
  if ((e.key === "T" || e.key === "t") && e.shiftKey) {
    cycleTheme();
    themeMessage.value = `Tema: ${theme.value}`;
    toastSuccess("Tema alterado", `Tema: ${theme.value}`);
    // clear after announcement
    setTimeout(() => (themeMessage.value = ""), 2000);
    e.preventDefault();
  }
};

onMounted(() => {
  window.addEventListener("keydown", _handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", _handleKeydown);
});

const handleCycleClick = () => {
  cycleTheme();
  themeMessage.value = `Tema: ${theme.value}`;
  toastSuccess("Tema alterado", `Tema: ${theme.value}`);
  setTimeout(() => (themeMessage.value = ""), 2000);
};
</script>

<template>
  <nav
    class="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo and brand -->
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-2 group">
            <div
              class="bg-primary-600 dark:bg-primary-500 p-2 rounded-lg group-hover:scale-110 transition-transform"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 dark:text-white"
              >InvestSim</span
            >
          </router-link>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-6">
            <router-link
              to="/"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{
                'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-700':
                  $route.name === 'Home',
              }"
            >
              Início
            </router-link>
            <router-link
              to="/simulador"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{
                'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-700':
                  $route.name === 'Simulator',
              }"
            >
              Simulador
            </router-link>
            <router-link
              to="/sobre"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{
                'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-700':
                  $route.name === 'About',
              }"
            >
              Sobre
            </router-link>
            <router-link
              to="/contato"
              class="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="{
                'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-700':
                  $route.name === 'Contact',
              }"
            >
              Contato
            </router-link>

            <!-- Dark Mode Toggle -->
            <button
              @click="toggleDarkMode"
              class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              aria-label="Toggle dark mode"
            >
              <svg
                v-if="!isDark"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </button>

            <a
              href="https://www.3wonline.com.br/contact/"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary text-sm"
            >
              Suporte
            </a>
          </div>
        </div>

        <!-- Mobile menu button & Dark mode -->
        <div class="md:hidden flex items-center gap-2">
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            <svg
              v-if="!isDark"
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>
            <svg
              v-else
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>

          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white p-2"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileMenuOpen"
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

      <!-- Mobile Navigation -->
      <div v-if="mobileMenuOpen" class="md:hidden animate-slide-down">
        <div
          class="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2"
        >
          <router-link
            to="/"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-600"
            :class="{
              'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-600':
                $route.name === 'Home',
            }"
          >
            Início
          </router-link>
          <router-link
            to="/simulador"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-600"
            :class="{
              'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-600':
                $route.name === 'Simulator',
            }"
          >
            Simulador
          </router-link>
          <router-link
            to="/sobre"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-600"
            :class="{
              'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-600':
                $route.name === 'About',
            }"
          >
            Sobre
          </router-link>
          <router-link
            to="/contato"
            @click="mobileMenuOpen = false"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-600"
            :class="{
              'text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-gray-600':
                $route.name === 'Contact',
            }"
          >
            Contato
          </router-link>
          <a
            href="https://www.3wonline.com.br/contact/"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-3 py-2 rounded-md text-base font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-gray-600"
          >
            Suporte
          </a>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <InfoModal
      v-if="activeModal"
      :type="activeModal"
      @close="activeModal = null"
    />
  </nav>
</template>

<script setup>
import { ref } from "vue";
import InfoModal from "./InfoModal.vue";
import { useDarkMode } from "../composables/useDarkMode";

const { isDark, toggle } = useDarkMode();
const mobileMenuOpen = ref(false);
const activeModal = ref(null);

const openModal = (type) => {
  activeModal.value = type;
};

const toggleDarkMode = () => {
  toggle();
};
</script>

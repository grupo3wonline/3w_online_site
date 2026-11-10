<template>
  <header
    class="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300"
  >
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center space-x-2 group">
          <div
            class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200 shadow-lg"
          >
            <i class="fas fa-weight text-white text-xl"></i>
          </div>
          <span class="text-xl font-bold text-gray-900 dark:text-white"
            >Seu Peso</span
          >
        </router-link>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1">
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            :class="
              isActive(item.path)
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            "
          >
            {{ item.label }}
          </router-link>
        </div>

        <!-- Right side buttons -->
        <div class="flex items-center space-x-2">
          <!-- Dark Mode Toggle -->
          <button
            @click="toggleDarkMode"
            class="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            :aria-label="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
            :title="isDark ? 'Ativar modo claro' : 'Ativar modo escuro'"
          >
            <i :class="isDark ? 'fas fa-sun' : 'fas fa-moon'" class="text-lg"></i>
          </button>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            aria-label="Menu"
          >
            <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'" class="text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition name="mobile-menu">
        <div
          v-if="mobileMenuOpen"
          class="md:hidden py-4 border-t border-gray-200 dark:border-gray-700"
        >
          <router-link
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            @click="closeMobileMenu"
            class="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
            :class="
              isActive(item.path)
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30'
                : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            "
          >
            {{ item.label }}
          </router-link>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useDarkMode } from "@/composables/useDarkMode";

const route = useRoute();
const { isDark, toggleDarkMode } = useDarkMode();
const mobileMenuOpen = ref(false);

const navItems = [
  { label: "Início", path: "/" },
  { label: "Calculadora", path: "/calculadora" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];

const isActive = (path) => {
  return route.path === path;
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = () => {
  mobileMenuOpen.value = false;
};
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

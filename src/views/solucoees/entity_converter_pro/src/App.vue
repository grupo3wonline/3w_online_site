<script setup>
import { provide } from 'vue'
import HeaderSection from './components/HeaderSection.vue'
import FooterSection from './components/FooterSection.vue'
import CookieBanner from './components/CookieBanner.vue'
import { useDarkMode } from './composables/useDarkMode'

// Usar composable de dark mode
const { isDark, toggleDarkMode } = useDarkMode()

// Provide dark mode para componentes filhos (caso necessário)
provide('darkMode', isDark)
provide('toggleDarkMode', toggleDarkMode)
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 transition-colors duration-300">
    <!-- Header fixo em todas as páginas -->
    <HeaderSection :dark-mode="isDark" @toggle-dark-mode="toggleDarkMode" />
    
    <!-- Conteúdo principal com router-view -->
    <main class="flex-grow pt-16">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <!-- Footer fixo em todas as páginas -->
    <FooterSection />
    
    <!-- Cookie Banner LGPD -->
    <CookieBanner />
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

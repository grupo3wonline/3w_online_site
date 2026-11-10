<template>
  <div class="flex flex-col min-h-screen">
    <!-- Navbar -->
    <header class="sticky top-0 z-40 w-full backdrop-blur flex-none border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 supports-backdrop-blur:bg-white/60 dark:supports-backdrop-blur:bg-gray-900/60 transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <router-link to="/" class="flex items-center gap-2 group">
              <div class="bg-gradient-to-br from-purple-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <i class="fas fa-code text-white text-sm"></i>
              </div>
              <span class="font-bold text-xl tracking-tight text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">CodeMaster</span>
            </router-link>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <router-link to="/" class="nav-link" active-class="active">Home</router-link>
              <router-link to="/app" class="nav-link" active-class="active">Ferramenta</router-link>
              <router-link to="/sobre" class="nav-link" active-class="active">Sobre</router-link>
              <router-link to="/servicos" class="nav-link" active-class="active">Serviços</router-link>
              <router-link to="/contato" class="nav-link" active-class="active">Contato</router-link>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-4">
            <button @click="toggleDarkMode" class="text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <i class="fas" :class="isDark ? 'fa-sun' : 'fa-moon'"></i>
            </button>
            <router-link to="/app" class="hidden md:inline-flex items-center justify-center px-5 py-2 border border-transparent text-sm font-medium rounded-full text-white bg-purple-600 hover:bg-purple-700 shadow-lg shadow-purple-500/30 transition-all hover:-translate-y-0.5">
              Começar Agora
            </router-link>
             <!-- Mobile menu button -->
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span class="sr-only">Open main menu</span>
              <i class="fas fa-bars" v-if="!mobileMenuOpen"></i>
              <i class="fas fa-times" v-else></i>
            </button>
          </div>
        </div>
      </div>

       <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <router-link to="/" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:bg-purple-600" @click="mobileMenuOpen=false">Home</router-link>
          <router-link to="/app" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:bg-purple-600" @click="mobileMenuOpen=false">Ferramenta</router-link>
          <router-link to="/sobre" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:bg-purple-600" @click="mobileMenuOpen=false">Sobre</router-link>
          <router-link to="/servicos" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:bg-purple-600" @click="mobileMenuOpen=false">Serviços</router-link>
          <router-link to="/contato" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-white hover:bg-purple-600" @click="mobileMenuOpen=false">Contato</router-link>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot></slot>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pt-12 pb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="bg-gradient-to-br from-purple-600 to-indigo-600 w-8 h-8 rounded-lg flex items-center justify-center">
                <i class="fas fa-code text-white text-sm"></i>
              </div>
              <span class="font-bold text-xl text-gray-900 dark:text-white">CodeMaster</span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Sua plataforma de desenvolvimento web profissional.
            </p>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Produto</h3>
            <ul class="space-y-3">
              <li><router-link to="/app" class="text-base text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Editor Online</router-link></li>
              <li><router-link to="/servicos" class="text-base text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Serviços</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Legal</h3>
            <ul class="space-y-3">
              <li><router-link to="/politica-privacidade" class="text-base text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Política de Privacidade</router-link></li>
              <li><router-link to="/termos-uso" class="text-base text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Termos de Uso</router-link></li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">Contato</h3>
            <ul class="space-y-3">
               <li><a href="https://www.3wonline.com.br" target="_blank" class="text-base text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">Grupo 3w Online</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-base text-gray-400 text-center md:text-left">
            &copy; 2026 Grupo 3w Online. Todos os direitos reservados.
          </p>
          <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
             <span>Sistema desenvolvido pelo desenvolvedor hotwyl - willfrombrasil</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);
const mobileMenuOpen = ref(false);

const toggleDarkMode = () => {
    isDark.value = !isDark.value;
    if (isDark.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
};

onMounted(() => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        isDark.value = true;
        document.documentElement.classList.add('dark');
    } else {
        isDark.value = false;
        document.documentElement.classList.remove('dark');
    }
});
</script>

<style scoped>
.nav-link {
    @apply text-gray-500 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-3 py-2 rounded-md text-sm font-medium transition-colors;
}
.nav-link.active {
    @apply text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/10;
}
</style>

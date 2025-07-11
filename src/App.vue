<template>
  <div id="app">
    <!-- Skip Link for Accessibility -->
    <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
    
    <!-- Navigation -->
    <Navbar />
    
    <!-- Main Content -->
    <main id="main-content">
      <router-view />
    </main>
    
    <!-- Footer -->
    <Footer />
    
    <!-- WhatsApp Float Button -->
    <WhatsAppFloat />
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import WhatsAppFloat from './components/WhatsAppFloat.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
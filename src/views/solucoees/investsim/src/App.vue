<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- Navigation -->
    <Navigation />

    <!-- Main Content -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Cookie Consent Banner (LGPD) -->
    <CookieConsent />
  </div>
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
import CookieConsent from "./components/CookieConsent.vue";
</script>

<style>
/* Any global styles that aren't covered by Tailwind */
</style>

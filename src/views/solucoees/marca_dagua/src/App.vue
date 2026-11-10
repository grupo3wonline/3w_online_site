<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition
        name="page"
        mode="out-in"
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- Cookie Consent Banner -->
    <CookieConsent />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useTheme } from "@/composables/useTheme";
import CookieConsent from "@/components/Shared/CookieConsent.vue";

const { applyTheme, theme } = useTheme();

onMounted(() => {
  applyTheme(theme.value);
});
</script>

<style>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

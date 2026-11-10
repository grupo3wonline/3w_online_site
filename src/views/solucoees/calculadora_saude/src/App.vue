<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import AppHeader from '@/components/layout/AppHeader.vue';
import AppFooter from '@/components/layout/AppFooter.vue';
import CookieBanner from '@/components/common/CookieBanner.vue';
import LoadingOverlay from '@/components/common/LoadingOverlay.vue';
import BaseModal from '@/components/common/BaseModal.vue';
import TermsOfService from '@/components/legal/TermsOfService.vue';
import PrivacyPolicy from '@/components/legal/PrivacyPolicy.vue';
import { useUiStore } from '@/stores/ui';

const ui = useUiStore();
const route = useRoute();

// Mostra breadcrumb apenas fora da home (a landing tem navegação própria por âncoras)
const isLanding = computed(() => route.name === 'home');
</script>

<template>
  <div class="flex min-h-screen flex-col bg-white transition-colors duration-300 dark:bg-gray-900">
    <AppHeader />

    <main
      id="conteudo"
      class="flex-grow"
      :class="{ 'pt-0': isLanding }"
    >
      <RouterView v-slot="{ Component }">
        <Transition
          name="fade"
          mode="out-in"
        >
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <AppFooter />

    <CookieBanner />
    <LoadingOverlay />

    <BaseModal
      :open="ui.showTermsModal"
      title="Termos de Uso"
      @close="ui.closeTerms()"
    >
      <TermsOfService />
    </BaseModal>

    <BaseModal
      :open="ui.showPrivacyModal"
      title="Política de Privacidade"
      @close="ui.closePrivacy()"
    >
      <PrivacyPolicy />
    </BaseModal>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

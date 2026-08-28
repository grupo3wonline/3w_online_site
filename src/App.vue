<template>
  <div id="app" class="flex flex-col min-h-screen">
    <!-- Skip Link (Acessibilidade) -->
    <a href="#main-content" class="skip-link">
      Pular para o conteúdo principal
    </a>

    <!-- Loading Overlay Global -->
    <Transition name="fade">
      <div v-if="isLoading" class="loading-overlay" role="alert" aria-live="polite">
        <div class="flex flex-col items-center gap-4">
          <div class="loading-spinner"></div>
          <p class="text-white font-medium text-sm">Carregando...</p>
        </div>
      </div>
    </Transition>

    <!-- Navbar -->
    <AppNavbar />

    <!-- Main Content -->
    <main id="main-content" class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <!-- Footer -->
    <AppFooter />

    <!-- WhatsApp Float -->
    <WhatsAppFloat />

    <!-- Cookie Banner LGPD -->
    <CookieBanner />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppNavbar from '@/components/layout/AppNavbar.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import WhatsAppFloat from '@/components/ui/WhatsAppFloat.vue'
import CookieBanner from '@/components/ui/CookieBanner.vue'
import { useUtm } from '@/composables/useUtm'

const router = useRouter()
const isLoading = ref(false)
const { captureUtmFromUrl } = useUtm()

// Loading global durante navegação de rota
router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 300)
})

onMounted(() => {
  isLoading.value = false
  captureUtmFromUrl()
})
</script>

<style>
/* Transições de página */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Transição de fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from './AppHeader.vue'
import AppFooter from './AppFooter.vue'
import Breadcrumb from '@/components/common/Breadcrumb.vue'
import CookieBanner from '@/components/common/CookieBanner.vue'
import BackToTop from '@/components/common/BackToTop.vue'

const route = useRoute()
// Breadcrumb aparece em todas as páginas exceto a landing e a 404
const showBreadcrumb = computed(() => route.meta.breadcrumb !== undefined)
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <Breadcrumb v-if="showBreadcrumb" />
    <main id="conteudo" class="flex-1">
      <slot />
    </main>
    <AppFooter />
    <CookieBanner />
    <BackToTop />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { RouterLink } from 'vue-router'
import { Button } from '@/components/ui'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { t } = useI18n()
const { showBanner, acceptAll, rejectAll, checkExistingConsent } = useCookieConsent()

onMounted(() => {
  checkExistingConsent()
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    enter-from-class="translate-y-full opacity-0"
    leave-active-class="transition duration-200"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="showBanner"
      class="fixed inset-x-0 bottom-0 z-[90] border-t border-border bg-background/95 shadow-2xl backdrop-blur"
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-desc"
    >
      <div
        class="container mx-auto flex flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div class="flex-1">
          <h2 id="cookie-title" class="mb-1 text-base font-semibold text-foreground">
            {{ t('cookies.title') }}
          </h2>
          <p id="cookie-desc" class="text-sm text-muted-foreground">
            {{ t('cookies.message') }}
            <RouterLink to="/politica-privacidade" class="text-primary underline">
              {{ t('cookies.learnMore') }}
            </RouterLink>
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row lg:w-auto">
          <Button variant="outline" class="w-full sm:w-auto" @click="rejectAll">
            {{ t('cookies.reject') }}
          </Button>
          <Button class="w-full sm:w-auto" @click="acceptAll">
            {{ t('cookies.accept') }}
          </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

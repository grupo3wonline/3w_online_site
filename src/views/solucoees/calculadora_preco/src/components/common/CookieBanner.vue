<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useConsentStore } from '@/stores/consent'
import { Button } from '@/components/ui/button'

const consent = useConsentStore()
const visible = ref(false)

onMounted(() => {
  if (!consent.hasDecided) {
    setTimeout(() => {
      visible.value = true
    }, 800)
  }
})

function accept() {
  consent.accept()
  visible.value = false
}

function decline() {
  consent.decline()
  visible.value = false
}
</script>

<template>
  <Transition name="cookie">
    <div v-if="visible" class="fixed inset-x-0 bottom-0 z-[90] p-4 md:p-6">
      <div class="container max-w-6xl">
        <div
          class="rounded-2xl border border-violet-200 bg-background/95 p-6 shadow-2xl backdrop-blur-xl dark:border-violet-800 md:p-8"
        >
          <div class="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div class="flex-1 space-y-3">
              <div class="flex items-center gap-3">
                <div class="rounded-lg bg-gradient-to-br from-violet-500 to-purple-500 p-2">
                  <Icon icon="fa6-solid:cookie-bite" class="h-5 w-5 text-white" />
                </div>
                <h3 class="text-lg font-bold text-foreground">{{ $t('cookie.title') }}</h3>
              </div>
              <p class="text-sm leading-relaxed text-muted-foreground">
                {{ $t('cookie.text') }}
              </p>
              <div class="flex flex-wrap gap-4 text-xs">
                <RouterLink
                  to="/privacidade"
                  class="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  <Icon icon="fa6-solid:shield-halved" class="h-3 w-3" />
                  {{ $t('cookie.privacy') }}
                </RouterLink>
                <RouterLink
                  to="/termos"
                  class="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                >
                  <Icon icon="fa6-solid:file-contract" class="h-3 w-3" />
                  {{ $t('cookie.terms') }}
                </RouterLink>
              </div>
            </div>

            <div class="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
              <Button variant="outline" class="whitespace-nowrap" @click="decline">
                <Icon icon="fa6-solid:circle-xmark" class="h-4 w-4" />
                {{ $t('cookie.decline') }}
              </Button>
              <Button class="whitespace-nowrap" @click="accept">
                <Icon icon="fa6-solid:circle-check" class="h-4 w-4" />
                {{ $t('cookie.accept') }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-enter-active,
.cookie-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}
.cookie-enter-from,
.cookie-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>

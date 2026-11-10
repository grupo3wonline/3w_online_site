<script setup lang="ts">
import { ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import Button from "@/components/ui/Button.vue";

/**
 * Banner de consentimento de cookies para conformidade
 * LGPD / GDPR / CCPA / POPIA. Registra a escolha do usuário.
 */
const STORAGE_KEY = "empreenda-facil-cookie-consent";
const visible = ref(false);

onMounted(() => {
  try {
    visible.value = !localStorage.getItem(STORAGE_KEY);
  } catch {
    visible.value = true;
  }
});

const decide = (choice: "accepted" | "rejected") => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, date: new Date().toISOString() }));
  } catch {
    /* armazenamento indisponível */
  }
  visible.value = false;
  // Sinaliza consentimento ao dataLayer (GTM/GA4)
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: "cookie_consent", consent: choice });
};
</script>

<template>
  <Transition
    enter-active-class="transition-transform duration-300"
    enter-from-class="translate-y-full"
  >
    <div
      v-if="visible"
      class="fixed inset-x-0 bottom-0 z-[150] border-t border-border bg-card/95 p-4 shadow-strong backdrop-blur"
      role="dialog"
      aria-label="Aviso de cookies e privacidade"
    >
      <div
        class="container mx-auto flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div class="flex items-start gap-3">
          <Icon icon="lucide:cookie" class="mt-0.5 h-6 w-6 shrink-0 text-primary" />
          <p class="text-sm text-muted-foreground">
            Utilizamos cookies para melhorar sua experiência e analisar o tráfego, em conformidade
            com LGPD, GDPR, CCPA e POPIA. Ao continuar, você concorda com nossa
            <RouterLink to="/privacidade" class="font-medium text-primary hover:underline">
              Política de Privacidade </RouterLink
            >.
          </p>
        </div>
        <div class="flex shrink-0 gap-2">
          <Button variant="outline" size="sm" @click="decide('rejected')">Rejeitar</Button>
          <Button size="sm" @click="decide('accepted')">Aceitar</Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import AppLogo from "@/components/brand/AppLogo.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import ThemeToggle from "@/components/ui/ThemeToggle.vue";

const router = useRouter();
const mobileOpen = ref(false);

/** Itens de navegacao (ancoras da landing). "Ferramentas" foi removido do menu. */
const navItems = [
  { label: "Início", hash: "#topo" },
  { label: "Benefícios", hash: "#beneficios" },
  { label: "Sobre", hash: "#sobre" },
  { label: "Serviços", hash: "#servicos" },
  { label: "Contato", hash: "#contato" },
];

async function goToSection(hash: string) {
  mobileOpen.value = false;
  await router.push({ name: "home", hash });
}
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl"
  >
    <div class="container-app flex h-16 items-center justify-between gap-4">
      <RouterLink
        :to="{ name: 'home', hash: '#topo' }"
        aria-label="Página inicial"
        class="transition-opacity hover:opacity-90"
      >
        <AppLogo :size="34" />
      </RouterLink>

      <nav
        class="hidden items-center gap-1 rounded-full border border-border/60 bg-secondary/50 p-1 md:flex"
        aria-label="Navegação principal"
      >
        <button
          v-for="item in navItems"
          :key="item.hash"
          type="button"
          class="rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-background hover:text-foreground"
          @click="goToSection(item.hash)"
        >
          {{ item.label }}
        </button>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeToggle />
        <BaseButton
          :to="{ name: 'tool' }"
          size="sm"
          variant="hero"
          class="hidden sm:inline-flex"
        >
          <Icon
            icon="lucide:zap"
            class="h-4 w-4"
          />
          Começar Agora
        </BaseButton>
        <button
          type="button"
          class="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          :aria-expanded="mobileOpen"
          aria-label="Abrir menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon
            :icon="mobileOpen ? 'lucide:x' : 'lucide:menu'"
            class="h-5 w-5"
          />
        </button>
      </div>
    </div>

    <transition name="slide-down">
      <nav
        v-if="mobileOpen"
        class="border-t border-border bg-background/95 backdrop-blur-xl md:hidden"
        aria-label="Navegação móvel"
      >
        <div class="container-app flex flex-col gap-1 py-4">
          <button
            v-for="item in navItems"
            :key="item.hash"
            type="button"
            class="rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-accent/10 hover:text-foreground"
            @click="goToSection(item.hash)"
          >
            {{ item.label }}
          </button>
          <BaseButton
            :to="{ name: 'tool' }"
            variant="hero"
            class="mt-2"
            @click="mobileOpen = false"
          >
            <Icon
              icon="lucide:zap"
              class="h-4 w-4"
            />
            Começar Agora
          </BaseButton>
        </div>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition:
    max-height 0.25s ease,
    opacity 0.25s ease;
  overflow: hidden;
  max-height: 400px;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>

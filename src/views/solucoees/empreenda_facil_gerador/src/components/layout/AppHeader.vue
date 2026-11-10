<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { Icon } from "@iconify/vue";
import { mainNav } from "@/config/navigation";
import { whatsappLink } from "@/config/site";
import ModeToggle from "./ModeToggle.vue";
import SearchDialog from "./SearchDialog.vue";
import Button from "@/components/ui/Button.vue";

const mobileOpen = ref(false);
const closeMobile = () => (mobileOpen.value = false);
</script>

<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60"
  >
    <div class="container mx-auto flex h-16 items-center justify-between px-4">
      <!-- Logo -->
      <RouterLink
        to="/"
        class="group flex items-center gap-2.5"
        aria-label="Página inicial"
        @click="closeMobile"
      >
        <span
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-primary shadow-soft transition-transform group-hover:scale-105"
        >
          <Icon icon="lucide:file-check-2" class="h-5 w-5 text-white" />
        </span>
        <span class="font-display text-lg font-bold tracking-tight">
          Empreenda<span class="text-gradient">Fácil</span>
        </span>
      </RouterLink>

      <!-- Nav desktop -->
      <nav class="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
        <RouterLink
          v-for="item in mainNav"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          active-class="!text-primary !bg-primary/10"
          :title="item.description"
        >
          <Icon :icon="item.icon" class="h-4 w-4" />
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="flex items-center gap-2">
        <a
          :href="whatsappLink('Olá! Vim pelo Empreenda Fácil e gostaria de mais informações.')"
          target="_blank"
          rel="noopener noreferrer"
          class="hidden md:inline-flex"
        >
          <Button variant="success" size="sm">
            <Icon icon="lucide:message-circle" class="h-4 w-4" />
            WhatsApp
          </Button>
        </a>
        <SearchDialog class="hidden sm:inline-flex" />
        <ModeToggle />
        <!-- Botão menu mobile -->
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          :aria-expanded="mobileOpen"
          aria-label="Abrir menu"
          @click="mobileOpen = !mobileOpen"
        >
          <Icon :icon="mobileOpen ? 'lucide:x' : 'lucide:menu'" class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Nav mobile -->
    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="mobileOpen"
        class="border-t border-border bg-background lg:hidden"
        aria-label="Navegação mobile"
      >
        <div class="container mx-auto flex flex-col gap-1 px-4 py-3">
          <RouterLink
            v-for="item in mainNav"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"
            active-class="!text-primary bg-primary/10"
            @click="closeMobile"
          >
            <Icon :icon="item.icon" class="h-4 w-4" />
            {{ item.label }}
          </RouterLink>
          <a
            :href="whatsappLink()"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2"
            @click="closeMobile"
          >
            <Button variant="success" class="w-full">
              <Icon icon="lucide:message-circle" class="h-4 w-4" />
              Falar no WhatsApp
            </Button>
          </a>
        </div>
      </nav>
    </Transition>
  </header>
</template>

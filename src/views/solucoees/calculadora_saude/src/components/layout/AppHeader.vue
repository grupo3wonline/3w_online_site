<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/theme';

const theme = useThemeStore();
const { darkMode } = storeToRefs(theme);
const route = useRoute();
const router = useRouter();

const isMenuOpen = ref(false);

interface NavItem {
  label: string;
  hash: string;
}

const navItems: NavItem[] = [
  { label: 'Início', hash: '#inicio' },
  { label: 'Benefícios', hash: '#beneficios' },
  { label: 'Como Funciona', hash: '#como-funciona' },
  { label: 'Calculadora', hash: '#calculadora' },
  { label: 'Sobre', hash: '#sobre' },
  { label: 'Serviços', hash: '#servicos' },
  { label: 'Contato', hash: '#contato' },
];

async function goTo(hash: string) {
  isMenuOpen.value = false;
  if (route.name !== 'home') {
    await router.push({ path: '/', hash });
  } else {
    const el = document.querySelector(hash);
    el?.scrollIntoView({ behavior: 'smooth' });
    history.replaceState(null, '', `${route.path}${hash}`);
  }
}
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80"
  >
    <div class="container-page">
      <div class="flex h-20 items-center justify-between">
        <button
          class="flex items-center gap-3 text-left"
          aria-label="Ir para o início"
          @click="goTo('#inicio')"
        >
          <Icon
            icon="fa6-solid:heart-pulse"
            class="text-3xl text-brand-600 dark:text-brand-400"
            aria-hidden="true"
          />
          <span>
            <span class="block text-lg font-bold leading-tight text-gray-900 dark:text-white">
              Calculadora de Saúde
            </span>
            <span class="block text-xs text-gray-500 dark:text-gray-400">por Grupo 3W Online</span>
          </span>
        </button>

        <nav
          class="hidden items-center gap-6 lg:flex"
          aria-label="Navegação principal"
        >
          <button
            v-for="item in navItems"
            :key="item.hash"
            class="text-sm font-medium text-gray-600 transition-colors hover:text-brand-600 dark:text-gray-300 dark:hover:text-brand-400"
            @click="goTo(item.hash)"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="flex items-center gap-3">
          <button
            class="rounded-lg bg-gray-100 p-3 transition-all duration-300 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            :aria-label="darkMode ? 'Ativar tema claro' : 'Ativar tema escuro'"
            @click="theme.toggleDarkMode()"
          >
            <Icon
              :icon="darkMode ? 'fa6-solid:sun' : 'fa6-solid:moon'"
              class="text-xl text-yellow-500 dark:text-blue-300"
              aria-hidden="true"
            />
          </button>

          <button
            class="rounded-lg bg-gray-100 p-3 dark:bg-gray-800 lg:hidden"
            :aria-label="isMenuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'"
            :aria-expanded="isMenuOpen"
            @click="isMenuOpen = !isMenuOpen"
          >
            <Icon
              :icon="isMenuOpen ? 'fa6-solid:xmark' : 'fa6-solid:bars'"
              class="text-xl text-gray-800 dark:text-white"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>

    <Transition name="menu">
      <nav
        v-if="isMenuOpen"
        class="border-t border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:hidden"
        aria-label="Navegação móvel"
      >
        <div class="container-page flex flex-col py-2">
          <button
            v-for="item in navItems"
            :key="item.hash"
            class="rounded-lg px-3 py-3 text-left text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            @click="goTo(item.hash)"
          >
            {{ item.label }}
          </button>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

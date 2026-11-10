<template>
  <header
    class="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-700/80 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group" aria-label="Ir para a página inicial">
          <div
            class="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-elegant group-hover:scale-105 transition-all duration-300"
          >
            <i class="fa-solid fa-file-lines text-white text-base" aria-hidden="true"></i>
          </div>
          <div class="flex flex-col">
            <span class="text-base sm:text-lg font-bold gradient-text leading-tight">{{ t('brand.name') }}</span>
            <span class="hidden sm:block text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-0.5">
              {{ t('brand.by') }}
            </span>
          </div>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          <router-link
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all duration-200"
            active-class="!text-primary-700 dark:!text-primary-400 !bg-primary-50 dark:!bg-slate-800 !font-semibold"
          >
            <i :class="link.icon" class="mr-1.5 text-xs" aria-hidden="true"></i>{{ link.label }}
          </router-link>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <router-link to="/ferramenta" class="hidden lg:inline-flex btn-primary text-sm px-4 py-2">
            <i class="fa-solid fa-rocket text-xs" aria-hidden="true"></i> {{ t('nav.useTool') }}
          </router-link>

          <button
            class="btn-ghost w-10 h-10 rounded-xl"
            :aria-label="theme.isDark ? t('nav.toggleThemeLight') : t('nav.toggleThemeDark')"
            :title="theme.isDark ? t('nav.toggleThemeLight') : t('nav.toggleThemeDark')"
            @click="theme.toggle()"
          >
            <i
              :class="theme.isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-500'"
              class="text-lg"
              aria-hidden="true"
            ></i>
          </button>

          <button
            class="btn-ghost w-10 h-10 rounded-xl hidden sm:inline-flex"
            :aria-label="t('nav.help')"
            :title="t('nav.help')"
            @click="showHelp"
          >
            <i class="fa-solid fa-circle-question text-slate-400 dark:text-slate-500 text-lg" aria-hidden="true"></i>
          </button>

          <button
            class="btn-ghost w-10 h-10 rounded-xl md:hidden"
            :aria-label="mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
            :aria-expanded="mobileMenuOpen"
            @click="mobileMenuOpen = !mobileMenuOpen"
          >
            <i :class="mobileMenuOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" class="text-lg" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation -->
      <transition name="slide-down">
        <nav
          v-if="mobileMenuOpen"
          class="md:hidden pb-4 border-t border-slate-100 dark:border-slate-700 pt-3 space-y-1"
          aria-label="Menu mobile"
        >
          <router-link
            v-for="link in navLinks"
            :key="link.label"
            :to="link.to"
            class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-800 transition-all"
            active-class="!text-primary-700 dark:!text-primary-400 !bg-primary-50 dark:!bg-slate-800"
            @click="mobileMenuOpen = false"
          >
            <i :class="link.icon" class="w-5 text-center" aria-hidden="true"></i>{{ link.label }}
          </router-link>
          <router-link
            to="/ferramenta"
            class="btn-primary w-full mt-2"
            @click="mobileMenuOpen = false"
          >
            <i class="fa-solid fa-rocket text-xs" aria-hidden="true"></i> {{ t('nav.useTool') }}
          </router-link>
        </nav>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Swal from 'sweetalert2'
import { useThemeStore } from '@/stores/theme'

const { t } = useI18n()
const theme = useThemeStore()
const mobileMenuOpen = ref(false)

const navLinks = computed(() => [
  { to: { path: '/' }, label: t('nav.home'), icon: 'fa-solid fa-house' },
  { to: { path: '/', hash: '#funcionalidades' }, label: t('nav.features'), icon: 'fa-solid fa-star' },
  { to: { path: '/', hash: '#sobre' }, label: t('nav.about'), icon: 'fa-solid fa-circle-info' },
  { to: { path: '/', hash: '#servicos' }, label: t('nav.services'), icon: 'fa-solid fa-briefcase' },
  { to: { path: '/', hash: '#contato' }, label: t('nav.contact'), icon: 'fa-solid fa-envelope' }
])

function showHelp() {
  Swal.fire({
    icon: 'info',
    title: 'Como usar o Analisador de Texto',
    html: `
      <div style="text-align:left;font-size:0.875rem;line-height:1.6">
        <p><strong>1.</strong> Acesse a <strong>Ferramenta</strong> pelo menu.</p>
        <p><strong>2.</strong> Cole, digite ou importe um arquivo .txt.</p>
        <p><strong>3.</strong> Configure os filtros (espaços, pontuação, números).</p>
        <p><strong>4.</strong> Clique em <strong>Analisar</strong> para ver as métricas.</p>
        <p><strong>5.</strong> Para comparar, preencha os dois textos e clique em <strong>Comparar</strong>.</p>
        <hr style="margin:0.75rem 0">
        <p style="font-size:0.75rem;color:#64748b">🔒 Seus textos são processados localmente. Nada sai do navegador.</p>
      </div>
    `,
    confirmButtonColor: '#4263eb',
    confirmButtonText: t('feedback.confirm')
  })
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
}
.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

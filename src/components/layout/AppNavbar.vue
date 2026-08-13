<template>
  <nav class="navbar" role="navigation" aria-label="Navegação principal">
    <div class="container">
      <div class="flex items-center justify-between h-14 md:h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2" aria-label="3W Online - Página Inicial">
          <div class="w-7 h-7 bg-primary-500 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-[10px]">3W</span>
          </div>
          <span class="text-sm md:text-base font-bold text-white">Grupo 3W Online</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link" active-class="!text-white !bg-white/10">
            {{ link.label }}
          </RouterLink>

          <!-- Services Dropdown -->
          <div class="relative" @mouseenter="servicesOpen = true" @mouseleave="servicesOpen = false">
            <button class="nav-link" :aria-expanded="servicesOpen">
              Serviços <Icon icon="mdi:chevron-down" class="w-3.5 h-3.5 ml-0.5 inline" />
            </button>
            <Transition name="dropdown">
              <div v-show="servicesOpen" class="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                <RouterLink v-for="s in serviceDropdown" :key="s.path" :to="s.path" class="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors" @click="servicesOpen = false">
                  {{ s.label }}
                </RouterLink>
              </div>
            </Transition>
          </div>

          <RouterLink to="/ferramentas" class="nav-link">Ferramentas</RouterLink>
        </div>

        <!-- Right -->
        <div class="flex items-center gap-2">
          <RouterLink to="/contato" class="hidden md:inline-flex bg-primary-500 hover:bg-primary-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors">
            Fale Conosco
          </RouterLink>
          <button class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white" @click="mobileOpen = !mobileOpen" :aria-expanded="mobileOpen" aria-label="Menu">
            <Icon :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="lg:hidden bg-[#0f172a] border-t border-white/10">
        <div class="container py-3 space-y-1">
          <RouterLink v-for="link in [...navLinks, ...mobileExtra]" :key="link.path" :to="link.path" class="block px-4 py-2.5 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors" @click="mobileOpen = false">
            {{ link.label }}
          </RouterLink>
          <div class="pt-3 px-4">
            <RouterLink to="/contato" class="btn-primary w-full text-center text-sm !py-2.5" @click="mobileOpen = false">
              Fale Conosco
            </RouterLink>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'

const mobileOpen = ref(false)
const servicesOpen = ref(false)

const navLinks = [
  { path: '/', label: 'Home' },
]

const mobileExtra = [
  { path: '/ferramentas', label: 'Ferramentas' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/institucional', label: 'Institucional' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/contato', label: 'Contato' },
]

const serviceDropdown = [
  { path: '/servicos', label: 'Todos os Serviços' },
  { path: '/servicos/gestao-redes-sociais', label: 'Redes Sociais' },
  { path: '/servicos/gestao-anuncios', label: 'Gestão de Anúncios' },
  { path: '/servicos/criacao-sites', label: 'Criação de Sites' },
  { path: '/servicos/criacao-sistemas', label: 'Sistemas Web' },
  { path: '/servicos/desenvolvimento-apps', label: 'Apps Mobile' },
  { path: '/servicos/design-grafico', label: 'Design Gráfico' },
  { path: '/servicos/marketing-digital', label: 'Marketing Digital' },
  { path: '/servicos/automacao-ia', label: 'Automação e IA' },
  { path: '/servicos/consultoria-marketing', label: 'Consultoria' },
]
</script>

<style scoped>
.nav-link {
  @apply px-3 py-1.5 text-sm text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-colors inline-flex items-center;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0; transform: translateY(-5px);
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease; overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0; opacity: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  max-height: 500px; opacity: 1;
}
</style>

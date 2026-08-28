<template>
  <nav class="navbar" role="navigation" aria-label="Navegação principal">
    <div class="container">
      <div class="flex items-center justify-between h-14 md:h-16">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2.5 group" aria-label="3W Online - Página Inicial">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/20 group-hover:scale-105 transition-transform">
            <span class="text-white font-black text-xs tracking-tight">3W</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm md:text-base font-bold text-white leading-tight">Grupo 3W Online</span>
            <span class="text-[10px] text-blue-300 hidden sm:block leading-none">Tecnologia & Marketing</span>
          </div>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden lg:flex items-center gap-1">
          <RouterLink to="/" class="nav-link" active-class="!text-white !bg-white/10">
            <Icon icon="mdi:home-outline" class="w-4 h-4 mr-1.5" />
            Home
          </RouterLink>

          <RouterLink to="/sobre" class="nav-link" active-class="!text-white !bg-white/10">
            Sobre
          </RouterLink>

          <!-- Services Dropdown -->
          <div class="relative" @mouseenter="servicesOpen = true" @mouseleave="servicesOpen = false">
            <button
              class="nav-link"
              :class="{ '!text-white !bg-white/10': isServicesActive }"
              :aria-expanded="servicesOpen"
              aria-haspopup="true"
            >
              Serviços <Icon icon="mdi:chevron-down" class="w-3.5 h-3.5 ml-1 inline transition-transform duration-200" :class="{ 'rotate-180': servicesOpen }" />
            </button>
            <Transition name="dropdown">
              <div v-show="servicesOpen" class="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden">
                <div class="px-3 py-1.5 border-b border-gray-100 bg-gray-50/70">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-gray-500">Nossas Soluções</span>
                </div>
                <div class="max-h-[360px] overflow-y-auto py-1">
                  <RouterLink
                    v-for="s in serviceDropdown"
                    :key="s.path"
                    :to="s.path"
                    class="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    @click="servicesOpen = false"
                  >
                    <div class="w-6 h-6 rounded flex items-center justify-center shrink-0" :class="s.iconBg">
                      <Icon :icon="s.icon" class="w-3.5 h-3.5 text-white" />
                    </div>
                    <span>{{ s.label }}</span>
                  </RouterLink>
                </div>
                <div class="p-2 bg-gray-50 border-t border-gray-100">
                  <RouterLink
                    to="/servicos"
                    class="block text-center text-xs font-semibold text-primary-600 hover:text-primary-700 py-1"
                    @click="servicesOpen = false"
                  >
                    Ver Todos os Serviços →
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Ferramentas com Badge de Destaque -->
          <RouterLink to="/ferramentas" class="nav-link relative" active-class="!text-white !bg-white/10">
            <Icon icon="mdi:tools" class="w-4 h-4 mr-1.5 text-secondary-300" />
            Ferramentas
            <span class="ml-1.5 px-1.5 py-0.5 bg-gradient-to-r from-secondary-500 to-teal-400 text-slate-950 font-black text-[9px] rounded-full uppercase tracking-wider shadow-sm">
              120+
            </span>
          </RouterLink>

          <RouterLink to="/institucional" class="nav-link" active-class="!text-white !bg-white/10">
            Institucional
          </RouterLink>

          <RouterLink to="/contato" class="nav-link" active-class="!text-white !bg-white/10">
            Contato
          </RouterLink>
        </div>

        <!-- Right / Actions -->
        <div class="flex items-center gap-2">
          <!-- WhatsApp Quick Link (Desktop) -->
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de falar com a 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="hidden xl:inline-flex items-center gap-1.5 bg-green-600/90 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-sm"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4" />
            <span>(41) 99692-4829</span>
          </a>

          <!-- Contato CTA -->
          <RouterLink
            to="/contato"
            class="hidden md:inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
          >
            <Icon icon="mdi:email-fast-outline" class="w-4 h-4" />
            <span>Orçamento Grátis</span>
          </RouterLink>

          <!-- Mobile Hamburger Toggle -->
          <button
            class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white focus:outline-none focus:ring-2 focus:ring-primary-400"
            @click="mobileOpen = !mobileOpen"
            :aria-expanded="mobileOpen"
            aria-label="Abrir menu de navegação"
          >
            <Icon :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'" class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <Transition name="slide-down">
      <div v-if="mobileOpen" class="lg:hidden bg-[#0f172a] border-t border-white/10 shadow-2xl">
        <div class="container py-4 space-y-1.5">
          <RouterLink
            v-for="link in mobileLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center justify-between px-3.5 py-2.5 text-gray-200 hover:text-white hover:bg-white/5 rounded-lg text-sm font-medium transition-colors"
            active-class="!bg-primary-600/20 !text-primary-300 font-semibold"
            @click="mobileOpen = false"
          >
            <div class="flex items-center gap-2.5">
              <Icon :icon="link.icon" class="w-4 h-4 text-primary-400" />
              <span>{{ link.label }}</span>
            </div>
            <span v-if="link.badge" class="px-2 py-0.5 bg-secondary-500/20 text-secondary-300 text-[10px] font-bold rounded-full">
              {{ link.badge }}
            </span>
          </RouterLink>

          <!-- Quick Actions on Mobile -->
          <div class="pt-4 mt-2 border-t border-white/10 space-y-2">
            <RouterLink
              to="/contato"
              class="btn-primary w-full text-center text-sm !py-2.5 justify-center flex items-center gap-2"
              @click="mobileOpen = false"
            >
              <Icon icon="mdi:email-fast-outline" class="w-4 h-4" />
              Solicitar Orçamento
            </RouterLink>

            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de atendimento via WhatsApp da 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary w-full text-center text-sm !py-2.5 justify-center flex items-center gap-2"
              @click="mobileOpen = false"
            >
              <Icon icon="mdi:whatsapp" class="w-4 h-4" />
              WhatsApp Direto
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'

const route = useRoute()
const mobileOpen = ref(false)
const servicesOpen = ref(false)

const isServicesActive = computed(() => route.path.startsWith('/servicos'))

const mobileLinks = [
  { path: '/', label: 'Home', icon: 'mdi:home-outline' },
  { path: '/sobre', label: 'Sobre Nós', icon: 'mdi:information-outline' },
  { path: '/servicos', label: 'Todos os Serviços', icon: 'mdi:briefcase-outline' },
  { path: '/ferramentas', label: 'Ferramentas Digitais', icon: 'mdi:tools', badge: '120+ Grátis' },
  { path: '/institucional', label: 'Institucional', icon: 'mdi:domain' },
  { path: '/contato', label: 'Contato & Orçamento', icon: 'mdi:card-account-mail-outline' },
]

const serviceDropdown = [
  { path: '/servicos/criacao-sites', label: 'Criação de Sites', icon: 'mdi:web', iconBg: 'bg-blue-600' },
  { path: '/servicos/criacao-sistemas', label: 'Sistemas Web Sob Medida', icon: 'mdi:application-cog-outline', iconBg: 'bg-slate-700' },
  { path: '/servicos/automacao-ia', label: 'Automação & IA', icon: 'mdi:robot-outline', iconBg: 'bg-purple-600' },
  { path: '/servicos/gestao-anuncios', label: 'Gestão de Anúncios (Google/Meta)', icon: 'mdi:bullseye-arrow', iconBg: 'bg-emerald-600' },
  { path: '/servicos/gestao-redes-sociais', label: 'Gestão de Redes Sociais', icon: 'mdi:instagram', iconBg: 'bg-pink-600' },
  { path: '/servicos/marketing-digital', label: 'Marketing Digital Completo', icon: 'mdi:chart-line', iconBg: 'bg-indigo-600' },
  { path: '/servicos/desenvolvimento-apps', label: 'Desenvolvimento de Apps', icon: 'mdi:cellphone', iconBg: 'bg-cyan-600' },
  { path: '/servicos/design-grafico', label: 'Design Gráfico & Branding', icon: 'mdi:palette-outline', iconBg: 'bg-orange-600' },
  { path: '/servicos/consultoria-marketing', label: 'Consultoria Estratégica', icon: 'mdi:lightbulb-on-outline', iconBg: 'bg-amber-600' },
]
</script>

<style scoped>
.nav-link {
  @apply px-3 py-1.5 text-xs lg:text-sm text-gray-300 hover:text-white font-medium rounded-lg hover:bg-white/10 transition-colors inline-flex items-center;
}

.dropdown-enter-active, .dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from, .dropdown-leave-to {
  opacity: 0; transform: translateY(-6px);
}

.slide-down-enter-active, .slide-down-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease; overflow: hidden;
}
.slide-down-enter-from, .slide-down-leave-to {
  max-height: 0; opacity: 0;
}
.slide-down-enter-to, .slide-down-leave-from {
  max-height: 600px; opacity: 1;
}
</style>

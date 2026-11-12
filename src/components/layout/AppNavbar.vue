<template>
  <nav
    class="navbar"
    :class="{ 'navbar--scrolled': isScrolled }"
    role="navigation"
    aria-label="Navegação principal"
  >
    <!-- Barra de progresso de scroll -->
    <div
      class="scroll-progress"
      :style="{ width: scrollProgress + '%' }"
      aria-hidden="true"
    />

    <div class="container">
      <div class="flex items-center justify-between h-14 md:h-16">
        <!-- ── Logo ─────────────────────────────────────────────────── -->
        <RouterLink
          to="/"
          class="flex items-center gap-2.5 group shrink-0"
          aria-label="3W Online - Página Inicial"
        >
          <div
            class="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md shadow-primary-500/30 group-hover:scale-105 transition-transform duration-200"
          >
            <span class="text-white font-black text-xs tracking-tight select-none">3W</span>
          </div>
          <div class="flex flex-col">
            <span class="text-sm md:text-base font-bold text-white leading-tight">Grupo 3W Online</span>
            <span class="text-[10px] text-blue-300 hidden sm:block leading-none">Tecnologia &amp; Marketing</span>
          </div>
        </RouterLink>

        <!-- ── Desktop Navigation ────────────────────────────────────── -->
        <div class="hidden lg:flex items-center gap-0.5">
          <RouterLink to="/" class="nav-link" active-class="nav-link--active">
            <Icon icon="mdi:home-outline" class="w-4 h-4 mr-1.5" />
            Home
          </RouterLink>

          <!-- Dropdown de Serviços -->
          <div
            class="relative"
            @mouseenter="servicesOpen = true"
            @mouseleave="servicesOpen = false"
          >
            <button
              class="nav-link"
              :class="{ 'nav-link--active': isServicesActive }"
              :aria-expanded="servicesOpen"
              aria-haspopup="true"
              @keydown.escape="servicesOpen = false"
            >
              <Icon icon="mdi:briefcase-outline" class="w-4 h-4 mr-1.5" />
              Serviços
              <Icon
                icon="mdi:chevron-down"
                class="w-3.5 h-3.5 ml-1 transition-transform duration-200"
                :class="{ 'rotate-180': servicesOpen }"
              />
            </button>

            <Transition name="dropdown">
              <div
                v-show="servicesOpen"
                class="dropdown-menu"
                role="menu"
                @keydown.escape="servicesOpen = false"
              >
                <div class="dropdown-header">
                  <span class="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                    Nossas Soluções
                  </span>
                </div>
                <div class="max-h-[380px] overflow-y-auto py-1">
                  <RouterLink
                    v-for="s in serviceDropdown"
                    :key="s.path"
                    :to="s.path"
                    class="dropdown-item"
                    role="menuitem"
                    @click="servicesOpen = false"
                  >
                    <div
                      class="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      :class="s.iconBg"
                    >
                      <Icon :icon="s.icon" class="w-4 h-4 text-white" />
                    </div>
                    <div class="flex-1 min-w-0">
                      <span class="block text-xs font-semibold text-gray-800 dark:text-slate-100 leading-tight">
                        {{ s.label }}
                      </span>
                      <span class="block text-[10px] text-gray-500 dark:text-slate-400 mt-0.5 leading-tight truncate">
                        {{ s.hint }}
                      </span>
                    </div>
                  </RouterLink>
                </div>
                <div class="p-2.5 bg-gray-50 dark:bg-slate-800/80 border-t border-gray-100 dark:border-slate-700">
                  <RouterLink
                    to="/servicos"
                    class="flex items-center justify-center gap-1.5 text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 py-1 transition-colors"
                    @click="servicesOpen = false"
                  >
                    <Icon icon="mdi:view-grid-outline" class="w-3.5 h-3.5" />
                    Ver Todos os Serviços
                    <Icon icon="mdi:arrow-right" class="w-3.5 h-3.5" />
                  </RouterLink>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Ferramentas com Badge -->
          <RouterLink to="/ferramentas" class="nav-link relative" active-class="nav-link--active">
            <Icon icon="mdi:tools" class="w-4 h-4 mr-1.5 text-secondary-300" />
            Ferramentas
            <span
              class="ml-1.5 px-1.5 py-0.5 bg-gradient-to-r from-secondary-500 to-teal-400 text-slate-950 font-black text-[9px] rounded-full uppercase tracking-wider shadow-sm"
            >
              280+
            </span>
          </RouterLink>
        </div>

        <!-- ── Ações direita ──────────────────────────────────────────── -->
        <div class="flex items-center gap-1.5">
          <!-- WhatsApp (Desktop XL) -->
          <a
            href="https://wa.me/5541996924829?text=Olá! Gostaria de falar com a 3W Online."
            target="_blank"
            rel="noopener noreferrer"
            class="hidden xl:inline-flex items-center gap-1.5 bg-green-600/90 hover:bg-green-600 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
            aria-label="Falar no WhatsApp: (41) 99692-4829"
          >
            <Icon icon="mdi:whatsapp" class="w-4 h-4" />
            <span>(41) 99692-4829</span>
          </a>

          <!-- CTA Orçamento (Desktop) -->
          <a
            href="/#contato"
            class="hidden md:inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
            aria-label="Solicitar orçamento gratuito"
          >
            <Icon icon="mdi:email-fast-outline" class="w-4 h-4" />
            <span>Orçamento Grátis</span>
          </a>

          <!-- Dark Mode Toggle -->
          <button
            class="p-2 rounded-lg hover:bg-white/10 transition-colors text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            :aria-label="isDark ? 'Ativar tema claro' : 'Ativar tema escuro'"
            :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
            @click="toggleDark()"
          >
            <Transition name="icon-swap" mode="out-in">
              <Icon
                :key="isDark ? 'sun' : 'moon'"
                :icon="isDark ? 'mdi:weather-sunny' : 'mdi:weather-night'"
                class="w-5 h-5"
              />
            </Transition>
          </button>

          <!-- Hamburger Mobile -->
          <button
            class="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            :aria-expanded="mobileOpen"
            :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu de navegação'"
            @click="mobileOpen = !mobileOpen"
          >
            <Transition name="icon-swap" mode="out-in">
              <Icon
                :key="mobileOpen ? 'close' : 'menu'"
                :icon="mobileOpen ? 'mdi:close' : 'mdi:menu'"
                class="w-6 h-6"
              />
            </Transition>
          </button>
        </div>
      </div>
    </div>

    <!-- ── Mobile Drawer ─────────────────────────────────────────────── -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="lg:hidden bg-[#0f172a] border-t border-white/10 shadow-2xl"
        role="dialog"
        aria-label="Menu de navegação mobile"
      >
        <div class="container py-4 space-y-1">
          <RouterLink
            v-for="link in mobileLinks"
            :key="link.path"
            :to="link.path"
            class="mobile-link"
            active-class="mobile-link--active"
            @click="mobileOpen = false"
          >
            <div class="flex items-center gap-2.5">
              <Icon :icon="link.icon" class="w-4 h-4 text-primary-400 shrink-0" />
              <span>{{ link.label }}</span>
            </div>
            <span
              v-if="link.badge"
              class="px-2 py-0.5 bg-secondary-500/20 text-secondary-300 text-[10px] font-bold rounded-full"
            >
              {{ link.badge }}
            </span>
          </RouterLink>

          <!-- Serviços no mobile (expandível) -->
          <details class="group">
            <summary
              class="mobile-link cursor-pointer list-none select-none"
              :class="{ 'mobile-link--active': isServicesActive }"
            >
              <div class="flex items-center gap-2.5">
                <Icon icon="mdi:briefcase-outline" class="w-4 h-4 text-primary-400 shrink-0" />
                <span>Serviços</span>
              </div>
              <Icon
                icon="mdi:chevron-down"
                class="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180"
              />
            </summary>
            <div class="mt-1 ml-7 space-y-1 pb-1">
              <RouterLink
                v-for="s in serviceDropdown"
                :key="s.path"
                :to="s.path"
                class="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                @click="mobileOpen = false"
              >
                <div
                  class="w-5 h-5 rounded flex items-center justify-center shrink-0"
                  :class="s.iconBg"
                >
                  <Icon :icon="s.icon" class="w-3 h-3 text-white" />
                </div>
                {{ s.label }}
              </RouterLink>
            </div>
          </details>

          <!-- CTA Mobile -->
          <div class="pt-4 mt-2 border-t border-white/10 space-y-2">
            <a
              href="/#contato"
              class="btn-primary w-full text-sm !py-2.5 justify-center flex items-center gap-2"
              @click="mobileOpen = false"
            >
              <Icon icon="mdi:email-fast-outline" class="w-4 h-4" />
              Solicitar Orçamento
            </a>
            <a
              href="https://wa.me/5541996924829?text=Olá! Gostaria de atendimento via WhatsApp da 3W Online."
              target="_blank"
              rel="noopener noreferrer"
              class="btn-secondary w-full text-sm !py-2.5 justify-center flex items-center gap-2"
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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()

const route = useRoute()
const mobileOpen = ref(false)
const servicesOpen = ref(false)
const isScrolled = ref(false)
const scrollProgress = ref(0)

const isServicesActive = computed(() => route.path.startsWith('/servicos'))

// ─── Scroll-aware navbar e barra de progresso ────────────────────────────────
function handleScroll() {
  isScrolled.value = window.scrollY > 20

  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? Math.min((window.scrollY / docHeight) * 100, 100) : 0
}

// Fecha mobile menu ao navegar para rota diferente
function handleRouteChange() {
  mobileOpen.value = false
  servicesOpen.value = false
}

// Fecha mobile menu ao pressionar Escape
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    mobileOpen.value = false
    servicesOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('keydown', handleKeydown)
})

// ─── Dados de Navegação ──────────────────────────────────────────────────────
const mobileLinks = [
  { path: '/',            label: 'Home',               icon: 'mdi:home-outline'       },
  { path: '/ferramentas', label: 'Ferramentas & Apps', icon: 'mdi:tools', badge: '280+' },
  { path: '/pagamento',   label: 'Pagamento Seguro',   icon: 'mdi:credit-card-outline' },
]

const serviceDropdown = [
  { path: '/servicos/criacao-sites',          label: 'Criação de Sites',              hint: 'Sites, landing pages e e-commerces',           icon: 'mdi:web',                   iconBg: 'bg-blue-600'    },
  { path: '/servicos/criacao-sistemas',       label: 'Sistemas Web Sob Medida',       hint: 'CRM, ERP, agendamento, SaaS',                  icon: 'mdi:application-cog-outline',iconBg: 'bg-slate-700'  },
  { path: '/servicos/automacao-ia',           label: 'Automação & IA',               hint: 'Chatbots GPT, WhatsApp, n8n, Flowise',          icon: 'mdi:robot-outline',          iconBg: 'bg-purple-600'  },
  { path: '/servicos/gestao-anuncios',        label: 'Gestão de Anúncios (Ads)',      hint: 'Google Ads & Meta Ads com ROI comprovado',     icon: 'mdi:bullseye-arrow',         iconBg: 'bg-emerald-600' },
  { path: '/servicos/gestao-redes-sociais',   label: 'Gestão de Redes Sociais',       hint: 'Instagram, Facebook, TikTok e mais',           icon: 'mdi:instagram',             iconBg: 'bg-pink-600'    },
  { path: '/servicos/marketing-digital',      label: 'Marketing Digital Completo',    hint: 'Pacote completo a partir de R$500/mês',        icon: 'mdi:chart-line',            iconBg: 'bg-indigo-600'  },
  { path: '/servicos/desenvolvimento-apps',   label: 'Desenvolvimento de Apps',       hint: 'iOS e Android com React Native',               icon: 'mdi:cellphone',             iconBg: 'bg-cyan-600'    },
  { path: '/servicos/design-grafico',         label: 'Design Gráfico & Branding',     hint: 'Logotipos, identidade visual e materiais',     icon: 'mdi:palette-outline',       iconBg: 'bg-orange-600'  },
  { path: '/servicos/consultoria-marketing',  label: 'Consultoria Estratégica',       hint: 'Diagnóstico digital e plano de ação',          icon: 'mdi:lightbulb-on-outline',  iconBg: 'bg-amber-600'   },
]
</script>

<style scoped>
/* ── Navbar base ──────────────────────────────────────────────────────────── */
.navbar {
  @apply bg-[#0f172a] text-white shadow-lg sticky top-0 z-40 transition-all duration-300;
  position: relative;
}

.navbar--scrolled {
  @apply bg-[#0a1120]/95 backdrop-blur-md;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.3);
}

/* ── Barra de progresso ───────────────────────────────────────────────────── */
.scroll-progress {
  @apply absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-400 transition-all duration-100;
}

/* ── Links desktop ────────────────────────────────────────────────────────── */
.nav-link {
  @apply px-3 py-1.5 text-xs lg:text-sm text-gray-300 hover:text-white font-medium rounded-lg
         hover:bg-white/10 transition-colors duration-150 inline-flex items-center
         focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:outline-none;
}

.nav-link--active {
  @apply !text-white !bg-white/10;
}

/* ── Dropdown ─────────────────────────────────────────────────────────────── */
.dropdown-menu {
  @apply absolute top-full left-0 mt-1.5 w-72 bg-white dark:bg-slate-800
         rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700
         py-2 z-50 overflow-hidden;
}

.dropdown-header {
  @apply px-4 py-2 border-b border-gray-100 dark:border-slate-700
         bg-gray-50/70 dark:bg-slate-700/50;
}

.dropdown-item {
  @apply flex items-center gap-3 px-4 py-2.5 text-xs font-medium
         text-gray-700 dark:text-slate-200
         hover:bg-primary-50 dark:hover:bg-primary-900/20
         hover:text-primary-700 dark:hover:text-primary-300
         transition-colors duration-100 cursor-pointer;
}

/* ── Links mobile ─────────────────────────────────────────────────────────── */
.mobile-link {
  @apply flex items-center justify-between px-3.5 py-2.5
         text-gray-200 hover:text-white hover:bg-white/5
         rounded-lg text-sm font-medium transition-colors duration-150;
}

.mobile-link--active {
  @apply !bg-primary-600/20 !text-primary-300 font-semibold;
}

/* ── Transições ───────────────────────────────────────────────────────────── */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.3s ease, opacity 0.2s ease;
  overflow: hidden;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 700px;
  opacity: 1;
}

.icon-swap-enter-active,
.icon-swap-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.icon-swap-enter-from,
.icon-swap-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(15deg);
}
</style>

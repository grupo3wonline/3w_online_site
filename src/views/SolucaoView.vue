<template>
  <div class="solucao-view min-h-screen flex flex-col bg-slate-50">

    <!-- ───── Breadcrumb ───── -->
    <div class="bg-gradient-to-r from-[#0a1628] via-[#111d3a] to-[#162044] py-3.5 border-b border-white/10 text-white">
      <div class="container flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
        <nav class="flex items-center text-xs text-blue-300 gap-1.5 flex-wrap" aria-label="Breadcrumb">
          <RouterLink to="/" class="hover:text-white transition-colors flex items-center gap-1">
            <Icon icon="mdi:home" class="w-3.5 h-3.5" />
            <span>Início</span>
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <RouterLink to="/solucoes" class="hover:text-white transition-colors">
            Soluções Digitais
          </RouterLink>
          <Icon icon="mdi:chevron-right" class="w-3.5 h-3.5 text-blue-400/60" />
          <span class="text-white font-semibold truncate max-w-[200px] sm:max-w-none">{{ solucao?.name ?? 'Carregando...' }}</span>
        </nav>

        <!-- Ações rápidas -->
        <div class="flex items-center gap-2 text-xs">
          <button
            @click="copyLink"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 text-blue-200 hover:text-white transition-colors text-[11px]"
            title="Copiar link"
          >
            <Icon :icon="copied ? 'mdi:check' : 'mdi:content-copy'" class="w-3.5 h-3.5" :class="copied ? 'text-green-400' : ''" />
            <span>{{ copied ? 'Copiado!' : 'Copiar Link' }}</span>
          </button>
          <a
            :href="whatsappShare"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-green-500/20 hover:bg-green-500/30 text-green-300 hover:text-green-200 transition-colors text-[11px]"
          >
            <Icon icon="mdi:whatsapp" class="w-3.5 h-3.5" />
            <span>Compartilhar</span>
          </a>
        </div>
      </div>
    </div>

    <!-- ───── Promo Banner ───── -->
    <div class="bg-gradient-to-r from-accent-500 to-accent-600 py-2 text-white">
      <div class="container flex items-center justify-center gap-2 text-xs sm:text-sm">
        <Icon icon="mdi:rocket-launch" class="w-4 h-4 text-yellow-200 shrink-0" />
        <span>Precisa de uma solução personalizada? <strong>Fale com a 3W Online!</strong></span>
        <a
          href="https://api.whatsapp.com/send?phone=5541996924829&text=Ol%C3%A1!%20Quero%20um%20or%C3%A7amento."
          target="_blank"
          rel="noopener noreferrer"
          class="bg-white text-accent-700 px-3 py-0.5 rounded-full text-[11px] font-bold hover:bg-gray-100 transition-colors whitespace-nowrap shadow-sm"
        >
          Orçamento Grátis
        </a>
      </div>
    </div>

    <!-- ───── Não encontrada ───── -->
    <div v-if="!solucao && !loading" class="flex-1 flex flex-col items-center justify-center py-20 text-center container">
      <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
        <Icon icon="mdi:alert-circle-outline" class="w-10 h-10 text-gray-400" />
      </div>
      <h1 class="text-xl font-bold text-gray-800 mb-2">Solução não encontrada</h1>
      <p class="text-gray-500 mb-6">A solução que você buscou não existe ou foi movida.</p>
      <RouterLink to="/solucoes" class="btn-primary">
        Ver todas as soluções
      </RouterLink>
    </div>

    <!-- ───── Conteúdo principal ───── -->
    <template v-else-if="solucao">

      <!-- Info da solução -->
      <div class="bg-white border-b border-gray-100 shadow-sm">
        <div class="container py-5">
          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <!-- Ícone -->
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg shrink-0"
              :class="categoryGradient"
            >
              <Icon :icon="solucao.icon" class="w-7 h-7 text-white" />
            </div>

            <!-- Nome e descrição -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <h1 class="text-xl font-black text-gray-900 leading-tight">{{ solucao.name }}</h1>
                <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full" :class="categoryBadge">
                  <Icon :icon="categoryIcon" class="w-3 h-3" />
                  {{ categoryTitle }}
                </span>
                <span class="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600">
                  <Icon icon="mdi:shield-check" class="w-3 h-3" />
                  100% Gratuita
                </span>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed">{{ solucao.shortDesc }}</p>
              <div class="flex flex-wrap gap-1.5 mt-2">
                <span v-for="tag in solucao.tags" :key="tag" class="text-[10px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Botão abrir em nova aba -->
            <a
              :href="solucao.appPath"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors shadow-md shadow-primary-500/20 whitespace-nowrap shrink-0"
            >
              <Icon icon="mdi:open-in-new" class="w-4 h-4" />
              Abrir em nova aba
            </a>
          </div>
        </div>
      </div>

      <!-- Selo de privacidade -->
      <div class="bg-emerald-50/70 border-b border-emerald-100 py-2">
        <div class="container flex items-center justify-center gap-2 text-[11px] sm:text-xs text-emerald-800 text-center font-medium">
          <Icon icon="mdi:shield-lock" class="w-4 h-4 text-emerald-600 shrink-0" />
          <span><strong>100% Segura & Privada:</strong> Esta aplicação é processada localmente no seu navegador. Seus dados não são enviados para nenhum servidor.</span>
        </div>
      </div>

      <!-- ───── Iframe com a aplicação ───── -->
      <div class="flex-1 relative">

        <!-- Loading overlay -->
        <div
          v-if="iframeLoading"
          class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-50 gap-4"
        >
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg animate-pulse" :class="categoryGradient">
            <Icon :icon="solucao.icon" class="w-8 h-8 text-white" />
          </div>
          <div class="text-center">
            <p class="text-gray-700 font-semibold text-sm mb-1">Carregando {{ solucao.name }}…</p>
            <p class="text-gray-400 text-xs">Aguarde um momento</p>
          </div>
          <div class="flex gap-1.5 mt-2">
            <div v-for="i in 3" :key="i" class="w-2 h-2 rounded-full bg-primary-500 animate-bounce" :style="`animation-delay: ${(i-1)*0.15}s`"></div>
          </div>
        </div>

        <!-- Iframe -->
        <iframe
          :src="solucao.appPath"
          :title="solucao.name"
          class="w-full border-0 block"
          :style="{ minHeight: iframeHeight, opacity: iframeLoading ? '0' : '1', transition: 'opacity 0.3s ease' }"
          allow="clipboard-write; clipboard-read"
          @load="onIframeLoad"
          @error="onIframeError"
        ></iframe>

        <!-- Fallback (iframe bloqueado) -->
        <div v-if="iframeError" class="flex flex-col items-center justify-center py-16 text-center container">
          <div class="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Icon icon="mdi:alert-circle-outline" class="w-8 h-8 text-amber-500" />
          </div>
          <h2 class="text-gray-800 font-bold mb-2">Não foi possível carregar a aplicação aqui</h2>
          <p class="text-sm text-gray-500 mb-6 max-w-sm">
            Isso pode ocorrer quando a aplicação ainda não foi publicada neste ambiente.
            Tente abrir diretamente:
          </p>
          <a
            :href="solucao.appPath"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
          >
            <Icon icon="mdi:open-in-new" class="w-4 h-4 mr-2" />
            Abrir Aplicação Diretamente
          </a>
        </div>
      </div>

      <!-- ───── Outras soluções ───── -->
      <section v-if="relatedSolucoes.length > 0" class="py-10 bg-white border-t border-gray-100">
        <div class="container">
          <h2 class="text-base font-bold text-gray-800 mb-5 flex items-center gap-2">
            <Icon icon="mdi:apps" class="w-5 h-5 text-primary-500" />
            Outras soluções na categoria <em>{{ categoryTitle }}</em>
          </h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            <RouterLink
              v-for="s in relatedSolucoes"
              :key="s.id"
              :to="`/solucoes/${s.id}`"
              class="group flex flex-col items-center gap-2 p-3 bg-gray-50 hover:bg-primary-50 border border-gray-200 hover:border-primary-300 rounded-xl transition-all text-center"
            >
              <div class="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform" :class="getCategoryGradient(s.category)">
                <Icon :icon="s.icon" class="w-5 h-5 text-white" />
              </div>
              <span class="text-[11px] font-medium text-gray-700 group-hover:text-primary-700 leading-tight line-clamp-2">{{ s.name }}</span>
            </RouterLink>
          </div>
          <div class="mt-6 text-center">
            <RouterLink to="/solucoes" class="btn-secondary text-sm">
              Ver todas as 62 soluções →
            </RouterLink>
          </div>
        </div>
      </section>

    </template>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSolucoesStore, type Solucao } from '@/stores/solucoes'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const store = useSolucoesStore()
const { applySeo } = useSeo()

// ─── Estado ─────────────────────────────────────────────────────────────────────
const loading      = ref(true)
const iframeLoading = ref(true)
const iframeError  = ref(false)
const copied       = ref(false)

// Solução atual a partir do slug da rota
const solucao = computed<Solucao | undefined>(() => {
  loading.value = false
  return store.findById(route.params.slug as string)
})

// Altura mínima do iframe (viewport - header estimado)
const iframeHeight = '600px'

// ─── SEO dinâmico ────────────────────────────────────────────────────────────────
watch(
  solucao,
  (s) => {
    if (!s) return
    applySeo({
      title: `${s.name} | Soluções Digitais 3W Online`,
      description: `${s.shortDesc} — Aplicação web gratuita e 100% client-side. Sem cadastro.`,
      path: route.path,
      keywords: [s.name, ...s.tags, '3w online', 'solução digital', 'gratuito'].join(', '),
      noindex: false,
    })
  },
  { immediate: true },
)

// ─── Helpers de categoria ────────────────────────────────────────────────────────
const categoryMeta: Record<string, { gradient: string; badge: string; title: string; icon: string }> = {
  financeiro: { gradient: 'bg-gradient-to-br from-emerald-500 to-emerald-600', badge: 'bg-emerald-50 text-emerald-600', title: 'Finanças & Saúde', icon: 'mdi:cash-multiple'      },
  marketing:  { gradient: 'bg-gradient-to-br from-orange-500 to-orange-600',   badge: 'bg-orange-50 text-orange-600',   title: 'Marketing',        icon: 'mdi:trending-up'       },
  dev:        { gradient: 'bg-gradient-to-br from-cyan-500 to-cyan-600',       badge: 'bg-cyan-50 text-cyan-600',       title: 'Dev Tools',        icon: 'mdi:code-braces'       },
  texto:      { gradient: 'bg-gradient-to-br from-violet-500 to-violet-600',   badge: 'bg-violet-50 text-violet-600',   title: 'Texto & Conteúdo', icon: 'mdi:text-box-outline'  },
  design:     { gradient: 'bg-gradient-to-br from-pink-500 to-pink-600',       badge: 'bg-pink-50 text-pink-600',       title: 'Design & Mídia',   icon: 'mdi:palette-outline'   },
  negocios:   { gradient: 'bg-gradient-to-br from-yellow-500 to-yellow-600',   badge: 'bg-yellow-50 text-yellow-700',   title: 'Negócios',         icon: 'mdi:briefcase-outline' },
}

const categoryGradient = computed(() => categoryMeta[solucao.value?.category ?? '']?.gradient ?? 'bg-gradient-to-br from-primary-500 to-primary-600')
const categoryBadge    = computed(() => categoryMeta[solucao.value?.category ?? '']?.badge    ?? 'bg-primary-50 text-primary-600')
const categoryTitle    = computed(() => categoryMeta[solucao.value?.category ?? '']?.title    ?? '')
const categoryIcon     = computed(() => categoryMeta[solucao.value?.category ?? '']?.icon     ?? 'mdi:apps')

function getCategoryGradient(cat: string) {
  return categoryMeta[cat]?.gradient ?? 'bg-gradient-to-br from-primary-500 to-primary-600'
}

// ─── Soluções relacionadas ────────────────────────────────────────────────────────
const relatedSolucoes = computed<Solucao[]>(() => {
  if (!solucao.value) return []
  return store.solucoes
    .filter((s) => s.category === solucao.value!.category && s.id !== solucao.value!.id)
    .slice(0, 6)
})

// ─── Ações ─────────────────────────────────────────────────────────────────────
function onIframeLoad() {
  iframeLoading.value = false
}

function onIframeError() {
  iframeLoading.value = false
  iframeError.value   = true
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    // fallback silencioso
  }
}

const whatsappShare = computed(() => {
  const text = encodeURIComponent(`Confira esta solução digital gratuita: ${solucao.value?.name} — ${window.location.href}`)
  return `https://api.whatsapp.com/send?text=${text}`
})

// Reset iframe ao navegar para outra solução
watch(
  () => route.params.slug,
  () => {
    iframeLoading.value = true
    iframeError.value   = false
  },
)
</script>

<style scoped>
.animate-bounce {
  animation: bounce 0.8s infinite;
}
.animate-pulse {
  animation: pulse 1.5s ease-in-out infinite;
}
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.6; }
}
</style>

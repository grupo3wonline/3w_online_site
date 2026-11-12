<!--
  LpSocialProof.vue — Notificações de prova social em tempo real.

  Exibe no canto inferior esquerdo notificações rotativas de FOMO
  como "João de Curitiba acabou de solicitar um orçamento".

  Aparece após 5s do carregamento da página.
-->
<template>
  <div
    class="fixed bottom-20 left-4 z-[997] max-w-xs print:hidden"
    aria-live="polite"
    aria-atomic="true"
  >
    <Transition name="proof-pop">
      <div
        v-if="current && visible"
        class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 p-3.5 flex items-start gap-3"
        role="status"
      >
        <!-- Avatar -->
        <div
          class="w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-xs text-white shadow-sm"
          :class="current.avatarBg"
        >
          {{ current.avatar }}
        </div>

        <!-- Conteúdo -->
        <div class="flex-1 min-w-0">
          <p class="text-xs text-gray-800 dark:text-white leading-snug">
            <strong>{{ current.name }}</strong>
            <span class="text-gray-600 dark:text-slate-300"> de </span>
            <strong>{{ current.city }}</strong>
            {{ current.action }}
          </p>
          <p class="text-[10px] text-gray-400 dark:text-slate-500 mt-0.5 flex items-center gap-1">
            <span class="relative flex h-1.5 w-1.5">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400"></span>
            </span>
            {{ current.time }}
          </p>
        </div>

        <!-- Close -->
        <button
          class="p-1 text-gray-300 dark:text-slate-600 hover:text-gray-500 dark:hover:text-slate-400 transition-colors rounded shrink-0 mt-0.5"
          aria-label="Fechar notificação"
          @click="visible = false"
        >
          <i class="fas fa-times text-[10px]" aria-hidden="true"></i>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface ProofItem {
  name:      string
  city:      string
  action:    string
  time:      string
  avatar:    string
  avatarBg:  string
}

const props = withDefaults(defineProps<{
  items?: ProofItem[]
  intervalMs?: number
  delayMs?: number
}>(), {
  intervalMs: 8000,
  delayMs:    5000,
})

const defaultItems: ProofItem[] = [
  { name: 'Carlos S.',  city: 'Curitiba/PR',      action: 'solicitou um orçamento de Google Ads',          time: 'há 3 minutos',  avatar: 'CS', avatarBg: 'bg-blue-600'   },
  { name: 'Ana P.',     city: 'São Paulo/SP',      action: 'pediu diagnóstico gratuito de redes sociais',   time: 'há 8 minutos',  avatar: 'AP', avatarBg: 'bg-pink-600'   },
  { name: 'Ricardo M.', city: 'Londrina/PR',       action: 'solicitou proposta de sistema sob medida',      time: 'há 12 minutos', avatar: 'RM', avatarBg: 'bg-purple-600' },
  { name: 'Juliana C.', city: 'Florianópolis/SC',  action: 'garantiu uma das vagas do mês',                time: 'há 20 minutos', avatar: 'JC', avatarBg: 'bg-emerald-600'},
  { name: 'Marcos L.',  city: 'Porto Alegre/RS',   action: 'iniciou um projeto de criação de site',         time: 'há 31 minutos', avatar: 'ML', avatarBg: 'bg-amber-600'  },
  { name: 'Priya R.',   city: 'Maringá/PR',        action: 'contratou gestão de tráfego pago',              time: 'há 45 minutos', avatar: 'PR', avatarBg: 'bg-cyan-600'   },
]

const items  = props.items ?? defaultItems
const idx    = ref(0)
const current = ref<ProofItem | null>(null)
const visible = ref(false)

let startTimer:  ReturnType<typeof setTimeout> | null = null
let cycleTimer:  ReturnType<typeof setInterval> | null = null

function show(item: ProofItem) {
  current.value = item
  visible.value = true
  setTimeout(() => { visible.value = false }, props.intervalMs - 1200)
}

onMounted(() => {
  startTimer = setTimeout(() => {
    show(items[0])
    cycleTimer = setInterval(() => {
      idx.value = (idx.value + 1) % items.length
      show(items[idx.value])
    }, props.intervalMs)
  }, props.delayMs)
})

onUnmounted(() => {
  if (startTimer) clearTimeout(startTimer)
  if (cycleTimer) clearInterval(cycleTimer)
})
</script>

<style scoped>
.proof-pop-enter-active,
.proof-pop-leave-active {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}
.proof-pop-enter-from,
.proof-pop-leave-to {
  transform: translateX(-110%) scale(0.9);
  opacity: 0;
}
</style>

<template>
  <!-- Cloudflare Turnstile — desafio explícito para verificação humana -->
  <div
    ref="container"
    class="turnstile-wrapper"
    :class="{ 'opacity-50 pointer-events-none': disabled }"
    role="complementary"
    aria-label="Verificação de segurança Cloudflare"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// ─── Tipos Cloudflare Turnstile ───────────────────────────────────────────────
declare global {
  interface Window {
    turnstile?: {
      render: (
        element: HTMLElement | string,
        options: TurnstileOptions,
      ) => string
      reset: (widgetId: string) => void
      remove: (widgetId: string) => void
      getResponse: (widgetId: string) => string | undefined
    }
    onloadTurnstileCallback?: () => void
  }
}

interface TurnstileOptions {
  sitekey: string
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
  theme?: 'light' | 'dark' | 'auto'
  language?: string
  size?: 'normal' | 'compact' | 'flexible'
  appearance?: 'always' | 'execute' | 'interaction-only'
  action?: string
}

// ─── Props e Emits ────────────────────────────────────────────────────────────
const props = withDefaults(
  defineProps<{
    siteKey?: string
    theme?: 'light' | 'dark' | 'auto'
    size?: 'normal' | 'compact'
    action?: string
    disabled?: boolean
  }>(),
  {
    siteKey: import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAAFwqw34pfNsy8gr0',
    theme: 'light',
    size: 'normal',
    action: 'form_submit',
    disabled: false,
  },
)

const emit = defineEmits<{
  success: [token: string]
  error: []
  expired: []
}>()

// ─── State ────────────────────────────────────────────────────────────────────
const container = ref<HTMLElement | null>(null)
let widgetId: string | null = null
let scriptLoaded = false

// ─── Script Loader ────────────────────────────────────────────────────────────
function loadTurnstileScript(): Promise<void> {
  return new Promise((resolve) => {
    // Script já foi carregado
    if (window.turnstile) { scriptLoaded = true; resolve(); return }

    // Script já está sendo carregado
    const existing = document.querySelector('script[src*="turnstile"]')
    if (existing) {
      existing.addEventListener('load', () => { scriptLoaded = true; resolve() })
      return
    }

    // Carrega o script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    script.onload = () => { scriptLoaded = true; resolve() }
    script.onerror = () => {
      // Degradação graciosa — Turnstile indisponível
      console.warn('[Turnstile] Falha ao carregar script. Formulário pode ser enviado sem verificação.')
      scriptLoaded = false
      resolve()
    }
    document.head.appendChild(script)
  })
}

// ─── Render e Lifecycle ───────────────────────────────────────────────────────
async function renderWidget() {
  if (!container.value || !props.siteKey) return

  await loadTurnstileScript()

  if (!window.turnstile) return

  // Remove widget anterior se existir
  if (widgetId) {
    try { window.turnstile.remove(widgetId) } catch {}
    widgetId = null
  }

  widgetId = window.turnstile.render(container.value, {
    sitekey: props.siteKey,
    theme: props.theme,
    size: props.size,
    action: props.action,
    language: 'pt-BR',
    callback: (token: string) => emit('success', token),
    'error-callback': () => emit('error'),
    'expired-callback': () => emit('expired'),
  })
}

/** Reinicia o widget (chame após submissão ou erro). */
function reset() {
  if (window.turnstile && widgetId) {
    window.turnstile.reset(widgetId)
  }
}

/** Retorna o token atual sem precisar de um evento. */
function getToken(): string {
  if (window.turnstile && widgetId) {
    return window.turnstile.getResponse(widgetId) ?? ''
  }
  return ''
}

onMounted(renderWidget)

onUnmounted(() => {
  if (window.turnstile && widgetId) {
    try { window.turnstile.remove(widgetId) } catch {}
  }
})

// Rerender se siteKey mudar
watch(() => props.siteKey, renderWidget)

defineExpose({ reset, getToken })
</script>

<style scoped>
.turnstile-wrapper {
  display: flex;
  justify-content: flex-start;
  min-height: 65px;
}
</style>

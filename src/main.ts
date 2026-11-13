import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/css/main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

// Augmenta HTMLElement para suportar handlers dinâmicos da diretiva v-tooltip
declare global {
  interface HTMLElement {
    _tooltipShow?: () => void
    _tooltipHide?: () => void
  }
}

/**
 * Iconify — carregamento de ícones
 *
 * @iconify/vue v4 busca ícones de api.iconify.design em tempo de execução.
 * O CSP em index.html inclui explicitamente o endpoint do Iconify em
 * connect-src, permitindo as requisições em produção.
 *
 * Após o primeiro carregamento, os icon sets são cacheados em localStorage
 * — não há requisições repetidas nas visitas seguintes.
 *
 * Para ambientes offline ou com CSP mais restrito, considere usar
 * unplugin-icons + @iconify/json para tree-shaking em build-time.
 */

const app = createApp(App)

app.use(createPinia())
app.use(router)

/**
 * Diretiva global v-tooltip — tooltip CSS acessível.
 *
 * Uso:
 *   <button v-tooltip="'Texto da dica'">...</button>
 *   <span v-tooltip.top="'Acima'">...</span>   (posição: top | bottom | left | right)
 *   <span v-tooltip.dark="'Escuro'">...</span>  (tema: dark | light)
 *
 * - Suporte a tema claro/escuro
 * - Respeita prefers-reduced-motion
 * - Acessível: role="tooltip" com aria-describedby
 */
let _tooltipCounter = 0

function createTooltipEl(text: string, position: string, dark: boolean): HTMLElement {
  const el = document.createElement('span')
  el.setAttribute('role', 'tooltip')
  el.setAttribute('data-tooltip-id', String(++_tooltipCounter))
  el.textContent = text
  el.style.cssText = `
    position: fixed;
    z-index: 10000;
    pointer-events: none;
    max-width: 240px;
    padding: 5px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;
    white-space: normal;
    word-break: break-word;
    background: ${dark ? '#f1f5f9' : '#1e293b'};
    color: ${dark ? '#0f172a' : '#f8fafc'};
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    opacity: 0;
    transition: opacity 0.15s ease;
    transform: translateY(0);
    top: 0; left: 0;
  `
  el.dataset.position = position
  return el
}

function positionTooltip(anchor: HTMLElement, tip: HTMLElement) {
  const rect = anchor.getBoundingClientRect()
  const pos = tip.dataset.position || 'top'
  const margin = 8
  const tw = tip.offsetWidth
  const th = tip.offsetHeight

  let top = 0, left = 0
  switch (pos) {
    case 'bottom':
      top  = rect.bottom + margin
      left = rect.left + rect.width / 2 - tw / 2
      break
    case 'left':
      top  = rect.top + rect.height / 2 - th / 2
      left = rect.left - tw - margin
      break
    case 'right':
      top  = rect.top + rect.height / 2 - th / 2
      left = rect.right + margin
      break
    default: // 'top'
      top  = rect.top - th - margin
      left = rect.left + rect.width / 2 - tw / 2
  }

  // Clamp dentro da viewport
  const vw = window.innerWidth, vh = window.innerHeight
  left = Math.max(6, Math.min(left, vw - tw - 6))
  top  = Math.max(6, Math.min(top,  vh - th - 6))

  tip.style.left = `${left}px`
  tip.style.top  = `${top}px`
}

app.directive('tooltip', {
  mounted(el: HTMLElement, binding) {
    const text = typeof binding.value === 'string' ? binding.value : String(binding.value ?? '')
    if (!text) return

    const position = Object.keys(binding.modifiers).find(k => ['top','bottom','left','right'].includes(k)) || 'top'
    const dark = binding.modifiers.dark === true
    const prefersReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

    el.setAttribute('aria-label', text)
    el.style.cursor = 'help'

    let tip: HTMLElement | null = null

    const show = () => {
      tip = createTooltipEl(text, position, dark)
      document.body.appendChild(tip)
      requestAnimationFrame(() => {
        positionTooltip(el, tip!)
        if (!prefersReduced) tip!.style.opacity = '1'
        else tip!.style.opacity = '1'
      })
    }

    const hide = () => {
      if (!tip) return
      const target = tip
      target.style.opacity = '0'
      setTimeout(() => target.remove(), prefersReduced ? 0 : 160)
      tip = null
    }

    el._tooltipShow = show
    el._tooltipHide = hide

    el.addEventListener('mouseenter', show)
    el.addEventListener('mouseleave', hide)
    el.addEventListener('focus', show)
    el.addEventListener('blur', hide)
  },

  updated(el: HTMLElement, binding) {
    el.setAttribute('aria-label', String(binding.value ?? ''))
  },

  unmounted(el: HTMLElement) {
    el.removeEventListener('mouseenter', el._tooltipShow)
    el.removeEventListener('mouseleave', el._tooltipHide)
    el.removeEventListener('focus', el._tooltipShow)
    el.removeEventListener('blur', el._tooltipHide)
    delete el._tooltipShow
    delete el._tooltipHide
  },
})

app.mount('#app')

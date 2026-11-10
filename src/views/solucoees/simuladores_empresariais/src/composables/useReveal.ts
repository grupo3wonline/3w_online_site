import type { Directive } from 'vue'

/**
 * Diretiva `v-reveal`: adiciona a classe `is-visible` quando o elemento entra
 * na viewport, disparando a animação de entrada (definida em main.css como `.reveal`).
 * Respeita prefers-reduced-motion (o CSS já trata isso).
 */
export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    el.classList.add('reveal')
    const obs = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    ;(el as unknown as { _revealObs?: IntersectionObserver })._revealObs = obs
  },
  unmounted(el) {
    ;(el as unknown as { _revealObs?: IntersectionObserver })._revealObs?.disconnect()
  },
}

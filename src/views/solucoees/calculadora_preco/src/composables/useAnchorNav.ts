import { useRouter, useRoute } from 'vue-router'

/**
 * Navegação por âncoras da landing que funciona tanto estando na página
 * inicial (scroll suave) quanto vindo de outra rota (navega e então rola).
 */
export function useAnchorNav() {
  const router = useRouter()
  const route = useRoute()

  function scrollToId(id: string) {
    const el = document.getElementById(id)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  /** `target` no formato "/#id". */
  async function goToAnchor(target: string) {
    const id = target.split('#')[1]
    if (!id) return

    if (route.name === 'home') {
      scrollToId(id)
    } else {
      await router.push('/')
      // Aguarda o próximo tick de render da landing antes de rolar.
      setTimeout(() => scrollToId(id), 120)
    }
  }

  return { goToAnchor }
}

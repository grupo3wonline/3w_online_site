import { useMediaQuery } from '@vueuse/core'

/**
 * Presets de animação para v-motion (@vueuse/motion).
 * Respeita a preferência do usuário por menos movimento.
 */
export function useMotionPresets() {
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

  function fadeUp(delay = 0) {
    if (reduced.value) return {}
    return {
      initial: { opacity: 0, y: 24 },
      visibleOnce: {
        opacity: 1,
        y: 0,
        transition: { duration: 500, delay, ease: 'easeOut' },
      },
    }
  }

  function fadeIn(delay = 0) {
    if (reduced.value) return {}
    return {
      initial: { opacity: 0 },
      visibleOnce: { opacity: 1, transition: { duration: 500, delay } },
    }
  }

  function zoomIn(delay = 0) {
    if (reduced.value) return {}
    return {
      initial: { opacity: 0, scale: 0.92 },
      visibleOnce: {
        opacity: 1,
        scale: 1,
        transition: { duration: 450, delay, ease: 'easeOut' },
      },
    }
  }

  return { reduced, fadeUp, fadeIn, zoomIn }
}

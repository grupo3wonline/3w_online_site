import { ref } from 'vue'

/**
 * Composable para otimizações de performance.
 * Inclui IntersectionObserver, debounce, throttle e lazy loading.
 */
export function usePerformance() {
  const isVisible = ref(false)

  /** Debounce — atrasa execução até parar de chamar */
  function debounce<T extends (...args: unknown[]) => void>(fn: T, wait: number): T {
    let timeout: ReturnType<typeof setTimeout> | null = null
    return ((...args: unknown[]) => {
      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(() => fn(...args), wait)
    }) as unknown as T
  }

  /** Throttle — limita execução a no máximo 1 vez por intervalo */
  function throttle<T extends (...args: unknown[]) => void>(fn: T, limit: number): T {
    let inThrottle = false
    return ((...args: unknown[]) => {
      if (!inThrottle) {
        fn(...args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }) as unknown as T
  }

  /** Configura IntersectionObserver para animações de entrada */
  function setupScrollAnimations(selector = '.animate-on-scroll', options?: IntersectionObserverInit) {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement
            const delay = parseInt(el.dataset.delay || '0', 10)
            setTimeout(() => el.classList.add('animate-in'), delay)
            observer.unobserve(el)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px', ...options },
    )

    document.querySelectorAll(selector).forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }

  /** Preload de assets críticos */
  function preloadAssets(urls: string[]) {
    if (typeof document === 'undefined') return
    urls.forEach((url) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      if (url.endsWith('.css')) link.as = 'style'
      else if (url.endsWith('.js')) link.as = 'script'
      else if (/\.(jpg|jpeg|png|webp|avif|svg)$/i.test(url)) link.as = 'image'
      link.href = url
      document.head.appendChild(link)
    })
  }

  return {
    isVisible,
    debounce,
    throttle,
    setupScrollAnimations,
    preloadAssets,
  }
}

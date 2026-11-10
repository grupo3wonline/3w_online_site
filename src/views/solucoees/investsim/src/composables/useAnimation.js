/**
 * Composable para animações e interações
 * @module useAnimation
 */

import { ref, onMounted, onUnmounted } from 'vue'

export function useAnimation() {
  /**
   * Observa elementos e adiciona classe quando entram no viewport
   * @param {string} selector - Seletor CSS dos elementos
   * @param {string} className - Classe a ser adicionada
   * @param {Object} options - Opções do IntersectionObserver
   */
  const observeElements = (selector, className = 'animate-in', options = {}) => {
    const defaultOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(className)
        }
      })
    }, defaultOptions)

    const elements = document.querySelectorAll(selector)
    elements.forEach(el => observer.observe(el))

    return observer
  }

  /**
   * Hook para scroll suave
   * @param {string|HTMLElement} target - Elemento alvo ou seletor
   * @param {Object} options - Opções do scroll
   */
  const smoothScroll = (target, options = {}) => {
    const element = typeof target === 'string' 
      ? document.querySelector(target) 
      : target

    if (!element) return

    const defaultOptions = {
      behavior: 'smooth',
      block: 'start',
      ...options
    }

    element.scrollIntoView(defaultOptions)
  }

  /**
   * Hook para detectar direção do scroll
   * @returns {Object} Estado do scroll
   */
  const useScrollDirection = () => {
    const scrollY = ref(0)
    const scrollDirection = ref('down')
    const isScrollingUp = ref(false)
    const isScrollingDown = ref(true)

    let lastScrollY = 0

    const updateScroll = () => {
      scrollY.value = window.scrollY

      if (scrollY.value > lastScrollY) {
        scrollDirection.value = 'down'
        isScrollingDown.value = true
        isScrollingUp.value = false
      } else if (scrollY.value < lastScrollY) {
        scrollDirection.value = 'up'
        isScrollingUp.value = true
        isScrollingDown.value = false
      }

      lastScrollY = scrollY.value
    }

    onMounted(() => {
      window.addEventListener('scroll', updateScroll, { passive: true })
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', updateScroll)
    })

    return {
      scrollY,
      scrollDirection,
      isScrollingUp,
      isScrollingDown
    }
  }

  /**
   * Hook para detectar posição do scroll
   * @returns {Object} Estado da posição
   */
  const useScrollPosition = () => {
    const isAtTop = ref(true)
    const isAtBottom = ref(false)
    const scrollProgress = ref(0)

    const updatePosition = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight

      isAtTop.value = scrollTop < 50
      isAtBottom.value = scrollTop + winHeight >= docHeight - 50
      scrollProgress.value = (scrollTop / (docHeight - winHeight)) * 100
    }

    onMounted(() => {
      window.addEventListener('scroll', updatePosition, { passive: true })
      updatePosition()
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', updatePosition)
    })

    return {
      isAtTop,
      isAtBottom,
      scrollProgress
    }
  }

  /**
   * Adiciona efeito parallax a um elemento
   * @param {HTMLElement} element - Elemento alvo
   * @param {number} speed - Velocidade do efeito (0-1)
   */
  const addParallax = (element, speed = 0.5) => {
    if (!element) return

    const updateParallax = () => {
      const scrolled = window.scrollY
      const offset = scrolled * speed
      element.style.transform = `translateY(${offset}px)`
    }

    window.addEventListener('scroll', updateParallax, { passive: true })

    return () => {
      window.removeEventListener('scroll', updateParallax)
    }
  }

  /**
   * Adiciona efeito de fade in escalonado para lista de elementos
   * @param {string} selector - Seletor CSS
   * @param {number} delay - Delay entre elementos (ms)
   */
  const staggerFadeIn = (selector, delay = 100) => {
    const elements = document.querySelectorAll(selector)
    
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-0')
        requestAnimationFrame(() => {
          el.classList.add('transition-opacity', 'duration-500')
          el.classList.remove('opacity-0')
        })
      }, index * delay)
    })
  }

  return {
    observeElements,
    smoothScroll,
    useScrollDirection,
    useScrollPosition,
    addParallax,
    staggerFadeIn
  }
}

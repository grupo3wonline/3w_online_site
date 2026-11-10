import { defineStore } from 'pinia'
import { ref } from 'vue'

const CHAVE = 'tema-calcprecos'
type Tema = 'light' | 'dark'

export const useTemaStore = defineStore('tema', () => {
  const tema = ref<Tema>('dark')

  function aplicar(valor: Tema) {
    tema.value = valor
    const raiz = document.documentElement
    if (valor === 'dark') raiz.classList.add('dark')
    else raiz.classList.remove('dark')
    try {
      localStorage.setItem(CHAVE, valor)
    } catch {
      /* localStorage indisponível */
    }
    // Atualiza a cor da barra do navegador
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', valor === 'dark' ? '#060a17' : '#6366f1')
  }

  function iniciar() {
    let salvo: string | null = null
    try {
      salvo = localStorage.getItem(CHAVE)
    } catch {
      /* ignore */
    }
    if (salvo === 'light' || salvo === 'dark') {
      aplicar(salvo)
    } else {
      const prefereDark =
        window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      aplicar(prefereDark ? 'dark' : 'light')
    }
  }

  function alternar() {
    aplicar(tema.value === 'dark' ? 'light' : 'dark')
  }

  return { tema, iniciar, alternar, aplicar }
})

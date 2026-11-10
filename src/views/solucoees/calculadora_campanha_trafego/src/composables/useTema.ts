import { ref, onMounted } from 'vue'

type Tema = 'claro' | 'escuro'

const tema = ref<Tema>('claro')

function aplicarTema(t: Tema) {
  if (t === 'escuro') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function useTema() {
  onMounted(() => {
    const salvo = localStorage.getItem('tema') as Tema | null
    if (salvo === 'escuro' || salvo === 'claro') {
      tema.value = salvo
    } else {
      tema.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
    }
    aplicarTema(tema.value)
  })

  function alternarTema() {
    tema.value = tema.value === 'claro' ? 'escuro' : 'claro'
    localStorage.setItem('tema', tema.value)
    aplicarTema(tema.value)
  }

  return { tema, alternarTema }
}

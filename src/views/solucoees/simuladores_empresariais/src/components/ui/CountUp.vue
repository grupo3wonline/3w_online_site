<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Contador animado que dispara ao entrar na viewport.
 * Aceita um valor final (ex.: "3.500+", "98%", "+40") e anima apenas a parte
 * numérica, preservando prefixos/sufixos como "+", "%" e separadores.
 */
const props = withDefaults(defineProps<{ value: string; duration?: number }>(), { duration: 1600 })

const el = ref<HTMLElement | null>(null)
const exibido = ref(props.value)
let observer: IntersectionObserver | null = null
let raf = 0

// Separa prefixo (não numérico), número e sufixo. Ex.: "3.500+" -> prefixo '', num 3500, sufixo '+'
function analisar(v: string) {
  const match = v.match(/^([^\d]*)([\d.,]+)(.*)$/)
  if (!match) return null
  const [, prefixo, numeroStr, sufixo] = match
  const numero = parseInt(numeroStr.replace(/[.,]/g, ''), 10)
  return { prefixo, numero, sufixo, temSeparador: /[.,]/.test(numeroStr) }
}

function formatar(n: number, comSeparador: boolean) {
  return comSeparador ? n.toLocaleString('pt-BR') : String(n)
}

function animar() {
  const info = analisar(props.value)
  if (!info) {
    exibido.value = props.value
    return
  }
  const inicio = performance.now()
  const passo = (agora: number) => {
    const t = Math.min(1, (agora - inicio) / props.duration)
    // easeOutCubic
    const eased = 1 - Math.pow(1 - t, 3)
    const atual = Math.round(info.numero * eased)
    exibido.value = `${info.prefixo}${formatar(atual, info.temSeparador)}${info.sufixo}`
    if (t < 1) raf = requestAnimationFrame(passo)
  }
  raf = requestAnimationFrame(passo)
}

onMounted(() => {
  if (typeof IntersectionObserver === 'undefined') {
    exibido.value = props.value
    return
  }
  observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animar()
          obs.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.4 }
  )
  if (el.value) observer.observe(el.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <span ref="el">{{ exibido }}</span>
</template>

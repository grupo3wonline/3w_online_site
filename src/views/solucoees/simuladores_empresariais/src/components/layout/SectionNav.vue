<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Secao {
  id: string
  label: string
}

const secoes: Secao[] = [
  { id: 'inicio', label: 'Início' },
  { id: 'beneficios', label: 'Benefícios' },
  { id: 'como-funciona', label: 'Como Funciona' },
  { id: 'sobre', label: 'Sobre' },
  { id: 'ferramentas', label: 'Ferramentas' },
  { id: 'servicos', label: 'Serviços' },
  { id: 'contato', label: 'Contato' },
]

const ativo = ref<string>('inicio')
let observer: IntersectionObserver | null = null

function irPara(id: string) {
  if (id === 'inicio') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) ativo.value = entry.target.id
      })
    },
    { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
  )
  // 'inicio' é o topo — observamos o hero pelo id, os demais pelas seções
  secoes.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer?.observe(el)
  })
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <nav
    class="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    aria-label="Navegação por seções"
  >
    <ul class="flex flex-col gap-3">
      <li v-for="s in secoes" :key="s.id" class="group flex items-center justify-end gap-2">
        <span
          class="pointer-events-none whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-medium text-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
          :class="ativo === s.id ? 'opacity-100' : ''"
        >
          {{ s.label }}
        </span>
        <button
          class="h-3 w-3 rounded-full border-2 transition-all"
          :class="
            ativo === s.id
              ? 'scale-125 border-brand bg-brand'
              : 'border-muted-foreground/40 bg-transparent hover:border-brand'
          "
          :aria-label="`Ir para ${s.label}`"
          :aria-current="ativo === s.id ? 'true' : undefined"
          @click="irPara(s.id)"
        />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(defineProps<{
  titulo?: string
  subtitulo?: string
  textoBotao?: string
  link?: string
  externo?: boolean
}>(), {
  titulo: 'Precisa de um site ou sistema sob medida?',
  subtitulo: 'O Grupo 3W Online desenvolve sites e sistemas personalizados sob demanda. Transformamos suas ideias em soluções digitais que geram resultados reais.',
  textoBotao: 'Conheça a 3W Online',
  link: 'https://www.3wonline.com.br',
  externo: true,
})
</script>

<template>
  <section id="cta-3wonline" class="section gradient-hero relative overflow-hidden">
    <div class="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" aria-hidden="true"></div>
    <div class="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" aria-hidden="true"></div>

    <div class="container-app text-center relative z-10">
      <div class="max-w-3xl mx-auto">
        <span class="badge bg-white/20 text-white mb-6">
          <i class="fa-solid fa-star"></i>
          Empresa Desenvolvedora
        </span>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight text-balance">
          {{ titulo }}
        </h2>
        <p class="text-lg md:text-xl text-white/85 mb-10 leading-relaxed">
          {{ subtitulo }}
        </p>
        <a
          v-if="externo"
          id="cta-link-3wonline"
          :href="link"
          target="_blank"
          rel="noopener noreferrer"
          class="btn bg-white text-primary-700 font-bold shadow-floating hover:shadow-glow hover:-translate-y-1 px-8 py-4 text-base rounded-2xl"
        >
          <i class="fa-solid fa-arrow-up-right-from-square"></i>
          {{ textoBotao }}
        </a>
        <RouterLink
          v-else
          :to="link"
          class="btn bg-white text-primary-700 font-bold shadow-floating hover:shadow-glow hover:-translate-y-1 px-8 py-4 text-base rounded-2xl"
        >
          {{ textoBotao }}
        </RouterLink>
      </div>
    </div>
  </section>
</template>

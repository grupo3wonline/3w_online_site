<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { COMPANY } from '@/data/tools'

const stats = [
  { value: '8+', label: 'Ferramentas interativas' },
  { value: '100%', label: 'Gratuito e em português' },
  { value: '2.5k+', label: 'Estudantes ativos' },
]
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-slate-900 via-brand-900 to-indigo-950 text-white"
  >
    <div class="absolute inset-0 opacity-20">
      <div class="absolute -left-20 top-10 h-72 w-72 rounded-full bg-brand-500 blur-3xl" />
      <div class="absolute -right-10 bottom-0 h-80 w-80 rounded-full bg-indigo-500 blur-3xl" />
    </div>

    <div class="container-page relative grid gap-10 py-20 md:grid-cols-2 md:py-28 lg:items-center">
      <div v-motion-slide-visible-once-left>
        <span
          class="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur"
        >
          <Icon
            icon="lucide:sparkles"
            class="h-4 w-4 text-amber-300"
          />
          Aprenda programando de verdade
        </span>
        <h1 class="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
          Comece sua jornada na
          <span class="bg-gradient-to-r from-brand-300 to-amber-300 bg-clip-text text-transparent">
            programação
          </span>
          hoje.
        </h1>
        <p class="mt-6 max-w-xl text-lg text-slate-200">
          Uma coleção de ferramentas interativas, desafios e um tutor com IA para transformar lógica
          em código. Do fluxograma ao PHP, tudo no navegador, sem instalar nada.
        </p>
        <div class="mt-8 flex flex-col gap-3 sm:flex-row">
          <RouterLink
            to="/ferramentas"
            class="btn-primary text-base"
          >
            <Icon
              icon="lucide:rocket"
              class="h-5 w-5"
            />
            Explorar ferramentas
          </RouterLink>
          <RouterLink
            :to="{ path: '/', hash: '#como-funciona' }"
            class="btn border border-white/30 bg-white/5 text-white hover:bg-white/10"
          >
            <Icon
              icon="lucide:play"
              class="h-5 w-5"
            />
            Como funciona
          </RouterLink>
        </div>

        <dl class="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
          <div
            v-for="stat in stats"
            :key="stat.label"
          >
            <dt class="text-2xl font-extrabold text-white sm:text-3xl">
              {{ stat.value }}
            </dt>
            <dd class="mt-1 text-xs text-slate-300 sm:text-sm">
              {{ stat.label }}
            </dd>
          </div>
        </dl>
      </div>

      <div
        v-motion-slide-visible-once-right
        class="relative"
      >
        <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 shadow-2xl backdrop-blur">
          <div class="mb-3 flex gap-1.5">
            <span class="h-3 w-3 rounded-full bg-red-400" />
            <span class="h-3 w-3 rounded-full bg-amber-400" />
            <span class="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <pre class="overflow-x-auto rounded-lg bg-black/50 p-4 text-sm leading-relaxed"><code><span class="text-brand-300">programa</span> {
  <span class="text-amber-300">funcao</span> inicio() {
    escreva(<span class="text-green-300">"Olá, futuro dev!"</span>)
    <span class="text-slate-400">// seu primeiro passo 🚀</span>
  }
}</code></pre>
        </div>
        <div
          class="absolute -bottom-4 -right-4 hidden animate-float rounded-xl bg-white p-3 text-slate-900 shadow-xl sm:block"
        >
          <Icon
            icon="lucide:trophy"
            class="h-8 w-8 text-amber-500"
          />
        </div>
      </div>
    </div>

    <div class="border-t border-white/10 bg-black/20 py-3 text-center text-sm text-slate-300">
      Desenvolvido pelo
      <a
        :href="COMPANY.site"
        target="_blank"
        rel="noopener noreferrer"
        class="font-semibold text-white underline-offset-4 hover:underline"
      >
        {{ COMPANY.name }}
      </a>
      — {{ COMPANY.slogan }}.
    </div>
  </section>
</template>

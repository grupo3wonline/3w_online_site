<script setup lang="ts">
import { Icon } from '@iconify/vue'

const benefits = [
  {
    icon: 'lucide:mouse-pointer-click',
    title: 'Aprenda praticando',
    text: 'Ferramentas interativas onde você constrói, testa e vê o resultado na hora. Nada de teoria solta.',
  },
  {
    icon: 'lucide:bot',
    title: 'Tutor com IA',
    text: 'Tire dúvidas a qualquer momento com um assistente que explica conceitos em português, no seu ritmo.',
  },
  {
    icon: 'lucide:gamepad-2',
    title: 'Gamificado',
    text: 'Desafios semanais e conquistas mantêm você motivado a evoluir um passo de cada vez.',
  },
  {
    icon: 'lucide:smartphone',
    title: 'Mobile first',
    text: 'Estude do celular, tablet ou desktop. Interface responsiva e rápida em qualquer tela.',
  },
  {
    icon: 'lucide:gift',
    title: '100% gratuito',
    text: 'Todas as ferramentas são livres. Sem cadastro obrigatório, sem pegadinhas.',
  },
  {
    icon: 'lucide:shield-check',
    title: 'Seguro e privado',
    text: 'Seus dados ficam no seu navegador. Conformidade com LGPD, GDPR, CCPA e POPIA.',
  },
]
</script>

<template>
  <section
    id="beneficios"
    class="bg-white py-20 dark:bg-slate-950"
  >
    <div class="container-page">
      <div class="mx-auto max-w-2xl text-center">
        <span class="text-sm font-bold uppercase tracking-wide text-brand-600 dark:text-brand-400">
          Benefícios
        </span>
        <h2 class="section-title mt-2">
          Por que aprender no DevStart?
        </h2>
        <p class="mt-4 text-slate-600 dark:text-slate-400">
          Reunimos o que há de melhor para quem está começando: prática, orientação e uma
          experiência que respeita o seu tempo.
        </p>
      </div>

      <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="(b, i) in benefits"
          :key="b.title"
          v-motion-slide-visible-once-bottom
          :delay="i * 60"
          class="card p-6 transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div
            class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/40 dark:text-brand-300"
          >
            <Icon
              :icon="b.icon"
              class="h-6 w-6"
            />
          </div>
          <h3 class="mt-4 text-lg font-bold text-slate-900 dark:text-white">
            {{ b.title }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {{ b.text }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

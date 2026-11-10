<script setup lang="ts">
import { Icon } from '@iconify/vue'
import SectionHeading from './SectionHeading.vue'

const useCases = [
  {
    icon: 'lucide:graduation-cap',
    title: 'Estudantes',
    description: 'Aprenda programação testando código em tempo real.',
    examples: ['Exercícios de HTML', 'Experimentos CSS', 'Prática de JavaScript'],
  },
  {
    icon: 'lucide:briefcase',
    title: 'Profissionais',
    description: 'Teste snippets e protótipos rapidamente.',
    examples: ['Validar ideias', 'Testar bibliotecas', 'Debug rápido'],
  },
  {
    icon: 'lucide:presentation',
    title: 'Professores',
    description: 'Demonstre conceitos de forma interativa.',
    examples: ['Exemplos em aula', 'Material didático', 'Exercícios práticos'],
  },
  {
    icon: 'lucide:lightbulb',
    title: 'Criadores',
    description: 'Prototipe e compartilhe suas criações.',
    examples: ['Landing pages', 'Componentes UI', 'Animações CSS'],
  },
]

const tips = [
  { icon: 'lucide:keyboard', title: 'Atalhos de Teclado', description: 'Ctrl+Enter executa, Ctrl+Shift+F formata e Ctrl+L limpa o console.' },
  { icon: 'lucide:save', title: 'Templates Prontos', description: 'Comece com templates de cards, formulários, animações e componentes.' },
  { icon: 'lucide:eye', title: 'Preview Responsivo', description: 'Teste seu código em diferentes tamanhos de tela.' },
  { icon: 'lucide:book-open', title: 'Export Rápido', description: 'Baixe HTML único ou arquivos separados em um clique.' },
]
</script>

<template>
  <section id="ferramentas" class="scroll-mt-20 bg-muted/40 py-20">
    <div class="container-page">
      <SectionHeading
        eyebrow="Casos de uso"
        title="Para quem é o"
        highlight="DevPlayground?"
        subtitle="Desenvolvido para atender diferentes necessidades."
      />
      <div class="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="uc in useCases"
          :key="uc.title"
          v-motion-fade-visible-once
          class="rounded-2xl border-2 border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full gradient-brand">
            <Icon :icon="uc.icon" class="h-7 w-7 text-white" />
          </div>
          <h3 class="mb-1 text-center text-xl font-bold">{{ uc.title }}</h3>
          <p class="mb-4 text-center text-sm text-muted-foreground">{{ uc.description }}</p>
          <ul class="space-y-2 text-sm">
            <li v-for="ex in uc.examples" :key="ex" class="flex items-center gap-2">
              <Icon icon="lucide:chevron-right" class="h-4 w-4 text-primary" />
              <span class="text-muted-foreground">{{ ex }}</span>
            </li>
          </ul>
        </article>
      </div>

      <h3 class="mb-8 text-center text-2xl font-bold">Dicas de Uso</h3>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="tip in tips"
          :key="tip.title"
          class="rounded-2xl bg-card p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-lg gradient-brand">
            <Icon :icon="tip.icon" class="h-6 w-6 text-white" />
          </div>
          <h4 class="mb-2 text-lg font-bold">{{ tip.title }}</h4>
          <p class="text-sm text-muted-foreground">{{ tip.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import SectionHeading from './SectionHeading.vue'
import HelpButton from '@/components/common/HelpButton.vue'

const steps = [
  {
    n: '1',
    title: 'Abra o Editor',
    description: 'Clique em "Começar Agora" e acesse o editor profissional imediatamente. Sem cadastro.',
    help: 'Você não precisa de conta nem instalação. O editor abre direto no navegador.',
  },
  {
    n: '2',
    title: 'Escreva Código',
    description: 'Digite HTML, CSS, JavaScript ou PHP com destaque de sintaxe e autocomplete.',
    help: 'Use os atalhos: Ctrl+Enter executa o código; Ctrl+Shift+F formata; Ctrl+L limpa o console.',
  },
  {
    n: '3',
    title: 'Veja o Resultado',
    description: 'Preview em tempo real e console integrado para depuração instantânea.',
    help: 'O preview roda em sandbox isolado. Erros de JavaScript aparecem no console lateral.',
  },
]
</script>

<template>
  <section id="como-usar" class="scroll-mt-20 bg-background py-20">
    <div class="container-page">
      <SectionHeading
        eyebrow="Passo a passo"
        title="Como"
        highlight="Usar"
        subtitle="Simples, rápido e intuitivo. Comece em 3 passos."
      />
      <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        <div v-for="step in steps" :key="step.n" v-motion-fade-visible-once class="text-center">
          <div
            class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full gradient-brand text-3xl font-bold text-white"
          >
            {{ step.n }}
          </div>
          <div class="mb-3 flex items-center justify-center gap-2">
            <h3 class="text-2xl font-bold">{{ step.title }}</h3>
            <HelpButton :title="step.title" :content="step.help" label="Dica" />
          </div>
          <p class="text-muted-foreground">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseBadge from '@/components/ui/BaseBadge.vue'

const trust = ['Sem cadastro necessário', '100% gratuito', 'Sem limites de uso']
const techs = [
  { icon: 'vscode-icons:file-type-html', label: 'HTML' },
  { icon: 'vscode-icons:file-type-css', label: 'CSS' },
  { icon: 'vscode-icons:file-type-js-official', label: 'JavaScript' },
  { icon: 'vscode-icons:file-type-php', label: 'PHP' },
]
</script>

<template>
  <section class="relative overflow-hidden bg-dots">
    <!-- Halos de brilho -->
    <div class="blob left-[-10%] top-[-10%] h-96 w-96 bg-primary" />
    <div class="blob right-[-5%] top-[20%] h-80 w-80 bg-secondary" />

    <div class="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2">
      <!-- Texto -->
      <div v-motion-slide-visible-once-left class="space-y-8 text-center lg:text-left">
        <BaseBadge>
          <Icon icon="lucide:sparkles" class="h-4 w-4" />
          Mais de 1.500 desenvolvedores confiam
        </BaseBadge>

        <h1 class="text-4xl font-extrabold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
          <span class="gradient-text">Editor de Código Online</span><br />
          <span class="text-foreground">Profissional e Gratuito</span>
        </h1>

        <p class="mx-auto max-w-2xl text-lg text-muted-foreground md:text-xl lg:mx-0">
          Escreva, teste e compartilhe código <strong>HTML, CSS, JavaScript e PHP</strong> em tempo
          real. Interface moderna, preview ao vivo e console integrado.
        </p>

        <!-- Badges de tecnologia -->
        <div class="flex flex-wrap justify-center gap-2 lg:justify-start">
          <span
            v-for="tech in techs"
            :key="tech.label"
            class="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/60 px-3 py-1.5 text-sm font-medium backdrop-blur"
          >
            <Icon :icon="tech.icon" class="h-4 w-4" />
            {{ tech.label }}
          </span>
        </div>

        <div class="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
          <RouterLink to="/playground">
            <BaseButton size="lg" block>
              <Icon icon="lucide:play" class="h-5 w-5" />
              Começar Agora — É Grátis!
            </BaseButton>
          </RouterLink>
          <a href="#recursos">
            <BaseButton size="lg" variant="outline" block>
              <Icon icon="lucide:layout-grid" class="h-5 w-5" />
              Ver Recursos
            </BaseButton>
          </a>
        </div>

        <ul
          class="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground lg:justify-start"
        >
          <li v-for="item in trust" :key="item" class="flex items-center gap-2">
            <Icon icon="lucide:check-circle-2" class="h-4 w-4 text-emerald-500" />
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Mock de editor com janela -->
      <div v-motion-slide-visible-once-right class="relative">
        <div class="card-glow overflow-hidden rounded-2xl border border-border shadow-2xl">
          <!-- Barra da janela -->
          <div class="flex items-center gap-2 border-b border-editor-border bg-editor-header px-4 py-3">
            <span class="h-3 w-3 rounded-full bg-red-500" />
            <span class="h-3 w-3 rounded-full bg-yellow-500" />
            <span class="h-3 w-3 rounded-full bg-green-500" />
            <span class="ml-3 text-xs text-editor-foreground/60">index.html — DevPlayground</span>
          </div>
          <div class="bg-editor-bg p-5 font-mono text-sm">
            <div class="space-y-1.5">
              <div class="text-slate-500">&lt;!DOCTYPE html&gt;</div>
              <div class="text-sky-400">&lt;html lang="pt-BR"&gt;</div>
              <div class="ml-4 text-violet-400">&lt;head&gt;</div>
              <div class="ml-8 text-emerald-400">&lt;title&gt;DevPlayground&lt;/title&gt;</div>
              <div class="ml-4 text-violet-400">&lt;/head&gt;</div>
              <div class="ml-4 text-violet-400">&lt;body&gt;</div>
              <div class="ml-8 text-amber-400">
                &lt;h1&gt;Olá, Mundo!<span class="animate-pulse">▋</span>&lt;/h1&gt;
              </div>
              <div class="ml-4 text-violet-400">&lt;/body&gt;</div>
              <div class="text-sky-400">&lt;/html&gt;</div>
            </div>
          </div>
        </div>

        <!-- Badges flutuantes -->
        <div
          class="animate-float absolute -right-3 -top-3 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-lg"
        >
          <Icon icon="lucide:check" class="mr-1 inline h-4 w-4" />Gratuito
        </div>
        <div
          class="animate-float absolute -bottom-3 -left-3 rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-white shadow-lg [animation-delay:1.5s]"
        >
          <Icon icon="lucide:zap" class="mr-1 inline h-4 w-4" />Preview ao vivo
        </div>
      </div>
    </div>
  </section>
</template>

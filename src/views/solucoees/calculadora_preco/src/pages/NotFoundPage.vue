<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'

const quickLinks = [
  { to: '/', icon: 'fa6-solid:house', label: 'Início' },
  { to: '/#servicos', icon: 'fa6-solid:briefcase', label: 'Serviços' },
  { to: '/calculadora', icon: 'fa6-solid:calculator', label: 'Calculadora' },
  { to: '/#contato', icon: 'fa6-solid:envelope', label: 'Contato' },
]
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center py-16">
    <div class="container">
      <div class="mx-auto max-w-3xl space-y-8 text-center">
        <div class="relative">
          <p
            class="select-none text-[140px] font-black leading-none text-gradient opacity-30 md:text-[220px]"
          >
            404
          </p>
          <div class="mt-[-40px] rounded-3xl border border-border bg-card p-10 shadow-elegant">
            <Icon
              icon="fa6-solid:magnifying-glass"
              class="mb-6 inline-block h-16 w-16 text-primary"
            />
            <h1 class="mb-4 text-3xl font-black text-foreground md:text-4xl">
              Página Não Encontrada
            </h1>
            <p class="mb-8 text-lg text-muted-foreground">
              Oops! A página que você está procurando não existe ou foi removida.
            </p>
            <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <RouterLink
                to="/"
                class="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-3.5 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Icon icon="fa6-solid:house" class="h-5 w-5" />
                Voltar para o Início
              </RouterLink>
              <RouterLink
                to="/calculadora"
                class="inline-flex items-center gap-3 rounded-xl border-2 border-primary px-8 py-3.5 text-lg font-semibold text-primary transition-colors hover:bg-accent"
              >
                <Icon icon="fa6-solid:calculator" class="h-5 w-5" />
                Usar Calculadora
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="pt-6">
          <p class="mb-6 text-lg text-muted-foreground">Talvez você esteja procurando:</p>
          <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
            <RouterLink
              v-for="link in quickLinks"
              :key="link.to"
              :to="link.to"
              class="rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
            >
              <Icon :icon="link.icon" class="mb-3 inline-block h-7 w-7 text-primary" />
              <p class="font-semibold text-foreground">{{ link.label }}</p>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

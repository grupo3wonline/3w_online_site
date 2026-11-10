<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import BaseButton from '@/components/ui/BaseButton.vue'

defineProps<{
  code: string
  title: string
  message: string
  icon?: string
}>()
</script>

<template>
  <section class="flex min-h-[70vh] items-center justify-center px-4 py-20">
    <div class="max-w-lg text-center">
      <div class="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
        <Icon :icon="icon || 'lucide:triangle-alert'" class="h-12 w-12 text-primary" />
      </div>
      <p class="text-7xl font-extrabold gradient-text">{{ code }}</p>
      <h1 class="mt-4 text-2xl font-bold md:text-3xl">{{ title }}</h1>
      <p class="mt-3 text-muted-foreground">{{ message }}</p>
      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink to="/">
          <BaseButton block>
            <Icon icon="lucide:home" class="h-5 w-5" />
            Voltar para o Início
          </BaseButton>
        </RouterLink>
        <RouterLink to="/playground">
          <BaseButton variant="outline" block>
            <Icon icon="lucide:code-2" class="h-5 w-5" />
            Abrir o Editor
          </BaseButton>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

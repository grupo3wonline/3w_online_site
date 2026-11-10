<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useSeo } from '@/composables/useSeo'

const props = defineProps<{ code?: string }>()

interface ErrorInfo {
  title: string
  description: string
}

const errors: Record<string, ErrorInfo> = {
  '403': {
    title: 'Acesso Negado',
    description: 'Você não tem permissão para acessar este recurso.',
  },
  '500': {
    title: 'Erro Interno',
    description: 'Algo deu errado do nosso lado. Tente novamente em instantes.',
  },
  '503': {
    title: 'Serviço Indisponível',
    description: 'A ferramenta está temporariamente indisponível. Volte em breve.',
  },
}

const code = computed(() => props.code ?? '500')
const info = computed(() => errors[code.value] ?? errors['500'])

useSeo(() => ({
  title: `Erro ${code.value} | Calculadora de Redes Sociais`,
  description: info.value.description,
  path: `/erro/${code.value}`,
}))
</script>

<template>
  <div class="flex min-h-[70vh] items-center justify-center px-4 py-16">
    <div class="max-w-lg text-center">
      <span
        class="bg-gradient-to-r from-rose-500 to-red-600 bg-clip-text text-8xl font-extrabold text-transparent md:text-9xl"
      >
        {{ code }}
      </span>
      <h1 class="mb-4 mt-4 text-2xl font-bold text-gray-900 dark:text-white md:text-3xl">
        {{ info.title }}
      </h1>
      <p class="mb-8 leading-relaxed text-gray-600 dark:text-gray-400">
        {{ info.description }}
      </p>
      <div class="flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
        >
          <Icon
            icon="lucide:home"
            class="mr-2 h-5 w-5"
          />
          Voltar ao Início
        </RouterLink>
        <RouterLink
          to="/#contato"
          class="inline-flex items-center justify-center rounded-xl border-2 border-violet-300 px-6 py-3 font-semibold text-violet-700 transition-all dark:border-violet-600 dark:text-violet-300"
        >
          <Icon
            icon="lucide:mail"
            class="mr-2 h-5 w-5"
          />
          Reportar Problema
        </RouterLink>
      </div>
    </div>
  </div>
</template>

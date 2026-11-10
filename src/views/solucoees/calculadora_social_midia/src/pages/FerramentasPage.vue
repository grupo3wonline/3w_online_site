<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { Icon } from '@iconify/vue'
import SocialMediaCalculator from '@/components/SocialMediaCalculator.vue'
import { SITE } from '@/lib/utils'
import { useSeo } from '@/composables/useSeo'

useSeo(() => ({
  title: 'Calculadora de Redes Sociais | Ferramenta de Precificação | 3W Online',
  description:
    'Use a calculadora de redes sociais e descubra o valor sugerido para seus serviços com base em métricas reais. Processamento 100% local e seguro.',
  keywords: 'calculadora social media, ferramenta precificação, quanto cobrar redes sociais',
  path: '/ferramentas',
}))

const instructions = [
  {
    title: 'Número de Perfis',
    description: 'Quantidade total de perfis que você vai gerenciar em todas as plataformas.',
    example: 'Ex: 2 no Instagram + 1 no Facebook = 3 perfis',
    icon: 'lucide:users',
  },
  {
    title: 'Número de Plataformas',
    description: 'Quantas plataformas diferentes serão utilizadas (IG, FB, LinkedIn, TikTok...).',
    example: 'Ex: Instagram + Facebook + LinkedIn = 3 plataformas',
    icon: 'lucide:layers',
  },
  {
    title: 'Posts por Semana',
    description: 'Quantidade total de posts criados por semana, somando todos os perfis.',
    example: 'Ex: 4 posts/dia × 5 dias = 20 posts/semana',
    icon: 'lucide:image',
  },
  {
    title: 'Frequência Semanal',
    description: 'Média de postagens por semana em cada perfil individual.',
    example: 'Ex: Postar todos os dias = frequência 7',
    icon: 'lucide:calendar-days',
  },
  {
    title: 'Taxa de Engajamento',
    description: 'Porcentagem esperada de interações em relação ao alcance.',
    example: 'Ex: 3.5% é bom para a maioria dos nichos',
    icon: 'lucide:trending-up',
  },
  {
    title: 'Resultado',
    description: 'Valor sugerido considerando complexidade, volume e engajamento (mínimo R$ 500).',
    example: 'Dica: Use "Exportar" para salvar o resultado',
    icon: 'lucide:file-text',
  },
]
</script>

<template>
  <div>
    <section class="bg-gradient-to-br from-violet-600/10 via-indigo-600/10 to-purple-600/10 py-16 md:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-4xl space-y-6 text-center">
          <div
            class="inline-flex items-center rounded-full bg-violet-100 px-4 py-2 text-sm font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-300"
          >
            <Icon
              icon="lucide:calculator"
              class="mr-2 h-4 w-4"
            />
            Ferramenta Principal
          </div>
          <h1 class="text-4xl font-extrabold text-gray-900 dark:text-white md:text-6xl">
            Calculadora de
            <span class="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">Redes Sociais</span>
          </h1>
          <p class="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            Preencha os dados do seu serviço e descubra o valor sugerido com base em métricas reais.
            <span class="mt-2 block text-sm font-medium text-violet-600 dark:text-violet-400">
              <Icon
                icon="lucide:shield-check"
                class="mr-1 inline h-4 w-4"
              />
              Processamento 100% local · Seus dados nunca saem do navegador
            </span>
          </p>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-16">
      <SocialMediaCalculator />
    </section>

    <section class="bg-gray-50 py-16 dark:bg-gray-800/30 md:py-24">
      <div class="container mx-auto px-4">
        <div class="mx-auto max-w-5xl">
          <div class="mb-12 text-center">
            <span
              class="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            >
              INSTRUÇÕES DE USO
            </span>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              Como Usar a Calculadora
            </h2>
          </div>

          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="item in instructions"
              :key="item.title"
              class="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div class="flex items-start gap-4">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30"
                >
                  <Icon
                    :icon="item.icon"
                    class="h-5 w-5 text-violet-600 dark:text-violet-400"
                  />
                </div>
                <div>
                  <h3 class="mb-1 font-bold text-gray-900 dark:text-white">
                    {{ item.title }}
                  </h3>
                  <p class="mb-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {{ item.description }}
                  </p>
                  <p
                    class="inline-block rounded-lg bg-violet-50 px-3 py-1.5 text-xs text-violet-600 dark:bg-violet-900/20 dark:text-violet-400"
                  >
                    <Icon
                      icon="lucide:lightbulb"
                      class="mr-1 inline h-3.5 w-3.5"
                    />
                    {{ item.example }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-gradient-to-r from-violet-600 to-indigo-600 py-16 md:py-24">
      <div class="container mx-auto px-4 text-center">
        <div class="mx-auto max-w-3xl space-y-6">
          <h2 class="text-3xl font-extrabold text-white md:text-4xl">
            Precisa de Mais Ferramentas?
          </h2>
          <p class="text-lg text-violet-100">
            O {{ SITE.company }} desenvolve ferramentas e sistemas personalizados sob demanda. Conte
            com especialistas para criar a solução ideal para o seu negócio.
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              :href="SITE.ctaUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-bold text-violet-700 shadow-xl transition-all hover:bg-violet-50"
            >
              <Icon
                icon="lucide:external-link"
                class="mr-2 h-5 w-5"
              />
              Conhecer a 3W Online
            </a>
            <RouterLink
              to="/#contato"
              class="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
            >
              <Icon
                icon="lucide:mail"
                class="mr-2 h-5 w-5"
              />
              Fale Conosco
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

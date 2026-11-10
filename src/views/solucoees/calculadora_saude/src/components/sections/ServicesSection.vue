<script setup lang="ts">
import { Icon } from '@iconify/vue';

const services = [
  {
    icon: 'fa6-solid:code',
    color: 'text-brand-500',
    title: 'Desenvolvimento de Sites Institucionais',
    description:
      'Criamos sites modernos, responsivos e otimizados para SEO, que servem como a vitrine digital perfeita para o seu negócio.',
  },
  {
    icon: 'fa6-solid:window-maximize',
    color: 'text-blue-500',
    title: 'Sistemas Web Personalizados',
    description:
      'Desenvolvemos sistemas sob medida para automatizar processos, gerenciar dados e otimizar a operação da sua empresa.',
  },
  {
    icon: 'fa6-solid:database',
    color: 'text-yellow-500',
    title: 'Aplicações de Larga Escala',
    description:
      'Projetamos e implementamos aplicações robustas, escaláveis e de alta performance para atender a milhares de usuários.',
  },
  {
    icon: 'fa6-solid:cart-shopping',
    color: 'text-purple-500',
    title: 'E-commerce e Lojas Virtuais',
    description:
      'Construímos plataformas de e-commerce completas, seguras e com alta conversão para você vender seus produtos online.',
  },
  {
    icon: 'fa6-solid:rocket',
    color: 'text-red-500',
    title: 'MVPs e Startups',
    description:
      'Ajudamos startups a tirarem suas ideias do papel, desenvolvendo Produtos Mínimos Viáveis (MVPs) de forma ágil e eficiente.',
  },
  {
    icon: 'fa6-solid:pen-nib',
    color: 'text-indigo-500',
    title: 'UI/UX Design',
    description:
      'Criamos interfaces intuitivas e experiências de usuário memoráveis que encantam seus clientes e fortalecem sua marca.',
  },
];
</script>

<template>
  <section
    id="servicos"
    class="bg-gray-50 py-20 dark:bg-gray-800"
  >
    <div class="container-page">
      <div class="mb-16 text-center">
        <span class="section-badge">
          <Icon
            icon="fa6-solid:briefcase"
            aria-hidden="true"
          />
          Grupo 3W Online
        </span>
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Nossos Serviços
        </h2>
        <p class="mx-auto max-w-3xl text-lg text-gray-600 dark:text-gray-400">
          O <strong>Grupo 3W Online</strong> é especialista em transformar ideias em realidade
          digital. Conheça nossas principais áreas de atuação.
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="service in services"
          :key="service.title"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 450 } }"
          class="rounded-xl border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900"
        >
          <Icon
            :icon="service.icon"
            class="mb-6 text-4xl"
            :class="service.color"
            aria-hidden="true"
          />
          <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
            {{ service.title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            {{ service.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

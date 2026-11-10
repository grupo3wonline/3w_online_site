<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

useHead({
  title: 'Termos de Uso — Calculadora de Campanha de Tráfego Pago | 3W Online',
  meta: [
    { name: 'description', content: 'Termos de Uso da Calculadora de Campanha de Tráfego Pago. Leia as regras e responsabilidades para utilização da ferramenta.' },
  ],
})

const breadcrumb = [
  { label: 'Início', to: '/' },
  { label: 'Termos de Uso' },
]
</script>

<template>
  <section class="gradient-hero py-16">
    <div class="container-app text-center">
      <h1 class="text-3xl md:text-4xl font-black text-white mb-3">Termos de Uso</h1>
      <p class="text-white/70">Última atualização: 17 de fevereiro de 2026</p>
    </div>
  </section>

  <AppBreadcrumb :items="breadcrumb" />

  <section class="section bg-white dark:bg-gray-950">
    <div class="container-app max-w-3xl">
      <div class="prose prose-gray max-w-none space-y-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">1. Aceitação dos Termos</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Ao acessar e utilizar a Calculadora de Campanha de Tráfego Pago ("Ferramenta"), disponibilizada pelo Grupo 3W Online ("Empresa"), você concorda com estes Termos de Uso. Caso não concorde, interrompa o uso imediatamente.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">2. Descrição do Serviço</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          A Ferramenta oferece simulação de campanhas de tráfego pago, cálculo de ROI estimado e geração de orçamentos em PDF. O serviço é 100% gratuito, não requer cadastro e todo o processamento é feito localmente no navegador do usuário.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">3. Uso Adequado</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Você se compromete a utilizar a Ferramenta de forma lícita, ética e conforme a legislação brasileira. É proibido: (a) tentar acessar áreas restritas; (b) usar robôs ou scripts automatizados; (c) reproduzir, distribuir ou modificar o código-fonte sem autorização.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">4. Isenção de Responsabilidade</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Os resultados gerados pela Ferramenta são estimativas baseadas nos parâmetros informados pelo usuário. A Empresa não garante resultados reais de campanhas de marketing. O usuário é integralmente responsável pelas decisões tomadas com base nas projeções.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">5. Propriedade Intelectual</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Todo o conteúdo, design, código-fonte e marcas são propriedade do Grupo 3W Online. É vedada a reprodução sem autorização expressa por escrito.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">6. Disponibilidade</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          A Empresa se reserva o direito de modificar, suspender ou descontinuar a Ferramenta a qualquer momento, sem aviso prévio, sem que isso gere direito a indenização.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">7. Limitação de Responsabilidade</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Em nenhuma hipótese a Empresa será responsável por danos diretos, indiretos, incidentais, consequenciais ou punitivos decorrentes do uso ou impossibilidade de uso da Ferramenta.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">8. Alterações nos Termos</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          A Empresa pode alterar estes Termos a qualquer momento. As modificações entram em vigor imediatamente após a publicação. O uso continuado da Ferramenta após alterações constitui aceitação dos novos termos.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">9. Legislação Aplicável</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Estes Termos são regidos pela legislação da República Federativa do Brasil. Fica eleito o foro da comarca da sede da Empresa para dirimir quaisquer controvérsias.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">10. Contato</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Dúvidas sobre estes Termos podem ser enviadas através da nossa
          <RouterLink to="/#contato" class="text-primary-600 dark:text-primary-400 hover:underline">seção de contato</RouterLink>.
        </p>
      </div>
    </div>
  </section>
</template>

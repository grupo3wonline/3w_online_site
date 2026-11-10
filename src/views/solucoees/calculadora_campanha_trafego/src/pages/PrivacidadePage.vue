<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useHead } from '@unhead/vue'
import AppBreadcrumb from '@/components/ui/AppBreadcrumb.vue'

useHead({
  title: 'Política de Privacidade — Calculadora de Campanha de Tráfego | 3W Online',
  meta: [
    { name: 'description', content: 'Política de Privacidade da Calculadora de Campanha de Tráfego Pago. Saiba quais dados coletamos e como os utilizamos.' },
  ],
})

const breadcrumb = [
  { label: 'Início', to: '/' },
  { label: 'Política de Privacidade' },
]
</script>

<template>
  <section class="gradient-hero py-16">
    <div class="container-app text-center">
      <h1 class="text-3xl md:text-4xl font-black text-white mb-3">Política de Privacidade</h1>
      <p class="text-white/70">Última atualização: 17 de fevereiro de 2026</p>
    </div>
  </section>

  <AppBreadcrumb :items="breadcrumb" />

  <section class="section bg-white dark:bg-gray-950">
    <div class="container-app max-w-3xl">
      <div class="prose prose-gray max-w-none space-y-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white">1. Introdução</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          O Grupo 3W Online ("Empresa") respeita sua privacidade e se compromete a proteger os dados pessoais dos usuários da Calculadora de Campanha de Tráfego Pago ("Ferramenta"), em conformidade com a Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">2. Dados Coletados</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          A Ferramenta processa todos os dados localmente no navegador do usuário. Não coletamos, armazenamos ou transmitimos dados pessoais inseridos na calculadora (como valores de orçamento, métricas ou nomes de clientes).
        </p>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Dados que podem ser coletados automaticamente:</p>
        <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
          <li><strong class="text-gray-900 dark:text-white">Dados de navegação:</strong> endereço IP, tipo de navegador, sistema operacional, páginas visitadas e horário de acesso, coletados via Google Analytics 4 (GA4).</li>
          <li><strong class="text-gray-900 dark:text-white">Cookies:</strong> utilizados para análise de tráfego e melhorar a experiência do usuário.</li>
        </ul>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">3. Finalidade do Uso dos Dados</h2>
        <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
          <li>Melhorar a experiência de uso da Ferramenta.</li>
          <li>Análise estatística de tráfego e comportamento de navegação.</li>
          <li>Cumprimento de obrigações legais.</li>
        </ul>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">4. Base Legal para o Tratamento</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          O tratamento de dados é realizado com base no consentimento do titular (Art. 7º, I, LGPD) e no legítimo interesse da Empresa (Art. 7º, IX, LGPD).
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">5. Cookies</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Utilizamos cookies analíticos (Google Analytics) para entender como os visitantes interagem com a Ferramenta. Ao acessar o site, um banner de consentimento é exibido, permitindo aceitar ou recusar o uso de cookies.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">6. Compartilhamento de Dados</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Não compartilhamos dados pessoais com terceiros, exceto: (a) provedores de análise (Google Analytics); (b) quando exigido por lei ou ordem judicial.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">7. Armazenamento e Segurança</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Dados de navegação coletados via GA4 são armazenados nos servidores do Google, seguindo as políticas de privacidade do Google. Dados inseridos na calculadora não são armazenados.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">8. Direitos do Titular</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">Conforme a LGPD, o titular dos dados tem direito a:</p>
        <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
          <li><strong class="text-gray-900 dark:text-white">Acesso:</strong> solicitar quais dados pessoais são processados.</li>
          <li><strong class="text-gray-900 dark:text-white">Retificação:</strong> corrigir dados incompletos ou inexatos.</li>
          <li><strong class="text-gray-900 dark:text-white">Exclusão:</strong> solicitar a eliminação dos dados pessoais.</li>
          <li><strong class="text-gray-900 dark:text-white">Revogação do consentimento:</strong> retirar o consentimento dado para tratamento de dados.</li>
          <li><strong class="text-gray-900 dark:text-white">Portabilidade:</strong> solicitar a transferência dos dados a outro fornecedor.</li>
        </ul>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Para exercer seus direitos, entre em contato através da nossa
          <RouterLink to="/#contato" class="text-primary-600 dark:text-primary-400 hover:underline">seção de contato</RouterLink>.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">9. Conformidade com Leis Internacionais</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Além da LGPD, buscamos aderência às principais legislações globais de privacidade aplicáveis a visitantes internacionais:
        </p>
        <ul class="list-disc pl-6 text-gray-600 dark:text-gray-400 space-y-2">
          <li><strong class="text-gray-900 dark:text-white">GDPR (União Europeia):</strong> tratamento baseado em consentimento e legítimo interesse, com direito de acesso, retificação e exclusão.</li>
          <li><strong class="text-gray-900 dark:text-white">CCPA/CPRA (Califórnia, EUA):</strong> não vendemos dados pessoais; você pode solicitar acesso ou exclusão dos seus dados.</li>
          <li><strong class="text-gray-900 dark:text-white">POPIA (África do Sul):</strong> tratamento limitado à finalidade informada, com segurança e minimização de dados.</li>
        </ul>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Como o processamento da calculadora é feito localmente no seu navegador, nenhum dado inserido na ferramenta é transmitido, o que reforça a conformidade com todas essas leis.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">10. Alterações nesta Política</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          A Empresa pode atualizar esta Política periodicamente. Mudanças significativas serão comunicadas através do site.
        </p>

        <h2 class="text-xl font-bold text-gray-900 dark:text-white">11. Contato do Encarregado (DPO)</h2>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
          Para questões relacionadas à proteção de dados, entre em contato pelos canais da nossa
          <RouterLink to="/#contato" class="text-primary-600 dark:text-primary-400 hover:underline">seção de contato</RouterLink>
          ou pelo site <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">www.3wonline.com.br</a>.
        </p>
      </div>
    </div>
  </section>
</template>

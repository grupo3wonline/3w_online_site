<script setup lang="ts">
import { useHead } from '@unhead/vue'
import Breadcrumb from '@/components/ui/Breadcrumb.vue'

useHead({
  title: 'Termos de Uso - Calculadora Aluguel Fácil',
  meta: [{ name: 'description', content: 'Termos de Uso da Calculadora Aluguel Fácil. Leia os termos e condições de uso da plataforma.' }]
})

const lastUpdate = '01 de janeiro de 2025'
</script>

<template>
  <div class="container py-8">
    <Breadcrumb :items="[{ label: 'Termos de Uso' }]" />

    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h1 class="section-title mb-4">Termos de Uso</h1>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Última atualização: {{ lastUpdate }}
        </p>
      </div>

      <div class="card p-8 prose prose-gray dark:prose-invert max-w-none">
        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">1. Aceitação dos Termos</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Ao acessar e utilizar a plataforma Calculadora Aluguel Fácil ("Plataforma"), você concorda com
            estes Termos de Uso. Se você não concorda com alguma disposição, por favor, não utilize a Plataforma.
            A Plataforma é desenvolvida e mantida pelo Grupo 3W Online.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">2. Descrição do Serviço</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            A Calculadora Aluguel Fácil é uma plataforma gratuita que oferece ferramentas de cálculo e simulação
            para o mercado imobiliário brasileiro, incluindo:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Calculadora de valor de aluguel</li>
            <li>Simulador de financiamento imobiliário</li>
            <li>Calculadora de custos de construção e reforma</li>
            <li>Comparador de cenários (comprar vs alugar)</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">3. Natureza Informativa</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Todos os resultados fornecidos pela Plataforma têm caráter exclusivamente informativo e educacional.
            Os cálculos são baseados em estimativas e médias de mercado, não constituindo:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Assessoria financeira, jurídica ou imobiliária</li>
            <li>Recomendação de investimento</li>
            <li>Avaliação oficial de imóveis</li>
            <li>Garantia de aprovação de crédito</li>
            <li>Orçamento definitivo de obra</li>
          </ul>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed mt-2">
            Recomendamos sempre consultar profissionais qualificados antes de tomar decisões financeiras importantes.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">4. Uso Adequado</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            O usuário compromete-se a utilizar a Plataforma de forma ética e legal, sendo vedado:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Utilizar bots, scrapers ou qualquer forma de acesso automatizado não autorizado</li>
            <li>Tentar comprometer a segurança ou disponibilidade da Plataforma</li>
            <li>Reproduzir, copiar ou distribuir o conteúdo da Plataforma sem autorização</li>
            <li>Utilizar os resultados como base exclusiva para decisões financeiras sem validação profissional</li>
            <li>Inserir dados falsos com intenção de prejudicar terceiros</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">5. Propriedade Intelectual</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Todo o conteúdo da Plataforma, incluindo mas não se limitando a textos, gráficos, logotipos, ícones,
            imagens, clipes de áudio, downloads digitais, compilações de dados, software e algoritmos de cálculo,
            é de propriedade do Grupo 3W Online e está protegido pelas leis brasileiras de direitos autorais e
            propriedade intelectual.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">6. Limitação de Responsabilidade</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            A Plataforma é fornecida "como está" e "conforme disponível". O Grupo 3W Online não se responsabiliza por:
          </p>
          <ul class="list-disc pl-6 mt-2 space-y-1 text-gray-600 dark:text-gray-400">
            <li>Decisões tomadas com base nos resultados das calculadoras</li>
            <li>Eventuais imprecisões nos cálculos devido a variações de mercado</li>
            <li>Indisponibilidade temporária da Plataforma</li>
            <li>Perdas ou danos diretos ou indiretos decorrentes do uso da Plataforma</li>
            <li>Diferenças entre os valores estimados e os valores reais praticados no mercado</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">7. Disponibilidade</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            O Grupo 3W Online se esforça para manter a Plataforma disponível 24 horas por dia, 7 dias por semana.
            No entanto, pode haver interrupções para manutenção, atualizações ou por razões técnicas.
            Não garantimos disponibilidade ininterrupta do serviço.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">8. Modificações</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento, sem aviso prévio.
            As alterações entram em vigor imediatamente após sua publicação na Plataforma.
            O uso continuado da Plataforma após as modificações implica na aceitação dos novos termos.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">9. Legislação Aplicável</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Estes Termos de Uso são regidos pela legislação brasileira. Qualquer disputa será submetida
            ao foro da comarca da sede do Grupo 3W Online, com renúncia expressa a qualquer outro,
            por mais privilegiado que seja.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">10. Contato</h2>
          <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
            Para dúvidas sobre estes Termos de Uso, entre em contato através da nossa
            <router-link to="/#contato" class="text-primary-600 dark:text-primary-400 hover:underline">página de contato</router-link>
            ou visite
            <a href="https://www.3wonline.com.br" target="_blank" rel="noopener noreferrer" class="text-primary-600 dark:text-primary-400 hover:underline">www.3wonline.com.br</a>.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

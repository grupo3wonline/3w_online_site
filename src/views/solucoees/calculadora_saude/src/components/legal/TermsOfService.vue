<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const lastUpdate = computed(() => new Date().toLocaleDateString('pt-BR'));
</script>

<template>
  <div class="prose prose-emerald max-w-none dark:prose-invert">
    <div class="mb-6">
      <Icon
        icon="fa6-solid:file-contract"
        class="mb-4 text-4xl text-brand-600 dark:text-brand-400"
        aria-hidden="true"
      />
      <p class="text-sm text-gray-600 dark:text-gray-300">
        Última atualização: {{ lastUpdate }}
      </p>
    </div>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        1. Aceitação dos Termos
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Ao utilizar a Calculadora de Saúde, você concorda com estes Termos de Uso. Se não concordar
        com qualquer parte, por favor não utilize a ferramenta.
      </p>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        2. Descrição do Serviço
      </h3>
      <p class="mb-3 text-gray-700 dark:text-gray-300">
        A Calculadora de Saúde é uma ferramenta informativa gratuita que fornece:
      </p>
      <ul class="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
        <li>Cálculo do Índice de Massa Corporal (IMC)</li>
        <li>Recomendações de peso ideal</li>
        <li>Sugestões de consumo diário de água, calorias, proteínas e carboidratos</li>
        <li>Divisão sugerida de refeições diárias</li>
        <li>Dicas de saúde e bem-estar</li>
      </ul>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        3. Limitações e Isenção de Responsabilidade
      </h3>
      <div class="mb-4 border-l-4 border-yellow-500 bg-yellow-50 p-4 dark:bg-yellow-900/20">
        <p class="font-semibold text-gray-800 dark:text-gray-200">
          IMPORTANTE:
        </p>
        <p class="text-gray-700 dark:text-gray-300">
          Esta ferramenta é apenas informativa e educacional. NÃO substitui consulta, diagnóstico ou
          tratamento médico profissional.
        </p>
      </div>
      <ul class="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
        <li>Os resultados são estimativas baseadas em fórmulas científicas gerais</li>
        <li>Consulte sempre um médico, nutricionista ou educador físico antes de iniciar</li>
        <li>Não nos responsabilizamos por decisões tomadas com base nas informações</li>
        <li>Condições médicas especiais requerem acompanhamento profissional individualizado</li>
      </ul>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        4. Uso Adequado
      </h3>
      <ul class="ml-4 list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
        <li>Utilizar a ferramenta apenas para fins pessoais e informativos</li>
        <li>Fornecer informações precisas para obter resultados mais adequados</li>
        <li>Não utilizar os dados para fins comerciais sem autorização</li>
        <li>Não tentar comprometer a segurança ou funcionamento da aplicação</li>
      </ul>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        5. Propriedade Intelectual
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Todo o conteúdo, design, código e funcionalidades são propriedade do Grupo 3W Online e estão
        protegidos por leis de direitos autorais.
      </p>
    </section>

    <section class="mb-8">
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        6. Lei Aplicável
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Estes Termos são regidos pelas leis da República Federativa do Brasil, em conformidade com a
        LGPD (Lei nº 13.709/2018) e demais normas globais de privacidade aplicáveis (GDPR, CCPA,
        POPIA).
      </p>
    </section>

    <section>
      <h3 class="mb-3 text-xl font-bold text-gray-900 dark:text-white">
        7. Contato
      </h3>
      <p class="text-gray-700 dark:text-gray-300">
        Dúvidas sobre estes Termos? Fale conosco pelo WhatsApp
        <a
          href="https://wa.me/5541996924829"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand-600 hover:underline dark:text-brand-400"
        >(41) 99692-4829</a>
        ou e-mail
        <a
          href="mailto:contato@3wonline.com.br"
          class="text-brand-600 hover:underline dark:text-brand-400"
        >contato@3wonline.com.br</a>.
      </p>
    </section>
  </div>
</template>

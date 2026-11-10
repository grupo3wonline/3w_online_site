<template>
  <div class="max-w-4xl mx-auto px-4 py-12">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-6">
        Termos de Uso
      </h1>

      <div class="text-sm text-gray-600 dark:text-gray-400 mb-8">
        <p><strong>Última atualização:</strong> {{ lastUpdate }}</p>
      </div>

      <div class="prose dark:prose-invert max-w-none">
        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            1. Aceitação dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Ao acessar e utilizar o Marca D'água Pro, você concorda com estes
            Termos de Uso. Se você não concordar com qualquer parte destes
            termos, não deverá utilizar nosso serviço.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            2. Descrição do Serviço
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            O Marca D'água Pro é uma ferramenta online gratuita que permite aos
            usuários adicionar marcas d'água em imagens. O processamento das
            imagens é feito localmente no navegador do usuário, sem upload para
            servidores externos.
          </p>
          <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>Processamento 100% offline no navegador</li>
            <li>Não há armazenamento de imagens em servidores</li>
            <li>Uso gratuito e sem necessidade de cadastro</li>
            <li>Sem limites de uso</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            3. Uso Permitido
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Você concorda em utilizar o serviço apenas para fins legais e de
            acordo com estes Termos. É proibido:
          </p>
          <ul class="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-4">
            <li>
              Utilizar o serviço para processar imagens ilegais, difamatórias,
              obscenas ou ofensivas
            </li>
            <li>
              Tentar acessar, modificar ou interferir no funcionamento do
              sistema
            </li>
            <li>
              Usar o serviço para violar direitos de propriedade intelectual
            </li>
            <li>Distribuir malware ou conteúdo malicioso</li>
            <li>
              Realizar engenharia reversa ou extrair código-fonte da aplicação
            </li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            4. Propriedade Intelectual
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Você mantém todos os direitos sobre as imagens que processa através
            do Marca D'água Pro. Nós não reivindicamos propriedade sobre
            qualquer conteúdo que você processe.
          </p>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            O código, design, marca e conteúdo do Marca D'água Pro são
            protegidos por direitos autorais e outras leis de propriedade
            intelectual.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            5. Privacidade e Proteção de Dados
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Levamos sua privacidade a sério. Todas as imagens são processadas
            localmente no seu navegador e nunca são enviadas para nossos
            servidores. Para mais informações, consulte nossa
            <router-link
              to="/politica-de-privacidade"
              class="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Política de Privacidade </router-link
            >.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            6. Isenção de Garantias
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            O serviço é fornecido "como está" e "conforme disponível", sem
            garantias de qualquer tipo, expressas ou implícitas. Não garantimos
            que o serviço será ininterrupto, seguro ou livre de erros.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            7. Limitação de Responsabilidade
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Em nenhuma circunstância seremos responsáveis por quaisquer danos
            diretos, indiretos, incidentais, especiais, consequenciais ou
            punitivos resultantes do uso ou incapacidade de usar o serviço.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            8. Modificações dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Reservamos o direito de modificar estes Termos de Uso a qualquer
            momento. As alterações entrarão em vigor imediatamente após a
            publicação. O uso continuado do serviço após as modificações
            constitui aceitação dos novos termos.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            9. Lei Aplicável
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Estes Termos de Uso são regidos e interpretados de acordo com as
            leis da República Federativa do Brasil. Qualquer disputa relacionada
            a estes termos será submetida à jurisdição exclusiva dos tribunais
            brasileiros.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            10. Contato
          </h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">
            Para questões sobre estes Termos de Uso, entre em contato através do
            e-mail:
            <a
              href="mailto:contato@marcadaguapro.com"
              class="text-primary-600 dark:text-primary-400 hover:underline"
            >
              contato@marcadaguapro.com
            </a>
          </p>
        </section>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <router-link
          to="/"
          class="inline-flex items-center text-primary-600 dark:text-primary-400 hover:underline"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Voltar à página inicial
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const lastUpdate = computed(() => {
  return new Date().toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

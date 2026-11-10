<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Header -->
    <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl font-bold mb-4">Termos de Uso</h1>
        <p class="text-blue-100 text-lg">Última atualização: {{ lastUpdate }}</p>
      </div>
    </div>

    <!-- Conteúdo -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 space-y-8">
        <!-- Introdução -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            1. Aceitação dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Bem-vindo ao Calculadora de Pontos Elétricos. Ao acessar e usar este site e seus
            serviços, você concorda em cumprir e estar vinculado aos seguintes Termos de Uso. Se
            você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
            Estes termos se aplicam a todos os usuários do site, incluindo visitantes, usuários
            registrados e prestadores de conteúdo.
          </p>
        </section>

        <!-- Descrição do Serviço -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            2. Descrição do Serviço
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            O Calculadora de Pontos Elétricos é uma plataforma online gratuita que oferece
            ferramentas de cálculo para projetos elétricos, incluindo:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Cálculo de pontos elétricos conforme NBR 5410</li>
            <li>Dimensionamento de demanda elétrica</li>
            <li>Cálculo de disjuntores e proteções</li>
            <li>Determinação de metragem de cabos</li>
            <li>Outras ferramentas relacionadas a projetos elétricos</li>
          </ul>
        </section>

        <!-- Uso Aceitável -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. Uso Aceitável</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            Você concorda em usar o Calculadora de Pontos Elétricos apenas para fins legais e de
            acordo com estes Termos. Você concorda em NÃO:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>
              Usar o serviço de forma que viole qualquer lei ou regulamento local, nacional ou
              internacional
            </li>
            <li>Usar o serviço para fins fraudulentos ou mal-intencionados</li>
            <li>Transmitir vírus, malware ou qualquer código malicioso</li>
            <li>Tentar obter acesso não autorizado ao site ou sistemas relacionados</li>
            <li>Interferir ou interromper o serviço ou servidores/redes conectados</li>
            <li>Copiar, modificar, distribuir ou reproduzir o conteúdo sem autorização</li>
            <li>Usar automação, bots ou scrapers para extrair dados do site</li>
          </ul>
        </section>

        <!-- Limitações e Isenções -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            4. Limitações de Responsabilidade
          </h2>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 p-4 mb-4">
            <p class="font-semibold text-gray-900 dark:text-white mb-2">⚠️ AVISO IMPORTANTE</p>
            <p class="text-sm text-gray-700 dark:text-gray-300">
              As calculadoras e ferramentas fornecidas são apenas para fins informativos e
              educacionais. Os resultados devem ser verificados por profissionais qualificados.
            </p>
          </div>

          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
            O Calculadora de Pontos Elétricos é fornecido "como está" sem garantias de qualquer
            tipo. Nós:
          </p>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>Não garantimos que o serviço será ininterrupto, seguro ou livre de erros</li>
            <li>Não nos responsabilizamos por decisões tomadas com base nos cálculos fornecidos</li>
            <li>Não garantimos a precisão, completude ou adequação das informações</li>
            <li>Não somos responsáveis por perdas ou danos resultantes do uso do serviço</li>
            <li>Recomendamos consultar profissionais qualificados para projetos reais</li>
          </ul>

          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mt-4 font-medium">
            Os cálculos fornecidos devem ser revisados e validados por engenheiros eletricistas ou
            profissionais devidamente habilitados antes de qualquer implementação prática.
          </p>
        </section>

        <!-- Propriedade Intelectual -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            5. Propriedade Intelectual
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Todo o conteúdo do Calculadora de Pontos Elétricos, incluindo mas não limitado a texto,
            gráficos, logos, ícones, imagens, código-fonte, design e funcionalidades, é propriedade
            do Calculadora de Pontos Elétricos ou de seus licenciadores e é protegido por leis de
            direitos autorais.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Você pode usar o serviço para fins pessoais e profissionais, mas não pode reproduzir,
            distribuir, modificar ou criar obras derivadas sem nossa permissão expressa por escrito.
          </p>
        </section>

        <!-- Dados do Usuário -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            6. Dados do Usuário e Privacidade
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Os cálculos que você realiza são armazenados localmente no seu navegador e não são
            enviados para nossos servidores. Respeitamos sua privacidade e seguimos a LGPD.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Para mais informações sobre como tratamos seus dados, consulte nossa
            <router-link
              to="/politica-privacidade"
              class="text-blue-600 hover:underline font-medium"
            >
              Política de Privacidade </router-link
            >.
          </p>
        </section>

        <!-- Links de Terceiros -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            7. Links para Sites de Terceiros
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Nosso serviço pode conter links para sites de terceiros que não são operados por nós.
            Não temos controle sobre o conteúdo, políticas de privacidade ou práticas desses sites e
            não assumimos responsabilidade por eles. Recomendamos que você revise os termos e
            políticas de qualquer site de terceiros que visitar.
          </p>
        </section>

        <!-- Modificações -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            8. Modificações do Serviço e dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Reservamos o direito de modificar ou descontinuar, temporária ou permanentemente, o
            serviço (ou qualquer parte dele) com ou sem aviso prévio. Você concorda que não seremos
            responsáveis perante você ou terceiros por qualquer modificação, suspensão ou
            descontinuação do serviço.
          </p>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Podemos revisar estes Termos de Uso a qualquer momento sem aviso prévio. Ao continuar a
            usar o serviço após as alterações, você aceita estar vinculado aos termos revisados.
          </p>
        </section>

        <!-- Rescisão -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. Rescisão</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Podemos encerrar ou suspender seu acesso ao serviço imediatamente, sem aviso prévio ou
            responsabilidade, por qualquer motivo, incluindo, sem limitação, se você violar estes
            Termos de Uso.
          </p>
        </section>

        <!-- Lei Aplicável -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            10. Lei Aplicável e Jurisdição
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Estes Termos serão regidos e interpretados de acordo com as leis do Brasil, sem
            considerar suas disposições sobre conflito de leis. Qualquer disputa relacionada a estes
            Termos será de competência exclusiva dos tribunais brasileiros.
          </p>
        </section>

        <!-- Disposições Gerais -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            11. Disposições Gerais
          </h2>
          <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 ml-4">
            <li>
              <strong>Integralidade:</strong> Estes Termos constituem o acordo integral entre você e
              o Calculadora de Pontos Elétricos
            </li>
            <li>
              <strong>Divisibilidade:</strong> Se alguma disposição for considerada inválida, as
              demais permanecerão em vigor
            </li>
            <li>
              <strong>Renúncia:</strong> Nossa falha em fazer cumprir qualquer direito não constitui
              renúncia
            </li>
            <li>
              <strong>Cessão:</strong> Você não pode ceder estes Termos sem nosso consentimento
              prévio por escrito
            </li>
          </ul>
        </section>

        <!-- Contato -->
        <section>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">12. Contato</h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Se você tiver dúvidas sobre estes Termos de Uso, entre em contato:
          </p>
          <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
            <p class="text-gray-900 dark:text-white font-semibold mb-2">Grupo 3w Online</p>
            <p class="text-gray-700 dark:text-gray-300">
              E-mail:
              <a href="mailto:contato@3wonline.com.br" class="text-blue-600 hover:underline"
                >contato@3wonline.com.br</a
              >
            </p>
            <p class="text-gray-700 dark:text-gray-300 mt-2">
              Ou pela seção de
              <router-link to="/#contato" class="text-blue-600 hover:underline">Contato</router-link
              >.
            </p>
          </div>
        </section>

        <!-- Aceitação -->
        <section class="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
            ✓ Aceitação dos Termos
          </h2>
          <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
            Ao usar o Calculadora de Pontos Elétricos, você reconhece que leu, compreendeu e
            concorda em estar vinculado a estes Termos de Uso e à nossa Política de Privacidade.
          </p>
        </section>

        <!-- Botão Voltar -->
        <div class="flex justify-center pt-8 border-t border-gray-200 dark:border-gray-700">
          <router-link
            to="/"
            class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            ← Voltar para Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSEO } from '@/composables/useSEO'

const lastUpdate = ref('09 de Outubro de 2025')

useSEO({
  title: 'Termos de Uso',
  description: 'Termos e condições de uso da Calculadora de Pontos Elétricos.',
  url: '/termos-uso',
})
</script>

<style scoped>
/* Estilos adicionais se necessário */
</style>

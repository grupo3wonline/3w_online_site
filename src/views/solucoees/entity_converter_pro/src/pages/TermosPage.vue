<script setup>
import { RouterLink } from 'vue-router'

const lastUpdate = '23 de Dezembro de 2025'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-16 md:py-20">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          <i class="fas fa-file-contract mr-3"></i>
          Termos de Uso
        </h1>
        <p class="text-xl font-light opacity-90">
          Última atualização: {{ lastUpdate }}
        </p>
      </div>
    </section>

    <!-- Content -->
    <section class="py-16 bg-white dark:bg-gray-900">
      <div class="max-w-4xl mx-auto px-4">
        <div class="prose prose-lg dark:prose-invert max-w-none">
          
          <!-- Intro -->
          <div class="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <p class="text-blue-800 dark:text-blue-200 m-0">
              <i class="fas fa-info-circle mr-2"></i>
              Ao utilizar o Entity Converter Pro, você concorda com os termos e condições descritos neste documento.
              Leia atentamente antes de utilizar a ferramenta.
            </p>
          </div>

          <!-- Section 1 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
            Aceitação dos Termos
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Ao acessar e utilizar o Entity Converter Pro ("Ferramenta"), você declara que leu, compreendeu e concorda 
            em cumprir estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize a Ferramenta.
          </p>

          <!-- Section 2 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
            Descrição do Serviço
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            O Entity Converter Pro é uma ferramenta gratuita para conversão de caracteres especiais em HTML Entities.
            A Ferramenta opera inteiramente no lado do cliente (client-side), ou seja, todo o processamento é realizado 
            localmente no seu navegador, sem envio de dados para servidores externos.
          </p>

          <!-- Section 3 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
            Uso Permitido
          </h2>
          <p class="text-gray-600 dark:text-gray-300">Você pode utilizar a Ferramenta para:</p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Converter caracteres especiais em HTML Entities para uso em projetos web</li>
            <li>Consultar a tabela de referência de caracteres</li>
            <li>Copiar os códigos gerados para uso em seus projetos</li>
            <li>Uso pessoal ou comercial, desde que em conformidade com estes termos</li>
          </ul>

          <!-- Section 4 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
            Uso Proibido
          </h2>
          <p class="text-gray-600 dark:text-gray-300">É expressamente proibido:</p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Utilizar a Ferramenta para atividades ilegais ou fraudulentas</li>
            <li>Tentar acessar, modificar ou interferir no código-fonte da Ferramenta de forma não autorizada</li>
            <li>Distribuir malware ou conteúdo malicioso através da Ferramenta</li>
            <li>Realizar engenharia reversa, descompilar ou desmontar a Ferramenta</li>
            <li>Copiar, reproduzir ou redistribuir a Ferramenta sem autorização expressa</li>
          </ul>

          <!-- Section 5 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">5</span>
            Responsabilidades do Usuário
          </h2>
          <p class="text-gray-600 dark:text-gray-300">O usuário é responsável por:</p>
          <ul class="list-disc pl-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Validar o código gerado antes de utilizá-lo em produção</li>
            <li>Garantir que o uso da Ferramenta esteja em conformidade com as leis aplicáveis</li>
            <li>Manter a segurança de seus próprios sistemas e dados</li>
            <li>O conteúdo inserido na Ferramenta para conversão</li>
          </ul>

          <!-- Section 6 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">6</span>
            Isenção de Garantias
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            A Ferramenta é fornecida "como está" e "conforme disponível", sem garantias de qualquer tipo, 
            expressas ou implícitas. Não garantimos que a Ferramenta será ininterrupta, livre de erros ou 
            adequada para qualquer finalidade específica.
          </p>

          <!-- Section 7 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">7</span>
            Limitação de Responsabilidade
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos, indiretos, incidentais, 
            especiais ou consequenciais decorrentes do uso ou impossibilidade de uso da Ferramenta.
          </p>

          <!-- Section 8 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">8</span>
            Propriedade Intelectual
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Todo o conteúdo, design, código e elementos visuais da Ferramenta são de propriedade do Grupo 3W Online 
            e estão protegidos por leis de propriedade intelectual. O uso da Ferramenta não concede ao usuário 
            nenhum direito de propriedade sobre a mesma.
          </p>

          <!-- Section 9 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">9</span>
            Modificações dos Termos
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. As alterações entram em vigor 
            imediatamente após a publicação. O uso continuado da Ferramenta após as modificações constitui aceitação 
            dos novos termos.
          </p>

          <!-- Section 10 -->
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mt-8">
            <span class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">10</span>
            Lei Aplicável e Foro
          </h2>
          <p class="text-gray-600 dark:text-gray-300">
            Estes Termos de Uso são regidos pelas leis da República Federativa do Brasil. Qualquer disputa decorrente 
            destes termos será submetida ao foro da comarca de domicílio do Grupo 3W Online.
          </p>

          <!-- Contact -->
          <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mt-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">
              <i class="fas fa-envelope text-blue-500 mr-2"></i>
              Dúvidas ou Contato
            </h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              Se você tiver dúvidas sobre estes Termos de Uso, entre em contato conosco:
            </p>
            <RouterLink 
              to="/contato"
              class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              <i class="fas fa-arrow-right"></i>
              Acessar página de contato
            </RouterLink>
          </div>

        </div>
      </div>
    </section>

    <!-- Navigation -->
    <section class="py-8 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div class="max-w-4xl mx-auto px-4">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <RouterLink 
            to="/politica-de-privacidade"
            class="text-blue-600 dark:text-blue-400 hover:underline font-medium flex items-center gap-2"
          >
            <i class="fas fa-arrow-right"></i>
            Ver Política de Privacidade
          </RouterLink>
          <RouterLink 
            to="/"
            class="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium flex items-center gap-2"
          >
            <i class="fas fa-home"></i>
            Voltar ao Início
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

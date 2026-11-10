<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main
      class="flex-grow bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 md:py-20"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <div class="inline-block mb-6">
            <i class="fas fa-envelope text-5xl md:text-6xl text-blue-600 dark:text-blue-400 animate-bounce"></i>
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Entre em <span class="text-blue-600 dark:text-blue-400">Contato</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Estamos aqui para ajudar! Entre em contato conosco para dúvidas, sugestões ou parcerias
          </p>
        </div>

        <!-- Company Info Card -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div class="flex items-center gap-4 mb-6">
            <i class="fas fa-building text-4xl"></i>
            <h2 class="text-3xl md:text-4xl font-bold">Grupo 3w Online</h2>
          </div>
          <p class="text-lg md:text-xl leading-relaxed text-blue-50 mb-4">
            Somos especializados no desenvolvimento de <strong>sites e sistemas personalizados sob demanda</strong>. 
            Transformamos ideias em soluções digitais eficientes e escaláveis.
          </p>
          <p class="text-blue-100">
            <i class="fas fa-check-circle mr-2"></i>
            Desenvolvimento Web Profissional
          </p>
          <p class="text-blue-100">
            <i class="fas fa-check-circle mr-2"></i>
            Sistemas Sob Medida para Seu Negócio
          </p>
          <p class="text-blue-100">
            <i class="fas fa-check-circle mr-2"></i>
            Consultoria e Suporte Técnico Especializado
          </p>
        </div>

        <!-- Contact Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <!-- Email Card -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-envelope text-3xl text-blue-600 dark:text-blue-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Email</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Envie sua mensagem</p>
            <a 
              href="mailto:contato@3wonline.com.br" 
              class="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              contato@3wonline.com.br
            </a>
          </div>

          <!-- Website Card -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div class="bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-globe text-3xl text-green-600 dark:text-green-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Website</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Visite nosso site</p>
            <a 
              href="https://www.3wonline.com.br" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-green-600 dark:text-green-400 hover:underline font-semibold"
            >
              www.3wonline.com.br
            </a>
          </div>

          <!-- Support Card -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center hover:shadow-2xl transition-shadow">
            <div class="bg-purple-100 dark:bg-purple-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-headset text-3xl text-purple-600 dark:text-purple-400"></i>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Suporte</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">Atendimento rápido</p>
            <a 
              href="https://3wonline.freshdesk.com" 
              target="_blank"
              rel="noopener noreferrer"
              class="text-purple-600 dark:text-purple-400 hover:underline font-semibold"
            >
              Central de Suporte
            </a>
          </div>
        </div>

        <!-- Contact Form Section -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            <i class="fas fa-paper-plane mr-3 text-blue-600 dark:text-blue-400"></i>
            Envie sua Mensagem
          </h2>
          <p class="text-center text-gray-600 dark:text-gray-300 mb-8">
            Preencha o formulário abaixo e entraremos em contato o mais breve possível
          </p>
          
          <ContactIframe />
        </div>

        <!-- FAQ Section -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            <i class="fas fa-question-circle mr-3 text-blue-600 dark:text-blue-400"></i>
            Perguntas Frequentes
          </h2>
          <div class="space-y-6 max-w-3xl mx-auto">
            <details class="group">
              <summary class="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span class="font-semibold text-gray-900 dark:text-white">
                  <i class="fas fa-lock mr-2 text-blue-600 dark:text-blue-400"></i>
                  As imagens são realmente seguras?
                </span>
                <i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-gray-500"></i>
              </summary>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Sim! Todo o processamento é feito 100% localmente no seu navegador. Suas imagens nunca são enviadas 
                para nossos servidores, garantindo privacidade total.
              </div>
            </details>

            <details class="group">
              <summary class="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span class="font-semibold text-gray-900 dark:text-white">
                  <i class="fas fa-dollar-sign mr-2 text-green-600 dark:text-green-400"></i>
                  A ferramenta é realmente gratuita?
                </span>
                <i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-gray-500"></i>
              </summary>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Sim, completamente gratuita! Não há limites de uso, não pedimos cadastro e não cobramos nada. 
                Nossa missão é fornecer ferramentas úteis para a comunidade.
              </div>
            </details>

            <details class="group">
              <summary class="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span class="font-semibold text-gray-900 dark:text-white">
                  <i class="fas fa-images mr-2 text-purple-600 dark:text-purple-400"></i>
                  Posso processar várias imagens ao mesmo tempo?
                </span>
                <i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-gray-500"></i>
              </summary>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Sim! Nossa ferramenta suporta processamento em lote. Você pode selecionar múltiplas imagens e 
                aplicar a marca d'água em todas de uma vez, economizando tempo.
              </div>
            </details>

            <details class="group">
              <summary class="cursor-pointer list-none flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                <span class="font-semibold text-gray-900 dark:text-white">
                  <i class="fas fa-cogs mr-2 text-orange-600 dark:text-orange-400"></i>
                  Posso personalizar a marca d'água?
                </span>
                <i class="fas fa-chevron-down group-open:rotate-180 transition-transform text-gray-500"></i>
              </summary>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Totalmente! Você pode adicionar texto ou logo, ajustar posição, cor, tamanho, opacidade e muito mais. 
                Tudo com preview em tempo real para garantir o resultado perfeito.
              </div>
            </details>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Precisa de uma Solução Personalizada?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            O Grupo 3w Online desenvolve sites e sistemas sob demanda. Entre em contato para discutir seu projeto!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.3wonline.com.br"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <i class="fas fa-globe"></i>
              Visite Nosso Site
            </a>
            <router-link
              to="/app"
              class="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <i class="fas fa-image"></i>
              Usar a Ferramenta
            </router-link>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { useHead } from "@vueuse/head";
import Header from "@/components/Shared/Header.vue";
import Footer from "@/components/Shared/Footer.vue";
import ContactIframe from "@/components/ContactIframe.vue";

useHead({
  title: "Contato - 3w OmniHub | Fale Conosco",
  meta: [
    {
      name: "description",
      content:
        "Entre em contato com o Grupo 3w Online. Dúvidas, sugestões ou orçamentos para desenvolvimento de sites e sistemas personalizados.",
    },
    {
      name: "keywords",
      content:
        "contato 3w online, suporte marca dagua, desenvolvimento web, sistemas personalizados, orçamento site",
    },
    {
      property: "og:title",
      content: "Contato - 3w OmniHub | Fale Conosco",
    },
    {
      property: "og:description",
      content:
        "Entre em contato com a equipe do Grupo 3w Online. Estamos prontos para ajudar!",
    },
  ],
});
</script>

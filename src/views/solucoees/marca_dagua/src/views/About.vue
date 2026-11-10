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
            <i class="fas fa-info-circle text-5xl md:text-6xl text-blue-600 dark:text-blue-400"></i>
          </div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Sobre o <span class="text-blue-600 dark:text-blue-400">3w OmniHub</span>
          </h1>
          <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Conheça nossa solução profissional e gratuita para proteção de imagens com marca d'água
          </p>
        </div>

        <!-- Mission Card -->
        <div class="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div class="flex items-center gap-4 mb-6">
            <i class="fas fa-bullseye text-4xl"></i>
            <h2 class="text-3xl md:text-4xl font-bold">Nossa Missão</h2>
          </div>
          <p class="text-lg md:text-xl leading-relaxed text-blue-50">
            O <strong>3w OmniHub - Marca D'água Pro</strong> é uma ferramenta profissional desenvolvida para
            proteger suas imagens de forma rápida, segura e totalmente gratuita.
            Nosso objetivo é oferecer uma solução acessível a fotógrafos,
            designers, criadores de conteúdo e profissionais que precisam
            proteger seu trabalho visual com marcas d'água profissionais, mantendo
            a mais alta qualidade e privacidade absoluta.
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <!-- Main Features -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <i class="fas fa-star text-yellow-500"></i>
              Características Principais
            </h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">100% Gratuito</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Sem limites, sem cadastro, sem cobranças ocultas</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Processamento Local</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Tudo acontece no seu navegador, offline e seguro</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Preview em Tempo Real</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Veja as alterações instantaneamente</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Processamento em Lote</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Adicione marca d'água em várias imagens ao mesmo tempo</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Interface Moderna</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Design responsivo e intuitivo</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-check-circle text-green-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Personalização Total</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Controle cor, tamanho, opacidade e posição</p>
                </div>
              </li>
            </ul>
          </div>

          <!-- Security & Privacy -->
          <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <i class="fas fa-shield-alt text-blue-500"></i>
              Segurança e Privacidade
            </h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <i class="fas fa-lock text-blue-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Suas Imagens Ficam com Você</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Processamento 100% local - nada sai do seu dispositivo</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-shield-check text-blue-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Zero Armazenamento</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Não guardamos nenhuma imagem em nossos servidores</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-user-shield text-blue-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Sem Cadastro</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Não coletamos dados pessoais ou exigimos cadastro</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-balance-scale text-blue-500 text-xl mt-0.5 flex-shrink-0"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Conformidade LGPD</strong>
                  <p class="text-sm text-gray-600 dark:text-gray-300">Totalmente adequado à Lei Geral de Proteção de Dados</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- How it Works -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center flex items-center justify-center gap-3">
            <i class="fas fa-cogs text-blue-600 dark:text-blue-400"></i>
            Como Funciona
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="text-center">
              <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Escolha as Imagens</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Selecione uma ou múltiplas imagens do seu dispositivo</p>
            </div>
            <div class="text-center">
              <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Personalize</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Ajuste texto, logo, posição, cor, tamanho e opacidade</p>
            </div>
            <div class="text-center">
              <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Visualize</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Veja o preview em tempo real antes de exportar</p>
            </div>
            <div class="text-center">
              <div class="bg-blue-100 dark:bg-blue-900/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">4</span>
              </div>
              <h4 class="font-bold text-gray-900 dark:text-white mb-2">Baixe</h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">Faça download das imagens protegidas em alta qualidade</p>
            </div>
          </div>
        </div>

        <!-- Company Info -->
        <div class="bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-800 dark:to-purple-900 rounded-2xl shadow-2xl p-8 md:p-12 mb-12 text-white">
          <div class="flex items-center gap-4 mb-6">
            <i class="fas fa-building text-4xl"></i>
            <h2 class="text-3xl md:text-4xl font-bold">Grupo 3w Online</h2>
          </div>
          <p class="text-lg md:text-xl leading-relaxed text-indigo-50 mb-6">
            Somos especializados no desenvolvimento de <strong>sites e sistemas personalizados sob demanda</strong>. 
            Com anos de experiência no mercado, criamos soluções digitais que impulsionam o crescimento 
            do seu negócio. Do planejamento à implementação, oferecemos tecnologia de ponta com 
            atendimento personalizado.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <i class="fas fa-laptop-code text-3xl mb-3"></i>
              <h4 class="font-bold mb-2">Desenvolvimento Web</h4>
              <p class="text-sm text-indigo-100">Sites modernos, responsivos e otimizados</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <i class="fas fa-cogs text-3xl mb-3"></i>
              <h4 class="font-bold mb-2">Sistemas Personalizados</h4>
              <p class="text-sm text-indigo-100">Soluções sob medida para seu negócio</p>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <i class="fas fa-headset text-3xl mb-3"></i>
              <h4 class="font-bold mb-2">Suporte Dedicado</h4>
              <p class="text-sm text-indigo-100">Atendimento ágil e especializado</p>
            </div>
          </div>
          <div class="mt-8 text-center">
            <a 
              href="https://www.3wonline.com.br" 
              target="_blank" 
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-50 transition-colors shadow-lg"
            >
              <i class="fas fa-globe"></i>
              Conheça Nossos Serviços
              <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <!-- CTA Section -->
        <div class="text-center">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Pronto para Proteger Suas Imagens?
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Comece agora mesmo a adicionar marcas d'água profissionais em suas imagens de forma gratuita, 
            rápida e segura!
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/app"
              class="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <i class="fas fa-image"></i>
              Começar Agora - É Grátis
            </router-link>
            <router-link
              to="/contato"
              class="inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <i class="fas fa-envelope"></i>
              Entre em Contato
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

useHead({
  title: "Sobre - 3w OmniHub Marca D'água Pro | Proteção Profissional de Imagens",
  meta: [
    {
      name: "description",
      content:
        "Conheça o 3w OmniHub Marca D'água Pro: solução gratuita e segura para proteger suas imagens. Desenvolvido pelo Grupo 3w Online, especialistas em sites e sistemas personalizados.",
    },
    {
      name: "keywords",
      content:
        "sobre marca dagua, 3w online, grupo 3w, desenvolvimento web, sistemas personalizados, ferramentas gratuitas",
    },
    {
      property: "og:title",
      content: "Sobre - 3w OmniHub | Proteção Profissional de Imagens",
    },
    {
      property: "og:description",
      content:
        "Conheça nossa solução gratuita e profissional para proteção de imagens. Desenvolvido pelo Grupo 3w Online.",
    },
  ],
});
</script>

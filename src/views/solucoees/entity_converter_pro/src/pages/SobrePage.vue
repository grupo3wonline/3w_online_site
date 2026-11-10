<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-gradient text-white py-16 md:py-24">
      <div class="max-w-6xl mx-auto px-4 text-center">
        <span class="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-medium mb-4">
          <i class="fas fa-info-circle mr-2"></i> Conheça Nossa Ferramenta
        </span>
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6">
          Sobre o Entity Converter Pro
        </h1>
        <p class="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90">
          A ferramenta definitiva para conversão de caracteres especiais em HTML Entities
        </p>
      </div>
    </section>

    <!-- About Content -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              <i class="fas fa-rocket text-blue-500 mr-3"></i>
              O Que é o Entity Converter Pro?
            </h2>
            <p class="text-gray-600 dark:text-gray-300 mb-4 text-lg">
              O Entity Converter Pro é uma ferramenta <strong>100% gratuita</strong> e <strong>profissional</strong> 
              desenvolvida para resolver um dos problemas mais comuns no desenvolvimento web: a conversão de 
              caracteres especiais para HTML Entities.
            </p>
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              Nossa ferramenta processa todo o texto <strong>localmente no seu navegador</strong> (client-side), 
              garantindo total segurança e privacidade dos seus dados. Nenhuma informação é enviada para servidores externos.
            </p>
            
            <div class="flex flex-wrap gap-3">
              <span class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                <i class="fas fa-check mr-1"></i> 100% Gratuito
              </span>
              <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                <i class="fas fa-lock mr-1"></i> 100% Seguro
              </span>
              <span class="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                <i class="fas fa-shield-alt mr-1"></i> LGPD Compliant
              </span>
            </div>
          </div>
          
          <div class="bg-gray-100 dark:bg-gray-800 rounded-2xl p-8 shadow-xl">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <i class="fas fa-star text-yellow-500"></i>
              Principais Recursos
            </h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <i class="fas fa-bolt text-blue-500 mt-1"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Conversão Instantânea</strong>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Converta textos em milissegundos com nossa engine otimizada</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-table text-blue-500 mt-1"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">+100 Caracteres Suportados</strong>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Tabela completa com acentos, símbolos e caracteres especiais</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-search text-blue-500 mt-1"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">Busca Inteligente</strong>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Encontre qualquer caractere rapidamente na tabela de referência</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-mobile-alt text-blue-500 mt-1"></i>
                <div>
                  <strong class="text-gray-900 dark:text-white">100% Responsivo</strong>
                  <p class="text-gray-600 dark:text-gray-400 text-sm">Use em qualquer dispositivo: desktop, tablet ou smartphone</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Use Section -->
    <section id="como-usar" class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-6xl mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            <i class="fas fa-play-circle text-blue-500 mr-3"></i>
            Como Usar a Ferramenta
          </h2>
          <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Em apenas 3 passos simples, você terá seu texto convertido profissionalmente
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Cole seu Texto</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Cole ou digite o texto com acentos e caracteres especiais na área de entrada
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
            <div class="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Clique em Converter</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Pressione o botão "Converter Texto" e aguarde a mágica acontecer
            </p>
          </div>
          
          <div class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg text-center">
            <div class="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">3</span>
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3">Copie o Resultado</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Aceite os termos e copie o código HTML Entities pronto para usar
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Company Section -->
    <section class="py-16 md:py-24 bg-white dark:bg-gray-900">
      <div class="max-w-6xl mx-auto px-4">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl">
          <div class="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span class="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-medium mb-4">
                <i class="fas fa-building mr-2"></i> Empresa Desenvolvedora
              </span>
              <h2 class="text-3xl md:text-4xl font-bold mb-4">
                Grupo 3W Online
              </h2>
              <p class="text-blue-100 text-lg mb-6">
                Somos uma empresa especializada em desenvolvimento de <strong>sites e sistemas personalizados sob demanda</strong>. 
                Com anos de experiência no mercado, entregamos soluções inovadoras e de alta qualidade.
              </p>
              <ul class="space-y-2 mb-6">
                <li class="flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-300"></i>
                  Desenvolvimento Web Personalizado
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-300"></i>
                  Sistemas e Aplicações sob Demanda
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-300"></i>
                  E-commerce e Lojas Virtuais
                </li>
                <li class="flex items-center gap-2">
                  <i class="fas fa-check-circle text-green-300"></i>
                  Consultoria em Tecnologia
                </li>
              </ul>
              
              <a 
                href="https://www.3wonline.com.br" 
                target="_blank" 
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              >
                <i class="fas fa-external-link-alt"></i>
                Conheça Nossos Serviços
              </a>
            </div>
            
            <div class="text-center">
              <div class="bg-white/10 backdrop-blur rounded-2xl p-8">
                <i class="fas fa-rocket text-6xl text-yellow-300 mb-4"></i>
                <h3 class="text-2xl font-bold mb-2">Precisa de um Sistema?</h3>
                <p class="text-blue-100 mb-4">
                  Transformamos suas ideias em soluções digitais de sucesso
                </p>
                <RouterLink 
                  to="/contato"
                  class="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <i class="fas fa-envelope"></i>
                  Fale Conosco
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 md:py-24 bg-gray-800 text-white">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">
          Pronto para Começar?
        </h2>
        <p class="text-xl text-gray-300 mb-8">
          Use nossa ferramenta gratuitamente e elimine 80% dos bugs de codificação!
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink 
            to="/#ferramenta"
            class="cta-button bg-yellow-400 text-gray-900 hover:bg-yellow-300"
          >
            <i class="fas fa-magic mr-2"></i>
            Usar a Ferramenta
          </RouterLink>
          <RouterLink 
            to="/contato"
            class="cta-button bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900"
          >
            <i class="fas fa-phone mr-2"></i>
            Entrar em Contato
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

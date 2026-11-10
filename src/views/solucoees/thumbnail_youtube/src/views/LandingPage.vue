<template>
  <div class="landing-page dark:bg-gray-900">
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 dark:from-red-900 dark:via-red-800 dark:to-gray-900 text-white py-20 md:py-32 overflow-hidden">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yIDItNCA0LTRzNCAxIDQgMyAwIDQtMiA0LTQgMi00IDAgNC0yIDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <div class="inline-block animate-bounce mb-6">
            <div class="bg-white/20 backdrop-blur-sm p-6 rounded-3xl">
              <i class="fab fa-youtube text-7xl"></i>
            </div>
          </div>
          
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
            Baixe Thumbnails do YouTube<br/>
            <span class="text-red-200">Em Alta Qualidade!</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-red-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            A ferramenta mais <strong>rápida</strong>, <strong>gratuita</strong> e <strong>profissional</strong> para download de miniaturas do YouTube. 
            Sem cadastro, sem limites, sem complicações!
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <router-link
              to="/tool"
              class="group inline-flex items-center px-8 py-4 bg-white text-red-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 text-lg"
            >
              <i class="fas fa-download mr-3 group-hover:animate-bounce"></i>
              Começar Agora Grátis
              <i class="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
            </router-link>
            
            <a
              href="#recursos"
              class="inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300 text-lg"
            >
              <i class="fas fa-info-circle mr-3"></i>
              Saiba Mais
            </a>
          </div>
          
          <div class="flex flex-wrap justify-center gap-8 text-sm">
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-300 text-2xl mr-2"></i>
              <span>100% Gratuito</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-300 text-2xl mr-2"></i>
              <span>Sem Cadastro</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-300 text-2xl mr-2"></i>
              <span>Ilimitado</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-check-circle text-green-300 text-2xl mr-2"></i>
              <span>Alta Qualidade</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefícios -->
    <section id="recursos" class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Por Que Escolher Nossa Ferramenta?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Desenvolvida para oferecer a melhor experiência em download de thumbnails do YouTube
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="group bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-bolt text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ultra Rápido</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Baixe thumbnails em segundos! Nossa tecnologia otimizada garante velocidade máxima sem comprometer a qualidade.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-gift text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">100% Gratuito</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Sem taxas ocultas, sem assinaturas. Use quantas vezes quiser, para sempre gratuito. Sim, você leu certo!
            </p>
          </div>

          <div class="group bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-hd-video text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Alta Qualidade</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Thumbnails em resolução máxima até 4K. Perfeito para criadores de conteúdo que exigem qualidade profissional.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-shield-alt text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Seguro e Privado</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Sem registro de dados pessoais. Processamento local garante sua privacidade. Conformidade total com LGPD.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="bg-yellow-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-mobile-alt text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Mobile First</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Interface responsiva e otimizada. Funciona perfeitamente em smartphones, tablets e desktops.
            </p>
          </div>

          <div class="group bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="bg-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <i class="fas fa-infinity text-3xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Sem Limites</h3>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              Downloads ilimitados. Não há restrições diárias ou mensais. Use à vontade, quando quiser!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Como Funciona -->
    <section class="py-20 bg-gray-50 dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Como Funciona?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-300">
            Apenas 3 passos simples para ter sua thumbnail
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div class="text-center relative">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-6">
                1
              </div>
              <i class="fas fa-copy text-5xl text-red-600 mb-4"></i>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cole a URL</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Copie o link do vídeo do YouTube e cole no campo acima
              </p>
            </div>
          </div>

          <div class="text-center relative">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-6">
                2
              </div>
              <i class="fas fa-search text-5xl text-red-600 mb-4"></i>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Busque</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Clique no botão e aguarde alguns segundos
              </p>
            </div>
          </div>

          <div class="text-center relative">
            <div class="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
              <div class="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-6">
                3
              </div>
              <i class="fas fa-download text-5xl text-red-600 mb-4"></i>
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Baixe</h3>
              <p class="text-gray-600 dark:text-gray-300">
                Escolha a resolução e faça o download instantâneo
              </p>
            </div>
          </div>
        </div>

        <div class="text-center mt-16">
          <router-link
            to="/tool"
            class="inline-flex items-center px-10 py-5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 text-xl"
          >
            <i class="fas fa-rocket mr-3"></i>
            Experimentar Agora
          </router-link>
        </div>
      </div>
    </section>

    <!-- CTA Final -->
    <section class="py-20 bg-gradient-to-r from-red-600 to-red-800 dark:from-red-900 dark:to-gray-900 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">
          Pronto Para Baixar Suas Thumbnails?
        </h2>
        <p class="text-xl text-red-100 mb-10 max-w-2xl mx-auto">
          Junte-se a milhares de criadores de conteúdo que confiam em nossa ferramenta. 
          Comece agora mesmo, é grátis e sempre será!
        </p>
        <router-link
          to="/tool"
          class="inline-flex items-center px-10 py-5 bg-white text-red-600 font-bold rounded-xl shadow-2xl hover:scale-105 transition-all duration-300 text-xl"
        >
          <i class="fas fa-play-circle mr-3"></i>
          Começar Gratuitamente
        </router-link>
        <p class="mt-6 text-sm text-red-200">
          <i class="fas fa-lock mr-2"></i>
          Não precisa cartão de crédito • Sem cadastro • Sem spam
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Track pageview
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: 'Landing Page',
      page_location: window.location.href
    })
  }
})
</script>

<style scoped>
.landing-page {
  min-height: 100vh;
}
</style>

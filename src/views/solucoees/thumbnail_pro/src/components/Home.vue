<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
    <!-- Hero Section -->
    <section class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-youtube-red/5 to-red-600/5 dark:from-youtube-red/10 dark:to-red-600/10"></div>
      
      <div class="absolute top-4 right-4 z-10 animate-pulse">
        <div class="bg-gradient-to-r from-youtube-red to-red-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold">
          <i class="fas fa-fire mr-2"></i>
          +3.200 pessoas usaram hoje!
        </div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div class="text-center animate-fade-in">
          <div class="inline-flex items-center bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md mb-6 border border-gray-200 dark:border-gray-700">
            <i class="fas fa-certificate text-youtube-red mr-2"></i>
            <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Ferramenta #1 Mais Confiável do Brasil
            </span>
          </div>

          <h1 class="text-5xl md:text-7xl font-bold mb-6">
            <span class="text-gradient">Extraia Thumbnails</span><br />
            <span class="text-gray-900 dark:text-white">do YouTube em</span><br />
            <span class="text-gradient">Alta Qualidade 4K</span>
          </h1>
          
          <p class="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 max-w-3xl mx-auto leading-relaxed">
            <strong class="text-youtube-red">A ferramenta mais rápida</strong> e confiável para extrair thumbnails profissionais.
            <br class="hidden sm:block" />
            <strong>100% Grátis. Sem Limites. Sem Cadastro.</strong>
          </p>

          <div class="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded-lg max-w-2xl mx-auto mb-8">
            <p class="text-sm text-yellow-800 dark:text-yellow-300">
              <i class="fas fa-chart-line mr-2"></i>
              <strong>80% dos criadores de conteúdo</strong> que usam nossa ferramenta relatam <strong>economia de até 5 horas por semana</strong>.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <router-link to="/extractor" class="btn-primary text-lg px-8 py-4 transform hover:scale-105 shadow-2xl">
              <i class="fas fa-download mr-2"></i>
              Começar Grátis Agora
            </router-link>
            <button @click="scrollToFeatures" class="btn-secondary text-lg px-8 py-4">
              <i class="fas fa-play-circle mr-2"></i>
              Ver Como Funciona
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div class="text-3xl font-bold text-youtube-red mb-1"><i class="fas fa-gift"></i></div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">100%</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Gratuito</div>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div class="text-3xl font-bold text-youtube-red mb-1"><i class="fas fa-bolt"></i></div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">&lt; 3s</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Extração</div>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div class="text-3xl font-bold text-youtube-red mb-1"><i class="fas fa-trophy"></i></div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">4K</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Qualidade</div>
            </div>
            <div class="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
              <div class="text-3xl font-bold text-youtube-red mb-1"><i class="fas fa-infinity"></i></div>
              <div class="text-2xl font-bold text-gray-900 dark:text-white">∞</div>
              <div class="text-sm text-gray-600 dark:text-gray-400">Uso Ilimitado</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-white dark:bg-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <span class="text-youtube-red font-semibold text-sm uppercase tracking-wider">Recursos Exclusivos</span>
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 mt-2">
            Por Que Mais de 50 Mil Pessoas Confiam em Nós?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Desenvolvida para criadores de conteúdo, designers e profissionais que exigem qualidade máxima
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="card p-8 text-center hover:shadow-2xl transition-all duration-300">
            <div class="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-rocket text-4xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ultra Rápido</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Extraia thumbnails em menos de 3 segundos com tecnologia otimizada
            </p>
          </div>

          <div class="card p-8 text-center hover:shadow-2xl transition-all duration-300">
            <div class="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-shield-alt text-4xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">100% Seguro</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Não armazenamos dados. Processamento local e conforme LGPD
            </p>
          </div>

          <div class="card p-8 text-center hover:shadow-2xl transition-all duration-300">
            <div class="w-20 h-20 gradient-bg rounded-2xl flex items-center justify-center mx-auto mb-6">
              <i class="fas fa-image text-4xl text-white"></i>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Máxima Qualidade</h3>
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
              Resolução original incluindo versões em 4K quando disponíveis
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="py-20 bg-gray-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Como Funciona?
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Apenas 3 passos simples para extrair qualquer thumbnail
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <div class="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">1</div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <i class="fas fa-link text-youtube-red mr-2"></i>Cole a URL
            </h3>
            <p class="text-gray-600 dark:text-gray-400">Copie e cole a URL do vídeo do YouTube</p>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <div class="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">2</div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <i class="fas fa-magic text-youtube-red mr-2"></i>Extraia
            </h3>
            <p class="text-gray-600 dark:text-gray-400">Processamento em menos de 3 segundos</p>
          </div>

          <div class="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center shadow-lg">
            <div class="w-24 h-24 gradient-bg rounded-full flex items-center justify-center mx-auto mb-6 text-white text-4xl font-bold">3</div>
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              <i class="fas fa-download text-youtube-red mr-2"></i>Baixe
            </h3>
            <p class="text-gray-600 dark:text-gray-400">Escolha a resolução e baixe em alta qualidade</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials & FAQ -->
    <Testimonials />
    <FAQ />

    <!-- Final CTA -->
    <section class="py-20 gradient-bg">
      <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 class="text-4xl md:text-6xl font-bold text-white mb-6">
          Pronto Para Extrair Thumbnails?
        </h2>
        <p class="text-xl text-white/90 mb-8 leading-relaxed">
          Junte-se a mais de 50.000 criadores que já usam nossa ferramenta!
        </p>
        <router-link to="/extractor" class="btn-secondary text-lg px-12 py-5 inline-flex items-center shadow-2xl">
          <i class="fas fa-rocket mr-2"></i>
          Começar Agora - 100% Grátis!
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import FAQ from "./FAQ.vue";
import Testimonials from "./Testimonials.vue";

export default {
  name: "Home",
  components: {
    FAQ,
    Testimonials,
  },
  methods: {
    scrollToFeatures() {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-bg {
  background: linear-gradient(135deg, #ff0000 0%, #cc0000 100%);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}

.card {
  @apply bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700;
}
</style>

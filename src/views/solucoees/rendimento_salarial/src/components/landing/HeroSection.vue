<template>
  <section
    class="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800"
  >
    <!-- Animated Background -->
    <div class="absolute inset-0 opacity-20">
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"
      ></div>
      <div
        class="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"
        style="animation-delay: 2s"
      ></div>
      <div
        class="absolute bottom-20 left-1/3 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-float"
        style="animation-delay: 4s"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Content -->
        <div class="text-white space-y-8 animate-slide-right">
          <!-- Urgência + Escassez (Cialdini) -->
          <div
            class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-full text-sm font-medium border border-green-400/30"
          >
            <span
              class="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"
            ></span>
            <i class="fas fa-bolt text-yellow-300 mr-2"></i>
            100% Gratuito • Sem Cadastro • Resultados em 2 Segundos
          </div>

          <!-- Headline Poderoso -->
          <h1 class="text-5xl md:text-7xl font-extrabold leading-tight">
            Descubra Quanto
            <span
              class="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent animate-gradient"
            >
              Você Realmente
            </span>
            Vale por Hora
          </h1>

          <!-- Subheadline com Benefício Claro -->
          <p class="text-xl md:text-2xl text-blue-100 leading-relaxed">
            <i class="fas fa-chart-line text-green-300 mr-2"></i>
            Calcule seu rendimento por hora, dia, semana e mês.
            <strong class="text-white block mt-2"
              >✓ Tome decisões financeiras mais inteligentes e planeje aumentos salariais estratégicos!</strong
            >
          </p>

          <!-- Prova Social (Cialdini: Social Proof) -->
          <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
            <div class="flex items-center justify-between">
              <div class="flex -space-x-2">
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 border-2 border-white flex items-center justify-center">
                  <i class="fas fa-user text-white text-xs"></i>
                </div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-green-400 to-green-600 border-2 border-white flex items-center justify-center">
                  <i class="fas fa-user text-white text-xs"></i>
                </div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center">
                  <i class="fas fa-user text-white text-xs"></i>
                </div>
                <div class="w-10 h-10 rounded-full bg-gradient-to-r from-pink-400 to-pink-600 border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                  50k+
                </div>
              </div>
              <div class="text-right">
                <p class="text-sm font-semibold"><i class="fas fa-fire text-orange-400 mr-1"></i> 1.247 pessoas calculando AGORA</p>
                <p class="text-xs text-blue-200">Mais de 50 mil usuários satisfeitos</p>
              </div>
            </div>
          </div>

          <!-- CTA Buttons com Urgência -->
          <div class="flex flex-col sm:flex-row gap-4">
            <a
              href="#calculadora"
              class="group inline-flex items-center justify-center px-8 py-5 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 font-bold text-lg rounded-xl shadow-2xl hover:shadow-yellow-300/50 hover:scale-105 transform transition-all duration-200"
            >
              <i class="fas fa-calculator mr-2 group-hover:animate-bounce"></i>
              Calcular GRÁTIS Agora
              <i class="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
            </a>
            <button
              @click="scrollToFeatures"
              class="inline-flex items-center justify-center px-8 py-5 bg-white/10 backdrop-blur-md border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white hover:text-indigo-700 transform transition-all duration-200"
            >
              <i class="fas fa-star mr-2"></i>
              Ver Recursos
            </button>
          </div>

          <!-- Trust Indicators (Autoridade + Prova Social) -->
          <div
            class="flex flex-wrap items-center gap-6 pt-8 border-t border-white/20"
          >
            <div class="flex items-center space-x-2">
              <div class="flex text-yellow-300">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </div>
              <span class="text-sm font-medium">4.9/5 (3.250 avaliações)</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-shield-alt text-green-300 text-lg"></i>
              <span class="text-sm font-medium">100% Seguro & Privado</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-users text-blue-300 text-lg"></i>
              <span class="text-sm font-medium">+50mil Usuários</span>
            </div>
            <div class="flex items-center space-x-2">
              <i class="fas fa-bolt text-yellow-300 text-lg"></i>
              <span class="text-sm font-medium">Resposta Instantânea</span>
            </div>
          </div>

          <!-- Garantia (Reciprocidade + Compromisso) -->
          <div class="bg-green-500/20 border border-green-400/50 rounded-xl p-4">
            <p class="text-sm flex items-center">
              <i class="fas fa-check-circle text-green-300 mr-2 text-lg"></i>
              <strong>Garantia:</strong>&nbsp;Ferramenta 100% gratuita, sem truques ou taxas ocultas. Seus dados são processados localmente e não são armazenados.
            </p>
          </div>
        </div>

        <!-- Right Column - Visual/Animation -->
        <div class="hidden lg:block animate-float">
          <div class="relative">
            <!-- Calculator Card Mockup -->
            <div
              class="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300"
            >
              <div class="space-y-4">
                <!-- Header -->
                <div class="flex items-center justify-between mb-4">
                  <div
                    class="h-4 bg-gradient-to-r from-blue-400 to-indigo-500 rounded w-3/4"
                  ></div>
                  <i class="fas fa-calculator text-indigo-600 text-2xl"></i>
                </div>
                
                <!-- Input Field -->
                <div class="h-16 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border-2 border-indigo-200 flex items-center px-4">
                  <i class="fas fa-dollar-sign text-gray-400 mr-2"></i>
                  <div class="h-3 bg-gray-300 rounded w-32"></div>
                </div>
                
                <!-- Results Grid -->
                <div class="grid grid-cols-2 gap-4">
                  <div
                    class="h-24 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border-l-4 border-green-500 p-4 flex flex-col justify-between"
                  >
                    <i class="fas fa-clock text-green-600 text-lg"></i>
                    <div class="h-2 bg-green-200 rounded w-16"></div>
                  </div>
                  <div
                    class="h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-l-4 border-blue-500 p-4 flex flex-col justify-between"
                  >
                    <i class="fas fa-calendar-day text-blue-600 text-lg"></i>
                    <div class="h-2 bg-blue-200 rounded w-16"></div>
                  </div>
                </div>
                
                <!-- CTA Button -->
                <div
                  class="h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <i class="fas fa-chart-bar text-white mr-2"></i>
                  <div class="h-3 bg-white/30 rounded w-24"></div>
                </div>
              </div>
            </div>

            <!-- Floating Badge - Selo de Confiança -->
            <div
              class="absolute -top-8 -right-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4 shadow-2xl animate-bounce border-4 border-white"
            >
              <i class="fas fa-award text-white text-3xl"></i>
            </div>
            
            <!-- Floating Badge - Gratuito -->
            <div
              class="absolute -bottom-6 -left-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl px-4 py-2 shadow-xl border-2 border-white"
            >
              <p class="text-white font-bold text-sm flex items-center">
                <i class="fas fa-gift mr-2"></i>
                100% GRÁTIS
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div
        class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        @click="scrollToCalculator"
      >
        <div class="flex flex-col items-center">
          <p class="text-white text-sm mb-2 font-medium">Role para calcular</p>
          <i class="fas fa-chevron-down text-white text-2xl"></i>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "HeroSection",
  methods: {
    scrollToCalculator() {
      document.getElementById('calculadora')?.scrollIntoView({ behavior: 'smooth' });
    },
    scrollToFeatures() {
      const featuresSection = document.querySelector('.features-section');
      featuresSection?.scrollIntoView({ behavior: 'smooth' });
    }
  }
};
</script>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

.animate-slide-right {
  animation: slideRight 1s ease-out;
}

@keyframes slideRight {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>

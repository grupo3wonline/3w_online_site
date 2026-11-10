<template>
  <section
    class="relative gradient-bg text-white py-20 md:py-32 overflow-hidden"
  >
    <!-- Decorative elements -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"
      ></div>
      <div
        class="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"
      ></div>
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="max-w-4xl mx-auto text-center animate-fade-in">
        <!-- Badge -->
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6 animate-slide-down"
        >
          <svg
            class="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span class="text-sm font-medium"
            >100% Gratuito • Sem Cadastro • Processamento Offline</span
          >
        </div>

        <!-- Main Heading -->
        <h1
          class="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight animate-slide-up"
        >
          Proteja Suas Imagens com
          <span
            class="block mt-2 bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent"
          >
            Marca D'água Profissional
          </span>
        </h1>

        <!-- Subtitle -->
        <p
          class="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto animate-slide-up"
          style="animation-delay: 0.1s"
        >
          Adicione marca d'água em suas fotos em segundos. Rápido, fácil e
          totalmente seguro. Tudo processado no seu navegador.
        </p>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in"
          style="animation-delay: 0.2s"
        >
          <router-link
            to="/app"
            class="group px-8 py-4 bg-white text-primary-600 font-bold rounded-xl shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Começar Agora
            <svg
              class="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </router-link>
          <a
            href="#features"
            class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
          >
            Ver Recursos
          </a>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold mb-1">100%</div>
            <div class="text-sm text-blue-200">Gratuito</div>
          </div>
          <div class="text-center border-x border-white/20">
            <div class="text-3xl md:text-4xl font-bold mb-1">0</div>
            <div class="text-sm text-blue-200">Upload Servidor</div>
          </div>
          <div class="text-center">
            <div class="text-3xl md:text-4xl font-bold mb-1">∞</div>
            <div class="text-sm text-blue-200">Sem Limites</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Wave Separator -->
    <div class="absolute bottom-0 left-0 right-0">
      <svg
        class="w-full h-16 md:h-24"
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          class="fill-gray-50 dark:fill-gray-900"
        />
      </svg>
    </div>
  </section>
</template>

<script setup>
// No logic needed for this component
</script>

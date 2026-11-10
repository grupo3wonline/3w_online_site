<template>
  <section
    class="py-20 bg-gradient-to-br from-purple-600 via-indigo-700 to-purple-800 relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            circle at 2px 2px,
            white 1px,
            transparent 0
          );
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <!-- Floating Shapes -->
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl animate-float"
      ></div>
      <div
        class="absolute -bottom-24 -left-24 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl animate-float"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse-slow"
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Main CTA -->
      <div class="max-w-4xl mx-auto text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Pronto para economizar tempo e turbinar seus vídeos?
        </h2>
        <p class="text-lg md:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
          Não perca mais tempo com processos manuais.
          <strong>Converta roteiros em legendas SRT profissionais</strong> agora
          mesmo, grátis e sem limites.<br />
          <span class="block mt-2"
            >Aproveite — ferramenta exclusiva, aprovada por milhares de
            criadores!</span
          >
        </p>

        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <RouterLink
            to="/converter"
            class="inline-flex items-center px-10 py-5 text-xl font-bold text-purple-900 bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-full hover:from-yellow-400 hover:to-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-yellow-400/50"
          >
            <svg
              class="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Começar Agora Gratuitamente
            <svg
              class="w-6 h-6 ml-3"
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
          </RouterLink>
        </div>

        <!-- Trust Indicators -->
        <div
          class="flex flex-wrap justify-center items-center gap-6 text-purple-100 text-sm"
        >
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Sem cadastro necessário
          </div>
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Uso ilimitado
          </div>
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            100% gratuito
          </div>
          <div class="flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-green-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Totalmente seguro
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
      >
        <div
          class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
        >
          <div class="text-4xl font-bold text-yellow-300 mb-2">50k+</div>
          <div class="text-purple-100 text-sm">Usuários Ativos</div>
        </div>
        <div
          class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
        >
          <div class="text-4xl font-bold text-yellow-300 mb-2">1.2M+</div>
          <div class="text-purple-100 text-sm">Conversões Realizadas</div>
        </div>
        <div
          class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
        >
          <div class="text-4xl font-bold text-yellow-300 mb-2">4.9/5</div>
          <div class="text-purple-100 text-sm">Avaliação Média</div>
        </div>
        <div
          class="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
        >
          <div class="text-4xl font-bold text-yellow-300 mb-2">250k+</div>
          <div class="text-purple-100 text-sm">Horas Economizadas</div>
        </div>
      </div>

      <!-- Secondary CTA -->
      <div class="mt-16 text-center">
        <p class="text-lg text-purple-100 mb-6">
          Ainda tem dúvidas? Veja o que nossos usuários dizem
        </p>
        <a
          href="#testimonials"
          class="inline-flex items-center text-yellow-300 hover:text-yellow-200 font-semibold transition-colors duration-300"
        >
          Ver Depoimentos
          <svg
            class="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Enhanced CTA section with multiple CTAs and trust indicators
</script>

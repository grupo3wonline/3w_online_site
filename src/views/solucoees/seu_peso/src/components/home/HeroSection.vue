<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-primary-600 via-purple-600 to-pink-500 text-white py-20 lg:py-32"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute transform rotate-45 -top-20 -right-20 w-80 h-80 bg-white rounded-full blur-3xl"
      ></div>
      <div
        class="absolute transform -rotate-45 -bottom-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Content -->
        <div class="text-center lg:text-left animate-fade-in-up">
          <div
            class="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold"
          >
            🎯 Gratuito • Rápido • Confiável
          </div>

          <h1
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
          >
            Transforme Sua Saúde
            <span class="block text-yellow-300 mt-2">Em 2 Minutos</span>
          </h1>

          <p class="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed">
            Descubra seu IMC, peso ideal, calorias diárias e muito mais com a
            calculadora mais completa e precisa do Brasil.
          </p>

          <div
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
          >
            <router-link
              to="/calculadora"
              class="group inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-xl text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <span>Calcular Agora Grátis</span>
              <svg
                class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>

            <a
              href="#recursos"
              class="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-xl text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Ver Recursos
            </a>
          </div>

          <!-- Trust Indicators -->
          <div
            class="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm"
          >
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span>100% Grátis</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-green-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Dados Seguros</span>
            </div>
            <div class="flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-blue-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span>Cientificamente Validado</span>
            </div>
          </div>
        </div>

        <!-- Image/Illustration -->
        <div class="hidden lg:block animate-fade-in-up animation-delay-300">
          <div class="relative">
            <div
              class="absolute inset-0 bg-gradient-to-tr from-yellow-400 to-pink-400 rounded-3xl blur-3xl opacity-30 animate-pulse"
            ></div>
            <div
              class="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl"
            >
              <div class="space-y-4">
                <!-- Metric Cards -->
                <div
                  class="bg-white/90 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600 font-medium">Seu IMC</p>
                      <p class="text-3xl font-bold text-primary-600">22.5</p>
                    </div>
                    <div
                      class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-8 h-8 text-green-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <p class="text-xs text-green-600 font-semibold mt-2">
                    ✓ Peso Normal
                  </p>
                </div>

                <div
                  class="bg-white/90 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600 font-medium">
                        Calorias/dia
                      </p>
                      <p class="text-3xl font-bold text-blue-600">2.450</p>
                    </div>
                    <div
                      class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-8 h-8 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div
                  class="bg-white/90 rounded-xl p-4 shadow-lg transform hover:scale-105 transition-transform"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-gray-600 font-medium">
                        Peso Ideal
                      </p>
                      <p class="text-3xl font-bold text-purple-600">68 kg</p>
                    </div>
                    <div
                      class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center"
                    >
                      <svg
                        class="w-8 h-8 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Hero Section - Landing Page
</script>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 0.3s;
  opacity: 0;
}
</style>

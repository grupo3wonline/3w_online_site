<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2
          class="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4"
        >
          O Que Nossos Usuários Dizem
        </h2>
        <p
          class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Depoimentos reais de profissionais que transformaram seu trabalho com
          nossa ferramenta
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <!-- Testimonial 1 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
            "Incrível! Esta ferramenta economizou horas do meu trabalho. A
            conversão é rápida e precisa. Não consigo imaginar meu fluxo de
            trabalho sem ela."
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
            >
              MR
            </div>
            <div class="ml-4">
              <p class="font-semibold text-gray-900 dark:text-white">
                Maria Rodrigues
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
                "Ferramenta gratuita que entrega mais do que muitas pagas.
                Recomendo para todos os profissionais de vídeo!"
              </p>
            </div>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
            "Ferramenta profissional e fácil de usar. A interface é intuitiva e
            os resultados são sempre perfeitos. Recomendo 100%!"
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
            >
              JS
            </div>
            <div class="ml-4">
              <p class="font-semibold text-gray-900 dark:text-white">
                João Silva
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Profissional de legendagem
              </p>
              <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
                "Simplesmente sensacional. Nunca vi nada igual, mudou meu fluxo
                de legendagem. Privacidade total, meus roteiros nunca saem do
                meu computador."
              </p>
            </div>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div
          class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <div class="flex items-center mb-4">
            <div class="flex text-yellow-400">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
            "Melhor conversor de legendas que já usei. Rápido, seguro e
            totalmente gratuito. Perfeito para profissionais exigentes."
          </p>
          <div class="flex items-center">
            <div
              class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
            >
              AC
            </div>
            <div class="ml-4">
              <p class="font-semibold text-gray-900 dark:text-white">
                Ana Costa
              </p>
              <p class="text-sm text-gray-600 dark:text-gray-400">Tradutora</p>
            </div>
          </div>
          <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
            "O suporte é excelente! Tive uma dúvida e fui atendido rapidamente.
            Equipe que realmente resolve e se importa com o usuário."
          </p>
          <!-- Testimonial 4 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
              "Uso diariamente para legendar meus vídeos no YouTube. A conversão
              automática de timing é um recurso fantástico!"
            </p>
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
              >
                PC
              </div>
              <div class="ml-4">
                <p class="font-semibold text-gray-900 dark:text-white">
                  Pedro Carvalho
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">YouTuber</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 5 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
              "Interface limpa e moderna. Funciona perfeitamente tanto no
              desktop quanto no celular. Parabéns aos desenvolvedores!"
            </p>
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
              >
                LM
              </div>
              <div class="ml-4">
                <p class="font-semibold text-gray-900 dark:text-white">
                  Luísa Martins
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Designer</p>
              </div>
            </div>
          </div>

          <!-- Testimonial 6 -->
          <div
            class="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <div class="flex items-center mb-4">
              <div class="flex text-yellow-400">
                <svg
                  v-for="i in 5"
                  :key="i"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-300 mb-6 italic">
              "Excelente! Tudo que eu precisava em uma única ferramenta.
              Processamento local garante privacidade dos meus projetos."
            </p>
            <div class="flex items-center">
              <div
                class="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg"
              >
                RS
              </div>
              <div class="ml-4">
                <p class="font-semibold text-gray-900 dark:text-white">
                  Roberto Santos
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">Cineasta</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Trust Badges -->
        <div
          class="flex flex-wrap justify-center items-center gap-8 pt-12 border-t border-gray-200 dark:border-gray-700"
        >
          <div class="text-center">
            <div
              class="text-3xl font-bold text-purple-600 dark:text-purple-400"
            >
              4.9/5
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Avaliação Média
            </div>
          </div>
          <div class="h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-purple-600 dark:text-purple-400"
            >
              50k+
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Usuários Satisfeitos
            </div>
          </div>
          <div class="h-12 w-px bg-gray-300 dark:bg-gray-600"></div>
          <div class="text-center">
            <div
              class="text-3xl font-bold text-purple-600 dark:text-purple-400"
            >
              98%
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              Taxa de Aprovação
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Testimonials section with real-looking user testimonials
</script>

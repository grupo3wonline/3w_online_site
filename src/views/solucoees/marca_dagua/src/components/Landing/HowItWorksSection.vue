<template>
  <section class="py-20 bg-gray-50 dark:bg-gray-900">
    <div class="container mx-auto px-4">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="section-title">Como Funciona</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Apenas 3 passos simples para proteger suas imagens com marca d'água
          profissional
        </p>
      </div>

      <!-- Steps -->
      <div class="max-w-5xl mx-auto">
        <!-- Step 1 -->
        <div
          class="relative flex flex-col md:flex-row items-center gap-8 mb-16"
        >
          <!-- Number Badge -->
          <div
            class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl z-10"
          >
            <span class="text-3xl font-bold text-white">1</span>
          </div>

          <!-- Content -->
          <div class="card flex-1 bg-white dark:bg-gray-800">
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3
                  class="text-2xl font-bold mb-3 text-gray-900 dark:text-white"
                >
                  Faça Upload das Imagens
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Selecione uma ou múltiplas imagens do seu computador. Você
                  pode arrastar e soltar ou clicar para escolher os arquivos.
                  Suportamos JPG, PNG e outros formatos populares.
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >JPG</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >PNG</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >WebP</span
                  >
                  <span
                    class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                    >Múltiplos arquivos</span
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Connector Line (hidden on mobile) -->
          <div
            class="hidden md:block absolute left-10 top-28 w-0.5 h-24 bg-gradient-to-b from-blue-500 to-purple-500"
          ></div>
        </div>

        <!-- Step 2 -->
        <div
          class="relative flex flex-col md:flex-row items-center gap-8 mb-16"
        >
          <!-- Number Badge -->
          <div
            class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl z-10"
          >
            <span class="text-3xl font-bold text-white">2</span>
          </div>

          <!-- Content -->
          <div class="card flex-1 bg-white dark:bg-gray-800">
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3
                  class="text-2xl font-bold mb-3 text-gray-900 dark:text-white"
                >
                  Configure a Marca D'água
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Personalize sua marca d'água escolhendo entre texto ou logo,
                  ajuste a posição, cor, opacidade e outros detalhes. Veja o
                  preview em tempo real enquanto ajusta.
                </p>
                <div class="grid grid-cols-2 gap-3">
                  <div
                    class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <svg
                      class="w-4 h-4 text-purple-500"
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
                    Texto ou Logo
                  </div>
                  <div
                    class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <svg
                      class="w-4 h-4 text-purple-500"
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
                    6 Posições
                  </div>
                  <div
                    class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <svg
                      class="w-4 h-4 text-purple-500"
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
                    Cor Customizada
                  </div>
                  <div
                    class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    <svg
                      class="w-4 h-4 text-purple-500"
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
                    Opacidade Ajustável
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Connector Line (hidden on mobile) -->
          <div
            class="hidden md:block absolute left-10 top-28 w-0.5 h-24 bg-gradient-to-b from-purple-500 to-pink-500"
          ></div>
        </div>

        <!-- Step 3 -->
        <div class="relative flex flex-col md:flex-row items-center gap-8">
          <!-- Number Badge -->
          <div
            class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-2xl z-10"
          >
            <span class="text-3xl font-bold text-white">3</span>
          </div>

          <!-- Content -->
          <div class="card flex-1 bg-white dark:bg-gray-800">
            <div class="flex items-start gap-4">
              <div
                class="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center"
              >
                <svg
                  class="w-6 h-6 text-pink-600 dark:text-pink-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <div class="flex-1">
                <h3
                  class="text-2xl font-bold mb-3 text-gray-900 dark:text-white"
                >
                  Baixe as Imagens Processadas
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  Clique no botão processar e em segundos suas imagens estarão
                  prontas. Baixe individualmente ou todas de uma vez. Simples
                  assim!
                </p>
                <div
                  class="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg font-semibold shadow-lg"
                >
                  <svg
                    class="w-5 h-5"
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
                  Pronto em segundos!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="text-center mt-16">
        <router-link
          to="/app"
          class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
        >
          Experimentar Agora Grátis
          <svg
            class="w-5 h-5"
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
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Não precisa cadastro • 100% gratuito • Comece em segundos
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
// No logic needed
</script>

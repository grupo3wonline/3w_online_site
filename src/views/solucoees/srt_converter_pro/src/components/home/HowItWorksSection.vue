<template>
  <section
    id="como-funciona"
    class="py-20 bg-gradient-to-br from-gray-50 to-gray-100"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-16">
        <span
          class="text-purple-600 font-semibold text-sm uppercase tracking-wider"
          >Sem Cadastro, Sem Complicação</span
        >
        <h2 class="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
          Legendas SRT prontas em <span class="text-purple-600">3 passos</span>
        </h2>
        <p class="mt-4 text-xl text-gray-600">
          Do roteiro ao SRT profissional em segundos, com segurança e facilidade
          máxima.
        </p>
      </div>

      <!-- Steps -->
      <div class="relative">
        <!-- Connection Line (Desktop) -->
        <div
          class="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-200 via-purple-300 to-purple-200 transform -translate-y-1/2 z-0"
        ></div>

        <div class="grid md:grid-cols-3 gap-12 relative z-10">
          <!-- Step 1 -->
          <div class="text-center group animate-fade-in-up">
            <div class="relative inline-flex items-center justify-center mb-6">
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
              ></div>
              <div
                class="relative w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div
                class="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg shadow-lg"
              >
                1
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Cole Seu Roteiro
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Copie e cole seu roteiro na área de entrada.
              <strong>Sem limites de tamanho</strong> e
              <strong>sem cadastro</strong>.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="text-center group animate-fade-in-up stagger-delay-2">
            <div class="relative inline-flex items-center justify-center mb-6">
              <div
                class="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
              ></div>
              <div
                class="relative w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-12 h-12 text-white"
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
              </div>
              <div
                class="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg shadow-lg"
              >
                2
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">
              Clique em Converter
            </h3>
            <p class="text-gray-600 leading-relaxed">
              Clique em <b>Converter</b> e veja a mágica acontecer:
              processamento local, seguro e instantâneo.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="text-center group animate-fade-in-up stagger-delay-3">
            <div class="relative inline-flex items-center justify-center mb-6">
              <div
                class="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
              ></div>
              <div
                class="relative w-24 h-24 bg-gradient-to-br from-orange-600 to-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform"
              >
                <svg
                  class="w-12 h-12 text-white"
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
              <div
                class="absolute -top-2 -right-2 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-purple-900 font-bold text-lg shadow-lg"
              >
                3
              </div>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Baixe e Use!</h3>
            <p class="text-gray-600 leading-relaxed">
              Baixe o SRT pronto e use em qualquer editor ou plataforma de
              vídeo. <strong>Simples, rápido e gratuito!</strong>
            </p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="mt-16 text-center">
        <BaseButton
          variant="primary"
          size="lg"
          class="shadow-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          @click="$router.push('/converter')"
        >
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
          Testar sem compromisso
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "../common/BaseButton.vue";
</script>

<template>
  <section
    class="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 min-h-[90vh] flex items-center"
  >
    <!-- Animated background gradient -->
    <div
      class="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
    ></div>

    <div
      class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full"
    >
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column: Text Content -->
        <div class="text-center lg:text-left space-y-8 animate-fade-in-up">
          <!-- Badge -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm font-semibold"
          >
            <span class="relative flex h-2 w-2">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"
              ></span>
              <span
                class="relative inline-flex rounded-full h-2 w-2 bg-green-500"
              ></span>
            </span>
            100% Gratuito e Sem Limites
          </div>

          <!-- Headline -->
          <h1
            class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight"
          >
            Crie Legendas SRT
            <span
              class="block mt-2 bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-300 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]"
            >
              em Segundos
            </span>
          </h1>

          <!-- Subtitle -->
          <p
            class="text-lg sm:text-xl lg:text-2xl text-purple-100 leading-relaxed"
          >
            Chega de perder tempo com legendas! Tenha
            <strong>legendas SRT profissionais</strong> em segundos, com
            precisão e segurança total.<br />
            <span class="block mt-2"
              >Confiança de
              <strong class="text-yellow-300">+50.000 criadores</strong> e
              empresas.</span
            >
          </p>

          <p class="text-sm text-purple-200">
            Exclusivo, gratuito e sem limites.
            <strong>Desenvolvido pelo Grupo 3w Online</strong> — referência em
            soluções web sob demanda.
          </p>

          <!-- CTA Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <BaseButton
              variant="primary"
              size="xl"
              class="shadow-2xl shadow-yellow-500/50 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-purple-900"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Começar Agora - 100% Grátis
            </BaseButton>

            <BaseButton
              variant="ghost"
              size="xl"
              class="text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10"
              @click="scrollToFeatures"
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
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Ver Demonstração
            </BaseButton>
          </div>

          <!-- Social Proof -->
          <div
            class="flex flex-wrap items-center gap-6 justify-center lg:justify-start text-white/80 text-sm"
          >
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
              <span class="font-semibold">4.9/5</span>
              <span>(2,500+ avaliações)</span>
            </div>
            <div class="flex items-center gap-2">
              <svg
                class="w-5 h-5 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              <span><strong>10,000+</strong> usuários ativos</span>
            </div>
          </div>
        </div>

        <!-- Right Column: Feature Cards Preview -->
        <div class="hidden lg:block animate-fade-in-left">
          <div class="relative">
            <!-- Main Card -->
            <div
              class="glass rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl"
                  >
                    ⚡
                  </div>
                  <div>
                    <h3 class="text-white font-bold text-lg">
                      Conversão Ultra Rápida
                    </h3>
                    <p class="text-purple-200 text-sm">Menos de 3 segundos</p>
                  </div>
                </div>

                <div class="bg-white/5 rounded-lg p-4 space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-purple-200">Progresso</span>
                    <span class="text-white font-semibold">100%</span>
                  </div>
                  <div class="w-full bg-white/10 rounded-full h-2">
                    <div
                      class="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full animate-pulse"
                      style="width: 100%"
                    ></div>
                  </div>
                </div>

                <div class="grid grid-cols-3 gap-3 pt-4">
                  <div class="bg-white/5 rounded-lg p-3 text-center">
                    <div class="text-2xl font-bold text-white">250</div>
                    <div class="text-xs text-purple-200">Blocos</div>
                  </div>
                  <div class="bg-white/5 rounded-lg p-3 text-center">
                    <div class="text-2xl font-bold text-white">2.5s</div>
                    <div class="text-xs text-purple-200">Tempo</div>
                  </div>
                  <div class="bg-white/5 rounded-lg p-3 text-center">
                    <div class="text-2xl font-bold text-green-400">✓</div>
                    <div class="text-xs text-purple-200">Pronto</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Floating badges -->
            <div
              class="absolute -top-6 -right-6 bg-gradient-to-br from-green-400 to-emerald-500 text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm animate-bounce-slow"
            >
              🔒 100% Seguro
            </div>

            <div
              class="absolute -bottom-6 -left-6 bg-gradient-to-br from-blue-500 to-purple-500 text-white px-6 py-3 rounded-full shadow-xl font-bold text-sm animate-float"
            >
              💎 Qualidade Pro
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated background elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl animate-pulse-slow"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow delay-1000"
      ></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BaseButton from "./common/BaseButton.vue";

const scrollToFeatures = () => {
  const element = document.getElementById("recursos");
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

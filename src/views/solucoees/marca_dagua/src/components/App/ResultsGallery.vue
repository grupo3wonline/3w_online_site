<template>
  <div v-if="results.length > 0" class="mt-10 animate-fade-in">
    <div class="flex items-center justify-between mb-6">
      <h2
        class="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2"
      >
        <svg
          class="w-6 h-6 text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Imagens Processadas ({{ results.length }})
      </h2>

      <button @click="downloadAll" class="btn-primary flex items-center gap-2">
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
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Baixar Todas
      </button>
    </div>

    <!-- Success Alert -->
    <div
      class="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
    >
      <div class="flex gap-3">
        <svg
          class="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div class="text-sm">
          <p class="font-semibold text-green-800 dark:text-green-200">
            Processamento concluído com sucesso!
          </p>
          <p class="text-green-700 dark:text-green-300 mt-1">
            {{ results.length }}
            {{
              results.length === 1
                ? "imagem processada"
                : "imagens processadas"
            }}. Clique em qualquer imagem para fazer o download individual.
          </p>
        </div>
      </div>
    </div>

    <!-- Results Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="(result, index) in results"
        :key="index"
        class="card group hover:scale-105 transition-all duration-300 animate-slide-up"
        :style="{ animationDelay: `${index * 0.05}s` }"
      >
        <!-- Image Preview -->
        <div
          class="relative overflow-hidden rounded-lg mb-4 bg-gray-100 dark:bg-gray-900"
        >
          <img
            :src="result.dataUrl"
            :alt="`Processada ${index + 1}`"
            class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />

          <!-- Overlay on Hover -->
          <div
            class="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
          >
            <button
              @click="downloadSingle(result, index)"
              class="px-4 py-2 bg-white text-gray-900 rounded-lg font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Baixar
            </button>
          </div>
        </div>

        <!-- Image Info -->
        <div class="space-y-2">
          <p
            class="text-sm font-medium text-gray-900 dark:text-white truncate"
            :title="result.filename"
          >
            {{ result.filename }}
          </p>

          <!-- Action Buttons -->
          <div class="flex gap-2">
            <button
              @click="downloadSingle(result, index)"
              class="flex-1 px-3 py-2 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors text-sm font-medium flex items-center justify-center gap-2"
            >
              <svg
                class="w-4 h-4"
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
              Download
            </button>

            <button
              @click="viewFullSize(result)"
              class="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              title="Ver em tamanho real"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Stats -->
    <div
      class="mt-8 p-6 bg-gradient-to-r from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 rounded-xl"
    >
      <div class="flex flex-wrap items-center justify-center gap-8 text-center">
        <div>
          <div
            class="text-3xl font-bold text-primary-600 dark:text-primary-400"
          >
            {{ results.length }}
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Imagens Processadas
          </div>
        </div>
        <div
          class="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-700"
        ></div>
        <div>
          <div class="text-3xl font-bold text-green-600 dark:text-green-400">
            100%
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Taxa de Sucesso
          </div>
        </div>
        <div
          class="hidden sm:block w-px h-12 bg-gray-300 dark:bg-gray-700"
        ></div>
        <div>
          <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
            ⚡
          </div>
          <div class="text-sm text-gray-600 dark:text-gray-400">
            Rápido e Eficiente
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  results: {
    type: Array,
    default: () => [],
  },
});

const downloadSingle = (result, index) => {
  const link = document.createElement("a");
  link.href = result.dataUrl;
  link.download = `marca-dagua-${index + 1}-${result.filename}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const downloadAll = () => {
  props.results.forEach((result, index) => {
    setTimeout(() => {
      downloadSingle(result, index);
    }, index * 200); // Delay between downloads
  });
};

const viewFullSize = (result) => {
  window.open(result.dataUrl, "_blank");
};
</script>

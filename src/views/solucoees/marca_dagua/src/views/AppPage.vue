<template>
  <div class="min-h-screen flex flex-col">
    <Header />

    <main class="flex-grow bg-gray-50 dark:bg-gray-900 py-10">
      <div class="container mx-auto px-4">
        <!-- Page Header -->
        <div class="text-center mb-10 animate-fade-in">
          <h1
            class="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent"
          >
            Editor de Marca D'água
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Configure sua marca d'água, visualize em tempo real e processe suas
            imagens em segundos
          </p>
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          <!-- Form -->
          <WatermarkForm
            :watermark-config="watermarkConfig"
            :is-processing="isProcessing"
            @update-config="handleConfigUpdate"
            @images-selected="handleImagesSelected"
            @process="handleProcess"
            @reset="handleReset"
          />

          <!-- Preview -->
          <PreviewCanvas
            :preview-image="previewImage"
            :watermark-config="watermarkConfig"
          />
        </div>

        <!-- Results Gallery -->
        <ResultsGallery :results="processedResults" />

        <!-- Help Section -->
        <div v-if="processedResults.length === 0" class="mt-10">
          <div
            class="card bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-dashed border-blue-200 dark:border-blue-800"
          >
            <div class="text-center">
              <div
                class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4"
              >
                <svg
                  class="w-8 h-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Como usar?
              </h3>
              <div
                class="max-w-2xl mx-auto text-left space-y-3 text-gray-700 dark:text-gray-300"
              >
                <div class="flex items-start gap-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    1
                  </div>
                  <p>Selecione uma ou mais imagens do seu computador</p>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    2
                  </div>
                  <p>Escolha entre texto ou logo para sua marca d'água</p>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    3
                  </div>
                  <p>Ajuste a posição, cor e opacidade conforme desejado</p>
                </div>
                <div class="flex items-start gap-3">
                  <div
                    class="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold"
                  >
                    4
                  </div>
                  <p>Clique em "Processar Imagens" e baixe os resultados</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Highlight -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div class="card text-center">
            <div
              class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mx-auto mb-3"
            >
              <svg
                class="w-6 h-6 text-green-600 dark:text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
              100% Privado
            </h4>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Processamento local
            </p>
          </div>

          <div class="card text-center">
            <div
              class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mx-auto mb-3"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
              Super Rápido
            </h4>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Resultados instantâneos
            </p>
          </div>

          <div class="card text-center">
            <div
              class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center mx-auto mb-3"
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
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
              Múltiplas Imagens
            </h4>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Processamento em lote
            </p>
          </div>

          <div class="card text-center">
            <div
              class="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-xl flex items-center justify-center mx-auto mb-3"
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
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
              Totalmente Grátis
            </h4>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              Sem limites de uso
            </p>
          </div>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useHead } from "@vueuse/head";
import { useWatermark } from "@/composables/useWatermark";
import Header from "@/components/Shared/Header.vue";
import Footer from "@/components/Shared/Footer.vue";
import WatermarkForm from "@/components/App/WatermarkForm.vue";
import PreviewCanvas from "@/components/App/PreviewCanvas.vue";
import ResultsGallery from "@/components/App/ResultsGallery.vue";

useHead({
  title: "Editor - Marca D'água Pro",
  meta: [
    {
      name: "description",
      content:
        "Editor online de marca d'água. Adicione texto ou logo em suas imagens, ajuste posição, cor e opacidade. Preview em tempo real.",
    },
    {
      name: "robots",
      content: "noindex, nofollow",
    },
  ],
});

const {
  watermarkConfig,
  isProcessing,
  processedImages,
  updateWatermark,
  processAllImages,
  resetWatermark,
} = useWatermark();

const previewImage = ref(null);
const processedResults = ref([]);

const handleConfigUpdate = (newConfig) => {
  updateWatermark(newConfig);
};

const handleImagesSelected = (files) => {
  if (files && files.length > 0) {
    previewImage.value = files[0];
  }
};

const handleProcess = async (images) => {
  if (!images || images.length === 0) return;

  isProcessing.value = true;
  processedResults.value = [];

  try {
    await processAllImages(images);
    processedResults.value = processedImages.value;

    // Scroll to results
    setTimeout(() => {
      const resultsElement = document.querySelector("#results");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  } catch (error) {
    console.error("Error processing images:", error);
    alert("Erro ao processar imagens. Por favor, tente novamente.");
  } finally {
    isProcessing.value = false;
  }
};

const handleReset = () => {
  resetWatermark();
  previewImage.value = null;
  processedResults.value = [];
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-2xl w-full text-center">
      <!-- 404 Illustration -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center">
          <svg
            class="w-64 h-64 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0.5"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <!-- 404 Text -->
      <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 class="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 class="text-3xl font-bold text-gray-800 mb-4">
          Página Não Encontrada
        </h2>
        <p class="text-lg text-gray-600 mb-8 leading-relaxed">
          Ops! A página que você está procurando não existe ou foi movida.
          Parece que você se perdeu no caminho.
        </p>

        <!-- Search suggestions -->
        <div class="bg-gray-50 rounded-xl p-6 mb-8 text-left">
          <h3 class="font-semibold text-gray-900 mb-3 flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              />
            </svg>
            Você pode tentar:
          </h3>
          <ul class="space-y-2 text-gray-700">
            <li class="flex items-center">
              <span class="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></span>
              Verificar se o endereço está correto
            </li>
            <li class="flex items-center">
              <span class="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></span>
              Voltar para a página inicial
            </li>
            <li class="flex items-center">
              <span class="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></span>
              Usar a ferramenta de download de thumbnails
            </li>
            <li class="flex items-center">
              <span class="w-1.5 h-1.5 bg-red-600 rounded-full mr-3"></span>
              Entrar em contato conosco se o problema persistir
            </li>
          </ul>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link
            to="/"
            class="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
          >
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Ir para Início
          </router-link>

          <router-link
            to="/tool"
            class="inline-flex items-center justify-center px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 rounded-xl font-semibold transition-all duration-200 transform hover:-translate-y-1 shadow-lg hover:shadow-xl border border-gray-300"
          >
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
              />
            </svg>
            Usar Ferramenta
          </router-link>
        </div>

        <!-- Quick Links -->
        <div class="mt-8 pt-8 border-t border-gray-200">
          <p class="text-sm text-gray-600 mb-3">Links rápidos:</p>
          <div class="flex flex-wrap justify-center gap-4 text-sm">
            <router-link
              to="/sobre"
              class="text-red-600 hover:text-red-700 underline"
              >Sobre</router-link
            >
            <router-link
              to="/contato"
              class="text-red-600 hover:text-red-700 underline"
              >Contato</router-link
            >
            <router-link
              to="/politica-privacidade"
              class="text-red-600 hover:text-red-700 underline"
              >Privacidade</router-link
            >
            <router-link
              to="/termos-uso"
              class="text-red-600 hover:text-red-700 underline"
              >Termos</router-link
            >
          </div>
        </div>
      </div>

      <!-- Error Code -->
      <p class="mt-8 text-gray-500 text-sm">
        Código de erro: 404 - Página não encontrada
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Update page title
  document.title = "404 - Página Não Encontrada | YouTube Thumbnail Downloader";
});
</script>

<style scoped>
/* Animation for 404 icon */
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

svg {
  animation: float 3s ease-in-out infinite;
}
</style>

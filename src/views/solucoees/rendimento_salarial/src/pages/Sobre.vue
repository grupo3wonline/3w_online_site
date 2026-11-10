<template>
  <div class="min-h-screen bg-white dark:bg-gray-900 py-20">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-fade-in">
        <h1
          class="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6"
        >
          Sobre o Projeto
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-300">
          Conheça nossa história e missão
        </p>
      </div>

      <div class="prose prose-lg dark:prose-invert max-w-none">
        <div
          class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl p-8 md:p-12 mb-12"
        >
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Nossa Missão
          </h2>
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            Fornecer uma ferramenta gratuita, moderna e acessível para que todas
            as pessoas possam calcular e compreender melhor seu rendimento
            salarial. Acreditamos que o conhecimento financeiro é fundamental
            para tomar decisões melhores e construir um futuro mais próspero.
          </p>
        </div>

        <div class="space-y-8 mb-12">
          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Por Que Criamos Isto?
            </h2>
            <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Muitas pessoas não sabem exatamente quanto ganham por hora ou por
              dia de trabalho. Essa informação é crucial para:
            </p>
            <ul class="mt-4 space-y-2 text-gray-700 dark:text-gray-300">
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Negociar salários e propostas de trabalho
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Precificar trabalhos freelance de forma justa
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Planejar metas financeiras a longo prazo
              </li>
              <li class="flex items-start">
                <svg
                  class="w-6 h-6 text-green-500 mr-2 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Compreender o valor real do seu tempo
              </li>
            </ul>
          </div>

          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Nossos Valores
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3
                  class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                >
                  🎯 Transparência
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Todos os cálculos são claros e verificáveis. Sem mistérios.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3
                  class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                >
                  🔒 Privacidade
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Seus dados nunca são armazenados ou compartilhados.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3
                  class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                >
                  💡 Simplicidade
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Interface intuitiva que qualquer pessoa pode usar.
                </p>
              </div>
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3
                  class="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                >
                  🚀 Inovação
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  Sempre buscando melhorias e novas funcionalidades.
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Tecnologias Utilizadas
            </h2>
            <p
              class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
            >
              Construímos esta aplicação usando as tecnologias mais modernas e
              eficientes:
            </p>
            <div class="flex flex-wrap gap-3">
              <span
                class="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium"
                >Vue.js 3</span
              >
              <span
                class="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full font-medium"
                >Vite</span
              >
              <span
                class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium"
                >Tailwind CSS</span
              >
              <span
                class="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full font-medium"
                >PWA</span
              >
              <span
                class="px-4 py-2 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-200 rounded-full font-medium"
                >Composition API</span
              >
            </div>
          </div>
        </div>

        <div
          class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center"
        >
          <h2 class="text-3xl font-bold mb-4">Tem Sugestões?</h2>
          <p class="text-xl mb-8">
            Adoraríamos ouvir seu feedback para melhorar ainda mais nossa
            calculadora!
          </p>
          <router-link
            to="/contato"
            class="inline-flex items-center px-8 py-4 bg-white text-indigo-700 font-bold text-lg rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            Entre em Contato
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
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useSEO } from "@/composables/useSEO";

export default {
  name: "SobrePage",
  setup() {
    const { updateSEO } = useSEO();

    onMounted(() => {
      updateSEO({
        title: "Sobre - Calculadora de Rendimento Salarial",
        description:
          "Conheça nossa missão de fornecer uma calculadora salarial gratuita e moderna para todos",
        canonical: "https://app.3wonline.com/rendimentosalarial/sobre",
      });
    });
  },
};
</script>

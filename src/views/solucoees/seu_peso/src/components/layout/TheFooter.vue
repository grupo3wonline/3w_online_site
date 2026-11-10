<template>
  <footer
    class="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <!-- Brand -->
        <div class="md:col-span-1">
          <div class="flex items-center space-x-2 mb-4">
            <div
              class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
            >
              <i class="fas fa-weight text-white text-xl"></i>
            </div>
            <span class="text-xl font-bold">Seu Peso</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Sua ferramenta completa para monitoramento de saúde corporal e
            bem-estar.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Links Rápidos</h3>
          <ul class="space-y-2">
            <li v-for="item in quickLinks" :key="item.path">
              <router-link
                :to="item.path"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Features -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Recursos</h3>
          <ul class="space-y-2 text-gray-400 text-sm">
            <li>✓ Cálculo de IMC</li>
            <li>✓ Metabolismo Basal</li>
            <li>✓ Calorias Diárias</li>
            <li>✓ Peso Ideal</li>
            <li>✓ Necessidades Nutricionais</li>
            <li>✓ Gasto Calórico</li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Legal</h3>
          <ul class="space-y-2">
            <li v-for="item in legalLinks" :key="item.path">
              <router-link
                :to="item.path"
                class="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="border-t border-gray-800 dark:border-gray-700 pt-8 mb-8">
        <div
          class="bg-yellow-900/20 border border-yellow-700/30 rounded-lg p-4"
        >
          <div class="flex items-start space-x-3">
            <svg
              class="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
            <p class="text-xs text-gray-300 leading-relaxed">
              <strong class="text-yellow-500">Aviso Importante:</strong> Esta
              ferramenta fornece estimativas baseadas em fórmulas padrão e não
              substitui o acompanhamento profissional. Sempre consulte médicos,
              nutricionistas ou educadores físicos para orientações
              personalizadas.
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom -->
      <div class="border-t border-gray-800 dark:border-gray-700 pt-8">
        <div
          class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p class="text-gray-400 text-sm text-center md:text-left">
            © {{ currentYear }} Seu Peso. Todos os direitos reservados.
          </p>

          <div class="flex flex-col items-center md:items-end space-y-1">
            <p class="text-gray-400 text-sm text-center md:text-right">
              Desenvolvido com <span class="text-red-500">♥</span> por
              <a
                href="https://www.3wonline.com.br/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
              >
                Grupo 3w Online
              </a>
            </p>
            <p class="text-gray-500 text-xs text-center md:text-right">
              Sistema desenvolvido pelo desenvolvedor 
              <a
                href="https://github.com/willfrombrasil"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary-500 hover:text-primary-400 transition-colors duration-200 font-medium"
              >
                hotwyl - willfrombrasil
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());

const quickLinks = [
  { label: "Início", path: "/" },
  { label: "Calculadora", path: "/calculadora" },
  { label: "Sobre", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];

const legalLinks = [
  { label: "Política de Privacidade", path: "/privacidade" },
  { label: "Termos de Uso", path: "/termos" },
];
</script>

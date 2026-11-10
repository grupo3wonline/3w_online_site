<template>
  <section
    class="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
  >
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h2
          class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Perguntas Frequentes
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-400">
          Tire suas dúvidas sobre nossa calculadora
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700"
        >
          <button
            @click="toggleFAQ(index)"
            class="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            <span class="font-semibold text-gray-900 dark:text-white pr-4">
              {{ faq.question }}
            </span>
            <svg
              :class="{ 'transform rotate-180': openIndex === index }"
              class="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 transition-transform duration-200"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>

          <Transition name="accordion">
            <div v-if="openIndex === index" class="px-6 pb-5">
              <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
                {{ faq.answer }}
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";

const openIndex = ref(null);

const toggleFAQ = (index) => {
  openIndex.value = openIndex.value === index ? null : index;
};

const faqs = [
  {
    question: "Como é calculado o IMC?",
    answer:
      "O IMC (Índice de Massa Corporal) é calculado dividindo seu peso (em kg) pela sua altura (em metros) ao quadrado. É uma medida padrão internacional usada para classificar o peso corporal.",
  },
  {
    question: "Os cálculos são precisos?",
    answer:
      "Sim! Utilizamos fórmulas científicas reconhecidas mundialmente, como a equação de Mifflin-St Jeor para metabolismo basal e a fórmula de Devine para peso ideal. No entanto, são estimativas e não substituem avaliação profissional.",
  },
  {
    question: "Meus dados são armazenados?",
    answer:
      "Não! Todos os cálculos são feitos localmente no seu navegador. Seus dados pessoais não são enviados para servidores externos, garantindo total privacidade e segurança.",
  },
  {
    question: "Posso usar para crianças?",
    answer:
      "Não recomendamos. As fórmulas são calibradas para adultos. Para crianças e adolescentes, consulte um pediatra ou nutricionista, pois eles usam tabelas de crescimento específicas por idade.",
  },
  {
    question: "É necessário criar conta?",
    answer:
      "Não! Nossa calculadora é 100% gratuita e não requer cadastro. Basta acessar, inserir seus dados e receber os resultados instantaneamente.",
  },
  {
    question: "Posso confiar nos resultados?",
    answer:
      "Os resultados são estimativas baseadas em fórmulas validadas cientificamente. São excelentes para acompanhamento geral, mas sempre consulte profissionais de saúde para orientações personalizadas e diagnósticos precisos.",
  },
];
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 300px;
  overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>

<template>
  <section id="faq" class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <span
          class="text-purple-600 font-semibold text-sm uppercase tracking-wider"
          >Dúvidas Frequentes</span
        >
        <h2 class="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900">
          Segurança, Facilidade e Suporte de Verdade
        </h2>
        <p class="mt-4 text-xl text-gray-600">
          Veja por que milhares de criadores confiam no SRT Converter Pro — e
          conte com nosso suporte humano sempre que precisar.
        </p>
      </div>

      <!-- FAQ Accordion -->
      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="border border-gray-200 rounded-xl overflow-hidden hover:border-purple-300 transition-colors"
        >
          <button
            @click="toggleFaq(index)"
            class="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span class="text-lg font-semibold text-gray-900">{{
              faq.question
            }}</span>
            <svg
              class="w-6 h-6 text-purple-600 transform transition-transform duration-200"
              :class="{ 'rotate-180': openFaq === index }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <transition
            enter-active-class="transition-all duration-300 ease-out"
            leave-active-class="transition-all duration-200 ease-in"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-show="openFaq === index" class="px-6 pb-5">
              <p class="text-gray-600 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </transition>
        </div>
      </div>

      <!-- Still Have Questions CTA -->
      <div
        class="mt-12 text-center p-8 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl"
      >
        <h3 class="text-2xl font-bold text-gray-900 mb-3">
          Ainda tem dúvidas?
        </h3>
        <p class="text-gray-600 mb-6">
          Nossa equipe está pronta para ajudar você a aproveitar ao máximo o
          conversor
        </p>
        <BaseButton
          variant="outline"
          size="lg"
          @click="$router.push('/contato')"
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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          Entre em Contato
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import BaseButton from "../common/BaseButton.vue";

const openFaq = ref<number | null>(null);

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index;
};

const faqs = [
  {
    question: "O SRT Converter Pro é realmente gratuito?",
    answer:
      "Sim! A ferramenta é 100% gratuita, sem limites de uso, sem cadastro e sem pegadinhas.",
  },
  {
    question: "Meus dados e roteiros são enviados para algum servidor?",
    answer:
      "Não. Todo o processamento é feito localmente no seu navegador. Seus roteiros nunca saem do seu computador, garantindo privacidade total.",
  },
  {
    question: "Preciso instalar algo ou criar conta?",
    answer:
      "Não. Basta acessar o site, colar seu roteiro e converter. Não exigimos cadastro nem instalação.",
  },
  {
    question: "Posso usar para vídeos longos?",
    answer:
      "Sim! Não há limite de tamanho para o roteiro. O algoritmo foi otimizado para processar textos grandes rapidamente.",
  },
  {
    question: "O arquivo SRT gerado é compatível com quais plataformas?",
    answer:
      "O SRT gerado segue o padrão internacional e pode ser usado em YouTube, Vimeo, Premiere, Final Cut, DaVinci Resolve e muitos outros.",
  },
  {
    question: "E se eu tiver dúvidas ou problemas?",
    answer:
      "Conte com nosso suporte humano e rápido! Basta acessar a página de contato e falar diretamente com nossa equipe.",
  },
];
</script>

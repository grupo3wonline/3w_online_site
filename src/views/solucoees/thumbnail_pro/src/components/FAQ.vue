<template>
  <section id="faq" class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Perguntas Frequentes
        </h2>
        <p class="text-xl text-gray-600">
          Tudo o que você precisa saber sobre o ThumbnailPro
        </p>
      </div>

      <div class="space-y-4">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="card overflow-hidden"
        >
          <button
            @click="toggleFAQ(index)"
            class="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            :aria-expanded="openIndex === index"
          >
            <span class="text-lg font-semibold text-gray-900 pr-4">
              {{ faq.question }}
            </span>
            <ChevronDown
              class="w-5 h-5 text-youtube-red transition-transform flex-shrink-0"
              :class="{ 'transform rotate-180': openIndex === index }"
            />
          </button>
          <Transition name="fade-slide">
            <div v-if="openIndex === index" class="px-6 pb-5">
              <p class="text-gray-700 leading-relaxed">{{ faq.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from "vue";
import { ChevronDown } from "lucide-vue-next";

export default {
  name: "FAQ",
  components: { ChevronDown },
  setup() {
    const openIndex = ref(null);

    const faqs = [
      {
        question: "O ThumbnailPro é realmente gratuito?",
        answer:
          "Sim! Nosso serviço é 100% gratuito e sem limites. Você pode extrair quantos thumbnails quiser, sem necessidade de cadastro ou pagamento.",
      },
      {
        question: "Preciso criar uma conta para usar?",
        answer:
          "Não! Você pode usar o ThumbnailPro imediatamente sem criar conta, fazer login ou fornecer dados pessoais. É completamente anônimo e direto.",
      },
      {
        question: "Quais resoluções de thumbnails estão disponíveis?",
        answer:
          "Oferecemos thumbnails em várias resoluções: 120x90, 320x180, 480x360, 640x480, 1280x720 (HD) e 1920x1080 (Full HD), quando disponíveis no vídeo.",
      },
      {
        question: "É legal extrair thumbnails do YouTube?",
        answer:
          "Sim, as thumbnails são imagens públicas disponibilizadas pelo YouTube. No entanto, você deve respeitar os direitos autorais ao usar as imagens. Use-as de acordo com os termos de uso do YouTube e do criador do conteúdo.",
      },
      {
        question: "Os thumbnails são armazenados nos seus servidores?",
        answer:
          "Não! Não armazenamos nenhuma imagem. As thumbnails são baixadas diretamente dos servidores do YouTube para o seu dispositivo. Valorizamos sua privacidade.",
      },
      {
        question: "Posso usar em dispositivos móveis?",
        answer:
          "Sim! Nossa ferramenta é totalmente responsiva e funciona perfeitamente em smartphones, tablets e computadores. Use em qualquer dispositivo com navegador web.",
      },
      {
        question: "Há limite de downloads por dia?",
        answer:
          "Não há limites! Você pode extrair e baixar quantos thumbnails precisar, quando quiser. Use nossa ferramenta livremente.",
      },
      {
        question: "Como posso obter a URL de um vídeo do YouTube?",
        answer:
          'Copie a URL diretamente da barra de endereços do navegador quando estiver assistindo o vídeo, ou clique com o botão direito no vídeo e selecione "Copiar URL do vídeo".',
      },
      {
        question: "Por que alguns vídeos não funcionam?",
        answer:
          "Alguns vídeos privados, restritos ou removidos podem não funcionar. Certifique-se de que o vídeo é público e a URL está correta.",
      },
      {
        question: "Vocês coletam meus dados?",
        answer:
          "Coletamos apenas dados mínimos necessários para o funcionamento do site (como análise de uso com Google Analytics, se você consentir). Leia nossa Política de Privacidade para detalhes completos sobre LGPD.",
      },
      {
        question: "Posso usar as thumbnails para fins comerciais?",
        answer:
          "Isso depende dos direitos autorais do vídeo original. Verifique com o criador do conteúdo antes de usar thumbnails para fins comerciais. Não nos responsabilizamos pelo uso das imagens.",
      },
      {
        question: "Como posso entrar em contato?",
        answer:
          "Entre em contato através do formulário de contato no site ou envie email para contato@3wonline.com.br. Respondemos rapidamente!",
      },
    ];

    const toggleFAQ = (index) => {
      openIndex.value = openIndex.value === index ? null : index;
    };

    return {
      faqs,
      openIndex,
      toggleFAQ,
    };
  },
};
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

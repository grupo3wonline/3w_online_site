<template>
  <section class="py-20 bg-gradient-to-br from-gray-50 to-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          O Que Nossos Usuários Dizem
        </h2>
        <p class="text-xl text-gray-600">
          Milhares de pessoas já confiam no ThumbnailPro
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="card p-8 hover:shadow-2xl transition-all duration-300"
        >
          <div class="flex items-center mb-6">
            <div class="relative">
              <div
                class="w-16 h-16 gradient-bg rounded-full flex items-center justify-center text-white text-2xl font-bold"
              >
                {{ testimonial.initials }}
              </div>
              <div
                class="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"
              ></div>
            </div>
            <div class="ml-4">
              <h3 class="font-bold text-gray-900">{{ testimonial.name }}</h3>
              <p class="text-sm text-gray-600">{{ testimonial.role }}</p>
            </div>
          </div>

          <div class="flex items-center mb-4">
            <Star
              v-for="n in 5"
              :key="n"
              class="w-5 h-5 text-yellow-400 fill-current"
            />
          </div>

          <p class="text-gray-700 leading-relaxed mb-4">
            "{{ testimonial.text }}"
          </p>

          <div class="flex items-center text-sm text-gray-500">
            <Calendar class="w-4 h-4 mr-2" />
            {{ testimonial.date }}
          </div>
        </div>
      </div>

      <!-- Estatísticas -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="text-4xl font-bold text-youtube-red mb-2">50K+</div>
          <div class="text-gray-600">Usuários Ativos</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-youtube-red mb-2">500K+</div>
          <div class="text-gray-600">Thumbnails Extraídos</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-youtube-red mb-2">4.8/5</div>
          <div class="text-gray-600">Avaliação Média</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-bold text-youtube-red mb-2">99.9%</div>
          <div class="text-gray-600">Uptime</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Star, Calendar } from "lucide-vue-next";

export default {
  name: "Testimonials",
  components: { Star, Calendar },
  setup() {
    const testimonials = [
      {
        name: "Carlos Silva",
        initials: "CS",
        role: "YouTuber",
        text: "Ferramenta incrível! Uso diariamente para pegar referências de thumbnails. Muito rápida e fácil de usar. Recomendo!",
        date: "Setembro 2025",
      },
      {
        name: "Ana Paula",
        initials: "AP",
        role: "Designer Gráfica",
        text: "Perfeita para meu trabalho! Consigo baixar thumbnails em alta qualidade para análise de concorrência. Interface linda!",
        date: "Setembro 2025",
      },
      {
        name: "João Marcos",
        initials: "JM",
        role: "Marketing Digital",
        text: "Excelente ferramenta! Uso para estudar estratégias de thumbnails dos melhores canais. Grátis e sem enrolação.",
        date: "Outubro 2025",
      },
      {
        name: "Mariana Costa",
        initials: "MC",
        role: "Criadora de Conteúdo",
        text: "Simplesmente a melhor! Já tentei outras ferramentas, mas essa é disparada a mais prática e eficiente.",
        date: "Agosto 2025",
      },
      {
        name: "Pedro Henrique",
        initials: "PH",
        role: "Desenvolvedor",
        text: "Interface moderna, código limpo e performance excelente. Parabéns aos desenvolvedores!",
        date: "Outubro 2025",
      },
      {
        name: "Juliana Santos",
        initials: "JS",
        role: "Social Media",
        text: "Uso todos os dias no meu trabalho. Economiza muito tempo e é super confiável. Indispensável!",
        date: "Setembro 2025",
      },
    ];

    return {
      testimonials,
    };
  },
};
</script>

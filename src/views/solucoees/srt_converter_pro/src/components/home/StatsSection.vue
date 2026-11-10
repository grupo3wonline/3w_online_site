<template>
  <section
    class="py-20 bg-gradient-to-br from-purple-600 to-indigo-800 relative overflow-hidden"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div
        class="absolute inset-0"
        style="
          background-image: radial-gradient(
            circle at 2px 2px,
            white 1px,
            transparent 0
          );
          background-size: 40px 40px;
        "
      ></div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Números que Comprovam Nossa Excelência
        </h2>
        <p class="text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
          Milhares de profissionais confiam em nossa plataforma todos os dias
        </p>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Stat 1: Total Users -->
        <div class="text-center group">
          <div
            class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div class="mb-4">
              <svg
                class="w-12 h-12 mx-auto text-yellow-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div class="text-5xl font-bold text-white mb-2" ref="usersCount">
              {{ animatedUsers }}
            </div>
            <div class="text-purple-200 text-lg">Usuários Ativos</div>
          </div>
        </div>

        <!-- Stat 2: Conversions -->
        <div class="text-center group">
          <div
            class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div class="mb-4">
              <svg
                class="w-12 h-12 mx-auto text-green-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div
              class="text-5xl font-bold text-white mb-2"
              ref="conversionsCount"
            >
              {{ animatedConversions }}
            </div>
            <div class="text-purple-200 text-lg">Conversões Realizadas</div>
          </div>
        </div>

        <!-- Stat 3: Satisfaction -->
        <div class="text-center group">
          <div
            class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div class="mb-4">
              <svg
                class="w-12 h-12 mx-auto text-pink-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
            </div>
            <div
              class="text-5xl font-bold text-white mb-2"
              ref="satisfactionCount"
            >
              {{ animatedSatisfaction }}%
            </div>
            <div class="text-purple-200 text-lg">Taxa de Satisfação</div>
          </div>
        </div>

        <!-- Stat 4: Time Saved -->
        <div class="text-center group">
          <div
            class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <div class="mb-4">
              <svg
                class="w-12 h-12 mx-auto text-blue-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div
              class="text-5xl font-bold text-white mb-2"
              ref="timeSavedCount"
            >
              {{ animatedTimeSaved }}h
            </div>
            <div class="text-purple-200 text-lg">Horas Economizadas</div>
          </div>
        </div>
      </div>

      <!-- Additional Info -->
      <div class="mt-16 text-center">
        <p class="text-lg text-purple-100 mb-6">
          Junte-se a milhares de profissionais que já transformaram seu fluxo de
          trabalho
        </p>
        <RouterLink
          to="/converter"
          class="inline-flex items-center px-8 py-4 text-lg font-semibold text-purple-600 bg-white rounded-full hover:bg-purple-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Comece Agora Gratuitamente
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
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

// Target values
const targetUsers = 50000;
const targetConversions = 1200000;
const targetSatisfaction = 98;
const targetTimeSaved = 250000;

// Animated values
const animatedUsers = ref(0);
const animatedConversions = ref(0);
const animatedSatisfaction = ref(0);
const animatedTimeSaved = ref(0);

// Animation function
const animateValue = (
  start: number,
  end: number,
  duration: number,
  callback: (value: number) => void
) => {
  const startTime = Date.now();
  const range = end - start;

  const animate = () => {
    const now = Date.now();
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function (easeOutExpo)
    const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    const current = Math.floor(start + range * easeOutExpo);

    callback(current);

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};

// Format number with thousands separator
const formatNumber = (num: number): string => {
  return num.toLocaleString("pt-BR");
};

// Intersection Observer for triggering animation when section is visible
onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Start animations
          animateValue(0, targetUsers, 2000, (value) => {
            animatedUsers.value = formatNumber(value) as any;
          });

          animateValue(0, targetConversions, 2500, (value) => {
            animatedConversions.value = formatNumber(value) as any;
          });

          animateValue(0, targetSatisfaction, 1500, (value) => {
            animatedSatisfaction.value = value;
          });

          animateValue(0, targetTimeSaved, 2200, (value) => {
            animatedTimeSaved.value = formatNumber(value) as any;
          });

          // Unobserve after animation starts
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  // Observe the stats section
  const section = document.querySelector("section");
  if (section) {
    observer.observe(section);
  }
});
</script>

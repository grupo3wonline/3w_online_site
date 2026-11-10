<script setup lang="ts">
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { storeToRefs } from 'pinia';
import Swal from 'sweetalert2';
import { useCalculatorStore } from '@/stores/calculator';
import { useThemeStore } from '@/stores/theme';
import { useUiStore } from '@/stores/ui';
import { generatePDF } from '@/utils/pdfGenerator';

const calculator = useCalculatorStore();
const { userData, metrics } = storeToRefs(calculator);
const theme = useThemeStore();
const ui = useUiStore();

function bmiColor(bmi: number): string {
  if (bmi < 18.5) return 'text-blue-400';
  if (bmi < 25) return 'text-green-400';
  if (bmi < 30) return 'text-yellow-400';
  return 'text-red-400';
}

function bmiHex(bmi: number): string {
  if (bmi < 18.5) return '#60a5fa';
  if (bmi < 25) return '#34d399';
  if (bmi < 30) return '#fbbf24';
  return '#f87171';
}

// Posição do marcador na escala de IMC (15 a 40)
const bmiMarkerPos = computed(() => {
  if (!metrics.value) return 0;
  const clamped = Math.min(Math.max(metrics.value.bmi, 15), 40);
  return ((clamped - 15) / (40 - 15)) * 100;
});

// Gauge radial do IMC
const bmiSeries = computed(() => {
  if (!metrics.value) return [0];
  return [Math.min(Math.round((metrics.value.bmi / 40) * 100), 100)];
});

const bmiOptions = computed(() => ({
  chart: { type: 'radialBar' as const, sparkline: { enabled: true } },
  plotOptions: {
    radialBar: {
      hollow: { size: '58%' },
      track: { background: theme.darkMode ? '#374151' : '#e5e7eb' },
      dataLabels: {
        name: { show: true, color: theme.darkMode ? '#9ca3af' : '#6b7280', fontSize: '13px' },
        value: {
          show: true,
          color: theme.darkMode ? '#fff' : '#111827',
          fontSize: '26px',
          fontWeight: 700,
          formatter: () => (metrics.value ? String(metrics.value.bmi) : '0'),
        },
      },
    },
  },
  labels: [metrics.value?.bmiCategory ?? ''],
  colors: [metrics.value ? bmiHex(metrics.value.bmi) : '#34d399'],
  stroke: { lineCap: 'round' as const },
}));

// Donut de macros (g de proteína, carbo, gordura)
const macroSeries = computed(() => {
  if (!metrics.value) return [0, 0, 0];
  return [metrics.value.dailyProtein, metrics.value.dailyCarbs, metrics.value.dailyFat];
});

const macroOptions = computed(() => ({
  chart: { type: 'donut' as const },
  labels: ['Proteína (g)', 'Carboidratos (g)', 'Gordura (g)'],
  colors: ['#f87171', '#fbbf24', '#818cf8'],
  legend: { position: 'bottom' as const, labels: { colors: theme.darkMode ? '#d1d5db' : '#374151' } },
  dataLabels: { enabled: true, formatter: (val: number) => `${Math.round(val)}%` },
  stroke: { width: 2, colors: [theme.darkMode ? '#1f2937' : '#fff'] },
  plotOptions: { pie: { donut: { size: '62%' } } },
}));

const highlightCards = computed(() => {
  if (!metrics.value) return [];
  return [
    {
      icon: 'fa6-solid:fire-flame-curved',
      color: 'text-orange-400',
      title: 'Metabolismo Basal (TMB)',
      value: `${metrics.value.bmr}`,
      sub: 'kcal em repouso',
    },
    {
      icon: 'fa6-solid:person-running',
      color: 'text-emerald-400',
      title: 'Gasto Total (TDEE)',
      value: `${metrics.value.tdee}`,
      sub: 'kcal com atividade',
    },
    {
      icon: 'fa6-solid:percent',
      color: 'text-pink-400',
      title: 'Gordura Corporal',
      value: `${metrics.value.bodyFat}%`,
      sub: 'estimativa (Deurenberg)',
    },
    {
      icon: 'fa6-solid:bullseye',
      color: 'text-brand-400',
      title: metrics.value.goalLabel,
      value: `${metrics.value.goalCalories}`,
      sub: 'kcal-alvo por dia',
    },
  ];
});

const dailyCards = computed(() => {
  if (!metrics.value) return [];
  return [
    {
      icon: 'fa6-solid:droplet',
      color: 'text-blue-400',
      title: 'Água Diária',
      value: `${metrics.value.dailyWater}L`,
      sub: `Peso ideal: ${metrics.value.idealWeight.min}-${metrics.value.idealWeight.max} kg`,
    },
    {
      icon: 'fa6-solid:drumstick-bite',
      color: 'text-red-400',
      title: 'Proteína',
      value: `${metrics.value.dailyProtein}g`,
      sub: 'por dia',
    },
    {
      icon: 'fa6-solid:wheat-awn',
      color: 'text-yellow-400',
      title: 'Carboidratos',
      value: `${metrics.value.dailyCarbs}g`,
      sub: 'por dia',
    },
    {
      icon: 'fa6-solid:bacon',
      color: 'text-indigo-400',
      title: 'Gorduras',
      value: `${metrics.value.dailyFat}g`,
      sub: 'por dia',
    },
  ];
});

const meals = computed(() => {
  if (!metrics.value) return [];
  const m = metrics.value.mealPlan;
  return [
    { label: 'Café da Manhã', color: 'text-purple-300', data: m.breakfast },
    { label: 'Almoço', color: 'text-green-300', data: m.lunch },
    { label: 'Jantar', color: 'text-blue-300', data: m.dinner },
    { label: 'Lanches', color: 'text-yellow-300', data: m.snacks },
  ];
});

async function handleGeneratePDF() {
  if (!metrics.value) return;
  ui.startLoading('Gerando seu relatório em PDF...');
  try {
    await generatePDF(userData.value, metrics.value);
  } finally {
    ui.stopLoading();
  }
}

async function handleShare() {
  if (!metrics.value) return;
  const m = metrics.value;
  const text = `Meu plano de saúde 💪
IMC: ${m.bmi} (${m.bmiCategory})
Gordura corporal: ${m.bodyFat}%
Metabolismo basal: ${m.bmr} kcal
Meta (${m.goalLabel}): ${m.goalCalories} kcal/dia
Calculado em: https://www.3wonline.com.br/calculadora_saude/`;

  try {
    if (navigator.share) {
      await navigator.share({ title: 'Calculadora de Saúde', text });
    } else {
      await navigator.clipboard.writeText(text);
      Swal.fire({
        icon: 'success',
        title: 'Copiado!',
        text: 'Seu resumo foi copiado para a área de transferência.',
        timer: 1600,
        showConfirmButton: false,
      });
    }
  } catch {
    /* usuário cancelou o compartilhamento */
  }
}
</script>

<template>
  <section
    id="resultados"
    class="scroll-mt-24 bg-gray-900 px-4 py-20"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-12 text-center">
        <span
          class="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-500/20 px-4 py-1.5 text-sm font-semibold text-brand-300"
        >
          <Icon
            icon="fa6-solid:circle-check"
            aria-hidden="true"
          />
          Análise concluída
        </span>
        <h2 class="text-3xl font-bold text-white md:text-4xl">
          Seu Plano de Saúde Personalizado
        </h2>
        <p class="mt-2 text-lg text-gray-400">
          Recomendações calculadas para o seu perfil e objetivo
        </p>
      </div>

      <template v-if="metrics">
        <!-- IMC: gauge + escala -->
        <div
          class="mb-8 grid grid-cols-1 items-center gap-8 rounded-3xl border border-gray-700 bg-gray-800/60 p-6 md:grid-cols-2 md:p-8"
        >
          <div class="mx-auto w-full max-w-[240px]">
            <apexchart
              type="radialBar"
              height="240"
              :options="bmiOptions"
              :series="bmiSeries"
            />
          </div>
          <div>
            <h3 class="text-2xl font-bold text-white">
              Índice de Massa Corporal
            </h3>
            <p class="mb-1 text-gray-300">
              Classificação OMS
            </p>
            <p
              class="mb-4 text-lg font-semibold"
              :class="bmiColor(metrics.bmi)"
            >
              {{ metrics.bmiCategory }} — {{ metrics.bmiRisk }}
            </p>
            <!-- Escala visual -->
            <div class="relative h-3 w-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-red-400">
              <div
                class="absolute -top-1 h-5 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-lg ring-2 ring-gray-900"
                :style="{ left: `${bmiMarkerPos}%` }"
              />
            </div>
            <div class="mt-2 flex justify-between text-xs text-gray-400">
              <span>15</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
            </div>
          </div>
        </div>

        <!-- Cards de destaque (TMB, TDEE, gordura, objetivo) -->
        <div class="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div
            v-for="card in highlightCards"
            :key="card.title"
            class="rounded-2xl border border-gray-700 bg-gray-800 p-5 transition-all hover:border-gray-600"
          >
            <Icon
              :icon="card.icon"
              class="mb-3 text-2xl"
              :class="card.color"
              aria-hidden="true"
            />
            <div
              class="text-2xl font-bold"
              :class="card.color"
            >
              {{ card.value }}
            </div>
            <div class="mt-1 text-sm font-medium text-white">
              {{ card.title }}
            </div>
            <div class="text-xs text-gray-400">
              {{ card.sub }}
            </div>
          </div>
        </div>

        <!-- Macros: donut + cards -->
        <div class="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div class="rounded-3xl border border-gray-700 bg-gray-800 p-6">
            <h3 class="mb-4 flex items-center gap-2 text-xl font-bold text-white">
              <Icon
                icon="fa6-solid:chart-pie"
                class="text-brand-400"
                aria-hidden="true"
              />
              Distribuição de Macros
            </h3>
            <apexchart
              type="donut"
              height="300"
              :options="macroOptions"
              :series="macroSeries"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div
              v-for="card in dailyCards"
              :key="card.title"
              class="flex flex-col justify-center rounded-2xl border border-gray-700 bg-gray-800 p-5"
            >
              <Icon
                :icon="card.icon"
                class="mb-2 text-2xl"
                :class="card.color"
                aria-hidden="true"
              />
              <div
                class="text-2xl font-bold"
                :class="card.color"
              >
                {{ card.value }}
              </div>
              <div class="text-sm font-medium text-white">
                {{ card.title }}
              </div>
              <div class="text-xs text-gray-400">
                {{ card.sub }}
              </div>
            </div>
          </div>
        </div>

        <!-- Plano de refeições -->
        <div class="mb-8 rounded-3xl border border-gray-700 bg-gray-800 p-6 md:p-8">
          <div class="mb-6 flex items-center gap-3">
            <Icon
              icon="fa6-solid:utensils"
              class="text-2xl text-purple-400"
              aria-hidden="true"
            />
            <h3 class="text-2xl font-bold text-white">
              Divisão de Refeições
            </h3>
          </div>
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="meal in meals"
              :key="meal.label"
              class="rounded-xl bg-gray-700/70 p-4"
            >
              <h4
                class="mb-3 font-semibold"
                :class="meal.color"
              >
                {{ meal.label }}
              </h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-300">Calorias:</span>
                  <span class="font-medium text-white">{{ meal.data.calories }} kcal</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Proteína:</span>
                  <span class="font-medium text-white">{{ meal.data.protein }}g</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-300">Carboidratos:</span>
                  <span class="font-medium text-white">{{ meal.data.carbs }}g</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            class="inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-green-700 hover:to-green-800"
            @click="handleGeneratePDF"
          >
            <Icon
              icon="fa6-solid:file-arrow-down"
              class="text-xl"
              aria-hidden="true"
            />
            Gerar Relatório PDF
          </button>
          <button
            class="inline-flex items-center gap-3 rounded-xl border border-gray-600 bg-gray-800 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-gray-700"
            @click="handleShare"
          >
            <Icon
              icon="fa6-solid:share-nodes"
              class="text-xl"
              aria-hidden="true"
            />
            Compartilhar Resultado
          </button>
        </div>
      </template>
    </div>
  </section>
</template>

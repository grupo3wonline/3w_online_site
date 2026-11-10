<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { Icon } from '@iconify/vue';
import Swal from 'sweetalert2';
import { vMaska } from 'maska/vue';
import HelpTooltip from '@/components/common/HelpTooltip.vue';
import { userDataSchema } from '@/utils/validation';
import { useCalculatorStore } from '@/stores/calculator';
import { useUiStore } from '@/stores/ui';
import type { ActivityLevel, Gender, Goal } from '@/types';

const calculator = useCalculatorStore();
const ui = useUiStore();

const { handleSubmit, errors, defineField, resetForm, meta, setValues } = useForm({
  validationSchema: toTypedSchema(userDataSchema),
  initialValues: {
    height: undefined,
    weight: undefined,
    age: undefined,
    gender: undefined,
    activityLevel: undefined,
    goal: undefined,
  },
});

const [height, heightAttrs] = defineField('height');
const [weight, weightAttrs] = defineField('weight');
const [age, ageAttrs] = defineField('age');
const [gender, genderAttrs] = defineField('gender');
const [activityLevel, activityAttrs] = defineField('activityLevel');
const [goal] = defineField('goal');

const isValid = computed(() => meta.value.valid);

const activityOptions: { value: ActivityLevel; label: string }[] = [
  { value: 'sedentary', label: 'Sedentário (pouco ou nenhum exercício)' },
  { value: 'light', label: 'Leve (exercício leve 1-3 dias/semana)' },
  { value: 'moderate', label: 'Moderado (exercício 3-5 dias/semana)' },
  { value: 'active', label: 'Ativo (exercício 6-7 dias/semana)' },
  { value: 'very-active', label: 'Muito Ativo (exercício intenso, 2x/dia)' },
];

const goalOptions: { value: Goal; label: string; icon: string }[] = [
  { value: 'lose', label: 'Perder peso', icon: 'fa6-solid:arrow-trend-down' },
  { value: 'maintain', label: 'Manter peso', icon: 'fa6-solid:equals' },
  { value: 'gain', label: 'Ganhar massa', icon: 'fa6-solid:arrow-trend-up' },
];

onMounted(() => {
  const saved = calculator.getSavedData();
  if (saved && saved.height) {
    calculator.persist = true;
    setValues({
      height: saved.height || undefined,
      weight: saved.weight || undefined,
      age: saved.age || undefined,
      gender: (saved.gender || undefined) as Gender | undefined,
      activityLevel: (saved.activityLevel || undefined) as ActivityLevel | undefined,
      goal: (saved.goal || undefined) as Goal | undefined,
    });
  }
});

const onSubmit = handleSubmit((values) => {
  ui.startLoading('Calculando seus resultados...');
  Swal.fire({
    icon: 'success',
    title: 'Calculando seu plano de saúde!',
    text: 'Seus resultados personalizados estão sendo preparados com precisão.',
    confirmButtonText: 'Ver Meus Resultados',
    confirmButtonColor: '#059669',
    timer: 1400,
    timerProgressBar: true,
    willClose: () => {
      calculator.calculate({
        height: Number(values.height),
        weight: Number(values.weight),
        age: Number(values.age),
        gender: values.gender as Gender,
        activityLevel: values.activityLevel as ActivityLevel,
        goal: values.goal as Goal,
      });
      ui.stopLoading();
      setTimeout(() => {
        document.getElementById('resultados')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
  });
});

function handleClear() {
  Swal.fire({
    icon: 'question',
    title: 'Deseja limpar o formulário?',
    text: 'Todos os dados que você inseriu serão apagados.',
    showCancelButton: true,
    confirmButtonText: 'Sim, limpar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#6b7280',
  }).then((result) => {
    if (result.isConfirmed) {
      resetForm();
      calculator.clear();
      calculator.persist = false;
      Swal.fire({
        icon: 'success',
        title: 'Prontinho!',
        text: 'O formulário foi limpo e está pronto para começar de novo.',
        timer: 1400,
        showConfirmButton: false,
      });
    }
  });
}

const inputClass =
  'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 transition-all placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/40 dark:border-gray-600 dark:bg-gray-700/70 dark:text-white';
</script>

<template>
  <section
    id="calculadora"
    class="scroll-mt-24 bg-white px-4 py-20 dark:bg-gray-900"
  >
    <div class="mx-auto max-w-2xl">
      <div class="mb-8 text-center">
        <span
          class="mb-4 inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
        >
          <Icon
            icon="fa6-solid:wand-magic-sparkles"
            aria-hidden="true"
          />
          Análise gratuita e instantânea
        </span>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
          Monte Seu Plano de Saúde
        </h2>
        <p class="mt-2 text-gray-600 dark:text-gray-400">
          Preencha os campos e receba IMC, gordura corporal, metabolismo e metas de nutrição
          personalizadas ao seu objetivo.
        </p>
      </div>

      <div
        class="rounded-3xl border border-gray-200 bg-gray-50/80 p-6 shadow-xl ring-1 ring-black/5 dark:border-gray-700 dark:bg-gray-800/80 md:p-8"
      >
        <form
          autocomplete="off"
          novalidate
          class="space-y-6"
          @submit="onSubmit"
        >
          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                for="height"
                class="mb-2 flex items-center gap-2 font-medium text-gray-900 dark:text-white"
              >
                Sua Altura (cm)
                <HelpTooltip content="Insira sua altura em centímetros. Exemplo: 175 para 1,75m." />
              </label>
              <input
                id="height"
                v-model="height"
                v-bind="heightAttrs"
                v-maska
                data-maska="###"
                type="text"
                inputmode="numeric"
                placeholder="Ex: 175"
                autocomplete="off"
                :class="inputClass"
              >
              <p
                v-if="errors.height"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.height }}
              </p>
            </div>

            <div>
              <label
                for="weight"
                class="mb-2 flex items-center gap-2 font-medium text-gray-900 dark:text-white"
              >
                Seu Peso (kg)
                <HelpTooltip content="Insira seu peso atual em quilogramas. Exemplo: 70" />
              </label>
              <input
                id="weight"
                v-model="weight"
                v-bind="weightAttrs"
                v-maska
                data-maska="###"
                type="text"
                inputmode="numeric"
                placeholder="Ex: 70"
                autocomplete="off"
                :class="inputClass"
              >
              <p
                v-if="errors.weight"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.weight }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                for="age"
                class="mb-2 flex items-center gap-2 font-medium text-gray-900 dark:text-white"
              >
                Sua Idade
                <HelpTooltip
                  content="Sua idade em anos é importante para calcularmos suas necessidades calóricas."
                />
              </label>
              <input
                id="age"
                v-model="age"
                v-bind="ageAttrs"
                v-maska
                data-maska="###"
                type="text"
                inputmode="numeric"
                placeholder="Ex: 30"
                autocomplete="off"
                :class="inputClass"
              >
              <p
                v-if="errors.age"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.age }}
              </p>
            </div>

            <div>
              <label
                for="gender"
                class="mb-2 flex items-center gap-2 font-medium text-gray-900 dark:text-white"
              >
                Sexo
                <HelpTooltip content="Homens e mulheres possuem necessidades calóricas diferentes." />
              </label>
              <select
                id="gender"
                v-model="gender"
                v-bind="genderAttrs"
                autocomplete="off"
                :class="inputClass"
              >
                <option value="">
                  Selecione seu sexo
                </option>
                <option value="male">
                  Masculino
                </option>
                <option value="female">
                  Feminino
                </option>
              </select>
              <p
                v-if="errors.gender"
                class="mt-1 text-sm text-red-500"
              >
                {{ errors.gender }}
              </p>
            </div>
          </div>

          <div>
            <label
              for="activityLevel"
              class="mb-2 flex items-center gap-2 font-medium text-gray-900 dark:text-white"
            >
              Nível de Atividade Física
              <HelpTooltip
                content="Selecione seu nível de atividade para um cálculo de calorias mais preciso."
              />
            </label>
            <select
              id="activityLevel"
              v-model="activityLevel"
              v-bind="activityAttrs"
              autocomplete="off"
              :class="inputClass"
            >
              <option value="">
                Selecione sua rotina
              </option>
              <option
                v-for="opt in activityOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
            <p
              v-if="errors.activityLevel"
              class="mt-1 text-sm text-red-500"
            >
              {{ errors.activityLevel }}
            </p>
          </div>

          <!-- Objetivo: seleção visual -->
          <div>
            <span class="mb-2 flex items-center gap-2 font-medium text-gray-900 dark:text-white">
              Qual é o seu objetivo?
              <HelpTooltip
                content="Ajustamos suas calorias-alvo: déficit para perder, superávit para ganhar massa."
              />
            </span>
            <div
              class="grid grid-cols-3 gap-3"
              role="radiogroup"
              aria-label="Objetivo"
            >
              <button
                v-for="opt in goalOptions"
                :key="opt.value"
                type="button"
                role="radio"
                :aria-checked="goal === opt.value"
                class="flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-4 text-center text-sm font-medium transition-all"
                :class="
                  goal === opt.value
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/30 dark:text-brand-300'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-brand-300 dark:border-gray-600 dark:bg-gray-700/60 dark:text-gray-300'
                "
                @click="goal = opt.value"
              >
                <Icon
                  :icon="opt.icon"
                  class="text-2xl"
                  aria-hidden="true"
                />
                {{ opt.label }}
              </button>
            </div>
            <p
              v-if="errors.goal"
              class="mt-1 text-sm text-red-500"
            >
              {{ errors.goal }}
            </p>
          </div>

          <!-- Salvar dados (opt-in) -->
          <label
            class="flex cursor-pointer items-center gap-3 rounded-xl bg-gray-100 p-3 text-sm text-gray-700 dark:bg-gray-700/50 dark:text-gray-300"
          >
            <input
              v-model="calculator.persist"
              type="checkbox"
              class="accent-brand-600"
            >
            <span>
              Salvar meus dados neste dispositivo para a próxima visita
              <span class="block text-xs text-gray-500 dark:text-gray-400">
                Fica apenas no seu navegador (localStorage). Você pode limpar quando quiser.
              </span>
            </span>
          </label>

          <div class="flex flex-col gap-4 pt-2 sm:flex-row">
            <button
              type="submit"
              :disabled="!isValid"
              class="btn-primary flex-1"
            >
              <Icon
                icon="fa6-solid:calculator"
                aria-hidden="true"
              />
              Calcular Meu Plano
            </button>
            <button
              type="button"
              class="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-red-600 hover:to-red-700 sm:flex-none"
              @click="handleClear"
            >
              <Icon
                icon="fa6-solid:rotate"
                aria-hidden="true"
              />
              Limpar
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<template>
  <div class="max-w-4xl mx-auto">
    <BaseCard
      title="Calculadora de Custos para Freelancers"
      icon="fa-calculator"
    >
      <div class="space-y-6">
        <p class="text-gray-600">
          Calcule o valor ideal da sua hora de trabalho como freelancer
          considerando todos os seus custos e expectativas.
        </p>

        <div class="grid md:grid-cols-2 gap-6">
          <BaseInput
            v-model="salarioDesejado"
            label="Salário Mensal Desejado (R$)"
            type="number"
            icon="fa-dollar-sign"
            placeholder="5000"
            :min="0"
            :error="errors.salarioDesejado"
            @input="calculate"
          />

          <BaseInput
            v-model="horasTrabalho"
            label="Horas de Trabalho por Mês"
            type="number"
            icon="fa-clock"
            placeholder="160"
            :min="1"
            :error="errors.horasTrabalho"
            @input="calculate"
          />

          <BaseInput
            v-model="diasFerias"
            label="Dias de Férias por Ano"
            type="number"
            icon="fa-umbrella-beach"
            placeholder="30"
            :min="0"
            :max="365"
            @input="calculate"
          />

          <BaseInput
            v-model="custosMensais"
            label="Custos Mensais (R$)"
            type="number"
            icon="fa-receipt"
            placeholder="500"
            hint="Incluasequ equipamentos, internet, contador, etc."
            :min="0"
            @input="calculate"
          />

          <BaseInput
            v-model="impostos"
            label="Impostos (%)"
            type="number"
            icon="fa-file-invoice-dollar"
            placeholder="15"
            :min="0"
            :max="100"
            :step="0.1"
            @input="calculate"
          />

          <BaseInput
            v-model="margemLucro"
            label="Margem de Lucro (%)"
            type="number"
            icon="fa-chart-line"
            placeholder="20"
            :min="0"
            :max="100"
            :step="0.1"
            @input="calculate"
          />
        </div>

        <div
          v-if="resultado"
          class="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-6 border-2 border-primary-200"
        >
          <h3 class="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <i class="fas fa-calculator text-primary-600 mr-2"></i>
            Resultados
          </h3>

          <div class="grid md:grid-cols-3 gap-4">
            <div class="bg-white rounded-lg p-4 shadow">
              <p class="text-sm text-gray-600 mb-1">Valor por Hora</p>
              <p class="text-3xl font-bold text-primary-600">
                R$ {{ resultado.valorHora }}
              </p>
            </div>

            <div class="bg-white rounded-lg p-4 shadow">
              <p class="text-sm text-gray-600 mb-1">Valor por Dia (8h)</p>
              <p class="text-3xl font-bold text-secondary-600">
                R$ {{ resultado.valorDia }}
              </p>
            </div>

            <div class="bg-white rounded-lg p-4 shadow">
              <p class="text-sm text-gray-600 mb-1">Renda Anual</p>
              <p class="text-3xl font-bold text-green-600">
                R$ {{ resultado.rendaAnual }}
              </p>
            </div>
          </div>

          <div class="mt-4 space-y-2 text-sm text-gray-700">
            <p>
              <i class="fas fa-info-circle text-blue-500 mr-2"></i>Horas
              trabalháveis no ano: {{ resultado.horasAno }}
            </p>
            <p>
              <i class="fas fa-info-circle text-blue-500 mr-2"></i>Custo total
              anual: R$ {{ resultado.custoAnual }}
            </p>
          </div>
        </div>

        <div class="flex gap-3">
          <BaseButton
            @click="calculate"
            variant="primary"
            icon="fa-calculator"
            fullWidth
          >
            Calcular
          </BaseButton>
          <BaseButton @click="reset" variant="outline" icon="fa-refresh">
            Limpar
          </BaseButton>
        </div>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import BaseCard from "./common/BaseCard.vue";
import BaseInput from "./common/BaseInput.vue";
import BaseButton from "./common/BaseButton.vue";
import Swal from "sweetalert2";

const salarioDesejado = ref(5000);
const horasTrabalho = ref(160);
const diasFerias = ref(30);
const custosMensais = ref(500);
const impostos = ref(15);
const margemLucro = ref(20);

const resultado = ref(null);
const errors = reactive({});

const validate = () => {
  errors.salarioDesejado =
    salarioDesejado.value <= 0 ? "Valor deve ser maior que zero" : "";
  errors.horasTrabalho =
    horasTrabalho.value <= 0 ? "Horas devem ser maiores que zero" : "";

  return !Object.values(errors).some((error) => error !== "");
};

const calculate = () => {
  if (!validate()) return;

  const salario = parseFloat(salarioDesejado.value);
  const horas = parseFloat(horasTrabalho.value);
  const ferias = parseFloat(diasFerias.value);
  const custos = parseFloat(custosMensais.value);
  const imp = parseFloat(impostos.value) / 100;
  const margem = parseFloat(margemLucro.value) / 100;

  // Cálculos
  const mesesTrabalhados = 12 - ferias / 30;
  const horasAnuais = horas * mesesTrabalhados;
  const custoAnual = custos * 12;
  const salarioAnual = salario * 12;

  // Valor hora base
  let valorHoraBase = (salarioAnual + custoAnual) / horasAnuais;

  // Adicionar impostos
  valorHoraBase = valorHoraBase / (1 - imp);

  // Adicionar margem de lucro
  const valorHoraFinal = valorHoraBase * (1 + margem);

  resultado.value = {
    valorHora: valorHoraFinal.toFixed(2),
    valorDia: (valorHoraFinal * 8).toFixed(2),
    rendaAnual: (valorHoraFinal * horasAnuais).toFixed(2),
    horasAno: horasAnuais.toFixed(0),
    custoAnual: custoAnual.toFixed(2),
  };

  Swal.fire({
    title: "Cálculo Realizado!",
    text: `Seu valor por hora deve ser R$ ${resultado.value.valorHora}`,
    icon: "success",
    timer: 3000,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
};

const reset = () => {
  salarioDesejado.value = 5000;
  horasTrabalho.value = 160;
  diasFerias.value = 30;
  custosMensais.value = 500;
  impostos.value = 15;
  margemLucro.value = 20;
  resultado.value = null;
  Object.keys(errors).forEach((key) => (errors[key] = ""));
};
</script>

<template>
  <div class="max-w-3xl mx-auto">
    <BaseCard title="Calculadora de IMC" icon="fa-weight-scale">
      <div class="space-y-6">
        <p class="text-gray-600">
          Calcule seu Índice de Massa Corporal (IMC) e descubra se você está no
          peso ideal.
        </p>

        <div class="grid md:grid-cols-2 gap-6">
          <BaseInput
            v-model="peso"
            label="Peso (kg)"
            type="number"
            icon="fa-weight-scale"
            placeholder="70"
            :min="1"
            :step="0.1"
            :error="errors.peso"
            @input="calculate"
          />

          <BaseInput
            v-model="altura"
            label="Altura (m)"
            type="number"
            icon="fa-ruler-vertical"
            placeholder="1.75"
            :min="0.5"
            :max="2.5"
            :step="0.01"
            :error="errors.altura"
            @input="calculate"
          />
        </div>

        <div v-if="resultado" class="space-y-4">
          <div :class="['rounded-xl p-6 border-2', resultadoClass]">
            <h3 class="text-xl font-bold mb-2 flex items-center">
              <i class="fas fa-chart-line mr-2"></i>
              Seu IMC: {{ resultado.imc }}
            </h3>
            <p class="text-lg font-semibold mb-2">
              {{ resultado.classificacao }}
            </p>
            <p class="text-sm">{{ resultado.descricao }}</p>
          </div>

          <!-- Tabela de Referência -->
          <div
            class="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <h4
              class="bg-gray-50 px-4 py-3 font-semibold text-gray-900 border-b"
            >
              Tabela de Referência
            </h4>
            <div class="divide-y">
              <div
                v-for="item in tabelaIMC"
                :key="item.classe"
                :class="[
                  'px-4 py-3 flex justify-between items-center',
                  item.classe === resultado.classe ? 'bg-primary-50' : '',
                ]"
              >
                <span class="font-medium">{{ item.label }}</span>
                <span class="text-gray-600">{{ item.range }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="flex gap-3">
          <BaseButton
            @click="calculate"
            variant="primary"
            icon="fa-calculator"
            fullWidth
          >
            Calcular IMC
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
import { ref, reactive, computed } from "vue";
import BaseCard from "./common/BaseCard.vue";
import BaseInput from "./common/BaseInput.vue";
import BaseButton from "./common/BaseButton.vue";
import Swal from "sweetalert2";

const peso = ref("");
const altura = ref("");
const resultado = ref(null);
const errors = reactive({});

const tabelaIMC = [
  { classe: "baixo", label: "Abaixo do Peso", range: "Abaixo de 18.5" },
  { classe: "normal", label: "Peso Normal", range: "18.5 - 24.9" },
  { classe: "sobrepeso", label: "Sobrepeso", range: "25.0 - 29.9" },
  { classe: "obesidade1", label: "Obesidade Grau I", range: "30.0 - 34.9" },
  { classe: "obesidade2", label: "Obesidade Grau II", range: "35.0 - 39.9" },
  { classe: "obesidade3", label: "Obesidade Grau III", range: "Acima de 40.0" },
];

const resultadoClass = computed(() => {
  if (!resultado.value) return "";

  const classes = {
    baixo: "bg-yellow-50 border-yellow-400 text-yellow-900",
    normal: "bg-green-50 border-green-400 text-green-900",
    sobrepeso: "bg-orange-50 border-orange-400 text-orange-900",
    obesidade1: "bg-red-50 border-red-400 text-red-900",
    obesidade2: "bg-red-100 border-red-500 text-red-900",
    obesidade3: "bg-red-200 border-red-600 text-red-900",
  };

  return classes[resultado.value.classe] || "";
});

const validate = () => {
  errors.peso = !peso.value || peso.value <= 0 ? "Peso inválido" : "";
  errors.altura = !altura.value || altura.value <= 0 ? "Altura inválida" : "";

  return !Object.values(errors).some((error) => error !== "");
};

const calculate = () => {
  if (!validate()) return;

  const p = Number.parseFloat(peso.value);
  const a = Number.parseFloat(altura.value);

  const imc = p / (a * a);

  let classificacao, descricao, classe;

  if (imc < 18.5) {
    classe = "baixo";
    classificacao = "Abaixo do Peso";
    descricao = "Você está abaixo do peso ideal. Consulte um nutricionista.";
  } else if (imc < 25) {
    classe = "normal";
    classificacao = "Peso Normal";
    descricao = "Parabéns! Você está no peso ideal. Continue assim!";
  } else if (imc < 30) {
    classe = "sobrepeso";
    classificacao = "Sobrepeso";
    descricao =
      "Você está com sobrepeso. Considere uma dieta balanceada e exercícios.";
  } else if (imc < 35) {
    classe = "obesidade1";
    classificacao = "Obesidade Grau I";
    descricao = "Obesidade grau I. Procure orientação médica e nutricional.";
  } else if (imc < 40) {
    classe = "obesidade2";
    classificacao = "Obesidade Grau II";
    descricao = "Obesidade grau II. É importante buscar acompanhamento médico.";
  } else {
    classe = "obesidade3";
    classificacao = "Obesidade Grau III";
    descricao =
      "Obesidade grau III (mórbida). Busque acompanhamento médico urgente.";
  }

  resultado.value = {
    imc: imc.toFixed(2),
    classificacao,
    descricao,
    classe,
  };

  Swal.fire({
    title: "IMC Calculado!",
    text: `Seu IMC é ${resultado.value.imc} - ${classificacao}`,
    icon: classe === "normal" ? "success" : "info",
    timer: 3000,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
};

const reset = () => {
  peso.value = "";
  altura.value = "";
  resultado.value = null;
  Object.keys(errors).forEach((key) => (errors[key] = ""));
};
</script>

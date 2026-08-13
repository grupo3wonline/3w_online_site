<template>
  <div class="max-w-4xl mx-auto">
    <BaseCard title="Analisador de Texto" icon="fa-magnifying-glass">
      <div class="space-y-6">
        <p class="text-gray-600">
          Analise características do seu texto em tempo real.
        </p>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Digite ou cole seu texto abaixo:
          </label>
          <textarea
            v-model="texto"
            @input="analisar"
            rows="10"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
            placeholder="Cole seu texto aqui para análise..."
          ></textarea>
        </div>

        <div v-if="texto" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="bg-blue-50 rounded-lg p-4 text-center">
            <i class="fas fa-font text-2xl text-blue-600 mb-2"></i>
            <p class="text-3xl font-bold text-blue-900">
              {{ stats.caracteres }}
            </p>
            <p class="text-sm text-blue-700">Caracteres</p>
          </div>

          <div class="bg-green-50 rounded-lg p-4 text-center">
            <i class="fas fa-spell-check text-2xl text-green-600 mb-2"></i>
            <p class="text-3xl font-bold text-green-900">
              {{ stats.caracteresSemEspacos }}
            </p>
            <p class="text-sm text-green-700">Sem espaços</p>
          </div>

          <div class="bg-purple-50 rounded-lg p-4 text-center">
            <i class="fas fa-align-left text-2xl text-purple-600 mb-2"></i>
            <p class="text-3xl font-bold text-purple-900">
              {{ stats.palavras }}
            </p>
            <p class="text-sm text-purple-700">Palavras</p>
          </div>

          <div class="bg-orange-50 rounded-lg p-4 text-center">
            <i class="fas fa-paragraph text-2xl text-orange-600 mb-2"></i>
            <p class="text-3xl font-bold text-orange-900">{{ stats.linhas }}</p>
            <p class="text-sm text-orange-700">Linhas</p>
          </div>

          <div class="bg-red-50 rounded-lg p-4 text-center">
            <i class="fas fa-list-ol text-2xl text-red-600 mb-2"></i>
            <p class="text-3xl font-bold text-red-900">
              {{ stats.paragrafos }}
            </p>
            <p class="text-sm text-red-700">Parágrafos</p>
          </div>

          <div class="bg-yellow-50 rounded-lg p-4 text-center">
            <i class="fas fa-clock text-2xl text-yellow-600 mb-2"></i>
            <p class="text-3xl font-bold text-yellow-900">
              {{ stats.tempoLeitura }}
            </p>
            <p class="text-sm text-yellow-700">min de leitura</p>
          </div>

          <div class="bg-indigo-50 rounded-lg p-4 text-center">
            <i class="fas fa-microphone text-2xl text-indigo-600 mb-2"></i>
            <p class="text-3xl font-bold text-indigo-900">
              {{ stats.tempoFala }}
            </p>
            <p class="text-sm text-indigo-700">min de fala</p>
          </div>

          <div class="bg-pink-50 rounded-lg p-4 text-center">
            <i class="fas fa-file-word text-2xl text-pink-600 mb-2"></i>
            <p class="text-3xl font-bold text-pink-900">{{ stats.frases }}</p>
            <p class="text-sm text-pink-700">Frases</p>
          </div>
        </div>

        <BaseButton @click="limpar" variant="outline" icon="fa-trash" fullWidth>
          Limpar Texto
        </BaseButton>
      </div>
    </BaseCard>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import BaseCard from "./common/BaseCard.vue";
import BaseButton from "./common/BaseButton.vue";

const texto = ref("");
const stats = reactive({
  caracteres: 0,
  caracteresSemEspacos: 0,
  palavras: 0,
  linhas: 0,
  paragrafos: 0,
  frases: 0,
  tempoLeitura: 0,
  tempoFala: 0,
});

const analisar = () => {
  if (!texto.value) {
    Object.keys(stats).forEach((key) => (stats[key] = 0));
    return;
  }

  stats.caracteres = texto.value.length;
  stats.caracteresSemEspacos = texto.value.replace(/\s/g, "").length;
  stats.palavras = texto.value
    .trim()
    .split(/\s+/)
    .filter((p) => p.length > 0).length;
  stats.linhas = texto.value.split("\n").length;
  stats.paragrafos = texto.value
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0).length;
  stats.frases = texto.value
    .split(/[.!?]+/)
    .filter((f) => f.trim().length > 0).length;

  // Tempo médio de leitura: 200 palavras por minuto
  stats.tempoLeitura = Math.ceil(stats.palavras / 200);

  // Tempo médio de fala: 150 palavras por minuto
  stats.tempoFala = Math.ceil(stats.palavras / 150);
};

const limpar = () => {
  texto.value = "";
  analisar();
};
</script>

<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
      <span class="text-3xl">📝</span>
      Seu Roteiro
      <button
        type="button"
        class="ml-2 text-purple-600 hover:text-purple-800"
        title="Ajuda sobre o preenchimento"
        @click="$emit('help')"
      >
        <i class="fa-solid fa-circle-question"></i>
      </button>
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <div>
        <label
          for="scriptInput"
          class="block text-sm font-medium text-gray-700 mb-2"
        >
          Cole seu roteiro aqui:
          <span class="ml-1">
            <i
              class="fa-solid fa-circle-info text-xs text-purple-400"
              title="Cole o texto do seu roteiro. Dica: use frases completas para melhor divisão das legendas."
            ></i>
          </span>
        </label>
        <textarea
          id="scriptInput"
          :value="modelValue"
          @input="updateValue"
          autocomplete="off"
          rows="12"
          class="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 hover:border-gray-400"
          placeholder="Cole o texto do seu roteiro aqui... 

Exemplo:
Bem-vindos ao nosso canal! Hoje vamos aprender sobre Vue.js 3 e suas novidades incríveis. O Vue.js é um framework progressivo para construção de interfaces de usuário..."
          required
        ></textarea>
        <div class="mt-2 text-sm text-gray-500 flex justify-between">
          <span>{{ characterCount }} caracteres</span>
          <span v-if="wordCount > 0">{{ wordCount }} palavras</span>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            for="filename"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Nome do arquivo (sem extensão)</label
          >
          <input
            id="filename"
            v-model="filename"
            type="text"
            placeholder="legendas"
            class="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
            autocomplete="off"
            aria-label="Nome do arquivo"
          />
          <p class="text-xs text-gray-500 mt-1">
            Digite o nome desejado para o arquivo SRT (sem .srt)
          </p>
        </div>

        <div>
          <label
            for="interval"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Intervalo entre legendas (segundos)</label
          >
          <div class="flex items-center gap-3">
            <input
              id="interval"
              v-model.number="interval"
              type="range"
              min="0"
              max="30"
              step="1"
              class="flex-1"
              autocomplete="off"
              aria-label="Intervalo entre legendas"
            />
            <div class="w-16 text-right text-sm text-gray-700">
              {{ interval }}s
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            Defina a pausa entre cada bloco (0-30s). Duração por bloco: 30s.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div class="w-full sm:w-1/3">
          <label
            for="maxChars"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Máx. caracteres por bloco</label
          >
          <input
            id="maxChars"
            v-model.number="maxChars"
            type="number"
            min="100"
            max="2000"
            class="w-full p-3 border border-gray-300 rounded-xl"
            autocomplete="off"
            aria-label="Máx. caracteres por bloco"
          />
          <p class="text-xs text-gray-500 mt-1">
            Valor entre 100 e 2000 (padrão 500).
          </p>
        </div>

        <div class="w-full sm:w-1/3">
          <label
            for="blockDuration"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Duração por bloco (segundos)</label
          >
          <input
            id="blockDuration"
            v-model.number="blockDuration"
            type="number"
            min="1"
            max="300"
            class="w-full p-3 border border-gray-300 rounded-xl"
            autocomplete="off"
            aria-label="Duração por bloco"
          />
          <p class="text-xs text-gray-500 mt-1">
            Duração em segundos (padrão 30).
          </p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button
          type="submit"
          :disabled="!modelValue.trim() || isLoading || !acceptedTerms"
          class="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          <span v-if="isLoading" class="loading-spinner"></span>
          <span v-else class="text-xl">⚡</span>
          {{ isLoading ? "Convertendo..." : "Converter para SRT" }}
        </button>

        <button
          v-if="showClearButton"
          type="button"
          @click="clearAll"
          class="px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-xl transition-all duration-200 hover:bg-gray-50"
          title="Limpar texto"
        >
          <span class="flex items-center gap-2"> 🗑️ Limpar </span>
        </button>
      </div>
      <div class="mt-2 text-xs text-gray-500">
        <label class="inline-flex items-center gap-2">
          <input
            type="checkbox"
            v-model="acceptedTerms"
            class="w-4 h-4"
            autocomplete="off"
            aria-label="Aceite dos Termos"
          />
          <span
            >Eu li e aceito os
            <router-link to="/termos" class="text-purple-600 underline"
              >Termos de Uso</router-link
            >
            e a
            <router-link to="/privacidade" class="text-purple-600 underline"
              >Política de Privacidade</router-link
            >.</span
          >
        </label>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  modelValue: string;
  isLoading: boolean;
  showClearButton: boolean;
}

interface Emits {
  (e: "update:modelValue", value: string): void;
  (
    e: "submit",
    payload: {
      filename: string;
      interval: number;
      maxChars?: number;
      blockDuration?: number;
      acceptedTerms?: boolean;
    }
  ): void;
  (e: "clear"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const characterCount = computed(() => props.modelValue.length);
const wordCount = computed(() => {
  if (!props.modelValue.trim()) return 0;
  return props.modelValue.trim().split(/\s+/).length;
});

import { ref } from "vue";

const filename = ref("legendas");
const interval = ref(30);
const maxChars = ref(500);
const blockDuration = ref(30);
const acceptedTerms = ref(false);

const updateValue = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit("update:modelValue", target.value);
};

const handleSubmit = () => {
  emit("submit", {
    filename: (filename.value || "legendas").trim(),
    interval: Math.min(Math.max(0, Number(interval.value || 0)), 30),
    maxChars: Math.min(Math.max(100, Number(maxChars.value || 500)), 2000),
    blockDuration: Math.min(
      Math.max(1, Number(blockDuration.value || 30)),
      300
    ),
    acceptedTerms: Boolean(acceptedTerms.value),
  });
};

const clearAll = () => {
  emit("clear");
};
</script>

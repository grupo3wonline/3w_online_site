<template>
  <div
    v-if="open"
    class="fixed inset-0 z-60 flex items-center justify-center p-4"
  >
    <div class="absolute inset-0 bg-black/50" @click="close"></div>
    <div
      class="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-2xl w-full p-6"
    >
      <div class="flex items-start justify-between gap-4">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Ajuda - Como usar o Conversor SRT
        </h3>
        <button
          @click="close"
          class="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="mt-4 text-sm text-gray-700 dark:text-gray-200 space-y-3">
        <p>1. Cole seu roteiro no campo principal.</p>
        <p>
          2. Ajuste o <strong>Máx. caracteres por bloco</strong> e a
          <strong>Duração por bloco</strong> se desejar.
        </p>
        <p>3. Defina o <strong>Intervalo entre legendas</strong> (0-30s).</p>
        <p>
          4. Digite o nome do arquivo (sem extensão) e aceite os Termos de Uso.
        </p>
        <p>
          5. Clique em <strong>Converter para SRT</strong> — o preview será
          exibido e você poderá baixar o arquivo.
        </p>
      </div>

      <div class="mt-6 flex justify-end">
        <button
          @click="close"
          class="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ open: boolean }>();
const emit = defineEmits(["close"]);

const close = () => emit("close");
</script>

<style scoped>
.fa-solid {
  font-size: 1rem;
}
</style>

<template>
  <div class="card animate-fade-in">
    <h2
      class="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2"
    >
      <svg
        class="w-6 h-6 text-primary-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
        />
      </svg>
      Configurações
    </h2>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Image Upload -->
      <div>
        <label
          class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Selecione as Imagens
        </label>
        <input
          type="file"
          @change="handleImageUpload"
          multiple
          accept="image/*"
          class="input-field cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-300"
        />
        <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Suporta JPG, PNG, WebP e outros formatos. Selecione múltiplas imagens.
        </p>
      </div>

      <!-- Watermark Type Tabs -->
      <div>
        <label
          class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Tipo de Marca D'água
        </label>
        <div class="flex gap-2">
          <button
            type="button"
            @click="watermarkType = 'text'"
            :class="[
              'flex-1 py-2 px-4 rounded-lg font-medium transition-all',
              watermarkType === 'text'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
            ]"
          >
            <svg
              class="w-5 h-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
            Texto
          </button>
          <button
            type="button"
            @click="watermarkType = 'logo'"
            :class="[
              'flex-1 py-2 px-4 rounded-lg font-medium transition-all',
              watermarkType === 'logo'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600',
            ]"
          >
            <svg
              class="w-5 h-5 inline-block mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Logo
          </button>
        </div>
      </div>

      <!-- Text Input (if text mode) -->
      <div v-if="watermarkType === 'text'" class="animate-slide-down">
        <label
          class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Texto da Marca D'água
        </label>
        <input
          type="text"
          v-model="config.text"
          @input="emitUpdate"
          placeholder="Digite o texto da marca d'água"
          class="input-field"
        />
      </div>

      <!-- Logo Upload (if logo mode) -->
      <div v-if="watermarkType === 'logo'" class="animate-slide-down">
        <label
          class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Upload do Logo
        </label>
        <input
          type="file"
          @change="handleLogoUpload"
          accept="image/*"
          class="input-field cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-300"
        />
      </div>

      <!-- Position -->
      <div>
        <label
          class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Posição
        </label>
        <select
          v-model="config.position"
          @change="emitUpdate"
          class="input-field"
        >
          <option value="center">Centro</option>
          <option value="top-left">Canto Superior Esquerdo</option>
          <option value="top-right">Canto Superior Direito</option>
          <option value="bottom-left">Canto Inferior Esquerdo</option>
          <option value="bottom-right">Canto Inferior Direito</option>
          <option value="diagonal">Diagonal</option>
        </select>
      </div>

      <!-- Color (only for text) -->
      <div v-if="watermarkType === 'text'">
        <label
          class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Cor
        </label>
        <div class="flex items-center gap-3">
          <input
            type="color"
            v-model="config.color"
            @input="emitUpdate"
            class="w-16 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 cursor-pointer"
          />
          <input
            type="text"
            v-model="config.color"
            @input="emitUpdate"
            class="input-field flex-1"
            placeholder="#ffffff"
          />
        </div>
      </div>

      <!-- Opacity -->
      <div>
        <label
          class="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
        >
          Opacidade: {{ Math.round(config.opacity * 100) }}%
        </label>
        <input
          type="range"
          v-model.number="config.opacity"
          @input="emitUpdate"
          min="0"
          max="1"
          step="0.05"
          class="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-600"
        />
        <div
          class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1"
        >
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-3 pt-4">
        <button
          type="submit"
          :disabled="!canProcess"
          class="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <svg
            v-if="!isProcessing"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5 animate-spin"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {{ isProcessing ? "Processando..." : "Processar Imagens" }}
        </button>
        <button
          type="button"
          @click="handleReset"
          class="btn-secondary flex items-center justify-center gap-2"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Resetar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  watermarkConfig: {
    type: Object,
    required: true,
  },
  isProcessing: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits([
  "update-config",
  "images-selected",
  "process",
  "reset",
]);

const watermarkType = ref("text");
const config = ref({ ...props.watermarkConfig });
const selectedImages = ref([]);

const canProcess = computed(() => {
  return (
    selectedImages.value.length > 0 && (config.value.text || config.value.logo)
  );
});

watch(
  () => props.watermarkConfig,
  (newVal) => {
    config.value = { ...newVal };
  },
  { deep: true }
);

watch(watermarkType, (newType) => {
  if (newType === "text") {
    config.value.logo = null;
  } else {
    config.value.text = "";
  }
  emitUpdate();
});

const handleImageUpload = (event) => {
  const files = event.target.files;
  if (files && files.length > 0) {
    selectedImages.value = Array.from(files);
    emit("images-selected", files);
  }
};

const handleLogoUpload = (event) => {
  const file = event.target.files?.[0];
  if (file) {
    config.value.logo = file;
    emitUpdate();
  }
};

const emitUpdate = () => {
  emit("update-config", config.value);
};

const handleSubmit = () => {
  if (canProcess.value) {
    emit("process", selectedImages.value);
  }
};

const handleReset = () => {
  config.value = {
    text: "",
    logo: null,
    position: "center",
    color: "#ffffff",
    opacity: 0.5,
  };
  selectedImages.value = [];
  watermarkType.value = "text";
  emit("reset");
};
</script>

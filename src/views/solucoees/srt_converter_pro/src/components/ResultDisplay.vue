<template>
  <div class="card">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-900 flex items-center gap-3">
        <span class="text-3xl">🎬</span>
        Resultado SRT
      </h2>
      <div
        v-if="result"
        class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
      >
        {{ result.totalBlocks }} blocos • {{ result.totalDuration }}
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="!result" class="text-center py-12 text-gray-500">
      <div class="text-6xl mb-4 animate-pulse">📝</div>
      <p class="text-lg mb-2">Cole seu roteiro e clique em "Converter"</p>
      <p class="text-sm text-gray-400">para ver o resultado em formato SRT</p>
    </div>

    <!-- Result Display -->
    <div v-else class="space-y-4">
      <!-- Preview -->
      <div class="bg-gray-50 rounded-xl p-4 max-h-80 overflow-y-auto border">
        <div class="flex items-center justify-between mb-3">
          <span class="text-sm font-medium text-gray-700"
            >Preview do arquivo SRT:</span
          >
          <button
            @click="copyToClipboard"
            class="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded hover:bg-purple-200 transition-colors"
            title="Copiar para área de transferência"
            aria-label="Copiar para área de transferência"
          >
            <i class="fa-solid fa-copy"></i> Copiar
          </button>
        </div>
        <pre
          class="text-sm text-gray-800 whitespace-pre-wrap font-mono leading-relaxed"
          >{{ result.srtContent }}</pre
        >
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button
          @click="downloadFile"
          class="flex-1 btn-primary flex items-center justify-center gap-2"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download SRT
        </button>

        <button
          @click="previewBlocks"
          class="px-6 py-3 text-purple-600 border border-purple-600 hover:bg-purple-50 rounded-xl transition-colors"
        >
          👁️ Preview Blocos
        </button>
      </div>

      <!-- Block Preview Modal (simplified for now) -->
      <div
        v-if="showBlockPreview"
        class="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
      >
        <div class="flex items-center justify-between mb-3">
          <h3 class="font-semibold text-blue-900">
            Preview dos Blocos de Legenda
          </h3>
          <button
            @click="showBlockPreview = false"
            class="text-blue-600 hover:text-blue-800"
          >
            ✕
          </button>
        </div>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div
            v-for="block in result.blocks.slice(0, 5)"
            :key="block.index"
            class="text-sm"
          >
            <div class="font-mono text-blue-800">
              {{ block.index }}. {{ block.startTime }} → {{ block.endTime }}
            </div>
            <div class="text-gray-700 ml-4">
              {{ block.text.substring(0, 100) }}...
            </div>
          </div>
          <div
            v-if="result.blocks.length > 5"
            class="text-sm text-blue-600 italic"
          >
            ... e mais {{ result.blocks.length - 5 }} blocos
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ConversionResult } from "../types";

interface Props {
  result: ConversionResult | null;
}

interface Emits {
  (e: "download"): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const showBlockPreview = ref(false);

const downloadFile = () => {
  emit("download");
};

const copyToClipboard = async () => {
  if (props.result) {
    try {
      await navigator.clipboard.writeText(props.result.srtContent);
      // You could add a toast notification here
      console.log("Copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  }
};

const previewBlocks = () => {
  showBlockPreview.value = !showBlockPreview.value;
};
</script>

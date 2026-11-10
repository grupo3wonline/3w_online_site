<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-12 animate-fade-in">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Conversor de Roteiro para SRT
        </h1>
        <p class="text-xl text-gray-600">
          Cole seu roteiro abaixo e obtenha legendas SRT profissionais em
          segundos
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Input Section -->
        <div class="animate-slide-up">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-semibold text-gray-900">
              Entrada de Roteiro
            </h2>
            <button
              type="button"
              class="text-sm text-purple-700 hover:underline"
              @click="showHelpModal"
              aria-label="Como usar o conversor"
            >
              Como usar
            </button>
          </div>

          <ScriptInput
            v-model="scriptText"
            :is-loading="isLoading"
            :show-clear-button="!!conversionResult"
            @submit="convertScript"
            @clear="clearAll"
            @help="showHelpModal"
          />
        </div>

        <!-- Output Section -->
        <div class="animate-slide-up delay-200">
          <ResultDisplay :result="conversionResult" @download="downloadSRT" />
        </div>
      </div>

      <!-- Info Section -->
      <InfoSection />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  convertToSRT,
  downloadSRT as downloadSRTFile,
} from "../utils/srtConverter";
import type { ConversionResult } from "../types";
import ScriptInput from "../components/ScriptInput.vue";
import ResultDisplay from "../components/ResultDisplay.vue";
import InfoSection from "../components/InfoSection.vue";

const scriptText = ref("");
const conversionResult = ref<ConversionResult | null>(null);
const isLoading = ref(false);
const outputFilename = ref("legendas");

const convertScript = async (payload?: {
  filename: string;
  interval: number;
  maxChars?: number;
  blockDuration?: number;
}) => {
  if (!scriptText.value.trim()) return;

  isLoading.value = true;

  // Simulate processing time for better UX
  await new Promise((resolve) => setTimeout(resolve, 500));

  try {
    const intervalBetweenBlocks = payload?.interval ?? 30;
    if (payload && payload.acceptedTerms === false) {
      (window as any).Swal.fire({
        icon: "warning",
        title: "Consentimento necessário",
        text: "Você precisa aceitar os Termos de Uso e a Política de Privacidade antes de converter.",
      });
      isLoading.value = false;
      return;
    }
    const filename = (payload?.filename || "legendas").trim() || "legendas";

    // Validate filename: only letters, numbers, hyphen and underscore
    const validFilename = /^[a-zA-Z0-9_-]+$/.test(filename);
    if (!validFilename) {
      (window as any).Swal.fire({
        icon: "error",
        title: "Nome inválido",
        text: 'Nome de arquivo inválido. Use apenas letras, números, "-" e "_".',
      });
      isLoading.value = false;
      return;
    }

    outputFilename.value = filename;

    const charactersPerBlock = payload?.maxChars ?? 500;
    const blockDuration = payload?.blockDuration ?? 30;

    const config = {
      charactersPerBlock: Math.min(
        Math.max(100, Number(charactersPerBlock)),
        2000
      ),
      minWordsPerBlock: 80,
      maxWordsPerBlock: 100,
      blockDuration: Math.min(Math.max(1, Number(blockDuration)), 300),
      intervalBetweenBlocks: Math.min(
        Math.max(0, Number(intervalBetweenBlocks)),
        30
      ),
    };

    conversionResult.value = convertToSRT(scriptText.value.trim(), config);
  } catch (error) {
    console.error("Erro na conversão:", error);
    (window as any).Swal.fire({
      icon: "error",
      title: "Erro na conversão",
      text: "Ocorreu um erro ao processar seu roteiro. Tente novamente.",
    });
  } finally {
    isLoading.value = false;
  }
};

const downloadSRT = () => {
  if (conversionResult.value) {
    downloadSRTFile(
      conversionResult.value.srtContent,
      `${outputFilename.value || "legendas"}.srt`
    );
  }
};

const clearAll = () => {
  scriptText.value = "";
  conversionResult.value = null;
};

const showHelpModal = () => {
  const Swal = (window as any).Swal;
  const html = `
    <ol style="text-align: left; line-height: 1.7; margin:0; padding-left:18px">
      <li><strong>Cole seu roteiro</strong> no campo principal.</li>
      <li>Opcional: ajuste <strong>máx. caracteres por bloco</strong> e <strong>duração</strong>.</li>
      <li>Defina o <strong>intervalo entre legendas</strong> (0-30s).</li>
      <li>Escolha um nome de arquivo válido e aceite os Termos.</li>
      <li>Clique em <strong>Converter para SRT</strong> e faça o download.</li>
    </ol>
  `;

  if (Swal && typeof Swal.fire === "function") {
    Swal.fire({
      icon: "info",
      title: "Como usar o Conversor SRT",
      html,
      confirmButtonText: "Entendi",
      customClass: { popup: "swal2-help-modal" },
    });
    return;
  }

  // Fallback
  // eslint-disable-next-line no-alert
  alert("Cole seu roteiro no campo e clique em Converter para gerar o SRT.");
};
</script>

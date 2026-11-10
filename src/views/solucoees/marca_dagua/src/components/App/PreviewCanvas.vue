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
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </svg>
      Preview ao Vivo
    </h2>

    <!-- Canvas Container -->
    <div
      class="relative bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700"
    >
      <canvas
        ref="canvasRef"
        class="max-w-full max-h-[500px] rounded-lg shadow-lg"
        :class="{ 'opacity-0': !hasPreview }"
      ></canvas>

      <!-- Empty State -->
      <div
        v-if="!hasPreview"
        class="absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 p-8 text-center"
      >
        <svg
          class="w-24 h-24 mb-4 opacity-50"
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
        <p class="text-lg font-medium mb-2">Nenhuma imagem selecionada</p>
        <p class="text-sm">Faça upload de uma imagem para ver o preview</p>
      </div>
    </div>

    <!-- Info -->
    <div class="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div class="flex gap-2 text-sm text-blue-700 dark:text-blue-300">
        <svg
          class="w-5 h-5 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <div>
          <p class="font-medium">Preview em tempo real</p>
          <p class="text-xs mt-1 text-blue-600 dark:text-blue-400">
            As alterações são mostradas instantaneamente conforme você ajusta as
            configurações.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useCanvas } from "@/composables/useCanvas";

const props = defineProps({
  previewImage: {
    type: File,
    default: null,
  },
  watermarkConfig: {
    type: Object,
    required: true,
  },
});

const canvasRef = ref(null);
const hasPreview = ref(false);
const { loadImage, hexToRgba, getContext, drawImage, clearCanvas } =
  useCanvas();

let currentImage = null;

const updatePreview = async () => {
  if (!canvasRef.value || !currentImage) return;

  const canvas = canvasRef.value;
  const ctx = getContext(canvas);

  // Set canvas size to image size
  canvas.width = currentImage.width;
  canvas.height = currentImage.height;

  // Clear and draw base image
  clearCanvas(ctx, canvas.width, canvas.height);
  drawImage(ctx, currentImage);

  // Apply watermark
  if (props.watermarkConfig.logo) {
    await applyLogoWatermark(ctx, canvas);
  } else if (props.watermarkConfig.text) {
    applyTextWatermark(ctx, canvas);
  }

  hasPreview.value = true;
};

const applyTextWatermark = (ctx, canvas) => {
  const { text, color, opacity, position } = props.watermarkConfig;
  if (!text) return;

  const fontSize = Math.floor(canvas.width / 20);
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.fillStyle = hexToRgba(color, opacity);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  if (position === "diagonal") {
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(-Math.PI / 4);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  } else {
    const { x, y } = calculatePosition(position, canvas.width, canvas.height);
    ctx.fillText(text, x, y);
  }
};

const applyLogoWatermark = async (ctx, canvas) => {
  const { logo, opacity, position } = props.watermarkConfig;
  if (!logo) return;

  try {
    const logoImg = await loadImage(logo);
    const size = Math.floor(canvas.width / 5);
    const { x, y } = calculatePosition(
      position,
      canvas.width,
      canvas.height,
      size
    );

    ctx.globalAlpha = opacity;
    ctx.drawImage(logoImg, x, y, size, size);
    ctx.globalAlpha = 1.0;
  } catch (error) {
    console.error("Error loading logo:", error);
  }
};

const calculatePosition = (
  position,
  canvasWidth,
  canvasHeight,
  elementWidth = 0
) => {
  const padding = 20;

  switch (position) {
    case "top-left":
      return { x: padding, y: padding };
    case "top-right":
      return { x: canvasWidth - elementWidth - padding, y: padding };
    case "bottom-left":
      return { x: padding, y: canvasHeight - elementWidth - padding };
    case "bottom-right":
      return {
        x: canvasWidth - elementWidth - padding,
        y: canvasHeight - elementWidth - padding,
      };
    case "center":
    default:
      return { x: canvasWidth / 2, y: canvasHeight / 2 };
  }
};

const loadPreviewImage = async () => {
  if (!props.previewImage) {
    hasPreview.value = false;
    currentImage = null;
    return;
  }

  try {
    currentImage = await loadImage(props.previewImage);
    await updatePreview();
  } catch (error) {
    console.error("Error loading preview image:", error);
    hasPreview.value = false;
  }
};

// Watch for changes
watch(() => props.previewImage, loadPreviewImage, { immediate: true });
watch(() => props.watermarkConfig, updatePreview, { deep: true });

onMounted(() => {
  if (props.previewImage) {
    loadPreviewImage();
  }
});
</script>

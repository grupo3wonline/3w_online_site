<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@iconify/vue";
import Button from "@/components/ui/Button.vue";
import { notify } from "@/lib/notify";

/**
 * Upload de logo da empresa com validação de tipo e tamanho.
 * Converte para data URL (base64) para embutir no documento gerado.
 */
const model = defineModel<string>({ default: "" });

const inputRef = ref<HTMLInputElement | null>(null);
const TIPOS = ["image/png", "image/jpeg", "image/svg+xml", "image/webp"];
const MAX_BYTES = 1024 * 1024; // 1 MB

const abrir = () => inputRef.value?.click();

const onFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;

  if (!TIPOS.includes(file.type)) {
    notify.error("Formato inválido", "Envie uma imagem PNG, JPG, SVG ou WebP.");
    return;
  }
  if (file.size > MAX_BYTES) {
    notify.error("Arquivo grande demais", "O logo deve ter no máximo 1 MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    model.value = String(reader.result);
    notify.toast("Logo carregado com sucesso");
  };
  reader.onerror = () => notify.error("Erro", "Não foi possível ler o arquivo.");
  reader.readAsDataURL(file);
};

const remover = () => {
  model.value = "";
  if (inputRef.value) inputRef.value.value = "";
};
</script>

<template>
  <div class="space-y-2">
    <div class="flex items-center gap-4">
      <div
        class="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-dashed border-border bg-muted/40"
      >
        <img v-if="model" :src="model" alt="Prévia do logo" class="h-full w-full object-contain" />
        <Icon v-else icon="lucide:image" class="h-6 w-6 text-muted-foreground" />
      </div>
      <div class="flex flex-wrap gap-2">
        <Button type="button" variant="outline" size="sm" @click="abrir">
          <Icon icon="lucide:upload" class="h-4 w-4" />
          {{ model ? "Trocar logo" : "Enviar logo" }}
        </Button>
        <Button
          v-if="model"
          type="button"
          variant="ghost"
          size="sm"
          class="text-destructive"
          @click="remover"
        >
          <Icon icon="lucide:trash-2" class="h-4 w-4" />
          Remover
        </Button>
      </div>
    </div>
    <p class="text-xs text-muted-foreground">
      PNG, JPG, SVG ou WebP, até 1 MB. Aparece no topo do documento.
    </p>
    <input
      ref="inputRef"
      type="file"
      accept="image/png,image/jpeg,image/svg+xml,image/webp"
      class="sr-only"
      @change="onFile"
    />
  </div>
</template>

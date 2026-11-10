<script setup lang="ts">
  import { ref } from 'vue'
  import { Icon } from '@iconify/vue'
  import { useConsolidatorStore } from '@/stores/consolidator'
  import { useFileProcessor } from '@/composables/useFileProcessor'
  import { useAlert } from '@/composables/useAlert'
  import FileCard from '@/components/FileCard.vue'

  const store = useConsolidatorStore()
  const { processFiles } = useFileProcessor()
  const alert = useAlert()
  const fileInputRef = ref<HTMLInputElement | null>(null)

  async function handleFiles(fileList: FileList) {
    store.isProcessing = true

    try {
      const { files, errors } = await processFiles(fileList)

      if (errors.length > 0) {
        alert.error('Erros ao processar arquivos', errors.join('<br/>'))
      }

      if (files.length > 0) {
        store.addFiles(files)
      }
    } finally {
      store.isProcessing = false
    }
  }

  function handleDrop(e: DragEvent) {
    e.preventDefault()
    store.isDragging = false
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    store.isDragging = true
  }

  function handleDragLeave(e: DragEvent) {
    e.preventDefault()
    store.isDragging = false
  }

  function handleInputChange(e: Event) {
    const target = e.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      handleFiles(target.files)
      target.value = ''
    }
  }
</script>

<template>
  <section class="glass-card overflow-hidden rounded-2xl p-6 transition-all duration-300 sm:p-8">
    <div class="mb-4 flex items-center gap-2">
      <Icon icon="mdi:cloud-upload-outline" class="h-5 w-5 text-emerald-400" />
      <h2 class="text-sm font-bold text-white">Importar Arquivos</h2>
      <span class="text-xs text-slate-500">— Arraste ou clique para selecionar</span>
    </div>

    <input
      ref="fileInputRef"
      type="file"
      multiple
      accept=".xlsx,.xls,.csv"
      autocomplete="off"
      class="hidden"
      @change="handleInputChange"
    />

    <div
      class="flex cursor-pointer flex-col items-center justify-center space-y-4 rounded-xl border-2 border-dashed p-8 transition-all duration-200 sm:p-10"
      :class="[
        store.isDragging
          ? 'scale-[1.01] border-emerald-500 bg-emerald-500/10'
          : 'border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900/40',
      ]"
      role="button"
      tabindex="0"
      aria-label="Zona de upload de arquivos"
      @drop="handleDrop"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @click="fileInputRef?.click()"
      @keydown.enter="fileInputRef?.click()"
    >
      <div
        class="flex h-16 w-16 items-center justify-center rounded-2xl border border-slate-700/60 bg-gradient-to-tr from-slate-900 to-slate-800 shadow-xl"
      >
        <Icon
          icon="mdi:cloud-upload-outline"
          class="h-8 w-8"
          :class="store.isDragging ? 'animate-bounce text-emerald-400' : 'text-slate-400'"
        />
      </div>

      <div class="text-center">
        <p class="text-sm font-semibold text-slate-200 sm:text-base">
          Arraste & Solte seus arquivos Excel aqui, ou
          <span
            class="text-emerald-400 underline decoration-emerald-500/50 underline-offset-4"
          >
            clique para selecionar
          </span>
        </p>
        <p class="mt-1.5 text-xs text-slate-400">
          Suporta arquivos .XLSX, .XLS e .CSV (Múltiplos arquivos permitidos • Máx. 50MB por
          arquivo)
        </p>
      </div>
    </div>

    <!-- Lista de arquivos carregados -->
    <div
      v-if="store.files.length > 0"
      class="mt-6 border-t border-slate-800/80 pt-6 text-left"
    >
      <h4 class="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        Arquivos Selecionados ({{ store.files.length }})
      </h4>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <FileCard v-for="file in store.files" :key="file.id" :file="file" />
      </div>
    </div>
  </section>
</template>

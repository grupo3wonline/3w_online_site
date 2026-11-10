<script setup lang="ts">
import { ref } from 'vue'

/**
 * Botão flutuante de ajuda com acesso rápido a WhatsApp, e-mail e topo da página.
 * Presente em todas as páginas via App.vue. Melhora a UX de suporte.
 */
const isOpen = ref(false)

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isOpen.value = false
}
</script>

<template>
  <div class="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
    <!-- Ações expandidas -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div v-if="isOpen" class="flex flex-col items-end gap-2">
        <a
          href="https://wa.me/5541996924829"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg transition-all"
          data-tooltip="Fale no WhatsApp"
        >
          <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp
        </a>
        <a
          href="mailto:contato@3wonline.com.br"
          class="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg transition-all"
        >
          <i class="fa-solid fa-envelope"></i> E-mail
        </a>
        <button
          type="button"
          class="flex items-center gap-2 bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-lg transition-all"
          @click="scrollTop"
        >
          <i class="fa-solid fa-arrow-up"></i> Topo
        </button>
      </div>
    </transition>

    <!-- Botão principal -->
    <button
      type="button"
      class="w-14 h-14 rounded-full gradient-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
      :aria-label="isOpen ? 'Fechar menu de ajuda' : 'Abrir menu de ajuda'"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <i :class="['fa-solid text-xl transition-transform', isOpen ? 'fa-xmark' : 'fa-headset']"></i>
    </button>
  </div>
</template>

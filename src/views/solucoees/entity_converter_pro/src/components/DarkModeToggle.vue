<script setup>
defineProps({
  darkMode: Boolean
})

defineEmits(['toggle'])
</script>

<template>
  <button
    @click="$emit('toggle')"
    class="fixed top-4 right-4 z-50 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
    :aria-label="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'"
    :title="darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'"
  >
    <i :class="darkMode ? 'fas fa-sun' : 'fas fa-moon'"></i>
  </button>
</template>

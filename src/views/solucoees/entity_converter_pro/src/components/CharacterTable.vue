<script setup>
import { ref } from 'vue'
import { charactersData } from '../data/characters'
import Swal from 'sweetalert2'

const searchTerm = ref('')
const filteredData = ref(charactersData)
const selectedCategory = ref('all')

const categories = [
  { value: 'all', label: 'Todos', icon: 'fas fa-globe' },
  { value: 'letters', label: 'Letras Acentuadas', icon: 'fas fa-font' },
  { value: 'symbols', label: 'Símbolos HTML', icon: 'fas fa-code' },
  { value: 'currency', label: 'Moedas', icon: 'fas fa-dollar-sign' },
  { value: 'math', label: 'Matemáticos', icon: 'fas fa-calculator' },
  { value: 'misc', label: 'Diversos', icon: 'fas fa-shapes' }
]

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true
})

const filterTable = () => {
  const term = searchTerm.value.toLowerCase()
  let filtered = charactersData
  
  // Filtrar por categoria
  if (selectedCategory.value !== 'all') {
    filtered = filtered.filter(item => {
      switch (selectedCategory.value) {
        case 'letters':
          return /[A-Za-zÀ-ÿ]/.test(item.char)
        case 'symbols':
          return ['<', '>', '&', '"', "'"].includes(item.char)
        case 'currency':
          return ['€', '£', '¥', '$'].includes(item.char)
        case 'math':
          return ['±', '×', '÷'].includes(item.char)
        case 'misc':
          return ['©', '®', '™'].includes(item.char)
        default:
          return true
      }
    })
  }
  
  // Filtrar por termo de busca
  if (term) {
    filtered = filtered.filter(item =>
      item.char.toLowerCase().includes(term) ||
      item.name.toLowerCase().includes(term) ||
      item.decimal.toLowerCase().includes(term) ||
      item.entity.toLowerCase().includes(term)
    )
  }
  
  filteredData.value = filtered
}

const setCategory = (category) => {
  selectedCategory.value = category
  filterTable()
}

const copyText = async (text, type = 'entity') => {
  try {
    await navigator.clipboard.writeText(text)
    
    Toast.fire({
      icon: 'success',
      title: `"${text}" copiado!`
    })
    
    // Google Analytics Event
    if (window.gtag) {
      window.gtag('event', 'character_copied', {
        character: text,
        type: type
      })
    }
  } catch (err) {
    console.error('Erro ao copiar:', err)
    
    await Swal.fire({
      icon: 'error',
      title: 'Erro ao Copiar',
      text: 'Não foi possível copiar. Tente novamente.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#3b82f6'
    })
  }
}
</script>

<template>
  <section id="tabela" class="p-4 md:p-8 bg-white dark:bg-gray-900">
    <div class="max-w-7xl mx-auto">
      <div class="card">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h3 class="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 flex items-center">
            <i class="fas fa-table text-blue-500 mr-3"></i> Tabela de Referência Dinâmica
          </h3>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ filteredData.length }} de {{ charactersData.length }} caracteres
          </span>
        </div>
        
        <!-- Filtros -->
        <div class="flex flex-col lg:flex-row gap-4 mb-6">
          <!-- Busca -->
          <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-search mr-1"></i> Buscar Caractere ou Código
              <span 
                class="ml-2 text-xs text-gray-500 cursor-help" 
                title="Pesquise por caractere, nome, entity ou código decimal"
              >
                <i class="fas fa-info-circle"></i>
              </span>
            </label>
            <input
              v-model="searchTerm"
              @input="filterTable"
              type="text"
              id="search"
              placeholder="Pesquisar por á, &aacute;, 225, ou nome..."
              class="input-field"
              autocomplete="off"
            >
          </div>
          
          <!-- Categorias -->
          <div class="lg:w-auto">
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <i class="fas fa-filter mr-1"></i> Filtrar por Categoria
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cat in categories"
                :key="cat.value"
                @click="setCategory(cat.value)"
                :class="[
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1',
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                ]"
                :title="cat.label"
              >
                <i :class="cat.icon"></i>
                <span class="hidden sm:inline">{{ cat.label }}</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Tabela -->
        <div class="overflow-x-auto rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Char
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Descrição
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Entity
                  <span 
                    class="ml-1 text-gray-400 cursor-help" 
                    title="Código HTML Entity (ex: &amp;aacute;)"
                  >
                    <i class="fas fa-info-circle text-xs"></i>
                  </span>
                </th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Decimal
                  <span 
                    class="ml-1 text-gray-400 cursor-help" 
                    title="Código decimal (ex: &amp;#225;)"
                  >
                    <i class="fas fa-info-circle text-xs"></i>
                  </span>
                </th>
                <th class="px-4 py-3 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">
                  Ação
                </th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              <tr 
                v-for="(item, index) in filteredData" 
                :key="index"
                class="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
              >
                <td class="px-4 py-3 text-xl font-bold text-center">
                  {{ item.char }}
                </td>
                <td class="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {{ item.name }}
                </td>
                <td class="px-4 py-3 text-sm font-mono">
                  <span class="text-blue-600 dark:text-blue-400">{{ item.entity }}</span>
                  <button 
                    @click="copyText(item.entity, 'entity')" 
                    class="ml-2 p-1 rounded hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                    title="Copiar Entity"
                    aria-label="Copiar Entity"
                  >
                    <i class="fas fa-copy text-blue-500 hover:text-blue-700"></i>
                  </button>
                </td>
                <td class="px-4 py-3 text-sm text-gray-700 dark:text-gray-300 font-mono">
                  {{ item.decimal }}
                  <button 
                    @click="copyText(item.decimal, 'decimal')" 
                    class="ml-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Copiar Decimal"
                    aria-label="Copiar Decimal"
                  >
                    <i class="fas fa-copy text-gray-500 hover:text-gray-700"></i>
                  </button>
                </td>
                <td class="px-4 py-3 text-center">
                  <button 
                    @click="copyText(item.char, 'char')"
                    class="text-xs px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors font-medium"
                    title="Copiar caractere original"
                  >
                    <i class="fas fa-copy mr-1"></i> Char
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredData.length === 0" class="text-center py-12">
          <i class="fas fa-search text-4xl text-gray-300 dark:text-gray-600 mb-4"></i>
          <p class="text-gray-500 dark:text-gray-400 text-lg">
            Nenhum caractere encontrado para "{{ searchTerm }}"
          </p>
          <button 
            @click="searchTerm = ''; filterTable()"
            class="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Limpar busca
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

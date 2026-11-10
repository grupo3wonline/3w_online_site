<script setup>
const authorityPoints = [
  { icon: 'fas fa-code', text: 'Código 100% Validado pelo W3C' },
  { icon: 'fas fa-lock', text: 'Proteção contra injeções XSS' },
  { icon: 'fas fa-language', text: 'Suporte a múltiplos idiomas' },
  { icon: 'fas fa-globe', text: 'Compatibilidade global' }
]
</script>

<template>
  <section class="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 border-t border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-6xl mx-auto px-4">
      <div class="text-center mb-12">
        <span class="inline-block bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400 text-sm font-semibold px-4 py-1 rounded-full mb-4">
          <i class="fas fa-award mr-2"></i> Princípio da Autoridade
        </span>
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          O Padrão Ouro do Desenvolvimento Web
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Utilizado por desenvolvedores sêniores e CMS renomados em todo o mundo
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
        <div>
          <h3 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            A Única Forma Profissional de Tratar Caracteres
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            Desenvolvedores Sêniores e CMS renomados como <strong>WordPress, Drupal e Joomla</strong> 
            utilizam entities como <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">&amp;aacute;</code> 
            para garantir integridade do código e compatibilidade universal.
          </p>
          
          <ul class="space-y-3 mb-6">
            <li 
              v-for="point in authorityPoints" 
              :key="point.text"
              class="flex items-center gap-3 text-gray-700 dark:text-gray-300"
            >
              <div class="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                <i :class="[point.icon, 'text-blue-500']"></i>
              </div>
              {{ point.text }}
            </li>
          </ul>
          
          <a 
            href="#ferramenta"
            class="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
          >
            <i class="fas fa-arrow-right"></i>
            Experimentar Agora
          </a>
        </div>

        <div class="bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-200 dark:border-gray-700">
          <div class="text-center mb-6">
            <div class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <i class="fas fa-database text-4xl text-white"></i>
            </div>
            <h4 class="text-lg font-bold text-gray-900 dark:text-white">Exemplo de Conversão</h4>
          </div>
          
          <!-- Before -->
          <div class="mb-4">
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Antes (Problemático)</span>
            <div class="mt-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <code class="text-sm text-red-700 dark:text-red-300 break-all">
                &lt;p&gt;O preço é de €500.&lt;/p&gt;
              </code>
            </div>
          </div>
          
          <!-- After -->
          <div>
            <span class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">Depois (Seguro)</span>
            <div class="mt-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
              <code class="text-sm text-green-700 dark:text-green-300 break-all">
                &lt;p&gt;O pre&amp;ccedil;o &amp;eacute; de &amp;euro;500.&lt;/p&gt;
              </code>
            </div>
          </div>
          
          <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
            <i class="fas fa-check-circle text-green-500 mr-1"></i>
            Compatível com qualquer navegador e encoding
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
